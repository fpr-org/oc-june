import type { SeoEnrichmentLayer } from '../../types';
import { categoryHref } from '../../internal-routes';

export const timezone: SeoEnrichmentLayer = {
  title: 'World time zones — compare cities fairly',
  description:
    'Translate a clock time across major regions when you’re scheduling calls, flights, or broadcasts.',
  intro:
    'Time zones are political as much as scientific—offsets move with policy and daylight saving. Use this as a planning layer: pick two regions, read the shifted time, then confirm critical meetings with an official clock or calendar invite.',
  references: [
    {
      label: 'Time zones — U.S. Naval Observatory',
      href: 'https://www.usno.navy.mil/USNO/time',
      source: 'USNO',
    },
    {
      label: 'Coordinated Universal Time (National Institute of Standards and Technology)',
      href: 'https://www.nist.gov/pml/time-and-frequency-division',
      source: 'NIST',
    },
  ],
  internalDeepLinks: [
    { query: '?from=utc&to=india&value=12', label: '12:00 UTC → India' },
    { query: '?from=usa-eastern&to=united-kingdom&value=9', label: 'US Eastern → UK' },
  ],
  history:
    'UTC succeeded GMT as coordination backbone; IANA tzdb tracks region rules that legislatures change. Leap seconds and DST boundaries are why **textbook offset math** still needs live data in production systems.',
  formulaHeading: 'Offset arithmetic on civil clocks',
  formula: 't_b = t_a + (offset_b − offset_a), with DST resolved per date and zone database.',
  formulaExplanation:
    'Offsets aren’t constants—winter vs summer civil times differ. Tools must anchor a calendar date before shifting; bare +/-N hours is folklore.',
  memoryTips: [
    'Always specify “which Tuesday” crossing DST—1:30 may not exist or repeats twice.',
    'Flight itineraries list local legs; mental UTC conversion reduces missed connections.',
    'Video calls need organizer’s master invite, not mental math alone.',
    'Historical dates prestandard timezones confuse genealogists—cite sources.',
  ],
  topQueries: [
    { label: 'utc to ist meeting', href: categoryHref('timezone'), note: 'Plan then confirm invite.' },
    { label: 'est to gmt daylight saving', href: categoryHref('timezone'), note: 'Summer vs winter answers differ.' },
    { label: 'how many hours spain vs new york', href: categoryHref('timezone'), note: 'Offsets are route-specific.' },
    { label: 'epoch seconds to local', href: categoryHref('time'), note: 'Combine duration and zone context.' },
  ],
  extraFaqs: [
    {
      question: 'Why did my meeting shift an hour overnight?',
      answer:
        'DST cutovers—recurring calendar rules often handle them, ad-hoc math does not.',
    },
  ],
};
