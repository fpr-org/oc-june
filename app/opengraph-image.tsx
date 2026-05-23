import { BRAND_NAME, BRAND_TAGLINE } from '@/lib/brand';
import { createOgImageResponse, OG_SIZE } from '@/lib/seo/og-image';

export const size = OG_SIZE;
export const contentType = 'image/png';

/** Dynamic OG image for `/` — see [Metadata & OG images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images). */
export default async function Image() {
  return createOgImageResponse({
    headline: 'All-in-One Conversion & Math Suite',
    subtitle: BRAND_TAGLINE,
    badge: BRAND_NAME,
  });
}
