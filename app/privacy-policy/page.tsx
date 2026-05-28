import { Metadata } from 'next';
import { BRAND_NAME, CONTACT_EMAIL } from '@/lib/brand';
import Link from 'next/link';
import { buildFaqPageGraph } from '@/lib/seo/faq-jsonld';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Read how ${BRAND_NAME} collects, uses, and protects your personal data.`,
};

const faqs = [
  {
    question: 'What personal data does Online Calculators collect?',
    answer:
      'We collect account details you provide and product usage data needed to deliver favorites, history, streaks, and account security features.',
  },
  {
    question: 'How can I request access or deletion of my data?',
    answer:
      'You can contact us by email and request access, correction, or deletion of your personal data where applicable under privacy law.',
  },
  {
    question: 'Can I change cookie and tracking consent later?',
    answer:
      'Yes. You can update consent at any time through Cookie Preferences available in the footer.',
  },
];

export default function PrivacyPolicyPage() {
  const faqGraph = buildFaqPageGraph(faqs);

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-6">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqGraph) }}
      />
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
        <h1 className="text-3xl font-black text-slate-800 mb-2">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: May 1, 2026</p>

        <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-2">1. Information We Collect</h2>
            <p>
              We collect account information (such as name, email, and profile image) when you sign in, along with usage data needed to provide converter history, favorites, streaks, and related features.
            </p>
          </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-2">2. How We Use Information</h2>
          <p>
            We use your data to operate and improve the service, personalize your experience, maintain security, and support product analytics where consent is provided.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-2">3. Cookies and Similar Technologies</h2>
          <p>
            Essential cookies are always used for core functionality. Optional analytics and personalization cookies are used only based on your consent preferences.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-2">4. GDPR Rights</h2>
          <p>
            If you are in the EEA/UK, you may have rights to access, correct, delete, or restrict processing of your personal data, and to withdraw cookie consent at any time through Cookie Preferences.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-2">5. Data Retention and Security</h2>
          <p>
            We retain information only as long as needed for service delivery and legal obligations, and we apply reasonable safeguards to protect your data.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-2">6. Contact</h2>
          <p>
            For privacy-related requests, email{' '}
            <a className="text-primary hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>{' '}
            or use the contact form on this site.
          </p>
        </section>
        </div>
      </div>
      <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Privacy FAQ</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <h3 className="text-base font-bold text-slate-800">{faq.question}</h3>
              <p className="text-sm text-slate-600 mt-1">{faq.answer}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-600">
          Related policies: <Link href="/cookie-policy" className="text-primary font-semibold hover:underline">Cookie Policy</Link> and{' '}
          <Link href="/terms-of-service" className="text-primary font-semibold hover:underline">Terms of Service</Link>.
        </p>
      </section>
    </div>
  );
}
