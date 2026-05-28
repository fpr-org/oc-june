'use client';

import React from 'react';
import { Menu, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useUI } from '@/lib/UIContext';
import StatusBanner from '@/components/gamification/StatusBanner';
import { BRAND_NAME, BRAND_LOGO_SRC } from '@/lib/brand';

export default function MobileHeader() {
  const { toggleMenu, openSearch } = useUI();

  return (
    <header className="flex flex-col sticky top-0 z-[40] bg-white md:hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <button 
          onClick={toggleMenu}
          className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 active:scale-90 transition-all"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-800">
           <Image
            src={BRAND_LOGO_SRC}
            alt={BRAND_NAME}
            width={22}
            height={22}
            className="h-[22px] w-[22px] rounded object-cover ring-1 ring-slate-200"
            priority
           />
           <span className="max-w-[min(12rem,36vw)] text-center text-[11px] font-bold leading-snug tracking-tight text-slate-800 sm:max-w-[14rem] sm:text-xs">
            {BRAND_NAME}
           </span>
        </Link>
  
        <div className="flex items-center gap-2">
          <button 
            onClick={openSearch}
            className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 active:scale-90 transition-all"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
      <StatusBanner />
    </header>
  );
}
