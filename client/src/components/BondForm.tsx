import { useState } from 'react';
import type { BondInput, CouponFrequency } from '@bond/shared';
import { validateBondInput, hasErrors } from '../utils/validation';
import type { ValidationErrors } from '../utils/validation';

interface BondFormProps {
  onSubmit: (input: BondInput) => void;
  loading: boolean;
}

export function BondForm({ onSubmit, loading }: BondFormProps) {
  const [faceValue, setFaceValue] = useState(1000);
  const [couponRate, setCouponRate] = useState(5);
  const [marketPrice, setMarketPrice] = useState(950);
  const [yearsToMaturity, setYearsToMaturity] = useState(10);
  const [couponFrequency, setCouponFrequency] = useState<CouponFrequency>('semi-annual');
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = { faceValue, couponRate, marketPrice, yearsToMaturity, couponFrequency };
    const validationErrors = validateBondInput(input);
    setErrors(validationErrors);
    if (!hasErrors(validationErrors)) {
      onSubmit(input);
    }
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const inputClasses =
    'w-full rounded-lg border border-surface-300 bg-surface-200 px-4 py-3 text-text-primary font-mono placeholder-text-muted focus:border-accent-600 focus:outline-none focus:ring-1 focus:ring-accent-600 transition-colors';

  const errorInputClasses =
    'w-full rounded-lg border border-danger-500 bg-surface-200 px-4 py-3 text-text-primary font-mono placeholder-text-muted focus:border-danger-500 focus:outline-none focus:ring-1 focus:ring-danger-500 transition-colors';

  const labelClasses = 'block text-sm font-medium text-text-secondary mb-1.5';

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-surface-300 bg-surface-50 p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold text-text-primary mb-6">Bond Parameters</h2>

      <div className="space-y-5">
        <div>
          <label className={labelClasses}>Face Value ($)</label>
          <input
            type="number"
            value={faceValue}
            onChange={(e) => { setFaceValue(Number(e.target.value)); clearError('faceValue'); }}
            className={errors.faceValue ? errorInputClasses : inputClasses}
            placeholder="e.g. 1000"
            min={1}
            step={100}
          />
          {errors.faceValue && <p className="mt-1 text-sm text-danger-500">{errors.faceValue}</p>}
        </div>

        <div>
          <label className={labelClasses}>Coupon Rate (%)</label>
          <input
            type="number"
            value={couponRate}
            onChange={(e) => { setCouponRate(Number(e.target.value)); clearError('couponRate'); }}
            className={errors.couponRate ? errorInputClasses : inputClasses}
            placeholder="e.g. 5"
            min={0}
            max={100}
            step={0.1}
          />
          {errors.couponRate && <p className="mt-1 text-sm text-danger-500">{errors.couponRate}</p>}
        </div>

        <div>
          <label className={labelClasses}>Market Price ($)</label>
          <input
            type="number"
            value={marketPrice}
            onChange={(e) => { setMarketPrice(Number(e.target.value)); clearError('marketPrice'); }}
            className={errors.marketPrice ? errorInputClasses : inputClasses}
            placeholder="e.g. 950"
            min={1}
            step={10}
          />
          {errors.marketPrice && <p className="mt-1 text-sm text-danger-500">{errors.marketPrice}</p>}
        </div>

        <div>
          <label className={labelClasses}>Years to Maturity</label>
          <input
            type="number"
            value={yearsToMaturity}
            onChange={(e) => { setYearsToMaturity(Number(e.target.value)); clearError('yearsToMaturity'); }}
            className={errors.yearsToMaturity ? errorInputClasses : inputClasses}
            placeholder="e.g. 10"
            min={1}
            step={1}
          />
          {errors.yearsToMaturity && <p className="mt-1 text-sm text-danger-500">{errors.yearsToMaturity}</p>}
        </div>

        <div>
          <label className={labelClasses}>Coupon Frequency</label>
          <div className="flex gap-2">
            {(['annual', 'semi-annual'] as CouponFrequency[]).map((freq) => (
              <button
                key={freq}
                type="button"
                onClick={() => setCouponFrequency(freq)}
                className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium capitalize transition-all ${
                  couponFrequency === freq
                    ? 'bg-accent-600 text-white shadow-sm'
                    : 'bg-surface-200 text-text-secondary border border-surface-300 hover:border-surface-400'
                }`}
              >
                {freq}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-accent-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-accent-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Calculating...
            </span>
          ) : (
            'Calculate Yield'
          )}
        </button>
      </div>
    </form>
  );
}
