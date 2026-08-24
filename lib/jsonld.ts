import type { Agent } from '@/data/agents'
import { getAgent } from '@/data/agents'
import type { FaqEntry } from '@/data/faqs'
import { imageUrl, localityOf, type Listing } from '@/data/listings'
import { formatArea } from './format'
import { REPO, SITE_NAME, SITE_URL } from './site'

/** A JSON-LD node. Loose on purpose — schema.org is wider than any type we would write. */
export type JsonLdNode = Record<string, unknown>

function absolute(path: string): string {
  return new URL(path, SITE_URL).toString()
}

/**
 * `RealEstateListing` wrapping a `Residence` (or `Place`, for a plot) and an `Offer`.
 *
 * The three are nested rather than emitted side by side because that is how Google
 * resolves them: the listing is the page, the residence is the thing, the offer is
 * the price. A flat list of three unlinked nodes validates and tells search engines
 * nothing about how they relate.
 */
export function listingJsonLd(listing: Listing): JsonLdNode {
  const locality = localityOf(listing)
  const agent = getAgent(listing.agentId)
  const url = absolute(`/listings/${listing.slug}`)

  const address = {
    '@type': 'PostalAddress',
    streetAddress: listing.address,
    addressLocality: locality.name,
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  }

  const geo = {
    '@type': 'GeoCoordinates',
    latitude: locality.lat,
    longitude: locality.lon,
  }

  const floorSize = {
    '@type': 'QuantitativeValue',
    value: listing.sqft,
    unitCode: 'FTK',
    unitText: 'square feet',
  }

  // A plot has no rooms, so describing it as a Residence would be a lie the
  // validator happily accepts. `Place` is the honest type for bare land.
  const about: JsonLdNode =
    listing.type === 'plot'
      ? {
          '@type': 'Place',
          name: listing.title,
          address,
          geo,
          additionalProperty: [
            { '@type': 'PropertyValue', name: 'Plot area', value: formatArea(listing.sqft) },
            { '@type': 'PropertyValue', name: 'Facing', value: listing.facing },
          ],
        }
      : {
          '@type': ['Residence', listing.type === 'villa' ? 'House' : 'Apartment'],
          name: listing.title,
          address,
          geo,
          numberOfRooms: listing.beds,
          numberOfBedrooms: listing.beds,
          numberOfBathroomsTotal: listing.baths,
          floorSize,
          amenityFeature: listing.amenities.map((amenity) => ({
            '@type': 'LocationFeatureSpecification',
            name: amenity,
            value: true,
          })),
        }

  const offer: JsonLdNode = {
    '@type': 'Offer',
    url,
    price: listing.price,
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
    businessFunction:
      listing.kind === 'rent'
        ? 'https://schema.org/LeaseOut'
        : 'https://schema.org/Sell',
    itemOffered: about,
    ...(listing.kind === 'rent'
      ? {
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: listing.price,
            priceCurrency: 'INR',
            unitCode: 'MON',
            unitText: 'per month',
          },
        }
      : {}),
    ...(agent ? { seller: agentJsonLd(agent) } : {}),
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    '@id': url,
    url,
    name: `${listing.title} — ${locality.name}, Bengaluru`,
    description: listing.description[0],
    datePosted: '2026-08-01',
    image: listing.images.map((image) => imageUrl(image, 1600)),
    address,
    geo,
    floorSize,
    numberOfRooms: listing.type === 'plot' ? undefined : listing.beds,
    offers: offer,
    about,
    provider: {
      '@type': 'RealEstateAgent',
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}

/** One agent, as a `RealEstateAgent` with an aggregate rating. */
export function agentJsonLd(agent: Agent): JsonLdNode {
  return {
    '@type': 'RealEstateAgent',
    '@id': absolute(`/agents#${agent.id}`),
    name: agent.name,
    jobTitle: agent.title,
    image: agent.avatar,
    description: agent.bio,
    telephone: agent.phone,
    email: agent.email,
    knowsLanguage: agent.languages,
    areaServed: agent.localities.map((id) => ({
      '@type': 'Place',
      name: id
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' '),
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: agent.rating,
      reviewCount: agent.reviews,
      bestRating: 5,
      worstRating: 1,
    },
  }
}

/** The `/agents` page: an `ItemList` of `RealEstateAgent` nodes. */
export function agentListJsonLd(agents: Agent[]): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${SITE_NAME} agents`,
    itemListElement: agents.map((agent, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: agentJsonLd(agent),
    })),
  }
}

/** `BreadcrumbList`. Pass paths relative to the site root; they are made absolute here. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absolute(crumb.path),
    })),
  }
}

/**
 * `FAQPage`. The answers go in as plain text, so whatever renders them visually
 * cannot drift from what a crawler reads.
 */
export function faqJsonLd(entries: FaqEntry[]): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.answer,
      },
    })),
  }
}

/** The site itself, emitted once from the root layout. */
export function siteJsonLd(): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'en-IN',
    publisher: {
      '@type': 'RealEstateAgent',
      name: SITE_NAME,
      url: SITE_URL,
      areaServed: { '@type': 'City', name: 'Bengaluru' },
    },
  }
}

/**
 * `ItemList` of the listings on `/listings`.
 *
 * Each entry points at its own page rather than repeating the property here —
 * the detail page already carries the full `RealEstateListing`, and duplicating
 * it in a list is how you end up with two contradictory descriptions of the
 * same thing in an index.
 */
export function listingsListJsonLd(items: Listing[]): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Properties to buy and rent in Bengaluru — ${SITE_NAME}`,
    numberOfItems: items.length,
    itemListOrder: 'https://schema.org/ItemListUnordered',
    itemListElement: items.map((listing, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absolute(`/listings/${listing.slug}`),
      name: listing.title,
    })),
  }
}

/**
 * The template itself, as `SoftwareSourceCode`, emitted on `/built-with`.
 *
 * This page is the one aimed at developers rather than house-hunters, so it is
 * the honest place to say "this is an MIT-licensed repository you can clone" in
 * a form a machine can read.
 */
export function templateJsonLd(): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: `${SITE_NAME} — free real estate website template`,
    description:
      'An open-source real estate marketplace template for Next.js 16 and React 19, built entirely with the VivekUI component library. MIT licensed.',
    url: absolute('/built-with'),
    codeRepository: REPO.url,
    programmingLanguage: ['TypeScript', 'CSS'],
    runtimePlatform: 'Next.js 16',
    license: 'https://opensource.org/licenses/MIT',
    author: {
      '@type': 'Person',
      name: 'Vivek Kumar Singh',
      url: 'https://vivekkumarsingh.in/',
    },
    isBasedOn: {
      '@type': 'SoftwareApplication',
      name: 'VivekUI',
      url: 'https://ui.vivekkumarsingh.in',
      applicationCategory: 'DeveloperApplication',
    },
  }
}
