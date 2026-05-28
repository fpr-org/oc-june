import MathSuite from '@/components/converter/MathSuite';
import RelatedConverters from '@/components/layout/RelatedConverters';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { BookOpen, Clock } from 'lucide-react';
import { BRAND_NAME, SITE_URL } from '@/lib/brand';
import { resolveTimezonePairFromSlug } from '@/lib/seo/resolve-timezone-pair';
import { buildFaqPageGraph } from '@/lib/seo/faq-jsonld';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pair = resolveTimezonePairFromSlug(slug);

  if (!pair) {
    return {
      metadataBase: new URL(SITE_URL),
      title: `World time tools | ${BRAND_NAME}`,
      description: 'Convert and compare times across zones with offsets and a visual day or night context.',
    };
  }

  const { fromUnit, toUnit } = pair;
  const title = `${fromUnit.name} to ${toUnit.name} Time Converter | ${fromUnit.symbol} to ${toUnit.symbol}`;
  const description = `Convert time from ${fromUnit.name} (${fromUnit.symbol}) to ${toUnit.name} (${toUnit.symbol}) accurately. Visual world clock and GMT offsets included.`;
  const url = `${SITE_URL}/time/${slug}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: `/time/${slug}` },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: BRAND_NAME,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export async function generateStaticParams() {
  const popularTzPairs = [
    { slug: 'utc-to-india' },
    { slug: 'usa-eastern-to-india' },
    { slug: 'usa-eastern-to-united-kingdom' },
    { slug: 'japan-to-china' },
    { slug: 'india-to-australia-sydney' },
    { slug: 'united-kingdom-to-usa-pacific' },
  ];
  return popularTzPairs;
}

export default async function TimeConverterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pair = resolveTimezonePairFromSlug(slug);

  if (!pair) notFound();

  const { fromUnit, toUnit, tzCategory } = pair;
  const timeDiff = Math.abs((toUnit.offset || 0) - (fromUnit.offset || 0));

  const seo = {
    title: `${fromUnit.name} to ${toUnit.name} Time Converter`,
    h1: `${fromUnit.name} Time to ${toUnit.name} Time`,
    intro: `Moving between ${fromUnit.name} and ${toUnit.name}? Our precise time tool handles the ${timeDiff} hour difference automatically. Whether it's for international business or personal travel, stay perfectly in sync.`,
    howTo: {
      title: `How to convert ${fromUnit.symbol} to ${toUnit.symbol}`,
      steps: [
        `Select your base time in ${fromUnit.name}.`,
        `The tool automatically calculates the time in ${toUnit.name}.`,
        `Use the visual day/night indicator to avoid waking people up at odd hours!`,
      ],
      snippet: `${fromUnit.name} offset is ${fromUnit.offset} while ${toUnit.name} is ${toUnit.offset} relative to UTC.`,
    },
  };
  const faqs = [
    {
      question: `How many hours is ${fromUnit.symbol} ahead of ${toUnit.symbol}?`,
      answer: `${fromUnit.symbol} and ${toUnit.symbol} differ by ${timeDiff} hour(s), based on their current UTC offsets.`,
    },
    {
      question: `Can this converter handle daylight saving transitions between ${fromUnit.name} and ${toUnit.name}?`,
      answer:
        'Yes. The timezone converter uses timezone definitions and offset logic so users can compare regions more reliably across dates and DST periods.',
    },
    {
      question: `What is the fastest way to compare meeting times between ${fromUnit.name} and ${toUnit.name}?`,
      answer:
        'Select the source zone, set your meeting hour once, and read the converted local time in the target zone. The visual day/night context helps avoid off-hours scheduling.',
    },
  ];
  const faqJsonLd = buildFaqPageGraph(faqs);

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto pb-20">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <MathSuite
        category="timezone"
        categoryData={tzCategory}
        initialFromUnitId={fromUnit.id}
        initialToUnitId={toUnit.id}
      />

      {/* SEO Content Section */}
      <div className="mt-12 flex flex-col gap-10 px-4 sm:px-0">
        <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-xl">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">{seo.h1}</h1>
          </div>
          <p className="text-slate-600 leading-relaxed">{seo.intro}</p>
        </section>

        <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-500" /> {seo.howTo.title}
          </h2>
          <div className="flex flex-col gap-4 text-slate-600 text-sm">
            <p className="font-medium bg-blue-50 p-4 rounded-2xl border border-blue-100 text-blue-800">{seo.howTo.snippet}</p>
            <ol className="flex flex-col gap-3 ml-4 list-decimal">
              {seo.howTo.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-5">Timezone conversion FAQ</h2>
          <div className="space-y-5">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-base font-bold text-slate-800 mb-1">{faq.question}</h3>
                <p className="text-sm text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t border-slate-100 pt-4 text-sm text-slate-600">
            Explore related tools: <Link href="/time-converter" className="text-primary font-semibold hover:underline">Time Converter</Link> and{' '}
            <Link href="/learn" className="text-primary font-semibold hover:underline">Learn</Link>.
          </div>
        </section>

        <RelatedConverters currentCategoryId="timezone" />
      </div>
    </div>
  );
}
