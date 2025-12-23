/**
 * FAQ Data for SEO-Optimized FAQ Pages
 *
 * Organized by category for better UX and SEO (FAQPage schema).
 * Each FAQ targets question-based search queries and featured snippets.
 *
 * Based on SEO research from docs/SEO OptimizedPagesResearch.md
 */

import type { FAQ } from '@/types';

export const faqs: FAQ[] = [
  // GENERAL QUESTIONS
  {
    id: 'what-is-yudezign',
    question: 'What is YuDezign and what do you do?',
    answer: 'YuDezign is a Houston-based manufacturer of custom European frameless cabinets. We specialize in kitchen cabinets, closets, bathroom vanities, and custom cabinetry with 2-3 week turnaround times. We\'re a supply-only company - we manufacture and deliver cabinets but customers arrange their own installation.',
    category: 'general',
    order: 1
  },
  {
    id: 'what-is-supply-only',
    question: 'What does "supply-only" mean?',
    answer: 'Supply-only means we manufacture and deliver the cabinets, but you arrange installation separately. This model saves you 30-40% compared to full-service cabinet companies. We can recommend trusted installers, or you can use your own contractor.',
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
    answer: 'Yes! Our showroom is located at 13230 Murphy Rd, Suite 600, Stafford, TX 77477. We have 20+ finish samples, full-size cabinet displays, and hardware options. Open Monday-Friday 8am-5pm. Call (281) 568-8000 to schedule an appointment.',
    category: 'general',
    order: 4
  },

  // PRICING & COST
  {
    id: 'how-much-custom-cabinets-cost',
    question: 'How much do custom cabinets cost in Houston?',
    answer: 'Custom frameless cabinets range from $800-$1,800 per linear foot depending on finish and features. A typical 10x12 kitchen (20 linear feet) costs $16,000-$36,000. Essential tier (melamine) is $800-$1,000/LF, Premium tier (HPL/acrylic) is $1,000-$1,300/LF, and Luxury tier (high-gloss/veneer) is $1,300-$1,800+/LF.',
    category: 'pricing',
    tags: ['cost', 'pricing', 'kitchen'],
    order: 1
  },
  {
    id: 'what-affects-pricing',
    question: 'What affects the final price of custom cabinets?',
    answer: 'Price is determined by: (1) Linear footage - total length of cabinets, (2) Finish material - melamine is most affordable, high-gloss acrylic is premium, (3) Features - soft-close, pull-outs, custom inserts add cost, (4) Complexity - corner solutions and specialty cabinets cost more, (5) Hardware quality - basic vs premium Blum/Hettich.',
    category: 'pricing',
    order: 2
  },
  {
    id: 'whats-included-in-price',
    question: 'What\'s included in your pricing?',
    answer: 'Our prices include: cabinet boxes, doors, drawer fronts, soft-close hinges, undermount drawer slides, adjustable shelves, and delivery. NOT included: countertops, installation labor, sink/faucet, appliances, backsplash, flooring. We deliver cabinets ready for installation.',
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
    answer: 'Stock cabinets from Home Depot/Lowe\'s cost $150-$300/LF but are particle board, limited sizes (3-inch increments), and 8-12 week lead times. Semi-custom costs $400-$800/LF. Our custom cabinets at $800-$1,800/LF offer superior 3/4" plywood construction, any size, 25+ finishes, and 2-3 week delivery.',
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
    answer: 'We\'re a supply-only manufacturer - we deliver cabinets but don\'t install them. This keeps costs down. You can hire your own contractor or we can recommend experienced installers we\'ve worked with. Most customers save 30-40% vs full-service companies.',
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
    answer: 'Yes! Our cabinets come with detailed installation instructions and all necessary hardware. If you\'re handy with tools and have a helper, DIY installation is possible. However, professional installation ensures perfect leveling and alignment, especially important for frameless cabinets.',
    category: 'installation',
    order: 3
  },
  {
    id: 'do-you-remove-old-cabinets',
    question: 'Do you remove old cabinets?',
    answer: 'No, removal and disposal of old cabinets is not included. Your installer or contractor will typically handle removal as part of the installation. Expect to pay $500-$1,500 for removal depending on the size of your kitchen.',
    category: 'installation',
    order: 4
  },
  {
    id: 'installer-recommendations',
    question: 'Can you recommend installers?',
    answer: 'Yes! We work with several experienced cabinet installers in Houston. We\'ll provide contact information for 2-3 installers who are familiar with our products. You\'ll hire and pay them directly.',
    category: 'installation',
    order: 5
  },

  // MATERIALS & FINISHES
  {
    id: 'what-materials-do-you-use',
    question: 'What materials do you use for cabinet construction?',
    answer: 'Cabinet boxes: 3/4" plywood or moisture-resistant MDF. Doors/drawer fronts: Melamine (TFL), high-pressure laminate (HPL), high-gloss acrylic, or wood veneer. All cabinets have soft-close Blum or Hettich hinges and undermount drawer slides. Shelves are 3/4" adjustable.',
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
    answer: 'For doors: High-pressure laminate (HPL) is the most durable - impact-resistant, scratch-resistant, and moisture-resistant. For boxes: 3/4" plywood is strongest. For Houston\'s humidity, moisture-resistant MDF cores are ideal for painted/laminated doors as they won\'t expand like solid wood.',
    category: 'materials',
    order: 3
  },
  {
    id: 'do-you-use-real-wood',
    question: 'Do you use real wood?',
    answer: 'We offer wood veneer door fronts (real wood over engineered core) but we don\'t recommend solid wood in Houston due to humidity. Solid wood expands/contracts with moisture causing doors to warp and rub. Our engineered cores with wood veneer give you the beauty of wood with dimensional stability.',
    category: 'materials',
    order: 4
  },
  {
    id: 'whats-best-for-humid-climate',
    question: 'What material is best for Houston\'s humid climate?',
    answer: 'Engineered materials (MDF/plywood cores with laminate or acrylic) are best. They\'re dimensionally stable and won\'t expand with humidity like solid wood. For sink bases and bathroom vanities, we use marine-grade plywood and seal all edges. Avoid solid wood doors in Houston.',
    category: 'materials',
    tags: ['houston', 'climate'],
    order: 5
  },
  {
    id: 'how-many-colors-available',
    question: 'How many colors/finishes do you offer?',
    answer: 'We offer 25+ standard finish colors including whites, grays, wood grains, and bold colors. Custom color matching is available for an additional fee. Popular Houston choices: crisp white, warm gray, natural oak, and matte black.',
    category: 'materials',
    order: 6
  },

  // DESIGN PROCESS
  {
    id: 'how-does-process-work',
    question: 'How does the design and ordering process work?',
    answer: 'Step 1: Free consultation - visit showroom or in-home visit. Step 2: We measure and create a design with 3D renderings. Step 3: Receive detailed quote (3-5 days). Step 4: Approve design, pay 50% deposit. Step 5: We manufacture (2-3 weeks). Step 6: Delivery, you arrange installation. Step 7: Pay remaining 50%.',
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
    answer: 'Total timeline is 3-4 weeks. Design and quote: 3-5 days. Manufacturing: 2-3 weeks. This is much faster than the 8-12 weeks typical for imported cabinets or semi-custom from big box stores. Local Houston manufacturing means no shipping delays.',
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
    answer: 'Yes! We work with contractors, designers, and architects regularly. We can coordinate directly with your design team and provide CAD files. Many Houston contractors prefer our supply-only model as it keeps project costs down for their clients.',
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
    answer: 'Contact us at (281) 568-8000 or info@yudezign.com with photos of the issue and your original order number. We\'ll assess the claim (usually within 1 business day) and ship replacement parts if approved. Most claims are resolved within 1-2 weeks.',
    category: 'warranty',
    order: 3
  },
  {
    id: 'can-you-match-existing-cabinets',
    question: 'Can you match my existing cabinets for additions?',
    answer: 'Yes! Bring us a door sample or detailed photos. We\'ll create a sample to ensure a perfect color and style match before manufacturing. Note that finishes can change slightly over time due to UV exposure, so exact matches on older cabinets may be challenging.',
    category: 'warranty',
    order: 4
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
