import type { ConverterUiConfig, SEOContent } from '../types';

export const areaConverterUi: ConverterUiConfig = {
  defaultFromValue: '1000',
  defaultFromUnitId: 'm2',
  defaultToUnitId: 'sq-ft',
  tagline:
    'Convert metric and imperial area units for land, floors, and construction estimates.',
  summaryChainUnitIds: ['m2', 'sq-ft', 'ac', 'ha'],
  heroVariant: 'icon',
  commonUnitIds: ['m2', 'km2', 'ha', 'sq-in', 'sq-ft', 'sq-yd', 'ac', 'sq-mi'],
  conversionTips: [
    '1 m² ≈ 10.7639 sq ft',
    '1 hectare = 10,000 m²',
    '1 acre ≈ 4,046.86 m²',
    '1 km² = 100 hectares',
  ],
  quickPairings: [
    { from: 'm2', to: 'sq-ft', presetFromValue: '100' },
    { from: 'ac', to: 'ha', presetFromValue: '1' },
    { from: 'sq-ft', to: 'm2', presetFromValue: '1000' },
    { from: 'km2', to: 'sq-mi', presetFromValue: '1' },
  ],
};

export const categorySeo: SEOContent = {
  title: "Area Converter | Sq Meters to Sq Feet, Acres to Hectares",
  description: "Convert square meters to square feet, acres to hectares, and more. Free online area calculator for real estate and construction.",
  h1: "Area & Land Converter",
  intro: "Measuring floor space, garden area, or land plots requires precise conversions between metric and imperial units. This tool supports everything from square millimeters to square kilometers and acres.",
  howTo: {
    title: "How to Convert Area",
    steps: [
      "Enter the area value.",
      "Select the source unit (e.g., Square Meters).",
      "Select the target unit (e.g., Square Feet).",
      "The calculation involves squaring the linear conversion factor."
    ],
    snippet: "To convert Square Meters to Square Feet, multiply the value by 10.7639."
  },
  examples: [
    { label: "1 Sq Meter", value: "10.76 Sq Feet" },
    { label: "1 Acre", value: "43,560 Sq Feet" },
    { label: "1 Hectare", value: "2.47 Acres" },
    { label: "1 Sq Km", value: "0.386 Sq Miles" }
  ],
  faqs: [
    { question: "How many square feet are in an acre?", answer: "There are 43,560 square feet in one acre." },
    { question: "Is a hectare larger than an acre?", answer: "Yes, a hectare (10,000 m²) is approximately 2.47 acres." }
  ]
};
