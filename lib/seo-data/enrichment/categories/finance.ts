import type { SeoEnrichmentLayer } from '../../types';
import { categoryHref } from '../../internal-routes';

export const finance: SeoEnrichmentLayer = {
  title: 'Loan & interest framing calculator',
  description:
    'Line up principal, rates, and terms when you’re comparing loan shapes or studying interest in class.',
  intro:
    'Finance calculators simplify the bookkeeping of growth and repayment—they don’t know your lender’s fees or tax situation. Treat outputs as structured sketches you can explain to a teacher, advisor, or future you.',
  references: [
    {
      label: 'Federal Reserve — consumer finance education hub',
      href: 'https://www.federalreserveeducation.org/',
      source: 'Federal Reserve Education',
    },
  ],
  internalDeepLinks: [{ query: '?from=loan&to=mortgage&value=20000', label: 'Loan vs mortgage modes' }],
  history:
    'Compound interest predates double-entry accounting; APR disclosure rules arrived after consumers misread nominal vs effective rates. Amortization schedules standardize payment splits into principal vs interest over time.',
  formulaHeading: 'Time value of money',
  formula:
    'FV = PV(1+r)^n for compounding; annuity PV/PMT formulas for equal payments—inputs must share compounding period with r.',
  formulaExplanation:
    'Rate and period must match: monthly rate with months, annual with years. Mixing cadence is the dominant spreadsheet bug; this tool expects consistent conventions per mode.',
  memoryTips: [
    'APR ≠ APY unless compounding annual—compare like with like.',
    'Extra principal payments shorten tenor nonlinearly—graphs beat guesswork.',
    'Nominal “0%” promos may hide fees—read cash price vs financed price.',
    'Inflation-adjust “real” returns when horizons span years.',
  ],
  topQueries: [
    { label: 'loan amortization monthly payment', href: categoryHref('finance'), note: 'Verify compounding cadence.' },
    { label: 'sales tax on financed amount', href: categoryHref('tax'), note: 'Tax interaction with principal.' },
    { label: 'percent return annualized', href: categoryHref('percentage'), note: 'CAGR intuition.' },
    { label: 'percent vs annual interest wording', href: categoryHref('percentage'), note: 'Separate vocabulary from loan modes.' },
  ],
  extraFaqs: [
    {
      question: 'Does this include origination fees?',
      answer:
        'Unless a mode explicitly models fees, treat the calculator as tuition for structure—pull legal disclosures for offers.',
    },
  ],
};
