# Plum Design System

> **Plum** is a Digital Asset Management (DAM) platform — a web app where teams maintain libraries of different brands, organize assets, and share them across creative teams, freelancers, and international agencies. The brand exists because consolidating brand files today is messy; Plum is the place a brand lives, intact.

The name comes from Japanese plum blossoms (*ume*), which bloom first — in the harshest weather. The brand carries that spirit: intuitive, visionary, opinionated, blooming before anyone else. The product is a tech tool that *deliberately* doesn't look like a tech tool — warm, soft, mature, never high-contrast.

---

## Sources

| Source                            | Where                                                                |
| --------------------------------- | -------------------------------------------------------------------- |
| Figma — *PLUM \_ Brand Exploration* | Mounted as virtual FS. 1 page, 18 frames. See `fig_ls /Page-1`.    |
| Plum brief (highlights)            | `/Page-1/Plum-Brief/index.jsx` in the Figma file                    |
| Feng-shui color study              | `/Page-1/Feng-Shui-colors/index.jsx`                                |
| Logo lockups                       | `/Page-1/plum-logo/index.jsx` (5 variants: default, white, white-on-card, gradient-card) |
| User uploads                       | `uploads/Logo PLUM.png` (full lockup, 985×309 PNG with transparency) |

No production codebase was attached. Designs in `ui_kits/` are best-effort recreations grounded entirely in the Figma brief + brand brief — they are an *interpretation* of what Plum's product would look like, not a transcription of shipping screens.

---

## Index

| File / folder                | What it is                                                                  |
| ---------------------------- | --------------------------------------------------------------------------- |
| `README.md`                  | You are here. Brand, content, visual, iconography fundamentals.            |
| `SKILL.md`                   | Agent skill manifest — what to read, when, how to use this kit.            |
| `colors_and_type.css`        | All design tokens — colors, type, spacing, radii, shadows, motion.         |
| `fonts/README.md`            | Font substitutions in use + how to swap real Avio Sans / Isidora in.       |
| `assets/`                    | Logos, marks, brand imagery. Includes `plum-logo-full.png`, `plum-mark.png`, `plum-wordmark.svg`, `plum-petal.svg`. |
| `preview/`                   | Cards that populate the Design System tab (typography, colors, components, spacing, brand). |
| `ui_kits/plum-app/`          | High-fidelity recreation of the Plum web DAM app. `index.html` is a click-through prototype; the `.jsx` files are reusable component blocks. |
| `slides/`                    | *(empty — no slide template was provided in source)*                       |

---

## CONTENT FUNDAMENTALS

Plum talks like a calm, opinionated curator — not a salesperson, not a customer-success bot.

### Voice
- **First-person plural ("we")** when speaking *as Plum* — used in the brief itself: *"We facilitate the incorporation & consolidation…"*, *"We want a user interface that is warm and soft on the eyes."*  Plum is a "we", never an "I".
- **Second-person ("you")** when talking *to the user*: *"Drop your brand here"*, *"You can enter a better consolidated brand…"*
- Confident, never apologetic. Plum is *opinionated and seeks to be the center of truth.* It tells you what's good. It does not hedge.
- Calm, never urgent. No exclamation marks unless something has truly just succeeded. No countdown timers. No "🔥 Hot deal".

### Casing
- **Wordmark + product nouns** are Title Cased: *Plum*, *Library*, *Workspace*, *Collection*.
- **Eyebrows / overlines** are ALL CAPS with wide tracking (`.eyebrow`, 0.12em): *SPIRIT*, *SPECIALTY*, *HOW WE STAND OUT*, *FUTURE & GOALS*. These appear above every section heading in the brief.
- **Soft phrases / values** are lowercase: *helpful*, *balance*, *inviting*, *wealth*, *gentle*, *harmonious*, *intuitive*, *warm*, *soft*. Used in `.phrase` style (Quicksand Light, plum). Never capitalize these — the lowercase IS the personality.
- **Body sentences** use sentence case. No headline title case.

### Tone examples (lifted or paraphrased from the brief)

> SPIRIT — Plum's spirit, intuitive and visionary, makes conclusions on its own.

> Plum has no restrictions and does not follow the rules.

> We want to make tech that is warm and inviting, rather than functional and high contrast.

> We don't want to draw attention by following the rules, we want to draw attention by being different.

Note the structure: eyebrow (SPIRIT) → declarative statement → almost-aphoristic supporting line. Use this rhythm for hero sections, empty states, and onboarding screens.

### Words to use
*library, workspace, collection, brand, asset, source of truth, consolidate, intuitive, balance, harmony, bloom, gentle, warm, mature, opinionated*

### Words to avoid
*dashboard* (use **workspace** or **library**), *manage* (use **organize**), *files* (use **assets**), *folder* (use **collection**), *robust*, *seamless*, *empower*, *unlock*, *cutting-edge*, *AI-powered* (unless literally describing AI), *🚀*, *🎉*, *fire emoji of any kind*.

### Emoji
**No emoji in product UI.** The brief is emoji-free; the brand voice is too mature for emoji garnish. Two exceptions: Japanese kanji *火災* (fire) and *地球* (earth) appear once each in the feng-shui color study as poetic accent — they belong only in brand marketing, never UI.

### Numbers, dates, units
- Use thin spaces in large numbers: `12 480 assets`, never `12,480`.
- Dates: `25 Jan 2026` (day-month-year, abbreviated month).
- File sizes: `8.4 MB`, lowercase unit prefix, space between.

---

## VISUAL FOUNDATIONS

### Color vibe — "warm balance, no tech cliché"
The palette is a **feng-shui** reading: each color carries an element (Fire/Earth) and a directive (*SHIFTING & PROSPERITY*, *PARTNERSHIPS & BALANCE*, *HELPFUL & EFFICIENT*, *WEALTH & VITALITY*). Practically:

- **Deep plum** (`#4A1B3B`, `#351B30`) — Plum's ink. All long-form text, primary buttons, dark surfaces. Replaces "neutral charcoal" / "slate-900".
- **Cream blush** (`#F1EDEE`) — the app background. Replaces "neutral white" / "gray-50". Always preferred to pure white for surfaces.
- **Peach** (`#F8BC9F`) — fire element, "soft & inviting". The joy color. Highlights, focus rings, hero veils, callouts.
- **Mauve / raspberry** (`#AA5476`) — primary accent for links, focus, selected state.
- **Dusty rose** (`#C8A9AF`) — hover tints, secondary chips, decorative gradients.
- **Sage** (`#C7D4BB`) — earth element, "partnerships & balance". Success tone, calm chips, never alarm-green.

**Avoid:** pure black (`#000`), pure white as a primary surface, cold grays, electric blues, neon greens, bluish-purple gradients (the classic "tech" tell). Plum is warm-biased everywhere — even neutrals lean rose.

### Type
- **Primary face — Avio Sans** (substituted with **Sora** until font files arrive). Geometric humanist, rounded counters. Used at heavy weights (700, 800) for display and 400–500 for UI.
- **Soft face — Isidora Light** (substituted with **Quicksand Light**). Used *only* for warm single-word phrases at 32–36px: lowercase, sage-of-emotion vibe.
- **Tracking:** display weights take `-0.04em` (the brief sets it explicitly). Body is neutral. Eyebrows are `+0.12em`.
- **Scale anchors:** 13 (eyebrow), 16 (body), 24 (sub-head), 32 (h3), 56 (h2), 128 (display). See `colors_and_type.css`.

### Backgrounds
- **Default**: solid `--cream-100`. Almost everything sits on this.
- **Hero / brand**: full-bleed gradients. Two house gradients:
  - `--gradient-feng` — sage→peach, 135°. Optimistic, intro screens, login.
  - `--gradient-bloom` — cream→peach→mauve→plum, 180°. The logo gradient; used as accent stripe, never wallpaper.
- **Peach veil** — `--gradient-peach-veil` is a 76-px-tall fade at the top of long pages (seen on the brief slide). Use it as a soft "page heading" zone, never a header bar.
- **No grain, no noise, no hand-drawn illustration.** The brief is clean and gradient-led. No textures.
- **Full-bleed imagery** is reserved for brand assets the user uploads (cover art for a brand library, etc.) — never decorative stock.

### Animation
- **Default easing:** `--ease-soft` — `cubic-bezier(0.32, 0.72, 0.24, 1.0)`. Gentle settle, no overshoot. Plum should never bounce.
- **Durations:** `--dur-2` (200ms) for hover/press, `--dur-3` (320ms) for entrance, `--dur-4` (560ms) for big container reveals.
- Fades > slides. Petal mark may rotate slowly (~20s loop) as a brand flourish, but in-product motion is minimal.
- No spring physics. No parallax. No scroll-jacking.

### Hover states
- Buttons & cards: background steps one tone darker (plum-800 → plum-700) and shadow goes from `--shadow-sm` to `--shadow-md`.
- Links: color shifts to `--accent-hover` (#95416A) over 200ms.
- Icon buttons: 4–8% plum tint background appears (`rgba(74,27,59,0.06)` → `0.1`).

### Press states
- 1–2% scale-down (`transform: scale(0.98)`).
- Background steps darker again (`--action-press` / `--plum-900`).
- Shadow drops to `--shadow-xs`.

### Borders
- Almost always **hairline** (1px) in `--line` (#E5DBDD) — warm rose-tinted neutral, never gray.
- Dividers use `--line-strong` (#D2C2C5).
- Active / focused inputs get a 1px `--rose-500` ring plus a 4px `--peach-400` glow.

### Shadows / elevation
Warm-tinted, never neutral. All shadows are `rgba(74, 27, 59, ...)` — plum, not gray.
- `--shadow-xs`: card hairline lift
- `--shadow-sm`: resting cards
- `--shadow-md`: hovered cards & menus
- `--shadow-lg`: modals, popovers
- `--shadow-focus`: 4px peach glow — the *only* focus ring

### Protection gradients vs capsules
- Use **capsules** (pill-shaped, `--radius-full`) for status, chips, "live" / "draft" / "approved" tags.
- Use **protection gradients** (a soft cream-to-transparent veil) over imagery where text needs to sit on top — not solid scrims.

### Transparency & blur
- Backdrop blur is allowed on floating elements (popovers, command palette) at `backdrop-filter: blur(18px) saturate(120%)` over `rgba(241, 237, 238, 0.7)`.
- Avoid blur for hero sections — Plum is sharp, not "glassmorphic".

### Imagery character
- **Warm-biased** color grade — peach / amber side of neutral. Never cool, never B&W as a default.
- No grain. No film simulation. Plum is clean, not nostalgic.
- The brand mark itself (5-petal bloom with cream→peach→mauve→plum radial) is the dominant visual; imagery supports it, never competes.

### Corner radii
- 4 px — input affordances (checkboxes)
- 8 px — chips, inline tags
- 12 px — buttons, inputs, small cards (the workhorse radius)
- 18 px — feature cards
- 24 px — modals, large panels
- 32 px — hero panels, brand cards
- `999px` — pills, avatars, segmented controls

### Cards
- Background `--bg-elevated` (white) on a `--cream-100` page.
- 18px radius default.
- `--shadow-sm` at rest; `--shadow-md` on hover with `transform: translateY(-2px)` over 200ms.
- Optional 1px `--line` border for ultra-flat variant on white-on-white.
- **Never** a colored left-border accent stripe (anti-pattern, not on brand).

### Layout rules
- Generous margins. The brief uses ~88px horizontal page padding on a 1920-wide canvas. Translate to `--space-12` (48px) at desktop / `--space-6` (24px) mobile minimum.
- Vertical rhythm is multiples of 8.
- Eyebrow → headline → body → optional CTA is the canonical section stack.
- A single hairline rule at `--line-strong` divides major sections (seen at `y=1010.5` in the brief).

---

## ICONOGRAPHY

### Approach
Plum has **no shipped icon set yet**. The brief contains zero icons aside from the petal mark and the wordmark — every "tile" in the feng-shui frame is a colored block, not a glyph. So the system inherits an external icon family chosen to match the brand's character.

### Icon system in use
**[Lucide](https://lucide.dev/)** — loaded from CDN at `https://unpkg.com/lucide@latest`.

Lucide is chosen because:
- Stroke-based (1.75 px), open counters — geometrically aligned with Sora and the rounded petal mark.
- Soft, never aggressive. No filled / heavy variants by default.
- Free, MIT, broad coverage of DAM-relevant icons (folder, image, video, search, share, tag, history, star).

**⚠ Flag to user:** This is a substitution. If Plum has an in-house icon set (or wants to commission one in the rounded-stroke style of the petal), swap Lucide out in `ui_kits/plum-app/index.html`.

### Usage rules
- Default stroke width: `1.75`. Default size: `20px` for inline UI, `24px` for primary nav, `16px` for chip-inline.
- Default color: `--fg2` (#6B4A5C). Never pure black.
- Hover: lift to `--fg1`. Active / selected: `--rose-500`.
- Don't mix Lucide with other icon families on the same screen.

### Logo / mark assets in `assets/`
| File                       | Use                                                          |
| -------------------------- | ------------------------------------------------------------ |
| `plum-logo-full.png`       | Full lockup, dark plum on transparent — primary marketing    |
| `plum-mark.png`            | Bloom mark only, dark plum                                   |
| `plum-wordmark.svg`        | Wordmark only, `currentColor` — for nav bars, inline mention |
| `plum-petal.svg`           | Single petal — for loaders, decorative repeats               |
| `plum-lockup-cream.png`    | Lockup composited on cream background — for slide titles     |

### Emoji / Unicode-as-icon
**No.** Emoji are never used as iconography. The brief uses kanji *火災 / 地球* once each as poetic typography in the feng-shui slide — that's *type*, not *icons*, and it's marketing-only.

---

## How to use this design system

1. **Mock a Plum screen.** Drop `<link rel="stylesheet" href="colors_and_type.css">` and you have the full token palette + base type.
2. **Reuse components.** Pull from `ui_kits/plum-app/*.jsx` — Sidebar, AssetCard, CommandBar, etc. They use the tokens.
3. **Reference the brief.** When in doubt about voice, re-read the SPIRIT and HOW-WE-STAND-OUT excerpts above.
4. **When making decisions** about a color or radius or weight: pick the *warmer*, *softer*, *less tech-y* option. That's the Plum heuristic.
