'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Database,
  Ruler,
  Box,
  Scale,
  Thermometer,
  Gauge,
  Clock,
  Maximize,
  Zap,
  Calculator,
  LayoutGrid,
  ChevronRight,
  User,
  HelpCircle,
  Wind,
  Percent,
  Globe,
  Activity,
  Wallet,
  Receipt,
  Mail,
  Twitter,
  Github,
  BookOpen,
  LogIn,
  Gem,
  Flame,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUI } from '@/lib/UIContext';
import { useAuth } from '@/lib/AuthContext';
import { converterCategories } from '@/lib/units';
import type { LucideIcon } from 'lucide-react';
import { BRAND_NAME, BRAND_LOGO_SRC, CONTACT_EMAIL, getCopyrightLine } from '@/lib/brand';
import { WorldIncrediblePartner } from '@/components/layout/WorldIncrediblePartner';
import { NextJsThanks } from '@/components/layout/NextJsThanks';

const iconMap: Record<string, LucideIcon> = {
  'data-storage': Database,
  length: Ruler,
  volume: Box,
  weight: Scale,
  temperature: Thermometer,
  speed: Gauge,
  time: Clock,
  area: Maximize,
  energy: Zap,
  pressure: Wind,
  math: Calculator,
  scientific: Calculator,
  percentage: Percent,
  geometry: Ruler,
  algebra: Calculator,
  statistics: Calculator,
  trigonometry: Calculator,
  fractions: Calculator,
  discrete: Calculator,
  health: Activity,
  finance: Wallet,
  tax: Receipt,
  timezone: Globe,
};

/** Crawlable social / contact endpoints — update hrefs when brand profiles go live. */
const socialLinks = [
  {
    label: 'Email the team',
    href: `mailto:${CONTACT_EMAIL}`,
    icon: Mail,
  },
  {
    label: 'Learning guides',
    href: '/learn',
    icon: BookOpen,
  },
  {
    label: 'X (Twitter)',
    href: 'https://twitter.com/',
    icon: Twitter,
    external: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/',
    icon: Github,
    external: true,
  },
] as const;

export default function MobileMenu() {
  const { isMenuOpen, closeMenu } = useUI();
  const pathname = usePathname();
  const { user, userProfile, openSignInModal, loading } = useAuth();

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm md:hidden"
            aria-hidden
          />

          <motion.div
            id="mobile-drawer-menu"
            role="dialog"
            aria-modal="true"
            aria-label={`${BRAND_NAME} navigation and account`}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed inset-y-0 left-0 z-[101] flex w-[min(100%,20rem)] max-w-sm flex-col bg-white shadow-2xl md:hidden"
          >
            <nav
              className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain"
              aria-label="Mobile primary"
            >
              <header className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b border-slate-100 bg-white/95 px-3 py-3 backdrop-blur-sm">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="group flex min-w-0 flex-1 items-center gap-2"
                >
                  <Image
                    src={BRAND_LOGO_SRC}
                    alt={BRAND_NAME}
                    width={32}
                    height={32}
                    className="h-8 w-8 shrink-0 rounded-lg object-cover ring-1 ring-slate-200"
                    priority
                  />
                  <div className="min-w-0 text-left">
                    <span className="block truncate text-sm font-black leading-tight tracking-tight text-slate-800">
                      {BRAND_NAME}
                    </span>
                    <span className="block truncate text-[10px] font-semibold leading-snug text-slate-500">
                      Free converters &amp; calculators — metric &amp; imperial
                    </span>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={closeMenu}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition-all active:scale-95"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </header>

              {/* Account — real user data when signed in */}
              <div className="border-b border-slate-100 px-3 py-3">
                {loading ? (
                  <div className="h-[4.5rem] animate-pulse rounded-2xl bg-slate-100" aria-hidden />
                ) : user && userProfile ? (
                  <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-slate-900 p-3 text-white shadow-md shadow-blue-900/20">
                    <div className="flex items-center gap-2.5">
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-white/20 bg-white/10">
                        {userProfile.photoURL ? (
                          <Image
                            src={userProfile.photoURL}
                            alt=""
                            width={44}
                            height={44}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <User className="m-auto h-6 w-6 opacity-90" aria-hidden />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-black leading-tight">
                          {userProfile.displayName || 'Member'}
                        </p>
                        <p className="truncate text-[10px] font-medium text-white/75">{userProfile.email}</p>
                      </div>
                    </div>
                    <div className="mt-2.5 grid grid-cols-3 gap-1.5 text-center">
                      <div className="rounded-lg bg-white/10 px-1 py-1.5">
                        <p className="text-[8px] font-bold uppercase tracking-wide text-white/65">Streak</p>
                        <p className="flex items-center justify-center gap-0.5 text-sm font-black">
                          {userProfile.streakCount ?? 0}{' '}
                          <Flame className="h-3 w-3 fill-amber-300 text-amber-200" aria-hidden />
                        </p>
                      </div>
                      <div className="rounded-lg bg-white/10 px-1 py-1.5">
                        <p className="text-[8px] font-bold uppercase tracking-wide text-white/65">Gems</p>
                        <p className="flex items-center justify-center gap-0.5 text-sm font-black">
                          {userProfile.gems ?? 0}{' '}
                          <Gem className="h-3 w-3 text-sky-200" aria-hidden />
                        </p>
                      </div>
                      <Link
                        href="/profile"
                        onClick={closeMenu}
                        className="flex items-center justify-center rounded-lg bg-white/15 px-1 py-1.5 text-[10px] font-black uppercase tracking-wide text-white transition-colors hover:bg-white/25"
                      >
                        Profile
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/90 p-3.5 shadow-sm ring-1 ring-slate-100/80">
                    <div className="flex items-start gap-2.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/15">
                        <User className="h-5 w-5 text-primary" aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-black text-slate-800">Continue with Google</p>
                        <p className="mt-0.5 text-[11px] leading-snug text-slate-500">
                          One tap to sync streaks, gems, history, and favorites—no password to remember.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        openSignInModal();
                        closeMenu();
                      }}
                      className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-xs font-black uppercase tracking-wide text-white shadow-md shadow-primary/25 transition-colors hover:bg-primary/90"
                    >
                      <LogIn className="h-3.5 w-3.5" aria-hidden />
                      Sign in
                    </button>
                  </div>
                )}
              </div>

              <div className="px-2 py-2">
                <h2
                  id="mobile-menu-converters-heading"
                  className="px-2 pb-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400"
                >
                  All converters &amp; tools
                </h2>
                <ul className="flex flex-col gap-0.5" role="list" aria-labelledby="mobile-menu-converters-heading">
                  <li>
                    <Link
                      href="/"
                      onClick={closeMenu}
                      className={`flex items-center justify-between gap-2 rounded-xl px-2.5 py-2.5 text-left text-sm font-bold transition-colors ${
                        pathname === '/'
                          ? 'bg-blue-50 text-primary ring-1 ring-blue-100'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                          <LayoutGrid className="h-4 w-4" aria-hidden />
                        </span>
                        <span className="truncate">Home</span>
                      </span>
                      {pathname === '/' ? (
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                      ) : (
                        <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" aria-hidden />
                      )}
                    </Link>
                  </li>
                  {converterCategories.map((cat) => {
                    const Icon = iconMap[cat.id] || Database;
                    const href = `/${cat.slug}`;
                    const isActive = pathname === href;
                    return (
                      <li key={cat.id}>
                        <Link
                          href={href}
                          onClick={closeMenu}
                          className={`flex items-center justify-between gap-2 rounded-xl px-2.5 py-2.5 text-left transition-colors ${
                            isActive
                              ? 'bg-blue-50 text-primary ring-1 ring-blue-100'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="flex min-w-0 items-center gap-2.5">
                            <span
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                                isActive ? 'bg-primary text-white shadow-sm' : 'bg-slate-100 text-slate-500'
                              }`}
                            >
                              <Icon className="h-4 w-4" aria-hidden />
                            </span>
                            <span className="min-w-0 truncate text-[13px] font-bold">{cat.name}</span>
                          </span>
                          {isActive ? (
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                          ) : (
                            <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" aria-hidden />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="border-t border-slate-100 px-2 py-2">
                <h2 className="px-2 pb-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Connect &amp; help
                </h2>
                <ul className="mb-2 flex flex-wrap gap-1.5" role="list" aria-label="Social and contact links">
                  {socialLinks.map((s) => {
                    const Icon = s.icon;
                    const external = 'external' in s && s.external;
                    return (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          onClick={closeMenu}
                          className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] font-bold text-slate-600 shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
                        >
                          <Icon className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
                          <span className="max-w-[7.5rem] truncate">{s.label}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <ul className="flex flex-col gap-0.5">
                  <li>
                    <Link
                      href="/contact-us"
                      onClick={closeMenu}
                      className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      <Mail className="h-4 w-4 text-slate-400" aria-hidden />
                      Contact &amp; feedback
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/learn"
                      onClick={closeMenu}
                      className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      <BookOpen className="h-4 w-4 text-slate-400" aria-hidden />
                      Learning center
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy-policy"
                      onClick={closeMenu}
                      className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-500 hover:bg-slate-50"
                    >
                      <HelpCircle className="h-3.5 w-3.5 text-slate-400" aria-hidden />
                      Privacy &amp; legal
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>

            <footer className="shrink-0 border-t border-slate-100 bg-slate-50/80 px-3 py-2.5">
              <p className="text-[10px] font-semibold leading-snug text-slate-500">
                <span className="font-black text-slate-700">{BRAND_NAME}</span>
                {' — '}
                unit conversion, time zones, and math tools. No login required to convert.
              </p>
              <p className="mt-1 text-[9px] leading-snug text-slate-400">{getCopyrightLine(new Date().getFullYear())}</p>
              <div className="mt-3 flex flex-col items-center gap-3 border-t border-slate-200/80 pt-3">
                <WorldIncrediblePartner layout="footer" />
                <NextJsThanks layout="footer" />
              </div>
            </footer>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
