import type { Metadata } from 'next';
import ContactUsPageClient from '@/components/marketing/ContactUsPageClient';
import { BRAND_NAME, SITE_URL } from '@/lib/brand';
import { buildBreadcrumbGraph, buildFaqPageGraph } from '@/lib/seo/faq-jsonld';

export const metadata: Metadata = {
  title: `Contact ${BRAND_NAME} Support & Feedback`,
  description: `Contact ${BRAND_NAME} for support, feedback, partnerships, and calculator improvement requests.`,
  alternates: { canonical: '/contact-us' },
  openGraph: {
    title: `Contact ${BRAND_NAME} Support & Feedback`,
    description: 'Reach our team for technical issues, feature requests, and partnership inquiries.',
    url: `${SITE_URL}/contact-us`,
    type: 'website',
  },
};

const faqs = [
  {
    question: 'How quickly do you respond to messages?',
    answer:
      'Most support emails are answered within 1-2 business days. Complex requests may take longer if technical review is needed.',
  },
  {
    question: 'Can I request a new calculator?',
    answer:
      'Yes. Send your use case, expected inputs, and desired output format. We prioritize requests with strong user demand.',
  },
  {
    question: 'Where should I report a calculation issue?',
    answer:
      'Use this contact form and include the exact units, input value, expected result, and your current result so we can verify quickly.',
  },
];

export default function ContactUsPage() {
  const faqGraph = buildFaqPageGraph(faqs);
  const breadcrumbGraph = buildBreadcrumbGraph([
    { name: 'Home', path: '/' },
    { name: 'Contact Us', path: '/contact-us' },
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
      <ContactUsPageClient />
    </>
  );
}
