import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/motion'

/**
 * Cinematic backdrop — a prime Higgsfield clip (Cinema Studio 3.0, image-to-video):
 * the camera glides through a luminous "digital ocean" of cyan/violet/magenta light
 * currents that spiral inward and condense into a bright glowing energy core. Exploded
 * into stills and bound to scroll: scrolling the hero plays drifting currents → formed
 * core, so the reader "builds" the energy. The bloom holds bright for a beat, then the
 * backdrop dims to a living ambient layer as the hero exits.
 *
 * Frames painted to a <canvas> on the GSAP ticker (no <video> buffering). Fixed
 * behind content, above LivingBackground. Static (final bloom) under reduced-motion.
 */
const FRAME_COUNT = 181
const frameUrl = (i: number) => `/cinema/frames/f_${String(i).padStart(3, '0')}.jpg`

export function LogoAssembly() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [reduced, setReduced] = useState(false)

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return

    // Skip the 181-frame cinematic canvas on touch devices. Preloading that many
    // full-res JPGs blows iOS Safari's memory budget, which makes it render the
    // <canvas> as a solid white block (and stalls the page). The dark
    // LivingBackground stays behind, so mobile just gets a clean ambient backdrop.
    if (window.matchMedia('(pointer: coarse)').matches) return

    const ctx = canvas.getContext('2d')!
    const images: HTMLImageElement[] = []
    const state = { frame: 0 }
    let now = 0 // seconds, fed by the GSAP ticker — drives the idle float

    const render = () => {
      const idx = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(state.frame)))
      const img = images[idx]
      if (!img || !img.complete || !img.naturalWidth) return
      const cw = canvas.width
      const ch = canvas.height
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
      const w = img.naturalWidth * scale
      const h = img.naturalHeight * scale
      ctx.clearRect(0, 0, cw, ch)
      // Subtle continuous "float" so the persistent backdrop stays alive across
      // the whole page — tiny drift + sway + breathe around the canvas centre.
      const ox = Math.sin(now * 0.18) * cw * 0.006
      const oy = Math.cos(now * 0.14) * ch * 0.008
      const rot = Math.sin(now * 0.11) * 0.012
      const sc = 1 + Math.sin(now * 0.16) * 0.012
      ctx.save()
      ctx.translate(cw / 2 + ox, ch / 2 + oy)
      ctx.rotate(rot)
      ctx.scale(sc, sc)
      ctx.translate(-cw / 2, -ch / 2)
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h)
      ctx.restore()
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(canvas.clientWidth * dpr)
      canvas.height = Math.round(canvas.clientHeight * dpr)
      render()
    }

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      // Decode off the main thread so preloading 91 frames never blocks paint.
      img.decoding = 'async'
      img.src = frameUrl(i + 1)
      img.onload = () => {
        if (i === 0 || Math.round(state.frame) === i) render()
      }
      images.push(img)
    }

    resize()
    window.addEventListener('resize', resize)

    if (prefersReducedMotion()) {
      setReduced(true)
      state.frame = FRAME_COUNT - 1 // show the assembled logo
      const onR = () => { resize(); render() }
      window.addEventListener('resize', onR)
      return () => {
        window.removeEventListener('resize', resize)
        window.removeEventListener('resize', onR)
      }
    }

    const tick = (time: number) => {
      now = time
      render()
    }
    gsap.ticker.add(tick)
    const hero = document.getElementById('home')

    const gctx = gsap.context(() => {
      // Assemble across the first ~55% of the hero scroll; the finished logo then
      // holds bright before the backdrop fades on hero exit.
      // Pinned scroll budget = 1600px (the section is 100vh + 1600px, content
      // sticky). Assemble slowly over the first 1200px, hold, then fade 1350→1600
      // — all finishing exactly as the pin releases, so nothing bleeds past.
      gsap.to(state, {
        frame: FRAME_COUNT - 1,
        ease: 'none',
        scrollTrigger: { trigger: hero ?? wrap, start: 'top top', end: '+=1200', scrub: 0.6 },
      })
      // Don't disappear — settle to a dim ambient level and STAY as a living
      // backdrop behind the rest of the page, connecting every section.
      gsap.fromTo(
        wrap,
        { autoAlpha: 1 },
        {
          autoAlpha: 0.16,
          ease: 'none',
          scrollTrigger: { trigger: hero ?? wrap, start: 'top top-=1350', end: '+=250', scrub: true },
        },
      )
      // Gentle full-page parallax drift so the persistent logo feels alive.
      gsap.fromTo(
        canvas,
        { yPercent: -4 },
        {
          yPercent: 7,
          ease: 'none',
          scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 1 },
        },
      )
      requestAnimationFrame(() => ScrollTrigger.refresh())
    }, wrap)

    return () => {
      window.removeEventListener('resize', resize)
      gsap.ticker.remove(tick)
      gctx.revert()
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: -5, opacity: reduced ? 0.16 : undefined }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* legibility scrim over the hero copy side */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/25 to-ink/50" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 120% at 58% 45%, transparent 50%, rgba(6,7,10,0.6) 100%)' }} />
    </div>
  )
}
