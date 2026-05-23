import { converterCategories } from '@/lib/units';

/** Absolute internal path for a converter category id, e.g. `/weight-converter`. */
export function categoryHref(categoryId: string): string {
  const c = converterCategories.find((x) => x.id === categoryId);
  return c ? `/${c.slug}` : '/';
}
