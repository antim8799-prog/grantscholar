import { ThemeControl } from './ThemeControl';
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const { setCurrentView, setAuthModal, isAuthenticated } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 lg:gap-6">
        {/* Zone 1: Brand wordmark */}
        <div
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0 group"
        >
          <Logo className="w-9 h-9 transition-transform group-hover:scale-105" />
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            GRANTLY
          </span>
        </div>

        {/* Zone 2: 4-5 single-line clean navigation links */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8 text-sm font-medium text-slate-600">
          <button
            onClick={() => setCurrentView('explorer')}
            className="hover:text-indigo-700 transition-colors whitespace-nowrap shrink-0"
          >
            Explore Scholarships
          </button>
          <button
            onClick={() => setCurrentView('checker')}
            className="hover:text-indigo-700 transition-colors whitespace-nowrap shrink-0"
          >
            Check Eligibility
          </button>
          <a
            href="#how-it-works"
            className="hover:text-indigo-700 transition-colors whitespace-nowrap shrink-0"
          >
            How It Works
          </a>
          <a
            href="#faq"
            className="hover:text-indigo-700 transition-colors whitespace-nowrap shrink-0"
          >
            FAQ
          </a>
        </nav>

        <ThemeControl />

        {/* Zone 3: 1 primary action */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {isAuthenticated ? (
            <button
              onClick={() => setCurrentView('dashboard')}
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-700 hover:bg-indigo-800 rounded-xl transition shadow-sm whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAuthModal('login')}
                className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-700 transition whitespace-nowrap shrink-0"
              >
                Log In
              </button>
              <button
                onClick={() => setAuthModal('register')}
                className="px-4 py-2 text-sm font-semibold text-white bg-indigo-700 hover:bg-indigo-800 rounded-xl transition shadow-sm whitespace-nowrap shrink-0"
              >
                Get Started
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          <button
            onClick={() => {
              setCurrentView('explorer');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-indigo-700"
          >
            Explore Scholarships
          </button>
          <button
            onClick={() => {
              setCurrentView('checker');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-indigo-700"
          >
            Check Eligibility
          </button>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-indigo-700"
          >
            How It Works
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-indigo-700"
          >
            FAQ
          </a>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  setCurrentView('dashboard');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 text-center text-sm font-semibold text-white bg-indigo-700 rounded-xl"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setAuthModal('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-center text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setAuthModal('register');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-center text-sm font-semibold text-white bg-indigo-700 rounded-xl"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
