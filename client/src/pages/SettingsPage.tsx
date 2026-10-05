import React, { useState } from 'react';
import {
  Settings,
  Bell,
  Lock,
  User,
  Shield,
  Save,
  CheckCircle2,
  KeyRound
} from 'lucide-react';
import { useBlockchain } from '../context/BlockchainContext';
import { PageHeader } from '../components/ui/CommonUI';

export const SettingsPage: React.FC = () => {
  const { user, institution } = useBlockchain();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="Institutional Settings"
        subtitle="Manage node parameters, security policies, and administrative preferences"
      />

      {/* Tabs */}
      <div className="flex border-b border-[#E5E7EB] gap-6 text-xs sm:text-sm font-medium">
        {[
          { id: 'profile', label: 'Institutional Profile', icon: User },
          { id: 'security', label: 'Security & Consensus', icon: Lock },
          { id: 'notifications', label: 'Alerting & Webhooks', icon: Bell },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 pb-3 relative transition-colors ${
                isActive ? 'text-[#123B5D] font-semibold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {isActive && (
                <span className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-[#123B5D]" />
              )}
            </button>
          );
        })}
      </div>

      {savedMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Configuration saved and propagated to local keystore.</span>
        </div>
      )}

      {/* Tab: Profile */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSave} className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-xs space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-medium mb-1">Administrative Node Name</label>
              <input
                type="text"
                defaultValue={institution.name}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">Official Registry Domain</label>
              <input
                type="text"
                defaultValue={institution.website}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">Institutional Contact Email</label>
              <input
                type="email"
                defaultValue={institution.email}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">Assigned Institutional Code</label>
              <input
                type="text"
                defaultValue={institution.code}
                disabled
                className="w-full px-3 py-2 border border-slate-200 bg-slate-50 text-slate-500 rounded-lg"
              />
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              className="px-4 py-2 bg-[#123B5D] text-white font-semibold rounded-lg hover:bg-[#0E2E49] transition-colors inline-flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab: Security */}
      {activeTab === 'security' && (
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-xs space-y-4 text-xs">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50">
              <div>
                <span className="font-semibold text-slate-900 block">Strict SHA-256 Validation Mode</span>
                <p className="text-[11px] text-slate-500">Require exact byte-matching during candidate PDF evaluation</p>
              </div>
              <input type="checkbox" defaultChecked className="toggle-checkbox" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50">
              <div>
                <span className="font-semibold text-slate-900 block">Mandatory 2FA Session Verification</span>
                <p className="text-[11px] text-slate-500">Require FIDO2 / hardware token for issuing credentials</p>
              </div>
              <input type="checkbox" defaultChecked className="toggle-checkbox" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50">
              <div>
                <span className="font-semibold text-slate-900 block">Automated Tamper Alert Webhook</span>
                <p className="text-[11px] text-slate-500">Trigger immediate webhook to campus SIEM on hash mismatch</p>
              </div>
              <input type="checkbox" defaultChecked className="toggle-checkbox" />
            </div>
          </div>
        </div>
      )}

      {/* Tab: Notifications */}
      {activeTab === 'notifications' && (
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-xs space-y-4 text-xs">
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600" />
              <span>Email notification whenever a certificate undergoes third-party verification</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600" />
              <span>Immediate urgent notification when document tampering attempt is flagged</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600" />
              <span>Weekly cryptographic integrity report digests</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
