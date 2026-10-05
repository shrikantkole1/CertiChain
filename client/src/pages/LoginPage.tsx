import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Shield,
  KeyRound,
  FileCheck2,
  CheckCircle2,
  Info
} from 'lucide-react';
import { useBlockchain } from '../context/BlockchainContext';

export const LoginPage: React.FC = () => {
  const { login } = useBlockchain();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@certichain.demo');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<'INSTITUTION_ADMIN' | 'VERIFIER'>('INSTITUTION_ADMIN');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email, role);
      setLoading(false);
      navigate('/dashboard');
    }, 400);
  };

  const handleQuickDemoFill = (selectedRole: 'INSTITUTION_ADMIN' | 'VERIFIER') => {
    setRole(selectedRole);
    if (selectedRole === 'INSTITUTION_ADMIN') {
      setEmail('admin@certichain.demo');
    } else {
      setEmail('verifier@certichain.demo');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col justify-between">
      {/* Header */}
      <header className="h-16 border-b border-[#E5E7EB] bg-white px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#123B5D] flex items-center justify-center text-white shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="font-semibold text-lg tracking-tight text-[#111827]">
            Certi<span className="text-[#2563EB]">Chain</span>
          </span>
        </Link>

        <Link
          to="/verify"
          className="text-xs font-semibold text-slate-600 hover:text-blue-600 inline-flex items-center gap-1"
        >
          <span>Public Verification Portal</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </header>

      {/* Main Login split container */}
      <div className="max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex-1 flex items-center justify-center">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-xs overflow-hidden grid grid-cols-1 md:grid-cols-2 w-full">
          {/* Left Side: Institutional Trust Branding */}
          <div className="bg-[#123B5D] text-white p-8 sm:p-12 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-blue-200 border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5" />
                Institutional Node Access
              </div>

              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white leading-tight">
                Secure academic credentials. Verify with confidence.
              </h1>

              <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed">
                Blockchain-backed certificate integrity infrastructure for modern educational institutions, universities, and corporate verification desks.
              </p>
            </div>

            <div className="pt-8 space-y-3 border-t border-white/10 text-xs">
              <div className="flex items-center gap-2 text-blue-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>256-bit Encrypted Node Session</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Hardware Token & Key Custody Supported</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Deterministic SHA-256 Ledger Anchors</span>
              </div>
            </div>
          </div>

          {/* Right Side: Login Card */}
          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-900">
                Institutional Sign In
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Authorized institutional and verifier access only.
              </p>
            </div>

            {/* Quick Demo Switcher */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs mb-5 space-y-1.5">
              <span className="font-semibold text-slate-700 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-blue-600" /> Demo Accounts (Click to Fill):
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemoFill('INSTITUTION_ADMIN')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-colors ${
                    role === 'INSTITUTION_ADMIN'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  admin@certichain.demo
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoFill('VERIFIER')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-colors ${
                    role === 'VERIFIER'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  verifier@certichain.demo
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Institution Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Password / Keystore Passphrase
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-1.5 text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert("Password reset instructions dispatched to registered Dean email.")}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-[#123B5D] text-white font-semibold rounded-lg hover:bg-[#0E2E49] transition-colors shadow-xs inline-flex items-center justify-center gap-1.5"
              >
                <span>{loading ? 'Authenticating Key...' : 'Sign In'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-600" /> Encrypted Session
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-blue-600" /> Secure Auth
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <FileCheck2 className="w-3 h-3 text-slate-500" /> Audit Logged
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-500 border-t border-[#E5E7EB] bg-white">
        CertiChain Infrastructure • Vishwakarma Institute of Technology Node • Version 2.4-enterprise
      </footer>
    </div>
  );
};
