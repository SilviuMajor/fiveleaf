"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Ban, CheckCircle2, Sparkles } from "lucide-react";
import { Pill } from "@/components/brand/Pill";
import { cn } from "@/lib/utils";
import {
  ALL_CATEGORIES_ORDER,
  SCENARIOS_BY_CATEGORY,
  type Category,
  type Stage,
} from "./scenarios";

/**
 * AgentTraceCondensed — V7. Single rich chat panel that absorbs the
 * thinking trace inline (the way the Hero's ThinkingTheatre does),
 * with the pill selector above and an explanatory paragraph + three
 * benefit tiles below. No separate four-stage cards.
 *
 * Goal: shorter section, denser panel, more like a real product
 * artefact than a pipeline diagram. The four stage labels still appear
 * but as compact mono dividers inside the "Inside the agent" zone, not
 * as standalone cards.
 *
 * Layout:
 *   1. Section header (pill + H2 + sub)
 *   2. Selector row ("Choose a case" + 5 pills)
 *   3. The chat panel (max-w-3xl, centred):
 *        - Channel + customer meta header
 *        - Inbound bubble
 *        - "Inside the agent" inline trace (4 stage blocks, each with
 *          a coloured dot + label + branch chips)
 *        - Outbound bubble
 *        - Did/didn't outcomes
 *        - Resolution time
 *   4. Explanatory paragraph + 3 benefit tiles
 *
 * Uses the same `scenarios.ts` data as V5/V6. Cross-fades content on
 * pill change via AnimatePresence keyed on scenario id.
 */

const STAGE_TEMPLATE: Pick<Stage, "number" | "title" | "tone">[] = [
  { number: "01", title: "Input", tone: "sand" },
  { number: "02", title: "Context", tone: "sky" },
  { number: "03", title: "Reason", tone: "neutral" },
  { number: "04", title: "Act", tone: "sage" },
];

/** Low-opacity pastel fill applied to each stage card so the card
 *  itself signals which stage it represents (no separate coloured
 *  number badge needed). neutral stage gets a slightly stronger fill
 *  since the neutral pastel is the most muted of the four. */
const TONE_CARD_BG: Record<Stage["tone"], string> = {
  sand: "bg-fl-pastel-sand/45",
  sky: "bg-fl-pastel-sky/45",
  sage: "bg-fl-pastel-sage/45",
  neutral: "bg-fl-pastel-neutral/65",
};

/** Per-category pastel accent for the selected pill. Mapping per
 *  Silv's brief:
 *    Sales      → green   (sage)
 *    Retentions → pink    (rose)   ← unchanged
 *    Renewal    → purple  (lavender)
 *    Billing    → yellow  (sand)
 *    Support    → blue    (sky)
 *  No dedicated yellow exists in the pastel palette; sand is the
 *  closest warm tone and reads as cream-yellow. */
const CATEGORY_TONE: Record<Category, string> = {
  Sales:
    "bg-fl-pastel-sage text-fl-pastel-sage-ink ring-2 ring-fl-pastel-sage-ink/20",
  Retentions:
    "bg-fl-pastel-rose text-fl-pastel-rose-ink ring-2 ring-fl-pastel-rose-ink/20",
  Renewal:
    "bg-fl-pastel-lavender text-fl-pastel-lavender-ink ring-2 ring-fl-pastel-lavender-ink/20",
  Billing:
    "bg-fl-pastel-sand text-fl-pastel-sand-ink ring-2 ring-fl-pastel-sand-ink/20",
  Support:
    "bg-fl-pastel-sky text-fl-pastel-sky-ink ring-2 ring-fl-pastel-sky-ink/20",
};

const IDLE_PILL =
  "border border-fl-line bg-white text-fl-ink-soft hover:bg-fl-surface-alt hover:text-fl-ink";

type Props = {
  sectionId?: string;
  pill?: string;
  h2?: string;
  sub?: string;
  prompt?: string;
};

export function AgentTraceCondensed({
  sectionId,
  pill = "AI agents in plain English",
  h2 = "Watch the agent run a real case.",
  sub = "Pick a case. The agent reads the message, pulls the context it needs, decides the next move, and closes the loop. Same backbone, different jobs.",
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

  const fadeDuration = reduce ? 0 : 0.25;

  return (
    <section id={sectionId} className="bg-fl-surface-alt scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
        {/* 1. Header */}
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

        {/* 2. Selector */}
        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 md:mt-12">
          <p className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-fl-ink">
            {prompt}
            <span aria-hidden="true">→</span>
          </p>
          <div role="tablist" aria-label={prompt} className="flex flex-wrap gap-2">
            {ALL_CATEGORIES_ORDER.map((cat) => {
              const isSelected = selected === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  aria-controls="agent-trace-condensed-tabpanel"
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

        {/* 3. Single chat panel — all the action lives here */}
        <div
          id="agent-trace-condensed-tabpanel"
          role="tabpanel"
          aria-live="polite"
          className="mt-10 md:mt-12"
        >
          <div className="mx-auto max-w-3xl">
            <AnimatePresence mode="wait">
              {scenario && (
                <motion.div
                  key={scenario.id}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: fadeDuration, ease: "easeOut" }}
                  className="overflow-hidden rounded-2xl border border-fl-line bg-white shadow-sm"
                >
                  {/* Window chrome */}
                  <header className="flex items-center justify-between border-b border-fl-line bg-fl-surface-alt px-4 py-3">
                    <div className="flex items-center gap-2.5">
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
                        </span>
                        {" · "}
                        {scenario.customer.name}
                        {" · "}
                        {scenario.customer.meta}
                      </p>
                    </div>
                    <span className="hidden items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fl-muted sm:inline-flex">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      live
                    </span>
                  </header>

                  {/* Conversation: inbound bubble immediately followed
                      by outbound bubble. The thinking trace lives below
                      so the exchange reads first. */}
                  <div className="space-y-2.5 px-4 py-4">
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

                  {/* Inside the agent — four dashed-outline cards in a
                      2×2 grid on desktop, stacked on mobile. Each card's
                      label sits cut into the dashed top border like an
                      HTML fieldset legend. The whole zone is on the
                      panel's white background so the bg-white labels
                      mask the dashed line cleanly. */}
                  <div className="border-t border-fl-line bg-white px-5 pt-5 pb-6">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-fl-ink-soft" />
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fl-muted">
                        Inside the agent
                      </p>
                    </div>

                    <div className="mt-5 grid gap-x-3 gap-y-5 md:grid-cols-2">
                      {STAGE_TEMPLATE.map((s, i) => {
                        const branches = scenario.stages[i]?.branches ?? [];
                        return (
                          <div
                            key={s.number}
                            className={cn(
                              "relative rounded-xl border border-dashed border-fl-line px-4 pt-5 pb-3.5",
                              TONE_CARD_BG[s.tone],
                            )}
                          >
                            {/* Fieldset-legend label — cuts through the
                                top dashed border. bg-white matches the
                                surrounding panel so the cut reads
                                cleanly. The colour now lives on the card
                                itself (TONE_CARD_BG), so the legend is
                                just the step + name as text. */}
                            <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 inline-flex items-center bg-white px-2.5">
                              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-fl-ink">
                                {s.number} · {s.title}
                              </span>
                            </span>

                            {/* Branches inside the card. White chips on
                                the pastel card so the integration name
                                still pops. */}
                            <ul className="space-y-1.5">
                              {branches.map((b, j) => {
                                const Icon = b.icon;
                                return (
                                  <li
                                    key={`${s.number}-${j}`}
                                    className="flex items-center gap-2"
                                  >
                                    <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-white px-1.5 py-0.5 text-[10px] text-fl-ink ring-1 ring-fl-line">
                                      <Icon
                                        className={cn(
                                          "h-2.5 w-2.5",
                                          b.iconColor || "text-fl-ink",
                                        )}
                                      />
                                      <span className="font-medium">
                                        {b.via}
                                      </span>
                                    </span>
                                    <p className="text-xs leading-snug text-fl-ink">
                                      {b.action}
                                    </p>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Resolution time — final footer */}
                  <p className="border-t border-fl-line bg-fl-surface-alt px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fl-muted">
                    resolution: {scenario.resolutionTime}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* No-selection placeholder — outside AnimatePresence so it
                mounts/unmounts cleanly without confusing the
                presence-driven swap between scenarios. */}
            {!scenario && (
              <div className="rounded-2xl border border-dashed border-fl-line bg-white py-16 text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fl-muted">
                  Pick a case above to see the agent run it
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 4. Outcomes (per scenario) + explanatory paragraph + benefit tiles */}
        <div className="mx-auto mt-12 max-w-3xl md:mt-16">
          {/* Outcomes — only when a case is selected. Sits at the start
              of the lower section as the "what just happened" lead-in. */}
          <AnimatePresence mode="wait">
            {scenario && (
              <motion.div
                key={`outcomes-${scenario.id}`}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: fadeDuration, ease: "easeOut" }}
                className="mb-12"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fl-muted">
                  What just happened
                </p>
                <ul className="mt-3 space-y-2.5">
                  {scenario.didHappen.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-2.5 text-sm text-fl-ink md:text-base"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                        strokeWidth={2.5}
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                  {scenario.didNotHappen.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-2.5 text-sm text-fl-ink-soft md:text-base"
                    >
                      <Ban
                        className="mt-0.5 h-4 w-4 shrink-0 text-fl-muted"
                        strokeWidth={2}
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fl-muted">
            Why this works
          </p>
          <p className="mt-3 text-base leading-relaxed text-fl-ink md:text-lg">
            Whether the customer reaches out, the business reaches out, or your
            team needs an answer, the loop is the same. The agent reads the
            message, pulls everything it needs from the systems you already
            run, decides the next move against your playbook, and closes the
            loop on the channel the customer started on. Each stage is built
            once, configured to your stack, and runs forever.
          </p>

          <a
            href="#departments"
            className="mt-6 inline-flex items-center gap-1.5 text-base font-semibold text-fl-ink hover:text-fl-ink-soft"
          >
            See how this maps to every team
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
