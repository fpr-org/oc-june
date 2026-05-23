# Converter domain and UI

## Domain model (`lib/units.ts`)

- **`Unit`**: `id`, `name`, `symbol`, `factor` (+ optional `offset` for temperature, `type` for data-storage).
- **`Category`**: `id`, `slug`, `name`, `base`, `units[]`.
- **`converterCategories`**: authoritative list of all conversion tools surfaced in navigation, sitemap, and **`generateStaticParams`** for `app/[slug]/page.tsx`.

**Conversion math** uses category base units and `convertValue(...)` (shared in `ConverterMain`).

## Client converter (`components/converter/ConverterMain.tsx`)

Single **client component** used for “standard” unit converters (not **`MathSuite`**).

### Modes

1. **Default** – generic blue/primary styling, MB/GB-style defaults for data storage, etc.
2. **Rich UI** – when **`getConverterUiConfig(categoryData.id)`** returns a **`ConverterUiConfig`** (`weight` today): compact density, violet “weight layout” (`isWeightLayout`), hero, slider, expanded summary line, quick pairings, common units grid, tips, precision strip.

### Reference blocks (weight / mass)

| Block | Responsibility |
|-------|----------------|
| Header row | Title, pulses + subtitle, optional **tagline**, **`WeightHeroIllustration`**, star + swap |
| From card | Value input, optional unit badge, unit select, range slider (weight), from-unit pills |
| Divider | Swap affordance (also swap in header) |
| To card | Result, to-unit select, optional **mass** equivalence line, copy/share |
| Suggested | Presets 1/10/100 in current from-unit |
| Common units | Grid with **symbol + full name** (from `commonUnitIds`) |
| Tips | Bulleted tips with check icons; optional decorative hero at low opacity |
| Footer strip | “High Precision Engine” brand line |

### Registry (`lib/converter-ui.ts`)

```ts
Partial<Record<string, ConverterUiConfig>>
```

Extend with new category ids (e.g. `length`, `volume`) by importing config from `lib/seo-data/categories/<cat>.ts` or a dedicated `lib/converter-ui/*.ts` if files grow.

### Types (`lib/seo-data/types.ts`)

- **`ConverterUiConfig`**: defaults, optional `tagline`, optional `heroVariant`, `commonUnitIds`, `conversionTips`, `quickPairings` (`QuickPairing` with optional `presetFromValue`).

## UX principles (from weight reference)

1. **One vertical rhythm**: tight `gap` / `space-y`, cards with clear borders—scannable on mobile.
2. **Scoped theme**: `isWeightLayout` uses **violet** tokens; do not change global `--color-primary` for one route.
3. **Progressive disclosure**: primary conversion first; tips and secondary grids below.
4. **State + URL** (future): share links can use `?from=&to=&value=`—wire consistently from `handleShare` and static params.

## Testing checklist (new category with rich UI)

- [ ] Units resolve in **`lib/units`** for every `commonUnitIds` / `quickPairings` id.
- [ ] `categorySEOData[id]` present if SEO sections are required.
- [ ] `ConverterUiConfig` registered; no hydration issues (no random/date in SSR for client subtrees).
