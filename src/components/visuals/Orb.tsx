import { cn } from '@/lib/cn'

/**
 * Hero centerpiece — a real CSS orb. Sphere gradient + inner core glow + rim
 * light are layered into a SINGLE element's background (cheap, no extra
 * blend layers / DOM nodes). Not a placeholder box.
 *
 * SPLINE INTEGRATION POINT:
 * To swap in a live 3D scene later, render <Spline scene={url} /> inside the
 * `.orb-stage` and hide this CSS fallback. Keep this as the poster/fallback
 * (shown while the scene loads and on mobile < 768px).
 */
export function Orb({ className }: { className?: string }) {
  return (
    <div className={cn('orb-stage relative aspect-square w-full max-w-[560px]', className)}>
      {/* perspective rings */}
      <div className="absolute inset-0 animate-spinslow">
        <div className="absolute inset-[6%] rounded-full border border-white/[0.06]" />
        <div className="absolute inset-[18%] rounded-full border border-white/[0.05]" />
      </div>

      {/* sphere + core glow + rim light, all in one paint */}
      <div
        className="absolute inset-[14%] rounded-full"
        style={{
          background:
            'radial-gradient(60% 60% at 28% 22%, rgba(120,235,255,0.5), transparent 55%),' +
            'radial-gradient(42% 42% at 52% 44%, rgba(255,255,255,0.92), rgba(255,120,200,0.22) 46%, transparent 72%),' +
            'radial-gradient(120% 120% at 30% 25%, #6ae3ff 0%, #4f7bff 32%, #8b5cf6 56%, #e0119d 100%)',
          boxShadow:
            'inset -24px -28px 60px rgba(2,2,10,0.55), 0 30px 80px -20px rgba(139,92,246,0.55)',
        }}
      />

      {/* soft contact shadow */}
      <div
        className="absolute bottom-[8%] left-1/2 h-[8%] w-[55%] -translate-x-1/2 rounded-[50%] blur-xl"
        style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.5), transparent 70%)' }}
      />
    </div>
  )
}
