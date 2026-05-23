import type { ConverterUiConfig, SEOContent } from '../types';

export const energyConverterUi: ConverterUiConfig = {
  defaultFromValue: '1',
  defaultFromUnitId: 'kWh',
  defaultToUnitId: 'J',
  tagline:
    'Convert joules, calories, and kilowatt-hours for physics, nutrition, and utility bills.',
  summaryChainUnitIds: ['J', 'kcal', 'kWh', 'cal'],
  heroVariant: 'icon',
  commonUnitIds: ['J', 'kJ', 'cal', 'kcal', 'Wh', 'kWh', 'eV'],
  conversionTips: [
    '1 cal = 4.184 J (thermochemical)',
    '1 kWh = 3.6 MJ',
    '1 dietary Calorie (kcal) = 1,000 cal',
  ],
  quickPairings: [
    { from: 'kWh', to: 'J', presetFromValue: '1' },
    { from: 'kcal', to: 'J', presetFromValue: '100' },
    { from: 'J', to: 'cal', presetFromValue: '4184' },
    { from: 'Wh', to: 'J', presetFromValue: '1000' },
  ],
};

export const categorySeo: SEOContent = {
  title: "Energy Converter | Joules to Calories, kWh to BTU",
  description: "Convert energy units including Joules, Calories, Kilowatt-hours, and BTU. Professional energy calculator for nutrition and physics.",
  h1: "Energy Converter",
  intro: "From the calories in your food to the kilowatt-hours on your electric bill, energy measurement takes many forms. Our converter bridges the gap between thermal, electrical, and mechanical energy units.",
  howTo: {
    title: "How to Convert Energy",
    steps: [
      "Pick your starting energy unit.",
      "Enter the value.",
      "Select the target unit (e.g., Joules).",
      "The result is calculated using thermodynamic constants."
    ],
    snippet: "To convert Calories (kcal) to Joules, multiply by 4,184."
  },
  examples: [
    { label: "1 Calorie (kcal)", value: "4,184 Joules" },
    { label: "1 kWh", value: "3.6 Million Joules" },
    { label: "1 BTU", value: "1,055 Joules" },
    { label: "1 eV", value: "1.6 x 10^-19 Joules" }
  ],
  faqs: [
    { question: "What is the difference between small and large calories?", answer: "A 'small calorie' is the amount of energy to heat 1g of water. A 'large calorie' (kcal) used in nutrition is 1,000 small calories." },
    { question: "How many BTU in a kWh?", answer: "There are approximately 3,412.14 BTU in 1 Kilowatt-hour." }
  ]
};
