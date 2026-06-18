import { cn } from '@/lib/cn'

interface GlassChipProps {
  label: string
  value: string
  sub?: string
  dot?: 'cyan' | 'violet' | 'magenta'
  className?: string
  style?: React.CSSProperties
  float?: boolean
}

const dotColor = {
  cyan: 'bg-accent-cyan',
  violet: 'bg-accent-violet',
  magenta: 'bg-accent-magenta',
}

/** Floating frosted-glass metric chip — the hero/about depth fragments. */
export function GlassChip({ label, value, sub, dot = 'cyan', className, style, float }: GlassChipProps) {
  return (
    <div
      className={cn(
        'glass-strong rounded-2xl px-4 py-3 shadow-glass',
        float && 'animate-floaty',
        className,
      )}
      style={style}
    >
      <div className="flex items-center gap-2">
        <span className={cn('h-2 w-2 rounded-full', dotColor[dot])} />
        <span className="font-mono text-[10px] uppercase tracking-wide text-white/55">{label}</span>
      </div>
      <p className="mt-1 font-display text-xl font-semibold text-white">{value}</p>
      {sub && <p className="font-mono text-[10px] text-white/45">{sub}</p>}
    </div>
  )
}
