import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { SITE } from "@/lib/site";

/**
 * Article loader — reads MDX files from `content/articles/`.
 *
 * Each .mdx file has YAML frontmatter at the top describing the
 * article (title, description, slug, dates, tags, etc.) and the
 * body below it. This loader parses both at build time so the
 * blog index, dynamic [slug] route, sitemap, and JSON-LD all read
 * from the same source of truth.
 *
 * Articles are sorted newest-first by `publishedAt`. Drafts
 * (`status: 'draft'`) are excluded from production builds so we
 * can stage work without publishing it.
 */

export type ArticleAuthor = {
  name: string;
  role: string;
  url?: string;
};

export type ArticleFrontmatter = {
  /** URL-safe slug — also the filename without `.mdx`. */
  slug: string;
  title: string;
  /** Sub-150-char meta description for SEO + social cards. */
  description: string;
  /** ISO date (YYYY-MM-DD) the article first went live. */
  publishedAt: string;
  /** ISO date (YYYY-MM-DD) of the most recent meaningful edit. */
  updatedAt?: string;
  /** Free-text tags used for filtering on the index. */
  tags: string[];
  /** Funnel category — used for the index lane chips. */
  category:
    | "Foundations"
    | "Build vs buy"
    | "Sales"
    | "Operations"
    | "Founder log"
    | "Playbook"
    | "Comparisons"
    | "Compliance";
  /** Primary reader the piece is written for. */
  audience:
    | "Operators"
    | "Sales leaders"
    | "Founders"
    | "Technical buyers"
    | "Everyone";
  /** Author. Defaults to the Fiveleaf founder if omitted. */
  author?: ArticleAuthor;
  /** Set to 'draft' to hide from production. */
  status?: "draft" | "published";
  /** Short 3-5 bullet list the LLMs and Google AI Overviews quote. */
  keyTakeaways: string[];
  /** Per-article FAQ entries powering the FAQ section + JSON-LD. */
  faq?: { q: string; a: string }[];
};

export type Article = {
  frontmatter: ArticleFrontmatter;
  body: string;
  readingMinutes: number;
};

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

const DEFAULT_AUTHOR: ArticleAuthor = {
  name: "Silviu Major",
  role: "Founder, Fiveleaf",
  url: "https://www.linkedin.com/in/silviumajor/",
};

function readArticleFile(filename: string): Article | null {
  const filePath = path.join(ARTICLES_DIR, filename);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const fm = parsed.data as ArticleFrontmatter;

  // Skip drafts in production builds. Allow them locally so Silv
  // can preview work-in-progress before pushing.
  if (fm.status === "draft" && process.env.NODE_ENV === "production") {
    return null;
  }

  const slugFromFile = filename.replace(/\.mdx?$/, "");
  if (!fm.slug) fm.slug = slugFromFile;
  if (!fm.author) fm.author = DEFAULT_AUTHOR;
  if (!fm.status) fm.status = "published";

  const stats = readingTime(parsed.content);

  return {
    frontmatter: fm,
    body: parsed.content,
    readingMinutes: Math.max(1, Math.round(stats.minutes)),
  };
}

/** All published articles, newest first. */
export function listArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  const files = fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  const items = files
    .map(readArticleFile)
    .filter((a): a is Article => a !== null);
  items.sort((a, b) =>
    b.frontmatter.publishedAt.localeCompare(a.frontmatter.publishedAt),
  );
  return items;
}

/** Look up one article by its slug. */
export function getArticleBySlug(slug: string): Article | null {
  const candidates = [`${slug}.mdx`, `${slug}.md`];
  for (const c of candidates) {
    const a = readArticleFile(c);
    if (a) return a;
  }
  return null;
}

/** Slugs of all published articles — used by generateStaticParams. */
export function listArticleSlugs(): string[] {
  return listArticles().map((a) => a.frontmatter.slug);
}

/** Pick the 3 most relevant other articles for a given one.
 *  Heuristic: same category first, then shared tags, then most recent. */
export function relatedArticles(slug: string, limit = 3): Article[] {
  const all = listArticles();
  const me = all.find((a) => a.frontmatter.slug === slug);
  if (!me) return [];
  const others = all.filter((a) => a.frontmatter.slug !== slug);
  const scored = others.map((a) => {
    let score = 0;
    if (a.frontmatter.category === me.frontmatter.category) score += 3;
    const sharedTags = a.frontmatter.tags.filter((t) =>
      me.frontmatter.tags.includes(t),
    ).length;
    score += sharedTags;
    return { article: a, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.article);
}

/** Canonical absolute URL for an article. */
export function articleUrl(slug: string): string {
  return `${SITE.url}/blog/${slug}`;
}
