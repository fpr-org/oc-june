import { Metadata } from 'next';
import { BRAND_NAME, CONTACT_EMAIL } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Read how ${BRAND_NAME} collects, uses, and protects your personal data.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
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
  );
}
