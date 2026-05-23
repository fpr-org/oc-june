'use client';

import { Home, Star, User, Calculator, ArrowRightLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { useState } from 'react';
import CategorySheet from './CategorySheet';

export default function BottomBar() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Converter', icon: Calculator, onClick: () => setIsSheetOpen(true) },
    { name: 'Convert', icon: ArrowRightLeft, isCenter: true },
    { name: 'Favorites', href: '/favorites', icon: Star },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-100 md:hidden px-2 pb-safe shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
        <nav className="flex justify-around items-center h-20 max-w-lg mx-auto relative">
          {navItems.map((item, idx) => {
            const isActive = item.href && pathname === item.href;
            const Icon = item.icon;

            if (item.isCenter) {
              return (
                <div key={idx} className="relative flex-1 flex flex-col items-center justify-center -translate-y-6">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 bg-primary rounded-2xl shadow-lg shadow-primary/40 flex items-center justify-center text-white border-4 border-white"
                  >
                    <Icon className="w-6 h-6" />
                  </motion.button>
                  <span className="text-[10px] font-black text-primary uppercase tracking-wider mt-2 translate-y-1">Convert</span>
                </div>
              );
            }

            const content = (
              <div className="flex flex-col items-center gap-1">
                <div className={`transition-colors ${isActive ? 'text-primary' : 'text-slate-400'}`}>
                   <Icon className={`w-6 h-6 ${isActive ? 'fill-primary/10' : ''}`} />
                </div>
                <span className={`text-[9px] font-bold uppercase tracking-wider ${isActive ? 'text-primary' : 'text-slate-400'}`}>
                  {item.name}
                </span>
              </div>
            );

            if (item.onClick) {
              return (
                <button
                  key={idx}
                  onClick={item.onClick}
                  className="flex-1 flex flex-col items-center justify-center h-full group"
                >
                  {content}
                </button>
              );
            }

            return (
              <Link
                key={idx}
                href={item.href!}
                className="flex-1 flex flex-col items-center justify-center h-full group"
              >
                {content}
              </Link>
            );
          })}
        </nav>
      </div>

      <CategorySheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)} />
    </>
  );
}
