import type { SeoEnrichmentLayer } from '../../types';
import { categoryHref } from '../../internal-routes';

export const tax: SeoEnrichmentLayer = {
  title: 'Sales tax, VAT, and margin thinking',
  description:
    'Keep tax-in and tax-out arithmetic straight when you’re pricing, shopping, or running through examples.',
  intro:
    'Retail math is full of “plus tax” vs “including tax” surprises. This flow separates the mental steps so you can verify a receipt, a homework problem, or a rough margin without losing the thread mid-percent.',
  references: [
    {
      label: 'Federal Trade Commission — consumer information',
      href: 'https://www.consumer.ftc.gov/',
      source: 'FTC',
    },
  ],
  internalDeepLinks: [{ query: '?from=vat&to=discount&value=100', label: 'VAT ↔ discount example' }],
  history:
    'VAT chains credit upstream tax; US sales tax often applies only at retail and varies by jurisdiction. Margin and markup percentages differ because denominators differ—POS software rarely explains which one you asked for.',
  formulaHeading: 'Tax-exclusive vs tax-inclusive price',
  formula: 'P_incl = P_excl × (1 + t); P_excl = P_incl / (1 + t), where t is the decimal rate.',
  formulaExplanation:
    'Removing tax is **division**, not subtracting the percentage of the inclusive price—classic receipt dispute territory.',
  memoryTips: [
    '100+ tax% mentally: $50 + 8% = $54, but removing 8% from $54 ≠ $50 if you subtract naïvely.',
    'B2B VAT reclaimability is policy—math doesn’t prove eligibility.',
    'Rounding per line vs per invoice differs—accounting policy matters.',
    'Margins use selling price denominators; markups use cost—never swap quietly.',
  ],
  topQueries: [
    { label: 'vat exclusive to inclusive', href: categoryHref('tax'), note: 'Invert with division carefully.' },
    { label: 'sales tax by zip complexity', href: categoryHref('tax'), note: 'Tool shows math, not filing advice.' },
    { label: 'discount then tax ordering', href: categoryHref('percentage'), note: 'POS sequence changes totals.' },
    { label: 'invoice margin vs markup', href: categoryHref('finance'), note: 'Business literacy pairing.' },
  ],
  extraFaqs: [
    {
      question: 'Is this legal tax advice?',
      answer:
        'No—pure arithmetic illustration. Consult professionals for compliance.',
    },
  ],
};
