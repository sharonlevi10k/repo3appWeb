import { challenges } from '@/data/content'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

export function Challenges() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="section">
        <SectionHeading
          eyebrow="The Challenge"
          title="What stops people from turning their idea into an app?"
          subtitle="We specialize in developing custom digital solutions that deliver measurable business value."
          align="center"
          className="mx-auto"
        />

        <Reveal childrenSelector="[data-card]" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {challenges.map((c) => (
            <article key={c.title} data-card className="glass rounded-3xl p-6 text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 text-accent-cyan ring-1 ring-white/10">
                <Icon name={c.icon} />
              </div>
              <h3 className="font-display text-lg font-semibold text-white">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{c.description}</p>
            </article>
          ))}
        </Reveal>

        <div className="mt-12 flex justify-center">
          <Button href="#contact" size="lg" icon="arrow">
            Let's Start Together
          </Button>
        </div>
      </div>
    </section>
  )
}
