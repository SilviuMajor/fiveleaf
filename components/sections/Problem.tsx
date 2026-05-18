import { PROBLEM_POINTS } from "@/content/sections";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * Problem — "Four problems every operator hits" section.
 *
 * Single dashed-bordered card sitting on the section's surface-alt
 * background, so the card and the surrounding band share a colour and
 * only the dashed outline separates them. Inside the card:
 *   - mono "THE PROBLEM" label at the top
 *   - H2 ("Four problems every operator hits. None get smaller on
 *     their own.")
 *   - 2×2 grid of problems, each rendered as a bold title + body
 *     paragraph. No numbered markers.
 *
 * Copy + icons live in `content/sections.ts` as PROBLEM_POINTS.
 * Icons are kept on the data type but not rendered here — the live
 * section is type-only by design.
 */
export function Problem() {
  return (
    <section className="bg-fl-surface-alt scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <FadeUp>
          <div className="rounded-2xl border border-dashed border-fl-line bg-fl-surface-alt p-6 md:p-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fl-muted">
              The problem
            </p>
            <h2 className="font-display mt-3 text-balance text-3xl font-semibold leading-[1.05] tracking-tight text-fl-ink md:mt-5 md:text-5xl">
              Four problems every operator hits.
              <br className="hidden md:inline" /> None get smaller on their own.
            </h2>

            <ul className="mt-10 grid gap-x-10 gap-y-8 md:mt-14 md:grid-cols-2 md:gap-y-10">
              {PROBLEM_POINTS.map((p) => (
                <li key={p.title}>
                  <p className="font-display text-lg font-semibold tracking-tight text-fl-ink md:text-xl">
                    {p.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-fl-ink-soft md:mt-2.5 md:text-base">
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
