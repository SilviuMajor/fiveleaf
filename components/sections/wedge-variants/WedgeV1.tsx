import { Check } from "lucide-react";
import { Pill, type PillTone } from "@/components/brand/Pill";
import { cn } from "@/lib/utils";

/**
 * WedgeV1 — Three concise cards, Fiveleaf hero.
 *
 * Strips the comparison from a 5-row table to one card per option.
 * Each card carries a one-line tagline + 3 short bullets. Fiveleaf
 * sits in the middle column on full-saturation sage with a subtle
 * ring; the other two recede on /70 pastels.
 */

type Card = {
  name: string;
  tone: PillTone;
  hero?: boolean;
  tagline: string;
  bullets: string[];
};

const CARDS: Card[] = [
  {
    name: "DIY platforms",
    tone: "sand",
    tagline: "A toolkit. You hire a team to use it.",
    bullets: [
      "Voiceflow, Botpress, Intercom Fin",
      "Internal AI team required",
      "Maintenance is yours forever",
    ],
  },
  {
    name: "Fiveleaf",
    tone: "sage",
    hero: true,
    tagline: "A working agent in 4 to 8 weeks.",
    bullets: [
      "Cost of one customer-service hire",
      "Built for you, run by us",
      "Plugs into the stack you already run",
    ],
  },
  {
    name: "Big consultancies",
    tone: "rose",
    tagline: "A deck. Six figures. Twelve months.",
    bullets: [
      "Accenture, Deloitte, BCG-X",
      "You operate it after handover",
      "Roadmap drift is on you",
    ],
  },
];

const HEADER_BG: Record<"sand" | "sage" | "rose", string> = {
  sand: "bg-fl-pastel-sand/70",
  sage: "bg-fl-pastel-sage",
  rose: "bg-fl-pastel-rose/70",
};

export function WedgeV1() {
  return (
    <section className="bg-fl-surface">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
        <div className="max-w-3xl">
          <Pill tone="neutral" uppercase>
            Why we exist
          </Pill>
          <h2 className="font-display mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            Two ways to add AI. Both have a catch.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5">
          {CARDS.map((c) => (
            <article
              key={c.name}
              className={cn(
                "flex flex-col overflow-hidden rounded-2xl border bg-white",
                c.hero
                  ? "border-fl-pastel-sage-ink/20 ring-2 ring-fl-pastel-sage shadow-md md:scale-[1.02]"
                  : "border-fl-line",
              )}
            >
              <header className={cn("px-5 py-4", HEADER_BG[c.tone as "sand" | "sage" | "rose"])}>
                <Pill
                  tone={c.tone}
                  uppercase
                  className={cn(
                    "bg-white/65",
                    c.hero && "px-3.5 py-1.5 text-sm tracking-[0.14em]",
                  )}
                >
                  {c.name}
                </Pill>
              </header>
              <div className="flex flex-1 flex-col gap-4 px-5 py-5">
                <p
                  className={cn(
                    "font-display text-lg font-semibold leading-snug tracking-tight",
                    c.hero ? "text-fl-ink" : "text-fl-ink-soft",
                  )}
                >
                  {c.tagline}
                </p>
                <ul className="space-y-2 text-sm text-fl-ink-soft">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <Check
                        className={cn(
                          "mt-1 h-3 w-3 shrink-0",
                          c.hero ? "text-fl-pastel-sage-ink" : "text-fl-muted",
                        )}
                        strokeWidth={2.5}
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-balance font-display text-xl font-semibold leading-snug tracking-tight text-fl-ink md:text-2xl">
          We build it for you. You don&apos;t build it with us, you don&apos;t build it on us.
        </p>
      </div>
    </section>
  );
}
