import type { BondResult } from '@bond/shared';
import { formatPercent, formatCurrency } from '../utils/formatters';

interface ResultsPanelProps {
  result: BondResult;
}

interface MetricCardProps {
  label: string;
  value: string;
  delay: string;
  accentColor: string;
}

function MetricCard({ label, value, delay, accentColor }: MetricCardProps) {
  return (
    <div
      className="rounded-xl border border-surface-300 bg-surface-50 p-5 animate-scale-in"
      style={{ animationDelay: delay, borderTopWidth: '3px', borderTopColor: accentColor }}
    >
      <p className="text-sm text-text-muted mb-1">{label}</p>
      <p className="text-2xl font-mono font-bold text-text-primary tabular-nums">{value}</p>
    </div>
  );
}

export function ResultsPanel({ result }: ResultsPanelProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <MetricCard
        label="Current Yield"
        value={formatPercent(result.currentYield)}
        delay="0s"
        accentColor="var(--color-accent-600)"
      />
      <MetricCard
        label="Yield to Maturity"
        value={formatPercent(result.ytm)}
        delay="0.05s"
        accentColor="var(--color-teal-500)"
      />
      <MetricCard
        label="Total Interest"
        value={formatCurrency(result.totalInterest)}
        delay="0.1s"
        accentColor="var(--color-amber-500)"
      />
      <MetricCard
        label="Cash Flow Periods"
        value={String(result.cashFlowSchedule.length)}
        delay="0.15s"
        accentColor="var(--color-accent-600)"
      />
    </div>
  );
}
