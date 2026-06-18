import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Eyebrow } from './Eyebrow'
import { useReveal } from '@/hooks/useReveal'

interface SectionHeadingProps {
  num?: string
  eyebrow: string
  title: ReactNode
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  num,
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className,
}: SectionHeadingProps) {
  const ref = useReveal<HTMLDivElement>({ y: 20 })
  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-5',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <Eyebrow num={num}>{eyebrow}</Eyebrow>
      <h2 className="max-w-3xl font-display text-display-md font-semibold text-balance text-white">
        {title}
      </h2>
      {subtitle && (
        <p className={cn('max-w-xl text-base leading-relaxed text-white/55', align === 'center' && 'mx-auto')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
