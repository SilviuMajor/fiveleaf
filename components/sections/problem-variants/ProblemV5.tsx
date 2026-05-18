import { FadeUp } from "@/components/motion/FadeUp";
import { Pill } from "@/components/brand/Pill";
import { PROBLEM_HEADER, PROBLEMS } from "./problems-data";

/**
 * ProblemV5 — Dashed container holding the H2 + 4 problems in a 2×2.
 *
 * Direct shape of the "shared copy" preview card Silv liked, with an
 * icon added beside each problem. Visually distinct: the eyebrow Pill
 * sits outside the card, then a single dashed-bordered container
 * carries the H2 and the four items together as one cohesive block.
 *
 * Icons sit to the left of each problem's title in a small rounded
 * tile. List-style layout — tighter than separate cards, but the
 * outer dashed border still gives the section presence.
 */
export function ProblemV5() {
  return (
    <section className="bg-fl-surface-alt">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <FadeUp>
          <Pill tone="neutral" uppercase>
            {PROBLEM_HEADER.pill}
          </Pill>
        </FadeUp>

        <FadeUp delay={0.05}>
          <div className="mt-6 rounded-2xl border border-dashed border-fl-line bg-fl-surface p-6 md:mt-8 md:p-10">
            <h2 className="font-display max-w-3xl text-balance text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
              {PROBLEM_HEADER.h2}
            </h2>

            <ul className="mt-8 grid gap-6 md:mt-10 md:grid-cols-2 md:gap-x-10 md:gap-y-8">
              {PROBLEMS.map((p) => {
                const Icon = p.icon;
                return (
                  <li key={p.title} className="flex items-start gap-4">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-fl-pastel-neutral text-fl-ink ring-1 ring-fl-line">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-display text-base font-semibold tracking-tight text-fl-ink md:text-lg">
                        {p.title}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-fl-ink-soft md:text-[0.9375rem]">
                        {p.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
