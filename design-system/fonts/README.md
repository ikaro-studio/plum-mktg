# Fonts

## Substitutions in use

| Brand font          | Used for                              | Substitute (Google Fonts)       |
| ------------------- | ------------------------------------- | ------------------------------- |
| **Avio Sans**       | Primary UI — logo, headings, body     | **Sora**                        |
| **Isidora** (Light) | Soft warm phrases ("helpful", "warm") | **Quicksand** (Light)           |

### Why these subs
- **Sora** is a geometric humanist sans with rounded counters and an open low x-height — closest free match to Avio Sans's signature softness. Avio Sans Bold @ 128px in the brief reads very similarly to Sora 800 @ 128px.
- **Quicksand** matches Isidora Light's friendly rounded terminals and gentle, hand-warmed character. Both feel like "spoken" type rather than "set" type.

### To install the real fonts
1. Place `.woff2` / `.ttf` files in `fonts/avio-sans/` and `fonts/isidora/`.
2. Add @font-face declarations to a `fonts/fonts.css` and import it BEFORE `colors_and_type.css`.
3. Remove the Google Fonts `@import` line at the top of `colors_and_type.css`.

### ⚠ ASK FOR USER
The brief mentions `uploads/AvioSans-v0.8.zip` but the file is **not present** in the uploads folder — only `Logo PLUM.png` was attached. Please re-attach the font zip so we can swap Sora out for real Avio Sans across the system.
