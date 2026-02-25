import type { BondInput } from '@bond/shared';

export type ValidationErrors = Record<string, string>;

export function validateBondInput(input: BondInput): ValidationErrors {
  const errors: ValidationErrors = {};

  if (input.faceValue < 1) {
    errors.faceValue = 'Face value must be at least $1';
  }

  if (input.couponRate < 0 || input.couponRate > 100) {
    errors.couponRate = 'Coupon rate must be between 0% and 100%';
  }

  if (input.marketPrice < 1) {
    errors.marketPrice = 'Market price must be at least $1';
  }

  if (input.yearsToMaturity < 1) {
    errors.yearsToMaturity = 'Years to maturity must be at least 1';
  } else if (!Number.isInteger(input.yearsToMaturity)) {
    errors.yearsToMaturity = 'Years to maturity must be a whole number';
  }

  return errors;
}

export function hasErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}
