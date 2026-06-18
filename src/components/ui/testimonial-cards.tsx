import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { accentGradient, accentText } from '@/lib/accent'
import type { Accent } from '@/data/types'

export type CardPosition = 'front' | 'middle' | 'back'

interface TestimonialCardProps {
  /** Advance the stack (called when the front card is flicked left). */
  handleShuffle: () => void
  position: CardPosition
  quote: string
  author: string
  role: string
  initials: string
  accent: Accent
}

/**
 * Draggable stacked testimonial card (adapted from a 21st.dev pattern).
 * Flick the front card left to shuffle. Restyled onto the SeaApp design system —
 * glass surface, accent monogram, display/mono type — instead of the generic
 * slate/indigo original.
 */
export function TestimonialCard({
  handleShuffle,
  position,
  quote,
  author,
  role,
  initials,
  accent,
}: TestimonialCardProps) {
  const isFront = position === 'front'

  // On mobile the column is too narrow for the right-fan, so the stack becomes a
  // CENTERED symmetric one — front card centered, others peek left/right behind it.
  const [compact, setCompact] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const update = () => setCompact(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const rotate = compact
    ? position === 'front'
      ? '-2deg'
      : position === 'middle'
        ? '-7deg'
        : '7deg'
    : position === 'front'
      ? '-6deg'
      : position === 'middle'
        ? '0deg'
        : '6deg'

  const x = compact
    ? position === 'front'
      ? '0%'
      : position === 'middle'
        ? '-8%'
        : '8%'
    : position === 'front'
      ? '0%'
      : position === 'middle'
        ? '33%'
        : '66%'

  return (
    <motion.div
      style={{ zIndex: position === 'front' ? 2 : position === 'middle' ? 1 : 0 }}
      animate={{ rotate, x }}
      drag={isFront}
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragEnd={(_event, info) => {
        if (info.offset.x < -150) handleShuffle()
      }}
      transition={{ duration: 0.35 }}
      className={cn(
        // near-opaque dark frosted surface so stacked cards don't bleed text through each other
        'absolute left-0 top-0 grid h-[400px] w-[300px] select-none place-content-center gap-6 rounded-4xl border border-white/10 bg-ink-800/95 p-7 shadow-glass backdrop-blur-2xl sm:h-[450px] sm:w-[330px] sm:p-8',
        isFront ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none',
      )}
    >
      <div
        className={cn(
          'mx-auto grid h-20 w-20 place-content-center rounded-full bg-gradient-to-br font-display text-xl font-bold text-white ring-1 ring-white/15',
          accentGradient[accent],
        )}
        aria-hidden
      >
        {initials}
      </div>

      <p className="text-balance text-center text-lg italic leading-relaxed text-white/75">
        &ldquo;{quote}&rdquo;
      </p>

      <div className="text-center">
        <p className="font-display text-base font-semibold text-white">{author}</p>
        <p className={cn('mt-1 font-mono text-[11px] uppercase tracking-wide', accentText[accent])}>
          {role}
        </p>
      </div>
    </motion.div>
  )
}
