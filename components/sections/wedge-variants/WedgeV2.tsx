import { Pill } from "@/components/brand/Pill";

/**
 * WedgeV2 — 2×2 quadrant matrix.
 *
 * Plots the three options on a "done for you ↔ DIY" × "affordable ↔
 * expensive" matrix. Fiveleaf sits in the bottom-right quadrant — done
 * for you AND affordable — visually distinct from DIY (cheap but
 * effort) and consultancies (done for you but expensive). The empty
 * top-left quadrant ("expensive AND DIY") is intentionally hollow:
 * "nobody offers that" is the implicit punchline.
 *
 * The whole thing is a single SVG so the dots, axes and labels stay
 * pixel-perfect across viewports.
 */

export function WedgeV2() {
  return (
    <section className="bg-fl-surface">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-16">
          <div>
            <Pill tone="neutral" uppercase>
              Why we exist
            </Pill>
            <h2 className="font-display mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              The third option lives in the empty corner.
            </h2>
            <p className="mt-5 max-w-md text-base text-fl-ink-soft md:text-lg">
              Buy a platform and build it yourself. Hire a consultancy and wait a year. Or pick
              the corner nobody else operates in.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-fl-ink-soft">
              <li className="flex items-baseline gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fl-muted">
                  DIY
                </span>
                <span>Affordable, but you operate it forever.</span>
              </li>
              <li className="flex items-baseline gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fl-muted">
                  Consult.
                </span>
                <span>Done for you, then handed to your team.</span>
              </li>
              <li className="flex items-baseline gap-3 text-fl-ink">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em]">
                  Fiveleaf
                </span>
                <span className="font-medium">Done for you, ongoing, at the cost of one hire.</span>
              </li>
            </ul>
          </div>

          {/* Matrix */}
          <div className="relative">
            <svg
              viewBox="0 0 480 480"
              className="h-auto w-full"
              role="img"
              aria-label="Two-by-two matrix plotting DIY platforms, big consultancies and Fiveleaf across cost and operating effort"
            >
              {/* axis lines */}
              <line x1="50" y1="50" x2="50" y2="430" stroke="#E5E5E5" strokeWidth="1" />
              <line x1="50" y1="430" x2="430" y2="430" stroke="#E5E5E5" strokeWidth="1" />
              {/* grid quadrant separators */}
              <line x1="50" y1="240" x2="430" y2="240" stroke="#F2F2F2" strokeDasharray="3 3" />
              <line x1="240" y1="50" x2="240" y2="430" stroke="#F2F2F2" strokeDasharray="3 3" />

              {/* axis labels */}
              <text x="40" y="48" textAnchor="end" fontSize="10" fill="#737373" fontFamily="ui-monospace, monospace" letterSpacing="2">
                EXPENSIVE
              </text>
              <text x="40" y="438" textAnchor="end" fontSize="10" fill="#737373" fontFamily="ui-monospace, monospace" letterSpacing="2">
                CHEAP
              </text>
              <text x="50" y="455" fontSize="10" fill="#737373" fontFamily="ui-monospace, monospace" letterSpacing="2">
                YOU OPERATE
              </text>
              <text x="430" y="455" textAnchor="end" fontSize="10" fill="#737373" fontFamily="ui-monospace, monospace" letterSpacing="2">
                DONE FOR YOU
              </text>

              {/* DIY: bottom-left quadrant — affordable + you operate */}
              <g>
                <circle cx="125" cy="350" r="14" fill="oklch(0.94 0.045 70)" stroke="#0F1115" strokeWidth="1.5" />
                <text x="148" y="346" fontSize="13" fontWeight="600" fill="#0F1115" fontFamily="ui-sans-serif">
                  DIY platforms
                </text>
                <text x="148" y="362" fontSize="11" fill="#525252" fontFamily="ui-sans-serif">
                  Voiceflow, Botpress
                </text>
              </g>

              {/* Consultancies: top-right — expensive + done for you */}
              <g>
                <circle cx="345" cy="135" r="14" fill="oklch(0.94 0.045 25)" stroke="#0F1115" strokeWidth="1.5" />
                <text x="345" y="105" textAnchor="middle" fontSize="13" fontWeight="600" fill="#0F1115" fontFamily="ui-sans-serif">
                  Big consultancies
                </text>
                <text x="345" y="122" textAnchor="middle" fontSize="11" fill="#525252" fontFamily="ui-sans-serif">
                  Accenture, Deloitte, BCG-X
                </text>
              </g>

              {/* Fiveleaf: bottom-right — affordable + done for you (the empty corner) */}
              <g>
                {/* highlight rect */}
                <rect x="252" y="260" width="170" height="160" rx="14" fill="oklch(0.95 0.04 145)" opacity="0.4" />
                <circle cx="345" cy="345" r="20" fill="#0F1115" />
                <circle cx="345" cy="345" r="6" fill="oklch(0.94 0.045 145)" />
                <text x="345" y="395" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0F1115" fontFamily="ui-sans-serif">
                  Fiveleaf
                </text>
                <text x="345" y="412" textAnchor="middle" fontSize="11" fill="#525252" fontFamily="ui-sans-serif">
                  the third option
                </text>
              </g>

              {/* Empty top-left annotation */}
              <text x="125" y="135" textAnchor="middle" fontSize="11" fill="#A3A3A3" fontFamily="ui-monospace, monospace" letterSpacing="1.5">
                NOBODY
              </text>
              <text x="125" y="150" textAnchor="middle" fontSize="11" fill="#A3A3A3" fontFamily="ui-monospace, monospace" letterSpacing="1.5">
                LIVES HERE
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
