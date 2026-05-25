---
name: plum-design
description: Use this skill to generate well-branded interfaces and assets for Plum — the Digital Asset Management platform — whether for production code, throwaway prototypes, slides, or one-off mocks. Contains essential design guidelines, color and type tokens, fonts, logos, iconography rules, and a click-through UI kit recreation of the Plum web app for fast prototyping.
user-invocable: true
---

# Plum design — agent skill

Plum is a Digital Asset Management (DAM) web app where teams maintain libraries of different brands. The brand is **warm, mature, opinionated, deliberately *not* tech-flavoured** — feng-shui inspired palette, soft humanist type, no emoji, no electric blues, no bouncy springs.

## How to start

1. Read `README.md` first — it has the brand brief, content/voice rules, full visual foundations, and the iconography approach.
2. Skim `colors_and_type.css` — all design tokens live there. Drop it on any HTML page and you have the palette, type scale, spacing, shadows, and motion.
3. Browse `preview/` for live specimens of every token, type style, component pattern, and brand asset (the same cards shown on the Design System tab).
4. The hi-fi component recreation lives in `ui_kits/plum-app/` — open `ui_kits/plum-app/index.html` to see the click-through prototype; lift JSX from `components.jsx` and `screens.jsx` for new mocks.

## When to use what

- **Throwaway HTML artifacts, slides, marketing mocks:**
  Link `colors_and_type.css`, copy assets out of `assets/`, and write static HTML. Match the voice and casing rules in README → CONTENT FUNDAMENTALS.

- **Product UI mocks (anything inside the Plum app):**
  Pull components from `ui_kits/plum-app/components.jsx` — Sidebar, TopBar, AssetCard, BrandCard, Button, Pill, Chip, TextField, Avatar, Icon. They use the tokens directly. Reach for the same Sidebar + TopBar shell the existing screens use.

- **Production handoff:**
  The tokens in `colors_and_type.css` are the source of truth — they map 1:1 to the names you'd give a real design-token system (plum-800, rose-500, peach-400, --gradient-bloom, --shadow-focus, etc.). Iconography is Lucide (CDN). Fonts are Sora + Quicksand stand-ins until real Avio Sans + Isidora arrive (see `fonts/README.md`).

## House rules to obey

- **Warm-bias every decision.** When deciding between two options, pick the warmer, softer, less "tech" one. That's the Plum heuristic.
- **No emoji** in product UI, ever. Kanji and lowercase soft phrases (`helpful`, `balance`) are the only "decorative type".
- **No cold gray.** Every neutral is plum-warm. Shadows are `rgba(74, 27, 59, …)`, not `rgba(0,0,0,…)`.
- **No electric blues, no bluish-purple gradients, no neon greens.** The Iris/Slate extended colors are accents — never primary.
- **No bouncy animation.** Default easing is `--ease-soft` (gentle settle). No springs. No overshoot. Fades over slides.
- **No emoji-cards, no rounded-corner-with-colored-left-border accent stripes.** Both are anti-patterns Plum avoids.
- **Voice:** first-person plural ("we") for the brand, second-person ("you") for the user. Calm, confident, never urgent. Sentence case for body. UPPERCASE with 0.12em tracking for eyebrows. lowercase for soft phrases.

## When invoked without specifics

Ask the user what they want to build (a slide, a screen, a page, a marketing artifact), what audience, what fidelity (mock vs production). Suggest 2–3 directions if relevant. Then produce HTML — using the tokens, copying real assets from `assets/`, and matching the voice from README's CONTENT FUNDAMENTALS section.
