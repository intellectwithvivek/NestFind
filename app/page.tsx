import {
  AnimatedCounter,
  Avatar,
  Badge,
  Button,
  Card,
  Container,
  CTA,
  FAQ,
  Grid,
  Heading,
  Section,
  Stack,
  Stats,
  Stepper,
  Testimonials,
  Text,
} from '@the_viveksingh/vivek-ui'
import type { Metadata } from 'next'
import Link from 'next/link'
import { HeroSearch } from '@/components/hero-search'
import { JsonLd } from '@/components/json-ld'
import { ListingCard } from '@/components/listing-card'
import { StarRating } from '@/components/star-rating'
import { agents } from '@/data/agents'
import { faqs } from '@/data/faqs'
import { listings } from '@/data/listings'
import { getLocality, localities } from '@/data/localities'
import { reviews } from '@/data/testimonials'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/jsonld'
import { SITE_DESCRIPTION } from '@/lib/site'

export const metadata: Metadata = {
  // The one page whose title is fixed by the brief, so it opts out of the template.
  title: { absolute: 'Free Real Estate Website Template (Next.js) — NestFind | VivekUI' },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
}

/** Six listings for the homepage: the new ones first, then the rest by price. */
const featured = [...listings]
  .sort((a, b) => Number(b.isNew) - Number(a.isNew) || b.price - a.price)
  .slice(0, 6)

const STEPS = [
  {
    label: 'Set a budget',
    description: 'Move one slider. Buy and rent have their own scale, so you never hunt for the range.',
  },
  {
    label: 'Read the locality',
    description: 'Every listing page plots five years of ₹/sq ft for its locality, with the change spelled out.',
  },
  {
    label: 'Compare on the numbers',
    description: 'Put shortlisted properties in one table — price, area, maintenance, possession, side by side.',
  },
  {
    label: 'Run the EMI',
    description: 'Loan amount, rate and tenure on three sliders, with the interest you would pay drawn as a slice.',
  },
]

export default function HomePage() {
  const featuredAgents = agents.slice(0, 4)

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: 'Home', path: '/' }]), faqJsonLd(faqs)]} />

      {/* ------------------------------------------------------------ hero */}
      <Section
        as="div"
        padding="xl"
        size="xl"
        className="nf-blueprint nf-blueprint-fade"
        aria-labelledby="hero-title"
      >
        <Grid cols={{ base: 1, lg: 2 }} gap={12} style={{ alignItems: 'center' }}>
          <Stack gap={6}>
            <Badge tone="primary" variant="soft" pill size="md">
              Free · open source · MIT
            </Badge>
            <Heading level={1} size="hero" id="hero-title">
              Bengaluru homes, priced in the open.
            </Heading>
            <Text size="lg" tone="muted">
              Eighteen properties to buy or rent across twelve localities — each one with five years
              of ₹ per square foot behind it, a maintenance figure that is not hidden, and an EMI you
              can work out before you call anyone.
            </Text>
            <Stack direction="horizontal" gap={3} wrap>
              <Button asChild size="lg">
                <Link href="/listings">Browse all 18 listings</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/built-with">See how it was built</Link>
              </Button>
            </Stack>
            <Text size="sm" tone="muted">
              A demonstration template. Every listing, price and agent here is fictional.
            </Text>
          </Stack>

          <HeroSearch localities={localities} />
        </Grid>
      </Section>

      {/* ------------------------------------------------------- featured */}
      <Section padding="xl" size="xl">
        <Section.Header
          eyebrow="Featured"
          title="Six worth a second look"
          description="The newest listings first, then the ones that best repay a site visit."
        />
        <Grid minItemWidth="19rem" gap={6} style={{ marginBlockStart: 'var(--vk-space-8)' }}>
          {featured.map((listing, index) => (
            <ListingCard key={listing.slug} listing={listing} priority={index < 3} />
          ))}
        </Grid>
        <Stack align="center" style={{ marginBlockStart: 'var(--vk-space-10)' }}>
          <Button asChild variant="outline" size="lg">
            <Link href="/listings">See every listing</Link>
          </Button>
        </Stack>
      </Section>

      {/* ---------------------------------------------------------- stats */}
      <Stats
        padding="lg"
        size="xl"
        background="muted"
        title="What is on NestFind right now"
        headingLevel={2}
        items={[
          {
            id: 'listings',
            value: <AnimatedCounter value={listings.length} locale="en-IN" duration={1200} />,
            label: 'Listings',
            description: 'Eleven to buy, seven to let',
          },
          {
            id: 'localities',
            value: <AnimatedCounter value={localities.length} locale="en-IN" duration={1200} />,
            label: 'Localities',
            description: 'Each with a five-year price series',
          },
          {
            id: 'families',
            value: (
              <AnimatedCounter value={4218} locale="en-IN" duration={1600} format={{ useGrouping: true }} />
            ),
            label: 'Families housed',
            description: 'Since the (fictional) doors opened',
          },
          {
            id: 'agents',
            value: <AnimatedCounter value={agents.length} locale="en-IN" duration={1000} />,
            label: 'Agents',
            description: 'Between them, 63 years on this market',
          },
        ]}
      />

      {/* -------------------------------------------------- how it works */}
      <Section padding="xl" size="lg">
        <Section.Header
          eyebrow="How it works"
          title="Four steps, no phone call until you want one"
          description="Everything that would normally take a site visit to find out is on the listing page."
        />
        <div className="nf-steps" style={{ marginBlockStart: 'var(--vk-space-8)' }}>
          <Stepper steps={STEPS} activeStep={3} label="How NestFind works" size="md" />
        </div>
      </Section>

      {/* --------------------------------------------------------- agents */}
      <Section padding="xl" size="xl" background="muted">
        <Section.Header
          eyebrow="Agents"
          title="Six people, each with one patch of the city"
          description="Nobody here covers all of Bengaluru, which is the point."
        />
        <Grid minItemWidth="16rem" gap={6} style={{ marginBlockStart: 'var(--vk-space-8)' }}>
          {featuredAgents.map((agent) => (
            <Card key={agent.id} variant="outline" padding="lg" className="nf-card">
              <Card.Body>
                <Stack gap={3} align="start">
                  <Avatar src={agent.avatar} name={agent.name} size="lg" />
                  <Stack gap={1}>
                    <Heading level={3} size="sm">
                      {agent.name}
                    </Heading>
                    <Text size="sm" tone="muted">
                      {agent.title}
                    </Text>
                  </Stack>
                  <Stack direction="horizontal" gap={2} wrap>
                    {agent.localities.map((id) => (
                      <Badge key={id} tone="neutral" variant="soft" size="sm">
                        {getLocality(id)?.name ?? id}
                      </Badge>
                    ))}
                  </Stack>
                  <StarRating value={agent.rating} subject={agent.name} count={agent.reviews} />
                </Stack>
              </Card.Body>
            </Card>
          ))}
        </Grid>
        <Stack align="center" style={{ marginBlockStart: 'var(--vk-space-10)' }}>
          <Button asChild variant="outline">
            <Link href="/agents">Meet all six agents</Link>
          </Button>
        </Stack>
      </Section>

      {/* --------------------------------------------------- testimonials */}
      <Testimonials
        padding="xl"
        size="xl"
        eyebrow="Reviews"
        title="What people said afterwards"
        headingLevel={2}
        items={reviews.map((review) => ({
          id: review.id,
          quote: review.quote,
          author: review.author,
          role: review.role,
          avatar: review.avatar,
        }))}
      />

      {/* ------------------------------------------------------------ faq */}
      <FAQ
        padding="xl"
        size="md"
        background="muted"
        name="home-faq"
        eyebrow="FAQ"
        title="Questions worth answering honestly"
        headingLevel={2}
        defaultOpenIndex={0}
        items={faqs.map((faq) => ({ id: faq.id, question: faq.question, answer: faq.answer }))}
      />

      {/* ------------------------------------------------------------ cta */}
      <CTA
        padding="xl"
        size="lg"
        background="primary"
        title="List your property"
        description="On the real thing this would open a form. Here it is a link to the source, which is arguably more useful."
        actions={
          <>
            <Button asChild size="lg" variant="solid">
              <Link href="/agents">Talk to an agent</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/built-with">Use this template</Link>
            </Button>
          </>
        }
      />

      <Container size="xl" style={{ paddingBlock: 'var(--vk-space-8)' }}>
        <Text size="sm" tone="muted" align="center">
          NestFind is a demonstration of{' '}
          <Link href="/built-with">what VivekUI can build</Link> — 91 components and 6 charts, one
          install, zero runtime dependencies.
        </Text>
      </Container>
    </>
  )
}
