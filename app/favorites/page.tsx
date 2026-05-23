'use client';

import { useFavorite } from '@/lib/FavoriteContext';
import { useAuth } from '@/lib/AuthContext';
import { ArrowRight, Star, Settings } from 'lucide-react';
import Link from 'next/link';
import { getCategoryById } from '@/lib/units';
import { useRouter } from 'next/navigation';

export default function FavoritesPage() {
  const { user } = useAuth();
  const { favorites, removeFavorite } = useFavorite();
  const router = useRouter();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
        <Star className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-2xl font-bold text-slate-700 mb-2">Favorites Unavailable</h2>
        <p className="text-slate-500 mb-6 max-w-sm">Please sign in to view and save your favorite conversions.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full min-w-0 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Favorite Conversions</h1>
          <p className="text-slate-500 font-medium mt-1">Quick access to your most used conversions.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 mt-2">
        <div className="flex flex-col gap-3">
          {favorites.length === 0 ? (
            <div className="text-center py-10 text-slate-500">
              You haven&apos;t saved any favorites yet. 
              <p className="text-sm mt-2">Go to a converter and click the star icon!</p>
            </div>
          ) : (
            favorites.map((fav) => {
              const category = getCategoryById(fav.categoryId);
              if (!category) return null;
              
              const fromUnit = category.units.find(u => u.id === fav.fromUnit);
              const toUnit = category.units.find(u => u.id === fav.toUnit);

              return (
                <div key={fav.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-slate-100 rounded-2xl hover:border-blue-200 hover:shadow-md transition-all group bg-white cursor-pointer" onClick={() => router.push(`/${category.slug}`)}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0 border border-amber-100 text-amber-500">
                      <Star className="w-4 h-4 fill-amber-500" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-slate-800">{fromUnit?.name || fav.fromUnit}</span>
                        <ArrowRight className="w-4 h-4 text-slate-300" />
                        <span className="text-lg font-bold text-primary">{toUnit?.name || fav.toUnit}</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1">
                        <Settings className="w-3 h-3" /> {category.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeFavorite(fav.id); }}
                      className="text-xs font-bold text-slate-400 hover:text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Remove
                    </button>
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
