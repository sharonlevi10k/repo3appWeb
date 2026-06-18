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
        <a href="#home" className="group flex items-center gap-2.5">
          {/* Logo framed in a glass badge with a soft accent glow — reads as a
              crafted brand mark rather than a bare icon. */}
          <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.06] ring-1 ring-white/15 transition-all duration-base group-hover:ring-white/30">
            <span
              aria-hidden
              className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent-cyan/25 to-accent-magenta/25 opacity-0 blur-md transition-opacity duration-base group-hover:opacity-100"
            />
            <LogoMark className="relative h-[26px] w-[26px]" />
          </span>
          <span className="font-display text-[19px] font-bold leading-none tracking-tight">
            <span className="text-white">Sea</span>
            <span className="text-gradient">App</span>
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
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-full text-white transition-opacity duration-base md:hidden',
            // Hidden while the drawer is open — the drawer has its own close button.
            open ? 'pointer-events-none opacity-0' : 'opacity-100',
          )}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <Icon name="menu" />
        </button>
      </nav>

      {/* Mobile menu — dimmed backdrop (tap to close) */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={cn(
          'fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm transition-opacity duration-medium ease-expo-out md:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      {/* Mobile menu — floating glass side drawer that slides in from the right */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!open}
        className={cn(
          'fixed inset-y-3 right-3 z-50 flex w-[84vw] max-w-[340px] flex-col overflow-hidden rounded-[28px] border border-white/12 bg-ink-800/80 shadow-glass backdrop-blur-2xl transition-transform duration-medium ease-expo-out md:hidden',
          open ? 'translate-x-0' : 'pointer-events-none translate-x-[calc(100%+0.75rem)]',
        )}
      >
        {/* Ambient accent glows give the panel depth instead of a flat fill.
            Kept at 50px blur — large radii white-box on iOS Safari. */}
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-accent-violet/30 blur-[50px]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-accent-cyan/25 blur-[50px]" />

        <div className="relative flex h-full flex-col px-5 pb-7 pt-6">
          {/* Drawer header: eyebrow + close */}
          <div className="mb-6 flex items-center justify-between">
            <span className="eyebrow">Navigation</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              tabIndex={open ? 0 : -1}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/5 text-white transition-colors hover:bg-white/10"
            >
              <Icon name="close" size={18} />
            </button>
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
                  // Staggered reveal — each row eases in as the drawer slides open.
                  style={{ transitionDelay: open ? `${140 + i * 55}ms` : '0ms' }}
                  className={cn(
                    'group relative flex items-center gap-3.5 overflow-hidden rounded-2xl px-3.5 py-2.5 transition-all duration-500 ease-expo-out',
                    open ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0',
                    isActive ? 'bg-white/[0.06] ring-1 ring-white/10' : 'hover:bg-white/[0.04]',
                  )}
                >
                  {/* Accent indicator bar on the active row. */}
                  <span
                    className={cn(
                      'absolute left-0 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-r-full bg-gradient-to-b from-accent-cyan via-accent-violet to-accent-magenta transition-all duration-base',
                      isActive ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  <span className={cn('font-mono text-[11px] tabular-nums', isActive ? 'text-accent-cyan' : 'text-white/30')}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1">
                    <span
                      className={cn(
                        'block font-display text-[22px] font-semibold leading-tight transition-colors duration-base',
                        isActive ? 'text-gradient' : 'text-white/85 group-hover:text-white',
                      )}
                    >
                      {l.label}
                    </span>
                    <span className="mt-0.5 block text-[12px] text-white/40">{navDesc[l.href]}</span>
                  </span>
                  <span
                    className={cn(
                      'grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-base',
                      isActive
                        ? 'border-white/20 bg-white/10 text-white'
                        : 'border-white/10 text-white/40 group-hover:translate-x-0.5 group-hover:border-white/20 group-hover:text-white',
                    )}
                  >
                    <Icon name="arrow" size={15} />
                  </span>
                </a>
              )
            })}
          </nav>

          <div className="mt-auto pt-6">
            <Button href="#contact" fullWidth size="lg" icon="arrow" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
              Let's Get Started
            </Button>
            <div className="mt-5 flex items-center justify-center gap-5 text-white/55">
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
