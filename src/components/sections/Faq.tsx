import { useState } from 'react'
import { faqs } from '@/data/content'
import { cn } from '@/lib/cn'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative pt-8 pb-12 md:py-24">
      <div className="section max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions & Answers"
          subtitle="Everything you wanted to know about app development."
          align="center"
          className="mx-auto"
        />

        <div className="mt-8 flex flex-col gap-3 md:mt-12">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.question} className="glass overflow-hidden rounded-2xl">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="text-[15px] font-medium text-white">{f.question}</span>
                  <Icon
                    name="arrowDown"
                    size={18}
                    className={cn('shrink-0 text-white/50 transition-transform duration-base', isOpen && 'rotate-180')}
                  />
                </button>
                <div
                  className={cn(
                    'grid transition-all duration-medium ease-expo-out',
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-white/55">{f.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <p className="text-sm text-white/50">Didn't find an answer to your question?</p>
          <Button href="#contact" variant="secondary" size="md" icon="arrow">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  )
}
