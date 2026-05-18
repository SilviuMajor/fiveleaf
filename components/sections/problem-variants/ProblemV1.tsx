import { FadeUp } from "@/components/motion/FadeUp";
import { Pill } from "@/components/brand/Pill";
import { PROBLEM_HEADER, PROBLEMS } from "./problems-data";

/**
 * ProblemV1 — 2×2 typographic grid.
 *
 * No cards, no boxes, no icons. Just a 2×2 grid of bold display
 * headlines with a body line each, separated by hairline dividers
 * (vertical between columns, horizontal between rows). Most editorial
 * of the four — reads like a one-page list of facts.
 */
export function ProblemV1() {
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
          <div className="mt-14 grid grid-cols-1 border-t border-fl-line md:grid-cols-2 md:divide-x md:divide-fl-line">
            {PROBLEMS.map((p, i) => (
              <div
                key={p.title}
                className={`px-0 py-8 md:px-8 md:py-10 ${
                  i < PROBLEMS.length - 1
                    ? "border-b border-fl-line"
                    : "border-b border-fl-line md:border-b-0"
                } ${i === 2 ? "md:border-b-0" : ""}`}
              >
                <p className="font-display text-balance text-2xl font-semibold leading-[1.15] tracking-tight text-fl-ink md:text-[1.75rem]">
                  {p.title}
                </p>
                <p className="mt-3 max-w-md text-base leading-relaxed text-fl-ink-soft md:text-lg">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
