import { ImageResponse } from 'next/og'

export const alt =
  'NestFind — a free real estate website template for Next.js, built with VivekUI'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * The social card, generated at build time.
 *
 * It carries the same blueprint grid and tabular price plates as the site, drawn
 * with plain gradients rather than an image asset, so the repository stays free of
 * a binary that would drift the moment the design changed. No custom font file
 * either — Satori's built-in stack renders this reliably at 1200×630.
 */
/**
 * The same mark as `app/icon.svg`, inlined as a data URI.
 *
 * Satori renders `<img>` reliably; hand-writing the paths as JSX would fork the
 * logo into a second copy that drifts the first time the mark is touched.
 */
const MARK =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByb2xlPSJpbWciIGFyaWEtbGFiZWw9Ik5lc3RGaW5kIj4KICA8cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHJ4PSI3LjUiIGZpbGw9IiMxMjU3YzkiLz4KICA8cGF0aCBmaWxsPSIjZmZmIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMS44IiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNMTYgNyAyNSAxNC4ySDd6Ii8+CiAgPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTTEwIDE5LjR2MS42YTYgNiAwIDAgMCAxMiAwdi0xLjYiLz4KPC9zdmc+Cg=='

export default function OpengraphImage() {
  // Satori parses `backgroundImage` and `backgroundSize` but not the layered
  // `background` shorthand, so the grid is declared as two separate properties.
  const gridImage = [
    'linear-gradient(to right, rgba(18,87,201,0.10) 1px, transparent 1px)',
    'linear-gradient(to bottom, rgba(18,87,201,0.10) 1px, transparent 1px)',
    'linear-gradient(to right, rgba(18,87,201,0.18) 1px, transparent 1px)',
    'linear-gradient(to bottom, rgba(18,87,201,0.18) 1px, transparent 1px)',
  ].join(', ')
  const gridSize = '24px 24px, 24px 24px, 144px 144px, 144px 144px'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          backgroundColor: '#f7f8fb',
          backgroundImage: gridImage,
          backgroundSize: gridSize,
          color: '#0b1f3f',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={MARK} width={56} height={56} alt="" />
          <div style={{ display: 'flex', fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>
            NestFind
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 66,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -2,
              maxWidth: 940,
            }}
          >
            A free real estate website template for Next.js
          </div>
          <div style={{ display: 'flex', fontSize: 30, color: '#4a5a72', maxWidth: 900 }}>
            18 Bengaluru listings · locality price trends · EMI calculator · compare table
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { label: 'Indiranagar', value: '₹3.25 Cr' },
              { label: 'Whitefield', value: '₹1.52 Cr' },
              { label: 'Koramangala', value: '₹58,000/mo' },
            ].map((plate) => (
              <div
                key={plate.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  padding: '14px 20px',
                  border: '1px solid #d8dfea',
                  borderRadius: 8,
                  background: '#ffffff',
                }}
              >
                <div style={{ display: 'flex', fontSize: 18, color: '#6b7a90' }}>{plate.label}</div>
                <div style={{ display: 'flex', fontSize: 30, fontWeight: 700, letterSpacing: -0.8 }}>
                  {plate.value}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 22px',
              borderRadius: 999,
              background: '#1257c9',
              color: '#fff',
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            ⚡ Built with VivekUI
          </div>
        </div>
      </div>
    ),
    size,
  )
}
