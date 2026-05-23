import type { SeoEnrichmentLayer } from '../../types';
import { categoryHref } from '../../internal-routes';

export const health: SeoEnrichmentLayer = {
  title: 'Calorie & energy estimate helper',
  description:
    'Explore BMR, TDEE, and deficit framing in one place when you’re comparing plans—not replacing medical advice.',
  intro:
    'Energy needs vary by person, activity, and season of training. These estimates come from textbook formulas: helpful for ballparks and classroom examples, but always pair numbers with real-world guidance from qualified professionals.',
  references: [
    { label: 'Dietary Guidelines (health.gov)', href: 'https://www.dietaryguidelines.gov/', source: 'USDA / HHS' },
  ],
  internalDeepLinks: [{ query: '?from=bmr&to=tdee&value=1600', label: 'BMR ↔ TDEE example' }],
  history:
    'Harris–Benedict and Mifflin–St Jeor lines descend from early metabolic cart studies; wearables now personalize TDEE but still lean on anthropometric regressions at the core.',
  formulaHeading: 'Empirical regressions, not laws of physics',
  formula: 'BMR ≈ f(sex, age, height, weight); TDEE ≈ BMR × activity factor.',
  formulaExplanation:
    'These are population-fit curves—uncertainty bands ±10–20% are normal. Treat outputs as conversation starters with clinicians or dietitians, not diagnoses.',
  memoryTips: [
    'NEAT (non-exercise activity) swings totals more than people admit—labels are averages.',
    'Muscle raises resting burn modestly; crash cuts often lose lean mass first.',
    'Hydration skews short-term scale readings; trends beat single points.',
    'Pregnancy, illness, and medications override textbook kcal math—seek care.',
  ],
  topQueries: [
    { label: 'tdee calculator weight loss', href: categoryHref('health'), note: 'Deficit framing, not prescriptions.' },
    { label: 'kcal to kj nutrition label EU', href: categoryHref('energy'), note: 'Energy unit translation.' },
    { label: 'body recomposition math', href: categoryHref('percentage'), note: 'Percent change on metrics.' },
    { label: 'training pace zones', href: categoryHref('speed'), note: 'Intensity ties to expenditure indirectly.' },
  ],
  extraFaqs: [
    {
      question: 'Why does my wearable disagree?',
      answer:
        'Algorithms blend heart rate, accelerometer drift, and guessed stride lengths; align devices by trend, not absolute kcal.',
    },
  ],
};
