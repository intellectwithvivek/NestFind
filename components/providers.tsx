'use client'

import { ThemeProvider, ToastProvider } from '@the_viveksingh/vivek-ui'
import type { ReactNode } from 'react'

/**
 * The two providers the whole tree needs, in one client boundary.
 *
 * Neither renders a wrapper element, so this adds nothing to the layout — it
 * exists only so `app/layout.tsx` can stay a Server Component.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system">
      <ToastProvider position="bottom-end" duration={4000}>
        {children}
      </ToastProvider>
    </ThemeProvider>
  )
}
