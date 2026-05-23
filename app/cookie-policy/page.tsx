import { Metadata } from 'next';
import { BRAND_NAME } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: `Learn how ${BRAND_NAME} uses cookies and manage your consent preferences.`,
};

export default function CookiePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
      <h1 className="text-3xl font-black text-slate-800 mb-2">Cookie Policy</h1>
      <p className="text-sm text-slate-500 mb-8">Last updated: May 1, 2026</p>

      <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-2">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device that help websites remember preferences, session state, and usage information.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-2">2. Cookie Categories We Use</h2>
          <ul className="list-disc ml-5 space-y-1">
            <li><strong>Essential:</strong> Required for core functionality, login, and security.</li>
            <li><strong>Analytics:</strong> Help us understand usage and improve the experience.</li>
            <li><strong>Personalization:</strong> Save settings and tailor content to your preferences.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-2">3. Your Consent Choices (GDPR)</h2>
          <p>
            You can accept all cookies, reject optional cookies, or set custom preferences. Essential cookies stay enabled because they are necessary for service operation.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-2">4. Updating Preferences</h2>
          <p>
            You can update cookie settings any time through the Cookie Preferences option in the footer.
          </p>
        </section>
      </div>
    </div>
  );
}
