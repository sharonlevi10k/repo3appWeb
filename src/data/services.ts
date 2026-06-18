import type { Service } from './types'

export const services: Service[] = [
  {
    key: 'fast',
    metric: 'Fast',
    title: 'Development Process',
    description: 'Quick and efficient development with advanced workflows that ship in weeks, not months.',
    icon: 'bolt',
  },
  {
    key: 'satisfaction',
    metric: '100%',
    title: 'Client Satisfaction',
    description: "Every client we've worked with recommends our service — and comes back for more.",
    icon: 'heart',
  },
  {
    key: 'pricing',
    metric: 'Fair',
    title: 'Transparent Pricing',
    description: 'Clear and honest pricing for every project type. No surprises, no hidden costs.',
    icon: 'tag',
  },
  {
    key: 'support',
    metric: '24/7',
    title: 'Support & Maintenance',
    description: 'Always available for any questions or issues, long after launch day.',
    icon: 'headset',
  },
]
