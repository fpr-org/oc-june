'use client';

import React from 'react';
import { 
  Database, Ruler, Box, Scale, Thermometer, 
  Gauge, Clock, Maximize, Zap, Calculator, 
  Wind, ArrowRight, Layers, Percent,
  Activity, Wallet, Receipt, Globe, Search
} from 'lucide-react';
import Link from 'next/link';
import { converterCategories } from '@/lib/units';
import { motion } from 'motion/react';
import {
  EXPLORE_MORE_TOOLS_COUNT,
  getExploreTopQueriesForCategory,
  getExploreTopQueriesSectionMeta,
} from '@/lib/seo-data';

const iconMap: Record<string, any> = {
  'data-storage': Database,
  'length': Ruler,
  'volume': Box,
  'weight': Scale,
  'temperature': Thermometer,
  'speed': Gauge,
  'time': Clock,
  'area': Maximize,
  'energy': Zap,
  'pressure': Wind,
  'math': Calculator,
  'scientific': Calculator,
  'percentage': Percent,
  'geometry': Ruler,
  'algebra': Calculator,
  'statistics': Calculator,
  'trigonometry': Calculator,
  'fractions': Calculator,
  'discrete': Calculator,
  'health': Activity,
  'finance': Wallet,
  'tax': Receipt,
  'timezone': Globe,
};

const colorConfig: Record<string, { bg: string, text: string, blob: string, hoverText: string, hoverUnder: string, hoverBorder: string }> = {
  'data-storage': { bg: 'bg-blue-50', text: 'text-primary', blob: 'bg-primary/5', hoverText: 'group-hover:text-primary', hoverUnder: 'group-hover:bg-blue-50', hoverBorder: 'group-hover:border-blue-100' },
  'length': { bg: 'bg-blue-50', text: 'text-blue-500', blob: 'bg-blue-500/5', hoverText: 'group-hover:text-blue-500', hoverUnder: 'group-hover:bg-blue-50', hoverBorder: 'group-hover:border-blue-100' },
  'volume': { bg: 'bg-indigo-50', text: 'text-indigo-500', blob: 'bg-indigo-500/5', hoverText: 'group-hover:text-indigo-500', hoverUnder: 'group-hover:bg-indigo-50', hoverBorder: 'group-hover:border-indigo-100' },
  'weight': { bg: 'bg-rose-50', text: 'text-rose-500', blob: 'bg-rose-500/5', hoverText: 'group-hover:text-rose-500', hoverUnder: 'group-hover:bg-rose-50', hoverBorder: 'group-hover:border-rose-100' },
  'temperature': { bg: 'bg-orange-50', text: 'text-orange-500', blob: 'bg-orange-500/5', hoverText: 'group-hover:text-orange-500', hoverUnder: 'group-hover:bg-orange-50', hoverBorder: 'group-hover:border-orange-100' },
  'speed': { bg: 'bg-cyan-50', text: 'text-cyan-500', blob: 'bg-cyan-500/5', hoverText: 'group-hover:text-cyan-500', hoverUnder: 'group-hover:bg-cyan-50', hoverBorder: 'group-hover:border-cyan-100' },
  'time': { bg: 'bg-amber-50', text: 'text-amber-500', blob: 'bg-amber-500/5', hoverText: 'group-hover:text-amber-500', hoverUnder: 'group-hover:bg-amber-50', hoverBorder: 'group-hover:border-amber-100' },
  'area': { bg: 'bg-violet-50', text: 'text-violet-500', blob: 'bg-violet-500/5', hoverText: 'group-hover:text-violet-500', hoverUnder: 'group-hover:bg-violet-50', hoverBorder: 'group-hover:border-violet-100' },
  'energy': { bg: 'bg-yellow-50', text: 'text-yellow-500', blob: 'bg-yellow-500/5', hoverText: 'group-hover:text-yellow-500', hoverUnder: 'group-hover:bg-yellow-50', hoverBorder: 'group-hover:border-yellow-100' },
  'pressure': { bg: 'bg-sky-50', text: 'text-sky-500', blob: 'bg-sky-500/5', hoverText: 'group-hover:text-sky-500', hoverUnder: 'group-hover:bg-sky-50', hoverBorder: 'group-hover:border-sky-100' },
  'math': { bg: 'bg-fuchsia-50', text: 'text-fuchsia-500', blob: 'bg-fuchsia-500/5', hoverText: 'group-hover:text-fuchsia-500', hoverUnder: 'group-hover:bg-fuchsia-50', hoverBorder: 'group-hover:border-fuchsia-100' },
  'scientific': { bg: 'bg-blue-50', text: 'text-primary', blob: 'bg-primary/5', hoverText: 'group-hover:text-primary', hoverUnder: 'group-hover:bg-blue-50', hoverBorder: 'group-hover:border-blue-100' },
  'percentage': { bg: 'bg-blue-50', text: 'text-blue-500', blob: 'bg-blue-500/5', hoverText: 'group-hover:text-blue-500', hoverUnder: 'group-hover:bg-blue-50', hoverBorder: 'group-hover:border-blue-100' },
  'geometry': { bg: 'bg-indigo-50', text: 'text-indigo-500', blob: 'bg-indigo-500/5', hoverText: 'group-hover:text-indigo-500', hoverUnder: 'group-hover:bg-indigo-50', hoverBorder: 'group-hover:border-indigo-100' },
  'algebra': { bg: 'bg-rose-50', text: 'text-rose-500', blob: 'bg-rose-500/5', hoverText: 'group-hover:text-rose-500', hoverUnder: 'group-hover:bg-rose-50', hoverBorder: 'group-hover:border-rose-100' },
  'statistics': { bg: 'bg-orange-50', text: 'text-orange-500', blob: 'bg-orange-500/5', hoverText: 'group-hover:text-orange-500', hoverUnder: 'group-hover:bg-orange-50', hoverBorder: 'group-hover:border-orange-100' },
  'trigonometry': { bg: 'bg-cyan-50', text: 'text-cyan-500', blob: 'bg-cyan-500/5', hoverText: 'group-hover:text-cyan-500', hoverUnder: 'group-hover:bg-cyan-50', hoverBorder: 'group-hover:border-cyan-100' },
  'fractions': { bg: 'bg-amber-50', text: 'text-amber-500', blob: 'bg-amber-500/5', hoverText: 'group-hover:text-amber-500', hoverUnder: 'group-hover:bg-amber-50', hoverBorder: 'group-hover:border-amber-100' },
  'discrete': { bg: 'bg-violet-50', text: 'text-violet-500', blob: 'bg-violet-500/5', hoverText: 'group-hover:text-violet-500', hoverUnder: 'group-hover:bg-violet-50', hoverBorder: 'group-hover:border-violet-100' },
  'health': { bg: 'bg-rose-50', text: 'text-rose-500', blob: 'bg-rose-500/5', hoverText: 'group-hover:text-rose-500', hoverUnder: 'group-hover:bg-rose-50', hoverBorder: 'group-hover:border-rose-100' },
  'finance': { bg: 'bg-indigo-50', text: 'text-indigo-500', blob: 'bg-indigo-500/5', hoverText: 'group-hover:text-indigo-500', hoverUnder: 'group-hover:bg-indigo-50', hoverBorder: 'group-hover:border-indigo-100' },
  'tax': { bg: 'bg-amber-50', text: 'text-amber-500', blob: 'bg-amber-500/5', hoverText: 'group-hover:text-amber-500', hoverUnder: 'group-hover:bg-amber-50', hoverBorder: 'group-hover:border-amber-100' },
};

export default function RelatedConverters({ currentCategoryId }: { currentCategoryId: string }) {
  const topQueries = getExploreTopQueriesForCategory(currentCategoryId);
  const topSection = getExploreTopQueriesSectionMeta(currentCategoryId);

  const related = converterCategories
    .filter((c) => c.id !== currentCategoryId)
    .sort((a, b) => {
        const isAMath = ['math', 'scientific', 'percentage', 'geometry', 'algebra', 'statistics', 'trigonometry', 'fractions', 'discrete'].includes(a.id);
        const isBMath = ['math', 'scientific', 'percentage', 'geometry', 'algebra', 'statistics', 'trigonometry', 'fractions', 'discrete'].includes(b.id);
        const isCurrentMath = ['math', 'scientific', 'percentage', 'geometry', 'algebra', 'statistics', 'trigonometry', 'fractions', 'discrete'].includes(currentCategoryId);
        
        if (isCurrentMath && isAMath && !isBMath) return -1;
        if (isCurrentMath && !isAMath && isBMath) return 1;
        return 0;
    })
    .slice(0, EXPLORE_MORE_TOOLS_COUNT);

  return (
    <section className="mt-8 px-3 sm:mt-12 sm:px-0 lg:mt-16">
      <div className="mb-3 flex items-center justify-between gap-2 px-0 sm:mb-6 sm:px-1">
        <div className="min-w-0">
          <h3 className="text-lg font-black uppercase tracking-tight text-slate-800 sm:text-xl">Explore More Tools</h3>
          <p className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:mt-1 sm:text-xs">
            Smart conversions for every need
          </p>
        </div>
        <Link
          href="/"
          className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-primary transition-colors hover:bg-blue-100 sm:px-3 sm:py-1.5 sm:text-[10px]"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-12 md:gap-4">
        {related.map((cat, idx) => {
          const Icon = iconMap[cat.id] || Database;
          const colors = colorConfig[cat.id] || colorConfig['data-storage'];
          const accentColor = cat.id === 'data-storage' ? 'group-hover:bg-emerald-500' : 
                            cat.id === 'length' ? 'group-hover:bg-blue-500' :
                            cat.id === 'volume' ? 'group-hover:bg-indigo-500' :
                            cat.id === 'weight' ? 'group-hover:bg-rose-500' :
                            cat.id === 'temperature' ? 'group-hover:bg-orange-500' :
                            cat.id === 'speed' ? 'group-hover:bg-cyan-500' :
                            cat.id === 'time' ? 'group-hover:bg-amber-500' :
                            cat.id === 'area' ? 'group-hover:bg-violet-500' :
                            cat.id === 'energy' ? 'group-hover:bg-yellow-500' :
                            cat.id === 'pressure' ? 'group-hover:bg-sky-500' : 'group-hover:bg-fuchsia-500';
          
          const colSpan =
            idx < 4 ? 'md:col-span-3' : 'md:col-span-4';

          return (
            <motion.div
              key={cat.id}
              className={colSpan}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(idx * 0.04, 0.35) }}
            >
              <Link 
                href={`/${cat.slug}`}
                className="group relative block overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 sm:rounded-[32px] sm:p-6"
              >
                {/* Decorative Background Blob */}
                <div className={`absolute -right-4 -top-4 w-24 h-24 ${colors.blob} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`} />
                
                <div className="relative z-10">
                  <div
                    className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl shadow-sm ${colors.bg} transition-transform duration-500 group-hover:scale-110 sm:mb-5 sm:h-14 sm:w-14 sm:rounded-2xl`}
                  >
                    <Icon className={`h-6 w-6 ${colors.text} transition-colors sm:h-7 sm:w-7`} />
                  </div>
                  
                  <div className="space-y-0.5 sm:space-y-1">
                    <h4 className="text-sm font-black uppercase tracking-tight text-slate-800 transition-colors group-hover:text-primary sm:text-base">
                      {cat.name}
                    </h4>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                       <Layers className="h-2.5 w-2.5 shrink-0 text-slate-300 sm:h-3 sm:w-3" />
                       <p className="text-[9px] font-bold uppercase leading-none tracking-widest text-slate-400 sm:text-[10px]">
                         {cat.units.length} Units Available
                       </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between sm:mt-6">
                    <span className={`text-[9px] font-black uppercase tracking-widest bg-slate-50 text-slate-400 px-2.5 py-1 rounded-lg border border-slate-100 ${colors.hoverUnder} ${colors.hoverText} ${colors.hoverBorder} transition-all`}>
                      Open Tool
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 ${accentColor} group-hover:text-white transition-all group-hover:rotate-45`}>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/80 p-3 sm:mt-8 sm:rounded-3xl sm:p-5">
        <div className="mb-3 flex items-center gap-2 sm:mb-4">
          <Search className="h-4 w-4 shrink-0 text-primary sm:h-5 sm:w-5" aria-hidden />
          <div className="min-w-0">
            <h4 className="text-sm font-black uppercase tracking-tight text-slate-800 sm:text-base">
              {topSection.title}
            </h4>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:text-xs">
              {topSection.subtitle}
            </p>
          </div>
        </div>
        <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-2">
          {topQueries.map((q) => (
            <li key={q.label + q.href}>
              <Link
                href={q.href}
                prefetch={false}
                className="group flex items-center justify-between gap-2 rounded-xl border border-white bg-white px-3 py-2 text-left text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:border-primary/20 hover:bg-blue-50/50 hover:text-primary sm:text-sm"
              >
                <span className="min-w-0 leading-snug">{q.label}</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-300 transition-colors group-hover:text-primary" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
