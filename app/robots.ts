import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * robots.txt — single-page marketing site, so the crawl rules are
 * intentionally minimal:
 *  - allow everything by default
 *  - disallow `/preview/*`, which holds internal design-iteration pages
 *    that should never appear in search results
 *  - point at the sitemap
 *
 * `host` is non-standard for Google but Yandex respects it; harmless
 * for the others.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/preview/", "/preview/*"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
