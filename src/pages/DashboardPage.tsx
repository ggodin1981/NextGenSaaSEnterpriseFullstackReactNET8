import { useEffect, useMemo, useState } from 'react';
import { useApi } from '../hooks/useApi';
import type { Account, Transaction } from '../api/client';
import { InsightPanel } from '../components/dashboard/InsightPanel';
import { TransactionsTable } from '../components/dashboard/TransactionsTable';
import { AddTransactionForm } from '../components/dashboard/AddTransactionForm';
import { SummaryCards } from '../components/dashboard/SummaryCards';

export const DashboardPage: React.FC = () => {
  const api = useApi();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [insight, setInsight] = useState<string>('');
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [loadingTx, setLoadingTx] = useState(false);
  const [loadingInsight, setLoadingInsight] = useState(false);

  useEffect(() => {
    const loadAccounts = async () => {
      setLoadingAccounts(true);
      try {
        const res = await api.get<Account[]>('/api/accounts');
        setAccounts(res.data);
        if (res.data.length > 0) {
          setSelectedAccountId(res.data[0].id);
        }
      } finally {
        setLoadingAccounts(false);
      }
    };
    loadAccounts();
  }, [api]);

  const selectedAccount = useMemo(
    () => accounts.find((a) => a.id === selectedAccountId) ?? null,
    [accounts, selectedAccountId]
  );

  useEffect(() => {
    const loadData = async () => {
      if (!selectedAccountId) return;
      setLoadingTx(true);
      setLoadingInsight(true);
      try {
        const [txRes, insightRes] = await Promise.all([
          api.get<Transaction[]>(`/api/accounts/${selectedAccountId}/transactions`),
          api.get<{ insight: string }>(`/api/accounts/${selectedAccountId}/ai-insight`)
        ]);
        setTransactions(txRes.data);
        setInsight(insightRes.data.insight);
      } finally {
        setLoadingTx(false);
        setLoadingInsight(false);
      }
    };
    loadData();
  }, [api, selectedAccountId]);

  const handleCreated = async () => {
    if (!selectedAccountId) return;
    const [txRes, insightRes] = await Promise.all([
      api.get<Transaction[]>(`/api/accounts/${selectedAccountId}/transactions`),
      api.get<{ insight: string }>(`/api/accounts/${selectedAccountId}/ai-insight`)
    ]);
    setTransactions(txRes.data);
    setInsight(insightRes.data.insight);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-slate-50">Financial Operations Overview</h1>
          <p className="text-xs text-slate-400 mt-1">
            Multi-tenant enterprise dashboard showing accounts, live transactions, and AI-generated insights.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400">Account</label>
          <select
            className="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={selectedAccountId ?? ''}
            onChange={(e) => setSelectedAccountId(e.target.value)}
            disabled={loadingAccounts || accounts.length === 0}
          >
            {accounts.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <SummaryCards account={selectedAccount} transactions={transactions} loading={loadingAccounts} />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-panel p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-slate-100">Recent Transactions</h2>
              {selectedAccount && (
                <span className="text-xs text-slate-500">
                  {selectedAccount.name} · Balance{' '}
                  <span className="text-primary-300 font-semibold">
                    {selectedAccount.balance.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                  </span>
                </span>
              )}
            </div>
            <TransactionsTable transactions={transactions} loading={loadingTx} />
          </div>
          <div className="glass-panel p-4">
            <AddTransactionForm accountId={selectedAccountId} onCreated={handleCreated} />
          </div>
        </div>
        <div className="glass-panel p-4">
          <InsightPanel insight={insight} loading={loadingInsight} />
        </div>
      </div>
    </div>
  );
};
