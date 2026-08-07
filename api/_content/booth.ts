import type { BoothContent } from './types.js';

/**
 * Show mode — transcribed from 50_SHOW-HBE2026/BOOTH-PLAYBOOK.md and
 * FOLLOWUP-48H.md.
 *
 * This is the time-critical tab. The show is Aug 11-12 2026 and the whole plan
 * rests on one number: 75 captured leads, of which about 20% are hot, which is
 * ~15 phone calls across two reps in 48 hours. Seven or eight each. That is
 * comfortably achievable, which is exactly why there is no excuse.
 *
 * Lead capture at the show is on PAPER, deliberately — the digital tool is
 * specified but not built, and a half-working app in a hall with bad wifi loses
 * leads that paper keeps. Nothing in this portal should suggest otherwise.
 */

export const booth: BoothContent = {
  eventName: 'Houston Builders Expo (HBE2026)',
  venue: 'NRG, Houston',
  startsOn: '2026-08-11',
  endsOn: '2026-08-12',
  premise:
    'Two reps, roughly seven floor hours a day, is about fourteen selling hours. Seventy-five leads across that is a little over five leads an hour between you — which is not a race. The usual advice to qualify in ninety seconds is wrong at this volume: you have time to have a real conversation with someone who is real.',
  leadTarget: '75 captured leads across the two days. A hundred would be a good show.',

  runOfShow: [
    {
      id: 'ros-build-1',
      day: '2026-08-09',
      when: 'Sun Aug 9',
      what: 'Booth build at NRG + lead-card drill',
      detail: ['Drill writing a card in 40 seconds, the moment the conversation ends'],
    },
    {
      id: 'ros-build-2',
      day: '2026-08-10',
      when: 'Mon Aug 10',
      what: 'Booth completion and final rehearsal',
    },
    {
      id: 'ros-doors-1',
      day: '2026-08-11',
      when: 'Tue Aug 11 — two hours before doors',
      what: 'Set the booth',
      detail: [
        'Cards, pens and both boxes on the counter. Not in a bag under the table',
        'Field cards in pockets — both of you',
        'Booklets sorted by edition, stacked so you can grab the right one without reading spines',
        'Finish boards where a visitor can touch them. People buy cabinets with their hands',
        'Phones on silent, in pockets',
        'QR sign visible from the aisle',
        'Water somewhere out of sight',
      ],
    },
    {
      id: 'ros-floor-1',
      day: '2026-08-11',
      when: 'Tue Aug 11 — floor hours',
      what: 'Work the aisle. Swap Front/Close every 90 minutes',
    },
    {
      id: 'ros-close-1',
      day: '2026-08-11',
      when: 'Tue Aug 11 — closing',
      what: 'Debrief, then transcribe',
      detail: [
        'Both boxes stay with a named person, never in the booth overnight',
        'Five-minute debrief: what got asked most, what nobody understood, what we ran out of',
        "Write down every question you couldn't answer — that list becomes the customer FAQ in week 3",
        'Transcribe every card the same night — about half an hour',
        'Text or email every lead captured today, two sentences, personalised from the scope line',
      ],
    },
    {
      id: 'ros-floor-2',
      day: '2026-08-12',
      when: 'Wed Aug 12 — floor hours',
      what: "Work the aisle. Yesterday's follow-up is already going out while the show runs",
    },
    {
      id: 'ros-close-2',
      day: '2026-08-12',
      when: 'Wed Aug 12 — closing',
      what: 'Same debrief, same transcription, same evening messages',
    },
  ],

  roles: {
    id: 'booth-roles',
    title: 'Roles — swap every 90 minutes',
    summary:
      'Aisle work is exhausting and a tired Front stops making eye contact, which is the entire job.',
    sections: [
      {
        heading: 'Front — about 5 feet out, in the aisle',
        paragraphs: ['Work traffic. Open. Qualify in 20 seconds. Hand off or write a card.'],
      },
      {
        heading: 'Close — inside, with the samples and the card box',
        paragraphs: ['Take handoffs. Work the finish boards. Write the detailed cards.'],
      },
      {
        heading: 'Four rules, and they are not suggestions',
        bullets: [
          'Never both idle.',
          'Never both on your phones. One person on a phone in an empty booth reads as busy. Two reads as closed.',
          'Never both in the same conversation.',
          'Never sit down, never eat in the booth. Take breaks off the floor, staggered.',
        ],
        callout:
          'The failure mode at 75 leads is not being too slow. It is standing in an empty booth talking to each other, or letting one enthusiastic browser eat forty minutes.',
      },
      {
        heading: 'Three things stay true at the booth',
        bullets: [
          'You are still bound by the never-say list. A show floor is the worst place to improvise a warranty or a deposit.',
          '"Let me confirm that and come back to you today" is a completely acceptable answer — and it is a reason to call them.',
          'If asked "so are you Yukon or YuDeZign?": "One group. I\'m on the cabinetry side." Do not over-explain the org chart.',
        ],
      },
    ],
  },

  qualifying: [
    { id: 'bq-1', label: 'What are you building?' },
    { id: 'bq-2', label: 'How many?' },
    { id: 'bq-3', label: 'When?' },
    {
      id: 'bq-write',
      label: 'Write a card if…',
      detail:
        'They build, renovate, specify or buy cabinets — at any volume — anywhere inside about ninety minutes of the plant. Give them five to ten minutes.',
    },
    {
      id: 'bq-flyer',
      label: 'Flyer and move on if…',
      detail:
        "They're outside the radius, a supplier selling to us, a student, or collecting tote bags. Say \"here's our guide, good luck with the show\" and turn back to the aisle. Thirty seconds. You are allowed to end a conversation.",
    },
  ],

  cardRules: [
    {
      id: 'card-1',
      label: 'Every card is pre-numbered — HBE2026-001 upward',
      detail: 'That number is what stops a lead being transcribed twice.',
    },
    {
      id: 'card-2',
      label: 'Your initials and the time go on every card',
      detail: 'The time matters: it drives the follow-up clock.',
    },
    {
      id: 'card-3',
      label: "Tick boxes, don't write sentences",
      detail: 'Except in the scope line, which is the one part that should be in their words.',
    },
    {
      id: 'card-4',
      label: 'The scope line is the most valuable thing on the card',
      detail:
        '"Doing 14 townhomes off Westheimer, hates his current lead times" is worth more than a perfectly spelled email address. It is what makes your follow-up sound like a person instead of a blast.',
    },
    {
      id: 'card-5',
      label: 'A business card is clipped to a lead card. Never collected loose',
      detail:
        'A loose business card with no context is a dead lead — and at this volume, every lead you lose is over one percent of the show.',
    },
    {
      id: 'card-6',
      label: '40 seconds to write the card',
      detail:
        'Even though you had ten minutes for the conversation. Write it the moment they walk away, not later.',
    },
    {
      id: 'card-hot',
      label: 'HOT or REST — decide at the moment of capture',
      detail:
        'HOT = timeline is now or 1–3 months, OR ≥5 units, OR they asked for a price. REST = everything else. Two physical boxes. Sort it while you still remember the conversation.',
    },
  ],

  packList: [
    { id: 'pk-cards', label: '150 pre-numbered lead cards', detail: 'Uncoated — a ballpoint skips on gloss' },
    { id: 'pk-boxes', label: 'Two boxes, labelled HOT and REST' },
    { id: 'pk-pens', label: 'Pens — more than you think' },
    { id: 'pk-field', label: 'Field card in each rep\'s pocket', detail: 'Laminated, both sides' },
    { id: 'pk-discovery', label: 'Discovery Sheet pad' },
    { id: 'pk-builder', label: 'Builder booklet + Builder Companion insert' },
    { id: 'pk-contractor', label: 'Contractor edition' },
    { id: 'pk-home', label: 'Home edition' },
    { id: 'pk-commercial', label: 'Commercial edition' },
    { id: 'pk-showcase', label: 'Showcase flyers', detail: 'Closet, Mudroom, Credenza, ADA Vanity' },
    { id: 'pk-boards', label: 'Finish boards', detail: 'Where a visitor can touch them' },
    { id: 'pk-qr', label: 'QR sign for the finish library', detail: 'Points at yudezign.com/finishes' },
    { id: 'pk-app', label: 'InstallAssistant installed on both phones', detail: 'It demos in fifteen seconds' },
  ],

  followUp: [
    {
      id: 'fu-transcribe',
      dueWithin: 'Each evening, both days',
      channel: 'crm',
      action:
        'Transcribe every card into LEADS-HBE2026.xlsx. Same night — about half an hour. Card number goes in the notes column as card=HBE2026-014.',
      owner: 'Admin or rep',
    },
    {
      id: 'fu-same-evening',
      dueWithin: 'Each evening, both days',
      channel: 'sms',
      action:
        'Text or email every lead captured that day — two sentences, personalised from the scope line.',
      owner: 'Both reps',
      template:
        "Great to meet you at NRG today — you mentioned the [SCOPE LINE]. I'll call you Thursday with what a cabinet package looks like at that volume. — [YOUR NAME], YuDeZign",
    },
    {
      id: 'fu-t24',
      dueWithin: 'T + 24 hours',
      channel: 'call',
      action:
        'Call the entire HOT box. One goal: book a date. Do not pitch, do not quote, do not answer a spec question in depth.',
      owner: 'Both reps',
      template:
        "[NAME], it's [YOUR NAME] from YuDeZign — we met yesterday at NRG. You said you were starting the [PROJECT] in [AREA]. I'd like twenty minutes with you and a set of samples. Is Thursday morning or Friday afternoon better?",
    },
    {
      id: 'fu-t48',
      dueWithin: 'T + 48 hours',
      channel: 'email',
      action:
        'Anyone not reached gets a second touch on a different channel — called → email, emailed → call. Same person, same day, different door.',
      owner: 'Both reps',
    },
    {
      id: 'fu-rest-start',
      dueWithin: 'Fri Aug 14',
      channel: 'task',
      action: 'The REST box enters the nurture sequence.',
      owner: 'Both reps',
    },
    {
      id: 'fu-gate',
      dueWithin: 'Aug 28',
      channel: 'task',
      action:
        'Gate: 100% of leads touched at least 3× and dispositioned. Not "most." Not "the good ones." All of them.',
      owner: 'Manager',
    },
  ],

  nurture: [
    {
      id: 'nur-1',
      dueWithin: 'Fri Aug 14',
      channel: 'email',
      action:
        'The right booklet edition for their segment + "what are you working on this fall?"',
    },
    {
      id: 'nur-2',
      dueWithin: 'Tue Aug 18',
      channel: 'call',
      action: 'Qualify properly. Are they real, when, who decides.',
    },
    {
      id: 'nur-3',
      dueWithin: 'Mon Aug 24',
      channel: 'email',
      action:
        'Something useful and specific — a finish range, the measuring guide, a relevant project.',
    },
    {
      id: 'nur-4',
      dueWithin: 'Tue Sept 1',
      channel: 'call',
      action: "The direct ask: put me on the next job you're pricing.",
    },
    {
      id: 'nur-5',
      dueWithin: 'Sept 10',
      channel: 'email',
      action: 'A short case: what we did for a comparable builder or remodeler.',
    },
    { id: 'nur-6', dueWithin: 'Sept 21', channel: 'call', action: 'Last active attempt.' },
    {
      id: 'nur-7',
      dueWithin: 'October',
      channel: 'email',
      action: 'Quarterly nurture, if still unqualified but not dead.',
    },
  ],

  dispositions: [
    { id: 'disp-working', label: 'working', detail: 'Contact made, still in play' },
    {
      id: 'disp-qualified',
      label: 'qualified',
      detail: 'Real project, real timeline, real budget — becomes a CLT-####',
    },
    {
      id: 'disp-unqualified',
      label: 'unqualified',
      detail:
        'Wrong fit, wrong geography, no project. Say so — it is a good outcome. A clean no in week two is worth more than a maybe you are still chasing in November.',
    },
    { id: 'disp-won', label: 'won', detail: 'Booked' },
    {
      id: 'disp-lost',
      label: 'lost',
      detail: 'Went elsewhere — and you write down why, because that is the only competitive data we have',
    },
  ],
};

export const handOuts = [
  { who: 'Builder or developer', give: 'Builder booklet edition + Builder Companion insert' },
  { who: 'GC / remodeler', give: 'Contractor edition' },
  { who: 'Homeowner', give: 'Home edition' },
  { who: 'Commercial / property', give: 'Commercial edition' },
  {
    who: 'Anyone at the closet, mudroom, credenza or ADA vanity display',
    give: 'The showcase flyer for that display',
  },
  { who: 'Anyone who asks about finishes', give: 'The finish QR — yudezign.com/finishes' },
];

export const handOutRule =
  "Don't hand out the whole library. One booklet, one insert, one card. A visitor with five documents reads none of them.";

export const showRoi = {
  heading: 'Measure it by Sept 30, in writing',
  why: 'This company has run trade shows before and there is no record anywhere of how many leads any of them produced, what they converted, or what they were worth. Not one number, from any prior show.',
  metrics: [
    'Leads captured, by segment and by timeline — against the 75 target',
    'How many became CLT-#### records',
    'How many became estimates, and their total value',
    'How much was booked, and from which segment',
    'Cost of the booth ÷ revenue booked',
  ],
};
