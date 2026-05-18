import { WHY_POINTS } from "@/content/sections";
import { FadeUp } from "@/components/motion/FadeUp";
import { Pill } from "@/components/brand/Pill";

export function WhyFiveleaf() {
  return (
    <section className="bg-fl-bg text-white">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <FadeUp>
          <div className="max-w-3xl">
            <Pill tone="white" uppercase>
              Why Fiveleaf
            </Pill>
            <h2 className="font-display mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-white md:text-5xl">
              Built like an in-house team. Without the hiring.
            </h2>
          </div>
        </FadeUp>

        <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {WHY_POINTS.map(({ icon: Icon, title, body }, i) => (
            <FadeUp key={title} delay={i * 0.04}>
              <div className="flex items-start gap-5">
                <span className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/15">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-white/70">{body}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
