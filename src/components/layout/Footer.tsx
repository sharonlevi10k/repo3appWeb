import { company, navLinks, capabilities } from '@/data/site'
import { cn } from '@/lib/cn'
import { Icon, type IconKey } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import { LogoMark } from '@/components/visuals/Logo3D'
import { FooterColumn } from '@/components/ui/footer-column'

const contact: { icon: IconKey; text: string; href?: string; accent: string }[] = [
  { icon: 'mail', text: company.email, href: company.emailHref, accent: 'text-accent-cyan' },
  { icon: 'phone', text: company.phone, href: company.phoneHref, accent: 'text-accent-violet' },
  { icon: 'pin', text: company.location, accent: 'text-accent-magenta' },
]

/**
 * Premium glass + glow footer (mvpblocks-style layout) populated with the real
 * SeaApp content and restyled onto the design system. Frosted panel floating on
 * soft accent glows, four columns, real contact info, copyright.
 */
export function Footer() {
  return (
    <footer className="relative z-10 mt-16 w-full overflow-hidden px-4 pb-10">
      {/* soft accent glows behind the panel */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-accent-cyan/12 blur-[120px]" />
        <div className="absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-accent-violet/12 blur-[130px]" />
      </div>

      <div className="glass-strong relative mx-auto max-w-[1280px] rounded-4xl px-6 py-12 shadow-glass sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand + contact */}
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <LogoMark className="h-9 w-9 shrink-0" />
              <span className="font-display text-xl font-semibold text-white">{company.name}</span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">{company.description}</p>

            {/* availability indicator */}
            <p className="mt-5 inline-flex items-center gap-2 text-xs text-white/60">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-accent-cyan" />
              </span>
              <span className="font-mono uppercase tracking-wide">24/7 Support · Available now</span>
            </p>

            <ul className="mt-6 flex flex-col gap-3 text-sm">
              {contact.map((c) => {
                const inner = (
                  <>
                    <Icon name={c.icon} size={16} className={cn('shrink-0', c.accent)} />
                    {c.text}
                  </>
                )
                return (
                  <li key={c.text}>
                    {c.href ? (
                      <a href={c.href} className="flex items-center gap-2.5 text-white/70 transition-colors duration-base hover:text-white">
                        {inner}
                      </a>
                    ) : (
                      <span className="flex items-center gap-2.5 text-white/70">{inner}</span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          <FooterColumn title="Navigate" links={navLinks.map((l) => ({ text: l.label, href: l.href }))} />
          <FooterColumn title="Services" links={capabilities.map((c) => ({ text: c, href: '#services' }))} />

          {/* CTA */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-eyebrow text-white/45">Ready to start?</h4>
            <p className="mt-5 text-sm leading-relaxed text-white/55">
              Let's talk about your next project and how we can help.
            </p>
            <Button href="#contact" variant="secondary" size="md" icon="arrow" className="mt-5">
              Let's Talk
            </Button>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row">
          <p>
            © {company.year} {company.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href={company.emailHref} className="transition-colors duration-base hover:text-white/80">Contact</a>
            <span className="text-white/20">|</span>
            <a href="#home" className="transition-colors duration-base hover:text-white/80">Back to top</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
