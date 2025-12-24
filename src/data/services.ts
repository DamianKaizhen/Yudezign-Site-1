/**
 * Service Data for SEO-Optimized Service Pages
 *
 * Contains detailed information for each service/product type offered.
 * Each service page targets product-specific search queries.
 *
 * Based on SEO research from docs/SEO OptimizedPagesResearch.md
 */

import type { ServiceData } from '../types';

export const services: ServiceData[] = [
  {
    slug: 'kitchen-cabinets',
    name: 'Kitchen Cabinets',
    metaTitle: 'Custom Kitchen Cabinets Houston | European Frameless | YuDezign',
    metaDescription:
      'Custom kitchen cabinets in Houston. European frameless design, 10-15% more storage. 2-3 week turnaround. Plywood construction, 25+ finishes. Supply-only pricing.',
    keywords: [
      'custom kitchen cabinets houston',
      'european kitchen cabinets',
      'frameless kitchen cabinets',
      'kitchen cabinet makers houston',
      'modern kitchen cabinets'
    ],
    heroImage: 'https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=1920&q=90',
    icon: 'ChefHat',
    overview:
      'Transform your kitchen with custom European frameless cabinets. Engineered for Houston\'s climate with moisture-resistant cores, our cabinets offer 10-15% more storage than traditional framed construction.',
    longDescription:
      'Modern kitchens have evolved beyond the traditional "work triangle" to organized work zones. Our custom kitchen cabinets are designed to perfectly engineer prep zones, cooking zones, cleanup zones, and consumable storage - something impossible with stock cabinets limited to 3-inch increments.',
    designOptions: [
      {
        title: 'Modern Minimalist',
        description: 'Sleek slab doors, handleless design, high-gloss or matte finishes',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=90'
      },
      {
        title: 'Traditional Elegance',
        description: 'Raised panel doors, classic hardware, warm wood tones',
        image: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800&q=90'
      },
      {
        title: 'Transitional Style',
        description: 'Shaker doors, mix of modern and classic elements, versatile',
        image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=90'
      },
      {
        title: 'Contemporary European',
        description: 'Frameless construction, integrated handles, seamless look',
        image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=90'
      }
    ],
    materials: [
      '3/4" Plywood Construction',
      'Moisture-Resistant MDF Cores',
      'High-Pressure Laminate (HPL)',
      'Thermally Fused Laminate (TFL/Melamine)',
      'High-Gloss Acrylic',
      'Wood Veneer Options'
    ],
    finishes: [
      {
        name: 'High-Gloss Acrylic',
        description: 'UV-stable, won\'t yellow, modern glass-like finish. Premium choice for contemporary kitchens.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=90'
      },
      {
        name: 'Matte Laminate',
        description: 'Fingerprint-resistant, wide variety of colors and textures. Great for families.',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=90'
      },
      {
        name: 'Wood Veneer',
        description: 'Natural wood beauty with engineered stability. Warm, timeless aesthetic.',
        image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&q=90'
      }
    ],
    features: [
      {
        icon: 'Maximize2',
        title: '10-15% More Storage',
        description: 'Frameless construction eliminates the center stile, providing full access to cabinet interiors and wider drawers.'
      },
      {
        icon: 'Droplets',
        title: 'Houston Climate Ready',
        description: 'Engineered cores resist humidity-induced expansion. Marine-grade plywood for sink bases.'
      },
      {
        icon: 'Zap',
        title: 'Soft-Close Hardware',
        description: 'Premium Blum or Hettich hinges and undermount slides. Whisper-quiet, guaranteed for life.'
      },
      {
        icon: 'Palette',
        title: '25+ Finish Options',
        description: 'From high-gloss white to natural walnut. Custom color matching available.'
      },
      {
        icon: 'Settings',
        title: 'Full Customization',
        description: 'Any size, any configuration. Corner solutions, blind corner optimizers, pull-out organizers.'
      },
      {
        icon: 'Clock',
        title: '2-3 Week Turnaround',
        description: 'Local Houston manufacturing means fast delivery. No 8-12 week waits for imports.'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Free Consultation',
        description: 'Visit our showroom or schedule an in-home consultation. We\'ll discuss your vision, measure your space, and show you material samples.',
        duration: '1-2 hours'
      },
      {
        step: 2,
        title: 'Design & Quote',
        description: 'We create a detailed cabinet design with 3D renderings and provide a transparent quote breaking down costs by linear foot.',
        duration: '3-5 days'
      },
      {
        step: 3,
        title: 'Manufacturing',
        description: 'Once approved, we manufacture your cabinets locally in Houston. You\'ll receive progress updates.',
        duration: '2-3 weeks'
      },
      {
        step: 4,
        title: 'Delivery & Support',
        description: 'We deliver your cabinets ready for installation. Supply-only model - you arrange installation or we can recommend trusted contractors.',
        duration: '1 day'
      }
    ],
    pricingGuide: [
      {
        level: 'Essential',
        range: '$800-$1,000/linear ft',
        features: [
          'Melamine (TFL) doors and boxes',
          'Standard soft-close hinges',
          'Basic drawer organizers',
          'Limited color selection',
          'Great for garages, laundry rooms, rentals'
        ]
      },
      {
        level: 'Premium',
        range: '$1,000-$1,300/linear ft',
        features: [
          'HPL or matte acrylic doors',
          'Premium Blum hardware',
          'Custom drawer inserts',
          '25+ colors available',
          'Most popular choice for kitchens',
          'Excellent durability and style'
        ],
        popular: true
      },
      {
        level: 'Luxury',
        range: '$1,300-$1,800+/linear ft',
        features: [
          'High-gloss acrylic or wood veneer',
          'Top-tier Hettich hardware',
          'Full custom accessories',
          'Integrated LED lighting',
          'Walnut or exotic wood interiors',
          'Show-stopping modern design'
        ]
      }
    ],
    faqs: [
      {
        question: 'What\'s the difference between frameless and framed cabinets?',
        answer: 'Frameless (European) cabinets have no face frame - doors attach directly to the box. This provides 10-15% more storage space, full access to the interior, and a sleek modern look with tight 1/8" gaps between doors. Framed cabinets have a visible frame which is more traditional but blocks some access.'
      },
      {
        question: 'How much do custom kitchen cabinets cost in Houston?',
        answer: 'Custom frameless cabinets range from $800-$1,800 per linear foot depending on finish and features. A typical 10x12 kitchen (20 linear feet) costs $16,000-$36,000. This includes soft-close hardware, plywood construction, and custom sizing. Stock cabinets from big box stores run $150-$300/LF but lack customization and quality.'
      },
      {
        question: 'Why are engineered cores better for Houston\'s climate?',
        answer: 'Houston averages 75-90% humidity year-round. Solid wood expands and contracts with humidity changes - a 5-piece door can swell enough to rub against adjacent doors. Our engineered MDF/plywood cores are dimensionally stable and won\'t warp, crack, or expand like solid wood.'
      },
      {
        question: 'Do you install the cabinets or just supply them?',
        answer: 'We\'re a supply-only manufacturer, which keeps costs down. We deliver cabinets ready for installation. Most customers hire their own contractor or we can recommend trusted installers we\'ve worked with. This model saves you 30-40% vs full-service cabinet companies.'
      },
      {
        question: 'How long does the process take?',
        answer: 'From consultation to delivery: 3-4 weeks total. Design and quote takes 3-5 days, manufacturing takes 2-3 weeks. This is much faster than the 8-12 weeks typical for imported cabinets or semi-custom from big box stores.'
      }
    ],
    relatedProjects: [],
    relatedServices: ['closet-systems', 'bathroom-vanities', 'home-office-cabinets'],
    specifications: [
      { label: 'Box Construction', value: '3/4" Plywood or Moisture-Resistant MDF' },
      { label: 'Door Thickness', value: '3/4" (19mm)' },
      { label: 'Hinge Type', value: 'Soft-close, 110° opening, Blum or Hettich' },
      { label: 'Drawer Slides', value: 'Undermount soft-close, full-extension' },
      { label: 'Shelf Thickness', value: '3/4" adjustable shelves' },
      { label: 'Warranty', value: 'Lifetime structural, 5-year finish' }
    ],
    houstonAngle:
      'Houston\'s 90% humidity demands moisture-resistant construction. We use engineered cores that won\'t expand or warp, plus marine-grade plywood for all sink bases and dishwasher cabinets.'
  },

  {
    slug: 'closet-systems',
    name: 'Closet Systems',
    metaTitle: 'Custom Closet Systems Houston | Walk-In Closets | YuDezign',
    metaDescription:
      'Custom closet systems in Houston. Walk-in closets, reach-in organizers, wardrobe solutions. European frameless design. 2-3 week turnaround.',
    keywords: [
      'custom closet systems houston',
      'walk-in closet cabinets',
      'closet organization houston',
      'wardrobe systems houston'
    ],
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=90',
    icon: 'ShoppingBag',
    overview:
      'Transform your closet into a luxury boutique with custom organizational systems. Maximize space with adjustable shelving, drawer inserts, and accessory organizers designed for your specific wardrobe.',
    designOptions: [
      {
        title: 'Walk-In Master Closet',
        description: 'Full wall systems with islands, jewelry drawers, shoe displays',
        image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=90'
      },
      {
        title: 'Reach-In Organizer',
        description: 'Maximize small closets with double hang rods and shelving',
        image: 'https://images.unsplash.com/photo-1558618666-f76a99d0b0b6?w=800&q=90'
      },
      {
        title: 'His & Hers Suite',
        description: 'Separate zones with custom organization for each',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=90'
      }
    ],
    materials: ['Melamine (TFL) - Budget-friendly and durable', 'High-Pressure Laminate', 'Acrylic Finishes', 'Wood Veneer Accents'],
    features: [
      {
        icon: 'Shirt',
        title: 'Seasonal Rotation Design',
        description: 'Houston doesn\'t need heavy winter coat storage. We design for airflow to prevent mold on leather goods in high AC usage.'
      },
      {
        icon: 'Box',
        title: 'Custom Accessories',
        description: 'Tie racks, belt hooks, jewelry drawers, pull-out hampers, valet rods, shoe shelves with angled display.'
      },
      {
        icon: 'Lightbulb',
        title: 'LED Lighting Integration',
        description: 'Motion-activated closet lighting, illuminated hanging rods, jewelry drawer lights.'
      },
      {
        icon: 'Maximize',
        title: 'Floor-to-Ceiling Storage',
        description: 'Utilize every inch of vertical space with adjustable shelving systems.'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Wardrobe Assessment',
        description: 'We inventory your clothing, shoes, and accessories to design the perfect organization system.',
        duration: '1 hour'
      },
      {
        step: 2,
        title: 'Custom Design',
        description: 'CAD drawings showing hanging zones, shelving, drawers, and specialty storage.',
        duration: '3-5 days'
      },
      {
        step: 3,
        title: 'Manufacturing',
        description: 'Precision-cut components with pre-drilled adjustable shelf holes.',
        duration: '2-3 weeks'
      },
      {
        step: 4,
        title: 'Installation Ready',
        description: 'Delivered with installation instructions and hardware.',
        duration: '1 day'
      }
    ],
    pricingGuide: [
      {
        level: 'Reach-In Closet',
        range: '$800-$1,500',
        features: ['6-8 linear feet', 'Melamine finish', 'Basic shelving and rods', 'Simple organization']
      },
      {
        level: 'Walk-In Closet',
        range: '$3,000-$8,000',
        features: ['12-20 linear feet', 'HPL or acrylic', 'Drawers and accessories', 'Custom organization'],
        popular: true
      },
      {
        level: 'Luxury Master Suite',
        range: '$8,000-$20,000+',
        features: ['20+ linear feet', 'Premium finishes', 'Island with seating', 'Jewelry safes, LED lighting']
      }
    ],
    faqs: [
      {
        question: 'What\'s the difference between floor-based and wall-hung closet systems?',
        answer: 'Wall-hung systems are more affordable and easier to clean underneath, ideal for reach-in closets. Floor-based systems look like furniture and support more weight, perfect for walk-ins with islands. We recommend wall-hung for Houston to allow airflow at floor level.'
      },
      {
        question: 'How do you prevent mold in Houston closets?',
        answer: 'Houston\'s AC usage creates temperature swings that can cause condensation. We design for airflow - wall-hung systems, slatted shelves for shoes, and proper spacing. We avoid solid backs where possible to allow air circulation.'
      }
    ],
    relatedProjects: [],
    relatedServices: ['bedroom-murphy-beds', 'laundry-room-cabinets'],
    houstonAngle:
      'Houston\'s high AC usage creates unique closet challenges. We design for airflow to prevent mold on leather goods and avoid heavy winter storage (you don\'t need it!).'
  },

  {
    slug: 'bathroom-vanities',
    name: 'Bathroom Vanities',
    metaTitle: 'Custom Bathroom Vanities Houston | Double Vanity Cabinets | YuDezign',
    metaDescription:
      'Custom bathroom vanities in Houston. Moisture-resistant construction, custom sizes. Single and double vanities. European frameless quality.',
    keywords: [
      'custom bathroom vanities houston',
      'bathroom cabinets houston',
      'double vanity cabinets',
      'floating vanity houston'
    ],
    heroImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1920&q=90',
    icon: 'Bath',
    overview:
      'Custom bathroom vanities built for Houston\'s humidity with marine-grade materials. From compact powder rooms to luxurious double vanities, sized perfectly for your plumbing layout.',
    designOptions: [
      {
        title: 'Floating Vanity',
        description: 'Wall-mounted, modern aesthetic, easy floor cleaning',
        image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=90'
      },
      {
        title: 'Furniture-Style Vanity',
        description: 'Traditional look with legs, decorative feet, classic appeal',
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=90'
      },
      {
        title: 'Double Vanity',
        description: 'His & hers sinks, individual storage, shared center drawers',
        image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=90'
      }
    ],
    materials: [
      'Marine-Grade Plywood',
      'Moisture-Resistant MDF',
      'Sealed Interiors',
      'Water-Resistant Finishes'
    ],
    features: [
      {
        icon: 'Droplet',
        title: 'Marine-Grade Construction',
        description: 'All boxes use marine-grade plywood or MR-MDF. Sealed interiors prevent moisture damage.'
      },
      {
        icon: 'Wrench',
        title: 'Plumbing Integration',
        description: 'Custom cutouts for pipes, access panels for shutoff valves, undermount sink support.'
      },
      {
        icon: 'Package',
        title: 'Smart Storage',
        description: 'Drawer dividers for toiletries, pull-out hampers, tilt-out trays, outlets inside drawers for hair tools.'
      },
      {
        icon: 'Ruler',
        title: 'Perfect Sizing',
        description: 'Custom widths to fit your exact space and plumbing layout. No filler strips needed.'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Measure & Design',
        description: 'We measure your space and plumbing layout to design a vanity that fits perfectly.',
        duration: '1 hour'
      },
      {
        step: 2,
        title: 'Countertop Coordination',
        description: 'We provide exact dimensions for your countertop fabricator (quartz, marble, granite).',
        duration: '3-5 days'
      },
      {
        step: 3,
        title: 'Manufacturing',
        description: 'Built with marine-grade materials and sealed for moisture resistance.',
        duration: '2-3 weeks'
      },
      {
        step: 4,
        title: 'Installation Ready',
        description: 'Delivered with mounting hardware and plumbing access panels.',
        duration: '1 day'
      }
    ],
    pricingGuide: [
      {
        level: 'Single Vanity (24-48")',
        range: '$1,200-$2,500',
        features: ['Standard size', 'Basic storage', 'Melamine or laminate finish']
      },
      {
        level: 'Double Vanity (60-72")',
        range: '$2,500-$5,000',
        features: ['Two sinks', 'Shared drawers', 'Premium finishes', 'Custom organization'],
        popular: true
      },
      {
        level: 'Custom Size/Luxury',
        range: '$5,000-$10,000+',
        features: ['Any width', 'Furniture-style details', 'Premium hardware', 'Matching medicine cabinets']
      }
    ],
    faqs: [
      {
        question: 'What makes bathroom cabinets different from kitchen cabinets?',
        answer: 'Bathroom cabinets need moisture resistance. We use marine-grade plywood, seal all edges, and use water-resistant finishes. All boxes are sealed inside to prevent moisture absorption from humidity and splashing.'
      },
      {
        question: 'Can you match my existing bathroom cabinets?',
        answer: 'Yes, we can match existing finishes and door styles. Bring us a door or photo and we\'ll create a sample to ensure a perfect match before manufacturing.'
      }
    ],
    relatedProjects: [],
    relatedServices: ['kitchen-cabinets', 'laundry-room-cabinets'],
    houstonAngle:
      'Houston bathrooms need marine-grade construction. High humidity plus shower steam demands moisture-resistant materials and sealed construction.'
  },

  {
    slug: 'home-office-cabinets',
    name: 'Home Office Cabinets',
    metaTitle: 'Custom Home Office Cabinets Houston | Built-In Desks | YuDezign',
    metaDescription:
      'Custom home office built-ins Houston. Integrated desk systems, file storage, cable management. Perfect for remote work. European frameless quality.',
    keywords: [
      'home office built-ins houston',
      'custom office cabinets',
      'desk and cabinets houston',
      'home office furniture houston'
    ],
    heroImage: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1920&q=90',
    icon: 'Laptop',
    overview:
      'Create your ideal remote workspace with custom built-in office systems. Integrated desks, file storage, display shelving, and cable management designed for productivity.',
    designOptions: [
      {
        title: 'Wall Unit System',
        description: 'Floor-to-ceiling storage with integrated desk',
        image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=90'
      },
      {
        title: 'L-Shaped Workspace',
        description: 'Corner desk with overhead and base cabinets',
        image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=90'
      },
      {
        title: 'Dual Workstation',
        description: 'Side-by-side desks for couples or collaborative work',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=90'
      }
    ],
    materials: ['Durable Melamine or HPL', 'Wood Veneer for Executive Look', 'Acrylic for Modern Offices'],
    features: [
      {
        icon: 'MonitorSpeaker',
        title: 'Remote Work Optimized',
        description: 'Ergonomic desk heights, video call-friendly backgrounds, proper lighting placement.'
      },
      {
        icon: 'Cable',
        title: 'Cable Management',
        description: 'Built-in raceways, grommet holes, charging stations, monitor mounts with wire concealment.'
      },
      {
        icon: 'FolderOpen',
        title: 'Organized Storage',
        description: 'File drawers (legal/letter), printer cabinets, supply organization, document shelving.'
      },
      {
        icon: 'BookOpen',
        title: 'Display & Shelving',
        description: 'Open shelves for books and awards. Perfect Zoom backgrounds.'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Workspace Analysis',
        description: 'We assess your work style, equipment, and storage needs.',
        duration: '1 hour'
      },
      {
        step: 2,
        title: 'Ergonomic Design',
        description: 'Custom desk height, monitor placement, and storage layout for productivity.',
        duration: '3-5 days'
      },
      {
        step: 3,
        title: 'Manufacturing',
        description: 'Built-in desk, cabinets, and shelving fabricated as one integrated system.',
        duration: '2-3 weeks'
      },
      {
        step: 4,
        title: 'Installation Support',
        description: 'Delivered with mounting hardware and electrical/cable plans.',
        duration: '1 day'
      }
    ],
    pricingGuide: [
      {
        level: 'Basic Setup',
        range: '$2,000-$4,000',
        features: ['Simple desk + overhead cabinet', 'File drawer', 'Basic shelving']
      },
      {
        level: 'Complete Office',
        range: '$4,000-$8,000',
        features: ['L-shaped or U-shaped desk', 'Wall units', 'Cable management', 'Multiple storage zones'],
        popular: true
      },
      {
        level: 'Executive Suite',
        range: '$8,000-$15,000+',
        features: ['Floor-to-ceiling built-ins', 'Premium finishes', 'Integrated lighting', 'Display features']
      }
    ],
    faqs: [
      {
        question: 'What\'s the ideal desk height for a home office?',
        answer: 'Standard desk height is 29-30" but we customize based on your height. For standing desks, we design at 42-48". We can also integrate height-adjustable mechanisms.'
      },
      {
        question: 'Can you integrate my existing desk or furniture?',
        answer: 'Yes! We often build cabinets and shelving around existing desks or incorporate heirloom pieces into the design.'
      }
    ],
    relatedProjects: [],
    relatedServices: ['murphy-beds', 'entertainment-centers'],
    houstonAngle:
      'Houston\'s remote work boom demands professional home offices. Our built-ins create Zoom-ready backgrounds while maximizing productivity.'
  },

  {
    slug: 'garage-cabinets',
    name: 'Garage Cabinets',
    metaTitle: 'Garage Storage Cabinets Houston | Organization Systems | YuDezign',
    metaDescription:
      'Custom garage cabinets Houston. Heavy-duty storage, floating design for flood protection. Workbench integration. Durable melamine construction.',
    keywords: [
      'garage storage cabinets houston',
      'garage organization houston',
      'custom garage cabinets',
      'garage workbench cabinets'
    ],
    heroImage: 'https://images.unsplash.com/photo-1558618666-f76a99d0b0b6?w=1920&q=90',
    icon: 'Wrench',
    overview:
      'Heavy-duty garage storage designed for Houston. Floating cabinets protect against flooding, durable finishes withstand temperature swings, integrated workbenches for projects.',
    designOptions: [
      {
        title: 'Wall Storage System',
        description: 'Floating cabinets 6" off floor, tool organization',
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=90'
      },
      {
        title: 'Workbench Integration',
        description: 'Built-in work surface with overhead and base cabinets',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=90'
      },
      {
        title: 'Full Garage Makeover',
        description: 'Wall-to-wall organization with specialty storage',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=90'
      }
    ],
    materials: ['Heavy-Duty Melamine (most cost-effective)', 'HPL for Extra Durability', 'Metal Accents and Reinforcements'],
    features: [
      {
        icon: 'Droplets',
        title: 'Floating Design (6" Off Floor)',
        description: 'Houston garages are prone to flooding. Our cabinets mount 6 inches off the floor for easy hosing and water protection.'
      },
      {
        icon: 'Hammer',
        title: 'Heavy-Duty Construction',
        description: 'Thicker materials for tool storage, reinforced shelves for paint cans and heavy items.'
      },
      {
        icon: 'Sun',
        title: 'Temperature Resistant',
        description: 'Sealed finishes withstand garage temperature fluctuations and humidity.'
      },
      {
        icon: 'Tool',
        title: 'Workbench Options',
        description: 'Integrated work surfaces with pegboard, power outlets, task lighting.'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Garage Assessment',
        description: 'Measure space, assess storage needs (tools, sports, seasonal, garden).',
        duration: '1 hour'
      },
      {
        step: 2,
        title: 'Layout Design',
        description: 'Wall system layout with workbench location and specialty storage.',
        duration: '3-5 days'
      },
      {
        step: 3,
        title: 'Manufacturing',
        description: 'Heavy-duty construction with wall-mounting systems.',
        duration: '2-3 weeks'
      },
      {
        step: 4,
        title: 'DIY-Friendly Delivery',
        description: 'Delivered with mounting hardware and installation guide.',
        duration: '1 day'
      }
    ],
    pricingGuide: [
      {
        level: 'Basic Storage',
        range: '$1,500-$3,000',
        features: ['8-12 linear feet', 'Wall cabinets only', 'Melamine finish', 'Basic organization']
      },
      {
        level: 'Complete System',
        range: '$3,000-$6,000',
        features: ['12-20 linear feet', 'Base + wall cabinets', 'Workbench area', 'Tool organization'],
        popular: true
      },
      {
        level: 'Full Garage Makeover',
        range: '$6,000-$12,000+',
        features: ['20+ linear feet', 'Wall-to-wall coverage', 'Multiple workstations', 'Specialty storage']
      }
    ],
    faqs: [
      {
        question: 'Why do you recommend floating garage cabinets?',
        answer: 'Houston garages flood. Mounting cabinets 6 inches off the floor allows you to hose down your garage floor without damaging cabinets. It also prevents water damage and makes it harder for pests to nest underneath.'
      },
      {
        question: 'What material is best for garage cabinets?',
        answer: 'Melamine (TFL) is ideal - cost-effective, scratch-resistant, and sealed edges resist moisture. It\'s tougher than the particle board used in big-box garage systems and a fraction of the cost of stainless steel.'
      }
    ],
    relatedProjects: [],
    relatedServices: ['laundry-room-cabinets', 'mudroom-storage'],
    houstonAngle:
      'Houston garages face flooding and extreme heat. Our floating cabinet design (6" off floor) protects against water damage while sealed finishes withstand temperature swings.'
  },

  {
    slug: 'murphy-beds',
    name: 'Murphy Beds',
    metaTitle: 'Murphy Bed Cabinets Houston | Wall Bed Systems | YuDezign',
    metaDescription:
      'Custom Murphy bed cabinets Houston. Wall bed with surrounding storage. Guest rooms, home offices, studios. Space-saving solutions.',
    keywords: [
      'murphy bed cabinets houston',
      'wall bed houston',
      'murphy bed with cabinets',
      'guest room murphy bed'
    ],
    heroImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=90',
    icon: 'Bed',
    overview:
      'Transform spare rooms into dual-purpose spaces with Murphy bed systems. Custom surrounding cabinetry provides storage while the bed folds away to create a home office, craft room, or playroom during the day.',
    designOptions: [
      {
        title: 'Office by Day, Bedroom by Night',
        description: 'Desk and shelving that work with bed down',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=90'
      },
      {
        title: 'Hidden Bed System',
        description: 'Bed concealed behind cabinet doors, looks like wall unit',
        image: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&q=90'
      },
      {
        title: 'With Wardrobe Storage',
        description: 'Flanking wardrobes for guest clothing storage',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=90'
      }
    ],
    materials: ['Durable Melamine or HPL', 'Heavy-Duty Hardware', 'Quality Bed Mechanisms'],
    features: [
      {
        icon: 'Home',
        title: 'Dual-Purpose Rooms',
        description: 'Guest bedroom when needed, home office or craft room the rest of the time.'
      },
      {
        icon: 'Minimize2',
        title: 'Space Saving',
        description: 'Reclaim 50+ square feet when bed is up. Perfect for Houston townhomes and condos.'
      },
      {
        icon: 'Shield',
        title: 'Safety Features',
        description: 'Piston lifts, safety straps, locking mechanisms. Easy one-person operation.'
      },
      {
        icon: 'Box',
        title: 'Surrounding Storage',
        description: 'Shelving, wardrobes, desks integrated with the bed system.'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Room Planning',
        description: 'Measure room, discuss primary and secondary uses (office + guest, craft + guest, etc.).',
        duration: '1 hour'
      },
      {
        step: 2,
        title: 'Design Integration',
        description: 'Design cabinets around bed mechanism, ensure clearances and functionality.',
        duration: '3-5 days'
      },
      {
        step: 3,
        title: 'Manufacturing',
        description: 'Cabinets built to integrate with bed hardware.',
        duration: '2-3 weeks'
      },
      {
        step: 4,
        title: 'Bed Mechanism',
        description: 'We provide cabinet system, you order bed mechanism separately or we can coordinate.',
        duration: 'Varies'
      }
    ],
    pricingGuide: [
      {
        level: 'Basic Murphy Bed Surround',
        range: '$3,000-$5,000',
        features: ['Simple flanking cabinets', 'Shelving only', 'Bed hardware not included']
      },
      {
        level: 'Complete System',
        range: '$5,000-$8,000',
        features: ['Full wall unit', 'Desk or wardrobe integration', 'Premium finishes', 'Bed hardware coordination'],
        popular: true
      },
      {
        level: 'Luxury Suite',
        range: '$8,000-$15,000+',
        features: ['Floor-to-ceiling built-ins', 'TV integration', 'Hidden bed design', 'Custom features']
      }
    ],
    faqs: [
      {
        question: 'Do you supply the Murphy bed mechanism?',
        answer: 'We build the cabinet surround system. You can order the bed mechanism (mattress platform and pistons) from suppliers like Murphy Bed Depot, or we can coordinate the order for you. Most mechanisms cost $1,000-$2,000.'
      },
      {
        question: 'What mattress sizes do Murphy beds accommodate?',
        answer: 'Most common are Twin (39"x75"), Full (54"x75"), and Queen (60"x80"). We design the surround to fit your chosen size. Queen is most popular for guest rooms.'
      }
    ],
    relatedProjects: [],
    relatedServices: ['home-office-cabinets', 'closet-systems'],
    houstonAngle:
      'Houston\'s smaller urban homes and townhomes benefit from Murphy beds. Convert guest rooms into functional daily spaces without sacrificing overnight guest capability.'
  },

  {
    slug: 'entertainment-centers',
    name: 'Entertainment Centers',
    metaTitle: 'Custom Entertainment Centers Houston | Media Wall Cabinets | YuDezign',
    metaDescription:
      'Custom entertainment centers Houston. Media walls, TV cabinets, AV equipment storage. Cable management, floating designs. Modern European style.',
    keywords: [
      'custom entertainment centers houston',
      'media wall cabinets',
      'tv wall unit houston',
      'entertainment cabinet houston'
    ],
    heroImage: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1920&q=90',
    icon: 'Tv',
    overview:
      'Modern entertainment centers with clean cable management and AV equipment storage. Floating shelves, hidden wire raceways, and speaker integration for a sophisticated media experience.',
    designOptions: [
      {
        title: 'Floating Media Wall',
        description: 'Minimalist wall-mounted cabinets with TV center stage',
        image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=90'
      },
      {
        title: 'Full Wall Unit',
        description: 'Floor-to-ceiling storage with integrated TV niche',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=90'
      },
      {
        title: 'Fireplace Integration',
        description: 'TV above fireplace with flanking cabinets',
        image: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&q=90'
      }
    ],
    materials: ['Acrylic for Modern Look', 'Laminate for Budget-Friendly', 'Wood Veneer for Warmth'],
    features: [
      {
        icon: 'Cable',
        title: 'Hidden Wire Management',
        description: 'Built-in raceways route cables invisibly. No exposed wires for clean modern aesthetic.'
      },
      {
        icon: 'Tv2',
        title: 'AV Equipment Storage',
        description: 'Ventilated cabinets for receivers, gaming consoles, sound bars. Remote-friendly doors.'
      },
      {
        icon: 'Lightbulb',
        title: 'Display Lighting',
        description: 'LED strips for shelves, puck lights for collectibles, ambient backlighting.'
      },
      {
        icon: 'Speaker',
        title: 'Speaker Integration',
        description: 'Grille panels for hidden speakers, soundbar shelves, subwoofer cabinets.'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Media Assessment',
        description: 'TV size, equipment list, cable/streaming setup, speaker preferences.',
        duration: '1 hour'
      },
      {
        step: 2,
        title: 'Design Layout',
        description: 'TV placement, equipment zones, wire routing, aesthetic styling.',
        duration: '3-5 days'
      },
      {
        step: 3,
        title: 'Manufacturing',
        description: 'Cabinets with integrated wire management and ventilation.',
        duration: '2-3 weeks'
      },
      {
        step: 4,
        title: 'Installation Support',
        description: 'Delivered with mounting hardware and electrical plans.',
        duration: '1 day'
      }
    ],
    pricingGuide: [
      {
        level: 'Simple TV Console',
        range: '$1,500-$3,000',
        features: ['Basic media cabinet', '60-72" wide', 'Simple storage', 'Melamine finish']
      },
      {
        level: 'Media Wall',
        range: '$3,000-$7,000',
        features: ['Floating cabinets', 'Wire management', 'Display lighting', 'Premium finishes'],
        popular: true
      },
      {
        level: 'Full Entertainment Suite',
        range: '$7,000-$15,000+',
        features: ['Floor-to-ceiling', 'Fireplace integration', 'Acoustic panels', 'Premium features']
      }
    ],
    faqs: [
      {
        question: 'How do you hide cables in entertainment centers?',
        answer: 'We build vertical and horizontal wire chases (raceways) inside the cabinets. Cables route from equipment to TV completely hidden. We provide access panels for future changes.'
      },
      {
        question: 'What TV sizes do entertainment centers accommodate?',
        answer: 'We custom-size for your TV. Most common: 55", 65", 75". We design the unit based on your current TV but allow flexibility for future upgrades.'
      }
    ],
    relatedProjects: [],
    relatedServices: ['home-office-cabinets', 'living-room-storage'],
    houstonAngle:
      'Houston media rooms need smart ventilation. Our entertainment centers include ventilated equipment cabinets to prevent heat buildup in closed cabinets.'
  },

  {
    slug: 'laundry-room-cabinets',
    name: 'Laundry Room Cabinets',
    metaTitle: 'Laundry Room Cabinets Houston | Utility Storage | YuDezign',
    metaDescription:
      'Custom laundry room cabinets Houston. Utility storage, hanging solutions, countertop folding space. Moisture-resistant construction.',
    keywords: [
      'laundry room cabinets houston',
      'laundry room storage',
      'custom laundry cabinets',
      'utility room cabinets'
    ],
    heroImage: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=1920&q=90',
    icon: 'Shirt',
    overview:
      'Maximize your laundry room with custom storage for detergents, cleaning supplies, and hanging solutions. Countertops over machines for folding, pull-out hampers, and multi-function mudroom integration.',
    designOptions: [
      {
        title: 'Over Washer/Dryer',
        description: 'Upper cabinets with hanging rod, side cabinets',
        image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&q=90'
      },
      {
        title: 'Mudroom Integration',
        description: 'Laundry + mudroom storage, bench, hooks, cubbies',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=90'
      },
      {
        title: 'Utility Closet',
        description: 'Stacked machines with full-height storage',
        image: 'https://images.unsplash.com/photo-1558618666-f76a99d0b0b6?w=800&q=90'
      }
    ],
    materials: ['Moisture-Resistant Melamine', 'HPL for Durability', 'Sealed Edges'],
    features: [
      {
        icon: 'ShoppingBag',
        title: 'Utility Storage',
        description: 'Detergent bottles, cleaning supplies, ironing boards, vacuum storage.'
      },
      {
        icon: 'Wind',
        title: 'Hanging Solutions',
        description: 'Pull-out drying racks, permanent hanging rods, retractable lines.'
      },
      {
        icon: 'Layers',
        title: 'Folding Workspace',
        description: 'Countertop over washer/dryer for folding clothes and sorting.'
      },
      {
        icon: 'Home',
        title: 'Multi-Function Design',
        description: 'Pet feeding stations, package drop zones, shoe storage, coat hooks.'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Space Planning',
        description: 'Measure machines, assess storage needs (cleaning, linens, shoes, pets, etc.).',
        duration: '30 min'
      },
      {
        step: 2,
        title: 'Layout Design',
        description: 'Cabinet arrangement around machines, hanging zones, countertop workspace.',
        duration: '2-3 days'
      },
      {
        step: 3,
        title: 'Manufacturing',
        description: 'Moisture-resistant materials, custom sizing around machines.',
        duration: '2-3 weeks'
      },
      {
        step: 4,
        title: 'Installation Ready',
        description: 'Delivered with mounting hardware and assembly guide.',
        duration: '1 day'
      }
    ],
    pricingGuide: [
      {
        level: 'Basic Laundry Storage',
        range: '$800-$1,500',
        features: ['Upper cabinets only', '6-8 linear feet', 'Basic storage']
      },
      {
        level: 'Complete Laundry Room',
        range: '$1,500-$4,000',
        features: ['Upper + base cabinets', 'Countertop workspace', 'Hanging rod', 'Pull-out features'],
        popular: true
      },
      {
        level: 'Mudroom Integration',
        range: '$4,000-$8,000+',
        features: ['Full room solution', 'Bench seating', 'Cubbies and hooks', 'Pet station']
      }
    ],
    faqs: [
      {
        question: 'Can you build around my existing washer and dryer?',
        answer: 'Absolutely. Bring us your machine model numbers and we\'ll design cabinets that fit perfectly around them with proper clearances for doors and venting.'
      },
      {
        question: 'What if I upgrade my machines later?',
        answer: 'We design with standard appliance sizes in mind (27" or 29" wide). Most machines within the same width category will fit. If you plan to upgrade, let us know and we can add extra space.'
      }
    ],
    relatedProjects: [],
    relatedServices: ['garage-cabinets', 'mudroom-storage'],
    houstonAngle:
      'Houston laundry rooms double as mudrooms. Our multi-function designs integrate coat hooks, shoe storage, and pet feeding stations.'
  }
];

// Helper functions
export const getServiceBySlug = (slug: string): ServiceData | undefined => {
  return services.find(svc => svc.slug === slug);
};

export const getAllServiceSlugs = (): string[] => {
  return services.map(svc => svc.slug);
};

export const getRelatedServices = (slug: string): ServiceData[] => {
  const service = getServiceBySlug(slug);
  if (!service || !service.relatedServices) return [];

  return service.relatedServices
    .map(relatedSlug => getServiceBySlug(relatedSlug))
    .filter((svc): svc is ServiceData => svc !== undefined);
};

// Get services by category for navigation
export const getFeaturedServices = (): ServiceData[] => {
  return services.slice(0, 4); // Kitchen, Closets, Bathrooms, Home Office
};
