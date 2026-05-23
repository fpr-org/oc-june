import { getCategoryById } from '@/lib/units';
import { SITE_URL } from '@/lib/brand';
import ConverterMain from '@/components/converter/ConverterMain';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Calculator, CheckCircle2, HelpCircle, BookOpen, Hash } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Decimal to Fraction Converter | Fast, Simple & Accurate',
  description: 'Convert any decimal to a simplified fraction instantly. Learn the formula, see step-by-step examples, and explore common decimal-fraction charts.',
  keywords: 'decimal to fraction, convert decimal to fraction, decimal to simplest fraction, math calculator',
};

export default function DecimalToFractionPage() {
  const categoryData = getCategoryById('math');

  if (!categoryData) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Decimal to Fraction Converter",
    "url": `${SITE_URL}/decimal-to-fraction`,
    "description": "A free online tool to convert decimals to their simplest fractional form with step-by-step explanations.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "featureList": [
      "Instant decimal to fraction conversion",
      "Automatic simplification",
      "Negative decimal support"
    ]
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do you convert a decimal to a fraction?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To convert a decimal to a fraction, write the decimal as a numerator and its place value as the denominator (e.g., 0.5 = 5/10). Then, simplify the fraction by dividing both parts by their greatest common divisor (5/10 = 1/2)."
        }
      },
      {
        "@type": "Question",
        "name": "What is 0.75 as a fraction?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "0.75 as a fraction is 3/4."
        }
      }
    ]
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto pb-20">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <ConverterMain 
        key="decimal-to-fraction" 
        categoryData={categoryData} 
        initialFromUnitId="decimal" 
        initialToUnitId="fraction" 
      />

      {/* SEO Content Section */}
      <div className="mt-12 flex flex-col gap-10 px-4 sm:px-0">
        
        {/* Intro / Search Intent */}
        <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-50 rounded-xl">
              <Calculator className="w-6 h-6 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Decimal to Fraction Converter</h1>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Converting decimals to fractions is a fundamental math skill used in engineering, construction, and data analysis. 
            Our <strong>Decimal to Fraction Converter</strong> provides instant, accurate results in the simplest form. 
            Whether you&apos;re working with terminating decimals or complex values, this tool handles the math for you in seconds.
          </p>
        </section>

        {/* Featured Snippet Target: How to Convert */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" /> How to Convert
            </h2>
            <div className="flex flex-col gap-4 text-slate-600 text-sm">
              <p className="font-medium bg-blue-50 p-4 rounded-2xl border border-blue-100 text-blue-800">
                <strong>Featured Snippet Answer:</strong> To convert a decimal to a fraction, place the decimal number over its place value (e.g., 0.5 is 5/10) and then simplify the fraction to its lowest terms using the Greatest Common Divisor (GCD).
              </p>
              <ol className="flex flex-col gap-3 ml-4 list-decimal">
                <li>Identify the place value of the last digit (tenths, hundredths, etc.).</li>
                <li>Write the decimal as a fraction with that place value as the denominator.</li>
                <li>Divide both the numerator and denominator by their GCD.</li>
                <li>Write the result in its simplest form.</li>
              </ol>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Hash className="w-5 h-5 text-orange-500" /> Real-World Examples
            </h2>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-700">0.5</span>
                <span className="text-emerald-600 font-black">1/2</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-700">0.25</span>
                <span className="text-emerald-600 font-black">1/4</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-700">0.75</span>
                <span className="text-emerald-600 font-black">3/4</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-700">0.125</span>
                <span className="text-emerald-600 font-black">1/8</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section for AEO/GEO */}
        <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-violet-500" /> Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="group">
              <h3 className="text-base font-bold text-slate-800 mb-2 flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                What is a terminating decimal?
              </h3>
              <p className="text-sm text-slate-600 ml-7">
                A terminating decimal is a decimal that has a finite number of digits after the decimal point, such as 0.25 or 0.8. These are the easiest to convert to fractions.
              </p>
            </div>
            <div className="group">
              <h3 className="text-base font-bold text-slate-800 mb-2 flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                How do I simplify a fraction?
              </h3>
              <p className="text-sm text-slate-600 ml-7">
                Simplify a fraction by finding the largest number that divides evenly into both the top (numerator) and bottom (denominator). Divide both by that number until they can no longer be divided.
              </p>
            </div>
            <div className="group">
              <h3 className="text-base font-bold text-slate-800 mb-2 flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                Why use fractions instead of decimals?
              </h3>
              <p className="text-sm text-slate-600 ml-7">
                Fractions are often more precise than decimals, especially when dealing with repeating values (like 1/3 vs 0.333...) or when working in trades like carpentry and machining.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
