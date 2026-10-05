import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FilePlus2,
  Upload,
  CheckCircle2,
  Blocks,
  ArrowRight,
  ArrowLeft,
  FileCheck2,
  Shield,
  Download,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { useBlockchain } from '../context/BlockchainContext';
import { PageHeader, HashDisplay } from '../components/ui/CommonUI';
import { calculateSHA256 } from '../utils/crypto';
import { Certificate } from '../types';

export const IssueCertificatePage: React.FC = () => {
  const { registerCertificate, institution, blocks } = useBlockchain();
  const navigate = useNavigate();

  // Multi-step state: 1 to 5
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form data
  const [formData, setFormData] = useState({
    studentName: 'Aarav Sharma',
    studentId: 'VIT-2022-CS-084',
    program: 'B.Tech Computer Engineering',
    department: 'Department of Computer Engineering',
    grade: '9.45 CGPA (First Class with Distinction)',
    issueDate: new Date().toISOString().slice(0, 10),
    certificateType: 'Degree of Bachelor of Technology'
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [generatedHash, setGeneratedHash] = useState('');
  const [isHashing, setIsHashing] = useState(false);
  const [isMining, setIsMining] = useState(false);
  const [registeredCert, setRegisteredCert] = useState<Certificate | null>(null);

  // Suggested next Certificate ID
  const nextCertId = `CERT-2026-00${String(blocks.length + 1284).padStart(4, '0')}`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setIsHashing(true);
    const arrayBuffer = await file.arrayBuffer();
    const hash = await calculateSHA256(arrayBuffer);
    setGeneratedHash(hash);
    setIsHashing(false);
  };

  const handleComputeDeterministicHash = async () => {
    setIsHashing(true);
    // If no document uploaded, generate deterministic digital certificate payload hash
    const payload = JSON.stringify({
      studentName: formData.studentName,
      studentId: formData.studentId,
      institution: institution.name,
      program: formData.program,
      grade: formData.grade,
      issueDate: formData.issueDate
    });
    const hash = await calculateSHA256(payload);
    setGeneratedHash(hash);
    setIsHashing(false);
  };

  const handleRegisterOnChain = async () => {
    setIsMining(true);
    try {
      const finalHash = generatedHash || (await calculateSHA256(JSON.stringify(formData)));

      const cert = await registerCertificate({
        certificateId: nextCertId,
        studentName: formData.studentName,
        studentId: formData.studentId,
        institution: institution.name,
        program: formData.program,
        department: formData.department,
        grade: formData.grade,
        issueDate: formData.issueDate,
        certificateHash: finalHash,
        issuer: institution.name
      });

      setRegisteredCert(cert);
      setStep(5);
    } finally {
      setIsMining(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader
        title="Issue Academic Certificate"
        subtitle="Cryptographically seal and register an academic degree onto the ledger"
      />

      {/* 5-Step Process Bar */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-xs">
        <div className="flex items-center justify-between">
          {[
            { num: 1, title: 'Information' },
            { num: 2, title: 'Document' },
            { num: 3, title: 'Hash Generation' },
            { num: 4, title: 'Blockchain Anchor' },
            { num: 5, title: 'Confirmation' },
          ].map((s, idx, arr) => (
            <React.Fragment key={s.num}>
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                  step === s.num
                    ? 'bg-[#123B5D] text-white shadow-xs'
                    : step > s.num
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                </div>
                <span className={`text-xs font-medium hidden sm:inline ${
                  step >= s.num ? 'text-slate-900' : 'text-slate-400'
                }`}>
                  {s.title}
                </span>
              </div>
              {idx < arr.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${step > s.num ? 'bg-emerald-500' : 'bg-slate-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step 1: Certificate Information */}
      {step === 1 && (
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-semibold text-slate-900">Step 1: Candidate & Credential Metadata</h2>
            <p className="text-xs text-slate-500">Provide official institutional records for the graduate.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Student Full Name *</label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Permanent Student ID / PRN *</label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Academic Program *</label>
              <select
                name="program"
                value={formData.program}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600"
              >
                <option value="B.Tech Computer Engineering">B.Tech Computer Engineering</option>
                <option value="B.Tech Artificial Intelligence">B.Tech Artificial Intelligence</option>
                <option value="B.Tech Electronics Engineering">B.Tech Electronics Engineering</option>
                <option value="M.Tech Computer Engineering">M.Tech Computer Engineering</option>
                <option value="Ph.D. Computer Sciences">Ph.D. Computer Sciences</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Academic Department *</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Grade / CGPA Classification *</label>
              <input
                type="text"
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Convocation / Issue Date *</label>
              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">Assigned Certificate Reference:</span>
            <span className="font-mono font-semibold text-slate-900 bg-white px-2.5 py-1 rounded border border-slate-200">
              {nextCertId}
            </span>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#123B5D] hover:bg-[#0E2E49] rounded-lg inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Next: Upload Document</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Upload Certificate Document */}
      {step === 2 && (
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-semibold text-slate-900">Step 2: Certificate Document Intake</h2>
            <p className="text-xs text-slate-500">
              Upload the canonical graduation certificate PDF, PNG, or JPG.
            </p>
          </div>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0]);
            }}
            className="border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-xl p-8 text-center bg-[#F8FAFC] transition-colors cursor-pointer"
          >
            <input
              type="file"
              id="file-upload"
              accept=".pdf,.png,.jpg,.jpeg"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
              }}
            />
            <label htmlFor="file-upload" className="cursor-pointer space-y-3 block">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
                <Upload className="w-6 h-6" />
              </div>
              <div className="text-xs">
                <span className="font-semibold text-blue-600">Click to upload document</span> or drag and drop
                <p className="text-slate-500 mt-1">PDF, PNG, or JPG format (Max 25MB)</p>
              </div>
            </label>
          </div>

          {uploadedFile ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-center justify-between text-xs text-emerald-800">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold">{uploadedFile.name}</span>
                <span className="text-emerald-600">({(uploadedFile.size / 1024).toFixed(1)} KB)</span>
              </div>
              <span className="font-medium">Ready for Cryptographic Hashing</span>
            </div>
          ) : (
            <div className="text-center">
              <span className="text-xs text-slate-500">
                Or proceed without a binary file to hash the candidate metadata directly:
              </span>
              <button
                type="button"
                onClick={handleComputeDeterministicHash}
                className="mt-2 text-xs font-semibold text-blue-600 hover:underline block mx-auto"
              >
                Use Canonical Metadata Fingerprint
              </button>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setStep(1)}
              className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>
            <button
              onClick={() => {
                if (!generatedHash) handleComputeDeterministicHash();
                setStep(3);
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#123B5D] hover:bg-[#0E2E49] rounded-lg inline-flex items-center gap-1.5"
            >
              <span>Next: Generate Hash</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: SHA-256 Hash Generation */}
      {step === 3 && (
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-semibold text-slate-900">Step 3: Cryptographic Fingerprint</h2>
            <p className="text-xs text-slate-500">
              Deterministic 256-bit cryptographic digest calculated via SHA-256 standard.
            </p>
          </div>

          <div className="bg-slate-900 text-slate-100 p-5 rounded-xl font-mono text-xs space-y-3">
            <div className="flex items-center justify-between text-slate-400 text-[11px] pb-2 border-b border-slate-800">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                Algorithm: SHA-256 (FIPS 180-4)
              </span>
              <span>256 bits / 64 hex characters</span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block mb-1">Generated Digital Fingerprint:</span>
              <div className="text-emerald-400 font-mono text-sm break-all bg-black/40 p-3 rounded-lg border border-slate-800 select-all">
                {generatedHash || 'Calculating...'}
              </div>
            </div>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 space-y-1">
            <div className="font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              Privacy Assurance
            </div>
            <p className="text-blue-800 text-[11px]">
              Only this cryptographic hash and metadata are registered on the chain. The raw certificate document remains with the institution and graduate.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setStep(2)}
              className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>
            <button
              onClick={() => setStep(4)}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#123B5D] hover:bg-[#0E2E49] rounded-lg inline-flex items-center gap-1.5"
            >
              <span>Next: Prepare Block</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Blockchain Registration */}
      {step === 4 && (
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-semibold text-slate-900">Step 4: Blockchain Anchor Review</h2>
            <p className="text-xs text-slate-500">
              Verify block parameters prior to committing transaction to the ledger.
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 text-xs">
            <div className="p-3 flex justify-between bg-slate-50/50">
              <span className="text-slate-500">Target Block Index</span>
              <span className="font-mono font-semibold text-slate-900">Block #{blocks.length}</span>
            </div>
            <div className="p-3 flex justify-between">
              <span className="text-slate-500">Previous Block Hash</span>
              <HashDisplay hash={blocks[blocks.length - 1].hash} />
            </div>
            <div className="p-3 flex justify-between bg-slate-50/50">
              <span className="text-slate-500">Certificate Hash</span>
              <HashDisplay hash={generatedHash} />
            </div>
            <div className="p-3 flex justify-between">
              <span className="text-slate-500">Authorized Issuing Node</span>
              <span className="font-medium text-slate-800">{institution.name}</span>
            </div>
            <div className="p-3 flex justify-between bg-slate-50/50">
              <span className="text-slate-500">Ledger Protocol</span>
              <span className="text-emerald-700 font-semibold">CertiChain Educational Consensus</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setStep(3)}
              disabled={isMining}
              className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>
            <button
              onClick={handleRegisterOnChain}
              disabled={isMining}
              className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg inline-flex items-center gap-1.5 shadow-xs"
            >
              <Blocks className="w-3.5 h-3.5" />
              <span>{isMining ? 'Mining Block & Sealing...' : 'Confirm & Register On Chain'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Confirmation */}
      {step === 5 && registeredCert && (
        <div className="bg-white border border-emerald-200 rounded-xl p-8 shadow-xs text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-slate-900">Certificate Successfully Registered</h2>
            <p className="text-xs text-slate-500">
              Immutable certificate record is permanently anchored onto the CertiChain ledger.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-lg mx-auto text-left text-xs space-y-2 font-mono">
            <div className="flex justify-between">
              <span className="text-slate-500">Certificate ID:</span>
              <span className="font-semibold text-slate-900">{registeredCert.certificateId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Transaction ID:</span>
              <span className="text-blue-600 font-semibold">{registeredCert.transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Block Number:</span>
              <span className="text-slate-900 font-semibold">#{registeredCert.blockNumber}</span>
            </div>
            <div className="pt-2 border-t border-slate-200">
              <span className="text-slate-500 block mb-1">SHA-256 Hash:</span>
              <div className="break-all text-[11px] text-slate-800 bg-white p-2 rounded border border-slate-200">
                {registeredCert.certificateHash}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate(`/verify/${registeredCert.certificateId}`)}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#123B5D] hover:bg-[#0E2E49] rounded-lg inline-flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Verify in Public Portal
            </button>
            <button
              onClick={() => navigate(`/blockchain/${registeredCert.blockNumber}`)}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 inline-flex items-center gap-1.5"
            >
              <Blocks className="w-3.5 h-3.5 text-blue-600" />
              View Blockchain Record
            </button>
            <button
              onClick={() => {
                setStep(1);
                setUploadedFile(null);
                setGeneratedHash('');
                setRegisteredCert(null);
              }}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
            >
              Issue Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
