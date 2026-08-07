import type { Objection, Pitch, QualifyingQuestion } from './types.js';

/**
 * The words — transcribed from 20_PLAYBOOK/WHAT-TO-SAY.md.
 *
 * Every claim here is lifted from copy that is already approved and already in
 * print. A rep is not inventing a pitch, they are learning one — so these
 * strings are verbatim and should not be "improved" for tone.
 *
 * Three objections are tagged `isBait`. Those are the ones that fish for a
 * never-say answer (lead time, deposit, warranty) and they are where reps get
 * caught, so the UI flags them.
 */

export const opener = 'Are you building or renovating right now?';

export const openerNote =
  'Not a pitch. A question — because it routes the conversation in four seconds instead of forty. If they say "just looking," you have a flyer and a friendly exit, and you have spent eight seconds.';

export const pitches: Pitch[] = [
  {
    id: 'pitch-core',
    label: 'The default thirty seconds',
    audience: 'core',
    timing: 'About 25 seconds',
    script: [
      "We're YuDeZign — we manufacture frameless cabinets and closets right here in Houston, in our own plant.",
      'Three-quarter-inch plywood, soft-close standard, over thirty finishes.',
      "Because we're the actual factory, there's no importer and no distributor between you and the shop that builds your cabinets — and we can price a whole community, not just one kitchen.",
    ],
    endsOn: 'What are you working on?',
  },
  {
    id: 'pitch-builder',
    label: 'Builder / developer',
    audience: 'builder',
    script: [
      'We manufacture frameless cabinetry in Houston — our own plant, and our showroom out in Stafford.',
      'What that means for you is one local source from your model home through your final phase, volume pricing for multi-home work, and job-site delivery coordinated around your build.',
      'No ocean freight, no port delays.',
    ],
    endsOn: 'How many homes are you running this year?',
  },
  {
    id: 'pitch-contractor',
    label: 'GC / remodeler',
    audience: 'contractor',
    script: [
      'We build frameless cabinets and closets here in Houston.',
      "Three-quarter-inch plywood, soft-close standard, made to measure, so we can fit a room that isn't square instead of you filling gaps.",
      'And when you need a replacement door in month eight, it comes from the same building.',
    ],
    endsOn: 'What kind of work are you mostly doing?',
  },
  {
    id: 'pitch-homeowner',
    label: 'Homeowner',
    audience: 'homeowner',
    script: [
      'We build frameless cabinetry and closets in our own Houston shop — over thirty finishes, made to your exact measurements, and you see a photo-real 3D rendering before anything gets cut.',
      "It's not a boxed-in showroom set; it's built for your room.",
    ],
    endsOn: 'Which room are you thinking about?',
  },
  {
    id: 'pitch-commercial',
    label: 'Commercial / property',
    audience: 'commercial',
    script: [
      'We manufacture casework in Houston — kitchens, vanities including ADA, reception, and multi-unit work.',
      "Because we're the plant, we can hold one specification across two hundred units and phase deliveries to your schedule.",
    ],
    endsOn: "What's the project?",
  },
];

export const pitchRule =
  'It always ends on a question. A pitch that ends on a full stop is a pitch that ends the conversation.';

export const objectionRule =
  'The first thing you do with every one of these is ask a question back. You cannot answer an objection you have not understood, and half of them dissolve when you do.';

export const objections: Objection[] = [
  {
    id: 'obj-01',
    objection: "You're more expensive.",
    response: [
      "Send me what you're comparing to and let's line them up — box material, drawer count, slide rating, whether soft-close is standard or an upcharge.",
      "Half the time the gap isn't price, it's specification. If it's still more after that, at least you'll know what you're buying.",
    ],
    answerKeyIds: ['ak-05-06'],
  },
  {
    id: 'obj-02',
    objection: 'How fast can you get these to me?',
    isBait: true,
    response: [
      "Once the order's finalised, production runs in as little as two weeks depending on finish and scale.",
      "Your quote carries the committed date — I'd rather give you one I can hold than one that sounds good today.",
      "What's driving your date?",
    ],
    answerKeyIds: ['ak-04-01', 'ak-04-02'],
    neverSayIds: ['ns-lead-time'],
    coaching: 'Never-say bait. Seven conflicting lead times exist. The hedge is the whole answer.',
  },
  {
    id: 'obj-03',
    objection: "What's your deposit?",
    isBait: true,
    response: [
      "Terms are set in your written agreement, and I'll walk you through them line by line before you sign anything.",
      "I don't want to quote a number and have the paperwork say something different.",
    ],
    answerKeyIds: ['ak-05-01'],
    neverSayIds: ['ns-deposit'],
    coaching: 'Never-say bait. BLOCKED — say the deflection word for word, then flag it to the office.',
  },
  {
    id: 'obj-04',
    objection: "What's the warranty?",
    isBait: true,
    response: [
      "Your written warranty comes with your agreement — let me send you the current sheet so you're reading the real thing rather than my summary of it.",
    ],
    answerKeyIds: ['ak-07-01'],
    neverSayIds: ['ns-lifetime-warranty'],
    coaching:
      'Never-say bait, and the highest-priority one. Three warranty lengths exist and the newest contract contradicts our flyers.',
  },
  {
    id: 'obj-05',
    objection: 'I want solid wood shaker doors.',
    response: [
      "Then I should be straight with you — ours are machined from MDF, not solid wood.",
      "That's deliberate: MDF doesn't move with humidity, so the door won't warp or split at the joint, and it takes paint better.",
      "If solid wood is a hard requirement, I'm not your shop and I'd rather tell you now.",
    ],
    answerKeyIds: ['ak-02-05'],
    neverSayIds: ['ns-solid-wood-shaker'],
  },
  {
    id: 'obj-06',
    objection: 'My designer specified face-frame.',
    response: [
      "We can do that — I'll be straight with you about how, though.",
      'Our plant runs frameless, so the framed is a stocked line we carry rather than something we machine.',
      "If the face-frame look is the requirement, that's the route. If what she actually wants is the traditional style, our shaker in frameless gets you there and it's our own build — wider openings, more usable space in the same footprint.",
      'Worth putting both in front of her.',
    ],
    answerKeyIds: ['ak-02-02', 'ak-02-02b', 'ak-02-02c'],
    neverSayIds: ['ns-price-from-memory'],
    coaching:
      'Rewritten at Answer Key v1.2. The old answer was a flat no, which walked away from a customer we can actually serve. Never quote a framed style, finish, size or price from memory — there is no stock sheet yet.',
  },
  {
    id: 'obj-07',
    objection: 'Can you install?',
    response: [
      'We provide install support rather than installation — every panel is QR-tagged, and your installer scans it to see a 3D model of exactly where that piece goes.',
      'We coordinate delivery around their schedule.',
      "Sometimes we can arrange installation inside Greater Houston; I'd have to check capacity and price it separately, and I won't promise it and then hand you off.",
    ],
    answerKeyIds: ['ak-04-10', 'ak-04-11'],
    neverSayIds: ['ns-we-install'],
  },
  {
    id: 'obj-08',
    objection: "I've been burned by a cabinet company before.",
    response: ['Tell me what happened.'],
    coaching:
      'Then shut up and listen. Whatever they say is your entire sales strategy for this account, handed to you for free. Usually it is a missed date or a missing part — both are things being the actual factory fixes.',
  },
  {
    id: 'obj-09',
    objection: 'Just send me a price.',
    response: [
      "I can, and it'll be a guess, which doesn't help either of us.",
      "Give me twenty minutes and rough dimensions and I'll come back with a real number you can build a budget on.",
      'When suits you this week?',
    ],
    answerKeyIds: ['ak-06-01'],
    neverSayIds: ['ns-price-from-memory'],
  },
  {
    id: 'obj-10',
    objection: 'I already have a cabinet guy.',
    response: [
      'Good — you should. What do you like about working with them?',
      "I'm not asking you to switch. Put me on the next one you're pricing and see what comes back.",
    ],
    coaching:
      'Write the answer down. We have no competitive intelligence as a company — in six weeks these notes are the first honest picture we have ever had.',
    neverSayIds: ['ns-competitor-claim'],
  },
  {
    id: 'obj-11',
    objection: 'Can you do better on price?',
    response: [
      "Let me look at what's driving the number first — there's usually a smarter answer than shaving the box.",
      'Give me until tomorrow.',
    ],
    coaching: 'Then route it through the office. Discount authority sits with management, not with you.',
    answerKeyIds: ['ak-06-02'],
    neverSayIds: ['ns-dealer-tier'],
  },
  {
    id: 'obj-12',
    objection: 'Are you the ones with the flooring?',
    response: [
      'Same group, yes. UFS does flooring and building materials, Voxaura does lighting, we do cabinets and closets.',
      "If it's useful you can run one relationship instead of three.",
    ],
    answerKeyIds: ['ak-08-04'],
  },
];

export const qualifying: QualifyingQuestion[] = [
  {
    id: 'q-01',
    question: 'What are you working on right now?',
    why: 'Routes the whole conversation. Everything else depends on the answer.',
  },
  {
    id: 'q-02',
    question: "Who's doing your cabinets today, and what do you like about them?",
    why: 'The second half is the one that matters. It is the only competitive data this company has.',
    listenFor: ['Names of competitors', 'What they value', 'What is missing'],
  },
  {
    id: 'q-03',
    question: 'How many homes / units / jobs is that a year?',
    why: 'Sizes the account and tells you whether this is a bulk lane or a one-off.',
  },
  {
    id: 'q-04',
    question: 'When do you need cabinets on site?',
    why: 'Timeline decides HOT or REST, and whether Operations needs a load check.',
  },
  {
    id: 'q-05',
    question: 'Who else has to say yes to this?',
    why: 'Finds the real decision maker before you spend two weeks on the wrong one.',
  },
  {
    id: 'q-06',
    question: "What's your budget per unit — or per kitchen?",
    why: 'Tells you which line to lead with before you quote anything.',
  },
  {
    id: 'q-07',
    question: 'What went wrong last time?',
    why: 'The fastest route to what they actually care about. Usually a missed date or a missing part.',
  },
  {
    id: 'q-08',
    question: 'What would make you switch?',
    why: 'They tell you your own close. Write it down verbatim.',
  },
];

export const alwaysSay = [
  {
    when: 'When a competitor is named',
    say: 'What do you like about working with them?',
    why: 'Write down the answer. We have no competitive intelligence as a company. In six weeks the two of you will have built the first honest picture we have ever had.',
  },
  {
    when: "When you don't know",
    say: "I don't want to guess at that — let me confirm and come back to you today.",
    why: 'Then actually come back the same day. This costs you nothing and buys you everything. Nobody has ever lost a deal by checking.',
  },
];

export const callScript = {
  open: "Morning — ____ from YuDeZign, we're the cabinet plant over in Houston. Have I caught you at a bad time?",
  openNote:
    'That last question is not politeness. It gets you a real answer instead of a polite brush-off, and "actually yes" buys you a callback slot rather than a dead number.',
  askBeforeYouTell: [
    'Are you doing your own cabinets or buying them in?',
    'Who handles that for you?',
    'How many homes are you running this year?',
  ],
  oneAsk: [
    'Can I put twenty minutes in the diary next week and bring samples?',
    "Put me on the next job you're pricing — what's the address?",
  ],
  oneAskNote:
    'One ask, and only one. Not "let\'s meet, and I\'ll send a catalogue, and can I get your email." Pick one.',
  closeTheLoop:
    "Outcome in the system, next action dated, before the next dial. A call you don't log didn't happen.",
};

export const voicemail = {
  rule: 'Under twenty seconds. Say your number twice, slowly, at the start and the end.',
  script:
    "Morning, it's ____ from YuDeZign — we're the cabinet plant here in Houston. I'm calling because you're building in ____ and we do a lot of work with builders in that area. ___-___-____. Again, that's ___-___-____. Thanks.",
  note: 'No pitch on a voicemail. The only job is to get called back.',
};

export const firstEmail = {
  subject: 'Cabinets for your ____ homes',
  body: [
    '____ — we manufacture frameless cabinetry and closets here in Houston; I work with builders around ____ on their kitchen and vanity packages.',
    'Worth twenty minutes to show you what we do and what it costs at volume?',
    "Either way, here's our 2026 builder guide — the specs are all in there.",
  ],
  note: 'Attach the Builder booklet. Not the whole library.',
};
