import type { NavLink, Stat } from './types'

export const company = {
  name: 'SeaApp',
  logo: '/images/company/imagelogSeaApp.png',
  tagline: 'We turn ideas into impressive digital reality.',
  description:
    'Advanced application development and digital solutions company. We turn ideas into impressive digital reality.',
  phone: '972-547915533',
  phoneHref: 'tel:972547915533',
  email: 'ozs@3seaapps.com',
  emailHref: 'mailto:ozs@3seaapps.com',
  location: 'Israel',
  year: 2026,
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

export const heroStats: Stat[] = [
  { value: '50+', label: 'Happy Clients' },
  { value: '100%', label: 'Satisfaction' },
  { value: '24/7', label: 'Support' },
]

export const capabilities = [
  'Mobile Apps · iOS & Android',
  'Web Applications',
  'Management Systems / CMS',
  'UX/UI Design',
  'AI / Chatbots',
]
