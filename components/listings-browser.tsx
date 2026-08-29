'use client'

import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  DataTable,
  EmptyState,
  Field,
  Heading,
  Pagination,
  Select,
  Slider,
  Stack,
  Switch,
  TagInput,
  Tabs,
  Text,
} from '@the_viveksingh/vivek-ui'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  FILTERABLE_AMENITIES,
  type Amenity,
  type Listing,
  type ListingKind,
  type PropertyType,
} from '@/data/listings'
import { getLocality } from '@/data/localities'
import {
  formatArea,
  formatCompactINR,
  formatConfig,
  formatINR,
  formatPrice,
  pricePerSqft,
  typeLabel,
} from '@/lib/format'
import { ListingCard } from './listing-card'

const PAGE_SIZE = 6

type SortKey = 'relevance' | 'price-asc' | 'price-desc' | 'area-desc' | 'rate-asc'

const SORTS: { value: SortKey; label: string }[] = [
  { value: 'relevance', label: 'Newest first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'area-desc', label: 'Largest area' },
  { value: 'rate-asc', label: '₹ per sq ft: low to high' },
]

export interface InitialFilters {
  kind: ListingKind
  locality?: string
  type?: PropertyType
  maxPrice?: number
}

/**
 * Price bounds for one side of the market, snapped outwards to the step.
 *
 * Buying and renting are two orders of magnitude apart, which is why Buy/Rent is
 * an either/or here rather than a third "all" option: one slider spanning ₹27,500
 * to ₹4.65 crore would spend its entire useful travel in the first two pixels.
 */
function priceScale(listings: Listing[], kind: ListingKind) {
  const prices = listings.filter((l) => l.kind === kind).map((l) => l.price)
  const step = kind === 'sale' ? 500000 : 2500
  const min = Math.floor(Math.min(...prices) / step) * step
  const max = Math.ceil(Math.max(...prices) / step) * step
  return { min, max, step }
}

export function ListingsBrowser({
  listings,
  initial,
}: {
  listings: Listing[]
  initial: InitialFilters
}) {
  const [kind, setKind] = useState<ListingKind>(initial.kind)
  const [locality, setLocality] = useState<string>(initial.locality ?? 'any')
  const [type, setType] = useState<string>(initial.type ?? 'any')
  const [beds, setBeds] = useState<string>('any')
  const [amenities, setAmenities] = useState<Amenity[]>([])
  const [keywords, setKeywords] = useState<string[]>([])
  const [readyOnly, setReadyOnly] = useState(false)
  const [sort, setSort] = useState<SortKey>('relevance')
  const [page, setPage] = useState(1)

  const scale = useMemo(() => priceScale(listings, kind), [listings, kind])
  const [range, setRange] = useState<[number, number]>(() => {
    const s = priceScale(listings, initial.kind)
    return [s.min, Math.min(initial.maxPrice ?? s.max, s.max)]
  })

  /** Every filter change resets to page one — page 4 of a 2-page result is a dead end. */
  function reset<T>(setter: (value: T) => void) {
    return (value: T) => {
      setter(value)
      setPage(1)
    }
  }

  function switchKind(next: ListingKind) {
    if (next === kind) return
    const nextScale = priceScale(listings, next)
    setKind(next)
    setRange([nextScale.min, nextScale.max])
    setPage(1)
  }

  const localityOptions = useMemo(() => {
    const ids = [...new Set(listings.map((l) => l.localityId))]
    return [
      { value: 'any', label: 'Every locality' },
      ...ids
        .map((id) => ({ value: id, label: getLocality(id)?.name ?? id }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    ]
  }, [listings])

  const matches = useMemo(() => {
    const needles = keywords.map((k) => k.toLowerCase().trim()).filter(Boolean)

    const filtered = listings.filter((listing) => {
      if (listing.kind !== kind) return false
      if (locality !== 'any' && listing.localityId !== locality) return false
      if (type !== 'any' && listing.type !== type) return false
      if (beds !== 'any' && listing.beds < Number(beds)) return false
      if (listing.price < range[0] || listing.price > range[1]) return false
      if (readyOnly && !listing.readyToMove) return false
      if (!amenities.every((amenity) => listing.amenities.includes(amenity))) return false

      if (needles.length > 0) {
        const haystack = [
          listing.title,
          listing.address,
          listing.keywords.join(' '),
          listing.amenities.join(' '),
          getLocality(listing.localityId)?.name ?? '',
        ]
          .join(' ')
          .toLowerCase()
        if (!needles.every((needle) => haystack.includes(needle))) return false
      }

      return true
    })

    switch (sort) {
      case 'price-asc':
        return filtered.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return filtered.sort((a, b) => b.price - a.price)
      case 'area-desc':
        return filtered.sort((a, b) => b.sqft - a.sqft)
      case 'rate-asc':
        return filtered.sort((a, b) => pricePerSqft(a) - pricePerSqft(b))
      default:
        return filtered.sort(
          (a, b) => Number(b.isNew) - Number(a.isNew) || a.ageYears - b.ageYears,
        )
    }
  }, [listings, kind, locality, type, beds, range, readyOnly, amenities, keywords, sort])

  const pageCount = Math.max(1, Math.ceil(matches.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount)
  const visible = matches.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  const activeFilters =
    (locality !== 'any' ? 1 : 0) +
    (type !== 'any' ? 1 : 0) +
    (beds !== 'any' ? 1 : 0) +
    amenities.length +
    keywords.length +
    (readyOnly ? 1 : 0) +
    (range[0] > scale.min || range[1] < scale.max ? 1 : 0)

  function clearAll() {
    setLocality('any')
    setType('any')
    setBeds('any')
    setAmenities([])
    setKeywords([])
    setReadyOnly(false)
    setRange([scale.min, scale.max])
    setPage(1)
  }

  const money = (value: number) => (kind === 'sale' ? formatCompactINR(value) : formatINR(value))

  return (
    <div className="nf-results">
      {/* --------------------------------------------------------- rail */}
      <aside className="nf-rail" aria-label="Filters">
        <Card variant="outline" padding="lg">
          <Card.Body>
              <Stack gap={6}>
                <Stack direction="horizontal" justify="between" align="center">
                  <Heading level={2} size="sm">
                    Filters
                  </Heading>
                  {activeFilters > 0 ? (
                    <Button variant="ghost" size="sm" onClick={clearAll}>
                      Clear {activeFilters}
                    </Button>
                  ) : null}
                </Stack>

                <ButtonGroup attached label="Buy or rent">
                  <Button
                    variant={kind === 'sale' ? 'solid' : 'outline'}
                    aria-pressed={kind === 'sale'}
                    onClick={() => switchKind('sale')}
                  >
                    Buy
                  </Button>
                  <Button
                    variant={kind === 'rent' ? 'solid' : 'outline'}
                    aria-pressed={kind === 'rent'}
                    onClick={() => switchKind('rent')}
                  >
                    Rent
                  </Button>
                </ButtonGroup>

                <Stack gap={2}>
                  <Stack direction="horizontal" justify="between" align="baseline" wrap>
                    <Text as="span" size="sm" weight="medium">
                      {kind === 'sale' ? 'Price' : 'Monthly rent'}
                    </Text>
                    <span className="nf-figure" style={{ fontSize: 'var(--vk-text-sm)' }}>
                      {money(range[0])} – {money(range[1])}
                    </span>
                  </Stack>
                  <Slider
                    range
                    min={scale.min}
                    max={scale.max}
                    step={scale.step}
                    value={range}
                    onValueChange={reset(setRange)}
                    formatValue={money}
                    minLabel={kind === 'sale' ? 'Minimum price' : 'Minimum rent'}
                    maxLabel={kind === 'sale' ? 'Maximum price' : 'Maximum rent'}
                  />
                </Stack>

                <Field label="Locality">
                  <Select
                    value={locality}
                    onChange={(event) => reset(setLocality)(event.target.value)}
                    options={localityOptions}
                  />
                </Field>

                <Field label="Property type">
                  <Select
                    value={type}
                    onChange={(event) => reset(setType)(event.target.value)}
                    options={[
                      { value: 'any', label: 'Any type' },
                      { value: 'apartment', label: 'Apartment' },
                      { value: 'villa', label: 'Villa' },
                      { value: 'plot', label: 'Plot' },
                    ]}
                  />
                </Field>

                <Field label="Bedrooms" help="Plots are excluded once you set a minimum.">
                  <Select
                    value={beds}
                    onChange={(event) => reset(setBeds)(event.target.value)}
                    options={[
                      { value: 'any', label: 'Any' },
                      { value: '2', label: '2 and up' },
                      { value: '3', label: '3 and up' },
                      { value: '4', label: '4 and up' },
                    ]}
                  />
                </Field>

                <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
                  <legend
                    style={{
                      fontSize: 'var(--vk-text-sm)',
                      fontWeight: 'var(--vk-weight-medium)',
                      marginBlockEnd: 'var(--vk-space-2)',
                      padding: 0,
                    }}
                  >
                    Amenities
                  </legend>
                  <Stack gap={2}>
                    {FILTERABLE_AMENITIES.map((amenity) => (
                      <Checkbox
                        key={amenity}
                        size="sm"
                        label={amenity}
                        checked={amenities.includes(amenity)}
                        onChange={(event) =>
                          reset(setAmenities)(
                            event.target.checked
                              ? [...amenities, amenity]
                              : amenities.filter((a) => a !== amenity),
                          )
                        }
                      />
                    ))}
                  </Stack>
                </fieldset>

                <Field label="Keywords" help="Press Enter after each. All must match.">
                  <TagInput
                    value={keywords}
                    onValueChange={reset(setKeywords)}
                    placeholder="metro, lake, terrace…"
                    max={6}
                    size="sm"
                  />
                </Field>

                <Switch
                  label="Ready to move"
                  description="Hides anything still under construction."
                  checked={readyOnly}
                  onChange={(event) => reset(setReadyOnly)(event.target.checked)}
                />
            </Stack>
          </Card.Body>
        </Card>
      </aside>

      {/* ------------------------------------------------------ results */}
      <div>
        <Stack
          direction="horizontal"
          justify="between"
          align="center"
          wrap
          gap={4}
          style={{ marginBlockEnd: 'var(--vk-space-6)' }}
        >
          <Text aria-live="polite">
            <strong className="nf-figure">{matches.length}</strong>{' '}
            {matches.length === 1 ? 'property' : 'properties'}{' '}
            {kind === 'sale' ? 'for sale' : 'to rent'}
            {activeFilters > 0 ? ` · ${activeFilters} filter${activeFilters === 1 ? '' : 's'}` : ''}
          </Text>
          <Stack direction="horizontal" gap={2} align="center">
            <label htmlFor="sort" className="nf-sr-only">
              Sort results
            </label>
            <Select
              id="sort"
              size="sm"
              value={sort}
              onChange={(event) => reset(setSort)(event.target.value as SortKey)}
              options={SORTS}
            />
          </Stack>
        </Stack>

        {matches.length === 0 ? (
          <EmptyState
            icon={<span style={{ fontSize: '2.5rem' }}>🧭</span>}
            title="Nothing matches all of that"
            description="Every filter is an AND, so a long list narrows quickly. Widen the price range or drop an amenity."
            actions={
              <Button onClick={clearAll} variant="outline">
                Clear all filters
              </Button>
            }
          />
        ) : (
          <Tabs defaultValue="grid" activationMode="manual" variant="pill" size="sm">
            <Tabs.List aria-label="Result layout">
              <Tabs.Tab value="grid">Grid</Tabs.Tab>
              <Tabs.Tab value="compare">Compare</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panels>
              <Tabs.Panel value="grid">
                <div
                  style={{
                    display: 'grid',
                    gap: 'var(--vk-space-6)',
                    // `min(…, 100%)` is what stops the track from being wider
                    // than its container on a narrow phone — a bare
                    // `minmax(18rem, 1fr)` never shrinks and pushes the page.
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(18rem, 100%), 1fr))',
                    marginBlockStart: 'var(--vk-space-6)',
                  }}
                >
                  {visible.map((listing) => (
                    <ListingCard key={listing.slug} listing={listing} />
                  ))}
                </div>

                {pageCount > 1 ? (
                  // A plain block, deliberately not a flex or centred container.
                  // `.vk-pagination` declares `container-type: inline-size`, which
                  // makes it size-contained: as a shrink-to-fit flex item it computes
                  // to zero width and disappears. Full width is the contract, and its
                  // own list already centres the page buttons.
                  <div style={{ marginBlockStart: 'var(--vk-space-10)' }}>
                    <Pagination
                      page={safePage}
                      pageCount={pageCount}
                      onPageChange={setPage}
                      showFirstLast={pageCount > 3}
                    />
                  </div>
                ) : null}
              </Tabs.Panel>

              <Tabs.Panel value="compare">
                <div style={{ marginBlockStart: 'var(--vk-space-6)' }}>
                  <DataTable
                    data={matches}
                    rowKey="slug"
                    rowHeader="title"
                    rowLabel={(listing) => listing.title}
                    caption={`All ${matches.length} matching properties, compared on the figures that decide it.`}
                    hideCaption
                    size="sm"
                    stickyHeader
                    hoverable
                    responsive="stack"
                    pageSize={12}
                    columns={[
                      {
                        key: 'title',
                        header: 'Property',
                        sortable: true,
                        width: '18rem',
                        render: (listing) => (
                          <Stack gap={1}>
                            <Link href={`/listings/${listing.slug}`} className="nf-card-link">
                              <strong>{listing.title}</strong>
                            </Link>
                            <Text as="span" size="sm" tone="muted">
                              {getLocality(listing.localityId)?.name} · {typeLabel(listing.type)}
                            </Text>
                          </Stack>
                        ),
                      },
                      {
                        key: 'config',
                        header: 'Config',
                        sortAccessor: (listing) => listing.beds,
                        sortable: true,
                        render: (listing) => formatConfig(listing),
                      },
                      {
                        key: 'sqft',
                        header: 'Area',
                        numeric: true,
                        sortable: true,
                        render: (listing) => (
                          <span className="nf-nowrap">{formatArea(listing.sqft)}</span>
                        ),
                      },
                      {
                        key: 'price',
                        header: kind === 'sale' ? 'Price' : 'Rent',
                        numeric: true,
                        sortable: true,
                        render: (listing) => (
                          <span
                            className="nf-price nf-nowrap"
                            style={{ fontSize: 'var(--vk-text-md)' }}
                          >
                            {formatPrice(listing)}
                          </span>
                        ),
                      },
                      {
                        key: 'rate',
                        header: '₹/sq ft',
                        numeric: true,
                        sortable: true,
                        sortAccessor: (listing) => pricePerSqft(listing),
                        render: (listing) => pricePerSqft(listing).toLocaleString('en-IN'),
                      },
                      {
                        key: 'maintenance',
                        header: 'Upkeep/mo',
                        numeric: true,
                        sortable: true,
                        render: (listing) => (
                          <span className="nf-nowrap">
                            {listing.maintenance === 0 ? '—' : formatINR(listing.maintenance)}
                          </span>
                        ),
                      },
                      {
                        key: 'possession',
                        header: 'Possession',
                        sortable: true,
                        render: (listing) =>
                          listing.readyToMove ? (
                            <Badge tone="success" variant="soft" size="sm">
                              Ready
                            </Badge>
                          ) : (
                            <Badge tone="warning" variant="soft" size="sm">
                              {listing.possession}
                            </Badge>
                          ),
                      },
                      { key: 'furnishing', header: 'Furnishing', sortable: true },
                    ]}
                  />
                </div>
              </Tabs.Panel>
            </Tabs.Panels>
          </Tabs>
        )}
      </div>
    </div>
  )
}
