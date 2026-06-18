import type { ReactNode } from 'react'
import { useReveal } from '@/hooks/useReveal'

interface RevealProps {
  children: ReactNode
  /** Selector for staggered children; omit to reveal the wrapper as one unit. */
  childrenSelector?: string
  y?: number
  stagger?: number
  className?: string
  as?: 'div' | 'section'
}

/** Wrapper that fades + rises its content on scroll into view. */
export function Reveal({ children, childrenSelector, y, stagger, className }: RevealProps) {
  const ref = useReveal<HTMLDivElement>({ childrenSelector, y, stagger })
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
