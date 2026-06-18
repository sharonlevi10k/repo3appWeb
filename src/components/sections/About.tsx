import { heroStats } from '@/data/site'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { Parallax } from '@/components/ui/Parallax'
import { Lattice } from '@/components/visuals/Lattice'
import { GlassChip } from '@/components/visuals/GlassChip'
import { useParallax } from '@/hooks/useParallax'

export function About() {
  const sceneRef = useParallax<HTMLDivElement>(10)

  return (
    <section id="about" className="relative overflow-hidden py-16 md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Parallax range={60} className="absolute inset-0">
          <div className="absolute right-10 top-10 h-[30rem] w-[30rem] rounded-full bg-accent-violet/15 blur-[130px]" />
        </Parallax>
      </div>

      <div className="section grid items-center gap-12 lg:grid-cols-2">
        {/* Copy */}
        <Reveal className="flex flex-col gap-6">
          <Eyebrow num="03">About SeaApp</Eyebrow>
          <h2 className="font-display text-display-md font-semibold text-balance text-white">
            The company that turns your ideas into reality
          </h2>
          <p className="max-w-lg text-base leading-relaxed text-white/60">
            Advanced application development and digital solutions company. We turn ideas into
            impressive digital reality. We don't just develop applications — we build digital
            solutions that drive businesses forward.
          </p>

          <dl className="mt-2 flex flex-wrap gap-10">
            {heroStats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-bold text-white">{s.value}</dd>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-white/45">{s.label}</p>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Distinct 3D scene */}
        <div className="relative mx-auto w-full max-w-[520px]">
          <div ref={sceneRef} className="gpu w-full">
            <Lattice />
          </div>
          <GlassChip
            label="Engineers"
            value="4+"
            dot="cyan"
            float
            className="absolute left-0 top-[20%] w-32"
          />
          <GlassChip
            label="Ongoing"
            value="5 projects"
            dot="magenta"
            float
            className="absolute bottom-[18%] right-0 w-36"
            style={{ animationDelay: '1.2s' }}
          />
        </div>
      </div>
    </section>
  )
}
