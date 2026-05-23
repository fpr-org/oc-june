'use client';

import Image from 'next/image';
import { PARTNER_WORLD_INCREDIBLE } from '@/lib/brand';

type Layout = 'homepage' | 'footer';

const linkRel = 'noopener noreferrer sponsored';

export function WorldIncrediblePartner({
  layout,
  showEyebrow = true,
}: {
  layout: Layout;
  /** When false (e.g. next to a copyright line that already names the partner), only the logo link is shown. */
  showEyebrow?: boolean;
}) {
  const { name, url, logoSrc, logoWidth, logoHeight } = PARTNER_WORLD_INCREDIBLE;

  if (layout === 'homepage') {
    return (
      <section
        aria-label={`Backed by ${name}`}
        className="rounded-2xl border border-slate-200 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-6"
      >
        <p className="mb-3 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Backed by
        </p>
        <a
          href={url}
          target="_blank"
          rel={linkRel}
          className="mx-auto flex max-w-xl justify-center outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Image
            src={logoSrc}
            alt={`${name} — partner`}
            width={logoWidth}
            height={logoHeight}
            className="h-9 w-auto max-w-full sm:h-11"
            sizes="(max-width: 640px) 100vw, 28rem"
            priority={false}
          />
        </a>
        <p className="mt-3 text-center text-xs leading-relaxed text-slate-600">
          This project is supported by{' '}
          <a
            href={url}
            target="_blank"
            rel={linkRel}
            className="font-semibold text-slate-800 underline decoration-slate-300 underline-offset-2 transition-colors hover:text-primary"
          >
            {name}
          </a>
          , covering AI, tech, and reviews.
        </p>
      </section>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-3">
      {showEyebrow ? (
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Backed by</span>
      ) : null}
      <a
        href={url}
        target="_blank"
        rel={linkRel}
        className="inline-flex items-center outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-primary"
      >
        <Image
          src={logoSrc}
          alt={`${name} — partner`}
          width={logoWidth}
          height={logoHeight}
          className="h-6 w-auto opacity-90 transition-opacity hover:opacity-100"
          sizes="180px"
        />
      </a>
    </div>
  );
}
