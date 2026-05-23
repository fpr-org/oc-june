import type { SeoEnrichmentLayer } from '../../types';
import { categoryHref } from '../../internal-routes';

export const weight: SeoEnrichmentLayer = {
  title: 'Weight converter — kg to lb, grams to ounces',
  description:
    'Switch between kilograms, pounds, ounces, and grams in a few taps. Handy for recipes, shipping labels, or the gym—no spreadsheet required.',
  intro:
    'Cooking, postage, or workouts: you often need the same weight in different units. This converter uses conventional conversion factors so you can trust the numbers for everyday use. Bookmark a link with your favorite units in the address bar and come back anytime.',
  references: [
    {
      label: 'Guide to the SI — metric mass (BIPM)',
      href: 'https://www.bipm.org/en/publications/si-brochure',
      source: 'BIPM',
    },
    {
      label: 'NIST: SI units and prefixes',
      href: 'https://www.nist.gov/pml/owm/metric-si/si-units',
      source: 'NIST',
    },
  ],
  internalDeepLinks: [
    { query: '?from=kg&to=lb&value=1', label: '1 kg → lb' },
    { query: '?from=g&to=oz&value=100', label: '100 g → oz' },
    { query: '?from=lb&to=kg&value=5', label: '5 lb → kg' },
  ],
  history:
    'The kilogram was redefined in 2019 against Planck’s constant so mass stays tied to immutable physics, while the avoirdupois pound remains exactly 0.45359237 kg by international agreement. Day-to-day conversions still use those fixed ratios.',
  formulaHeading: 'How mass conversions work',
  formula: 'mass_target = mass_source × (definition of source unit in kg) / (definition of target unit in kg)',
  formulaExplanation:
    'Every unit here is expressed as a fixed fraction of the kilogram (or of the pound where imperial applies). Multiplying by the ratio of those fractions cancels units cleanly and avoids rounding drift from chained guesses.',
  memoryTips: [
    'A kilogram is heavier than a pound—about 2.2 lb—so sanity-check: kg → lb should grow the number.',
    'Ounces split two ways: avoirdupois (oz) for general weight vs troy for precious metals—stick to context.',
    '1 kg = 1000 g exactly; slide decimals instead of retyping when you only need powers of ten.',
    'Stone (14 lb) still appears in UK body weight—convert stone→lb first if the tool shows stones.',
  ],
  topQueries: [
    { label: 'convert kg to lbs fast', href: categoryHref('weight'), note: 'Use this page; share ?from=&to= links.' },
    { label: 'ounces to grams baking', href: `${categoryHref('weight')}?from=oz&to=g&value=1`, note: 'Pre-set units for recipes.' },
    { label: 'shipping weight kg to lb', href: `${categoryHref('weight')}?from=kg&to=lb&value=1`, note: 'Parcel math without Excel.' },
    { label: 'how many grams in a pound', href: categoryHref('weight'), note: '453.592 g — verify interactively.' },
    { label: 'grams per liter density check', href: categoryHref('volume'), note: 'Pair mass ↔ volume via context.' },
  ],
  extraFaqs: [
    {
      question: 'Why does my kitchen scale disagree slightly?',
      answer:
        'Consumer scales round and drift; legal-for-trade scales follow stricter classes. For practical cooking, round to the nearest gram unless the recipe is finicky.',
    },
    {
      question: 'Do I divide or multiply going lb → kg?',
      answer:
        'Multiply pounds by 0.45359237 (or divide by the reciprocal going the other way). The tool chooses the factor so you never flip the ratio by hand.',
    },
    {
      question: 'Are metric tons and US tons the same?',
      answer:
        'No—a metric tonne is 1000 kg; a US short ton is 2000 lb (~907 kg). Always check which “ton” your document means.',
    },
  ],
};
