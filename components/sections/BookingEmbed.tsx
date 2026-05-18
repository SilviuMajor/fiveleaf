"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { Pill } from "@/components/brand/Pill";
import { FadeUp } from "@/components/motion/FadeUp";
import { SITE } from "@/lib/site";

/**
 * BookingEmbed — the page's single closing moment.
 *
 * Performance strategy:
 *  - The actual cal.com iframe + `@calcom/embed-react` wrapper live in
 *    `BookingCalFrame.tsx`, code-split via `next/dynamic` with `ssr: false`.
 *    That keeps the cal embed out of the initial bundle and off the critical
 *    path entirely.
 *  - The dynamic import is gated behind an IntersectionObserver. The cal
 *    chunk and the iframe only load once the user scrolls to within ~600px
 *    of the section, which means readers who never reach the bottom never
 *    pay for the embed.
 *  - Until then a static skeleton renders inside the same fixed-height
 *    container, so CLS stays at 0 regardless of when (or whether) the
 *    embed mounts.
 */

// Lazy-load only on the client. Skeleton is what shows until the
// IntersectionObserver flips `shouldLoad` to true.
const BookingCalFrame = dynamic(() => import("./BookingCalFrame"), {
  ssr: false,
  loading: () => <CalSkeleton />,
});

export function BookingEmbed() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      // Browsers without IO (very rare) just load the embed eagerly.
      setShouldLoad(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          obs.disconnect();
        }
      },
      // Start fetching the chunk well before the section is visible so the
      // calendar is ready by the time the user actually arrives.
      { rootMargin: "600px 0px" },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="book"
      className="relative isolate overflow-hidden bg-fl-ink text-white scroll-mt-24"
    >
      {/* Subtle dotted texture behind the headline */}
      <div
        className="absolute inset-0 -z-10 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          background:
            "radial-gradient(60% 50% at 30% 30%, rgba(220,230,242,0.10), transparent 70%), radial-gradient(50% 40% at 80% 70%, rgba(248,226,208,0.08), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <FadeUp>
          <div className="mx-auto max-w-3xl text-center">
            <Pill tone="white" uppercase>
              Book a call
            </Pill>
            <h2 className="font-display mt-5 text-balance text-3xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl">
              Stop adding seats. Start adding capacity.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-white/75 md:mt-6 md:text-lg">
              30-minute discovery call. No pitch. We&rsquo;ll tell you whether AI agents fit
              your business.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.05}>
          <div
            ref={sentinelRef}
            className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl md:mt-14"
          >
            <div className="min-h-[720px] sm:min-h-[760px] md:min-h-[820px]">
              {shouldLoad ? <BookingCalFrame /> : <CalSkeleton />}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/**
 * CalSkeleton — fills the embed container with a polite placeholder + a
 * direct link to cal.com so the section is never useless even on slow
 * networks or before the IntersectionObserver fires.
 */
function CalSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading the booking calendar"
      className="flex h-full min-h-[inherit] flex-col items-center justify-center gap-5 p-10 text-center text-fl-ink"
    >
      <p className="font-display text-xl font-semibold leading-tight tracking-tight md:text-2xl">
        Loading the calendar
      </p>
      <p className="max-w-sm text-sm text-fl-ink-soft">
        Pick a 30-minute slot. The calendar mounts as soon as you scroll
        this far.
      </p>
      <a
        href={SITE.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-fl-ink px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-fl-ink-soft"
      >
        Or open it on cal.com
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}
