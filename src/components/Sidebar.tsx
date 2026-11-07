import { avatarPresets as fallbackAvatars } from '../data/avatars';
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AppView } from '../types';
import {
  GraduationCap,
  LayoutDashboard,
  Search,
  FileText,
  Bookmark,
  ShieldCheck,
  FolderOpen,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Camera
} from 'lucide-react';
import { Logo } from './Logo';

interface SidebarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sidebarCollapsed,
  setSidebarCollapsed
}) => {
  const {
    currentView,
    setCurrentView,
    userProfile,
    setIsAuthenticated,
    notifications,
    addToast,
    setIsPhotoModalOpen
  } = useApp();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems: { id: AppView; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'explorer', label: 'Explore Scholarships', icon: Search },
    { id: 'checker', label: 'Eligibility Checker', icon: ShieldCheck },
    { id: 'applications', label: 'My Applications', icon: FileText },
    { id: 'saved', label: 'Saved Scholarships', icon: Bookmark },
    { id: 'documents', label: 'My Documents', icon: FolderOpen },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadCount },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('landing');
    addToast('Signed out of student portal', 'info');
  };

  return (
    <>
      {/* Mobile Top App Bar */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div
          onClick={() => setCurrentView('dashboard')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Logo className="w-8 h-8" />
          <span className="font-extrabold text-slate-900 tracking-tight text-lg">
            GRANTLY
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('notifications')}
            className="relative p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
            )}
          </button>
          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            aria-label="Toggle navigation drawer"
          >
            {mobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Offcanvas Drawer */}
      {mobileDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex">
          <div className="bg-white w-72 h-full p-4 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-3">
                <div className="flex items-center gap-2">
                  <Logo className="w-8 h-8" />
                  <span className="font-extrabold text-slate-900">GRANTLY</span>
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation list */}
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const IconC = item.icon;
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentView(item.id);
                        setMobileDrawerOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconC className={`w-4 h-4 ${isActive ? 'text-indigo-700' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-rose-500 text-white font-bold tabular-nums">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 text-rose-600 text-xs font-semibold rounded-xl hover:bg-rose-50 transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
          <div
            className="flex-1"
            onClick={() => setMobileDrawerOpen(false)}
            aria-hidden="true"
          ></div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col justify-between bg-white border-r border-slate-200/90 transition-all duration-300 ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        } min-h-screen sticky top-0 shrink-0 z-20`}
      >
        <div>
          {/* Brand header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-2 h-16">
            {!sidebarCollapsed ? (
              <div
                onClick={() => setCurrentView('dashboard')}
                className="flex items-center gap-2.5 cursor-pointer overflow-hidden group"
              >
                <Logo className="w-9 h-9 transition-transform group-hover:scale-105" />
                <div className="truncate">
                  <span className="font-extrabold text-slate-900 tracking-tight block text-base leading-none">
                    GRANTLY
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium block mt-1">
                    Student Workspace
                  </span>
                </div>
              </div>
            ) : (
              <div
                onClick={() => setCurrentView('dashboard')}
                className="mx-auto cursor-pointer"
              >
                <Logo className="w-9 h-9" />
              </div>
            )}

            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition shrink-0"
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const IconC = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={`w-full flex items-center ${
                    sidebarCollapsed ? 'justify-center px-0' : 'justify-between px-3.5'
                  } py-2.5 rounded-xl text-xs font-semibold transition-colors group ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <IconC
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive
                          ? 'text-indigo-700'
                          : 'text-slate-400 group-hover:text-slate-700'
                      }`}
                    />
                    {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                  </div>
                  {!sidebarCollapsed && item.badge !== undefined && item.badge > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-rose-500 text-white font-bold tabular-nums">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User profile capsule at sidebar bottom */}
        <div className="p-3 border-t border-slate-100">
          {!sidebarCollapsed ? (
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 flex items-center justify-between gap-2 group/user">
              <div
                className="flex items-center gap-2.5 overflow-hidden flex-1 cursor-pointer"
                onClick={() => setCurrentView('profile')}
              >
                <img
                  src={userProfile.avatarUrl}
                  onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackAvatars[0].url; }}
                  alt={userProfile.fullName}
                  referrerPolicy="no-referrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPhotoModalOpen(true);
                  }}
                  title="Click to change profile photo"
                  className="w-8 h-8 rounded-full object-cover shrink-0 border-2 border-slate-200 hover:border-indigo-500 hover:scale-105 transition-all shadow-sm cursor-pointer"
                />
                <div className="truncate flex-1">
                  <p className="text-xs font-bold text-slate-800 truncate leading-tight flex items-center justify-between">
                    <span>{userProfile.fullName}</span>
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPhotoModalOpen(true);
                    }}
                    className="text-[10px] text-indigo-600 hover:text-indigo-800 font-semibold block mt-0.5 hover:underline"
                  >
                    Change photo
                  </button>
                </div>
              </div>
              <button
                onClick={handleLogout}
                title="Log Out"
                className="p-1.5 text-slate-400 hover:text-rose-600 transition shrink-0"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <img
                src={userProfile.avatarUrl}
                  onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackAvatars[0].url; }}
                alt={userProfile.fullName}
                referrerPolicy="no-referrer"
                onClick={() => setIsPhotoModalOpen(true)}
                className="w-8 h-8 rounded-full object-cover border-2 border-slate-200 hover:border-indigo-500 hover:scale-105 transition-all cursor-pointer shadow-sm"
                title="Click to change profile photo"
              />
              <button
                onClick={handleLogout}
                title="Log Out"
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
