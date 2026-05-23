'use client';

import { useConversion } from '@/lib/ConversionContext';
import { useAuth } from '@/lib/AuthContext';
import { ArrowRight, Clock, Clock3, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function HistoryPage() {
  const { user } = useAuth();
  const { recentConversions } = useConversion();
  const [search, setSearch] = useState('');

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
        <Clock3 className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-2xl font-bold text-slate-700 mb-2">History Unavailable</h2>
        <p className="text-slate-500 mb-6 max-w-sm">Please sign in to view your complete unit conversion history.</p>
      </div>
    );
  }

  const filtered = recentConversions.filter(c => 
    c.fromUnit.toLowerCase().includes(search.toLowerCase()) || 
    c.toUnit.toLowerCase().includes(search.toLowerCase()) ||
    c.fromValue.includes(search) || 
    c.toValue.includes(search)
  );

  return (
    <div className="max-w-4xl mx-auto w-full min-w-0 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Conversion History</h1>
          <p className="text-slate-500 font-medium mt-1">Your most recent conversions saved safely in the cloud.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 mt-2">
        <div className="relative mb-6">
          <Search className="absolute w-5 h-5 text-slate-400 left-4 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search by unit or value..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm font-medium"
          />
        </div>

        <div className="flex flex-col gap-3">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-slate-500">
              No history found matching your search.
            </div>
          ) : (
            filtered.map((conv) => {
              const timeStr = conv.timestamp ? (typeof conv.timestamp.toDate === 'function' ? conv.timestamp.toDate().toLocaleString() : new Date(conv.timestamp).toLocaleString()) : 'Just now';
              return (
                <div key={conv.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-slate-100 rounded-2xl hover:border-blue-200 hover:shadow-md transition-all group bg-white">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                      <Clock className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-slate-800">{conv.fromValue}</span>
                        <span className="text-xs font-semibold text-slate-500 uppercase">{conv.fromUnit}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 mx-1" />
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-primary">{conv.toValue}</span>
                        <span className="text-xs font-semibold text-slate-500 uppercase">{conv.toUnit}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-slate-400 sm:text-right">
                    {timeStr}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
