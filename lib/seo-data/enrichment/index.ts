/**
 * Layered SEO enrichment: meta/intro overrides, authority links, crawlable deep links,
 * and rich educator-style blocks (history, formula, tips, internal query intents).
 */
import type { SeoEnrichmentLayer } from '../types';

import { weight } from './categories/weight';
import { length } from './categories/length';
import { volume } from './categories/volume';
import { temperature } from './categories/temperature';
import { area } from './categories/area';
import { speed } from './categories/speed';
import { time } from './categories/time';
import { energy } from './categories/energy';
import { pressure } from './categories/pressure';
import { dataStorage } from './categories/data-storage';
import { math } from './categories/math';
import { percentage } from './categories/percentage';
import { scientific } from './categories/scientific';
import { geometry } from './categories/geometry';
import { health } from './categories/health';
import { finance } from './categories/finance';
import { tax } from './categories/tax';
import { timezone } from './categories/timezone';

export const categorySeoEnrichment: Partial<Record<string, SeoEnrichmentLayer>> = {
  weight,
  length,
  volume,
  temperature,
  area,
  speed,
  time,
  energy,
  pressure,
  'data-storage': dataStorage,
  math,
  percentage,
  scientific,
  geometry,
  health,
  finance,
  tax,
  timezone,
};
