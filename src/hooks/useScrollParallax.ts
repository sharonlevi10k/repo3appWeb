import { useLayoutEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

/**
 * Scroll-scrubbed vertical parallax via GSAP ScrollTrigger. `scrub: 1` adds a
 * ~1s catch-up so the layer glides instead of snapping to the scroll position —
 * the signature "weighty depth" feel. One shared listener, GPU transform only.
 * Skipped on touch (coarse pointer) and reduced-motion to save cost.
 */
export function useScrollParallax<T extends HTMLElement = HTMLDivElement>(range = 40) {
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: 0, y: -range },
        {
          y: range,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [range])

  return ref
}
