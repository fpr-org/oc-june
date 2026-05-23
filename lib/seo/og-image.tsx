import { ImageResponse } from 'next/og';
import { BRAND_NAME, SITE_URL } from '@/lib/brand';
import { getInterFontBuffers } from '@/lib/seo/og-fonts';

export const OG_SIZE = { width: 1200, height: 630 } as const;

function truncate(input: string, max: number): string {
  const t = input.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trim()}…`;
}

/** Headline size tuned for long SEO titles (still readable in card previews). */
function headlineFontSize(headline: string): number {
  const n = headline.length;
  if (n > 72) return 38;
  if (n > 52) return 44;
  if (n > 36) return 50;
  return 56;
}

export type CreateOgImageOptions = {
  headline: string;
  subtitle: string;
  badge?: string;
};

/**
 * 1200×630 PNG via next/og (Satori) — suitable for Slack, Discord, X, Facebook, WhatsApp, LinkedIn.
 */
export async function createOgImageResponse(options: CreateOgImageOptions): Promise<ImageResponse> {
  const { headline, subtitle, badge } = options;
  const { regular, bold } = await getInterFontBuffers();
  const host = (() => {
    try {
      return new URL(SITE_URL).hostname;
    } catch {
      return 'online-calculators.com';
    }
  })();

  const h = truncate(headline, 110);
  const sub = truncate(subtitle, 160);
  const titleSize = headlineFontSize(h);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #03045E 0%, #023E8A 45%, #0077B6 78%, #48CAE4 100%)',
          padding: 64,
          fontFamily: 'Inter',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 1000 }}>
          {badge ? (
            <div
              style={{
                alignSelf: 'flex-start',
                background: 'rgba(255,255,255,0.14)',
                border: '1px solid rgba(255,255,255,0.28)',
                borderRadius: 999,
                padding: '10px 20px',
                fontSize: 20,
                fontWeight: 600,
                color: 'white',
                letterSpacing: 0.3,
              }}
            >
              {truncate(badge, 48)}
            </div>
          ) : null}
          <div
            style={{
              fontSize: titleSize,
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.12,
              letterSpacing: -1.2,
              maxWidth: 1040,
            }}
          >
            {h}
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.9)',
              lineHeight: 1.35,
              maxWidth: 1040,
            }}
          >
            {sub}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#03045E',
                fontSize: 30,
                fontWeight: 800,
                letterSpacing: -0.5,
              }}
            >
              OC
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 24, fontWeight: 700, color: 'white' }}>{BRAND_NAME}</span>
              <span style={{ fontSize: 19, fontWeight: 400, color: 'rgba(255,255,255,0.78)' }}>{host}</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Inter', data: regular, weight: 400, style: 'normal' as const },
        { name: 'Inter', data: bold, weight: 700, style: 'normal' as const },
      ],
    }
  );
}
