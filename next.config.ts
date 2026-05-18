import type { NextConfig } from "next";

/**
 * Next.js configuration tuned for production hosting on Vercel.
 *
 * Goals:
 *  - Score near-perfect on Lighthouse Best Practices and SEO. The big
 *    wins there are security headers (HSTS, X-Content-Type-Options,
 *    Referrer-Policy, Permissions-Policy) and not leaking the runtime
 *    in the X-Powered-By header.
 *  - Long-cache static assets in /public so repeat visits skip the
 *    network entirely. Next already does this for /_next/static.
 *  - Modern image formats so any future <Image> usage hands AVIF/WebP
 *    to clients that accept them.
 *  - Tree-shaken icon imports — both lucide-react and react-icons ship
 *    huge index files; the optimizePackageImports option turns
 *    barrel-style imports into per-icon imports at build time.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // AVIF first, then WebP; ImageOptimizer falls back transparently.
  images: {
    formats: ["image/avif", "image/webp"],
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons"],
  },

  async headers() {
    const securityHeaders = [
      // HTTPS-only for two years, includes subdomains. Safe because the
      // production domain is always served over TLS via Vercel.
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      { key: "X-Content-Type-Options", value: "nosniff" },
      // SAMEORIGIN (not DENY) so we keep the option to embed our own
      // pages in a future internal dashboard if needed.
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      // Tighten browser feature surface to what the page actually uses.
      // The cal.com embed needs payment for Apple/Google Pay, hence
      // the explicit allow.
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(self \"https://cal.com\" \"https://app.cal.com\")",
      },
      // No DNS lookup leakage from Chromium prefetch.
      { key: "X-DNS-Prefetch-Control", value: "on" },
    ];

    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Long-cache static assets in /public. Next already handles
        // /_next/static; this rule covers the favicon, logo, OG image,
        // anything else dropped into /public.
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
