import type { SeoEnrichmentLayer } from '../../types';
import { categoryHref } from '../../internal-routes';

export const energy: SeoEnrichmentLayer = {
  title: 'Energy converter — joules, calories, kWh',
  description:
    'Translate joules, kilocalories, and kilowatt-hours for nutrition labels, electricity bills, and physics problems.',
  intro:
    'Energy shows up with different names on food, utilities, and homework. This converter helps you line those names up so comparisons make intuitive sense—like seeing how many joules hide inside a snack or a kilowatt-hour.',
  references: [
    {
      label: 'CODATA / NIST physical constants context',
      href: 'https://physics.nist.gov/cuu/Constants/',
      source: 'NIST',
    },
    { label: 'NIST: SI energy units', href: 'https://www.nist.gov/pml/owm/metric-si/si-units', source: 'NIST' },
  ],
  internalDeepLinks: [
    { query: '?from=kWh&to=J&value=1', label: '1 kWh → joules' },
    { query: '?from=kcal&to=J&value=1', label: '1 kcal → J' },
    { query: '?from=cal&to=J&value=100', label: '100 cal → J' },
  ],
  history:
    'The joule is SI work/energy; a calorie heated water historically; the kilowatt-hour is grid commerce. Nutrition “Calories” on labels are kilocalories—capitalization confusion still trips people up.',
  formulaHeading: 'Same physics, different labels',
  formula: 'E_J = E_source × (joules per labeled unit of source)',
  formulaExplanation:
    'Convert through joules as a hub: calories and kWh are fixed multiples of joules once you pick food vs. thermochemical definitions (tool uses conventional factors).',
  memoryTips: [
    '1 kWh = 3.6 MJ exactly—mental anchor for home electricity.',
    'Food kcal ≠ lab small calorie ×1000 unless label says Calorie with capital C.',
    'BTU still shows up in HVAC—keep specs in one unit through load calcs.',
    'Spring potential energy still needs correct constants—unit swap ≠ physics check.',
  ],
  topQueries: [
    { label: 'kwh to joules bill', href: `${categoryHref('energy')}?from=kWh&to=J&value=1`, note: 'Tariff ↔ SI class problems.' },
    { label: 'calories to joules exercise', href: categoryHref('energy'), note: 'Metabolic estimates.' },
    { label: 'energy divided by time (power intuition)', href: categoryHref('time'), note: 'Pair with duration for average power sketches.' },
    { label: 'nutrition labels kJ vs kcal', href: categoryHref('health'), note: 'Regional packaging differences.' },
  ],
  extraFaqs: [
    {
      question: 'Thermochemical vs international steam table calorie?',
      answer:
        'They differ slightly; nutrition and classroom tools standardize on ~4.184 J per calorie. Use spec sheets when calorimetry precision matters.',
    },
  ],
};
