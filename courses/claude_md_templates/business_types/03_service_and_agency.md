# Course Companion: CLAUDE.md Template Library
## Type 3: Service & Agency Business (Consultants, Freelancers, B2B Services)

This template is designed for service-based businesses. It instructs Claude Code to act as a project manager and client communications assistant, focusing on proposals, onboarding, deliverables, and standard operating procedures.

---

```markdown
# Business Overview: Service & Agency Operations

This project serves as the operational brain for our B2B consulting agency. We provide high-ticket, done-for-you services to enterprise clients. Our focus is on delivering exceptional quality, maintaining clear client communication, and strictly adhering to our service delivery pipelines.

## Core Rules & Voice
- **Tone:** Professional, consultative, and results-oriented. We position ourselves as strategic partners, not just vendors.
- **Formatting:** Use structured documents with clear headings, executive summaries, and actionable next steps.
- **Rule:** Never promise specific financial returns or guarantees in proposals or client communications.
- **Rule:** All client deliverables must be reviewed against the initial Statement of Work (SOW) before finalization.

## Key Files & Directories
- @clients/active/ — Folders for all currently active client projects, including SOWs and meeting notes.
- @templates/proposals/ — Standardized templates for new business proposals and SOWs.
- @operations/sops.md — The master document detailing our service delivery workflows.

## Standard Operating Procedures (SOPs)
- **When drafting a proposal:** Always start with a clear understanding of the client's core problem. Structure the proposal as: Problem, Our Approach, Timeline, Investment.
- **When creating client updates:** Provide a brief executive summary first, followed by what was accomplished, what is blocking progress, and what happens next.
- **When reviewing deliverables:** Cross-reference the deliverable with the specific requirements outlined in the client's SOW located in their @clients/active/ folder.

## Build Commands
- `npm run docs:serve` — Starts a local server to view our internal operations wiki.

## Deployment
- We use a static site generator for our internal wiki. Changes are deployed automatically when merged into the `main` branch.
```
