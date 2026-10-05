# CertiChain — Blockchain-Based Academic Certificate Verification

An enterprise fintech/banking-grade web prototype for tamper-evident academic certificate issuance and verification.

> **Core Value Proposition:** *"Trust academic credentials without trusting the document."*

---

## 🏛️ System Overview

CertiChain implements a **zero-trust, privacy-preserving credential registry architecture**:
1. **Never Stores Raw PDFs on Chain:** The certificate binary remains strictly private. Only the deterministic **SHA-256 cryptographic digest** and institutional metadata are registered.
2. **Deterministic Cryptographic Hashing:** Uses 256-bit SHA-256 (FIPS 180-4 standard). Even a 1-pixel or 1-character change causes a complete hash mismatch due to the avalanche effect.
3. **Sequential Educational Blockchain:** Every certificate registration or revocation is sealed in a cryptographically linked block with `previousHash` validation, block height, nonce, and transaction identifier.
4. **Instant Third-Party Verification:** Public employers, embassies, and universities can verify authenticity via drag-and-drop document comparison or Certificate ID lookup in under 50 milliseconds.

---

## 🎨 Enterprise Design System
- **Palette:** White-first (#FFFFFF surface, #F7F9FC backdrop), Deep Institutional Navy (`#123B5D`), Cobalt Accent (`#2563EB`), Emerald Verified (`#16A34A`), Amber Pending (`#D97706`), Rose Warning/Mismatch (`#DC2626`).
- **Typography:** Inter & JetBrains Mono for cryptographic hashes.
- **Components:** Subtle 12-16px rounded borders, compact financial tables, real interactive Steppers, Recharts analytics, and zero neon/crypto visual clutter.

---

## 🚀 Routes & Pages Implemented

| Route | Page | Description |
|---|---|---|
| `/` | **Landing Page** | Public portal hero, How It Works (01-04), architectural trust principles, and technical FAQ. |
| `/verify` | **Public Verification** | Dual-method verification (File Drag-and-drop & Certificate ID lookup) with live 5-step cryptographic pipeline. |
| `/verify/:id` | **Verification Result** | Comprehensive genuine/mismatch panels, hash delta comparison, and audit trail timeline. |
| `/login` | **Institution Sign In** | Split-screen enterprise login with demo pre-fill accounts and audit logging indicators. |
| `/dashboard` | **Institution Dashboard** | 4 financial-grade KPI cards, Verification Volume Area Chart, Program Donut Chart, and recent ledger table. |
| `/certificates` | **Certificates Registry** | Search, filter by program/status, CSV export, and on-chain revocation modal. |
| `/certificates/issue` | **Issue Certificate** | 5-step registration wizard: Metadata → File Intake → SHA-256 Generation → Block Anchor → Ledger Receipt. |
| `/blockchain` | **Blockchain Explorer** | Visual sequential chain with connecting links, block inspector modal, search, and deep Merkle integrity audit. |
| `/blockchain/:blockId` | **Block Details** | Deep block header inspection, transactions, and validator node details. |
| `/transactions` | **Transactions Log** | Registration, update, and revocation ledger entries. |
| `/audit` | **Audit Logs** | Security operator actions, session IPs, and resource targets. |
| `/analytics` | **Analytics & Performance**| Recharts volume trends, program distributions, and tamper detection intercepts. |
| `/security` | **Security Center** | Interactive blockchain tamper test (corrupt block #1 & heal), system health telemetry. |
| `/institution` | **Institution Profile** | Vishwakarma Institute of Technology accreditation, node ID, and key custodians. |
| `/settings` | **Settings** | Consensus thresholds, keystore preferences, and automated SIEM webhooks. |

---

## 🔑 Demo Accounts

- **Institution Admin (Dean / Registrar):** `admin@certichain.demo`
- **Third-Party Verifier (HR / Background Screener):** `verifier@certichain.demo`
- *(Pre-filled buttons available directly on the login screen for instant evaluation)*

---

## 💻 Running the Application

### Frontend (Active Vite Server)
```bash
cd client
npm install
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.
