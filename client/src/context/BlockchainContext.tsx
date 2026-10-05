import React, { createContext, useContext, useState, useEffect } from 'react';
import { Certificate, Block, AuditLog, Institution, VerificationResultData } from '../types';
import {
  INITIAL_INSTITUTION,
  INITIAL_CERTIFICATES,
  INITIAL_BLOCKS,
  INITIAL_AUDIT_LOGS
} from '../data/mockData';
import { calculateSHA256, calculateBlockHash } from '../utils/crypto';

interface User {
  email: string;
  role: 'SUPER_ADMIN' | 'INSTITUTION_ADMIN' | 'VERIFIER' | 'PUBLIC';
  institutionName: string;
  name: string;
}

interface BlockchainContextType {
  user: User | null;
  login: (email: string, role?: 'SUPER_ADMIN' | 'INSTITUTION_ADMIN' | 'VERIFIER') => boolean;
  logout: () => void;
  certificates: Certificate[];
  blocks: Block[];
  auditLogs: AuditLog[];
  institution: Institution;
  isChainValid: () => Promise<{ valid: boolean; failedIndex?: number; reason?: string }>;
  registerCertificate: (certData: Omit<Certificate, 'id' | 'blockNumber' | 'transactionId' | 'status' | 'createdAt'>) => Promise<Certificate>;
  revokeCertificate: (certId: string, reason?: string) => Promise<boolean>;
  verifyCertificateByIdOrHash: (identifierOrId: string, fileBytes?: ArrayBuffer) => Promise<VerificationResultData>;
  tamperBlockDataForDemo: (blockIndex: number) => void;
  restoreBlockData: () => void;
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined);

export const BlockchainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('certichain_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return {
      email: 'admin@certichain.demo',
      role: 'INSTITUTION_ADMIN',
      institutionName: 'Vishwakarma Institute of Technology',
      name: 'Dr. Rajesh K. Kulkarni'
    };
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const saved = localStorage.getItem('certichain_certificates');
    return saved ? JSON.parse(saved) : INITIAL_CERTIFICATES;
  });

  const [blocks, setBlocks] = useState<Block[]>(() => {
    const saved = localStorage.getItem('certichain_blocks');
    return saved ? JSON.parse(saved) : INITIAL_BLOCKS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('certichain_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [institution] = useState<Institution>(INITIAL_INSTITUTION);

  useEffect(() => {
    localStorage.setItem('certichain_certificates', JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem('certichain_blocks', JSON.stringify(blocks));
  }, [blocks]);

  useEffect(() => {
    localStorage.setItem('certichain_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('certichain_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('certichain_user');
    }
  }, [user]);

  const login = (email: string, role: 'SUPER_ADMIN' | 'INSTITUTION_ADMIN' | 'VERIFIER' = 'INSTITUTION_ADMIN') => {
    const newUser: User = {
      email,
      role,
      institutionName: 'Vishwakarma Institute of Technology',
      name: role === 'INSTITUTION_ADMIN' ? 'Dr. Rajesh K. Kulkarni (Dean)' : 'Auditor / Verifier'
    };
    setUser(newUser);
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      user: email,
      action: 'Login',
      resource: 'Institutional Session Created',
      ipSession: '192.168.1.104 (Authenticated Session)',
      status: 'Success'
    };
    setAuditLogs(prev => [newLog, ...prev]);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const isChainValid = async (): Promise<{ valid: boolean; failedIndex?: number; reason?: string }> => {
    for (let i = 1; i < blocks.length; i++) {
      const currentBlock = blocks[i];
      const previousBlock = blocks[i - 1];

      // Check previous hash link
      if (currentBlock.previousHash !== previousBlock.hash) {
        return {
          valid: false,
          failedIndex: currentBlock.index,
          reason: `Block #${currentBlock.index} previousHash (${currentBlock.previousHash.slice(0, 10)}...) does not match Block #${previousBlock.index} actual hash (${previousBlock.hash.slice(0, 10)}...). Link broken!`
        };
      }
    }
    return { valid: true };
  };

  const registerCertificate = async (
    certData: Omit<Certificate, 'id' | 'blockNumber' | 'transactionId' | 'status' | 'createdAt'>
  ): Promise<Certificate> => {
    const newBlockIndex = blocks.length;
    const latestBlock = blocks[blocks.length - 1];
    const timestamp = new Date().toISOString();
    const transactionId = `TX-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${certData.certificateId.replace(/[^0-9]/g, '').slice(-4) || '0001'}`;

    const newTx = {
      transactionId,
      certificateId: certData.certificateId,
      type: 'Certificate Registration' as const,
      timestamp,
      issuer: certData.issuer || institution.name,
      certificateHash: certData.certificateHash,
      blockNumber: newBlockIndex,
      status: 'Confirmed' as const,
      studentIdentifier: `${certData.studentName} (${certData.studentId})`
    };

    const newBlockHash = await calculateBlockHash(
      newBlockIndex,
      timestamp,
      [newTx],
      latestBlock.hash
    );

    const newBlock: Block = {
      index: newBlockIndex,
      timestamp,
      transactions: [newTx],
      previousHash: latestBlock.hash,
      hash: newBlockHash,
      validator: 'VIT Registrar Node (Node-VIT-01)',
      nonce: Math.floor(Math.random() * 9000) + 1000
    };

    const newCert: Certificate = {
      ...certData,
      id: `c-${Date.now()}`,
      blockNumber: newBlockIndex,
      transactionId,
      status: 'Verified',
      createdAt: timestamp
    };

    setBlocks(prev => [...prev, newBlock]);
    setCertificates(prev => [newCert, ...prev]);

    // Add Audit Log
    const newLogs: AuditLog[] = [
      {
        id: `log-${Date.now()}-1`,
        timestamp,
        user: user?.email || 'admin@certichain.demo',
        action: 'Certificate Issued',
        resource: `${certData.certificateId} (${certData.studentName})`,
        ipSession: '192.168.1.104 (Campus Node)',
        status: 'Success'
      },
      {
        id: `log-${Date.now()}-2`,
        timestamp,
        user: 'system_node_01',
        action: 'Blockchain Record Created',
        resource: `Block #${newBlockIndex} / ${transactionId}`,
        ipSession: '127.0.0.1 (Local Node RPC)',
        status: 'Success'
      }
    ];

    setAuditLogs(prev => [...newLogs, ...prev]);
    return newCert;
  };

  const revokeCertificate = async (certId: string, reason = 'Administrative revocation'): Promise<boolean> => {
    const cert = certificates.find(c => c.certificateId === certId);
    if (!cert) return false;

    const timestamp = new Date().toISOString();
    const newBlockIndex = blocks.length;
    const latestBlock = blocks[blocks.length - 1];
    const transactionId = `TX-REV-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${cert.certificateId.replace(/[^0-9]/g, '').slice(-4)}`;

    const revokeTx = {
      transactionId,
      certificateId: cert.certificateId,
      type: 'Certificate Revocation' as const,
      timestamp,
      issuer: cert.issuer,
      certificateHash: cert.certificateHash,
      blockNumber: newBlockIndex,
      status: 'Confirmed' as const,
      studentIdentifier: `${cert.studentName} (Revoked: ${reason})`
    };

    const newBlockHash = await calculateBlockHash(
      newBlockIndex,
      timestamp,
      [revokeTx],
      latestBlock.hash
    );

    const newBlock: Block = {
      index: newBlockIndex,
      timestamp,
      transactions: [revokeTx],
      previousHash: latestBlock.hash,
      hash: newBlockHash,
      validator: 'VIT Registrar Node (Node-VIT-01)',
      nonce: Math.floor(Math.random() * 9000) + 1000
    };

    setBlocks(prev => [...prev, newBlock]);
    setCertificates(prev => prev.map(c => c.certificateId === certId ? { ...c, status: 'Revoked' } : c));

    setAuditLogs(prev => [
      {
        id: `log-${Date.now()}`,
        timestamp,
        user: user?.email || 'admin@certichain.demo',
        action: 'Certificate Revoked',
        resource: `${cert.certificateId} (${cert.studentName} - ${reason})`,
        ipSession: '192.168.1.104',
        status: 'Success'
      },
      ...prev
    ]);

    return true;
  };

  const verifyCertificateByIdOrHash = async (
    identifierOrId: string,
    fileBytes?: ArrayBuffer
  ): Promise<VerificationResultData> => {
    const timestamp = new Date().toISOString();
    let computedHash = '';

    if (fileBytes) {
      computedHash = await calculateSHA256(fileBytes);
    }

    // Try finding by Certificate ID first
    const certById = certificates.find(c =>
      c.certificateId.toLowerCase().trim() === identifierOrId.toLowerCase().trim()
    );

    // Or finding by Certificate Hash
    const certByHash = certificates.find(c =>
      c.certificateHash.toLowerCase() === identifierOrId.toLowerCase().trim() ||
      (computedHash && c.certificateHash.toLowerCase() === computedHash.toLowerCase())
    );

    const matchedCert = certById || certByHash;

    if (!matchedCert) {
      // Neither record found
      const result: VerificationResultData = {
        status: 'NOT_FOUND',
        certificateId: identifierOrId,
        submittedHash: computedHash || identifierOrId,
        verificationTimestamp: timestamp,
        cryptographicIntegrity: 'MISMATCH',
        blockchainRecord: 'NOT_FOUND',
        issuingInstitution: 'UNVERIFIED'
      };

      setAuditLogs(prev => [
        {
          id: `log-${Date.now()}`,
          timestamp,
          user: 'public_verifier@gateway.certichain.org',
          action: 'Certificate Verified',
          resource: `Unknown query: ${identifierOrId}`,
          ipSession: '49.36.128.45',
          status: 'Failed'
        },
        ...prev
      ]);

      return result;
    }

    // Check if uploaded file hash matches registered certificate hash
    if (computedHash && computedHash.toLowerCase() !== matchedCert.certificateHash.toLowerCase()) {
      // Tampered / Modified Document
      const result: VerificationResultData = {
        status: 'MISMATCH',
        certificateId: matchedCert.certificateId,
        studentName: matchedCert.studentName,
        institution: matchedCert.institution,
        program: matchedCert.program,
        issueDate: matchedCert.issueDate,
        submittedHash: computedHash,
        registeredHash: matchedCert.certificateHash,
        blockNumber: matchedCert.blockNumber,
        transactionId: matchedCert.transactionId,
        verificationTimestamp: timestamp,
        cryptographicIntegrity: 'MISMATCH',
        blockchainRecord: 'FOUND',
        issuingInstitution: 'VERIFIED',
        isRevoked: matchedCert.status === 'Revoked'
      };

      setAuditLogs(prev => [
        {
          id: `log-${Date.now()}`,
          timestamp,
          user: 'verifier@certichain.demo',
          action: 'Tamper Detection Event',
          resource: `Tampered Hash on ${matchedCert.certificateId}`,
          ipSession: '49.36.128.45',
          status: 'Warning'
        },
        ...prev
      ]);

      return result;
    }

    // Genuine Match
    const result: VerificationResultData = {
      status: 'VERIFIED',
      certificateId: matchedCert.certificateId,
      studentName: matchedCert.studentName,
      institution: matchedCert.institution,
      program: matchedCert.program,
      issueDate: matchedCert.issueDate,
      submittedHash: matchedCert.certificateHash,
      registeredHash: matchedCert.certificateHash,
      blockNumber: matchedCert.blockNumber,
      transactionId: matchedCert.transactionId,
      verificationTimestamp: timestamp,
      cryptographicIntegrity: 'MATCH',
      blockchainRecord: 'FOUND',
      issuingInstitution: 'VERIFIED',
      isRevoked: matchedCert.status === 'Revoked'
    };

    setAuditLogs(prev => [
      {
        id: `log-${Date.now()}`,
        timestamp,
        user: 'public_verifier@gateway.certichain.org',
        action: 'Certificate Verified',
        resource: `${matchedCert.certificateId} (${matchedCert.studentName})`,
        ipSession: '49.36.128.45',
        status: 'Success'
      },
      ...prev
    ]);

    return result;
  };

  const tamperBlockDataForDemo = (blockIndex: number) => {
    setBlocks(prev => prev.map(b => {
      if (b.index === blockIndex) {
        return {
          ...b,
          transactions: b.transactions.map(t => ({
            ...t,
            certificateHash: 'TAMPERED_0000_CORRUPTED_HASH_TEST'
          }))
        };
      }
      return b;
    }));
  };

  const restoreBlockData = () => {
    setBlocks(INITIAL_BLOCKS);
    setCertificates(INITIAL_CERTIFICATES);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    localStorage.removeItem('certichain_blocks');
    localStorage.removeItem('certichain_certificates');
    localStorage.removeItem('certichain_audit_logs');
  };

  return (
    <BlockchainContext.Provider
      value={{
        user,
        login,
        logout,
        certificates,
        blocks,
        auditLogs,
        institution,
        isChainValid,
        registerCertificate,
        revokeCertificate,
        verifyCertificateByIdOrHash,
        tamperBlockDataForDemo,
        restoreBlockData
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};

export const useBlockchain = () => {
  const context = useContext(BlockchainContext);
  if (!context) {
    throw new Error('useBlockchain must be used within a BlockchainProvider');
  }
  return context;
};
