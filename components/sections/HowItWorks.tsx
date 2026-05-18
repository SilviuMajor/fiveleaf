"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PROCESS_STEPS } from "@/content/sections";
import { FadeUp } from "@/components/motion/FadeUp";
import { Pill } from "@/components/brand/Pill";

const LINE_DURATION = 1.4;

export function HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <section id="how" className="bg-fl-surface-alt scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <FadeUp>
          <div className="max-w-3xl">
            <Pill tone="neutral" uppercase>
              How it works
            </Pill>
            <h2 className="font-display mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              Five steps from first call to live agent.
            </h2>
          </div>
        </FadeUp>

        <div className="relative mt-16">
          {/* Static track behind the markers */}
          <div
            aria-hidden="true"
            className="absolute left-[1.25rem] right-[1.25rem] top-5 hidden h-px bg-fl-line md:block"
          />

          {/* Animated progress line that draws 1 → 5 */}
          <motion.div
            aria-hidden="true"
            initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: reduce ? 0 : LINE_DURATION, ease: "easeInOut" }}
            style={{ transformOrigin: "left" }}
            className="absolute left-[1.25rem] right-[1.25rem] top-5 hidden h-px bg-fl-ink md:block"
          />

          {/* Markers and step bodies render immediately; only the connecting
              line between them animates. This guarantees step 01 is present
              from initial paint regardless of scroll/animation state. */}
          <ol className="grid gap-10 md:grid-cols-5 md:gap-4">
            {PROCESS_STEPS.map((step) => (
              <li key={step.number} className="relative">
                <span className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-fl-ink font-mono text-xs font-semibold text-white">
                  {step.number}
                </span>

                <div className="mt-5">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-fl-muted">
                    {step.duration}
                  </p>
                  <h3 className="mt-2 text-base font-semibold tracking-tight text-fl-ink md:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fl-ink-soft">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Closing callout — the commercial punchline of the section */}
        <FadeUp delay={0.2}>
          <div className="mt-16 overflow-hidden rounded-2xl border border-fl-pastel-sage-ink/15 bg-fl-pastel-sage/40">
            <div className="grid gap-8 px-7 py-8 md:grid-cols-[1.1fr_1fr_1fr] md:items-center md:gap-10 md:px-10 md:py-10">
              <p className="font-display text-2xl font-semibold leading-tight tracking-tight text-fl-ink md:text-[1.75rem]">
                AI capability compounds from the first agent on.
              </p>
              <Stat duration="4 to 8 weeks" caption="first agent live" />
              <Stat duration="1 to 3 weeks" caption="every agent after" />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function Stat({ duration, caption }: { duration: string; caption: string }) {
  return (
    <div>
      <p className="font-mono text-3xl font-semibold leading-none tracking-tight tabular-nums text-fl-ink md:text-4xl">
        {duration}
      </p>
      <p className="mt-2 text-sm text-fl-ink-soft">{caption}</p>
    </div>
  );
}
