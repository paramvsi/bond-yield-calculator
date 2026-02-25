import type { PremiumDiscount } from '@bond/shared';
import { formatCurrency } from '../utils/formatters';

interface BondSummaryCardProps {
  premiumDiscount: PremiumDiscount;
}

const statusConfig = {
  premium: {
    label: 'Premium',
    badgeBg: 'bg-amber-500/15',
    badgeText: 'text-amber-600',
    borderColor: 'border-amber-500/30',
    description: 'Bond is trading above face value',
  },
  discount: {
    label: 'Discount',
    badgeBg: 'bg-accent-500/15',
    badgeText: 'text-accent-700',
    borderColor: 'border-accent-500/30',
    description: 'Bond is trading below face value',
  },
  par: {
    label: 'Par',
    badgeBg: 'bg-teal-500/15',
    badgeText: 'text-teal-600',
    borderColor: 'border-teal-500/30',
    description: 'Bond is trading at face value',
  },
};

export function BondSummaryCard({ premiumDiscount }: BondSummaryCardProps) {
  const config = statusConfig[premiumDiscount.status];

  return (
    <div
      className={`rounded-xl border ${config.borderColor} bg-surface-50 p-5 animate-scale-in`}
      style={{ animationDelay: '0.2s' }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-text-muted mb-1">Bond Status</p>
          <p className="text-text-secondary text-sm">{config.description}</p>
        </div>
        <div className="text-right">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${config.badgeBg} ${config.badgeText}`}
          >
            {config.label}
          </span>
          {premiumDiscount.amount > 0 && (
            <p className="mt-1 text-sm font-mono text-text-secondary tabular-nums">
              {formatCurrency(premiumDiscount.amount)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
