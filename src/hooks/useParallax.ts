import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

/**
 * Pointer-driven parallax with eased follow. The cursor sets a target; GSAP
 * `quickTo` interpolates the element toward it every frame (power3.out), so the
 * layer drifts and settles instead of tracking the mouse 1:1 — the premium tell.
 * GPU transform only. Disabled under prefers-reduced-motion and on touch.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(strength = 12) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3.out' })

    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      xTo(nx * strength)
      yTo(ny * strength)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      gsap.killTweensOf(el)
      gsap.set(el, { clearProps: 'transform' })
    }
  }, [strength])

  return ref
}
