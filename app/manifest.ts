import type { MetadataRoute } from 'next'
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site'

/**
 * Web app manifest.
 *
 * Not a PWA ambition — it is what lets Android use the real icon and name when
 * someone adds the site to a home screen, and it is one of the things Lighthouse
 * and several crawlers look for when judging whether a site is properly set up.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — free real estate website template for Next.js`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1257c9',
    lang: 'en-IN',
    categories: ['business', 'lifestyle', 'developer tools'],
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      { src: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
    ],
  }
}
