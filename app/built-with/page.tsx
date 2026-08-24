import {
  Alert,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Code,
  CopyButton,
  Grid,
  Heading,
  Section,
  Stack,
  Table,
  Text,
} from '@the_viveksingh/vivek-ui'
import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/json-ld'
import { componentUses, docsLink } from '@/data/component-map'
import { breadcrumbJsonLd, templateJsonLd } from '@/lib/jsonld'
import { REPO, utm, VIVEKUI } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Built with VivekUI',
  description:
    'Every section of NestFind mapped to the VivekUI component behind it, deep-linked to its documentation. 47 components and 2 charts, one install, zero runtime dependencies.',
  alternates: { canonical: '/built-with' },
  openGraph: {
    title: 'Built with VivekUI | NestFind',
    description:
      'Every section of this real estate template mapped to the VivekUI component behind it, with a link to each component’s docs.',
    url: '/built-with',
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

const chartCount = componentUses.filter((use) => use.area === 'charts').length
const componentCount = componentUses.length - chartCount

export default function BuiltWithPage() {
  return (
    <>
      <JsonLd
        data={[
          templateJsonLd(),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Built with VivekUI', path: '/built-with' },
          ]),
        ]}
      />

      <Section padding="lg" size="lg" className="nf-blueprint">
        <Stack gap={4}>
          <Breadcrumb
            size="sm"
            items={[{ label: 'Home', href: '/' }, { label: 'Built with VivekUI' }]}
          />
          <Heading level={1} size="2xl">
            Built with VivekUI
          </Heading>
          <Text size="lg">
            This entire website is built with VivekUI, a free React component library with zero
            runtime dependencies.
          </Text>
          <Text tone="muted">
            No Tailwind, no shadcn, no MUI, no CSS-in-JS. {componentCount} components and{' '}
            {chartCount} charts, all from one package, styled through CSS custom properties in a
            single stylesheet of our own.
          </Text>

          <div className="nf-install">
            <Code>{VIVEKUI.install}</Code>
            <CopyButton value={VIVEKUI.install} size="sm" variant="ghost" />
          </div>

          <Stack direction="horizontal" gap={3} wrap style={{ marginBlockStart: 'var(--vk-space-2)' }}>
            <Button asChild size="lg">
              <a href={utm(VIVEKUI.docs, 'builtwith')} target="_blank" rel="noopener noreferrer">
                Read the Docs
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={VIVEKUI.github} target="_blank" rel="noopener noreferrer">
                Star on GitHub
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={REPO.url} target="_blank" rel="noopener noreferrer">
                Use this template
              </a>
            </Button>
          </Stack>
        </Stack>
      </Section>

      <Section padding="xl" size="xl">
        <Section.Header
          eyebrow="The map"
          title="Every section, and the component behind it"
          description="Each name links to its documentation page, which carries a live example, the code in TypeScript and JavaScript, and a props table generated from the package's own type declarations."
          headingLevel={2}
        />

        <div className="nf-scroll-x" style={{ marginBlockStart: 'var(--vk-space-8)' }}>
          <Table size="sm" hoverable striped>
            <Table.Caption visuallyHidden>
              Each part of NestFind and the VivekUI component that builds it.
            </Table.Caption>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell scope="col">Component</Table.HeaderCell>
                <Table.HeaderCell scope="col">Where it does the work</Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {componentUses.map((use) => (
                <Table.Row key={use.name}>
                  <Table.HeaderCell scope="row" style={{ whiteSpace: 'nowrap' }}>
                    <a
                      className="nf-textlink"
                      href={docsLink(use)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {use.name}
                    </a>
                    {use.area === 'charts' ? (
                      <>
                        {' '}
                        <Badge tone="primary" variant="soft" size="sm">
                          chart
                        </Badge>
                      </>
                    ) : null}
                  </Table.HeaderCell>
                  <Table.Cell label="Where it does the work">{use.where}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>

        <Alert
          tone="info"
          variant="soft"
          title="The charts are not a separate install"
          style={{ marginBlockStart: 'var(--vk-space-8)' }}
        >
          The <strong>LineChart</strong> plotting five years of ₹/sq ft and the{' '}
          <strong>PieChart</strong> splitting your EMI into principal and interest ship in the same
          package as the sliders that drive them — imported from{' '}
          <Code>@the_viveksingh/vivek-ui/charts</Code> with one extra CSS import, so an app with no
          charts pays nothing for them. Pure inline SVG, no charting dependency, and each renders a
          visually hidden table of the real numbers underneath for screen readers.
        </Alert>
      </Section>

      <Section padding="xl" size="lg" background="muted">
        <Section.Header
          eyebrow="Also worth knowing"
          title="What using one package actually bought"
          headingLevel={2}
        />
        <Grid minItemWidth="17rem" gap={6} style={{ marginBlockStart: 'var(--vk-space-8)' }}>
          {[
            {
              title: 'One install, one import',
              body: 'npm install, then a single CSS import in app/layout.tsx. No config file, no CLI, no code generation, no PostCSS plugin.',
            },
            {
              title: 'Server components by default',
              body: '49 of the 91 components carry no "use client". The listing gallery, the price chart and the whole footer render on the server.',
            },
            {
              title: 'Accessibility that came with it',
              body: 'IconButton refuses to compile without an aria-label, the FAQ is native <details>, and the charts publish a real data table for screen readers.',
            },
            {
              title: 'Restyled from one file',
              body: 'Every library selector is wrapped in :where(), so a flat class of ours wins with no !important. The blue accent and the blueprint grid are token overrides in globals.css.',
            },
          ].map((item) => (
            <Card key={item.title} variant="outline" padding="lg">
              <Card.Body>
                <Stack gap={2}>
                  <Heading level={3} size="sm">
                    {item.title}
                  </Heading>
                  <Text size="sm" tone="muted">
                    {item.body}
                  </Text>
                </Stack>
              </Card.Body>
            </Card>
          ))}
        </Grid>

        <Stack align="center" gap={4} style={{ marginBlockStart: 'var(--vk-space-10)' }}>
          <Text align="center" tone="muted">
            Fork it, replace <Code>data/listings.ts</Code>, change the copy, deploy. MIT licensed —
            the credit in the footer is removable.
          </Text>
          <Stack direction="horizontal" gap={3} wrap justify="center">
            <Button asChild>
              <a href={REPO.url} target="_blank" rel="noopener noreferrer">
                Use this template
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link href="/listings">Back to the listings</Link>
            </Button>
          </Stack>
        </Stack>
      </Section>
    </>
  )
}
