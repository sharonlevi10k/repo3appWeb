import { useState } from 'react'
import { testimonials } from '@/data/testimonials'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { TestimonialCard, type CardPosition } from '@/components/ui/testimonial-cards'

const INITIAL: CardPosition[] = ['front', 'middle', 'back']
const cards = testimonials.slice(0, 3)

export function Testimonials() {
  const [positions, setPositions] = useState<CardPosition[]>(INITIAL)

  const shuffle = () =>
    setPositions((prev) => {
      const next = [...prev]
      next.unshift(next.pop()!)
      return next
    })

  return (
    <section id="testimonials" className="relative overflow-x-clip py-16 md:py-24">
      <div className="section grid items-center gap-16 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Testimonials"
            title={
              <>
                What our clients <span className="text-gradient">say</span>
              </>
            }
            subtitle="Drag the top card aside — or step through — to hear from the teams we've built with."
          />
          <div>
            <Button variant="secondary" size="md" icon="arrow" onClick={shuffle}>
              Next story
            </Button>
          </div>
        </div>

        {/* card stack — on mobile it's a centered symmetric mini-stack (front
            centered, others peek left/right); on sm+ it fans out to the right
            with room to breathe. Width matches each layout so it stays centered. */}
        <div className="relative mx-auto h-[430px] w-[300px] sm:h-[470px] sm:w-[540px]">
          {cards.map((t, i) => (
            <TestimonialCard
              key={t.id}
              handleShuffle={shuffle}
              position={positions[i]}
              quote={t.quote}
              author={t.author}
              role={t.role}
              initials={t.initials}
              accent={t.accent}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
