import { ArrowRight } from "lucide-react";
import { STAT_TILES } from "@/content/sections";
import { FadeUp } from "@/components/motion/FadeUp";
import { StatCounter } from "@/components/motion/StatCounter";
import { Pill } from "@/components/brand/Pill";
import { SITE } from "@/lib/site";

export function CaseStudy() {
  const named = SITE.features.namedCaseStudy;

  return (
    <section id="case-study" className="bg-fl-surface scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <FadeUp>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Pill tone="sage" uppercase>
                Case study
              </Pill>
              <h2 className="font-display mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
                How {named ? "Hey! Broadband" : "a leading UK ISP"} built a platform that
                returns{" "}
                <span className="bg-fl-pastel-sage px-2 py-0.5 rounded-md text-fl-pastel-sage-ink">
                  5:1 every month
                </span>
                .
              </h2>

              <div className="mt-8 space-y-5 text-base leading-relaxed text-fl-ink-soft md:text-[1.05rem]">
                {named ? (
                  <p>
                    Hey! Broadband, a UK fibre ISP, runs multi-channel customer
                    operations across web, WhatsApp, voice and email. Tier-one
                    support, technical troubleshooting, sales and renewals, all
                    running through one operation, all under volume pressure.
                  </p>
                ) : (
                  <p>
                    A leading UK fibre ISP, part of a national networks group, runs
                    multi-channel customer operations across web, WhatsApp, voice and email.
                    Tier-one support, technical troubleshooting, sales and renewals, all
                    running through one operation, all under volume pressure.
                  </p>
                )}
                <p>
                  We built a multi-agent system, integrated with their billing and CRM
                  platform and a live human-handover portal. Live in production on text
                  channels with telephony rolling next. Each new agent (renewals, retentions,
                  sales follow-up) plugs into the same foundation, so capability compounds
                  over time.
                </p>
                <p>
                  Across five months, the platform absorbed half the inbound volume,
                  captured thousands of out-of-hours enquiries the team would have lost,
                  and put a measurable five-figure dent in monthly support cost. The
                  run-rate return is roughly 5x the monthly investment.
                </p>
              </div>

              <a
                href={SITE.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-fl-ink px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-fl-ink-soft"
              >
                Want this for your business? Book a call
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {STAT_TILES.map((tile, i) => {
                const isHero = i === 0;
                return (
                  <div
                    key={tile.label}
                    className={`rounded-2xl border p-6 ${
                      isHero
                        ? "col-span-2 bg-fl-ink text-white border-transparent"
                        : "bg-fl-surface-alt border-fl-line"
                    }`}
                  >
                    <p
                      className={`font-display text-4xl font-semibold leading-none tracking-tight md:text-5xl ${
                        isHero ? "text-white" : "text-fl-ink"
                      }`}
                    >
                      {tile.staticDisplay ? (
                        <span className="font-mono tabular-nums">
                          {tile.prefix}
                          {tile.value}
                          {tile.suffix}
                        </span>
                      ) : (
                        <StatCounter
                          value={tile.numeric}
                          prefix={tile.prefix}
                          suffix={tile.suffix}
                        />
                      )}
                    </p>
                    <p
                      className={`mt-3 text-sm ${
                        isHero ? "text-white/70" : "text-fl-muted"
                      }`}
                    >
                      {tile.label}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-fl-muted">
              All numbers verified with the client. Methodology on request.
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
