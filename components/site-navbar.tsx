'use client'

import { Badge, Navbar, ThemeToggle } from '@the_viveksingh/vivek-ui'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Logo } from './logo'
import { RepoLink } from './repo'
import { utm, VIVEKUI } from '@/lib/site'

const LINKS = [
  { href: '/listings', label: 'Listings' },
  { href: '/listings?kind=rent', label: 'Rent' },
  { href: '/agents', label: 'Agents' },
  { href: '/built-with', label: 'Built with' },
] as const

function NavbarLinks() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const renting = searchParams.get('kind') === 'rent'

  /**
   * Which link is "you are here".
   *
   * Two entries point at the same path and differ only by query string, so
   * `startsWith` marks both — which is how "Rent" ended up current on every
   * listing page. The rent link owns `/listings?kind=rent` exactly; the
   * listings link owns the rest of the section, detail pages included.
   */
  function isCurrent(href: string): boolean {
    if (href === '/listings?kind=rent') return pathname === '/listings' && renting
    if (href === '/listings') return pathname.startsWith('/listings') && !renting
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <Navbar.Links>
      {LINKS.map((link) => (
        <Navbar.Link key={link.href} asChild active={isCurrent(link.href)}>
          <Link href={link.href}>{link.label}</Link>
        </Navbar.Link>
      ))}
    </Navbar.Links>
  )
}

/**
 * The top bar.
 *
 * A client component because `Navbar` owns the mobile sheet's state and the
 * active link is derived from the current URL. `useSearchParams` needs a
 * Suspense boundary so it does not opt every page into client-side rendering;
 * the fallback is the same list with nothing marked current.
 */
export function SiteNavbar() {
  return (
    <Navbar sticky container="xl" aria-label="Primary">
      <Navbar.Brand asChild>
        <Link href="/" aria-label="NestFind — home">
          <Logo size={26} />
        </Link>
      </Navbar.Brand>

      <Suspense
        fallback={
          <Navbar.Links>
            {LINKS.map((link) => (
              <Navbar.Link key={link.href} asChild>
                <Link href={link.href}>{link.label}</Link>
              </Navbar.Link>
            ))}
          </Navbar.Links>
        }
      >
        <NavbarLinks />
      </Suspense>

      <Navbar.Actions>
        <a
          className="nf-navbar-badge"
          href={utm(VIVEKUI.docs, 'navbar')}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <Badge tone="primary" variant="soft" pill>
            ⚡ Built with VivekUI
          </Badge>
        </a>
        <RepoLink />
        <ThemeToggle mode="cycle" size="sm" />
        <Navbar.Toggle />
      </Navbar.Actions>
    </Navbar>
  )
}
