import type { Accent } from '@/data/types'

/** Maps an accent token to gradient / text / glow utility strings. */
export const accentGradient: Record<Accent, string> = {
  emerald: 'from-accent-emerald/30 to-accent-cyan/10',
  cyan: 'from-accent-cyan/30 to-accent-blue/10',
  blue: 'from-accent-blue/30 to-accent-violet/10',
  violet: 'from-accent-violet/30 to-accent-magenta/10',
  magenta: 'from-accent-magenta/30 to-accent-pink/10',
  pink: 'from-accent-pink/30 to-accent-magenta/10',
}

/**
 * Bold, saturated hero gradient — mirrors the live site's project headers where
 * the logo + wordmark sit directly on a vibrant accent wash (no white plaque).
 */
export const accentHero: Record<Accent, string> = {
  emerald: 'from-accent-emerald via-accent-cyan to-accent-blue',
  cyan: 'from-accent-cyan via-accent-blue to-accent-violet',
  blue: 'from-accent-blue via-accent-violet to-accent-magenta',
  violet: 'from-accent-violet via-accent-magenta to-accent-blue',
  magenta: 'from-accent-magenta via-accent-violet to-accent-blue',
  pink: 'from-accent-pink via-accent-magenta to-accent-violet',
}

export const accentText: Record<Accent, string> = {
  emerald: 'text-accent-emerald',
  cyan: 'text-accent-cyan',
  blue: 'text-accent-blue',
  violet: 'text-accent-violet',
  magenta: 'text-accent-magenta',
  pink: 'text-accent-pink',
}

export const accentSolid: Record<Accent, string> = {
  emerald: 'bg-accent-emerald text-ink',
  cyan: 'bg-accent-cyan text-ink',
  blue: 'bg-accent-blue text-white',
  violet: 'bg-accent-violet text-white',
  magenta: 'bg-accent-magenta text-white',
  pink: 'bg-accent-pink text-ink',
}

export const accentRing: Record<Accent, string> = {
  emerald: 'ring-accent-emerald/30',
  cyan: 'ring-accent-cyan/30',
  blue: 'ring-accent-blue/30',
  violet: 'ring-accent-violet/30',
  magenta: 'ring-accent-magenta/30',
  pink: 'ring-accent-pink/30',
}
