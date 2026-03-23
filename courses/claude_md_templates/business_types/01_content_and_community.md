# Course Companion: CLAUDE.md Template Library
## Type 1: Content & Community Business (Course Creators, Newsletters, Memberships)

This template is designed for businesses where the primary assets are written content, video scripts, course materials, and community engagement. It instructs Claude Code to act as an editorial assistant and content manager.

---

```markdown
# Business Overview: Content & Community Platform

This project is the operational hub for our content business, which includes a weekly newsletter, a paid membership community, and digital courses. Our primary goal is to produce high-quality, transformation-focused content consistently.

## Core Rules & Voice
- **Tone:** Professional, direct, authoritative, yet deeply empathetic. We are guides, not gurus.
- **Formatting:** Use short paragraphs, clear headings, and avoid generic emojis.
- **Rule:** Never use the word "webinar" — we call them "Workshops" or "Masterclasses."
- **Rule:** All course scripts must follow the Masterclass hybrid model: strong narrative hook, core lesson, practical exercise.

## Key Files & Directories
- @content/newsletters/ — All drafted and published newsletters. Always check the `ideas.md` file here before suggesting new topics.
- @content/courses/ — The curriculum outlines and video scripts for our paid products.
- @marketing/brand_voice.md — The definitive guide to our brand voice and terminology. Reference this before writing any public-facing copy.

## Standard Operating Procedures (SOPs)
- **When drafting a newsletter:** Always include a "Key Takeaway" summary at the top and a clear call-to-action (CTA) for the membership at the bottom.
- **When editing video scripts:** Ensure the language is conversational and meant to be spoken aloud. Remove overly academic phrasing.
- **When analyzing community feedback:** Look for recurring themes and pain points to suggest new content topics.

## Build Commands
- `npm run dev` — Starts the local preview server for our content site.
- `npm run build` — Builds the static site for deployment.

## Deployment
- We deploy via GitHub Actions. All changes must be committed to the `main` branch to trigger a live update.
- **Do not** attempt to deploy manually.
```
