'use client';

import { useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  X,
  Sparkles,
  Cloud,
  Shield,
  Gem,
  Loader2,
} from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { BRAND_NAME } from '@/lib/brand';

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export default function SignInModal() {
  const router = useRouter();
  const {
    user,
    signIn,
    signInBusy,
    signInError,
    clearSignInError,
    signInModalOpen,
    closeSignInModal,
    signInRedirectTo,
  } = useAuth();
  const lastActiveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!signInModalOpen) return;
    lastActiveRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
      lastActiveRef.current?.focus?.();
    };
  }, [signInModalOpen]);

  useEffect(() => {
    if (!signInModalOpen || !user) return;
    const to = signInRedirectTo;
    closeSignInModal();
    if (to) router.push(to);
  }, [user, signInModalOpen, signInRedirectTo, closeSignInModal, router]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeSignInModal();
      }
    },
    [closeSignInModal]
  );

  if (!signInModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sign-in-modal-title"
      aria-describedby="sign-in-modal-desc"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/55 backdrop-blur-[2px] transition-opacity"
        aria-label="Close sign-in"
        onClick={() => closeSignInModal()}
      />
      <div
        tabIndex={-1}
        onKeyDown={onKeyDown}
        className="relative z-10 flex max-h-[92vh] w-full max-w-[440px] flex-col overflow-hidden rounded-t-3xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-900/15 sm:rounded-3xl"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-blue-500 to-sky-400" />

        <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Account</p>
            <h2 id="sign-in-modal-title" className="mt-1 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
              Welcome to {BRAND_NAME}
            </h2>
            <p id="sign-in-modal-desc" className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
              One secure sign-in with Google creates your profile—no separate password or sign-up form. New and
              returning users use the same button.
            </p>
          </div>
          <button
            type="button"
            onClick={() => closeSignInModal()}
            className="shrink-0 rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6">
          <ul className="space-y-3 rounded-2xl bg-slate-50/90 p-4 ring-1 ring-slate-100/80">
            <li className="flex gap-3 text-sm font-semibold text-slate-700">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
                <Cloud className="h-4 w-4 text-primary" aria-hidden />
              </span>
              <span>
                <span className="font-black text-slate-800">Sync everywhere</span>
                <span className="mt-0.5 block text-xs font-medium text-slate-500">
                  History, favorites, streaks, and gems follow you on any device.
                </span>
              </span>
            </li>
            <li className="flex gap-3 text-sm font-semibold text-slate-700">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
                <Gem className="h-4 w-4 text-violet-500" aria-hidden />
              </span>
              <span>
                <span className="font-black text-slate-800">Gamification unlocked</span>
                <span className="mt-0.5 block text-xs font-medium text-slate-500">
                  Daily challenges, badges, and ranks are saved to your account.
                </span>
              </span>
            </li>
            <li className="flex gap-3 text-sm font-semibold text-slate-700">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
                <Shield className="h-4 w-4 text-emerald-600" aria-hidden />
              </span>
              <span>
                <span className="font-black text-slate-800">Minimal data</span>
                <span className="mt-0.5 block text-xs font-medium text-slate-500">
                  We use your Google name, email, and photo to personalize your profile—nothing extra required.
                </span>
              </span>
            </li>
          </ul>

          {signInError ? (
            <div
              className="mt-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800"
              role="alert"
            >
              {signInError}
            </div>
          ) : null}

          <button
            type="button"
            disabled={signInBusy}
            onClick={() => {
              clearSignInError();
              void signIn();
            }}
            className="mt-5 flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-[15px] font-bold text-slate-800 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {signInBusy ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin text-primary" aria-hidden />
                Opening Google…
              </>
            ) : (
              <>
                <GoogleMark className="h-5 w-5" />
                Continue with Google
              </>
            )}
          </button>

          <p className="mt-3 flex items-start justify-center gap-1.5 text-center text-[11px] font-medium leading-snug text-slate-500">
            <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" aria-hidden />
            By continuing, you agree to our{' '}
            <Link href="/terms-of-service" className="font-bold text-primary underline-offset-2 hover:underline" onClick={() => closeSignInModal()}>
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/privacy-policy" className="font-bold text-primary underline-offset-2 hover:underline" onClick={() => closeSignInModal()}>
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
