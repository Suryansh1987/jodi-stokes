# Programs and Products Refactor Tracker

## Overall Goal

Replace the mock Programs, Coaching, Book, and Shop storefront content with one approved coaching program, four approved products, a simple email-based registration flow, and external product purchase links while preserving the existing site design and avoiding ecommerce or scheduling architecture.

## Status Rules

Allowed task statuses: `Not Started`, `In Progress`, `Blocked`, `Complete`.

Allowed verification statuses: `Not Run`, `Passed`, `Failed`, `Blocked`, `N/A`.

## Task Table

| Task | Description | Depends On | Status | Verification | Completion Evidence |
|---:|---|---|---|---|---|
| 1 | [Centralize approved program and product data](./1.%20Centralized%20Programs%20and%20Products%20Data.md) | None | Complete | Passed | Added JSON content source and typed adapter; see Task 1 evidence. |
| 2 | [Replace Book and Shop with the real Products section](./2.%20Real%20Products%20Section.md) | Task 1 | Complete | Passed | Added one centralized Products section and removed mock product commerce; see Task 2 evidence. |
| 3 | [Refactor Programs and Coaching into registration](./3.%20Program%20and%20Registration%20Experience.md) | Task 1 | Not Started | Not Run | Add evidence in Task 3. |
| 4 | [Add server-side registration email delivery](./4.%20Registration%20Email%20Delivery.md) | Task 3 | Not Started | Not Run | Add evidence in Task 4. |
| 5 | [Remove stale storefront navigation and copy](./5.%20Navigation%20Content%20and%20SEO%20Cleanup.md) | Tasks 2-4 | Not Started | Not Run | Add evidence in Task 5. |
| 6 | [Run regression verification and evidence pass](./6.%20Regression%20Verification.md) | Tasks 1-5 | Not Started | Not Run | Add evidence in Task 6. |

## Confirmed Repository Findings

- The project uses Next.js `16.2.9`, React `19.2.4`, TypeScript strict mode, and the App Router.
- The only page route is `app/(public)/page.tsx`; Programs, Book, Shop, Coaching, and Journal are home-page hash sections.
- `lib/content/home.ts` is the established centralized static-content module, and `tsconfig.json` enables `resolveJsonModule`.
- `ProgramsSection`, `BookSection`, `ShopSection`, and `CoachingSection` are composed by the thin home page.
- Program, product, book, coaching, navigation, and footer data are static TypeScript exports. Several section headings and actions remain hardcoded in JSX.
- Program add buttons, shop filters, favorites, add-to-cart buttons, header search/cart, and book purchase links are placeholders. There is no cart, checkout, external purchase redirect, database, CMS, API route, server action, email dependency, authentication, analytics, or booking integration.
- The coaching and newsletter forms only set local React status text. Newsletter is out of scope.
- The project has no environment files or documented deployment target. `next.config.ts` is not configured for static export, and `package.json` has standard Node-compatible `build` and `start` scripts.
- Playwright owns a production-mode server and currently asserts the mock program/product names, prices, controls, and hash links on desktop and mobile.
- The public book cover exists at `public/images/jodi/book-water-exercise.png`; approved merchandise photos are not present.
- Local Next.js 16 documentation supports App Router Route Handlers under `app/**/route.ts`; non-public environment variables remain server-only.

## Confirmed Client Requirements

- Promote one primary program: `Unstoppable You`, type `1:1 Coaching`.
- Program facts: approximately `$2,400`, 8 sessions, approximately 55 minutes each, virtual, approximately twice weekly, and approximately 2-3 new clients per month.
- Supplied inclusions: members-only YouTube content, additional workout videos/homework, nutritional guidance/direction, and measurements or weigh-ins. Motivation, hormones, and metabolism were noted as involved areas but require careful approved wording.
- The coaching CTA is `Register`; there is no calendar booking or online coaching payment.
- Registration requires name, email, phone, selected program, and agreement acknowledgement; message/goals is optional.
- Initial registration emails `jodi@jodistokes.com`. Jodi manually handles contact, payment, scheduling, formal signed agreement/waiver, medical disclosure, and onboarding afterward.
- Do not collect medical history, medications, diagnoses, or orthopedic limitations on the public form.
- Display only four products: Water Exercise Book (featured), Lunch Bag, Water Bottle, and Small Towel.
- Products redirect to third-party purchase pages. Missing URLs must produce an honest non-link state, never `href="#"`.
- Remove the separate Shop section and its mock filters, variants, inventory/shipping claims, favorites, cart controls, and mock products.
- Preserve branding, responsive behavior, reusable components, accessibility, and the book's visual prominence.
- Leave Journal/Blog and Newsletter behavior alone.

## Missing Client Information

- Exact client-approved agreement and waiver text for the website acknowledgement step.
- Confirmation of how the approved agreement text should be presented: inline, disclosure panel, or separate public document/route.
- Final approved marketing description for `Unstoppable You`, including safe wording for motivation, hormones, metabolism, nutritional guidance, measurements, and YouTube access.
- Whether `approximately $2,400`, `approximately 55 minutes`, `approximately twice weekly`, and `2-3 new clients per month` should be displayed publicly and the exact approved phrasing.
- Whether any part of the older private-training pricing/agreement should be public. It must not become additional programs without approval.
- Final public price and purchase URL for the Water Exercise Book; confirm whether the current `$32/$42` signed-copy presentation is valid or mock.
- Confirmation that `$19.99` is the intended public Lunch Bag price and that `$5.95` is private supplier cost that must not be exposed.
- Public prices for Water Bottle and Small Towel.
- External purchase URLs for all four products, including the exact Amazon URL for the book.
- Approved photos, alt text, and final descriptions for Lunch Bag, Water Bottle, and Small Towel.
- Production hosting target and confirmation that it supports Next.js server execution.
- Resend account/provider approval, verified sending domain, approved `from` address, and production API key.
- Preferred reply/confirmation behavior for the registrant; the current requirement only confirms the email to Jodi.

## Implementation Notes

- Recommended content location: `lib/content/programs-products.json`, with a small TypeScript adapter/type module beside it. Do not fetch the JSON at runtime or place it under `public/`.
- Task 1 implemented that content location with stable IDs, structured numeric program facts and explicit approximation flags. It exports read-only program/product collections, `getProgramById`, and HTTP(S)-only external URL narrowing from `lib/content/programs-products.ts`.
- Task 1 retains `null` for every unconfirmed product price, description, merchandise image, and external URL. The Water Exercise Book is explicitly featured and is the only product with an existing local image reference.
- Task 2 replaced the rendered Book and Shop sections with one `#products` section. It preserves the book-cover presentation, renders the other three products as shadcn cards, omits missing fields, and uses a plain `Purchase link unavailable` state until a validated HTTP(S) URL exists.
- Task 2 removed the old Book/Shop components, mock product types/data, category/filter/favorite/cart UI, CSS merchandise art, inventory/shipping claims, and related tests. Site-wide Book/Shop navigation copy remains assigned to Task 5.
- Keep older private-training prices as non-public source material unless the client explicitly approves a public services/policies use.
- Recommended registration boundary: `app/api/program-registration/route.ts`. It fits the current client component, isolates the email secret, and lets Playwright mock the endpoint for loading/success/failure states.
- Recommended email provider: Resend's server-side Node SDK, conditional on account/domain setup. Use a verified sender, send to the configured Jodi address, and set the registrant as `replyTo` rather than `from`.
- Use server-side allowlisting against program IDs from centralized content; never trust a submitted display name.
- Use native HTML constraints plus explicit server validation. A small honeypot and input length limits are sufficient initial anti-abuse measures; do not add a database-backed rate limiter without evidence it is needed.
- Automated tests must not call Resend. Mock endpoint responses for form UI tests and test malformed requests against the Route Handler before email configuration is accessed.
- The current `.gitignore` ignores `.env*.local` but not every `.env` form. Before adding environment documentation, ignore `.env*` while explicitly allowing a secret-free `.env.example`.

## Blockers

- Tasks may be implemented with missing values represented as `null`/omitted and honest unavailable UI, but final launch is blocked by approved agreement copy, product URLs, product photos/descriptions, merchandise prices, and verified email sender configuration.
- Do not mark the overall refactor complete while any public page presents an invented URL, price, claim, date, seat count, inventory status, or legal statement.
