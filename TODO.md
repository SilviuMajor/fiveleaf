# Fiveleaf launch checklist

## Brand assets needed (highest priority)

The current Logo component renders an SVG approximation of the 5-petal frangipani mark. Replace with the real assets when ready.

- [ ] `/public/logo.svg`               Original wordmark + mark, optimised SVG, single colour (currentColor)
- [ ] `/public/logo-mark.svg`          Just the floral mark, square viewBox, currentColor
- [ ] `/public/logo-mark-light.svg`    Inverted (white) variant if needed for non-currentColor uses
- [ ] `/public/favicon.ico`            32x32 derived from the floral mark
- [ ] `/public/apple-touch-icon.png`   180x180

When the real SVG arrives, replace the inline `<FloralMark />` paths in `components/brand/Logo.tsx` with the real path data so the mark inherits `currentColor` (no PNG fallback needed in the Nav/Footer).

## Content & permissions

- [ ] `/public/founder.jpg`            Silviu Major, 1200x1200, < 200kb. Then re-enable `<Image>` in `components/sections/Founder.tsx` (currently a CSS-only initials placeholder).
- [ ] `/public/hey-broadband.svg`      Hey! Broadband logo, pending permission.
- [ ] Confirm 7 case-study stats are publishable (anonymised or named).
- [ ] Hey! Broadband naming flip: set `NEXT_PUBLIC_FEATURE_NAMED_CASE_STUDY=true`.
- [ ] Companies House registration number for footer.
- [ ] Privacy / Terms / GDPR-DPA pages (separate effort; routes are footer links only for now).

## Partner logos (optional polish)

The Partners section currently shows brand names as text pills. To upgrade to logos, add monochrome SVGs to `/public/partners/`:

- [ ] salesforce.svg, hubspot.svg, zendesk.svg, intercom.svg, freshdesk.svg
- [ ] twilio.svg, aws-connect.svg, whatsapp.svg, slack.svg, teams.svg
- [ ] openai.svg, anthropic.svg, azure.svg, bedrock.svg, snowflake.svg, bigquery.svg

Then update `components/sections/Partners.tsx` to render `<Image src={...} />` per item. Keep all logos in a single colour (`currentColor` ideal) so they tone-shift cleanly.

## Environment variables (.env.local — see .env.example)

- [ ] `NEXT_PUBLIC_SITE_URL`                     https://fiveleaf.co.uk
- [ ] `NEXT_PUBLIC_BOOKING_URL`                  cal.com link (placeholder until provided)
- [ ] `NEXT_PUBLIC_AGENT_EMBED_URL`              Voiceflow / Convocore script URL (pending)
- [ ] `NEXT_PUBLIC_AGENT_EMBED_PROVIDER`         voiceflow | convocore (pending)
- [ ] `NEXT_PUBLIC_FEATURE_NAMED_CASE_STUDY`     "true" once Hey! Broadband approves naming
- [ ] `NEXT_PUBLIC_LINKEDIN_URL`                 (pending)

## Pre-launch

- [ ] Replace all placeholders, search repo for `TODO`
- [ ] Lighthouse mobile >= 85, desktop >= 95
- [ ] axe DevTools: 0 critical issues
- [ ] OG preview via opengraph.xyz
- [ ] Vercel domain + HTTPS, redirect from old fiveleaf.co.uk content
- [ ] Resolve Hey! Broadband naming flip before announcing publicly
