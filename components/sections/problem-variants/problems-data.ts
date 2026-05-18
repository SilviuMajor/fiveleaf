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
