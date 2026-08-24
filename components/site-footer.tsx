import { Footer, Stack, Text } from '@the_viveksingh/vivek-ui'
import { Logo } from './logo'
import { CommandBlock } from './repo'
import { REPO, SITE_NAME, utm, VIVEKUI } from '@/lib/site'

/**
 * The promotion kit's first surface: the credit, the install command and the
 * four UTM-tagged links, on every page of the site.
 *
 * A Server Component. Only `CopyButton` crosses to the client, and it carries
 * its own `'use client'`, so nothing else here ships JavaScript.
 */
export function SiteFooter() {
  return (
    <Footer
      size="xl"
      background="muted"
      navLabel="Footer"
      brand={
        <Stack gap={3}>
          <Logo size={30} />
          <Text tone="muted" size="sm">
            Built with ❤️ using VivekUI — 91 React components · 6 SVG charts · zero runtime
            dependencies. One install, one CSS import, no config.
          </Text>
          <CommandBlock
            label="Clone this template"
            command={REPO.clone}
            copyLabel="Clone command copied"
          />
          <CommandBlock
            label="Install the component library"
            command={VIVEKUI.install}
            copyLabel="Install command copied"
          />
        </Stack>
      }
      columns={[
        {
          title: 'Browse',
          links: [
            { label: 'All listings', href: '/listings' },
            { label: 'For sale', href: '/listings?kind=sale' },
            { label: 'For rent', href: '/listings?kind=rent' },
            { label: 'Agents', href: '/agents' },
          ],
        },
        {
          title: 'This template',
          links: [
            { label: 'Built with VivekUI', href: '/built-with' },
            { label: 'Use this template', href: REPO.url, target: '_blank' },
            { label: 'llms.txt', href: '/llms.txt' },
          ],
        },
        {
          title: 'VivekUI',
          links: [
            { label: 'Docs', href: utm(VIVEKUI.docs, 'footer'), target: '_blank' },
            { label: 'npm', href: VIVEKUI.npm, target: '_blank' },
            { label: 'GitHub', href: VIVEKUI.github, target: '_blank' },
            { label: 'Author — Vivek Kumar Singh', href: utm(VIVEKUI.author, 'footer'), target: '_blank' },
          ],
        },
      ]}
      copyright={`© ${SITE_NAME} — a free, open-source Next.js template. Every listing, price and agent on this site is fictional.`}
    />
  )
}
