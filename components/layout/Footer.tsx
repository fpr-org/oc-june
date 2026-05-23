'use client';

import { Github, Twitter, Mail, ExternalLink, Hexagon } from 'lucide-react';
import Link from 'next/link';
import { BRAND_TAGLINE, getCopyrightLine, PARTNER_WORLD_INCREDIBLE, THANKS_NEXTJS } from '@/lib/brand';
import { WorldIncrediblePartner } from '@/components/layout/WorldIncrediblePartner';
import { NextJsThanks } from '@/components/layout/NextJsThanks';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const openCookiePreferences = () => {
    window.dispatchEvent(new Event('open-cookie-preferences'));
  };

  return (
    <footer className="w-full bg-white border-t border-slate-200 pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-primary group-hover:bg-primary/90 transition-colors">
                <Hexagon className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-lg font-bold text-slate-800 leading-tight">
                <span className="font-black text-primary">OC</span>
                <span className="text-slate-600"> — Online Calculator</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              {BRAND_TAGLINE} Streaks, challenges, and a clean interface so conversions stay fast on any device.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-blue-50 transition-all border border-slate-100">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-blue-50 transition-all border border-slate-100">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-blue-50 transition-all border border-slate-100">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6">Converters</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/data-storage-converter" className="text-sm text-slate-500 hover:text-primary transition-colors">Data Storage</Link></li>
              <li><Link href="/weight-converter" className="text-sm text-slate-500 hover:text-primary transition-colors">Weight & Mass</Link></li>
              <li><Link href="/temperature-converter" className="text-sm text-slate-500 hover:text-primary transition-colors">Temperature</Link></li>
              <li><Link href="/decimal-to-fraction" className="text-sm text-slate-500 hover:text-primary transition-colors">Decimal to Fraction</Link></li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6">Support</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/learn" className="text-sm text-slate-500 hover:text-primary transition-colors">Learning Center</Link></li>
              <li><Link href="/conversions" className="text-sm text-slate-500 hover:text-primary transition-colors">My History</Link></li>
              <li><Link href="/favorites" className="text-sm text-slate-500 hover:text-primary transition-colors">Saved Units</Link></li>
              <li><Link href="/contact-us" className="text-sm text-slate-500 hover:text-primary transition-colors">Contact Us</Link></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-primary transition-colors flex items-center gap-1.5">Documentation <ExternalLink className="w-3.5 h-3.5" /></a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6">Legal</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/privacy-policy" className="text-sm text-slate-500 hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-sm text-slate-500 hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="text-sm text-slate-500 hover:text-primary transition-colors">Cookie Policy</Link></li>
              <li>
                <button onClick={openCookiePreferences} className="text-sm text-slate-500 hover:text-primary transition-colors">
                  Cookie Preferences
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-8">
            <div className="text-center sm:text-left">
              <p className="text-xs font-bold text-slate-400">{getCopyrightLine(currentYear)}</p>
              <p className="mt-2 max-w-md text-[10px] leading-relaxed text-slate-500">
                Editorial partner:{' '}
                <a
                  href={PARTNER_WORLD_INCREDIBLE.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="font-semibold text-slate-600 underline decoration-slate-200 underline-offset-2 transition-colors hover:text-primary"
                >
                  {PARTNER_WORLD_INCREDIBLE.name}
                </a>
                .
              </p>
              <p className="mt-2 max-w-md text-[10px] leading-relaxed text-slate-500">
                Special thanks to{' '}
                <a
                  href={THANKS_NEXTJS.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-slate-600 underline decoration-slate-200 underline-offset-2 transition-colors hover:text-primary"
                >
                  {THANKS_NEXTJS.name}
                </a>{' '}
                for the web framework powering this site.
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
                <WorldIncrediblePartner layout="footer" showEyebrow={false} />
                <NextJsThanks layout="footer" showEyebrow={false} />
              </div>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <span className="flex items-center gap-1.5 text-[10px] font-black text-primary uppercase tracking-wider">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
              System Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
