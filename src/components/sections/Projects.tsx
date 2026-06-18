import { useState } from 'react'
import { projects } from '@/data/projects'
import { cn } from '@/lib/cn'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProjectDetail } from './ProjectDetail'

export function Projects() {
  const [activeId, setActiveId] = useState(projects[0].id)
  const active = projects.find((p) => p.id === activeId) ?? projects[0]

  return (
    <section id="projects" className="relative py-16 md:py-24">
      <div className="section">
        <SectionHeading
          num="02"
          eyebrow="Our Portfolio"
          title="Our Projects"
          subtitle="Selected projects we developed for our clients — from idea to real results."
        />

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap gap-2.5">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveId(p.id)}
              className={cn(
                'rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-base ease-expo-out',
                p.id === activeId
                  ? 'bg-white text-ink shadow-lift'
                  : 'glass text-white/70 hover:text-white hover:-translate-y-0.5',
              )}
            >
              {p.name}
              <span className="hidden text-white/40 sm:inline"> — {p.category}</span>
            </button>
          ))}
        </div>

        {/* Inline detail — re-mounts on tab change so reveals/animations refresh */}
        <div className="mt-8">
          <ProjectDetail key={active.id} project={active} />
        </div>
      </div>
    </section>
  )
}
