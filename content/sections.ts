import type { LucideIcon } from "lucide-react";
import {
  Repeat,
  TrendingUp,
  Sparkles,
  Workflow,
  ShieldCheck,
  Handshake,
  Plug,
  Headphones,
  Megaphone,
  Cog,
  Brain,
  Zap,
  Users,
} from "lucide-react";
import type { PillTone } from "@/components/brand/Pill";

export type ProblemPoint = {
  /** The recognisable pain — the left column of the symptom →
   *  consequence table. Short and declarative. */
  symptom: string;
  /** The cost — the right column. New information, never a
   *  restatement of the symptom. */
  body: string;
};

/** Voice B (plain & blunt): short on the left, the real cost on the
 *  right. Left = the pain the reader lives; right = what it's
 *  actually doing to the business. */
export const PROBLEM_POINTS: ProblemPoint[] = [
  {
    symptom: "More tickets. Same team.",
    body: "You can't hire fast enough to match the curve, so service slips exactly where you can least afford it to.",
  },
  {
    symptom: "Out-of-hours goes unanswered.",
    body: "Demand doesn't wait for 9am. Most of it, and the sale attached, is gone before anyone reads it.",
  },
  {
    symptom: "The chatbot made it worse.",
    body: "It deflects under one in five and irritates the rest. Customers now distrust the channel on sight.",
  },
  {
    symptom: "The build never finished.",
    body: "Your specialist left at 60% done. What's left is a liability no one will put their name to.",
  },
];

export type AgentCapability = {
  icon: LucideIcon;
  verb: string;
  title: string;
  body: string;
  tone: PillTone;
};

export const AGENT_CAPABILITIES: AgentCapability[] = [
  {
    icon: Headphones,
    verb: "Communicate",
    title: "On every channel, in real time",
    body: "Web chat, WhatsApp, voice, email, SMS. Real two-way conversation in whichever channel your customer prefers. The agent listens, asks the right follow-ups, and replies in seconds.",
    tone: "sand",
  },
  {
    icon: Brain,
    verb: "Understand",
    title: "Your business, your customer",
    body: "Reads your knowledge base, pulls customer history from your CRM, knows your policies. Trained like a new hire who already passed the test.",
    tone: "sky",
  },
  {
    icon: Zap,
    verb: "Act",
    title: "End to end, no handoff fatigue",
    body: "Books, qualifies, troubleshoots, refunds, escalates. Closes the loop. Hands to a human only when the conversation really needs one.",
    tone: "sage",
  },
];

export type AgentActivation = "inbound" | "triggered" | "internal";

export type LaneAgent = {
  name: string;
  type: AgentActivation;
};

export type ServiceLane = {
  id: "retain" | "grow" | "optimise";
  name: string;
  icon: LucideIcon;
  agents: LaneAgent[];
  outcome: string;
  description: string;
  tone: PillTone;
  metric: { value: string; caption: string };
  changes: string[];
};

export const SERVICE_LANES: ServiceLane[] = [
  {
    id: "grow",
    name: "Grow",
    icon: TrendingUp,
    agents: [
      { name: "AI CS Agent", type: "inbound" },
      { name: "AI Sales & Lead Nurture Agent", type: "triggered" },
      { name: "Outbound AI Campaign Engine", type: "triggered" },
    ],
    outcome: "Convert more of the demand you're already paying to generate.",
    description:
      "Qualify leads, answer pre-sales questions in seconds, and run targeted outbound that feels personal at scale.",
    tone: "sand",
    metric: {
      value: "£15,000",
      caption:
        "monthly sales attributed to inbound AI qualification at our flagship deployment",
    },
    changes: [
      "Inbound chat that qualifies, books, and closes without a human handover",
      "Outbound nurture that adapts the script to each lead's last reply",
      "Demand from after-hours and weekend traffic, captured instead of dropped",
    ],
  },
  {
    id: "retain",
    name: "Retain",
    icon: Repeat,
    agents: [
      { name: "AI CS Agent", type: "inbound" },
      { name: "AI Renewals Agent", type: "triggered" },
      { name: "Customer Feedback & Follow-up Agent", type: "triggered" },
    ],
    outcome: "Hold on to revenue you've already won.",
    description:
      "Recover at-risk subscribers, surface churn signals early, and follow up on every cancellation request before it becomes one.",
    tone: "sky",
    metric: {
      value: "2,200+",
      caption: "out-of-hours enquiries captured every month that would otherwise be lost",
    },
    changes: [
      "Cancellation requests met with a real-time win-back offer instead of an inbox queue",
      "Renewal cycles managed by an agent that never forgets a date",
      "Churn signals surfaced from conversation language, not lagging surveys",
    ],
  },
  {
    id: "optimise",
    name: "Optimise",
    icon: Sparkles,
    agents: [
      { name: "AI CS Agent", type: "inbound" },
      { name: "Agent Copilot", type: "internal" },
      { name: "Quality Insights", type: "internal" },
    ],
    outcome: "Make every human agent perform like your best one.",
    description:
      "Suggest the right answer in real time, score every conversation, and turn QA from a bottleneck into a feedback loop.",
    tone: "sage",
    metric: {
      value: "1,000+",
      caption: "support tickets automated every month with no human in the loop",
    },
    changes: [
      "Tier-one tickets resolved without ever touching a human queue",
      "QA running on every conversation, not a 2% sample",
      "Agent copilot that catches missed offers and policy slips before they ship",
    ],
  },
];

export type Department = {
  id: "sales" | "support" | "ops";
  name: string;
  icon: LucideIcon;
  tagline: string;
  bullets: string[];
  tone: PillTone;
};

export const DEPARTMENTS: Department[] = [
  {
    id: "sales",
    name: "Sales",
    icon: Megaphone,
    tagline:
      "Convert visitors into prospects, reach out to your audience, and turn leads into customers.",
    bullets: [
      "Lead and appointment generation",
      "Inbound and outbound AI agents",
      "Guidance, qualification and FAQs",
      "Intelligent live handover",
      "Advanced AI sales scripting",
      "CRM and custom API integration",
    ],
    tone: "sand",
  },
  {
    id: "support",
    name: "Support",
    icon: Headphones,
    tagline:
      "AI agents built to provide 24/7 customer support and advanced troubleshooting.",
    bullets: [
      "Advanced troubleshooting",
      "Customer service and FAQs",
      "Ticketing and compliance",
      "24/7 availability",
      "Intelligent live handover",
      "CRM and custom API integration",
    ],
    tone: "sky",
  },
  {
    id: "ops",
    name: "Ops + HR",
    icon: Cog,
    tagline:
      "Automate internal process and employee nurturing using the latest in AI.",
    bullets: [
      "Process automation",
      "Revenue optimisation",
      "Automated employee onboarding",
      "Internal HR procedures",
      "CRM and custom API integration",
    ],
    tone: "lavender",
  },
];

export type ProcessStep = {
  number: string;
  title: string;
  duration: string;
  body: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    duration: "1 week",
    body: "We map your operations, channels, and the highest-value automation candidates.",
  },
  {
    number: "02",
    title: "Design",
    duration: "1 to 2 weeks",
    body: "Conversation flows, integrations, knowledge ingestion, and escalation logic, built to your team's existing playbook.",
  },
  {
    number: "03",
    title: "Build & integrate",
    duration: "3 to 5 weeks",
    body: "Agents, handover portal, CRM and helpdesk wiring, hosted by us, plugged into your stack.",
  },
  {
    number: "04",
    title: "Pilot & go-live",
    duration: "1 to 2 weeks",
    body: "Soft launch on a single channel, tune in production, onboard your team, then scale.",
  },
  {
    number: "05",
    title: "Run & expand",
    duration: "Ongoing",
    body: "Weekly check-ins, monthly performance reviews, expansion to new agents and channels.",
  },
];

export type WhyPoint = {
  icon: LucideIcon;
  title: string;
  body: string;
};

export const WHY_POINTS: WhyPoint[] = [
  {
    icon: Workflow,
    title: "We build it for you.",
    body: "No internal AI team required. No new platform to learn. You get the outcome, not another tool to manage.",
  },
  {
    icon: Users,
    title: "Embedded, not external.",
    body: "We work like a member of your team, not like an outside vendor. Direct channel access, weekly cadence, free conversations with whoever needs to be in the room. Your AI specialist, not your AI vendor.",
  },
  {
    icon: Plug,
    title: "Vendor-agnostic and stack-friendly.",
    body: "We integrate into your CRM, helpdesk, telephony and ticketing. Whatever you already run. No rip-and-replace.",
  },
  {
    icon: ShieldCheck,
    title: "Fully hosted, GDPR-aligned, no infra burden.",
    body: "UK-based, DPA as standard, EU data residency available. Your team owns the outcome; we own the plumbing.",
  },
  {
    icon: Handshake,
    title: "We don't disappear after launch.",
    body: "Continuous improvement is the model, not an upsell. Weekly check-ins, monthly performance reviews, expansion to new agents as the partnership matures.",
  },
];

export type StatTile = {
  value: string;
  prefix?: string;
  suffix?: string;
  numeric: number;
  label: string;
  /** When true, renders value as plain text (no count-up). Use for non-numeric stats like ratios. */
  staticDisplay?: boolean;
};

export const STAT_TILES: StatTile[] = [
  { value: "5:1", numeric: 5, label: "Monthly return at run rate", staticDisplay: true },
  { value: "12,000", numeric: 12000, label: "Conversations handled across 5 months" },
  { value: "5,000", numeric: 5000, label: "Fully automated, no human needed" },
  { value: "2,200", numeric: 2200, label: "Out-of-hours enquiries captured" },
  { value: "15,000", prefix: "£", numeric: 15000, label: "Monthly attributed sales" },
  { value: "1,000", suffix: "+", numeric: 1000, label: "Support tickets automated monthly" },
  { value: "~2-3", numeric: 0, label: "FTE-equivalent absorbed monthly", staticDisplay: true },
];

export type Partner = {
  name: string;
  category: PartnerCategory;
};

export type PartnerCategory =
  | "CRM"
  | "Helpdesk"
  | "Telephony"
  | "Messaging"
  | "Comms"
  | "AI / LLM"
  | "Data"
  | "Billing & ops";

export const PARTNERS: Partner[] = [
  { name: "Salesforce", category: "CRM" },
  { name: "HubSpot", category: "CRM" },
  { name: "Pipedrive", category: "CRM" },
  { name: "Zendesk", category: "Helpdesk" },
  { name: "Intercom", category: "Helpdesk" },
  { name: "Freshdesk", category: "Helpdesk" },
  { name: "Front", category: "Helpdesk" },
  { name: "Twilio", category: "Telephony" },
  { name: "AWS Connect", category: "Telephony" },
  { name: "Genesys", category: "Telephony" },
  { name: "WhatsApp Business", category: "Messaging" },
  { name: "Meta Messenger", category: "Messaging" },
  { name: "SMS / iMessage", category: "Messaging" },
  { name: "Slack", category: "Comms" },
  { name: "Microsoft Teams", category: "Comms" },
  { name: "OpenAI", category: "AI / LLM" },
  { name: "Anthropic", category: "AI / LLM" },
  { name: "Azure OpenAI", category: "AI / LLM" },
  { name: "AWS Bedrock", category: "AI / LLM" },
  { name: "Snowflake", category: "Data" },
  { name: "BigQuery", category: "Data" },
  { name: "Postgres", category: "Data" },
  { name: "Stripe", category: "Billing & ops" },
  { name: "GoCardless", category: "Billing & ops" },
  { name: "NetSuite", category: "Billing & ops" },
];

export type IntegrationCapability = {
  label: string;
  body: string;
};

export const INTEGRATION_CAPABILITIES: IntegrationCapability[] = [
  {
    label: "REST + GraphQL",
    body: "Standard APIs ingested with auth, retries, and rate-limiting handled by us.",
  },
  {
    label: "Webhooks",
    body: "Real-time event ingest in both directions, with replay and idempotency keys.",
  },
  {
    label: "Direct database",
    body: "Read/write to Postgres, MySQL, MSSQL, Oracle. SQL views, no schema lock-in.",
  },
  {
    label: "Custom & legacy",
    body: "SFTP drops, XML feeds, SOAP, screen-scraped admin tools. If you can authenticate, we can wire in.",
  },
];

export type Faq = {
  q: string;
  a: string;
};

export const FAQS: Faq[] = [
  {
    q: "How long until the AI agent is live?",
    a: "Most clients see a first agent live within 4 to 8 weeks of kickoff. Discovery and design take 2 to 3 weeks, build and integration another 3 to 5, then a short pilot before full go-live. Second and subsequent agents typically ship in 1 to 3 weeks against the platform already in place.",
  },
  {
    q: "Will the AI replace our human agents?",
    a: "No. The point is to absorb the volume your humans shouldn't be handling: repetitive tickets, after-hours enquiries, low-touch sales. Your team focuses on the conversations that actually need a human. Most clients keep the same headcount and grow capacity instead.",
  },
  {
    q: "What systems do you integrate with?",
    a: "Whatever you already run. Common stacks include Zendesk, HubSpot, Salesforce, Freshdesk, Intercom, Twilio, AWS Connect, custom CRMs and billing platforms. If it has an API, a webhook, a database, or a CSV drop, we can plug into it.",
  },
  {
    q: "What does it cost?",
    a: "Bespoke, scoped to channels, volumes and integration depth. Most engagements run between £1,000 and £4,000 monthly per agent, with a one-off build component up front. Roughly the cost of a single customer service hire, and the platform compounds as more agents are added. We'll scope yours on the discovery call. No obligation.",
  },
  {
    q: "Is the data secure? Is it GDPR-compliant?",
    a: "Yes. UK-hosted by default, EU residency available, DPA as standard. Sensitive data is masked before it hits any LLM, and we can route via your tenant of choice (OpenAI, Anthropic, Azure, Bedrock) so prompts and outputs stay in your contractual perimeter.",
  },
  {
    q: "What if the AI gets something wrong?",
    a: "Every agent has explicit escalation rules and a confidence threshold. When it isn't sure, it routes to a human with full conversation context, no \"start from scratch\" handovers. We monitor failure modes weekly and tune the agent in production.",
  },
  {
    q: "Can it handle WhatsApp, phone and web chat?",
    a: "Yes. We deploy on web, WhatsApp, SMS, email and voice (telephony). The same underlying agent serves every channel so the customer experience stays consistent. Voice goes live alongside or after the text channels depending on volume.",
  },
  {
    q: "Who maintains the agent after it's live?",
    a: "We do. Continuous optimisation is included in the monthly engagement: knowledge updates, new flows, performance tuning, expansion to new use cases. You get a single point of contact who runs it like your in-house AI lead.",
  },
  {
    q: "What if we already have a chatbot?",
    a: "Most clients do, and most of those bots underperform. That's usually why we get the call. We can replace it cleanly or sit alongside it during transition. Either way, we benchmark against the existing solution so the uplift is measurable from day one.",
  },
  {
    q: "Why not build it ourselves?",
    a: "You can. The hard parts aren't the model. They're integration, edge cases, ongoing tuning, and keeping the system reliable when the original builder leaves. We do this every day for clients in your sector. Most internal builds stall at 60% complete; we ship and keep going.",
  },
  {
    q: "What do you need from us to make this work?",
    a: "Real access to your operation. A direct channel with the team, not just a quarterly review. The same context you'd give a new internal hire. The closer we sit to your day-to-day, the faster we move and the more value we deliver. We work like a member of your team, not like an outside vendor.",
  },
];
