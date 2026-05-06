# Longo Passeio — Design System

A warm, paper-cream brand for a curated café-discovery app set in central São Paulo. The name **"Longo Passeio"** ("a long stroll") with the tagline ***...o mundo além do seu quintal*** ("...the world beyond your backyard") frames the brand as an invitation to wander further — out the door, past the familiar block, into the cafés of the centro that "valem a pausa" (are worth the pause).

## Sources

- **Codebase (mounted):** `Longo Passeio/` — single-page React/Babel app at `Longo Passeio/SP em Camadas.html` (legacy filename — the brand is now Longo Passeio), with components in `Longo Passeio/components/*.jsx` and data in `Longo Passeio/data/cafes.js`.
- **Curator credit:** "curadoria por Tabata Kijotoki" (shown in app header).
- **Language:** Brazilian Portuguese throughout.

## Product

One product right now: a **mobile app prototype** (390×844 iPhone canvas) that catalogs ~19 cafés across 6 central-SP neighborhoods (*bairros*) — Santa Cecília, Vila Buarque, Higienópolis, República, Barra Funda, Campos Elíseos. Four screens: Início (home), Explorar (filterable list), Roteiros (curated routes), Favoritos. Cafés open as a bottom-sheet detail with photo, vibe quote, hours, and Google Maps embed.

---

## Content fundamentals

**Language:** Brazilian Portuguese, lowercase as a stylistic default for labels, eyebrows, chips, CTAs, and body asides ("explorar cafés", "ver roteiros →", "buscar café…", "limpar filtros"). Proper nouns and titles in headings keep normal casing ("Roteiros", "Favoritos", café and bairro names).

**Voice:** Warm, slow, second-person plural-implied. Reads like a friend handing you a tip. The signature voice motif is the **italic serif aside** — a short emotional kicker set in italic DM Serif Display:

- "***...o mundo além*** do seu quintal" (brand tagline)
- "o centro que *nem todo mundo vê*"
- "_lugares pra ir sem pressa_"
- "vá sem pressa, *peça um bom café*"

**"Vibe" quotes:** Every café has a two-word italic vibe ("Ensolarado e focado", "Minimalista e intenso", "Acolhedor e despretensioso"). Always shown wrapped in straight quotes, italic, muted color.

**Tone words:** *passeio, longo, pausa, sem pressa, quintal, curadoria, descoberta, além, valem a pausa, dica de ouro, se perca (só um pouquinho).* Never punchy or sales-y. Never imperative-shouty. The brand's superpower is permission to slow down and wander further.

**You vs. I:** Tu/você implied; the brand speaks *to* the reader as a knowing friend ("vá sem pressa", "peça um bom café"). Rarely uses "we"; the curator's name is credited once and otherwise stays out of the way.

**Numbers and stats:** Used sparingly and concretely — "19 cafés curados · 6 bairros", "3 cafés · 4–5 horas", "{n} cafés salvos". Always paired with units.

**Emoji:** Sparing — only as **periodo/roteiro illustrations** (☀️ tarde, 🌅 manhã, ☕ rota, 🌇 fim-de-tarde) and as a fallback ☕ when a hero image fails. Never as bullets, decoration, or in body copy. The brand's iconography is otherwise SVG.

**Casing examples:**
- Eyebrow labels — `bairros`, `hoje a gente sugere`, `como chegar`, `horário` (lowercase, uppercase via CSS letter-spaced 0.1–0.12em).
- Buttons — `explorar cafés`, `fechar`, `limpar filtros` (lowercase).
- Tags — `trabalhar`, `encontro`, `leitura`, `especialidade`, `pet friendly` (lowercase, single-word).
- Section headers — `Início`, `Explorar`, `Roteiros`, `Favoritos` (TitleCase serif).

---

## Visual foundations

**Palette philosophy.** Cream paper, espresso ink, and six soft pastel "bairro" accents that act like neighborhood passports. Nothing saturated; nothing pure white. The app feels like a hand-bound zine.

- **Surfaces:** `#faf7f2` cream is the canvas. White (`#fff`) is reserved for cards floating on cream. `#f5f0e8` and `#f0ebe3` are inset/input fills. Dark surfaces (CTAs, status pill, header bar) use espresso `#2a1f14`.
- **Ink scale:** seven steps of warm brown/grey from `#2a1f14` espresso → `#b8a898` faded mauve. Italic *vibe* quotes always sit at `#9a8878`/`#b8a898` so they read as quiet asides.
- **Bairro pastels:** each neighborhood owns a soft hue + darker on-color text (e.g. Santa Cecília sage `#c8d8b0` on `#4a6a30`). These appear as chips, badges, list-card accent strips, group headers, and the 6-stripe "swatch" atop the home hero card.
- **Accent gold `#c8a84a`** with cream-yellow `#f5f0e6` background and `#e8d8b0` hairline border is the **dica de ouro** treatment — a recurring "tip" callout.
- **Heart red `#e05a5a`** is reserved for favorite hearts and the favorite count badge. No other red appears.

**Type.** DM Serif Display (regular + italic) for headings, hero phrases, and vibe quotes. DM Sans (300/400/500/600/700 + italic 400) for everything else. The italic serif paired against tight DM Sans is the entire personality. No third family.

**Backgrounds.** Solid cream surfaces. No gradients except the hero-photo `linear-gradient(to bottom, rgba(0,0,0,0.1)→0.85)` for legibility behind detail-sheet text, and a 135° `linear-gradient(border→bg)` photo-fallback. No textures, no patterns, no grain.

**Imagery vibe.** Warm Unsplash café photography (curated per-café), darkened with a bottom gradient. The illustrative "map" view is paper-textured (`#f2ece0` ground, faint grid `0.08` opacity, soft drop-shadows on bairro polygons) — an intentional zine/atlas aesthetic, not Google-Maps blue.

**Animation.** Minimal, near-flat. The only declared transition is `transition: color 0.15s ease` on bottom-nav tabs and `all 0.15s ease` on filter chips. No bounces, no entrance animations, no parallax. Stillness is on-brand.

**Hover & press.** Color-swap rather than scale or shadow shifts. Active filter chips flip background to `#2a1f14` with cream text; inactive sit on transparent with `#888` text and a 1.5px `#ddd` border. The pattern: borders match background when active, weight-jump (400→700) on bairro chips signals state.

**Borders & strokes.** 1.5px is the canonical border weight on cards, chips, inputs, and dividers. 1px on internal hairlines (`#f0ebe3`) and timeline connector dots-vs-line transitions. 2px for "active" timeline dots. 5px-wide colored "accent strip" runs the full height of list cards as a left-side bairro tag.

**Shadow system.** Three small layered tiers — almost flat:
- `0 2px 6px rgba(0,0,0,0.04)` — list cards
- `0 2px 8/10px rgba(0,0,0,0.04–.05)` — featured/roteiro cards
- `0 4px 20px rgba(0,0,0,0.07)` — hero CTA card
- `0 -4px 32px rgba(0,0,0,0.18)` — bottom sheet
- `0 32px 80px rgba(0,0,0,0.5)` — phone bezel device frame

**Transparency & blur.** Used sparingly: the bottom-nav uses `rgba(250,247,242,0.96)` + `backdrop-filter: blur(12px)`. Hero-photo tags use `rgba(0,0,0,0.2)` + `blur(4px)`. The detail overlay scrim is `rgba(40,30,20,0.5)` + `blur(3px)`. The world is mostly opaque cream — blur is rare and intentional.

**Corner radii.** A consistent staircase: 10 (CTA), 12 (input/close), 14 (default card), 16 (hero/group), 20 (sheet/pill), 44 (phone bezel). Cards never have 0 radius and never exceed 16 except for phone/bottom-sheet structural radii.

**Cards.** White fill on cream canvas, 1.5px `#ece8e0`/`#e8e0d4` border, 14–16px radius, the smallest of the shadow tiers. Often introduced by a colored sliver — either a 5px left accent strip (list card) or an 8px stack of six bairro stripes across the top (home hero card).

**Layout rules.** 390×844 phone canvas. Status bar 44px, bottom nav 72px sticky. Page padding `20px` horizontal, top section padding `20px`. Card-to-card vertical gap `10–12px`. The home page reads as: header → hero phrase → hero CTA card → bairros chip-row → featured strip → dica box.

**Color vibe of imagery.** Warm: amber, ochre, cream-toned café interiors; sun-on-wood; light-from-window. Avoid cool/blue/neon photography. The map illustration is sage/blush/lavender on paper.

---

## Iconography

**Approach: hand-rolled outline SVGs + emoji for periodos.** No icon font, no Lucide/Heroicons import in the source. Stroke icons sit at 22×22 with `strokeWidth: 1.8` inactive / `2.5` active, `strokeLinecap: "round"`, `strokeLinejoin: "round"`. Fill is `none`; stroke is `currentColor` and color-swaps via the parent's text color (`#2a1f14` active, `#bbb` inactive).

The set in use (all stored in code, see `ui_kits/app/icons-from-source.jsx`):

- `HomeIcon` — house with chimney roof
- `MapIcon` — folded-map polygon
- `RouteIcon` — two circles connected by a meandering path
- `HeartIcon` — heart, fill `#e05a5a` when active, otherwise stroke
- `SearchIcon` — circle + handle (used inside search input)
- Status-bar bars (signal, wifi, battery) — solid fills as inline SVG

**Unicode characters used as icons:**
- `★` accent-gold star → "dica de ouro"
- `✦` accent-gold star → favoritos hint
- `→` `←` `›` `×` arrows and chevrons in CTAs / list items / clear-search
- `♥` `♡` heart fallbacks in cards / fav count

**Emoji used (only for roteiro periodo):** 🌅 manhã · ☀️ tarde · ☕ rota especialidade · 🌇 fim de tarde. These map 1:1 to the four roteiros and never appear elsewhere.

**Stroke-icon substitution rule:** if you need an icon not in this set, draw it inline with the same conventions (22px box, `strokeWidth: 1.8/2.5`, `currentColor`, round caps/joins). Do not introduce Lucide/Material/etc. — the set should look hand-cut to match the zine feel.

---

## Index

Root manifest of this design system:

| File | What's inside |
|---|---|
| `README.md` | This document — context, content, visuals, iconography. |
| `SKILL.md` | Agent-skill manifest (cross-compatible with Claude Code). |
| `colors_and_type.css` | All CSS variables + semantic typography. |
| `assets/` | Imagery and brand visuals (sample-photo placeholder, café photo URL list). |
| `preview/` | Per-card HTML specimens shown in the Design System tab. |
| `ui_kits/app/` | Pixel-faithful mobile UI kit — components, screens, data, frame, runnable `index.html`. |

Quick paths to start:
- App preview → `ui_kits/app/index.html`
- Tokens → `colors_and_type.css`
- Café photo manifest → `assets/cafe-photos.md`
