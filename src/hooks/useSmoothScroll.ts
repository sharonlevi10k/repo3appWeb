import { useLayoutEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

/**
 * Inertial smooth scrolling (Lenis) wired into the GSAP ticker and ScrollTrigger.
 * This is what turns the page from "scrolling" into a gliding cinematic ride —
 * every ScrollTrigger scrub (living background, camera push-ins, parallax) reads
 * Lenis's eased scroll position, so the whole experience moves as one.
 *
 * Skipped entirely under prefers-reduced-motion (native scroll, instant anchors).
 * Mount once near the app root.
 */
export function useSmoothScroll() {
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return

    // On touch devices, skip Lenis and use native scrolling. Lenis' inertia
    // makes the page keep gliding after your finger lifts — on mobile that reads
    // as laggy / "waiting". Native scroll is direct and 1:1. We still intercept
    // in-page anchor links so nav/CTA jumps land below the fixed navbar.
    if (window.matchMedia('(pointer: coarse)').matches) {
      const onAnchor = (e: MouseEvent) => {
        const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null
        if (!a) return
        const id = a.getAttribute('href')!
        if (id.length < 2) return
        const target = document.querySelector(id)
        if (!target) return
        e.preventDefault()
        const y = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 72
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
      document.addEventListener('click', onAnchor)
      return () => document.removeEventListener('click', onAnchor)
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      smoothWheel: true,
      touchMultiplier: 1.6,
    })

    // Drive Lenis from GSAP's ticker and keep ScrollTrigger in sync.
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Smooth same-page anchor jumps (nav links / CTAs) through Lenis too.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!a) return
      const id = a.getAttribute('href')!
      if (id.length < 2) return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target as HTMLElement, { offset: -72 })
    }
    document.addEventListener('click', onClick)

    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])
}
