import type { ConverterUiConfig, SEOContent } from '../types';

export const volumeConverterUi: ConverterUiConfig = {
  defaultFromValue: '500',
  defaultFromUnitId: 'ml',
  defaultToUnitId: 'l',
  tagline:
    'US customary and metric volume conversions for cooking, science, and engineering.',
  summaryChainUnitIds: ['ml', 'l', 'gal', 'cup', 'fl-oz'],
  heroVariant: 'icon',
  commonUnitIds: ['ml', 'l', 'm3', 'gal', 'qt', 'pt', 'cup', 'fl-oz'],
  conversionTips: [
    '1 L = 1,000 mL',
    '1 US gallon ≈ 3.785 L',
    '1 US cup = 240 mL',
    '1 US fluid ounce ≈ 29.57 mL',
  ],
  quickPairings: [
    { from: 'ml', to: 'l', presetFromValue: '500' },
    { from: 'l', to: 'gal', presetFromValue: '1' },
    { from: 'cup', to: 'ml', presetFromValue: '1' },
    { from: 'fl-oz', to: 'ml', presetFromValue: '8' },
  ],
};

export const categorySeo: SEOContent = {
  title: "Volume Converter | Gallons to Liters, Ounces to Cups",
  description: "Convert liquid and solid volume units. Accurate converter for gallons, liters, milliliters, and fluid ounces.",
  h1: "Volume & Capacity Converter",
  intro: "Cooking, science, and engineering all rely on accurate volume measurements. Our tool helps you switch between US Liquid, Imperial, and Metric units with ease.",
  howTo: {
    title: "How to Convert Volume",
    steps: [
      "Select your starting volume unit.",
      "Input the amount.",
      "Select your target unit (e.g., Liters).",
      "The result reflects the specific volume definition selected."
    ],
    snippet: "To convert US Gallons to Liters, multiply by 3.785."
  },
  examples: [
    { label: "1 Gallon (US)", value: "3.785 Liters" },
    { label: "1 Cup (US)", value: "240 Milliliters" },
    { label: "1 Fluid Ounce", value: "29.57 Milliliters" },
    { label: "1 Liter", value: "4.23 Cups" }
  ],
  faqs: [
    { question: "Are US and UK gallons the same?", answer: "No, a UK (Imperial) gallon is about 20% larger than a US gallon." },
    { question: "How many cups in a quart?", answer: "There are 4 US cups in 1 US quart." }
  ]
};
