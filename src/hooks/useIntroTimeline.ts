import { useLayoutEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { duration, ease, prefersReducedMotion } from '@/lib/motion'

/**
 * Cinematic on-mount entrance for the hero, built as a single GSAP timeline so
 * the copy rises in a tight overlapping cascade and the orb scene blooms in just
 * behind it. The hidden state is set inside the timeline (immediateRender), so
 * with JS off / reduced-motion everything renders fully visible.
 */
export function useIntroTimeline<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const copy = gsap.utils.toArray<HTMLElement>('[data-intro]')
      const orb = gsap.utils.toArray<HTMLElement>('[data-orb]')

      const tl = gsap.timeline({
        defaults: { ease: ease.expoOut, duration: duration.large },
        delay: 0.1,
      })

      tl.from(copy, {
        opacity: 0,
        y: 34,
        filter: 'blur(10px)',
        stagger: 0.09,
        clearProps: 'filter',
      })

      if (orb.length) {
        tl.from(
          orb,
          {
            opacity: 0,
            scale: 0.86,
            filter: 'blur(14px)',
            duration: duration.cinematic,
            ease: ease.expoOut,
            clearProps: 'filter',
          },
          '-=0.7', // bloom overlaps the tail of the copy cascade
        )
      }
    }, el)

    return () => ctx.revert()
  }, [])

  return ref
}
