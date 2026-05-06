---
name: longo-passeio-design
description: Use this skill to generate well-branded interfaces and assets for Longo Passeio (curated café-discovery for central São Paulo — tagline "...o mundo além do seu quintal"), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation

- **Brand name:** Longo Passeio. **Tagline:** "...o mundo além do seu quintal".
- **Brand essence:** Brazilian-Portuguese, lowercase, slow. Cream paper + espresso ink + 6 pastel bairros. Italic DM Serif Display kickers paired with tight DM Sans.
- **Tokens:** `colors_and_type.css` is the single source. Import it or copy values directly.
- **Components:** `ui_kits/app/` is a full mobile prototype lifted near-1:1 from the source codebase. Open `ui_kits/app/index.html` to see it run; lift JSX components from the same folder.
- **Iconography:** stroke SVGs at 22×22 with `strokeWidth: 1.8` (inactive) / `2.5` (active), `currentColor`, round caps. Period emoji are allowed (🌅 ☀️ 🌇 ☕). No icon font; do not import Lucide/Material.
- **Don't:** add saturated colors, gradients, AI-slop emoji decoration, or shouty imperative copy. Don't write English copy unless the user asks — the brand is Portuguese.
