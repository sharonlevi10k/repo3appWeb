import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Project } from '@/data/types'
import { cn } from '@/lib/cn'
import { accentText, accentGradient, accentSolid } from '@/lib/accent'
import { Tag } from '@/components/ui/Tag'
import { Icon } from '@/components/ui/Icon'

/**
 * Full project case study rendered INLINE on the page (not in a modal), mirroring
 * the original site's tabbed layout: summary → about → gallery → video → features
 * → results → tech.
 */
export function ProjectDetail({ project }: { project: Project }) {
  const accent = project.accent
  const [lightbox, setLightbox] = useState<string | null>(null)

  // Close the screenshot lightbox on Escape (it's a modal dialog).
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])
  const mono = (project.logoText ?? project.name)
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  return (
    <div className="glass overflow-hidden rounded-[28px]">
      {/* Summary header — consistent transparent/glass treatment across all
          projects (calmer "for the eye"). Each keeps a faint accent glow for
          identity; every logo sits on a clean white chip so it always reads,
          even dark/light brand marks, on the dark glass. */}
      <div className="relative isolate overflow-hidden">
        {/* Soft accent tint + glow — subtle, lets the frosted glass show through. */}
        <div className={cn('absolute inset-0 -z-20 opacity-40 bg-gradient-to-br', accentGradient[accent])} />
        <div className="absolute inset-0 -z-10 [background:radial-gradient(120%_120%_at_18%_10%,rgba(255,255,255,0.06),transparent_55%)]" />
        {/* Faint repeating dot grid for texture. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.06] [background-image:radial-gradient(circle,rgba(255,255,255,0.9)_1.5px,transparent_1.5px)] [background-size:40px_40px]"
        />

        <div className="p-8 md:p-11">
          {/* Logo on a clean white chip so every brand mark reads on the glass.
              No-logo projects fall back to a branded monogram chip. */}
          {project.logo ? (
            <span className="mb-5 inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 shadow-modal ring-1 ring-black/5">
              {/* Explicit height (not just max-h) so SVG logos don't collapse to
                  0×0 inside the flex chip; width auto-scales by aspect ratio.
                  Greenbrush's source PNG carries heavy whitespace padding, so it
                  needs a taller height to read at the same visual size as the
                  wide wordmark logos. */}
              <img
                src={project.logo}
                alt={`${project.name} logo`}
                className={cn(
                  'w-auto object-contain',
                  project.id === 'greenbrush' ? 'h-16 max-w-[240px]' : 'h-9 max-w-[190px]',
                )}
              />
            </span>
          ) : (
            <span
              className={cn(
                'mb-5 flex h-16 w-16 items-center justify-center rounded-2xl font-display text-2xl font-bold shadow-modal',
                accentSolid[accent],
              )}
            >
              {mono}
            </span>
          )}

          <h3 className="font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-[2.5rem]">
            {project.logoText ?? project.name}
          </h3>
          <p className={cn('mt-2 text-lg font-semibold', accentText[accent])}>{project.category}</p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">{project.tagline}</p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {project.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {/* About */}
        {project.about && (
          <section>
            <h4 className="eyebrow mb-4">About {project.name}</h4>
            <div className="grid gap-3 md:grid-cols-3">
              {project.about.map((para, i) => (
                <p key={i} className="text-sm leading-relaxed text-white/55">
                  {para}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* What the product offers */}
        {project.offers && (
          <section className="mt-10">
            <h4 className="eyebrow mb-4">What The Product Offers</h4>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {project.offers.map((o) => (
                <li key={o} className="flex items-start gap-3 text-sm text-white/65">
                  <span className={cn('mt-0.5 shrink-0', accentText[accent])}>
                    <Icon name="check" size={16} />
                  </span>
                  {o}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Gallery — uniform tiles showing each screenshot in FULL (object-contain,
            no cropping) so every screen reads clearly. Larger tiles + a soft inner
            backing make the shots legible at a glance; click any for full size. */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="mt-10">
            <h4 className="eyebrow mb-4">App Screens</h4>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {project.gallery.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setLightbox(src)}
                  aria-label={`Open screenshot ${i + 1}`}
                  className="group relative grid aspect-[4/5] place-items-center overflow-hidden rounded-2xl bg-white p-2.5 shadow-lift ring-1 ring-black/5 transition-all duration-medium ease-expo-out hover:-translate-y-1 hover:shadow-glass"
                >
                  <img
                    src={src}
                    alt={`${project.name} screenshot ${i + 1}`}
                    loading="lazy"
                    className="max-h-full max-w-full rounded-lg object-contain"
                  />
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-base group-hover:bg-ink/40 group-hover:opacity-100">
                    <span className="glass-strong rounded-full px-4 py-2 text-xs font-medium text-white">View full size</span>
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Video */}
        {project.video && (
          <section className="mt-10">
            <h4 className="eyebrow mb-4">{project.video.label}</h4>
            <div className="aspect-video w-full max-w-3xl overflow-hidden rounded-xl border border-white/10">
              <iframe
                src={`https://www.youtube.com/embed/${project.video.id}`}
                title={project.video.label}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </section>
        )}

        {/* Features */}
        {project.features && (
          <section className="mt-10">
            <h4 className="eyebrow mb-4">Key Features</h4>
            <div className="grid gap-3 sm:grid-cols-2">
              {project.features.map((f) => (
                <div key={f.title} className="glass rounded-2xl p-4">
                  <div className="flex items-start gap-3">
                    <span className={cn('mt-0.5 shrink-0', accentText[accent])}>
                      <Icon name="check" size={18} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{f.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-white/55">{f.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Results */}
        {project.results && (
          <section className="mt-10">
            <h4 className="eyebrow mb-4">Business Results</h4>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {project.results.map((r) => (
                <div key={r.label} className="glass rounded-2xl p-4">
                  <p className={cn('font-display text-2xl font-bold', accentText[accent])}>{r.value}</p>
                  <p className="mt-1 text-xs font-medium text-white/80">{r.label}</p>
                  {r.description && <p className="mt-1.5 text-[11px] leading-relaxed text-white/45">{r.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tech + link */}
        <section className="mt-10">
          <h4 className="eyebrow mb-4">Technologies Used</h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </section>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn('mt-8 inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-medium transition-all hover:gap-3', accentText[accent])}
          >
            Visit Official Website
            <Icon name="external" size={15} />
          </a>
        )}
      </div>

      {/* Lightbox — portaled to <body> so the fixed backdrop centers on the
          viewport (the card's backdrop-filter would otherwise trap it). Click
          anywhere to close. Image is capped short for a compact dialog. */}
      {lightbox &&
        createPortal(
          <div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md sm:p-8"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
          >
            <img
              src={lightbox}
              alt={`${project.name} screenshot`}
              className="max-h-[72vh] max-w-[88vw] rounded-2xl object-contain shadow-modal sm:max-w-[420px]"
            />
            <button
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="glass absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/10"
            >
              <Icon name="close" size={20} />
            </button>
          </div>,
          document.body,
        )}
    </div>
  )
}
