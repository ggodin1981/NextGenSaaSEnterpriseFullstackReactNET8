import { FormEvent, useState } from 'react';
import { useApi } from '../../hooks/useApi';

type Props = {
  accountId: string | null;
  onCreated: () => void;
};

export const AddTransactionForm: React.FC<Props> = ({ accountId, onCreated }) => {
  const api = useApi();
  const [type, setType] = useState<'Credit' | 'Debit'>('Credit');
  const [amount, setAmount] = useState<number>(500);
  const [description, setDescription] = useState<string>('Demo transaction');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!accountId) return;
    setError(null);
    setLoading(true);
    try {
      await api.post(`/api/accounts/${accountId}/transactions`, {
        date: new Date().toISOString(),
        amount,
        type,
        description
      });
      setDescription('');
      setAmount(0);
      await onCreated();
    } catch (err: any) {
      setError(err.response?.data?.error ?? 'Failed to create transaction.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-100">Simulate Transaction</h2>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-400">
          Writes to live API
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="space-y-1">
          <label className="text-slate-400">Type</label>
          <select
            className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={type}
            onChange={(e) => setType(e.target.value as 'Credit' | 'Debit')}
          >
            <option value="Credit">Credit (inflow)</option>
            <option value="Debit">Debit (outflow)</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-slate-400">Amount (USD)</label>
          <input
            type="number"
            step="0.01"
            className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
        </div>
      </div>
      <div className="space-y-1 text-xs">
        <label className="text-slate-400">Description</label>
        <input
          className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Cloud spend, subscription, FX settlement"
        />
      </div>
      {error && (
        <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-[11px] text-rose-200">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={!accountId || loading}
        className="btn-primary text-xs px-3 py-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Posting…' : 'Post Transaction'}
      </button>
    </form>
  );
};
