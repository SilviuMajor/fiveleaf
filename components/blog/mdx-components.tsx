import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Diagram } from "@/components/blog/Diagram";

/**
 * Styled mapping from raw MDX element tags to brand-styled JSX.
 *
 * Every article uses the same look: long-read body, generous line
 * height, calm blockquotes, hand-picked headings. Links inside the
 * article body open in the same tab if internal, new tab if
 * external — this keeps reading flow on /blog routes while still
 * letting outbound citations stand on their own.
 */
export const mdxComponents: MDXComponents = {
  // Custom block-level component used inside article bodies for the
  // brand-styled SVG diagrams. Articles invoke it via JSX-in-MDX,
  // e.g. <Diagram label="..." caption="..."><svg>...</svg></Diagram>.
  Diagram,
  h2: ({ children, id, ...rest }) => (
    <h2
      id={id}
      className="font-display scroll-mt-24 mt-14 text-balance text-2xl font-semibold leading-tight tracking-tight md:text-3xl"
      {...rest}
    >
      {children}
    </h2>
  ),
  h3: ({ children, id, ...rest }) => (
    <h3
      id={id}
      className="font-display scroll-mt-24 mt-10 text-balance text-xl font-semibold leading-snug tracking-tight md:text-2xl"
      {...rest}
    >
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mt-5 text-base leading-[1.75] text-fl-ink md:text-lg">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="mt-5 grid gap-2 pl-6 text-base leading-[1.75] text-fl-ink marker:text-fl-muted md:text-lg [&>li]:list-disc">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-5 grid gap-2 pl-6 text-base leading-[1.75] text-fl-ink marker:text-fl-muted md:text-lg [&>li]:list-decimal">
      {children}
    </ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="mt-7 border-l-4 border-fl-ink bg-fl-surface-alt px-6 py-5 text-lg font-medium italic leading-relaxed text-fl-ink md:text-xl">
      {children}
    </blockquote>
  ),
  a: ({ href = "", children, ...rest }) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link
          href={href}
          className="font-medium text-fl-ink underline decoration-fl-line decoration-2 underline-offset-4 hover:decoration-fl-ink"
          {...rest}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-fl-ink underline decoration-fl-line decoration-2 underline-offset-4 hover:decoration-fl-ink"
        {...rest}
      >
        {children}
      </a>
    );
  },
  strong: ({ children }) => (
    <strong className="font-semibold text-fl-ink">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  code: ({ children }) => (
    <code className="rounded-md bg-fl-surface-alt px-1.5 py-0.5 font-mono text-[0.9em] text-fl-ink">
      {children}
    </code>
  ),
  hr: () => <hr className="mt-10 border-t border-fl-line" />,
  table: ({ children }) => (
    <div className="mt-6 overflow-x-auto rounded-xl border border-fl-line">
      <table className="w-full text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-fl-surface-alt text-fl-ink">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="border-b border-fl-line px-4 py-3 font-semibold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-fl-line px-4 py-3 align-top text-fl-ink-soft">
      {children}
    </td>
  ),
};
