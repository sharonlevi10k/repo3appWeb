import { cn } from '@/lib/cn'

interface TagProps {
  children: string
  className?: string
}

/** Small mono pill — used for project tags / chips. */
export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] ' +
          'px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-white/65',
        className,
      )}
    >
      {children}
    </span>
  )
}
