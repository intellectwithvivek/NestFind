import { Badge, Card, Stack, Text } from '@the_viveksingh/vivek-ui'
import Image from 'next/image'
import Link from 'next/link'
import { imageAlt, imageUrl, localityOf, type Listing } from '@/data/listings'
import { formatArea, formatConfig, formatPrice, kindLabel, pricePerSqft } from '@/lib/format'
import { SaveButton } from './save-button'
import { StarRating } from './star-rating'

/**
 * One property, as it appears in every grid on the site.
 *
 * A Server Component; only the heart crosses to the client. The title link is
 * stretched over the whole card with a pseudo-element rather than by wrapping
 * the card in an anchor — wrapping would put the save button inside the link,
 * which is invalid HTML and unusable with a keyboard.
 */
export function ListingCard({
  listing,
  priority = false,
}: {
  listing: Listing
  priority?: boolean
}) {
  const locality = localityOf(listing)
  const cover = listing.images[0]

  return (
    <Card variant="outline" padding="none" interactive className="nf-card">
      <div className="nf-card-media">
        <Image
          src={imageUrl(cover, 800)}
          alt={imageAlt(listing, cover)}
          fill
          sizes="(min-width: 64rem) 30vw, (min-width: 40rem) 45vw, 92vw"
          priority={priority}
          style={{ objectFit: 'cover' }}
        />
        <div className="nf-card-tags">
          <Badge tone={listing.kind === 'sale' ? 'primary' : 'neutral'} variant="solid" size="sm">
            {kindLabel(listing.kind)}
          </Badge>
          {listing.isNew ? (
            <Badge tone="success" variant="solid" size="sm">
              New
            </Badge>
          ) : null}
        </div>
        <SaveButton title={listing.title} />
      </div>

      <Card.Body className="nf-card-body">
        <Stack gap={1}>
          <p className="nf-price nf-price-lg">
            {formatPrice(listing)}{' '}
            <span className="nf-price-unit">
              · ₹{pricePerSqft(listing).toLocaleString('en-IN')}/sq ft
            </span>
          </p>
        </Stack>

        <Text as="h3" size="md" weight="semibold" style={{ position: 'relative' }}>
          <Link href={`/listings/${listing.slug}`} className="nf-card-link nf-stretch">
            {listing.title}
          </Link>
        </Text>

        <Text size="sm" tone="muted">
          {locality.name} · {listing.address.split(',')[0]}
        </Text>

        <p className="nf-meta">
          <span className="nf-meta-item">{formatConfig(listing)}</span>
          {listing.type === 'plot' ? null : (
            <>
              <span className="nf-meta-item">
                {listing.baths} bath{listing.baths === 1 ? '' : 's'}
              </span>
            </>
          )}
          <span className="nf-meta-item">{formatArea(listing.sqft)}</span>
        </p>

        <div style={{ marginBlockStart: 'auto' }}>
          <StarRating
            value={locality.rating}
            subject={locality.name}
            count={locality.reviews}
            countNoun="residents"
          />
        </div>
      </Card.Body>
    </Card>
  )
}
