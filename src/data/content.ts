import type { Accent, Faq, IconName } from './types'

/** "Among Our Clients" */
export interface Client {
  abbr: string
  name: string
  desc: string
  accent: Accent
}

export const clients: Client[] = [
  { abbr: 'CB', name: 'COBMINDEX', desc: 'Medical Research App', accent: 'magenta' },
  { abbr: 'GB', name: 'GreenBrush', desc: 'Solar Energy Solutions', accent: 'cyan' },
  { abbr: 'ISMB', name: 'ISMB', desc: 'Safety Officers Association', accent: 'blue' },
  { abbr: 'PFA', name: 'PFABot', desc: 'Mental Health Support', accent: 'violet' },
  { abbr: 'BAI', name: 'Burns AI', desc: 'Medical Data Collection', accent: 'pink' },
]

/** "What Stops People From Turning Their Idea Into an App?" */
export interface Challenge {
  icon: IconName
  title: string
  description: string
}

export const challenges: Challenge[] = [
  {
    icon: 'design',
    title: 'Professional Knowledge',
    description: 'Lack of technical knowledge and app development can be complex, but we guide you every step of the way.',
  },
  {
    icon: 'rocket',
    title: 'Experience',
    description: "No experience in the tech field? We're here to make the complex simple.",
  },
  {
    icon: 'tag',
    title: 'Budget',
    description: 'No need for huge budgets — we offer flexible solutions tailored to any budget.',
  },
  {
    icon: 'bolt',
    title: 'Ideas',
    description: "Have an idea but don't know how to start? We'll help you turn it into reality.",
  },
]

/** FAQ */
export const faqs: Faq[] = [
  {
    question: 'How long does it take to develop an application?',
    answer:
      'Development time depends on project complexity. A standard project typically takes 2-4 months. We provide an accurate timeline after the discovery meeting and requirements analysis.',
  },
  {
    question: 'Do you provide support after launch?',
    answer:
      'Yes! We provide full post-launch support, including bug fixes, updates, and upgrades. We have several maintenance packages to choose from.',
  },
  {
    question: 'What is the process for developing an app with you?',
    answer:
      'The process includes: 1) Discovery meeting and needs analysis, 2) Quote and planning, 3) Specification and design, 4) Development and testing, 5) Launch, 6) Ongoing support.',
  },
  {
    question: 'How much does it cost to develop an application?',
    answer:
      "The price varies depending on project complexity, required features, and platforms (iOS, Android, Web). We'd be happy to provide a customized quote once we understand your needs.",
  },
  {
    question: 'Do you also develop mobile applications?',
    answer:
      'Yes! We develop mobile apps (iOS and Android), web applications, and advanced management systems. We use the most advanced technologies.',
  },
  {
    question: 'Can you help me with design as well?',
    answer:
      'Absolutely! We have professional UX/UI designers who will help you create an excellent user experience and impressive design that fits your brand.',
  },
]
