/**
 * Calculate bond price using present value of cash flows.
 * P = Σ[C/(1+r)^t] + F/(1+r)^N
 */
export function bondPrice(
  couponPerPeriod: number,
  faceValue: number,
  ratePerPeriod: number,
  totalPeriods: number,
): number {
  let price = 0;
  for (let t = 1; t <= totalPeriods; t++) {
    price += couponPerPeriod / Math.pow(1 + ratePerPeriod, t);
  }
  price += faceValue / Math.pow(1 + ratePerPeriod, totalPeriods);
  return price;
}

/**
 * First derivative of bond price with respect to rate (dP/dr).
 * Used for Newton-Raphson optimization.
 */
export function bondPriceDerivative(
  couponPerPeriod: number,
  faceValue: number,
  ratePerPeriod: number,
  totalPeriods: number,
): number {
  let derivative = 0;
  for (let t = 1; t <= totalPeriods; t++) {
    derivative -= (t * couponPerPeriod) / Math.pow(1 + ratePerPeriod, t + 1);
  }
  derivative -=
    (totalPeriods * faceValue) / Math.pow(1 + ratePerPeriod, totalPeriods + 1);
  return derivative;
}

/**
 * Solve for Yield to Maturity using Newton-Raphson method.
 * Returns annualized YTM as a percentage.
 */
export function solveYTM(
  couponPerPeriod: number,
  faceValue: number,
  marketPrice: number,
  totalPeriods: number,
  periodsPerYear: number,
): number {
  const maxIterations = 1000;
  const tolerance = 1e-8;

  // Initial guess: current yield adjusted by periods
  let rate = couponPerPeriod / marketPrice;

  for (let i = 0; i < maxIterations; i++) {
    const price = bondPrice(couponPerPeriod, faceValue, rate, totalPeriods);
    const derivative = bondPriceDerivative(
      couponPerPeriod,
      faceValue,
      rate,
      totalPeriods,
    );

    const diff = price - marketPrice;

    if (Math.abs(diff) < tolerance) {
      break;
    }

    if (derivative === 0) {
      break;
    }

    rate -= diff / derivative;
  }

  // Annualize and convert to percentage
  return rate * periodsPerYear * 100;
}

/**
 * Calculate current yield: (Annual Coupon / Market Price) × 100
 */
export function calculateCurrentYield(
  faceValue: number,
  couponRate: number,
  marketPrice: number,
): number {
  const annualCoupon = faceValue * (couponRate / 100);
  return (annualCoupon / marketPrice) * 100;
}

/**
 * Calculate total interest: (Coupon × Periods) + (Face Value - Market Price)
 */
export function calculateTotalInterest(
  couponPerPeriod: number,
  totalPeriods: number,
  faceValue: number,
  marketPrice: number,
): number {
  return couponPerPeriod * totalPeriods + (faceValue - marketPrice);
}
