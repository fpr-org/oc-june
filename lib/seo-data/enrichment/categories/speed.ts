import type { SeoEnrichmentLayer } from '../../types';
import { categoryHref } from '../../internal-routes';

export const speed: SeoEnrichmentLayer = {
  title: 'Speed converter — mph, km/h, m/s, knots',
  description:
    'Compare driving speeds, wind speeds, or physics problems across mph, km/h, meters per second, and knots.',
  intro:
    'Speed is distance over time, but units mash together in awkward ways (miles per hour vs. meters per second). This converter keeps one steady narrative: pick the units you have, read the units you need.',
  references: [
    {
      label: 'NIST: SI speed / velocity context',
      href: 'https://www.nist.gov/pml/owm/metric-si/si-units',
      source: 'NIST',
    },
  ],
  internalDeepLinks: [
    { query: '?from=mph&to=km/h&value=60', label: '60 mph → km/h' },
    { query: '?from=km/h&to=m/s&value=100', label: '100 km/h → m/s' },
    { query: '?from=kn&to=mph&value=10', label: '10 kn → mph' },
  ],
  history:
    'Nautical miles tie to latitude minutes; knots are nm per hour—a marine heritage aviation borrowed. Road speeds stayed mph or km/h depending on empire and metrication waves, not physics differences.',
  formulaHeading: 'Rates of distance per time',
  formula: 'v_target = v_source × (m/s per source unit) / (m/s per target unit)',
  formulaExplanation:
    'Express each speed unit as meters per second (or miles per hour) once, take the ratio, and reuse it. Mixed conversions like knots→mph inherit the nautical mile definition automatically when data is aligned.',
  memoryTips: [
    '1 m/s ≈ 3.6 km/h exactly—useful when lab velocities hit highway intuition.',
    'Knots ≠ mph: maritime briefing numbers aren’t interchangeable with road signs.',
    'Mach varies with air temperature; it is not a fixed mph.',
    'Average speed is total distance ÷ total time—don’t average raw speed readings blindly.',
  ],
  topQueries: [
    { label: '100 kmh to mph', href: `${categoryHref('speed')}?from=km/h&to=mph&value=100`, note: 'Euro car dial ↔ US limits.' },
    { label: 'wind m/s to mph hurricane', href: categoryHref('speed'), note: 'Meteorology unit swaps.' },
    { label: 'knots to kmh boat', href: categoryHref('speed'), note: 'Coastal navigation.' },
    { label: 'speed distance time triangle', href: categoryHref('length'), note: 'Lengths pair with speeds for ETA math.' },
  ],
  extraFaqs: [
    {
      question: 'Why is instantaneous GPS speed jittery?',
      answer:
        'GNSS doppler and sampling intervals introduce noise—smoothing filters in apps trade lag for calm readouts.',
    },
  ],
};
