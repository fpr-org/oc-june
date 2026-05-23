'use client';

import { useEffect, useMemo, useState } from 'react';

type ConsentChoice = 'accepted' | 'rejected' | 'custom';

interface ConsentState {
  choice: ConsentChoice;
  essential: true;
  analytics: boolean;
  personalization: boolean;
  updatedAt: string;
}

const STORAGE_KEY = 'oc_cookie_consent_v1';

function saveConsent(state: ConsentState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export default function CookieConsentBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [personalization, setPersonalization] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) setIsOpen(true);
  }, []);

  useEffect(() => {
    const openPreferences = () => {
      const consentRaw = localStorage.getItem(STORAGE_KEY);
      if (consentRaw) {
        try {
          const parsed = JSON.parse(consentRaw) as ConsentState;
          setAnalytics(parsed.analytics);
          setPersonalization(parsed.personalization);
        } catch {
          setAnalytics(false);
          setPersonalization(false);
        }
      }
      setIsOpen(true);
      setIsManageOpen(true);
    };

    window.addEventListener('open-cookie-preferences', openPreferences);
    return () => window.removeEventListener('open-cookie-preferences', openPreferences);
  }, []);

  const consentSummary = useMemo(
    () => (analytics || personalization ? 'Some optional cookies enabled' : 'Only essential cookies enabled'),
    [analytics, personalization]
  );

  const acceptAll = () => {
    saveConsent({
      choice: 'accepted',
      essential: true,
      analytics: true,
      personalization: true,
      updatedAt: new Date().toISOString(),
    });
    setIsOpen(false);
    setIsManageOpen(false);
  };

  const rejectOptional = () => {
    saveConsent({
      choice: 'rejected',
      essential: true,
      analytics: false,
      personalization: false,
      updatedAt: new Date().toISOString(),
    });
    setIsOpen(false);
    setIsManageOpen(false);
  };

  const saveCustom = () => {
    saveConsent({
      choice: 'custom',
      essential: true,
      analytics,
      personalization,
      updatedAt: new Date().toISOString(),
    });
    setIsOpen(false);
    setIsManageOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[120]">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-2xl p-4 sm:p-5">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-800">Cookie & Privacy Preferences</h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">
                We use essential cookies to keep the app secure and working. With your consent, we also use optional cookies for analytics and personalization.
              </p>
            </div>
          </div>

          {isManageOpen && (
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-700">Essential cookies</p>
                  <p className="text-xs text-slate-500">Required for login, security, and core site features.</p>
                </div>
                <span className="text-xs font-bold text-primary">Always On</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-700">Analytics cookies</p>
                  <p className="text-xs text-slate-500">Help us improve performance and product quality.</p>
                </div>
                <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="h-4 w-4 accent-primary" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-700">Personalization cookies</p>
                  <p className="text-xs text-slate-500">Remember preferences and improve your experience.</p>
                </div>
                <input type="checkbox" checked={personalization} onChange={(e) => setPersonalization(e.target.checked)} className="h-4 w-4 accent-primary" />
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <button onClick={acceptAll} className="px-4 py-2 rounded-lg bg-primary text-white text-xs sm:text-sm font-bold hover:bg-primary/90 transition-colors">
              Accept All
            </button>
            <button onClick={rejectOptional} className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-50 transition-colors">
              Reject Optional
            </button>
            {!isManageOpen ? (
              <button onClick={() => setIsManageOpen(true)} className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-50 transition-colors">
                Customize
              </button>
            ) : (
              <button onClick={saveCustom} className="px-4 py-2 rounded-lg border border-primary text-primary text-xs sm:text-sm font-bold hover:bg-primary/5 transition-colors">
                Save Preferences
              </button>
            )}
            <p className="text-[11px] text-slate-500 sm:ml-auto">{consentSummary}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
