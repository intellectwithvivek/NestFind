import {
  Avatar,
  Badge,
  Breadcrumb,
  Card,
  Divider,
  Grid,
  Heading,
  MapEmbed,
  Prose,
  Section,
  Stack,
  Tabs,
  TabsList,
  TabsPanel,
  TabsPanels,
  TabsTab,
  Text,
} from '@the_viveksingh/vivek-ui'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ContactAgent } from '@/components/contact-agent'
import { EmiCalculator } from '@/components/emi-calculator'
import { JsonLd } from '@/components/json-ld'
import { ListingCard } from '@/components/listing-card'
import { ListingGallery } from '@/components/listing-gallery'
import { PriceTrend } from '@/components/price-trend'
import { StarRating } from '@/components/star-rating'
import { getAgent } from '@/data/agents'
import {
  getListing,
  imageUrl,
  listings,
  localityOf,
  similarListings,
  type Listing,
} from '@/data/listings'
import { formatArea, formatINR, formatPrice, kindLabel, pricePerSqft, typeLabel } from '@/lib/format'
import { breadcrumbJsonLd, listingJsonLd } from '@/lib/jsonld'

/** Every listing is known at build time, so every page is prerendered. */
export function generateStaticParams() {
  return listings.map((listing) => ({ slug: listing.slug }))
}

export async function generateMetadata(
  props: PageProps<'/listings/[slug]'>,
): Promise<Metadata> {
  // `params` is a Promise in Next.js 16 — synchronous access was removed.
  const { slug } = await props.params
  const listing = getListing(slug)
  if (!listing) return { title: 'Listing not found' }

  const locality = localityOf(listing)
  const title = `${listing.title} — ${locality.name}, Bengaluru`
  const description = `${formatPrice(listing)} · ${formatArea(listing.sqft)} · ${
    listing.type === 'plot' ? 'Plot' : `${listing.beds} BHK ${typeLabel(listing.type).toLowerCase()}`
  } ${listing.kind === 'sale' ? 'for sale' : 'to rent'} in ${locality.name}. ${listing.description[0].slice(0, 110)}…`
  const cover = imageUrl(listing.images[0], 1200)

  return {
    title,
    description,
    alternates: { canonical: `/listings/${listing.slug}` },
    openGraph: {
      type: 'article',
      title: `${title} | NestFind`,
      description,
      url: `/listings/${listing.slug}`,
      images: [{ url: cover, width: 1200, height: 800, alt: listing.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | NestFind`,
      description,
      images: [cover],
    },
  }
}

/** The key-facts strip under the gallery. Plots get a different set — no bedrooms. */
function facts(listing: Listing): { label: string; value: string }[] {
  const shared = [
    { label: 'Area', value: formatArea(listing.sqft) },
    { label: '₹ per sq ft', value: `₹${pricePerSqft(listing).toLocaleString('en-IN')}` },
    { label: 'Facing', value: listing.facing },
    { label: 'Possession', value: listing.possession },
  ]

  if (listing.type === 'plot') {
    return [
      { label: 'Type', value: 'Plot' },
      ...shared,
      { label: 'Khata', value: 'A' },
    ]
  }

  return [
    { label: 'Configuration', value: `${listing.beds} BHK` },
    { label: 'Bathrooms', value: String(listing.baths) },
    ...shared,
    { label: 'Floor', value: listing.floor },
    { label: 'Furnishing', value: listing.furnishing },
    { label: 'Parking', value: `${listing.parking} covered` },
    { label: 'Age', value: listing.ageYears === 0 ? 'Under construction' : `${listing.ageYears} years` },
    { label: 'Maintenance', value: `${formatINR(listing.maintenance)}/mo` },
  ]
}

export default async function ListingPage(props: PageProps<'/listings/[slug]'>) {
  const { slug } = await props.params
  const listing = getListing(slug)
  if (!listing) notFound()

  const locality = localityOf(listing)
  const agent = getAgent(listing.agentId)
  const similar = similarListings(listing, 3)

  return (
    <>
      <JsonLd
        data={[
          listingJsonLd(listing),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Listings', path: '/listings' },
            { name: listing.title, path: `/listings/${listing.slug}` },
          ]),
        ]}
      />

      <Section padding="md" size="xl">
        <Breadcrumb
          size="sm"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Listings', href: '/listings' },
            { label: locality.name, href: `/listings?locality=${locality.id}&kind=${listing.kind}` },
            { label: listing.title },
          ]}
        />
      </Section>

      <Section padding="sm" size="xl">
        <div className="nf-detail">
          {/* ---------------------------------------------------- main */}
          <div>
            <Stack gap={4} style={{ marginBlockEnd: 'var(--vk-space-6)' }}>
              <Stack direction="horizontal" gap={2} wrap>
                <Badge tone={listing.kind === 'sale' ? 'primary' : 'neutral'} variant="solid">
                  {kindLabel(listing.kind)}
                </Badge>
                <Badge tone="neutral" variant="outline">
                  {typeLabel(listing.type)}
                </Badge>
                {listing.isNew ? (
                  <Badge tone="success" variant="solid">
                    New
                  </Badge>
                ) : null}
                {listing.readyToMove ? (
                  <Badge tone="success" variant="soft">
                    Ready to move
                  </Badge>
                ) : (
                  <Badge tone="warning" variant="soft">
                    Possession {listing.possession}
                  </Badge>
                )}
              </Stack>

              <Heading level={1} size="2xl">
                {listing.title}
              </Heading>

              <Text tone="muted">
                {listing.address} · {locality.zone} Bengaluru
              </Text>

              <StarRating
                value={locality.rating}
                subject={locality.name}
                count={locality.reviews}
                countNoun="residents"
              />
            </Stack>

            <ListingGallery listing={listing} />

            <dl className="nf-facts" style={{ marginBlockStart: 'var(--vk-space-6)' }}>
              {facts(listing).map((fact) => (
                <div key={fact.label} className="nf-fact">
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div style={{ marginBlockStart: 'var(--vk-space-8)' }}>
              {/*
                The parts are imported as named exports rather than reached through
                `Tabs.List`. `Tabs` is a client component, and a Server Component
                importing one gets a client *reference*, not the function object — so
                the compound properties hung off it are undefined by the time this
                renders. The named exports are the same components without that trip.
              */}
              <Tabs defaultValue="overview" activationMode="manual" variant="line">
                <TabsList aria-label="About this property">
                  <TabsTab value="overview">Overview</TabsTab>
                  <TabsTab value="amenities">Amenities</TabsTab>
                  <TabsTab value="location">Location</TabsTab>
                  <TabsTab value="trend">Price trend</TabsTab>
                </TabsList>

                <TabsPanels>
                  <TabsPanel value="overview">
                    <Stack gap={6} style={{ marginBlockStart: 'var(--vk-space-6)' }}>
                      <Stack gap={3}>
                        <Heading level={2} size="sm">
                          Why this one
                        </Heading>
                        <ul style={{ margin: 0, paddingInlineStart: '1.25rem' }}>
                          {listing.highlights.map((highlight) => (
                            <li key={highlight} style={{ marginBlockEnd: 'var(--vk-space-2)' }}>
                              <Text as="span">{highlight}</Text>
                            </li>
                          ))}
                        </ul>
                      </Stack>
                      <Divider />
                      <Prose className="nf-prose">
                        {listing.description.map((paragraph) => (
                          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                        ))}
                      </Prose>
                    </Stack>
                  </TabsPanel>

                  <TabsPanel value="amenities">
                    <Stack gap={4} style={{ marginBlockStart: 'var(--vk-space-6)' }}>
                      <Heading level={2} size="sm">
                        {listing.amenities.length} amenities
                      </Heading>
                      <Stack direction="horizontal" gap={2} wrap>
                        {listing.amenities.map((amenity) => (
                          <Badge key={amenity} tone="primary" variant="soft" size="md">
                            {amenity}
                          </Badge>
                        ))}
                      </Stack>
                      <Text size="sm" tone="muted">
                        Maintenance of{' '}
                        {listing.maintenance === 0
                          ? 'nil — this is an independent property'
                          : `${formatINR(listing.maintenance)} a month`}{' '}
                        is what pays for these.
                      </Text>
                    </Stack>
                  </TabsPanel>

                  <TabsPanel value="location">
                    <Stack gap={4} style={{ marginBlockStart: 'var(--vk-space-6)' }}>
                      <Heading level={2} size="sm">
                        {locality.name}, {locality.zone} Bengaluru
                      </Heading>
                      <Text tone="muted">{locality.blurb}</Text>
                      <MapEmbed
                        lat={locality.lat}
                        lon={locality.lon}
                        zoom={14}
                        ratio={16 / 9}
                        title={`Map of ${locality.name}, Bengaluru`}
                      />
                      <Text size="sm" tone="muted">
                        The pin marks the locality centre, not the building. Exact coordinates come
                        with the site visit.
                      </Text>
                    </Stack>
                  </TabsPanel>

                  <TabsPanel value="trend">
                    <Stack gap={4} style={{ marginBlockStart: 'var(--vk-space-6)' }}>
                      <Heading level={2} size="sm">
                        Locality price trend — ₹/sq ft, last 5 years
                      </Heading>
                      <PriceTrend locality={locality} />
                      <Text size="sm" tone="muted">
                        This property is asking ₹{pricePerSqft(listing).toLocaleString('en-IN')} per
                        sq ft against a {locality.name} average of ₹
                        {locality.pricePerSqft[locality.pricePerSqft.length - 1].value.toLocaleString(
                          'en-IN',
                        )}
                        .
                      </Text>
                    </Stack>
                  </TabsPanel>
                </TabsPanels>
              </Tabs>
            </div>
          </div>

          {/* --------------------------------------------------- aside */}
          <div className="nf-aside">
            <Card variant="elevated" padding="lg">
              <Card.Body>
                <Stack gap={4}>
                  <Stack gap={1}>
                    <span className="nf-price-unit">
                      {listing.kind === 'sale' ? 'Asking price' : 'Monthly rent'}
                    </span>
                    <span className="nf-price nf-price-xl">{formatPrice(listing)}</span>
                    <span className="nf-price-unit">
                      ₹{pricePerSqft(listing).toLocaleString('en-IN')} per sq ft
                      {listing.maintenance > 0
                        ? ` · ${formatINR(listing.maintenance)}/mo upkeep`
                        : ''}
                    </span>
                  </Stack>

                  {agent ? (
                    <>
                      <Divider />
                      <Stack direction="horizontal" gap={3} align="center">
                        <Avatar src={agent.avatar} name={agent.name} size="md" />
                        <Stack gap={1}>
                          <Text as="span" weight="semibold">
                            {agent.name}
                          </Text>
                          <Text as="span" size="sm" tone="muted">
                            {agent.experience} years · {agent.rating.toFixed(1)}★
                          </Text>
                        </Stack>
                      </Stack>
                      <ContactAgent
                        agentName={agent.name}
                        subject={listing.title}
                        trigger="Contact agent"
                        fullWidth
                      />
                    </>
                  ) : null}
                </Stack>
              </Card.Body>
            </Card>

            {listing.kind === 'sale' ? <EmiCalculator price={listing.price} /> : null}
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------ similar */}
      <Section padding="xl" size="xl" background="muted">
        <Section.Header
          title="Similar properties"
          description={`Other ${listing.kind === 'sale' ? 'homes for sale' : 'places to rent'} at a comparable price.`}
          headingLevel={2}
        />
        <Grid minItemWidth="18rem" gap={6} style={{ marginBlockStart: 'var(--vk-space-8)' }}>
          {similar.map((other) => (
            <ListingCard key={other.slug} listing={other} />
          ))}
        </Grid>
        <Stack align="center" style={{ marginBlockStart: 'var(--vk-space-8)' }}>
          <Text size="sm" tone="muted">
            <Link
              className="nf-textlink"
              href={`/listings?kind=${listing.kind}&locality=${locality.id}`}
            >
              Everything in {locality.name} →
            </Link>
          </Text>
        </Stack>
      </Section>
    </>
  )
}
