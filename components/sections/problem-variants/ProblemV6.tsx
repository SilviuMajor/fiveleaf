import { FadeUp } from "@/components/motion/FadeUp";
import { PROBLEM_HEADER, PROBLEMS } from "./problems-data";

/**
 * ProblemV6 — Black background, white text. No icons.
 *
 * Same dashed-card layout as the live Problem section (mono label +
 * H2 inside, 2×2 grid), inverted to a near-black band with a
 * low-opacity white dashed border. Punchier, more editorial; the
 * section reads as a deliberate dark beat between two light ones.
 */
export function ProblemV6() {
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
              {PROBLEMS.map((p) => (
                <li key={p.title}>
                  <p className="font-display text-lg font-semibold tracking-tight text-white md:text-xl">
                    {p.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/65 md:mt-2.5 md:text-base">
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
