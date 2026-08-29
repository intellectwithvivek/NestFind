'use client'

import { Alert, AnimatedCounter, Card, Heading, Slider, Stack, Text } from '@the_viveksingh/vivek-ui'
import { PieChart } from '@the_viveksingh/vivek-ui/charts'
import { useMemo, useState } from 'react'
import { calculateEmi, defaultLoanAmount } from '@/lib/emi'
import { formatCompactINR, formatINR } from '@/lib/format'

/**
 * The EMI calculator.
 *
 * Three sliders drive one formula and two readouts: the instalment, counted up by
 * `AnimatedCounter`, and the principal-versus-interest split as a donut. The chart
 * is the reason this is worth building rather than printing a number — "₹41 lakh of
 * interest" is abstract, and a slice that is nearly half the circle is not.
 */
export function EmiCalculator({ price }: { price: number }) {
  const [loan, setLoan] = useState(() => defaultLoanAmount(price))
  const [rate, setRate] = useState(8.6)
  const [years, setYears] = useState(20)

  const emi = useMemo(() => calculateEmi(loan, rate, years), [loan, rate, years])

  const loanMax = Math.ceil((price * 0.9) / 100000) * 100000
  const loanMin = Math.min(500000, loanMax)

  return (
    <Card variant="outline" padding="lg">
      <Card.Header>
        <Heading level={2} size="md">
          EMI calculator
        </Heading>
        <Text size="sm" tone="muted">
          Reducing balance, the way every Indian lender quotes it.
        </Text>
      </Card.Header>

      <Card.Body>
        <Stack gap={6}>
          <Stack gap={2}>
            <Stack direction="horizontal" justify="between" align="baseline" wrap>
              <Text as="span" size="sm" weight="medium">
                Loan amount
              </Text>
              <span className="nf-figure" style={{ fontWeight: 'var(--vk-weight-semibold)' }}>
                {formatCompactINR(loan)}
              </span>
            </Stack>
            <Slider
              min={loanMin}
              max={loanMax}
              step={100000}
              value={loan}
              onValueChange={setLoan}
              formatValue={formatCompactINR}
              aria-label="Loan amount"
            />
            <Text size="sm" tone="muted">
              {Math.round((loan / price) * 100)}% of the asking price. Lenders here cap most home
              loans at 80–90%.
            </Text>
          </Stack>

          <Stack gap={2}>
            <Stack direction="horizontal" justify="between" align="baseline" wrap>
              <Text as="span" size="sm" weight="medium">
                Interest rate
              </Text>
              <span className="nf-figure" style={{ fontWeight: 'var(--vk-weight-semibold)' }}>
                {rate.toFixed(2)}% a year
              </span>
            </Stack>
            <Slider
              min={6}
              max={14}
              step={0.05}
              value={rate}
              onValueChange={setRate}
              formatValue={(value) => `${value.toFixed(2)}%`}
              aria-label="Annual interest rate"
            />
          </Stack>

          <Stack gap={2}>
            <Stack direction="horizontal" justify="between" align="baseline" wrap>
              <Text as="span" size="sm" weight="medium">
                Tenure
              </Text>
              <span className="nf-figure" style={{ fontWeight: 'var(--vk-weight-semibold)' }}>
                {years} years
              </span>
            </Stack>
            <Slider
              min={5}
              max={30}
              step={1}
              value={years}
              onValueChange={setYears}
              formatValue={(value) => `${value} years`}
              aria-label="Loan tenure in years"
            />
          </Stack>

          <div className="nf-price-plate" style={{ inlineSize: '100%' }}>
            <span className="nf-price-unit">Monthly instalment</span>
            <span className="nf-price nf-price-xl">
              ₹
              <AnimatedCounter
                value={emi.monthly}
                locale="en-IN"
                duration={500}
                startOnView={false}
              />
            </span>
            <span className="nf-price-unit">
              over {emi.months} payments · {formatCompactINR(emi.totalPayment)} repaid in total
            </span>
          </div>

          <div>
            <PieChart
              donut
              innerRadius={0.62}
              diameter={240}
              data={[
                { label: 'Principal', value: emi.principal },
                { label: 'Interest', value: emi.totalInterest },
              ]}
              centerLabel={formatCompactINR(emi.totalInterest)}
              centerSublabel="paid in interest"
              showLabels
              title="What you repay, split between principal and interest"
              description={`Of ${formatINR(emi.totalPayment)} repaid over ${years} years, ${formatINR(
                emi.principal,
              )} is the loan itself and ${formatINR(emi.totalInterest)} is interest.`}
              xLabel="Component"
              yLabel="Amount (₹)"
              formatValue={(value) => `₹${Math.round(value).toLocaleString('en-IN')}`}
            />
          </div>

          <Alert tone="warning" variant="soft" title="Estimate only — not financial advice">
            Real offers vary with your credit profile, the lender’s processing fee, insurance
            bundled into the loan and whether the rate is fixed or floating.
          </Alert>
        </Stack>
      </Card.Body>
    </Card>
  )
}
