'use client';

import { BRAND_NAME } from '@/lib/brand';
import {
  Star,
  ArrowRightLeft,
  X,
  Copy,
  Lightbulb,
  ChevronDown,
  Database,
  Trophy,
  Settings,
  ChevronRight,
  ShieldCheck,
  Check,
  Share2,
  Scale,
  CheckCircle2,
  Ruler,
  Box,
  Thermometer,
  Gauge,
  Clock,
  Zap,
  Maximize2,
  Activity,
  Binary,
  Percent,
  Shapes,
  Heart,
  Wallet,
  Receipt,
  Globe2,
  Calculator,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { convertValue, Category, Unit, getCategoryById } from '@/lib/units';
import { useConversion } from '@/lib/ConversionContext';
import { useFavorite } from '@/lib/FavoriteContext';
import { getConversionTooltipContent } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { getConverterUiConfig } from '@/lib/converter-ui';
import { getSliderConfig } from '@/lib/converter-sliders';

type UnitGroup = {
  label: string;
  units: Unit[];
};

/** Header + decorative hero for rich layout (non–weight-art categories). */
const RICH_CATEGORY_ICON: Partial<Record<string, LucideIcon>> = {
  weight: Scale,
  length: Ruler,
  volume: Box,
  area: Maximize2,
  'data-storage': Database,
  temperature: Thermometer,
  speed: Gauge,
  time: Clock,
  energy: Zap,
  pressure: Activity,
  math: Binary,
  percentage: Percent,
  geometry: Shapes,
  health: Heart,
  finance: Wallet,
  tax: Receipt,
  timezone: Globe2,
  scientific: Calculator,
};

function IconCategoryHero({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div
      className="relative flex h-[96px] w-[96px] shrink-0 items-center justify-center sm:h-[120px] sm:w-[120px] pointer-events-none select-none"
      aria-hidden
    >
      <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-violet-200/60 via-white to-indigo-100/80 shadow-inner ring-1 ring-white/80" />
      <Icon className="relative h-12 w-12 text-violet-500/90 sm:h-14 sm:w-14" strokeWidth={1.5} aria-hidden />
    </div>
  );
}

function WeightHeroIllustration() {
  return (
    <div
      className="relative w-[96px] h-[96px] sm:w-[120px] sm:h-[120px] shrink-0 pointer-events-none select-none"
      aria-hidden
    >
      <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-violet-200/80 via-white to-indigo-100/90 shadow-inner shadow-violet-200/50 ring-1 ring-white/80" />
      <div className="absolute -right-1 -top-1 h-16 w-16 rounded-full bg-violet-400/15 blur-2xl" />
      <svg viewBox="0 0 120 120" className="relative w-full h-full drop-shadow-lg">
        <ellipse cx="60" cy="99" rx="46" ry="5" className="fill-slate-300/80" />
        <rect x="55" y="32" width="10" height="62" rx="2" className="fill-slate-500/40" />
        <rect x="14" y="28" width="92" height="8" rx="4" className="fill-violet-500/35" />
        <circle cx="60" cy="31" r="7" className="fill-violet-600" />
        <path
          d="M26 36 L18 54 Q16 62 26 62 L52 62 Q60 62 58 54 L50 36 Z"
          className="fill-violet-200/60 stroke-violet-500/55"
          strokeWidth="1.5"
        />
        <path
          d="M70 36 L62 54 Q60 62 68 62 L96 62 Q106 62 104 54 L94 36 Z"
          className="fill-slate-200/70 stroke-violet-500/45"
          strokeWidth="1.5"
        />
        <rect x="78" y="12" width="18" height="18" rx="3" className="fill-violet-500" />
        <rect x="24" y="8" width="11" height="9" rx="2" className="fill-slate-300" />
        <rect x="38" y="10" width="11" height="7" rx="2" className="fill-slate-400/90" />
      </svg>
    </div>
  );
}

export default function ConverterMain({ 
  categoryData,
  initialFromUnitId,
  initialToUnitId,
  initialValue: initialValueProp,
}: { 
  categoryData: Category,
  initialFromUnitId?: string,
  initialToUnitId?: string,
  /** URL or server-parsed ?value= */
  initialValue?: string,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, openSignInModal } = useAuth();
  const converterUi = getConverterUiConfig(categoryData.id);
  const richUi = !!converterUi;

  const [fromValue, setFromValue] = useState<string>(() => {
    if (initialValueProp !== undefined && initialValueProp !== '') return initialValueProp;
    return converterUi?.defaultFromValue ?? (categoryData.id === 'math' ? '0.5' : '500');
  });
  const [fromUnitId, setFromUnitId] = useState<string>(
    () =>
      initialFromUnitId ||
      converterUi?.defaultFromUnitId ||
      categoryData.units.find(u => u.id === 'MB')?.id ||
      categoryData.units[0]?.id ||
      ''
  );
  const [toUnitId, setToUnitId] = useState<string>(
    () =>
      initialToUnitId ||
      converterUi?.defaultToUnitId ||
      categoryData.units.find(u => u.id === 'GB')?.id ||
      categoryData.units[1]?.id ||
      categoryData.units[0]?.id ||
      ''
  );
  const [activeTooltip, setActiveTooltip] = useState<'from' | 'to' | null>(null);
  const [activeTab, setActiveTab] = useState<'history' | 'saved' | 'stats'>('history');
  
  const { addConversion, recentConversions } = useConversion();
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorite();

  const normalizeAdvancedInput = (rawValue: string) => {
    // Advanced rule: keep only valid numeric/scientific characters and cap significant digits for stable high-precision UX.
    const sanitized = rawValue.replace(/[^\d.eE+-]/g, '');
    const sign = sanitized.startsWith('-') ? '-' : '';
    const unsigned = sign ? sanitized.slice(1) : sanitized;

    const [mantissa, exponent] = unsigned.split(/[eE]/);
    const exponentSuffix = exponent !== undefined ? `e${exponent.replace(/[^\d+-]/g, '')}` : '';

    const [integerPart = '', decimalPart = ''] = (mantissa || '').split('.');
    const digitsOnly = `${integerPart}${decimalPart}`.replace(/\D/g, '');
    const limitedDigits = digitsOnly.slice(0, 24);
    const integerLength = integerPart.replace(/\D/g, '').length;

    const reconstructedMantissa =
      decimalPart.length > 0
        ? `${limitedDigits.slice(0, Math.min(integerLength, limitedDigits.length)) || '0'}.${limitedDigits.slice(Math.min(integerLength, limitedDigits.length))}`
        : limitedDigits;

    return `${sign}${reconstructedMantissa}${exponentSuffix}`;
  };

  const toValue = useMemo(() => {
    if (!fromUnitId || !toUnitId) return '';
    return convertValue(fromValue, fromUnitId, toUnitId, categoryData.id);
  }, [fromValue, fromUnitId, toUnitId, categoryData.id]);

  const fromUnit = categoryData.units.find(u => u.id === fromUnitId) || categoryData.units[0];
  const toUnit = categoryData.units.find(u => u.id === toUnitId) || categoryData.units[0];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (fromValue && toValue && fromUnit && toUnit && fromValue !== '0') {
        addConversion({
          categoryId: categoryData.id,
          fromValue,
          fromUnit: fromUnit.symbol,
          toValue,
          toUnit: toUnit.symbol
        });
      }
    }, 2000); 
    
    return () => clearTimeout(timer);
  }, [fromValue, fromUnit, toUnit, toValue, addConversion]);

  /** Keep shareable ?from=&to=&value= in sync (metadata canonical stays the clean slug). */
  useEffect(() => {
    if (!pathname || typeof window === 'undefined') return;
    const id = setTimeout(() => {
      const next = new URLSearchParams();
      next.set('from', fromUnitId);
      next.set('to', toUnitId);
      if (fromValue !== '') next.set('value', fromValue);
      const qs = next.toString();
      const href = qs ? `${pathname}?${qs}` : pathname;
      if (`${window.location.pathname}${window.location.search}` !== href) {
        router.replace(href, { scroll: false });
      }
    }, 380);
    return () => clearTimeout(id);
  }, [pathname, router, fromUnitId, toUnitId, fromValue]);

  const handleSwap = () => {
    const oldTo = toUnitId;
    setToUnitId(fromUnitId);
    setFromUnitId(oldTo);
  };

  const getQuickPills = () => {
    if (converterUi?.commonUnitIds?.length) {
      return converterUi.commonUnitIds.filter((id) => categoryData.units.some((u) => u.id === id));
    }
    if (categoryData.id === 'data-storage') return ['b', 'KB', 'MB', 'GB', 'TB'];
    return categoryData.units.slice(0, 5).map(u => u.id);
  };

  const quickPills = getQuickPills();

  const sliderCfg = useMemo(() => {
    if (!richUi || converterUi?.showSlider === false) return null;
    return getSliderConfig(categoryData.id, fromUnitId);
  }, [richUi, converterUi?.showSlider, categoryData.id, fromUnitId]);

  const rawFromNum = parseFloat(fromValue);
  const fromNum = Number.isFinite(rawFromNum) ? rawFromNum : 0;

  const chainSummaryLine = useMemo(() => {
    if (!converterUi?.summaryChainUnitIds?.length || !fromValue || !fromUnit) return '';
    const first = `${fromValue} ${fromUnit.symbol}`;
    const tail = converterUi.summaryChainUnitIds
      .filter((id) => id !== fromUnitId)
      .map((id) => {
        const v = convertValue(fromValue, fromUnitId, id, categoryData.id);
        const u = categoryData.units.find((x) => x.id === id);
        if (!u) return null;
        return `${v} ${u.symbol}`;
      })
      .filter(Boolean) as string[];
    return [first, ...tail].join(' = ');
  }, [converterUi?.summaryChainUnitIds, fromValue, fromUnit, fromUnitId, categoryData.id]);

  const handleShare = async () => {
    const line = `${fromValue} ${fromUnit.symbol} → ${toValue || '0'} ${toUnit.symbol}`;
    const path = typeof window !== 'undefined' ? window.location.pathname : '';
    const qs = `?from=${fromUnitId}&to=${toUnitId}&value=${encodeURIComponent(fromValue)}`;
    const url = typeof window !== 'undefined' ? `${window.location.origin}${path}${qs}` : line;
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({ title: `${categoryData.name} — ${BRAND_NAME}`, text: line, url });
        return;
      }
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(`${line}\n${url}`);
      }
    } catch {
      try {
        await navigator.clipboard.writeText(`${line}\n${url}`);
      } catch {
        /* ignore */
      }
    }
  };
  
  const unitGroups = useMemo<UnitGroup[]>(() => {
    if (categoryData.id !== 'data-storage') {
      return [{ label: `All ${categoryData.name} Units`, units: categoryData.units }];
    }

    return [
      { label: 'Bit Units', units: categoryData.units.filter(unit => unit.type === 'bit') },
      { label: 'Byte Units', units: categoryData.units.filter(unit => unit.type === 'byte') },
      { label: 'Binary Units', units: categoryData.units.filter(unit => unit.type === 'binary') },
    ].filter(group => group.units.length > 0);
  }, [categoryData.id, categoryData.name, categoryData.units]);

  useEffect(() => {
    if (!activeTooltip) return;
    const timer = setTimeout(() => setActiveTooltip(null), 2200);
    return () => clearTimeout(timer);
  }, [activeTooltip, fromUnitId, toUnitId, fromValue, toValue]);

  if (!fromUnit || !toUnit) return null;

  const currentIsFav = isFavorite(categoryData.id, fromUnitId, toUnitId);
  const categoryRecentConversions = recentConversions.filter(conv => conv.categoryId === categoryData.id);
  const categoryFavorites = favorites.filter(fav => fav.categoryId === categoryData.id);

  const favoriteItems = favorites.map((fav) => {
    const favCategory = getCategoryById(fav.categoryId);
    const fromUnit = favCategory?.units.find(unit => unit.id === fav.fromUnit);
    const toUnit = favCategory?.units.find(unit => unit.id === fav.toUnit);
    return {
      id: fav.id,
      categoryName: favCategory?.name || fav.categoryId,
      categorySlug: favCategory?.slug || '',
      fromSymbol: fromUnit?.symbol || fav.fromUnit,
      toSymbol: toUnit?.symbol || fav.toUnit,
      href: favCategory ? `/${favCategory.slug}?from=${fav.fromUnit}&to=${fav.toUnit}&value=1` : '#',
    };
  });

  const handleSettingsClick = () => {
    if (user) {
      router.push('/profile');
      return;
    }
    openSignInModal({ redirectTo: '/profile' });
  };

  const handleRestrictedAction = () => {
    if (!user) {
      openSignInModal();
    }
  };

  const handleToggleFavorite = () => {
    if (currentIsFav) {
      const fav = favorites.find(f => f.categoryId === categoryData.id && f.fromUnit === fromUnitId && f.toUnit === toUnitId);
      if (fav) removeFavorite(fav.id);
    } else {
      addFavorite(categoryData.id, fromUnitId, toUnitId);
    }
  };

  const tooltipContent = getConversionTooltipContent({
    categoryName: categoryData.name,
    fromValue,
    fromUnitName: fromUnit.name,
    fromUnitSymbol: fromUnit.symbol,
    toValue,
    toUnitName: toUnit.name,
    toUnitSymbol: toUnit.symbol,
  });

  const isRichLayout = richUi;
  const richIcon = RICH_CATEGORY_ICON[categoryData.id];

  return (
    <main
      className={`flex w-full max-w-2xl flex-col gap-1 sm:gap-2 mx-auto px-1.5 sm:px-3 md:px-0 mt-0.5 sm:mt-2 md:mt-0 ${isRichLayout ? 'sm:rounded-2xl sm:bg-slate-50/80 sm:p-1 sm:shadow-sm' : ''}`}
    >
      
      {/* Main Converter Card - More Compact on Mobile */}
      <section
        className={`bg-white rounded-2xl sm:rounded-3xl p-0.5 sm:p-1 border mx-0 sm:mx-0 overflow-hidden ${
          isRichLayout
            ? 'border-violet-100 shadow-xl shadow-violet-200/25'
            : 'border-slate-100 shadow-xl shadow-slate-200/40'
        }`}
      >
        <div
          className={`rounded-xl sm:rounded-2xl p-1.5 sm:p-4 ${
            isRichLayout ? 'bg-gradient-to-b from-violet-50/40 via-slate-50/50 to-white' : 'bg-slate-50/50'
          }`}
        >
          <div className="mb-2 flex flex-col gap-1.5 sm:mb-4 sm:gap-3">
            <div className="flex items-center justify-between gap-1.5 sm:gap-3 sm:items-start">
              <div className="flex min-w-0 flex-1 items-start gap-2 sm:gap-3">
                {isRichLayout && richIcon && (() => {
                  const HeaderIcon = richIcon;
                  return (
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 shadow-sm ring-1 ring-violet-200/60 sm:rounded-xl">
                      <HeaderIcon className="h-4 w-4" aria-hidden />
                    </div>
                  );
                })()}
                <div className="flex min-w-0 flex-1 flex-col">
                  <h2 className="text-base font-black leading-snug tracking-tight text-slate-900 min-[380px]:text-[17px] sm:text-xl">
                    {categoryData.name}
                  </h2>
                  <div className="mt-1 hidden flex-wrap items-center gap-1.5 sm:flex">
                    <div className="flex gap-0.5">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`h-1 w-1 animate-pulse rounded-full ${
                            isRichLayout ? 'bg-violet-500' : 'bg-primary'
                          }`}
                          style={{ animationDelay: `${i * 200}ms` }}
                        />
                      ))}
                    </div>
                    <p
                      className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                        isRichLayout ? 'text-violet-600' : 'text-primary/90'
                      }`}
                    >
                      High Precision Engine
                    </p>
                  </div>
                  {isRichLayout && converterUi?.tagline && (
                    <p className="mt-1 hidden max-w-md text-[11px] leading-snug text-slate-500 sm:block">
                      {converterUi.tagline}
                    </p>
                  )}
                </div>
                {(converterUi?.heroVariant === 'weight' || (converterUi?.heroVariant === 'icon' && richIcon)) && (
                  <div className="hidden shrink-0 sm:block">
                    {converterUi?.heroVariant === 'weight' && <WeightHeroIllustration />}
                    {converterUi?.heroVariant === 'icon' && richIcon && <IconCategoryHero icon={richIcon} />}
                  </div>
                )}
              </div>
              <div className="flex shrink-0 gap-1 self-center sm:gap-1.5 sm:self-start sm:pt-0.5">
                <button
                  type="button"
                  onClick={handleToggleFavorite}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all active:scale-90 sm:rounded-lg ${
                    currentIsFav
                      ? 'border-amber-200 bg-amber-50 text-amber-500 shadow-sm'
                      : isRichLayout
                        ? 'border-violet-200 bg-white text-violet-400 hover:border-violet-300 hover:text-violet-600'
                        : 'border-slate-100 bg-white text-slate-400 hover:border-amber-200 hover:text-amber-500'
                  }`}
                  aria-label={currentIsFav ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Star className={`h-4 w-4 ${currentIsFav ? 'fill-amber-500' : ''}`} />
                </button>
                <button
                  type="button"
                  onClick={handleSwap}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg border text-white shadow-md transition-all active:scale-95 sm:rounded-lg ${
                    isRichLayout
                      ? 'border-violet-700 bg-violet-600 shadow-violet-600/25 hover:bg-violet-700'
                      : 'border-slate-800 bg-slate-900 shadow-slate-900/20 hover:bg-slate-800'
                  }`}
                  aria-label="Swap from and to units"
                >
                  <ArrowRightLeft className="h-4 w-4" />
                </button>
              </div>
            </div>
            {(converterUi?.heroVariant === 'weight' || (converterUi?.heroVariant === 'icon' && richIcon)) && (
              <div className="flex justify-center sm:hidden [&>div]:scale-[0.88]">
                {converterUi?.heroVariant === 'weight' && <WeightHeroIllustration />}
                {converterUi?.heroVariant === 'icon' && richIcon && <IconCategoryHero icon={richIcon} />}
              </div>
            )}
          </div>

          <div className="relative grid grid-cols-1 gap-2 sm:gap-4">
            {/* INPUT BLOCK */}
            <div
              className={`space-y-1.5 sm:space-y-2 ${isRichLayout ? 'rounded-lg border border-violet-100 bg-white/90 p-2 shadow-sm shadow-violet-100/40 sm:rounded-xl sm:p-3' : ''}`}
            >
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {richUi ? 'From' : 'Initial Amount'}
                </span>
                <span className="text-[10px] font-bold text-slate-500">{richUi ? 'Unit' : 'From unit'}</span>
              </div>
              
              <motion.div
                whileHover={{ scale: isRichLayout ? 1 : 1.005 }}
                className={`relative group flex flex-col gap-1.5 min-[420px]:flex-row min-[420px]:items-stretch min-[420px]:gap-2 rounded-lg border-2 px-1.5 sm:rounded-xl sm:px-2.5 py-1.5 sm:py-2 transition-all duration-300 ${
                  isRichLayout
                    ? 'border-violet-200/90 bg-white shadow-sm shadow-violet-200/20 hover:border-violet-300 focus-within:border-violet-400 focus-within:shadow-violet-300/25'
                    : 'border-primary/30 bg-white/90 shadow-[0_10px_30px_-20px_rgba(59,130,246,0.9)] hover:border-primary/50 hover:shadow-[0_14px_36px_-18px_rgba(59,130,246,0.8)] focus-within:border-primary/70 focus-within:shadow-[0_14px_40px_-16px_rgba(59,130,246,0.9)]'
                }`}
              >
                <span
                  className={`pointer-events-none absolute inset-0 rounded-2xl opacity-40 group-focus-within:animate-pulse ${
                    isRichLayout ? 'border border-violet-200' : 'border border-primary/30'
                  }`}
                />
                <div className="relative z-10 flex min-h-[42px] min-w-0 flex-1 items-center gap-1 sm:gap-2 min-[420px]:min-h-0">
                  <input
                    type="number"
                    step="any"
                    inputMode="decimal"
                    value={fromValue}
                    onChange={(e) => setFromValue(normalizeAdvancedInput(e.target.value))}
                    enterKeyHint="done"
                    autoComplete="off"
                    className={`relative z-10 min-w-0 flex-1 bg-transparent px-0.5 py-0.5 text-lg font-black text-slate-900 focus:outline-none transition-all placeholder:text-slate-300 border-none tracking-tight tabular-nums min-[420px]:py-0.5 sm:text-3xl ${fromValue ? 'pr-8 sm:pr-9' : ''}`}
                    placeholder={richUi ? 'Enter value' : '0'}
                    aria-label="Enter number value for unit conversion"
                  />
                  {isRichLayout && (
                    <span className="relative z-10 hidden sm:inline-flex shrink-0 items-center rounded-md bg-violet-100 px-1.5 py-0.5 text-[11px] font-black text-violet-700 tabular-nums ring-1 ring-violet-200/80">
                      {fromUnit.symbol}
                    </span>
                  )}
                  {isRichLayout && (
                    <span className="relative z-10 inline-flex sm:hidden shrink-0 items-center rounded-md bg-violet-100 px-1.5 py-0.5 text-[10px] font-black text-violet-700 tabular-nums ring-1 ring-violet-200/80">
                      {fromUnit.symbol}
                    </span>
                  )}
                  {fromValue && (
                    <button
                      type="button"
                      onClick={() => setFromValue('')}
                      className={`absolute z-20 right-0 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-colors ${
                        isRichLayout
                          ? 'bg-violet-100 text-violet-500 hover:text-violet-700'
                          : 'bg-slate-100 text-slate-400 hover:text-slate-600'
                      }`}
                      aria-label="Clear value"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="relative z-10 w-full min-w-0 shrink-0 min-[420px]:w-[38%] min-[420px]:max-w-[240px] min-[480px]:w-[42%]">
                  <select
                    value={fromUnitId}
                    onChange={(e) => {
                      setFromUnitId(e.target.value);
                      setActiveTooltip('from');
                    }}
                    className={`min-h-[40px] w-full appearance-auto rounded-md px-2 py-1.5 pr-7 text-xs sm:min-h-0 sm:rounded-lg sm:px-1.5 sm:py-1.5 sm:text-sm font-bold text-slate-700 shadow-sm focus:outline-none focus:ring-2 ${
                      isRichLayout
                        ? 'border border-violet-200 bg-violet-50/60 focus:ring-violet-300/50 focus:border-violet-400'
                        : 'border border-primary/30 bg-primary/5 focus:ring-primary/30 focus:border-primary/60'
                    }`}
                    aria-label="Select initial amount unit"
                  >
                    {unitGroups.map(group => (
                      <optgroup key={group.label} label={group.label}>
                        {group.units.map(unit => (
                          <option key={unit.id} value={unit.id}>
                            {unit.name} ({unit.symbol})
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <ChevronDown
                    className={`pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 ${
                      isRichLayout ? 'text-violet-400' : 'text-slate-400'
                    }`}
                  />
                </div>
                <AnimatePresence>
                  {activeTooltip === 'from' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      className={`absolute -top-28 right-0 z-30 w-[min(100vw-2.5rem,280px)] min-[420px]:w-[300px] rounded-xl border bg-white p-2 shadow-2xl ${
                        isRichLayout
                          ? 'border-violet-200 shadow-violet-500/10'
                          : 'border-primary/20 shadow-primary/10'
                      }`}
                    >
                      <p
                        className={`text-[10px] font-black uppercase tracking-[0.18em] ${
                          isRichLayout ? 'text-violet-700/90' : 'text-primary/80'
                        }`}
                      >
                        {tooltipContent.title}
                      </p>
                      <p className="mt-1 text-xs font-black text-slate-800">{tooltipContent.resultLine}</p>
                      <p className="mt-1 text-[10px] font-bold text-slate-500">Formula: {tooltipContent.formulaLine}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {richUi && sliderCfg && (
                <div className="space-y-0.5 px-0.5 pt-0.5">
                  <div className="flex justify-between text-[8px] font-black uppercase tracking-wider text-slate-400">
                    <span>0</span>
                    <span className="tabular-nums">{sliderCfg.max.toLocaleString('en-US')}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={sliderCfg.max}
                    step={sliderCfg.step}
                    value={Math.min(Math.max(fromNum, 0), sliderCfg.max)}
                    onChange={(e) => setFromValue(e.target.value)}
                    className={`w-full h-1.5 rounded-full appearance-none cursor-pointer ${
                      isRichLayout ? 'accent-violet-600 bg-violet-100' : 'accent-primary bg-slate-200/80'
                    }`}
                    aria-label="Adjust amount"
                  />
                </div>
              )}

              <div
                className={`${
                  richUi
                    ? 'grid grid-cols-2 min-[380px]:grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-1.5'
                    : 'hidden sm:grid sm:grid-cols-4'
                } gap-1 overflow-x-auto pb-0.5 no-scrollbar sm:gap-1.5`}
              >
                {quickPills.map((pid) => {
                  const unit = categoryData.units.find((u) => u.id === pid);
                  const symbol = unit?.symbol || pid;
                  const label = unit?.name ?? pid;
                  return (
                    <button
                      key={pid}
                      type="button"
                      onClick={() => setFromUnitId(pid)}
                      aria-label={`From unit: ${label} (${symbol})`}
                      className={`touch-manipulation flex min-h-[44px] flex-col items-center justify-center gap-0.5 px-1 py-1.5 text-center sm:min-h-0 sm:px-1.5 sm:py-2 rounded-md border transition-all shrink-0 sm:rounded-lg ${
                        fromUnitId === pid
                          ? isRichLayout
                            ? 'bg-violet-600 border-violet-600 text-white shadow-md shadow-violet-500/20'
                            : 'bg-primary border-primary text-white shadow-md'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-violet-300/60'
                      }`}
                    >
                      <span className="w-full px-0.5 text-[8px] font-bold leading-snug [overflow-wrap:anywhere] sm:text-[9px] line-clamp-3 normal-case">
                        {label}
                      </span>
                      <span
                        className={`text-[7px] font-black tabular-nums sm:text-[8px] ${
                          fromUnitId === pid ? 'text-white/85' : 'text-slate-400'
                        }`}
                      >
                        {symbol}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* DIVIDER */}
            <div className="-my-0.5 flex items-center justify-center py-0.5 group sm:my-0 sm:py-0">
               <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
               <div
                 className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-lg border-2 bg-white shadow-sm transition-all duration-500 group-hover:scale-105 sm:h-8 sm:w-8 sm:rounded-xl ${
                   isRichLayout
                     ? 'border-violet-100 text-violet-400 group-hover:border-violet-300 group-hover:text-violet-600'
                     : 'border-slate-50 text-slate-300 group-hover:border-primary/20 group-hover:text-primary'
                 }`}
               >
                  <ArrowRightLeft className="h-3.5 w-3.5 rotate-90 sm:h-4 sm:w-4" />
               </div>
            </div>

            {/* OUTPUT BLOCK */}
            <div
              className={`space-y-1.5 sm:space-y-2 ${isRichLayout ? 'rounded-lg border border-violet-100 bg-white/90 p-2 shadow-sm shadow-violet-100/40 sm:rounded-xl sm:p-3' : ''}`}
            >
              <div className="flex items-center justify-between px-0.5">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {richUi ? 'To' : 'Effective Value'}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-slate-500">{richUi ? 'Unit' : 'To unit'}</span>
                  {!isRichLayout && (
                    <>
                      <button
                        type="button"
                        onClick={() => navigator.clipboard.writeText(toValue)}
                        className="inline-flex items-center gap-0.5 rounded-md border border-blue-100 bg-white px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                        Copy
                      </button>
                      {richUi && (
                        <button
                          type="button"
                          onClick={handleShare}
                          className="inline-flex items-center gap-0.5 rounded-md border border-blue-100 bg-white px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <Share2 className="w-3 h-3" />
                          Share
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>

              <motion.div
                whileHover={{ scale: isRichLayout ? 1 : 1.005 }}
                className={`relative group flex flex-col gap-1.5 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between min-[420px]:gap-2 rounded-lg border-2 px-1.5 sm:rounded-xl sm:px-2.5 py-1.5 sm:py-2 transition-all duration-300 ${
                  isRichLayout
                    ? 'border-violet-200 bg-white shadow-sm shadow-violet-200/25 hover:border-violet-300 focus-within:border-violet-400'
                    : 'border-blue-200 bg-white/95 shadow-[0_10px_30px_-20px_rgba(37,99,235,0.9)] hover:border-blue-300 hover:shadow-[0_14px_36px_-18px_rgba(37,99,235,0.8)] focus-within:border-blue-500/60 focus-within:shadow-[0_14px_40px_-16px_rgba(37,99,235,0.9)]'
                }`}
              >
                {!isRichLayout && (
                  <span className="pointer-events-none absolute inset-0 rounded-2xl border border-blue-300/50 opacity-40 group-focus-within:animate-pulse" />
                )}
                {isRichLayout && (
                  <span className="pointer-events-none absolute inset-0 rounded-2xl border border-violet-200/60 opacity-50 group-focus-within:animate-pulse" />
                )}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={toValue}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`relative z-10 min-h-[40px] min-w-0 flex-1 text-lg font-black tracking-tighter tabular-nums min-[420px]:min-h-0 sm:truncate sm:text-3xl sm:mr-2 ${
                      isRichLayout ? 'text-violet-600' : 'text-blue-600'
                    }`}
                  >
                    <span className="block min-[420px]:inline leading-snug break-words [overflow-wrap:anywhere]">
                      {toValue || '0'}
                    </span>
                  </motion.span>
                </AnimatePresence>
                <div className="relative z-10 w-full min-w-0 shrink-0 min-[420px]:w-[38%] min-[420px]:max-w-[240px] min-[480px]:w-[42%] min-[420px]:mr-0 sm:mr-2">
                  <select
                    value={toUnitId}
                    onChange={(e) => {
                      setToUnitId(e.target.value);
                      setActiveTooltip('to');
                    }}
                    className={`min-h-[40px] w-full appearance-auto rounded-md border px-2 py-1.5 pr-7 text-xs sm:min-h-0 sm:rounded-lg sm:px-1.5 sm:py-1.5 sm:text-sm font-bold shadow-sm focus:outline-none focus:ring-2 ${
                      isRichLayout
                        ? 'border-violet-300/70 bg-violet-50/80 text-violet-800 focus:ring-violet-300/45 focus:border-violet-400'
                        : 'border-blue-300/60 bg-blue-50/70 text-blue-700 focus:ring-blue-400/40 focus:border-blue-400'
                    }`}
                    aria-label="Select effective value unit"
                  >
                    {unitGroups.map(group => (
                      <optgroup key={group.label} label={group.label}>
                        {group.units.map(unit => (
                          <option key={unit.id} value={unit.id}>
                            {unit.name} ({unit.symbol})
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <ChevronDown
                    className={`pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 ${
                      isRichLayout ? 'text-violet-500' : 'text-blue-400'
                    }`}
                  />
                </div>
                <AnimatePresence>
                  {activeTooltip === 'to' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      className={`absolute -top-28 right-0 z-30 w-[min(100vw-2.5rem,280px)] min-[420px]:w-[300px] rounded-xl border bg-white p-2 shadow-2xl ${
                        isRichLayout ? 'border-violet-200 shadow-violet-500/10' : 'border-blue-200 shadow-blue-500/10'
                      }`}
                    >
                      <p
                        className={`text-[10px] font-black uppercase tracking-[0.18em] ${
                          isRichLayout ? 'text-violet-700/90' : 'text-blue-700/80'
                        }`}
                      >
                        {tooltipContent.title}
                      </p>
                      <p className="mt-1 text-xs font-black text-slate-800">{tooltipContent.resultLine}</p>
                      <p className="mt-1 text-[10px] font-bold text-slate-500">Formula: {tooltipContent.formulaLine}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {richUi && chainSummaryLine && (
                <div className="space-y-1">
                  <p
                    className={`rounded-md border px-1.5 py-1 text-[9px] font-semibold leading-snug break-words [overflow-wrap:anywhere] sm:rounded-lg sm:px-2 sm:py-1.5 sm:text-[10px] ${
                      isRichLayout
                        ? 'border-violet-100/90 bg-violet-50/50 text-slate-600'
                        : 'border-blue-100/80 bg-white/80 text-slate-600'
                    }`}
                  >
                    {chainSummaryLine}
                  </p>
                  {isRichLayout && (
                    <div className="flex flex-wrap justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => navigator.clipboard.writeText(toValue)}
                        className="inline-flex items-center gap-0.5 rounded-md border border-violet-200 bg-white px-2 py-1 text-[9px] font-black uppercase tracking-wide text-violet-700 hover:bg-violet-50 transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                        Copy
                      </button>
                      <button
                        type="button"
                        onClick={handleShare}
                        className="inline-flex items-center gap-0.5 rounded-md border border-violet-200 bg-white px-2 py-1 text-[9px] font-black uppercase tracking-wide text-violet-700 hover:bg-violet-50 transition-colors"
                      >
                        <Share2 className="w-3 h-3" />
                        Share
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div
                className={`${
                  richUi
                    ? 'grid grid-cols-2 min-[380px]:grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-1.5'
                    : 'hidden sm:grid sm:grid-cols-4'
                } gap-1 overflow-x-auto pb-0.5 no-scrollbar sm:gap-1.5`}
              >
                {quickPills.map((pid) => {
                  const unit = categoryData.units.find((u) => u.id === pid);
                  const symbol = unit?.symbol || pid;
                  const label = unit?.name ?? pid;
                  return (
                    <button
                      type="button"
                      key={pid}
                      onClick={() => setToUnitId(pid)}
                      aria-label={`To unit: ${label} (${symbol})`}
                      className={`touch-manipulation flex min-h-[44px] flex-col items-center justify-center gap-0.5 px-1 py-1.5 text-center sm:min-h-0 sm:px-1.5 sm:py-2 rounded-md border transition-all shrink-0 sm:rounded-lg ${
                        toUnitId === pid
                          ? isRichLayout
                            ? 'bg-violet-600 border-violet-600 text-white shadow-md shadow-violet-500/20'
                            : 'bg-blue-600 border-blue-600 text-white shadow-md'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-violet-300/60'
                      }`}
                    >
                      <span className="w-full px-0.5 text-[8px] font-bold leading-snug [overflow-wrap:anywhere] sm:text-[9px] line-clamp-3 normal-case">
                        {label}
                      </span>
                      <span
                        className={`text-[7px] font-black tabular-nums sm:text-[8px] ${
                          toUnitId === pid ? 'text-white/85' : 'text-slate-400'
                        }`}
                      >
                        {symbol}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div
                className={`${richUi ? 'block' : 'hidden sm:block'} rounded-lg border p-1.5 sm:rounded-xl sm:p-2 ${
                  isRichLayout
                    ? 'border-violet-100 bg-gradient-to-r from-violet-50/70 to-indigo-50/50'
                    : 'border-blue-100 bg-gradient-to-r from-blue-50/60 to-indigo-50/50'
                }`}
              >
                <div className="mb-1 flex items-center justify-between sm:mb-1.5">
                  <p
                    className={`text-[10px] font-black uppercase tracking-widest ${
                      isRichLayout ? 'text-violet-800/90' : 'text-blue-700/80'
                    }`}
                  >
                    Suggested Conversions
                  </p>
                  <span className={`text-[10px] font-bold ${isRichLayout ? 'text-violet-600' : 'text-blue-500'}`}>
                    {fromUnit.symbol} to {toUnit.symbol}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1 sm:gap-1.5">
                  {['1', '10', '100'].map((preset) => (
                    <button
                      type="button"
                      key={preset}
                      onClick={() => setFromValue(preset)}
                      className={`rounded-md border bg-white px-1 py-1 text-left transition-colors sm:rounded-lg sm:px-1.5 sm:py-1.5 ${
                        isRichLayout
                          ? 'border-violet-100 hover:border-violet-300 hover:bg-violet-50'
                          : 'border-blue-100 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <p className="text-[9px] font-black text-slate-700">{preset} {fromUnit.symbol}</p>
                      <p
                        className={`text-[9px] font-bold mt-0.5 truncate ${
                          isRichLayout ? 'text-violet-600' : 'text-blue-600'
                        }`}
                      >
                        {convertValue(preset, fromUnit.id, toUnit.id, categoryData.id)} {toUnit.symbol}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {richUi && converterUi && (
            <div className="mt-2 grid grid-cols-1 gap-2 sm:mt-4 sm:gap-2.5 md:grid-cols-2 md:gap-3">
              <div
                className={`rounded-lg border p-2 shadow-sm sm:rounded-xl sm:p-3 ${
                  isRichLayout
                    ? 'border-violet-100 bg-white'
                    : 'border-slate-200/80 bg-white/60'
                }`}
              >
                <p
                  className={`mb-1.5 text-[9px] font-black uppercase tracking-widest sm:mb-2 ${
                    isRichLayout ? 'text-violet-800/80' : 'text-slate-500'
                  }`}
                >
                  {`Common ${categoryData.name} units`}
                </p>
                <div className="grid grid-cols-2 min-[400px]:grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-1.5">
                  {quickPills.map((pid) => {
                    const unit = categoryData.units.find((u) => u.id === pid);
                    const symbol = unit?.symbol || pid;
                    return (
                      <button
                        type="button"
                        key={`common-${pid}`}
                        onClick={() => setFromUnitId(pid)}
                        className={`flex min-h-[2.4rem] flex-col items-center justify-center rounded-md border px-0.5 py-1 text-center transition-colors sm:min-h-[2.75rem] sm:rounded-lg sm:px-1 sm:py-1.5 ${
                          fromUnitId === pid
                            ? isRichLayout
                              ? 'border-violet-500 bg-violet-50 text-violet-800 ring-1 ring-violet-200'
                              : 'border-primary bg-primary/10 text-primary'
                            : isRichLayout
                              ? 'border-slate-200 bg-white text-slate-600 hover:border-violet-300/50'
                              : 'border-slate-200 bg-white text-slate-600 hover:border-primary/40'
                        }`}
                      >
                        <span className="text-[10px] font-black leading-none">{symbol}</span>
                        <span className="mt-0.5 text-[7px] font-bold uppercase tracking-tight text-slate-400 leading-tight line-clamp-2">
                          {unit?.name ?? pid}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-1.5 text-[8px] font-bold leading-snug text-slate-400 sm:mt-2 sm:text-[9px]">
                  Tap a unit to set it as your &quot;From&quot; unit (use the rows above for From/To shortcuts).
                </p>
              </div>
              <div
                className={`relative overflow-hidden rounded-lg border p-2 shadow-sm sm:rounded-xl sm:p-3 ${
                  isRichLayout ? 'border-amber-200/80 bg-[#fffbeb]' : 'border-amber-200/90 bg-amber-50/95'
                }`}
              >
                {isRichLayout && (
                  <div className="pointer-events-none absolute -bottom-6 -right-2 opacity-[0.12]">
                    <div className="origin-bottom-right scale-[0.35]">
                      <WeightHeroIllustration />
                    </div>
                  </div>
                )}
                <div className="relative flex gap-1.5 sm:gap-2">
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md sm:h-8 sm:w-8 sm:rounded-lg ${
                      isRichLayout ? 'bg-amber-100 text-amber-700' : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    <Lightbulb className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1 pr-6 sm:pr-10">
                    <p className="text-[8px] font-black uppercase tracking-widest text-amber-900/85 sm:text-[9px]">Conversion tips</p>
                    <ul className="mt-0.5 space-y-0.5 text-[10px] font-semibold leading-snug text-amber-950/90 sm:mt-1 sm:space-y-1 sm:text-[11px]">
                      {converterUi.conversionTips.map((tip) => (
                        <li key={tip} className="flex gap-2 items-start">
                          <CheckCircle2
                            className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${isRichLayout ? 'text-emerald-600' : 'text-amber-600'}`}
                            aria-hidden
                          />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {richUi && (
            <div
              className={`mt-2 flex items-center justify-center gap-1 rounded-lg py-1.5 text-white shadow-sm sm:mt-3 sm:gap-1.5 sm:rounded-xl sm:py-2 ${
                isRichLayout ? 'bg-violet-600 shadow-violet-900/15' : 'bg-emerald-600 shadow-emerald-900/10'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5 shrink-0 opacity-95" aria-hidden />
              <span className="text-[9px] font-black uppercase tracking-[0.18em]">High Precision Engine</span>
            </div>
          )}

          <div className="mt-3 flex flex-col items-center justify-between gap-1.5 sm:mt-5 sm:flex-row sm:gap-3">
             <div className="flex w-full items-center gap-1.5 overflow-hidden rounded-lg border border-slate-100 bg-white px-2 py-1 shadow-sm sm:w-auto sm:gap-2 sm:rounded-xl sm:px-3 sm:py-1.5">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-amber-100 text-amber-600 sm:h-6 sm:w-6 sm:rounded-md">
                  <Lightbulb className="h-3 w-3 fill-current sm:h-3.5 sm:w-3.5" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                   <p className="text-[8px] font-black uppercase leading-tight tracking-widest text-slate-400 sm:text-[9px]">Quick Ratio</p>
                   <p className="truncate text-[10px] font-bold text-slate-700 sm:text-[11px]">1 {fromUnit.symbol} = {convertValue('1', fromUnit.id, toUnit.id, categoryData.id)} {toUnit.symbol}</p>
                </div>
             </div>
             
             <div className="flex w-full items-center gap-1 sm:w-auto sm:gap-1.5">
              <button
                onClick={handleRestrictedAction}
                className="flex-1 rounded-md bg-slate-100 px-3 py-1.5 text-[8px] font-black uppercase tracking-widest text-slate-600 transition-all hover:bg-slate-200 active:scale-95 sm:flex-none sm:rounded-lg sm:px-4 sm:py-2 sm:text-[9px]"
              >
                 Formula
               </button>
              <button
                onClick={handleRestrictedAction}
                className={`flex flex-1 items-center justify-center gap-0.5 rounded-md border px-3 py-1.5 text-[8px] font-black uppercase tracking-widest transition-all active:scale-95 sm:flex-none sm:gap-1 sm:rounded-lg sm:px-4 sm:py-2 sm:text-[9px] ${
                  isRichLayout
                    ? 'border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100'
                    : 'border-blue-100/50 bg-blue-50 text-blue-600 hover:bg-blue-100'
                }`}
              >
                 Details <ChevronRight className="w-3 h-3" />
               </button>
             </div>
          </div>
        </div>
      </section>

      {/* Grid of Shortcuts - New "App" Like Section */}
      <div className="grid max-w-full grid-cols-2 gap-1 px-0 sm:gap-2 sm:px-1 sm:grid-cols-4">
         {[
           { icon: <Database className="w-4 h-4" />, label: 'History', key: 'history' as const },
           { icon: <Star className="w-4 h-4" />, label: 'Saved', key: 'saved' as const },
           { icon: <Trophy className="w-4 h-4" />, label: 'Stats', key: 'stats' as const },
           { icon: <Settings className="w-4 h-4" />, label: 'Settings', key: 'settings' as const }
         ].map((item, i) => (
           <button
             key={i}
             onClick={() => {
               if (item.key === 'settings') {
                 handleSettingsClick();
                 return;
               }
               setActiveTab(item.key);
             }}
             className={`flex flex-col items-center gap-0.5 rounded-lg border p-1.5 transition-all active:scale-95 sm:gap-1 sm:rounded-xl sm:p-2 ${
               activeTab === item.key ? 'bg-white border-slate-100 shadow-sm' : 'bg-transparent border-transparent opacity-60'
             }`}
           >
              <div className={`flex h-6 w-6 items-center justify-center rounded-md sm:h-7 sm:w-7 sm:rounded-lg ${activeTab === item.key ? 'bg-blue-50 text-primary' : 'bg-slate-100 text-slate-400'}`}>
                {item.icon}
              </div>
              <span className="text-[7px] font-black uppercase tracking-tighter text-slate-500 sm:text-[8px]">{item.label}</span>
           </button>
         ))}
      </div>

      {/* Quick Conversions Section - Compact Scroll */}
      <section className="mt-0">
        <div className="mb-1.5 flex items-center justify-between px-0.5 sm:mb-2 sm:px-2">
          <h3
            className={`text-xs font-black tracking-tight sm:text-sm ${isRichLayout ? 'text-slate-800' : 'text-xs text-slate-400 uppercase tracking-widest'}`}
          >
            {isRichLayout ? 'Quick conversions' : 'Quick pairings'}
          </h3>
          {isRichLayout ? (
            <span className="text-[11px] font-bold text-violet-600 tabular-nums">
              {fromUnit.symbol} to {toUnit.symbol}
            </span>
          ) : (
            <button onClick={handleRestrictedAction} className="text-[10px] font-black text-primary tracking-wider">
              REFRESH
            </button>
          )}
        </div>
        <div className="-mx-1 flex snap-x snap-mandatory gap-1.5 overflow-x-auto scroll-pl-2 px-0.5 pb-1.5 no-scrollbar sm:mx-0 sm:gap-2 sm:px-2 sm:pb-3">
          {(converterUi?.quickPairings ?? [
            { from: 'MB', to: 'GB' },
            { from: 'GB', to: 'MB' },
            { from: 'KB', to: 'MB' },
            { from: 'MB', to: 'KB' },
            { from: 'GB', to: 'TB' },
          ]).map((item, idx) => {
            const fUnit = categoryData.units.find((u) => u.id === item.from);
            const tUnit = categoryData.units.find((u) => u.id === item.to);
            if (!fUnit || !tUnit) return null;
            const preset = 'presetFromValue' in item ? item.presetFromValue : undefined;
            const isActive =
              fromUnitId === item.from &&
              toUnitId === item.to &&
              (preset === undefined || String(fromValue) === String(preset));
            return (
              <motion.button
                whileTap={{ scale: 0.95 }}
                key={`${item.from}-${item.to}-${preset ?? 'x'}-${idx}`}
                type="button"
                onClick={() => {
                  setFromUnitId(item.from);
                  setToUnitId(item.to);
                  if (preset !== undefined) setFromValue(preset);
                }}
                className={`relative flex w-[9.75rem] max-w-[calc(100vw-2rem)] shrink-0 snap-start flex-col gap-0.5 rounded-lg border bg-white p-2 shadow-sm transition-colors sm:min-w-[132px] sm:w-auto sm:max-w-none sm:gap-1 sm:rounded-xl sm:p-2 ${
                  isActive
                    ? isRichLayout
                      ? 'border-violet-400 ring-2 ring-violet-300/40 bg-violet-50/80'
                      : 'border-primary ring-2 ring-primary/25 bg-primary/5'
                    : 'border-slate-100'
                }`}
              >
                {isActive && (
                  <span
                    className={`absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full text-white ${
                      isRichLayout ? 'bg-violet-600' : 'bg-primary'
                    }`}
                  >
                    <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
                  </span>
                )}
                <div className="flex items-start gap-1 sm:gap-1.5">
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md sm:h-7 sm:w-7 sm:rounded-lg ${
                      isRichLayout ? 'bg-violet-100 text-violet-600' : 'bg-slate-50 text-slate-600'
                    }`}
                  >
                    {isRichLayout && richIcon ? (
                      (() => {
                        const QIcon = richIcon;
                        return <QIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden />;
                      })()
                    ) : (
                      <ArrowRightLeft className="h-3 w-3 text-primary" aria-hidden />
                    )}
                  </div>
                  <div className="min-w-0 text-left pr-4">
                    <p className="text-[10px] font-black text-slate-800 tabular-nums">
                      {preset !== undefined ? `${preset} ${fUnit.symbol}` : `${fUnit.symbol} → ${tUnit.symbol}`}
                    </p>
                    <p
                      className={`mt-0.5 text-[10px] font-bold tabular-nums truncate ${
                        isRichLayout ? 'text-violet-600' : 'text-slate-500'
                      }`}
                    >
                      {preset !== undefined
                        ? `${convertValue(preset, item.from, item.to, categoryData.id)} ${tUnit.symbol}`
                        : `${fUnit.symbol} to ${tUnit.symbol}`}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Recent Conversions */}
      <section className="mt-0.5 mb-4 sm:mt-1 sm:mb-6">
        {activeTab === 'history' && (
          <>
            <div className="flex justify-between items-center mb-2 px-1">
              <h3 className="text-sm font-bold text-slate-800">{categoryData.name} History</h3>
              <span className="text-xs font-bold text-primary">{categoryRecentConversions.length} entries</span>
            </div>
            <div className="flex flex-col gap-2">
              {categoryRecentConversions.length === 0 ? (
                <div className="h-20 bg-slate-50 border border-dashed border-slate-200 rounded-xl flex items-center justify-center">
                  <p className="text-[11px] font-bold text-slate-400 italic">No recent conversions for this calculator yet.</p>
                </div>
              ) : (
                categoryRecentConversions.map((conv) => (
                  <div key={conv.id} className="bg-white border border-slate-100 rounded-xl p-2.5 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-primary">
                        <Database className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-800">{conv.fromValue} {conv.fromUnit.toUpperCase()} → {conv.toUnit.toUpperCase()}</span>
                        <span className="text-[10px] font-bold text-slate-400">Saved in history</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-primary">{conv.toValue} {conv.toUnit.toUpperCase()}</span>
                      <button
                        onClick={() => navigator.clipboard.writeText(conv.toValue)}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {activeTab === 'saved' && (
          <>
            <div className="flex justify-between items-center mb-2 px-1">
              <h3 className="text-sm font-bold text-slate-800">Saved & Starred</h3>
              <span className="text-xs font-bold text-primary">{favoriteItems.length} total</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-2.5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-amber-600 uppercase tracking-wider">Current converter star</p>
                  <p className="text-sm font-bold text-slate-800 mt-1">{fromUnit.symbol} to {toUnit.symbol}</p>
                </div>
                <Star className={`w-5 h-5 ${currentIsFav ? 'text-amber-500 fill-amber-500' : 'text-amber-300'}`} />
              </div>

              {favoriteItems.length === 0 ? (
                <div className="h-20 bg-slate-50 border border-dashed border-slate-200 rounded-xl flex items-center justify-center">
                  <p className="text-[11px] font-bold text-slate-400 italic">No favorite conversions yet.</p>
                </div>
              ) : (
                favoriteItems.map((fav) => (
                  <Link key={fav.id} href={fav.href} className="bg-white border border-slate-100 rounded-xl p-2.5 flex items-center justify-between shadow-sm hover:border-primary/30 transition-colors">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-wide">{fav.categoryName}</span>
                      <span className="text-sm font-bold text-slate-800 mt-0.5">{fav.fromSymbol} → {fav.toSymbol}</span>
                    </div>
                    <span className="text-xs font-bold text-primary">Open page</span>
                  </Link>
                ))
              )}

              {categoryFavorites.length > 0 && (
                <p className="text-[11px] font-bold text-slate-500 px-1">In this calculator: {categoryFavorites.length} favorite pairings.</p>
              )}
            </div>
          </>
        )}

        {activeTab === 'stats' && (
          <>
            <div className="flex justify-between items-center mb-2 px-1">
              <h3 className="text-sm font-bold text-slate-800">Achievements & Stats</h3>
              <span className="text-xs font-bold text-primary">Live</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white border border-slate-100 rounded-xl p-2.5">
                <p className="text-[9px] font-black text-slate-400 uppercase">Total history</p>
                <p className="text-xl font-black text-slate-900 mt-0.5">{recentConversions.length}</p>
              </div>
              <div className="bg-white border border-slate-100 rounded-xl p-2.5">
                <p className="text-[9px] font-black text-slate-400 uppercase">This calculator</p>
                <p className="text-xl font-black text-primary mt-0.5">{categoryRecentConversions.length}</p>
              </div>
              <div className="bg-white border border-slate-100 rounded-xl p-2.5">
                <p className="text-[9px] font-black text-slate-400 uppercase">Saved favorites</p>
                <p className="text-xl font-black text-slate-900 mt-0.5">{favorites.length}</p>
              </div>
              <div className="bg-white border border-slate-100 rounded-xl p-2.5">
                <p className="text-[9px] font-black text-slate-400 uppercase">Current streak</p>
                <p className="text-xl font-black text-amber-500 mt-0.5">{user ? 'Active' : 'Sign in needed'}</p>
              </div>
            </div>
          </>
        )}
      </section>

    </main>
  );
}
