# Page types and routing

## Dynamic category pages (`app/[slug]/page.tsx`)

- **Input**: `params.slug` → **`getCategoryBySlug(slug)`**.
- **Metadata**: `categorySEOData[id]` when present; else fallback title/description.
- **Static generation**: `generateStaticParams()` from **`converterCategories.map(c => c.slug)`**.

### Composition fork

```text
if category missing → notFound()

if no SEO entry → ConverterMain only (no article sections)

if SEO entry:
  if category.id in MathSuite list → <MathSuite />
  else → <ConverterMain />

then (when seo present): JSON-LD WebApplication + SEO sections + RelatedConverters
```

**MathSuite ids** (special calculators, not the standard two-sided converter):  
`percentage`, `scientific`, `geometry`, `algebra`, `statistics`, `trigonometry`, `fractions`, `discrete`, `health`, `finance`, `tax`, `timezone`

Everything else with SEO uses **`ConverterMain`** + **SEO article** (intro, how-to, examples, FAQ).

### SEO sections below the fold (when `seo` exists)

- Intro card (`h1`, intro)
- Two-column: How-to + Common conversions (from `examples`)
- FAQ
- **`RelatedConverters`** (`currentCategoryId`)

## Other routes (representative)

| Route | Role |
|-------|------|
| `app/page.tsx` | Marketing home, shortcuts to categories |
| `app/conversions`, `app/favorites`, `app/learn`, … | Secondary IA |
| `app/decimal-to-fraction`, `app/fraction-to-decimal`, `app/time/[slug]` | Specialized tool pages with their own layout |

## Sitemap (`app/sitemap.ts`)

Must stay aligned with **`converterCategories`** slugs and any static marketing URLs.

## Architectural rule

**Slug ↔ category** is defined **once** in `lib/units.ts`. SEO files and `categorySEOData` keys **must use the same `id`** as that category.
