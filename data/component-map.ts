import { utm, VIVEKUI } from '@/lib/site'

/**
 * The section → component map behind /built-with.
 *
 * `slug` is the docs page, and it is kebab-case of the component name in every
 * case, so a typo here is a 404 rather than a silent mislink. Charts sit under
 * `/docs/charts/` rather than `/docs/components/`, which is what `area` records.
 */
export interface ComponentUse {
  /** Exported name, as you would import it. */
  name: string
  /** Docs page slug. */
  slug: string
  area?: 'components' | 'charts'
  /** Where on this site it does its work. */
  where: string
}

export const componentUses: ComponentUse[] = [
  { name: 'Navbar', slug: 'navbar', where: 'Site header, with the mobile sheet and active-link state' },
  { name: 'ThemeToggle', slug: 'theme-toggle', where: 'Light / dark / system switch in the header' },
  { name: 'ThemeProvider', slug: 'theme-provider', where: 'Owns the theme and persists it, no flash on load' },
  { name: 'Badge', slug: 'badge', where: '“For sale”, “New”, amenity chips, the header’s VivekUI badge' },
  { name: 'Combobox', slug: 'combobox', where: 'Locality picker in the hero search card' },
  { name: 'Select', slug: 'select', where: 'Property type, bedrooms and the results sort order' },
  { name: 'ButtonGroup', slug: 'button-group', where: 'Buy / Rent segmented control, hero and filter rail' },
  { name: 'Slider', slug: 'slider', where: 'Hero budget, the filter rail price range, all three EMI inputs' },
  { name: 'Button', slug: 'button', where: 'Every action, including the ones that are really links' },
  { name: 'IconButton', slug: 'icon-button', where: 'The save heart on each listing card' },
  { name: 'Card', slug: 'card', where: 'Listings, agents, the search card, the price and EMI panels' },
  { name: 'Grid', slug: 'grid', where: 'Every results and agent grid, reflowing with no breakpoint props' },
  { name: 'Rating', slug: 'rating', where: 'Locality and agent ratings, read-only' },
  { name: 'AnimatedCounter', slug: 'animated-counter', where: 'Homepage stats and the live EMI figure' },
  { name: 'Stats', slug: 'stats', where: 'The four headline figures on the homepage' },
  { name: 'Stepper', slug: 'stepper', where: '“How it works”, four steps' },
  { name: 'Avatar', slug: 'avatar', where: 'Agent portraits on the homepage, /agents and each listing' },
  { name: 'Testimonials', slug: 'testimonials', where: 'Reviews section on the homepage' },
  { name: 'FAQ', slug: 'faq', where: 'Homepage FAQ — native <details>, no JavaScript' },
  { name: 'CTA', slug: 'cta', where: '“List your property” at the foot of the homepage' },
  { name: 'Footer', slug: 'footer', where: 'Site footer on every page' },
  { name: 'Checkbox', slug: 'checkbox', where: 'Amenity filters in the /listings rail' },
  { name: 'TagInput', slug: 'tag-input', where: 'Keyword filter in the /listings rail' },
  { name: 'Switch', slug: 'switch', where: '“Ready to move” toggle in the /listings rail' },
  { name: 'Tabs', slug: 'tabs', where: 'Grid / Compare on /listings; the four tabs on a listing page' },
  { name: 'DataTable', slug: 'data-table', where: 'The Compare view — sortable, paginated, stacks on narrow screens' },
  { name: 'Pagination', slug: 'pagination', where: 'Below the results grid' },
  { name: 'EmptyState', slug: 'empty-state', where: 'When the filters match nothing' },
  { name: 'Carousel', slug: 'carousel', where: 'Photo gallery at the top of each listing' },
  { name: 'LineChart', slug: 'line-chart', area: 'charts', where: 'Locality price trend — ₹/sq ft over five years' },
  { name: 'PieChart', slug: 'pie-chart', area: 'charts', where: 'Principal-versus-interest split in the EMI calculator' },
  { name: 'MapEmbed', slug: 'map-embed', where: 'Location tab — OpenStreetMap, no consent gate needed' },
  { name: 'Modal', slug: 'modal', where: 'Contact-agent dialog on listings and /agents' },
  { name: 'Field', slug: 'field', where: 'Label, hint and error wiring on every form control' },
  { name: 'Input', slug: 'input', where: 'Name and email in the contact form' },
  { name: 'Textarea', slug: 'textarea', where: 'Message body in the contact form' },
  { name: 'Alert', slug: 'alert', where: '“Estimate only” notice under the EMI calculator' },
  { name: 'Toast', slug: 'toast', where: 'Saved-listing and enquiry-sent confirmations' },
  { name: 'Breadcrumb', slug: 'breadcrumb', where: 'Trail on /listings, each listing and /agents' },
  { name: 'Table', slug: 'table', where: 'The section-to-component map on this very page' },
  { name: 'Prose', slug: 'prose', where: 'Listing description copy in the Overview tab' },
  { name: 'Section', slug: 'section', where: 'Every page band, with its own heading block' },
  { name: 'Container', slug: 'container', where: 'Width cap on the closing note' },
  { name: 'Stack', slug: 'stack', where: 'Nearly every vertical and horizontal rhythm on the site' },
  { name: 'Heading', slug: 'heading', where: 'Every heading, with level and visual size set separately' },
  { name: 'Text', slug: 'text', where: 'Body copy throughout' },
  { name: 'Divider', slug: 'divider', where: 'Rules inside listing and agent cards' },
  { name: 'Code', slug: 'code', where: 'The install command in the footer and on this page' },
  { name: 'CopyButton', slug: 'copy-button', where: 'Beside every install command' },
]

/** UTM-tagged docs link for one entry. */
export function docsLink(use: ComponentUse): string {
  return utm(`${VIVEKUI.docs}/${use.area ?? 'components'}/${use.slug}`, 'builtwith')
}
