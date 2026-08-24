/**
 * The NestFind mark: a gable sheltering a cradle — a roof and a nest.
 *
 * Kept as inline SVG rather than an `<img>` so it is crisp at any size, costs no
 * request, and can be recoloured from CSS. The geometry is the same 32-unit grid
 * as `app/icon.svg`, `app/apple-icon.png` and the social card, so the tab icon and
 * the header logo are literally the same drawing.
 *
 * A Server Component — no state, no effects.
 */
export function LogoMark({
  size = 28,
  /** Set when a visible wordmark sits beside it, so it is not announced twice. */
  decorative = false,
  className,
}: {
  size?: number
  decorative?: boolean
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : 'NestFind'}
      focusable="false"
    >
      <rect width="32" height="32" rx="7.5" fill="var(--nf-logo-tile, #1257c9)" />
      {/*
        The roof is filled with a same-colour round join rather than stroked: a
        stroked chevron and the cradle below it end up less than a pixel apart at
        16px, where anti-aliasing welds them into a ring. Solid mass survives.
      */}
      <path
        fill="var(--nf-logo-ink, #fff)"
        stroke="var(--nf-logo-ink, #fff)"
        strokeWidth="1.8"
        strokeLinejoin="round"
        d="M16 7 25 14.2H7z"
      />
      <path
        fill="none"
        stroke="var(--nf-logo-ink, #fff)"
        strokeWidth="3"
        strokeLinecap="round"
        d="M10 19.4v1.6a6 6 0 0 0 12 0v-1.6"
      />
    </svg>
  )
}

/**
 * Mark plus wordmark, as one unit.
 *
 * The mark is marked decorative because the wordmark beside it already carries
 * the name — announcing "NestFind NestFind" is the usual cost of giving a logo
 * both an image label and visible text.
 */
export function Logo({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <span className={className ? `nf-logo ${className}` : 'nf-logo'}>
      <LogoMark size={size} decorative />
      <span className="nf-logo-word">NestFind</span>
    </span>
  )
}
