import type { ConverterUiConfig } from '@/lib/seo-data/types';
import { weightConverterUi } from '@/lib/seo-data/categories/weight';
import { lengthConverterUi } from '@/lib/seo-data/categories/length';
import { volumeConverterUi } from '@/lib/seo-data/categories/volume';
import { areaConverterUi } from '@/lib/seo-data/categories/area';
import { dataStorageConverterUi } from '@/lib/seo-data/categories/data-storage';
import { temperatureConverterUi } from '@/lib/seo-data/categories/temperature';
import { speedConverterUi } from '@/lib/seo-data/categories/speed';
import { timeConverterUi } from '@/lib/seo-data/categories/time';
import { energyConverterUi } from '@/lib/seo-data/categories/energy';
import { pressureConverterUi } from '@/lib/seo-data/categories/pressure';
import { mathConverterUi } from '@/lib/seo-data/categories/math';
import { percentageConverterUi } from '@/lib/seo-data/categories/percentage';
import { geometryConverterUi } from '@/lib/seo-data/categories/geometry';
import { healthConverterUi } from '@/lib/seo-data/categories/health';
import { financeConverterUi } from '@/lib/seo-data/categories/finance';
import { taxConverterUi } from '@/lib/seo-data/categories/tax';
import { timezoneConverterUi } from '@/lib/seo-data/categories/timezone';
import { scientificConverterUi } from '@/lib/seo-data/categories/scientific';

/** Rich converter UI for every standard unit category (see `ConverterMain`). */
const registry: Partial<Record<string, ConverterUiConfig>> = {
  weight: weightConverterUi,
  length: lengthConverterUi,
  volume: volumeConverterUi,
  area: areaConverterUi,
  'data-storage': dataStorageConverterUi,
  temperature: temperatureConverterUi,
  speed: speedConverterUi,
  time: timeConverterUi,
  energy: energyConverterUi,
  pressure: pressureConverterUi,
  math: mathConverterUi,
  percentage: percentageConverterUi,
  geometry: geometryConverterUi,
  health: healthConverterUi,
  finance: financeConverterUi,
  tax: taxConverterUi,
  timezone: timezoneConverterUi,
  scientific: scientificConverterUi,
};

export function getConverterUiConfig(categoryId: string): ConverterUiConfig | undefined {
  return registry[categoryId];
}
