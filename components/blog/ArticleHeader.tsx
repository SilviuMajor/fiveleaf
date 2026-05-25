import Link from "next/link";
import { Pill } from "@/components/brand/Pill";
import type { ArticleFrontmatter } from "@/lib/articles";

/**
 * Header that sits at the top of every individual article page.
 *
 * Order:
 *   - Tag chip (category) → instant scan of what bucket this is
 *   - H1 → the target query, almost verbatim, so the SERP click→read
 *     flow has zero topical mismatch
 *   - One-paragraph promise → what the reader will know by the end
 *   - Author + publish meta → trust signals, also fed into Person /
 *     Article schema on the parent page
 */
export function ArticleHeader({
  frontmatter,
  readingMinutes,
}: {
  frontmatter: ArticleFrontmatter;
  readingMinutes: number;
}) {
  const author = frontmatter.author!;
  const published = new Date(frontmatter.publishedAt);
  const updated = frontmatter.updatedAt
    ? new Date(frontmatter.updatedAt)
    : null;

  return (
    <header className="mx-auto max-w-3xl px-6 pt-16 md:px-0 md:pt-24">
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href={`/blog?category=${encodeURIComponent(frontmatter.category)}`}
          className="font-mono text-[10px] uppercase tracking-[0.18em] text-fl-muted hover:text-fl-ink"
        >
          {frontmatter.category}
        </Link>
        <span className="text-fl-muted">·</span>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fl-muted">
          {readingMinutes} min read
        </p>
        <span className="text-fl-muted">·</span>
        <Pill tone="neutral" uppercase>
          For {frontmatter.audience.toLowerCase()}
        </Pill>
      </div>

      <h1 className="font-display mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
        {frontmatter.title}
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fl-ink-soft md:text-xl">
        {frontmatter.description}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3 border-y border-fl-line py-4 text-sm text-fl-ink-soft">
        {author.url ? (
          <a
            href={author.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-fl-ink hover:underline"
          >
            {author.name}
          </a>
        ) : (
          <span className="font-semibold text-fl-ink">{author.name}</span>
        )}
        <span className="text-fl-muted">·</span>
        <span>{author.role}</span>
        <span className="text-fl-muted">·</span>
        <time dateTime={frontmatter.publishedAt}>
          {published.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
        {updated && (
          <>
            <span className="text-fl-muted">·</span>
            <span className="text-fl-muted">
              Updated{" "}
              <time dateTime={frontmatter.updatedAt}>
                {updated.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </span>
          </>
        )}
      </div>
    </header>
  );
}
