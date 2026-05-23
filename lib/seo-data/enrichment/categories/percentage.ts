import type { SeoEnrichmentLayer } from '../../types';
import { categoryHref } from '../../internal-routes';

export const percentage: SeoEnrichmentLayer = {
  title: 'Percentage calculator — quick percent change math',
  description:
    'Work through common percent problems—of a number, increase, or decrease—without digging for formulas.',
  intro:
    'Percent shows up in discounts, tips, grades, and growth rates. Instead of memorizing three slightly different setups, let the tool hold the structure while you plug in the numbers that match your situation.',
  references: [
    {
      label: 'Statistics and probability topics (Khan Academy)',
      href: 'https://www.khanacademy.org/math/statistics-probability',
      source: 'Khan Academy',
    },
  ],
  internalDeepLinks: [
    { query: '?from=value&to=increase&value=100', label: 'Start at 100 (value mode)' },
    { query: '?from=value&to=decrease&value=50', label: '50 with change modes' },
  ],
  history:
    'Percent (“per hundred”) stabilized commercial arithmetic before spreadsheets; basis-point language extends the same idea for finance. Modern analytics still abuses percentage change wording—always verify numerator and denominator.',
  formulaHeading: 'Parts per hundred',
  formula: 'p% of x = x × (p/100); relative change = (new−old)/old × 100%.',
  formulaExplanation:
    '“Of” means multiply after turning percent into a decimal; “increase by p%” multiplies the original by (1+p/100), not add p naively to the tail.',
  memoryTips: [
    '100% increase doubles; 50% increase multiplies by 1.5—sketch before trusting headlines.',
    'Percentage points differ from percent change when comparing rates.',
    'Stacked discounts aren’t additive—compound sequentially or you overshoot savings.',
    'Tip math often uses 1 decimal then round to nearest cent—financial rules apply.',
  ],
  topQueries: [
    { label: 'percent increase year over year', href: categoryHref('percentage'), note: 'Clarify old vs new baseline.' },
    { label: 'what is 15 percent tip', href: categoryHref('percentage'), note: 'Restaurant quick math.' },
    { label: 'margin vs markup percent', href: categoryHref('tax'), note: 'Commerce vocabulary differs.' },
    { label: 'percentage word problems with shapes', href: categoryHref('geometry'), note: 'Mix ratios with geometry context.' },
  ],
  extraFaqs: [
    {
      question: 'Why is −50% then +50% not zero change?',
      answer:
        'Percents aren’t symmetric around a peak unless you track the same reference value; use absolute values when auditing swings.',
    },
  ],
};
