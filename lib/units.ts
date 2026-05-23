export interface Unit {
  id: string;
  name: string;
  symbol: string;
  factor: number;
  offset?: number;
  type?: string; 
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  base: string;
  units: Unit[];
}

export const converterCategories: Category[] = [
  {
    id: 'data-storage',
    slug: 'data-storage-converter',
    name: 'Data Storage',
    base: 'B',
    units: [
      { id: 'b', name: 'Bit', symbol: 'b', factor: 0.125, type: 'bit' },
      { id: 'B', name: 'Byte', symbol: 'B', factor: 1, type: 'byte' },
      { id: 'KB', name: 'Kilobyte', symbol: 'KB', factor: 1e3, type: 'byte' },
      { id: 'MB', name: 'Megabyte', symbol: 'MB', factor: 1e6, type: 'byte' },
      { id: 'GB', name: 'Gigabyte', symbol: 'GB', factor: 1e9, type: 'byte' },
      { id: 'TB', name: 'Terabyte', symbol: 'TB', factor: 1e12, type: 'byte' },
      { id: 'KiB', name: 'Kibibyte', symbol: 'KiB', factor: 1024, type: 'binary' },
      { id: 'MiB', name: 'Mebibyte', symbol: 'MiB', factor: 1024**2, type: 'binary' },
      { id: 'GiB', name: 'Gibibyte', symbol: 'GiB', factor: 1024**3, type: 'binary' },
      { id: 'TiB', name: 'Tebibyte', symbol: 'TiB', factor: 1024**4, type: 'binary' }
    ]
  },
  {
    id: 'length',
    slug: 'length-converter',
    name: 'Length',
    base: 'm',
    units: [
      { id: 'mm', name: 'Millimeter', symbol: 'mm', factor: 0.001 },
      { id: 'cm', name: 'Centimeter', symbol: 'cm', factor: 0.01 },
      { id: 'm', name: 'Meter', symbol: 'm', factor: 1 },
      { id: 'km', name: 'Kilometer', symbol: 'km', factor: 1000 },
      { id: 'in', name: 'Inch', symbol: 'in', factor: 0.0254 },
      { id: 'ft', name: 'Foot', symbol: 'ft', factor: 0.3048 },
      { id: 'yd', name: 'Yard', symbol: 'yd', factor: 0.9144 },
      { id: 'mi', name: 'Mile', symbol: 'mi', factor: 1609.344 }
    ]
  },
  {
    id: 'volume',
    slug: 'volume-converter',
    name: 'Volume',
    base: 'l',
    units: [
      { id: 'ml', name: 'Milliliter', symbol: 'mL', factor: 0.001 },
      { id: 'l', name: 'Liter', symbol: 'L', factor: 1 },
      { id: 'm3', name: 'Cubic Meter', symbol: 'm³', factor: 1000 },
      { id: 'gal', name: 'US Gallon', symbol: 'gal', factor: 3.78541 },
      { id: 'qt', name: 'US Quart', symbol: 'qt', factor: 0.946353 },
      { id: 'pt', name: 'US Pint', symbol: 'pt', factor: 0.473176 },
      { id: 'cup', name: 'US Cup', symbol: 'cup', factor: 0.24 },
      { id: 'fl-oz', name: 'US Fluid Ounce', symbol: 'fl oz', factor: 0.0295735 }
    ]
  },
  {
    id: 'weight',
    slug: 'weight-converter',
    name: 'Weight & Mass',
    base: 'g',
    units: [
      { id: 'mg', name: 'Milligram', symbol: 'mg', factor: 0.001 },
      { id: 'g', name: 'Gram', symbol: 'g', factor: 1 },
      { id: 'kg', name: 'Kilogram', symbol: 'kg', factor: 1000 },
      { id: 't', name: 'Metric Ton', symbol: 't', factor: 1e6 },
      { id: 'oz', name: 'Ounce', symbol: 'oz', factor: 28.3495 },
      { id: 'lb', name: 'Pound', symbol: 'lb', factor: 453.592 },
      { id: 'st', name: 'Stone', symbol: 'st', factor: 6350.29 }
    ]
  },
  {
    id: 'temperature',
    slug: 'temperature-converter',
    name: 'Temperature',
    base: 'K',
    units: [
      { id: 'C', name: 'Celsius', symbol: '°C', factor: 1, offset: 273.15 },
      { id: 'F', name: 'Fahrenheit', symbol: '°F', factor: 5/9, offset: 255.37222222222222 },
      { id: 'K', name: 'Kelvin', symbol: 'K', factor: 1, offset: 0 }
    ]
  },
  {
    id: 'speed',
    slug: 'speed-converter',
    name: 'Speed',
    base: 'm/s',
    units: [
      { id: 'm/s', name: 'Meter per second', symbol: 'm/s', factor: 1 },
      { id: 'km/h', name: 'Kilometer per hour', symbol: 'km/h', factor: 0.277778 },
      { id: 'mph', name: 'Mile per hour', symbol: 'mph', factor: 0.44704 },
      { id: 'kn', name: 'Knot', symbol: 'kn', factor: 0.514444 }
    ]
  },
  {
    id: 'time',
    slug: 'time-converter',
    name: 'Time',
    base: 's',
    units: [
      { id: 'ms', name: 'Millisecond', symbol: 'ms', factor: 0.001 },
      { id: 's', name: 'Second', symbol: 's', factor: 1 },
      { id: 'min', name: 'Minute', symbol: 'min', factor: 60 },
      { id: 'h', name: 'Hour', symbol: 'h', factor: 3600 },
      { id: 'd', name: 'Day', symbol: 'd', factor: 86400 },
      { id: 'wk', name: 'Week', symbol: 'wk', factor: 604800 },
      { id: 'mo', name: 'Month', symbol: 'mo', factor: 2.628e6 },
      { id: 'yr', name: 'Year', symbol: 'yr', factor: 3.154e7 }
    ]
  },
  {
    id: 'area',
    slug: 'area-converter',
    name: 'Area',
    base: 'm2',
    units: [
      { id: 'm2', name: 'Square Meter', symbol: 'm²', factor: 1 },
      { id: 'km2', name: 'Square Kilometer', symbol: 'km²', factor: 1e6 },
      { id: 'ha', name: 'Hectare', symbol: 'ha', factor: 10000 },
      { id: 'sq-in', name: 'Square Inch', symbol: 'sq in', factor: 0.00064516 },
      { id: 'sq-ft', name: 'Square Foot', symbol: 'sq ft', factor: 0.092903 },
      { id: 'sq-yd', name: 'Square Yard', symbol: 'sq yd', factor: 0.836127 },
      { id: 'ac', name: 'Acre', symbol: 'ac', factor: 4046.86 },
      { id: 'sq-mi', name: 'Square Mile', symbol: 'sq mi', factor: 2.59e6 }
    ]
  },
  {
    id: 'energy',
    slug: 'energy-converter',
    name: 'Energy',
    base: 'J',
    units: [
      { id: 'J', name: 'Joule', symbol: 'J', factor: 1 },
      { id: 'kJ', name: 'Kilojoule', symbol: 'kJ', factor: 1000 },
      { id: 'cal', name: 'Gram calorie', symbol: 'cal', factor: 4.184 },
      { id: 'kcal', name: 'Kilocalorie', symbol: 'kcal', factor: 4184 },
      { id: 'Wh', name: 'Watt-hour', symbol: 'Wh', factor: 3600 },
      { id: 'kWh', name: 'Kilowatt-hour', symbol: 'kWh', factor: 3.6e6 },
      { id: 'eV', name: 'Electronvolt', symbol: 'eV', factor: 1.60218e-19 }
    ]
  },
  {
    id: 'pressure',
    slug: 'pressure-converter',
    name: 'Pressure',
    base: 'Pa',
    units: [
      { id: 'pa', name: 'Pascal', symbol: 'Pa', factor: 1 },
      { id: 'kpa', name: 'Kilopascal', symbol: 'kPa', factor: 1000 },
      { id: 'bar', name: 'Bar', symbol: 'bar', factor: 100000 },
      { id: 'psi', name: 'PSI', symbol: 'psi', factor: 6894.76 },
      { id: 'atm', name: 'Atmosphere', symbol: 'atm', factor: 101325 }
    ]
  },
  {
    id: 'math',
    slug: 'math-converter',
    name: 'Mathematical',
    base: 'decimal',
    units: [
      { id: 'decimal', name: 'Decimal', symbol: 'dec', factor: 1 },
      { id: 'binary', name: 'Binary', symbol: 'bin', factor: 1 },
      { id: 'hex', name: 'Hexadecimal', symbol: 'hex', factor: 1 },
      { id: 'octal', name: 'Octal', symbol: 'oct', factor: 1 }
    ]
  },
  {
    id: 'percentage',
    slug: 'percentage-calculator',
    name: 'Percentage',
    base: 'percent',
    units: [
      { id: 'value', name: 'Value', symbol: '%', factor: 1 },
      { id: 'increase', name: 'Percent Increase', symbol: '∆%', factor: 1 },
      { id: 'decrease', name: 'Percent Decrease', symbol: '−%', factor: 1 }
    ]
  },
  {
    id: 'geometry',
    slug: 'geometry-calculator',
    name: 'Geometry',
    base: 'area',
    units: [
      { id: 'circle', name: 'Circle', symbol: '○', factor: 1 },
      { id: 'square', name: 'Square', symbol: '□', factor: 1 },
      { id: 'triangle', name: 'Triangle', symbol: '△', factor: 1 },
      { id: 'rectangle', name: 'Rectangle', symbol: '▭', factor: 1 },
      { id: 'sphere', name: 'Sphere', symbol: '球', factor: 1 },
      { id: 'cylinder', name: 'Cylinder', symbol: 'cyl', factor: 1 }
    ]
  },
  {
    id: 'algebra',
    slug: 'algebra-calculator',
    name: 'Algebra',
    base: 'solver',
    units: [
      { id: 'linear', name: 'Linear Equation', symbol: 'ax+b', factor: 1 },
      { id: 'quadratic', name: 'Quadratic Equation', symbol: 'ax²+bx+c', factor: 1 }
    ]
  },
  {
    id: 'scientific',
    slug: 'scientific-calculator',
    name: 'Scientific',
    base: 'calc',
    units: [
      { id: 'basic', name: 'Standard', symbol: '+−', factor: 1 },
      { id: 'advanced', name: 'Scientific', symbol: 'sin', factor: 1 }
    ]
  },
  {
    id: 'fractions',
    slug: 'fractions-calculator',
    name: 'Fractions',
    base: 'calc',
    units: [
      { id: 'add', name: 'Add', symbol: '+', factor: 1 },
      { id: 'sub', name: 'Subtract', symbol: '−', factor: 1 },
      { id: 'mul', name: 'Multiply', symbol: '×', factor: 1 },
      { id: 'div', name: 'Divide', symbol: '÷', factor: 1 }
    ]
  },
  {
    id: 'statistics',
    slug: 'statistics-calculator',
    name: 'Statistics',
    base: 'calc',
    units: [
      { id: 'mean', name: 'Mean', symbol: 'x̄', factor: 1 },
      { id: 'median', name: 'Median', symbol: 'x̃', factor: 1 },
      { id: 'std-dev', name: 'Std Deviation', symbol: 'σ', factor: 1 }
    ]
  },
  {
    id: 'trigonometry',
    slug: 'trigonometry-calculator',
    name: 'Trigonometry',
    base: 'calc',
    units: [
      { id: 'sin', name: 'Sine', symbol: 'sin', factor: 1 },
      { id: 'cos', name: 'Cosine', symbol: 'cos', factor: 1 },
      { id: 'tan', name: 'Tangent', symbol: 'tan', factor: 1 }
    ]
  },
  {
    id: 'health',
    slug: 'calorie-deficit-calculator',
    name: 'Calorie Deficit',
    base: 'calc',
    units: [
      { id: 'bmr', name: 'BMR', symbol: 'kcal', factor: 1 },
      { id: 'tdee', name: 'TDEE', symbol: 'kcal', factor: 1 },
      { id: 'deficit', name: 'Deficit', symbol: 'kcal', factor: 1 }
    ]
  },
  {
    id: 'finance',
    slug: 'loan-interest-calculator',
    name: 'Finance',
    base: 'calc',
    units: [
      { id: 'loan', name: 'Loan', symbol: '$', factor: 1 },
      { id: 'mortgage', name: 'Mortgage', symbol: '$', factor: 1 },
      { id: 'interest', name: 'Simple Interest', symbol: '%', factor: 1 },
      { id: 'savings', name: 'Compound Interest', symbol: '$', factor: 1 }
    ]
  },
  {
    id: 'tax',
    slug: 'sales-tax-calculator',
    name: 'Tax & Sales',
    base: 'calc',
    units: [
      { id: 'vat', name: 'VAT/Sales Tax', symbol: '%', factor: 1 },
      { id: 'discount', name: 'Discount', symbol: 'OFF', factor: 1 },
      { id: 'margin', name: 'Profit Margin', symbol: '%', factor: 1 }
    ]
  },
  {
    id: 'timezone',
    slug: 'time-zone-converter',
    name: 'Time Zone',
    base: 'UTC',
    units: [
      { id: 'utc', name: 'UTC / GMT', symbol: 'UTC', factor: 1, offset: 0 },
      { id: 'afghanistan', name: 'Afghanistan', symbol: 'AFT', factor: 1, offset: -4.5 },
      { id: 'algeria', name: 'Algeria', symbol: 'CET', factor: 1, offset: -1 },
      { id: 'argentina', name: 'Argentina', symbol: 'ART', factor: 1, offset: 3 },
      { id: 'australia-sydney', name: 'Australia (Sydney)', symbol: 'AEST', factor: 1, offset: -10 },
      { id: 'bangladesh', name: 'Bangladesh', symbol: 'BST', factor: 1, offset: -6 },
      { id: 'brazil-brasilia', name: 'Brazil (Brasilia)', symbol: 'BRT', factor: 1, offset: 3 },
      { id: 'canada-eastern', name: 'Canada (Eastern)', symbol: 'EST', factor: 1, offset: 5 },
      { id: 'china', name: 'China', symbol: 'CST', factor: 1, offset: -8 },
      { id: 'colombia', name: 'Colombia', symbol: 'COT', factor: 1, offset: 5 },
      { id: 'dr-congo', name: 'DR Congo', symbol: 'WAT', factor: 1, offset: -1 },
      { id: 'egypt', name: 'Egypt', symbol: 'EET', factor: 1, offset: -2 },
      { id: 'ethiopia', name: 'Ethiopia', symbol: 'EAT', factor: 1, offset: -3 },
      { id: 'france', name: 'France', symbol: 'CET', factor: 1, offset: -1 },
      { id: 'germany', name: 'Germany', symbol: 'CET', factor: 1, offset: -1 },
      { id: 'ghana', name: 'Ghana', symbol: 'GMT', factor: 1, offset: 0 },
      { id: 'india', name: 'India', symbol: 'IST', factor: 1, offset: -5.5 },
      { id: 'indonesia-jakarta', name: 'Indonesia (Jakarta)', symbol: 'WIB', factor: 1, offset: -7 },
      { id: 'iran', name: 'Iran', symbol: 'IRST', factor: 1, offset: -3.5 },
      { id: 'iraq', name: 'Iraq', symbol: 'AST', factor: 1, offset: -3 },
      { id: 'italy', name: 'Italy', symbol: 'CET', factor: 1, offset: -1 },
      { id: 'japan', name: 'Japan', symbol: 'JST', factor: 1, offset: -9 },
      { id: 'kenya', name: 'Kenya', symbol: 'EAT', factor: 1, offset: -3 },
      { id: 'malaysia', name: 'Malaysia', symbol: 'MYT', factor: 1, offset: -8 },
      { id: 'mexico-city', name: 'Mexico (City)', symbol: 'CST', factor: 1, offset: 6 },
      { id: 'morocco', name: 'Morocco', symbol: 'WET', factor: 1, offset: -1 },
      { id: 'myanmar', name: 'Myanmar', symbol: 'MMT', factor: 1, offset: -6.5 },
      { id: 'nepal', name: 'Nepal', symbol: 'NPT', factor: 1, offset: -5.75 },
      { id: 'nigeria', name: 'Nigeria', symbol: 'WAT', factor: 1, offset: -1 },
      { id: 'pakistan', name: 'Pakistan', symbol: 'PKT', factor: 1, offset: -5 },
      { id: 'peru', name: 'Peru', symbol: 'PET', factor: 1, offset: 5 },
      { id: 'philippines', name: 'Philippines', symbol: 'PHT', factor: 1, offset: -8 },
      { id: 'poland', name: 'Poland', symbol: 'CET', factor: 1, offset: -1 },
      { id: 'russia-moscow', name: 'Russia (Moscow)', symbol: 'MSK', factor: 1, offset: -3 },
      { id: 'saudi-arabia', name: 'Saudi Arabia', symbol: 'AST', factor: 1, offset: -3 },
      { id: 'south-africa', name: 'South Africa', symbol: 'SAST', factor: 1, offset: -2 },
      { id: 'south-korea', name: 'South Korea', symbol: 'KST', factor: 1, offset: -9 },
      { id: 'spain', name: 'Spain', symbol: 'CET', factor: 1, offset: -1 },
      { id: 'sudan', name: 'Sudan', symbol: 'CAT', factor: 1, offset: -2 },
      { id: 'tanzania', name: 'Tanzania', symbol: 'EAT', factor: 1, offset: -3 },
      { id: 'thailand', name: 'Thailand', symbol: 'ICT', factor: 1, offset: -7 },
      { id: 'turkey', name: 'Turkey', symbol: 'TRT', factor: 1, offset: -3 },
      { id: 'uganda', name: 'Uganda', symbol: 'EAT', factor: 1, offset: -3 },
      { id: 'ukraine', name: 'Ukraine', symbol: 'EET', factor: 1, offset: -2 },
      { id: 'united-kingdom', name: 'United Kingdom', symbol: 'GMT', factor: 1, offset: 0 },
      { id: 'usa-eastern', name: 'USA (Eastern)', symbol: 'EST', factor: 1, offset: 5 },
      { id: 'usa-pacific', name: 'USA (Pacific)', symbol: 'PST', factor: 1, offset: 8 },
      { id: 'uzbekistan', name: 'Uzbekistan', symbol: 'UZT', factor: 1, offset: -5 },
      { id: 'venezuela', name: 'Venezuela', symbol: 'VET', factor: 1, offset: 4 },
      { id: 'vietnam', name: 'Vietnam', symbol: 'ICT', factor: 1, offset: -7 }
    ]
  },
  {
    id: 'discrete',
    slug: 'discrete-math-calculator',
    name: 'Discrete Math',
    base: 'calc',
    units: [
      { id: 'perm', name: 'Permutation', symbol: 'nPr', factor: 1 },
      { id: 'comb', name: 'Combination', symbol: 'nCr', factor: 1 },
      { id: 'fact', name: 'Factorial', symbol: 'n!', factor: 1 }
    ]
  }
];

export function getCategoryById(id: string): Category | undefined {
  return converterCategories.find(c => c.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return converterCategories.find(c => c.slug === slug);
}

export const DAILY_CHALLENGES = [
  { fromId: 'mi', fromSymbol: 'mi', toId: 'km', toSymbol: 'km', value: '50', title: 'Convert 50 Miles to km', categoryId: 'length', xp: 50 },
  { fromId: 'C', fromSymbol: '°C', toId: 'F', toSymbol: '°F', value: '100', title: 'Convert 100 Celsius to Fahrenheit', categoryId: 'temperature', xp: 50 },
  { fromId: 'kg', fromSymbol: 'kg', toId: 'lb', toSymbol: 'lb', value: '5', title: 'Convert 5 Kilograms to Pounds', categoryId: 'weight', xp: 50 },
  { fromId: 'gal', fromSymbol: 'gal', toId: 'l', toSymbol: 'L', value: '1', title: 'Convert 1 Gallon to Liters', categoryId: 'volume', xp: 50 },
  { fromId: 'in', fromSymbol: 'in', toId: 'cm', toSymbol: 'cm', value: '12', title: 'Convert 12 Inches to Centimeters', categoryId: 'length', xp: 50 },
  { fromId: 'kWh', fromSymbol: 'kWh', toId: 'J', toSymbol: 'J', value: '2', title: 'Convert 2 kWh to Joules', categoryId: 'energy', xp: 50 },
];

export function getDailyChallenge() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return DAILY_CHALLENGES[dayOfYear % DAILY_CHALLENGES.length];
}

export function convertValue(value: string, fromUnitId: string, toUnitId: string, categoryId: string): string {
  if (!value) return '';
  
  // Special handling for Mathematical tools
  if (categoryId === 'math') {
    const numValue = (fromUnitId === 'binary') ? parseInt(value, 2) :
                    (fromUnitId === 'hex') ? parseInt(value, 16) :
                    (fromUnitId === 'octal') ? parseInt(value, 8) :
                    parseFloat(value);
    
    if (isNaN(numValue)) return '';

    if (toUnitId === 'binary') return numValue.toString(2);
    if (toUnitId === 'hex') return numValue.toString(16).toUpperCase();
    if (toUnitId === 'octal') return numValue.toString(8);
    return numValue.toString();
  }

  // Handle Percentage Calculator (simple proxy for now, UI will handle complex logic)
  if (categoryId === 'percentage') {
    return value; 
  }

  if (isNaN(Number(value))) return '';
  const numValue = Number(value);
  
  const category = getCategoryById(categoryId);
  if (!category) return '';

  const fromUnit = category.units.find(u => u.id === fromUnitId);
  const toUnit = category.units.find(u => u.id === toUnitId);
  
  if (!fromUnit || !toUnit) return '';

  // Calculate base value
  // Base = (Value * factor) + offset
  const baseValue = (numValue * fromUnit.factor) + (fromUnit.offset || 0);

  // Convert from base to target
  // Target = (Base - offset) / factor
  const result = (baseValue - (toUnit.offset || 0)) / toUnit.factor;
  
  // Format to avoid extremely long decimals while keeping precision
  // Determine if it needs precision trimming based on how small/precise it is
  let formatted = Number.isInteger(result) ? result.toString() : parseFloat(result.toPrecision(10)).toString();
  
  return formatted;
}

function decimalToFraction(decimal: number): string {
  if (Number.isInteger(decimal)) return decimal.toString();
  
  const tolerance = 1.0e-9;
  let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
  let b = decimal;
  do {
    let a = Math.floor(b);
    let aux = h1; h1 = a * h1 + h2; h2 = aux;
    aux = k1; k1 = a * k1 + k2; k2 = aux;
    b = 1 / (b - a);
  } while (Math.abs(decimal - h1 / k1) > decimal * tolerance);

  return `${h1}/${k1}`;
}

function fractionToDecimal(fraction: string): string {
  if (!fraction.includes('/')) return fraction;
  const [numerator, denominator] = fraction.split('/').map(Number);
  if (isNaN(numerator) || isNaN(denominator) || denominator === 0) return '';
  const result = numerator / denominator;
  return Number.isInteger(result) ? result.toString() : parseFloat(result.toPrecision(10)).toString();
}
