import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { stagger as defaultStagger, distance, duration, ease, prefersReducedMotion } from '@/lib/motion'

interface RevealOptions {
  /** Selector for staggered children; if omitted, the container itself reveals. */
  childrenSelector?: string
  y?: number
  stagger?: number
  /** Reveal only once (default true). */
  once?: boolean
}

/**
 * Scroll-triggered entrance reveal (rise + fade + de-blur + micro-scale) powered
 * by GSAP + ScrollTrigger. Built around an explicit `set` → `onEnter`/`to`
 * sequence (not `gsap.from`) so the play is deterministic, plus a hard failsafe:
 * anything still hidden while inside the viewport is force-revealed. That makes
 * it impossible for content to get stuck invisible if a trigger mis-measures.
 * Hidden state is JS-only, so no-JS / reduced-motion users see full content.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options: RevealOptions = {}) {
  const ref = useRef<T>(null)
  const { childrenSelector, y = distance.md, stagger = defaultStagger, once = true } = options

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const targets = childrenSelector ? gsap.utils.toArray<HTMLElement>(childrenSelector) : [el]
      if (targets.length === 0) return

      gsap.set(targets, { opacity: 0, y, filter: 'blur(8px)', scale: 0.985 })

      const reveal = () =>
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          scale: 1,
          duration: duration.large,
          ease: ease.expoOut,
          stagger,
          overwrite: 'auto',
          clearProps: 'filter,scale,transform',
        })

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 86%',
        once,
        onEnter: reveal,
      })

      // Recompute positions once layout settles (fonts, images, late mounts).
      requestAnimationFrame(() => ScrollTrigger.refresh())

      // Hard failsafe: if anything is still hidden but already within the
      // viewport a beat later, reveal it regardless of trigger state.
      const failsafe = window.setTimeout(() => {
        const r = el.getBoundingClientRect()
        const inView = r.top < window.innerHeight && r.bottom > 0
        const stuck = targets.some((t) => Number(getComputedStyle(t).opacity) < 0.05)
        if (inView && stuck) reveal()
      }, 1000)

      return () => {
        window.clearTimeout(failsafe)
        st.kill()
      }
    }, el)

    return () => ctx.revert()
  }, [childrenSelector, y, stagger, once])

  return ref
}
