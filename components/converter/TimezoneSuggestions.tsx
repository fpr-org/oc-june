'use client';

import React from 'react';
import Link from 'next/link';
import { Category, Unit } from '@/lib/units';
import { Globe, ArrowRight, Zap, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface TimezoneSuggestionsProps {
  categoryData: Category;
  currentFromId: string;
  currentToId: string;
}

export default function TimezoneSuggestions({ categoryData, currentFromId, currentToId }: TimezoneSuggestionsProps) {
  const fromUnit = categoryData.units.find(u => u.id === currentFromId);
  
  if (!fromUnit) return null;

  // 1. Top most searched (Static list)
  const popularPairs = [
    { from: 'utc', to: 'india', name: 'UTC to IST' },
    { from: 'usa-eastern', to: 'india', name: 'EST to IST' },
    { from: 'usa-eastern', to: 'united-kingdom', name: 'EST to GMT' },
    { from: 'japan', to: 'china', name: 'JST to CST' },
    { from: 'india', to: 'australia-sydney', name: 'IST to AEST' },
    { from: 'united-kingdom', to: 'usa-pacific', name: 'GMT to PST' }
  ];

  // 2. Similar to your time zone (Same offset)
  const similarTimezones = categoryData.units.filter(u => 
    u.id !== currentFromId && u.offset === fromUnit.offset
  ).slice(0, 4);

  // 3. Nearby time zones (Offset +/- 1)
  const nearbyTimezones = categoryData.units.filter(u => 
    u.id !== currentFromId && 
    u.offset !== undefined && 
    fromUnit.offset !== undefined &&
    Math.abs(u.offset - fromUnit.offset) === 1
  ).slice(0, 4);

  return (
    <div className="space-y-12 mt-16 px-4 sm:px-0">
      {/* Top Searched */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-amber-50 rounded-xl">
            <Zap className="w-5 h-5 text-amber-500" />
          </div>
          <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Top Most Searched</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {popularPairs.map((pair, i) => (
            <Link 
              key={i} 
              href={`/time/${pair.from}-to-${pair.to}`}
              className="group bg-white border-2 border-slate-50 p-4 rounded-2xl flex items-center justify-between hover:border-primary/20 hover:bg-primary/[0.02] transition-all"
            >
              <span className="font-bold text-slate-600 group-hover:text-primary transition-colors">{pair.name}</span>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </section>

      {/* Similar Offset */}
      {similarTimezones.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-50 rounded-xl">
              <Globe className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Similar to {fromUnit.name}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {similarTimezones.map((u, i) => (
              <Link 
                key={i} 
                href={`/time/${fromUnit.id}-to-${u.id}`}
                className="bg-slate-50 p-4 rounded-2xl flex flex-col gap-1 hover:bg-slate-100 transition-all border-2 border-transparent hover:border-slate-200"
              >
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Same Offset</span>
                <span className="font-bold text-slate-700">{u.name}</span>
                <span className="text-xs text-slate-500">{u.symbol}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Nearby Offset */}
      {nearbyTimezones.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-50 rounded-xl">
              <MapPin className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Nearby Zones (+/- 1h)</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {nearbyTimezones.map((u, i) => (
              <Link 
                key={i} 
                href={`/time/${fromUnit.id}-to-${u.id}`}
                className="bg-slate-50 p-4 rounded-2xl flex flex-col gap-1 hover:bg-slate-100 transition-all border-2 border-transparent hover:border-slate-200"
              >
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Neighboring</span>
                <span className="font-bold text-slate-700">{u.name}</span>
                <span className="text-xs text-slate-500">GMT {u.offset! >= 0 ? '+' : ''}{u.offset}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
