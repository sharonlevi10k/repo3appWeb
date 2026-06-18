import { useEffect, useRef } from 'react'
import { gsap, pointerFX } from '@/lib/gsap'

/**
 * Magnetic hover — the element (and optionally its label) is pulled toward the
 * cursor while hovered, then springs back on leave. quickTo keeps it to two
 * eased transform writes per frame. Mouse-only (skipped on touch / reduced
 * motion) so taps stay crisp.
 *
 * @param strength px of pull at the element's edge (how "sticky" it feels)
 */
export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(strength = 18) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!pointerFX()) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const relX = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
      const relY = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
      xTo(relX * strength)
      yTo(relY * strength)
    }

    const onLeave = () => {
      xTo(0)
      yTo(0)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      gsap.killTweensOf(el)
      gsap.set(el, { clearProps: 'transform' })
    }
  }, [strength])

  return ref
}
