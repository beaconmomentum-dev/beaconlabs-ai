# Course Companion: CLAUDE.md Template Library
## Type 2: E-commerce & Physical Products (Shopify, Print-on-Demand, Direct-to-Consumer)

This template is designed for businesses selling physical goods. It instructs Claude Code to act as a store manager, focusing on product descriptions, conversion rates, inventory management, and marketing assets.

---

```markdown
# Business Overview: E-commerce & Physical Products

This project manages our direct-to-consumer e-commerce brand. We sell physical products (apparel and accessories) using a print-on-demand model integrated with Shopify. Our focus is on high conversion rates, clear product messaging, and seamless fulfillment.

## Core Rules & Voice
- **Tone:** Energetic, benefit-driven, and clear. We focus on how the product makes the customer feel.
- **Formatting:** Use short, punchy sentences for product descriptions. Always highlight key features using bold text.
- **Rule:** Never invent product features or materials. If you don't know the material composition, ask before writing the description.
- **Rule:** All pricing must be displayed in USD unless otherwise specified.

## Key Files & Directories
- @products/catalog.csv — The master list of all current products, SKUs, and pricing.
- @marketing/ad_copy/ — Active and historical copy for Meta and Google Ads.
- @store/theme/ — The Shopify theme code (Liquid, CSS, JS).

## Standard Operating Procedures (SOPs)
- **When writing product descriptions:** Follow the PAS framework (Problem, Agitation, Solution). Always include sizing information and care instructions.
- **When creating ad copy:** Provide three variations for testing (Short, Long, Story-driven). Always include a clear CTA like "Shop Now" or "Get Yours Today."
- **When troubleshooting the store:** Always check the @store/theme/snippets/ for any broken Liquid tags before modifying the main templates.

## Build Commands
- `shopify theme dev` — Starts the local development server for the Shopify theme.
- `npm run tailwind:build` — Compiles the custom CSS for the storefront.

## Deployment
- Theme changes are deployed via the Shopify CLI: `shopify theme push`.
- Always push to the staging theme first and verify on mobile before pushing to the live production theme.
```
