import type { Metadata } from "next";
import Script from "next/script";

/**
 * /test — sandbox page for the embedded Fiveleaf AI agent widget.
 *
 * Loads the Supabase widget-loader script (which injects the agent
 * widget into the page). Deliberately minimal so the widget is the
 * only thing being exercised. noindex/nofollow — this is a QA harness,
 * not a public page.
 *
 * Note: the site-wide Permissions-Policy header (next.config.ts)
 * currently blocks camera and microphone entirely. If this agent has
 * voice input it will be blocked on this page — say the word and I'll
 * add a /test-scoped Permissions-Policy that allows mic/camera.
 */
export const metadata: Metadata = {
  title: "Agent test",
  robots: { index: false, follow: false, nocache: true },
};

export default function TestPage() {
  return (
    <main
      id="main"
      className="flex min-h-screen flex-col items-center justify-center bg-fl-surface px-6 text-center"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fl-muted">
        Internal · agent sandbox
      </p>
      <h1 className="font-display mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-fl-ink md:text-4xl">
        Fiveleaf AI agent — test page
      </h1>
      <p className="mt-4 max-w-md text-sm text-fl-ink-soft">
        The agent widget loads automatically and should appear shortly. If it
        doesn&rsquo;t, check the browser console for the widget-loader request.
      </p>

      {/* Third-party widget loader. afterInteractive ≈ the original
          async script: it loads after hydration without blocking
          first paint, then the loader injects the agent widget. */}
      <Script
        src="https://nznfznjlroycddegwvpt.supabase.co/functions/v1/widget-loader?agentId=415f07ba-ebb3-4867-bb9f-3207b9994bd0"
        strategy="afterInteractive"
      />
    </main>
  );
}
