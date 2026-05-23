import type { SeoEnrichmentLayer } from '../../types';
import { categoryHref } from '../../internal-routes';

export const geometry: SeoEnrichmentLayer = {
  title: 'Geometry calculator — areas and simple solids',
  description:
    'Jump between familiar shapes and equations when you’re sketching homework, not rediscovering every formula from scratch.',
  intro:
    'Geometry problems repeat the same handful of patterns—circles, rectangles, triangles, a few solids. Use this page to stay oriented: choose the shape you’re actually working with and keep numbers attached to the right diagram.',
  references: [
    {
      label: 'MIT OpenCourseWare — multivariable calculus & geometry',
      href: 'https://ocw.mit.edu/courses/mathematics/',
      source: 'MIT OCW',
    },
  ],
  internalDeepLinks: [{ query: '?from=circle&to=square&value=5', label: 'Example preset' }],
  history:
    'Euclidean area formulas predate calculus but survive because orthogonal grids dominate construction. π wrapped circles; modern STEM still uses both exact radicals and decimal approximations side by side.',
  formulaHeading: 'Shape-specific relations',
  formula: 'Each tool applies standard relations (e.g., A_circle = πr², A_triangle = ½bh) after units align.',
  formulaExplanation:
    'Geometry is dimensional: squaring radius yields area only after lengths share units. Mixed centimeters and inches on inputs will distort results unless converted first.',
  memoryTips: [
    'Area scales as length²—double sides ⇒ fourfold area.',
    'π is transcendental—keep more digits internally, round only at presentation.',
    'Pythagorean theorem is for right triangles only—verify the angle.',
    'Surface area ≠ volume—check the prompt verb before picking a formula.',
  ],
  topQueries: [
    { label: 'area of circle from diameter', href: categoryHref('geometry'), note: 'Halve D before r² step.' },
    { label: 'surface area rectangular prism', href: categoryHref('geometry'), note: 'Sum opposing face pairs.' },
    { label: 'volume cylinder liters', href: categoryHref('volume'), note: 'Cross-link 3D content.' },
    { label: 'similar triangles ratio', href: categoryHref('algebra'), note: 'Proportions before area scaling.' },
  ],
  extraFaqs: [
    {
      question: 'Why π Button vs 3.14 differs slightly?',
      answer:
        'Calculator constants carry hidden guard digits; manual 3.14 truncates early. Prefer the tool’s π for consistency.',
    },
  ],
};
