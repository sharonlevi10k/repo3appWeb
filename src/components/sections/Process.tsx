import { processSteps } from '@/data/process'
import type { Accent } from '@/data/types'
import { cn } from '@/lib/cn'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

const nodeStyle: Record<Accent, string> = {
  emerald: 'border-accent-emerald/60 text-accent-emerald',
  cyan: 'border-accent-cyan/60 text-accent-cyan',
  blue: 'border-accent-blue/60 text-accent-blue',
  violet: 'border-accent-violet/60 text-accent-violet',
  magenta: 'border-accent-magenta/60 text-accent-magenta',
  pink: 'border-accent-pink/60 text-accent-pink',
}

export function Process() {
  return (
    <section id="process" className="relative py-16 md:py-24">
      <div className="section">
        <SectionHeading
          num="04"
          eyebrow="Our Process"
          title="How It Works"
          subtitle="A simple, transparent journey — from idea to launch, and beyond."
          align="center"
          className="mx-auto"
        />

        <div className="relative mt-16">
          {/* connecting line — horizontal on desktop, vertical on mobile */}
          <div
            aria-hidden
            className="absolute left-7 top-6 bottom-6 w-px bg-gradient-to-b from-accent-cyan via-accent-violet to-accent-magenta lg:left-[12.5%] lg:right-[12.5%] lg:top-7 lg:bottom-auto lg:h-px lg:w-auto lg:bg-gradient-to-r"
          />

          <Reveal childrenSelector="[data-step]" className="grid gap-8 lg:grid-cols-4 lg:gap-6">
            {processSteps.map((step) => (
              <div key={step.num} data-step className="relative flex gap-5 lg:flex-col lg:gap-6">
                <div
                  className={cn(
                    'relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border bg-ink font-mono text-sm font-medium',
                    nodeStyle[step.accent],
                  )}
                >
                  {step.num}
                </div>
                <div className="glass flex-1 rounded-2xl p-5 lg:mt-0">
                  <h3 className="font-display text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{step.description}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4">
          <p className="text-sm text-white/50">Ready to start the journey?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full glass-strong px-6 py-3 text-sm font-medium text-white transition-all duration-base hover:-translate-y-0.5"
          >
            Let's Get Started
          </a>
        </div>
      </div>
    </section>
  )
}
