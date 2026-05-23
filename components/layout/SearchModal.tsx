'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Calculator, Database, Zap, ChevronRight, Hash, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { converterCategories } from '@/lib/units';
import { useUI } from '@/lib/UIContext';

export default function SearchModal() {
  const { isSearchOpen, closeSearch, openSearch } = useUI();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Handle Global shortcut (CMD+K)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [openSearch]);

  const handleItemClick = React.useCallback((href: string) => {
    router.push(href);
    closeSearch();
    setQuery('');
  }, [router, closeSearch]);

  // Combine categories and units into a searchable list
  const searchResults = React.useMemo(() => {
    if (!query.trim()) return [];

    const results: any[] = [];
    const lowerQuery = query.toLowerCase();

    converterCategories.forEach(category => {
      // Match category name
      if (category.name.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: 'category',
          id: category.id,
          name: category.name,
          description: `Total ${category.units.length} units`,
          href: `/${category.slug}`
        });
      }

      // Match units
      category.units.forEach(unit => {
        if (
          unit.name.toLowerCase().includes(lowerQuery) || 
          unit.symbol?.toLowerCase().includes(lowerQuery)
        ) {
          results.push({
            type: 'unit',
            id: `${category.id}-${unit.id}`,
            name: `${unit.name} (${unit.symbol})`,
            description: `Part of ${category.name}`,
            href: `/${category.slug}?from=${unit.id}`
          });
        }
      });
    });

    return results.slice(0, 8); // Limit to 8 results
  }, [query]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch();
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(searchResults.length, 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + Math.max(searchResults.length, 1)) % Math.max(searchResults.length, 1));
      }
      if (e.key === 'Enter' && searchResults.length > 0) {
        e.preventDefault();
        handleItemClick(searchResults[selectedIndex].href);
      }
    };

    if (isSearchOpen) {
      window.addEventListener('keydown', handleKeyDown);
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        clearTimeout(timer);
      };
    }
  }, [isSearchOpen, searchResults, selectedIndex, closeSearch, handleItemClick]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-xl bg-white rounded-3xl shadow-2xl z-[201] overflow-hidden border border-slate-100"
          >
            <div className="relative">
              <div className="flex items-center px-6 py-5 border-b border-slate-100">
                <Search className="w-5 h-5 text-slate-400 mr-4" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  placeholder="Search units, categories, or math tools..."
                  className="w-full bg-transparent border-none outline-none text-lg font-bold text-slate-800 placeholder:text-slate-300"
                />
                <button 
                  onClick={closeSearch}
                  className="p-1.5 bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-[400px] overflow-y-auto p-3">
                {!query.trim() ? (
                  <div className="py-10 text-center flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                      <Hash className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-slate-400">Type something to search...</p>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="py-10 text-center flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                      <X className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-slate-400">No results found for &quot;{query}&quot;</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    {searchResults.map((result, idx) => (
                      <button
                        key={result.id}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        onClick={() => handleItemClick(result.href)}
                        className={`flex items-center justify-between p-4 rounded-2xl transition-all text-left ${
                          selectedIndex === idx ? 'bg-blue-50 border border-blue-100 shadow-sm' : 'bg-transparent border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            selectedIndex === idx ? 'bg-primary text-white shadow-lg shadow-blue-500/20' : 'bg-slate-100 text-slate-400'
                          }`}>
                            {result.type === 'category' ? <Database className="w-5 h-5" /> : <Calculator className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className={`text-sm font-black uppercase tracking-tight ${selectedIndex === idx ? 'text-primary' : 'text-slate-800'}`}>
                              {result.name}
                            </p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-0.5">
                              {result.description}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className={`w-4 h-4 transition-transform ${selectedIndex === idx ? 'text-emerald-500 translate-x-1' : 'text-slate-300'}`} />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Keyboard Shortcuts Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-400 font-bold">ENTER</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-400 font-bold">↑↓</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Navigate</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-400 font-bold">ESC</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Close</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
