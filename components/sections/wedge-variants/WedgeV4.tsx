import { Pill } from "@/components/brand/Pill";

/**
 * WedgeV4 — Editorial pull-quote + three labelled chips.
 *
 * The most concise of the four. A big editorial sentence carries the
 * entire argument; three short chips beneath name the options without
 * any table at all. Best for high-confidence buyers who don't need
 * the comparison spelled out.
 */

const CATCHES = [
  {
    label: "DIY platforms",
    catch: "needs a team",
    detail: "Voiceflow, Botpress, Intercom Fin",
    tone: "bg-fl-pastel-sand/70 text-fl-pastel-sand-ink",
  },
  {
    label: "Big consultancies",
    catch: "12 months and £200k",
    detail: "Accenture, Deloitte, BCG-X",
    tone: "bg-fl-pastel-rose/70 text-fl-pastel-rose-ink",
  },
  {
    label: "Fiveleaf",
    catch: "8 weeks, cost of one hire",
    detail: "Built for you, run by us",
    tone: "bg-fl-pastel-sage text-fl-pastel-sage-ink ring-2 ring-fl-pastel-sage-ink/20",
  },
];

export function WedgeV4() {
  return (
    <section className="bg-fl-surface">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <div className="max-w-4xl">
          <Pill tone="neutral" uppercase>
            Why we exist
          </Pill>

          <h2 className="font-display mt-6 text-balance text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl">
            The first option needs a team.{" "}
            <span className="text-fl-ink-soft">The second needs twelve months.</span>{" "}
            We do it in eight weeks for the cost of one hire.
          </h2>
        </div>

        {/* Three labelled chips, equal weight visually except Fiveleaf */}
        <div className="mt-14 grid gap-3 md:mt-16 md:grid-cols-3 md:gap-5">
          {CATCHES.map((c) => (
            <div
              key={c.label}
              className={`flex flex-col gap-1.5 rounded-2xl px-5 py-5 ${c.tone}`}
            >
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em]">
                {c.label}
              </p>
              <p className="font-display text-lg font-semibold leading-snug tracking-tight md:text-xl">
                {c.catch}
              </p>
              <p className="text-xs opacity-75">{c.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
