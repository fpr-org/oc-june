'use client';

import {
  Clock,
  Flame,
  Gem,
  Hexagon,
  Star,
  Copy,
  Crown,
  Trophy,
  Award,
  Target,
  ArrowRight,
  CheckCircle2,
  Calendar,
  TrendingUp,
  User,
} from 'lucide-react';
import Image from 'next/image';
import { useConversion } from '@/lib/ConversionContext';
import { useAuth } from '@/lib/AuthContext';
import { useEffect, useState, useMemo } from 'react';
import { getDailyChallenge, getCategoryById } from '@/lib/units';
import { useFavorite } from '@/lib/FavoriteContext';
import { doc, setDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import {
  BADGE_DEFINITIONS,
  buildGamificationStats,
  countEarnedBadges,
} from '@/lib/gamification/badge-definitions';

function getRelativeTime(d: Date | object | undefined): string {
  if (!d) return 'Just now';
  const raw = d as { toDate?: () => Date };
  const time =
    typeof raw.toDate === 'function'
      ? raw.toDate().getTime()
      : d instanceof Date
        ? d.getTime()
        : new Date(d as unknown as string | number).getTime();
  const diff = Math.floor((Date.now() - time) / 1000);
  if (diff < 30) return 'Just now';
  if (diff < 60) return `${diff} sec ago`;
  const mins = Math.floor(diff / 60);
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hr ago`;
  return 'Older';
}

function formatMemberSince(iso?: string): string {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } catch {
    return '—';
  }
}

export default function RightSidePanel() {
  const { recentConversions } = useConversion();
  const { userProfile, user, loading, openSignInModal } = useAuth();
  const { favorites } = useFavorite();
  const [mounted, setMounted] = useState(false);
  const [timeNow, setTimeNow] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTimeNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const challenge = useMemo(() => getDailyChallenge(), []);
  const challengeCategorySlug = getCategoryById(challenge.categoryId)?.slug ?? 'data-storage-converter';

  const challengeCompleted = useMemo(() => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    return recentConversions.some((c) => {
      const d = c.timestamp
        ? typeof (c.timestamp as { toDate?: () => Date }).toDate === 'function'
          ? (c.timestamp as { toDate: () => Date }).toDate()
          : new Date(c.timestamp as string | number)
        : new Date();
      return (
        d >= startOfDay &&
        c.fromValue === challenge.value &&
        (c.fromUnit === challenge.fromSymbol || c.fromUnit === challenge.fromId) &&
        (c.toUnit === challenge.toSymbol || c.toUnit === challenge.toId)
      );
    });
  }, [recentConversions, challenge]);

  const dayOfYear = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }, []);

  const [localClaimed, setLocalClaimed] = useState(false);
  const claimed = localClaimed || userProfile?.lastClaimedChallengeDay === dayOfYear;

  const handleClaim = async () => {
    if (!user || claimed || !challengeCompleted) return;
    setLocalClaimed(true);
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(
        userRef,
        {
          gems: increment(challenge.xp),
          lastClaimedChallengeDay: dayOfYear,
        },
        { merge: true }
      );
    } catch (err) {
      console.error(err);
      setLocalClaimed(false);
    }
  };

  const timeRemaining = useMemo(() => {
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const diff = endOfDay.getTime() - timeNow.getTime();
    if (diff <= 0) return '00:00:00';
    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }, [timeNow]);

  const gamificationStats = useMemo(
    () =>
      buildGamificationStats({
        userProfile,
        recentConversions,
        favoritesCount: favorites.length,
        isLoggedIn: Boolean(user),
      }),
    [userProfile, recentConversions, favorites.length, user]
  );

  const { rank, icon: RankIcon, color } = useMemo(() => {
    const n = gamificationStats.totalConversions;
    if (n >= 50) return { rank: 'Unit Master', icon: Crown, color: 'text-violet-500' };
    if (n >= 10) return { rank: 'Gold Converter', icon: Trophy, color: 'text-amber-500' };
    if (n >= 1) return { rank: 'Silver Converter', icon: Award, color: 'text-slate-400' };
    return { rank: 'Novice', icon: Star, color: 'text-blue-400' };
  }, [gamificationStats.totalConversions]);

  const badgesEarnedCount = useMemo(() => countEarnedBadges(gamificationStats), [gamificationStats]);

  const lastConversion = recentConversions[0];
  const recentFavorites = favorites.slice(0, 3);

  const totalConversionsDisplay = gamificationStats.totalConversions;
  const longestStreakDisplay = user ? gamificationStats.longestStreak : 0;
  const currentStreakDisplay = userProfile?.streakCount ?? 0;

  return (
    <aside className="hidden w-full shrink-0 flex-col gap-6 xl:flex xl:w-[320px]">
      {/* Account (Firebase) */}
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        {user && userProfile ? (
          <div className="flex gap-3">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-slate-100">
              {userProfile.photoURL ? (
                <Image
                  src={userProfile.photoURL}
                  alt=""
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary text-sm font-black text-white">
                  {(userProfile.displayName || userProfile.email || '?')[0]?.toUpperCase()}
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-black text-slate-800">
                {userProfile.displayName || 'Member'}
              </p>
              <p className="truncate text-[10px] font-semibold text-slate-400">{userProfile.email}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                <span className="flex items-center gap-1 text-primary">
                  <Calendar className="h-3 w-3" />
                  Since{' '}
                  {formatMemberSince(
                    userProfile.memberSince || user?.metadata?.creationTime || undefined
                  )}
                </span>
                <span className="flex items-center gap-1 text-violet-600">
                  <TrendingUp className="h-3 w-3" />
                  {badgesEarnedCount}/{BADGE_DEFINITIONS.length} badges
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <User className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-black text-slate-800">Guest mode</p>
              <p className="text-[11px] font-medium leading-snug text-slate-500">
                Sign in to sync streaks, gems, lifetime conversions, and badges to Firebase.
              </p>
              <button
                type="button"
                onClick={() => openSignInModal()}
                className="mt-2 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
              >
                Sign in <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Daily Challenge */}
      <div
        className={`relative overflow-hidden rounded-3xl border p-5 text-center shadow-sm transition-all duration-300 ${challengeCompleted ? 'border-blue-200 bg-blue-50' : 'border-slate-200 bg-white'}`}
      >
        {!challengeCompleted ? (
          <>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">Daily Challenge</h3>
              {mounted && (
                <div className="flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-2 py-1 text-xs font-bold text-indigo-600">
                  <Clock className="h-3 w-3" />
                  {timeRemaining}
                </div>
              )}
            </div>

            <p className="mb-3 mt-4 text-left text-base font-bold text-slate-800">{challenge.title}</p>

            <div className="relative z-10 mb-4 mt-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-sm font-bold text-violet-600">
                <Gem className="h-4 w-4 fill-violet-500 text-violet-500" /> +{challenge.xp} Gems
              </div>
            </div>

            {user ? (
              <Link
                href={`/${challengeCategorySlug}?from=${challenge.fromId}&to=${challenge.toId}&value=${challenge.value}`}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md"
                >
                  Start Challenge <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => openSignInModal()}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md"
              >
                Sign in to start <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </>
        ) : (
          <>
            <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3 py-2">
              <div className="mb-1 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-blue-100 shadow-sm">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Challenge Complete!</h3>

              {!claimed && (
                <button
                  type="button"
                  onClick={handleClaim}
                  className="mt-1 flex animate-pulse items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
                >
                  Claim {challenge.xp} Gems <Gem className="h-4 w-4 fill-white" />
                </button>
              )}
              {claimed && (
                <div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-white/80 px-4 py-2 text-sm font-bold text-primary shadow-sm">
                  Rewards Claimed!
                </div>
              )}
            </div>
            <Star className="absolute left-4 top-4 h-6 w-6 rotate-12 fill-blue-200 text-blue-200 opacity-50" />
            <Star className="absolute bottom-4 right-4 h-8 w-8 -rotate-12 fill-blue-200 text-blue-200 opacity-50" />
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-200/20 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-blue-200/20 blur-2xl" />
          </>
        )}
      </div>

      {/* Your Stats — Firebase-backed when signed in */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800">Your Stats</h3>
          <span
            className={`flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold ${color}`}
          >
            <RankIcon className="h-3 w-3" />
            {rank}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 py-4 shadow-sm">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-orange-50">
              <Flame className="h-5 w-5 fill-orange-500 text-orange-500" />
            </div>
            <span className="mb-0.5 text-lg font-bold leading-none text-slate-800">
              {user ? currentStreakDisplay : '—'}
            </span>
            <span className="text-center text-[9px] font-semibold uppercase tracking-wide text-slate-400">
              Day streak
            </span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 py-4 shadow-sm">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-amber-50">
              <Target className="h-5 w-5 text-amber-600" />
            </div>
            <span className="mb-0.5 text-lg font-bold leading-none text-slate-800">
              {user ? longestStreakDisplay : '—'}
            </span>
            <span className="text-center text-[9px] font-semibold uppercase tracking-wide text-slate-400">
              Best streak
            </span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 py-4 shadow-sm">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-violet-50">
              <Gem className="h-5 w-5 fill-violet-500 text-violet-500" />
            </div>
            <span className="mb-0.5 text-lg font-bold leading-none text-slate-800">
              {userProfile?.gems ?? 0}
            </span>
            <span className="text-center text-[9px] font-semibold uppercase tracking-wide text-slate-400">
              Gems
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-blue-200 bg-white py-4 shadow-sm shadow-blue-100">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-blue-100/30" />
            <div className="relative z-10 mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <Hexagon className="h-5 w-5 fill-primary text-primary" />
            </div>
            <span className="relative z-10 mb-0.5 text-lg font-bold leading-none text-primary">
              {totalConversionsDisplay}
            </span>
            <span className="relative z-10 text-center text-[9px] font-semibold uppercase tracking-wide text-primary">
              {user ? 'Lifetime conv.' : 'This session'}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 py-4 shadow-sm">
            <span className="mb-0.5 text-lg font-bold leading-none text-slate-800">{favorites.length}</span>
            <span className="text-center text-[9px] font-semibold uppercase tracking-wide text-slate-400">
              Favorites
            </span>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-3 py-3">
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Last activity</p>
          <p className="text-sm font-bold text-slate-800">
            {lastConversion ? getRelativeTime(lastConversion.timestamp) : 'N/A'}
          </p>
        </div>
      </div>

      {/* Badges — driven by Firebase totals when signed in */}
      <div className="mt-1 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800">Badges</h3>
          <Link
            href="/profile"
            className="text-sm font-semibold text-blue-500 hover:text-blue-600"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {BADGE_DEFINITIONS.map((badge) => {
            const earned = badge.check(gamificationStats);
            const Icon = badge.icon;
            return (
              <div
                key={badge.id}
                className={`flex flex-col rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm ${!earned ? 'opacity-60 grayscale' : ''}`}
              >
                <div
                  className={`relative mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-primary border-b-primary bg-blue-50 shadow-inner ${earned ? '' : 'border-slate-200'}`}
                >
                  <Icon className={`h-6 w-6 ${earned ? 'text-primary' : 'text-slate-400'}`} />
                  {earned && (
                    <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-primary">
                      <Star className="h-2.5 w-2.5 fill-white text-white" />
                    </div>
                  )}
                </div>
                <span className="text-[11px] font-bold leading-tight text-slate-800">{badge.name}</span>
                <span className="mt-1 text-[9px] font-medium leading-snug text-slate-500">{badge.description}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Conversions */}
      <div className="mt-1 flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-1 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800">Recent Conversions</h3>
          <Link href="/conversions" className="text-sm font-semibold text-blue-500 hover:text-blue-600">
            View all
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {loading && (
            <div className="py-2 text-center text-sm text-slate-500">Loading your data...</div>
          )}
          {recentConversions.map((conv) => (
            <div key={conv.id} className="group flex items-center justify-between">
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-semibold text-slate-700">
                  {conv.fromValue} {conv.fromUnit} → {conv.toUnit}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span
                  className="max-w-[100px] truncate text-right text-sm font-bold text-emerald-600"
                  title={`${conv.toValue} ${conv.toUnit}`}
                >
                  {conv.toValue} {conv.toUnit}
                </span>
                <span className="w-11 text-right text-[10px] font-medium text-slate-400">
                  {getRelativeTime(conv.timestamp)}
                </span>
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(conv.toValue)}
                  className="text-slate-300 transition-colors hover:text-emerald-500"
                  aria-label="Copy result"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
          {!loading && recentConversions.length === 0 && (
            <div className="py-2 text-center text-sm text-slate-500">
              {user ? 'No recent conversions yet.' : 'Sign in to sync recent conversions with Firebase.'}
            </div>
          )}
        </div>
      </div>

      {/* Quick Favorites */}
      <div className="mt-1 flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-1 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800">Quick Favorites</h3>
          <Link href="/favorites" className="text-sm font-semibold text-blue-500 hover:text-blue-600">
            View all
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {recentFavorites.map((fav) => {
            const category = getCategoryById(fav.categoryId);
            const href = category ? `/${category.slug}?from=${fav.fromUnit}&to=${fav.toUnit}&value=1` : '/favorites';
            return (
              <Link
                key={fav.id}
                href={href}
                className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2 transition-colors hover:border-blue-200 hover:bg-blue-50/50"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-black uppercase tracking-wide text-slate-400">
                    {category?.name || fav.categoryId}
                  </span>
                  <span className="text-sm font-semibold text-slate-700">
                    {fav.fromUnit} -&gt; {fav.toUnit}
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-300" />
              </Link>
            );
          })}
          {recentFavorites.length === 0 && (
            <div className="py-2 text-center text-sm text-slate-500">
              {user ? 'No favorites saved yet.' : 'Sign in to save favorites in Firebase.'}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
