import type { ConverterUiConfig, SEOContent } from '../types';

export const dataStorageConverterUi: ConverterUiConfig = {
  defaultFromValue: '500',
  defaultFromUnitId: 'MB',
  defaultToUnitId: 'GB',
  tagline:
    'Convert decimal (SI) and binary (IEC) digital storage units for files, drives, and bandwidth planning.',
  summaryChainUnitIds: ['B', 'KB', 'MB', 'GB', 'TB'],
  heroVariant: 'icon',
  commonUnitIds: ['KB', 'MB', 'GB', 'TB', 'KiB', 'MiB', 'GiB', 'TiB'],
  conversionTips: [
    '1 byte = 8 bits',
    '1 KB = 1,000 bytes; 1 KiB = 1,024 bytes',
    'Windows often shows GiB while labels say GB',
  ],
  quickPairings: [
    { from: 'MB', to: 'GB', presetFromValue: '500' },
    { from: 'GB', to: 'TB', presetFromValue: '1' },
    { from: 'KB', to: 'MB', presetFromValue: '1024' },
    { from: 'MiB', to: 'GiB', presetFromValue: '1024' },
  ],
};

export const categorySeo: SEOContent = {
  title: "Data Unit Converter | MB to GB, KB to MB & More",
  description: "Convert bits, bytes, KB, MB, GB, TB instantly. Free online data storage converter with definitions and conversion charts.",
  h1: "Data Storage & Bandwidth Converter",
  intro: "In the digital age, understanding data sizes is crucial for everything from purchasing hard drives to managing cloud storage. Our data unit converter helps you seamlessly switch between bits, bytes, and multi-terabyte scales with precision.",
  howTo: {
    title: "How to Convert Data Units",
    steps: [
      "Select your starting unit (e.g., Megabytes).",
      "Enter the value you want to convert.",
      "Choose your target unit (e.g., Gigabytes).",
      "The result appears instantly using the base-10 (Decimal) or base-2 (Binary) standard."
    ],
    snippet: "To convert Megabytes (MB) to Gigabytes (GB), divide the value by 1,000 (standard decimal) or 1,024 (binary/Gibibytes)."
  },
  examples: [
    { label: "1,000 MB", value: "1 GB" },
    { label: "8 Bits", value: "1 Byte" },
    { label: "1,000 KB", value: "1 MB" },
    { label: "1,000 GB", value: "1 TB" }
  ],
  faqs: [
    { question: "What is the difference between MB and MiB?", answer: "MB (Megabyte) uses decimal base-10 (1,000 KB), while MiB (Mebibyte) uses binary base-2 (1,024 KiB). Modern operating systems often mix these terms." },
    { question: "How many bits are in a byte?", answer: "There are exactly 8 bits in 1 byte." }
  ]
};
