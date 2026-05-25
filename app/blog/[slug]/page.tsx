import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { KeyTakeaways } from "@/components/blog/KeyTakeaways";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ArticleFaq } from "@/components/blog/ArticleFaq";
import { ArticleCta } from "@/components/blog/ArticleCta";
import { AuthorByline } from "@/components/blog/AuthorByline";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { mdxComponents } from "@/components/blog/mdx-components";
import {
  articleUrl,
  getArticleBySlug,
  listArticleSlugs,
  relatedArticles,
} from "@/lib/articles";
import { articleJsonLd, articleFaqJsonLd, personJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

/**
 * /blog/[slug] — individual article page.
 *
 * Statically generated at build time for every published article via
 * `generateStaticParams`. Each page injects three JSON-LD blocks
 * (Article, Person, FAQPage) at the bottom so Google + AI engines
 * can grok the structure cleanly.
 */

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return listArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  const { frontmatter } = article;
  const canonical = `/blog/${frontmatter.slug}`;
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: articleUrl(frontmatter.slug),
      title: frontmatter.title,
      description: frontmatter.description,
      publishedTime: frontmatter.publishedAt,
      modifiedTime: frontmatter.updatedAt ?? frontmatter.publishedAt,
      authors: [frontmatter.author?.name ?? "Silviu Major"],
      tags: frontmatter.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = relatedArticles(slug, 3);
  const { frontmatter, body, readingMinutes } = article;

  const jsonLd = [
    articleJsonLd({
      url: articleUrl(frontmatter.slug),
      title: frontmatter.title,
      description: frontmatter.description,
      publishedAt: frontmatter.publishedAt,
      updatedAt: frontmatter.updatedAt ?? frontmatter.publishedAt,
      author: frontmatter.author!,
      tags: frontmatter.tags,
      targetKeyword: frontmatter.targetKeyword,
      authorCredential: frontmatter.authorCredential,
    }),
    personJsonLd(frontmatter.author!),
    ...(frontmatter.faq && frontmatter.faq.length > 0
      ? [articleFaqJsonLd(frontmatter.faq)]
      : []),
  ];

  return (
    <>
      <Nav />
      <main id="main" className="bg-fl-surface">
        <ArticleHeader
          frontmatter={frontmatter}
          readingMinutes={readingMinutes}
        />

        {frontmatter.keyTakeaways && frontmatter.keyTakeaways.length > 0 && (
          <KeyTakeaways items={frontmatter.keyTakeaways} />
        )}

        {/* Body + sticky TOC on the right */}
        <div className="mx-auto mt-12 grid max-w-6xl gap-12 px-6 md:px-10 lg:grid-cols-[1fr_220px] lg:gap-16">
          <article className="prose-fl mx-auto w-full max-w-3xl">
            <MDXRemote
              source={body}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [
                      rehypeAutolinkHeadings,
                      { behavior: "wrap", properties: { className: "anchor" } },
                    ],
                  ],
                },
              }}
            />
          </article>

          <aside className="hidden lg:block">
            <TableOfContents />
          </aside>
        </div>

        <div className="mx-auto max-w-6xl px-6 md:px-10">
          {frontmatter.faq && <ArticleFaq items={frontmatter.faq} />}

          <ArticleCta />

          <AuthorByline author={frontmatter.author!} />

          <RelatedArticles articles={related} />
        </div>

        <div className="h-24" />
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

// Re-export for the dev convenience of editing SITE without lint errors.
export const dynamicParams = false;
void SITE;
