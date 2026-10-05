import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BlockchainProvider } from './context/BlockchainContext';
import { DashboardLayout } from './components/layout/DashboardLayout';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { PublicVerifyPage } from './pages/PublicVerifyPage';
import { DashboardPage } from './pages/DashboardPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { IssueCertificatePage } from './pages/IssueCertificatePage';
import { BlockchainExplorerPage } from './pages/BlockchainExplorerPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { AuditLogsPage } from './pages/AuditLogsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SecurityPage } from './pages/SecurityPage';
import { InstitutionProfilePage } from './pages/InstitutionProfilePage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  return (
    <BlockchainProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing & Verification routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/verify" element={<PublicVerifyPage />} />
          <Route path="/verify/:id" element={<PublicVerifyPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Authenticated Institutional Dashboard routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/certificates" element={<CertificatesPage />} />
            <Route path="/certificates/issue" element={<IssueCertificatePage />} />
            <Route path="/blockchain" element={<BlockchainExplorerPage />} />
            <Route path="/blockchain/:blockId" element={<BlockchainExplorerPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/audit" element={<AuditLogsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/institution" element={<InstitutionProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/settings/*" element={<SettingsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </BlockchainProvider>
  );
}

export default App;
