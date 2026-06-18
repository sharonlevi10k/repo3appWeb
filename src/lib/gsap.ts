/**
 * Central GSAP setup — the single place the plugin is registered and tuned.
 * Importing `gsap` / `ScrollTrigger` from here guarantees registration happened
 * exactly once and that global defaults match our motion tokens.
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { duration, ease, prefersReducedMotion } from '@/lib/motion'

if (typeof window !== 'undefined') {
  // registerPlugin de-dupes internally, so this is safe across HMR reloads.
  gsap.registerPlugin(ScrollTrigger)

  // Global defaults so every tween inherits our cinematic feel. force3D is left at
  // GSAP's "auto" (it GPU-promotes transform tweens automatically) — setting it
  // globally to true also pushed it onto plain-object tweens (e.g. the scroll frame
  // counter), which GSAP rejects with an "Invalid property force3D" warning.
  gsap.defaults({ ease: ease.expoOut, duration: duration.large })

  // Batch invalidation: ScrollTrigger recalculates once per resize burst, and we
  // re-measure after web-fonts settle so pinned/triggered positions stay exact.
  ScrollTrigger.config({ ignoreMobileResize: true })
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh())
  }
  window.addEventListener('load', () => ScrollTrigger.refresh())
}

/** True when motion is allowed AND the pointer is fine (mouse) — for hover FX. */
export function pointerFX(): boolean {
  if (typeof window === 'undefined') return false
  if (prefersReducedMotion()) return false
  return window.matchMedia('(pointer: fine)').matches
}

export { gsap, ScrollTrigger }
