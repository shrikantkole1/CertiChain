import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  Menu, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Database
} from 'lucide-react';
import { useBlockchain } from '../../context/BlockchainContext';

export const Header: React.FC<{ onToggleSidebar: () => void }> = ({ onToggleSidebar }) => {
  const { user, institution, certificates } = useBlockchain();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/verify?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-xs border-b border-[#E5E7EB] px-4 lg:px-8 flex items-center justify-between">
      {/* Left: Mobile trigger & Greeting */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:block">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-semibold text-[#111827]">
              Good morning, {user?.name.split(' ')[0] || 'Administrator'}
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
              Node Synced
            </span>
          </div>
          <div className="text-[11px] text-[#64748B]">
            {institution.name} • {institution.code}
          </div>
        </div>
      </div>

      {/* Middle: Quick Search */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Quick search certificate ID (e.g. CERT-2026-001284) or hash..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-[#F7F9FC] border border-[#E5E7EB] rounded-lg focus:outline-none focus:bg-white focus:border-[#2563EB] transition-colors"
          />
        </form>
      </div>

      {/* Right: Quick actions, notifications, status */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            title="Notifications & Alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-[#E5E7EB] rounded-xl shadow-lg p-3 z-50 text-xs">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E5E7EB] font-semibold text-[#111827]">
                <span>System Security Alerts</span>
                <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-[#64748B]">Latest</span>
              </div>
              <div className="space-y-2">
                <div className="p-2 rounded bg-amber-50 border border-amber-200">
                  <div className="font-semibold text-amber-900">Tamper Attempt Logged</div>
                  <div className="text-amber-700 text-[11px] mt-0.5">
                    Hash mismatch detected on CERT-2026-001284 via public portal verification.
                  </div>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <div className="font-semibold text-slate-800">New Block Added</div>
                  <div className="text-slate-600 text-[11px] mt-0.5">
                    Block #5 registered successfully with 2 transactions.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-4 w-[1px] bg-slate-200 hidden sm:block" />

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#123B5D] text-white flex items-center justify-center font-semibold text-xs border border-slate-200">
            {user?.name.charAt(0) || 'A'}
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-semibold text-[#111827] leading-none">
              {user?.name || 'Administrator'}
            </div>
            <div className="text-[10px] text-[#64748B] mt-0.5">
              {user?.role === 'SUPER_ADMIN' ? 'Super Administrator' : 'Dean / Registrar'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
