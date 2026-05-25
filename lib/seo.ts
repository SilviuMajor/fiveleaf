import { SITE } from "@/lib/site";
import { FAQS, SERVICE_LANES } from "@/content/sections";
import type { ArticleAuthor } from "@/lib/articles";

export function organizationJsonLd() {
  const sameAs = SITE.linkedinUrl ? [SITE.linkedinUrl] : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    legalName: SITE.registration.company,
    url: SITE.url,
    logo: `${SITE.url}/logo.svg`,
    description: SITE.description,
    foundingDate: SITE.registration.incorporatedOn,
    // Companies House registration number, in the schema.org PropertyValue
    // pattern Google uses for jurisdiction-specific company identifiers.
    // This is the same shape Google's own Organization markup docs show
    // for VATID / LEI / company-registration numbers.
    identifier: {
      "@type": "PropertyValue",
      propertyID: "UK Companies House",
      value: SITE.registration.number,
    },
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

/**
 * Article schema for individual blog posts. Required fields per
 * Google's Article rich-result docs: headline, image, datePublished,
 * dateModified, author. We also include the publisher (Organization)
 * because Google checks that when assessing authority.
 */
export function articleJsonLd({
  url,
  title,
  description,
  publishedAt,
  updatedAt,
  author,
  tags,
  targetKeyword,
  authorCredential,
}: {
  url: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  author: ArticleAuthor;
  tags: string[];
  /** SEO target keyword for the `keywords` field. Falls back to a
   *  comma-join of `tags` when omitted. */
  targetKeyword?: string;
  /** Author credential string — used in the `author.description`
   *  field, which materially boosts E-E-A-T signal. */
  authorCredential?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    datePublished: publishedAt,
    dateModified: updatedAt,
    inLanguage: "en-GB",
    keywords: targetKeyword ?? tags.join(", "),
    author: {
      "@type": "Person",
      name: author.name,
      ...(authorCredential ? { description: authorCredential } : {}),
      ...(author.url ? { url: author.url } : {}),
      jobTitle: author.role,
      worksFor: { "@type": "Organization", name: SITE.name, url: SITE.url },
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: { "@type": "ImageObject", url: `${SITE.url}/logo.svg` },
    },
    image: `${SITE.url}/opengraph-image`,
  };
}

/** Person schema for the author byline. Lifts E-E-A-T + AI-citation
 *  weight by giving search engines an explicit person entity. */
export function personJsonLd(author: ArticleAuthor) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    ...(author.url ? { url: author.url, sameAs: [author.url] } : {}),
    worksFor: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };
}

/** Per-article FAQPage schema, drawn from the frontmatter's `faq`
 *  array. Distinct from the homepage faqJsonLd — Google docs say
 *  FAQPage may only be used when the visible content matches, so
 *  this one lives on the article page and the homepage version on
 *  the homepage. */
export function articleFaqJsonLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ q, a }) => ({
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
