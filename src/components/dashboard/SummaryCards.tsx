import type { Account, Transaction } from '../../api/client';

type Props = {
  account: Account | null;
  transactions: Transaction[];
  loading: boolean;
};

export const SummaryCards: React.FC<Props> = ({ account, transactions, loading }) => {
  const credits = transactions.filter((t) => t.type.toLowerCase() === 'credit');
  const debits = transactions.filter((t) => t.type.toLowerCase() === 'debit');

  const totalCredits = credits.reduce((sum, t) => sum + t.amount, 0);
  const totalDebits = debits.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="grid sm:grid-cols-3 gap-4">
      <div className="glass-panel px-4 py-3">
        <div className="text-[11px] text-slate-400">Current Balance</div>
        <div className="mt-1 text-lg font-semibold text-slate-50">
          {loading || !account
            ? '—'
            : account.balance.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
        </div>
        <div className="mt-1 text-[10px] text-slate-500">Per selected account</div>
      </div>
      <div className="glass-panel px-4 py-3">
        <div className="text-[11px] text-slate-400">Recent Inflows</div>
        <div className="mt-1 text-lg font-semibold text-emerald-300">
          {loading ? '—' : totalCredits.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
        </div>
        <div className="mt-1 text-[10px] text-emerald-400/80">
          {credits.length} credit transaction{credits.length === 1 ? '' : 's'}
        </div>
      </div>
      <div className="glass-panel px-4 py-3">
        <div className="text-[11px] text-slate-400">Recent Outflows</div>
        <div className="mt-1 text-lg font-semibold text-rose-300">
          {loading ? '—' : totalDebits.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
        </div>
        <div className="mt-1 text-[10px] text-rose-400/80">
          {debits.length} debit transaction{debits.length === 1 ? '' : 's'}
        </div>
      </div>
    </div>
  );
};
