import type { CashFlowEntry } from '@bond/shared';
import { formatCurrency, formatDate } from '../utils/formatters';

interface CashFlowTableProps {
  schedule: CashFlowEntry[];
}

export function CashFlowTable({ schedule }: CashFlowTableProps) {
  return (
    <div className="rounded-2xl border border-surface-300 bg-surface-50 overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-surface-300">
        <h3 className="text-lg font-semibold text-text-primary">Cash Flow Schedule</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-300 text-text-muted">
              <th className="px-6 py-3 text-left font-medium">Period</th>
              <th className="px-6 py-3 text-left font-medium">Payment Date</th>
              <th className="px-6 py-3 text-right font-medium">Coupon Payment</th>
              <th className="px-6 py-3 text-right font-medium">Cumulative Interest</th>
              <th className="px-6 py-3 text-right font-medium">Remaining Principal</th>
            </tr>
          </thead>
          <tbody className="font-mono tabular-nums">
            {schedule.map((entry, index) => {
              const isLast = index === schedule.length - 1;
              return (
                <tr
                  key={entry.period}
                  className={`border-b border-surface-200 transition-colors hover:bg-surface-200 ${
                    isLast ? 'bg-accent-500/5 font-semibold' : ''
                  }`}
                >
                  <td className="px-6 py-3 text-text-secondary">{entry.period}</td>
                  <td className="px-6 py-3 text-text-secondary">{formatDate(entry.paymentDate)}</td>
                  <td className="px-6 py-3 text-right text-text-primary">
                    {formatCurrency(entry.couponPayment)}
                  </td>
                  <td className="px-6 py-3 text-right text-accent-700">
                    {formatCurrency(entry.cumulativeInterest)}
                  </td>
                  <td className="px-6 py-3 text-right text-text-primary">
                    {formatCurrency(entry.remainingPrincipal)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
