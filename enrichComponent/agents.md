# Enrich Component Agent Notes

## Scope

- This folder documents future component-enrichment tasks only.
- Do not implement code from these todos until a separate implementation request is given.
- Keep existing Next.js App Router structure from the root `AGENTS.md`.
- Keep route pages thin and continue placing home sections in `components/sections/home/`.
- Do not edit generated shadcn UI files in `components/ui/` unless the implementation task explicitly requires it.

## MCP Search Rules

- Search existing component registries before proposing new UI.
- Use `magicui` for registry component searches and dependency details.
- Use `magic` / 21st.dev inspiration for rich component candidates before choosing Magic UI by default.
- Current session evidence: `mcp__magic.21st_magic_component_inspiration` is working after API key configuration and returned real 21st.dev candidates including `Resizable Navbar`, `PulseFit hero`, `Pricing Card`, `Product Card`, `Testimonials`, `Contact Form`, `Blog 8`, `Newsletter Card`, `About 3`, `Feature Showcase`, and `Large Name Footer`.
- Do not invent exact component names. Every exact component name in these todos must come from an MCP search result.
- Use `context7` only when implementation documentation is needed. It was not needed for this documentation pass.

## Selection Rules

- Prefer small registry primitives that enrich the existing reference-matched sections.
- Prefer 21st.dev components over Magic UI when the 21st.dev result is a closer semantic fit for the section and does not force an inappropriate full-page rewrite.
- Avoid replacing the whole landing page with generic templates.
- Preserve the dark fitness/lifestyle storefront direction, mint primary accent, coral/gold secondary accents, editorial typography, and current content map.
- Keep component additions deterministic and accessible.
- Do not use decorative effects that fight the existing product, coaching, and storefront content.

## Implementation Boundaries For Future Tasks

- If a registry install creates files under `components/ui/`, treat those files as generated.
- Route sections remain in `components/sections/home/<section-name>.tsx`.
- Shared public components remain in `components/section/shared/<component-name>.tsx`.
- Use `[PLACEHOLDER]` comments for visual-only behavior.
- Use `[TODO]` comments for deferred integrations.
- After implementation, update the matching todo and `./taskTracker.md` with exact evidence.

## Testing Expectations For Future Implementation

- Run `npm run lint` and `npm run build` when feasible.
- Playwright must manage its own production server lifecycle.
- Do not rely on a manually running dev server.
- Do not kill processes by PID.
- Add or update Playwright coverage only where visual or interaction behavior changes.
