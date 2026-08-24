import { Carousel } from '@the_viveksingh/vivek-ui'
import Image from 'next/image'
import { imageAlt, imageUrl, type Listing } from '@/data/listings'

/**
 * The photo gallery at the top of a listing page.
 *
 * `Carousel` is built on CSS scroll-snap and carries no `'use client'` of its own,
 * so this whole component renders on the server. Only the arrows and dots are a
 * client island, inside the library. The first frame is `priority` — it is the
 * largest contentful paint on this route.
 */
export function ListingGallery({ listing }: { listing: Listing }) {
  return (
    <Carousel
      slidesPerView={1}
      showArrows
      showDots
      label={`Photographs of ${listing.title}`}
      slideLabel={(index, total) => `Photo ${index + 1} of ${total}`}
    >
      {listing.images.map((image, index) => (
        <figure key={image.photo + image.view} className="nf-gallery-frame" style={{ margin: 0 }}>
          <Image
            src={imageUrl(image, 1400)}
            alt={imageAlt(listing, image)}
            fill
            sizes="(min-width: 64rem) 60vw, 96vw"
            priority={index === 0}
            style={{ objectFit: 'cover' }}
          />
          <figcaption className="nf-gallery-caption">{image.view}</figcaption>
        </figure>
      ))}
    </Carousel>
  )
}
