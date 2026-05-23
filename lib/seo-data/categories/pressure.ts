import type { ConverterUiConfig, SEOContent } from '../types';

export const pressureConverterUi: ConverterUiConfig = {
  defaultFromValue: '1',
  defaultFromUnitId: 'bar',
  defaultToUnitId: 'psi',
  tagline:
    'Convert pascals, bar, PSI, and atmospheres for engineering and lab work.',
  summaryChainUnitIds: ['pa', 'bar', 'psi', 'atm'],
  heroVariant: 'icon',
  commonUnitIds: ['pa', 'kpa', 'bar', 'psi', 'atm'],
  conversionTips: [
    '1 bar = 100,000 Pa',
    '1 atm = 101,325 Pa',
    '1 PSI ≈ 6,894.76 Pa',
  ],
  quickPairings: [
    { from: 'bar', to: 'psi', presetFromValue: '1' },
    { from: 'psi', to: 'bar', presetFromValue: '14.7' },
    { from: 'atm', to: 'pa', presetFromValue: '1' },
    { from: 'kpa', to: 'psi', presetFromValue: '100' },
  ],
};

export const categorySeo: SEOContent = {
  title: "Pressure Converter | Pascal to PSI, Bar to atm",
  description: "Convert pressure units including Pascal, PSI, Bar, and Atmosphere. Professional pressure converter for engineering and scuba diving.",
  h1: "Pressure Converter",
  intro: "Pressure measurement is vital in fields ranging from weather forecasting to automotive engineering. This tool provides instant conversions between standard metric and imperial pressure units.",
  howTo: {
    title: "How to Convert Pressure",
    steps: [
      "Pick your input unit (e.g., PSI).",
      "Input the pressure value.",
      "Choose the output unit (e.g., Bar).",
      "The conversion factor is applied based on standard atmospheric definitions."
    ],
    snippet: "To convert PSI to Bar, multiply by 0.0689476."
  },
  examples: [
    { label: "1 atm", value: "101,325 Pa" },
    { label: "1 Bar", value: "14.50 PSI" },
    { label: "100 kPa", value: "1 Bar" },
    { label: "32 PSI", value: "2.2 Bar (Tire Pressure)" }
  ],
  faqs: [
    { question: "What is standard atmospheric pressure?", answer: "Standard atmospheric pressure is defined as 101,325 Pascals or 14.696 PSI." },
    { question: "Is 1 Bar equal to 1 Atmosphere?", answer: "They are very close. 1 Bar = 0.9869 atm." }
  ]
};
