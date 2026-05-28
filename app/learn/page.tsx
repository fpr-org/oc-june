import type { Metadata } from 'next';
import LearnPageClient from '@/components/marketing/LearnPageClient';
import { BRAND_NAME, SITE_URL } from '@/lib/brand';
import { buildBreadcrumbGraph, buildFaqPageGraph } from '@/lib/seo/faq-jsonld';

export const metadata: Metadata = {
  title: `How It Works: Rewards, Streaks & Progression`,
  description: `Learn how ${BRAND_NAME} works, including conversions, daily challenges, streaks, achievements, and rank progression.`,
  alternates: { canonical: '/learn' },
  openGraph: {
    title: `How It Works: Rewards, Streaks & Progression | ${BRAND_NAME}`,
    description: `Understand gameplay mechanics, rewards, and smart usage tips to get more value from ${BRAND_NAME}.`,
    url: `${SITE_URL}/learn`,
    type: 'website',
  },
};

const faqs = [
  {
    question: 'Do I need an account to use converters?',
    answer:
      'No. You can use all core converters without an account. Signing in unlocks progress tracking, achievements, streaks, and favorites across devices.',
  },
  {
    question: 'How are streaks counted?',
    answer:
      'A streak increases when you complete at least one conversion in a 24-hour window. If you skip a day, the streak resets and starts again at 1 on your next conversion.',
  },
  {
    question: 'What is the fastest way to level up?',
    answer:
      'Use multiple categories, complete daily challenges, and save frequently used conversions to favorites. This combination helps you earn rewards and rank up consistently.',
  },
];

export default function LearnPage() {
  const faqGraph = buildFaqPageGraph(faqs);
  const breadcrumbGraph = buildBreadcrumbGraph([
    { name: 'Home', path: '/' },
    { name: 'Learn', path: '/learn' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqGraph) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbGraph) }}
      />
      <LearnPageClient />
    </>
  );
}
