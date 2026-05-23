import type { LucideIcon } from 'lucide-react';
import { Flame, Star, Crown, Gem, Bookmark, Zap, Trophy, Layers } from 'lucide-react';

export type GamificationStats = {
  totalConversions: number;
  streakCount: number;
  longestStreak: number;
  gems: number;
  favoritesCount: number;
  uniqueUnitsUsed: number;
};

export type BadgeDefinition = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  check: (s: GamificationStats) => boolean;
};

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  {
    id: 'first_convert',
    name: 'First Convert',
    description: 'Complete your first conversion',
    icon: Star,
    check: (s) => s.totalConversions >= 1,
  },
  {
    id: 'explorer_10',
    name: 'Data Explorer',
    description: '10 lifetime conversions',
    icon: Zap,
    check: (s) => s.totalConversions >= 10,
  },
  {
    id: 'century',
    name: 'Century Club',
    description: '100 lifetime conversions',
    icon: Trophy,
    check: (s) => s.totalConversions >= 100,
  },
  {
    id: 'streak_7',
    name: 'Week Warrior',
    description: '7-day activity streak',
    icon: Flame,
    check: (s) => s.streakCount >= 7,
  },
  {
    id: 'streak_30',
    name: 'Monthly Legend',
    description: '30-day activity streak',
    icon: Crown,
    check: (s) => s.streakCount >= 30,
  },
  {
    id: 'gems_50',
    name: 'Gem Hoarder',
    description: 'Collect 50 gems',
    icon: Gem,
    check: (s) => s.gems >= 50,
  },
  {
    id: 'unit_variety',
    name: 'Unit Mixer',
    description: 'Use 5 different units (recent activity)',
    icon: Layers,
    check: (s) => s.uniqueUnitsUsed >= 5,
  },
  {
    id: 'favorite_collector',
    name: 'Favorite Collector',
    description: 'Save 3 favorites',
    icon: Bookmark,
    check: (s) => s.favoritesCount >= 3,
  },
];

export function buildGamificationStats(params: {
  userProfile: {
    streakCount?: number;
    longestStreak?: number;
    gems?: number;
    totalConversions?: number;
  } | null;
  recentConversions: { fromUnit: string; toUnit: string }[];
  favoritesCount: number;
  isLoggedIn: boolean;
}): GamificationStats {
  const { userProfile, recentConversions, favoritesCount, isLoggedIn } = params;

  const uniqueUnitsUsed = new Set<string>();
  recentConversions.forEach((c) => {
    uniqueUnitsUsed.add(c.fromUnit);
    uniqueUnitsUsed.add(c.toUnit);
  });

  const sessionConversions = recentConversions.length;

  return {
    streakCount: userProfile?.streakCount ?? 0,
    longestStreak: userProfile?.longestStreak ?? userProfile?.streakCount ?? 0,
    gems: userProfile?.gems ?? 0,
    totalConversions: isLoggedIn
      ? (userProfile?.totalConversions ?? sessionConversions)
      : sessionConversions,
    favoritesCount,
    uniqueUnitsUsed: uniqueUnitsUsed.size,
  };
}

export function countEarnedBadges(stats: GamificationStats): number {
  return BADGE_DEFINITIONS.filter((b) => b.check(stats)).length;
}
