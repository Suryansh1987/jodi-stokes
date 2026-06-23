# initializeTodo Agent Instructions

This directory contains the implementation plan for recreating the `reference-html/` mock site in the initialized Next.js project.

## Local Workflow

1. Read `initializeTodo/taskTracker.md` first.
2. Read the numbered task being implemented.
3. Inspect the referenced mock sections in `reference-html/index.html` and assets in `reference-html/assets/`.
4. Implement one numbered task per pass unless the user explicitly requests a batch.
5. Keep tasks in dependency order when dependencies are listed.
6. Do not mark a task `Completed` until implementation, verification, and evidence are recorded.
7. Update both the numbered task file and `initializeTodo/taskTracker.md` in the same completion turn.

## Next.js Rules

- Read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js code.
- Use the App Router.
- Public pages belong in `app/(public)/`.
- Do not put section markup directly in `page.tsx`.
- Route-specific sections belong in `components/sections/<route-name>/<section-name>.tsx`.
- Shared sections belong in `components/section/shared/<component-name>.tsx`.
- Do not edit generated shadcn files in `components/ui/` unless a task explicitly requires it.
- Prefer existing shadcn UI primitives and `lucide-react` icons over custom primitives.

## Marker Rules

- Use `[PLACEHOLDER]` in code comments for temporary copy, fake links, mock products, fake cart/search behavior, or static form responses.
- Use `[TODO]` in code comments for intentional future work such as checkout, CMS, API-backed newsletter, real search, analytics, or admin integration.
- Keep marker comments close to the deferred behavior.

## Verification Rules

Suggested frontend checks:

```bash
npm run lint
npm run build
```

For responsive UI tasks, also record manual viewport checks for mobile and desktop.

## Completion Evidence Template

Every numbered task ends with:

```text
Status:
Implemented files:
Frontend command:
Frontend result:
Manual verification:
Evidence:
Caveats:
```
