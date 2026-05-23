import type { ConverterUiConfig, SEOContent } from '../types';

export const taxConverterUi: ConverterUiConfig = {
  defaultFromValue: '100',
  defaultFromUnitId: 'vat',
  defaultToUnitId: 'discount',
  tagline:
    'Compare VAT, discounts, and margin thinking in one flow—handy for pricing shelves and receipts.',
  heroVariant: 'icon',
  showSlider: false,
  commonUnitIds: ['vat', 'discount', 'margin'],
  conversionTips: [
    'Gross with tax: net × (1 + rate). Net from gross: gross ÷ (1 + rate).',
    'Markup is cost → price; margin is profit as % of selling price.',
    'Stack discounts multiplicatively, not by simple addition.',
    'Regional VAT rules vary; verify rates for your jurisdiction.',
  ],
  quickPairings: [
    { from: 'vat', to: 'discount', presetFromValue: '100' },
    { from: 'discount', to: 'margin', presetFromValue: '25' },
    { from: 'margin', to: 'vat', presetFromValue: '20' },
    { from: 'vat', to: 'margin', presetFromValue: '50' },
  ],
};

export const categorySeo: SEOContent = {
  title: "Sales Tax & VAT Calculator | Profit Margin Solver",
  description: "Calculate sales tax, VAT, and business profit margins. Perfect for retail pricing and personal budgeting.",
  h1: "Sales & Retail Calculator",
  intro: "Accurate pricing and tax calculations are vital for business and shopping. Our tool quickly handles tax additions, subtractions, and calculates the margin on your products.",
  howTo: {
    title: "How to Calculate Sales Tax",
    steps: [
      "Enter the net price of the item.",
      "Input the tax rate (%).",
      "The tool displays the tax amount and total gross price.",
      "Use the reverse function to find original price from gross."
    ],
    snippet: "Total = Price * (1 + Tax Rate)."
  },
  examples: [
    { label: "$50 Item with 8% Tax", value: "$54.00" },
    { label: "20% VAT on £100", value: "£120.00" },
    { label: "30% Margin on $10 Cost", value: "$14.29 Price" },
    { label: "$20 Off 25% Discount", value: "$15.00" }
  ],
  faqs: [
    { question: "What is the difference between Margin and Markup?", answer: "Margin is profit relative to the selling price, while markup is the amount added to the cost price." },
    { question: "How do I calculate VAT back?", answer: "Divide the gross amount by (1 + tax rate) to find the original net price." }
  ]
};
