import { Button, EmptyState, Section, Stack } from '@the_viveksingh/vivek-ui'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <Section padding="xl" size="md" className="nf-blueprint">
      <EmptyState
        size="lg"
        headingLevel={1}
        icon={<span style={{ fontSize: '3rem' }}>🔑</span>}
        title="No property at this address"
        description="The listing may have been taken off the market, or the link may have a typo in it. There are eighteen others."
        actions={
          <Stack direction="horizontal" gap={3} wrap justify="center">
            <Button asChild>
              <Link href="/listings">Browse all listings</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Back to the homepage</Link>
            </Button>
          </Stack>
        }
      />
    </Section>
  )
}
