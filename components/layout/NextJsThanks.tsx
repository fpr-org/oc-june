'use client';

import Image from 'next/image';
import { THANKS_NEXTJS } from '@/lib/brand';

type Layout = 'homepage' | 'footer';

const linkRel = 'noopener noreferrer';

export function NextJsThanks({
  layout,
  showEyebrow = true,
}: {
  layout: Layout;
  showEyebrow?: boolean;
}) {
  const { name, url, logoSrc, logoWidth, logoHeight } = THANKS_NEXTJS;

  if (layout === 'homepage') {
    return (
      <section
        aria-label={`Special thanks — ${name}`}
        className="rounded-2xl border border-slate-200 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-6"
      >
        <p className="mb-3 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Special thanks
        </p>
        <a
          href={url}
          target="_blank"
          rel={linkRel}
          className="mx-auto flex max-w-xl justify-center outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span className="inline-flex rounded-2xl bg-black p-3 shadow-inner ring-1 ring-slate-900/10">
            <Image
              src={logoSrc}
              alt={`${name} mark`}
              width={logoWidth}
              height={logoHeight}
              className="h-10 w-10 sm:h-11 sm:w-11"
              sizes="44px"
            />
          </span>
        </a>
        <p className="mt-3 text-center text-xs leading-relaxed text-slate-600">
          This site is built with{' '}
          <a
            href={url}
            target="_blank"
            rel={linkRel}
            className="font-semibold text-slate-800 underline decoration-slate-300 underline-offset-2 transition-colors hover:text-primary"
          >
            {name}
          </a>
          , the React framework we use for fast, reliable pages.
        </p>
      </section>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-3">
      {showEyebrow ? (
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Thanks</span>
      ) : null}
      <a
        href={url}
        target="_blank"
        rel={linkRel}
        className="inline-flex items-center outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-primary"
        title={name}
      >
        <span className="inline-flex rounded-lg bg-black p-1.5">
          <Image
            src={logoSrc}
            alt={`${name} mark`}
            width={logoWidth}
            height={logoHeight}
            className="h-6 w-6"
            sizes="24px"
          />
        </span>
      </a>
    </div>
  );
}
