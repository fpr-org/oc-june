import type { Category } from '@/lib/units';

function pick(v: string | string[] | undefined): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v;
}

/** Accept `value=` for numeric categories; relaxed rules for math (hex, bases). */
function sanitizeValue(raw: string | undefined, categoryId: string): string | undefined {
  if (raw === undefined) return undefined;
  const t = raw.trim();
  if (t.length === 0 || t.length > 56) return undefined;

  if (categoryId === 'math') {
    if (/^[0-9A-Fa-f.xXeE+-]+$/i.test(t) || /^[0-7]+$/.test(t)) return t;
    if (/^-?\d*\.?\d*(e[+-]?\d+)?$/i.test(t)) return t;
    return undefined;
  }

  if (/^-?\d*\.?\d*(e[+-]?\d+)?$/i.test(t)) return t;
  return undefined;
}

/**
 * Parse `?from=&to=&value=` for converter routes. Only returns IDs that exist on the category.
 */
export function parseConverterSearchParams(
  raw: Record<string, string | string[] | undefined>,
  category: Category
): { from?: string; to?: string; value?: string } {
  const fromQ = pick(raw.from);
  const toQ = pick(raw.to);
  const valueQ = pick(raw.value);

  const from = fromQ && category.units.some((u) => u.id === fromQ) ? fromQ : undefined;
  const to = toQ && category.units.some((u) => u.id === toQ) ? toQ : undefined;
  const value = sanitizeValue(valueQ, category.id);

  return { from, to, value };
}
