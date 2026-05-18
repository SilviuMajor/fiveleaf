import type { Metadata } from "next";

/**
 * Internal design-iteration routes. Belt-and-braces with robots.txt:
 * even if a crawler ignores robots.txt, the page itself emits
 * <meta name="robots" content="noindex,nofollow">.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
