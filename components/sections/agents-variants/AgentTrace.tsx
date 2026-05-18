import { Ban, CheckCircle2 } from "lucide-react";
import { Pill } from "@/components/brand/Pill";
import { cn } from "@/lib/utils";
import type { Scenario, Stage } from "./scenarios";

/**
 * AgentTrace — renders one Scenario in the V4 layout.
 *
 * Layout (per the latest brief):
 *   - Top row, two columns on lg+:
 *       LEFT  : section pill + H2 + subhead
 *       RIGHT : channel meta + customer message rendered as a hero
 *               blockquote so the reader knows what's being responded
 *               to before scanning the trace.
 *   - Below: a two-column grid with the vertical trace on the left and
 *     a sticky reply panel on the right (just the agent reply +
 *     did/didn't outcomes, no duplicate of the inbound message).
 *
 * The component is data-driven — pass any `Scenario` and the render
 * adapts (channel icon, customer meta, branches, reply, outcomes).
 * That's how the preview page can show four very different
 * interactions with one component.
 */

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

export function AgentTrace({ scenario }: { scenario: Scenario }) {
  const ChannelIcon = scenario.channel.icon;
  return (
    <section className="bg-fl-surface-alt">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
        {/* Top row: header on the left, customer message hero on the right */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-12">
          <div>
            <Pill tone="neutral" uppercase>
              {scenario.pill}
            </Pill>
            <h2 className="font-display mt-5 text-balance text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
              {scenario.h2}
            </h2>
            <p className="mt-5 max-w-xl text-base text-fl-ink-soft md:text-lg">
              {scenario.sub}
            </p>
          </div>

          {/* Customer message hero */}
          <div>
            <div className="flex items-center gap-3 text-sm text-fl-ink-soft">
              <span
                className={cn(
                  "inline-flex h-7 w-7 items-center justify-center rounded-full bg-fl-pastel-neutral",
                  scenario.channel.color,
                )}
              >
                <ChannelIcon className="h-3.5 w-3.5" />
              </span>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fl-muted">
                {scenario.channel.name} · {scenario.customer.name} ·{" "}
                {scenario.customer.meta}
              </p>
            </div>
            <blockquote className="mt-3 rounded-2xl border-l-4 border-fl-ink bg-white px-5 py-5 shadow-sm md:px-7 md:py-6">
              <p className="font-display text-2xl font-semibold leading-tight tracking-tight text-fl-ink md:text-3xl">
                &ldquo;{scenario.message}&rdquo;
              </p>
            </blockquote>
          </div>
        </div>

        {/* Below: trace on the left, reply panel sticky on the right */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:items-start lg:gap-10 md:mt-14">
          {/* Trace — the four stages */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute left-[19px] top-2 bottom-2 w-px bg-fl-line"
            />
            <ol className="space-y-7">
              {scenario.stages.map((s) => (
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
                        s.tone === "neutral" && "ring-4 ring-fl-pastel-neutral",
                      )}
                    />
                    <span className="relative font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                      {s.number}
                    </span>
                  </div>

                  <div>
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
                    <ul className="mt-2.5 space-y-2">
                      {s.branches.map((b, i) => {
                        const Icon = b.icon;
                        return (
                          <li
                            key={`${s.number}-${i}`}
                            className="rounded-xl border border-fl-line bg-white px-4 py-3"
                          >
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-sm font-semibold leading-snug text-fl-ink">
                                {b.action}
                              </p>
                              <span className="inline-flex items-center gap-1 rounded-md bg-fl-surface-alt px-1.5 py-0.5 text-[11px] text-fl-ink ring-1 ring-fl-line">
                                <Icon
                                  className={cn(
                                    "h-3 w-3",
                                    b.iconColor || "text-fl-ink",
                                  )}
                                />
                                <span className="font-medium">{b.via}</span>
                              </span>
                            </div>
                            <p className="mt-1 text-xs leading-relaxed text-fl-ink-soft">
                              <span className="text-fl-muted">→</span>{" "}
                              {b.result}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Reply panel — agent reply + outcomes only (no duplicate
              inbound message; that's already shown above) */}
          <aside className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-2xl border border-fl-line bg-white shadow-sm">
              <header className="flex items-center justify-between border-b border-fl-line bg-fl-surface-alt px-4 py-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fl-muted">
                  What{" "}
                  {scenario.replyTo ?? scenario.customer.name.split(" ")[0]}{" "}
                  receives
                </p>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fl-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  agent
                </span>
              </header>

              <div className="p-4">
                <div className="flex">
                  <p className="max-w-[95%] rounded-2xl rounded-bl-sm bg-fl-ink px-3 py-2.5 text-sm leading-relaxed text-white">
                    {scenario.reply}
                  </p>
                </div>
              </div>

              {/* Outcomes — what happened, what didn't */}
              <div className="space-y-2 border-t border-fl-line bg-fl-surface-alt px-4 py-3 text-xs">
                {scenario.didHappen.map((line) => (
                  <p key={line} className="flex items-start gap-2 text-fl-ink">
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
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
