import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createApiClient, LoginResponse } from '../api/client';
import { useAuth } from '../state/AuthContext';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const api = createApiClient(null, null);
      const response = await api.post<LoginResponse>('/api/auth/login', { userName, password });
      const data = response.data;
      login(data.token, {
        userName: data.userName,
        role: data.role,
        tenantId: data.tenantId
      });
      navigate('/', { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.error ?? 'Login failed. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full glass-panel px-8 py-8">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-2 py-1 text-xs text-slate-400 border border-slate-800">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Demo environment</span>
          </div>
          <h1 className="mt-4 text-xl font-semibold text-slate-50">Sign in to NextGen SaaS</h1>
          <p className="mt-1 text-sm text-slate-400">
            Use <span className="font-mono text-xs bg-slate-900 px-1.5 py-0.5 rounded">admin / admin123</span> or{' '}
            <span className="font-mono text-xs bg-slate-900 px-1.5 py-0.5 rounded">user / user123</span>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Username</label>
            <input
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Password</label>
            <input
              type="password"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          {error && (
            <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};
