# Content and SEO categories (`lib/seo-data`)

## Purpose

Each **converter domain** that has marketing/SEO copy lives in a **small module** under `lib/seo-data/categories/*.ts`. The aggregator **`lib/seo-data/index.ts`** builds `categorySEOData: Record<string, SEOContent>` keyed by **`category.id`** from `lib/units` (`converterCategories`).

Routes like **`app/[slug]/page.tsx`** read:

- **`getCategoryBySlug(slug)`** → `categoryData.id`
- **`categorySEOData[categoryData.id]`** → `SEOContent` for metadata + on-page intro/how-to/examples/FAQs

If **`seo` is missing** for an id, the page still renders **`ConverterMain`** but without the SEO article blocks (fallback metadata string is generated in `generateMetadata`).

## `SEOContent` shape (`lib/seo-data/types.ts`)

| Field | Use |
|-------|-----|
| `title`, `description` | `<title>`, meta description, OG |
| `h1`, `intro` | On-page lead section |
| `howTo` | Title, steps, **snippet** (“pro tip” callout) |
| `examples` | “Common conversions” grid |
| `faqs` | FAQ list with schema-friendly copy |

## Registered category modules

`categorySEOData` currently includes (keys = **`Category.id`** in `lib/units`):

`data-storage`, `weight`, `temperature`, `area`, `pressure`, `time`, `energy`, `length`, `volume`, `speed`, `math`, `percentage`, `scientific`, `geometry`, `health`, `finance`, `tax`, `timezone`

**Adding a new category**

1. Add **`converterCategories`** entry in `lib/units.ts` (`id`, `slug`, `name`, `units`).
2. Create **`lib/seo-data/categories/<name>.ts`** exporting `categorySeo` satisfying `SEOContent`.
3. Import and register in **`lib/seo-data/index.ts`**.
4. (Optional) Export **`XxxConverterUi`** from the same file if using rich `ConverterUiConfig`; register in **`lib/converter-ui.ts`**.

## Optional rich UI beside SEO (`weight` reference)

`lib/seo-data/categories/weight.ts` also exports **`weightConverterUi: ConverterUiConfig`** (defaults, tagline, hero variant, `commonUnitIds`, `conversionTips`, `quickPairings`). That is **not** part of `SEOContent`; it feeds **`getConverterUiConfig('weight')`** in the client converter.

**Convention**: keep **SEO narrative** in `categorySeo`; keep **interactive defaults and micro-copy for the tool** in `ConverterUiConfig` when you add it for other categories.

## File naming

Use **kebab case** filenames matching the domain: `data-storage.ts`, `weight.ts`, … consistent with slug fragments where applicable.
