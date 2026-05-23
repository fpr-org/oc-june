import type { SeoEnrichmentLayer } from '../../types';
import { categoryHref } from '../../internal-routes';

export const length: SeoEnrichmentLayer = {
  title: 'Length converter — inches, cm, feet, meters, miles',
  description:
    'Turn inches into centimeters, miles into kilometers, and more. Clear results whether you’re fixing something at home or planning a trip.',
  intro:
    'Metric and imperial length units don’t line up neatly—that’s why a dedicated tool beats mental math. Use it for DIY, travel, or school: pick “from,” type a value, and read the “to” side. The inch–centimeter relationship is fixed internationally, so conversions stay consistent.',
  references: [
    {
      label: 'The International System of Units (SI brochure)',
      href: 'https://www.bipm.org/en/publications/si-brochure',
      source: 'BIPM',
    },
    {
      label: 'NIST: Guide for the use of SI units',
      href: 'https://www.nist.gov/pml/special-publication-811',
      source: 'NIST',
    },
  ],
  internalDeepLinks: [
    { query: '?from=cm&to=in&value=2.54', label: '1 inch in cm' },
    { query: '?from=m&to=ft&value=1', label: '1 m → feet' },
    { query: '?from=mi&to=km&value=1', label: '1 mile → km' },
  ],
  history:
    'The meter is now defined by the speed of light; the inch is exactly 25.4 mm by definition since 1959. That single inch definition is why ruler conversions no longer “wander” the way old trade bar-yards did.',
  formulaHeading: 'Linear distance conversion',
  formula: 'L_target = L_source × (meters per source unit) / (meters per target unit)',
  formulaExplanation:
    'Length units are pure ratios—no temperature-style offsets. Express both units as fractions of the meter, divide, and you get one multiplier you can reuse for the whole project.',
  memoryTips: [
    '2.54 cm = 1 in exactly—memorize that and you can audit screen rulers quickly.',
    '1 m ≈ 3.28 ft, not 3 ft—many DIY errors come from truncating that factor.',
    'A mile is ~1.609 km; doubling mph≠km/h mentally needs that factor, not +60%.',
    'Nautical miles relate to arc on Earth; don’t swap them for statute miles in road math.',
  ],
  topQueries: [
    { label: 'cm to inches for monitor size', href: `${categoryHref('length')}?from=cm&to=in&value=27`, note: 'Fill your diagonal once, iterate.' },
    { label: 'feet to meters room size', href: categoryHref('length'), note: 'Swap ft ↔ m for floor plans.' },
    { label: 'km to miles running pace', href: `${categoryHref('length')}?from=km&to=mi&value=5`, note: 'Race distance crossover.' },
    { label: 'mm to inches machining', href: categoryHref('length'), note: 'Tolerance-friendly precision.' },
    { label: 'compare with area converter', href: categoryHref('area'), note: 'Square dimensions for flooring.' },
  ],
  extraFaqs: [
    {
      question: 'Why do CAD apps show tiny mm errors after inch export?',
      answer:
        'Floating-point rounding and feature settings can introduce micro gaps. For fabrication tolerances, round consistently and keep the authoritative unit in one system through the whole drawing.',
    },
    {
      question: 'Is a US survey foot still different?',
      answer:
        'Historic surveying in the US used a slightly longer foot; modern definitions standardized the international inch. Use project metadata when digitizing old plats.',
    },
  ],
};
