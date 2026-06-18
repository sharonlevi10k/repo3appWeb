import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { useMagnetic } from '@/hooks/useMagnetic'
import { Icon, type IconKey } from './Icon'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'md' | 'lg'

interface BaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: IconKey
  fullWidth?: boolean
  /** Cursor-attracting magnetic hover (mouse only). Great for primary CTAs. */
  magnetic?: boolean
  children: ReactNode
}

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium ' +
  'transition-all duration-base ease-expo-out focus-visible:outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-accent-cyan/70 focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-ink disabled:opacity-40 disabled:pointer-events-none'

const sizes: Record<ButtonSize, string> = {
  md: 'h-[52px] px-7 text-[15px]',
  lg: 'h-[56px] px-8 text-base',
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'text-ink font-semibold bg-[linear-gradient(120deg,#2dd4ff,#8b5cf6,#ff5c8a)] ' +
    'shadow-glow-violet hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98]',
  secondary:
    'glass text-white hover:bg-white/[0.07] hover:-translate-y-0.5 active:scale-[0.98]',
  ghost: 'text-white/80 hover:text-white hover:bg-white/5',
}

function content(children: ReactNode, icon?: IconKey) {
  return (
    <>
      <span>{children}</span>
      {icon && (
        <Icon
          name={icon}
          size={18}
          className="transition-transform duration-base ease-expo-out group-hover:translate-x-0.5"
        />
      )}
    </>
  )
}

type ButtonAsButton = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type ButtonAsLink = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = 'primary', size = 'md', icon, fullWidth, magnetic, children, className, ...rest } =
    props
  const classes = cn(base, sizes[size], variants[variant], fullWidth && 'w-full', className)

  // Magnetic pull lives on a wrapper so it never fights the button's own
  // hover translate/scale (both would target `transform`). Hook is a no-op
  // until its ref is attached, so non-magnetic buttons pay nothing.
  const magRef = useMagnetic<HTMLSpanElement>(16)

  const el =
    'href' in props && props.href !== undefined ? (
      (() => {
        const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>
        return (
          <a href={href} className={classes} {...anchorRest}>
            {content(children, icon)}
          </a>
        )
      })()
    ) : (
      <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
        {content(children, icon)}
      </button>
    )

  if (!magnetic) return el

  return (
    <span ref={magRef} className={cn('inline-flex', fullWidth && 'w-full')}>
      {el}
    </span>
  )
}
