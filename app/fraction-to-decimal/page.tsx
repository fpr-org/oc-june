import { getCategoryById } from '@/lib/units';
import { SITE_URL } from '@/lib/brand';
import ConverterMain from '@/components/converter/ConverterMain';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Calculator, CheckCircle2, HelpCircle, BookOpen, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Fraction to Decimal Converter | Accurate & Free Tools',
  description: 'Convert any fraction to its decimal equivalent instantly. Get precise results, learn the long division method, and see common fraction charts.',
  keywords: 'fraction to decimal, convert fraction to decimal, fraction to dec, math calculator online',
};

export default function FractionToDecimalPage() {
  const categoryData = getCategoryById('math');

  if (!categoryData) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Fraction to Decimal Converter",
    "url": `${SITE_URL}/fraction-to-decimal`,
    "description": "An easy-to-use tool to convert fractions (like 1/2, 3/4) into their decimal equivalents instantly.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "featureList": [
      "Instant fraction to decimal conversion",
      "High precision results",
      "Handles improper fractions"
    ]
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do you convert a fraction to a decimal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To convert a fraction to a decimal, simply divide the numerator (top number) by the denominator (bottom number). For example, to convert 1/4, you calculate 1 ÷ 4 = 0.25."
        }
      },
      {
        "@type": "Question",
        "name": "What is 1/2 as a decimal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "1/2 as a decimal is 0.5."
        }
      },
      {
        "@type": "Question",
        "name": "What is 1/3 as a decimal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "1/3 as a decimal is a repeating decimal, 0.3333..."
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
        key="fraction-to-decimal" 
        categoryData={categoryData} 
        initialFromUnitId="fraction" 
        initialToUnitId="decimal" 
      />

      {/* SEO Content Section */}
      <div className="mt-12 flex flex-col gap-10 px-4 sm:px-0">
        
        {/* Intro */}
        <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-xl">
              <Calculator className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Fraction to Decimal Converter</h1>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Need to turn a ratio into a decimal point? Our <strong>Fraction to Decimal Converter</strong> is built for accuracy and speed. 
            Understanding the decimal value of fractions is essential for percentages, probability, and everyday measurements. 
            Simply enter your fraction, and we&apos;ll handle the division for you.
          </p>
        </section>

        {/* Method Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-500" /> The Long Division Method
            </h2>
            <div className="flex flex-col gap-4 text-slate-600 text-sm">
              <p className="font-medium bg-emerald-50 p-4 rounded-2xl border border-emerald-100 text-emerald-800">
                <strong>Formula:</strong> Decimal = Numerator ÷ Denominator
              </p>
              <p>
                Every fraction is essentially a division problem. The line between the two numbers (the vinculum) means &quot;divided by.&quot;
              </p>
              <ul className="flex flex-col gap-2 ml-4 list-disc">
                <li>3/4 means 3 divided by 4 = 0.75</li>
                <li>5/8 means 5 divided by 8 = 0.625</li>
                <li>1/3 means 1 divided by 3 = 0.333 (Repeating)</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-500" /> Common Conversions
            </h2>
            <div className="grid grid-cols-1 gap-2">
               <div className="flex justify-between p-3 border-b border-slate-50 last:border-0">
                  <span className="font-bold text-slate-500">1/2</span>
                  <span className="font-black text-slate-800">0.5</span>
               </div>
               <div className="flex justify-between p-3 border-b border-slate-50 last:border-0">
                  <span className="font-bold text-slate-500">1/4</span>
                  <span className="font-black text-slate-800">0.25</span>
               </div>
               <div className="flex justify-between p-3 border-b border-slate-50 last:border-0">
                  <span className="font-bold text-slate-500">3/4</span>
                  <span className="font-black text-slate-800">0.75</span>
               </div>
               <div className="flex justify-between p-3 border-b border-slate-50 last:border-0">
                  <span className="font-bold text-slate-500">1/8</span>
                  <span className="font-black text-slate-800">0.125</span>
               </div>
               <div className="flex justify-between p-3 border-b border-slate-50 last:border-0">
                  <span className="font-bold text-slate-500">3/8</span>
                  <span className="font-black text-slate-800">0.375</span>
               </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-rose-500" /> Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-800 mb-2">Can all fractions be converted to decimals?</h3>
              <p className="text-sm text-slate-600">Yes, every real number fraction has a decimal equivalent. Some are terminating (like 0.5) while others are repeating (like 0.666...).</p>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 mb-2">What is an improper fraction?</h3>
              <p className="text-sm text-slate-600">An improper fraction is one where the numerator is larger than the denominator (e.g., 5/4). When converted to a decimal, the value will be greater than 1 (1.25).</p>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 mb-2">How many decimal places should I use?</h3>
              <p className="text-sm text-slate-600">This depends on your needed precision. For most school work, 2-3 digits is enough. For engineering, you may need 5 or more.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
