import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileCheck2,
  FilePlus2,
  ShieldCheck,
  Blocks,
  ArrowLeftRight,
  History,
  BarChart3,
  Shield,
  Settings,
  LogOut,
  Building2,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useBlockchain } from '../../context/BlockchainContext';

export const Sidebar: React.FC<{ isOpen?: boolean; onClose?: () => void }> = ({ isOpen = false, onClose }) => {
  const { user, logout, institution } = useBlockchain();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Certificates', path: '/certificates', icon: FileCheck2 },
    { label: 'Issue Certificate', path: '/certificates/issue', icon: FilePlus2 },
    { label: 'Public Verify', path: '/verify', icon: ShieldCheck, isPublic: true },
    { label: 'Blockchain', path: '/blockchain', icon: Blocks },
    { label: 'Transactions', path: '/transactions', icon: ArrowLeftRight },
    { label: 'Audit Logs', path: '/audit', icon: History },
    { label: 'Analytics', path: '/analytics', icon: BarChart3 },
    { label: 'Security Center', path: '/security', icon: Shield },
    { label: 'Institution Profile', path: '/institution', icon: Building2 },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 w-[260px] bg-white border-r border-[#E5E7EB] z-50 flex flex-col justify-between transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand / Logo */}
        <div>
          <div className="h-16 px-6 border-b border-[#E5E7EB] flex items-center justify-between">
            <NavLink to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#123B5D] flex items-center justify-center text-white shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg tracking-tight text-[#111827] leading-none">
                  Certi<span className="text-[#2563EB]">Chain</span>
                </span>
                <span className="text-[10px] text-[#64748B] font-medium tracking-wider uppercase mt-1">
                  Enterprise Node
                </span>
              </div>
            </NavLink>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || 
                (item.path !== '/dashboard' && item.path !== '/' && location.pathname.startsWith(item.path) && item.path !== '/verify');

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg text-[13.5px] font-medium transition-colors
                    ${isActive 
                      ? 'bg-[#123B5D] text-white shadow-xs' 
                      : 'text-[#64748B] hover:text-[#111827] hover:bg-[#F7F9FC]'
                    }
                  `}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#64748B]'}`} />
                  <span>{item.label}</span>
                  {item.isPublic && (
                    <span className="ml-auto text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-blue-50 text-[#2563EB] border border-blue-100">
                      Public
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile / Institution Card */}
        <div className="p-3 border-t border-[#E5E7EB] bg-[#F7F9FC]/60">
          <div className="p-2.5 rounded-lg border border-[#E5E7EB] bg-white mb-2 shadow-xs">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-slate-700">
                <Building2 className="w-3.5 h-3.5" />
              </div>
              <div className="truncate flex-1">
                <div className="text-[12px] font-semibold text-[#111827] truncate" title={institution.name}>
                  VIT Pune
                </div>
                <div className="text-[10px] text-[#16A34A] flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3 h-3 text-[#16A34A]" />
                  Verified Node
                </div>
              </div>
            </div>
            <div className="text-[11px] text-[#64748B] font-mono truncate">
              {institution.blockchainAddress.slice(0, 10)}...{institution.blockchainAddress.slice(-6)}
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-[#64748B] hover:text-[#DC2626] hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>
    </>
  );
};
