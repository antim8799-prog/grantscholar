import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Eye, EyeOff, AlertCircle, ArrowRight, Info } from 'lucide-react';
import { Logo } from './Logo';

export const AuthModal: React.FC = () => {
  const { authModal, setAuthModal, setIsAuthenticated, setCurrentView, addToast, userProfile, setUserProfile } = useApp();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: 'aarav.sharma@university.edu',
    password: 'password123',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (authModal) {
      setIsLogin(authModal === 'login');
      setErrorMessage('');
    }
  }, [authModal]);

  if (!authModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.email.trim() || !formData.password.trim()) {
      setErrorMessage('Please provide both email and password.');
      return;
    }

    if (!isLogin) {
      if (!formData.fullName.trim()) {
        setErrorMessage('Please enter your full name.');
        return;
      }
      if (formData.password.length < 6) {
        setErrorMessage('Password must be at least 6 characters long.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }
      // Update profile with registered name and email
      setUserProfile({
        ...userProfile,
        fullName: formData.fullName,
        email: formData.email
      });
    }

    setIsAuthenticated(true);
    setAuthModal(null);
    setCurrentView('dashboard');
    addToast(
      isLogin ? `Welcome back, ${userProfile.fullName}!` : 'Account initialized! Welcome to GRANTLY.',
      'success'
    );
  };

  const handleForgotPassword = () => {
    addToast('Demo Notice: Password recovery link simulated for ' + formData.email, 'info');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={() => setAuthModal(null)}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition"
          aria-label="Close authentication modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Lockup */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 text-indigo-700 font-extrabold text-2xl tracking-tight mb-1">
            <Logo className="w-9 h-9" />
            <span>GRANTLY</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {isLogin
              ? 'Access your student dashboard and application desk'
              : 'Create an account to streamline discovery and apply in minutes'}
          </p>
        </div>

        {/* Demo Mode Notice */}
        <div className="mb-4 bg-indigo-50/70 border border-indigo-100 text-indigo-900 text-xs p-3 rounded-xl flex items-start gap-2.5">
          <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold">Hackathon Demo Mode:</span> Authentication is simulated on the client. Prepopulated sample credentials or any email can be used.
          </div>
        </div>

        {errorMessage && (
          <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Aarav Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="student@university.edu"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          {isLogin && (
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-indigo-700 hover:underline font-medium"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 mt-2 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded-xl text-xs sm:text-sm transition shadow-sm flex items-center justify-center gap-1.5"
          >
            <span>{isLogin ? 'Sign In to Workspace' : 'Create Demo Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-slate-500">
          {isLogin ? (
            <>
              Don't have an account yet?{' '}
              <button
                onClick={() => {
                  setIsLogin(false);
                  setErrorMessage('');
                }}
                className="text-indigo-700 font-semibold hover:underline"
              >
                Register as student
              </button>
            </>
          ) : (
            <>
              Already registered?{' '}
              <button
                onClick={() => {
                  setIsLogin(true);
                  setErrorMessage('');
                }}
                className="text-indigo-700 font-semibold hover:underline"
              >
                Log in to account
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
