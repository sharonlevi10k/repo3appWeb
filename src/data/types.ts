export type Accent = 'emerald' | 'cyan' | 'blue' | 'violet' | 'magenta' | 'pink'

export interface NavLink {
  label: string
  href: string
}

export interface Service {
  key: string
  metric: string
  title: string
  description: string
  icon: IconName
}

export interface Stat {
  value: string
  label: string
}

export interface ProjectMetric {
  value: string
  label: string
}

export interface ProjectFeature {
  title: string
  description: string
}

export interface ProjectResult {
  value: string
  label: string
  description?: string
}

export interface ProjectVideo {
  id: string
  label: string
}

export interface Project {
  id: string
  name: string
  category: string
  tagline: string
  description: string
  accent: Accent
  featured?: boolean
  tags: string[]
  metrics: ProjectMetric[]
  tech: string[]
  image: string
  logo?: string
  /** Fallback wordmark when there is no logo image (e.g. BGU Burns). */
  logoText?: string
  link?: string
  /** Rich detail (shown in the inline case study) */
  about?: string[]
  offers?: string[]
  gallery?: string[]
  features?: ProjectFeature[]
  results?: ProjectResult[]
  video?: ProjectVideo
}

export interface ProcessStep {
  num: string
  accent: Accent
  title: string
  description: string
}

export interface Faq {
  question: string
  answer: string
}

export type IconName =
  | 'bolt'
  | 'heart'
  | 'tag'
  | 'headset'
  | 'discovery'
  | 'design'
  | 'code'
  | 'rocket'
