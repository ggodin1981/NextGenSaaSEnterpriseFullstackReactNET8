import { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import type { Tenant } from '../api/client';

export const AdminTenantsPage: React.FC = () => {
  const api = useApi();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get<Tenant[]>('/api/tenants');
        setTenants(res.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [api]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-slate-50">Tenant Management</h1>
        <p className="text-xs text-slate-400 mt-1">
          Admin-only view of all tenants. Demonstrates role-based authorization and multi-tenant awareness.
        </p>
      </div>
      <div className="glass-panel p-4">
        {loading ? (
          <div className="text-xs text-slate-400">Loading tenants…</div>
        ) : (
          <table className="w-full text-xs">
            <thead className="text-slate-400 border-b border-slate-800">
              <tr>
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Id</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((t) => (
                <tr key={t.id} className="border-b border-slate-900/60">
                  <td className="py-2 text-slate-100">{t.name}</td>
                  <td className="py-2 font-mono text-[10px] text-slate-500">{t.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
