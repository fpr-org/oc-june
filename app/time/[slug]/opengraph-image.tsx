import { BRAND_NAME, BRAND_TAGLINE, BRAND_NAME_SHORT } from '@/lib/brand';
import { resolveTimezonePairFromSlug } from '@/lib/seo/resolve-timezone-pair';
import { OG_SIZE, createOgImageResponse } from '@/lib/seo/og-image';

export const alt = `World time preview — ${BRAND_NAME}`;
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pair = resolveTimezonePairFromSlug(slug);

  if (!pair) {
    return createOgImageResponse({
      headline: 'World clock and time zone tools',
      subtitle: BRAND_TAGLINE,
      badge: `${BRAND_NAME_SHORT} · time zones`,
    });
  }

  const { fromUnit, toUnit } = pair;
  return createOgImageResponse({
    headline: `${fromUnit.name} → ${toUnit.name}`,
    subtitle: `Compare local time, UTC offsets, and day or night at a glance. ${BRAND_TAGLINE}`,
    badge: `${fromUnit.symbol} to ${toUnit.symbol}`,
  });
}
