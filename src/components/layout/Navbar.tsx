import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { company, navLinks } from '@/data/site'

/** Short context line per section — gives the mobile menu a "navigator" feel. */
const navDesc: Record<string, string> = {
  '#home': 'Back to the top',
  '#services': 'What we build',
  '#projects': 'Our recent work',
  '#about': 'Who we are',
  '#process': 'How we work',
  '#contact': "Let's talk",
}
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { LogoMark } from '@/components/visuals/Logo3D'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>('')
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy: highlight the nav link for the section currently in view.
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace(/^#/, ''))
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (!targets.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveId(visible.target.id)
      },
      // Bias the band toward the upper-middle so the active link flips as a
      // section reaches reading position, not when it first peeks in.
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.1, 0.5, 1] },
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])

  // lock body scroll when the mobile menu is open, close on Escape, and move
  // focus into the menu so keyboard/screen-reader users land on the first link.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) {
      firstLinkRef.current?.focus()
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false)
      }
      window.addEventListener('keydown', onKey)
      return () => {
        window.removeEventListener('keydown', onKey)
        document.body.style.overflow = ''
      }
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-medium ease-expo-out',
        scrolled ? 'py-3' : 'py-5',
      )}
    >
      <nav
        className={cn(
          // relative z-50 keeps the bar (logo + close button) above the mobile
          // menu overlay (z-40) so it stays visible and the X is clickable.
          'relative z-50 mx-auto flex max-w-[1440px] items-center justify-between rounded-full px-4 transition-all duration-medium md:px-6',
          scrolled ? 'glass-strong h-14 shadow-glass' : 'h-16 bg-transparent',
        )}
      >
        <a href="#home" className="flex items-center gap-2.5">
          <LogoMark className="h-10 w-10 shrink-0" />
          <span className="font-display text-lg font-semibold tracking-tight text-white">
            {company.name}
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => {
            const isActive = l.href === `#${activeId}`
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'rounded-full px-4 py-2 text-sm transition-colors duration-base hover:text-white',
                  isActive ? 'text-white' : 'text-white/70',
                )}
              >
                {l.label}
              </a>
            )
          })}
        </div>

        <div className="hidden md:block">
          <Button href="#contact" size="md" icon="arrow" magnetic>
            Let's Get Started
          </Button>
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-full text-white md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!open}
        className={cn(
          'fixed inset-0 top-0 z-40 overflow-hidden bg-ink/95 backdrop-blur-2xl transition-all duration-medium ease-expo-out md:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        {/* Ambient accent glows give the panel depth instead of a flat black fill. */}
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-accent-violet/25 blur-[100px]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-accent-cyan/20 blur-[100px]" />

        <div className="relative flex h-full flex-col px-5 pb-10 pt-28">
          <div className="mb-5 flex items-center gap-3 px-2">
            <span className="eyebrow">Navigation</span>
            <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
          </div>

          <nav className="flex flex-col gap-1.5">
            {navLinks.map((l, i) => {
              const isActive = l.href === `#${activeId}`
              return (
                <a
                  key={l.href}
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  aria-current={isActive ? 'page' : undefined}
                  // Staggered reveal — each row eases up as the menu opens.
                  style={{ transitionDelay: open ? `${120 + i * 55}ms` : '0ms' }}
                  className={cn(
                    'group relative flex items-center gap-4 overflow-hidden rounded-2xl px-4 py-3 transition-all duration-500 ease-expo-out',
                    open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
                    isActive ? 'bg-white/[0.06] ring-1 ring-white/10' : 'hover:bg-white/[0.04]',
                  )}
                >
                  {/* Accent indicator bar on the active row. */}
                  <span
                    className={cn(
                      'absolute left-0 top-1/2 h-8 w-[3px] -translate-y-1/2 rounded-r-full bg-gradient-to-b from-accent-cyan via-accent-violet to-accent-magenta transition-all duration-base',
                      isActive ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  <span className={cn('font-mono text-xs tabular-nums', isActive ? 'text-accent-cyan' : 'text-white/30')}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1">
                    <span
                      className={cn(
                        'block font-display text-[26px] font-semibold leading-tight transition-colors duration-base',
                        isActive ? 'text-gradient' : 'text-white/85 group-hover:text-white',
                      )}
                    >
                      {l.label}
                    </span>
                    <span className="mt-0.5 block text-[13px] text-white/40">{navDesc[l.href]}</span>
                  </span>
                  <span
                    className={cn(
                      'grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-base',
                      isActive
                        ? 'border-white/20 bg-white/10 text-white'
                        : 'border-white/10 text-white/40 group-hover:translate-x-0.5 group-hover:border-white/20 group-hover:text-white',
                    )}
                  >
                    <Icon name="arrow" size={16} />
                  </span>
                </a>
              )
            })}
          </nav>

          <div className="mt-auto pt-8">
            <Button href="#contact" fullWidth size="lg" icon="arrow" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
              Let's Get Started
            </Button>
            <div className="mt-6 flex items-center justify-center gap-5 text-white/55">
              <a href={company.phoneHref} tabIndex={open ? 0 : -1} className="flex items-center gap-2 text-sm transition-colors hover:text-white">
                <Icon name="phone" size={15} /> Call us
              </a>
              <span className="h-3.5 w-px bg-white/15" />
              <a href={company.emailHref} tabIndex={open ? 0 : -1} className="flex items-center gap-2 text-sm transition-colors hover:text-white">
                <Icon name="mail" size={15} /> Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
