# Website development architecture

High-level blueprint for **OC - Online Calculator**: shared shell, category content (`lib/seo-data/categories`), converter behavior, and UX patterns modeled on the **Weight & Mass** experience (dense card layout, violet accent theme, quick conversions, common units, tips).

## Document map

| Page | Purpose |
|------|---------|
| [01-site-shell-and-layout.md](./01-site-shell-and-layout.md) | Root layout, responsive grid, global providers, chrome components |
| [02-content-and-seo-categories.md](./02-content-and-seo-categories.md) | `SEOContent`, per-category modules under `lib/seo-data/categories`, `categorySEOData` registry |
| [03-converter-domain-and-ui.md](./03-converter-domain-and-ui.md) | `lib/units`, `ConverterMain`, rich UI config, `lib/converter-ui` |
| [04-page-types-and-routing.md](./04-page-types-and-routing.md) | Dynamic `[slug]`, MathSuite vs converter split, special routes |
| [05-shared-component-library.md](./05-shared-component-library.md) | Reusable layout & feature components |

## Reference UX: weight & mass

Treat **`/weight-converter`** as the target bar for future “full” converter pages:

- **Header block**: category title, “High Precision Engine” subtitle, optional **tagline**, hero illustration, favorite + swap.
- **Two-column mental model**: **From** card (value, unit, slider when applicable, unit pills) → **To** card (result, unit, chain summary, copy/share).
- **Secondary content**: quick conversion cards, common units grid (symbol + name), conversion tips panel, precision footer strip.
- **Theming**: scoped accent (e.g. violet) via **`isWeightLayout`**-style flags—not global `primary` overrides.

Extend the same structure to other physical units (length, volume, …) by adding **`ConverterUiConfig`** entries in `lib/converter-ui.ts` and optional `tagline` / tips / pairings beside `categorySeo` in each category file.

## Tech stack (context)

- **Next.js App Router** (`app/`), React 19, Tailwind CSS v4 (`app/globals.css` `@theme`).
- **Client state**: Auth, favorites, conversion history, UI (search/modals)—see shell doc.

---

*Generated for internal development alignment; update when adding categories or new shells.*
