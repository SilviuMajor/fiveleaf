const truthy = (v: string | undefined) => v === "true" || v === "1";

export const SITE = {
  name: "Fiveleaf",
  tagline: "AI agents, built for operators.",
  defaultTitle: "Fiveleaf: AI agents that run inside your business",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://fiveleaf.co.uk",
  description:
    "Fiveleaf builds and operates bespoke AI agents for mid-market operators in customer service, sales and operations. Fully integrated, continuously optimised, with a 5:1 monthly return at our flagship deployment.",
  bookingUrl:
    process.env.NEXT_PUBLIC_BOOKING_URL ??
    "https://cal.com/silviumajor/fiveleaf-ai-discovery-call",
  dashboardUrl: "https://dashboard.fiveleaf.co.uk",
  contactEmail: "hello@fiveleaf.co.uk",
  linkedinUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
  agent: {
    embedUrl: process.env.NEXT_PUBLIC_AGENT_EMBED_URL ?? "",
    provider: process.env.NEXT_PUBLIC_AGENT_EMBED_PROVIDER ?? "",
  },
  features: {
    namedCaseStudy: truthy(process.env.NEXT_PUBLIC_FEATURE_NAMED_CASE_STUDY),
  },
  registration: {
    company: "Fiveleaf Ltd",
    country: "England",
    number: "[TODO: Companies House no.]",
  },
} as const;

export const NAV_LINKS = [
  { href: "#wedge", label: "Why us" },
  { href: "#agents-explainer", label: "AI agents" },
  { href: "#handover", label: "Handover" },
  { href: "#departments", label: "Departments" },
  { href: "#partners", label: "Integrations" },
  { href: "#how", label: "How it works" },
  { href: "#faq", label: "FAQ" },
] as const;
