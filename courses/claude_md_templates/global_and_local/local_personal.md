# Course Companion: CLAUDE.md Template Library
## Local Personal Template (`CLAUDE.local.md`)

This template is placed in the root of a specific project but is *not* committed to version control (it should be in `.gitignore`). It is used for personal workflow preferences, local environment quirks, or temporary overrides that shouldn't affect other team members working on the same project.

---

```markdown
# Personal Local Instructions for Claude Code

These instructions are specific to my local environment and my personal workflow for this project. They override the project-level `CLAUDE.md` where there are conflicts, but they should not be shared with the rest of the team.

## Local Environment Details
- **Database:** My local database is running on port `5433` instead of the default `5432` because of a conflict with another project. Adjust connection strings accordingly when running local tests.
- **Paths:** I keep my downloaded assets in `~/Downloads/project_assets/` rather than the standard project folder. When I ask you to process an image, look there first.

## Personal Workflow Preferences
- **Testing:** I prefer to write tests *after* the feature is complete, not before (TDD). Do not generate test files automatically unless I explicitly ask for them.
- **Review Process:** Before executing any `git commit` command, always summarize the changes you are about to commit and wait for my "go ahead."
- **Logging:** I like verbose logging during development. When generating new functions, include `console.log` statements for the inputs and outputs so I can trace the execution.

## Temporary Overrides (Delete when done)
- **Current Focus:** For the next week, I am solely focused on the `user-authentication` branch. Ignore any tasks related to the billing system or the marketing pages.
- **Known Issue:** The `npm run build` command is currently failing due to a known issue with the `image-optimizer` dependency. If you need to build the project, use the temporary workaround script `npm run build:safe` instead.
```
