import Image from "next/image";
import type { ArticleAuthor } from "@/lib/articles";

/**
 * AuthorByline — the "about the author" block at the foot of every
 * article.
 *
 * Why it exists: E-E-A-T (Experience, Expertise, Authoritativeness,
 * Trust) is one of Google's strongest content-quality signals, and
 * AI engines (Perplexity, Claude, ChatGPT) weight named-author
 * content much higher when quoting. A real photo, real name, real
 * LinkedIn link is the difference between "anonymous SEO content"
 * and "expert source" in the eyes of every modern ranker.
 */
export function AuthorByline({ author }: { author: ArticleAuthor }) {
  return (
    <section className="mx-auto mt-16 max-w-3xl rounded-2xl border border-fl-line bg-fl-surface-alt px-6 py-7 md:px-8 md:py-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fl-muted">
        About the author
      </p>
      <div className="mt-4 grid gap-5 md:grid-cols-[88px_1fr] md:items-start md:gap-6">
        <div className="relative h-[88px] w-[88px] overflow-hidden rounded-2xl ring-1 ring-fl-line">
          <Image
            src="/founder.png"
            alt={`${author.name}, ${author.role}`}
            fill
            sizes="88px"
            quality={85}
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-lg font-semibold text-fl-ink">{author.name}</p>
          <p className="text-sm text-fl-ink-soft">{author.role}</p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-fl-ink-soft">
            10+ years building automation systems inside enterprise SaaS, now
            applying that same operational rigour to AI implementation for
            mid-market businesses. Writes about what works (and what doesn&rsquo;t)
            from inside live deployments, not from the outside looking in.
          </p>
          {author.url && (
            <a
              href={author.url}
              target="_blank"
              rel="noopener noreferrer me"
              className="mt-3 inline-block text-sm font-medium text-fl-ink underline-offset-2 hover:underline"
            >
              Connect on LinkedIn →
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
