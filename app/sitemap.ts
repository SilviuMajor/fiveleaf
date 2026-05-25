import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { listArticles } from "@/lib/articles";

/**
 * /sitemap.xml — the canonical list of URLs Google should crawl.
 *
 * Homepage gets top priority, blog index 0.9, individual articles
 * 0.7. Articles inherit their lastModified from frontmatter so the
 * sitemap stays honest about when a piece was actually edited.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const articles = listArticles();

  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE.url}/blog/${a.frontmatter.slug}`,
    lastModified: new Date(
      a.frontmatter.updatedAt ?? a.frontmatter.publishedAt,
    ),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE.url}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...articleEntries,
  ];
}
