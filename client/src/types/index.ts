export interface Certificate {
  id: string;
  certificateId: string;
  studentName: string;
  studentId: string;
  institution: string;
  program: string;
  department: string;
  grade: string;
  issueDate: string;
  certificateHash: string;
  blockNumber: number;
  transactionId: string;
  status: 'Verified' | 'Pending' | 'Revoked';
  issuer: string;
  createdAt: string;
}

export interface BlockTransaction {
  transactionId: string;
  certificateId: string;
  type: 'Certificate Registration' | 'Certificate Revocation' | 'Certificate Update';
  timestamp: string;
  issuer: string;
  certificateHash: string;
  blockNumber: number;
  status: 'Confirmed' | 'Pending';
  studentIdentifier?: string;
}

export interface Block {
  index: number;
  timestamp: string;
  transactions: BlockTransaction[];
  previousHash: string;
  hash: string;
  validator: string;
  nonce?: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: 'Certificate Issued' | 'Certificate Verified' | 'Certificate Revoked' | 'Blockchain Record Created' | 'Login' | 'Password Changed' | 'Tamper Detection Event';
  resource: string;
  ipSession: string;
  status: 'Success' | 'Warning' | 'Failed';
}

export interface Institution {
  id: string;
  name: string;
  code: string;
  accreditation: string;
  email: string;
  website: string;
  verificationStatus: 'Verified' | 'Pending' | 'Suspended';
  blockchainAddress: string;
  authorizedAdministrators: {
    name: string;
    email: string;
    role: string;
  }[];
}

export interface VerificationResultData {
  status: 'VERIFIED' | 'MISMATCH' | 'NOT_FOUND';
  certificateId: string;
  studentName?: string;
  institution?: string;
  program?: string;
  issueDate?: string;
  submittedHash: string;
  registeredHash?: string;
  blockNumber?: number;
  transactionId?: string;
  verificationTimestamp: string;
  cryptographicIntegrity: 'MATCH' | 'MISMATCH';
  blockchainRecord: 'FOUND' | 'NOT_FOUND';
  issuingInstitution: 'VERIFIED' | 'UNVERIFIED';
  isRevoked?: boolean;
}
