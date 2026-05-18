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

/**
 * AgentsV2 — Code-flow / pseudocode aesthetic.
 *
 * The pipeline rendered as if it were a function. Editorial
 * "engineering-shaped" treatment — feels native to a technical buyer
 * who wants to see how the loop is wired before reading marketing copy
 * about it. Brand glyphs render as inline coloured chips inside the
 * code block.
 */

type Chip = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
};

const SOURCES: Chip[] = [
  { name: "Salesforce", icon: SiSalesforce, color: "text-[#00A1E0]" },
  { name: "HubSpot", icon: SiHubspot, color: "text-[#FF7A59]" },
  { name: "Postgres", icon: SiPostgresql, color: "text-[#4169E1]" },
  { name: "Snowflake", icon: SiSnowflake, color: "text-[#29B5E8]" },
];

const MODELS: Chip[] = [
  { name: "Anthropic", icon: SiAnthropic, color: "text-[#D4A27F]" },
  { name: "OpenAI", icon: SiOpenai, color: "text-fl-ink" },
];

const ACTIONS: Chip[] = [
  { name: "Stripe", icon: SiStripe, color: "text-[#635BFF]" },
  { name: "Zendesk", icon: SiZendesk, color: "text-[#03363D]" },
  { name: "Slack", icon: SiSlack, color: "text-[#4A154B]" },
];

function ChipPill({ name, icon: Icon, color }: Chip) {
  return (
    <span className="inline-flex items-center gap-1 rounded bg-white px-1.5 py-0.5 ring-1 ring-fl-line">
      <Icon className={`h-3 w-3 ${color}`} />
      <span className="font-mono text-[11px] text-fl-ink">{name}</span>
    </span>
  );
}

export function AgentsV2() {
  return (
    <section className="bg-fl-surface-alt">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
        <div className="max-w-3xl">
          <Pill tone="neutral" uppercase>
            AI agents in plain English
          </Pill>
          <h2 className="font-display mt-5 text-balance text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
            The loop, in fewer than a dozen lines.
          </h2>
          <p className="mt-5 max-w-2xl text-base text-fl-ink-soft md:text-lg">
            Every customer message runs through the same four steps. We build them
            once, wire them to your stack, and let them compound.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-fl-line bg-fl-bg shadow-2xl">
          {/* Editor chrome */}
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
              fiveleaf · agent.loop
            </span>
          </div>

          {/* Code body */}
          <pre className="overflow-x-auto px-6 py-6 font-mono text-[13px] leading-[1.85] text-white md:px-10 md:py-8 md:text-sm">
            <code>
              <span className="text-white/40">{"// 01 · Input. Receive the message"}</span>
              {"\n"}
              <span className="text-[#79B8FF]">async function</span>{" "}
              <span className="text-[#FFD580]">handle</span>(message)
              <span>{" {"}</span>
              {"\n  "}
              <span className="text-white/40">{"// 02 · Context. Pull what the agent needs"}</span>
              {"\n  "}
              <span className="text-[#79B8FF]">const</span> ctx = <span className="text-[#79B8FF]">await</span>{" "}
              <span className="text-[#FFD580]">fetchContext</span>(message, [
              {"\n      "}
              <ChipBlock chips={SOURCES} />
              {"\n  "})
              {"\n  "}
              <span className="text-white/40">{"// 03 · Reason. Decide intent, policy, plan"}</span>
              {"\n  "}
              <span className="text-[#79B8FF]">const</span> plan = <span className="text-[#79B8FF]">await</span>{" "}
              <span className="text-[#FFD580]">reason</span>(message, ctx, [
              {"\n      "}
              <ChipBlock chips={MODELS} />
              {"\n  "})
              {"\n  "}
              <span className="text-white/40">{"// 04 · Act. Close the loop"}</span>
              {"\n  "}
              <span className="text-[#79B8FF]">return</span>{" "}
              <span className="text-[#79B8FF]">await</span>{" "}
              <span className="text-[#FFD580]">act</span>(plan, [
              {"\n      "}
              <ChipBlock chips={ACTIONS} />
              {"\n  "})
              {"\n"}
              <span>{"}"}</span>
            </code>
          </pre>

          <div className="grid gap-4 border-t border-white/10 px-6 py-4 text-[11px] font-mono uppercase tracking-[0.16em] text-white/55 md:grid-cols-3 md:px-10">
            <div>avg input → action · 2.1s</div>
            <div>resolved no-human · 1,000+/mo</div>
            <div>channels · 5+</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChipBlock({ chips }: { chips: Chip[] }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5 align-middle">
      {chips.map((c, i) => (
        <span key={c.name} className="inline-flex items-center">
          <ChipPill {...c} />
          {i < chips.length - 1 && <span className="mx-1 text-white/40">,</span>}
        </span>
      ))}
    </span>
  );
}
