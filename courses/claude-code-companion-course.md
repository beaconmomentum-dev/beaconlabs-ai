# Beacon AI Lab: "Claude Code in the Real World"
## Companion Course Strategy & Curriculum Outline
### Version 1.0 — March 23, 2026

---

## The Core Positioning

**Anthropic built the car. We teach you how to drive it — on real roads, with real cargo.**

Anthropic's free *Claude Code in Action* course is excellent foundational training. It teaches the mechanics: how to install Claude Code, how to add context, how to make changes, how to use MCP servers. What it cannot teach — because it has no skin in the game — is *how to apply those mechanics to a real, revenue-generating business ecosystem*.

That is exactly what this course does.

> "Anthropic taught you how to use it. Now let us build the car and teach you how to drive it."

This is not a competing course. It is a **companion and accelerator** — a paid, practical overlay that uses the Beacon Momentum ecosystem as the live vehicle. Students take the free Anthropic course alongside this one, and every lesson in the Anthropic course has a corresponding Beacon real-world application module.

---

## Market Positioning

| | Anthropic Free Course | Beacon Companion Course |
|---|---|---|
| **What it teaches** | Claude Code mechanics | Claude Code applied to a real business |
| **Project used** | Generic demo app (uigen) | Beacon Momentum live ecosystem |
| **Outcome** | Certification | Certification + a working AI-powered business asset |
| **Audience** | Developers, beginners | Entrepreneurs, solopreneurs, non-coders |
| **Price** | Free | $297–$497 (or Beacon Momentum membership add-on) |
| **Platform** | Anthropic Skilljar | Beacon Academy / Higgsfield |

---

## The Tagline Options

1. **"Anthropic taught you the tool. We teach you the trade."**
2. **"The free course gives you the keys. We show you where to drive."**
3. **"Claude Code in the Real World — Powered by Beacon AI Lab"**

---

## Course Structure: 9 Modules

Each module mirrors one section of the Anthropic course and adds a real-world Beacon application layer.

---

### MODULE 1: What Is a Coding Assistant — And Why Non-Coders Win
*Mirrors: Introduction + What is a coding assistant?*

**Anthropic teaches:** What Claude Code is, how it differs from ChatGPT, the agentic loop concept.

**Beacon teaches:**
- Why the biggest winners with AI coding tools are NOT developers — they are people who know what to build
- The Beacon Ecosystem as a case study: a multi-brand, multi-revenue business built without a traditional dev team
- Exercise: Map your own business to a codebase — what would YOUR project look like?

---

### MODULE 2: Your First Real Project — Setting Up for Business
*Mirrors: Claude Code setup + Project setup*

**Anthropic teaches:** Installing Claude Code, running `/init`, understanding the terminal.

**Beacon teaches:**
- Setting up Claude Code against a real business project (beacon-momentum-platform)
- Why your Mac Studio / local machine is your command center, not a cloud IDE
- The LaunchAgent pattern: making your tools permanent and always-on
- Exercise: Clone a real Beacon repo and run `/init` — see what Claude Code discovers about a production codebase

---

### MODULE 3: Context Is Everything — Teaching Claude Your Business
*Mirrors: Adding context*

**Anthropic teaches:** CLAUDE.md, `/init`, `@file` mentions, memory mode with `#`.

**Beacon teaches:**
- Writing a CLAUDE.md that captures your brand voice, business rules, and architecture
- The three-layer context system: project CLAUDE.md + personal CLAUDE.local.md + global ~/.claude/CLAUDE.md
- Real example: The Beacon CLAUDE.md — how it references the Prisma schema, brand guidelines, and deployment rules
- Exercise: Write your own CLAUDE.md for your business or side project

---

### MODULE 4: Making Changes That Matter — From Idea to Deployed Feature
*Mirrors: Making changes*

**Anthropic teaches:** How Claude Code reads, edits, and writes files; the diff review workflow.

**Beacon teaches:**
- The GitHub → Claude Code → CI/CD pipeline: how a single instruction becomes a live change on a production website
- Real example: Fixing the React deduplication crash on app.beaconmomentum.com — what the conversation looked like
- The "trust but verify" workflow: reviewing Claude's diffs before approving
- Exercise: Make a real change to a project and walk it through to deployment

---

### MODULE 5: Controlling Context — Staying Focused, Staying Fast
*Mirrors: Controlling context*

**Anthropic teaches:** How to manage context window, when to start new sessions, `/compact`.

**Beacon teaches:**
- Why context bloat is the #1 reason AI coding sessions go wrong
- The Beacon session management protocol: what to include, what to exclude, when to reset
- Using BEACON_CONTEXT.md as a cross-session state document — the pattern that keeps every AI session aligned
- Exercise: Build your own cross-session context document for your project

---

### MODULE 6: Custom Commands — Your Business on Autopilot
*Mirrors: Custom commands*

**Anthropic teaches:** Creating slash commands, the `.claude/commands/` directory, parameterized commands.

**Beacon teaches:**
- Real Beacon custom commands: `/deploy`, `/signal-check`, `/update-context`
- Building a command library for your business — the 10 commands every entrepreneur should have
- How custom commands become the "buttons" non-technical team members can use
- Exercise: Build three custom commands for your own business workflow

---

### MODULE 7: MCP Servers — Connecting Claude to Your Entire Stack
*Mirrors: MCP servers with Claude Code*

**Anthropic teaches:** What MCP is, how to install MCP servers, the filesystem and GitHub MCPs.

**Beacon teaches:**
- The Beacon MCP stack: Slack, Stripe, Instagram, Meta Ads, Gmail, Cloudflare, HeyGen — all connected
- Real example: How Bosun uses MCP to post to Instagram, check Stripe balances, and respond in Slack — all from a single Claude session
- Building your own MCP integration: connecting Claude Code to your CRM, email, or e-commerce platform
- Exercise: Install one MCP server relevant to your business and make a real API call from Claude Code

---

### MODULE 8: GitHub Integration — Version Control as a Safety Net
*Mirrors: Github integration*

**Anthropic teaches:** The GitHub MCP, creating PRs, reviewing code changes.

**Beacon teaches:**
- The mandatory GitHub protocol: why every change must be committed before it is deployed
- The Beacon CI/CD pipeline: how a `git push` becomes a live website update in under 2 minutes
- Using GitHub as your business's institutional memory — not just code storage
- Exercise: Set up a private GitHub repo for your project with a basic CI/CD workflow

---

### MODULE 9: Hooks — Making Claude Proactive, Not Reactive
*Mirrors: Introducing hooks*

**Anthropic teaches:** What hooks are, pre/post tool hooks, automated workflows triggered by Claude actions.

**Beacon teaches:**
- The Beacon automation stack: how hooks connect Claude Code to n8n, Bosun, and Slack
- Real example: A hook that automatically updates BEACON_CONTEXT.md after every significant session
- Building a "business nervous system" — where Claude Code, n8n, and your CRM all talk to each other
- Exercise: Build one hook that automates a post-session task in your own workflow

---

## Bonus Module: The Beacon AI Lab Business Model
*Not in the Anthropic course — exclusive to Beacon*

**What this module covers:**
- How to package everything you've learned into a service offering
- The three monetization paths from the Anthropic video: consulting, training, automations
- Beacon AI Lab as a template: how to build your own "AI Lab" brand within your existing business
- Pricing, positioning, and your first client conversation

---

## Delivery Format

| Element | Specification |
|---|---|
| **Platform** | Beacon Academy (Higgsfield hybrid model) |
| **Video style** | Avatar-led lessons (Bosun mentor persona) with screen recording overlays |
| **Length per lesson** | 8–15 minutes |
| **Exercises** | Hands-on, real project work — not hypotheticals |
| **Community** | Beacon Momentum Discord / Slack channel for course members |
| **Certification** | Beacon AI Lab "Claude Code Practitioner" certificate |
| **Prerequisite** | Complete the free Anthropic course alongside this one |

---

## Revenue Model

| Tier | Price | What's Included |
|---|---|---|
| **Standalone** | $297 | Full 9-module course + exercises + certificate |
| **Beacon Momentum Member Add-On** | $97 | Same course, discounted for active members |
| **Done-With-You Cohort** | $997 | Course + 4 live group sessions + Slack access |
| **Done-For-You** | Custom | Beacon AI Lab builds the client's stack for them |

---

## Immediate Next Steps

1. Record Module 1 intro video (avatar-led, 8 min) — establishes the positioning
2. Build the CLAUDE.md template library (5 templates for different business types)
3. Create the GitHub repo: `beaconmomentum-dev/claude-code-companion-course`
4. Set up the course on Beacon Academy / Higgsfield
5. Write the sales page for beaconlabs.ai/claude-code

---

*This document is the master curriculum plan. All lesson scripts, exercises, and assets should reference this as the source of truth.*
