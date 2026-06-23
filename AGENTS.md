<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Implementation Rules

1. Read `initializeTodo/taskTracker.md` before implementing any numbered task.
2. Read the specific numbered task file from `initializeTodo/` before changing code.
3. This project uses Next.js App Router. Public pages must live under `app/(public)/`. The home page should be `app/(public)/page.tsx`; future public routes should use `app/(public)/<route-name>/page.tsx`.
4. Keep `page.tsx` files thin. Do not write section markup directly in any `page.tsx`; import route sections and compose them there only.
5. Route-specific page sections must live in `components/sections/<route-name>/<section-name>.tsx`.
6. Shared sections and shared public-page building blocks must live in `components/section/shared/<component-name>.tsx`.
7. Keep reusable content/data separate from JSX when practical, preferably in `lib/content/<route-name>.ts` or a route-local data file referenced by the section components.
8. The installed shadcn vega preset lives in `components/ui/`. Do not edit generated shadcn UI files unless the task explicitly requires it.
9. When a shadcn component exists for a required UI primitive, use it instead of hand-rolling an equivalent primitive.
10. Use `lucide-react` icons for icon buttons and decorative UI icons when an equivalent icon exists.
11. Static assets copied from `reference-html/` must go under `public/` with clear folders such as `public/images/jodi/`.
12. Preserve the reference design intent: dark fitness/lifestyle storefront, mint primary accent, coral/gold secondary accents, strong editorial typography, sticky nav, product/program cards, and responsive mobile navigation.
13. Add comments containing `[PLACEHOLDER]` anywhere temporary content, dummy links, fake cart behavior, or mocked form handling remains.
14. Add comments containing `[TODO]` anywhere future behavior is intentionally deferred, such as checkout wiring, CMS integration, real search, newsletter API, or coaching form submission.
15. Do not leave unexplained mock interactions. If an action is visual-only, mark it with `[PLACEHOLDER]` or `[TODO]` in the code near the action.
16. After each numbered task, update both the task file completion evidence and `initializeTodo/taskTracker.md`.
17. For frontend tasks, run `npm run lint` and `npm run build` when feasible. Record exact commands and results in the evidence block.
