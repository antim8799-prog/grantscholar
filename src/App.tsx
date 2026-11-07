import { ThemeProvider } from './context/ThemeContext';
import { ThemeControl } from './components/ThemeControl';
import React, { lazy, Suspense, useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ToastProvider } from './context/ToastContext';
import { ToastContainer } from './components/ToastContainer';
const AuthModal = lazy(() => import('./components/AuthModal').then((module) => ({ default: module.AuthModal })));
const ScholarshipDetailsModal = lazy(() => import('./components/ScholarshipDetailsModal').then((module) => ({ default: module.ScholarshipDetailsModal })));
const ApplyModal = lazy(() => import('./components/ApplyModal').then((module) => ({ default: module.ApplyModal })));
const ComparisonDrawer = lazy(() => import('./components/ComparisonDrawer').then((module) => ({ default: module.ComparisonDrawer })));
const PhotoChangeModal = lazy(() => import('./components/PhotoChangeModal').then((module) => ({ default: module.PhotoChangeModal })));
const Sidebar = lazy(() => import('./components/Sidebar').then((module) => ({ default: module.Sidebar })));

// Pages
import { LandingPage } from './pages/LandingPage';
const Dashboard = lazy(() => import('./pages/Dashboard').then((module) => ({ default: module.Dashboard })));
const Explorer = lazy(() => import('./pages/Explorer').then((module) => ({ default: module.Explorer })));
const EligibilityChecker = lazy(() => import('./pages/EligibilityChecker').then((module) => ({ default: module.EligibilityChecker })));
const MyApplications = lazy(() => import('./pages/MyApplications').then((module) => ({ default: module.MyApplications })));
const SavedScholarships = lazy(() => import('./pages/SavedScholarships').then((module) => ({ default: module.SavedScholarships })));
const DocumentVault = lazy(() => import('./pages/DocumentVault').then((module) => ({ default: module.DocumentVault })));
const Notifications = lazy(() => import('./pages/Notifications').then((module) => ({ default: module.Notifications })));
const Profile = lazy(() => import('./pages/Profile').then((module) => ({ default: module.Profile })));
const Settings = lazy(() => import('./pages/Settings').then((module) => ({ default: module.Settings })));

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
      <Suspense fallback={null}><Sidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      /></Suspense>

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
          <Suspense fallback={<div role="status" className="p-6 text-sm text-slate-500">Loading page…</div>}>
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'explorer' && <Explorer />}
          {currentView === 'checker' && <EligibilityChecker />}
          {currentView === 'applications' && <MyApplications />}
          {currentView === 'saved' && <SavedScholarships />}
          {currentView === 'documents' && <DocumentVault />}
          {currentView === 'notifications' && <Notifications />}
          {currentView === 'profile' && <Profile />}
          {currentView === 'settings' && <Settings />}
          </Suspense>
        </main>
      </div>
    </div>
  );
};

function GlobalDialogs() {
  const { authModal, isPhotoModalOpen, activeDetailScholarship, applyTargetScholarship, compareList } = useApp();
  return (
    <>
      <Suspense fallback={<div role="status" className="fixed bottom-5 left-5 z-50 rounded-xl bg-white p-4 text-slate-900 shadow-lg">Loading dialog…</div>}>
        {authModal && <AuthModal />}
        {isPhotoModalOpen && <PhotoChangeModal />}
        {activeDetailScholarship && <ScholarshipDetailsModal />}
        {applyTargetScholarship && <ApplyModal />}
        {compareList.length > 0 && <ComparisonDrawer />}
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider><ToastProvider><AppProvider>
      <div className="relative min-h-screen font-sans">
        <ToastContainer />
        <GlobalDialogs />
        <MainLayout />
      </div>
    </AppProvider></ToastProvider></ThemeProvider>
  );
}
