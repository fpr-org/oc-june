import { getCategoryBySlug } from '@/lib/units';
import { getCategorySeoContent } from '@/lib/seo-data';
import { BRAND_NAME } from '@/lib/brand';
import { createOgImageResponse, OG_SIZE } from '@/lib/seo/og-image';

export const size = OG_SIZE;
export const contentType = 'image/png';

/** OG image per converter category — headline & subtitle from SEO when present. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categoryData = getCategoryBySlug(slug);

  if (!categoryData) {
    return createOgImageResponse({
      headline: 'Calculator & unit converter',
      subtitle: 'Precise converters and math tools—free, fast, and mobile friendly.',
      badge: BRAND_NAME,
    });
  }

  const seo = getCategorySeoContent(categoryData.id);
  const headline = seo?.title ?? `${categoryData.name} converter`;
  const subtitle =
    seo?.description ??
    `Free online ${categoryData.name.toLowerCase()} converter. Accurate results in your browser.`;

  return createOgImageResponse({
    headline,
    subtitle,
    badge: categoryData.name,
  });
}
