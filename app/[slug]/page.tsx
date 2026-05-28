import { getCategoryBySlug, converterCategories } from '@/lib/units';
import ConverterMain from '@/components/converter/ConverterMain';
import MathSuite from '@/components/converter/MathSuite';
import RelatedConverters from '@/components/layout/RelatedConverters';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getCategorySeoContent } from '@/lib/seo-data';
import { parseConverterSearchParams } from '@/lib/seo/parse-converter-search-params';
import { hrefFromDeepQuery } from '@/lib/seo/build-converter-href';
import Link from 'next/link';
import { SITE_URL, BRAND_NAME } from '@/lib/brand';
import { buildCategoryToolPageGraph } from '@/lib/seo/json-ld';
import { buildFaqPageGraph } from '@/lib/seo/faq-jsonld';
import {
  Calculator,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  Hash,
  Link2,
  GraduationCap,
  ExternalLink,
  History,
  Sigma,
  Lightbulb,
  Search,
} from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const categoryData = getCategoryBySlug(slug);

  if (!categoryData) return { title: 'Not Found' };

  const data = getCategorySeoContent(categoryData.id);
  const url = `${SITE_URL}/${slug}`;

  if (data) {
    const ogTitle = data.title;
    return {
      metadataBase: new URL(SITE_URL),
      title: data.title,
      description: data.description,
      alternates: { canonical: url },
      openGraph: {
        title: ogTitle,
        description: data.description,
        url,
        type: 'website',
        siteName: BRAND_NAME,
        locale: 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        title: ogTitle,
        description: data.description,
      },
      robots: { index: true, follow: true },
    };
  }

  const fallbackTitle = `${categoryData.name} Converter`;
  const fallbackDesc = `Free online ${categoryData.name} converter. Fast, accurate, and easy to use.`;
  return {
    metadataBase: new URL(SITE_URL),
    title: `${fallbackTitle} | ${BRAND_NAME}`,
    description: fallbackDesc,
    alternates: { canonical: url },
    openGraph: {
      title: `${fallbackTitle} | ${BRAND_NAME}`,
      description: fallbackDesc,
      url,
      type: 'website',
      siteName: BRAND_NAME,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${fallbackTitle} | ${BRAND_NAME}`,
      description: fallbackDesc,
    },
    robots: { index: true, follow: true },
  };
}

export async function generateStaticParams() {
  return converterCategories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const rawSearchParams = await searchParams;

  const categoryData = getCategoryBySlug(slug);

  if (!categoryData) {
    notFound();
  }

  const parsed = parseConverterSearchParams(rawSearchParams, categoryData);

  const seo = getCategorySeoContent(categoryData.id);

  if (!seo) {
    const toolGraph = buildCategoryToolPageGraph({
      site: SITE_URL,
      slug,
      name: `${categoryData.name} Converter`,
      description: `Free online ${categoryData.name} converter. Fast, accurate, and easy to use.`,
      categoryLabel: categoryData.name,
    });
    return (
      <>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(toolGraph) }}
        />
        <ConverterMain
          key={categoryData.id}
          categoryData={categoryData}
          initialFromUnitId={parsed.from}
          initialToUnitId={parsed.to}
          initialValue={parsed.value}
        />
      </>
    );
  }

  const isMathSuite = [
    'percentage',
    'scientific',
    'geometry',
    'algebra',
    'statistics',
    'trigonometry',
    'fractions',
    'discrete',
    'health',
    'finance',
    'tax',
    'timezone',
  ].includes(categoryData.id);

  const jsonLd = buildCategoryToolPageGraph({
    site: SITE_URL,
    slug,
    name: seo.title,
    description: seo.description,
    categoryLabel: categoryData.name,
  });
  const faqJsonLd = buildFaqPageGraph(seo.faqs);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col pb-20">
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

      {isMathSuite ? (
        <MathSuite
          category={categoryData.id}
          categoryData={categoryData}
          initialFromUnitId={parsed.from}
          initialToUnitId={parsed.to}
        />
      ) : (
        <ConverterMain
          key={categoryData.id}
          categoryData={categoryData}
          initialFromUnitId={parsed.from}
          initialToUnitId={parsed.to}
          initialValue={parsed.value}
        />
      )}

      <div className="mt-6 flex flex-col gap-4 px-3 pb-2 sm:mt-12 sm:gap-8 sm:px-0 lg:gap-10">
        <section className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 lg:p-8">
          <div className="mb-3 flex items-center gap-2.5 sm:mb-4 sm:gap-3">
            <div className="rounded-lg bg-blue-50 p-1.5 sm:rounded-xl sm:p-2">
              <Calculator className="h-5 w-5 shrink-0 text-primary sm:h-6 sm:w-6" />
            </div>
            <h1 className="text-xl font-bold leading-snug text-slate-800 sm:text-2xl">{seo.h1}</h1>
          </div>
          <p className="text-[15px] leading-snug text-slate-600 sm:text-base sm:leading-relaxed">{seo.intro}</p>
        </section>

        {seo.history ? (
          <section className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 lg:p-8">
            <h2 className="mb-2 flex items-center gap-2 text-base font-bold text-slate-800 sm:mb-3 sm:text-lg">
              <History className="h-5 w-5 shrink-0 text-slate-600" aria-hidden />
              Why these units exist
            </h2>
            <p className="text-sm leading-snug text-slate-600 sm:leading-relaxed">{seo.history}</p>
          </section>
        ) : null}

        {seo.formula || seo.formulaExplanation ? (
          <section className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 lg:p-8">
            <h2 className="mb-2 flex items-center gap-2 text-base font-bold text-slate-800 sm:mb-3 sm:text-lg">
              <Sigma className="h-5 w-5 shrink-0 text-indigo-500" aria-hidden />
              {seo.formulaHeading ?? 'How the math works'}
            </h2>
            {seo.formula ? (
              <pre className="whitespace-pre-wrap rounded-xl border border-indigo-100 bg-indigo-50/50 p-3 font-mono text-[13px] text-slate-800 sm:rounded-2xl sm:p-4 sm:text-sm">
                {seo.formula}
              </pre>
            ) : null}
            {seo.formulaExplanation ? (
              <p className="mt-3 text-sm leading-snug text-slate-600 sm:mt-4 sm:leading-relaxed">{seo.formulaExplanation}</p>
            ) : null}
          </section>
        ) : null}

        {seo.memoryTips && seo.memoryTips.length > 0 ? (
          <section className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50/80 to-white p-4 shadow-sm sm:rounded-3xl sm:p-6 lg:p-8">
            <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-800 sm:mb-4 sm:text-lg">
              <Lightbulb className="h-5 w-5 shrink-0 text-amber-500" aria-hidden />
              Four ideas worth memorizing
            </h2>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
              {seo.memoryTips.map((tip, i) => (
                <li
                  key={i}
                  className="flex gap-2.5 rounded-xl border border-amber-100/80 bg-white/80 p-3 text-sm leading-snug text-slate-700 shadow-sm sm:gap-3 sm:rounded-2xl sm:p-4 sm:leading-relaxed"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[10px] font-black text-amber-900 sm:h-7 sm:w-7 sm:text-xs">
                    {i + 1}
                  </span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {(seo.internalDeepLinks?.length || seo.references?.length) ? (
          <section className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 md:gap-6">
            {seo.internalDeepLinks && seo.internalDeepLinks.length > 0 ? (
              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 lg:p-8">
                <h2 className="mb-2 flex items-center gap-2 text-base font-bold text-slate-800 sm:mb-3 sm:text-lg">
                  <Link2 className="h-5 w-5 text-violet-500" aria-hidden />
                  Popular conversions on this tool
                </h2>
                <p className="mb-3 text-sm leading-snug text-slate-500 sm:mb-4 sm:leading-normal">
                  Jump straight in with common pairings—each link opens this same calculator with units and a value filled in, so you can bookmark or share it.
                </p>
                <ul className="flex flex-col gap-1.5 sm:gap-2">
                  {seo.internalDeepLinks.map((item) => (
                    <li key={item.query + item.label}>
                      <Link
                        href={hrefFromDeepQuery(slug, item.query)}
                        className="flex items-center justify-between gap-2 rounded-lg border border-violet-100 bg-violet-50/40 px-2.5 py-2 text-sm font-semibold text-violet-900 transition-colors hover:border-violet-200 hover:bg-violet-50 sm:rounded-xl sm:px-3 sm:py-2.5"
                        prefetch={false}
                      >
                        <span>{item.label}</span>
                        <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide text-violet-600">
                          Open →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {seo.references && seo.references.length > 0 ? (
              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 lg:p-8">
                <h2 className="mb-2 flex items-center gap-2 text-base font-bold text-slate-800 sm:mb-3 sm:text-lg">
                  <GraduationCap className="h-5 w-5 text-amber-600" aria-hidden />
                  Where the standards come from
                </h2>
                <p className="mb-3 text-sm leading-snug text-slate-500 sm:mb-4 sm:leading-normal">
                  These are independent references—government labs, international measurement bodies, or university course materials—that explain the definitions behind the numbers. We don’t endorse third-party sites; we point to them for deeper reading.
                </p>
                <ul className="space-y-2 sm:space-y-3">
                  {seo.references.map((ref) => (
                    <li key={ref.href}>
                      <a
                        href={ref.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-2 text-sm font-medium text-primary underline-offset-2 hover:underline"
                      >
                        <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 opacity-70 group-hover:opacity-100" aria-hidden />
                        <span>
                          {ref.label}
                          {ref.source ? (
                            <span className="mt-0.5 block text-xs font-normal text-slate-500">{ref.source}</span>
                          ) : null}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        ) : null}

        <section className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 lg:p-8">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-slate-800 sm:mb-4 sm:text-xl">
              <BookOpen className="h-5 w-5 shrink-0 text-blue-500" aria-hidden /> {seo.howTo.title}
            </h2>
            <div className="flex flex-col gap-3 text-sm text-slate-600 sm:gap-4">
              <p className="rounded-xl border border-blue-100 bg-blue-50 p-3 font-medium leading-snug text-blue-800 sm:rounded-2xl sm:p-4 sm:leading-normal">
                <strong>Short version:</strong> {seo.howTo.snippet}
              </p>
              <ol className="ml-3 flex flex-col gap-2 list-decimal sm:ml-4 sm:gap-3">
                {seo.howTo.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 lg:p-8">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-slate-800 sm:mb-4 sm:text-xl">
              <Hash className="h-5 w-5 shrink-0 text-orange-500" aria-hidden /> Examples people look up
            </h2>
            <div className="grid grid-cols-1 gap-2 sm:gap-3">
              {seo.examples.map((ex, i) => (
                <div key={i} className="flex justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50 p-2.5 sm:gap-3 sm:rounded-xl sm:p-3">
                  <span className="font-bold text-slate-700">{ex.label}</span>
                  <span className="shrink-0 font-black text-primary">{ex.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {seo.topQueries && seo.topQueries.length > 0 ? (
          <section className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 lg:p-8">
            <h2 className="mb-2 flex items-center gap-2 text-base font-bold text-slate-800 sm:mb-3 sm:text-lg">
              <Search className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
              Popular searches we answer on-site
            </h2>
            <p className="mb-3 text-sm leading-snug text-slate-500 sm:mb-4 sm:leading-normal">
              High-intent phrases people type into search engines—each link stays on {BRAND_NAME} with a relevant calculator or example.
            </p>
            <ul className="flex flex-col gap-1.5 sm:gap-2">
              {seo.topQueries.map((q) => (
                <li key={q.label + q.href}>
                  <Link
                    href={q.href}
                    className="flex flex-col gap-0.5 rounded-lg border border-emerald-100 bg-emerald-50/40 px-2.5 py-2 text-sm font-semibold text-emerald-950 transition-colors hover:border-emerald-200 hover:bg-emerald-50 sm:flex-row sm:items-center sm:justify-between sm:rounded-xl sm:px-3 sm:py-2.5"
                  >
                    <span>{q.label}</span>
                    {q.note ? (
                      <span className="text-xs font-normal text-emerald-800/85">{q.note}</span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 lg:p-8">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800 sm:mb-6 sm:text-xl">
            <HelpCircle className="h-5 w-5 shrink-0 text-violet-500" aria-hidden /> Frequently asked questions
          </h2>
          <div className="space-y-4 sm:space-y-6">
            {seo.faqs.map((faq, i) => (
              <div key={i}>
                <h3 className="mb-1.5 flex items-start gap-2 text-[15px] font-bold leading-snug text-slate-800 sm:mb-2 sm:text-base">
                  <CheckCircle2 className="mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 text-primary sm:h-5 sm:w-5" aria-hidden />
                  {faq.question}
                </h3>
                <p className="ml-6 text-sm leading-snug text-slate-600 sm:ml-7 sm:leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <RelatedConverters currentCategoryId={categoryData.id} />
      </div>
    </div>
  );
}
