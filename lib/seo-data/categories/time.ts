import type { ConverterUiConfig, SEOContent } from '../types';

export const timeConverterUi: ConverterUiConfig = {
  defaultFromValue: '3600',
  defaultFromUnitId: 's',
  defaultToUnitId: 'h',
  tagline:
    'Convert duration across scales—from milliseconds to years—for scheduling and science.',
  summaryChainUnitIds: ['s', 'min', 'h', 'd'],
  heroVariant: 'icon',
  commonUnitIds: ['ms', 's', 'min', 'h', 'd', 'wk', 'mo', 'yr'],
  conversionTips: [
    '1 minute = 60 seconds',
    '1 day = 86,400 seconds',
    'Month/year use average calendar lengths',
  ],
  quickPairings: [
    { from: 's', to: 'min', presetFromValue: '60' },
    { from: 'min', to: 'h', presetFromValue: '60' },
    { from: 'h', to: 'd', presetFromValue: '24' },
    { from: 'd', to: 'wk', presetFromValue: '7' },
  ],
};

export const categorySeo: SEOContent = {
  title: "Time Converter | Seconds to Minutes, Hours to Days",
  description: "Convert time units from seconds to millennia. Accurate time conversion tool for planning and science.",
  h1: "Time Converter",
  intro: "Time is our most valuable resource. Whether you're calculating project deadlines or scientific intervals, our time converter ensures your calculations are precise across all units of duration.",
  howTo: {
    title: "How to Convert Time",
    steps: [
      "Enter the amount of time.",
      "Select the source unit (e.g., Hours).",
      "Select the destination unit (e.g., Minutes).",
      "The tool multiplies or divides by standard time constants (60, 24, etc.)."
    ],
    snippet: "To convert hours to minutes, multiply by 60."
  },
  examples: [
    { label: "1 Hour", value: "3,600 Seconds" },
    { label: "24 Hours", value: "1,440 Minutes" },
    { label: "7 Days", value: "168 Hours" },
    { label: "1 Year", value: "525,600 Minutes" }
  ],
  faqs: [
    { question: "How many seconds are in a day?", answer: "There are exactly 86,400 seconds in a 24-hour day." },
    { question: "What is a leap second?", answer: "A leap second is a one-second adjustment occasionally applied to Coordinated Universal Time (UTC) to keep its time of day close to the mean solar time." }
  ]
};
