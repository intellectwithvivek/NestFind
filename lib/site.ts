/**
 * Site-wide constants. One place to change before deploying a fork.
 *
 * `SITE_URL` is what `metadataBase`, every canonical, the sitemap, the OG image
 * URLs and every JSON-LD `@id` are built from — change it here and nothing else
 * needs touching.
 */
export const SITE_URL = 'https://nestfind.vivekkumarsingh.in'

export const SITE_NAME = 'NestFind'

export const SITE_TAGLINE = 'Bengaluru homes, priced honestly'

export const SITE_DESCRIPTION =
  'NestFind is a free, open-source real estate website template for Next.js 16 — 18 Bengaluru listings to buy or rent, locality price trends, an EMI calculator and a comparison table. Built with VivekUI.'

/** The campaign every outbound VivekUI link is tagged with. */
export const UTM_CAMPAIGN = 'realestate'

/**
 * Tags an outbound link so the traffic this template sends back is attributable.
 * `medium` names the surface the link sits on — footer, navbar, builtwith, readme.
 */
export function utm(url: string, medium: string): string {
  const target = new URL(url)
  target.searchParams.set('utm_source', 'vivekui-template')
  target.searchParams.set('utm_campaign', UTM_CAMPAIGN)
  target.searchParams.set('utm_medium', medium)
  return target.toString()
}

/** This template's own repository — the thing visitors are meant to clone. */
export const REPO = {
  url: 'https://github.com/intellectwithvivek/NestFind',
  name: 'intellectwithvivek/NestFind',
  clone: 'git clone https://github.com/intellectwithvivek/NestFind.git',
  /** One-click fork-and-deploy on Vercel. */
  deploy:
    'https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fintellectwithvivek%2FNestFind&project-name=nestfind&repository-name=nestfind',
} as const

export const VIVEKUI = {
  install: 'npm i @the_viveksingh/vivek-ui',
  docs: 'https://ui.vivekkumarsingh.in/docs',
  components: 'https://ui.vivekkumarsingh.in/docs/components',
  npm: 'https://www.npmjs.com/package/@the_viveksingh/vivek-ui',
  github: 'https://github.com/intellectwithvivek/vivek_UI',
  author: 'https://vivekkumarsingh.in/',
} as const

/** Deep link to one component's docs page, UTM-tagged for the /built-with table. */
export function componentDocs(name: string): string {
  return utm(`${VIVEKUI.components}/${name}`, 'builtwith')
}
