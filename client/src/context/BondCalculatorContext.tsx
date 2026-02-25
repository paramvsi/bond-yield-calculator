import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useBondCalculator } from '../hooks/useBondCalculator';

type BondCalculatorContextType = ReturnType<typeof useBondCalculator>;

const BondCalculatorContext = createContext<BondCalculatorContextType | null>(null);

export function BondCalculatorProvider({ children }: { children: ReactNode }) {
  const value = useBondCalculator();
  return (
    <BondCalculatorContext.Provider value={value}>
      {children}
    </BondCalculatorContext.Provider>
  );
}

export function useBondCalculatorContext() {
  const context = useContext(BondCalculatorContext);
  if (!context) {
    throw new Error('useBondCalculatorContext must be used within a BondCalculatorProvider');
  }
  return context;
}
