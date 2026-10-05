import React, { useState } from 'react';
import {
  History,
  Search,
  Filter,
  Shield,
  Clock,
  UserCheck,
  Terminal,
  Download
} from 'lucide-react';
import { useBlockchain } from '../context/BlockchainContext';
import { PageHeader, StatusBadge } from '../components/ui/CommonUI';

export const AuditLogsPage: React.FC = () => {
  const { auditLogs } = useBlockchain();
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('All');

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch =
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.resource.toLowerCase().includes(search.toLowerCase()) ||
      log.ipSession.toLowerCase().includes(search.toLowerCase());

    const matchesAction = actionFilter === 'All' || log.action === actionFilter;
    return matchesSearch && matchesAction;
  });

  const handleExportLogs = () => {
    const headers = ['Timestamp', 'User', 'Action', 'Resource', 'IP / Session', 'Status'];
    const rows = filteredLogs.map(l => [
      l.timestamp,
      `"${l.user}"`,
      `"${l.action}"`,
      `"${l.resource}"`,
      `"${l.ipSession}"`,
      l.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `certichain_audit_logs_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Institutional Audit Logs"
        subtitle="Cryptographically sealed activity log of all ledger operations and identity queries"
        actions={
          <button
            onClick={handleExportLogs}
            className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-[#E5E7EB] rounded-lg hover:bg-slate-50 transition-colors inline-flex items-center gap-1.5 shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            Export Audit Trail
          </button>
        }
      />

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by operator email, target resource, or session..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#F7F9FC] border border-[#E5E7EB] rounded-lg focus:outline-none focus:bg-white focus:border-[#2563EB]"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 w-full md:w-auto">
          <Filter className="w-3.5 h-3.5" />
          <span>Action:</span>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="bg-[#F7F9FC] border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
          >
            <option value="All">All Operations</option>
            <option value="Certificate Issued">Certificate Issued</option>
            <option value="Certificate Verified">Certificate Verified</option>
            <option value="Certificate Revoked">Certificate Revoked</option>
            <option value="Blockchain Record Created">Blockchain Record Created</option>
            <option value="Tamper Detection Event">Tamper Detection Event</option>
            <option value="Login">Login</option>
          </select>
        </div>
      </div>

      {/* Audit Data Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#64748B] font-medium">
                <th className="py-3 px-4">Timestamp (UTC)</th>
                <th className="py-3 px-4">Operator / Principal</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Target Resource</th>
                <th className="py-3 px-4">Origin Session / IP</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#F8FAFC]/80 transition-colors">
                    <td className="py-3 px-4 text-slate-500 font-mono">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      {log.user}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        log.action.includes('Tamper')
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : log.action.includes('Revoked')
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-mono text-[11px]">
                      {log.resource}
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                      {log.ipSession}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={log.status} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <History className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-semibold text-slate-700">No audit records found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
