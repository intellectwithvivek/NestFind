import {
  Avatar,
  Badge,
  Breadcrumb,
  Card,
  Divider,
  Grid,
  Heading,
  Section,
  Stack,
  Text,
} from '@the_viveksingh/vivek-ui'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactAgent } from '@/components/contact-agent'
import { JsonLd } from '@/components/json-ld'
import { StarRating } from '@/components/star-rating'
import { agents } from '@/data/agents'
import { listings } from '@/data/listings'
import { getLocality } from '@/data/localities'
import { agentListJsonLd, breadcrumbJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Agents — six people, six patches of Bengaluru',
  description:
    'The six NestFind agents, each covering three localities rather than the whole city: their patch, their rating, how many listings they hold and what they actually specialise in.',
  alternates: { canonical: '/agents' },
  openGraph: {
    title: 'Agents — six people, six patches of Bengaluru | NestFind',
    description:
      'Each agent covers three localities rather than the whole city. Ratings, specialisms and listing counts.',
    url: '/agents',
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

/** How many live listings each agent is carrying, counted from the data itself. */
function listingCount(agentId: string): number {
  return listings.filter((listing) => listing.agentId === agentId).length
}

export default function AgentsPage() {
  return (
    <>
      <JsonLd
        data={[
          agentListJsonLd(agents),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Agents', path: '/agents' },
          ]),
        ]}
      />

      <Section padding="lg" size="xl" className="nf-blueprint">
        <Stack gap={4}>
          <Breadcrumb size="sm" items={[{ label: 'Home', href: '/' }, { label: 'Agents' }]} />
          <Heading level={1} size="2xl">
            Six agents, six patches
          </Heading>
          <Text size="lg" tone="muted" style={{ maxInlineSize: '56ch' }}>
            Nobody here claims to cover all of Bengaluru. Each of these six works three localities
            and knows which streets flood, which associations argue and which builders slip their
            dates. Between them: 63 years on this market.
          </Text>
        </Stack>
      </Section>

      <Section padding="xl" size="xl">
        <Grid minItemWidth="21rem" gap={6}>
          {agents.map((agent) => (
            <Card key={agent.id} variant="outline" padding="lg" className="nf-card" id={agent.id}>
              <Card.Body>
                <Stack gap={4}>
                  <Stack direction="horizontal" gap={4} align="center">
                    <Avatar src={agent.avatar} name={agent.name} size="xl" />
                    <Stack gap={1}>
                      <Heading level={2} size="md">
                        {agent.name}
                      </Heading>
                      <Text size="sm" tone="muted">
                        {agent.title}
                      </Text>
                      <StarRating value={agent.rating} subject={agent.name} count={agent.reviews} />
                    </Stack>
                  </Stack>

                  <Divider />

                  <dl className="nf-facts" style={{ paddingBlock: 0, border: 0 }}>
                    <div className="nf-fact">
                      <dt>Listings</dt>
                      <dd>{listingCount(agent.id)}</dd>
                    </div>
                    <div className="nf-fact">
                      <dt>Experience</dt>
                      <dd>{agent.experience} yrs</dd>
                    </div>
                    <div className="nf-fact">
                      <dt>Languages</dt>
                      <dd style={{ fontSize: 'var(--vk-text-sm)' }}>{agent.languages.join(', ')}</dd>
                    </div>
                  </dl>

                  <Stack gap={2}>
                    <Text as="span" size="sm" weight="medium">
                      Covers
                    </Text>
                    <Stack direction="horizontal" gap={2} wrap>
                      {agent.localities.map((id) => (
                        <Badge key={id} tone="primary" variant="soft" size="md">
                          {getLocality(id)?.name ?? id}
                        </Badge>
                      ))}
                    </Stack>
                  </Stack>

                  <Text size="sm" tone="muted">
                    {agent.bio}
                  </Text>

                  <Stack
                    direction="horizontal"
                    gap={3}
                    wrap
                    style={{ marginBlockStart: 'auto' }}
                  >
                    <ContactAgent
                      agentName={agent.name}
                      subject={`${agent.localities
                        .map((id) => getLocality(id)?.name ?? id)
                        .join(', ')}`}
                      trigger={`Contact ${agent.name.split(' ')[0]}`}
                    />
                    <Text as="span" size="sm" tone="muted" className="nf-figure">
                      {agent.phone}
                    </Text>
                  </Stack>
                </Stack>
              </Card.Body>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section padding="lg" size="lg" background="muted">
        <Text align="center" tone="muted">
          Every agent, review and phone number on this page is invented — it is a template.{' '}
          <Link href="/listings">Browse the listings</Link> or{' '}
          <Link href="/built-with">see how the page was built</Link>.
        </Text>
      </Section>
    </>
  )
}
