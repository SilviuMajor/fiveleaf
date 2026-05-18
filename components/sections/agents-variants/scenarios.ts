import {
  BookOpen,
  CalendarClock,
  Mail,
  MessageSquare,
  Phone,
  ScrollText,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import {
  SiAnthropic,
  SiHubspot,
  SiSalesforce,
  SiSlack,
  SiStripe,
  SiWhatsapp,
} from "react-icons/si";
import type { ComponentType } from "react";

/**
 * Scenarios drive the AgentTrace renderer. Each one walks a real
 * customer interaction through the four-stage loop (Input, Context,
 * Reason, Act) with the actual systems we'd wire into shown next to
 * each step. The scenarios are deliberately diverse: retention,
 * sales, renewal, billing — the breadth of the customer lifecycle.
 *
 * Realism rule: the agent never does too much unilaterally. It
 * presents options, files a record, queues a follow-up, but it
 * doesn't process cancellations, lock in renewals, or commit prices
 * without the customer confirming. Each scenario's `didNotHappen`
 * line spells that out.
 */

type IconType = ComponentType<{ className?: string }> | LucideIcon;

export type Branch = {
  action: string;
  via: string;
  icon: IconType;
  iconColor?: string;
  result: string;
};

export type Stage = {
  number: string;
  title: string;
  caption: string;
  tone: "sand" | "sky" | "neutral" | "sage";
  branches: Branch[];
};

/** Categories used by the interactive variant's pill row. The literal
 *  strings double as button labels. */
export type Category =
  | "Sales"
  | "Retentions"
  | "Renewal"
  | "Billing"
  | "Support";

export type Scenario = {
  id: string;
  /** Short label rendered on the category pill in the interactive
   *  variant. Each scenario maps to exactly one category. */
  category: Category;
  pill: string;
  h2: string;
  sub: string;
  channel: { name: string; icon: IconType; color: string };
  customer: { name: string; meta: string };
  /** Short noun phrase the reply panel uses, e.g. "Sarah" or
   *  "the visitor". Reads as "What {replyTo} receives". Defaults to
   *  the customer's first name. */
  replyTo?: string;
  message: string;
  stages: Stage[];
  reply: string;
  resolutionTime: string;
  didHappen: string[];
  didNotHappen: string[];
};

/** Canonical pill order for the interactive variant. */
export const ALL_CATEGORIES_ORDER: Category[] = [
  "Sales",
  "Retentions",
  "Renewal",
  "Billing",
  "Support",
];

// Shared brand-glyph colours used across scenarios.
const BRAND = {
  whatsapp: "text-[#25D366]",
  salesforce: "text-[#00A1E0]",
  hubspot: "text-[#FF7A59]",
  stripe: "text-[#635BFF]",
  anthropic: "text-[#D4A27F]",
  slack: "text-[#4A154B]",
};

/**
 * Cancellation → retention. The flagship scenario: customer messages
 * "I want to cancel", agent presents a same-price upgrade, does NOT
 * process the cancellation.
 */
export const cancellationScenario: Scenario = {
  id: "cancellation",
  category: "Retentions",
  pill: "AI agents in plain English",
  h2: "One real message, walked through the loop.",
  sub: "Below is the actual sequence the agent runs when a customer messages in. Plain English on the left, the systems we wire into on the right.",
  channel: { name: "WhatsApp", icon: SiWhatsapp, color: BRAND.whatsapp },
  customer: { name: "Sarah Patel", meta: "18-month customer · 450Mb plan" },
  message: "I want to cancel.",
  reply:
    "Sorry to hear that. Before we process anything, I had a look at your address and there's a 900Mb plan available at the price you pay now. Want me to walk you through the difference, or shall I go ahead with the cancellation?",
  resolutionTime: "2.4s",
  stages: [
    {
      number: "01",
      title: "Input",
      caption: "Pick up the message on the channel",
      tone: "sand",
      branches: [
        {
          action: "Read the inbound WhatsApp message",
          via: "WhatsApp Business",
          icon: SiWhatsapp,
          iconColor: BRAND.whatsapp,
          result: "Sender: Sarah Patel · message: “I want to cancel.”",
        },
      ],
    },
    {
      number: "02",
      title: "Context",
      caption: "Pull what the agent needs to answer well",
      tone: "sky",
      branches: [
        {
          action: "Look up the customer record",
          via: "Salesforce",
          icon: SiSalesforce,
          iconColor: BRAND.salesforce,
          result:
            "18-month customer · 450Mb plan · no open tickets · last NPS 8",
        },
        {
          action: "Read the retention playbook",
          via: "Knowledge base",
          icon: BookOpen,
          result:
            "KB-RET-204 · lead with same-price upgrade if churn risk is in tolerance",
        },
        {
          action: "Check what's available at her address",
          via: "Salesforce",
          icon: SiSalesforce,
          iconColor: BRAND.salesforce,
          result: "900Mb plan available at GU2 7XH",
        },
      ],
    },
    {
      number: "03",
      title: "Reason",
      caption: "Work out what to say next",
      tone: "neutral",
      branches: [
        {
          action: "Read the intent and the tone",
          via: "Anthropic Claude",
          icon: SiAnthropic,
          iconColor: BRAND.anthropic,
          result: "Cancellation request · calm tone · possibly negotiable",
        },
        {
          action: "Apply the retention policy",
          via: "Internal rules",
          icon: ScrollText,
          result:
            "Plan: present 900Mb at current price, ask before processing the cancellation",
        },
      ],
    },
    {
      number: "04",
      title: "Act",
      caption: "Reply on the channel, log the interaction",
      tone: "sage",
      branches: [
        {
          action: "Send the reply on WhatsApp",
          via: "WhatsApp Business",
          icon: SiWhatsapp,
          iconColor: BRAND.whatsapp,
          result:
            "Reply delivered · awaiting customer response before any account change",
        },
        {
          action: "Log the interaction against the contact",
          via: "HubSpot",
          icon: SiHubspot,
          iconColor: BRAND.hubspot,
          result: "Activity recorded · churn-risk flag added · review in 7 days",
        },
      ],
    },
  ],
  didHappen: [
    "Reply sent in 2.4s, no human in the loop",
    "Activity logged against Sarah's contact in HubSpot",
  ],
  didNotHappen: [
    "No cancellation processed. The agent waits on Sarah's reply before any account change.",
  ],
};

/**
 * Sales. Anonymous prospect lands on the homepage asking about
 * coverage. Agent confirms, hands a qualified lead to sales.
 */
export const salesScenario: Scenario = {
  id: "sales",
  category: "Sales",
  pill: "Sales lane",
  h2: "Inbound prospect, qualified in under two seconds.",
  sub: "Same loop, different lane. Web-chat coverage check from a stranger lands in HubSpot as a qualified lead before the prospect closes the tab.",
  channel: { name: "Web chat", icon: MessageSquare, color: "text-fl-ink" },
  customer: {
    name: "Anonymous visitor",
    meta: "Bristol BS8 4 · first session · referred from /pricing",
  },
  replyTo: "the visitor",
  message: "Do you cover Bristol BS8 4? Looking to switch.",
  reply:
    "Yes, we have fibre available at your address. We're currently running a promotional offer of £28pm for 300Mbps. Do you want me to connect you with a sales agent to get that locked in?",
  resolutionTime: "1.8s",
  stages: [
    {
      number: "01",
      title: "Input",
      caption: "Pick up the message on the channel",
      tone: "sand",
      branches: [
        {
          action: "Read the inbound web-chat message",
          via: "Web chat",
          icon: MessageSquare,
          result:
            "Anonymous visitor · message: “Do you cover Bristol BS8 4? Looking to switch.”",
        },
      ],
    },
    {
      number: "02",
      title: "Context",
      caption: "Pull what the agent needs to answer well",
      tone: "sky",
      branches: [
        {
          action: "Check coverage at the postcode",
          via: "Salesforce",
          icon: SiSalesforce,
          iconColor: BRAND.salesforce,
          result: "Gigabit fibre live at BS8 4 · install lead time 5 working days",
        },
        {
          action: "Pull current promotional pricing",
          via: "Knowledge base",
          icon: BookOpen,
          result: "KB-PROMO-038 · 6 months at 50% off · valid until 31/05",
        },
        {
          action: "Read on-pack plan options",
          via: "Salesforce",
          icon: SiSalesforce,
          iconColor: BRAND.salesforce,
          result:
            "100Mb £25 · 500Mb £35 · Gigabit £45 intro then £55, 18-month minimum",
        },
      ],
    },
    {
      number: "03",
      title: "Reason",
      caption: "Work out what to say next",
      tone: "neutral",
      branches: [
        {
          action: "Read the intent and buying signal",
          via: "Anthropic Claude",
          icon: SiAnthropic,
          iconColor: BRAND.anthropic,
          result:
            "Active comparison shopper · ready to qualify, not ready to commit",
        },
        {
          action: "Apply the lead-qualification policy",
          via: "Internal rules",
          icon: ScrollText,
          result:
            "Plan: confirm coverage, lead with the offer, capture contact for follow-up",
        },
      ],
    },
    {
      number: "04",
      title: "Act",
      caption: "Reply on the channel, hand the lead to sales",
      tone: "sage",
      branches: [
        {
          action: "Send the reply on web chat",
          via: "Web chat",
          icon: MessageSquare,
          result: "Reply delivered · contact form pre-filled with postcode",
        },
        {
          action: "Create the lead in HubSpot",
          via: "HubSpot",
          icon: SiHubspot,
          iconColor: BRAND.hubspot,
          result:
            "Marketing-qualified lead · BS8 4 · cold inbound · sales-ready",
        },
        {
          action: "Notify the sales rep on duty",
          via: "Slack",
          icon: SiSlack,
          iconColor: BRAND.slack,
          result: "Posted in #sales-floor · response SLA started",
        },
      ],
    },
  ],
  didHappen: [
    "Reply sent in 1.8s, no human in the loop",
    "Lead created in HubSpot, sales rep notified in Slack",
  ],
  didNotHappen: [
    "No price quoted as final. The intro offer is subject to an eligibility check.",
  ],
};

/**
 * Renewal upsell. Customer messages two weeks before contract end.
 * Agent presents both options, queues a follow-up, never auto-renews.
 */
export const renewalScenario: Scenario = {
  id: "renewal",
  category: "Renewal",
  pill: "Retain lane",
  h2: "Renewal coming up. Two options, no auto-renew.",
  sub: "An existing customer messages about renewal options two weeks before contract end. The agent lays out both choices and queues a follow-up if Marcus doesn't reply.",
  channel: { name: "SMS", icon: Smartphone, color: "text-fl-ink" },
  customer: {
    name: "Marcus Holt",
    meta: "12-month customer · 100Mb · contract ends 21/05",
  },
  message: "Contract renewal coming up. What are my options?",
  reply:
    "Hi Marcus, your contract ends 21/05. Two options for you. Stay on 100Mb at £25/month for another 12 months, or move to 200Mb at the same £29/month you pay now on a 24-month plan. Reply 1 or 2 and I'll line it up. Either way, nothing auto-renews.",
  resolutionTime: "2.1s",
  stages: [
    {
      number: "01",
      title: "Input",
      caption: "Pick up the message on the channel",
      tone: "sand",
      branches: [
        {
          action: "Read the inbound SMS",
          via: "SMS",
          icon: Smartphone,
          result:
            "Marcus Holt · message: “Contract renewal coming up. What are my options?”",
        },
      ],
    },
    {
      number: "02",
      title: "Context",
      caption: "Pull what the agent needs to answer well",
      tone: "sky",
      branches: [
        {
          action: "Look up the customer record and contract",
          via: "Salesforce",
          icon: SiSalesforce,
          iconColor: BRAND.salesforce,
          result:
            "12-month customer · 100Mb plan · contract ends 21/05 · paid in full",
        },
        {
          action: "Read the renewal playbook",
          via: "Knowledge base",
          icon: BookOpen,
          result:
            "KB-REN-101 · 12-24mo customers eligible for free upgrade tier",
        },
        {
          action: "Check available plans and loyalty offers",
          via: "Salesforce",
          icon: SiSalesforce,
          iconColor: BRAND.salesforce,
          result:
            "200Mb at £29/mo (current price) on 24mo · or 100Mb at £25/mo on 12mo",
        },
      ],
    },
    {
      number: "03",
      title: "Reason",
      caption: "Work out what to say next",
      tone: "neutral",
      branches: [
        {
          action: "Read the intent and engagement",
          via: "Anthropic Claude",
          icon: SiAnthropic,
          iconColor: BRAND.anthropic,
          result:
            "Active renewal interest · comparing options · proactive customer",
        },
        {
          action: "Apply the renewal policy",
          via: "Internal rules",
          icon: ScrollText,
          result:
            "Plan: present both fairly, encourage 24-month upgrade, never auto-renew",
        },
      ],
    },
    {
      number: "04",
      title: "Act",
      caption: "Reply on the channel, log it, queue a follow-up",
      tone: "sage",
      branches: [
        {
          action: "Send the reply on SMS",
          via: "SMS",
          icon: Smartphone,
          result: "Reply delivered · customer awaiting choice",
        },
        {
          action: "Log the renewal interaction",
          via: "HubSpot",
          icon: SiHubspot,
          iconColor: BRAND.hubspot,
          result: "Renewal cycle started · 14 days to decision",
        },
        {
          action: "Schedule an auto-followup",
          via: "Internal rules",
          icon: CalendarClock,
          result: "Reminder queued for 7 days · only fires if no reply",
        },
      ],
    },
  ],
  didHappen: [
    "Reply sent in 2.1s, no human in the loop",
    "Renewal interaction logged in HubSpot",
    "Auto-followup queued for 7 days",
  ],
  didNotHappen: [
    "No renewal processed. The agent waits on Marcus's choice before any account change.",
  ],
};

/**
 * Bill query. Customer asks why a bill is higher than usual. Agent
 * itemises the difference, sends a receipt, doesn't refund anything
 * unilaterally.
 */
export const billScenario: Scenario = {
  id: "bill-query",
  category: "Billing",
  pill: "Optimise lane",
  h2: "Bill query, itemised in under three seconds.",
  sub: "Most billing questions are explanation, not refund. The agent itemises the difference, sends a receipt, and only escalates if the customer pushes back.",
  channel: { name: "Email", icon: Mail, color: "text-fl-ink" },
  customer: {
    name: "Imogen Lee",
    meta: "Customer since March · billed 28-Apr",
  },
  message: "Why was my bill £14 higher this month?",
  reply:
    "Hi Imogen, two things this month. A one-off £9 install fee from your March activation (charged on the first full bill), and £4.92 pro-rata for the plan switch on the 12th. Going forward you're back to your usual £39.92. I've sent an itemised receipt to your email, let me know if anything's still unclear.",
  resolutionTime: "2.3s",
  stages: [
    {
      number: "01",
      title: "Input",
      caption: "Pick up the message on the channel",
      tone: "sand",
      branches: [
        {
          action: "Read the inbound email",
          via: "Email",
          icon: Mail,
          result:
            "Imogen Lee · subject: bill enquiry · body: “Why was my bill £14 higher this month?”",
        },
      ],
    },
    {
      number: "02",
      title: "Context",
      caption: "Pull what the agent needs to answer well",
      tone: "sky",
      branches: [
        {
          action: "Look up the customer and billing cycle",
          via: "Salesforce",
          icon: SiSalesforce,
          iconColor: BRAND.salesforce,
          result:
            "Customer since Mar · billed 28-Apr · this bill £53.92 · typical £39.92",
        },
        {
          action: "Itemise this month's charges",
          via: "Stripe",
          icon: SiStripe,
          iconColor: BRAND.stripe,
          result:
            "Standard £39.92 · install fee £9 · pro-rata plan switch £4.92 · total £53.92",
        },
        {
          action: "Read the install-fee policy",
          via: "Knowledge base",
          icon: BookOpen,
          result:
            "KB-BILL-019 · install fee charged on first full bill, capped at £9",
        },
      ],
    },
    {
      number: "03",
      title: "Reason",
      caption: "Work out what to say next",
      tone: "neutral",
      branches: [
        {
          action: "Read the intent and tone",
          via: "Anthropic Claude",
          icon: SiAnthropic,
          iconColor: BRAND.anthropic,
          result: "Confused, mildly frustrated · wants explanation, not refund",
        },
        {
          action: "Apply the transparency policy",
          via: "Internal rules",
          icon: ScrollText,
          result:
            "Plan: itemise the difference clearly, send a receipt, offer to talk if still unclear",
        },
      ],
    },
    {
      number: "04",
      title: "Act",
      caption: "Reply on the channel, send the receipt, log it",
      tone: "sage",
      branches: [
        {
          action: "Send the explanation by email",
          via: "Email",
          icon: Mail,
          result: "Reply delivered with itemised breakdown",
        },
        {
          action: "Send the itemised receipt",
          via: "Stripe",
          icon: SiStripe,
          iconColor: BRAND.stripe,
          result: "Receipt INV-2026-04812 sent to billing@ on file",
        },
        {
          action: "Log the query against the contact",
          via: "HubSpot",
          icon: SiHubspot,
          iconColor: BRAND.hubspot,
          result: "Bill enquiry logged · resolution: explanation provided",
        },
      ],
    },
  ],
  didHappen: [
    "Reply sent in 2.3s, no human in the loop",
    "Itemised receipt emailed via Stripe",
    "Query logged against Imogen's contact in HubSpot",
  ],
  didNotHappen: [
    "No refund issued. No charge dispute opened. The agent waits to see if the explanation lands.",
  ],
};

/**
 * Support. Existing customer reports a tech issue. Agent runs remote
 * diagnostics, suggests a fix, queues a 24-hour follow-up. Doesn't
 * dispatch an engineer unless remote checks come back bad.
 */
export const supportScenario: Scenario = {
  id: "support",
  category: "Support",
  pill: "Support lane",
  h2: "Tech complaint, diagnosed in three seconds.",
  sub: "Inbound support question on WhatsApp. Agent runs remote diagnostics, suggests a fix, queues a 24-hour follow-up. No engineer until remote checks come back bad.",
  channel: { name: "WhatsApp", icon: SiWhatsapp, color: BRAND.whatsapp },
  customer: { name: "David Chen", meta: "6-month customer · 450Mb plan" },
  message: "My WiFi keeps dropping on my smart TV in the living room.",
  reply:
    "Sorry to hear that, David. I've just run a diagnostic. Your line and router both look healthy, but the smart TV is sitting in the weakest part of your WiFi mesh. Quickest fix is a router reboot from the app, then I'll move the TV onto the 5GHz band. Want me to walk you through it, or shall I send out an engineer to check the wiring?",
  resolutionTime: "2.6s",
  stages: [
    {
      number: "01",
      title: "Input",
      caption: "Pick up the message on the channel",
      tone: "sand",
      branches: [
        {
          action: "Read the inbound WhatsApp message",
          via: "WhatsApp Business",
          icon: SiWhatsapp,
          iconColor: BRAND.whatsapp,
          result:
            "Sender: David Chen · message: “My WiFi keeps dropping on my smart TV in the living room.”",
        },
      ],
    },
    {
      number: "02",
      title: "Context",
      caption: "Pull what the agent needs to answer well",
      tone: "sky",
      branches: [
        {
          action: "Look up the account and router model",
          via: "Salesforce",
          icon: SiSalesforce,
          iconColor: BRAND.salesforce,
          result: "6-month customer · 450Mb plan · router model FX-3000 · 2 mesh nodes",
        },
        {
          action: "Pull line and router diagnostics",
          via: "Salesforce",
          icon: SiSalesforce,
          iconColor: BRAND.salesforce,
          result:
            "Line healthy · sync 450/45 · TV connected to 2.4GHz at -78 dBm (weak)",
        },
        {
          action: "Read the WiFi-drop troubleshooting playbook",
          via: "Knowledge base",
          icon: BookOpen,
          result:
            "KB-SUP-077 · weak-signal devices: try band steering before dispatch",
        },
      ],
    },
    {
      number: "03",
      title: "Reason",
      caption: "Work out what to say next",
      tone: "neutral",
      branches: [
        {
          action: "Read the intent and severity",
          via: "Anthropic Claude",
          icon: SiAnthropic,
          iconColor: BRAND.anthropic,
          result: "Tech complaint · single-device · low severity · remote-fixable",
        },
        {
          action: "Apply the support policy",
          via: "Internal rules",
          icon: ScrollText,
          result:
            "Plan: try remote fix first, offer engineer as a fallback, schedule a 24-hour check-in",
        },
      ],
    },
    {
      number: "04",
      title: "Act",
      caption: "Reply on the channel, queue a follow-up, log it",
      tone: "sage",
      branches: [
        {
          action: "Send the reply on WhatsApp",
          via: "WhatsApp Business",
          icon: SiWhatsapp,
          iconColor: BRAND.whatsapp,
          result: "Reply delivered with the suggested remote fix",
        },
        {
          action: "Queue a follow-up message in 24 hours",
          via: "Internal rules",
          icon: CalendarClock,
          result: "Reminder scheduled · only fires if no further reply from David",
        },
        {
          action: "Log the interaction against the contact",
          via: "HubSpot",
          icon: SiHubspot,
          iconColor: BRAND.hubspot,
          result: "Support ticket logged · resolution: remote fix attempted",
        },
      ],
    },
  ],
  didHappen: [
    "Reply sent in 2.6s, no human in the loop",
    "Auto follow-up queued for 24 hours to check the fix landed",
    "Support ticket logged in HubSpot",
  ],
  didNotHappen: [
    "No engineer dispatched. The agent tries the remote fix first and only escalates if the 24-hour follow-up shows it didn't land.",
  ],
};

export const ALL_SCENARIOS: Scenario[] = [
  cancellationScenario,
  salesScenario,
  renewalScenario,
  billScenario,
  supportScenario,
];

/** Scenarios indexed by category. The interactive variant uses this
 *  to look up the scenario for the currently-selected pill. */
export const SCENARIOS_BY_CATEGORY: Record<Category, Scenario> = {
  Sales: salesScenario,
  Retentions: cancellationScenario,
  Renewal: renewalScenario,
  Billing: billScenario,
  Support: supportScenario,
};

// Lucide-only fallback exports — Phone is used by no current scenario,
// but kept here as the canonical voice-channel icon for future ones.
export const VOICE_ICON: IconType = Phone;
