import { useState, type FormEvent } from 'react'
import { company } from '@/data/site'
import { projectTypes, budgetRanges } from '@/data/contact'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import type { IconKey } from '@/components/ui/Icon'

const fieldBase =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-[15px] text-white ' +
  'placeholder:text-white/45 transition-colors duration-base focus:border-accent-cyan/50 ' +
  'focus:outline-none focus:ring-2 focus:ring-accent-cyan/20'

const contactItems: { icon: IconKey; label: string; value: string; href?: string; accent: string }[] = [
  { icon: 'phone', label: 'Phone', value: company.phone, href: company.phoneHref, accent: 'text-accent-cyan' },
  { icon: 'mail', label: 'Email', value: company.email, href: company.emailHref, accent: 'text-accent-violet' },
  { icon: 'pin', label: 'Location', value: company.location, accent: 'text-accent-magenta' },
]

export function Contact() {
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Native HTML5 validation gates required fields. Wire this to your API/email service.
    setSent(true)
  }

  return (
    <section id="contact" className="relative overflow-hidden py-16 md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 h-[28rem] w-[28rem] rounded-full bg-accent-cyan/10 blur-[130px]" />
      </div>

      <div className="section grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Left — intro + contact details */}
        <div className="flex flex-col gap-7">
          <Eyebrow num="05">Get In Touch</Eyebrow>
          <h2 className="font-display text-display-md font-semibold text-balance text-white">
            Let's build something <span className="text-gradient">amazing together</span>
          </h2>
          <p className="max-w-md text-base leading-relaxed text-white/65">
            Fill out the form and we'll get back to you within 24 hours.
          </p>

          <div className="mt-2 flex flex-col gap-4">
            {contactItems.map((c) => {
              const inner = (
                <>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl glass">
                    <Icon name={c.icon} size={18} className={c.accent} />
                  </span>
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-wide text-white/40">{c.label}</span>
                    <span className="block text-sm font-medium text-white">{c.value}</span>
                  </span>
                </>
              )
              return c.href ? (
                <a key={c.label} href={c.href} className="flex items-center gap-3.5 transition-opacity hover:opacity-80">
                  {inner}
                </a>
              ) : (
                <div key={c.label} className="flex items-center gap-3.5">{inner}</div>
              )
            })}
          </div>
        </div>

        {/* Right — form */}
        <div className="glass-strong rounded-[28px] p-6 shadow-glass md:p-8">
          {sent ? (
            <div
              role="status"
              aria-live="polite"
              className="flex h-full min-h-[420px] flex-col items-center justify-center gap-4 text-center"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent-cyan to-accent-violet text-ink">
                <Icon name="check" size={28} />
              </span>
              <h3 className="font-display text-2xl font-semibold text-white">Message sent</h3>
              <p className="max-w-xs text-sm text-white/70">
                Thanks — we received your details and will be in touch within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-2 text-sm font-medium text-accent-cyan underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" required>
                  <input className={cn52(fieldBase)} name="name" placeholder="Your name" required />
                </Field>
                <Field label="Email" required>
                  <input className={cn52(fieldBase)} type="email" name="email" placeholder="you@company.com" required />
                </Field>
                <Field label="Phone">
                  <input className={cn52(fieldBase)} name="phone" placeholder="+972 …" />
                </Field>
                <Field label="Company">
                  <input className={cn52(fieldBase)} name="company" placeholder="Company name" />
                </Field>
                <Field label="Project Type" required>
                  <select className={cn52(fieldBase)} name="projectType" required defaultValue="">
                    <option value="" disabled>Select type</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t} className="bg-ink-700">{t}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Estimated Budget">
                  <select className={cn52(fieldBase)} name="budget" defaultValue="">
                    <option value="" disabled>Select a range</option>
                    {budgetRanges.map((b) => (
                      <option key={b} value={b} className="bg-ink-700">{b}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Project Details" required>
                <textarea
                  className={fieldBase + ' min-h-[120px] resize-y py-3'}
                  name="details"
                  rows={4}
                  placeholder="Tell us about your project, goals, and timeline…"
                  required
                />
              </Field>

              <Button type="submit" size="lg" icon="arrow" fullWidth>
                Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

/** Inputs/selects share a fixed 52px touch-target height. */
function cn52(base: string) {
  return base + ' h-[52px]'
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm text-white/65">
        {label} {required && <span className="text-accent-pink">*</span>}
      </span>
      {children}
    </label>
  )
}
