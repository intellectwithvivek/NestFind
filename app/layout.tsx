import { themeScript } from '@the_viveksingh/vivek-ui'
import '@the_viveksingh/vivek-ui/styles.css'
import '@the_viveksingh/vivek-ui/charts.css'
import './globals.css'

import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, Inter } from 'next/font/google'
import { JsonLd } from '@/components/json-ld'
import { Providers } from '@/components/providers'
import { SiteFooter } from '@/components/site-footer'
import { SiteNavbar } from '@/components/site-navbar'
import { siteJsonLd } from '@/lib/jsonld'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--nf-font-sans',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--nf-font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Free Real Estate Website Template (Next.js) — NestFind | VivekUI',
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'Vivek Kumar Singh', url: 'https://vivekkumarsingh.in/' }],
  creator: 'Vivek Kumar Singh',
  keywords: [
    'free real estate website template nextjs',
    'nextjs real estate template',
    'react property listing template',
    'open source real estate website',
    'bengaluru property listings',
    'VivekUI',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_IN',
    url: SITE_URL,
    title: 'Free Real Estate Website Template (Next.js) — NestFind | VivekUI',
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Real Estate Website Template (Next.js) — NestFind | VivekUI',
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  category: 'real estate',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0b' },
  ],
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        {/*
          Blocking, in <head>, before first paint. React cannot do this job: the
          server does not know what theme this visitor chose, so without the
          snippet a dark-mode user gets a white flash on every cold load.
        */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>
          <a className="nf-skip" href="#main">
            Skip to content
          </a>
          <SiteNavbar />
          <main id="main" className="nf-main">
            {children}
          </main>
          <SiteFooter />
        </Providers>
        <JsonLd data={siteJsonLd()} />
      </body>
    </html>
  )
}
