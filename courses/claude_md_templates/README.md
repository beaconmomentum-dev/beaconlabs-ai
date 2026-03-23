# CLAUDE.md Template Library
## "Claude Code in the Real World" — Beacon AI Lab

This library is a companion resource to the **Beacon AI Lab: Claude Code in the Real World** course. It provides seven production-ready `CLAUDE.md` templates that you can use as a starting point for your own business, eliminating the blank-page problem and getting you into a productive Claude Code workflow in minutes.

---

## What is a CLAUDE.md File?

A `CLAUDE.md` file is a plain Markdown document that gives Claude Code persistent, project-aware context. Instead of explaining your business, your codebase, and your preferences at the start of every session, you write them once in a `CLAUDE.md` file and Claude reads it automatically every time it starts.

Think of it as the onboarding document you would give a brilliant new team member — except this team member reads it instantly and never forgets it.

---

## The Three-Layer System

Claude Code supports three distinct levels of `CLAUDE.md` files, each with a different scope. Understanding this hierarchy is the key to using the system effectively.

| Layer | File Location | Committed to Git? | Who Sees It |
|---|---|---|---|
| **Machine (Global)** | `~/.claude/CLAUDE.md` | No | You only, across all projects |
| **Project** | `./CLAUDE.md` (repo root) | Yes | Your entire team and any AI session |
| **Local (Personal)** | `./CLAUDE.local.md` (repo root) | No | You only, for this project |

The machine-level file is your personal baseline. The project-level file is your shared team contract. The local file is your personal override layer for a specific project. All three are active simultaneously, and Claude merges them intelligently.

---

## Library Contents

### Business Type Templates (Project-Level `CLAUDE.md`)

These five templates are designed to be placed in the root of your project repository and committed to version control. Choose the one that best matches your business model, then customize it with your specific file paths, tools, and rules.

| File | Business Type | Best For |
|---|---|---|
| `01_content_and_community.md` | Content & Community | Course creators, newsletters, paid memberships |
| `02_ecommerce_and_products.md` | E-commerce & Products | Shopify stores, print-on-demand, direct-to-consumer |
| `03_service_and_agency.md` | Service & Agency | Consultants, freelancers, B2B service providers |
| `04_saas_and_software.md` | SaaS & Software | Web apps, subscription tools, developer products |
| `05_local_business.md` | Local Business | Restaurants, retail stores, brick-and-mortar |

### Global & Personal Templates

| File | Template Type | Where to Place It |
|---|---|---|
| `global_machine_level.md` | Machine-Level Global | `~/.claude/CLAUDE.md` |
| `local_personal.md` | Local Personal Override | `./CLAUDE.local.md` (gitignored) |

---

## How to Use These Templates

**Step 1 — Choose your business type template.** Open the file that matches your business model from the `business_types/` directory.

**Step 2 — Copy the inner code block.** Each file contains a Markdown code block with the actual template content. Copy everything *inside* the triple backticks.

**Step 3 — Paste it into your project root.** Create a new file called `CLAUDE.md` in the root of your project repository and paste the content.

**Step 4 — Customize the placeholders.** Replace the example file paths (e.g., `@content/newsletters/`) with the real paths in your project. Update the business description, rules, and SOPs to reflect your actual operations.

**Step 5 — Set up your global template.** Copy the content from `global_machine_level.md` into `~/.claude/CLAUDE.md` on your machine. This applies your baseline preferences to every project you work on.

**Step 6 — Add a personal local file (optional).** If you have personal workflow quirks or temporary overrides, create a `CLAUDE.local.md` in your project root using the `local_personal.md` template. Add `CLAUDE.local.md` to your `.gitignore` so it stays private.

---

## The Beacon Ecosystem Example

The Beacon Momentum platform uses a real-world implementation of this three-layer system. The project-level `CLAUDE.md` in the `beacon-momentum-platform` repository documents the full tech stack, brand architecture, key file references, and deployment rules. The machine-level `~/.claude/CLAUDE.md` on the Mac Studio enforces global security rules (no `.env` file access) and personal coding preferences. This combination means every Claude Code session starts with a complete, accurate picture of the business — no context-setting required.

---

## Customization Tips

The most effective `CLAUDE.md` files share three qualities. First, they reference specific files using the `@filename` syntax, which tells Claude to actively read those files rather than just knowing they exist. Second, they define explicit rules that prevent Claude from making assumptions — particularly around deployment, database changes, and sensitive files. Third, they document the "why" behind non-obvious decisions, so Claude can make consistent choices when facing similar situations in the future.

---

*This template library is maintained by Beacon AI Lab. For the full course, visit [beaconlabs.ai](https://beaconlabs.ai).*
