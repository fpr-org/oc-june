import type { ConverterUiConfig, SEOContent } from '../types';

export const percentageConverterUi: ConverterUiConfig = {
  defaultFromValue: '100',
  defaultFromUnitId: 'value',
  defaultToUnitId: 'increase',
  tagline:
    'Work with raw values, percent change, and percent difference—ideal for finance, retail, and homework.',
  heroVariant: 'icon',
  showSlider: false,
  commonUnitIds: ['value', 'increase', 'decrease'],
  conversionTips: [
    'To find X% of Y: multiply Y by (X / 100).',
    'Percent increase: (new − old) / old × 100.',
    'Percent decrease: (old − new) / old × 100.',
    'A “percentage point” is the simple difference between two percentages.',
  ],
  quickPairings: [
    { from: 'value', to: 'increase', presetFromValue: '100' },
    { from: 'value', to: 'decrease', presetFromValue: '50' },
    { from: 'increase', to: 'value', presetFromValue: '120' },
    { from: 'decrease', to: 'value', presetFromValue: '80' },
  ],
};

export const categorySeo: SEOContent = {
  title: "Percentage Calculator | Find Percent Increase & Decrease",
  description: "Free online percentage calculator. Calculate percentages of values, percent changes, and differences between two numbers.",
  h1: "Percentage Calculator",
  intro: "From calculating tips to analyzing financial growth, percentages are everywhere. Our tool helps you find values, increases, decreases, and fractions expressed as percentages quickly.",
  howTo: {
    title: "How to Calculate Percentages",
    steps: [
      "Select the type of calculation (Value, Increase, or Decrease).",
      "Enter the initial amount and the percentage or final amount.",
      "The result is displayed instantly with the relevant formula shown.",
      "Copy the result for your documents or reports."
    ],
    snippet: "To find X% of Y, the formula is: (X / 100) * Y."
  },
  examples: [
    { label: "15% of $80", value: "$12.00" },
    { label: "20% Increase on 100", value: "120" },
    { label: "Fraction 1/4", value: "25%" },
    { label: "Growth from 50 to 75", value: "50% Increase" }
  ],
  faqs: [
    { question: "How do I calculate a percent increase?", answer: "Subtract the original value from the new value, divide by the original value, and multiply by 100." },
    { question: "What is percentage point vs percent?", answer: "A percentage point is the simple numerical difference between two percentages, while percent refers to the relative change." }
  ]
};
