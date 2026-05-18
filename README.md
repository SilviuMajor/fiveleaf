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

Vercel: connect the repo, push `main`. Domain `fiveleaf.co.uk` configured in Vercel project settings. Vercel Analytics auto-enables once the project is connected.

## Outstanding

See [TODO.md](TODO.md) — assets, env vars, and copy approvals pending.
