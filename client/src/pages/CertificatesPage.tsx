import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Download,
  Plus,
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Trash2,
  Eye,
  QrCode
} from 'lucide-react';
import { useBlockchain } from '../context/BlockchainContext';
import { PageHeader, StatusBadge, HashDisplay } from '../components/ui/CommonUI';
import { Certificate } from '../types';

export const CertificatesPage: React.FC = () => {
  const { certificates, revokeCertificate } = useBlockchain();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Verified' | 'Revoked'>('All');
  const [programFilter, setProgramFilter] = useState<string>('All');
  const [selectedCertForRevoke, setSelectedCertForRevoke] = useState<Certificate | null>(null);
  const [revokeReason, setRevokeReason] = useState('');
  const [isSubmittingRevoke, setIsSubmittingRevoke] = useState(false);

  const programs = Array.from(new Set(certificates.map(c => c.program)));

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch =
      cert.certificateId.toLowerCase().includes(search.toLowerCase()) ||
      cert.studentName.toLowerCase().includes(search.toLowerCase()) ||
      cert.studentId.toLowerCase().includes(search.toLowerCase()) ||
      cert.certificateHash.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All' || cert.status === statusFilter;
    const matchesProgram = programFilter === 'All' || cert.program === programFilter;

    return matchesSearch && matchesStatus && matchesProgram;
  });

  const handleExportCSV = () => {
    const headers = ['Certificate ID', 'Student Name', 'Student ID', 'Program', 'Issue Date', 'Hash', 'Block', 'Status'];
    const rows = filteredCertificates.map(c => [
      c.certificateId,
      `"${c.studentName}"`,
      c.studentId,
      `"${c.program}"`,
      c.issueDate,
      c.certificateHash,
      c.blockNumber,
      c.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `certichain_registry_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const confirmRevocation = async () => {
    if (!selectedCertForRevoke) return;
    setIsSubmittingRevoke(true);
    await revokeCertificate(selectedCertForRevoke.certificateId, revokeReason || 'Administrative revocation request');
    setIsSubmittingRevoke(false);
    setSelectedCertForRevoke(null);
    setRevokeReason('');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Certificates Registry"
        subtitle="Manage and audit academic credentials anchored to the immutable ledger"
        actions={
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExportCSV}
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-[#E5E7EB] rounded-lg hover:bg-slate-50 transition-colors inline-flex items-center gap-1.5 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>
            <button
              onClick={() => navigate('/certificates/issue')}
              className="px-3.5 py-2 text-xs font-medium text-white bg-[#123B5D] hover:bg-[#0E2E49] rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              Issue Certificate
            </button>
          </div>
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
            placeholder="Search by student name, ID, or certificate #..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#F7F9FC] border border-[#E5E7EB] rounded-lg focus:outline-none focus:bg-white focus:border-[#2563EB]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-[#F7F9FC] border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Verified">Verified Only</option>
              <option value="Revoked">Revoked</option>
            </select>
          </div>

          {/* Program Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>Program:</span>
            <select
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
              className="bg-[#F7F9FC] border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none max-w-[200px]"
            >
              <option value="All">All Programs</option>
              {programs.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#64748B] font-medium">
                <th className="py-3 px-4">Certificate ID</th>
                <th className="py-3 px-4">Candidate / Student</th>
                <th className="py-3 px-4">Program & Dept</th>
                <th className="py-3 px-4">Issue Date</th>
                <th className="py-3 px-4">Cryptographic Hash</th>
                <th className="py-3 px-4">Block Ref</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredCertificates.length > 0 ? (
                filteredCertificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-[#F8FAFC]/80 transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#111827]">
                      {cert.certificateId}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-900">{cert.studentName}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{cert.studentId}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-slate-800 font-medium">{cert.program}</div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[200px]">{cert.department}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{cert.issueDate}</td>
                    <td className="py-3 px-4">
                      <HashDisplay hash={cert.certificateHash} />
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => navigate(`/blockchain/${cert.blockNumber}`)}
                        className="font-mono text-[#2563EB] hover:underline bg-blue-50/50 px-2 py-0.5 rounded border border-blue-100"
                      >
                        Block #{cert.blockNumber}
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={cert.status} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => navigate(`/verify/${cert.certificateId}`)}
                          className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded transition-colors"
                          title="Verify in portal"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        {cert.status !== 'Revoked' && (
                          <button
                            onClick={() => setSelectedCertForRevoke(cert)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Revoke certificate"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    <FileCheck2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-semibold text-slate-700">No certificates found</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Try changing your search query or adjusting your filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revocation Confirmation Modal */}
      {selectedCertForRevoke && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
                <ShieldAlert className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm">
                  Confirm Certificate Revocation
                </h3>
                <p className="text-xs text-slate-500">
                  This action will append a Revocation Transaction to the blockchain.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1">
              <div><span className="font-semibold">Certificate ID:</span> {selectedCertForRevoke.certificateId}</div>
              <div><span className="font-semibold">Candidate:</span> {selectedCertForRevoke.studentName}</div>
              <div><span className="font-semibold">Program:</span> {selectedCertForRevoke.program}</div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Reason for Revocation (Audited in block metadata)
              </label>
              <textarea
                value={revokeReason}
                onChange={(e) => setRevokeReason(e.target.value)}
                placeholder="e.g. Administrative error, re-issue requested, or credential invalidated"
                className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-red-500 resize-none h-20"
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setSelectedCertForRevoke(null)}
                disabled={isSubmittingRevoke}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmRevocation}
                disabled={isSubmittingRevoke}
                className="px-3.5 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg inline-flex items-center gap-1.5"
              >
                {isSubmittingRevoke ? 'Mining Revocation Block...' : 'Confirm Revocation'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
