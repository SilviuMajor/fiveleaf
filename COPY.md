# Fiveleaf — Site copy

Every piece of user-facing text on the site, organised in scroll order. Edit anything in this file, then hand it back and the matching strings get wired into the codebase.

**How to work on this with another Claude chat (or by hand):**

1. Copy this file's contents into a new chat. Tell that chat: "this is the copy for fiveleaf.co.uk — please help me rewrite [the section / the whole thing]." Edit freely.
2. Paste the edited version back here, or save it as `COPY.md` and ask Silv's dev to apply it.
3. Where copy lives in code:
   - **Structured content** (FAQs, lanes, departments, partner names, etc.) is in `content/sections.ts`.
   - **Inline prose** (hero subhead, section H2s, CTAs) is in the matching component file under `components/sections/`.
   - **Brand-level strings** (site description, tagline, registration number, booking URL) are in `lib/site.ts`.

Anything wrapped in `[brackets]` is a placeholder.

**Booking URL:** `https://cal.com/silviumajor/fiveleaf-ai-discovery-call` — every "Book a discovery call" / "Book a call" CTA across the site links here. To swap for a different cal.com link in production, set `NEXT_PUBLIC_BOOKING_URL` in `.env.local`.

---

## Navigation

**Logo:** Full Fiveleaf lockup (5-petal frangipani mark + "fiveleaf" wordmark in Inter Tight 600). Inlined as SVG so it inherits the surrounding text colour — black on light surfaces, white on the hero.

**Top-level links (desktop, in order):**
- Departments
- Case study
- How it works
- FAQ

**Right-side actions (desktop):**
- Sign in (links to `dashboard.fiveleaf.co.uk`, opens in new tab)
- Book a call (primary CTA — opens cal.com booking link in new tab)

**Mobile:**
- Logo + "Book a call" pill + "Menu" button
- Tapping Menu drops a full-screen dark overlay with the section list set in editorial display type (each link prefixed with `01`–`05`), plus contact email, dashboard sign-in link, and the primary CTA button at the bottom.

---

## Hero

**Eyebrow pill:** AI Agents for Broadband & Telecom

**H1:** We build AI agents that run inside your business. Not tools you have to learn.

**Subhead:** Fiveleaf designs, builds and operates bespoke AI agents for customer service, sales, retention and operations. Fully integrated into your stack and continuously optimised by us.

**Primary CTA:** Book a discovery call

**Secondary CTA:** Or talk to our AI agent

**Trust strip:** Trusted by a leading UK ISP · 500% ROI in month one · 12,000+ conversations handled monthly.

### Right-side theatre (cycles through 5 scenarios automatically)

Three-tier panel: conversation up top, "Inside the agent" thinking panel below it, system telemetry footer. Each scenario plays through user message → thinking steps reveal → agent response → emerald action chip → systems-touched footer. ~9s per scenario.

| # | Channel | User says | Thinking steps (system tag · step) | Agent reply | Action chip |
|---|---|---|---|---|---|
| 1 | WhatsApp | "I want to cancel." | `CRM` Loading Sarah Patel · 18mo · no open tickets / `KB` Reading retention playbook · KB-RET-204 / `Salesforce` Checking 900Mb availability at GU2 7XH | "Sorry to hear that. Before we process, I can offer 900Mb at the price you pay now. Worth a look?" | `[RETAIN]` Win-back offer presented · via Salesforce |
| 2 | Voice | "Why is my speed slower than I'm paying for?" | `Salesforce` Pulling account · plan 450Mb on file / `Plan` Comparing to live sync · 18% below / `Calendar` Looking up engineer slots near GU2 | "Your line is syncing 18% below plan. I can run a remote diagnostic and book an engineer Saturday morning." | `[BOOK]` Engineer slot Sat 10am · via Calendar |
| 3 | Email | "Need a VAT invoice for last month." | `CRM` Looking up account · invoice cycle April / `Stripe` Generating invoice · INV-2026-04812 / `Email` Sending to billing@ on file | "Sent across. Reference INV-2026-04812. Anything else?" | `[EXEC]` Invoice issued · self-serve · via Stripe |
| 4 | SMS | "Why was my bill £14 higher this month?" | `CRM` Fetching account · billing 28-Apr / `Stripe` Itemising charges · 1 install fee · 2 days pro-rata / `KB` Pulling install fee policy · KB-BILL-019 | "Two things this month: the £9 install fee from your upgrade and £4.92 pro-rata for the plan switch. Itemised receipt sent." | `[EXEC]` Itemised receipt sent · via Stripe |
| 5 | Web chat | "Do you cover Bristol BS8 4? Looking to switch." | `Salesforce` Checking BS8 4 coverage · gigabit available / `KB` Pulling current promo · KB-PROMO-038 / `HubSpot` Creating lead · cold inbound · sales-ready | "Yes, gigabit fibre available at BS8 4. New customers get 6 months at 50% off. Want me to run an eligibility check?" | `[QUALIFY]` Lead routed to sales · via HubSpot |

Header strip: live channel badge + scenario counter (e.g. `1 / 5`).
Inside-the-agent label switches between `listening` / `thinking` / `ready` per phase.
Footer telemetry: `systems:` followed by the unique system tags touched in that scenario, plus 5 dots showing which scenario is active.

---

## AI agents in plain English (four-stage pipeline)

This is the section that runs after the problem section.

**Eyebrow pill:** AI agents in plain English

**H2:** From input to action in four stages.

**Subhead:** The pipeline every customer message runs through. Channels in. Context fused. Decision made. Action taken. Same loop, every time.

### Stage 01 — Input (sand pastel)

- **Caption:** Customer reaches out
- **Items:** Web · WhatsApp · Voice · Email

### Stage 02 — Context (sky pastel)

- **Caption:** Agent pulls what it needs
- **Items:** CRM record · Knowledge base · Recent history

### Stage 03 — Reason (black)

- **Caption:** Decides the next move
- **Items:** Intent + policy + plan

### Stage 04 — Act (sage pastel)

- **Caption:** Closes the loop
- **Items:** Booking · Refund · Handover

### Stat tiles (under the pipeline)

| Label | Value |
|---|---|
| Avg input → action | 2.1s |
| Conversations resolved no-human | 5,000+/mo |
| Channels supported | 5+ |

**Closing line:** Each stage is built once, configured to your stack, and runs forever. *See the loop on a real client* (anchor link to case study).

---

## The problem

**Eyebrow pill:** The problem

**H2:** Your contact centre is the bottleneck. AI doesn't have to be another tool you manage.

### 01

- **Statement:** Volume keeps rising. Headcount can't keep up, and shouldn't have to.
- **Consequence:** AHT climbs, save rate slips, the team burns out. The metric you reward is the one you can't afford to grow.

### 02

- **Statement:** Out-of-hours enquiries die in the inbox. So do the leads.
- **Consequence:** Roughly a third of inbound demand for UK ISPs lands outside support hours. Most of it is gone by the next morning.

### 03

- **Statement:** Off-the-shelf chatbots underperform and get switched off within a quarter.
- **Consequence:** Decision-tree bots resolve under 20% of enquiries. The rest is press-zero rage and a worse experience than no bot at all.

### 04

- **Statement:** Every internal AI build stalls when the specialist leaves.
- **Consequence:** Internal projects without a long-term owner reach 60% complete and freeze. The system becomes a liability nobody touches.

---

## Departments

**Eyebrow pill:** Departments

**H2:** Providing AI enhancements for every team that touches the customer.

**Subhead:** Same platform, different outcomes. Each lane plugs into the team that owns the metric, with the integrations and escalation logic shaped to that team's playbook.

### Sales (sand)

- **Tagline:** Convert visitors into prospects, reach out to your audience, and turn leads into customers.
- **Bullets:**
  - Lead and appointment generation
  - Inbound and outbound AI agents
  - Guidance, qualification and FAQs
  - Intelligent live handover
  - Advanced AI sales scripting
  - CRM and custom API integration

### Support (sky)

- **Tagline:** AI agents built to provide 24/7 customer support and advanced troubleshooting.
- **Bullets:**
  - Advanced troubleshooting
  - Customer service and FAQs
  - Ticketing and compliance
  - 24/7 availability
  - Intelligent live handover
  - CRM and custom API integration

### Ops + HR (lavender)

- **Tagline:** Automate internal process and employee nurturing using the latest in AI.
- **Bullets:**
  - Process automation
  - Revenue optimisation
  - Automated employee onboarding
  - Internal HR procedures
  - CRM and custom API integration

---

## Case study

**Eyebrow pill:** Case study

**H2 (anonymised):** How a leading UK ISP hit **500% ROI** in month one.
**H2 (named):** How **Hey! Broadband** hit **500% ROI** in month one.

**Narrative paragraph 1:** [Client name] is a UK fibre ISP with 410k+ premises passed. They run multi-channel customer operations across web, WhatsApp, voice and email: tier-one support, technical troubleshooting, sales and renewals.

**Narrative paragraph 2:** We built a multi-agent system, integrated with their billing and CRM platform and a live human-handover portal. Live in production on text channels with telephony rolling next.

**Narrative paragraph 3:** In the first month, the agent absorbed half the inbound volume, captured thousands of out-of-hours enquiries the team would have lost, and put a measurable five-figure dent in monthly support cost.

**CTA button:** Want this for your business? Book a call

### Stat tiles (right column)

| Value | Label |
|---|---|
| 500% | ROI in month one |
| 12,000+ | Conversations handled monthly |
| 5,000+ | Fully automated, no human needed |
| 2,200+ | Out-of-hours enquiries captured |
| £15,000 | Monthly attributed sales |
| 1,000+ | Support tickets automated monthly |
| £6,500 | Monthly time-savings value |

---

## How it works (5-step process — engagement timeline)

**Eyebrow pill:** How it works

**H2:** Five steps from first call to live agent.

| # | Title | Duration | Body |
|---|---|---|---|
| 01 | Discovery | 1 week | We dig into your operations, channels and where the value is. Call volume, conversion gaps, automation candidates. |
| 02 | Design | 1 to 2 weeks | Conversation flows, integrations, knowledge ingestion, and escalation logic. Built to your team's existing playbook. |
| 03 | Build & integrate | 3 to 5 weeks | Agents, handover portal, CRM and helpdesk wiring, analytics. Hosted by us, plugged into your stack. |
| 04 | Pilot & go-live | 1 to 2 weeks | Soft launch on a single channel or segment, tune in production, onboard your team, then scale. |
| 05 | Continuous optimisation | Ongoing | Monthly reviews, expansion to new agents, new channels, new playbooks. We stay on as your AI specialist. |

**Closing line:** Typical first agent live in 4 to 8 weeks. Your AI capability compounds from there.

> Animated: a horizontal line draws 1→5 as you scroll past, with each numbered marker filling in just as the line reaches it.

---

## Why Fiveleaf

**Eyebrow pill:** Why Fiveleaf

**H2:** Built like an in-house team. Without the hiring.

### Point 1

- **Title:** We build it for you.
- **Body:** No internal AI team required. No new platform to learn. You get the outcome, not another tool to manage.

### Point 2

- **Title:** Vendor-agnostic and stack-friendly.
- **Body:** We integrate into your CRM, helpdesk, telephony and ticketing. Whatever you already run. No rip-and-replace.

### Point 3

- **Title:** Fully hosted, GDPR-aligned, no infra burden.
- **Body:** UK-based, DPA as standard, EU data residency available. Your team owns the outcome; we own the plumbing.

### Point 4

- **Title:** We don't disappear after launch.
- **Body:** We act as your internal AI specialist. Continuous improvement is the model, not an upsell.

---

## Stack-friendly (Partners)

**Eyebrow pill:** Stack-friendly

**H2:** Vendor-agnostic. API-deep. Built around your stack, not ours.

**Subhead:** Fiveleaf is not a platform you migrate to. We deploy agents that plug into the tools your team already uses. No rip-and-replace. No tenant lock-in. The integration layer is part of the build, not an afterthought.

### Integration capabilities (4 cards)

| Label | Body |
|---|---|
| REST + GraphQL | Standard APIs ingested with auth, retries, and rate-limiting handled by us. |
| Webhooks | Real-time event ingest in both directions, with replay and idempotency keys. |
| Direct database | Read/write to Postgres, MySQL, MSSQL, Oracle. SQL views, no schema lock-in. |
| Custom & legacy | SFTP drops, XML feeds, SOAP, screen-scraped admin tools. If you can authenticate, we can wire in. |

### Sticky rail copy

- **Header:** Common integrations
- **Body:** These come up across active engagements. Plenty more covered. If yours isn't named, we've almost certainly wired into it before, or built a custom adapter that does.

### Categorised partner list (every category line ends with a dashed `+ Custom` chip)

Brand glyphs render via `react-icons/si` for the brands available; the rest fall back to a small monogram badge with the first letter.

- **CRM:** Salesforce · HubSpot · Pipedrive · Custom
- **Helpdesk:** Zendesk · Intercom · Freshdesk · Front · Custom
- **Telephony:** Twilio · AWS Connect · Genesys · Custom
- **Messaging:** WhatsApp Business · Meta Messenger · SMS / iMessage · Custom
- **Comms:** Slack · Microsoft Teams · Custom
- **AI / LLM:** OpenAI · Anthropic · Azure OpenAI · AWS Bedrock · Custom
- **Data:** Snowflake · BigQuery · Postgres · Custom
- **Billing & ops:** Stripe · GoCardless · NetSuite · Custom

### Closing dark band

- **Headline:** If it has an API, a webhook, a database, or a CSV drop, we'll wire it in. Including the proprietary internal tool no one else has touched in five years.
- **Sidekick:** Most engagements include 4 to 8 system integrations. The largest to date wires in 17. Auth, retries, rate-limits, observability, fallback paths: all handled by us, not your engineering team.

---

## The agent in action (live agent embed)

**Eyebrow pill:** The agent in action

**H2:** Don't take our word for it. Talk to one of ours.

**Subhead:** This is the same AI agent technology we deploy for clients. Ask it anything about Fiveleaf, AI agents, or what we'd build for your business.

**Fallback card (when no embed configured):**
- **Title:** Talk to our AI agent
- **Body:** Live agent embed launching shortly. In the meantime, the fastest way to see what we'd build for your business is a 30-minute call.
- **CTA:** Book a call

---

## Founder

**Eyebrow pill:** Founder

**Bio paragraph:** Fiveleaf is built and run by **Silviu Major**. 10+ years building automation systems inside enterprise SaaS, now applying that same operational rigour to AI implementation for mid-market businesses. Every Fiveleaf engagement runs through Silv personally. You're not handed off to a junior account manager three weeks in.

**Location line:** Based in London. Working with operators across the UK.

---

## FAQ

**Eyebrow pill:** FAQ

**H2:** Questions buyers actually ask.

### Q1. How long until the AI agent is live?
Most clients see a first agent live within 4 to 8 weeks of kickoff. Discovery and design take 2 to 3 weeks, build and integration another 3 to 5, then a short pilot before full go-live. Complexity varies with how many channels and systems we wire in.

### Q2. Will the AI replace our human agents?
No. The point is to absorb the volume your humans shouldn't be handling: repetitive tickets, after-hours enquiries, low-touch sales. Your team focuses on the conversations that actually need a human. Most clients keep the same headcount and grow capacity instead.

### Q3. What systems do you integrate with?
Whatever you already run. Common stacks include Zendesk, HubSpot, Salesforce, Freshdesk, Intercom, Twilio, AWS Connect, custom CRMs and billing platforms. If it has an API, a webhook, a database, or a CSV drop, we can plug into it.

### Q4. What does it cost?
Bespoke, scoped to channels, volumes and integration depth. Most engagements run between £1,000 and £4,000 monthly, with a one-off build component up front. We'll scope yours on the discovery call. No obligation.

### Q5. Is the data secure? Is it GDPR-compliant?
Yes. UK-hosted by default, EU residency available, DPA as standard. Sensitive data is masked before it hits any LLM, and we can route via your tenant of choice (OpenAI, Anthropic, Azure, Bedrock) so prompts and outputs stay in your contractual perimeter.

### Q6. What if the AI gets something wrong?
Every agent has explicit escalation rules and a confidence threshold. When it isn't sure, it routes to a human with full conversation context, no "start from scratch" handovers. We monitor failure modes weekly and tune the agent in production.

### Q7. Can it handle WhatsApp, phone and web chat?
Yes. We deploy on web, WhatsApp, SMS, email and voice (telephony). The same underlying agent serves every channel so the customer experience stays consistent. Voice goes live alongside or after the text channels depending on volume.

### Q8. Who maintains the agent after it's live?
We do. Continuous optimisation is included in the monthly engagement: knowledge updates, new flows, performance tuning, expansion to new use cases. You get a single point of contact who runs it like your in-house AI lead.

### Q9. What if we already have a chatbot?
Most clients do, and most of those bots underperform. That's usually why we get the call. We can replace it cleanly or sit alongside it during transition. Either way, we benchmark against the existing solution so the uplift is measurable from day one.

### Q10. Why not build it ourselves?
You can. The hard parts aren't the model. They're integration, edge cases, ongoing tuning, and keeping the system reliable when the original builder leaves. We do this every day for clients in your sector. Most internal builds stall at 60% complete; we ship and keep going.

---

## Final CTA band

**H2:** Stop adding seats. Start adding capacity.

**Subhead:** 30-minute discovery call. No pitch. We'll tell you whether AI agents fit your business.

**Button:** Book a discovery call

---

## Footer

**Tagline (under logo):** AI agents, built for operators.

**Contact:** hello@fiveleaf.co.uk · LinkedIn (when set)

**Column — Company:** Case study · About · Contact

**Column — Legal:** Privacy · Terms · GDPR / DPA

**Bottom strip (left):** © [year] Fiveleaf Ltd · Registered in England · Company No. [insert]

**Bottom strip (right):** Built in London. AI agents, built for operators.

---

## Brand-level strings (lib/site.ts)

- **Site name:** Fiveleaf
- **Tagline:** AI agents, built for operators.
- **Description (used in `<meta>`, OG, search):** Fiveleaf builds and operates bespoke AI agents for UK broadband and telecom. Fully integrated, continuously optimised, with a 500% ROI proof point.
- **Default page title:** Fiveleaf: AI agents for broadband and telecom
- **Booking URL (default):** https://cal.com/silviumajor/fiveleaf-ai-discovery-call
- **Dashboard URL:** https://dashboard.fiveleaf.co.uk
- **Contact email:** hello@fiveleaf.co.uk

---

**End of copy.** Anything you change here, drop back to your dev (or me) with the section heading and the new wording, and it goes in the matching place in code.
