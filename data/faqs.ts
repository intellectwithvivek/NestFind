import { priceGrowth, trendingLocalities } from './localities'

/**
 * One question and its answer, as plain text.
 *
 * Deliberately a string rather than a node: the same value is rendered on the page
 * and emitted into the `FAQPage` JSON-LD, and keeping one source means the answer a
 * crawler reads can never drift from the answer a visitor reads.
 */
export interface FaqEntry {
  id: string
  question: string
  answer: string
}

/** "Whitefield (+47%), Sarjapur Road (+51%) and Hebbal (+42%)" — built from the series. */
function trendingSentence(): string {
  const top = trendingLocalities(3)
  const parts = top.map((locality) => `${locality.name} (+${priceGrowth(locality)}%)`)
  return `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`
}

export const faqs: FaqEntry[] = [
  {
    id: 'verified',
    question: 'Are these listings verified?',
    answer:
      'No — every property, price, agent and review on NestFind is invented. This is a free open-source website template, not a working marketplace, and the eighteen Bengaluru listings exist so you can see how a real one would look before you wire up your own data. Replace data/listings.ts with your feed and the whole site follows.',
  },
  {
    id: 'brokerage',
    question: 'What are the brokerage charges?',
    answer:
      'On the demo, nothing at all — no money changes hands anywhere on this template. For reference, brokerage in Bengaluru usually runs at one month’s rent on a residential letting, split between landlord and tenant or paid by one of them, and at 1–2% of the consideration on a sale. If you fork this template for a live business, put your own numbers here.',
  },
  {
    id: 'emi',
    question: 'How is the EMI calculated?',
    answer:
      'With the standard reducing-balance formula every Indian lender quotes: E = P × r × (1 + r)^n ÷ ((1 + r)^n − 1), where P is the loan amount, r is the annual interest rate divided by twelve hundred, and n is the tenure in months. The calculator on each listing page recomputes it live as you move the sliders, and the pie chart beside it splits the total you would repay into principal and interest.',
  },
  {
    id: 'trending',
    question: 'Which localities are trending in Bengaluru?',
    answer: `On the illustrative five-year series behind this template, the steepest ₹/sq ft growth since 2021 is in ${trendingSentence()}. Every listing page plots its own locality on a line chart under the "Price trend" tab, with the change since 2021 spelled out in a sentence underneath, so you can see the shape rather than take the number on trust.`,
  },
  {
    id: 'rent-or-buy',
    question: 'Can I filter for rentals only?',
    answer:
      'Yes. The Buy / Rent toggle on the homepage carries through to the listings page, and the filter rail there adds price, bedrooms, amenities, keywords and a "ready to move" switch on top of it. Eleven of the eighteen listings are for sale and seven are to let.',
  },
  {
    id: 'template',
    question: 'Can I use this template for my own site?',
    answer:
      'Yes — it is MIT licensed and free for any use, commercial included. Clone the repository, replace the mock data and the copy, and deploy. The credit in the footer is removable, though a star on the VivekUI repository is appreciated if the component library saved you time.',
  },
]
