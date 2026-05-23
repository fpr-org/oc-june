/** Per-unit slider max/step for rich converter UX. Keys = unit id in `lib/units`. */

const FALLBACK = { max: 1_000_000, step: 1 };

export const SLIDER_BY_CATEGORY: Record<
  string,
  Record<string, { max: number; step: number }>
> = {
  weight: {
    mg: { max: 2_000_000, step: 1 },
    g: { max: 50_000, step: 1 },
    kg: { max: 5_000, step: 0.001 },
    t: { max: 50, step: 0.0001 },
    oz: { max: 50_000, step: 0.01 },
    lb: { max: 20_000, step: 0.01 },
    st: { max: 2_000, step: 0.01 },
  },
  length: {
    mm: { max: 5_000_000, step: 1 },
    cm: { max: 500_000, step: 0.01 },
    m: { max: 50_000, step: 0.001 },
    km: { max: 10_000, step: 0.0001 },
    in: { max: 2_000_000, step: 0.01 },
    ft: { max: 200_000, step: 0.001 },
    yd: { max: 100_000, step: 0.001 },
    mi: { max: 5_000, step: 0.0001 },
  },
  volume: {
    ml: { max: 10_000_000, step: 1 },
    l: { max: 100_000, step: 0.001 },
    m3: { max: 10_000, step: 0.0001 },
    gal: { max: 100_000, step: 0.001 },
    qt: { max: 200_000, step: 0.001 },
    pt: { max: 200_000, step: 0.001 },
    cup: { max: 500_000, step: 0.001 },
    'fl-oz': { max: 5_000_000, step: 1 },
  },
  area: {
    m2: { max: 10_000_000, step: 0.01 },
    km2: { max: 10_000, step: 0.000001 },
    ha: { max: 100_000, step: 0.001 },
    'sq-in': { max: 1e12, step: 1 },
    'sq-ft': { max: 1e9, step: 0.1 },
    'sq-yd': { max: 1e8, step: 0.01 },
    ac: { max: 500_000, step: 0.001 },
    'sq-mi': { max: 5_000, step: 0.000001 },
  },
  speed: {
    'm/s': { max: 1_000, step: 0.01 },
    'km/h': { max: 10_000, step: 0.1 },
    mph: { max: 10_000, step: 0.1 },
    kn: { max: 5_000, step: 0.01 },
  },
  time: {
    ms: { max: 8.64e10, step: 1 },
    s: { max: 3.154e9, step: 1 },
    min: { max: 5.256e7, step: 0.1 },
    h: { max: 876_000, step: 0.01 },
    d: { max: 36_500, step: 0.001 },
    wk: { max: 5_200, step: 0.001 },
    mo: { max: 1_200, step: 0.001 },
    yr: { max: 1_000, step: 0.001 },
  },
  energy: {
    J: { max: 1e15, step: 1 },
    kJ: { max: 1e12, step: 0.1 },
    cal: { max: 1e15, step: 1 },
    kcal: { max: 1e12, step: 0.01 },
    Wh: { max: 1e12, step: 0.01 },
    kWh: { max: 1e9, step: 0.001 },
    eV: { max: 1e20, step: 1 },
  },
  pressure: {
    pa: { max: 1e12, step: 1 },
    kpa: { max: 1e9, step: 0.01 },
    bar: { max: 1e6, step: 0.0001 },
    psi: { max: 1e8, step: 0.01 },
    atm: { max: 1e6, step: 0.00001 },
  },
  'data-storage': {
    b: { max: 8e12, step: 1 },
    B: { max: 1e15, step: 1 },
    KB: { max: 1e12, step: 0.001 },
    MB: { max: 1e9, step: 0.000001 },
    GB: { max: 1e6, step: 1e-9 },
    TB: { max: 1000, step: 1e-12 },
    KiB: { max: 1e12, step: 0.001 },
    MiB: { max: 1e9, step: 0.000001 },
    GiB: { max: 1e6, step: 1e-9 },
    TiB: { max: 1000, step: 1e-12 },
  },
};

export function getSliderConfig(
  categoryId: string,
  unitId: string
): { max: number; step: number } | null {
  const map = SLIDER_BY_CATEGORY[categoryId];
  if (!map) return null;
  return map[unitId] ?? FALLBACK;
}
