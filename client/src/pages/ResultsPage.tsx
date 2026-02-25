import { Navigate, Link } from 'react-router-dom';
import { ResultsPanel } from '../components/ResultsPanel';
import { BondSummaryCard } from '../components/BondSummaryCard';
import { CashFlowTable } from '../components/CashFlowTable';
import { useBondCalculatorContext } from '../context/BondCalculatorContext';

export default function ResultsPage() {
  const { result } = useBondCalculatorContext();

  if (!result) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="animate-fade-in">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted transition-colors hover:text-text-primary"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
          </svg>
          Back to Calculator
        </Link>
      </div>

      <div className="animate-slide-up">
        <ResultsPanel result={result} />
      </div>

      <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <BondSummaryCard premiumDiscount={result.premiumDiscount} />
      </div>

      <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <CashFlowTable schedule={result.cashFlowSchedule} />
      </div>

    </div>
  );
}
