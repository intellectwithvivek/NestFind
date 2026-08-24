/** Invented reviews, like everything else on this template. */
export interface Review {
  id: string
  quote: string
  author: string
  role: string
  avatar: string
}

export const reviews: Review[] = [
  {
    id: 'sneha',
    quote:
      'The price-trend chart is the thing I actually used. Seeing HSR go up 46% in five years told me more than any agent’s pitch, and it is on every listing page rather than buried in a report.',
    author: 'Sneha Prabhu',
    role: 'Bought in HSR Layout',
    avatar: 'https://i.pravatar.cc/160?img=47',
  },
  {
    id: 'vikram',
    quote:
      'I compared four flats side by side in the compare table and three of them lost on maintenance cost alone. That column does not exist on any other portal I looked at.',
    author: 'Vikram Iyer',
    role: 'Bought in Whitefield',
    avatar: 'https://i.pravatar.cc/160?img=14',
  },
  {
    id: 'fatima',
    quote:
      'The EMI calculator showing interest as a slice of a pie rather than a number was quietly brutal. I dropped my tenure from twenty-five years to eighteen after looking at it.',
    author: 'Fatima Sheikh',
    role: 'Bought in Hebbal',
    avatar: 'https://i.pravatar.cc/160?img=23',
  },
  {
    id: 'daniel',
    quote:
      'Filtering by “pet friendly” and having it actually mean something on the agreement saved me three wasted viewings. Small thing, entirely the point.',
    author: 'Daniel Fernandes',
    role: 'Renting in Koramangala',
    avatar: 'https://i.pravatar.cc/160?img=60',
  },
]
