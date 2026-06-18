import { cn } from '@/lib/cn'

interface EyebrowProps {
  num?: string
  children: string
  className?: string
}

/** Numbered section label — "01 — SERVICES" in tracked-out mono. */
export function Eyebrow({ num, children, className }: EyebrowProps) {
  return (
    <p className={cn('eyebrow flex items-center gap-3', className)}>
      {num && <span className="text-accent-cyan">{num}</span>}
      <span className="h-px w-6 bg-white/20" aria-hidden />
      {children}
    </p>
  )
}
