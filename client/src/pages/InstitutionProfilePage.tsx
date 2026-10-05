import React from 'react';
import {
  Building2,
  CheckCircle2,
  ShieldCheck,
  Mail,
  Globe,
  Key,
  Users,
  Copy,
  ExternalLink,
  Award
} from 'lucide-react';
import { useBlockchain } from '../context/BlockchainContext';
import { PageHeader, StatusBadge, HashDisplay } from '../components/ui/CommonUI';

export const InstitutionProfilePage: React.FC = () => {
  const { institution } = useBlockchain();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Institution Profile"
        subtitle="Cryptographic node identity and verified administrative credentials"
      />

      {/* Main Institution Card */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-[#123B5D] text-white flex items-center justify-center font-bold text-2xl shadow-xs">
              VIT
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl font-bold text-slate-900">{institution.name}</h2>
                <StatusBadge status={institution.verificationStatus} />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Institution Code: <span className="font-mono text-slate-700">{institution.code}</span> • Autonomous University Affiliate
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs">
            <span className="text-slate-500 block">Accreditation Classification</span>
            <span className="font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded inline-block mt-1 border border-emerald-200">
              {institution.accreditation}
            </span>
          </div>
        </div>

        {/* Detailed Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 text-xs">
          <div className="space-y-4">
            <div>
              <span className="text-slate-500 block mb-1">Official Registry Email</span>
              <div className="flex items-center gap-2 text-slate-800 font-medium">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>{institution.email}</span>
              </div>
            </div>

            <div>
              <span className="text-slate-500 block mb-1">Institutional Portal Website</span>
              <div className="flex items-center gap-2 text-blue-600 font-medium">
                <Globe className="w-4 h-4 text-slate-400" />
                <a href={institution.website} target="_blank" rel="noreferrer" className="hover:underline">
                  {institution.website}
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-slate-500 block mb-1">Public Blockchain Node Address (Issuer Identifier)</span>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 font-mono text-[11px] break-all text-slate-800">
                {institution.blockchainAddress}
              </div>
            </div>

            <div>
              <span className="text-slate-500 block mb-1">Consensus Role</span>
              <span className="font-semibold text-slate-900">
                Genesis Block Validator & Authorized Educational Signer
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Authorized Administrators */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Authorized Key Custodians & Administrators</h3>
            <p className="text-xs text-slate-500">Personnel holding signing credentials for certificate issuance</p>
          </div>
          <span className="text-xs text-slate-500">2 Active Signers</span>
        </div>

        <div className="divide-y divide-[#E5E7EB]">
          {institution.authorizedAdministrators.map((admin, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between text-xs hover:bg-[#F8FAFC]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                  {admin.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{admin.name}</div>
                  <div className="text-[11px] text-slate-500">{admin.role}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-slate-600">{admin.email}</div>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Hardware Key Active
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
