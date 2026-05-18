"use client";

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
import { Pill, type PillTone } from "@/components/brand/Pill";

/**
 * AgentsV1 — Subway-style vertical rail with horizontal integration
 * arms.
 *
 * Four numbered stations stack down a central vertical line; each
 * station extends a horizontal arm to the right with the systems that
 * stage actually touches. Reads like a real schematic rather than a
 * marketing pipeline.
 */

type IntegrationItem = {
  label: string;
  icon: React.ComponentType<{ className?: string }> | LucideIcon;
};

type Stage = {
  id: string;
  number: string;
  title: string;
  caption: string;
  tone: PillTone;
  integrations: IntegrationItem[];
};

const STAGES: Stage[] = [
  {
    id: "input",
    number: "01",
    title: "Input",
    caption: "Customer reaches out",
    tone: "sand",
    integrations: [
      { label: "WhatsApp", icon: Smartphone },
      { label: "Voice", icon: Phone },
      { label: "Email", icon: Mail },
      { label: "Web chat", icon: MessageSquare },
    ],
  },
  {
    id: "context",
    number: "02",
    title: "Context",
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
    number: "03",
    title: "Reason",
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
    number: "04",
    title: "Act",
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

const TONE_DOT: Record<PillTone, string> = {
  neutral: "bg-fl-ink",
  sky: "bg-fl-pastel-sky-ink",
  sand: "bg-fl-pastel-sand-ink",
  sage: "bg-fl-pastel-sage-ink",
  lavender: "bg-fl-pastel-lavender-ink",
  rose: "bg-fl-pastel-rose-ink",
  ink: "bg-fl-ink",
  white: "bg-white",
};

export function AgentsV1() {
  return (
    <section className="bg-fl-surface-alt">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
        <div className="max-w-3xl">
          <Pill tone="neutral" uppercase>
            AI agents in plain English
          </Pill>
          <h2 className="font-display mt-5 text-balance text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
            One loop. Every system you already run.
          </h2>
          <p className="mt-5 max-w-2xl text-base text-fl-ink-soft md:text-lg">
            Each station on the rail is a stage in the pipeline. The arms show
            where it talks to your stack.
          </p>
        </div>

        {/* Vertical rail */}
        <div className="relative mt-14 ml-2 md:ml-6">
          {/* The rail line itself */}
          <div
            aria-hidden="true"
            className="absolute left-[19px] top-3 bottom-3 w-px bg-fl-ink"
          />

          <ol className="space-y-10 md:space-y-12">
            {STAGES.map((s) => (
              <li key={s.id} className="relative grid grid-cols-[40px_1fr] items-start gap-4 md:gap-8">
                {/* Station dot */}
                <div className="relative flex h-10 w-10 items-center justify-center">
                  <span
                    className={`absolute inset-0 rounded-full ${TONE_DOT[s.tone]} ${s.tone === "neutral" ? "ring-4 ring-fl-pastel-neutral" : ""}`}
                  />
                  <span className="relative font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                    {s.number}
                  </span>
                </div>

                {/* Station body */}
                <div className="md:grid md:grid-cols-[180px_1fr] md:items-start md:gap-8">
                  <div>
                    <h3 className="font-display text-xl font-semibold leading-tight tracking-tight text-fl-ink md:text-2xl">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-sm text-fl-ink-soft">{s.caption}</p>
                  </div>

                  {/* Horizontal arm with integration chips */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 md:mt-0">
                    {/* Arm connector — horizontal line */}
                    <span
                      aria-hidden="true"
                      className="hidden h-px w-6 bg-fl-line md:inline-block"
                    />
                    {s.integrations.map((i) => {
                      const Icon = i.icon;
                      return (
                        <span
                          key={i.label}
                          className="inline-flex items-center gap-1.5 rounded-md border border-fl-line bg-white px-2.5 py-1.5 text-xs text-fl-ink shadow-sm"
                        >
                          <Icon className="h-3.5 w-3.5" />
                          <span className="font-medium">{i.label}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-12 max-w-2xl text-base text-fl-ink-soft md:text-lg">
          Same loop, every time. Each station is built once, configured to your stack,
          and runs forever.
        </p>
      </div>
    </section>
  );
}
