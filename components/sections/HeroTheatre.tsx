"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Bot,
  CheckCircle2,
  Mail,
  MessageSquare,
  Phone,
  Smartphone,
  User,
} from "lucide-react";

/**
 * HeroTheatre — the interactive "ThinkingTheatre" widget that lives on
 * the right-hand side of the Hero section.
 *
 * Extracted from Hero.tsx so the rest of the hero (text, pill, H1,
 * CTA, gradient) can render as a server component. That means the
 * above-the-fold text content paints immediately from the SSR HTML
 * byte stream, with no need to wait for the framer-motion runtime,
 * the scenario data, the timers, or any of this component's JS.
 *
 * Only the theatre itself needs client-side JS, and that JS now
 * loads and hydrates just this subtree — not the whole hero. The
 * effect on perceived load on slower devices is significant: the
 * H1 and CTA are visible the moment HTML arrives, instead of after
 * React hydrates the full Hero.
 */

type ThinkingStep = {
  system: string; // category — CRM, KB, Telephony, Stripe…
  step: string;
};

type Scenario = {
  channel: { label: string; icon: typeof MessageSquare };
  user: string;
  thinking: ThinkingStep[];
  agent: string;
  action: { tag: string; system: string; label: string };
};

const SCENARIOS: Scenario[] = [
  {
    channel: { label: "WhatsApp", icon: Smartphone },
    user: "I want to cancel.",
    thinking: [
      { system: "CRM", step: "Loading Sarah Patel · 18mo · no open tickets" },
      { system: "KB", step: "Reading retention playbook · KB-RET-204" },
      { system: "Salesforce", step: "Checking 900Mb availability at GU2 7XH" },
    ],
    agent:
      "Sorry to hear that. Before we process, I can offer 900Mb at the price you pay now. Worth a look?",
    action: { tag: "RETAIN", system: "Salesforce", label: "Win-back offer presented" },
  },
  {
    channel: { label: "Voice", icon: Phone },
    user: "Why is my speed slower than I'm paying for?",
    thinking: [
      { system: "Salesforce", step: "Pulling account · plan 450Mb on file" },
      { system: "Plan", step: "Comparing to live sync · 18% below" },
      { system: "Calendar", step: "Looking up engineer slots near GU2" },
    ],
    agent:
      "Your line is syncing 18% below plan. I can run a remote diagnostic and book an engineer Saturday morning.",
    action: { tag: "BOOK", system: "Calendar", label: "Engineer slot Sat 10am" },
  },
  {
    channel: { label: "Email", icon: Mail },
    user: "Need a VAT invoice for last month.",
    thinking: [
      { system: "CRM", step: "Looking up account · invoice cycle April" },
      { system: "Stripe", step: "Generating invoice · INV-2026-04812" },
      { system: "Email", step: "Sending to billing@ on file" },
    ],
    agent: "Sent across. Reference INV-2026-04812. Anything else?",
    action: { tag: "EXEC", system: "Stripe", label: "Invoice issued · self-serve" },
  },
  {
    channel: { label: "SMS", icon: MessageSquare },
    user: "Why was my bill £14 higher this month?",
    thinking: [
      { system: "CRM", step: "Fetching account · billing 28-Apr" },
      { system: "Stripe", step: "Itemising charges · 1 install fee · 2 days pro-rata" },
      { system: "KB", step: "Pulling install fee policy · KB-BILL-019" },
    ],
    agent:
      "Two things this month: the £9 install fee from your upgrade and £4.92 pro-rata for the plan switch. Itemised receipt sent.",
    action: { tag: "EXEC", system: "Stripe", label: "Itemised receipt sent" },
  },
  {
    channel: { label: "Web chat", icon: MessageSquare },
    user: "Do you cover Bristol BS8 4? Looking to switch.",
    thinking: [
      { system: "Salesforce", step: "Checking BS8 4 coverage · gigabit available" },
      { system: "KB", step: "Pulling current promo · KB-PROMO-038" },
      { system: "HubSpot", step: "Creating lead · cold inbound · sales-ready" },
    ],
    agent:
      "Yes, gigabit fibre available at BS8 4. New customers get 6 months at 50% off. Want me to run an eligibility check?",
    action: { tag: "QUALIFY", system: "HubSpot", label: "Lead routed to sales" },
  },
];

const STEP_DURATIONS = {
  user: 1100,
  thinking: 2400,
  agent: 2300,
  action: 1500,
  rest: 1000,
} as const;

const SCENARIO_TOTAL =
  STEP_DURATIONS.user +
  STEP_DURATIONS.thinking +
  STEP_DURATIONS.agent +
  STEP_DURATIONS.action +
  STEP_DURATIONS.rest;

export function HeroTheatre() {
  const reduce = useReducedMotion();
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [phase, setPhase] = useState<
    "user" | "thinking" | "agent" | "action" | "rest"
  >("user");

  useEffect(() => {
    if (reduce) {
      setPhase("action");
      return;
    }
    setPhase("user");
    const t1 = setTimeout(() => setPhase("thinking"), STEP_DURATIONS.user);
    const t2 = setTimeout(
      () => setPhase("agent"),
      STEP_DURATIONS.user + STEP_DURATIONS.thinking,
    );
    const t3 = setTimeout(
      () => setPhase("action"),
      STEP_DURATIONS.user + STEP_DURATIONS.thinking + STEP_DURATIONS.agent,
    );
    const t4 = setTimeout(
      () => setPhase("rest"),
      STEP_DURATIONS.user +
        STEP_DURATIONS.thinking +
        STEP_DURATIONS.agent +
        STEP_DURATIONS.action,
    );
    const t5 = setTimeout(() => {
      setScenarioIdx((i) => (i + 1) % SCENARIOS.length);
    }, SCENARIO_TOTAL);
    return () => {
      [t1, t2, t3, t4, t5].forEach(clearTimeout);
    };
  }, [scenarioIdx, reduce]);

  const sc = SCENARIOS[scenarioIdx];
  const Channel = sc.channel.icon;
  const showUser = phase !== "user" || reduce;
  const showThinking = ["thinking", "agent", "action", "rest"].includes(phase);
  const showAgent = ["agent", "action", "rest"].includes(phase);
  const showAction = ["action", "rest"].includes(phase);

  // Unique systems touched in this scenario, for the footer summary.
  const systemsTouched = Array.from(
    new Set([...sc.thinking.map((t) => t.system), sc.action.system]),
  );

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-fl-bg-soft/95 shadow-2xl"
    >
      {/* Header strip */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-white/10">
            <Channel className="h-3 w-3" />
          </span>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
            {sc.channel.label} &middot; live
          </p>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/55">
          <motion.span
            className="block h-1.5 w-1.5 rounded-full bg-emerald-400"
            animate={{ opacity: reduce ? 1 : [0.3, 1, 0.3] }}
            transition={{
              duration: 1.4,
              repeat: reduce ? 0 : Infinity,
              ease: "easeInOut",
            }}
          />
          {scenarioIdx + 1} / {SCENARIOS.length}
        </div>
      </div>

      {/* Conversation area */}
      <div className="space-y-2.5 p-4 min-h-[120px]">
        <AnimatePresence>
          {showUser && (
            <motion.div
              key={`u-${scenarioIdx}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="flex justify-end gap-2"
            >
              <p className="max-w-[80%] rounded-2xl rounded-br-sm bg-white/10 px-3 py-2 text-sm text-white/90">
                {sc.user}
              </p>
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                <User className="h-3 w-3" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showAgent && (
            <motion.div
              key={`a-${scenarioIdx}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-start gap-2"
            >
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-fl-ink">
                <Bot className="h-3 w-3" />
              </span>
              <p className="max-w-[82%] rounded-2xl rounded-bl-sm bg-white/95 px-3 py-2 text-sm text-fl-ink">
                {sc.agent}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Inside-the-agent panel */}
      <div className="relative border-t border-white/10 bg-white/[0.04] px-4 py-3">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/55">
            Inside the agent
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">
            {phase === "user" ? "listening" : phase === "thinking" ? "thinking" : "ready"}
          </p>
        </div>

        <ol className="mt-2 space-y-1.5">
          {sc.thinking.map((step, i) => (
            <motion.li
              key={`${scenarioIdx}-${i}`}
              initial={reduce ? false : { opacity: 0, x: -4 }}
              animate={{
                opacity: showThinking || reduce ? 1 : 0,
                x: 0,
              }}
              transition={{
                delay: showThinking
                  ? (STEP_DURATIONS.thinking / 1000 / sc.thinking.length) * i * 0.55
                  : 0,
                duration: 0.25,
              }}
              className="flex items-start gap-2 text-[11px]"
            >
              <SystemBadge label={step.system} />
              <span className="font-mono leading-snug text-white/75">{step.step}</span>
            </motion.li>
          ))}
        </ol>

        <AnimatePresence>
          {showAction && (
            <motion.div
              key={`act-${scenarioIdx}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-2.5 py-1 ring-1 ring-emerald-400/30"
            >
              <CheckCircle2 className="h-3 w-3 text-emerald-300" />
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-200">
                [{sc.action.tag}]
              </span>
              <span className="text-[11px] font-medium text-emerald-50">
                {sc.action.label}
              </span>
              <span className="ml-1 font-mono text-[9px] text-emerald-200/70">
                via {sc.action.system}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer telemetry — systems touched + scenario dots */}
      <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/50">
        <span className="flex items-center gap-1.5">
          <span>systems:</span>
          <span className="flex flex-wrap gap-1">
            {systemsTouched.map((s, i) => (
              <span
                key={`${scenarioIdx}-${s}-${i}`}
                className="inline-flex items-center rounded-sm bg-white/10 px-1.5 py-0.5 text-[8px] tracking-[0.12em] text-white/70"
              >
                {s}
              </span>
            ))}
          </span>
        </span>
        <span className="flex items-center gap-1">
          {SCENARIOS.map((_, i) => (
            <span
              key={i}
              className="inline-block h-1 w-1 rounded-full"
              style={{
                backgroundColor:
                  i === scenarioIdx ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.18)",
              }}
            />
          ))}
        </span>
      </div>
    </motion.div>
  );
}

function SystemBadge({ label }: { label: string }) {
  return (
    <span className="mt-px inline-flex h-4 shrink-0 items-center rounded-sm bg-white/12 px-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/85 ring-1 ring-white/15">
      {label}
    </span>
  );
}
