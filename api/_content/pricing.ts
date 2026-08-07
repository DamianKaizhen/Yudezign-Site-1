import type { PricingContent } from './types.js';

/**
 * Ballpark pricing — ANSWER-KEY.md §5, Answer Key v1.4 · 2026-08-06.
 *
 * This closed the single highest-value gap in the pack. Until v1.4 a rep asked
 * "roughly what does a kitchen run?" had nothing to say: the only sources in the
 * business were a 2020 MSRP sheet and a 2022 list that disagree by 30-45% on the
 * same SKU.
 *
 * It also AMENDED the never-say list rather than extending it. The old rule read
 * "never quote a price from memory. Ever." That is now wrong, and a rule a rep
 * knows to be wrong is a rule they stop trusting — so it now carries one
 * sanctioned exception: the linear-foot ballpark, which is ranged, spoken and
 * conditioned.
 *
 * These are the same rates published on yudezign.com/pricing.
 */
export const pricing: PricingContent = {
  headline: 'This is the number you give in the room. It is a ballpark, and you say so every time.',

  rates: [
    { id: 'lf-kitchen', room: 'Kitchen', semiCustom: '$215 / LF', custom: '$375 / LF' },
    { id: 'lf-garage', room: 'Garage', semiCustom: '$215 / LF', custom: '$375 / LF' },
    { id: 'lf-office', room: 'Home office', semiCustom: '$190 / LF', custom: '$340 / LF' },
    { id: 'lf-closet', room: 'Closet', semiCustom: '$165 / LF', custom: '$315 / LF' },
    {
      id: 'lf-bathroom',
      room: 'Bathroom',
      semiCustom: '$130 / LF',
      custom: '$225 / LF',
      note: 'The custom rate is derived, not confirmed — usable as a ballpark, but flag it if a bathroom-only custom job gets serious',
    },
  ],

  range: 'Across everything: $130–$215 semi-custom, $225–$375 custom.',

  examples: [
    { id: 'ex-kitchen-typ', job: 'Kitchen, typical 10×12', lf: '20', semiCustom: '$4,300', custom: '$7,500' },
    { id: 'ex-kitchen-lg', job: 'Kitchen, large', lf: '30', semiCustom: '$6,450', custom: '$11,250' },
    { id: 'ex-vanity-1', job: 'Single vanity', lf: '5', semiCustom: '$650', custom: '$1,125' },
    { id: 'ex-vanity-2', job: 'Double vanity', lf: '8', semiCustom: '$1,040', custom: '$1,800' },
    { id: 'ex-closet-reach', job: 'Reach-in closet', lf: '8', semiCustom: '$1,320', custom: '$2,520' },
    { id: 'ex-closet-walk', job: 'Walk-in closet', lf: '15', semiCustom: '$2,475', custom: '$4,725' },
    { id: 'ex-garage', job: 'Garage wall', lf: '20', semiCustom: '$4,300', custom: '$7,500' },
  ],

  /** Said every time, not skipped. A ballpark without these is a quote. */
  conditions: [
    { id: 'cond-supply', label: 'Supply only', detail: 'Cabinets. Not countertops, not appliances, not labour' },
    { id: 'cond-assembled', label: 'Assembled', detail: 'These rates are for assembled cabinets' },
    {
      id: 'cond-delivery',
      label: 'Delivery and installation are extra',
      detail:
        'Delivery $350 a trip. We provide install support, not installation — price that separately',
    },
    {
      id: 'cond-finish',
      label: 'Finish and add-ons move it',
      detail:
        'A gloss lacquer door and a shelf of organisers are not the same job as a woodgrain slab',
    },
  ],

  howToSayIt:
    '"Around twenty feet of cabinetry — so roughly $4,300 in semi-custom, closer to $7,500 if you go custom. Supply only, assembled, before delivery. Finish moves it."',

  neverInWriting:
    'Ballparks are spoken, in person. A number in writing is a quote, and quotes come from the quote team off a Discovery Sheet.',
};
