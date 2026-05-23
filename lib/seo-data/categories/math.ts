import type { ConverterUiConfig, SEOContent } from '../types';

export const mathConverterUi: ConverterUiConfig = {
  defaultFromValue: '255',
  defaultFromUnitId: 'decimal',
  defaultToUnitId: 'binary',
  tagline:
    'Instantly convert values between decimal, binary, hexadecimal, and octal representations.',
  summaryChainUnitIds: ['decimal', 'binary', 'hex'],
  heroVariant: 'icon',
  showSlider: false,
  commonUnitIds: ['decimal', 'binary', 'hex', 'octal'],
  conversionTips: [
    'Binary uses base-2 digits (0–1)',
    'Hex uses base-16 (0–9, A–F)',
    'Octal uses base-8 (0–7)',
  ],
  quickPairings: [
    { from: 'decimal', to: 'binary', presetFromValue: '255' },
    { from: 'decimal', to: 'hex', presetFromValue: '4095' },
    { from: 'binary', to: 'hex', presetFromValue: '1111' },
    { from: 'hex', to: 'decimal', presetFromValue: 'FF' },
  ],
};

export const categorySeo: SEOContent = {
  title: "Advaced Mathematical Converter | Binary, Hex, Decimal",
  description: "Convert between Decimal, Binary, Hexadecimal, and Octal numbering systems. Fast and accurate base converter for computer science.",
  h1: "Mathematical Base Converter",
  intro: "Number systems are the foundation of computing. Whether you are a programmer working with memory addresses or a student learning binary, our converter makes base switching intuitive.",
  howTo: {
    title: "How to Convert Number Bases",
    steps: [
      "Select your input base (e.g., Decimal).",
      "Enter the value.",
      "Select the target base (e.g., Binary).",
      "The conversion is calculated using positional notation algorithms."
    ],
    snippet: "To convert Decimal to Binary, repeatedly divide by 2 and record the remainders in reverse order."
  },
  examples: [
    { label: "10 (Dec)", value: "1010 (Bin)" },
    { label: "255 (Dec)", value: "FF (Hex)" },
    { label: "64 (Dec)", value: "100 (Oct)" },
    { label: "1111 (Bin)", value: "15 (Dec)" }
  ],
  faqs: [
    { question: "Why is Hexadecimal used in computing?", answer: "Hexadecimal is used because it provides a human-friendly representation of binary-coded values. One hex digit represents exactly four bits (a nibble)." },
    { question: "How many bits are in a byte?", answer: "There are 8 bits in a byte, which can represent decimal values from 0 to 255." }
  ]
};
