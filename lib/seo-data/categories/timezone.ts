import type { ConverterUiConfig, SEOContent } from '../types';

export const timezoneConverterUi: ConverterUiConfig = {
  defaultFromValue: '12',
  defaultFromUnitId: 'utc',
  defaultToUnitId: 'india',
  tagline:
    'Pick reference and target regions to align meetings, travel, and broadcasts across offsets.',
  summaryChainUnitIds: ['utc', 'usa-eastern', 'united-kingdom', 'india'],
  heroVariant: 'icon',
  showSlider: false,
  commonUnitIds: [
    'utc',
    'usa-eastern',
    'usa-pacific',
    'united-kingdom',
    'france',
    'india',
    'china',
    'japan',
    'australia-sydney',
  ],
  conversionTips: [
    'UTC is the reference “Zulu” time; local zones add or subtract hours.',
    'Always confirm DST rules for the specific date you care about.',
    'India uses a single offset (IST); Russia and USA span multiple zones.',
    'Scheduling tools often show overlapping “working hours” across hubs.',
  ],
  quickPairings: [
    { from: 'utc', to: 'india', presetFromValue: '12' },
    { from: 'usa-eastern', to: 'united-kingdom', presetFromValue: '9' },
    { from: 'china', to: 'japan', presetFromValue: '15' },
    { from: 'usa-pacific', to: 'australia-sydney', presetFromValue: '18' },
  ],
};

export const categorySeo: SEOContent = {
  title: "Global Time Zone Converter | World Clock Calculator",
  description: "Convert time between any major cities or countries. Supports top 50 nations including India, USA, China, and UK with accurate GMT/UTC offsets.",
  h1: "International Time Zone Converter",
  intro: "In a connected world, coordinating across borders is essential. Whether you're a digital nomad, a business professional scheduling a call between New York and Mumbai, or a sports fan watching the World Cup, our time zone converter provides instant parity with precision.",
  howTo: {
    title: "How to Convert Time Zones",
    steps: [
      "Enter the time you want to convert in the input field.",
      "Select your 'Base' timezone (e.g., USA Eastern).",
      "Select your 'Target' timezone (e.g., IST - India).",
      "The calculated time in the target zone appears instantly."
    ],
    snippet: "To find the time in London from New York, subtract the New York offset (-5) and add the London offset (0). Total change: +5 hours."
  },
  examples: [
    { label: "12:00 PM NYC", value: "5:00 PM London" },
    { label: "9:00 AM London", value: "2:30 PM India" },
    { label: "10:00 PM Tokyo", value: "9:00 PM Beijing" },
    { label: "6:00 AM LA", value: "3:00 PM Berlin" }
  ],
  faqs: [
    { question: "What is UTC?", answer: "UTC (Coordinated Universal Time) is the primary time standard by which the world regulates clocks and time." },
    { question: "Does this account for Daylight Saving Time?", answer: "Historical and standard offsets are used; however, specific regional shifts for DST may vary based on exact seasonal dates." },
    { question: "How many timezones are in the USA?", answer: "The contiguous United States has 4 major time zones: Eastern, Central, Mountain, and Pacific." }
  ]
};
