import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/common/Navbar';
import { DetailModal } from './components/common/DetailModal';
import { LightningLoader } from './components/common/LightningLoader';
import { HomePage } from './pages/HomePage';
import { JournalPage } from './pages/JournalPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AdminPage } from './pages/AdminPage';

// Helper to scroll to top whenever URL route changes
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export const AppContent = () => {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    <>
      <ScrollToTop />
      <LightningLoader />
      {!isAdmin && <Navbar />}
      <main className="relative">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jurnal" element={<JournalPage />} />
          <Route path="/proyek" element={<ProjectsPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      <DetailModal />
    </>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </PortfolioProvider>
  );
}
