import type { ManagerContent } from './types.js';

/**
 * ███ MANAGER ONLY ███
 *
 * NEVER imported from `src/`. NEVER included in the rep payload.
 *
 * The sales pack is explicit that five documents are "manager-only, never given
 * to a rep": Exam & Drills, Comp & Quota, Open Questions for Andy, Change Log,
 * and the Weekly Meeting Agenda. This file is their web equivalent.
 *
 * Three guards keep this off a rep's phone, and all three are deliberate:
 *   1. `api/sales/content.ts` only reaches for this export when the verified JWT
 *      role is 'manager'. A rep's payload has no `manager` key at all — absent,
 *      not undefined.
 *   2. `tests/unit/sales-content.test.ts` asserts the serialised rep payload
 *      contains none of the canary strings below.
 *   3. `scripts/check-bundle-leak.mjs` greps the built client bundle for those
 *      same canaries, because none of this may ever be shipped to a browser
 *      that has not authenticated.
 *
 * If you add a document here, add a distinctive phrase from it to
 * MANAGER_CANARIES at the bottom of this file.
 */

export const managerVersion = 'Manager pack v1.0 · 2026-08-05';

export const managerContent: ManagerContent = {
  version: managerVersion,
  docs: [
    {
      id: 'mgr-comp-quota',
      title: 'Compensation and quota — proposal',
      summary:
        'Draft v1.0 · 2026-08-05 · for Damian and Andy. There is no commission plan anywhere in this company.',
      sections: [
        {
          heading: 'The situation',
          paragraphs: [
            'Both drives were searched for commission, bonus, quota and incentive. The only compensation reference that exists is in the 2021 sales plan, and it reads, literally: "Commission/bonus: A decent program X% from revenue for whole team." X was never filled in.',
            'Everything else on file is a dealer incentive — a channel program, not employee compensation.',
          ],
          callout:
            'A rep with no written comp plan leaves. Not immediately, and not loudly — they leave in month five when someone else puts a number in front of them.',
        },
        {
          heading: 'Why not to finalise this today',
          paragraphs: [
            'There is no baseline. Nobody knows what a YuDeZign rep in Houston produces in a month, because nobody has ever measured it — the KPI records stop in 2020 and the rep visit logs stop in early 2022.',
            'A comp plan is very hard to revise downward and very easy to revise upward. Run the KPI model through September, then finalise by Sept 15 on real numbers.',
          ],
          callout:
            'What must exist this week regardless: a one-page written statement of the Q3 arrangement, signed and dated, plus a commitment in writing to a full plan by Sept 15. Reps can work under a temporary arrangement. They cannot work under an unwritten one.',
        },
        {
          heading: 'The proposed shape — four components',
          bullets: [
            'Base — market rate for outside sales in Houston building products. NOT a draw against commission for the first 90 days.',
            'Activity gate (ramp bonus, Aug–Oct) — a fixed monthly bonus for hitting ALL the leading indicators: dials 125/wk, in-person touches 8/wk, new accounts 2/wk, 24-hour follow-up 95%, first-pass packet acceptance 80% by Oct. Expires Oct 31 — say so up front.',
            'Commission on gross margin, NOT revenue. Tiered: 0–80% attainment at base rate, 80–120% base + accelerator, over 120% base + full accelerator. Rates set Sept 15 on the September baseline.',
            'Bulk award override — any single award over a threshold (suggest $100K) comes out of the monthly quota and pays a separate, lower override rate.',
          ],
        },
        {
          heading: 'Why margin and not revenue',
          paragraphs: [
            'A rep paid on revenue has a structural incentive to discount, and discount authority has already been removed for exactly that reason. The comp plan should not fight the SOP.',
          ],
        },
        {
          heading: 'Why a whale is scored separately',
          paragraphs: [
            'The largest job quoted is ~$325,000 (54 units, still open) — larger than the entire Sept–Nov target combined. Roll that into a monthly number and the rep who lands it is overpaid once against a target that no longer means anything, while every rep who does not land one looks like a failure.',
          ],
        },
        {
          heading: 'Quota — proposed',
          bullets: [
            'Aug — activity only. Training and show month. No revenue quota; the bonus is on the activity gate.',
            'Aug + Sept — $100K team, $50K per rep. Most of it lands in September, and that is expected.',
            'Oct — $100K team, $50K per rep, plus a binary milestone: at least one signed builder or multi-family award.',
            'Nov — $100K team, $50K per rep, plus one second order from an Aug/Sept customer.',
            'Dec — $100K front-loaded, ~2.5 selling weeks. Confirm with Damian.',
          ],
          callout: 'Quota goes live Oct 1, on full certification. Aug and Sept are measured but not paid on.',
        },
        {
          heading: 'Five things to decide',
          bullets: [
            'Base salary figure, and whether it is the same for both reps.',
            'The Q3 arrangement, in writing, this week — whatever it currently is.',
            'Commission rate and accelerator, on Sept 15 data.',
            'The bulk override threshold and rate — $100K is a suggestion, not a finding.',
            'What happens to a house account. Recommendation: no commission on existing accounts they did not open, but a small retention component so nobody neglects the accounts that already pay the bills.',
          ],
        },
        {
          heading: 'The clawback nobody thinks about until it happens',
          paragraphs: [
            'Commission is earned on collection, not on signature. An order that is signed and then cancelled, or that ships and never gets paid, must reverse. Put it in the plan from day one — retrofitting a clawback after the first bad debt is a genuinely unpleasant conversation, and it poisons the plan for everyone.',
          ],
        },
        {
          heading: 'What not to do',
          bullets: [
            "Don't pay on quotes issued. You will get quotes.",
            "Don't pay on revenue. You will get discounts.",
            'Don\'t set the Q3 quota from the June strategy deck\'s "15–30 bulk quotes in two months." That is the quoting system\'s throughput, not a rep\'s sourcing capacity.',
            "Don't leave it unwritten past Sept 15. The date is the promise.",
          ],
        },
      ],
    },

    {
      id: 'mgr-weekly-meeting',
      title: 'Friday sales meeting — the agenda',
      summary: '45 minutes. Run off the ops system screen, not off a spreadsheet.',
      sections: [
        {
          heading: 'The rule',
          callout:
            'A deal that is not in the system is not discussed and gets no credit. No exceptions, including for deals that are obviously real.',
          paragraphs: [
            'The existing project register has 289 rows and its status and value columns are about 98% empty — that is what happens when record-keeping is optional. Make an exception for one deal because you know it is real, and the system is optional again.',
            "Corollary: the manager never enters a record on a rep's behalf. Doing it once teaches them it is your job.",
          ],
        },
        {
          heading: '1 · Plant load — 5 min',
          paragraphs: [
            'Operations speaks first, before any pipeline talk. Cabinets committed, % of ~500, free capacity, anything at risk.',
            'Load first, on purpose. It frames every commitment made in the next forty minutes, and it stops the meeting from cheerfully selling a month the plant has already sold.',
          ],
        },
        {
          heading: '2 · The numbers — 10 min',
          paragraphs: [
            "Each rep's Summary tab. Dials, connects, visits, new accounts, 24-hour follow-up compliance, estimates out, first-pass acceptance.",
            'Read the leading indicators before the revenue. In months one and two the leading indicators are the only honest signal there is.',
          ],
        },
        {
          heading: '3 · Pipeline — 15 min, on the system screen',
          paragraphs: [
            'Everything at Quoted or later, newest first. Per deal: what is the next action, what is the date, what is blocking it.',
            'Nothing else gets discussed. Not "I had a good conversation with." Not "there\'s a big one coming."',
          ],
        },
        {
          heading: '4 · Blocked and unanswered — 5 min',
          paragraphs: [
            'What did a customer ask that nobody could answer? Anything signed off since last week? Every answer that changes gets a dated row in the change log and bumps the Answer Key version.',
            'This is also where competitive intelligence gets captured. Every "what do you like about working with them?" answer from the week goes on the board.',
          ],
        },
        {
          heading: '5 · Next week — 10 min',
          paragraphs: [
            'Named target accounts per rep. Appointments already booked. What each rep needs from the office, the quote team, or the plant — with a date against it.',
          ],
        },
        {
          heading: 'Once a month, add 15 minutes',
          bullets: [
            'Conversion rate, average order value, cabinets booked against the ceiling',
            "Mix against the 70/20/10 target — are we drifting back to custom because that's who answers the phone?",
            'Second order rate',
            'Re-baseline any quota that has been proven wrong by real data',
            'Roll-up written to the work log',
          ],
        },
        {
          heading: 'What this meeting is not',
          bullets: [
            'Not a status report to the manager. If a rep is reading a list of what they did, the meeting has failed.',
            'Not a coaching session. Coaching happens one to one, and it is far more effective there.',
            'Not open-ended. 45 minutes. Two salespeople sitting in a meeting are two salespeople not on the phone.',
          ],
        },
        {
          heading: 'The four questions worth asking every week',
          bullets: [
            "What did you hear this week that we didn't already know?",
            "What did you promise that we can't keep? — asked without consequence, or it never gets a truthful answer.",
            'Which deal are you avoiding? — there is always one.',
            'What would make next week easier?',
          ],
        },
      ],
    },

    {
      id: 'mgr-certification',
      title: 'Certification — the gates',
      summary:
        'Saturday Aug 8. Grading is on the curve; certification is not. The full exam bank and marking copy stay on the K: drive.',
      sections: [
        {
          heading: 'Grading weights',
          bullets: [
            'Attendance 10%',
            'Homework 20%',
            'Written exam 30% — 40 questions, 1 hour, closed book',
            'Live drills 40% — pitch 10, objections 10, cold calls 10, discovery 10',
          ],
          paragraphs: ['A ≥ 90 · B ≥ 80 · C ≥ 60 · D < 60.'],
        },
        {
          heading: 'Booth Certification — binary, not on the curve',
          bullets: [
            '100% on the never-say section of the exam. Not 90%.',
            'The 30-second pitch delivered clean, twice in a row, from memory, with no notes.',
          ],
          callout: 'Fail either and you do not work the booth unsupervised.',
        },
        {
          heading: 'The exam sections',
          bullets: [
            'A · Construction — 12 questions',
            'B · Materials and finishes — 8',
            'C · Lines and dimensions — 10',
            'D · Process — 5',
            'E · NEVER-SAY — 10, and this is the gate at 100%',
          ],
          paragraphs: [
            'Everything on the exam is answerable from the Answer Key. Section E gives the exact scripted deflections with explicit fail conditions — a named percentage, of any size, is a fail.',
          ],
        },
        {
          heading: 'Later gates',
          bullets: [
            'Measure certification — week 3 (Aug 17–21). Two supervised measures, then one solo checked against a supervised re-measure. Required before any solo measure appointment.',
            'Bulk work — week 4 gate: present one real bulk opportunity.',
            'Closets — week 5 gate: quote one closet end to end.',
            'Full certification — week 6. Quota goes live Oct 1.',
          ],
        },
      ],
    },

    {
      id: 'mgr-open-questions',
      title: 'Open questions — what still needs a decision',
      summary:
        'Tracked in OPEN-QUESTIONS-FOR-ANDY.md and CHANGE-LOG.md on the K: drive. These are the rulings that unblock BLOCKED answers.',
      sections: [
        {
          heading: 'The three that matter most',
          bullets: [
            'Warranty length, transferability, and whether it covers rental/commercial use. Currently BLOCKED — three lengths exist and the newest contract contradicts the flyers.',
            'Deposit percentage. Currently BLOCKED — five figures exist across live documents.',
            'Design fee. Currently PROVISIONAL at $250/$100 credited, expiring Sept 1. Two other fee schedules exist in older documents.',
          ],
        },
        {
          heading: 'Company',
          bullets: [
            'Exhibitor identity — the show folder says "YUKON (Flooring & Glass) · displays by YuDeZign" while the banners lead with UFS. Reps need a one-sentence answer before the doors open.',
            'Which address goes on rep-facing material — 13230 vs 13366 Murphy Rd, Stafford vs Houston.',
            'Discount authority — currently none for 90 days. Confirm.',
          ],
        },
        {
          heading: 'Known defects raised against other documents',
          bullets: [
            'HIGH — the expo banner says "frameless & framed". We do not build framed.',
            'HIGH — the June 2026 Builder Strategy deck states wrong hardware, wrong finish count and a deposit figure, and calls the still-open 54-unit job an "award". It is not a product source.',
            'HIGH — archived SOPs send customers to a yudezign.com install-app URL that has never worked. Either create the redirect or strike it from the SOPs.',
            'MEDIUM — the expo banner prints an unconfirmed quote turnaround and warranty length.',
            'LOW — showcase flyers print metric board thickness against the ¾-inch house rule.',
            'The projects register: 289 rows, status and value columns ~98% empty.',
          ],
        },
        {
          heading: 'The change protocol',
          paragraphs: [
            'When a ruling changes: update ANSWER-KEY.md on the K: drive first, log it in CHANGE-LOG.md, bump the version string in both ANSWER-KEY.md and FIELD-CARD.html, reprint the cards — then mirror the change into this portal and bump CONTENT_VERSION.',
            'The footer version on a printed field card is how you spot a rep carrying a stale card in October.',
          ],
        },
      ],
    },
  ],
};

/**
 * Distinctive phrases that must never appear in a rep payload or the client
 * bundle. Consumed by the unit test and the build-time bundle check.
 *
 * Keep these verbatim-unique — a phrase that also occurs in rep content would
 * make the guard fire on a false positive and get switched off, which is worse
 * than not having it.
 */
export const MANAGER_CANARIES = [
  'A decent program X% from revenue for whole team',
  'A rep with no written comp plan leaves',
  'Commission is earned on collection, not on signature',
  'over 120% base + full accelerator',
  'the manager never enters a record on a rep',
  'Which deal are you avoiding?',
  'Base salary figure, and whether it is the same for both reps',
  'The bulk override threshold and rate',
];
