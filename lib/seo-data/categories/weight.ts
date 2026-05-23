import type { ConverterUiConfig, SEOContent } from '../types';

/** UI config for the live converter (hero art, quick pairings, common units, tips). */
export const weightConverterUi: ConverterUiConfig = {
  defaultFromValue: '500',
  defaultFromUnitId: 'g',
  defaultToUnitId: 'kg',
  tagline: 'Convert between all major weight and mass units with professional accuracy.',
  summaryChainUnitIds: ['mg', 'g', 'kg', 'lb', 'oz'],
  heroVariant: 'weight',
  commonUnitIds: ['mg', 'g', 'kg', 't', 'oz', 'lb', 'st'],
  conversionTips: [
    '1 kg = 2.20462 lb',
    '1 lb = 16 oz = 453.592 g',
    '1 metric ton (t) = 1,000 kg',
    '1 oz = 28.35 g',
    '1 kg = 1,000 g = 1,000,000 mg',
    '1 stone (st) = 14 lb',
  ],
  quickPairings: [
    { from: 'mg', to: 'g', presetFromValue: '1' },
    { from: 'mg', to: 'g', presetFromValue: '100' },
    { from: 'mg', to: 'g', presetFromValue: '1000' },
    { from: 'g', to: 'kg', presetFromValue: '500' },
  ],
};

export const categorySeo: SEOContent = {
  title: "Weight & Mass Converter | kg to lbs, grams to oz",
  description: "Convert kilograms to pounds, grams to ounces, and more. Precise weight converter with formulas and real-world examples.",
  h1: "Weight & Mass Converter",
  intro: "Whether you're cooking, shipping a package, or tracking your fitness, converting weights accurately is essential. This tool supports Metric and Imperial systems for all your mass conversion needs.",
  howTo: {
    title: "How to Convert Weight",
    steps: [
      "Enter the weight value.",
      "Select the 'From' unit (e.g., Kilograms).",
      "Select the 'To' unit (e.g., Pounds).",
      "The conversion is calculated using industry-standard factors."
    ],
    snippet: "To convert Kilograms (kg) to Pounds (lbs), multiply the weight by 2.20462."
  },
  examples: [
    { label: "1 kg", value: "2.20 lbs" },
    { label: "100 g", value: "3.52 oz" },
    { label: "1 lb", value: "16 oz" },
    { label: "1 Tonne", value: "1,000 kg" }
  ],
  faqs: [
    { question: "How many pounds in a kilogram?", answer: "There are approximately 2.20462 pounds in 1 kilogram." },
    { question: "What is the difference between mass and weight?", answer: "Mass is the amount of matter in an object, while weight is the force exerted by gravity on that mass. In everyday usage, they are often used interchangeably." }
  ]
};
