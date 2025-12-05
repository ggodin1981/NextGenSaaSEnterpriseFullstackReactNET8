import { useAuth } from '../../state/AuthContext';

export const TopBar: React.FC = () => {
  const { logout, user } = useAuth();

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Control Center</div>
        <div className="text-sm font-semibold text-slate-100">NextGen SaaS Enterprise</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex flex-col items-end text-xs">
          <span className="text-slate-300">{user?.userName}</span>
          <span className="text-slate-500 capitalize">{user?.role}</span>
        </div>
        <button
          onClick={logout}
          className="btn-outline text-xs px-3 py-1.5"
        >
          Sign out
        </button>
      </div>
    </header>
  );
};
