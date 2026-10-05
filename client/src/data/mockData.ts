import { Certificate, Block, BlockTransaction, AuditLog, Institution } from '../types';

export const INITIAL_INSTITUTION: Institution = {
  id: 'inst-vit-pune-01',
  name: 'Vishwakarma Institute of Technology',
  code: 'VIT-PUNE-6112',
  accreditation: 'NAAC A++ Accredited | AICTE Approved | Autonomous',
  email: 'admin@certichain.demo',
  website: 'https://www.vit.edu',
  verificationStatus: 'Verified',
  blockchainAddress: '0x8f2A91D6E7216A8C9c1E86E20738e4A81De95B24',
  authorizedAdministrators: [
    {
      name: 'Dr. Rajesh K. Kulkarni',
      email: 'admin@certichain.demo',
      role: 'Chief Academic Registrar & Dean'
    },
    {
      name: 'Prof. S. N. Deshmukh',
      email: 'registrar@vit.edu',
      role: 'Head of Examination Cell'
    }
  ]
};

export const INITIAL_GENESIS_BLOCK: Block = {
  index: 0,
  timestamp: '2026-09-01T00:00:00.000Z',
  transactions: [],
  previousHash: '0',
  hash: '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f',
  validator: 'CertiChain Genesis Network Validator',
  nonce: 0
};

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'c1',
    certificateId: 'CERT-2026-001284',
    studentName: 'Aarav Sharma',
    studentId: 'VIT-2022-CS-084',
    institution: 'Vishwakarma Institute of Technology',
    program: 'B.Tech Computer Engineering',
    department: 'Department of Computer Engineering',
    grade: '9.42 CGPA (First Class with Distinction)',
    issueDate: '2026-09-15',
    certificateHash: '8c3f4e8b91a27d6c5e0f3b4a5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e',
    blockNumber: 1,
    transactionId: 'TX-8F4C-9E8A-001284',
    status: 'Verified',
    issuer: 'Vishwakarma Institute of Technology',
    createdAt: '2026-09-15T10:30:00Z'
  },
  {
    id: 'c2',
    certificateId: 'CERT-2026-001285',
    studentName: 'Ananya Patil',
    studentId: 'VIT-2022-AI-019',
    institution: 'Vishwakarma Institute of Technology',
    program: 'B.Tech Artificial Intelligence',
    department: 'Department of Artificial Intelligence & Data Science',
    grade: '9.68 CGPA (First Class with Distinction)',
    issueDate: '2026-09-18',
    certificateHash: '4d8a1c9e7b2f5a0d3e6f8b1a4c7e0d2f5a8b1c4e7d0a2f5b8c1e4d7a0b3c6e9f',
    blockNumber: 2,
    transactionId: 'TX-3E1B-7A9D-001285',
    status: 'Verified',
    issuer: 'Vishwakarma Institute of Technology',
    createdAt: '2026-09-18T11:15:00Z'
  },
  {
    id: 'c3',
    certificateId: 'CERT-2026-001286',
    studentName: 'Rohan Kulkarni',
    studentId: 'VIT-2022-ET-045',
    institution: 'Vishwakarma Institute of Technology',
    program: 'B.Tech Electronics Engineering',
    department: 'Department of Electronics & Telecommunication',
    grade: '8.85 CGPA (First Class with Distinction)',
    issueDate: '2026-09-22',
    certificateHash: '9a2b5c8e1f4d7a0b3c6e9f2a5b8c1e4d7a0b3c6e9f1a4d7a0b3c6e8f1a3b5c7d',
    blockNumber: 3,
    transactionId: 'TX-9C2E-5B1F-001286',
    status: 'Verified',
    issuer: 'Vishwakarma Institute of Technology',
    createdAt: '2026-09-22T09:45:00Z'
  },
  {
    id: 'c4',
    certificateId: 'CERT-2026-001287',
    studentName: 'Isha Deshmukh',
    studentId: 'VIT-2024-MC-012',
    institution: 'Vishwakarma Institute of Technology',
    program: 'M.Tech Computer Engineering',
    department: 'Postgraduate Studies & Research Division',
    grade: '9.80 CGPA (Gold Medalist)',
    issueDate: '2026-09-28',
    certificateHash: '5e7f9a1b3c5d7e9f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f',
    blockNumber: 4,
    transactionId: 'TX-2A7F-4D9E-001287',
    status: 'Verified',
    issuer: 'Vishwakarma Institute of Technology',
    createdAt: '2026-09-28T14:20:00Z'
  },
  {
    id: 'c5',
    certificateId: 'CERT-2026-001288',
    studentName: 'Aditya Joshi',
    studentId: 'VIT-2022-CS-110',
    institution: 'Vishwakarma Institute of Technology',
    program: 'B.Tech Computer Engineering',
    department: 'Department of Computer Engineering',
    grade: '7.95 CGPA (First Class)',
    issueDate: '2026-10-01',
    certificateHash: '7b1c3e5a9d2f4a6c8e0b2d4f6a8c0e2b4d6f8a0c2e4b6d8f0a2c4e6b8d0f2a4c',
    blockNumber: 5,
    transactionId: 'TX-6F1D-8C3A-001288',
    status: 'Revoked',
    issuer: 'Vishwakarma Institute of Technology',
    createdAt: '2026-10-01T16:00:00Z'
  }
];

export const INITIAL_BLOCKS: Block[] = [
  INITIAL_GENESIS_BLOCK,
  {
    index: 1,
    timestamp: '2026-09-15T10:30:00Z',
    transactions: [
      {
        transactionId: 'TX-8F4C-9E8A-001284',
        certificateId: 'CERT-2026-001284',
        type: 'Certificate Registration',
        timestamp: '2026-09-15T10:30:00Z',
        issuer: 'Vishwakarma Institute of Technology',
        certificateHash: '8c3f4e8b91a27d6c5e0f3b4a5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e',
        blockNumber: 1,
        status: 'Confirmed',
        studentIdentifier: 'Aarav Sharma (VIT-2022-CS-084)'
      }
    ],
    previousHash: INITIAL_GENESIS_BLOCK.hash,
    hash: 'a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0',
    validator: 'VIT Registrar Node (Node-VIT-01)',
    nonce: 1042
  },
  {
    index: 2,
    timestamp: '2026-09-18T11:15:00Z',
    transactions: [
      {
        transactionId: 'TX-3E1B-7A9D-001285',
        certificateId: 'CERT-2026-001285',
        type: 'Certificate Registration',
        timestamp: '2026-09-18T11:15:00Z',
        issuer: 'Vishwakarma Institute of Technology',
        certificateHash: '4d8a1c9e7b2f5a0d3e6f8b1a4c7e0d2f5a8b1c4e7d0a2f5b8c1e4d7a0b3c6e9f',
        blockNumber: 2,
        status: 'Confirmed',
        studentIdentifier: 'Ananya Patil (VIT-2022-AI-019)'
      }
    ],
    previousHash: 'a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0',
    hash: 'b2c3d4e5f6a17890123456789abcdef0123456789abcdef0123456789abcdef1',
    validator: 'VIT Registrar Node (Node-VIT-01)',
    nonce: 2189
  },
  {
    index: 3,
    timestamp: '2026-09-22T09:45:00Z',
    transactions: [
      {
        transactionId: 'TX-9C2E-5B1F-001286',
        certificateId: 'CERT-2026-001286',
        type: 'Certificate Registration',
        timestamp: '2026-09-22T09:45:00Z',
        issuer: 'Vishwakarma Institute of Technology',
        certificateHash: '9a2b5c8e1f4d7a0b3c6e9f2a5b8c1e4d7a0b3c6e9f1a4d7a0b3c6e8f1a3b5c7d',
        blockNumber: 3,
        status: 'Confirmed',
        studentIdentifier: 'Rohan Kulkarni (VIT-2022-ET-045)'
      }
    ],
    previousHash: 'b2c3d4e5f6a17890123456789abcdef0123456789abcdef0123456789abcdef1',
    hash: 'c3d4e5f6a1b27890123456789abcdef0123456789abcdef0123456789abcdef2',
    validator: 'VIT Registrar Node (Node-VIT-01)',
    nonce: 3341
  },
  {
    index: 4,
    timestamp: '2026-09-28T14:20:00Z',
    transactions: [
      {
        transactionId: 'TX-2A7F-4D9E-001287',
        certificateId: 'CERT-2026-001287',
        type: 'Certificate Registration',
        timestamp: '2026-09-28T14:20:00Z',
        issuer: 'Vishwakarma Institute of Technology',
        certificateHash: '5e7f9a1b3c5d7e9f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f',
        blockNumber: 4,
        status: 'Confirmed',
        studentIdentifier: 'Isha Deshmukh (VIT-2024-MC-012)'
      }
    ],
    previousHash: 'c3d4e5f6a1b27890123456789abcdef0123456789abcdef0123456789abcdef2',
    hash: 'd4e5f6a1b2c37890123456789abcdef0123456789abcdef0123456789abcdef3',
    validator: 'VIT Registrar Node (Node-VIT-01)',
    nonce: 4120
  },
  {
    index: 5,
    timestamp: '2026-10-01T16:00:00Z',
    transactions: [
      {
        transactionId: 'TX-6F1D-8C3A-001288',
        certificateId: 'CERT-2026-001288',
        type: 'Certificate Registration',
        timestamp: '2026-10-01T16:00:00Z',
        issuer: 'Vishwakarma Institute of Technology',
        certificateHash: '7b1c3e5a9d2f4a6c8e0b2d4f6a8c0e2b4d6f8a0c2e4b6d8f0a2c4e6b8d0f2a4c',
        blockNumber: 5,
        status: 'Confirmed',
        studentIdentifier: 'Aditya Joshi (VIT-2022-CS-110)'
      },
      {
        transactionId: 'TX-REV-9011-001288',
        certificateId: 'CERT-2026-001288',
        type: 'Certificate Revocation',
        timestamp: '2026-10-03T11:22:00Z',
        issuer: 'Vishwakarma Institute of Technology',
        certificateHash: '7b1c3e5a9d2f4a6c8e0b2d4f6a8c0e2b4d6f8a0c2e4b6d8f0a2c4e6b8d0f2a4c',
        blockNumber: 5,
        status: 'Confirmed',
        studentIdentifier: 'Aditya Joshi (Re-issue requested due to grade revision)'
      }
    ],
    previousHash: 'd4e5f6a1b2c37890123456789abcdef0123456789abcdef0123456789abcdef3',
    hash: 'e5f6a1b2c3d47890123456789abcdef0123456789abcdef0123456789abcdef4',
    validator: 'VIT Registrar Node (Node-VIT-01)',
    nonce: 5892
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-101',
    timestamp: '2026-10-05T18:15:30Z',
    user: 'admin@certichain.demo',
    action: 'Login',
    resource: 'Auth / Institutional SSO Session #8192',
    ipSession: '192.168.1.104 (Pune Campus Network)',
    status: 'Success'
  },
  {
    id: 'log-102',
    timestamp: '2026-10-05T14:42:19Z',
    user: 'public_verifier@gateway.certichain.org',
    action: 'Certificate Verified',
    resource: 'CERT-2026-001284 (Aarav Sharma)',
    ipSession: '49.36.128.45 (Bangalore, Karnataka)',
    status: 'Success'
  },
  {
    id: 'log-103',
    timestamp: '2026-10-04T16:20:05Z',
    user: 'verifier_hr@techcorp.in',
    action: 'Tamper Detection Event',
    resource: 'CERT-2026-001284 (Altered CGPA in uploaded PDF)',
    ipSession: '115.112.45.19 (Hyderabad, Telangana)',
    status: 'Warning'
  },
  {
    id: 'log-104',
    timestamp: '2026-10-03T11:22:00Z',
    user: 'admin@certichain.demo',
    action: 'Certificate Revoked',
    resource: 'CERT-2026-001288 (Aditya Joshi - Grade Revision)',
    ipSession: '192.168.1.104 (Pune Campus Network)',
    status: 'Success'
  },
  {
    id: 'log-105',
    timestamp: '2026-10-01T16:00:00Z',
    user: 'admin@certichain.demo',
    action: 'Certificate Issued',
    resource: 'CERT-2026-001288 (Aditya Joshi)',
    ipSession: '192.168.1.104 (Pune Campus Network)',
    status: 'Success'
  },
  {
    id: 'log-106',
    timestamp: '2026-10-01T16:00:05Z',
    user: 'system_node_01',
    action: 'Blockchain Record Created',
    resource: 'Block #5 / TX-6F1D-8C3A-001288',
    ipSession: '127.0.0.1 (Local Node RPC)',
    status: 'Success'
  },
  {
    id: 'log-107',
    timestamp: '2026-09-28T14:20:00Z',
    user: 'admin@certichain.demo',
    action: 'Certificate Issued',
    resource: 'CERT-2026-001287 (Isha Deshmukh)',
    ipSession: '192.168.1.104 (Pune Campus Network)',
    status: 'Success'
  }
];
