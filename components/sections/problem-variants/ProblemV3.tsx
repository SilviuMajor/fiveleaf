import { FadeUp } from "@/components/motion/FadeUp";
import { Pill } from "@/components/brand/Pill";
import { PROBLEM_HEADER, PROBLEMS } from "./problems-data";

/**
 * ProblemV3 — 4 horizontal split rows, magazine layout.
 *
 * Each problem occupies its own full-width row. Within the row, a
 * left column carries the bold headline (~40%) and a right column
 * carries the body (~60%). Hairline dividers between rows. Reads as
 * an editorial spread rather than a grid.
 */
export function ProblemV3() {
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
          <ul className="mt-14 border-t border-fl-line">
            {PROBLEMS.map((p) => (
              <li
                key={p.title}
                className="grid gap-4 border-b border-fl-line py-8 md:grid-cols-[2fr_3fr] md:gap-12 md:py-10"
              >
                <p className="font-display text-balance text-2xl font-semibold leading-[1.1] tracking-tight text-fl-ink md:text-[2rem]">
                  {p.title}
                </p>
                <p className="text-base leading-relaxed text-fl-ink-soft md:pt-1.5 md:text-lg">
                  {p.body}
                </p>
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  );
}
