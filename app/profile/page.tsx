'use client';

import { useAuth } from '@/lib/AuthContext';
import { useConversion } from '@/lib/ConversionContext';
import { useFavorite } from '@/lib/FavoriteContext';
import { Flame, Trophy, Award, CheckCircle2, Sparkles, LogIn } from 'lucide-react';
import Image from 'next/image';
import {
  BADGE_DEFINITIONS,
  buildGamificationStats,
  countEarnedBadges,
} from '@/lib/gamification/badge-definitions';
import { BRAND_NAME } from '@/lib/brand';

export default function ProfilePage() {
  const { user, userProfile, loading, openSignInModal } = useAuth();
  const { recentConversions } = useConversion();
  const { favorites } = useFavorite();

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto flex w-full max-w-lg flex-col items-center px-4 pb-16 pt-6 text-center sm:pt-10">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
          <Sparkles className="h-8 w-8 text-primary" aria-hidden />
        </div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Your profile lives in the cloud</h1>
        <p className="mt-3 max-w-md text-sm font-medium leading-relaxed text-slate-600">
          Sign in with Google to unlock streaks, gems, badges, synced history, and favorites on {BRAND_NAME}. New
          accounts are created automatically—no separate sign-up form.
        </p>
        <button
          type="button"
          onClick={() => openSignInModal({ redirectTo: '/profile' })}
          className="mt-8 flex h-14 w-full max-w-sm items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-base font-bold text-white shadow-lg shadow-primary/25 transition-colors hover:bg-primary/90"
        >
          <LogIn className="h-5 w-5" aria-hidden />
          Continue with Google
        </button>
        <p className="mt-4 text-xs font-medium text-slate-500">
          Free forever · Encrypted Google OAuth · You can sign out anytime
        </p>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
      </div>
    );
  }

  const stats = buildGamificationStats({
    userProfile,
    recentConversions,
    favoritesCount: favorites.length,
    isLoggedIn: true,
  });
  const earnedBadgeCount = countEarnedBadges(stats);

  return (
    <div className="max-w-4xl mx-auto w-full min-w-0 flex flex-col gap-8">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-primary to-blue-800 z-0"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-end gap-6 mt-16">
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl bg-indigo-100 flex items-center justify-center overflow-hidden shrink-0">
             {user.photoURL ? (
                <Image src={user.photoURL} alt="Avatar" width={128} height={128} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full bg-violet-600 text-white flex items-center justify-center text-4xl font-bold">
                  {user.email?.[0]?.toUpperCase() || 'U'}
                </div>
              )}
          </div>
          <div className="flex-1 text-center sm:text-left mb-2">
            <h1 className="text-3xl font-extrabold text-slate-800">{userProfile.displayName || 'Anonymous User'}</h1>
            <p className="text-slate-500 font-medium">{user.email}</p>
          </div>
          <div className="flex gap-4">
             <div className="flex flex-col items-center justify-center bg-orange-50 rounded-2xl p-4 border border-orange-100 min-w-[100px]">
                <Flame className="w-8 h-8 text-orange-500 fill-orange-500 mb-1" />
                <span className="text-2xl font-black text-slate-800">{userProfile.streakCount}</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Streak</span>
             </div>
             <div className="flex flex-col items-center justify-center bg-blue-50 rounded-2xl p-4 border border-blue-100 min-w-[100px]">
                <Trophy className="w-8 h-8 text-amber-400 fill-amber-400 mb-1" />
                <span className="text-2xl font-black text-slate-800">{earnedBadgeCount}</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Badges</span>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Badges Section */}
         <div className="lg:col-span-2 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-slate-800">Your Badges</h2>
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-4">
               {BADGE_DEFINITIONS.map((badge) => {
                 const earned = badge.check(stats);
                 const Icon = badge.icon;
                 return (
                 <div key={badge.id} className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border ${earned ? 'border-slate-100 bg-slate-50' : 'border-slate-100 bg-slate-50/50 opacity-60 grayscale'}`}>
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${earned ? 'bg-blue-100' : 'bg-slate-100'}`}>
                      <Icon className={`w-7 h-7 ${earned ? 'text-primary' : 'text-slate-400'}`} />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 text-center leading-tight">{badge.name}</span>
                    <span className="mt-1 text-[10px] text-slate-500 text-center leading-snug">{badge.description}</span>
                    {earned && <CheckCircle2 className="w-4 h-4 text-primary absolute top-2 right-2" />}
                 </div>
               );})}
            </div>

            <h2 className="text-xl font-bold text-slate-800 mt-4">Activity Chart</h2>
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm h-64 flex items-center justify-center">
               <p className="text-slate-400 font-medium">Activity visualization coming soon!</p>
            </div>
         </div>

         {/* Sidebar Stats */}
         <div className="flex flex-col gap-4">
           <h2 className="text-xl font-bold text-slate-800">Stats</h2>
           <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col gap-6">
              <div>
                <p className="text-sm text-slate-500 font-semibold mb-1">Total Conversions</p>
                <p className="text-3xl font-black text-slate-800">{userProfile.totalConversions ?? 0}</p>
              </div>
              <div className="h-px bg-slate-100"></div>
              <div>
                <p className="text-sm text-slate-500 font-semibold mb-1">Longest streak</p>
                <p className="text-xl font-bold text-primary">{userProfile.longestStreak ?? userProfile.streakCount ?? 0} days</p>
              </div>
              <div className="h-px bg-slate-100"></div>
              <div>
                <p className="text-sm text-slate-500 font-semibold mb-1">Rank</p>
                <div className="flex items-center gap-2">
                   <Award className="w-5 h-5 text-indigo-500" />
                   <p className="text-xl font-bold text-slate-800">
                     {(userProfile.totalConversions ?? 0) >= 50
                       ? 'Unit Master'
                       : (userProfile.totalConversions ?? 0) >= 10
                         ? 'Gold Converter'
                         : (userProfile.totalConversions ?? 0) >= 1
                           ? 'Silver Converter'
                           : 'Novice'}
                   </p>
                </div>
              </div>
           </div>
         </div>
      </div>
    </div>
  );
}
