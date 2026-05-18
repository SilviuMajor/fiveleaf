import { Check } from "lucide-react";
import { FadeUp } from "@/components/motion/FadeUp";
import { Pill, type PillTone } from "@/components/brand/Pill";
import { cn } from "@/lib/utils";

/**
 * Wedge — "Why we exist". DIY platforms vs Big consultancies vs
 * Fiveleaf, rendered as three concise cards in a single row.
 *
 * Layout choice (V1 from /preview/wedge): each option carries one
 * one-line tagline and three short bullets. Fiveleaf sits in the
 * middle column on full-saturation sage with a subtle ring; DIY and
 * Consultancies recede on /70 pastels. Stack vertically on mobile.
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
    name: "Big consultancies",
    tone: "rose",
    tagline: "A deck. Six figures. Twelve months.",
    bullets: [
      "Accenture, Deloitte, BCG-X",
      "You operate it after handover",
      "Roadmap drift is on you",
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
];

const HEADER_BG: Record<"sand" | "sage" | "rose", string> = {
  sand: "bg-fl-pastel-sand/70",
  sage: "bg-fl-pastel-sage",
  rose: "bg-fl-pastel-rose/70",
};

export function Wedge() {
  return (
    <section id="wedge" className="bg-fl-surface scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <FadeUp>
          <div className="max-w-3xl">
            <Pill tone="neutral" uppercase>
              Why we exist
            </Pill>
            <h2 className="font-display mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              Two ways to add AI. Both have a catch.
            </h2>
            <p className="mt-5 max-w-2xl text-base text-fl-ink-soft md:text-lg">
              Most operators reach the same fork. The first option needs a team you
              don&rsquo;t have. The second costs more than the problem.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.05}>
          <div className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5">
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
                <header
                  className={cn(
                    "px-5 py-4",
                    HEADER_BG[c.tone as "sand" | "sage" | "rose"],
                  )}
                >
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
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="mt-10 max-w-3xl text-balance font-display text-xl font-semibold leading-snug tracking-tight text-fl-ink md:text-2xl">
            We build it for you. You don&rsquo;t build it with us, you don&rsquo;t build
            it on us.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
