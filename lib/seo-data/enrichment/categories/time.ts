import type { SeoEnrichmentLayer } from '../../types';
import { categoryHref } from '../../internal-routes';

export const time: SeoEnrichmentLayer = {
  title: 'Time converter — seconds, hours, days, weeks',
  description:
    'Convert seconds to minutes, hours to days, and other time steps for scheduling, science, or travel math.',
  intro:
    'We all juggle seconds through years—this page is for when you need exact factors (how many seconds in a day, etc.) without hunting for a calculator. Useful for scripts, estimates, or understanding a lab report’s timings.',
  references: [{ label: 'UTC — U.S. Naval Observatory', href: 'https://www.usno.navy.mil/USNO/time', source: 'USNO' }],
  internalDeepLinks: [
    { query: '?from=h&to=min&value=1', label: '1 hour → minutes' },
    { query: '?from=d&to=h&value=1', label: '1 day → hours' },
    { query: '?from=s&to=ms&value=1', label: '1 s → ms' },
  ],
  history:
    'Universal Time is anchored to atomic clocks (TAI) plus leap-second tweaks to stay near Earth rotation (UTC). Civil calendars add leap days; coding libraries hide that complexity until DST rules surprise deployments.',
  formulaHeading: 'Time unit ladders',
  formula: 't_target = t_source × (seconds in source unit) / (seconds in target unit)',
  formulaExplanation:
    'Once durations are expressed in a common base (seconds), conversions become pure ratios. Weeks vary conceptually by locale start-of-week rules, but SI time units stay deterministic.',
  memoryTips: [
    '86400 s = 1 day—memorize that once for log timestamp arithmetic.',
    'Leap seconds exist; naive epoch math may differ from astronomers’ logs at margins.',
    'Milliseconds overflow int32 ranges—use 64-bit time in systems.',
    '“Business days” are policy, not physics—never infer them from this tool alone.',
  ],
  topQueries: [
    { label: 'seconds in a day exact', href: categoryHref('time'), note: '86400 unless leap-second edge cases.' },
    { label: 'milliseconds to minutes uptime', href: categoryHref('time'), note: 'Ops dashboards.' },
    { label: 'hours to weeks project plan', href: categoryHref('time'), note: 'Duration rollup.' },
    { label: 'world clock time zones', href: categoryHref('timezone'), note: 'Offset math across regions.' },
  ],
  extraFaqs: [
    {
      question: 'Why do some APIs return float seconds?',
      answer:
        'High-resolution monotonic clocks expose sub-millisecond values as floats; persist them as integers (µs/ns) when you need auditability.',
    },
  ],
};
