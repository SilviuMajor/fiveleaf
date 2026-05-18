import Image from "next/image";
import { FadeUp } from "@/components/motion/FadeUp";
import { Pill } from "@/components/brand/Pill";

export function Founder() {
  return (
    <section id="founder" className="bg-fl-surface-alt scroll-mt-24">
      <div className="mx-auto max-w-4xl px-6 py-24 md:px-10 md:py-32">
        <FadeUp>
          <div className="grid items-center gap-10 md:grid-cols-[200px_1fr] md:gap-12">
            <div className="relative aspect-square w-[200px] overflow-hidden rounded-2xl ring-1 ring-fl-line">
              <Image
                src="/founder.png"
                alt="Silviu Major, founder of Fiveleaf"
                fill
                sizes="200px"
                quality={85}
                className="object-cover"
              />
            </div>
            <div>
              <Pill tone="neutral" uppercase>
                Founder
              </Pill>
              <p className="mt-5 text-lg leading-relaxed text-fl-ink md:text-xl">
                Fiveleaf is built and run by <span className="font-semibold">Silviu Major</span>.
                10+ years building automation systems inside enterprise SaaS, now applying that
                same operational rigour to AI implementation for mid-market businesses. Every
                Fiveleaf engagement runs through Silv personally. You&apos;re not handed off to
                a junior account manager three weeks in.
              </p>
              <p className="mt-4 text-sm text-fl-muted">
                Based in London. Working with operators across the UK.
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
