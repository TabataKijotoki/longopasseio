# Longo Passeio — App UI Kit

Pixel-faithful mobile prototype, lifted from the source codebase (`Longo Passeio/`). 390×844 iPhone canvas, four screens, fully click-through.

## Files

| File | Purpose |
|---|---|
| `index.html` | Runnable kit. React + Babel inline; loads everything below. |
| `data/cafes.js` | 19 cafés across 6 bairros + 4 roteiros. Single source of truth. |
| `icons-from-source.jsx` | All SVG icons (Home, Map, Route, Heart, Search). Stroke-based, currentColor. |
| `tweaks-panel.jsx` | Tweaks UI primitives (panel, sections, color/radio/toggle controls). |
| `CafeCard.jsx` | Bottom-sheet detail view: photo, vibe quote, hours, map, fav toggle. |
| `HomeScreen.jsx` | Início — header + hero phrase + hero CTA card + bairro chips + featured roteiro + dica box. |
| `ExplorarScreen.jsx` | Filterable list of cafés with bairro filter chips and search. |
| `RoteirosScreen.jsx` | Curated 4-roteiro list with timeline. |
| `FavoritosScreen.jsx` | Saved cafés with empty state. |

## Usage in new designs

The components are **stylistic primitives**. Reuse patterns rather than wholesale-copying components:

- 1.5px border + 14–16px radius + small soft shadow = "card".
- Italic DM Serif Display set against tight DM Sans = brand voice.
- Bairro pastel + darker on-color text = "neighborhood passport".
- Lowercase chip labels with letter-spacing 0.03–0.12em.
- Detail sheets slide up from bottom with `0 -4px 32px rgba(0,0,0,0.18)` shadow.

## Visual ground-truth

The kit is a near-1:1 port of `Longo Passeio/SP em Camadas.html` (legacy source filename). If you change something here, also reflect it in `colors_and_type.css` so tokens stay consistent.
