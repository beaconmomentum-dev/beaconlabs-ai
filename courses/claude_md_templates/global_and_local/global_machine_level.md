# Course Companion: CLAUDE.md Template Library
## Global Machine-Level Template (`~/.claude/CLAUDE.md`)

This template is placed in the user's home directory. It applies to *every* project on the machine. It is designed to enforce global security rules, define standard tool preferences, and establish baseline AI behaviors that shouldn't need to be repeated in every individual project.

---

```markdown
# Global Machine Instructions for Claude Code

These instructions apply to all projects and directories on this machine. They represent my baseline preferences for how you should operate, regardless of the specific business or codebase we are working on.

## Global Security & Privacy Rules
- **Rule:** Never read, modify, or output the contents of `.env`, `.env.local`, or any file containing API keys, secrets, or passwords. If a task requires accessing these files, ask me to do it manually.
- **Rule:** Do not execute destructive commands (e.g., `rm -rf`, `drop database`) without explicit confirmation from me first.
- **Rule:** When suggesting commands that modify system configuration, explain what the command does before asking to run it.

## Global Coding Preferences
- **Language:** Always default to TypeScript over JavaScript when creating new files.
- **Formatting:** Use Prettier for all code formatting. Do not argue about style; just format it according to the standard rules.
- **Comments:** Write code that explains itself. Only add comments to explain *why* something complex is being done, not *what* is being done.

## Global Tooling & Environment
- **Package Manager:** Assume `npm` is the default package manager unless a `yarn.lock` or `pnpm-lock.yaml` is present in the project root.
- **Terminal:** Assume a standard Unix-like environment (macOS/Linux).
- **Git:** Always write clear, descriptive commit messages using the Conventional Commits format (e.g., `feat: add user login`, `fix: resolve API timeout`).

## Interaction Style
- **Tone:** Be concise and direct. Skip the pleasantries and get straight to the solution.
- **Assumptions:** Assume I am a capable developer but perhaps unfamiliar with the specific syntax of a new library. Explain the *concept* briefly, then provide the *code*.
- **When stuck:** If you fail to resolve an issue after 3 attempts, stop and ask me for guidance or additional context. Do not guess repeatedly.
```
