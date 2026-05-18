import { FadeUp } from "@/components/motion/FadeUp";
import { PROBLEM_HEADER, PROBLEMS } from "./problems-data";

/**
 * ProblemV7 — Black background, white text, WITH icons.
 *
 * Same dark dashed-card treatment as V6, but each problem gets a
 * white-on-translucent icon tile to its left (the icons already live
 * on the PROBLEMS data). Slightly more product-y / structured than
 * V6's pure typography.
 */
export function ProblemV7() {
  return (
    <section className="bg-fl-bg text-white scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <FadeUp>
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-6 md:p-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
              {PROBLEM_HEADER.pill}
            </p>
            <h2 className="font-display mt-3 text-balance text-3xl font-semibold leading-[1.05] tracking-tight text-white md:mt-5 md:text-5xl">
              Four problems every operator hits.
              <br className="hidden md:inline" /> None get smaller on their own.
            </h2>

            <ul className="mt-10 grid gap-x-10 gap-y-8 md:mt-14 md:grid-cols-2 md:gap-y-10">
              {PROBLEMS.map((p) => {
                const Icon = p.icon;
                return (
                  <li key={p.title} className="flex items-start gap-4">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/15">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-display text-lg font-semibold tracking-tight text-white md:text-xl">
                        {p.title}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/65 md:text-base">
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
