/**
 * Motion tokens — the single source of truth for timing across the site.
 * Mirrors the Figma "Motion & Interaction System" board.
 */
export const duration = {
  micro: 0.15,
  base: 0.25,
  medium: 0.4,
  large: 0.65,
  cinematic: 0.9,
} as const

export const ease = {
  expoOut: 'expo.out', // entrances
  quartInOut: 'power4.inOut', // scrubbed / idle loops
  back: 'back.out(1.6)', // playful pop (buttons)
  none: 'none', // linear scrub
} as const

export const stagger = 0.075
export const distance = { sm: 16, md: 32, lg: 64 } as const

/** True when the user asked the OS to minimize motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
