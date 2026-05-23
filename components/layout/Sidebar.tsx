'use client';

import { Database, Ruler, Box, Scale, Thermometer, Gauge, Clock, Maximize, Zap, Power, ChevronRight, Presentation, Calculator, Wind } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { converterCategories } from '@/lib/units';

export default function Sidebar() {
  const pathname = usePathname();

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
  };

  return (
    <aside className="hidden lg:flex flex-col gap-6 w-60 shrink-0">
      {/* Navigation */}
      <nav className="flex flex-col gap-1 bg-white p-2 border border-slate-200 rounded-2xl shadow-sm">
        {converterCategories.map((cat, idx) => {
          const Icon = iconMap[cat.id] || Database;
          const isActive = pathname === `/${cat.slug}` || (pathname === '/' && cat.id === 'data-storage');
          return (
            <Link
              key={idx}
              href={`/${cat.slug}`}
              className={`flex items-center gap-3 px-4 py-3 text-sm rounded-xl font-medium transition-all ${
                isActive
                  ? 'bg-primary text-white shadow-primary/20 shadow-lg'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white/90' : 'text-slate-400'}`} />
              {cat.name}
            </Link>
          );
        })}
        <button className="flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-lg text-slate-800 hover:bg-slate-50">
          <span className="flex items-center gap-3">
            <Presentation className="w-5 h-5 text-slate-400" />
            More Converters
          </span>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </nav>

      {/* Gamification Promo Card */}
      <div className="relative p-6 overflow-hidden text-center bg-gradient-to-b from-blue-50/50 to-blue-50 border border-slate-200 rounded-3xl shadow-sm">
        <div className="relative z-10 flex flex-col items-center gap-3">
          {/* Confetti / Avatar Graphic */}
          <div className="relative w-32 h-32 mb-2 bg-gradient-to-tr from-blue-100 to-transparent rounded-full flex items-center justify-center">
            {/* Mascot Representation */}
            <div className="w-16 h-16 bg-primary rounded-xl shadow-lg transform rotate-[-5deg] relative flex flex-col items-center justify-between p-2">
                <div className="absolute -top-3 w-10 h-3 bg-violet-600 rounded-full transform -rotate-12"></div>
                <div className="flex gap-2 w-full px-1 pt-2">
                   <div className="w-3 h-3 bg-slate-800 rounded-full flex justify-center items-center">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                   </div>
                   <div className="w-3 h-3 bg-slate-800 rounded-full flex justify-center items-center">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                   </div>
                </div>
                <div className="w-6 h-2 bg-blue-900/50 rounded-full mb-1"></div>
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-slate-800">Level up your knowledge!</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Complete conversions, earn XP and unlock achievements.
          </p>
          <button className="w-full px-4 py-3 mt-2 text-sm font-bold text-white transition-all rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
            Start Learning <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
