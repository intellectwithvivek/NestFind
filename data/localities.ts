/**
 * Bengaluru localities, each with five calendar years of ₹/sq ft.
 *
 * The series is what the listing-page LineChart plots, and what the "trending
 * localities" FAQ answer points at. Figures are illustrative, not market data.
 */
export interface PricePoint {
  year: number
  /** Average asking price in ₹ per sq ft for that year. */
  value: number
}

export interface Locality {
  id: string
  name: string
  zone: 'North' | 'South' | 'East' | 'West' | 'Central'
  blurb: string
  /** Resident rating out of 5, shown on listing cards. */
  rating: number
  reviews: number
  lat: number
  lon: number
  pricePerSqft: PricePoint[]
}

const YEARS = [2021, 2022, 2023, 2024, 2025] as const

/** Turns five bare numbers into the `{ year, value }` shape the chart wants. */
function series(...values: [number, number, number, number, number]): PricePoint[] {
  return values.map((value, i) => ({ year: YEARS[i], value }))
}

export const localities: Locality[] = [
  {
    id: 'indiranagar',
    name: 'Indiranagar',
    zone: 'East',
    blurb:
      '100 Feet Road, the metro on Old Madras Road, and more restaurants per square kilometre than anywhere else in the city.',
    rating: 4.6,
    reviews: 1284,
    lat: 12.9784,
    lon: 77.6408,
    pricePerSqft: series(12500, 13400, 14900, 16300, 17800),
  },
  {
    id: 'koramangala',
    name: 'Koramangala',
    zone: 'South',
    blurb:
      'Where most of the city’s startups signed their first lease. Eight blocks, each with its own character and its own traffic.',
    rating: 4.5,
    reviews: 1976,
    lat: 12.9352,
    lon: 77.6245,
    pricePerSqft: series(11800, 12700, 14100, 15500, 16900),
  },
  {
    id: 'whitefield',
    name: 'Whitefield',
    zone: 'East',
    blurb:
      'Tech parks, international schools and the Purple Line extension that finally made the commute predictable.',
    rating: 4.2,
    reviews: 2431,
    lat: 12.9698,
    lon: 77.75,
    pricePerSqft: series(6200, 6800, 7500, 8300, 9100),
  },
  {
    id: 'hsr-layout',
    name: 'HSR Layout',
    zone: 'South',
    blurb:
      'Wide sectors, a genuine footpath culture and Agara Lake on the doorstep. The quiet answer to Koramangala.',
    rating: 4.5,
    reviews: 1610,
    lat: 12.9116,
    lon: 77.6389,
    pricePerSqft: series(8400, 9200, 10300, 11300, 12300),
  },
  {
    id: 'jayanagar',
    name: 'Jayanagar',
    zone: 'South',
    blurb:
      'Tree-lined blocks laid out in the 1950s, the 4th Block market, and some of the last independent houses inside the Ring Road.',
    rating: 4.7,
    reviews: 1155,
    lat: 12.925,
    lon: 77.5938,
    pricePerSqft: series(10900, 11600, 12700, 13700, 14600),
  },
  {
    id: 'hebbal',
    name: 'Hebbal',
    zone: 'North',
    blurb:
      'Twenty-five minutes to the airport on a good day, the lake on one side and Manyata Tech Park on the other.',
    rating: 4.3,
    reviews: 987,
    lat: 13.0358,
    lon: 77.597,
    pricePerSqft: series(7300, 8000, 8900, 9700, 10400),
  },
  {
    id: 'sarjapur-road',
    name: 'Sarjapur Road',
    zone: 'East',
    blurb:
      'The corridor that grew fastest. New gated projects every quarter, and the road widening that is finally catching up.',
    rating: 4.1,
    reviews: 2088,
    lat: 12.901,
    lon: 77.6874,
    pricePerSqft: series(5900, 6600, 7400, 8200, 8900),
  },
  {
    id: 'electronic-city',
    name: 'Electronic City',
    zone: 'South',
    blurb:
      'Phase 1 and Phase 2, the elevated expressway, and the Yellow Line metro that opened the southern corridor up.',
    rating: 4.0,
    reviews: 1743,
    lat: 12.8452,
    lon: 77.6602,
    pricePerSqft: series(4700, 5100, 5600, 6000, 6400),
  },
  {
    id: 'yelahanka',
    name: 'Yelahanka',
    zone: 'North',
    blurb:
      'Old Town and New Town, the airforce station, and plot sizes you cannot find anywhere else this close to the airport.',
    rating: 4.2,
    reviews: 764,
    lat: 13.1007,
    lon: 77.5963,
    pricePerSqft: series(5400, 5900, 6500, 7100, 7600),
  },
  {
    id: 'malleshwaram',
    name: 'Malleshwaram',
    zone: 'West',
    blurb:
      'Sampige Road, the Green Line metro, and eighty-year-old houses on numbered cross streets that have not changed much.',
    rating: 4.6,
    reviews: 892,
    lat: 13.0035,
    lon: 77.5709,
    pricePerSqft: series(11200, 11900, 13000, 14100, 15100),
  },
  {
    id: 'jp-nagar',
    name: 'JP Nagar',
    zone: 'South',
    blurb:
      'Nine phases running south from Jayanagar, with the Ring Road on one edge and Brigade Millennium on the other.',
    rating: 4.4,
    reviews: 1321,
    lat: 12.9063,
    lon: 77.5857,
    pricePerSqft: series(7800, 8400, 9300, 10100, 10700),
  },
  {
    id: 'bellandur',
    name: 'Bellandur',
    zone: 'East',
    blurb:
      'Outer Ring Road offices within walking distance, which is either the whole appeal or the whole problem.',
    rating: 4.0,
    reviews: 1489,
    lat: 12.9304,
    lon: 77.6784,
    pricePerSqft: series(6800, 7500, 8300, 9000, 9600),
  },
]

const byId = new Map(localities.map((l) => [l.id, l]))

export function getLocality(id: string): Locality | undefined {
  return byId.get(id)
}

/** Percentage change across the whole series, rounded to a whole number. */
export function priceGrowth(locality: Locality): number {
  const points = locality.pricePerSqft
  const first = points[0].value
  const last = points[points.length - 1].value
  return Math.round(((last - first) / first) * 100)
}

/** The single sentence printed under the price-trend chart. */
export function growthTakeaway(locality: Locality): string {
  const points = locality.pricePerSqft
  const growth = priceGrowth(locality)
  const sign = growth >= 0 ? '+' : ''
  return `${sign}${growth}% since ${points[0].year} — ₹${points[0].value.toLocaleString('en-IN')} to ₹${points[
    points.length - 1
  ].value.toLocaleString('en-IN')} per sq ft.`
}

/** Localities ordered by five-year growth, steepest first. */
export function trendingLocalities(count = 3): Locality[] {
  return [...localities].sort((a, b) => priceGrowth(b) - priceGrowth(a)).slice(0, count)
}
