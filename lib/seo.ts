import { SITE } from "@/lib/site";
import { FAQS, SERVICE_LANES } from "@/content/sections";

export function organizationJsonLd() {
  const sameAs = SITE.linkedinUrl ? [SITE.linkedinUrl] : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo.svg`,
    description: SITE.description,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SITE.contactEmail,
        areaServed: "GB",
        availableLanguage: ["English"],
      },
    ],
    ...(sameAs ? { sameAs } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    inLanguage: "en-GB",
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function serviceJsonLd() {
  return SERVICE_LANES.map((lane) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${lane.name}: ${lane.outcome}`,
    serviceType: `AI ${lane.name} agents`,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    areaServed: { "@type": "Country", name: "United Kingdom" },
    description: lane.description,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${lane.name} agents`,
      itemListElement: lane.agents.map((agent) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: agent.name },
      })),
    },
  }));
}
