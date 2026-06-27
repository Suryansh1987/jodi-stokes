This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Notes

Project documentation, implementation plans, architecture notes, and other reference material live in the `<reference>/` directory.

Before making changes:

- Read [`AGENTS.md`](./AGENTS.md) for project-wide development guidelines.
- Review any relevant documentation or task specifications in the `<reference>/` folder.

### Search Markers

The following markers are used throughout the codebase:

- `[PLACEHOLDER]` marks temporary mock content, fake links, visual-only actions, or local-only form behavior.
- `[TODO]` marks deferred future work such as backend integrations, API connections, CMS implementation, analytics, authentication, search, admin functionality, or other planned enhancements.

## Project Structure

Public pages should live under `app/(public)/`.

- Route files (`page.tsx`) should compose sections only.
- Route-specific sections belong in `components/sections/<route-name>/`.
- Shared sections belong in `components/sections/shared/`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
````

Open http://localhost:3000 with your browser to see the result.

You can start editing the application by modifying the appropriate files under the `app/` directory. Changes are reflected automatically during development.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to optimize and load fonts.

## Learn More

To learn more about Next.js, take a look at the following resources:

* [Next.js Documentation](https://nextjs.org/docs) – Learn about Next.js features and APIs.
* [Learn Next.js](https://nextjs.org/learn) – An interactive Next.js tutorial.

You can also explore the [Next.js GitHub repository](https://github.com/vercel/next.js).

## Deployment

The recommended deployment platform for Next.js applications is [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for additional deployment options and guidance.

```
