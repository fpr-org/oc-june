'use client';

import React from 'react';
import { Sun, Moon, CloudSun, CloudMoon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VisualClockProps {
  time: string; // Format "HH:mm"
  locationName: string;
  offset?: number;
}

export default function VisualClock({ time, locationName, offset }: VisualClockProps) {
  const [hours, minutes] = time.split(':').map(Number);
  const isNight = hours < 6 || hours >= 18;
  const isLateNight = hours < 4 || hours >= 22;

  const bgGradient = isNight 
    ? isLateNight 
      ? 'from-slate-900 to-indigo-950' 
      : 'from-indigo-900 to-slate-800'
    : hours < 10 || hours > 16 
      ? 'from-orange-400 to-amber-200' 
      : 'from-sky-400 to-blue-200';

  const Icon = isNight 
    ? (isLateNight ? Moon : CloudMoon) 
    : (hours < 10 || hours > 16 ? Sun : CloudSun);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative w-full max-w-[240px] aspect-square rounded-full shadow-2xl p-1 bg-gradient-to-br ${bgGradient} flex items-center justify-center overflow-hidden border-8 border-white/20`}
    >
      {/* Decorative stars/clouds */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isNight ? 'night' : 'day'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 pointer-events-none"
        >
          {isNight ? (
            <div className="absolute inset-0 opacity-30">
              {[...Array(10)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute bg-white rounded-full" 
                  style={{ 
                    width: Math.random() * 3 + 'px', 
                    height: Math.random() * 3 + 'px',
                    top: Math.random() * 100 + '%',
                    left: Math.random() * 100 + '%'
                  }} 
                />
              ))}
            </div>
          ) : (
            <div className="absolute inset-0 opacity-20">
               <div className="absolute top-10 left-10 w-20 h-8 bg-white rounded-full blur-xl" />
               <div className="absolute bottom-10 right-10 w-16 h-6 bg-white rounded-full blur-lg" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex flex-col items-center text-white drop-shadow-lg p-4 text-center">
        <Icon className={`w-8 h-8 mb-2 ${isNight ? 'text-amber-200' : 'text-yellow-400'}`} />
        <div className="text-4xl font-black tracking-tighter leading-none mb-1">
          {time}
        </div>
        <div className="text-[10px] font-black uppercase tracking-[0.1em] leading-tight opacity-90 max-w-[140px]">
          {locationName}
        </div>
        {offset !== undefined && (
          <div className="text-[9px] font-bold mt-1 opacity-60">
            GMT {offset >= 0 ? '+' : ''}{offset}
          </div>
        )}
      </div>

      {/* Clock ticks */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-0.5 h-2 bg-white" 
            style={{ 
              left: '50%',
              top: '5px',
              transformOrigin: '50% 115px',
              transform: `translateX(-50%) rotate(${i * 30}deg)`
            }} 
          />
        ))}
      </div>
    </motion.div>
  );
}
