import { Check } from "lucide-react";
import { DEPARTMENTS } from "@/content/sections";
import { FadeUp } from "@/components/motion/FadeUp";
import { Pill } from "@/components/brand/Pill";

export function Departments() {
  return (
    <section id="departments" className="bg-fl-surface-alt scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <FadeUp>
          <div className="max-w-3xl">
            <Pill tone="neutral" uppercase>
              Departments
            </Pill>
            <h2 className="font-display mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              Providing AI enhancements for every team that touches the customer.
            </h2>
            <p className="mt-5 max-w-2xl text-base text-fl-ink-soft md:text-lg">
              Same platform, different outcomes. Each lane plugs into the team that owns the
              metric, with the integrations and escalation logic shaped to that team&apos;s playbook.
            </p>
          </div>
        </FadeUp>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {DEPARTMENTS.map(({ id, name, icon: Icon, tagline, bullets, tone }, i) => (
            <FadeUp key={id} delay={i * 0.05}>
              <article className="flex h-full flex-col rounded-2xl border border-fl-line bg-white p-7 shadow-sm">
                <div className="flex items-center justify-between">
                  <Pill tone={tone} uppercase>
                    {name}
                  </Pill>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-fl-pastel-neutral text-fl-ink">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                </div>

                <p className="mt-6 text-base font-medium leading-snug text-fl-ink">
                  {tagline}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-fl-ink-soft">
                      <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-fl-pastel-neutral">
                        <Check className="h-3 w-3 text-fl-ink" strokeWidth={3} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
