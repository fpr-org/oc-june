/** Build shareable converter URLs with validated query params (relative paths). */

export function buildConverterHref(
  slug: string,
  params: { from?: string; to?: string; value?: string }
): string {
  const search = new URLSearchParams();
  if (params.from) search.set('from', params.from);
  if (params.to) search.set('to', params.to);
  if (params.value !== undefined && params.value !== '') {
    search.set('value', params.value);
  }
  const q = search.toString();
  return q ? `/${slug}?${q}` : `/${slug}`;
}

/** Internal SEO links store `?from=…` strings — normalize to a path. */
export function hrefFromDeepQuery(slug: string, query: string): string {
  const q = query.trim();
  if (!q) return `/${slug}`;
  return q.startsWith('?') ? `/${slug}${q}` : `/${slug}?${q}`;
}
