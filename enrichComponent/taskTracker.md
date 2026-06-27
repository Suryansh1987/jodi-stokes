# Enrich Component Task Tracker

This tracker documents future UI enrichment work discovered through Magic UI and 21st.dev Magic MCP exploration. No code has been implemented from this folder yet.

## MCP Search Evidence

| MCP Server | Tool | Query | Result |
|---|---|---|---|
| `magicui` | `searchRegistryItems` | `navigation header menu mobile nav` | No direct component results. |
| `magicui` | `searchRegistryItems` | `hero section` | Found `hero-video-dialog` and demos. |
| `magicui` | `searchRegistryItems` | `marquee testimonials logos cards` | Found `marquee`, `client-tweet-card`, `neon-gradient-card`, `tweet-card`, and examples. |
| `magicui` | `searchRegistryItems` | `card hover border beam bento` | Found `bento-grid`, `border-beam`, `animated-beam`, and examples. |
| `magicui` | `searchRegistryItems` | `form newsletter signup contact` | Found `noise-texture-demo-2` and `globe`. |
| `magicui` | `searchRegistryItems` | `animated text number typing blur fade` | Found `animated-gradient-text`, `animated-circular-progress-bar`, and examples. |
| `magicui` | `searchRegistryItems` | `particles grid pattern background sparkle` | Found `animated-grid-pattern`, `dot-pattern`, `flickering-grid`, `grid-pattern`, `hexagon-pattern`. |
| `magicui` | `searchRegistryItems` | `dock navigation menu` | Found `dock`, but it does not fit the current editorial nav. |
| `magicui` | `searchRegistryItems` | `scroll reveal animation fade in view` | Found `blur-fade`, `dia-text-reveal`, `scroll-based-velocity`, and examples. |
| `magicui` | `searchRegistryItems` | `magic card` | Found `magic-card`, `neon-gradient-card`, `tweet-card`, and examples. |
| `magic` | `21st_magic_component_inspiration` | `responsive navbar` | Found `Resizable Navbar` and `Navbar`. |
| `magic` | `21st_magic_component_inspiration` | `hero section` | Found `PulseFit hero`, `Hero with group of images, text and two buttons`, and `Hero with bg video`. |
| `magic` | `21st_magic_component_inspiration` | `feature cards` | Found `Features 10` and `Features`. |
| `magic` | `21st_magic_component_inspiration` | `pricing cards` | Found `Pricing Card`, `Pricing Base`, and `Pricing Cards`. |
| `magic` | `21st_magic_component_inspiration` | `product cards` | Found `Product Card`, `Amazing Card`, and `Card`. |
| `magic` | `21st_magic_component_inspiration` | `testimonials` | Found `Testimonials`, `Testimonials 1`, and `Testimonial Card`. |
| `magic` | `21st_magic_component_inspiration` | `contact form` | Found `Contact Form`, `Contact 2`, and `Form`. |
| `magic` | `21st_magic_component_inspiration` | `blog cards` | Found `Blog 7`, `Blog 8`, and `Cards`. |
| `magic` | `21st_magic_component_inspiration` | `newsletter signup` | Found `Newsletter Signup`, `Newsletter Card`, and `News letter`. |
| `magic` | `21st_magic_component_inspiration` | `about section` | Found `About 3` and `About`. |
| `magic` | `21st_magic_component_inspiration` | `footer` | Found `Large Name Footer`, `Footer`, and `footer`. |
| `magic` | `21st_magic_component_inspiration` | `product feature` | Found `Feature Showcase`, `Feature 72`, and `Features`. |

## Task Status Rules

- `Not Started`: documented only, no implementation.
- `In Progress`: implementation has started.
- `Blocked`: cannot proceed without a dependency, design decision, or MCP access.
- `Completed`: implemented and verified.

## Tasks

| # | Todo | Section | Selected MCP Component | MCP Server | Status | Complexity |
|---:|---|---|---|---|---|---|
| 0 | [Shared Header Topbar Navigation](./0.%20Shared%20Header%20Topbar%20Navigation.md) | Header / topbar / mobile nav | `Resizable Navbar` | `magic` | Not Started | High |
| 1 | [Hero Section](./1.%20Hero%20Section.md) | Hero | `PulseFit hero` | `magic` | Not Started | High |
| 2 | [Pillars Section](./2.%20Pillars%20Section.md) | Pillars | `Features 10` | `magic` | Not Started | Medium |
| 3 | [About Section](./3.%20About%20Section.md) | About | `About 3` | `magic` | Not Started | Medium |
| 4 | [Programs Section](./4.%20Programs%20Section.md) | Programs | `Pricing Card` | `magic` | Not Started | Medium |
| 5 | [Book Section](./5.%20Book%20Section.md) | Book | `Feature Showcase` | `magic` | Not Started | High |
| 6 | [Shop Section Product Cards](./6.%20Shop%20Section%20Product%20Cards.md) | Shop | `Product Card` | `magic` | Not Started | High |
| 7 | [Testimonials Section](./7.%20Testimonials%20Section.md) | Testimonials | `Testimonials` | `magic` | Not Started | Medium |
| 8 | [Coaching Section](./8.%20Coaching%20Section.md) | Coaching | `Contact Form` | `magic` | Not Started | Medium |
| 9 | [Journal Section](./9.%20Journal%20Section.md) | Journal | `Blog 8` | `magic` | Not Started | Medium |
| 10 | [Newsletter Section](./10.%20Newsletter%20Section.md) | Newsletter | `Newsletter Card` | `magic` | Not Started | Medium |
| 11 | [Footer Section](./11.%20Footer%20Section.md) | Footer | `Large Name Footer` | `magic` | Not Started | Medium |

## Global Dependency Notes

- 21st.dev candidates often include shadcn primitives such as `button`, `card`, `badge`, `input`, `label`, `textarea`, `select`, `avatar`, `tabs`, `accordion`, `popover`, and `navigation-menu`.
- 21st.dev candidates may depend on `motion/react`, `framer-motion`, `next-themes`, `@tabler/icons-react`, `canvas-confetti`, or Radix primitives depending on the selected component.
- `hero-video-dialog`, `border-beam`, `blur-fade`, `animated-grid-pattern`, and `scroll-based-velocity` depend on `motion`.
- `magic-card` depends on `motion` and `next-themes`.
- `bento-grid` depends on `@radix-ui/react-icons` and registry dependency `button`.
- `marquee`, `animated-gradient-text`, and `dot-pattern` have no package dependencies in the Magic UI registry details.
- `noise-texture-demo-2` was returned as an example, not a component; implementation should inspect registry details before coding.
