'use client'

import {
  Button,
  ButtonGroup,
  Card,
  Combobox,
  Field,
  Select,
  Slider,
  Stack,
  Text,
} from '@the_viveksingh/vivek-ui'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { Locality } from '@/data/localities'
import type { ListingKind } from '@/data/listings'
import { formatCompactINR, formatINR } from '@/lib/format'

/**
 * Budget ceilings differ by two orders of magnitude between buying and renting,
 * so the slider gets a whole different scale rather than a shared one that
 * would spend 99% of its travel in the wrong range.
 */
const BUDGET = {
  sale: { min: 5000000, max: 60000000, step: 500000, initial: 25000000 },
  rent: { min: 10000, max: 200000, step: 5000, initial: 60000 },
} as const satisfies Record<ListingKind, { min: number; max: number; step: number; initial: number }>

export function HeroSearch({ localities }: { localities: Locality[] }) {
  const router = useRouter()
  const [kind, setKind] = useState<ListingKind>('sale')
  const [locality, setLocality] = useState<string | null>(null)
  const [type, setType] = useState('any')
  const [budget, setBudget] = useState<number>(BUDGET.sale.initial)
  /**
   * Whether the visitor actually moved the budget slider.
   *
   * The slider has to start somewhere, and passing that starting position on as
   * `maxPrice` would silently impose a ceiling nobody chose — which is how a
   * search for "rent in Whitefield" comes back empty. Untouched means unfiltered.
   */
  const [budgetTouched, setBudgetTouched] = useState(false)

  const scale = BUDGET[kind]

  /** Switching side of the market rescales the budget instead of clamping it. */
  function switchKind(next: ListingKind) {
    if (next === kind) return
    const ratio = (budget - scale.min) / (scale.max - scale.min)
    const nextScale = BUDGET[next]
    const rescaled = nextScale.min + ratio * (nextScale.max - nextScale.min)
    setKind(next)
    setBudget(Math.round(rescaled / nextScale.step) * nextScale.step)
  }

  function search() {
    const params = new URLSearchParams({ kind })
    if (budgetTouched) params.set('maxPrice', String(budget))
    if (locality) params.set('locality', locality)
    if (type !== 'any') params.set('type', type)
    router.push(`/listings?${params.toString()}`)
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        search()
      }}
    >
      <Card variant="elevated" padding="lg">
        <Card.Body>
          <Stack gap={4}>
            <ButtonGroup attached label="Buy or rent">
              <Button
                type="button"
                variant={kind === 'sale' ? 'solid' : 'outline'}
                aria-pressed={kind === 'sale'}
                onClick={() => switchKind('sale')}
              >
                Buy
              </Button>
              <Button
                type="button"
                variant={kind === 'rent' ? 'solid' : 'outline'}
                aria-pressed={kind === 'rent'}
                onClick={() => switchKind('rent')}
              >
                Rent
              </Button>
            </ButtonGroup>

            <Field label="Locality" help="Type to filter all twelve.">
              <Combobox
                options={localities.map((l) => ({ value: l.id, label: l.name }))}
                value={locality}
                onValueChange={setLocality}
                placeholder="Anywhere in Bengaluru"
                clearLabel="Clear locality"
              />
            </Field>

            <Field label="Property type">
              <Select
                value={type}
                onChange={(event) => setType(event.target.value)}
                options={[
                  { value: 'any', label: 'Any type' },
                  { value: 'apartment', label: 'Apartment' },
                  { value: 'villa', label: 'Villa' },
                  { value: 'plot', label: 'Plot' },
                ]}
              />
            </Field>

            <Stack gap={2}>
              <Stack direction="horizontal" justify="between" align="baseline" wrap>
                <Text as="span" size="sm" weight="medium">
                  {kind === 'sale' ? 'Budget' : 'Monthly rent'}
                  {budgetTouched ? ' up to' : ' — any'}
                </Text>
                <span
                  className="nf-price"
                  style={{ fontSize: 'var(--vk-text-xl)', opacity: budgetTouched ? 1 : 0.45 }}
                >
                  {kind === 'sale' ? formatCompactINR(budget) : formatINR(budget)}
                </span>
              </Stack>
              <Slider
                min={scale.min}
                max={scale.max}
                step={scale.step}
                value={budget}
                onValueChange={(value) => {
                  setBudget(value)
                  setBudgetTouched(true)
                }}
                formatValue={(value) => (kind === 'sale' ? formatCompactINR(value) : formatINR(value))}
                aria-label={kind === 'sale' ? 'Maximum budget' : 'Maximum monthly rent'}
              />
            </Stack>

            <Button type="submit" size="lg" fullWidth>
              Search homes
            </Button>
          </Stack>
        </Card.Body>
      </Card>
    </form>
  )
}
