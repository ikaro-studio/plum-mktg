# Plum Marketing Site — Rebuild Plan

> **Status:** Plan v1, ready for execution
> **Owner (PM):** [you]
> **Executor:** Claude Code
> **Stack:** Next.js (App Router) on Vercel, Tailwind CSS, TypeScript
> **Design system:** `plum-design` skill — already in this repo. The CSS file `colors_and_type.css` + `README.md` from that skill are the **source of truth**. Do not invent new colors, type ramps, radii, or shadows.
> **Reference quality bar:** [descript.com](https://www.descript.com/), [linear.app](https://linear.app). See §3 for what we are and aren't copying from them.

---

## Table of contents

1. [Goal & scope](#1-goal--scope)
2. [What "good" looks like (success criteria)](#2-what-good-looks-like-success-criteria)
3. [Reference handling — Descript & Linear](#3-reference-handling--descript--linear)
4. [Tech decisions, explained plainly](#4-tech-decisions-explained-plainly)
5. [Repo / file structure](#5-repo--file-structure)
6. [Phase 1 — Foundation (Tailwind + tokens + type)](#6-phase-1--foundation-tailwind--tokens--type)
7. [Phase 2 — Global components (THE FOCUS)](#7-phase-2--global-components-the-focus)
   - 7.1 Navbar
   - 7.2 Footer
   - 7.3 Button
   - 7.4 Link
   - 7.5 Typography primitives (Eyebrow, Heading, Body, Phrase, Caption)
   - 7.6 Pill, Chip, Tag
   - 7.7 Card
   - 7.8 Form primitives (Input, Textarea, Checkbox, Select)
   - 7.9 Icon wrapper (Lucide)
   - 7.10 Layout primitives (Container, Section, Grid)
8. [Phase 3 — Page-level patterns](#8-phase-3--page-level-patterns)
9. [Phase 4 — Pages](#9-phase-4--pages)
10. [Phase 5 — Motion, a11y, performance, SEO](#10-phase-5--motion-a11y-performance-seo)
11. [Acceptance checklist (per phase)](#11-acceptance-checklist-per-phase)
12. [Out of scope (explicit)](#12-out-of-scope-explicit)

---

## 1. Goal & scope

Rebuild the Plum marketing website from scratch on Next.js + Vercel. The current site is being thrown away, not migrated — there's nothing to preserve except the brand and any existing copy/imagery (which we'll port manually).

This plan covers the **public marketing site** only:
- The site visitors see before signing in.
- Pages: Home, Product, Customers, Blog, About, Legal.
- The signed-in app (the DAM itself) is a separate codebase and is **not in scope**.

**Launch posture: closed beta.** Plum launches as a closed beta — there is **no public pricing page at v1**. Every "buy" or "subscribe" CTA on the old site is replaced by an **early-access email capture**. The Supabase backend stays in place to receive captures (and to support sign-in once invites go out), but Stripe-driven pricing UI is mothballed until we open up to general availability.

**Theming.** The site ships with both a light (warm cream) and dark (deep plum) theme, with a sun/moon toggle in the navbar. The dark palette stays plum-warm — never neutral gray — and the focus ring stays peach in both modes. Theme is persisted in `localStorage` via `next-themes` (`storageKey="plum-theme"`). The previous "one cream-bias palette" stance was scoped out post-design-review; both themes use the same token system, only the semantic CSS vars flip.

**Why we're rebuilding rather than fixing.** A marketing site is small enough (~6–8 routes, mostly content) that a clean rebuild on a modern stack ships faster than untangling a broken one — and we get a proper design-system-driven foundation that the next two years of marketing work will sit on.

**Build strategy.** The rebuild lives on a feature branch (`rebuild`) alongside `main`. We do not touch the deployed subscription starter; we cut over with a single PR once Phase 4 is complete and Vercel preview is reviewed.

---

## 2. What "good" looks like (success criteria)

A reviewer should be able to load the site and feel three things within five seconds:

1. **"This is mature, not a tech startup."** No electric blues, no springy bounce, no purple-on-white gradient cliché. Warm, opinionated, deliberately un-tech-flavored — matching the Plum brand brief.
2. **"This is precise."** Type hierarchy is unmistakable. Spacing is rhythmic. Hover states feel intentional. This is the Linear/Descript quality bar.
3. **"Plum has a point of view."** Voice is calm and confident, not breathless. Copy uses the brief's actual vocabulary (`library`, `workspace`, `consolidate`, `intact`, `bloom`).
4. **"This is invite-only."** The CTA every section ladders toward is *Request access*, not *Sign up free*. The scarcity is real (closed beta), not a marketing affectation — let it feel that way.

Concrete pass/fail gates:

- All colors, type, radii, and shadows trace back to tokens in `colors_and_type.css`. If a value isn't in there, it doesn't exist on the site.
- Lighthouse: ≥95 Performance, 100 Accessibility, ≥95 Best Practices, 100 SEO on the home page (desktop & mobile).
- All interactive elements keyboard-navigable. Focus ring uses `--shadow-focus` (the 4px peach glow) — nothing else.
- Zero emoji in the product UI (kanji on the feng-shui marketing slide is the only exception — see brand brief).
- All text passes WCAG AA contrast against its background.
- Site builds cleanly on Vercel, deploys on push to `main`, opens preview deploys per PR.

---

## 3. Reference handling — Descript & Linear

These are the quality bar, **not** the aesthetic target. Plum is warm; Linear and Descript are not. Take from them what's transferable; reject what isn't.

| What to borrow from Linear | What to reject from Linear |
| --- | --- |
| Precision of type hierarchy (eyebrow → headline → body) | Dark, cool, slate-heavy color palette |
| Confident, opinionated copy in short declaratives | Inter typeface (we use Sora as Avio Sans stand-in) |
| Footer information density — multi-column, rich, deliberate | Saturated blue/violet gradient accents |
| Hover micro-interactions that feel instant (≤200ms) | Spring/bounce easings |
| Sharp section transitions — no needless decoration between blocks | Glassmorphic "tech app" hero treatments |

| What to borrow from Descript | What to reject from Descript |
| --- | --- |
| Generous whitespace around hero copy | Playful illustration / character work |
| Large product imagery / video as the visual anchor of each section | Bright primary colors used as headline backgrounds |
| Soft drop shadows on product mockups (we use plum-tinted shadows, not gray) | Stock-y warm photography that competes with brand |
| Eyebrow → headline → subhead → visual section rhythm | Casual exclamatory voice |

**The Plum heuristic** (from the brand README): *when choosing between two options, pick the warmer, softer, less tech-flavored one.* This overrides any reference instinct.

---

## 4. Tech decisions, explained plainly

For the PM reading this — short notes on what each technical choice means and why it's the right one.

| Decision | What it is | Why |
| --- | --- | --- |
| **Next.js 14, App Router** | The framework. "App Router" is the modern way Next.js organizes pages — each folder under `/app` becomes a URL. | Server-rendered pages = fast first paint + good SEO. Vercel made Next.js, so hosting is one-click. The App Router gives us shared layouts (one place to define Navbar + Footer for every page). |
| **TypeScript** | JavaScript with type-checking. Catches typos and wrong data shapes before they ship. | The marketing site will have multiple contributors. Types make sure adding a new blog post or testimonial doesn't break the build. |
| **Tailwind CSS** | A styling system where you write style names like `bg-cream-100 text-plum-800` directly on elements. | We can plug Plum's design tokens (colors, type, radii) straight into Tailwind. Every developer / Claude Code gets the same vocabulary. No CSS files to maintain per component. |
| **Vercel hosting** | The hosting platform built for Next.js. Deploys automatically when we push to GitHub. | Zero ops. Preview URLs per pull request. Free for our traffic level. |
| **Lucide icons** | The icon set chosen by the Plum brand system. Loaded as React components. | Already specified in the brand README — don't re-evaluate. |
| **MDX for blog** | Markdown with the ability to embed React components inline. | Lets us write blog posts in plain text but drop in a custom callout or pricing-card component when needed. |
| **No CMS yet** | Content lives in the repo as MDX / TypeScript files. | We can add a headless CMS (Sanity, Contentful) in a later phase once we know editorial volume. Premature for v1. |

---

## 5. Repo / file structure

This is what Claude Code should scaffold. Folder = purpose.

```
/
├── app/                          ← every folder here is a URL route
│   ├── layout.tsx                ← root layout: wraps every page with <Navbar/>, <Footer/>
│   ├── page.tsx                  ← the home page (/)
│   ├── globals.css               ← Tailwind directives + base styles
│   ├── product/page.tsx          ← /product
│   ├── customers/page.tsx        ← /customers
│   ├── about/page.tsx            ← /about
│   ├── legal/
│   │   ├── terms/page.tsx
│   │   └── privacy/page.tsx
│   └── blog/
│       ├── page.tsx              ← blog index
│       └── [slug]/page.tsx       ← individual post route
│
├── components/
│   ├── global/                   ← used on every page
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── SkipToContent.tsx     ← a11y helper
│   ├── ui/                       ← reusable design-system primitives
│   │   ├── Button.tsx
│   │   ├── Link.tsx
│   │   ├── Eyebrow.tsx
│   │   ├── Heading.tsx
│   │   ├── Body.tsx
│   │   ├── Phrase.tsx
│   │   ├── Caption.tsx
│   │   ├── Pill.tsx
│   │   ├── Chip.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Select.tsx
│   │   └── Icon.tsx
│   ├── layout/                   ← compositional helpers
│   │   ├── Container.tsx
│   │   ├── Section.tsx
│   │   └── Grid.tsx
│   └── patterns/                 ← page-level building blocks
│       ├── Hero.tsx
│       ├── FeatureRow.tsx
│       ├── LogoWall.tsx
│       ├── Testimonial.tsx
│       ├── PricingCard.tsx
│       ├── FAQ.tsx
│       └── CTA.tsx
│
├── content/                      ← editable content, not code
│   ├── nav.ts                    ← navbar items live here
│   ├── footer.ts                 ← footer columns live here
│   ├── home.ts                   ← home page copy
│   ├── early-access.ts           ← beta cohort copy + form messaging
│   └── posts/                    ← MDX blog posts
│
├── lib/
│   ├── cn.ts                     ← className helper (clsx + tailwind-merge)
│   └── seo.ts                    ← metadata helpers
│
├── public/                       ← static assets
│   ├── plum-logo-full.png        ← copied from plum-design/assets
│   ├── plum-mark.png
│   ├── plum-wordmark.svg
│   ├── plum-petal.svg
│   ├── og/                       ← Open Graph share images
│   └── customers/                ← customer logos
│
├── styles/
│   └── tokens.css                ← exact copy of colors_and_type.css from plum-design
│
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
├── tsconfig.json
└── package.json
```

**Plain-language note for the PM:** `content/` is the folder where copywriting lives. Editing a navbar label, footer column, or homepage headline = editing a `.ts` file there. No code knowledge required to swap copy.

---

## 6. Phase 1 — Foundation (Tailwind + tokens + type)

**Goal of this phase:** before a single visual component is built, the design tokens from `plum-design` are loaded into Tailwind so that writing `bg-cream-100` and `text-plum-800` Just Works.

**Why it matters:** if the foundation is wrong, every component built on top inherits the rot. This phase is short but blocking. Don't start Phase 2 until this is reviewed and merged.

### 6.1 Steps

1. **Copy `colors_and_type.css` from the plum-design skill into `styles/tokens.css`.**
   This file holds the raw CSS custom properties (the variables like `--plum-800`, `--peach-400`, etc.). Importing it into `app/globals.css` makes those variables available everywhere.

2. **Import tokens + Tailwind directives in `app/globals.css`:**
   ```css
   @import "../styles/tokens.css";
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   /* Base body styling */
   html { scroll-behavior: smooth; }
   body {
     background: var(--cream-100);
     color: var(--plum-800);
     font-family: var(--font-sans);
     -webkit-font-smoothing: antialiased;
     text-rendering: optimizeLegibility;
   }

   ::selection {
     background: var(--peach-400);
     color: var(--plum-900);
   }
   ```

3. **Configure `tailwind.config.ts` to mirror the Plum token names.**
   This makes Tailwind class names match the brand vocabulary one-to-one. Below is the *shape* — Claude Code should derive exact hex values from `colors_and_type.css` to keep one source of truth.

   ```ts
   import type { Config } from "tailwindcss";

   const config: Config = {
     content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}"],
     theme: {
       extend: {
         colors: {
           plum:  { 900: "#351B30", 800: "#4A1B3B", 700: "#5D2A4C" /* etc — read from tokens */ },
           rose:  { 500: "#AA5476", 400: "#C8A9AF" },
           peach: { 400: "#F8BC9F" },
           sage:  { 500: "#C7D4BB" },
           cream: { 100: "#F1EDEE" },
           line:  { DEFAULT: "#E5DBDD", strong: "#D2C2C5" },
           fg:    { 1: "#351B30", 2: "#6B4A5C" },
         },
         fontFamily: {
           sans: ["var(--font-sora)", "system-ui", "sans-serif"],
           soft: ["var(--font-quicksand)", "sans-serif"],
         },
         fontSize: {
           eyebrow: ["13px", { letterSpacing: "0.12em", lineHeight: "1.2" }],
           body:    ["16px", { lineHeight: "1.6" }],
           sub:     ["24px", { lineHeight: "1.35" }],
           h3:      ["32px", { letterSpacing: "-0.02em", lineHeight: "1.2" }],
           h2:      ["56px", { letterSpacing: "-0.03em", lineHeight: "1.05" }],
           display: ["clamp(72px, 10vw, 128px)", { letterSpacing: "-0.04em", lineHeight: "0.95" }],
         },
         borderRadius: {
           chip: "8px", button: "12px", card: "18px", modal: "24px", hero: "32px",
         },
         boxShadow: {
           xs: "0 1px 2px rgba(74, 27, 59, 0.04)",
           sm: "0 4px 12px rgba(74, 27, 59, 0.06)",
           md: "0 12px 28px rgba(74, 27, 59, 0.10)",
           lg: "0 24px 56px rgba(74, 27, 59, 0.16)",
           focus: "0 0 0 4px rgba(248, 188, 159, 0.55)",
         },
         transitionTimingFunction: { soft: "cubic-bezier(0.32, 0.72, 0.24, 1.0)" },
         transitionDuration: { 2: "200ms", 3: "320ms", 4: "560ms" },
         backgroundImage: {
           "gradient-feng":        "linear-gradient(135deg, #C7D4BB 0%, #F8BC9F 100%)",
           "gradient-bloom":       "linear-gradient(180deg, #F1EDEE 0%, #F8BC9F 35%, #AA5476 75%, #4A1B3B 100%)",
           "gradient-peach-veil":  "linear-gradient(180deg, rgba(248,188,159,0.35), rgba(248,188,159,0))",
         },
       },
     },
   };
   export default config;
   ```

4. **Load fonts via `next/font/google`** (Sora as Avio Sans stand-in, Quicksand as Isidora stand-in — per `fonts/README.md` in the plum-design skill).

   ```tsx
   // app/layout.tsx (excerpt)
   import { Sora, Quicksand } from "next/font/google";
   const sora = Sora({ subsets: ["latin"], variable: "--font-sora", weight: ["400","500","700","800"] });
   const quicksand = Quicksand({ subsets: ["latin"], variable: "--font-quicksand", weight: ["300","400"] });
   ```

   Attach both `variable` class names to `<html>` so the Tailwind `font-sans` / `font-soft` utilities resolve.

5. **Set up `lib/cn.ts`** — a one-line helper that merges Tailwind class names without duplication:
   ```ts
   import { clsx, type ClassValue } from "clsx";
   import { twMerge } from "tailwind-merge";
   export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
   ```
   Every component uses this for combining className props. Standard pattern.

### 6.2 Acceptance for Phase 1

- [ ] `npm run dev` starts cleanly. Visiting `/` shows a cream page with plum-colored body text.
- [ ] In dev tools, `:root` shows all Plum CSS custom properties.
- [ ] A test page using `bg-peach-400`, `text-plum-900`, `rounded-card`, `shadow-md` renders correctly.
- [ ] Sora loads as the body font, Quicksand loads when `font-soft` is applied.
- [ ] No Tailwind warnings about missing values.

---

## 7. Phase 2 — Global components (THE FOCUS)

This is the bulk of the work and the highest-leverage phase. Every page is built from these. Do not start Phase 3 until every component below has been built, reviewed for brand fit, and screenshot-tested against the brand brief.

For every component below: respect the **voice and casing rules** from the plum-design `README.md` → CONTENT FUNDAMENTALS. No headline title case. Eyebrows are uppercase + 0.12em tracking. Soft phrases are lowercase. Body is sentence case.

---

### 7.1 Navbar

**Anatomy (left → right):**
- Lockup (links to `/`). Two SVG variants: `public/brand/plum-lockup.svg` (color gradient on cream) and `public/brand/plum-lockup-white.svg` (cream/transparent on dark). Both are rendered, and `dark:hidden` / `hidden dark:block` flip them with the theme so the right one always shows without a JS-driven flicker. Height ≈ 28px desktop, 24px mobile.
- Primary nav items, centered: `Product`, `Customers`, `Resources`. Sentence case. *(Pricing is intentionally absent during closed beta.)*
- Right cluster: `Sign in` text link + a sun/moon **theme toggle** + primary `Request access` button (opens the early-access modal). The toggle is an icon button (Lucide `<Sun />` / `<Moon />`, 18px stroke 1.75) that cross-fades on click — `next-themes` writes to `localStorage` under `plum-theme`.

**Dimensions:**
- Height: 72px desktop (≥1024px), 64px tablet/mobile.
- Horizontal padding: matches `<Container>` (see §7.10).
- Z-index: 50.

**Surface behavior:**
- Initial state: fully transparent over the page (the home hero peeks through).
- Once user scrolls > 16px: animate-in a backdrop. Background becomes `rgba(241, 237, 238, 0.7)` with `backdrop-filter: blur(18px) saturate(120%)`. A 1px `border-b border-line` appears.
- Transition: `transition-all duration-3 ease-soft`.
- **Important:** never use `bg-white` here. The transparent-then-blurred-cream pattern is the Plum signature.

**Nav link states:**
- Default: `text-fg-2` (the warm plum-gray), 15px, weight 500.
- Hover: `text-fg-1`, transition `duration-2 ease-soft`.
- Active route: `text-plum-900`, plus a 1px `bg-rose-500` underline 6px below baseline, animated in via opacity (no slide).
- Focus visible: `shadow-focus` ring, no outline.

**Spacing between nav links:** 32px desktop, collapses into the mobile drawer below 1024px.

**Sign-in link:** 15px, `text-fg-2`, hover → `text-fg-1`. Right-side. No underline by default.

**Primary CTA button** — uses `<Button variant="primary" size="md">Request access</Button>` (see §7.3). Click opens the early-access modal (the `<EarlyAccessForm>` pattern rendered inside a Headless UI `<Dialog>`).

**Mobile behavior (<1024px):**
- Center nav items collapse. `Sign in` collapses. Only wordmark + hamburger icon + (optional) primary CTA at smaller sizes.
- Hamburger uses Lucide `<Menu />`. Tap opens a full-width drawer that **fades** in (`opacity` + 4px `translateY`, `duration-3 ease-soft`). No slide-in from the right. No spring.
- Drawer background: solid `cream-100` (not blurred — at this scale, blur is overkill).
- Drawer contents: nav items stacked, 24px gap, 24px page padding. Sign in + CTA pinned to the bottom of the drawer with a hairline `border-t border-line` above them.

**Implementation notes for Claude Code:**
- Use a `useEffect` + `window.scrollY` to toggle the scrolled state. Throttle to `requestAnimationFrame`.
- Use Next's `usePathname()` to detect the active route.
- Use Headless UI's `<Dialog>` for the mobile drawer (handles focus trap + escape key + scroll lock for free).
- Nav structure lives in `content/nav.ts` as a typed array — don't hard-code it in the component.
  ```ts
  // content/nav.ts
  export const navItems = [
    { label: "Product", href: "/product" },
    { label: "Customers", href: "/customers" },
    { label: "Resources", href: "/blog" },
  ] as const;
  ```

**Anti-patterns — do not ship:**
- ❌ Solid white nav bar.
- ❌ Drop shadow under the nav at rest.
- ❌ Sticky nav that pushes content down on scroll (overlay only).
- ❌ Hamburger-only on desktop.
- ❌ "Get started for free 🎉" or any emoji.

---

### 7.2 Footer

The footer is dense and considered — Linear-grade information architecture, executed in Plum's warm palette.

**Anatomy (top → bottom):**

A) **Peach veil divider** — a thin 76px-tall fade from cream into a slightly warmer cream-peach at the top edge of the footer. Use `bg-gradient-peach-veil`. This is the only "decoration" in the footer; per brand brief, it's how Plum signals a soft page-heading zone.

B) **Main grid** — 5 columns on desktop, collapsing to 2 columns on tablet and 1 column on mobile.

| Column 1 (2× width) | Column 2 — Product | Column 3 — Use cases | Column 4 — Company | Column 5 — Resources |
| --- | --- | --- | --- | --- |
| Wordmark<br>Soft phrase: `a place a brand lives, intact`<br>Early-access capture | Overview<br>Changelog<br>Roadmap | Brand teams<br>Agencies<br>Freelancers<br>Enterprise | About<br>Careers<br>Press<br>Contact | Blog<br>Help center<br>Status<br>Brand kit |

- Column headings are **eyebrow** style (uppercase, 0.12em tracking, 13px, `text-fg-2`).
- Links: 15px, `text-fg-2`, hover → `text-plum-900` over 200ms.
- Vertical gap inside a column: 12px.
- Horizontal gap between columns: 32px desktop, 24px tablet.
- Column 1 is wider — uses `col-span-2` on desktop.

C) **Early-access capture** (inside Column 1, beneath the soft phrase):
- Eyebrow: `CLOSED BETA`
- Renders the `<EarlyAccessForm tone="inline">` pattern (see §8). Same form as the rest of the site — one source of truth for the capture UI and validation.
- Helper line below at 12px, `text-fg-2`: `We invite in waves of 30 brands.`
- Intentionally restrained — no counts, no urgency, no checkbox bundles.

D) **Bottom bar** — a single row, separated from the main grid by `border-t border-line` + 32px padding.
- Left: `© 2026 Plum, Inc.`, 13px, `text-fg-2`.
- Center: social icon row — Lucide `<Twitter />`, `<Linkedin />`, `<Github />` at 18px stroke 1.75, color `text-fg-2`, hover `text-plum-900`. 16px gap between.
- Right: a locale switcher placeholder (`English` for now, dropdown affordance with `<ChevronDown />`). Wireframe-grade is fine; full i18n out of scope for v1.

**Surface:**
- Background: `bg-cream-100` (same as page). The footer reads as a quiet continuation of the page, not a slab.
- Top padding: 96px desktop, 64px mobile (after the peach veil).
- Bottom padding: 48px desktop, 32px mobile.

**Anti-patterns — do not ship:**
- ❌ Dark plum slab footer with light text (the "obvious" choice — explicitly rejected per the warm-bias heuristic).
- ❌ Background image, illustration, or wave SVG.
- ❌ "Made with ❤️ in [city]" — emoji forbidden, "made with love" is anti-Plum-voice.
- ❌ Early-access copy promising "exclusive content," "VIP access," or counting subscribers.
- ❌ Logos of certifications/integrations crammed into the bottom bar.

**Content lives in `content/footer.ts`** — typed array of `{ heading, links: [{ label, href }] }`. Engineers don't edit the footer JSX to change a link.

---

### 7.3 Button

**Variants:**

| Variant | Bg | Text | Border | Hover bg | Press bg | Use for |
| --- | --- | --- | --- | --- | --- | --- |
| `primary` | `plum-800` | `cream-100` | none | `plum-700` | `plum-900` | the one main CTA per page section |
| `secondary` | transparent | `plum-800` | `1px line-strong` | `bg-plum-800/5` | `bg-plum-800/10` | secondary actions, footer subscribe |
| `ghost` | transparent | `fg-2` | none | `bg-plum-800/5`, text→`fg-1` | `bg-plum-800/10` | tertiary, inline |
| `accent` | `peach-400` | `plum-900` | none | `peach-400/90` | `peach-400/80` | one special moment per page max — reserve it |

**Sizes:**

| Size | Height | Padding x | Font | Radius |
| --- | --- | --- | --- | --- |
| `sm` | 36px | 14px | 14px / 500 | `rounded-button` (12px) |
| `md` | 44px | 20px | 15px / 500 | `rounded-button` |
| `lg` | 56px | 28px | 17px / 500 | `rounded-button` |

**States:**
- Default shadow: `shadow-xs`.
- Hover: shadow lifts to `shadow-sm`, no `translateY` (subtle — buttons don't float on hover, cards do).
- Press: `scale-[0.98]`, shadow drops to none.
- Focus visible: `shadow-focus` (the 4px peach glow). This replaces all other focus styles.
- Disabled: 50% opacity, `cursor-not-allowed`, no hover.
- Loading: button text fades to 40% opacity, a Lucide `<Loader2 />` spins inline-left at the text's color. Width must not jump — reserve space with `min-width`.

**Transitions:** `transition-all duration-2 ease-soft` on every state change. Never use Tailwind's default `transition` (Plum's easing is non-default).

**Icon support:** props `leftIcon`, `rightIcon` accept Lucide components. Icon size matches button size (`sm: 16`, `md: 18`, `lg: 20`). Gap between icon and text: 8px.

**API sketch:**
```tsx
<Button variant="primary" size="md" leftIcon={ArrowRight}>Drop your brand</Button>
```

---

### 7.4 Link

A semantic `<Link>` wrapper that handles internal (Next.js routes) vs external automatically.

- Internal links (start with `/`): render `next/link`.
- External links: render `<a target="_blank" rel="noopener noreferrer">`, append a tiny Lucide `<ArrowUpRight />` 14px to the right.
- Default style (inline in body copy): `text-accent` (rose-500 light / peach-400 dark), no underline at rest. On hover, a 1px underline wipes in from the left over `duration-300 ease-soft` via an absolutely-positioned `::after` pseudo-element animating from `width: 0` to `width: 100%`; text color shifts to `text-accent-hover` at the same time. The underline lives only when you're touching it.
- "Quiet link" variant (used in nav/footer): no underline at all, color shift only (`text-fg-muted` → `text-fg-strong`).
- The old always-on `underline underline-offset-4` treatment is retired everywhere.

---

### 7.5 Typography primitives

Why we wrap text in components rather than using raw `<h1>`: it guarantees the right size/weight/tracking/color combo and prevents drift. Once a designer says "use Heading level 2", we can't get it wrong.

| Component | Element | Style |
| --- | --- | --- |
| `<Eyebrow>` | `<p>` | `text-eyebrow font-medium uppercase text-fg-2` — used above section headings |
| `<Heading level={1}>` | `<h1>` | `text-display font-extrabold text-plum-900` — the display-scale headline, used once per page max |
| `<Heading level={2}>` | `<h2>` | `text-h2 font-bold text-plum-900` — section headings |
| `<Heading level={3}>` | `<h3>` | `text-h3 font-bold text-plum-900` — sub-section headings |
| `<Heading level={4}>` | `<h4>` | `text-sub font-semibold text-plum-900` — card titles |
| `<Body size="lg">` | `<p>` | `text-[18px] leading-relaxed text-fg-1` — lead paragraphs |
| `<Body>` | `<p>` | `text-body text-fg-1` — default body |
| `<Body size="sm">` | `<p>` | `text-[14px] leading-relaxed text-fg-2` — captions, supporting |
| `<Phrase>` | `<span>` | `font-soft font-light text-[32px] text-plum-800 lowercase` — the soft accent phrase ("helpful", "balance", "intact") |
| `<Caption>` | `<span>` | `text-[12px] tracking-wide text-fg-2` — image captions, fine print |

**Rules baked into the components:**
- `<Eyebrow>` automatically uppercases its content via CSS — but copy in `content/` should still be written uppercase to read naturally in source.
- `<Phrase>` lowercases its content via CSS — same source-naturalness reason.
- `<Heading level={1}>` uses `clamp()` for the display size (responsive without media queries).

---

### 7.6 Pill, Chip, Tag

Three distinct components that look similar but serve different purposes.

| Component | Shape | Use |
| --- | --- | --- |
| `<Pill>` | `rounded-full`, 28–32px tall, padding 12px x | Status indicators ("Live", "Beta"), category labels in lists |
| `<Chip>` | `rounded-chip` (8px), 28px tall, padding 10px x | Filter selections, dismissible tags with an x icon |
| `<Tag>` | inline, `rounded-chip` (8px), 22px tall, 11px text | Metadata on blog posts ("design", "behind-the-scenes") |

**Tones for `<Pill>`** (the most-styled variant):
- `default`: `bg-plum-800/8 text-plum-900`
- `accent`: `bg-peach-400/30 text-plum-900`
- `success`: `bg-sage-500/30 text-plum-900` (never alarm-green — sage is the only success tone)
- `warn`: `bg-peach-400 text-plum-900` (no orange/amber alerts)

No `error`/`danger` tone — Plum doesn't yell.

---

### 7.7 Card

The default surface for grouping content. Builds the visual rhythm of feature sections, customer logos, pricing tiers.

**Default:**
- Background `bg-white` on `bg-cream-100` page.
- Border `1px border-line`.
- Radius `rounded-card` (18px).
- Padding `24px` on small, `32px` on medium, `48px` on large via `padding="sm|md|lg"` prop.
- Shadow `shadow-sm` at rest.

**Hover (when `interactive` prop is true):**
- `shadow-md`
- `translate-y-[-2px]`
- transition `duration-2 ease-soft`

**Variant: `feature`** (used on home feature rows) — same as default but radius `rounded-hero` (32px), padding `48px`, no border.

**Variant: `flat`** (for dense lists like blog index) — no shadow, only `border-line`.

**Anti-pattern:** never add a colored left-border accent stripe (`border-l-4 border-rose-500` etc). This is explicitly out per the brand README and is a common AI-generated tell.

---

### 7.8 Form primitives

For the newsletter, contact, and any sales lead form.

**`<Input>`** (single-line):
- Height 44px, radius `rounded-button` (12px), padding 14px x.
- Default: `bg-white border border-line text-plum-900`, placeholder `text-fg-2/70`.
- Focus: `border-rose-500`, plus `shadow-focus` (peach glow). Both layer.
- Error state: `border-rose-500` + helper text below in `text-rose-500`. No red icons.
- Disabled: `bg-cream-100/50`, no border change.

**`<Textarea>`** — same styling as Input, min-height 120px, `resize-y`.

**`<Checkbox>`** — 18px box, `rounded-[4px]`, default `border-line-strong`, checked `bg-plum-800 border-plum-800` with a Lucide `<Check />` icon in cream.

**`<Select>`** — match Input dimensions. Use `<Listbox>` from Headless UI for accessibility; do not use the native `<select>` (impossible to style consistently). Dropdown panel uses `shadow-lg`, `border-line`, `rounded-card`.

**Label + helper text pattern:**
```
[ Label, eyebrow-style, 12px, fg-2 ]
[ Input ]
[ Helper or error, 12px, fg-2 or rose-500 ]
```
12px gap stacking.

---

### 7.9 Icon wrapper (Lucide)

Wrap Lucide so we control defaults in one place rather than scattering per-icon size/stroke props.

```tsx
// components/ui/Icon.tsx
import * as LucideIcons from "lucide-react";
type IconName = keyof typeof LucideIcons;

export const Icon = ({ name, size = 20, className = "" }: { name: IconName; size?: 16|18|20|24; className?: string }) => {
  const Component = LucideIcons[name] as React.FC<{ size?: number; strokeWidth?: number; className?: string }>;
  return <Component size={size} strokeWidth={1.75} className={className} />;
};
```

Usage: `<Icon name="Search" size={18} className="text-fg-2" />`.

Defaults locked: strokeWidth always 1.75, color inherits from text color (`text-fg-2` by default in most contexts), size constrained to the allowed set.

---

### 7.10 Layout primitives

These don't render visual UI — they enforce consistent rhythm.

**`<Container>`** — caps content width and applies horizontal padding.
- Max-width: 1240px.
- Padding: 24px mobile, 32px tablet, 48px desktop.
- Center on x-axis.

**`<Section>`** — vertical spacing between major page blocks.
- Padding-y prop: `sm` (64px), `md` (96px), `lg` (128px), `xl` (160px).
- Optional `divider` prop that renders a 1px `border-t border-line-strong` at the top — the brief uses this as the canonical section divider.

**`<Grid>`** — opinionated grid for feature rows.
- Props: `cols` (1 | 2 | 3 | 4), `gap` (`sm` 16px | `md` 24px | `lg` 32px).
- Auto-collapses on mobile: 4→2→1, 3→1, 2→1.

---

## 8. Phase 3 — Page-level patterns

Compose the primitives above into reusable section templates. Each pattern is a single component that takes content as props. Detailed enough that page files in §9 become almost pure content.

Brief specs only — full visual spec defers to the brand brief's section rhythm (eyebrow → headline → body → optional CTA → optional visual).

- **`<Hero>`** — Eyebrow + display headline + lead body + primary CTA + secondary CTA + (right side) large product visual. On home, the visual is the Plum app screenshot lifted from `ui_kits/plum-app/`. Background uses `bg-gradient-peach-veil` at the top, fading into cream. Display headline uses `<Heading level={1}>`. Two-column 60/40 split on desktop, stacked on mobile (visual below copy).

- **`<FeatureRow>`** — alternating left/right layout. Eyebrow + h3 + body + small bullet list (lucide check icons in `rose-500`, sage isn't used here) + product image. Three to five of these on the product page.

- **`<LogoWall>`** — grayscale-warm row of customer logos in a 6-column grid (collapses to 3 on tablet, 2 on mobile). Logos sit on `bg-white` cards with `shadow-xs`. Above them: `<Eyebrow>SOURCE OF TRUTH FOR</Eyebrow>` + a `<Phrase>` line like `helpful brands`.

- **`<Testimonial>`** — pulled quote, 28px display weight, `text-plum-900`. Below: small avatar (`rounded-full`, 48px) + name + role + company. No quotation-mark mega-graphics. The voice of the quote is what matters.

- **`<EarlyAccessForm>`** — the workhorse of v1. Email input (`<Input>` primitive, label-less, placeholder `you@yourbrand.com`) + primary button labeled `Request access`. Below the field, two helper lines: an eyebrow-style label naming the cohort (`CLOSED BETA — ROUND TWO`), and a single sentence on what to expect (`We invite in waves of 30 brands. Notes go out within a week.`). Optional `tone` prop: `inline` (used on hero, transparent surface) and `panel` (used in CTA section, sits on a `bg-white` card with `rounded-hero`, `shadow-md`). Submits to `/api/early-access` (Phase 4 wiring); UI handles loading + success + error states inline (success replaces the form with a quiet confirmation, no modal). No "join 10,000+", no countdown, no urgency copy. Restraint is the point.

- **`<FAQ>`** — accordion using Headless UI's `<Disclosure>`. Each item: question 18px medium, plus icon rotates 45° on open. Body fades in via `duration-3 ease-soft`. No slide.

- **`<ProcessBanner>`** — center-focused section pattern. Accepts `eyebrow`, `headline`, `body`, and an array of `steps` `({ number, title, body })`. Renders an eyebrow + H3 + body centered at the top, then a wide rounded card (`rounded-[28px]`, `border-line`, `bg-surface-elevated`) below with `md:grid-cols-3 md:divide-x md:divide-line` for the step columns. On mobile the steps stack with a top border between them. Used on the home page between the feature rows and the final CTA.

- **`<CTA>`** — final-section call-to-action. Big eyebrow + h2 + body + (during closed beta) `<EarlyAccessForm tone="panel">` inline, instead of a button. `bg-gradient-feng` panel (sage→peach), `rounded-hero` (32px), full-bleed within container. When we open GA, swap the form back to a `<Button>`.

- **`<AccessRequestDialog>`** — Headless UI `<Dialog>` that wraps `<EarlyAccessForm tone="panel">`. Triggered by every `Request access` button across the site (nav, hero secondary spots, etc.). Backdrop: `bg-plum-900/40 backdrop-blur-sm`. Panel: `rounded-modal` (24px), `shadow-lg`, `bg-white`, max-width 480px. Animate-in via fade + 4px translate-y, `duration-3 ease-soft`. Closes on success after a 1.6s confirmation hold. Focus trap and scroll lock come free from Headless UI.

---

## 9. Phase 4 — Pages

Page files in `/app` should be **mostly composition** — pulling patterns from §8 and content from `/content`. Almost no inline JSX beyond the pattern components.

Sequence to build, with rough copy direction. Final copy will land via PM review before launch.

### Home (`/`)

Seven beats, ladderring to the early-access form. No logo wall and no testimonial in v1 — both wait until we have real first-cohort brands to feature.

1. **Hero** — eyebrow `DIGITAL ASSET MANAGEMENT — CLOSED BETA` / headline `A place a brand lives, intact.` / body `We facilitate the incorporation and consolidation of brand assets — so your library stays the source of truth.` / primary CTA `Request access` (opens `<AccessRequestDialog>`) / secondary `See how it works` (anchors to first feature row). Hero visual sits below copy: a `<PlumAppMock>` component (an in-repo composition of asset grid + sidebar + filter chips, built from Plum tokens; swap for a real screenshot when one ships).
2. **Beta context strip** — a hairline-bordered single-row band. Eyebrow `ROUND TWO OPENS SOON` + one sentence: `We invite in waves of 30 brands. The next round opens at the end of the month.` No counter, no countdown.
3. **FeatureRow ×3** — alternating L/R. Library / Workspace / Collections, each with a small `<PlumAppMock>` variant or screenshot.
4. **Process banner** — center-focused section that bridges features → CTA. Eyebrow `HOW IT WORKS` / h3 `We open the library in waves.` / one-paragraph body, all centered with a max-width around 640px. Below that, a wide `bg-surface-elevated` card spanning the container, divided into three steps (`01 Request access`, `02 Wait for the wave`, `03 Settle into the library`) with hairline `border-line` dividers between them. Step numbers use `<Phrase>` weight in `text-accent` for a soft punctuation. *Replaces the earlier "voice moment" of lowercase phrase words — the process card is more concrete and earns its place ahead of the CTA.*
5. **CTA panel** — full-bleed `bg-gradient-feng` (sage→peach), `rounded-hero`. Eyebrow `JOIN THE NEXT WAVE` / h2 `Bloom your brand.` / one-line body / inline `<EarlyAccessForm tone="panel">`. The page's terminal moment; nothing after it but the footer.

### Product (`/product`)
- Hero: tighter headline, more capability-focused. Primary CTA `Request access`, no pricing reference.
- 5 FeatureRows: Upload, Organize, Permissions, Search, Share.
- FAQ — beta-relevant questions only (how invites work, what's included, what isn't yet). No billing/cancellation questions.
- CTA — same early-access panel as home.

### Pricing — *deferred*
No public pricing page during closed beta. Every "buy / subscribe / pricing" CTA is replaced with the early-access flow. We'll add `/pricing` back when we open up GA; the future spec (3 tiers + comparison + FAQ) is preserved in git history at this section's prior revision.

### Customers (`/customers`)
- Hero.
- LogoWall.
- Grid of customer story cards (Card variant `feature`, 3 cols → 1 col).
- One full case study as a featured FeatureRow.
- CTA.

### Blog (`/blog` + `/blog/[slug]`)
- Index: hero with eyebrow `NOTES`, headline `Notes from the studio.`, then a grid of post cards (Card variant `flat`, 3 cols).
- Post: container max-width 720px (narrower than site default), Heading level 1, body in `<Body size="lg">`, generous vertical rhythm. Tags at the top as `<Tag>`s. Author block at the bottom: avatar + name + 2-line bio + share row.

### About (`/about`)
- Hero with display headline.
- Plum brief excerpts — SPIRIT, HOW WE STAND OUT, FUTURE & GOALS sections, each as a FeatureRow without imagery (text-only — let the typography carry it).
- Team grid (4 cols → 2 cols → 1 col). Use Card variant `flat`.
- Values section: a row of `<Phrase>` words: `helpful` `balance` `inviting` `wealth` `gentle` — large, lowercase, plum, generous gaps.
- CTA.

### Legal (`/legal/terms`, `/legal/privacy`)
- Container max-width 720px.
- `<Heading level={2}>` for top-level sections, `<Heading level={4}>` for sub-sections.
- Plain body, generous line-height. No marketing chrome.
- Last-updated date in `<Caption>` at the top.

---

## 10. Phase 5 — Motion, a11y, performance, SEO

Done after all pages compose cleanly. These are polish gates that block launch.

**Motion:**
- All transitions use `ease-soft` from the token. No `ease-out`, no `ease-in-out`.
- Page enter: a single fade-in on the hero (`duration-4`, no slide). Subsequent sections animate **only** on scroll-into-view, using IntersectionObserver. Each fades in with a 4–8px translate-up over `duration-3`. No staggers more elaborate than a single section's children.
- Hover states already specified per component — no additional micro-interactions added at this phase.
- Petal mark (`plum-petal.svg`) may rotate as a 20-second loop in one place (the footer or 404 page). Not anywhere else.
- Respect `prefers-reduced-motion: reduce` — all entrance animations replaced with instant render.

**Accessibility:**
- Every interactive element keyboard-reachable, with `shadow-focus` ring.
- Semantic HTML — `<nav>`, `<main>`, `<article>`, `<footer>`. One `<h1>` per page.
- All images have `alt` text. Decorative images get `alt=""` + `aria-hidden="true"`.
- Color contrast: re-run Axe DevTools after styles settle, fix any AA failure.
- `<SkipToContent>` link at the top of `<body>`, visible on focus.
- Form inputs always paired with `<label>`. Errors announced via `aria-live="polite"`.

**Performance:**
- Images served via `next/image`. Customer logos as SVG where possible.
- Fonts via `next/font` with `display: "swap"`, subset to `latin`.
- No client-side JS for static pages. Marketing pages should be ~95% server components — `"use client"` only where state is needed (Navbar scroll, FAQ disclosure, mobile drawer).
- Aim for ≤120KB JS on home page, ≤180KB on product. Check via `next build` output.

**SEO + sharing:**
- `lib/seo.ts` — helper that returns Next.js `Metadata` for a page given `{ title, description, ogImage }`.
- Each page exports `metadata` with title/description.
- Open Graph images: a Plum-branded template generated at build time via `@vercel/og` — cream background, plum-800 wordmark, h2-sized page title in plum-900, peach veil at top. One template, dynamic title.
- Sitemap auto-generated via `next-sitemap`.
- `robots.txt` allowing all in production, disallowing previews.

---

## 11. Acceptance checklist (per phase)

Use this as the gate between phases. Don't advance until everything in the current phase's column ticks.

### Phase 1 — Foundation
- [ ] Tokens loaded; `bg-cream-100` and `text-plum-800` resolve correctly
- [ ] Fonts load without FOUT/FOIT
- [ ] `cn()` helper in place
- [ ] Tailwind builds without warnings

### Phase 2 — Global components
- [ ] Every component in §7 built, with all states (default/hover/focus/press/disabled)
- [ ] Navbar passes scroll-state transition test on home page
- [ ] Footer renders all 5 columns desktop, collapses correctly tablet + mobile
- [ ] All components keyboard-navigable with correct focus ring
- [ ] No use of pure black (`#000`) or pure white as a primary surface anywhere
- [ ] No emoji anywhere in the codebase (`grep -r "🎉\|🚀\|❤️\|🔥" .` returns nothing)
- [ ] Components documented inline (TSDoc comments on every exported prop)

### Phase 3 — Patterns
- [ ] All patterns built and visually reviewed against brand brief
- [ ] No colored-left-border-accent-stripe cards anywhere
- [ ] CTA panel uses `gradient-feng`, hero uses `gradient-peach-veil`, no `gradient-bloom` used as wallpaper

### Phase 4 — Pages
- [ ] All 7 routes render content from `/content`
- [ ] No hard-coded copy in page files (every string lives in `/content` or is a marketing word from the brief)
- [ ] Blog MDX rendering works end-to-end on one test post

### Phase 5 — Polish
- [ ] Lighthouse on home: ≥95 / 100 / ≥95 / 100
- [ ] Axe DevTools: 0 violations
- [ ] `prefers-reduced-motion: reduce` honored
- [ ] OG images render correctly when sharing on Twitter, LinkedIn, Slack
- [ ] Preview deploys work via Vercel for each PR

---

## 12. Out of scope (explicit)

So nobody has to ask. Anything below is a separate ticket and should not creep into this rebuild.

- The signed-in product UI (the DAM itself). That's a separate codebase referenced in `ui_kits/plum-app/` for design lineage only.
- **Public pricing.** Deferred until GA — see §9 *Pricing — deferred*.
- Stripe-driven checkout / customer-portal UI. Stripe stays installed (we'll need it at GA) but is not surfaced to visitors during closed beta.
- Authentication / sign-in flow on the marketing site. Sign-in link in the navbar deep-links to `/signin` in the existing app code; we'll revisit when invites go out.
- Headless CMS integration. Content stays in-repo for v1.
- Internationalization. English-only at launch; locale switcher in footer is wireframe-only.
- Animated illustrations or hand-drawn elements (explicitly out per brand brief).
- A/B testing infrastructure.
- Live chat widget.
- Cookie consent banner — needed before launch but treated as a small standalone task after the build is done.

---

## Appendix A — Voice cheatsheet (lift these into copy)

**Use:**
library, workspace, collection, brand, asset, source of truth, consolidate, intuitive, balance, harmony, bloom, gentle, warm, mature, opinionated, intact, drop your brand

**Avoid:**
dashboard, manage, files, folder, robust, seamless, empower, unlock, cutting-edge, AI-powered, get started for free, join thousands of, supercharge, all-in-one

**Sample structures (lift the rhythm):**
- `EYEBROW` / `Declarative headline.` / `Aphoristic supporting line.`
- `We facilitate ___.` (first-person plural as Plum)
- `Drop your brand.` (second-person to user, imperative, calm)
- `helpful` `balance` `inviting` (lowercase phrase words in `<Phrase>`)

---

## Appendix B — Working with Claude Code on this project

For the PM reviewing Claude Code's PRs:

- Ask Claude Code to **load the `plum-design` skill** at the start of every session — its tokens, voice rules, and component recreations are the reference.
- Ask Claude Code to **load the `frontend-design` skill** for any creative composition work (hero layouts, illustration moments). It handles the "make it striking" instinct; this Plan.md handles the "and on-brand" constraint.
- If a PR introduces a color, font size, or radius not in `colors_and_type.css`, reject it. The token list is closed.
- If a PR uses an emoji, reject it.
- If copy in a PR drifts to "manage", "dashboard", "supercharge", "robust" — reject and reroute to Appendix A.

That's the plan. Build Phase 1 first, get it merged, then build Phase 2 component-by-component before moving to anything page-level.
