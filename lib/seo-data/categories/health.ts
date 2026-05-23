import type { ConverterUiConfig, SEOContent } from '../types';

export const healthConverterUi: ConverterUiConfig = {
  defaultFromValue: '1800',
  defaultFromUnitId: 'bmr',
  defaultToUnitId: 'tdee',
  tagline:
    'Jump between BMR, TDEE, and deficit views to reason about daily energy needs and sustainable goals.',
  heroVariant: 'icon',
  showSlider: false,
  commonUnitIds: ['bmr', 'tdee', 'deficit'],
  conversionTips: [
    'BMR estimates calories burned at rest; TDEE adds activity.',
    'A ~500 kcal/day deficit often aligns with ~1 lb/week loss for many adults.',
    'Always pair numbers with guidance from a qualified professional when changing diet.',
    'Hydration and sleep affect energy expenditure beyond the raw estimate.',
  ],
  quickPairings: [
    { from: 'bmr', to: 'tdee', presetFromValue: '1600' },
    { from: 'tdee', to: 'deficit', presetFromValue: '2200' },
    { from: 'tdee', to: 'bmr', presetFromValue: '2100' },
    { from: 'deficit', to: 'tdee', presetFromValue: '1700' },
  ],
};

export const categorySeo: SEOContent = {
  title: "Calorie Deficit Calculator | Weight Loss & TDEE Goal",
  description: "Calculate your daily calorie deficit for weight loss. Includes TDEE and BMR calculations based on your activity level.",
  h1: "Calorie Deficit Calculator",
  intro: "Weight management is fundamentally about energy balance. Our calorie deficit calculator helps you determine how many calories you need to consume to lose weight safely and consistently.",
  howTo: {
    title: "How to Use the Calorie Calculator",
    steps: [
      "Enter your gender, age, weight, and height.",
      "Select your activity level from sedentary to highly active.",
      "The tool calculates your TDEE (Total Daily Energy Expenditure).",
      "Subtract 500 calories for a standard weight loss goal of 1lb per week."
    ],
    snippet: "Formula: TDEE - Goal Deficit = Daily Calorie Target."
  },
  examples: [
    { label: "Sedentary Male, 200lbs", value: "2200 TDEE" },
    { label: "Active Female, 150lbs", value: "2100 TDEE" },
    { label: "Weight Loss Deficit", value: "500 kcal/day" },
    { label: "Extreme Weight Loss", value: "750 kcal/day" }
  ],
  faqs: [
    { question: "What is TDEE?", answer: "Total Daily Energy Expenditure: the total number of calories you burn in a day including exercise." },
    { question: "Is a 500 calorie deficit safe?", answer: "Yes, for most adults, a 500-calorie daily deficit is considered a sustainable and safe way to lose weight." }
  ]
};
