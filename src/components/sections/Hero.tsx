import { heroStats } from '@/data/site'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { GlassChip } from '@/components/visuals/GlassChip'
import { useParallax } from '@/hooks/useParallax'
import { useIntroTimeline } from '@/hooks/useIntroTimeline'

export function Hero() {
  const introRef = useIntroTimeline<HTMLElement>()
  const chipsFg = useParallax<HTMLDivElement>(18)

  return (
    <section ref={introRef} id="home" className="relative" style={{ minHeight: 'calc(100vh + 1600px)' }}>
      {/* Tall scroll zone: the content is pinned (sticky) while the logo
          assembles slowly in the page backdrop (LogoAssembly) behind it. */}
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="section grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* Copy */}
        <div className="flex flex-col gap-7">
          <p data-intro className="eyebrow flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-accent-cyan shadow-glow-cyan" />
            Leading Digital Innovation
          </p>

          <h1 data-intro className="font-display text-display-xl font-bold text-balance text-white">
            We Develop Applications That Connect Ideas to Real-World Results{' '}
            <span className="text-gradient">That Change The Game</span>
          </h1>

          <p data-intro className="max-w-lg text-lg leading-relaxed text-white/65">
            Advanced app development and digital solutions company, specializing in custom web and
            mobile system development for business clients.
          </p>

          <div data-intro className="flex flex-col gap-3 sm:flex-row">
            <Button href="#contact" size="lg" icon="arrow" magnetic>
              Get In Touch
            </Button>
            <Button href="#process" variant="secondary" size="lg" icon="arrowDown">
              See How It Works
            </Button>
          </div>

          <dl data-intro className="mt-2 flex items-center gap-8">
            {heroStats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-bold text-white">{s.value}</dd>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-white/45">{s.label}</p>
              </div>
            ))}
          </dl>
        </div>

        {/* Floating glass cluster over the cinematic logo backdrop */}
        <div data-orb className="relative hidden min-h-[440px] lg:block">
          <div ref={chipsFg} className="pointer-events-none absolute inset-0">
            <GlassChip
              label="Build · Deployed"
              value="99.9%"
              sub="Uptime across systems"
              dot="cyan"
              float
              className="pointer-events-auto absolute left-2 top-[14%] w-44"
            />
            <GlassChip
              label="Avg latency"
              value="42ms"
              dot="violet"
              float
              className="pointer-events-auto absolute bottom-[14%] right-2 w-32"
              style={{ animationDelay: '1.5s' }}
            />
            <GlassChip
              label="CI"
              value="248 passed"
              dot="magenta"
              float
              className="pointer-events-auto absolute right-6 top-[6%] w-36"
              style={{ animationDelay: '0.8s' }}
            />
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <a
        href="#services"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-eyebrow text-white/40 hover:text-white/70 md:flex"
      >
        Scroll
        <Icon name="arrowDown" size={14} className="animate-floaty-slow" />
      </a>
      </div>
    </section>
  )
}
