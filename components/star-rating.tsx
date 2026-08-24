'use client'

import { Rating, Text, Stack } from '@the_viveksingh/vivek-ui'

/**
 * A read-only star rating with a name that says what is being rated.
 *
 * It exists as its own client component for one reason: `Rating`'s `formatLabel`
 * is a function, and functions cannot cross from a Server Component into a
 * client one. Passing the subject as a string and building the formatter here
 * keeps the accessible name specific ("Indiranagar rated 4.6 out of 5") instead
 * of falling back to a bare "4.6 of 5".
 */
export function StarRating({
  value,
  subject,
  count,
  countNoun = 'reviews',
}: {
  value: number
  /** What is being rated, e.g. a locality or an agent name. */
  subject: string
  /** How many people rated it. Omit to hide the tally. */
  count?: number
  countNoun?: string
}) {
  return (
    <Stack direction="horizontal" gap={2} align="center">
      <Rating
        value={value}
        readOnly
        allowHalf
        size="sm"
        formatLabel={(rated, max) => `${subject} rated ${rated} out of ${max}`}
      />
      <Text as="span" size="sm" tone="muted" className="nf-figure">
        {value.toFixed(1)}
        {count === undefined ? null : ` · ${count.toLocaleString('en-IN')} ${countNoun}`}
      </Text>
    </Stack>
  )
}
