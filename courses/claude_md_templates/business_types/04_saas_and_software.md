# Course Companion: CLAUDE.md Template Library
## Type 4: SaaS & Software Startup (Web Apps, Tools, Subscriptions)

This template is designed for software companies. It instructs Claude Code to act as a senior developer and product manager, focusing on code quality, database schema, API design, and feature implementation.

---

```markdown
# Business Overview: SaaS Platform Development

This repository contains the codebase for our B2B SaaS application. We provide a subscription-based platform built on Next.js, Prisma, and PostgreSQL. Our priority is shipping reliable, secure, and performant features while maintaining a clean and scalable architecture.

## Core Rules & Architecture
- **Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Prisma ORM, PostgreSQL.
- **Rule:** Always use strict TypeScript typing. Do not use `any` unless absolutely necessary and documented.
- **Rule:** All database schema changes must be accompanied by a Prisma migration.
- **Rule:** API routes must include proper error handling and return standardized JSON responses.

## Key Files & Directories
- @prisma/schema.prisma — The single source of truth for our database structure. Always consult this before writing database queries.
- @src/app/api/ — All backend API routes.
- @src/components/ui/ — Our shared UI component library. Use these before creating custom components.

## Standard Operating Procedures (SOPs)
- **When adding a new feature:** 
  1. Review the @prisma/schema.prisma to see if database changes are needed.
  2. Write the API route in @src/app/api/.
  3. Build the frontend components using Tailwind CSS.
  4. Write unit tests for the new logic.
- **When debugging an error:** Always check the server logs first. Identify the specific file and line number before suggesting a fix.
- **When reviewing code:** Focus on security (e.g., SQL injection, XSS), performance, and adherence to our architectural patterns.

## Build Commands
- `npm run dev` — Starts the Next.js development server.
- `npm run build` — Creates a production build of the application.
- `npx prisma studio` — Opens the Prisma Studio interface to view the local database.

## Deployment
- Deployment is handled automatically via Vercel when code is pushed to the `main` branch.
- Do not manually modify production environment variables without approval.
```
