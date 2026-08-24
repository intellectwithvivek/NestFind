import type { MetadataRoute } from 'next'
import { listings } from '@/data/listings'
import { SITE_URL } from '@/lib/site'

/**
 * Static routes plus one entry per listing.
 *
 * `lastModified` is a fixed date rather than `new Date()` on purpose: a build
 * timestamp tells a crawler every page changed on every deploy, which is both
 * untrue and a good way to have the signal ignored.
 */
const LAST_MODIFIED = new Date('2026-08-01T00:00:00.000Z')

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: LAST_MODIFIED, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/listings`, lastModified: LAST_MODIFIED, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/agents`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/built-with`, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.7 },
  ]

  const listingRoutes: MetadataRoute.Sitemap = listings.map((listing) => ({
    url: `${SITE_URL}/listings/${listing.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...listingRoutes]
}
