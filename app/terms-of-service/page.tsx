import { Metadata } from 'next';
import { BRAND_NAME } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Review the terms and conditions for using ${BRAND_NAME}.`,
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
      <h1 className="text-3xl font-black text-slate-800 mb-2">Terms of Service</h1>
      <p className="text-sm text-slate-500 mb-8">Last updated: May 1, 2026</p>

      <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or using {BRAND_NAME}, you agree to these Terms of Service and our Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-2">2. Use of Service</h2>
          <p>
            You may use the service for lawful purposes only. You agree not to misuse the platform, interfere with operations, or attempt unauthorized access.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-2">3. Accounts</h2>
          <p>
            Some features require login. You are responsible for maintaining your account security and for activity under your account.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-2">4. Availability and Changes</h2>
          <p>
            We may update, suspend, or discontinue parts of the service at any time to maintain quality, security, and performance.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-2">5. Disclaimer</h2>
          <p>
            Conversions and calculator outputs are provided for general informational use. We do not guarantee fitness for legal, medical, or mission-critical decisions.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-2">6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, {BRAND_NAME} is not liable for indirect or consequential damages arising from service use.
          </p>
        </section>
      </div>
    </div>
  );
}
