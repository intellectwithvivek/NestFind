/**
 * Equated monthly instalment on a reducing-balance home loan.
 *
 * E = P × r × (1 + r)^n ÷ ((1 + r)^n − 1)
 *
 * where P is the principal, r the monthly interest rate (annual ÷ 12 ÷ 100) and n
 * the tenure in months. It is the formula every Indian lender quotes, and it is the
 * one the FAQ answer on this site describes in a line.
 */
export interface EmiBreakdown {
  /** Monthly instalment, rounded to the rupee. */
  monthly: number
  /** The loan amount itself. */
  principal: number
  /** Everything paid over the full tenure. */
  totalPayment: number
  /** `totalPayment − principal`. */
  totalInterest: number
  months: number
}

export function calculateEmi(principal: number, annualRatePercent: number, years: number): EmiBreakdown {
  const months = Math.max(1, Math.round(years * 12))
  const monthlyRate = annualRatePercent / 12 / 100

  // A zero-interest loan divides by zero in the standard formula, so it gets the
  // one branch it needs rather than a NaN that propagates into the chart.
  const monthly =
    monthlyRate === 0
      ? principal / months
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)

  const totalPayment = monthly * months

  return {
    monthly: Math.round(monthly),
    principal: Math.round(principal),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalPayment - principal),
    months,
  }
}

/** Sensible starting position for a listing's calculator: 80% loan-to-value. */
export function defaultLoanAmount(price: number): number {
  return Math.round((price * 0.8) / 100000) * 100000
}
