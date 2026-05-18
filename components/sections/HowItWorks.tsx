"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { PROCESS_STEPS } from "@/content/sections";
import { FadeUp } from "@/components/motion/FadeUp";
import { Pill } from "@/components/brand/Pill";

/**
 * HowItWorks — scroll-interactive vertical timeline.
 *
 * A single vertical rail runs down the left edge. As the section
 * scrolls through the viewport, an ink line *draws* down the rail
 * (scaleY bound to scroll progress, smoothed with a spring), and each
 * step fades + slides in as it enters view with its marker popping.
 *
 * Vertical on every breakpoint — reads best on mobile (the brief) and
 * still looks deliberate on desktop. Fully gated on
 * prefers-reduced-motion: line is shown full, steps render statically.
 */
export function HowItWorks() {
  const reduce = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);

  // Progress runs 0 → 1 as the rail travels from low in the viewport
  // up through the middle. Spring-smoothed so the line glides rather
  // than jitters with the scroll wheel.
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.8", "end 0.55"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

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

        <div ref={railRef} className="relative mt-14 md:mt-16">
          {/* Static faint track */}
          <div
            aria-hidden="true"
            className="absolute left-[19px] top-2 bottom-2 w-px bg-fl-line"
          />
          {/* Ink line that draws with scroll */}
          <motion.div
            aria-hidden="true"
            className="absolute left-[19px] top-2 bottom-2 w-px origin-top bg-fl-ink"
            style={{ scaleY: reduce ? 1 : lineScale }}
          />

          <ol className="space-y-12 md:space-y-14">
            {PROCESS_STEPS.map((step, i) => (
              <motion.li
                key={step.number}
                className="relative grid grid-cols-[40px_1fr] gap-5 md:gap-7"
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Marker */}
                <motion.span
                  className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-fl-ink font-mono text-xs font-semibold text-white ring-4 ring-fl-surface-alt"
                  initial={reduce ? false : { scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
                  transition={{
                    duration: 0.35,
                    ease: "easeOut",
                    delay: 0.1 + i * 0.02,
                  }}
                >
                  {step.number}
                </motion.span>

                <div className="pt-1">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-fl-muted">
                    {step.duration}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight text-fl-ink md:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-fl-ink-soft md:text-base">
                    {step.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Closing callout — the commercial punchline of the section */}
        <FadeUp delay={0.1}>
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
