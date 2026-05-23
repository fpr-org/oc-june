# Site shell and layout

## Root layout (`app/layout.tsx`)

Single root HTML shell with:

- **Global CSS**: `app/globals.css` (Tailwind v4, `--color-primary` in `@theme`).
- **Providers** (order matters for hooks):
  1. `AuthProvider`
  2. `FavoriteProvider`
  3. `ConversionProvider`
  4. `UIProvider`
- **Global UI overlays**: `LoginOverlay`, `MobileMenu`, `SearchModal`, `CookieConsentBanner`, `TopLoadingBar` (Suspense).
- **Page background**: `min-h-screen bg-[#f7f9fc]`.

## Responsive chrome

| Region | Component | Role |
|--------|-----------|------|
| Mobile top | `MobileHeader` | Compact nav / brand on small screens |
| Desktop top | `Header` | Search, converters dropdown, auth, **clock/date** (client-only tick to avoid hydration mismatch) |
| Left | `Sidebar` | Category navigation (aligns with converter domains) |
| Center | `{children}` | Main page content, centered in flex column |
| Right (xl+) | `RightSidePanel` | Gamification: streak, gems, challenges, history |
| Bottom | `Footer`, `BottomBar` | Legal, links, mobile shortcuts |

## Main content grid

```text
max-w-[1536px] mx-auto
grid:
  default:        1 col  (sidebar stacks / hidden per Sidebar implementation)
  lg:             [240px | 1fr]
  xl:             [250px | 1fr | 320px]   ← three-column “desktop app” feel
gap-6 lg:gap-8
py-6 lg:py-8
```

The **calculator column** uses `flex flex-col gap-6`; children are **centered** on smaller breakpoints (`justify-center xl:justify-start`) so converter cards match the weight/mass centered-card UX.

## Cross-cutting concerns

- **Hydration**: time in `Header` deferred until after mount (`useEffect`); avoid `Date`/`locale` in server HTML for live clocks.
- **Auth-gated actions**: Converter “Formula / Details” and some sidebar actions open login when unauthenticated.

## Alignment with weight calculator UX

- Same **max width** for converter as defined in `ConverterMain` (`max-w-2xl`) inside the center column → narrow readable column consistent with the reference design.
- **Right panel** provides global context (stats/history) so the **center** stays focused on conversion—same information hierarchy as the mock (hero + tool + quick actions).
