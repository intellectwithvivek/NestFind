import type { Listing } from '@/data/listings'

/**
 * Indian number formatting, fixed to `en-IN` on purpose.
 *
 * The runtime default differs between Node and the browser, and for a value that is
 * rendered on both sides that difference IS a hydration mismatch. Pinning the locale
 * is the whole fix.
 */
const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const plain = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 })

/** `₹32,50,000` — the exact figure, grouped the Indian way. */
export function formatINR(value: number): string {
  return inr.format(Math.round(value))
}

/** `12,50,000` — no symbol, for places that supply their own. */
export function formatNumber(value: number): string {
  return plain.format(Math.round(value))
}

/**
 * `₹3.25 Cr` / `₹58 L` / `₹27,500` — how prices are actually said out loud here.
 * Crore and lakh are the units a Bengaluru buyer thinks in; rupees below a lakh.
 */
export function formatCompactINR(value: number): string {
  if (value >= 10000000) {
    const crore = value / 10000000
    return `₹${crore.toFixed(crore >= 10 ? 1 : 2).replace(/\.0+$/, '')} Cr`
  }
  if (value >= 100000) {
    const lakh = value / 100000
    return `₹${lakh.toFixed(lakh >= 10 ? 1 : 2).replace(/\.0+$/, '')} L`
  }
  return formatINR(value)
}

/** The headline price, with `/mo` on rentals so the two can sit in one grid. */
export function formatPrice(listing: Listing): string {
  return listing.kind === 'rent'
    ? `${formatINR(listing.price)}/mo`
    : formatCompactINR(listing.price)
}

/** Rate per square foot. For a rental this is the monthly rent per sq ft. */
export function pricePerSqft(listing: Listing): number {
  return Math.round(listing.price / listing.sqft)
}

/** `1,850 sq ft` */
export function formatArea(sqft: number): string {
  return `${formatNumber(sqft)} sq ft`
}

/** `3 BHK`, or `Plot` where a bedroom count would be meaningless. */
export function formatConfig(listing: Listing): string {
  return listing.type === 'plot' ? 'Plot' : `${listing.beds} BHK`
}

const TYPE_LABELS: Record<Listing['type'], string> = {
  apartment: 'Apartment',
  villa: 'Villa',
  plot: 'Plot',
}

export function typeLabel(type: Listing['type']): string {
  return TYPE_LABELS[type]
}

/** The badge that sits on a listing card. */
export function kindLabel(kind: Listing['kind']): string {
  return kind === 'sale' ? 'For sale' : 'For rent'
}
