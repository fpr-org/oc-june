import type { ConverterUiConfig, SEOContent } from '../types';

export const temperatureConverterUi: ConverterUiConfig = {
  defaultFromValue: '100',
  defaultFromUnitId: 'C',
  defaultToUnitId: 'F',
  tagline:
    'Convert Celsius, Fahrenheit, and Kelvin using standard offset formulas.',
  summaryChainUnitIds: ['C', 'F', 'K'],
  heroVariant: 'icon',
  showSlider: false,
  commonUnitIds: ['C', 'F', 'K'],
  conversionTips: [
    '°C to °F: F = (C × 9/5) + 32',
    'K = °C + 273.15',
    'Temperature uses offsets—not simple ratios.',
  ],
  quickPairings: [
    { from: 'C', to: 'F', presetFromValue: '0' },
    { from: 'C', to: 'F', presetFromValue: '100' },
    { from: 'F', to: 'C', presetFromValue: '32' },
    { from: 'C', to: 'K', presetFromValue: '25' },
  ],
};

export const categorySeo: SEOContent = {
  title: "Temperature Converter | Celsius to Fahrenheit & Kelvin",
  description: "Convert Celsius to Fahrenheit, Fahrenheit to Kelvin and more. Accurate temperature conversion formulas and charts.",
  h1: "Temperature Converter",
  intro: "Temperature scales vary globally. While most countries use Celsius, the US uses Fahrenheit, and scientists prefer Kelvin. Our converter makes switching between these scales simple and error-free.",
  howTo: {
    title: "How to Convert Temperature",
    steps: [
      "Pick your input scale (e.g., Celsius).",
      "Input the temperature value.",
      "Choose the output scale (e.g., Fahrenheit).",
      "The formula is applied instantly to provide the result."
    ],
    snippet: "To convert Celsius (°C) to Fahrenheit (°F), multiply by 1.8 and add 32. Formula: (C × 9/5) + 32 = F."
  },
  examples: [
    { label: "0°C", value: "32°F (Freezing)" },
    { label: "100°C", value: "212°F (Boiling)" },
    { label: "37°C", value: "98.6°F (Body Temp)" },
    { label: "0 K", value: "-273.15°C (Absolute Zero)" }
  ],
  faqs: [
    { question: "At what temperature do Celsius and Fahrenheit meet?", answer: "Celsius and Fahrenheit are equal at -40 degrees (-40°C = -40°F)." },
    { question: "What is Absolute Zero?", answer: "Absolute Zero (0 Kelvin) is the lowest possible temperature where all molecular motion ceases." }
  ]
};
