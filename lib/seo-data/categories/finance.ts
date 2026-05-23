import type { ConverterUiConfig, SEOContent } from '../types';

export const financeConverterUi: ConverterUiConfig = {
  defaultFromValue: '250000',
  defaultFromUnitId: 'mortgage',
  defaultToUnitId: 'interest',
  tagline:
    'Move between loan, mortgage, interest, and savings modes while keeping principal and rates in context.',
  heroVariant: 'icon',
  showSlider: false,
  commonUnitIds: ['loan', 'mortgage', 'interest', 'savings'],
  conversionTips: [
    'APR includes fees; compare APRs, not headline rates alone.',
    'Monthly payment formulas assume a steady rate across the term.',
    'Compound interest grows faster because you earn on prior interest.',
    'Shorter loan terms mean higher payments but less total interest.',
  ],
  quickPairings: [
    { from: 'loan', to: 'mortgage', presetFromValue: '20000' },
    { from: 'mortgage', to: 'interest', presetFromValue: '300000' },
    { from: 'interest', to: 'savings', presetFromValue: '5' },
    { from: 'savings', to: 'loan', presetFromValue: '10000' },
  ],
};

export const categorySeo: SEOContent = {
  title: "Loan & Mortgage Calculator | Simple and Compound Interest",
  description: "Compare loans, calculate monthly mortgage payments, and estimate interest earnings with our financial tool.",
  h1: "Financial Calculator Suite",
  intro: "Empower your financial decisions. Whether you are buying a home or planning your savings, our calculators provide clarity on interest rates, amortizations, and future values.",
  howTo: {
    title: "How to Calculate Loan Payments",
    steps: [
      "Enter the principal amount (loan total).",
      "Input the annual interest rate.",
      "Select the loan term in years or months.",
      "Review your monthly payment and total interest paid."
    ],
    snippet: "PMT = P * [r(1+r)^n] / [(1+r)^n – 1]"
  },
  examples: [
    { label: "$10,000 Loan @ 5% for 3yrs", value: "$299/mo" },
    { label: "$300,000 Mortgage @ 4%", value: "$1,432/mo" },
    { label: "$5,000 Savings @ 2%", value: "$100/yr (Simple)" },
    { label: "Compound Growth", value: "Exponential" }
  ],
  faqs: [
    { question: "What is APR?", answer: "Annual Percentage Rate: the total cost of borrowing expressed as a yearly percentage including fees." },
    { question: "Why does compound interest matter?", answer: "Compound interest is interest on interest, leading to much faster growth over long periods." }
  ]
};
