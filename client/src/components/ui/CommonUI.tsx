import React, { useState } from 'react';
import { Copy, Check, LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// StatusBadge
export const StatusBadge: React.FC<{ status: 'Verified' | 'Pending' | 'Revoked' | 'Confirmed' | 'Success' | 'Warning' | 'Failed' | string }> = ({ status }) => {
  let colorStyles = 'bg-slate-100 text-slate-700 border-slate-200';

  if (status === 'Verified' || status === 'Confirmed' || status === 'Success') {
    colorStyles = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (status === 'Pending' || status === 'Warning') {
    colorStyles = 'bg-amber-50 text-amber-700 border-amber-200';
  } else if (status === 'Revoked' || status === 'Failed') {
    colorStyles = 'bg-rose-50 text-rose-700 border-rose-200';
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${colorStyles}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
        status === 'Verified' || status === 'Confirmed' || status === 'Success' ? 'bg-emerald-500' :
        status === 'Pending' || status === 'Warning' ? 'bg-amber-500' : 'bg-rose-500'
      }`} />
      {status}
    </span>
  );
};

// StatCard
interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  subtitle?: string;
  icon?: LucideIcon;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  subtitle,
  icon: Icon
}) => {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs hover:border-slate-300 transition-colors">
      <div className="flex items-center justify-between text-[#64748B] mb-2">
        <span className="text-xs font-medium tracking-wide">{title}</span>
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#123B5D]">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between mt-1">
        <div className="text-2xl lg:text-3xl font-semibold text-[#111827] tracking-tight">
          {value}
        </div>

        {change && (
          <span className={`inline-flex items-center text-xs font-semibold ${
            isPositive ? 'text-emerald-600' : 'text-rose-600'
          }`}>
            {isPositive ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
            {change}
          </span>
        )}
      </div>

      {subtitle && (
        <div className="text-[12px] text-[#64748B] mt-1.5 flex items-center gap-1 font-medium">
          {subtitle}
        </div>
      )}
    </div>
  );
};

// HashDisplay with copy button
export const HashDisplay: React.FC<{ hash: string; truncate?: boolean; label?: string }> = ({
  hash,
  truncate = true,
  label
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayHash = truncate && hash.length > 20
    ? `${hash.substring(0, 10)}...${hash.substring(hash.length - 8)}`
    : hash;

  return (
    <div className="inline-flex items-center gap-1.5 font-mono text-xs bg-slate-50 hover:bg-slate-100/80 px-2 py-1 rounded border border-slate-200 transition-colors group">
      {label && <span className="text-[10px] uppercase font-bold text-slate-500 mr-1">{label}:</span>}
      <span className="text-slate-800 font-mono" title={hash}>
        {displayHash}
      </span>
      <button
        onClick={handleCopy}
        className="text-slate-400 group-hover:text-slate-700 p-0.5 hover:bg-white rounded transition-colors ml-0.5"
        title="Copy full cryptographic hash"
      >
        {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
      </button>
    </div>
  );
};

// PageHeader
export const PageHeader: React.FC<{
  title: string;
  subtitle: string;
  badge?: string;
  actions?: React.ReactNode;
}> = ({ title, subtitle, badge, actions }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-xl sm:text-2xl font-semibold text-[#111827] tracking-tight">
            {title}
          </h1>
          {badge && (
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-50 text-[#2563EB] border border-blue-100">
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1">
          {subtitle}
        </p>
      </div>
      {actions && <div className="flex items-center gap-2.5">{actions}</div>}
    </div>
  );
};
