# Programs and Products Refactor Instructions

These instructions apply to every file and task in `programsProductsRefactor/`.

## Required Workflow

- Read `taskTracker.md` and the current numbered task before changing code.
- Inspect the affected production files again; the repository is authoritative if it differs from a task assumption.
- Implement only the explicitly requested numbered task. Do not automatically begin the next task.
- Keep `app/(public)/page.tsx` composition-only and follow the repository architecture in the root `AGENTS.md`.
- After implementation, update the task's completion evidence and the corresponding tracker row with exact commands and results.
- Record client/content blockers in `taskTracker.md`; do not hide them with fabricated copy, prices, dates, images, URLs, claims, or offers.
- Do not change blog, journal, or newsletter behavior unless the current task identifies a direct Programs/Products dependency.

## Architecture Boundaries

- Programs and products must use centralized static structured content. JSON contains content only; TypeScript owns types, validation, transformations, and behavior.
- Preserve the existing design, responsive layout, accessibility behavior, `next/image` usage, shadcn `Card`, and shared section primitives where practical.
- Products only display approved client products and link to external purchase pages. Do not build a cart, checkout, payment flow, inventory, shipping, refunds, order management, POS, Amazon API integration, accounts, or fulfillment logic.
- Coaching uses initial registration, not scheduling. Do not add Calendly, a calendar, appointment management, or online coaching payments.
- Registration sends an email to Jodi through server-only code. Do not add a database, CMS, CRM, queue, authentication, or persistent lead store.
- Never collect medications, diagnoses, orthopedic conditions, or sensitive medical history in the public registration form.
- Agreement acknowledgement is not the formal signed waiver. Use only client-approved agreement/waiver copy and accurately describe the later signed-paperwork step.
- Never commit API keys or other secrets, and never expose email credentials through `NEXT_PUBLIC_*` variables.
- Keep changes scoped. Do not perform unrelated refactors or edit generated shadcn files.

## Verification

- Add or update focused Playwright coverage under `test/` for changed user behavior.
- Playwright must use its configured production server lifecycle; do not reuse a manual development server.
- Run `npm run lint`, `npm run build`, relevant Playwright tests, and `git diff --check` when feasible.
- Do not send a real registration email from an automated test. Mock the browser-facing endpoint for UI state tests and separately verify server-side rejection of invalid input.
- If repository reality conflicts with this plan, follow the actual code and document the discrepancy in the task evidence and tracker instead of forcing the planned structure.
