/**
 * SEO copy per route category slug. Each slug has a sibling module under `./categories/<slug>.ts`.
 */
import type { SEOContent } from './types';

import { categorySeo as area } from './categories/area';
import { categorySeo as dataStorage } from './categories/data-storage';
import { categorySeo as energy } from './categories/energy';
import { categorySeo as finance } from './categories/finance';
import { categorySeo as geometry } from './categories/geometry';
import { categorySeo as health } from './categories/health';
import { categorySeo as length } from './categories/length';
import { categorySeo as math } from './categories/math';
import { categorySeo as percentage } from './categories/percentage';
import { categorySeo as pressure } from './categories/pressure';
import { categorySeo as scientific } from './categories/scientific';
import { categorySeo as speed } from './categories/speed';
import { categorySeo as tax } from './categories/tax';
import { categorySeo as temperature } from './categories/temperature';
import { categorySeo as time } from './categories/time';
import { categorySeo as timezone } from './categories/timezone';
import { categorySeo as volume } from './categories/volume';
import { categorySeo as weight } from './categories/weight';

export type { FAQEntry, SEOContent } from './types';

export const categorySEOData: Record<string, SEOContent> = {
  'data-storage': dataStorage,
  weight,
  temperature,
  area,
  pressure,
  time,
  energy,
  length,
  volume,
  speed,
  math,
  percentage,
  scientific,
  geometry,
  health,
  finance,
  tax,
  timezone,
};
