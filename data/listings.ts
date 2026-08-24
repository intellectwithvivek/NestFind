import { getLocality, type Locality } from './localities'

/** Everything a filter, a badge or a schema needs to know about a property. */
export type ListingKind = 'sale' | 'rent'
export type PropertyType = 'apartment' | 'villa' | 'plot'

/**
 * The closed amenity set. Filters read this array directly, so adding an amenity
 * to a listing that is not in here is a compile error rather than a dead checkbox.
 */
export const AMENITIES = [
  'Gym',
  'Swimming pool',
  'Clubhouse',
  'Covered parking',
  'Power backup',
  '24×7 security',
  'Children’s play area',
  'Lift',
  'Piped gas',
  'Rainwater harvesting',
  'Landscaped garden',
  'Jogging track',
  'Pet friendly',
  'EV charging',
  'Indoor games',
] as const

export type Amenity = (typeof AMENITIES)[number]

/** The amenities worth putting on the filter rail — the ones people actually filter by. */
export const FILTERABLE_AMENITIES: Amenity[] = [
  'Gym',
  'Swimming pool',
  'Clubhouse',
  'Covered parking',
  'Power backup',
  'Pet friendly',
  'EV charging',
  'Piped gas',
]

/**
 * One gallery photo. `view` names what the frame shows, and the alt text is derived
 * from it plus the listing, so every image gets a description that is both unique
 * and true without seventy hand-written strings drifting out of sync.
 */
export interface ListingImage {
  /** Unsplash photo id, without the `photo-` prefix. */
  photo: string
  view: string
}

export interface Listing {
  slug: string
  title: string
  /** Street-level address line, shown under the title. */
  address: string
  localityId: string
  kind: ListingKind
  type: PropertyType
  /** Rupees. A total for `sale`, a monthly figure for `rent`. */
  price: number
  /** Monthly maintenance in rupees, or `0` for plots. */
  maintenance: number
  beds: number
  baths: number
  balconies: number
  /** Super built-up area in square feet. */
  sqft: number
  floor: string
  facing: string
  /** "Ready to move", "Mar 2027" and so on. */
  possession: string
  furnishing: 'Unfurnished' | 'Semi-furnished' | 'Fully furnished'
  parking: number
  ageYears: number
  readyToMove: boolean
  isNew: boolean
  amenities: Amenity[]
  /** Three or four scannable selling points. */
  highlights: string[]
  /** Body copy for the Overview tab, one string per paragraph. */
  description: string[]
  agentId: string
  /** Keywords the /listings keyword filter matches against. */
  keywords: string[]
  images: ListingImage[]
}

export const listings: Listing[] = [
  {
    slug: 'garden-facing-3bhk-12th-main-indiranagar',
    title: 'Garden-facing 3 BHK on 12th Main',
    address: '12th Main Road, HAL 2nd Stage, Indiranagar',
    localityId: 'indiranagar',
    kind: 'sale',
    type: 'apartment',
    price: 32500000,
    maintenance: 6500,
    beds: 3,
    baths: 3,
    balconies: 2,
    sqft: 1850,
    floor: '4th of 6',
    facing: 'East',
    possession: 'Ready to move',
    furnishing: 'Semi-furnished',
    parking: 2,
    ageYears: 6,
    readyToMove: true,
    isNew: false,
    amenities: [
      'Gym',
      'Clubhouse',
      'Covered parking',
      'Power backup',
      '24×7 security',
      'Lift',
      'Piped gas',
      'EV charging',
    ],
    highlights: [
      'Both balconies open onto the building’s own garden, not the road',
      '400 m from Indiranagar metro station',
      'Two deeded covered parking bays, not allotted by rotation',
    ],
    description: [
      'A 1,850 sq ft three-bedroom on the fourth floor of a six-storey building put up in 2020, on the quieter stretch of 12th Main past the 100 Feet Road junction. The layout is the older, more generous kind — a living and dining run of nearly 26 feet, and bedrooms that all take a queen bed with room left to walk around it.',
      'The east-facing balconies look over the building’s central garden rather than the street, which is the single reason this unit is worth more than the identical one two floors down. Morning light reaches the living room until about eleven. The kitchen is a utility-attached L with piped gas already connected.',
      'The building has a small gym, a clubhouse that fits about forty people, and a diesel generator sized for full backup rather than just lifts and corridors. Two covered bays are deeded to the flat. Khata is A, and the occupancy certificate came through in 2020.',
    ],
    agentId: 'ananya-rao',
    keywords: ['metro', 'garden view', 'gated', 'resale', 'east facing'],
    images: [
      { photo: '1600607687939-ce8a6c25118c', view: 'Living and dining' },
      { photo: '1616594039964-ae9021a400a0', view: 'Master bedroom' },
      { photo: '1484154218962-a197022b5858', view: 'Kitchen' },
      { photo: '1580216643062-cf460548a66a', view: 'Building exterior' },
    ],
  },
  {
    slug: 'furnished-2bhk-5th-block-koramangala',
    title: 'Fully furnished 2 BHK in 5th Block',
    address: '5th Block, Koramangala, off 80 Feet Road',
    localityId: 'koramangala',
    kind: 'rent',
    type: 'apartment',
    price: 58000,
    maintenance: 4000,
    beds: 2,
    baths: 2,
    balconies: 1,
    sqft: 1240,
    floor: '3rd of 4',
    facing: 'North-East',
    possession: 'Ready to move',
    furnishing: 'Fully furnished',
    parking: 1,
    ageYears: 9,
    readyToMove: true,
    isNew: false,
    amenities: ['Covered parking', 'Power backup', '24×7 security', 'Lift', 'Pet friendly'],
    highlights: [
      'Walk to Sony World junction in eight minutes',
      'Comes with the wardrobes, beds, fridge and washing machine',
      'Owner accepts pets in writing, on the agreement',
    ],
    description: [
      'A furnished two-bedroom on a low-rise stretch of 5th Block, five minutes on foot from the 80 Feet Road cafés and about eight from Sony World junction. Four-storey building with a lift, so the third floor is a short climb if the power goes.',
      'Furnished properly rather than nominally: fitted wardrobes in both bedrooms, two beds with mattresses, a four-door fridge, a front-load washing machine, a dining table for four, and curtains already up. You could move in with suitcases.',
      'The owner lives in Chennai and has held this flat for nine years across two long tenancies. Pets are allowed and it goes on the agreement, which is rarer in Koramangala than the listings suggest. Eleven-month agreement, ten months’ deposit, negotiable for a longer lock-in.',
    ],
    agentId: 'rohit-menon',
    keywords: ['furnished', 'pet friendly', 'walkable', 'cafes', 'metro'],
    images: [
      { photo: '1502672260266-1c1ef2d93688', view: 'Living room' },
      { photo: '1600585152220-90363fe7e115', view: 'Kitchen' },
      { photo: '1616486338812-3dadae4b4ace', view: 'Second bedroom' },
      { photo: '1523217582562-09d0def993a6', view: 'Building exterior' },
    ],
  },
  {
    slug: 'corner-3bhk-whitefield-itpl-main-road',
    title: 'Corner 3 BHK near ITPL Main Road',
    address: 'Pattandur Agrahara, ITPL Main Road, Whitefield',
    localityId: 'whitefield',
    kind: 'sale',
    type: 'apartment',
    price: 15200000,
    maintenance: 4200,
    beds: 3,
    baths: 3,
    balconies: 2,
    sqft: 1680,
    floor: '11th of 18',
    facing: 'North',
    possession: 'Ready to move',
    furnishing: 'Semi-furnished',
    parking: 1,
    ageYears: 3,
    readyToMove: true,
    isNew: false,
    amenities: [
      'Gym',
      'Swimming pool',
      'Clubhouse',
      'Covered parking',
      'Power backup',
      '24×7 security',
      'Children’s play area',
      'Lift',
      'Jogging track',
      'Indoor games',
    ],
    highlights: [
      'Corner unit — windows on two sides, one shared wall',
      'Purple Line metro at Kadugodi Tree Park, 2.4 km',
      'Full-size 25 m pool and a clubhouse that is actually staffed',
    ],
    description: [
      'A corner three-bedroom on the eleventh floor of an eighteen-storey tower, part of a 2022 development off ITPL Main Road. Corner units in this block have windows on two elevations and share only one wall, which changes both the light and the noise more than the floor plan suggests.',
      'The flat is three years old and has had one owner. Modular kitchen, wardrobes in two of the three bedrooms, and the usual builder fittings elsewhere — good enough to move into, not so finished that you cannot make it yours.',
      'The society is the reason to buy here: a 25-metre pool, a gym with equipment that gets serviced, a clubhouse with a staffed front desk, and a jogging track around the perimeter. Maintenance is ₹2.50 per sq ft, which is what pays for all of that. Kadugodi Tree Park metro is 2.4 km away.',
    ],
    agentId: 'ananya-rao',
    keywords: ['metro', 'tech park', 'corner unit', 'pool', 'gated'],
    images: [
      { photo: '1523192193543-6e7296d960e4', view: 'The towers from the main road' },
      { photo: '1600607687920-4e2a09cf159d', view: 'Living and dining' },
      { photo: '1484154218962-a197022b5858', view: 'Kitchen' },
      { photo: '1596436889106-be35e843f974', view: 'Swimming pool' },
    ],
  },
  {
    slug: 'compact-2bhk-sector-2-hsr-layout',
    title: 'Compact 2 BHK in Sector 2',
    address: 'Sector 2, HSR Layout, near Agara Lake',
    localityId: 'hsr-layout',
    kind: 'sale',
    type: 'apartment',
    price: 14800000,
    maintenance: 2650,
    beds: 2,
    baths: 2,
    balconies: 1,
    sqft: 1210,
    floor: '2nd of 4',
    facing: 'West',
    possession: 'Ready to move',
    furnishing: 'Unfurnished',
    parking: 1,
    ageYears: 8,
    readyToMove: true,
    isNew: false,
    amenities: ['Covered parking', 'Power backup', '24×7 security', 'Lift', 'Rainwater harvesting'],
    highlights: [
      'Ten-unit building — no clubhouse, no lifestyle charge',
      'Agara Lake walking loop is 900 m away',
      'Maintenance is ₹2,650 a month, not ₹8,000',
    ],
    description: [
      'A two-bedroom in a ten-unit building on a Sector 2 residential street, eight years old and run by an owners’ association rather than a facility company. That is the whole pitch: the same square footage as a gated-community flat at a lower price, because you are not paying for amenities you were never going to use.',
      'Unfurnished, west-facing, with a balcony off the living room that gets full afternoon sun — which is either the problem or the point depending on how you feel about a drying line. Both bedrooms have attached baths. There is a covered bay in the stilt.',
      'Agara Lake and its walking loop are 900 m away. The 27th Main restaurants are a ten-minute walk. Sale is by an owner relocating to Pune; the flat is vacant and the paperwork is clean.',
    ],
    agentId: 'rohit-menon',
    keywords: ['lake', 'low maintenance', 'quiet', 'vacant', 'resale'],
    images: [
      { photo: '1560448204-e02f11c3d0e2', view: 'Living room' },
      { photo: '1600585152220-90363fe7e115', view: 'Kitchen' },
      { photo: '1616594039964-ae9021a400a0', view: 'Master bedroom' },
      { photo: '1523217582562-09d0def993a6', view: 'Building exterior' },
    ],
  },
  {
    slug: 'independent-villa-4th-block-jayanagar',
    title: 'Independent villa on a 4th Block cross',
    address: '4th Block, Jayanagar, off Sampige Road',
    localityId: 'jayanagar',
    kind: 'sale',
    type: 'villa',
    price: 46500000,
    maintenance: 0,
    beds: 4,
    baths: 4,
    balconies: 3,
    sqft: 3200,
    floor: 'G+2',
    facing: 'North-East',
    possession: 'Ready to move',
    furnishing: 'Unfurnished',
    parking: 3,
    ageYears: 22,
    readyToMove: true,
    isNew: false,
    amenities: ['Covered parking', 'Power backup', 'Rainwater harvesting', 'Landscaped garden', 'Pet friendly'],
    highlights: [
      '30×50 site with the full 3,200 sq ft built across G+2',
      'Two independent floors — rent one, live in the other',
      'A-khata, and the sanctioned plan permits a third floor',
    ],
    description: [
      'A twenty-two-year-old independent house on a 30×50 site, on one of the numbered crosses off Sampige Road in 4th Block. Ground plus two, 3,200 sq ft built, with each upper floor laid out as a self-contained unit — which is how most families on this street actually use them.',
      'Solid construction from a period when these were built to last: nine-inch walls, teak frames, a proper Cuddapah-lined kitchen on the ground floor. It has been lived in continuously and shows it honestly. Budget for a kitchen and bathrooms if you want them current.',
      'The compound takes three cars and there is a mature mango tree in the setback that the previous two owners refused to cut. A-khata, a clean title chain going back to the original BDA allotment, and a sanctioned plan that allows a third floor if you ever want it.',
    ],
    agentId: 'meera-krishnan',
    keywords: ['independent house', 'rental income', 'a khata', 'garden', 'old bengaluru'],
    images: [
      { photo: '1598228723793-52759bba239c', view: 'Front elevation' },
      { photo: '1560185007-cde436f6a4d0', view: 'Living and dining' },
      { photo: '1522708323590-d24dbb6b0267', view: 'First-floor sitting room' },
      { photo: '1592595896551-12b371d546d5', view: 'Garden and setback' },
    ],
  },
  {
    slug: 'lake-view-3bhk-hebbal',
    title: 'Lake-view 3 BHK above the flyover',
    address: 'Hebbal Kempapura, off Bellary Road, Hebbal',
    localityId: 'hebbal',
    kind: 'rent',
    type: 'apartment',
    price: 52000,
    maintenance: 4500,
    beds: 3,
    baths: 3,
    balconies: 2,
    sqft: 1560,
    floor: '14th of 20',
    facing: 'South-East',
    possession: 'Ready to move',
    furnishing: 'Semi-furnished',
    parking: 1,
    ageYears: 5,
    readyToMove: true,
    isNew: false,
    amenities: [
      'Gym',
      'Swimming pool',
      'Clubhouse',
      'Covered parking',
      'Power backup',
      '24×7 security',
      'Lift',
      'Children’s play area',
      'EV charging',
    ],
    highlights: [
      'Fourteenth floor, genuine Hebbal Lake view from both balconies',
      '25 minutes to Terminal 2 outside peak hours',
      'EV charging points in the basement, already installed',
    ],
    description: [
      'A three-bedroom on the fourteenth floor of a twenty-storey tower in Hebbal Kempapura, high enough that both balconies clear the flyover and look straight at the lake. Photographs of this view get used in the builder’s brochure, which tells you something.',
      'Semi-furnished: wardrobes throughout, a modular kitchen with a chimney and hob, air conditioning in two bedrooms, and light fittings. You bring furniture. Two balconies, one off the living room and one off the master.',
      'The airport is twenty-five minutes away outside peak hours, and Manyata Tech Park is a fifteen-minute drive in the other direction — the two things that set rents in this pocket. Basement parking has EV points installed and metered. Eleven-month agreement, six months’ deposit.',
    ],
    agentId: 'arjun-nair',
    keywords: ['lake view', 'airport', 'high floor', 'ev charging', 'manyata'],
    images: [
      { photo: '1460317442991-0ec209397118', view: 'Tower exterior' },
      { photo: '1616137466211-f939a420be84', view: 'Living room' },
      { photo: '1600573472550-8090b5e0745e', view: 'Balcony and lake view' },
      { photo: '1484154218962-a197022b5858', view: 'Kitchen' },
    ],
  },
  {
    slug: 'new-launch-3bhk-sarjapur-road',
    title: 'New-launch 3 BHK off Sarjapur Road',
    address: 'Dommasandra, Sarjapur Road',
    localityId: 'sarjapur-road',
    kind: 'sale',
    type: 'apartment',
    price: 15400000,
    maintenance: 3800,
    beds: 3,
    baths: 3,
    balconies: 2,
    sqft: 1740,
    floor: '7th of 14',
    facing: 'East',
    possession: 'Mar 2027',
    furnishing: 'Unfurnished',
    parking: 2,
    ageYears: 0,
    readyToMove: false,
    isNew: true,
    amenities: [
      'Gym',
      'Swimming pool',
      'Clubhouse',
      'Covered parking',
      'Power backup',
      '24×7 security',
      'Children’s play area',
      'Lift',
      'Jogging track',
      'Landscaped garden',
      'EV charging',
      'Indoor games',
    ],
    highlights: [
      'RERA registered, with a March 2027 completion date on the certificate',
      'Launch pricing at ₹8,850 per sq ft against a locality average of ₹8,900',
      'Construction-linked payment plan, 10% on booking',
    ],
    description: [
      'A three-bedroom in a fourteen-storey tower now at seventh-slab stage, part of a 2025 launch in Dommasandra. Handover on the RERA certificate is March 2027, and the builder has met its last two dates in this corridor — which is the only reason this listing is here.',
      'The unit is east-facing with two balconies and a 1,740 sq ft super built-up area against roughly 1,340 sq ft carpet. Standard specification: vitrified tile, granite counter, UPVC windows on the outer face. Two parking bays are included at this price band.',
      'This is an under-construction purchase, so the trade is real: launch pricing and a construction-linked plan starting at 10% on booking, against two years of paying rent and EMI together. The site office is open at weekends and the sample flat is built out.',
    ],
    agentId: 'arjun-nair',
    keywords: ['new launch', 'rera', 'under construction', 'investment', 'payment plan'],
    images: [
      { photo: '1541888946425-d81bb19240f5', view: 'The site at seventh-slab stage' },
      { photo: '1448630360428-65456885c650', view: 'Project elevation' },
      { photo: '1616486338812-3dadae4b4ace', view: 'Sample flat living room' },
      { photo: '1596436889106-be35e843f974', view: 'Clubhouse pool' },
    ],
  },
  {
    slug: 'value-2bhk-phase-1-electronic-city',
    title: 'Value 2 BHK in Phase 1',
    address: 'Neeladri Road, Phase 1, Electronic City',
    localityId: 'electronic-city',
    kind: 'rent',
    type: 'apartment',
    price: 27500,
    maintenance: 2200,
    beds: 2,
    baths: 2,
    balconies: 1,
    sqft: 1105,
    floor: '5th of 9',
    facing: 'North',
    possession: 'Ready to move',
    furnishing: 'Semi-furnished',
    parking: 1,
    ageYears: 7,
    readyToMove: true,
    isNew: false,
    amenities: ['Gym', 'Covered parking', 'Power backup', '24×7 security', 'Lift', 'Children’s play area'],
    highlights: [
      'Yellow Line metro at Konappana Agrahara, 1.8 km',
      'Wipro and Infosys campuses inside a four-kilometre radius',
      'Deposit is three months, not ten',
    ],
    description: [
      'A two-bedroom on Neeladri Road in Phase 1, seven years old, in a nine-storey building with a lift and a small gym. The kind of flat that gets taken within a week of listing, because the rent is ₹27,500 and the campuses are four kilometres away.',
      'Semi-furnished with wardrobes, a modular kitchen and one air conditioner. North-facing, so it stays cool through the afternoon. The balcony is off the living room and takes a drying rack and two chairs, which is what most tenants use it for.',
      'The Yellow Line metro at Konappana Agrahara opened the commute up considerably — 1.8 km from the building, and the last-mile autos know the address. Deposit is three months, which is the local norm and a genuine relief if you have rented in Indiranagar.',
    ],
    agentId: 'imran-qureshi',
    keywords: ['metro', 'affordable', 'tech park', 'low deposit', 'yellow line'],
    images: [
      { photo: '1493809842364-78817add7ffb', view: 'Living room' },
      { photo: '1484154218962-a197022b5858', view: 'Kitchen' },
      { photo: '1616486338812-3dadae4b4ace', view: 'Bedroom' },
      { photo: '1580216643062-cf460548a66a', view: 'Building exterior' },
    ],
  },
  {
    slug: 'bda-plot-yelahanka-new-town',
    title: 'BDA plot in Yelahanka New Town',
    address: 'Sector B, Yelahanka New Town',
    localityId: 'yelahanka',
    kind: 'sale',
    type: 'plot',
    price: 18200000,
    maintenance: 0,
    beds: 0,
    baths: 0,
    balconies: 0,
    sqft: 2400,
    floor: 'Not applicable',
    facing: 'East',
    possession: 'Ready to move',
    furnishing: 'Unfurnished',
    parking: 0,
    ageYears: 0,
    readyToMove: true,
    isNew: false,
    amenities: ['Rainwater harvesting', '24×7 security'],
    highlights: [
      '40×60 east-facing corner site on a 40-foot road',
      'BDA allotment, A-khata, no conversion order needed',
      'Airport is 20 minutes by the Bellary Road service lane',
    ],
    description: [
      'A 40×60 corner site in Sector B of Yelahanka New Town, facing east onto a 40-foot road with a 30-foot road on the second side. Corner sites in this sector are held tightly and come up perhaps twice a year.',
      'BDA allotment with A-khata, so there is no conversion order to chase and no revenue-land history to trace. The encumbrance certificate is clear for thirty years. Water and sewerage lines run along the front road and the connection is already sanctioned.',
      'The layout is fully built out — you would be putting a house among finished houses rather than on an empty grid, which matters for security and for how soon you can actually live there. The airport is twenty minutes by the Bellary Road service lane.',
    ],
    agentId: 'kavya-shetty',
    keywords: ['plot', 'bda', 'a khata', 'corner site', 'airport', 'land'],
    images: [
      { photo: '1512699355324-f07e3106dae5', view: 'The layout from above' },
      { photo: '1449844908441-8829872d2607', view: 'Approach road to the layout' },
      { photo: '1592595896551-12b371d546d5', view: 'The street the site faces' },
      { photo: '1583608205776-bfd35f0d9f83', view: 'Neighbouring houses' },
    ],
  },
  {
    slug: 'renovated-3bhk-8th-cross-malleshwaram',
    title: 'Renovated 3 BHK on 8th Cross',
    address: '8th Cross, Malleshwaram, near Sampige Road metro',
    localityId: 'malleshwaram',
    kind: 'sale',
    type: 'apartment',
    price: 25900000,
    maintenance: 3500,
    beds: 3,
    baths: 2,
    balconies: 1,
    sqft: 1720,
    floor: '1st of 3',
    facing: 'South',
    possession: 'Ready to move',
    furnishing: 'Semi-furnished',
    parking: 1,
    ageYears: 18,
    readyToMove: true,
    isNew: false,
    amenities: ['Covered parking', 'Power backup', '24×7 security', 'Lift', 'Piped gas', 'Pet friendly'],
    highlights: [
      'Gutted and rebuilt inside in 2024 — wiring, plumbing, both bathrooms',
      'Sampige Road metro is a six-minute walk',
      'Six flats in the building, all owner-occupied',
    ],
    description: [
      'A three-bedroom on the first floor of an eighteen-year-old, six-flat building on 8th Cross. The building is its age; the flat is not. It was taken back to brick inside in 2024 — new wiring on a fresh distribution board, new plumbing, both bathrooms rebuilt, and a kitchen put in with soft-close hardware and a quartz counter.',
      'The rooms kept their original proportions, which is the reason to buy an older Malleshwaram flat in the first place: 1,720 sq ft laid out as three real bedrooms rather than two and a study. South-facing, with a balcony off the living room deep enough for a table.',
      'All six flats are owner-occupied and the association has been running for over a decade with a funded sinking fund. Sampige Road metro is a six-minute walk, and the 8th Cross market end of Malleshwaram is closer still.',
    ],
    agentId: 'meera-krishnan',
    keywords: ['renovated', 'metro', 'owner occupied', 'quiet', 'central'],
    images: [
      { photo: '1600566753086-00f18fb6b3ea', view: 'Living room after the 2024 rebuild' },
      { photo: '1600585152220-90363fe7e115', view: 'Rebuilt kitchen' },
      { photo: '1616594039964-ae9021a400a0', view: 'Master bedroom' },
      { photo: '1523217582562-09d0def993a6', view: 'Building exterior' },
    ],
  },
  {
    slug: 'gated-villa-jp-nagar-7th-phase',
    title: 'Gated villa in 7th Phase',
    address: '7th Phase, JP Nagar, off Kanakapura Road',
    localityId: 'jp-nagar',
    kind: 'rent',
    type: 'villa',
    price: 125000,
    maintenance: 9000,
    beds: 4,
    baths: 5,
    balconies: 3,
    sqft: 2850,
    floor: 'G+2',
    facing: 'North',
    possession: 'Ready to move',
    furnishing: 'Semi-furnished',
    parking: 2,
    ageYears: 4,
    readyToMove: true,
    isNew: false,
    amenities: [
      'Swimming pool',
      'Clubhouse',
      'Gym',
      'Covered parking',
      'Power backup',
      '24×7 security',
      'Landscaped garden',
      'Jogging track',
      'Pet friendly',
      'Children’s play area',
    ],
    highlights: [
      'Private 8×4 m plunge pool in the rear courtyard',
      'Forty-villa gated enclave with a manned gate',
      'Green Line metro at Konanakunte Cross, 3 km',
    ],
    description: [
      'A four-bedroom villa in a forty-unit gated enclave in 7th Phase, four years old, ground plus two with a private rear courtyard. The courtyard has an 8×4 metre plunge pool that the owner put in after handover, which is why this villa rents above the others in the same row.',
      'Semi-furnished: wardrobes in all four bedrooms, a full modular kitchen, air conditioning in three rooms, and light fittings throughout. Each bedroom has an attached bath and there is a powder room off the entrance hall. The top floor is a single open room with its own terrace.',
      'The enclave has a manned gate, a shared clubhouse and gym, a jogging loop and landscaped commons. Pets are fine. Kanakapura Road is two minutes away and Konanakunte Cross metro is 3 km. Eleven-month agreement, six months’ deposit.',
    ],
    agentId: 'imran-qureshi',
    keywords: ['villa', 'private pool', 'gated', 'pet friendly', 'family'],
    images: [
      { photo: '1613490493576-7fde63acd811', view: 'Villa and plunge pool' },
      { photo: '1600210492486-724fe5c67fb0', view: 'Living room' },
      { photo: '1484154218962-a197022b5858', view: 'Kitchen' },
      { photo: '1600573472550-8090b5e0745e', view: 'Upper floor and terrace' },
    ],
  },
  {
    slug: 'starter-2bhk-bellandur-orr',
    title: 'Starter 2 BHK a walk from the ORR',
    address: 'Green Glen Layout, Bellandur',
    localityId: 'bellandur',
    kind: 'sale',
    type: 'apartment',
    price: 12300000,
    maintenance: 3000,
    beds: 2,
    baths: 2,
    balconies: 1,
    sqft: 1290,
    floor: '8th of 12',
    facing: 'East',
    possession: 'Ready to move',
    furnishing: 'Unfurnished',
    parking: 1,
    ageYears: 6,
    readyToMove: true,
    isNew: false,
    amenities: ['Gym', 'Swimming pool', 'Covered parking', 'Power backup', '24×7 security', 'Lift', 'Indoor games'],
    highlights: [
      'Green Glen Layout — walk to the ORR offices, no commute at all',
      'Eighth floor, east-facing, clear of the block opposite',
      'The lowest ₹/sq ft of any 2 BHK on NestFind',
    ],
    description: [
      'A two-bedroom on the eighth floor of a twelve-storey building in Green Glen Layout, the pocket that exists because people wanted to walk to the Outer Ring Road offices. If you work in one of them, this is a fifteen-minute walk and no car.',
      'Six years old, unfurnished, east-facing, and high enough to clear the block opposite — the flats below the sixth floor look straight into it. Standard specification throughout, with a balcony off the living room.',
      'The society has a pool, a gym and an indoor games room, and maintenance runs ₹2.33 per sq ft. At ₹1.23 crore this is the lowest per-square-foot figure of any two-bedroom on NestFind right now, and the reason is simply that Bellandur trades below HSR and Koramangala for the same commute.',
    ],
    agentId: 'imran-qureshi',
    keywords: ['walk to work', 'orr', 'affordable', 'first home', 'high floor'],
    images: [
      { photo: '1522708323590-d24dbb6b0267', view: 'Living room' },
      { photo: '1600585152220-90363fe7e115', view: 'Kitchen' },
      { photo: '1616486338812-3dadae4b4ace', view: 'Bedroom' },
      { photo: '1545324418-cc1a3fa10c00', view: 'Building exterior' },
    ],
  },
  {
    slug: 'poolside-villa-whitefield-varthur',
    title: 'Poolside villa near Varthur',
    address: 'Varthur Main Road, Whitefield',
    localityId: 'whitefield',
    kind: 'rent',
    type: 'villa',
    price: 145000,
    maintenance: 11000,
    beds: 4,
    baths: 5,
    balconies: 2,
    sqft: 3100,
    floor: 'G+1',
    facing: 'East',
    possession: 'Ready to move',
    furnishing: 'Fully furnished',
    parking: 3,
    ageYears: 6,
    readyToMove: true,
    isNew: false,
    amenities: [
      'Swimming pool',
      'Clubhouse',
      'Gym',
      'Covered parking',
      'Power backup',
      '24×7 security',
      'Landscaped garden',
      'Jogging track',
      'Children’s play area',
      'Indoor games',
      'EV charging',
    ],
    highlights: [
      'Backs directly onto the community pool and lawn',
      'Fully furnished, including the outdoor set on the rear deck',
      'Two international schools within three kilometres',
    ],
    description: [
      'A four-bedroom villa on the pool row of a gated community off Varthur Main Road — the rear garden opens onto the community lawn and the 25-metre pool, with no road between. Six years old, ground plus one, 3,100 sq ft.',
      'Fully furnished and unusually well: sofas, dining for eight, four beds with wardrobes, a stocked modular kitchen, air conditioning in every bedroom, and the outdoor set on the rear deck. Expat families have taken this villa twice, which shapes both the furnishing and the price.',
      'Three covered bays with an EV point on one. The community has a clubhouse, gym, indoor games and a jogging loop, and two international schools sit within three kilometres. Twelve-month agreement, six months’ deposit, company lease welcome.',
    ],
    agentId: 'ananya-rao',
    keywords: ['villa', 'furnished', 'pool', 'international school', 'company lease'],
    images: [
      { photo: '1613977257363-707ba9348227', view: 'Villa rear and pool' },
      { photo: '1600607687939-ce8a6c25118c', view: 'Living room' },
      { photo: '1596436889106-be35e843f974', view: 'Community pool' },
      { photo: '1616594039964-ae9021a400a0', view: 'Master bedroom' },
    ],
  },
  {
    slug: 'quiet-2bhk-defence-colony-indiranagar',
    title: 'Quiet 2 BHK in Defence Colony',
    address: 'Defence Colony, Indiranagar',
    localityId: 'indiranagar',
    kind: 'rent',
    type: 'apartment',
    price: 72000,
    maintenance: 5000,
    beds: 2,
    baths: 2,
    balconies: 2,
    sqft: 1320,
    floor: '2nd of 3',
    facing: 'North-East',
    possession: 'Ready to move',
    furnishing: 'Semi-furnished',
    parking: 1,
    ageYears: 12,
    readyToMove: true,
    isNew: false,
    amenities: ['Covered parking', 'Power backup', '24×7 security', 'Lift', 'Piped gas', 'Pet friendly'],
    highlights: [
      'Defence Colony — the residential half of Indiranagar',
      'Two balconies, both facing into the block’s interior',
      'Six-flat building with the owner resident on the ground floor',
    ],
    description: [
      'A two-bedroom on the second floor of a six-flat building in Defence Colony, which is the part of Indiranagar people move to after a year on 12th Main. The streets are wide, the trees are old, and nothing opens past ten.',
      'Twelve years old and well kept. Semi-furnished with wardrobes, a modular kitchen with piped gas, and air conditioning in both bedrooms. Two balconies, both facing into the block rather than onto a road, which is why the flat is as quiet as it is.',
      'The owner lives on the ground floor and manages the building himself — which cuts both ways, but in practice means repairs happen the same week. Pets are allowed. Eleven-month agreement, six months’ deposit. Indiranagar metro is 1.6 km.',
    ],
    agentId: 'ananya-rao',
    keywords: ['quiet', 'pet friendly', 'metro', 'tree lined', 'semi furnished'],
    images: [
      { photo: '1616486338812-3dadae4b4ace', view: 'Living room' },
      { photo: '1484154218962-a197022b5858', view: 'Kitchen' },
      { photo: '1616137466211-f939a420be84', view: 'Second bedroom' },
      { photo: '1523217582562-09d0def993a6', view: 'Building exterior' },
    ],
  },
  {
    slug: 'row-villa-sarjapur-road-mullur',
    title: 'Row villa at Mullur',
    address: 'Mullur, off Sarjapur Road',
    localityId: 'sarjapur-road',
    kind: 'sale',
    type: 'villa',
    price: 30500000,
    maintenance: 7500,
    beds: 4,
    baths: 4,
    balconies: 2,
    sqft: 3450,
    floor: 'G+2',
    facing: 'West',
    possession: 'Ready to move',
    furnishing: 'Unfurnished',
    parking: 2,
    ageYears: 2,
    readyToMove: true,
    isNew: true,
    amenities: [
      'Swimming pool',
      'Clubhouse',
      'Gym',
      'Covered parking',
      'Power backup',
      '24×7 security',
      'Landscaped garden',
      'Jogging track',
      'Children’s play area',
      'Rainwater harvesting',
      'EV charging',
    ],
    highlights: [
      '3,450 sq ft built on a 30×50 site, two years old',
      'Private terrace on the second floor, plumbed and waterproofed',
      '₹8,840 per sq ft — villa space at apartment pricing',
    ],
    description: [
      'A two-year-old row villa in a gated project at Mullur, 3,450 sq ft built across ground plus two on a 30×50 site. Four bedrooms, all with attached baths, a double-height entrance hall, and a family room on the first floor that most owners here have turned into a study.',
      'The second floor is a single room opening onto a private terrace that came plumbed and waterproofed — which sounds minor until you price adding it later. West-facing, so the terrace is usable from about four in the afternoon.',
      'The project has a clubhouse, pool, gym and a jogging loop shared across 120 villas, with maintenance at ₹7,500 a month. At ₹8,840 per sq ft this is villa space at roughly apartment pricing, which is the trade Sarjapur Road has always offered against a longer drive into town.',
    ],
    agentId: 'arjun-nair',
    keywords: ['villa', 'gated', 'terrace', 'new', 'value'],
    images: [
      { photo: '1600047509807-ba8f99d2cdde', view: 'Villa exterior' },
      { photo: '1600573472550-8090b5e0745e', view: 'Living and dining' },
      { photo: '1600585152220-90363fe7e115', view: 'Kitchen' },
      { photo: '1596436889106-be35e843f974', view: 'Clubhouse pool' },
    ],
  },
  {
    slug: 'family-3bhk-sector-7-hsr-layout',
    title: 'Family 3 BHK in Sector 7',
    address: 'Sector 7, HSR Layout',
    localityId: 'hsr-layout',
    kind: 'rent',
    type: 'apartment',
    price: 68000,
    maintenance: 5500,
    beds: 3,
    baths: 3,
    balconies: 2,
    sqft: 1580,
    floor: '6th of 8',
    facing: 'East',
    possession: 'Ready to move',
    furnishing: 'Semi-furnished',
    parking: 2,
    ageYears: 5,
    readyToMove: true,
    isNew: false,
    amenities: [
      'Gym',
      'Swimming pool',
      'Clubhouse',
      'Covered parking',
      'Power backup',
      '24×7 security',
      'Children’s play area',
      'Lift',
      'Indoor games',
    ],
    highlights: [
      'Two parking bays on a rental, which HSR almost never offers',
      'Three schools and a paediatric clinic inside a kilometre',
      'Sixth floor, east-facing, both balconies clear of the block opposite',
    ],
    description: [
      'A three-bedroom on the sixth floor of an eight-storey building in Sector 7, five years old, in a society built around families rather than sharers. The play area is used, the pool has a shallow end, and the association enforces quiet hours.',
      'Semi-furnished with wardrobes in all three bedrooms, a modular kitchen with chimney and hob, and air conditioning in two rooms. East-facing with two balconies, both clear of the block opposite from the sixth floor up.',
      'Two covered parking bays come with the flat, which almost no HSR rental offers. Three schools and a paediatric clinic sit within a kilometre, and the Sector 7 market end is a five-minute walk. Eleven-month agreement, six months’ deposit, families preferred.',
    ],
    agentId: 'rohit-menon',
    keywords: ['family', 'schools', 'two parking', 'pool', 'quiet'],
    images: [
      { photo: '1616137466211-f939a420be84', view: 'Living room' },
      { photo: '1484154218962-a197022b5858', view: 'Kitchen' },
      { photo: '1616594039964-ae9021a400a0', view: 'Master bedroom' },
      { photo: '1580216643062-cf460548a66a', view: 'Building exterior' },
    ],
  },
  {
    slug: 'penthouse-4bhk-1st-block-koramangala',
    title: 'Duplex 4 BHK penthouse in 1st Block',
    address: '1st Block, Koramangala',
    localityId: 'koramangala',
    kind: 'sale',
    type: 'apartment',
    price: 40500000,
    maintenance: 8000,
    beds: 4,
    baths: 4,
    balconies: 3,
    sqft: 2400,
    floor: '7th–8th of 8',
    facing: 'North-East',
    possession: 'Ready to move',
    furnishing: 'Semi-furnished',
    parking: 2,
    ageYears: 10,
    readyToMove: true,
    isNew: false,
    amenities: [
      'Gym',
      'Clubhouse',
      'Covered parking',
      'Power backup',
      '24×7 security',
      'Lift',
      'Piped gas',
      'Landscaped garden',
      'Indoor games',
    ],
    highlights: [
      'Duplex across the top two floors, with a 600 sq ft private terrace',
      'Only two flats on each of those floors',
      'Ten years old — built when 1st Block still had room for setbacks',
    ],
    description: [
      'A duplex penthouse across the seventh and eighth floors of an eight-storey building in 1st Block, ten years old. Four bedrooms, an internal staircase, and a 600 sq ft private terrace off the upper level with a service point already run out to it.',
      'The living volume on the lower floor is double-height over the dining, which is the kind of thing builders stopped doing when floor-space ratios got tight. Three balconies besides the terrace. Semi-furnished — wardrobes, kitchen, and the terrace pergola stay.',
      'Two flats per floor on the top two levels, so the lift lobby is effectively private. The building has a gym, a small clubhouse and a landscaped setback that 1st Block plots no longer have room for. Two deeded covered bays. A-khata, occupancy certificate in hand.',
    ],
    agentId: 'rohit-menon',
    keywords: ['penthouse', 'duplex', 'terrace', 'luxury', 'top floor'],
    images: [
      { photo: '1600573472550-8090b5e0745e', view: 'Double-height living volume' },
      { photo: '1600607687920-4e2a09cf159d', view: 'Dining' },
      { photo: '1616486338812-3dadae4b4ace', view: 'Upper-floor bedroom' },
      { photo: '1600585154526-990dced4db0d', view: 'Building exterior' },
    ],
  },
  {
    slug: 'corner-plot-hebbal-kempapura',
    title: 'Corner plot at Hebbal Kempapura',
    address: 'Hebbal Kempapura, Hebbal',
    localityId: 'hebbal',
    kind: 'sale',
    type: 'plot',
    price: 31000000,
    maintenance: 0,
    beds: 0,
    baths: 0,
    balconies: 0,
    sqft: 3000,
    floor: 'Not applicable',
    facing: 'North',
    possession: 'Ready to move',
    furnishing: 'Unfurnished',
    parking: 0,
    ageYears: 0,
    readyToMove: true,
    isNew: true,
    amenities: ['24×7 security', 'Rainwater harvesting', 'Landscaped garden'],
    highlights: [
      '50×60 north-facing plot inside a gated layout',
      'Sanctioned plan for G+3 already approved and transferable',
      'Twenty minutes to Terminal 2, ten to Manyata',
    ],
    description: [
      'A 50×60 north-facing plot inside a small gated layout at Hebbal Kempapura, on a corner where a 40-foot road meets a 30-foot one. Thirty-two plots in the layout, of which twenty-six are already built on.',
      'A sanctioned plan for ground-plus-three is approved and transfers with the sale, which saves roughly four months and the BBMP queue. Water, sewerage and power are laid to the plot boundary, and the layout has a manned gate and landscaped commons.',
      'A-khata with a clean encumbrance certificate. The location is the whole argument: twenty minutes to Terminal 2 on the elevated road and ten to Manyata Tech Park, on a plot large enough to build something you will not outgrow.',
    ],
    agentId: 'kavya-shetty',
    keywords: ['plot', 'corner', 'sanctioned plan', 'gated', 'airport', 'land'],
    images: [
      { photo: '1516156008625-3a9d6067fab5', view: 'The layout from above' },
      { photo: '1605276374104-dee2a0ed3cd6', view: 'The corner the plot sits on' },
      { photo: '1449844908441-8829872d2607', view: 'Layout road' },
      { photo: '1592595896551-12b371d546d5', view: 'Built plots in the layout' },
    ],
  },
]

const bySlug = new Map(listings.map((l) => [l.slug, l]))

export function getListing(slug: string): Listing | undefined {
  return bySlug.get(slug)
}

/** The listing's locality record. Every `localityId` above is a real id. */
export function localityOf(listing: Listing): Locality {
  const locality = getLocality(listing.localityId)
  if (!locality) {
    throw new Error(`Unknown locality "${listing.localityId}" on listing "${listing.slug}"`)
  }
  return locality
}

/** Unsplash delivery URL at the width the layout actually needs. */
export function imageUrl(image: ListingImage, width = 1600): string {
  return `https://images.unsplash.com/photo-${image.photo}?auto=format&fit=crop&w=${width}&q=70`
}

/** Alt text that names both the frame and the property it belongs to. */
export function imageAlt(listing: Listing, image: ListingImage): string {
  return `${image.view} — ${listing.title}, ${localityOf(listing).name}, Bengaluru`
}

/**
 * Other listings worth showing at the bottom of a listing page: same side of the
 * market, then same locality, type, bedroom count and nearest asking price.
 */
export function similarListings(listing: Listing, count = 3): Listing[] {
  return listings
    .filter((l) => l.slug !== listing.slug && l.kind === listing.kind)
    .map((l) => {
      let score = 0
      if (l.localityId === listing.localityId) score += 4
      if (l.type === listing.type) score += 2
      if (l.beds === listing.beds) score += 1
      // Closer asking prices rank higher, on a 0–3 scale.
      score += (Math.min(l.price, listing.price) / Math.max(l.price, listing.price)) * 3
      return { listing: l, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((s) => s.listing)
}
