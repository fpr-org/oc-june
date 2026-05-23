import type { Metadata } from 'next';
import HomePageContent from '@/components/home/HomePageContent';
import { BRAND_NAME, BRAND_TAGLINE, SITE_URL } from '@/lib/brand';

const homeTitle = 'All-in-One Conversion & Math Suite';
const homeDescription = `${BRAND_TAGLINE} Includes XP rewards, streaks, and daily challenges—convert length, weight, volume, time, data, and more.`;

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: BRAND_NAME,
    title: `${homeTitle} | ${BRAND_NAME}`,
    description: homeDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${homeTitle} | ${BRAND_NAME}`,
    description: homeDescription,
  },
};

export default function Home() {
  return <HomePageContent />;
}
