'use client';

import { ArrowRight, Zap, Target, Award, Rocket, Sparkles, Scale, Thermometer, Database, Calculator, CheckCircle2, HelpCircle, Percent, Wind, Gauge, Clock, Maximize, Ruler, Activity, Wallet, Receipt, Globe } from 'lucide-react';
import Link from 'next/link';
import { converterCategories } from '@/lib/units';
import { useConversion } from '@/lib/ConversionContext';
import { useAuth } from '@/lib/AuthContext';
import { SITE_URL, BRAND_NAME } from '@/lib/brand';
import { buildHomePageGraph } from '@/lib/seo/json-ld';
import { WorldIncrediblePartner } from '@/components/layout/WorldIncrediblePartner';
import { NextJsThanks } from '@/components/layout/NextJsThanks';
import { HomepageTopQueriesTable } from '@/components/home/HomepageTopQueriesTable';

export default function HomePageContent() {
  const { userProfile, user } = useAuth();
  const { recentConversions } = useConversion();

  const jsonLd = buildHomePageGraph(SITE_URL);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Is ${BRAND_NAME} free to use?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our unit conversion tools and calculators are 100% free for everyone, with no limits on daily usage."
        }
      },
      {
        "@type": "Question",
        "name": "What units can I convert here?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We support a wide range of categories including Data Storage (MB to GB), Weight (kg to lbs), Temperature (C to F), Area, Energy, Time, and specialized Mathematical tools like Decimal to Fraction converters."
        }
      }
    ]
  };

  const greeting = user && userProfile?.displayName 
    ? `Welcome back, ${userProfile.displayName.split(' ')[0]}!`
    : `Welcome to ${BRAND_NAME}`;

  return (
    <div className="w-full flex flex-col gap-10 max-w-4xl mx-auto pb-20">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Hero Section */}
      <div className="bg-primary rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-lg shadow-primary/20">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Level Up Your Conversions
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
            {greeting}
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-xl">
            Convert units, complete daily challenges, and earn gems. Turn a boring task into an engaging journey.
          </p>
          <button 
            onClick={() => {
              const el = document.getElementById('all-tools');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white text-primary px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-sm flex items-center gap-2 active:scale-95"
          >
            Start Converting <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        {/* Decorative Background Elements */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none">
          <div className="absolute right-[-10%] top-[-20%] w-64 h-64 rounded-full bg-blue-400 mix-blend-screen blur-3xl"></div>
          <div className="absolute right-[20%] bottom-[-10%] w-48 h-48 rounded-full bg-blue-300 mix-blend-screen blur-2xl"></div>
        </div>
        <Target className="absolute right-10 top-1/2 -translate-y-1/2 w-48 h-48 opacity-10 pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        <WorldIncrediblePartner layout="homepage" />
        <NextJsThanks layout="homepage" />
      </div>

      {/* Navigation & Recent Hub */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Hub / Recent */}
        <div className="md:col-span-1 bg-slate-900 rounded-[32px] p-8 text-white overflow-hidden relative flex flex-col justify-between min-h-[280px] shadow-xl shadow-slate-900/10 group">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
               <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
               <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Jump Back In</h3>
            </div>
            
            {recentConversions.length > 0 ? (
              <div className="animate-in fade-in slide-in-from-left-4">
                 <p className="text-2xl font-black mb-1 leading-tight tracking-tighter">
                   {converterCategories.find(c => c.id === recentConversions[0].categoryId)?.name || 'Conversion'}
                 </p>
                 <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 px-2 py-1 bg-white/5 rounded-full w-fit mt-2">
                    <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="uppercase tracking-widest">{recentConversions[0].fromUnit} ➔ {recentConversions[0].toUnit}</span>
                 </div>
              </div>
            ) : (
              <div className="space-y-2">
                 <p className="text-xl font-bold tracking-tight text-slate-200">New Journey Awaits</p>
                 <p className="text-xs text-slate-500 leading-relaxed font-medium">Your recently used tools and favorite calculators will appear here for one-click access.</p>
              </div>
            )}
          </div>

          <div className="relative z-10 pt-8">
            {recentConversions.length > 0 ? (
              <Link href={`/${converterCategories.find(c => c.id === recentConversions[0].categoryId)?.slug || 'data-storage-converter'}?from=${recentConversions[0].fromUnit}&to=${recentConversions[0].toUnit}&value=${recentConversions[0].fromValue}`}>
                <button className="w-full py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95">
                  Continue Tool <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            ) : (
              <button 
                onClick={() => document.getElementById('all-tools')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-4 bg-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all border border-white/5 shadow-sm active:scale-95"
              >
                Browse All Tools
              </button>
            )}
          </div>
        </div>

        {/* Featured Matrix */}
        <div className="md:col-span-2 bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-8">
             <div className="flex flex-col">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Featured Solvers</h3>
                <p className="text-lg font-black text-slate-800 tracking-tight">Most Popular This Week</p>
             </div>
             <Link href="/learn" className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:opacity-80 transition-opacity">Expert Advice</Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4 flex-1">
             {[
               { name: 'Metric Weight', slug: 'weight-converter', icon: Scale, color: 'text-amber-500 bg-amber-50', desc: 'Precise mass metrics' },
               { name: 'Finance Suite', slug: 'loan-interest-calculator', icon: Wallet, color: 'text-emerald-500 bg-emerald-50', desc: 'Manage your wealth' },
               { name: 'Math Tools', slug: 'scientific-calculator', icon: Calculator, color: 'text-blue-500 bg-blue-50', desc: 'Advanced algorithms' },
               { name: 'Area Master', slug: 'area-converter', icon: Maximize, color: 'text-violet-500 bg-violet-50', desc: 'Spatial measurements' }
             ].map(tool => (
               <Link key={tool.slug} href={tool.slug} className="group p-4 bg-slate-50/50 border border-slate-100 rounded-3xl flex flex-col gap-3 hover:bg-white hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tool.color} group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-800 tracking-tight group-hover:text-primary transition-colors">{tool.name}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tool.desc}</span>
                  </div>
               </Link>
             ))}
          </div>
        </div>
      </div>

      {/* Popular Converters */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" /> Popular Converters
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/decimal-to-fraction" className="group flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-blue-50 hover:border-blue-100 hover:shadow-sm transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                <Calculator className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-700 group-hover:text-primary">Decimal to Fraction</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>

          <Link href="/fraction-to-decimal" className="group flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-blue-50 hover:border-blue-100 hover:shadow-sm transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                <Calculator className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-700 group-hover:text-primary">Fraction to Decimal</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>

      {/* Quick Start Categories */}
      <div id="all-tools" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" /> Explore All Engines
          </h2>
        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Comprehensive Library of Precise Calculators</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
          {converterCategories.map((cat) => {
            let IconClass = Database;
            if (cat.id === 'weight') IconClass = Scale;
            if (cat.id === 'temperature') IconClass = Thermometer;
            if (cat.id === 'speed') IconClass = Gauge;
            if (cat.id === 'time') IconClass = Clock;
            if (cat.id === 'area') IconClass = Maximize;
            if (cat.id === 'energy') IconClass = Zap;
            if (cat.id === 'pressure') IconClass = Wind;
            if (cat.id === 'math') IconClass = Calculator;
            if (cat.id === 'scientific') IconClass = Calculator;
            if (cat.id === 'percentage') IconClass = Percent;
            if (cat.id === 'geometry') IconClass = Ruler;
            if (cat.id === 'algebra') IconClass = Calculator;
            if (cat.id === 'statistics') IconClass = Calculator;
            if (cat.id === 'trigonometry') IconClass = Calculator;
            if (cat.id === 'fractions') IconClass = Calculator;
            if (cat.id === 'discrete') IconClass = Calculator;
            if (cat.id === 'health') IconClass = Activity;
            if (cat.id === 'finance') IconClass = Wallet;
            if (cat.id === 'tax') IconClass = Receipt;
            if (cat.id === 'timezone') IconClass = Globe;

            return (
              <Link key={cat.id} href={`/${cat.slug}`}>
                <div className="group border border-slate-100 bg-slate-50 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-3 cursor-pointer h-full">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconClass className="w-6 h-6 text-slate-600 group-hover:text-primary transition-colors" />
                  </div>
                  <span className="font-bold text-slate-700 text-[11px] uppercase tracking-tight group-hover:text-primary transition-colors">{cat.name}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Why Use It? */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
            <Award className="w-6 h-6 text-blue-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Earn Ranks & Gems</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Every conversion counts towards your next rank. Complete challenges to earn Gems and unlock prestigious badges.
          </p>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
            <Rocket className="w-6 h-6 text-orange-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Build a Streak</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Convert at least once every day to maintain a hot streak. Show off your dedication on the leaderboards.
          </p>
        </div>
      </div>

      {/* FAQ & Authority Section */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-violet-500" /> Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" /> Are these tools free?
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Yes! <strong>{BRAND_NAME}</strong> is free for everyone. Our mission is to provide precision tools that make complex conversions simple and accessible for students, engineers, and everyday users.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" /> How accurate is it?
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              We use industry-standard IEEE floating-point arithmetic for our calculation engine. Whether you&apos;re converting <strong>kilograms to pounds</strong> or <strong>terabytes to gigabytes</strong>, you get precision results instantly.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" /> Can I use it on mobile?
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Our site is fully responsive. It works perfectly on your phone, tablet, and desktop. We even have a dedicated design for iPads to ensure the best possible experience on any device.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" /> What about gamification?
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              We believe math doesn&apos;t have to be boring. By converting units, you earn experience points (XP), build streaks, and unlock achievements. It&apos;s a great way to stay sharp while getting your tasks done.
            </p>
          </div>
        </div>
      </div>

      {/* Internal Linking / Footer SEO */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-200 pt-10 px-4 text-center">
        <Link href="/data-storage-converter" className="hover:text-primary transition-colors">Data Storage</Link>
        <Link href="/weight-converter" className="hover:text-primary transition-colors">Weight</Link>
        <Link href="/temperature-converter" className="hover:text-primary transition-colors">Temperature</Link>
        <Link href="/area-converter" className="hover:text-primary transition-colors">Area</Link>
        <Link href="/time-converter" className="hover:text-primary transition-colors">Time</Link>
        <Link href="/energy-converter" className="hover:text-primary transition-colors">Energy</Link>
        <Link href="/pressure-converter" className="hover:text-primary transition-colors">Pressure</Link>
        <Link href="/scientific-calculator" className="hover:text-primary transition-colors">Scientific</Link>
        <Link href="/percentage-calculator" className="hover:text-primary transition-colors">Percentage</Link>
        <Link href="/geometry-calculator" className="hover:text-primary transition-colors">Geometry</Link>
        <Link href="/algebra-calculator" className="hover:text-primary transition-colors">Algebra</Link>
        <Link href="/statistics-calculator" className="hover:text-primary transition-colors">Statistics</Link>
        <Link href="/calorie-deficit-calculator" className="hover:text-primary transition-colors">Diet</Link>
        <Link href="/loan-interest-calculator" className="hover:text-primary transition-colors">Finance</Link>
        <Link href="/sales-tax-calculator" className="hover:text-primary transition-colors">Taxes</Link>
        <Link href="/math-converter" className="hover:text-primary transition-colors">Math Tools</Link>
      </div>

      <HomepageTopQueriesTable />
    </div>
  );
}
