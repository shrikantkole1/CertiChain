import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  Blocks,
  ArrowRight,
  Shield,
  Lock,
  Search,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  Building2,
  Users,
  Award
} from 'lucide-react';
import { HashDisplay } from '../components/ui/CommonUI';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const sampleDemoHash = '8c3f4e8b91a27d6c5e0f3b4a5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e';

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#111827] flex flex-col justify-between">
      {/* Top Enterprise Navigation */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-[#E5E7EB] px-4 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#123B5D] flex items-center justify-center text-white shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="font-semibold text-lg tracking-tight text-[#111827]">
            Certi<span className="text-[#2563EB]">Chain</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-xs font-medium text-[#64748B]">
          <a href="#how-it-works" className="hover:text-[#111827] transition-colors">How It Works</a>
          <a href="#security" className="hover:text-[#111827] transition-colors">Security Model</a>
          <a href="#faq" className="hover:text-[#111827] transition-colors">FAQ</a>
          <Link to="/blockchain" className="hover:text-[#111827] transition-colors">Explorer</Link>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/verify"
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-[#E5E7EB] rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
          >
            Verify a Certificate
          </Link>
          <Link
            to="/login"
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#123B5D] hover:bg-[#0E2E49] rounded-lg transition-colors shadow-xs"
          >
            For Institutions
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 py-16 sm:py-24 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#2563EB] border border-blue-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              Institutional-Grade Credential Integrity
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#111827] leading-[1.15]">
              Academic Credentials You Can Trust.
            </h1>

            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-xl">
              CertiChain combines cryptographic SHA-256 hashing and blockchain-based records to make academic certificate verification faster, transparent, and tamper-evident.
            </p>

            <blockquote className="border-l-2 border-[#123B5D] pl-3 py-1 text-xs sm:text-sm font-medium text-slate-700 italic">
              "Trust academic credentials without trusting the document."
            </blockquote>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/verify"
                className="px-5 py-2.5 bg-[#123B5D] text-white font-semibold text-xs sm:text-sm rounded-lg hover:bg-[#0E2E49] transition-colors shadow-xs inline-flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Verify a Certificate</span>
              </Link>

              <Link
                to="/login"
                className="px-5 py-2.5 bg-white text-slate-700 font-semibold text-xs sm:text-sm border border-[#E5E7EB] rounded-lg hover:bg-slate-50 transition-colors shadow-2xs inline-flex items-center gap-1.5"
              >
                <span>Institution Node Portal</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>

          {/* Right Visual: Premium Certificate Verification Card */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-5 relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs sm:text-sm text-slate-900 leading-none">
                      Verified Certificate Record
                    </h3>
                    <span className="text-[11px] text-emerald-600 font-medium">
                      Live Blockchain Proof Confirmed
                    </span>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  Block #1
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-semibold block">Candidate</span>
                  <div className="font-semibold text-slate-900 text-sm">Aarav Sharma</div>
                  <div className="text-slate-500 text-[11px]">VIT-2022-CS-084 • First Class Distinction</div>
                </div>

                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-semibold block">Issuing Body</span>
                  <div className="text-slate-800 font-medium">Vishwakarma Institute of Technology</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-[11px]">
                  <span className="text-slate-400 uppercase text-[10px] block mb-1">SHA-256 Fingerprint:</span>
                  <div className="break-all text-slate-700">
                    {sampleDemoHash.slice(0, 32)}...
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-[11px]">
                <div className="p-2 bg-emerald-50/70 rounded border border-emerald-100 text-emerald-800 font-medium">
                  ✓ Authentic
                </div>
                <div className="p-2 bg-emerald-50/70 rounded border border-emerald-100 text-emerald-800 font-medium">
                  ✓ SHA-256 Match
                </div>
                <div className="p-2 bg-emerald-50/70 rounded border border-emerald-100 text-emerald-800 font-medium">
                  ✓ On Chain
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Architecture Principles Section */}
      <section className="bg-white border-y border-[#E5E7EB] py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
              Institutional Trust Built on Mathematics
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Why universities and employers replace slow paper verification with cryptographic proofs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Cryptographic Integrity',
                desc: 'Every document produces a unique SHA-256 mathematical digest. Single-pixel modifications immediately invalidate the match.',
                icon: ShieldCheck
              },
              {
                title: 'Blockchain Records',
                desc: 'Hashes and timestamps are permanently sealed into sequentially chained blocks, eliminating retro-active alteration.',
                icon: Blocks
              },
              {
                title: 'Sub-Second Verification',
                desc: 'Employers and background checkers verify authenticity in under 50 milliseconds directly without manual university delays.',
                icon: FileCheck2
              },
              {
                title: 'Zero Document Exposure',
                desc: 'The certificate file itself is never stored publicly on the blockchain, strictly preserving student privacy laws.',
                icon: Lock
              },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="p-5 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-2.5">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#123B5D] shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900">{feature.title}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-4 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">
            Verification Protocol
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
            Four Steps to Tamper-Evident Verification
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            From institutional issuance to third-party validation in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Issue',
              subtitle: 'Institution Creates Credential',
              desc: 'Authorized university administrators create the certificate with student grades and metadata.'
            },
            {
              step: '02',
              title: 'Hash',
              subtitle: 'SHA-256 Fingerprint',
              desc: 'The cryptographic engine calculates a deterministic 256-bit hash representing the exact document state.'
            },
            {
              step: '03',
              title: 'Register',
              subtitle: 'Committed to Ledger Block',
              desc: 'The hash and transaction ID are sealed into a new sequential block linked with previous block hash.'
            },
            {
              step: '04',
              title: 'Verify',
              subtitle: 'Instant Cryptographic Match',
              desc: 'Anyone verifying calculates the document hash and compares it against the immutable on-chain record.'
            },
          ].map((item) => (
            <div key={item.step} className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-xs space-y-3 relative">
              <span className="text-3xl font-extrabold text-slate-200 block font-mono">
                {item.step}
              </span>
              <div>
                <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                <span className="text-xs font-medium text-[#2563EB] block">{item.subtitle}</span>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stakeholders Section: For Institutions & Employers */}
      <section className="bg-white border-t border-[#E5E7EB] py-14 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl border border-slate-200 bg-[#F8FAFC] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#123B5D] text-white flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">For Universities & Institutions</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Eliminate manual verification inquiries, transcripts postal requests, and fraudulent diploma mills falsely claiming affiliation with your institution.
            </p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">✓ Automated blockchain transaction sealing</li>
              <li className="flex items-center gap-2">✓ Full administrative revocation capability</li>
              <li className="flex items-center gap-2">✓ Complete institutional audit log compliance</li>
            </ul>
            <div className="pt-2">
              <Link to="/login" className="text-xs font-semibold text-[#2563EB] hover:underline inline-flex items-center gap-1">
                Access Institution Dashboard <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-[#F8FAFC] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">For Employers & Verifiers</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Verify degrees and candidate transcripts instantly without hiring expensive background screening agencies or waiting weeks for registrar callbacks.
            </p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-center gap-2">✓ Instant hash match or discrepancy flag</li>
              <li className="flex items-center gap-2">✓ Free public verification portal</li>
              <li className="flex items-center gap-2">✓ Direct inspection of cryptographic block timestamps</li>
            </ul>
            <div className="pt-2">
              <Link to="/verify" className="text-xs font-semibold text-[#2563EB] hover:underline inline-flex items-center gap-1">
                Open Public Verifier <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-14 px-4 max-w-4xl mx-auto w-full space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
            Frequently Asked Technical Questions
          </h2>
          <p className="text-xs text-[#64748B]">
            Architectural clarification on privacy, hashing, and blockchain storage.
          </p>
        </div>

        <div className="space-y-3 text-xs">
          {[
            {
              q: 'Is the certificate document file stored on the blockchain?',
              a: 'No. Storing raw files on a ledger breaches student privacy and bloats ledger state. Only the deterministic SHA-256 hash digest and core academic metadata are registered on the chain.'
            },
            {
              q: 'What happens if a graduate modifies one character on the certificate?',
              a: 'Because SHA-256 is an avalanche-effect cryptographic hash function, altering a single character or byte causes the calculated hash to change completely, producing an instant mismatch.'
            },
            {
              q: 'Can an institution revoke an erroneous or fraudulent credential?',
              a: 'Yes. An authorized administrator issues a revocation transaction appended to a new block. When verified, the portal alerts third parties that the certificate was revoked by the registrar.'
            },
            {
              q: 'Does CertiChain require real cryptocurrency or gas fees?',
              a: 'No. CertiChain operates as an institutional permissioned ledger prototype engineered specifically for educational credential integrity without volatile crypto tokens.'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-xs space-y-1.5">
              <h4 className="font-semibold text-slate-900 text-xs sm:text-sm">{item.q}</h4>
              <p className="text-slate-600 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Enterprise Footer */}
      <footer className="border-t border-[#E5E7EB] bg-white py-8 px-4 lg:px-8 text-xs text-[#64748B]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#123B5D] text-white flex items-center justify-center font-bold text-xs">
              C
            </div>
            <span className="font-semibold text-[#111827]">CertiChain</span>
            <span>• Academic Verification Infrastructure</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/verify" className="hover:text-slate-900">Verify</Link>
            <Link to="/blockchain" className="hover:text-slate-900">Ledger</Link>
            <Link to="/login" className="hover:text-slate-900">Institution Login</Link>
          </div>

          <div>
            © 2026 CertiChain • Prototype Standard v2.4
          </div>
        </div>
      </footer>
    </div>
  );
};
