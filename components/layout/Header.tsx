'use client';

import { ChevronDown, Star, Clock, Target, BookOpen, Flame, Gem, Plus, User, LogOut, Search, Calendar, ChevronRight, Globe } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { useUI } from '@/lib/UIContext';
import Image from 'next/image';
import Link from 'next/link';
import { getDailyChallenge, converterCategories, getCategoryById } from '@/lib/units';
import { useMemo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import StatusBanner from '@/components/gamification/StatusBanner';
import { BRAND_NAME, SITE_URL, BRAND_LOGO_SRC } from '@/lib/brand';
import { buildSiteNavigationItemList } from '@/lib/seo/json-ld';

export default function Header() {
  const { user, userProfile, openSignInModal, logOut } = useAuth();
  const { openSearch } = useUI();
  const challenge = useMemo(() => getDailyChallenge(), []);
  const challengeCategorySlug = getCategoryById(challenge.categoryId)?.slug ?? 'data-storage-converter';
  const [isConverterOpen, setIsConverterOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  /** null until mount so SSR + first client paint match (avoids hydration mismatch). */
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsConverterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formattedTime =
    now != null
      ? now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      : '--:--:--';
  const formattedDate =
    now != null
      ? now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })
      : '—';

  const navigationSchema = buildSiteNavigationItemList(SITE_URL);

  return (
    <header className="hidden md:flex flex-col sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }}
      />
      {/* Top Personalized Bar */}
      <div className="flex items-center justify-between px-6 py-1.5 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 pointer-events-none" />
        
        <div className="flex items-center gap-6 relative z-10">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest font-mono">{formattedTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-widest">{formattedDate}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 relative z-10">
          {user && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/10 rounded-full border border-white/10">
                <Flame className={`w-3 h-3 ${userProfile && userProfile.streakCount > 0 ? 'text-orange-400' : 'text-white/20'}`} />
                <span className="text-[10px] font-black">{userProfile?.streakCount || 0} DAY STREAK</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/10 rounded-full border border-white/10">
                <Target className="w-3 h-3 text-emerald-400" />
                <span className="text-[10px] font-black">ACHIEVEMENTS: 4</span>
              </div>
            </div>
          )}
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">
            System Status: <span className="text-emerald-400">Optimal</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src={BRAND_LOGO_SRC}
              alt={BRAND_NAME}
              width={32}
              height={32}
              className="h-8 w-8 rounded object-cover ring-1 ring-slate-200"
              priority
            />
            <h1 className="text-xl font-bold text-slate-800">
              <span className="font-black text-primary">OC</span>
              <span className="font-semibold text-slate-700"> — Online Calculator</span>
            </h1>
          </Link>

          {/* Global Search Button */}
          <button 
            onClick={openSearch}
            className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all group min-w-[200px]"
          >
            <Search className="w-4 h-4 group-hover:text-primary" />
            <span className="text-xs font-medium">Search converters...</span>
            <span className="ml-auto text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-400 font-bold">⌘K</span>
          </button>
        </div>

        <nav className="hidden items-center gap-8 lg:flex">
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsConverterOpen(!isConverterOpen)}
              className={`flex items-center text-sm font-black uppercase tracking-widest gap-1.5 transition-colors ${isConverterOpen ? 'text-primary' : 'text-slate-600 hover:text-primary'}`}
            >
              Converters <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isConverterOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isConverterOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute left-0 top-full mt-4 bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 min-w-[600px] grid grid-cols-2 gap-x-8 gap-y-2 z-[100]"
                >
                  <div className="col-span-2 mb-4">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">All Conversion Domains</h3>
                  </div>
                  {converterCategories.map((cat) => (
                    <Link 
                      key={cat.id}
                      href={`/${cat.slug}`}
                      onClick={() => setIsConverterOpen(false)}
                      className="group flex items-center justify-between p-3 rounded-2xl hover:bg-primary/[0.03] transition-all border border-transparent hover:border-primary/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-primary group-hover:shadow-sm transition-all">
                           {/* Using a generic globe icon for all for consistency in dropdown, or we could map them */}
                           <Globe className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-700 group-hover:text-primary transition-colors">{cat.name}</span>
                          <span className="text-[10px] text-slate-400 font-medium">Quick Accurate Result</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/favorites" className="flex justify-center items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors">
            <Star className="w-4 h-4" /> Favorites
          </Link>
          <Link href="/conversions" className="flex justify-center items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors">
            <Clock className="w-4 h-4" /> History
          </Link>
          <Link href={`/${challengeCategorySlug}?from=${challenge.fromId}&to=${challenge.toId}&value=${challenge.value}`} className="flex justify-center items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors">
            <Target className="w-4 h-4" /> 
            Daily Challenge
            <span className="px-1.5 py-0.5 text-[10px] font-bold text-white bg-violet-500 rounded-full ml-1">New</span>
          </Link>
          <Link href="/learn" className="flex justify-center items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors">
            <BookOpen className="w-4 h-4" /> Learn
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="flex items-center gap-4 px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full">
                <div className="flex items-center gap-1.5">
                  <Flame className={`w-5 h-5 ${userProfile && userProfile.streakCount > 0 ? 'text-orange-500 fill-orange-500' : 'text-slate-300 fill-slate-300'}`} />
                  <div className="flex flex-col text-xs font-bold leading-none">
                    <span className="text-slate-700 text-sm">{userProfile?.streakCount || 0}</span>
                    <span className="text-slate-400 font-medium text-[10px] whitespace-nowrap">Day streak</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-1.5 py-1.5 bg-slate-50 border border-slate-100 rounded-full">
                 <div className="flex items-center gap-1.5 pl-2">
                  <Gem className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-slate-700 text-sm">{userProfile?.gems || 0}</span>
                 </div>
                 <button className="flex items-center justify-center w-6 h-6 text-white rounded-full bg-primary hover:bg-primary/90 transition-colors">
                   <Plus className="w-4 h-4" />
                 </button>
              </div>

              <div className="group/menu relative flex items-center gap-2">
                <Link href="/profile" className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-indigo-200 bg-indigo-100" aria-label="Open profile">
                  {user.photoURL ? (
                    <Image src={user.photoURL} alt="" width={40} height={40} referrerPolicy="no-referrer" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-violet-600 text-lg font-bold text-white">
                      {user.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                  )}
                </Link>
                <div className="pointer-events-none absolute right-0 top-12 z-50 min-w-[200px] overflow-hidden rounded-xl border border-slate-200 bg-white opacity-0 shadow-lg transition-opacity group-hover/menu:pointer-events-auto group-hover/menu:opacity-100 group-focus-within/menu:pointer-events-auto group-focus-within/menu:opacity-100">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-800 truncate">{user.displayName || 'User'}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>
                  <Link href="/profile" className="w-full flex items-center gap-2 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 transition-colors border-b border-slate-100">
                    <User className="w-4 h-4" /> My Profile
                  </Link>
                  <button onClick={logOut} className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-slate-50 transition-colors">
                    <LogOut className="w-4 h-4" /> Sign out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <button
              type="button"
              onClick={() => openSignInModal()}
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-primary shadow-sm ring-2 ring-primary/90 transition-all hover:bg-blue-50/80"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
      <StatusBanner />
    </header>
  );
}
