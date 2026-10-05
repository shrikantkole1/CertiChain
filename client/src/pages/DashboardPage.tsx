import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FileCheck2,
  Users,
  Building2,
  Plus,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Blocks,
  Clock,
  ArrowRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useBlockchain } from '../context/BlockchainContext';
import { StatCard, StatusBadge, HashDisplay, PageHeader } from '../components/ui/CommonUI';

export const DashboardPage: React.FC = () => {
  const { certificates, blocks, auditLogs, institution } = useBlockchain();
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // Realistic data points for Verification Activity
  const activityData = [
    { date: 'Sep 05', verifications: 142, issued: 45 },
    { date: 'Sep 10', verifications: 280, issued: 62 },
    { date: 'Sep 15', verifications: 410, issued: 120 },
    { date: 'Sep 20', verifications: 530, issued: 88 },
    { date: 'Sep 25', verifications: 710, issued: 154 },
    { date: 'Sep 30', verifications: 890, issued: 195 },
    { date: 'Oct 05', verifications: 1284, issued: 240 },
  ];

  // Certificate Distribution By Program
  const programData = [
    { name: 'Computer Engineering', value: 480, color: '#123B5D' },
    { name: 'Artificial Intelligence', value: 340, color: '#2563EB' },
    { name: 'Electronics Engineering', value: 260, color: '#0D9488' },
    { name: 'Mechanical / IT', value: 140, color: '#64748B' },
    { name: 'Postgraduate / M.Tech', value: 64, color: '#8B5CF6' },
  ];

  const totalIssued = certificates.length + 1279; // Baseline calibrated to demo standard
  const verifiedCount = 9482;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Institutional Verification Operations"
        subtitle={`Real-time ledger overview for ${institution.name}`}
        badge="Active Node #6112"
        actions={
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/verify')}
              className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-[#E5E7EB] rounded-lg hover:bg-slate-50 transition-colors inline-flex items-center gap-1.5 shadow-2xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              Public Verification Portal
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

      {/* 4 Premium KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Certificates Issued"
          value={totalIssued.toLocaleString()}
          change="+12.4%"
          isPositive={true}
          subtitle="All programs registered"
          icon={FileCheck2}
        />
        <StatCard
          title="Certificates Verified"
          value={verifiedCount.toLocaleString()}
          change="+18.7%"
          isPositive={true}
          subtitle="Enterprise & portal checks"
          icon={ShieldCheck}
        />
        <StatCard
          title="Blockchain Records"
          value={blocks.length + 1279}
          subtitle="100% Immutable Integrity"
          isPositive={true}
          icon={Blocks}
        />
        <StatCard
          title="Verification Success Rate"
          value="98.7%"
          change="+2.1%"
          isPositive={true}
          subtitle="0.13% Tamper detection rate"
          icon={TrendingUp}
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Verification Activity Chart */}
        <div className="lg:col-span-2 bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-sm font-semibold text-[#111827]">
                Verification & Issuance Volume
              </h2>
              <p className="text-xs text-[#64748B]">
                Cryptographic queries executed against local blockchain ledger
              </p>
            </div>
            <div className="inline-flex items-center p-0.5 bg-[#F7F9FC] border border-[#E5E7EB] rounded-lg text-xs font-medium text-[#64748B]">
              {(['7d', '30d', '90d', '1y'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setTimeframe(tab)}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    timeframe === tab ? 'bg-white text-[#111827] shadow-2xs' : 'hover:text-[#111827]'
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVerifications" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorIssued" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#123B5D" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#123B5D" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    borderColor: '#E5E7EB',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="verifications" name="Verifications" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorVerifications)" />
                <Area type="monotone" dataKey="issued" name="Issued" stroke="#123B5D" strokeWidth={1.5} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorIssued)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Certificate Distribution Donut */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-semibold text-[#111827]">
              Credentials by Program
            </h2>
            <p className="text-xs text-[#64748B] mb-4">
              Distribution of credentials issued across active departments
            </p>

            <div className="h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={programData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {programData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '8px',
                      borderColor: '#E5E7EB',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1.5 mt-2 pt-2 border-t border-[#F1F5F9]">
            {programData.slice(0, 3).map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="truncate max-w-[150px]">{item.name}</span>
                </div>
                <span className="font-medium text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Certificates Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-[#111827]">
              Recent Certificates on Chain
            </h2>
            <p className="text-xs text-[#64748B]">
              Latest credentials sealed with deterministic SHA-256 blocks
            </p>
          </div>
          <NavLink
            to="/certificates"
            className="text-xs font-semibold text-[#2563EB] hover:text-blue-700 inline-flex items-center gap-1"
          >
            <span>View All ({certificates.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NavLink>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#64748B] font-medium">
                <th className="py-3 px-4">Certificate ID</th>
                <th className="py-3 px-4">Student Name & ID</th>
                <th className="py-3 px-4">Program</th>
                <th className="py-3 px-4">Issue Date</th>
                <th className="py-3 px-4">Cryptographic Hash</th>
                <th className="py-3 px-4">Block #</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {certificates.slice(0, 5).map((cert) => (
                <tr key={cert.id} className="hover:bg-[#F8FAFC]/80 transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#111827]">
                    {cert.certificateId}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-900">{cert.studentName}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{cert.studentId}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-700">{cert.program}</td>
                  <td className="py-3 px-4 text-slate-600">{cert.issueDate}</td>
                  <td className="py-3 px-4">
                    <HashDisplay hash={cert.certificateHash} />
                  </td>
                  <td className="py-3 px-4">
                    <NavLink
                      to={`/blockchain/${cert.blockNumber}`}
                      className="font-mono text-[#2563EB] hover:underline"
                    >
                      #{cert.blockNumber}
                    </NavLink>
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={cert.status} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => navigate(`/verify/${cert.certificateId}`)}
                      className="px-2.5 py-1 text-[11px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                    >
                      Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
