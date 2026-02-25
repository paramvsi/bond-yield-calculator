export type CouponFrequency = 'annual' | 'semi-annual';

export interface BondInput {
  faceValue: number;
  couponRate: number; // percentage, e.g. 5 for 5%
  marketPrice: number;
  yearsToMaturity: number;
  couponFrequency: CouponFrequency;
}

export type PremiumDiscountStatus = 'premium' | 'discount' | 'par';

export interface PremiumDiscount {
  status: PremiumDiscountStatus;
  amount: number;
}

export interface CashFlowEntry {
  period: number;
  paymentDate: string; // ISO string
  couponPayment: number;
  cumulativeInterest: number;
  remainingPrincipal: number;
}

export interface BondResult {
  currentYield: number;
  ytm: number;
  totalInterest: number;
  premiumDiscount: PremiumDiscount;
  cashFlowSchedule: CashFlowEntry[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
