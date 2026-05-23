import type { SeoEnrichmentLayer } from '../../types';
import { categoryHref } from '../../internal-routes';

export const volume: SeoEnrichmentLayer = {
  title: 'Volume converter — liters, gallons, cups, ml',
  description:
    'Convert liters, milliliters, US gallons, and cups without guesswork. Great for chemistry lab estimates, recipes, or tanks.',
  intro:
    'Liquid and dry “cup” measures trip people up because US and metric labels don’t mean the same thing at every border. This page keeps the math in one place so you can scale recipes or compare container sizes without a notebook.',
  references: [
    {
      label: 'NIST: SI derived units (including volume)',
      href: 'https://www.nist.gov/pml/owm/metric-si/si-units',
      source: 'NIST',
    },
    {
      label: 'Weights & measures — metric equivalents (NIST)',
      href: 'https://www.nist.gov/pml/owm/metric-si',
      source: 'NIST',
    },
  ],
  internalDeepLinks: [
    { query: '?from=l&to=gal&value=1', label: '1 L → US gal' },
    { query: '?from=ml&to=l&value=500', label: '500 ml → L' },
    { query: '?from=cup&to=ml&value=1', label: '1 cup → ml' },
  ],
  history:
    'The liter is tied to the meter cubed in SI, while US customary volume measures (gallon, cup) grew from older wine and grain gallons—hence the stubborn gap between “a gallon” and four liters.',
  formulaHeading: 'Volume as length cubed',
  formula: 'V_target = V_source × (m³ per source unit) / (m³ per target unit)',
  formulaExplanation:
    'Each volume unit is defined as a cube of a linear measure or an agreed liquid volume. Because everything ultimately references the cubic meter, you only need consistent ratios—no offsets.',
  memoryTips: [
    '1 mL = 1 cm³ exactly—swap mental models between liquids and small solids.',
    'US cup ≠ metric cup: recipes need the label’s definition (usually 240 mL for US cup).',
    'UK vs US gallon differ dramatically—never assume “gallon” on a European datasheet.',
    'm³ × 1000 = L—move decimals for thousand-liter tanks instead of re-deriving.',
  ],
  topQueries: [
    { label: 'ml to cups baking', href: `${categoryHref('volume')}?from=ml&to=cup&value=240`, note: 'Check your recipe’s cup size.' },
    { label: 'gallons to liters fuel', href: categoryHref('volume'), note: 'Mind US vs imperial gallon.' },
    { label: 'liters to fluid ounces', href: categoryHref('volume'), note: 'Drink-label comparisons.' },
    { label: 'convert volume and weight', href: categoryHref('weight'), note: 'Use density when crossing mass ↔ volume.' },
  ],
  extraFaqs: [
    {
      question: 'Why does my measuring cup disagree with a scale?',
      answer:
        'Volume tools vary by meniscus reading, temperature, and “cup” definition. For repeatability in baking, weigh ingredients when the author gives grams.',
    },
  ],
};
