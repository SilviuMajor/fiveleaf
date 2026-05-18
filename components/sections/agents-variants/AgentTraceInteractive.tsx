"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Ban, CheckCircle2 } from "lucide-react";
import { Pill } from "@/components/brand/Pill";
import { cn } from "@/lib/utils";
import {
  ALL_CATEGORIES_ORDER,
  SCENARIOS_BY_CATEGORY,
  type Category,
  type Stage,
} from "./scenarios";

/**
 * AgentTraceInteractive — interactive variant of the V4 trace.
 *
 * One section, one trace skeleton, a row of category pills that swap
 * the underlying scenario in place. Vertical reading order:
 *
 *   1. Section header (pill + H2 + sub)
 *   2. Selector row ("Choose a case" + 5 pills)
 *   3. Two-column flow + chat panel (stacked on mobile)
 *
 * No standalone message blockquote — the customer's message lives only
 * inside the chat panel on the right (alongside the agent's reply), so
 * there's a single place where the conversation is shown.
 *
 * Each branch row puts the system chip (icon + name) on the LEFT,
 * with the plain-English action title on the right and the result
 * line below, aligned to the action title.
 *
 * Two animation modes via the `mode` prop:
 *   - "crossfade": exit + enter fade per stage; ~250ms per swap.
 *   - "collapse" : staggered enter (i * 100ms) so the trace appears to
 *                  rebuild itself stage by stage.
 *
 * Both modes share a `useReducedMotion` gate that drops to instant
 * swaps.
 */

type Mode = "crossfade" | "collapse";

type Props = {
  mode: Mode;
  /** Optional id on the outer section, for anchor links (e.g.
   *  "agents-explainer" so /#agents-explainer keeps working). */
  sectionId?: string;
  pill?: string;
  h2?: string;
  sub?: string;
  prompt?: string;
};

/** Stage skeleton — visible from initial paint regardless of selection. */
const STAGE_TEMPLATE: Pick<Stage, "number" | "title" | "caption" | "tone">[] = [
  {
    number: "01",
    title: "Input",
    caption: "Pick up the message on the channel",
    tone: "sand",
  },
  {
    number: "02",
    title: "Context",
    caption: "Pull what the agent needs to answer well",
    tone: "sky",
  },
  {
    number: "03",
    title: "Reason",
    caption: "Work out what to say next",
    tone: "neutral",
  },
  {
    number: "04",
    title: "Act",
    caption: "Reply on the channel, log the interaction",
    tone: "sage",
  },
];

const TONE_BG: Record<Stage["tone"], string> = {
  sand: "bg-fl-pastel-sand text-fl-pastel-sand-ink",
  sky: "bg-fl-pastel-sky text-fl-pastel-sky-ink",
  sage: "bg-fl-pastel-sage text-fl-pastel-sage-ink",
  neutral: "bg-fl-ink text-white",
};

const TONE_DOT: Record<Stage["tone"], string> = {
  sand: "bg-fl-pastel-sand-ink",
  sky: "bg-fl-pastel-sky-ink",
  sage: "bg-fl-pastel-sage-ink",
  neutral: "bg-fl-ink",
};

/** Each category gets its own pastel accent so the pill row reads as
 *  five distinct lanes when one is selected. */
const CATEGORY_TONE: Record<Category, string> = {
  Sales: "bg-fl-pastel-sand text-fl-pastel-sand-ink ring-2 ring-fl-pastel-sand-ink/20",
  Retentions:
    "bg-fl-pastel-rose text-fl-pastel-rose-ink ring-2 ring-fl-pastel-rose-ink/20",
  Renewal:
    "bg-fl-pastel-sky text-fl-pastel-sky-ink ring-2 ring-fl-pastel-sky-ink/20",
  Billing:
    "bg-fl-pastel-lavender text-fl-pastel-lavender-ink ring-2 ring-fl-pastel-lavender-ink/20",
  Support:
    "bg-fl-pastel-sage text-fl-pastel-sage-ink ring-2 ring-fl-pastel-sage-ink/20",
};

const IDLE_PILL =
  "border border-fl-line bg-white text-fl-ink-soft hover:bg-fl-surface-alt hover:text-fl-ink";

export function AgentTraceInteractive({
  mode,
  sectionId,
  pill = "AI agents in plain English",
  h2 = "Watch the agent run a real case.",
  sub = "Pick a category. Same loop, different jobs.",
  prompt = "Choose a case",
}: Props) {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<Category | null>(null);
  const scenario = selected ? SCENARIOS_BY_CATEGORY[selected] : null;

  const handleSelect = useCallback(
    (cat: Category) => {
      if (cat === selected) return;
      setSelected(cat);
    },
    [selected],
  );

  // Animation timings differ only by the per-stage and reply-panel
  // delays — the rest of the transition is identical between modes.
  const stageEnterDelay = (i: number) =>
    reduce ? 0 : mode === "collapse" ? i * 0.1 : 0;
  const replyEnterDelay = reduce ? 0 : mode === "collapse" ? 0.35 : 0.05;
  const fadeDuration = reduce ? 0 : 0.25;

  return (
    <section
      id={sectionId}
      className="bg-fl-surface-alt scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
        {/* 1. Section header */}
        <div className="max-w-3xl">
          <Pill tone="neutral" uppercase>
            {pill}
          </Pill>
          <h2 className="font-display mt-5 text-balance text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
            {h2}
          </h2>
          <p className="mt-5 max-w-2xl text-base text-fl-ink-soft md:text-lg">
            {sub}
          </p>
        </div>

        {/* 2. Selector row — prompt + pill tablist */}
        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 md:mt-12">
          <p className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-fl-ink">
            {prompt}
            <span aria-hidden="true">→</span>
          </p>
          <div
            role="tablist"
            aria-label={prompt}
            className="flex flex-wrap gap-2"
          >
            {ALL_CATEGORIES_ORDER.map((cat) => {
              const isSelected = selected === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  aria-controls="agent-trace-tabpanel"
                  onClick={() => handleSelect(cat)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fl-ink focus-visible:ring-offset-2 focus-visible:ring-offset-fl-surface-alt",
                    isSelected ? CATEGORY_TONE[cat] : IDLE_PILL,
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Chat panel + flow — stacked vertically: panel under the
               buttons, flow below the panel. */}
        <div
          id="agent-trace-tabpanel"
          role="tabpanel"
          aria-live="polite"
          className="mt-8 md:mt-10"
        >
          {/* Chat panel — sits directly under the selector row */}
          <div className="mx-auto max-w-2xl">
            <AnimatePresence mode="wait">
              {scenario && (
                <motion.div
                  key={`reply-${scenario.id}`}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{
                    duration: fadeDuration,
                    ease: "easeOut",
                    delay: replyEnterDelay,
                  }}
                  className="overflow-hidden rounded-2xl border border-fl-line bg-white shadow-sm"
                >
                  <header className="flex items-center justify-between border-b border-fl-line bg-fl-surface-alt px-4 py-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fl-muted">
                      What{" "}
                      {scenario.replyTo ??
                        scenario.customer.name.split(" ")[0]}{" "}
                      receives
                    </p>
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fl-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      agent
                    </span>
                  </header>

                  <div className="flex items-center gap-2.5 border-b border-fl-line bg-fl-surface-alt/60 px-4 py-2.5">
                    <span
                      className={cn(
                        "inline-flex h-6 w-6 items-center justify-center rounded-full bg-fl-pastel-neutral",
                        scenario.channel.color,
                      )}
                    >
                      <scenario.channel.icon className="h-3 w-3" />
                    </span>
                    <p className="text-[11px] leading-tight text-fl-ink-soft">
                      <span className="font-semibold text-fl-ink">
                        {scenario.channel.name}
                      </span>{" "}
                      · {scenario.customer.name} · {scenario.customer.meta}
                    </p>
                  </div>

                  <div className="space-y-2.5 p-4">
                    <div className="flex justify-end">
                      <p className="max-w-[88%] rounded-2xl rounded-br-sm bg-fl-pastel-neutral px-3 py-2 text-sm text-fl-ink">
                        {scenario.message}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="max-w-[92%] rounded-2xl rounded-bl-sm bg-fl-ink px-3 py-2.5 text-sm leading-relaxed text-white">
                        {scenario.reply}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-fl-line bg-fl-surface-alt px-4 py-3 text-xs">
                    {scenario.didHappen.map((line) => (
                      <p
                        key={line}
                        className="flex items-start gap-2 text-fl-ink"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600"
                          strokeWidth={2.5}
                        />
                        <span>{line}</span>
                      </p>
                    ))}
                    {scenario.didNotHappen.map((line) => (
                      <p
                        key={line}
                        className="flex items-start gap-2 text-fl-ink-soft"
                      >
                        <Ban
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-fl-muted"
                          strokeWidth={2}
                        />
                        <span>{line}</span>
                      </p>
                    ))}
                  </div>

                  <p className="border-t border-fl-line bg-fl-surface-alt px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fl-muted">
                    resolution: {scenario.resolutionTime}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {!scenario && (
              <div className="rounded-2xl border border-dashed border-fl-line bg-fl-surface p-8 text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fl-muted">
                  The conversation appears once a case is selected
                </p>
              </div>
            )}
          </div>

          {/* Flow — single-column vertical timeline below the chat panel */}
          <div className="relative mt-12 md:mt-16">
            <div
              aria-hidden="true"
              className="absolute left-[19px] top-2 bottom-2 w-px bg-fl-line"
            />
            <ol className="space-y-7">
              {STAGE_TEMPLATE.map((s, i) => {
                const branches = scenario?.stages[i]?.branches ?? [];
                const stageReady = branches.length > 0 && scenario;
                return (
                  <li
                    key={s.number}
                    className="relative grid grid-cols-[40px_1fr] gap-4 md:gap-6"
                  >
                    {/* Stage marker */}
                    <div className="relative flex h-10 w-10 items-center justify-center">
                      <span
                        className={cn(
                          "absolute inset-0 rounded-full",
                          TONE_DOT[s.tone],
                          s.tone === "neutral" &&
                            "ring-4 ring-fl-pastel-neutral",
                        )}
                      />
                      <span className="relative font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                        {s.number}
                      </span>
                    </div>

                    <div>
                      {/* Stage header — always visible */}
                      <header
                        className={cn("rounded-xl px-4 py-3", TONE_BG[s.tone])}
                      >
                        <p
                          className="font-mono text-[10px] uppercase tracking-[0.2em]"
                          style={{ opacity: 0.75 }}
                        >
                          Step {s.number} · {s.title}
                        </p>
                        <h3 className="mt-1 text-base font-semibold leading-tight md:text-lg">
                          {s.caption}
                        </h3>
                      </header>

                      {/* Branches — animated swap, or dashed placeholder */}
                      <AnimatePresence mode="wait">
                        {stageReady && (
                          <motion.ul
                            key={`branches-${scenario.id}-${s.number}`}
                            initial={
                              reduce ? false : { opacity: 0, y: 6 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            exit={
                              reduce ? undefined : { opacity: 0, y: -6 }
                            }
                            transition={{
                              duration: fadeDuration,
                              ease: "easeOut",
                              delay: stageEnterDelay(i),
                            }}
                            className="mt-2.5 space-y-2"
                          >
                            {branches.map((b, j) => {
                              const Icon = b.icon;
                              return (
                                <li
                                  key={`${s.number}-${j}`}
                                  className="rounded-xl border border-fl-line bg-white px-4 py-3"
                                >
                                  {/* Chip on the left, action title to the
                                      right. No second line — kept
                                      deliberately terse. */}
                                  <div className="flex items-center gap-3">
                                    <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-fl-surface-alt px-1.5 py-1 text-[11px] text-fl-ink ring-1 ring-fl-line">
                                      <Icon
                                        className={cn(
                                          "h-3 w-3",
                                          b.iconColor || "text-fl-ink",
                                        )}
                                      />
                                      <span className="font-medium">
                                        {b.via}
                                      </span>
                                    </span>
                                    <p className="text-sm font-semibold leading-snug text-fl-ink">
                                      {b.action}
                                    </p>
                                  </div>
                                </li>
                              );
                            })}
                          </motion.ul>
                        )}
                      </AnimatePresence>

                      {/* Empty placeholder when no scenario selected */}
                      {!scenario && (
                        <div className="mt-2.5 rounded-xl border border-dashed border-fl-line bg-fl-surface px-4 py-3">
                          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fl-muted">
                            Awaiting case
                          </p>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

        </div>
      </div>
    </section>
  );
}
