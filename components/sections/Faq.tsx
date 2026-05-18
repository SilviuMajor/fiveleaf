"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/content/sections";
import { FadeUp } from "@/components/motion/FadeUp";
import { Pill } from "@/components/brand/Pill";

export function Faq() {
  return (
    <section id="faq" className="bg-fl-surface scroll-mt-24">
      <div className="mx-auto max-w-3xl px-6 py-24 md:px-10 md:py-32">
        <FadeUp>
          <div>
            <Pill tone="neutral" uppercase>
              FAQ
            </Pill>
            <h2 className="font-display mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              Questions buyers actually ask.
            </h2>
          </div>
        </FadeUp>

        <FadeUp delay={0.05}>
          <Accordion className="mt-10 w-full">
            {FAQS.map(({ q, a }) => (
              <AccordionItem key={q}>
                <AccordionTrigger className="text-left text-base font-medium text-fl-ink md:text-lg">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-fl-ink-soft">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeUp>
      </div>
    </section>
  );
}
