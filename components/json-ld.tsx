import type { JsonLdNode } from '@/lib/jsonld'

/**
 * Emits one `application/ld+json` block.
 *
 * `<` is escaped to its unicode form before the string reaches the DOM. JSON
 * itself cannot close a script tag, but a string value containing `</script>`
 * can, and any of this data could one day come from a CMS — so the escape is
 * cheap insurance rather than theatre.
 */
export function JsonLd({ data }: { data: JsonLdNode | JsonLdNode[] }) {
  const json = JSON.stringify(data).replace(/</g, '\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
