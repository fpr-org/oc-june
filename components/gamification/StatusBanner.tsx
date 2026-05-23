'use client';

import { Flame, Gem, ChevronUp, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';

export default function StatusBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(true);
  const { user, userProfile, loading, openSignInModal } = useAuth();
  const isGuest = !loading && !user;
  const streakCount = userProfile?.streakCount ?? 0;
  const streakGoal = 10;
  const progressPercent = Math.min((streakCount / streakGoal) * 100, 100);

  if (!isVisible) return null;

  return (
    <div className="w-full relative h-0 overflow-visible">
      <AnimatePresence mode="wait">
        {!isMinimized ? (
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="bg-blue-50/95 backdrop-blur-md rounded-b-[32px] sm:rounded-3xl p-4 sm:p-5 relative overflow-hidden flex items-center gap-4 border-b border-x border-blue-100 sm:border shadow-lg shadow-blue-500/5 group mx-1 sm:mx-0"
          >
            {/* Collapse Toggle */}
            <button 
              onClick={() => setIsMinimized(true)}
              className="absolute top-2 right-12 p-1.5 hover:bg-blue-100 rounded-full text-primary transition-colors hidden group-hover:block"
            >
              <ChevronUp className="w-4 h-4" />
            </button>

            {/* Close Toggle */}
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-2 right-4 p-1.5 hover:bg-blue-100 rounded-full text-primary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Cartoon Mascot */}
            <div className="relative w-14 h-14 sm:w-20 sm:h-20 shrink-0">
              <div className="absolute inset-0 bg-blue-400 rounded-2xl transform rotate-12 -z-10 opacity-20"></div>
              <div className="w-full h-full bg-primary rounded-2xl flex flex-col items-center justify-end p-2 relative overflow-hidden shadow-lg border border-blue-400">
                 <div className="flex gap-1.5 mb-2">
                    <div className="w-2 h-2 bg-slate-900 rounded-full relative">
                      <div className="w-0.5 h-0.5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                    </div>
                    <div className="w-2 h-2 bg-slate-900 rounded-full relative">
                       <div className="w-0.5 h-0.5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                    </div>
                 </div>
                 <div className="w-3 h-1.5 border-b-2 border-slate-900 rounded-full mb-1"></div>
                 <div className="absolute top-1 right-2 w-1.5 h-1.5 bg-blue-300 rounded-full blur-[1px]"></div>
                 <div className="absolute bottom-4 left-1 w-1.5 h-1.5 bg-blue-300 rounded-full blur-[1px]"></div>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center shadow-sm">
                 <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-1.5 sm:gap-2">
              <div className="flex flex-col">
                <h3 className="text-base sm:text-lg font-black text-slate-800 leading-none">Keep converting!</h3>
                <p className="text-slate-500 text-[10px] sm:text-sm font-semibold mt-1">
                  {isGuest ? (
                    <>Log in to start your streak, earn XP, and unlock more features.</>
                  ) : (
                    <>You&apos;re on a <span className="text-primary">{streakCount} day streak</span> 🔥</>
                  )}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 sm:h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: isGuest ? '0%' : `${progressPercent}%` }}
                    className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(3,4,94,0.3)]"
                  />
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400">
                  {isGuest ? 'Login to track' : `${Math.min(streakCount, streakGoal)} / ${streakGoal}`}
                </span>
              </div>
              {isGuest && (
                <button
                  type="button"
                  onClick={() => openSignInModal()}
                  className="mt-0.5 self-start rounded-lg bg-primary px-3 py-1.5 text-[10px] font-bold text-white shadow-sm transition-colors hover:bg-primary/90 sm:text-xs"
                >
                  Sign in to start streak
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white rounded-full shadow-sm flex items-center justify-center p-0.5 border border-slate-50">
                  <div className="w-full h-full bg-violet-50 rounded-full flex items-center justify-center">
                    <Gem className="w-4 h-4 sm:w-5 sm:h-5 text-violet-500 fill-violet-500" />
                  </div>
                </div>
                <span className="text-[8px] sm:text-[10px] font-bold text-violet-500">{isGuest ? 'Login for XP' : '+25 XP'}</span>
              </div>

              <div className="w-10 h-8 sm:w-14 sm:h-12 relative flex items-center justify-center">
                 <div className="w-full h-full bg-orange-400 rounded-lg shadow-md border-b-4 border-orange-600 flex flex-col justify-center items-center">
                    <div className="w-full h-1.5 sm:h-2 bg-orange-500 absolute top-1.5 sm:top-2 border-y border-orange-600/30"></div>
                    <div className="w-1.5 h-3 sm:w-2 sm:h-4 bg-yellow-400 rounded-sm z-10 border border-yellow-600 translate-y-1"></div>
                 </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex justify-center h-0 overflow-visible"
          >
            <button 
              onClick={() => setIsMinimized(false)}
              className="bg-primary text-white px-5 py-2.5 rounded-b-[20px] shadow-lg shadow-primary/20 flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-all border-x border-b border-white/10 active:scale-95"
            >
              <Flame className="w-3.5 h-3.5 fill-current" />
              Show Progress
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

