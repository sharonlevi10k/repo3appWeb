import { useLayoutEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

/**
 * Hairline gradient progress bar pinned to the top — a quiet cinematic HUD that
 * tracks how far through the journey you are. Scrubbed to document scroll, so it
 * rides the Lenis-eased position like everything else.
 */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = bar.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
          },
        },
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]">
      <div
        ref={bar}
        className="h-full origin-left scale-x-0 bg-[linear-gradient(90deg,#2dd4ff,#8b5cf6,#e0119d)]"
      />
    </div>
  )
}
