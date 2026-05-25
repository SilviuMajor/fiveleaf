import Link from "next/link";
import type { Article } from "@/lib/articles";

/**
 * RelatedArticles — three internal links at the end of each piece.
 *
 * Why it exists: internal linking is one of the top three signals
 * Google uses to assess topical authority. Three thoughtfully picked
 * links also keep readers on-site longer (lower bounce, higher
 * session depth), which compounds into ranking strength.
 */
export function RelatedArticles({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;
  return (
    <section className="mx-auto mt-16 max-w-3xl">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fl-muted">
        Keep reading
      </p>
      <ul className="mt-4 grid gap-3 md:grid-cols-3 md:gap-4">
        {articles.map((a) => (
          <li key={a.frontmatter.slug}>
            <Link
              href={`/blog/${a.frontmatter.slug}`}
              className="group block h-full rounded-2xl border border-fl-line bg-white p-5 transition hover:border-fl-ink"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fl-muted">
                {a.frontmatter.category}
              </p>
              <h3 className="font-display mt-2 text-balance text-lg font-semibold leading-snug tracking-tight text-fl-ink">
                {a.frontmatter.title}
              </h3>
              <p className="mt-3 line-clamp-3 text-sm text-fl-ink-soft">
                {a.frontmatter.description}
              </p>
              <p className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-fl-ink group-hover:underline">
                Read it →
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
