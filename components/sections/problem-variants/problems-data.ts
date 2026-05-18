import {
  Hourglass,
  Moon,
  PowerOff,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

/**
 * Refreshed copy for the Problem section. Used by every variant on
 * `/preview/problem` so we're comparing FORMATS, not copy.
 *
 * Tone choices (per Silv's feedback that the previous copy didn't
 * land):
 *  - Each headline is a sub-six-word punch.
 *  - Body is one sentence, concrete, with a number where possible.
 *  - No numbered markers — the four problems read as a list of facts,
 *    not steps.
 */

export type ProblemPoint = {
  icon: LucideIcon;
  /** Short headline — the punch. Used as the lead in every variant. */
  title: string;
  /** Single-sentence body. The "and here's the cost" line. */
  body: string;
  /** Tiny one-liner version, used by variants that want to
   *  separate "symptom" (left) from "consequence" (right). */
  symptom: string;
};

export const PROBLEMS: ProblemPoint[] = [
  {
    icon: TrendingUp,
    title: "Volume up. Hiring flat.",
    symptom: "Tickets keep growing. Headcount doesn't.",
    body: "Tickets keep growing. Headcount doesn't. The metric you reward is the one you can't afford to scale.",
  },
  {
    icon: Moon,
    title: "After hours, demand dies.",
    symptom: "A third of inbound lands outside support hours.",
    body: "A third of your inbound lands outside support hours. Most of it is gone by morning, the lead with it.",
  },
  {
    icon: PowerOff,
    title: "The bot made it worse.",
    symptom: "Off-the-shelf bots resolve under one in five.",
    body: "Off-the-shelf chatbots resolve under one in five. The rest is press-zero rage and a worse experience than no bot at all.",
  },
  {
    icon: Hourglass,
    title: "Internal builds freeze at 60%.",
    symptom: "The specialist leaves. The system stays half-built.",
    body: "The specialist leaves. The half-built system becomes a liability nobody touches, and the budget that paid for it is gone.",
  },
];

export const PROBLEM_HEADER = {
  pill: "The problem",
  h2: "Four problems every operator hits. None get smaller on their own.",
};

/**
 * Copy sets for the V4 (symptom → consequence) layout. The brief: the
 * left "symptom" must be the recognisable pain (what the reader is
 * living), the right "consequence" must add NEW information (what it's
 * actually costing them) — never restate the left.
 *
 * Three voices, each pitched at the people who actually read this
 * (ops directors, CX/support leaders, COOs in customer-heavy
 * operations):
 *   - metrics   : speaks in the numbers they're measured on
 *   - blunt     : short, declarative, zero jargon
 *   - cost      : everything framed as money / margin
 */
export type ProblemCopy = { symptom: string; body: string };

export const PROBLEM_COPY_SETS: Record<
  "metrics" | "blunt" | "cost",
  { label: string; note: string; points: ProblemCopy[] }
> = {
  metrics: {
    label: "Voice A — the metrics they're measured on",
    note: "Each line speaks to a number an ops or CX leader is judged on (AHT, CSAT, containment, owned spend). The pain on the left, the scoreboard damage on the right.",
    points: [
      {
        symptom: "Volume's up. Headcount isn't.",
        body: "The queue grows every quarter; the budget to clear it doesn't. AHT and CSAT slide in the wrong direction, and those are the numbers you report upward.",
      },
      {
        symptom: "The inbox sleeps when customers don't.",
        body: "Around a third of contacts land after hours. By the morning shift the intent has cooled and the resolution clock has already breached.",
      },
      {
        symptom: "You bought a bot. It backfired.",
        body: "Sub-20% containment, a “press 0” reflex trained into every customer, and a CSAT dip you're still explaining to the board.",
      },
      {
        symptom: "Your AI project lost its one expert.",
        body: "It froze at 60%, no one else can safely touch it, and it's now a capability you're accountable for but can't move.",
      },
    ],
  },
  blunt: {
    label: "Voice B — plain and blunt",
    note: "Short, declarative, almost no adjectives. Reads fast, lands hard. For a reader who's seen every vendor deck and wants you to get to the point.",
    points: [
      {
        symptom: "More tickets. Same team.",
        body: "You can't hire fast enough to match the curve, so service slips exactly where you can least afford it to.",
      },
      {
        symptom: "Out-of-hours goes unanswered.",
        body: "Demand doesn't wait for 9am. Most of it, and the sale attached, is gone before anyone reads it.",
      },
      {
        symptom: "The chatbot made it worse.",
        body: "It deflects under one in five and irritates the rest. Customers now distrust the channel on sight.",
      },
      {
        symptom: "The build never finished.",
        body: "Your specialist left at 60% done. What's left is a liability no one will put their name to.",
      },
    ],
  },
  cost: {
    label: "Voice C — cost and margin",
    note: "Every problem framed as money the business is losing. Pitched at whoever signs off the spend and watches the P&L.",
    points: [
      {
        symptom: "Growth is eating your margin.",
        body: "Serving more customers the old way means more seats. The cost line scales faster than the revenue line it's chasing.",
      },
      {
        symptom: "After 6pm, money walks.",
        body: "Roughly a third of inbound, buying intent included, arrives with no one there to catch it. You paid to generate that demand and never collected it.",
      },
      {
        symptom: "The cheap bot was expensive.",
        body: "Low containment, more escalations, lower CSAT. The “saving” reappeared as cost somewhere else on the P&L.",
      },
      {
        symptom: "The half-built system is sunk cost.",
        body: "Sixty percent complete, zero owners, full price already paid. It's depreciating and it isn't even live.",
      },
    ],
  },
};
