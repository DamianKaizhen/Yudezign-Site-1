import { GoogleGenAI } from '@google/genai';

/**
 * Direct Room Visualizer image generation — the in-house replacement for the
 * external n8n workflow that previously called Gemini for us.
 *
 * The n8n workflow was a thin orchestration layer: it downloaded the room photo
 * + finish swatch image(s), branched on how many finishes were selected, called
 * Gemini `gemini-3-pro-image-preview` (Nano Banana Pro) with a large static
 * system prompt, and returned the edited image. This module does exactly that,
 * inside the Vercel function, so there is no external hop or shared webhook auth.
 *
 * Returns the generated image as a `data:image/...;base64,...` string (the same
 * shape the old webhook path returned), or `null` on any failure so the caller
 * can fall back to the n8n webhook.
 */

const MODEL_ID = 'gemini-3-pro-image-preview';

// Leave headroom under the function's 300s maxDuration (Vercel Hobby + Fluid Compute).
const GENERATION_TIMEOUT_MS = 280_000;
// Individual source-image downloads should be quick; cap them so a slow blob
// fetch can't eat the whole budget.
const DOWNLOAD_TIMEOUT_MS = 20_000;

interface FinishSelection {
  id: string;
  name: string;
  imageUrl: string;
}

export interface VisualizationInput {
  roomImage: string;
  finishes: FinishSelection[];
  description?: string;
}

/**
 * System prompt ported verbatim from the n8n Gemini node. It constrains the
 * render to what YuDeZign can actually manufacture (European frameless slab
 * doors, stock finishes only). The selected finish name(s) and the user's
 * description are appended dynamically below — an improvement over n8n, which
 * relied on the swatch images plus this static allow-list alone.
 */
const VISUALIZER_PROMPT = `ROLE: You are generating a photorealistic rendering for YuDeZign, a Houston-based European frameless cabinet manufacturer. Your output must accurately represent ONLY what this company can manufacture.

═══════════════════════════════════════════════════════════════
CRITICAL CONSTRAINTS - WHAT WE CANNOT DO (MUST AVOID):
═══════════════════════════════════════════════════════════════

❌ NO solid hardwood doors (we use melamine/laminate surfaces only)
❌ NO face-frame cabinets (we ONLY make frameless/European style)
❌ NO Shaker style doors (no recessed panels, no rail-and-stile)
❌ NO raised panel doors
❌ NO beadboard or decorative molding on doors
❌ NO glass door inserts
❌ NO ornate crown molding or corbels
❌ NO farmhouse/country/rustic aesthetics
❌ NO distressed or antiqued finishes
❌ NO visible hinges (all hinges are concealed European cup hinges)
❌ NO inset doors (we do full-overlay only)
❌ NO custom paint matching (only our stock finishes)
❌ NO natural wood stains (our wood-look finishes are printed laminate)
❌ NO routed/engraved finger pulls (no grooves cut into the door edge)
❌ NO integrated J-channel pulls routed into door
❌ NO push-to-open/tip-on mechanisms

═══════════════════════════════════════════════════════════════
WHAT WE DO - MANDATORY DESIGN ELEMENTS:
═══════════════════════════════════════════════════════════════

CONSTRUCTION:
✓ European frameless (32mm system) cabinet boxes
✓ Full-overlay slab doors with minimal 3mm gaps
✓ Concealed soft-close hinges (Blum or equivalent)
✓ Soft-close undermount drawer slides
✓ Matching edge banding on all exposed edges
✓ Finished cabinet interiors (white or matching)
✓ Adjustable shelves with shelf pins

DOOR STYLE:
✓ ONLY flat slab doors - completely smooth, no profiles, no routed details
✓ Seamless appearance with tight tolerances
✓ Clean horizontal and vertical lines

HANDLE OPTIONS (choose one):
✓ Metal J-pull profile (aluminum channel mounted to door edge - visible metal strip)
✓ Bar pulls / handles (surface-mounted metal pulls)
✓ No handles (handleless - doors open by grabbing door edge, no special mechanism)

Hardware finishes: Brushed nickel, matte black, brushed brass/gold, chrome

═══════════════════════════════════════════════════════════════
AVAILABLE FINISHES (USE ONLY THESE):
═══════════════════════════════════════════════════════════════

WOOD-LOOK TEXTURES (Touch Nature / Touch Nature Plus):
- Acacia Honey (warm honey wood grain)
- First Class (rich brown wood grain)
- Fashionista (contemporary grey wood grain)
- Rock Solid (weathered grey oak look)
- Lorenzo Oak (beige-grey oak)
- Brown Warmia Walnut (dark walnut grain)
- Vicenza Oak (natural light oak)
- White Tossini Elm (whitewashed wood grain)

HIGH GLOSS SOLID COLORS (Artisan Shine):
- HG White (brilliant white, mirror-like)
- HG Dark Grey (deep charcoal, reflective)
- HG Gentle Grey (soft grey, glossy)
- HG Luxe Black (pure black, high shine)

MATTE SOLID COLORS (Artisan Matte - Soft Touch):
- Soft Touch White (crisp matte white)
- Soft Touch Black (deep matte black)
- Soft Touch Dark Grey (charcoal matte)
- Soft Touch Pebble Grey (light warm grey matte)

═══════════════════════════════════════════════════════════════
IMAGE GENERATION INSTRUCTIONS:
═══════════════════════════════════════════════════════════════

INPUT IMAGES:
1. Room photo: [User's existing kitchen/closet/bathroom photo]
2. Primary finish: [Selected from available finishes above]
3. Accent finish (optional): [Second finish for contrast - island, uppers vs lowers, etc.]

OUTPUT REQUIREMENTS:
- Photorealistic quality matching source image lighting and resolution
- Preserve exact room architecture: windows, doors, ceiling height, flooring
- Replace existing cabinetry with European frameless slab-door cabinets
- Maintain realistic shadows and reflections
- Show proper material textures (wood grain direction, matte vs gloss sheen)
- Ensure cabinets look professionally built-in, not photoshopped
- Scale cabinets appropriately to room proportions

STYLING DIRECTION:
- Aesthetic: Contemporary, minimal luxury, European sophistication
- Lines: Clean horizontal grain alignment, precise vertical reveals
- Details: Subtle, functional, understated elegance
- Lighting: Include under-cabinet LED lighting where appropriate

PROJECT TYPES:
- Kitchen: Base cabinets, wall cabinets, tall pantry units, islands
- Closet: Wardrobe sections, drawer stacks, open shelving, shoe storage
- Vanity: Floating or floor-mounted, single or double sink configurations
- Mudroom: Lockers, bench seating with storage, coat hooks integrated
- Entertainment: Media consoles, floating shelves, integrated cable management
- Garage: Wall-mounted uppers, workbench base cabinets, tall storage

═══════════════════════════════════════════════════════════════
EXAMPLE PROMPT STRUCTURE:
═══════════════════════════════════════════════════════════════

"Generate European frameless [PROJECT TYPE] cabinets in this room.

Primary Finish: [FINISH NAME] on [location - e.g., all cabinets / base cabinets / perimeter]
Accent Finish: [FINISH NAME] on [location - e.g., island / uppers / feature wall] (if applicable)
Handle Style: [Metal J-pull profile in matte black / Bar pulls in brushed brass / No handles]
Countertop suggestion: [Quartz color that complements the cabinet finish]

Maintain the room's existing [flooring/windows/ceiling/appliances].
Show realistic [matte/glossy] surface reflection consistent with the finish type."
`;

/**
 * Compose the final prompt: the static system prompt plus the concrete
 * selections for this submission (finish names, then the user's description).
 * The first attachment is always the room photo; finishes follow in order.
 */
function buildPrompt(input: VisualizationInput): string {
  const lines: string[] = [VISUALIZER_PROMPT, '', 'THIS SUBMISSION:'];

  const primary = input.finishes[0];
  const accent = input.finishes[1];

  if (primary) {
    lines.push(`Primary Finish: ${primary.name} (see the swatch image provided).`);
  }
  if (accent) {
    lines.push(
      `Accent Finish: ${accent.name} (see the swatch image provided) — use for contrast, e.g. island / uppers vs lowers / feature section.`
    );
  }

  const description = input.description?.trim();
  if (description) {
    lines.push('', `Provided Description statement by user:\n${description}`);
  }

  return lines.join('\n');
}

/** Fetch an image URL and return it as a Gemini inline-data part (base64). */
async function fetchImageAsPart(
  url: string
): Promise<{ inlineData: { mimeType: string; data: string } }> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DOWNLOAD_TIMEOUT_MS);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Failed to download image (${response.status}): ${url}`);
    }

    // Prefer the server-declared type; fall back to the extension, then png.
    let mimeType = (response.headers.get('content-type') || '').split(';')[0].trim();
    if (!mimeType.startsWith('image/')) {
      const ext = url.split('?')[0].split('.').pop()?.toLowerCase();
      mimeType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : ext === 'webp' ? 'image/webp' : 'image/png';
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    return { inlineData: { mimeType, data: buffer.toString('base64') } };
  } finally {
    clearTimeout(timeout);
  }
}

/** Pull the first inline image out of a generateContent response, as a data URL. */
function extractImageDataUrl(parts: Array<{ inlineData?: { mimeType?: string; data?: string } }>): string | null {
  for (const part of parts) {
    const data = part.inlineData?.data;
    if (data) {
      const mimeType = part.inlineData?.mimeType || 'image/png';
      return `data:${mimeType};base64,${data}`;
    }
  }
  return null;
}

/**
 * Generate a visualization for a submission. Returns a base64 image data URL,
 * or `null` if generation is not possible / fails (caller falls back to n8n).
 */
export async function generateVisualization(input: VisualizationInput): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY not configured — skipping direct generation, will fall back.');
    return null;
  }
  if (!input.roomImage || !input.finishes?.length) {
    console.warn('Visualization input missing room image or finishes — skipping direct generation.');
    return null;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GENERATION_TIMEOUT_MS);

  try {
    // Download the room photo (first) then each finish swatch, preserving order:
    // this matches the n8n attachment_0 (room), attachment_1/2 (finishes) mapping.
    const imageUrls = [input.roomImage, ...input.finishes.map((f) => f.imageUrl).filter(Boolean)];
    const imageParts = await Promise.all(imageUrls.map(fetchImageAsPart));

    const ai = new GoogleGenAI({ apiKey });
    // No responseModalities override: gemini-3-pro-image-preview is a dedicated
    // image model and returns an image by default (as the n8n node did). If a
    // future model variant returns text only, add config.responseModalities.
    const response = await ai.models.generateContent({
      model: MODEL_ID,
      contents: [
        {
          role: 'user',
          parts: [{ text: buildPrompt(input) }, ...imageParts],
        },
      ],
      config: {
        abortSignal: controller.signal,
        httpOptions: { timeout: GENERATION_TIMEOUT_MS },
      },
    });

    const parts = response.candidates?.[0]?.content?.parts ?? [];
    const dataUrl = extractImageDataUrl(parts);
    if (!dataUrl) {
      console.error('Gemini returned no image part; response text:', response.text?.slice(0, 500));
      return null;
    }

    console.log('Direct Gemini generation succeeded, data URL length:', dataUrl.length);
    return dataUrl;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('Direct Gemini generation timed out.');
    } else {
      console.error('Direct Gemini generation failed:', error);
    }
    return null;
  } finally {
    clearTimeout(timeout);
  }
}
