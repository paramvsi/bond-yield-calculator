import { useState } from 'react';
import axios from 'axios';
import type { BondInput, BondResult, ApiResponse } from '@bond/shared';

export function useBondCalculator() {
  const [result, setResult] = useState<BondResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculate = async (input: BondInput): Promise<BondResult | null> => {
    setLoading(true);
    setError(null);

    try {
      const baseUrl = import.meta.env.VITE_API_URL || '';
      const { data } = await axios.post<ApiResponse<BondResult>>(
        `${baseUrl}/api/bond/calculate`,
        input,
      );

      if (data.success && data.data) {
        setResult(data.data);
        return data.data;
      } else {
        setError(data.error || 'Calculation failed');
        return null;
      }
    } catch (err) {
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message || err.message
          : 'An unexpected error occurred',
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, calculate };
}
