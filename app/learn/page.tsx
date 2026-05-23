'use client';

import { BookOpen, Star, Gem, Trophy, Flame, Hexagon, Shield, CheckCircle2, ArrowRight, Crown } from 'lucide-react';
import Link from 'next/link';
import { BRAND_NAME } from '@/lib/brand';

export default function LearnPage() {
  return (
    <div className="max-w-4xl mx-auto w-full min-w-0 flex flex-col gap-8 pb-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0 shadow-inner border border-blue-200">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          How to Play & Learn
        </h1>
        <p className="text-slate-500 font-medium text-lg max-w-2xl">
          Welcome to {BRAND_NAME}. Here are the rules, mechanics, and process to level up your rank while converting units.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Core Mechanics */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
              <Hexagon className="w-5 h-5 fill-current" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Core Mechanics</h2>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            Every time you convert a value, whether it&apos;s length, weight, or temperature, it gets recorded in your history. By performing conversions regularly, you can unlock achievements and rise through the ranks.
          </p>
          <ul className="flex flex-col gap-3 mt-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span>Convert any unit and it will be saved in your history automatically.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span>Use different units to unlock the <strong>Unit Master</strong> achievement.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span>Mark frequently used conversions as favorites for quick access.</span>
            </li>
          </ul>
        </div>

        {/* Gems & Rewards */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-violet-50 rounded-full flex items-center justify-center text-violet-500">
              <Gem className="w-5 h-5 fill-current" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Gems & Rewards</h2>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            Gems are the primary currency and reward system. You can earn Gems by participating in activities. Keep converting to collect more!
          </p>
          <div className="bg-slate-50 p-4 rounded-2xl flex flex-col gap-3 border border-slate-100">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-700">
              <span>Daily Challenge Completion</span>
              <span className="text-violet-600 flex items-center gap-1">+50 <Gem className="w-3 h-3 fill-current" /></span>
            </div>
            <div className="flex justify-between items-center text-sm font-semibold text-slate-700">
              <span>First Conversion of the Day</span>
              <span className="text-violet-600 flex items-center gap-1">+10 <Gem className="w-3 h-3 fill-current" /></span>
            </div>
            <div className="flex justify-between items-center text-sm font-semibold text-slate-700">
              <span>New Achievement Unlocked</span>
              <span className="text-violet-600 flex items-center gap-1">+20 <Gem className="w-3 h-3 fill-current" /></span>
            </div>
          </div>
        </div>

        {/* Daily Challenges */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-500">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Daily Challenges</h2>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            Every day at midnight, a new Daily Challenge is available. It tasks you with converting a specific value between two units.
          </p>
          <div className="flex bg-amber-50/50 p-4 rounded-2xl border border-amber-100 mt-2">
            <p className="text-sm font-medium text-amber-800">
              Claim your challenge reward manually in the sidebar to add the Gems to your account. Don&apos;t miss out, as challenges reset daily!
            </p>
          </div>
        </div>

        {/* Streaks */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-500">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Streaks</h2>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            A Streak represents how many consecutive days you have used the app and performed at least one conversion.
          </p>
          <ul className="flex flex-col gap-3 mt-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span>Convert at least once every 24 hours to keep your streak alive.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span>If you miss a day, your streak will reset to 0.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Ranks & Progression */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-primary">
            <Trophy className="w-5 h-5 fill-current" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Ranks & Progression</h2>
        </div>
        <p className="text-slate-600 text-sm">
          Your rank is determined by the total number of conversions you&apos;ve performed across all categories. Try to reach the highest rank!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          
          <div className="border border-slate-100 bg-slate-50 rounded-2xl p-4 flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 shadow-sm">
              <Star className="w-6 h-6 fill-current" />
            </div>
            <span className="font-bold text-slate-800 mt-1">Novice</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">0 Conversions</span>
          </div>

          <div className="border border-slate-100 bg-slate-50 rounded-2xl p-4 flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 shadow-sm">
              <Shield className="w-6 h-6 fill-current" />
            </div>
            <span className="font-bold text-slate-800 mt-1">Silver Converter</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">1-9 Conversions</span>
          </div>

          <div className="border border-amber-100 bg-amber-50/30 rounded-2xl p-4 flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center text-amber-600 shadow-sm">
              <Trophy className="w-6 h-6 fill-current" />
            </div>
            <span className="font-bold text-slate-800 mt-1">Gold Converter</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">10-49 Conversions</span>
          </div>

          <div className="border border-violet-100 bg-violet-50/30 rounded-2xl p-4 flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 bg-violet-200 rounded-full flex items-center justify-center text-violet-600 shadow-sm border border-violet-300">
              <Crown className="w-6 h-6 fill-current" />
            </div>
            <span className="font-bold text-slate-800 mt-1">Unit Master</span>
            <span className="text-xs font-semibold text-violet-600 uppercase tracking-wide">50+ Conversions</span>
          </div>

        </div>

        <div className="flex justify-center mt-4">
          <Link href="/">
            <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-bold shadow-sm transition-all flex items-center gap-2">
              Start Converting Now <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
      
    </div>
  );
}
