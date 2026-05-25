import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { Pill } from "@/components/brand/Pill";
import { listArticles } from "@/lib/articles";

/**
 * /blog — index of all articles.
 *
 * Hero introduces the publication line, then a single chronological
 * list of articles. We deliberately don't go heavy on filters yet —
 * with 10 articles, a clean reverse-chronological list reads better
 * than a category grid. Once we're past 25-30 pieces we'll revisit.
 */

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Field notes on building, running and improving AI agents inside mid-market UK businesses. Written by the operator who runs the deployments, not the marketing team.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    title: "Fiveleaf blog: field notes on running AI agents",
    description:
      "Field notes on building, running and improving AI agents inside mid-market UK businesses. Written by the operator who runs the deployments.",
  },
};

export default function BlogIndexPage() {
  const articles = listArticles();
  return (
    <>
      <Nav />
      <main id="main" className="bg-fl-surface">
        {/* Hero */}
        <section className="border-b border-fl-line bg-fl-surface-alt">
          <div className="mx-auto max-w-5xl px-6 py-20 md:px-10 md:py-28">
            <Pill tone="neutral" uppercase>
              Field notes
            </Pill>
            <h1 className="font-display mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              How AI agents actually behave inside a UK business.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-fl-ink-soft md:text-lg">
              Honest, jargon-free writing about building, running and tuning AI
              agents for customer service, sales and operations. From the
              operator who runs the deployments, not the marketing team.
            </p>
          </div>
        </section>

        {/* Article list */}
        <section className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-20">
          {articles.length === 0 ? (
            <p className="text-fl-ink-soft">
              First piece publishing soon. Check back in a few days.
            </p>
          ) : (
            <ul className="grid gap-6 md:gap-8">
              {articles.map((a) => {
                const published = new Date(a.frontmatter.publishedAt);
                return (
                  <li
                    key={a.frontmatter.slug}
                    className="border-b border-fl-line pb-6 last:border-b-0 last:pb-0 md:pb-8"
                  >
                    <Link
                      href={`/blog/${a.frontmatter.slug}`}
                      className="group block"
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fl-muted">
                          {a.frontmatter.category}
                        </p>
                        <span className="text-fl-muted">·</span>
                        <time
                          dateTime={a.frontmatter.publishedAt}
                          className="font-mono text-[10px] uppercase tracking-[0.18em] text-fl-muted"
                        >
                          {published.toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </time>
                        <span className="text-fl-muted">·</span>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fl-muted">
                          {a.readingMinutes} min read
                        </p>
                      </div>
                      <h2 className="font-display mt-3 text-balance text-2xl font-semibold leading-tight tracking-tight text-fl-ink group-hover:underline md:text-3xl">
                        {a.frontmatter.title}
                      </h2>
                      <p className="mt-3 max-w-3xl text-base leading-relaxed text-fl-ink-soft md:text-lg">
                        {a.frontmatter.description}
                      </p>
                      <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-fl-ink">
                        Read the article →
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
