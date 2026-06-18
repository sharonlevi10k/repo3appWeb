import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

/**
 * Cinematic "camera" entrance for a whole section. As the section enters from the
 * bottom it pushes in — scale 0.94→1, y 50→0, fade + de-blur — scrubbed to scroll
 * so it feels like the camera dollies onto each act rather than the page jumping
 * between blocks. Entrance-only (no leave-dim) so finale sections stay full.
 *
 * Applied on a non-invasive wrapper (see CameraSection); the section's own inner
 * reveals still run on top. GPU transform/opacity only, one scrub trigger.
 *
 * Disabled under reduced-motion AND on mobile/touch (≤767px): scrubbed scale on
 * every section janks on touch scrolling and can leave a section stuck half-faded
 * if the scrub never completes. On phones the content simply stays fully visible
 * and the page scrolls natively/smoothly. gsap.matchMedia re-runs across resizes.
 */
export function useCameraSection<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) return

    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      gsap.fromTo(
        el,
        { scale: 0.94, y: 50, autoAlpha: 0.5 },
        {
          scale: 1,
          y: 0,
          autoAlpha: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            end: 'top 48%',
            scrub: 0.6,
          },
        },
      )
      requestAnimationFrame(() => ScrollTrigger.refresh())
    })

    return () => mm.revert()
  }, [])

  return ref
}
