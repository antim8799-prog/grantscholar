import { ThemeProvider } from './context/ThemeContext';
import { ThemeControl } from './components/ThemeControl';
import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ToastContainer } from './components/ToastContainer';
import { AuthModal } from './components/AuthModal';
import { ScholarshipDetailsModal } from './components/ScholarshipDetailsModal';
import { ApplyModal } from './components/ApplyModal';
import { ComparisonDrawer } from './components/ComparisonDrawer';
import { PhotoChangeModal } from './components/PhotoChangeModal';
import { Sidebar } from './components/Sidebar';

// Pages
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { Explorer } from './pages/Explorer';
import { EligibilityChecker } from './pages/EligibilityChecker';
import { MyApplications } from './pages/MyApplications';
import { SavedScholarships } from './pages/SavedScholarships';
import { DocumentVault } from './pages/DocumentVault';
import { Notifications } from './pages/Notifications';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';

const MainLayout: React.FC = () => {
  const { currentView, setCurrentView } = useApp();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // If on public landing page
  if (currentView === 'landing') {
    return <LandingPage />;
  }

  // Active view title mapping for breadcrumbs
  const breadcrumbLabels: Record<string, string> = {
    dashboard: 'Overview',
    explorer: 'Explore Scholarships',
    checker: 'Eligibility Checker',
    applications: 'My Applications',
    saved: 'Saved Scholarships',
    documents: 'Document Vault',
    notifications: 'Notifications',
    profile: 'Student Profile',
    settings: 'Settings'
  };

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header / Breadcrumbs Bar */}
        <header className="bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 truncate">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="hover:text-indigo-700 transition-colors"
            >
              Workspace
            </button>
            <span aria-hidden="true" className="text-slate-300">/</span>
            <span className="text-slate-900 font-semibold truncate">
              {breadcrumbLabels[currentView] || 'Portal'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ThemeControl />
            <button
              onClick={() => setCurrentView('landing')}
              className="text-xs font-semibold text-slate-600 hover:text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition border border-slate-200"
            >
              Public Home
            </button>
          </div>
        </header>

        {/* View Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'explorer' && <Explorer />}
          {currentView === 'checker' && <EligibilityChecker />}
          {currentView === 'applications' && <MyApplications />}
          {currentView === 'saved' && <SavedScholarships />}
          {currentView === 'documents' && <DocumentVault />}
          {currentView === 'notifications' && <Notifications />}
          {currentView === 'profile' && <Profile />}
          {currentView === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider><AppProvider>
      <div className="relative min-h-screen font-sans">
        {/* Global Floating Components */}
        <ToastContainer />
        <AuthModal />
        <PhotoChangeModal />
        <ScholarshipDetailsModal />
        <ApplyModal />
        <ComparisonDrawer />

        {/* Primary Layout Router */}
        <MainLayout />
      </div>
    </AppProvider></ThemeProvider>
  );
}
