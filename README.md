# Fiveleaf landing page

Marketing site for [fiveleaf.co.uk](https://fiveleaf.co.uk) — UK AI implementation partner for broadband and telecom.

## Stack

- Next.js 15 App Router (TypeScript, Turbopack)
- Tailwind CSS v4 (CSS-first `@theme` tokens in `app/globals.css`)
- shadcn/ui — Button, Accordion, Dialog
- Framer Motion 12 — `FadeUp` wrapper, hero conversation ticker
- @vercel/analytics
- Inter + JetBrains Mono via `next/font/google`

## Getting started

```bash
cp .env.example .env.local   # fill in values
npm install
npm run dev                  # http://localhost:3000
```

## Environment variables

See `.env.example`. The build runs without any of them set, falling back to placeholders. Flip `NEXT_PUBLIC_FEATURE_NAMED_CASE_STUDY=true` once Hey! Broadband approves naming, and the LogoStrip + CaseStudy sections swap to the named version.

## Project layout

```
app/                    layout, page, og image, robots, sitemap
components/sections/    one file per landing section, in scroll order
components/motion/      FadeUp, HeroVisual, StatCounter
components/ui/          shadcn primitives
components/brand/       Logo
content/sections.ts     FAQs, stat tiles, services, process, etc.
lib/site.ts             runtime config (URLs, feature flags)
lib/seo.ts              JSON-LD builders (Organization, WebSite, FAQPage, Service)
public/                 logo, founder photo, OG image stubs
```

Copy iterated in JSX (FAQ Q&A, stat tiles, process steps, services) lives in `content/sections.ts` so the same array feeds rendered UI and JSON-LD.

## Scripts

- `npm run dev` — Turbopack dev server
- `npm run build` — production build
- `npm run start` — production server
- `npm run lint` — ESLint

## Deployment

Host on **Vercel** (built by the Next.js team; zero config for this app).

### 1. Push to GitHub

No git remote is set yet. Create an empty repo at github.com/new, then:

```bash
git remote add origin git@github.com:<you>/fiveleaf-landing.git
git push -u origin main
```

### 2. Import to Vercel

vercel.com → **Add New → Project** → import the repo. Framework, build
command (`next build`) and output are auto-detected — change nothing.

### 3. Set environment variables (Project → Settings → Environment Variables, scope = Production)

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://fiveleaf.co.uk` |
| `NEXT_PUBLIC_BOOKING_URL` | `https://cal.com/silviumajor/fiveleaf-ai-discovery-call` |
| `NEXT_PUBLIC_FEATURE_NAMED_CASE_STUDY` | `false` |
| `NEXT_PUBLIC_AGENT_EMBED_URL` | _(blank)_ |
| `NEXT_PUBLIC_AGENT_EMBED_PROVIDER` | _(blank)_ |
| `NEXT_PUBLIC_LINKEDIN_URL` | _(blank, or LinkedIn URL to show footer link)_ |

Deploy. A live `*.vercel.app` URL is ready in ~2 min.

### 4. Domain

Project → Settings → Domains → add `fiveleaf.co.uk` and `www.fiveleaf.co.uk`.
At the DNS registrar set the records Vercel shows (apex A/ALIAS record +
`www` CNAME → `cname.vercel-dns.com`). HTTPS is issued automatically once
DNS propagates. Every push to `main` redeploys; PRs get preview URLs.

### 5. Post-launch

- Re-run Lighthouse against the production URL.
- Add the domain to Google Search Console (`sitemap.xml` is auto-served at
  `/sitemap.xml`).

### Hidden routes

`/case-study` and `/try-our-agent` are deployed but `noindex,nofollow` and
unlinked — invisible to the public and search until launch. To launch
either: delete the `robots` line in that route's `metadata` export and add
a nav/footer link (or fold it back into `app/page.tsx`).

## Outstanding

See [TODO.md](TODO.md) — assets, env vars, and copy approvals pending.
