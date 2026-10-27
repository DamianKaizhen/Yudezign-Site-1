/**
 * FAQ Data for SEO-Optimized FAQ Pages
 *
 * Organized by category for better UX and SEO (FAQPage schema).
 * Each FAQ targets question-based search queries and featured snippets.
 *
 * Based on SEO research from docs/SEO OptimizedPagesResearch.md
 */

import type { FAQ } from '../types';

export const faqs: FAQ[] = [
  // GENERAL QUESTIONS
  {
    id: 'what-is-yudezign',
    question: 'What is YuDezign and what do you do?',
    answer: 'YuDezign has been building custom European frameless cabinets in Houston since 2007. We specialize in kitchen cabinets, closets, bathroom vanities, and custom cabinetry, delivered in as little as two weeks, depending on finish and scale. Install support comes with every order, and inside Greater Houston we can arrange our partner contractors and quote the install separately with the job.',
    category: 'general',
    order: 1
  },
  {
    id: 'what-is-supply-only',
    question: 'What does "supply-only" mean?',
    answer: 'Supply-only pricing means the quote covers the cabinets themselves, delivered ready to install; installation, countertops and appliances are separate. Install support still comes with every order: every panel is QR-tagged, and our free InstallAssistant app shows your installer a 3D model of exactly where each piece goes. If you\'d like it installed, we arrange our partner contractors inside Greater Houston and quote that separately with the job. Outside Greater Houston you use your own installer, with our install support.',
    category: 'general',
    order: 2
  },
  {
    id: 'where-do-you-serve',
    question: 'What areas do you serve?',
    answer: 'We serve the entire Houston metro area including Houston, Katy, Sugar Land, The Woodlands, Pearland, Cypress, Memorial, River Oaks, Galleria, West University, and surrounding communities. We\'re located in Stafford, TX.',
    category: 'general',
    order: 3
  },
  {
    id: 'do-you-have-showroom',
    question: 'Do you have a showroom I can visit?',
    answer: 'Yes! Our showroom is located at 13366 Murphy Rd, Stafford, TX 77477. We have 20+ finish samples, full-size cabinet displays, and hardware options. Open Monday-Friday 8am-5pm. Call (713) 502-0399 to schedule an appointment.',
    category: 'general',
    order: 4
  },

  // PRICING & COST
  {
    id: 'how-much-custom-cabinets-cost',
    question: 'How much do custom cabinets cost in Houston?',
    answer: 'It depends what is included. Fully installed custom cabinetry in Houston typically runs $800-$1,800 per linear foot at market rates, but that figure covers installation labor, countertops and other trades. Our pricing is supply-only, the cabinets alone, delivered ready to install, so it is a fraction of that. A kitchen runs roughly $215-$375 per linear foot depending on finish, which puts a typical 10x12 kitchen (20 linear feet) at about $4,300-$7,500 in cabinets. Bathroom vanities start around $130 per linear foot. Installation, countertops, sink, appliances and backsplash are separate.',
    category: 'pricing',
    tags: ['cost', 'pricing', 'kitchen'],
    order: 1
  },
  {
    id: 'what-affects-pricing',
    question: 'What affects the final price of custom cabinets?',
    answer: 'Price is determined by: (1) Materials used - melamine is most affordable, high-gloss acrylic is premium, (2) Production time - complexity and customization affect manufacturing time, (3) Features - soft-close hardware, pull-outs, custom inserts add cost, (4) Specialty cabinets - corner solutions and custom configurations cost more, (5) Style - the door surface and finish family change between our four Styles. Hardware never steps up: DTC soft-close hinges and the same slides come in every Style, never an upcharge. Linear footage is used for rough estimates only.',
    category: 'pricing',
    order: 2
  },
  {
    id: 'whats-included-in-price',
    question: 'What\'s included in your pricing?',
    answer: 'Our prices include: cabinet boxes, doors, drawer fronts, DTC soft-close hinges, drawer slides (a DTC concealed undermount slide on 21" and 24" deep boxes, a Knape & Vogt 8450FM full-extension, 100 lb side-mount slide on other depths), adjustable shelves, and install support with QR-tagged panels and the InstallAssistant app. NOT included: countertops, installation labor, sink/faucet, appliances, backsplash, flooring. Delivery is $350 a trip inside Greater Houston, or pick up at the plant at 5802 Colfax St, Houston. We deliver cabinets ready for installation.',
    category: 'pricing',
    order: 3
  },
  {
    id: 'do-you-offer-financing',
    question: 'Do you offer financing?',
    answer: 'We don\'t offer in-house financing, but we work with customers who use home equity loans, HELOC, or credit cards. Many contractors offer payment plans for the full project including cabinets and installation.',
    category: 'pricing',
    order: 4
  },
  {
    id: 'custom-vs-stock-price',
    question: 'How do your prices compare to big box stores?',
    answer: 'Stock cabinets from Home Depot/Lowe\'s cost $150-$300/LF but are particle board, come in a handful of fixed sizes, and carry 8-12 week lead times. Our supply-only cabinets run about $215-$375/LF for a kitchen and give you 3/4" plywood construction, every width in 3-inch increments with custom heights and depths, twenty standard colors plus a deeper decor library, and delivery in as little as two weeks, depending on finish and scale. Compare that to a design-build firm quoting $800-$1,800/LF fully installed - that price includes labor, countertops and trades. Install support comes with every order, and inside Greater Houston we can arrange our partner contractors on a separate quote.',
    category: 'pricing',
    order: 5
  },
  {
    id: 'deposit-required',
    question: 'Do you require a deposit?',
    answer: 'Yes, we require a 50% deposit to begin manufacturing. The remaining 50% is due upon delivery. We accept checks, credit cards, and bank transfers.',
    category: 'pricing',
    order: 6
  },

  // INSTALLATION
  {
    id: 'do-you-install-cabinets',
    question: 'Do you install cabinets or just supply them?',
    answer: 'Both. Our pricing is for the cabinets, delivered ready to install, and install support comes with every order: every panel is QR-tagged, and our free InstallAssistant app shows your installer a 3D model of exactly where each piece goes. If you\'d like it installed, we arrange our partner contractors inside Greater Houston and quote that separately with the job. Outside Greater Houston you use your own installer, with our install support.',
    category: 'installation',
    order: 1
  },
  {
    id: 'how-long-installation-take',
    question: 'How long does cabinet installation take?',
    answer: 'A typical kitchen (20 linear feet) takes a professional installer 2-3 days. Smaller projects like bathrooms take 1 day. Complex kitchens with islands and specialty features may take 4-5 days. This doesn\'t include countertop fabrication or plumbing/electrical work.',
    category: 'installation',
    order: 2
  },
  {
    id: 'can-i-install-myself',
    question: 'Can I install the cabinets myself?',
    answer: 'While it\'s technically possible if you\'re experienced with cabinetry, we strongly recommend professional installation. Frameless cabinets require precise leveling and alignment for proper door operation and appearance. Every panel is QR-tagged, and our free InstallAssistant app shows a 3D model of exactly where each piece goes, which helps an experienced DIYer. If you\'d rather have it installed, we arrange our partner contractors inside Greater Houston and quote that separately with the job.',
    category: 'installation',
    order: 3
  },
  {
    id: 'do-you-remove-old-cabinets',
    question: 'Do you remove old cabinets?',
    answer: 'Removal and disposal of old cabinets is not included in the cabinet price. Your installer or contractor will typically handle removal as part of the installation; if we arrange our partner contractors for you, ask us to include it in the install quote. Expect to pay $500-$1,500 for removal depending on the size of your kitchen.',
    category: 'installation',
    order: 4
  },
  {
    id: 'installer-recommendations',
    question: 'Can you recommend installers?',
    answer: 'Yes! Inside Greater Houston we arrange our partner contractors, who know our products and frameless construction, and quote the install separately with the job, so one call covers cabinets and install. Outside Greater Houston you use your own installer, and our install support comes with every order: QR-tagged panels and the free InstallAssistant app with a 3D model of where each piece goes.',
    category: 'installation',
    order: 5
  },

  // MATERIALS & FINISHES
  {
    id: 'what-materials-do-you-use',
    question: 'What materials do you use for cabinet construction?',
    answer: 'Cabinet boxes: 3/4" plywood with 1/4" plywood backs and drawer bottoms, cam-and-dowel joinery, wall cabinets hung on a French cleat. Particleboard is available if you want to take cost out. We use frameless European construction with no face frame. Doors/drawer fronts: 3/4" thick in melamine (TFL), high-pressure laminate (HPL), acrylic, paint or RTF, in twenty standard colors, five in each Style, and a deeper library of over 140 decors on request. All doors and panels get 1 mm color-matched edge banding that seals the core and creates a uniform appearance. Standard board sizes are 4\'x8\' sheets, so cabinets run up to 96" tall in one piece. Every cabinet includes DTC soft-close hinges; drawers ride a DTC concealed undermount slide on 21" and 24" deep boxes and a Knape & Vogt 8450FM full-extension, 100 lb side-mount slide on other depths. Shelves are 3/4" adjustable.',
    category: 'materials',
    order: 1
  },
  {
    id: 'whats-difference-melamine-laminate-acrylic',
    question: 'What\'s the difference between melamine, laminate, and acrylic?',
    answer: 'Melamine (TFL): Most affordable, scratch-resistant, great for closets/garages. HPL (High-Pressure Laminate): Mid-range, impact-resistant, wide variety of textures. Acrylic: Premium, high-gloss glass-like finish, UV-stable won\'t yellow, shows fingerprints. All are more durable than painted wood.',
    category: 'materials',
    tags: ['finishes', 'materials'],
    order: 2
  },
  {
    id: 'whats-most-durable',
    question: 'What\'s the most durable cabinet material?',
    answer: 'For doors: High-pressure laminate (HPL) is the most durable - impact-resistant, scratch-resistant, and moisture-resistant. For boxes: 3/4" plywood is strongest. For Houston\'s humidity, engineered door cores sealed with color-matched edge banding stay dimensionally stable and won\'t expand like solid wood.',
    category: 'materials',
    order: 3
  },
  {
    id: 'do-you-use-real-wood',
    question: 'Do you use real wood or wood veneer?',
    answer: 'No, we don\'t use solid wood or wood veneer. We specialize in modern engineered materials - plywood, particleboard, or MDF cores with melamine, laminate, or acrylic finishes. These materials are superior for Houston\'s climate because they don\'t expand/contract with humidity like solid wood. We offer wood-grain pattern finishes that give you the look of wood without the warping, cracking, or maintenance issues.',
    category: 'materials',
    order: 4
  },
  {
    id: 'whats-best-for-humid-climate',
    question: 'What material is best for Houston\'s humid climate?',
    answer: 'Engineered materials (plywood boxes and engineered-core door panels with laminate or acrylic surfaces) are best for Houston\'s 75-90% humidity. They\'re dimensionally stable and won\'t expand/contract with humidity like solid wood. Edge-banding is critical - it seals exposed core edges from moisture penetration and prevents warping. Sink bases and bathroom vanities get the same 3/4" plywood boxes, with 1 mm color-matched edge banding sealing every exposed core edge. This is why we don\'t use solid wood - it would expand, warp, and crack in Houston\'s climate. Our engineered materials maintain their shape and finish for decades.',
    category: 'materials',
    tags: ['houston', 'climate'],
    order: 5
  },
  {
    id: 'how-many-colors-available',
    question: 'How many colors/finishes do you offer?',
    answer: 'We offer twenty standard colors, five in each Style, spanning whites, grays, woodgrains and bold solids, and a deeper library of over 140 decors on request. Custom color matching is available for an additional fee. Popular Houston choices: crisp white, warm gray, natural oak, and matte black.',
    category: 'materials',
    order: 6
  },

  // DESIGN PROCESS
  {
    id: 'how-does-process-work',
    question: 'How does the design and ordering process work?',
    answer: 'Step 1: Free consultation - visit showroom or in-home visit. Step 2: We measure and create a design with 3D renderings. Step 3: Receive detailed quote (3-5 days). Step 4: Approve design, pay 50% deposit. Step 5: We manufacture, in as little as two weeks depending on finish and scale. Step 6: Delivery ($350 a trip inside Greater Houston, or pick up at the plant) and install, by our partner contractors on a separate quote or your own installer with our install support. Step 7: Pay remaining 50%.',
    category: 'process',
    order: 1
  },
  {
    id: 'do-you-do-3d-renderings',
    question: 'Do you provide 3D renderings?',
    answer: 'Yes! We create detailed 3D renderings showing your cabinets in your space. This helps you visualize the final result before manufacturing begins. We can make unlimited revisions until you\'re happy with the design.',
    category: 'process',
    order: 2
  },
  {
    id: 'how-long-does-it-take',
    question: 'How long from order to delivery?',
    answer: 'Design and quote: 3-5 days. Manufacturing: in as little as two weeks, depending on finish and scale, for standard residential kitchens using materials we have in stock. Special finishes or custom colors require vendor sourcing, which can add time depending on availability. This is much faster than the 8-12 weeks typical for imported cabinets or semi-custom from big box stores. Local Houston manufacturing means no shipping delays.',
    category: 'process',
    tags: ['turnaround', 'timeline'],
    order: 3
  },
  {
    id: 'can-i-see-samples',
    question: 'Can I see samples before ordering?',
    answer: 'Absolutely! Visit our showroom to see 20+ finish samples, full-size cabinet displays, and hardware options. We can also bring small samples to your home during consultations. Seeing and touching the materials helps you make the best decision.',
    category: 'process',
    order: 4
  },
  {
    id: 'do-you-work-with-contractors',
    question: 'Do you work with contractors and designers?',
    answer: 'Yes! We work with contractors, designers, and architects regularly. We can coordinate directly with your design team and provide CAD files. Many Houston contractors like our supply-only pricing, with QR-tagged panels and the InstallAssistant app making the install straightforward for their crews.',
    category: 'process',
    order: 5
  },

  // WARRANTY & SUPPORT
  {
    id: 'what-warranty-do-you-offer',
    question: 'What warranty do you offer?',
    answer: 'Lifetime warranty on structural components (boxes, drawer boxes, shelves). 5-year warranty on finishes (doors, drawer fronts). 2-year warranty on hardware (hinges, slides). Warranty covers manufacturing defects, not damage from improper installation, misuse, or normal wear.',
    category: 'warranty',
    order: 1
  },
  {
    id: 'what-if-something-breaks',
    question: 'What if something breaks or gets damaged?',
    answer: 'Contact us immediately. We\'ll assess whether it\'s a warranty issue (manufacturing defect) or damage issue. For warranty claims, we replace defective parts at no cost. For damage, we can manufacture replacement doors or parts at cost. Soft-close hardware carries a lifetime manufacturer warranty.',
    category: 'warranty',
    order: 2
  },
  {
    id: 'how-do-i-file-warranty-claim',
    question: 'How do I file a warranty claim?',
    answer: 'Contact us at (713) 502-0399 or info@yudezign.com with photos of the issue and your original order number. We\'ll assess the claim (usually within 1 business day) and ship replacement parts if approved. Most claims are resolved within 1-2 weeks.',
    category: 'warranty',
    order: 3
  },
  {
    id: 'can-you-match-existing-cabinets',
    question: 'Can you match my existing cabinets for additions?',
    answer: 'Unfortunately, we cannot guarantee an exact match to existing cabinets. Even if you know the exact finish that was used, finishes change color over time due to UV exposure, cleaning products, and aging. This means that even with the same material and color, new cabinets will look different from older ones. For additions, we recommend either replacing all visible cabinets or choosing a complementary finish that works as an intentional design choice.',
    category: 'warranty',
    order: 4
  },

  // TECHNICAL SPECIFICATIONS
  {
    id: 'what-is-frameless-construction',
    question: 'What is frameless cabinet construction?',
    answer: 'Frameless cabinets (European style) have no face frame on the front - the doors attach directly to the cabinet box sides. This provides more storage space, easier access, and a sleek modern look. Traditional American cabinets have a face frame that reduces the opening size. Frameless construction requires precise installation for proper door alignment, but offers superior storage capacity and contemporary aesthetics.',
    category: 'technical',
    tags: ['construction', 'frameless', 'European'],
    order: 1
  },
  {
    id: 'full-overlay-vs-half-overlay',
    question: 'What is the difference between full overlay and half overlay hinges?',
    answer: 'Full overlay hinges allow doors to completely cover the cabinet side panels - we use these for kitchens and bathroom vanities for a seamless modern look. Half overlay hinges only partially cover the side panels, allowing you to share a single panel between two cabinets or have doors on both sides - we use these for closet systems. The hinge type determines the door placement and overall cabinet appearance.',
    category: 'technical',
    tags: ['hinges', 'overlay', 'construction'],
    order: 2
  },
  {
    id: 'kitchen-base-cabinet-dimensions',
    question: 'What are the standard dimensions for kitchen base cabinets?',
    answer: 'Kitchen base cabinets are 24 inches deep and 34.5 inches high (32.5 inches for ADA-compliant installations). The height allows for a 1.5-inch countertop to reach the standard 36-inch total height. Cabinet widths are available in 3-inch increments starting at 9 inches up to 42 inches, depending on the cabinet type (drawers, doors, or open shelves).',
    category: 'technical',
    tags: ['dimensions', 'kitchen', 'specifications'],
    order: 3
  },
  {
    id: 'kitchen-wall-cabinet-dimensions',
    question: 'What are the standard dimensions for kitchen wall cabinets?',
    answer: 'Kitchen wall cabinets are 13 inches deep. Heights and widths come in 3-inch increments (12", 15", 18", 21", 24" up to 42"). The most common heights are 36", 42", 30", and 24 inches. Most common widths are 12", 15", and 18" for single-door units, and 24", 30", and 36" for double-door units.',
    category: 'technical',
    tags: ['dimensions', 'kitchen', 'specifications'],
    order: 4
  },
  {
    id: 'tall-cabinet-dimensions',
    question: 'What are the standard dimensions for tall cabinets?',
    answer: 'Tall cabinets (pantries, linen cabinets) are 24 inches deep and typically 96 inches tall - the maximum height possible with standard 4\'x8\' plywood sheets. Common widths are 15", 18", and 21" for single-door units, 24", 30", and 36" for double-door units, and 30" or 36" for oven/microwave housing units.',
    category: 'technical',
    tags: ['dimensions', 'tall cabinets', 'specifications'],
    order: 5
  },
  {
    id: 'bathroom-vanity-dimensions',
    question: 'What are standard bathroom vanity dimensions?',
    answer: 'Bathroom vanities are 21 inches deep and either 34.5 inches or 32.5 inches high. The 34.5-inch height allows for a 1.5-inch countertop to reach 36 inches total, while 32.5 inches is used for ADA-compliant installations (34 inches total with countertop). Widths vary based on your bathroom space and design preferences.',
    category: 'technical',
    tags: ['dimensions', 'bathroom', 'specifications'],
    order: 6
  },
  {
    id: 'what-is-rtf-finish',
    question: 'What is RTF (Rigid Thermofoil) and when is it used?',
    answer: 'RTF (Rigid Thermofoil) is a vinyl film that\'s vacuum-pressed over MDF to create a seamless, moisture-resistant finish. It mimics the look of paint or wood grain without the maintenance issues. We use RTF exclusively for door and drawer fronts, chiefly on the shaker we machine from a single piece of MDF as a custom door. It\'s durable, easy to clean, and performs well in Houston\'s humid climate.',
    category: 'materials',
    tags: ['finishes', 'RTF', 'materials'],
    order: 7
  },
  {
    id: 'why-mdf-for-shaker-doors',
    question: 'Why do you use MDF for Shaker doors instead of real wood?',
    answer: 'We carve Shaker profiles from a single piece of MDF rather than using traditional multi-piece real wood construction. MDF doesn\'t expand or contract with humidity changes like real wood does - critical for Houston\'s climate. MDF allows us to create the Shaker profile without joints that could separate over time. While not "real wood," MDF with RTF or paint finish provides superior dimensional stability and durability. Note that a shaker is a custom door in our made-to-measure line: it costs more than our standard slab door and we don\'t usually recommend it. If you want a classic five-piece shaker, our stocked framed line carries one at a stock price.',
    category: 'materials',
    tags: ['MDF', 'Shaker doors', 'construction'],
    order: 8
  },
  {
    id: 'what-is-edge-banding',
    question: 'What is edge-banding and why is it important?',
    answer: 'Edge-banding is a 1 mm strip applied to the exposed edges of cabinet doors and panels. It serves two critical purposes: (1) Seals the exposed core from moisture, preventing water damage and warping - especially important in humid Houston, and (2) Matches the surface finish color for a uniform, professional appearance. All our doors and visible panels include color-matched edge-banding.',
    category: 'technical',
    tags: ['edge-banding', 'construction', 'finishing'],
    order: 7
  },
  {
    id: 'cabinet-board-thickness',
    question: 'What thickness boards do you use for cabinets?',
    answer: 'We use 3/4-inch thick plywood or particleboard for all structural components: cabinet boxes, doors, drawer fronts, and shelves. The only exceptions are back panels and drawer bottom panels, which use 1/4-inch plywood for weight reduction while maintaining stability. The 3/4-inch thickness provides superior strength and durability compared to thinner materials used in stock cabinets.',
    category: 'technical',
    tags: ['specifications', 'materials', 'construction'],
    order: 8
  },
  {
    id: 'why-not-taller-than-96-inches',
    question: 'Why can\'t you make cabinets taller than 96 inches?',
    answer: 'Standard plywood sheets are 48 inches wide by 96 inches tall (4\'x8\'). To maintain structural integrity and avoid seams, we don\'t make single cabinets taller than 96 inches. For spaces requiring more height, we can stack shorter cabinets or design custom solutions. Most residential ceilings are 8-10 feet, so 96-inch tall cabinets work for the majority of applications.',
    category: 'technical',
    tags: ['specifications', 'limitations', 'construction'],
    order: 9
  },
  {
    id: 'what-soft-close-hardware',
    question: 'What hardware do you use for soft-close functionality?',
    answer: 'DTC soft-close hinges on every door. Drawers ride a DTC concealed undermount slide on 21" and 24" deep boxes (the kitchen and vanity bases) and a Knape & Vogt 8450FM full-extension, 100 lb side-mount slide on other depths. The same hardware in every Style, never an upcharge. Soft-close prevents slamming, reduces wear and tear, and provides a premium feel. The undermount slides are hidden beneath the drawer for a cleaner appearance and full-extension access. Your written warranty comes with your agreement.',
    category: 'technical',
    tags: ['hardware', 'soft-close', 'quality'],
    order: 10
  },

  // DELIVERY & LOGISTICS
  {
    id: 'delivery-cost-and-areas',
    question: 'How much does delivery cost and what areas do you cover?',
    answer: 'Delivery costs $350 per trip within the Greater Houston Area (Houston, Katy, Sugar Land, The Woodlands, Pearland, Cypress, etc.). A typical trip can accommodate one standard kitchen plus a couple bathroom vanities and a small closet. For larger projects, multiple trips may be needed. Alternatively, you can pick up your cabinets free of charge from our factory at 5802 Colfax St, Houston, TX 77477.',
    category: 'delivery',
    tags: ['delivery', 'cost', 'Houston', 'logistics'],
    order: 1
  }
];

// Helper functions
export const getFAQsByCategory = (category: string): FAQ[] => {
  return faqs
    .filter(faq => faq.category === category)
    .sort((a, b) => (a.order || 999) - (b.order || 999));
};

export const getAllFAQs = (): FAQ[] => {
  return faqs.sort((a, b) => (a.order || 999) - (b.order || 999));
};

export const searchFAQs = (query: string): FAQ[] => {
  const lowerQuery = query.toLowerCase();
  return faqs.filter(
    faq =>
      faq.question.toLowerCase().includes(lowerQuery) ||
      faq.answer.toLowerCase().includes(lowerQuery) ||
      faq.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

export const getFAQById = (id: string): FAQ | undefined => {
  return faqs.find(faq => faq.id === id);
};

// Get related FAQs
export const getRelatedFAQs = (id: string, limit: number = 3): FAQ[] => {
  const faq = getFAQById(id);
  if (!faq) return [];

  // Get FAQs from same category, excluding current
  const sameCategoryFAQs = getFAQsByCategory(faq.category).filter(f => f.id !== id);

  return sameCategoryFAQs.slice(0, limit);
};
