import type { ConverterUiConfig, SEOContent } from '../types';

export const lengthConverterUi: ConverterUiConfig = {
  defaultFromValue: '100',
  defaultFromUnitId: 'cm',
  defaultToUnitId: 'm',
  tagline:
    'Switch between metric and imperial length units with accurate, internationally defined conversion factors.',
  summaryChainUnitIds: ['mm', 'cm', 'm', 'in', 'ft'],
  heroVariant: 'icon',
  commonUnitIds: ['mm', 'cm', 'm', 'km', 'in', 'ft', 'yd', 'mi'],
  conversionTips: [
    '1 inch = 2.54 cm (exact)',
    '1 meter ≈ 3.28084 feet',
    '1 mile ≈ 1.60934 km',
    '1 yard = 3 feet = 36 inches',
  ],
  quickPairings: [
    { from: 'cm', to: 'in', presetFromValue: '2.54' },
    { from: 'm', to: 'ft', presetFromValue: '1' },
    { from: 'km', to: 'mi', presetFromValue: '1' },
    { from: 'in', to: 'cm', presetFromValue: '12' },
  ],
};

export const categorySeo: SEOContent = {
  title: "Length Converter | cm to inches, meters to feet",
  description: "Convert length and distance units including centimeters, inches, meters, feet, and miles. Accurate tool for construction and travel.",
  h1: "Length & Distance Converter",
  intro: "From millimeters to miles, our length converter handles every scale. Whether you're a DIY enthusiast measuring a room or a traveler calculating distance, we provide precise conversions between Metric and Imperial systems.",
  howTo: {
    title: "How to Convert Length",
    steps: [
      "Pick your input unit (e.g., Inches).",
      "Enter the numeric value.",
      "Choose your output unit (e.g., Centimeters).",
      "The conversion is calculated using exact international standards."
    ],
    snippet: "To convert inches to centimeters, multiply by 2.54 exactly."
  },
  examples: [
    { label: "1 Inch", value: "2.54 cm" },
    { label: "1 Foot", value: "30.48 cm" },
    { label: "1 Meter", value: "3.28 Feet" },
    { label: "1 Mile", value: "1.61 Kilometers" }
  ],
  faqs: [
    { question: "How many inches in a foot?", answer: "There are exactly 12 inches in 1 foot." },
    { question: "Is a meter longer than a yard?", answer: "Yes, 1 meter is approximately 1.094 yards." }
  ]
};
