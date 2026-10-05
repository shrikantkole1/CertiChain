import React, { useState } from 'react';
import {
  ArrowLeftRight,
  Filter,
  Search,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  Layers
} from 'lucide-react';
import { useBlockchain } from '../context/BlockchainContext';
import { PageHeader, StatusBadge, HashDisplay } from '../components/ui/CommonUI';
import { BlockTransaction } from '../types';

export const TransactionsPage: React.FC = () => {
  const { blocks } = useBlockchain();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');

  // Extract all transactions from all blocks
  const allTransactions: BlockTransaction[] = blocks.flatMap(b => b.transactions);

  const filteredTransactions = allTransactions.filter(tx => {
    const matchesSearch =
      tx.transactionId.toLowerCase().includes(search.toLowerCase()) ||
      tx.certificateId.toLowerCase().includes(search.toLowerCase()) ||
      (tx.studentIdentifier && tx.studentIdentifier.toLowerCase().includes(search.toLowerCase()));

    const matchesType = typeFilter === 'All' || tx.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Blockchain Transactions"
        subtitle="Immutable ledger log of registration, updates, and revocation events"
      />

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by transaction ID or certificate ID..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#F7F9FC] border border-[#E5E7EB] rounded-lg focus:outline-none focus:bg-white focus:border-[#2563EB]"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 w-full md:w-auto">
          <Filter className="w-3.5 h-3.5" />
          <span>Type:</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-[#F7F9FC] border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
          >
            <option value="All">All Events</option>
            <option value="Certificate Registration">Certificate Registration</option>
            <option value="Certificate Revocation">Certificate Revocation</option>
            <option value="Certificate Update">Certificate Update</option>
          </select>
        </div>
      </div>

      {/* Transaction Data Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#64748B] font-medium">
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Certificate ID</th>
                <th className="py-3 px-4">Student / Context</th>
                <th className="py-3 px-4">Block #</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Issuer Node</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <tr key={tx.transactionId} className="hover:bg-[#F8FAFC]/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-semibold text-blue-700">
                      {tx.transactionId}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        tx.type === 'Certificate Registration'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {tx.certificateId}
                    </td>
                    <td className="py-3 px-4 text-slate-600 max-w-[220px] truncate" title={tx.studentIdentifier}>
                      {tx.studentIdentifier || 'N/A'}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        #{tx.blockNumber}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {new Date(tx.timestamp).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">
                      {tx.issuer}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={tx.status} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    <ArrowLeftRight className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-semibold text-slate-700">No transactions found</p>
                    <p className="text-xs text-slate-500 mt-1">
                      No matching records match your query filters.
                    </p>
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
