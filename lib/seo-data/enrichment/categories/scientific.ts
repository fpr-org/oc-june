import type { SeoEnrichmentLayer } from '../../types';
import { categoryHref } from '../../internal-routes';

export const scientific: SeoEnrichmentLayer = {
  title: 'Scientific calculator modes — standard vs scientific',
  description:
    'Open the layout tuned for quick arithmetic or log/trig heavy work—right in the browser when a physical device isn’t handy.',
  intro:
    'Long assignments and labs are easier when the right keys are one layer away. Switch modes here when homework jumps from basic sums to exponentials or trig—and keep the same calculator habits you use on paper.',
  references: [
    {
      label: 'MIT OpenCourseWare — single-variable calculus',
      href: 'https://ocw.mit.edu/courses/mathematics/',
      source: 'MIT OCW',
    },
  ],
  internalDeepLinks: [{ query: '?from=basic&to=advanced&value=1', label: 'Basic → scientific' }],
  history:
    'Slide rules gave engineers log-add superpowers until pocket scientific calculators arrived; browsers now host those functions so every student has instant access—yet Radians vs Degrees mistakes persist unchanged.',
  formulaHeading: 'Modes, domains, and guardrails',
  formula: 'Scientific functions obey IEEE-style ranges: sin/cos on angles, log only on positive reals unless complex mode exists.',
  formulaExplanation:
    'The **calculator** applies textbook definitions; the **user** must set degree/radian mode and watch argument domains (e.g., log x requires x>0 in real mode).',
  memoryTips: [
    'RAD vs DEG is the #1 silent error—check the annunciator before grading.',
    'Use parentheses around denominators when chaining fractions on one line.',
    'Scientific notation caps significant figures—formatting ≠ precision.',
    'ln vs log₁₀: know which your syllabus assumes before exam day.',
  ],
  topQueries: [
    { label: 'online scientific calculator free', href: categoryHref('scientific'), note: 'No install classroom use.' },
    { label: 'trig radians practice', href: categoryHref('trigonometry'), note: 'Companion trig tool route.' },
    { label: 'log rules refresh', href: categoryHref('algebra'), note: 'Algebra support when manipulating exponents.' },
    { label: 'percent change after logarithmic score', href: categoryHref('percentage'), note: 'Separate layer from trig.' },
  ],
  extraFaqs: [
    {
      question: 'Why does sin⁻¹(1.1) error?',
      answer:
        'Real arcsine domain is [−1, 1]. Results outside that aren’t typos—they signal wrong mode or expectations.',
    },
  ],
};
