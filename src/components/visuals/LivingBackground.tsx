import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

/**
 * The continuous "alive" backdrop behind the whole cinematic journey — a single
 * fixed layer that spans the viewport while the page scrolls past it. Three hue
 * fields (cyan → violet → magenta) cross-fade as scroll progresses, so the
 * lighting migrates down the page with no hard seams between acts. Plus a masked
 * dot-grid, diagonal light streaks, and a faint grain.
 *
 * Performance: only opacity + transform are animated (GPU), driven by ONE
 * ScrollTrigger scrub over the document. Static under reduced-motion.
 */
export function LivingBackground() {
  const root = useRef<HTMLDivElement>(null)
  // On touch devices the cinematic video is the backdrop, so these big blurred
  // orbs are redundant — and iOS Safari renders their huge blur radii as solid
  // white boxes. Render just a flat dark base on mobile instead. (Lazy initial
  // state avoids a one-frame flash of the orbs before we switch.)
  const [isTouch] = useState(() => window.matchMedia('(pointer: coarse)').matches)

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    if (isTouch) return
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const cyan = el.querySelector('[data-hue="cyan"]')
      const violet = el.querySelector('[data-hue="violet"]')
      const magenta = el.querySelector('[data-hue="magenta"]')
      const fields = el.querySelector('[data-fields]')

      const scrollTrigger = {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }

      // Hue migration: cyan dominant at the top, violet through the middle,
      // magenta toward the finale — cross-faded across the full scroll.
      const tl = gsap.timeline({ scrollTrigger, defaults: { ease: 'none' } })
      tl.fromTo(cyan, { opacity: 0.55 }, { opacity: 0.12 }, 0)
        .fromTo(violet, { opacity: 0.18 }, { opacity: 0.5 }, 0)
        .to(violet, { opacity: 0.22 }, 0.65)
        .fromTo(magenta, { opacity: 0.04 }, { opacity: 0.5 }, 0.45)

      // Slow drift of the whole field for parallax depth (the slowest layer).
      gsap.fromTo(fields, { yPercent: -4 }, { yPercent: 6, ease: 'none', scrollTrigger })
    }, el)

    return () => ctx.revert()
  }, [isTouch])

  // Mobile: flat dark base only (the video supplies the ambient motion).
  if (isTouch) {
    return <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-ink" />
  }

  return (
    <div ref={root} aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      {/* hue fields — each a cluster of blurred glows */}
      <div data-fields className="absolute inset-0">
        <div data-hue="cyan" className="absolute inset-0">
          <div className="absolute -left-40 -top-32 h-[42rem] w-[42rem] rounded-full bg-accent-cyan blur-[150px]" />
          <div className="absolute right-0 top-24 h-[36rem] w-[36rem] rounded-full bg-accent-blue blur-[150px]" />
        </div>
        <div data-hue="violet" className="absolute inset-0 opacity-20">
          <div className="absolute left-1/4 top-1/3 h-[44rem] w-[44rem] rounded-full bg-accent-violet blur-[160px]" />
          <div className="absolute -right-24 top-1/2 h-[38rem] w-[38rem] rounded-full bg-accent-blue blur-[150px]" />
        </div>
        <div data-hue="magenta" className="absolute inset-0 opacity-0">
          <div className="absolute left-1/3 bottom-10 h-[40rem] w-[40rem] rounded-full bg-accent-magenta blur-[160px]" />
          <div className="absolute right-10 bottom-1/4 h-[34rem] w-[34rem] rounded-full bg-accent-pink blur-[150px]" />
        </div>
      </div>

      {/* diagonal light streaks */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(115deg, transparent 0 120px, rgba(255,255,255,0.6) 120px 121px, transparent 121px 280px)',
        }}
      />

      {/* masked dot-grid */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(120,200,255,0.6) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 80%)',
        }}
      />

      {/* fine grain */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* vignette for depth */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 100% 80% at 50% 30%, transparent 50%, rgba(3,4,8,0.75) 100%)' }}
      />
    </div>
  )
}
