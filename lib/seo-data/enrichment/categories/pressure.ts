import type { SeoEnrichmentLayer } from '../../types';
import { categoryHref } from '../../internal-routes';

export const pressure: SeoEnrichmentLayer = {
  title: 'Pressure converter — PSI, bar, kPa, atm',
  description:
    'Switch between pascals, bar, psi, and atmospheres for tires, weather, or lab reports.',
  intro:
    'Pressure units are famously inconsistent across countries and industries. If you’re translating gauge readings or comparing datasheets, use one trusted pass through the math instead of multiple rough conversions.',
  references: [
    {
      label: 'NIST: SI pressure (pascal)',
      href: 'https://www.nist.gov/pml/owm/metric-si/si-units',
      source: 'NIST',
    },
  ],
  internalDeepLinks: [
    { query: '?from=psi&to=bar&value=32', label: '32 psi → bar' },
    { query: '?from=atm&to=kpa&value=1', label: '1 atm → kPa' },
    { query: '?from=bar&to=psi&value=1', label: '1 bar → psi' },
  ],
  history:
    'The pascal is one newton per square meter; the atmosphere approximates mean sea-level air pressure; bar is 100 kPa by definition. Tire PSI persists in North America even where metric dominates elsewhere.',
  formulaHeading: 'Force spread over area',
  formula: 'P_target = P_source × (Pa per source unit) / (Pa per target unit)',
  formulaExplanation:
    'All engineering pressures normalize to pascals the way masses normalize to kilograms. Gauge vs absolute adds offsets in application, not in pure unit algebra—the tool converts unit scales.',
  memoryTips: [
    '1 bar ≈ atmospheric pressure at sea level—quick sanity on bar readings.',
    'PSI gauge + 14.7 ≠ absolute unless you know local atm—use instrumentation docs.',
    'kPa on weather maps differs from tire gauge—you still convert the number faithfully.',
    'Depth adds hydrostatic pressure—this page swaps units only, not fluid models.',
  ],
  topQueries: [
    { label: 'psi to bar tire pressure', href: `${categoryHref('pressure')}?from=psi&to=bar&value=35`, note: 'Cold inflation specs.' },
    { label: 'kpa to psi boost', href: categoryHref('pressure'), note: 'Turbo maps.' },
    { label: 'atmosphere to pascal lab', href: categoryHref('pressure'), note: 'Vacuum chambers vs STP stories.' },
    { label: 'volume and pressure ideal gas', href: categoryHref('volume'), note: 'Pair with temperature for gas law intuition.' },
  ],
  extraFaqs: [
    {
      question: 'Do I use gauge or absolute here?',
      answer:
        'This converter translates numeric pressure units. Gauge vs absolute is a physical modeling choice—subtract or add local atmospheric pressure in your engineering step after converting units.',
    },
  ],
};
