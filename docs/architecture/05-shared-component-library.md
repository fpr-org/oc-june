# Shared component library (layout & features)

Components that form the **common frame** around every calculator (including weight/mass).

## Layout & navigation

| Component | Path | Notes |
|-----------|------|--------|
| `Header` | `components/layout/Header.tsx` | Desktop nav, search trigger, live clock (client mount), converters mega-dropdown |
| `MobileHeader` | `components/layout/MobileHeader.tsx` | Small-screen top bar |
| `Sidebar` | `components/layout/Sidebar.tsx` | Category list; mirrors converter domains |
| `Footer` | `components/layout/Footer.tsx` | Site footer |
| `BottomBar` | `components/layout/BottomBar.tsx` | Mobile persistent actions |
| `MobileMenu` | `components/layout/MobileMenu.tsx` | Slide-out nav |
| `SearchModal` | `components/layout/SearchModal.tsx` | **⌘K** / search UX (`UIProvider`) |
| `RelatedConverters` | `components/layout/RelatedConverters.tsx` | Cross-links at bottom of category pages |

## Gamification

| Component | Path |
|-----------|------|
| `RightSidePanel` | `components/gamification/RightSidePanel.tsx` |
| `StatusBanner` | `components/gamification/StatusBanner.tsx` |

## Converter suite

| Component | Path | When used |
|-----------|------|-----------|
| `ConverterMain` | `components/converter/ConverterMain.tsx` | Standard unit converters |
| `MathSuite` | `components/converter/MathSuite.tsx` | Specialized math/finance/health flows |

## Context providers (`lib/`)

| Context | Responsibility |
|---------|----------------|
| `AuthContext` | User session, sign-in/out |
| `FavoriteContext` | Starred conversion pairs |
| `ConversionContext` | Recent conversion history |
| `UIContext` | Search modal, UI chrome |

## Design tokens reused by “reference” converter UX

- **Cards**: `rounded-xl`–`rounded-2xl`, `border`, `shadow-sm`, subtle gradients for weight layout.
- **Accent**: scoped **violet** for weight (`isWeightLayout`); elsewhere **primary** / **blue** for default converter.
- **Density**: compact `padding`, `gap-1.5`–`gap-2`, small `text-[9px]`–`text-[11px]` for meta labels.

When adding a new rich converter, **reuse `ConverterMain` patterns** (section order, button sizes, grid columns) before introducing new one-off components.
