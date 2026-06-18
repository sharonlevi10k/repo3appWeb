import type { ReactNode } from 'react'
import { useScrollParallax } from '@/hooks/useScrollParallax'

interface ParallaxProps {
  children: ReactNode
  /** Travel distance in px across the scroll span (depth amount). */
  range?: number
  className?: string
}

/** Wraps content in a scroll-scrubbed vertical parallax layer. */
export function Parallax({ children, range = 40, className }: ParallaxProps) {
  const ref = useScrollParallax<HTMLDivElement>(range)
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
