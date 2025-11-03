import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Modern Houston Kitchen',
    category: 'kitchens',
    images: [
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
      'https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400',
    location: 'Memorial, Houston',
    finish: 'White Matte Melamine',
    cabinetStyle: 'Frameless European',
    features: ['Soft-close hinges', 'Pull-out spice racks', 'Built-in appliance garage'],
    turnaroundTime: '2 weeks',
    description: 'A stunning modern kitchen featuring clean lines and maximized storage.',
  },
  {
    id: '3',
    title: 'Contemporary Bathroom Vanity',
    category: 'vanities',
    images: [
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800',
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400',
    location: 'Heights, Houston',
    finish: 'Grey Laminate',
    cabinetStyle: 'Frameless European',
    features: ['Dual sinks', 'Soft-close drawers', 'Built-in electrical outlets'],
    turnaroundTime: '2 weeks',
    description: 'A sleek double vanity with ample storage and modern aesthetics.',
  },
  {
    id: '5',
    title: 'Elegant Dark Kitchen',
    category: 'kitchens',
    images: [
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800',
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400',
    location: 'Sugar Land',
    finish: 'Charcoal Acrylic High Gloss',
    cabinetStyle: 'Frameless European',
    features: ['Touch-to-open drawers', 'Integrated LED lighting', 'Custom pantry organization'],
    turnaroundTime: '2 weeks',
    description: 'A sophisticated dark kitchen with high-gloss finishes and modern hardware.',
  },
  {
    id: '7',
    title: 'Corporate Office Breakroom',
    category: 'commercial',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
    location: 'Downtown Houston',
    finish: 'Grey Laminate with White Accents',
    cabinetStyle: 'Frameless European',
    features: ['Commercial-grade hardware', 'ADA compliant', 'Heavy-duty soft-close', 'Antimicrobial finish'],
    turnaroundTime: '4 weeks',
    description: 'Modern breakroom cabinetry for a 200-person corporate office with durability and style.',
  },
  {
    id: '8',
    title: 'Medical Office Storage',
    category: 'commercial',
    images: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400',
    location: 'Medical Center, Houston',
    finish: 'White High-Pressure Laminate',
    cabinetStyle: 'Frameless European',
    features: ['Medical-grade materials', 'Easy-clean surfaces', 'Lockable storage', 'Custom organizational inserts'],
    turnaroundTime: '3 weeks',
    description: 'Hygienic, functional storage solutions for a busy medical practice.',
  },
  {
    id: '9',
    title: 'Restaurant Kitchen Cabinets',
    category: 'commercial',
    images: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
    location: 'Montrose, Houston',
    finish: 'Stainless Steel with HPL Interior',
    cabinetStyle: 'Frameless European',
    features: ['NSF certified', 'Waterproof construction', 'Heavy-duty hinges', 'Easy maintenance'],
    turnaroundTime: '5 weeks',
    description: 'Commercial-grade kitchen storage for a high-volume restaurant operation.',
  },
  {
    id: '10',
    title: 'Retail Store Display Cabinets',
    category: 'commercial',
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
    location: 'Galleria Area, Houston',
    finish: 'Black Acrylic with Glass Doors',
    cabinetStyle: 'Frameless European',
    features: ['LED integrated lighting', 'Glass display doors', 'Adjustable shelving', 'Lock system'],
    turnaroundTime: '4 weeks',
    description: 'Sleek display cabinets for an upscale retail boutique showcasing luxury products.',
  },
  {
    id: 'proj_1762138818256_imgmx1efp',
    title: 'Test',
    category: 'kitchens',
    images: [
      'https://asearepsd4iqjdj2.public.blob.vercel-storage.com/1762138600262-Image_20250109204739.jpg'
    ],
    thumbnail: 'https://asearepsd4iqjdj2.public.blob.vercel-storage.com/1762138600262-Image_20250109204739.jpg',
    
    finish: 'White Gloss',
    cabinetStyle: 'Frameless European',
    features: ['Soft-close hinges'],
    turnaroundTime: '2 weeks',
    description: 'sample forproject',
  },
  {
    id: 'proj_1762210660767_vdveltc0r',
    title: 'Dining Room Cabinet',
    category: 'custom',
    images: [
      'https://owcahjzz8kidiuwp.public.blob.vercel-storage.com/1762210646930-Dining%20Room.jpg'
    ],
    thumbnail: 'https://owcahjzz8kidiuwp.public.blob.vercel-storage.com/1762210646930-Dining%20Room.jpg',
    location: 'Houston',
    finish: 'Matte White and Dark Grey',
    cabinetStyle: 'Frameless European',
    features: ['Soft Touch Finish', 'J-Pull Handles', 'Custom Made'],
    turnaroundTime: '3 weeks',
    description: 'Modern two-tone dining room storage wall featuring sleek charcoal gray and crisp white frameless cabinets. Custom-built to maximize wall space with integrated J-pull handles for a seamless, contemporary look. The design includes upper display cabinets, open shelving for decor, a central serving area with floating shelves, and ample lower storage with soft-close drawers.',
  },
  {
    id: 'proj_1762210921334_53gbli33o',
    title: 'Mud Room Cabinet',
    category: 'custom',
    images: [
      'https://owcahjzz8kidiuwp.public.blob.vercel-storage.com/1762210910064-Mudroom.jpg'
    ],
    thumbnail: 'https://owcahjzz8kidiuwp.public.blob.vercel-storage.com/1762210910064-Mudroom.jpg',
    location: 'Houston',
    finish: 'Matte White and Dark Grey',
    cabinetStyle: 'Frameless European',
    features: ['Soft Touch Finish', 'J-Pull Handles', 'Custom Made'],
    turnaroundTime: '3 weeks',
    description: 'Custom mudroom featuring sleek light gray frameless cabinets with contrasting black accents. The design includes a striking black slat wall panel for hanging accessories, a floating bench with integrated LED underlighting, and floor-to-ceiling storage maximizing every inch. Upper cabinets provide seasonal storage while lower units offer everyday access.',
  },
  {
    id: 'proj_1762211111126_5yq7k83lo',
    title: 'Stand Alone Closet',
    category: 'closets',
    images: [
      'https://owcahjzz8kidiuwp.public.blob.vercel-storage.com/1762211036262-53c1bf77dd4e7681eb59bf878d200cf.jpg',
      'https://owcahjzz8kidiuwp.public.blob.vercel-storage.com/1762211047922-e7a80490d1b6f97972585e011450bfb.jpg'
    ],
    thumbnail: 'https://owcahjzz8kidiuwp.public.blob.vercel-storage.com/1762211036262-53c1bf77dd4e7681eb59bf878d200cf.jpg',
    location: 'Houston',
    finish: 'Cashmere',
    cabinetStyle: 'Frameless European',
    features: ['Soft Touch Finish', 'Shoe Drawers', 'Removable Shelves'],
    turnaroundTime: '1 week',
    description: 'Elegant walk-in closet system in a sophisticated matte cashmere finish with brass hardware accents. Custom-configured with dual-height hanging rods, a central tower featuring soft-close drawers and cabinet doors, plus adjustable open shelving for accessories. The frameless European-style construction maximizes storage efficiency while the warm cashmere tone and metallic hardware create a luxurious, boutique-inspired space. ',
  }
];
