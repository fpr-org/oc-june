import type { SeoEnrichmentLayer } from '../../types';
import { categoryHref } from '../../internal-routes';

export const math: SeoEnrichmentLayer = {
  title: 'Number bases — decimal, binary, hex, octal',
  description:
    'Convert between decimal, binary, hexadecimal, and octal for programming, electronics, or classwork.',
  intro:
    'Base conversion is a routine step in CS and hardware—think memory addresses, color codes, and bitwise work. This page keeps radix rules explicit so you can spot mistakes early instead of chasing a stray digit.',
  references: [
    {
      label: 'MIT OpenCourseWare — Mathematics courses',
      href: 'https://ocw.mit.edu/courses/mathematics/',
      source: 'MIT OCW',
    },
    {
      label: 'Binary number system (Khan Academy)',
      href: 'https://www.khanacademy.org/computing/computer-science',
      source: 'Khan Academy',
    },
  ],
  internalDeepLinks: [
    { query: '?from=decimal&to=binary&value=255', label: '255 → binary' },
    { query: '?from=hex&to=decimal&value=FF', label: 'FF hex → decimal' },
    { query: '?from=binary&to=hex&value=1111', label: '1111 bin → hex' },
  ],
  history:
    'Positional notation conquered commerce before silicon; binary triumphed because switches are 0/1. Hexadecimal compresses bitstrings for humans—hence the durable #RRGGBB palette.',
  formulaHeading: 'Radix expansion',
  formula: "N = Σ digit_i × base^i ; convert by repeated division (to new base) or Horner's method.",
  formulaExplanation:
    'Integers are polynomials in the base. Converting replays that structure; floating conversion needs separate mantissa handling—stick to integers here unless the UI exposes fractions.',
  memoryTips: [
    'Group binary into nibbles (4 bits) ↔ one hex digit.',
    'Leading zeros change string length, not numeric value.',
    'Two’s complement is **not** radix flip—mind signed representations separately.',
    'Octal is three bits per digit—legacy UNIX permissions still use it.',
  ],
  topQueries: [
    { label: 'hex to rgb color', href: categoryHref('math'), note: 'Component split still needs parsing.' },
    { label: 'binary to decimal quiz', href: categoryHref('math'), note: 'Practice with bookmarks.' },
    { label: 'scientific calculator for logs', href: categoryHref('scientific'), note: 'When exponentials mix bases.' },
    { label: 'percentage of a hex mask', href: categoryHref('percentage'), note: 'Different domain—don’t conflate bitmask math.' },
  ],
  extraFaqs: [
    {
      question: 'Does uppercase hex matter?',
      answer:
        'Not numerically; style guides pick consistency. Parsers accept A-F case-insensitively.',
    },
  ],
};
