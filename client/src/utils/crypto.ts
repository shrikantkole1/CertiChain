// Deterministic SHA-256 implementation using Web Crypto API
export async function calculateSHA256(content: string | ArrayBuffer): Promise<string> {
  let buffer: ArrayBuffer;
  if (typeof content === 'string') {
    const encoder = new TextEncoder();
    buffer = encoder.encode(content).buffer as ArrayBuffer;
  } else {
    buffer = content;
  }
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Calculate block hash deterministically
export async function calculateBlockHash(
  index: number,
  timestamp: string,
  transactions: any[],
  previousHash: string
): Promise<string> {
  const dataString = index + timestamp + JSON.stringify(transactions) + previousHash;
  return calculateSHA256(dataString);
}

// Generate canonical hash for certificate details
export async function generateCertificateDataHash(certData: {
  studentName: string;
  studentId: string;
  institution: string;
  program: string;
  department: string;
  grade: string;
  issueDate: string;
}): Promise<string> {
  const canonicalString = JSON.stringify({
    name: certData.studentName.trim(),
    id: certData.studentId.trim(),
    inst: certData.institution.trim(),
    prog: certData.program.trim(),
    dept: certData.department.trim(),
    grade: certData.grade.trim(),
    date: certData.issueDate.trim()
  });
  return calculateSHA256(canonicalString);
}
