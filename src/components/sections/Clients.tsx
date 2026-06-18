import { clients } from '@/data/content'
import { cn } from '@/lib/cn'
import { accentSolid } from '@/lib/accent'

export function Clients() {
  return (
    <section className="relative border-y border-white/5 py-12">
      <div className="section">
        <h3 className="text-center font-mono text-xs uppercase tracking-eyebrow text-white/40">
          Among Our Clients
        </h3>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {clients.map((c) => (
            <div
              key={c.name}
              className="glass-strong flex items-center gap-3 rounded-2xl p-4 transition-all duration-medium ease-expo-out hover:-translate-y-1 hover:bg-white/[0.07]"
            >
              <span
                className={cn(
                  'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold shadow-lift',
                  accentSolid[c.accent],
                )}
              >
                {c.abbr}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{c.name}</p>
                <p className="truncate text-xs text-white/55">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
