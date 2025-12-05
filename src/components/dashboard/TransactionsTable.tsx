import type { Transaction } from '../../api/client';

type Props = {
  transactions: Transaction[];
  loading: boolean;
};

export const TransactionsTable: React.FC<Props> = ({ transactions, loading }) => {
  if (loading) {
    return <div className="text-xs text-slate-400">Loading transactions…</div>;
  }

  if (!transactions.length) {
    return <div className="text-xs text-slate-500">No transactions recorded yet.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead className="text-slate-400 border-b border-slate-800">
          <tr>
            <th className="text-left py-2">Date</th>
            <th className="text-left py-2">Type</th>
            <th className="text-right py-2">Amount</th>
            <th className="text-left py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} className="border-b border-slate-900/60">
              <td className="py-2 text-slate-300">
                {new Date(t.date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit'
                })}
              </td>
              <td className="py-2">
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    t.type.toLowerCase() === 'credit'
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                  }`}
                >
                  {t.type}
                </span>
              </td>
              <td className="py-2 text-right text-slate-100">
                {t.amount.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
              </td>
              <td className="py-2 text-slate-400">{t.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
