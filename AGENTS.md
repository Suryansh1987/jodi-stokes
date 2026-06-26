<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Architecture

- This project uses Next.js App Router.
- Public pages must live under `app/(public)/`.
- The home page must be `app/(public)/page.tsx`.
- Future public routes must use `app/(public)/<route-name>/page.tsx`.
- Keep `page.tsx` files thin. They should import route sections and compose them only.
- Do not write section markup, card markup, hardcoded content arrays, or inline implementation CSS directly in `page.tsx`.
- Keep reusable content and data separate from JSX when practical, preferably in `lib/content/<route-name>.ts` or a route-local data file.
- Static assets copied from `reference-html/` must live under `public/`, using clear folders such as `public/images/jodi/`.

## Components

- Route-specific page sections must live in `components/sections/<route-name>/<section-name>.tsx`.
- Shared sections and shared public-page building blocks must live in `components/section/shared/<component-name>.tsx`.
- The installed shadcn vega preset lives in `components/ui/`.
- Do not edit generated shadcn UI files unless the task explicitly requires it.
- When a shadcn component exists for a required UI primitive, use it instead of hand-rolling an equivalent primitive.
- Use `lucide-react` icons for icon buttons and decorative UI icons when an equivalent icon exists.

## UI And Content

- Preserve the reference design intent: dark fitness/lifestyle storefront, mint primary accent, coral/gold secondary accents, strong editorial typography, sticky nav, product/program cards, and responsive mobile navigation.
- Add code comments containing `[PLACEHOLDER]` anywhere temporary content, dummy links, fake cart behavior, visual-only actions, or mocked form handling remains.
- Add code comments containing `[TODO]` anywhere future behavior is intentionally deferred, such as checkout wiring, CMS integration, real search, newsletter API, analytics, admin integration, or coaching form submission.
- Do not leave unexplained mock interactions. If an action is visual-only, mark it with `[PLACEHOLDER]` or `[TODO]` near the action.

## Workflow

- Before implementing any numbered task, read reference folder's `taskTracker.md`.
- Before changing code for a numbered task, read the specific numbered task file from reference folder.
- After each numbered task, update both the task file completion evidence and `taskTracker.md`.
- For frontend tasks, run `npm run lint` and `npm run build` when feasible.
- Record exact verification commands and results in the task evidence block.

## Testing Strategy

- Keep Playwright tests under `test/`.
- Playwright must manage its own server lifecycle through `playwright.config.ts`.
- Run Playwright against production mode, not the dev server.
- The Playwright server command must build and start the app with `npm run build && npm run start`.
- Do not rely on or reuse manually started dev servers.
- Do not kill processes by PID as part of testing. If a port conflict occurs, report it and use an explicit alternate port/configuration.
- Tests must be deterministic and isolated from local manual server state.
- Use accessibility-first locators and shared helpers for repeated assertions.
- Reference docs:
  - Playwright Test configuration: `https://playwright.dev/docs/test-configuration`
  - Playwright locators: `https://playwright.dev/docs/locators`
  - Playwright assertions: `https://playwright.dev/docs/test-assertions`
  - Next.js local image handling: `node_modules/next/dist/docs/01-app/01-getting-started/12-images.md`
