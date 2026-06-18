import { services } from '@/data/services'
import { capabilities } from '@/data/site'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Icon } from '@/components/ui/Icon'

export function Services() {
  return (
    <section id="services" className="relative pt-8 pb-12 md:py-24">
      <div className="section">
        <SectionHeading
          num="01"
          eyebrow="What We Do"
          title="Digital solutions that drive businesses forward"
          subtitle="From first concept to live product — a focused team, a modern stack, and a process built around outcomes."
        />

        <Reveal childrenSelector="[data-card]" className="mt-8 grid gap-5 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
          {services.map((s) => (
            <article
              key={s.key}
              data-card
              className="group glass relative overflow-hidden rounded-3xl p-6 transition-all duration-medium ease-expo-out hover:-translate-y-1 hover:bg-white/[0.06]"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 text-accent-cyan ring-1 ring-white/10">
                <Icon name={s.icon} />
              </div>
              <p className="font-display text-2xl font-semibold text-white">{s.metric}</p>
              <h3 className="mt-1 text-sm font-medium text-white/75">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{s.description}</p>
              <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-accent-violet/10 blur-2xl transition-opacity duration-medium group-hover:opacity-100 opacity-0" />
            </article>
          ))}
        </Reveal>

        {/* Capabilities marquee */}
        <div className="glass mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl px-6 py-4">
          <span className="font-mono text-[11px] uppercase tracking-eyebrow text-white/40">Capabilities</span>
          {capabilities.map((c) => (
            <span key={c} className="flex items-center gap-2 text-sm text-white/70">
              <span className="h-1 w-1 rounded-full bg-accent-cyan" />
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
