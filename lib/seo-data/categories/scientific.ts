import type { ConverterUiConfig, SEOContent } from '../types';

export const scientificConverterUi: ConverterUiConfig = {
  defaultFromValue: '1',
  defaultFromUnitId: 'basic',
  defaultToUnitId: 'advanced',
  tagline:
    'Toggle between standard and scientific tool strips—logs, trig, powers—without leaving the page.',
  heroVariant: 'icon',
  showSlider: false,
  commonUnitIds: ['basic', 'advanced'],
  conversionTips: [
    'Use parentheses to control order of operations (PEMDAS).',
    'Switch degrees vs radians before evaluating sin/cos/tan.',
    'log usually means base 10; ln is natural log (base e).',
    'Very large or small results may use scientific notation.',
  ],
  quickPairings: [
    { from: 'basic', to: 'advanced' },
    { from: 'advanced', to: 'basic' },
    { from: 'basic', to: 'advanced', presetFromValue: '45' },
    { from: 'advanced', to: 'basic', presetFromValue: '3.14159' },
  ],
};

export const categorySeo: SEOContent = {
  title: "Online Scientific Calculator | Advanced Math Functions",
  description: "Free scientific calculator with trigonometry, logarithms, and exponential functions. High-precision tool for students and scientists.",
  h1: "Scientific Calculator",
  intro: "Complex problems require powerful tools. Our online scientific calculator provides all the functions of a physical device, including sin, cos, tan, log, and roots, right in your browser.",
  howTo: {
    title: "How to Use the Scientific Calculator",
    steps: [
      "Enter your numbers using the keypad or your keyboard.",
      "Apply functions like square root, power, or trigonometry.",
      "Use parentheses for complex order of operations.",
      "Check the result in real-time as you type."
    ],
    snippet: "Use the 'Deg' or 'Rad' mode to switch between degree and radian measurements for trigonometric functions."
  },
  examples: [
    { label: "sin(30°)", value: "0.5" },
    { label: "log(100)", value: "2" },
    { label: "√(144)", value: "12" },
    { label: "2^10", value: "1024" }
  ],
  faqs: [
    { question: "What is the order of operations?", answer: "The calculator follows PEMDAS/BODMAS: Parentheses, Exponents, Multiplication/Division, and Addition/Subtraction." },
    { question: "Can I use radians for trigonometry?", answer: "Yes, you can toggle between Radians (Rad) and Degrees (Deg) in the calculator settings." }
  ]
};
