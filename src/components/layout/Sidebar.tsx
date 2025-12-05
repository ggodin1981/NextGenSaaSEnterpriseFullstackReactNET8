import { NavLink, useLocation } from 'react-router-dom';
import { BanknotesIcon, ChartBarIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../state/AuthContext';

type NavItem = {
  to: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  adminOnly?: boolean;
};

const navItems: NavItem[] = [
  { to: '/', label: 'Dashboard', icon: ChartBarIcon },
  { to: '/admin/tenants', label: 'Tenants', icon: Cog6ToothIcon, adminOnly: true }
];

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <aside className="hidden md:flex md:flex-col w-64 border-r border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-800">
        <div className="h-9 w-9 rounded-2xl bg-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/40">
          <BanknotesIcon className="h-5 w-5 text-slate-950" />
        </div>
        <div>
          <div className="text-sm font-semibold tracking-wide">NextGen SaaS</div>
          <div className="text-xs text-slate-400">Enterprise BI &amp; Finance</div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          if (item.adminOnly && user?.role !== 'Admin') return null;
          const active = location.pathname === item.to;
          const ItemIcon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? 'bg-slate-900 text-primary-300'
                  : 'text-slate-300 hover:text-primary-200 hover:bg-slate-900/70'
              }`}
            >
              <ItemIcon className="h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="px-4 pb-4 text-xs text-slate-500">
        <div>Logged in as</div>
        <div className="font-medium text-slate-200 truncate">{user?.userName}</div>
        <div className="capitalize text-slate-400">{user?.role}</div>
      </div>
    </aside>
  );
};
