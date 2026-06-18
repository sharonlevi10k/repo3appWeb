export interface FooterLink {
  text: string
  href: string
}

/**
 * A titled column of footer links (adapted from an mvpblocks footer pattern to
 * the SeaApp design system — mono eyebrow title + muted white links).
 */
export function FooterColumn({
  title,
  links,
  className,
}: {
  title: string
  links: FooterLink[]
  className?: string
}) {
  return (
    <div className={className}>
      <h4 className="font-mono text-xs uppercase tracking-eyebrow text-white/45">{title}</h4>
      <ul className="mt-5 flex flex-col gap-3">
        {links.map((l) => (
          <li key={l.text}>
            <a href={l.href} className="text-sm text-white/65 transition-colors duration-base hover:text-white">
              {l.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
