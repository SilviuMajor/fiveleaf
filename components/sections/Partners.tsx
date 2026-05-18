import { Plus } from "lucide-react";
import type { ComponentType } from "react";
import {
  SiSalesforce,
  SiHubspot,
  SiZendesk,
  SiIntercom,
  SiTwilio,
  SiWhatsapp,
  SiMeta,
  SiApple,
  SiSlack,
  SiOpenai,
  SiAnthropic,
  SiSnowflake,
  SiPostgresql,
  SiStripe,
  SiGooglebigquery,
} from "react-icons/si";
import {
  PARTNERS,
  INTEGRATION_CAPABILITIES,
  type PartnerCategory,
} from "@/content/sections";
import { FadeUp } from "@/components/motion/FadeUp";
import { Pill } from "@/components/brand/Pill";

const CATEGORIES: PartnerCategory[] = [
  "CRM",
  "Helpdesk",
  "Telephony",
  "Messaging",
  "Comms",
  "AI / LLM",
  "Data",
  "Billing & ops",
];

type IconCmp = ComponentType<{ className?: string }>;

// Brand glyphs sourced from simple-icons via react-icons. They're rendered at
// currentColor so the design system controls the tone (we use ink-soft for a
// muted, on-brand look that doesn't compete with the page typography).
// Brands react-icons/si covers — for the rest we render a monogram fallback.
const PARTNER_ICONS: Record<string, IconCmp | undefined> = {
  Salesforce: SiSalesforce,
  HubSpot: SiHubspot,
  Zendesk: SiZendesk,
  Intercom: SiIntercom,
  Twilio: SiTwilio,
  "WhatsApp Business": SiWhatsapp,
  "Meta Messenger": SiMeta,
  "SMS / iMessage": SiApple,
  Slack: SiSlack,
  OpenAI: SiOpenai,
  Anthropic: SiAnthropic,
  Snowflake: SiSnowflake,
  BigQuery: SiGooglebigquery,
  Postgres: SiPostgresql,
  Stripe: SiStripe,
};

function PartnerIcon({ name }: { name: string }) {
  const Icon = PARTNER_ICONS[name];
  if (Icon) {
    return <Icon className="h-4 w-4 shrink-0" />;
  }
  // Monogram fallback: small rounded square with first letter — used when the
  // brand isn't in simple-icons or we want a neutral mark.
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-sm bg-fl-ink text-[8px] font-bold leading-none text-white"
    >
      {name.charAt(0)}
    </span>
  );
}

export function Partners() {
  return (
    <section id="partners" className="bg-fl-surface scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <FadeUp>
          <div className="max-w-3xl">
            <Pill tone="neutral" uppercase>
              Stack-friendly
            </Pill>
            <h2 className="font-display mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              Vendor-agnostic. API-deep. Built around your stack, not ours.
            </h2>
            <p className="mt-5 max-w-2xl text-base text-fl-ink-soft md:text-lg">
              No rip-and-replace. No tenant lock-in. The integration layer is part of the
              build, not an afterthought.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.05}>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-fl-line bg-fl-line md:grid-cols-2 lg:grid-cols-4">
            {INTEGRATION_CAPABILITIES.map((cap) => (
              <div key={cap.label} className="bg-fl-surface p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fl-muted">
                  {cap.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-fl-ink-soft">{cap.body}</p>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="mt-16 grid gap-12 md:grid-cols-[260px_1fr] md:gap-16">
            <div className="md:sticky md:top-28 md:self-start">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fl-muted">
                Common integrations
              </p>
              <p className="mt-3 text-base leading-relaxed text-fl-ink-soft">
                These come up across active engagements. Plenty more covered. If yours
                isn&apos;t named, we&apos;ve almost certainly wired into it before, or built a
                custom adapter that does.
              </p>
            </div>

            <div className="space-y-6">
              {CATEGORIES.map((cat) => {
                const items = PARTNERS.filter((p) => p.category === cat);
                if (items.length === 0) return null;
                return (
                  <div
                    key={cat}
                    className="grid gap-3 border-b border-fl-line pb-6 last:border-0 last:pb-0 md:grid-cols-[160px_1fr] md:items-baseline md:gap-6"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-fl-ink">
                      {cat}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {items.map((p) => (
                        <span
                          key={p.name}
                          className="inline-flex items-center gap-2 rounded-lg border border-fl-line bg-fl-surface-alt px-3 py-2 text-sm font-medium text-fl-ink"
                        >
                          <span className="text-fl-ink-soft">
                            <PartnerIcon name={p.name} />
                          </span>
                          {p.name}
                        </span>
                      ))}
                      <span className="inline-flex items-center gap-1 rounded-lg border border-dashed border-fl-ink/40 bg-transparent px-3 py-2 text-sm font-medium text-fl-ink">
                        <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                        Custom
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="mt-16 rounded-2xl bg-fl-ink p-8 text-white md:p-12">
            <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-16">
              <p className="font-display text-balance text-2xl font-semibold leading-[1.2] tracking-tight md:text-3xl">
                If it has an API, a webhook, a database, or a CSV drop, we&apos;ll wire it in.
                Including the proprietary internal tool no one else has touched in five years.
              </p>
              <p className="text-sm text-white/70">
                Most engagements include 4 to 8 system integrations. The largest to date wires
                in 17. Auth, retries, rate-limits, observability, fallback paths: all handled
                by us, not your engineering team.
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
