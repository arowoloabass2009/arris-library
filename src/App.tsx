// ============================================================
// ARRIS LIBRARY — Root Application Component
// ============================================================

import { useState, useEffect } from 'react';
import { AdminProvider } from './hooks/useAdmin';
import { ToastProvider } from './hooks/useToast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastContainer from './components/ToastContainer';
import AdminLoginModal from './components/AdminLoginModal';
import HomePage from './pages/HomePage';
import LibraryPage from './pages/LibraryPage';
import TrainingPage from './pages/TrainingPage';
import AdminPage from './pages/AdminPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { getDeviceSession } from './lib/deviceId';
import { DeviceSessionService } from './lib/supabase';

type Page = 'home' | 'library' | 'training' | 'admin' | 'about' | 'contact';

function AppInner() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  // Register device session on mount
  useEffect(() => {
    const session = getDeviceSession();
    DeviceSessionService.upsert(session).catch(() => {});

    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const navigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-white font-inter flex flex-col">
      <Navbar
        currentPage={currentPage}
        onNavigate={navigate}
        onAdminClick={() => setAdminModalOpen(true)}
      />

      <main className="flex-1">
        {currentPage === 'home'     && <HomePage    onNavigate={navigate} />}
        {currentPage === 'library'  && <LibraryPage />}
        {currentPage === 'training' && <TrainingPage />}
        {currentPage === 'admin'    && <AdminPage />}
        {currentPage === 'about'    && <AboutPage   onNavigate={navigate} />}
        {currentPage === 'contact'  && <ContactPage />}
      </main>

      <Footer onNavigate={navigate} />

      <AdminLoginModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        onSuccess={() => navigate('admin')}
      />

      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AdminProvider>
        <AppInner />
      </AdminProvider>
    </ToastProvider>
  );
}
