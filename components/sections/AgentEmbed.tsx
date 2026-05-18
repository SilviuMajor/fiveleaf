"use client";

import Script from "next/script";
import { ArrowRight, Sparkles } from "lucide-react";
import { SITE } from "@/lib/site";
import { FadeUp } from "@/components/motion/FadeUp";
import { Pill } from "@/components/brand/Pill";

export function AgentEmbed() {
  const { embedUrl } = SITE.agent;
  const hasEmbed = embedUrl.length > 0;

  return (
    <section id="agent" className="bg-fl-bg text-white scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <FadeUp>
          <div className="max-w-3xl">
            <Pill tone="white" uppercase>
              The agent in action
            </Pill>
            <h2 className="font-display mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-white md:text-5xl">
              Don&apos;t take our word for it. Talk to one of ours.
            </h2>
            <p className="mt-5 max-w-2xl text-base text-white/70 md:text-lg">
              This is the same AI agent technology we deploy for clients. Ask it anything about
              Fiveleaf, AI agents, or what we&apos;d build for your business.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.05}>
          <div className="mt-12 rounded-3xl border border-white/10 bg-fl-bg-soft p-6 md:p-10">
            {hasEmbed ? (
              <>
                <div id="fl-agent" className="min-h-[480px]" />
                <Script src={embedUrl} strategy="lazyOnload" />
              </>
            ) : (
              <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-fl-ink">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-lg font-semibold text-white">
                      Talk to our AI agent
                    </p>
                    <p className="mt-1 max-w-xl text-sm text-white/70">
                      Live agent embed launching shortly. In the meantime, the fastest way to
                      see what we&apos;d build for your business is a 30-minute call.
                    </p>
                  </div>
                </div>
                <a
                  href={SITE.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-fl-ink transition-colors hover:bg-white/90"
                >
                  Book a call
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
