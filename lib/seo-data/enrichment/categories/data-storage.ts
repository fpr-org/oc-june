import type { SeoEnrichmentLayer } from '../../types';
import { categoryHref } from '../../internal-routes';

export const dataStorage: SeoEnrichmentLayer = {
  title: 'Data units — MB to GB, KiB, and terabytes',
  description:
    'Move between bytes, KB/MB/GB and binary KiB/MiB/GiB without mixing up marketing labels from real capacities.',
  intro:
    'Storage is confusing because some labels use powers of ten and others powers of two. That’s why a “terabyte” drive and your OS can disagree. This tool separates decimal SI steps from binary IEC steps so you can see both stories clearly.',
  references: [
    {
      label: 'NIST: prefixes for binary multiples',
      href: 'https://www.nist.gov/pml/special-publication-811',
      source: 'NIST',
    },
  ],
  internalDeepLinks: [
    { query: '?from=MB&to=GB&value=500', label: '500 MB → GB' },
    { query: '?from=GiB&to=GB&value=1', label: '1 GiB vs GB' },
    { query: '?from=KB&to=MB&value=1024', label: '1,024 KB → MB' },
  ],
  history:
    'IEC introduced KiB/MiB to disambiguate 1024-multiples from SI marketing GB; operating systems still report GiB-ish numbers while SSD boxes quote decimal TB.',
  formulaHeading: 'Decimal vs binary ladders',
  formula: 'Bytes_target = Bytes_source × (multiplier for source) / (multiplier for target), with independent SI vs IEC ladders.',
  formulaExplanation:
    'Pick whether each step is 1000× (kilo, mega…) or 1024× (kibi, mebi…). Mixing ladders mid-stream is how “missing” drive space appears.',
  memoryTips: [
    'SI GB = 10⁹ bytes; GiB = 2³⁰ bytes—closest marketing “GB” to OS GiB.',
    '1 byte = 8 bits always—don’t mash bit-rate and byte storage without ÷8.',
    'Bandwidth is often bits/sec; storage is bytes—watch prefixes twice.',
    'Excel’s 1024 flag changes display; it doesn’t change marketing math.',
  ],
  topQueries: [
    { label: 'mb to gb file size', href: `${categoryHref('data-storage')}?from=MB&to=GB&value=500`, note: 'Upload limit planning.' },
    { label: 'gib vs gb windows', href: categoryHref('data-storage'), note: 'Why capacities “don’t match”.' },
    { label: 'terabytes to petabytes data center', href: categoryHref('data-storage'), note: 'Capacity ladders.' },
    { label: 'bits per second to megabytes', href: categoryHref('data-storage'), note: 'Remember ÷8 for bytes.' },
  ],
  extraFaqs: [
    {
      question: 'Why do cloud bills use decimal GB?',
      answer:
        'Providers meter stored objects with decimal TB for accounting consistency; kernels may still allocate binary pages underneath.',
    },
  ],
};
