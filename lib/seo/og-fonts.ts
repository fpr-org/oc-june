import { cache } from 'react';

/**
 * Inter TTF from Google Fonts (stable gstatic URLs) for Satori / ImageResponse.
 * Cached per request via React cache().
 */
export const getInterFontBuffers = cache(async () => {
  const [regular, bold] = await Promise.all([
    fetch(
      'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf'
    ).then((r) => {
      if (!r.ok) throw new Error('Failed to load Inter 400');
      return r.arrayBuffer();
    }),
    fetch(
      'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZg.ttf'
    ).then((r) => {
      if (!r.ok) throw new Error('Failed to load Inter 700');
      return r.arrayBuffer();
    }),
  ]);
  return { regular, bold };
});
