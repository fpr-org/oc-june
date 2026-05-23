'use client';

import Link from 'next/link';
import { ArrowUpRight, Search } from 'lucide-react';
import { useMemo } from 'react';
import {
  getHomepageSeoTopQueries,
  HOMEPAGE_SEO_TOP_QUERIES_LIMIT,
} from '@/lib/seo-data/explore-top-queries';
import { BRAND_NAME } from '@/lib/brand';

export function HomepageTopQueriesTable() {
  const rows = useMemo(() => getHomepageSeoTopQueries(HOMEPAGE_SEO_TOP_QUERIES_LIMIT), []);

  return (
    <section
      className="mt-10 border-t border-slate-200 pt-10"
      aria-labelledby="homepage-top-queries-heading"
    >
      <div className="mb-5 px-1 sm:mb-6">
        <h2
          id="homepage-top-queries-heading"
          className="flex items-center gap-2 text-lg font-bold text-slate-800 sm:text-xl"
        >
          <Search className="h-5 w-5 shrink-0 text-primary" aria-hidden />
          Top {rows.length} calculator &amp; conversion searches
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          Real-world questions people search for—each row links to a free tool on {BRAND_NAME}. Updated
          from our global query library across units, math, finance, health, and time zones.
        </p>
      </div>

      <div className="relative rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto overscroll-x-contain rounded-2xl [-webkit-overflow-scrolling:touch]">
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <caption className="sr-only">
              Ranked list of {rows.length} popular conversion and calculator search queries with matching
              tools and internal links on {BRAND_NAME}.
            </caption>
            <thead>
              <tr className="sticky top-0 z-10 border-b border-slate-200 bg-slate-100/95 text-[10px] font-black uppercase tracking-widest text-slate-500 backdrop-blur-sm sm:text-xs">
                <th scope="col" className="whitespace-nowrap px-3 py-3 pl-4 sm:px-4 sm:pl-5">
                  #
                </th>
                <th scope="col" className="min-w-[14rem] px-3 py-3 sm:min-w-[18rem] sm:px-4">
                  What people search
                </th>
                <th scope="col" className="hidden whitespace-nowrap px-3 py-3 sm:table-cell sm:px-4">
                  Tool
                </th>
                <th scope="col" className="whitespace-nowrap px-3 py-3 pr-4 text-right sm:px-5">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {rows.map((row) => (
                <tr
                  key={row.label + row.href}
                  className="transition-colors odd:bg-white even:bg-slate-50/60 hover:bg-blue-50/40"
                >
                  <td className="whitespace-nowrap px-3 py-2.5 pl-4 tabular-nums text-xs font-semibold text-slate-400 sm:py-3 sm:pl-5">
                    {row.rank}
                  </td>
                  <td className="px-3 py-2.5 text-[13px] font-medium leading-snug sm:py-3 sm:text-sm">
                    {row.label}
                    <span className="mt-1 block text-[11px] font-normal text-slate-500 sm:hidden">
                      {row.tool}
                    </span>
                  </td>
                  <td className="hidden whitespace-nowrap px-3 py-2.5 text-xs text-slate-600 sm:table-cell sm:py-3 sm:text-sm">
                    {row.tool}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2.5 pr-4 text-right sm:py-3 sm:pr-5">
                    <Link
                      href={row.href}
                      prefetch={false}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-primary shadow-sm transition-colors hover:border-primary/30 hover:bg-blue-50/80 sm:px-3 sm:text-xs"
                    >
                      Open
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-70" aria-hidden />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
