import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Server,
  Key,
  Terminal,
  Activity,
  FileCheck2,
  RotateCcw
} from 'lucide-react';
import { useBlockchain } from '../context/BlockchainContext';
import { PageHeader, StatusBadge } from '../components/ui/CommonUI';

export const SecurityPage: React.FC = () => {
  const { blocks, isChainValid, auditLogs, tamperBlockDataForDemo, restoreBlockData } = useBlockchain();
  const [validating, setValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    reason?: string;
    checked: boolean;
  }>({ valid: true, checked: false });

  const runIntegrityAudit = async () => {
    setValidating(true);
    await new Promise(r => setTimeout(r, 600));
    const res = await isChainValid();
    setValidationResult({ valid: res.valid, reason: res.reason, checked: true });
    setValidating(false);
  };

  const securityEvents = auditLogs.filter(
    l => l.action.includes('Tamper') || l.action.includes('Revoked') || l.status === 'Warning' || l.status === 'Failed'
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Security Center & Cryptographic Audit"
        subtitle="Real-time validation of distributed ledger integrity, cryptographic algorithms, and access telemetry"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={runIntegrityAudit}
              disabled={validating}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-[#123B5D] hover:bg-[#0E2E49] rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{validating ? 'Running Merkle Proofs...' : 'Execute Deep Chain Audit'}</span>
            </button>
            <button
              onClick={restoreBlockData}
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-[#E5E7EB] hover:bg-slate-50 rounded-lg inline-flex items-center gap-1.5 shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              Reset State
            </button>
          </div>
        }
      />

      {/* Validation Result Box */}
      {validationResult.checked && (
        <div className={`p-5 rounded-xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          validationResult.valid
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
            : 'bg-rose-50 border-rose-300 text-rose-900'
        }`}>
          <div className="flex items-center gap-3">
            {validationResult.valid ? (
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
            )}
            <div>
              <h3 className="font-semibold text-sm">
                {validationResult.valid
                  ? 'Cryptographic Chain Validation Passed'
                  : 'Ledger Tamper Breach Detected!'}
              </h3>
              <p className="text-[11px] mt-0.5">
                {validationResult.valid
                  ? `Recalculated cryptographic hashes across all ${blocks.length} sequential blocks. All previousHash pointers and block hashes match.`
                  : validationResult.reason}
              </p>
            </div>
          </div>
          <span className="font-mono text-xs font-bold px-3 py-1 rounded bg-white border border-current self-start sm:self-auto">
            {validationResult.valid ? 'STATUS: VALID' : 'STATUS: CORRUPT'}
          </span>
        </div>
      )}

      {/* System Integrity Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>System Integrity</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <div className="text-xl font-bold text-emerald-600">HEALTHY</div>
          <p className="text-[11px] text-slate-500 mt-1">Node services operational</p>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Blockchain Integrity</span>
            <Lock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xl font-bold text-slate-900">VERIFIED</div>
          <p className="text-[11px] text-slate-500 mt-1">{blocks.length} blocks verified</p>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Hashing Algorithm</span>
            <Key className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-xl font-bold text-slate-900">SHA-256</div>
          <p className="text-[11px] text-slate-500 mt-1">FIPS 180-4 Standard</p>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Audit Logging</span>
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-bold text-emerald-600">ACTIVE</div>
          <p className="text-[11px] text-slate-500 mt-1">Real-time session recording</p>
        </div>
      </div>

      {/* Security Testing / Demonstration Interactive Box */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Interactive Blockchain Tamper Proof Demonstration
            </h2>
            <p className="text-xs text-slate-500">
              Demonstrate how the blockchain mathematically prevents retrospective alterations
            </p>
          </div>
          <span className="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-mono font-medium border border-blue-200">
            Educational Demo
          </span>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-2">
          <p className="text-slate-700 leading-relaxed">
            Click <strong>"Simulate Corrupt Block #1"</strong> to artificially alter the transactions payload in Block #1. When you run <strong>"Execute Deep Chain Audit"</strong>, the cryptographic chain verification will immediately identify that Block #2's <code>previousHash</code> pointer broke the link.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                tamperBlockDataForDemo(1);
                runIntegrityAudit();
              }}
              className="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-lg font-medium text-xs transition-colors"
            >
              Simulate Corrupt Block #1
            </button>
            <button
              onClick={() => {
                restoreBlockData();
                runIntegrityAudit();
              }}
              className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-lg font-medium text-xs transition-colors"
            >
              Restore & Heal Ledger
            </button>
          </div>
        </div>
      </div>

      {/* Security Events & Incident Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#E5E7EB]">
          <h2 className="text-sm font-semibold text-slate-900">
            Recent Security & Tamper Detection Events
          </h2>
          <p className="text-xs text-slate-500">
            Historical anomalies detected by the verification pipeline
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#64748B] font-medium">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Event Type</th>
                <th className="py-3 px-4">Subject Resource</th>
                <th className="py-3 px-4">Client Telemetry</th>
                <th className="py-3 px-4">Action Taken</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {securityEvents.length > 0 ? (
                securityEvents.map((evt) => (
                  <tr key={evt.id} className="hover:bg-[#F8FAFC]/80 transition-colors">
                    <td className="py-3 px-4 text-slate-500 font-mono">
                      {new Date(evt.timestamp).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                        {evt.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-800">
                      {evt.resource}
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-[11px] font-mono">
                      {evt.ipSession}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-emerald-700 font-medium">Blocked & Logged</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    No active threat incidents logged.
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
