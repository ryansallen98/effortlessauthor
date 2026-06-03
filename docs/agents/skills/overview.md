# Project Skills Overview

This folder contains project-local skills for Codex, Claude, Cursor, and other agents that can read Agent Skills-style folders. Skills are stored here because this repo keeps all durable agent rules and skills under `docs/agents`.

## Marketing Skills Import

Marketing skills were imported with:

```bash
npx skills add coreyhaines31/marketingskills --all --copy
```

Source: https://github.com/coreyhaines31/marketingskills

Source commit: `7f4af1ea8e7809e0142c55bf19243a706f539c25`

License: MIT, preserved at [marketingskills.LICENSE](marketingskills.LICENSE).

Layout adaptations:

- Skill folders live under `docs/agents/skills/<skill-name>/SKILL.md`.
- Skill references live beside each skill under `references/`.
- Source eval artifacts were excluded.
- Shared marketing tool references live under `docs/agents/tools` so existing relative tool links continue to resolve.
- Product marketing context uses `docs/agents/context/product-marketing.md`.
- Marketing plan working files use `docs/agents/marketing-plans/<client-slug>/`.

## Skill Use

When a marketing task appears, choose the most specific skill by name and read its `SKILL.md`. For positioning, ICP, audience, brand voice, or reusable product context, run `product-marketing` first and keep the context in `docs/agents/context/product-marketing.md`.

## Available Skills

| Skill | Trigger Summary |
| --- | --- |
| [ab-testing](ab-testing/SKILL.md) | When the user wants to plan, design, or implement an A/B test or experiment, or build a growth experimentation program. |
| [ad-creative](ad-creative/SKILL.md) | When the user wants to generate, iterate, or scale ad creative — headlines, descriptions, primary text, or full ad variations — for any paid advertising platform. |
| [ads](ads/SKILL.md) | When the user wants help with paid advertising campaigns on Google Ads, Meta (Facebook/Instagram), LinkedIn, Twitter/X, or other ad platforms. |
| [ai-seo](ai-seo/SKILL.md) | When the user wants to optimize content for AI search engines, get cited by LLMs, or appear in AI-generated answers. |
| [analytics](analytics/SKILL.md) | When the user wants to set up, improve, or audit analytics tracking and measurement. |
| [aso](aso/SKILL.md) | When the user wants to audit or optimize an App Store or Google Play listing. |
| [churn-prevention](churn-prevention/SKILL.md) | When the user wants to reduce churn, build cancellation flows, set up save offers, recover failed payments, or implement retention strategies. |
| [co-marketing](co-marketing/SKILL.md) | When the user wants to find co-marketing partners, plan joint campaigns, or brainstorm partnership opportunities. |
| [cold-email](cold-email/SKILL.md) | Write B2B cold emails and follow-up sequences that get replies. |
| [community-marketing](community-marketing/SKILL.md) | Build and leverage online communities to drive product growth and brand loyalty. |
| [competitor-profiling](competitor-profiling/SKILL.md) | When the user wants to research, profile, or analyze competitors from their URLs. |
| [competitors](competitors/SKILL.md) | When the user wants to create competitor comparison or alternative pages for SEO and sales enablement. |
| [content-strategy](content-strategy/SKILL.md) | When the user wants to plan a content strategy, decide what content to create, or figure out what topics to cover. |
| [copy-editing](copy-editing/SKILL.md) | When the user wants to edit, review, or improve existing marketing copy, or refresh outdated content. |
| [copywriting](copywriting/SKILL.md) | When the user wants to write, rewrite, or improve marketing copy for any page — including homepage, landing pages, pricing pages, feature pages, about pages, or... |
| [cro](cro/SKILL.md) | When the user wants to optimize, improve, or increase conversions on any marketing page or form — including homepage, landing pages, pricing pages, feature pages,... |
| [customer-research](customer-research/SKILL.md) | When the user wants to conduct, analyze, or synthesize customer research. |
| [directory-submissions](directory-submissions/SKILL.md) | When the user wants to submit their product to startup, SaaS, AI, agent, MCP, no-code, or review directories for backlinks, domain rating, and discovery. |
| [emails](emails/SKILL.md) | When the user wants to create or optimize an email sequence, drip campaign, automated email flow, or lifecycle email program. |
| [free-tools](free-tools/SKILL.md) | When the user wants to plan, evaluate, or build a free tool for marketing purposes — lead generation, SEO value, or brand awareness. |
| [image](image/SKILL.md) | When the user wants to create, generate, edit, or optimize images for marketing — blog heroes, social graphics, product mockups, profile banners, listing visuals, or... |
| [launch](launch/SKILL.md) | When the user wants to plan a product launch, feature announcement, or release strategy. |
| [lead-magnets](lead-magnets/SKILL.md) | When the user wants to create, plan, or optimize a lead magnet for email capture or lead generation. |
| [marketing-ideas](marketing-ideas/SKILL.md) | When the user needs marketing ideas, inspiration, or strategies for their SaaS or software product. |
| [marketing-plan](marketing-plan/SKILL.md) | When the user needs a comprehensive marketing plan for a client, a company they advise, or their own product. |
| [marketing-psychology](marketing-psychology/SKILL.md) | When the user wants to apply psychological principles, mental models, or behavioral science to marketing. |
| [onboarding](onboarding/SKILL.md) | When the user wants to optimize post-signup onboarding, user activation, first-run experience, or time-to-value. |
| [paywalls](paywalls/SKILL.md) | When the user wants to create or optimize in-app paywalls, upgrade screens, upsell modals, or feature gates. |
| [popups](popups/SKILL.md) | When the user wants to create or optimize popups, modals, overlays, slide-ins, or banners for conversion purposes. |
| [pricing](pricing/SKILL.md) | When the user wants help with pricing decisions, packaging, or monetization strategy. |
| [product-marketing](product-marketing/SKILL.md) | When the user wants to create or update their product marketing context document. |
| [programmatic-seo](programmatic-seo/SKILL.md) | When the user wants to create SEO-driven pages at scale using templates and data. |
| [prospecting](prospecting/SKILL.md) | When the user wants to find, qualify, and build a list of prospects to reach out to — across B2B SaaS, general B2B, or local small businesses. |
| [referrals](referrals/SKILL.md) | When the user wants to create, optimize, or analyze a referral program, affiliate program, or word-of-mouth strategy. |
| [revops](revops/SKILL.md) | When the user wants help with revenue operations, lead lifecycle management, or marketing-to-sales handoff processes. |
| [sales-enablement](sales-enablement/SKILL.md) | When the user wants to create sales collateral, pitch decks, one-pagers, objection handling docs, or demo scripts. |
| [schema](schema/SKILL.md) | When the user wants to add, fix, or optimize schema markup and structured data on their site. |
| [seo-audit](seo-audit/SKILL.md) | When the user wants to audit, review, or diagnose SEO issues on their site. |
| [signup](signup/SKILL.md) | When the user wants to optimize signup, registration, account creation, or trial activation flows. |
| [site-architecture](site-architecture/SKILL.md) | When the user wants to plan, map, or restructure their website's page hierarchy, navigation, URL structure, or internal linking. |
| [sms](sms/SKILL.md) | When the user wants to plan, build, or optimize SMS or MMS marketing — including welcome flows, abandoned cart texts, post-purchase, win-back, promotional sends, or... |
| [social](social/SKILL.md) | When the user wants help creating, scheduling, or optimizing social media content for LinkedIn, Twitter/X, Instagram, TikTok, Facebook, or other platforms. |
| [video](video/SKILL.md) | When the user wants to create, generate, or produce video content using AI tools or programmatic frameworks. |
