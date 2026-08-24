/**
 * The six agents listings are attributed to. Portraits come from i.pravatar.cc,
 * which is deterministic per `img` index, so a rebuild does not reshuffle faces.
 */
export interface Agent {
  id: string
  name: string
  title: string
  avatar: string
  /** Locality ids this agent covers. */
  localities: string[]
  rating: number
  reviews: number
  /** Years working the Bengaluru market. */
  experience: number
  languages: string[]
  bio: string
  phone: string
  email: string
}

export const agents: Agent[] = [
  {
    id: 'ananya-rao',
    name: 'Ananya Rao',
    title: 'Principal consultant — East Bengaluru',
    avatar: 'https://i.pravatar.cc/320?img=45',
    localities: ['indiranagar', 'whitefield', 'bellandur'],
    rating: 4.8,
    reviews: 214,
    experience: 11,
    languages: ['English', 'Kannada', 'Hindi'],
    bio: 'Eleven years on the eastern corridor, most of it between Indiranagar and Whitefield. Ananya reads a khata certificate faster than most lawyers and will tell you when a project is not worth the site visit.',
    phone: '+91 98450 11234',
    email: 'ananya@nestfind.example',
  },
  {
    id: 'rohit-menon',
    name: 'Rohit Menon',
    title: 'Senior advisor — resale apartments',
    avatar: 'https://i.pravatar.cc/320?img=12',
    localities: ['koramangala', 'hsr-layout', 'sarjapur-road'],
    rating: 4.7,
    reviews: 189,
    experience: 9,
    languages: ['English', 'Malayalam', 'Hindi'],
    bio: 'Rohit works resale almost exclusively — the units that never reach a builder’s brochure. He has closed more than 300 transactions in the Koramangala–HSR belt and negotiates on the buyer’s side of the table.',
    phone: '+91 98860 44521',
    email: 'rohit@nestfind.example',
  },
  {
    id: 'kavya-shetty',
    name: 'Kavya Shetty',
    title: 'Villa and plot specialist',
    avatar: 'https://i.pravatar.cc/320?img=32',
    localities: ['yelahanka', 'hebbal', 'whitefield'],
    rating: 4.9,
    reviews: 156,
    experience: 13,
    languages: ['English', 'Kannada', 'Tulu'],
    bio: 'Land is a different trade from apartments, and Kavya has spent thirteen years in it. Title chains, BDA approvals, conversion orders — she checks all of it before a listing goes live.',
    phone: '+91 99005 78190',
    email: 'kavya@nestfind.example',
  },
  {
    id: 'imran-qureshi',
    name: 'Imran Qureshi',
    title: 'Rental portfolio manager',
    avatar: 'https://i.pravatar.cc/320?img=68',
    localities: ['electronic-city', 'jp-nagar', 'bellandur'],
    rating: 4.6,
    reviews: 243,
    experience: 7,
    languages: ['English', 'Hindi', 'Urdu'],
    bio: 'Imran manages roughly 90 rental units across south Bengaluru. If you want a place you can move into next week with the paperwork already sorted, he is the one to call.',
    phone: '+91 97400 32877',
    email: 'imran@nestfind.example',
  },
  {
    id: 'meera-krishnan',
    name: 'Meera Krishnan',
    title: 'Heritage and independent homes',
    avatar: 'https://i.pravatar.cc/320?img=26',
    localities: ['jayanagar', 'malleshwaram', 'jp-nagar'],
    rating: 4.8,
    reviews: 131,
    experience: 15,
    languages: ['English', 'Tamil', 'Kannada'],
    bio: 'Fifteen years selling the old blocks of Jayanagar and Malleshwaram. Meera knows which independent houses can take a second floor and which ones the BBMP will argue about.',
    phone: '+91 98801 65402',
    email: 'meera@nestfind.example',
  },
  {
    id: 'arjun-nair',
    name: 'Arjun Nair',
    title: 'New launches and pre-possession',
    avatar: 'https://i.pravatar.cc/320?img=51',
    localities: ['sarjapur-road', 'hebbal', 'electronic-city'],
    rating: 4.5,
    reviews: 178,
    experience: 8,
    languages: ['English', 'Hindi', 'Malayalam'],
    bio: 'Arjun tracks every RERA registration in the northern and south-eastern corridors. He will happily talk you out of an under-construction project whose completion date has already slipped twice.',
    phone: '+91 96860 20714',
    email: 'arjun@nestfind.example',
  },
]

const byId = new Map(agents.map((a) => [a.id, a]))

export function getAgent(id: string): Agent | undefined {
  return byId.get(id)
}
