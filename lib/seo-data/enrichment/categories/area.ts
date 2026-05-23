import type { SeoEnrichmentLayer } from '../../types';
import { categoryHref } from '../../internal-routes';

export const area: SeoEnrichmentLayer = {
  title: 'Area converter — m², km², acres, sq ft',
  description:
    'Switch between square meters, hectares, acres, and square feet for land, flooring, or coursework.',
  intro:
    'Area stacks two length conversions, so it’s easy to be off by a factor if you do it in your head. Use this when you’re comparing listings, ordering materials, or checking homework—especially when acres meet metric lots.',
  references: [
    {
      label: 'NIST: SI brochure — area',
      href: 'https://www.nist.gov/pml/special-publication-811',
      source: 'NIST',
    },
    { label: 'Metric definitions (BIPM)', href: 'https://www.bipm.org/en/publications/si-brochure', source: 'BIPM' },
  ],
  internalDeepLinks: [
    { query: '?from=m2&to=sq-ft&value=10', label: '10 m² → sq ft' },
    { query: '?from=ac&to=ha&value=1', label: '1 acre → hectares' },
    { query: '?from=sq-ft&to=m2&value=100', label: '100 sq ft → m²' },
  ],
  history:
    'The acre was originally the area a yoke of oxen could plow in a day; the hectare is a neat metric square of 100 m × 100 m (10⁴ m²). Modern real estate still mixes both families of units worldwide.',
  formulaHeading: 'From lengths to areas',
  formula: 'A = L² for squares; general polygons rely on base × height or triangulation—conversion just scales each squared length factor.',
  formulaExplanation:
    'When you swap units, square the linear conversion ratio: if 1 ft = 0.3048 m, then 1 ft² = (0.3048 m)². Tools hide that squaring so list prices stay comparable.',
  memoryTips: [
    'Always square the length factor—double length does **not** double area.',
    '1 hectare = 2.471 acres—useful when skimming international land listings.',
    '1 km² = 100 ha exactly because metric prefixes stack predictably.',
    'Flooring quotes often use sq ft while CAD uses mm²—watch unit mode before export.',
  ],
  topQueries: [
    { label: 'acre to hectares farmland', href: `${categoryHref('area')}?from=ac&to=ha&value=10`, note: 'Field-scale planning.' },
    { label: 'square feet to square meters home', href: categoryHref('area'), note: 'Renovation and comps.' },
    { label: 'plot size conversion', href: categoryHref('length'), note: 'Verify side lengths first.' },
    { label: 'roofing squares vs sq ft', href: categoryHref('area'), note: 'A US roofing square = 100 sq ft.' },
  ],
  extraFaqs: [
    {
      question: 'Is carpet “square yard” still common?',
      answer:
        'Retail often quotes sq yd; installers may still think in ft². Convert explicitly before comparing bids.',
    },
  ],
};
