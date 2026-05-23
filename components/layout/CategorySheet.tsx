'use client';

import { X, Database, Ruler, Box, Scale, Thermometer, Gauge, Clock, Maximize, Zap, Calculator } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

const categories = [
  { name: 'Data Storage', id: 'data-storage', slug: 'data-storage-converter', icon: Database },
  { name: 'Length', id: 'length', slug: 'length-converter', icon: Ruler },
  { name: 'Volume', id: 'volume', slug: 'volume-converter', icon: Box },
  { name: 'Weight & Mass', id: 'weight', slug: 'weight-converter', icon: Scale },
  { name: 'Temperature', id: 'temperature', slug: 'temperature-converter', icon: Thermometer },
  { name: 'Speed', id: 'speed', slug: 'speed-converter', icon: Gauge },
  { name: 'Time', id: 'time', slug: 'time-converter', icon: Clock },
  { name: 'Area', id: 'area', slug: 'area-converter', icon: Maximize },
  { name: 'Energy', id: 'energy', slug: 'energy-converter', icon: Zap },
  { name: 'Mathematical', id: 'math', slug: 'math-converter', icon: Calculator },
];

export default function CategorySheet({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] z-[70] p-6 pb-12 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-800">Select Category</h2>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={cat.id}
                    href={`/${cat.slug}`}
                    onClick={onClose}
                    className="flex flex-col items-center gap-3 p-4 border border-slate-100 bg-slate-50 rounded-2xl hover:bg-blue-50 hover:border-blue-200 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-slate-600 group-hover:text-primary transition-colors" />
                    </div>
                    <span className="font-bold text-slate-700 text-sm">{cat.name}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
