import {
  Brain,
  CalendarCheck,
  Mail,
  MessageSquare,
  Phone,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import {
  SiAnthropic,
  SiHubspot,
  SiOpenai,
  SiPostgresql,
  SiSalesforce,
  SiSlack,
  SiSnowflake,
  SiStripe,
  SiZendesk,
} from "react-icons/si";
import { Pill } from "@/components/brand/Pill";
import { cn } from "@/lib/utils";

/**
 * AgentsV3 — Horizontal pipeline with stacked tech below each stage.
 *
 * Same four-stage backbone as the live version, but each stage card now
 * shows a small grid of brand glyphs underneath the caption — the
 * actual systems that stage talks to. More information density without
 * blowing out the layout.
 */

type IntegrationItem = {
  label: string;
  icon: React.ComponentType<{ className?: string }> | LucideIcon;
};

type Stage = {
  id: string;
  label: string;
  caption: string;
  tone: "sand" | "sky" | "neutral" | "sage";
  integrations: IntegrationItem[];
};

const STAGES: Stage[] = [
  {
    id: "input",
    label: "01 · Input",
    caption: "Customer reaches out",
    tone: "sand",
    integrations: [
      { label: "WhatsApp", icon: Smartphone },
      { label: "Voice", icon: Phone },
      { label: "Email", icon: Mail },
      { label: "Web", icon: MessageSquare },
    ],
  },
  {
    id: "context",
    label: "02 · Context",
    caption: "Agent pulls what it needs",
    tone: "sky",
    integrations: [
      { label: "Salesforce", icon: SiSalesforce },
      { label: "HubSpot", icon: SiHubspot },
      { label: "Postgres", icon: SiPostgresql },
      { label: "Snowflake", icon: SiSnowflake },
    ],
  },
  {
    id: "reason",
    label: "03 · Reason",
    caption: "Decides the next move",
    tone: "neutral",
    integrations: [
      { label: "OpenAI", icon: SiOpenai },
      { label: "Anthropic", icon: SiAnthropic },
      { label: "Policy", icon: Brain },
    ],
  },
  {
    id: "act",
    label: "04 · Act",
    caption: "Closes the loop",
    tone: "sage",
    integrations: [
      { label: "Stripe", icon: SiStripe },
      { label: "Zendesk", icon: SiZendesk },
      { label: "Calendar", icon: CalendarCheck },
      { label: "Slack", icon: SiSlack },
    ],
  },
];

const TONE_BG: Record<Stage["tone"], string> = {
  sand: "bg-fl-pastel-sand text-fl-pastel-sand-ink",
  sky: "bg-fl-pastel-sky text-fl-pastel-sky-ink",
  sage: "bg-fl-pastel-sage text-fl-pastel-sage-ink",
  neutral: "bg-fl-ink text-white",
};

export function AgentsV3() {
  return (
    <section className="bg-fl-surface-alt">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
        <div className="max-w-3xl">
          <Pill tone="neutral" uppercase>
            AI agents in plain English
          </Pill>
          <h2 className="font-display mt-5 text-balance text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
            Four stages. Wired into your stack.
          </h2>
          <p className="mt-5 max-w-2xl text-base text-fl-ink-soft md:text-lg">
            Each stage in the loop talks to the systems your team already runs.
            Same loop, every time, no matter the channel.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-4 lg:gap-3">
          {STAGES.map((s) => (
            <article
              key={s.id}
              className={cn(
                "flex flex-col rounded-2xl",
                TONE_BG[s.tone],
              )}
            >
              <div className="px-5 py-5">
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.2em]"
                  style={{ opacity: 0.7 }}
                >
                  {s.label}
                </p>
                <h3 className="mt-2 text-base font-semibold leading-tight">
                  {s.caption}
                </h3>
              </div>

              {/* Integrations grid */}
              <div className="mt-auto rounded-b-2xl bg-white/85 p-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-fl-muted">
                  Talks to
                </p>
                <ul className="mt-2.5 grid grid-cols-2 gap-1.5">
                  {s.integrations.map((i) => {
                    const Icon = i.icon;
                    return (
                      <li
                        key={i.label}
                        className="flex items-center gap-1.5 rounded-md bg-fl-surface-alt px-2 py-1.5 text-xs text-fl-ink"
                      >
                        <Icon className="h-3 w-3 shrink-0" />
                        <span className="truncate font-medium">{i.label}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {[
            { label: "Avg input → action", value: "2.1s" },
            { label: "Resolved no-human", value: "1,000+/mo" },
            { label: "Channels", value: "5+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-fl-line bg-white p-5"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fl-muted">
                {stat.label}
              </p>
              <p className="font-display mt-2 text-3xl font-semibold leading-none tracking-tight">
                <span className="font-mono tabular-nums">{stat.value}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
