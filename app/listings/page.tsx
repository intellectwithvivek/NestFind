import { Breadcrumb, Heading, Section, Stack, Text } from '@the_viveksingh/vivek-ui'
import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/json-ld'
import { ListingsBrowser, type InitialFilters } from '@/components/listings-browser'
import { listings, type ListingKind, type PropertyType } from '@/data/listings'
import { getLocality } from '@/data/localities'
import { breadcrumbJsonLd, listingsListJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'All 18 Bengaluru listings — buy and rent',
  description:
    'Filter eighteen Bengaluru properties by price, locality, bedrooms, amenities and keywords, then compare the shortlist side by side on area, ₹ per sq ft, maintenance and possession.',
  alternates: { canonical: '/listings' },
  openGraph: {
    title: 'All 18 Bengaluru listings — buy and rent | NestFind',
    description:
      'Filter by price, locality, bedrooms and amenities, then compare the shortlist on the numbers that decide it.',
    url: '/listings',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'NestFind — a free real estate website template for Next.js, built with VivekUI',
      },
    ],
  },
}

const TYPES: PropertyType[] = ['apartment', 'villa', 'plot']

/** Reads the hero search's query string back, ignoring anything it does not recognise. */
function parseFilters(params: Record<string, string | string[] | undefined>): InitialFilters {
  const one = (key: string) => {
    const value = params[key]
    return Array.isArray(value) ? value[0] : value
  }

  const type = one('type')
  const locality = one('locality')
  const maxPrice = Number(one('maxPrice'))

  return {
    kind: one('kind') === 'rent' ? 'rent' : ('sale' satisfies ListingKind),
    locality: locality && getLocality(locality) ? locality : undefined,
    type: TYPES.includes(type as PropertyType) ? (type as PropertyType) : undefined,
    maxPrice: Number.isFinite(maxPrice) && maxPrice > 0 ? maxPrice : undefined,
  }
}

export default async function ListingsPage(props: PageProps<'/listings'>) {
  // `searchParams` is a Promise in Next.js 16 — synchronous access was removed.
  const searchParams = await props.searchParams
  const initial = parseFilters(searchParams)

  const forSale = listings.filter((l) => l.kind === 'sale').length
  const forRent = listings.length - forSale

  return (
    <>
      <JsonLd
        data={[
          listingsListJsonLd(listings),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Listings', path: '/listings' },
          ]),
        ]}
      />

      <Section padding="lg" size="xl" className="nf-blueprint">
        <Stack gap={4}>
          <Breadcrumb
            size="sm"
            items={[{ label: 'Home', href: '/' }, { label: 'Listings' }]}
          />
          <Heading level={1} size="2xl">
            Every property on NestFind
          </Heading>
          <Text size="lg" tone="muted" style={{ maxInlineSize: '52ch' }}>
            {forSale} to buy and {forRent} to let, across twelve Bengaluru localities. Filters are
            cumulative — each one narrows what the last one left.
          </Text>
        </Stack>
      </Section>

      <Section padding="lg" size="xl">
        <ListingsBrowser listings={listings} initial={initial} />
      </Section>

      <Section padding="md" size="xl" background="muted">
        <Text size="sm" tone="muted" align="center">
          Comparing more than a handful? The Compare tab puts every match in one sortable table.
          Every listing page also carries a five-year price trend for its locality and an{' '}
          <Link href={`/listings/${listings[0].slug}`}>EMI calculator</Link>.
        </Text>
      </Section>
    </>
  )
}
