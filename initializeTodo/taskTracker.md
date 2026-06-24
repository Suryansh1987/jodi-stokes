# Jodi Stokes Next.js Mock Rebuild Task Tracker

This is the status source for rebuilding the `reference-html/` mock in Next.js. The numbered task files contain implementation plans and completion evidence.

## Status Rules

Allowed task statuses:

- `Not Started`
- `In Progress`
- `Blocked`
- `Completed`

Allowed verification statuses:

- `Not Run`
- `Passed`
- `Failed`
- `Blocked`
- `N/A`

## Confirmed Repository Findings

- Next.js is installed at `16.2.9`; local docs live in `node_modules/next/dist/docs/`.
- The app currently has starter files at `app/layout.tsx`, `app/page.tsx`, and `app/globals.css`.
- Tailwind CSS v4 and `tw-animate-css` are already imported in `app/globals.css`.
- shadcn vega preset is configured in `components.json`.
- Existing shadcn UI files live in `components/ui/`; currently only `components/ui/card.tsx` exists.
- `lucide-react` is installed.
- Reference mock lives in `reference-html/index.html`.
- Reference assets live in `reference-html/assets/` and `reference-html/uploads/`.
- The mock is a single public home page with topbar, sticky nav, mobile nav, hero, pillars, about, programs, book, shop, testimonials, coaching form, journal, newsletter, and footer.

## Target Structure

```text
app/
  (public)/
    page.tsx
  layout.tsx
  globals.css
components/
  section/
    shared/
      brand-logo.tsx
      site-footer.tsx
      site-header.tsx
      section-intro.tsx
  sections/
    home/
      about-section.tsx
      book-section.tsx
      coaching-section.tsx
      hero-section.tsx
      journal-section.tsx
      newsletter-section.tsx
      pillars-section.tsx
      programs-section.tsx
      shop-section.tsx
      testimonials-section.tsx
lib/
  content/
    home.ts
public/
  images/
    jodi/
```

## Mandatory Tasks

| # | Task | Status | Depends On | Frontend Build | Completion Evidence |
|---:|---|---|---|---|---|
| 0 | [Initialize Structure, Globals, Assets](./0.%20Initialize%20Structure%20Globals%20Assets.md) | Completed | None | Passed | Created the public route-group home page, removed starter root page ownership, copied four canonical Jodi assets to `public/images/jodi/`, configured mock fonts/metadata/global brand tokens, and verified with `npm run lint` plus `npm run build`. |
| 1 | [Public Layout, Header, Mobile Navigation](./1.%20Public%20Layout%20Header%20Mobile%20Navigation.md) | Completed | Task 0 | Passed | Added the public route layout, shared brand logo/topbar/site header/mobile nav components, sticky translucent header styling, mobile menu state/ARIA/scroll locking, and placeholder markers for fake search/cart/social behavior; `npm run lint` and `npm run build` passed. |
| 2 | [Home Page Composition and Content Map](./2.%20Home%20Page%20Composition%20and%20Content%20Map.md) | Completed | Task 0 | Passed | Added typed home content in `lib/content/home.ts`, centralized nav/marquee/mobile social data, added shared `SectionIntro`, created lightweight placeholder home sections, replaced the home page with composition-only imports, and verified with `npm run lint` plus `npm run build`. |
| 3 | [Hero, Pillars, and About Sections](./3.%20Hero%20Pillars%20and%20About%20Sections.md) | Completed | Tasks 0-2 | Passed | Replaced placeholder hero, pillars, and about markup with reference-style layouts, `next/image` assets, lucide CTA/play/pillar/check icons, responsive CSS, and required intro-video placeholder markers; `npm run lint`, `npm run build`, and production-mode Playwright verification passed. |
| 4 | [Programs and Book Sections](./4.%20Programs%20and%20Book%20Sections.md) | Completed | Tasks 0-2 | Passed | Replaced placeholder programs/book sections with reference-style program cards, featured `next/image` media, CSS art panels, visual-only ecommerce CTAs with `[PLACEHOLDER]`/`[TODO]`, a 3D book feature, responsive CSS, and Playwright coverage; `npm run lint`, `npm run build`, and production-mode Playwright verification passed. |
| 5 | [Shop Section and Product Cards](./5.%20Shop%20Section%20and%20Product%20Cards.md) | Not Started | Tasks 0-2 | Not Run | Add evidence in Task 5. |
| 6 | [Testimonials, Coaching, Journal, Newsletter](./6.%20Testimonials%20Coaching%20Journal%20Newsletter.md) | Not Started | Tasks 0-2 | Not Run | Add evidence in Task 6. |
| 7 | [Footer, Metadata, SEO, and Polish](./7.%20Footer%20Metadata%20SEO%20and%20Polish.md) | Not Started | Tasks 1-6 | Not Run | Add evidence in Task 7. |
| 8 | [Regression Verification and Evidence Pass](./8.%20Regression%20Verification%20and%20Evidence%20Pass.md) | Not Started | Tasks 0-7 | Not Run | Add evidence in Task 8. |

## Implementation Order

Recommended chronological order:

1. Task 0
2. Tasks 1 and 2
3. Tasks 3, 4, 5, and 6
4. Task 7
5. Task 8

Tasks 3-6 can be implemented in parallel after the shared structure and content map exist.

## Product Decisions To Confirm During Implementation

- Whether all mock shop/program/book buttons should remain visual-only or connect to a cart/checkout provider.
- Whether coaching and newsletter forms should submit to a real endpoint or stay local with `[PLACEHOLDER]` behavior.
- Whether the Google font choices from the mock should be implemented with `next/font/google` or approximated using currently imported fonts.
- Whether the additional images in `reference-html/uploads/` are needed or only the four files in `reference-html/assets/`.
