import type { StrategyContent } from './types.js';

/**
 * Market and targeting — transcribed from 20_PLAYBOOK/SALES-STRATEGY.md.
 *
 * One caution carried over from the source: the June 2026 Builder Strategy deck
 * is where the market and targeting numbers come from, but it is NOT a source
 * for hardware, finish count or deposit — it contradicts the 2026 spec of record
 * on all three, and the Answer Key overrides it.
 */

export const strategy: StrategyContent = {
  whatWeAre: {
    id: 'what-we-are',
    title: 'What we are',
    summary: 'A manufacturer, not a dealer. Building cabinetry in Houston since 2007.',
    sections: [
      {
        paragraphs: [
          'We run our own plant on Colfax Street in Houston, our own machines, our own design software.',
          "That single fact is the strategy. Almost everyone you compete against is reselling somebody else's box — imported, warehoused, marked up, and three weeks from a replacement door. You are selling the shop itself.",
        ],
        callout:
          '"No ocean freight, no port delays, no distributor between you and the shop that builds your cabinets."',
      },
    ],
  },

  lanes: [
    {
      id: 'lane-dealers',
      lane: 'Cabinet dealers / resellers',
      who: 'Trade accounts across Houston',
      typicalSize: 'Recurring',
      note: 'Steady repeat volume. B2B — they resell to their own customers',
    },
    {
      id: 'lane-builders',
      lane: 'Builders & developers',
      who: 'Texas Gold, Rountree, Galloway, Westin, SGA',
      typicalSize: '$27K–$32K a home',
      note: 'Where the growth is',
    },
    {
      id: 'lane-designers',
      lane: 'Designers, remodelers, GCs',
      who: 'The long tail',
      typicalSize: '$5K–$15K',
      note: 'Volume of relationships, smaller tickets',
    },
    {
      id: 'lane-homeowners',
      lane: 'Homeowners direct',
      who: 'Showroom and referral',
      typicalSize: '$3K–$10K',
      note: 'Closets, vanities, one-off kitchens',
    },
    {
      id: 'lane-commercial',
      lane: 'Commercial',
      who: 'Medical, hospitality, townhomes',
      typicalSize: '$14K–$43K',
      note: 'Voss Medical $14.3K · Internal Medicine Bldg 7 $43K cabinetry',
    },
  ],

  anchors: [
    {
      id: 'anchor-pebble-bend',
      label: 'A single custom home — 2028 Pebble Bend, 62 cabinets',
      value: '$31,880',
    },
    { id: 'anchor-closet', label: 'A closet package for a contractor', value: '~$22,800' },
    {
      id: 'anchor-townhomes',
      label: 'Largest opportunity quoted — 54 townhome units, 1,188 cabinets',
      value: '~$325,000',
      caution:
        'NOT WON. Still open. A scale anchor, not a reference — never present it as a completed project. Citing an unwon job as a reference is the fastest way to lose a deal you were winning, because buyers check.',
    },
  ],

  targetMix: 'Builders and developers 70% · remodel 20% · custom and luxury 10%',
  targetMixWhy:
    'A deliberate move away from where the revenue has historically come from. Custom homeowners are pleasant, profitable and slow — one kitchen, one relationship, one order. A builder is one relationship and forty kitchens.',

  bulkLanes: [
    {
      id: 'bulk-1',
      rank: 1,
      category: 'Apartment value-add renovation',
      valuePerWin: '$250K–$600K per complex',
      why: "Start here. Owner is renovating occupied units, wants consistency and schedule, doesn't need custom",
    },
    {
      id: 'bulk-2',
      rank: 2,
      category: 'Build-to-rent communities',
      valuePerWin: '$400K–$1M',
      why: 'Houston is a top-5 US BTR market, ~3,000 units under construction',
    },
    {
      id: 'bulk-3',
      rank: 3,
      category: 'New-home builders & master-planned',
      valuePerWin: '$250K–$800K/yr',
      why: 'The most volume. Houston is the #1 US metro for master-planned communities; 75,786 permitted units in 2025',
    },
    {
      id: 'bulk-4',
      rank: 4,
      category: 'Custom & luxury + designers',
      valuePerWin: '$12K–$25K a home',
      why: 'Highest margin, lowest volume. Worth keeping, not worth chasing',
    },
    {
      id: 'bulk-5',
      rank: 5,
      category: 'Student housing',
      valuePerWin: '$1M+',
      why: "A cultivated whale. Long cycle. Don't build a month around it",
    },
  ],

  skipped:
    'Brand-new apartment construction, deliberately. The general contractors are national, the specs are locked years out, and we would be a line item to a purchasing department that has never heard of us.',

  territory:
    'Roughly ninety minutes\' drive of the plant at 5802 Colfax St, Houston. Delivery is $350 a trip inside Greater Houston, and a job outside the radius quietly eats its own margin in freight and site visits. Outside 90 minutes, qualify hard before you spend a day on it — and raise it with the office before you commit.',

  buyers: [
    {
      id: 'buyer-apartment',
      buyer: 'Apartment owner / asset manager',
      caresAbout:
        'Cost per unit, schedule certainty, consistency across 200 doors, minimum disruption to occupied units',
      leadWith: '"We can hold one spec across every unit and phase deliveries to your turn schedule."',
      doesNotCareAbout: 'Finishes. Design. Renderings',
    },
    {
      id: 'buyer-builder',
      buyer: 'Builder / developer',
      caresAbout:
        "Price per plan, spec consistency, no surprises, a supplier who doesn't blow a closing date",
      leadWith: '"One local source from your model home to your final phase, with volume pricing."',
      doesNotCareAbout: 'Bespoke anything',
    },
    {
      id: 'buyer-gc',
      buyer: 'GC / remodeler',
      caresAbout: 'Speed, responsiveness, not being left holding a problem',
      leadWith:
        '"Replacement parts and doors come from the same building, and you\'ll have my phone number."',
      doesNotCareAbout: 'Corporate story',
    },
    {
      id: 'buyer-designer',
      buyer: 'Designer',
      caresAbout: 'That it looks right, and that you make her look good to her client',
      leadWith: '"Over thirty finishes, made to measure, and lifelike 3D your client can sign off on."',
      doesNotCareAbout: 'Freight logistics',
    },
    {
      id: 'buyer-homeowner',
      buyer: 'Homeowner',
      caresAbout: 'Trust, and not being ripped off',
      leadWith: '"Come see the plant. We build it here."',
      doesNotCareAbout: 'Volume pricing',
    },
    {
      id: 'buyer-dealer',
      buyer: 'Dealer',
      caresAbout: 'Margin, lead time, ease of reorder',
      leadWith: '"Pricing sheets organised by finish, so you can price a job in minutes."',
      doesNotCareAbout: 'Our brand story',
    },
    {
      id: 'buyer-commercial',
      buyer: 'Commercial',
      caresAbout: 'Compliance, phasing, documentation',
      leadWith: '"ADA-compliant casework, phased rollout, drawings your trades can build from."',
      doesNotCareAbout: 'Anything residential',
    },
  ],

  leadSources: [
    {
      id: 'src-hbe',
      source: 'Houston Builders Expo, Aug 11–12',
      whatsThere: '6–10K pre-registered buyers; 85% with purchasing power. Target 75 leads, 100 in a good show',
      state: 'Your single biggest input this year',
    },
    {
      id: 'src-ghba',
      source: 'GHBA member list',
      whatsThere:
        '914 companies — 396 custom-home builders, 223 remodelers, 192 single-family, 50 GCs, 42 multi-family, 8 build-to-rent',
      state: 'Loaded into Call-List-HOU-2026.xlsx',
    },
    {
      id: 'src-remodelers',
      source: 'Houston remodelers & contractors',
      whatsThere: '~1,160 companies with verified emails',
      state: 'Available',
    },
    {
      id: 'src-apartments',
      source: 'Apartment owners',
      whatsThere: 'Nothing existed. We built Apartment-Owner-Targets.xlsx',
      state: 'The highest-value prospecting work available',
    },
    {
      id: 'src-group',
      source: 'Existing group accounts',
      whatsThere: '~775 UFS dealer accounts; 278 Houston accounts with a rep already assigned',
      state: 'Cross-sell',
    },
    {
      id: 'src-showroom',
      source: 'The showroom',
      whatsThere: '13366 Murphy Rd, opening August',
      state: 'Walk-ins',
    },
  ],

  constraint: {
    id: 'the-constraint',
    title: 'The constraint you must respect',
    summary: 'The plant runs about 500 cabinets a month for standard, replicable work — 25 a day over 20 days.',
    sections: [
      {
        paragraphs: [
          '$100K a month is roughly 300 to 405 cabinets depending on mix. That is 60–80% of the entire plant — and the plant also has to feed existing accounts and commercial work that has nothing to do with you.',
        ],
      },
      {
        heading: 'Two rules, and they are not negotiable',
        bullets: [
          'Anything over 250 cabinets gets a plant-load check before you say a delivery date out loud. Not after the quote. Before the sentence.',
          'A 54-unit job is one and a half to two months of the entire plant. Winning one is a company-level event, not a personal one. Raise it the moment it looks real, not when it closes.',
        ],
        callout:
          'Selling more than we can build is worse than selling nothing. It costs the relationship and the next three.',
      },
    ],
  },

  crossSell: {
    id: 'cross-sell',
    title: 'The cross-sell',
    summary: 'Every company in the group is a way into an account for the others.',
    sections: [
      {
        bullets: [
          'Their commercial job → we add cabinets and casework.',
          'Our builder → we bring flooring, lighting, the full interior package.',
        ],
        callout:
          'The proof: Internal Medicine Building 7 was $42,999 of YuDeZign cabinetry plus $11,983 of UFS — about $55K on one relationship.',
      },
      {
        heading: 'Voxaura lighting is a genuine second product, not an accessory',
        paragraphs: [
          '24V, cut-to-length, tunable white, app and Matter control, UL-listed drivers. It sells on its own design and its own packaged solution.',
          'If a customer is doing closets or a display kitchen, lighting is a natural second conversation — and it is a second order on the same trip.',
        ],
      },
    ],
  },

  notDoing: {
    id: 'not-doing',
    title: 'Three things we are not doing',
    sections: [
      {
        heading: 'We are not discounting to win',
        paragraphs: [
          "You have no discount authority for the first 90 days. Every request routes through the office. A rep who wins on price teaches the market what we're worth.",
        ],
      },
      {
        heading: "We are not promising dates we can't hold",
        paragraphs: [
          "See the never-say list. Half of this industry's reputation problems are lead times somebody invented to close a deal on a Friday.",
        ],
      },
      {
        heading: 'We are not chasing everything',
        paragraphs: [
          'Outside the 90-minute radius, outside the five categories, or under about $3,000 — qualify it hard. Your time is the scarce resource, not our capacity to quote.',
        ],
      },
    ],
  },

  sixMonths:
    'August is train, exhibit, and triage — you will not book much and that is expected. September you turn the engine on and the show leads convert. October is the month that matters: land at least one signed builder or multi-family award. November you prove it repeats — the second order from an August customer is worth more strategically than the first one from anybody. December you close, you collect, and you build the 2027 list.',
};

/** The honest problem, called out so it is not discovered in October. */
export const leadSourceCaveat =
  'Read the GHBA numbers again. The list we can dial tomorrow is 396 custom-home builders and only 8 build-to-rent — the exact inverse of the priority order. Aug–September outbound will be custom and remodel-heavy, and that is fine; those are real customers and they pay.';
