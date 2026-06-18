import type { SVGProps } from 'react'

export type IconKey =
  | 'bolt'
  | 'heart'
  | 'tag'
  | 'headset'
  | 'discovery'
  | 'design'
  | 'code'
  | 'rocket'
  | 'arrow'
  | 'arrowDown'
  | 'external'
  | 'phone'
  | 'mail'
  | 'pin'
  | 'menu'
  | 'close'
  | 'check'

const paths: Record<IconKey, JSX.Element> = {
  bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />,
  heart: <path d="M12 21s-7.5-4.6-10-9.3C.4 8.4 2 5 5.3 5c2 0 3.3 1.2 4.7 3 1.4-1.8 2.7-3 4.7-3C18 5 19.6 8.4 18 11.7 15.5 16.4 12 21 12 21Z" />,
  tag: (
    <>
      <path d="M3 12V5a2 2 0 0 1 2-2h7l9 9-9 9-9-9Z" />
      <circle cx="7.5" cy="7.5" r="1.5" />
    </>
  ),
  headset: <path d="M4 13a8 8 0 0 1 16 0v4a3 3 0 0 1-3 3h-1v-7h3M4 13v4a3 3 0 0 0 3 3h1v-7H5" />,
  discovery: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" />,
  design: (
    <>
      <path d="M12 3 2 8l10 5 10-5-10-5Z" />
      <path d="m2 16 10 5 10-5M2 12l10 5 10-5" />
    </>
  ),
  code: <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />,
  rocket: <path d="M5 16c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2 0-2.8a2 2 0 0 0-3 0ZM12 15l-3-3a14 14 0 0 1 8-9c3 0 4 1 4 4a14 14 0 0 1-9 8Z" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowDown: <path d="M12 5v14M6 13l6 6 6-6" />,
  external: <path d="M14 4h6v6M20 4l-9 9M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />,
  phone: <path d="M21 16v3a2 2 0 0 1-2.2 2A19 19 0 0 1 3 5.2 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.8L8.6 11a16 16 0 0 0 4.4 4.4l1.5-1.3a2 2 0 0 1 1.8-.6l3 .5A2 2 0 0 1 21 16Z" />,
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  check: <path d="m5 12 5 5L20 7" />,
}

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconKey
  size?: number
}

export function Icon({ name, size = 22, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  )
}
