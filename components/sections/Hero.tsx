import { ArrowRight } from "lucide-react";
import { Pill } from "@/components/brand/Pill";
import { SITE } from "@/lib/site";
import { HeroTheatre } from "@/components/sections/HeroTheatre";

/**
 * Hero — the above-the-fold section of the homepage.
 *
 * This file is intentionally a server component (no "use client" at
 * the top) so the static text, pill, H1, CTA, and gradient render
 * directly into the SSR HTML byte stream. That means the first paint
 * of the headline is essentially instant — the visitor sees the
 * "We build AI agents…" headline the moment the HTML arrives, before
 * any JS has downloaded.
 *
 * The interactive widget on the right — the rotating scenarios
 * theatre — is a separate client component (HeroTheatre). React
 * Server Components let us compose the two cleanly: the theatre is
 * still server-rendered (so its placeholder structure is in the HTML
 * and there is no layout shift), but only its subtree needs JS to
 * become interactive and to start animating. The rest of the hero
 * has zero JS cost.
 *
 * Net effect: the framer-motion runtime, the rotating-scenario
 * timers, and the scenario data are no longer in the hero's initial
 * render path. On slower connections and lower-end devices the
 * difference in perceived load is significant.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-fl-bg text-white">
      <div className="fl-hero-gradient" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-14 px-6 pt-28 pb-20 md:px-10 lg:grid-cols-[1fr_1.05fr] lg:pt-36 lg:pb-28">
        <div className="fl-hero-fade">
          <Pill tone="white" uppercase>
            AI agents for high-volume customer operations
          </Pill>
          <h1 className="font-display mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-[3.5rem]">
            We build AI agents that run inside your business. Not tools you have to learn.
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/70 md:text-lg">
            Fiveleaf designs, builds and operates bespoke AI agents for customer service,
            sales, retention and operations. Fully integrated into your stack. Continuously
            optimised by us.
          </p>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href={SITE.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-base font-medium text-fl-ink transition-colors hover:bg-white/90"
            >
              Book a discovery call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <p className="mt-10 max-w-xl text-sm text-white/55">
            Trusted by a leading UK ISP &middot;{" "}
            <span className="font-mono text-white/80">5:1</span> monthly return &middot;{" "}
            <span className="font-mono text-white/80">1,000+</span> tickets automated every month.
          </p>
        </div>

        <div className="lg:pl-4">
          <HeroTheatre />
        </div>
      </div>
    </section>
  );
}
