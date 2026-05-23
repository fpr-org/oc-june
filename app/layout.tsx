import type {Metadata} from 'next';
import './globals.css';
import { ConversionProvider } from '@/lib/ConversionContext';
import { AuthProvider } from '@/lib/AuthContext';
import { FavoriteProvider } from '@/lib/FavoriteContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import RightSidePanel from '@/components/gamification/RightSidePanel';
import LoginOverlay from '@/components/layout/LoginOverlay';
import Footer from '@/components/layout/Footer';
import BottomBar from '@/components/layout/BottomBar';
import MobileMenu from '@/components/layout/MobileMenu';
import MobileHeader from '@/components/layout/MobileHeader';
import SearchModal from '@/components/layout/SearchModal';
import TopLoadingBar from '@/components/layout/TopLoadingBar';
import CookieConsentBanner from '@/components/layout/CookieConsentBanner';
import { UIProvider } from '@/lib/UIContext';
import { Suspense } from 'react';
import { BRAND_NAME, SITE_URL, BRAND_TAGLINE } from '@/lib/brand';

export const metadata: Metadata = {
  title: {
    default: `${BRAND_NAME} | All-in-One Conversion & Math Suite`,
    template: `%s | ${BRAND_NAME}`,
  },
  description: `${BRAND_TAGLINE} Includes XP rewards, streaks, and daily challenges—convert length, weight, volume, time, data, and more.`,
  keywords: ['unit converter', 'calculator', 'online calculators', 'OC calculator', 'math tools', 'percentage calculator', 'geometry calculator', 'binary converter', 'timezone converter', 'unit conversion tool'],
  authors: [{ name: BRAND_NAME }],
  creator: BRAND_NAME,
  publisher: BRAND_NAME,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: BRAND_NAME,
    title: `${BRAND_NAME} | Conversion & Math Suite`,
    description:
      'Accurate converters and calculators with streaks, gems, and daily challenges—built for students, professionals, and everyday use.',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND_NAME} | Conversion & Math Suite`,
    description:
      'Accurate converters and calculators with an engaging, mobile-friendly experience.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AuthProvider>
          <FavoriteProvider>
            <ConversionProvider>
              <UIProvider>
                <LoginOverlay />
                <MobileMenu />
                <SearchModal />
                <CookieConsentBanner />
                <Suspense fallback={null}>
                  <TopLoadingBar />
                </Suspense>
                <div className="min-h-screen bg-[#f7f9fc] text-slate-600 font-sans">
                  <MobileHeader />
                  <Header />
                  <div className="max-w-[1536px] mx-auto px-4 sm:px-6 py-6 lg:py-8 grid grid-cols-1 lg:grid-cols-[240px_1fr] xl:grid-cols-[250px_1fr_320px] gap-6 lg:gap-8 items-start">
                    <Sidebar />
                    <div className="flex flex-col gap-6 w-full">
                      <div className="flex justify-center xl:justify-start w-full">
                        {children}
                      </div>
                    </div>
                    <RightSidePanel />
                  </div>
                  <Footer />
                  <BottomBar />
                </div>
              </UIProvider>
            </ConversionProvider>
          </FavoriteProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
