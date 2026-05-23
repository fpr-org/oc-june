import { getCategoryById } from '@/lib/units';

export function resolveTimezonePairFromSlug(slug: string) {
  const tzCategory = getCategoryById('timezone');
  if (!tzCategory) return null;
  const parts = slug.split('-to-');
  if (parts.length !== 2) return null;
  const fromSlug = parts[0];
  const toSlug = parts[1];
  const fromUnit = tzCategory.units.find(
    (u) => u.id === fromSlug || u.symbol.toLowerCase() === fromSlug
  );
  const toUnit = tzCategory.units.find(
    (u) => u.id === toSlug || u.symbol.toLowerCase() === toSlug
  );
  if (!fromUnit || !toUnit) return null;
  return { tzCategory, fromUnit, toUnit };
}
