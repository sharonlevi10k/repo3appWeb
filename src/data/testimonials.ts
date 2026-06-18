import type { Accent } from './types'

export interface Testimonial {
  id: number
  quote: string
  author: string
  role: string
  /** 2-letter monogram shown in the avatar. */
  initials: string
  accent: Accent
}

/**
 * Sample testimonials — replace with real, attributable client quotes before launch.
 * (Kept generic on purpose: we don't fabricate endorsements from named clients.)
 */
export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: 'SeaApp shipped our platform in weeks, not months — and the quality and communication were beyond anything we had worked with before.',
    author: 'Maya L.',
    role: 'Head of Product · Fintech',
    initials: 'ML',
    accent: 'cyan',
  },
  {
    id: 2,
    quote: 'They did not just build what we asked — they understood the business and improved it. The system has run flawlessly since launch.',
    author: 'Daniel R.',
    role: 'Operations Lead · Logistics',
    initials: 'DR',
    accent: 'violet',
  },
  {
    id: 3,
    quote: 'From the first call to a live product it felt like one focused team. We came back for our second and third projects.',
    author: 'Noa B.',
    role: 'Founder · HealthTech',
    initials: 'NB',
    accent: 'magenta',
  },
]
