import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Blocks,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Database,
  Search,
  ExternalLink,
  Layers,
  Activity,
  RotateCcw
} from 'lucide-react';
import { useBlockchain } from '../context/BlockchainContext';
import { PageHeader, HashDisplay, StatusBadge } from '../components/ui/CommonUI';
import { Block } from '../types';

export const BlockchainExplorerPage: React.FC = () => {
  const { blocks, isChainValid, tamperBlockDataForDemo, restoreBlockData } = useBlockchain();
  const navigate = useNavigate();

  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [chainValidationResult, setChainValidationResult] = useState<{
    valid: boolean;
    reason?: string;
    checked: boolean;
  }>({ valid: true, checked: false });
  const [searchBlockQuery, setSearchBlockQuery] = useState('');

  const totalTransactions = blocks.reduce((acc, b) => acc + b.transactions.length, 0);

  const handleValidateLedger = async () => {
    const res = await isChainValid();
    setChainValidationResult({ valid: res.valid, reason: res.reason, checked: true });
  };

  const filteredBlocks = blocks.filter(b => {
    if (!searchBlockQuery) return true;
    const query = searchBlockQuery.toLowerCase();
    return (
      b.index.toString() === query ||
      b.hash.toLowerCase().includes(query) ||
      b.previousHash.toLowerCase().includes(query) ||
      b.transactions.some(t => t.certificateId.toLowerCase().includes(query) || t.transactionId.toLowerCase().includes(query))
    );
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Blockchain Explorer"
        subtitle="Transparent view of certificate integrity records anchored on the ledger"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={handleValidateLedger}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-[#123B5D] hover:bg-[#0E2E49] rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Verify Chain Integrity
            </button>
            <button
              onClick={restoreBlockData}
              className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-[#E5E7EB] hover:bg-slate-50 rounded-lg inline-flex items-center gap-1.5 shadow-2xs"
              title="Reset ledger to initial verified state"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              Reset Chain
            </button>
          </div>
        }
      />

      {/* Validation Banner if checked */}
      {chainValidationResult.checked && (
        <div className={`p-4 rounded-xl border text-xs flex items-center justify-between ${
          chainValidationResult.valid
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
            : 'bg-rose-50 border-rose-200 text-rose-900'
        }`}>
          <div className="flex items-center gap-2.5">
            {chainValidationResult.valid ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <div>
              <span className="font-semibold text-sm">
                {chainValidationResult.valid ? 'All Blocks Validated & Linked' : 'Cryptographic Chain Integrity Breach Detected!'}
              </span>
              <p className="text-[11px] mt-0.5 opacity-90">
                {chainValidationResult.valid
                  ? 'Recalculated cryptographic hashes across all sequential blocks. Merkle roots and previousHash pointers match perfectly.'
                  : chainValidationResult.reason}
              </p>
            </div>
          </div>
          <span className="font-mono uppercase font-bold text-[10px] px-2 py-0.5 rounded bg-white/80 border border-current">
            {chainValidationResult.valid ? '100% HEALTHY' : 'CORRUPTED'}
          </span>
        </div>
      )}

      {/* Top Ledger Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-xs">
          <div className="text-xs text-[#64748B] flex items-center justify-between">
            <span>Total Blocks</span>
            <Layers className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-[#111827] mt-1">{blocks.length}</div>
          <div className="text-[11px] text-[#64748B] mt-1">From Genesis #0 to #{blocks.length - 1}</div>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-xs">
          <div className="text-xs text-[#64748B] flex items-center justify-between">
            <span>Total Transactions</span>
            <Activity className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-[#111827] mt-1">{totalTransactions}</div>
          <div className="text-[11px] text-emerald-600 mt-1 font-medium">All confirmed on ledger</div>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-xs">
          <div className="text-xs text-[#64748B] flex items-center justify-between">
            <span>Latest Block</span>
            <Blocks className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-[#111827] mt-1">#{blocks[blocks.length - 1].index}</div>
          <div className="text-[11px] text-[#64748B] mt-1 font-mono truncate">
            {blocks[blocks.length - 1].hash.slice(0, 16)}...
          </div>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-xs">
          <div className="text-xs text-[#64748B] flex items-center justify-between">
            <span>Chain Status</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">Healthy</div>
          <div className="text-[11px] text-[#64748B] mt-1">Educational Consensus Active</div>
        </div>
      </div>

      {/* Explorer Search */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-3 shadow-xs">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchBlockQuery}
            onChange={(e) => setSearchBlockQuery(e.target.value)}
            placeholder="Search block height (e.g. 1), block hash, previous hash, or certificate ID..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#F7F9FC] border border-[#E5E7EB] rounded-lg focus:outline-none focus:bg-white focus:border-[#2563EB]"
          />
        </div>
      </div>

      {/* Visual Block Chain Pipeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">
            Sequential Blockchain Ledger ({filteredBlocks.length} Blocks)
          </h2>
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span>Simulate integrity test:</span>
            <button
              onClick={() => {
                if (blocks.length > 1) {
                  tamperBlockDataForDemo(1);
                  handleValidateLedger();
                }
              }}
              className="text-xs text-rose-600 hover:underline font-medium"
            >
              Corrupt Block #1 Hash
            </button>
          </div>
        </div>

        {/* List of Connected Blocks */}
        <div className="space-y-4">
          {filteredBlocks.map((block, idx) => {
            const isGenesis = block.index === 0;

            return (
              <div key={block.index} className="relative">
                {/* Connecting Line to next block */}
                {idx < filteredBlocks.length - 1 && (
                  <div className="absolute left-8 top-full w-0.5 h-4 bg-slate-300 z-10" />
                )}

                <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs hover:border-slate-300 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#123B5D] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                        #{block.index}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-slate-900 text-sm">
                            {isGenesis ? 'Genesis Block' : `Block #${block.index}`}
                          </h3>
                          <StatusBadge status="Confirmed" />
                          {isGenesis && (
                            <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                              Network Root
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500">
                          Timestamp: {new Date(block.timestamp).toLocaleString()} • Validator: {block.validator}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedBlock(block)}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center gap-1"
                      >
                        <span>Inspect Block</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Block Hashes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 text-xs font-mono">
                    <div className="bg-[#F8FAFC] p-2.5 rounded-lg border border-slate-200">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                        Current Block Hash
                      </span>
                      <div className="text-slate-800 break-all select-all font-mono">
                        {block.hash}
                      </div>
                    </div>

                    <div className="bg-[#F8FAFC] p-2.5 rounded-lg border border-slate-200">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                        Previous Block Hash (Chain Link)
                      </span>
                      <div className="text-slate-500 break-all select-all font-mono">
                        {block.previousHash}
                      </div>
                    </div>
                  </div>

                  {/* Transactions summary in block */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      Transactions: <strong>{block.transactions.length} record(s)</strong>
                    </span>
                    {block.transactions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {block.transactions.map(tx => (
                          <span
                            key={tx.transactionId}
                            className="bg-blue-50 text-blue-800 font-mono text-[11px] px-2 py-0.5 rounded border border-blue-100"
                          >
                            {tx.certificateId} ({tx.type})
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Block Details Modal */}
      {selectedBlock && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 max-w-2xl w-full p-6 shadow-xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#123B5D] text-white flex items-center justify-center font-bold text-xs">
                  #{selectedBlock.index}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">
                    Block Inspection #{selectedBlock.index}
                  </h3>
                  <p className="text-[11px] text-slate-500">Detailed ledger cryptographic headers</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedBlock(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block mb-1">Block Hash:</span>
                <span className="text-slate-900 break-all">{selectedBlock.hash}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-500 block mb-1">Previous Block Hash:</span>
                <span className="text-slate-900 break-all">{selectedBlock.previousHash}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-slate-700 font-sans">
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-slate-500 text-[11px] block">Validator Node:</span>
                  <span className="font-medium">{selectedBlock.validator}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-slate-500 text-[11px] block">Timestamp:</span>
                  <span className="font-medium">{new Date(selectedBlock.timestamp).toLocaleString()}</span>
                </div>
              </div>

              {/* Transactions in this block */}
              <div className="pt-2 font-sans">
                <h4 className="font-semibold text-slate-900 text-xs mb-2">
                  Block Transactions ({selectedBlock.transactions.length})
                </h4>

                {selectedBlock.transactions.length === 0 ? (
                  <p className="text-xs text-slate-400">Genesis block does not contain issuance transactions.</p>
                ) : (
                  <div className="space-y-2">
                    {selectedBlock.transactions.map((tx) => (
                      <div key={tx.transactionId} className="p-3 border border-slate-200 rounded-lg bg-[#F8FAFC] space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-semibold text-blue-700">{tx.transactionId}</span>
                          <StatusBadge status={tx.status} />
                        </div>
                        <div><span className="font-medium text-slate-600">Certificate ID:</span> {tx.certificateId}</div>
                        <div><span className="font-medium text-slate-600">Type:</span> {tx.type}</div>
                        <div><span className="font-medium text-slate-600">Student Ref:</span> {tx.studentIdentifier}</div>
                        <div className="pt-1 font-mono text-[11px]">
                          <span className="text-slate-500 block">Certificate Hash:</span>
                          <div className="break-all text-slate-800 bg-white p-1 rounded border border-slate-200">
                            {tx.certificateHash}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedBlock(null)}
                className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
