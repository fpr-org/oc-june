import type { SeoEnrichmentLayer } from '../../types';
import { categoryHref } from '../../internal-routes';

export const temperature: SeoEnrichmentLayer = {
  title: 'Temperature converter — °C, °F, and kelvin',
  description:
    'Move between Celsius, Fahrenheit, and kelvin the way weather apps and lab reports expect—with the right offsets, not ratios.',
  intro:
    'Temperature isn’t “multiply like length” — scales use offsets (and kelvin starts at absolute zero). If you’ve ever double-checked a fever or a furnace setting, you know small mistakes matter. This tool applies the standard formulas so you don’t have to remember which way the 32 goes.',
  references: [
    {
      label: 'NIST: SI temperature (kelvin)',
      href: 'https://www.nist.gov/pml/owm/metric-si/si-units',
      source: 'NIST',
    },
    {
      label: 'BIPM: SI brochure (thermodynamic temperature)',
      href: 'https://www.bipm.org/en/publications/si-brochure',
      source: 'BIPM',
    },
  ],
  internalDeepLinks: [
    { query: '?from=C&to=F&value=0', label: '0 °C → °F' },
    { query: '?from=C&to=F&value=100', label: '100 °C → °F' },
    { query: '?from=F&to=C&value=32', label: '32 °F → °C' },
  ],
  history:
    'Celsius originally ran opposite to today’s direction; Fahrenheit anchored to brine and body temperature anecdotes. Kelvin starts where thermal motion hits zero—making it the natural scale for science even when humans still read °C or °F.',
  formulaHeading: 'Affine transforms between scales',
  formula:
    '°F = °C×(9/5)+32; °C = (°F−32)×(5/9); K = °C + 273.15',
  formulaExplanation:
    'Celsius and Fahrenheit are offset linear images of each other, not proportional like kilograms. Kelvin shares Celsius-sized steps but zeroes at absolute zero, so it never uses offsets with Fahrenheit directly—convert through °C.',
  memoryTips: [
    'Never multiply Celsius by 2 to get Fahrenheit—that skips the +32 offset except at −40°.',
    'Kelvin is always above 0 K; negative kelvins don’t mean “colder than absolute zero” in classical thermodynamics.',
    'Δ1 °C = Δ1 K for differences—physics problems love that shortcut.',
    'Body temperature 37 °C ≈ 98.6 °F—spot-check mental conversions with that anchor.',
  ],
  topQueries: [
    { label: 'celsius to fahrenheit oven', href: `${categoryHref('temperature')}?from=C&to=F&value=180`, note: 'Air-fryer + baking presets.' },
    { label: 'kelvin to celsius lab', href: categoryHref('temperature'), note: 'Cryogenics and simulations.' },
    { label: 'how to convert f to c quickly', href: categoryHref('temperature'), note: 'Accurate, not rounded hacks.' },
    { label: 'temperature and energy units', href: categoryHref('energy'), note: 'Heat capacity ties back to kelvin.' },
  ],
  extraFaqs: [
    {
      question: 'Why do weather apps differ by 1° sometimes?',
      answer:
        'Rounding, sensor placement, and model grids differ. Conversion math is deterministic; meteorological storytelling is not.',
    },
  ],
};
