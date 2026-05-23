import type { ConverterUiConfig, SEOContent } from '../types';

export const geometryConverterUi: ConverterUiConfig = {
  defaultFromValue: '5',
  defaultFromUnitId: 'circle',
  defaultToUnitId: 'square',
  tagline:
    'Switch shape modes to explore area, perimeter, and volume formulas with a consistent, guided layout.',
  heroVariant: 'icon',
  showSlider: false,
  commonUnitIds: ['circle', 'square', 'triangle', 'rectangle', 'sphere', 'cylinder'],
  conversionTips: [
    'Circle area: π × r²; circumference: 2πr.',
    'Rectangle area: width × height; perimeter: 2(w + h).',
    'Triangle area: ½ × base × height.',
    'Sphere volume: (4/3)πr³; surface area: 4πr².',
  ],
  quickPairings: [
    { from: 'circle', to: 'sphere', presetFromValue: '5' },
    { from: 'square', to: 'rectangle', presetFromValue: '4' },
    { from: 'triangle', to: 'rectangle', presetFromValue: '10' },
    { from: 'cylinder', to: 'sphere', presetFromValue: '3' },
  ],
};

export const categorySeo: SEOContent = {
  title: "Geometry Calculator | Area & Volume Solver",
  description: "Calculate area, perimeter, and volume for 2D and 3D shapes. Includes circle, triangle, sphere, and cylinder formulas.",
  h1: "Geometry Calculator",
  intro: "Visualize and solve geometric problems instantly. Whether you are calculating the area of a circle or the volume of a sphere, our tool provides precise results and the formulas used.",
  howTo: {
    title: "How to Solve Geometry Problems",
    steps: [
      "Select the shape you want to calculate (e.g., Circle).",
      "Choose the property to find (Area, Perimeter, Volume).",
      "Enter the required dimensions (e.g., Radius).",
      "The result and the step-by-step formula are displayed."
    ],
    snippet: "Area of a Circle formula: π * r². Volume of a Sphere: (4/3) * π * r³."
  },
  examples: [
    { label: "Circle r=5 Area", value: "78.54" },
    { label: "Triangle b=10, h=5", value: "25 (Area)" },
    { label: "Sphere r=3 Volume", value: "113.10" },
    { label: "Square s=4 Perimeter", value: "16" }
  ],
  faqs: [
    { question: "What is Pi (π)?", answer: "Pi is a mathematical constant approximately equal to 3.14159, representing the ratio of a circle's circumference to its diameter." },
    { question: "How do you calculate mortgage surface area?", answer: "Surface area is found by summing the areas of all faces of a 3D object." }
  ]
};
