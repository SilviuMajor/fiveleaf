import { FadeUp } from "@/components/motion/FadeUp";
import { Pill } from "@/components/brand/Pill";
import { PROBLEM_HEADER, PROBLEMS } from "./problems-data";
import { cn } from "@/lib/utils";

/**
 * ProblemV2 — 2×2 pastel-tinted cards.
 *
 * Each problem gets its own card with a subtle pastel wash and a small
 * icon in the top-left. Headline + body inside. The four pastels rotate
 * sand → sky → rose → sage so the four problems feel categorically
 * distinct without leaning on numbers.
 */

const TINTS = [
  "bg-fl-pastel-sand/45 ring-fl-pastel-sand-ink/15",
  "bg-fl-pastel-sky/45 ring-fl-pastel-sky-ink/15",
  "bg-fl-pastel-rose/45 ring-fl-pastel-rose-ink/15",
  "bg-fl-pastel-sage/45 ring-fl-pastel-sage-ink/15",
];

export function ProblemV2() {
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
          <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-5">
            {PROBLEMS.map((p, i) => {
              const Icon = p.icon;
              return (
                <article
                  key={p.title}
                  className={cn(
                    "rounded-2xl p-6 ring-1 md:p-8",
                    TINTS[i],
                  )}
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/70 text-fl-ink ring-1 ring-fl-line">
                    <Icon className="h-4 w-4" />
                  </span>
                  <p className="font-display mt-5 text-balance text-xl font-semibold leading-[1.15] tracking-tight text-fl-ink md:text-[1.625rem]">
                    {p.title}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-fl-ink-soft md:text-[1.0625rem]">
                    {p.body}
                  </p>
                </article>
              );
            })}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
