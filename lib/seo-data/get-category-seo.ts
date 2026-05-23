import type { SEOContent, SeoEnrichmentLayer } from './types';
import { categorySEOData } from './index';
import { categorySeoEnrichment } from './enrichment';

/** Full SEO record: base category copy plus enrichment (references, deep links, rich blocks). */
export function getCategorySeoContent(categoryId: string): SEOContent | undefined {
  const base = categorySEOData[categoryId];
  if (!base) return undefined;
  const raw = categorySeoEnrichment[categoryId] as SeoEnrichmentLayer | undefined;
  if (!raw) return base;

  const { extraFaqs, faqs: enrichmentFaqs, ...rest } = raw;
  let faqs = base.faqs;
  if (enrichmentFaqs != null) faqs = enrichmentFaqs;
  else if (extraFaqs?.length) faqs = [...base.faqs, ...extraFaqs];

  return { ...base, ...rest, faqs };
}
