import React from 'react';
import {
  BarChart3,
  TrendingUp,
  ShieldCheck,
  Clock,
  AlertTriangle,
  FileCheck2,
  Calendar,
  Layers
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { PageHeader, StatCard } from '../components/ui/CommonUI';

export const AnalyticsPage: React.FC = () => {
  // Minimal and clean mock analytics datasets
  const monthlyIssuance = [
    { month: 'Apr 26', issued: 120, verified: 650 },
    { month: 'May 26', issued: 145, verified: 890 },
    { month: 'Jun 26', issued: 390, verified: 1450 },
    { month: 'Jul 26', issued: 520, verified: 2100 },
    { month: 'Aug 26', issued: 210, verified: 1800 },
    { month: 'Sep 26', issued: 310, verified: 2450 },
    { month: 'Oct 26', issued: 185, verified: 1980 },
  ];

  const programBreakdown = [
    { program: 'B.Tech CS', count: 480, verified: 3900 },
    { program: 'B.Tech AI', count: 340, verified: 2400 },
    { program: 'B.Tech ET', count: 260, verified: 1800 },
    { program: 'M.Tech CE', count: 120, verified: 950 },
    { program: 'Ph.D CS', count: 40, verified: 432 },
  ];

  const tamperTrend = [
    { month: 'Apr', checks: 650, tamperFlagged: 1 },
    { month: 'May', checks: 890, tamperFlagged: 2 },
    { month: 'Jun', checks: 1450, tamperFlagged: 4 },
    { month: 'Jul', checks: 2100, tamperFlagged: 3 },
    { month: 'Aug', checks: 1800, tamperFlagged: 1 },
    { month: 'Sep', checks: 2450, tamperFlagged: 5 },
    { month: 'Oct', checks: 1980, tamperFlagged: 2 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ledger Analytics & Performance"
        subtitle="Operational metrics across cryptographic verifications and institutional issuance"
      />

      {/* KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Average Verification Latency"
          value="48 ms"
          change="-12%"
          isPositive={true}
          subtitle="Direct hash-lookup speed"
          icon={Clock}
        />
        <StatCard
          title="Tamper Detection Intercepts"
          value="18"
          change="100% Caught"
          isPositive={true}
          subtitle="Zero cryptographic bypasses"
          icon={ShieldCheck}
        />
        <StatCard
          title="Quarterly Growth"
          value="+42.8%"
          change="+8.4%"
          isPositive={true}
          subtitle="Credential queries vs Q2"
          icon={TrendingUp}
        />
        <StatCard
          title="Active Verification Nodes"
          value="12"
          subtitle="Campus, HR & Ministry Gateway"
          icon={Layers}
        />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issuance vs Verification Volume */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs">
          <h2 className="text-sm font-semibold text-[#111827]">
            Issuance vs. Third-Party Verification Volume
          </h2>
          <p className="text-xs text-[#64748B] mb-4">
            Aggregated credentials issued vs queries by employers and agencies
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyIssuance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    borderColor: '#E5E7EB',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="verified" name="Verifications" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="issued" name="Issued" stroke="#123B5D" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Credentials by Program */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs">
          <h2 className="text-sm font-semibold text-[#111827]">
            Registered Credentials by Academic Program
          </h2>
          <p className="text-xs text-[#64748B] mb-4">
            Total degree records committed by curriculum
          </p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={programBreakdown} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="program" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    borderColor: '#E5E7EB',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="count" name="Certificates Issued" fill="#123B5D" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tamper Detection Analysis */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-sm font-semibold text-[#111827]">
              Tamper Detection & Cryptographic Anomaly Rate
            </h2>
            <p className="text-xs text-[#64748B]">
              Submissions flagged when submitted document hash failed matching immutable on-chain record
            </p>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Defense Integrity: 100%
          </span>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tamperTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  borderColor: '#E5E7EB',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="tamperFlagged" name="Tampered Attempts Flagged" fill="#DC2626" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
