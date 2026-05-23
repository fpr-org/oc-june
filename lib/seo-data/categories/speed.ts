import type { ConverterUiConfig, SEOContent } from '../types';

export const speedConverterUi: ConverterUiConfig = {
  defaultFromValue: '100',
  defaultFromUnitId: 'km/h',
  defaultToUnitId: 'mph',
  tagline:
    'Convert linear speed across SI and imperial units for travel and physics.',
  summaryChainUnitIds: ['m/s', 'km/h', 'mph', 'kn'],
  heroVariant: 'icon',
  commonUnitIds: ['m/s', 'km/h', 'mph', 'kn'],
  conversionTips: [
    '1 mph ≈ 1.60934 km/h',
    '1 knot = 1 nautical mile per hour',
    'm/s × 3.6 = km/h',
  ],
  quickPairings: [
    { from: 'km/h', to: 'mph', presetFromValue: '100' },
    { from: 'mph', to: 'km/h', presetFromValue: '60' },
    { from: 'm/s', to: 'km/h', presetFromValue: '10' },
    { from: 'kn', to: 'mph', presetFromValue: '10' },
  ],
};

export const categorySeo: SEOContent = {
  title: "Speed Converter | mph to km/h, knots to m/s",
  description: "Convert speed units including miles per hour, kilometers per hour, and knots. Accurate tool for transport and physics.",
  h1: "Speed & Velocity Converter",
  intro: "Whether you're curious about a car's top speed in another country or calculating a flight track in knots, our speed converter provides instant parity across globally used units.",
  howTo: {
    title: "How to Convert Speed",
    steps: [
      "Choose the unit of speed you have.",
      "Enter the speed value.",
      "Choose the unit you want to convert to.",
      "The velocity is adjusted using standard rate calculations."
    ],
    snippet: "To convert MPH to KM/H, multiply the speed by 1.609."
  },
  examples: [
    { label: "60 MPH", value: "96.56 KM/H" },
    { label: "100 KM/H", value: "62.14 MPH" },
    { label: "1 Knot", value: "1.15 MPH" },
    { label: "1 m/s", value: "3.6 KM/H" }
  ],
  faqs: [
    { question: "What is a Knot?", answer: "A knot is a unit of speed equal to one nautical mile per hour (exactly 1.852 km/h)." },
    { question: "How fast is the speed of sound?", answer: "At sea level and 20°C, the speed of sound is about 343 m/s (767 mph)." }
  ]
};
