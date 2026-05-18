import { ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/motion/FadeUp";
import { Pill } from "@/components/brand/Pill";
import { PROBLEM_HEADER, type ProblemCopy } from "./problems-data";

/**
 * ProblemV4Copy — the V4 (symptom → consequence) layout, but the copy
 * is passed in so we can A/B different voices on the preview page.
 * Left = the recognisable pain, right = the cost (new information,
 * never a restatement of the left).
 */
export function ProblemV4Copy({ points }: { points: ProblemCopy[] }) {
  return (
    <section className="bg-fl-surface-alt">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <FadeUp>
          <div className="max-w-3xl">
            <Pill tone="neutral" uppercase>
              {PROBLEM_HEADER.pill}
            </Pill>
            <h2 className="font-display mt-5 text-balance text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
              {PROBLEM_HEADER.h2}
            </h2>
          </div>
        </FadeUp>

        <FadeUp delay={0.05}>
          <div className="mt-14 overflow-hidden rounded-2xl border border-fl-line bg-white">
            <div className="hidden grid-cols-[1.1fr_1.6fr] border-b border-fl-line md:grid">
              <p className="border-r border-fl-line px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-fl-muted">
                What you&rsquo;re seeing
              </p>
              <p className="px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-fl-muted">
                What it costs you
              </p>
            </div>

            <ul>
              {points.map((p, i) => (
                <li
                  key={p.symptom}
                  className={`grid gap-3 px-6 py-6 md:grid-cols-[1.1fr_1.6fr] md:gap-0 md:px-0 md:py-0 ${
                    i < points.length - 1 ? "border-b border-fl-line" : ""
                  }`}
                >
                  <div className="flex items-start gap-3 md:border-r md:border-fl-line md:px-6 md:py-7">
                    <ArrowRight className="mt-1.5 h-3.5 w-3.5 shrink-0 text-fl-muted" />
                    <p className="font-display text-lg font-semibold leading-snug tracking-tight text-fl-ink md:text-[1.25rem]">
                      {p.symptom}
                    </p>
                  </div>
                  <p className="text-base leading-relaxed text-fl-ink-soft md:px-6 md:py-7 md:text-[1.0625rem]">
                    {p.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
