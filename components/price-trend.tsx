import { LineChart } from '@the_viveksingh/vivek-ui/charts'
import { growthTakeaway, priceGrowth, type Locality } from '@/data/localities'

/**
 * Five years of ₹/sq ft for one locality, with the reading spelled out underneath.
 *
 * A Server Component — the chart is pure SVG with nothing measured at runtime, so
 * it renders complete in the HTML and needs no client boundary. A chart without a
 * stated takeaway makes the reader do the arithmetic, so the sentence is not
 * decoration: it is the point of putting the chart there.
 */
export function PriceTrend({ locality }: { locality: Locality }) {
  const growth = priceGrowth(locality)

  return (
    <figure style={{ margin: 0 }}>
      <LineChart
        data={locality.pricePerSqft.map((point) => ({ x: point.year, y: point.value }))}
        height={260}
        showGrid
        showAxes
        showPoints
        curve="smooth"
        xLabel="Year"
        yLabel="₹ per sq ft"
        title={`${locality.name} price trend — ₹ per sq ft, ${locality.pricePerSqft[0].year} to ${
          locality.pricePerSqft[locality.pricePerSqft.length - 1].year
        }`}
        description={`Average asking price per square foot in ${locality.name}, Bengaluru, over the last five calendar years.`}
        formatValue={(value) => `₹${value.toLocaleString('en-IN')}`}
      />
      <figcaption className="nf-takeaway">
        <strong data-trend={growth < 0 ? 'down' : 'up'}>
          {growth >= 0 ? '+' : ''}
          {growth}%
        </strong>
        <span>{growthTakeaway(locality)}</span>
      </figcaption>
    </figure>
  )
}
