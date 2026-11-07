import { ThemeControl } from '../components/ThemeControl';
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Settings as SettingsIcon, Bell, Database, RotateCcw, ShieldCheck, Check } from 'lucide-react';

export const Settings: React.FC = () => {
  const { resetDemoData, addToast } = useApp();
  const [deadlineAlerts, setDeadlineAlerts] = useState(true);
  const [matchAlerts, setMatchAlerts] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Notification preferences updated!', 'success');
  };

  const handleResetData = () => {
    if (
      confirm(
        'Reset all demo application records, documents, and notifications to default factory values?'
      )
    ) {
      resetDemoData();
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Platform Preferences & Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Configure notification dispatch rules, deadline radar thresholds, and demo storage state
        </p>
      </div>

      <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div><h2 className="text-sm font-bold text-slate-900">Appearance</h2><p className="text-xs text-slate-500 mt-1">Choose light, dark, or follow your device for this visit.</p></div>
        <ThemeControl />
      </section>
      {/* Notifications Configuration */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Bell className="w-4 h-4 text-indigo-600" />
          <span>Notification & Deadline Alert Rules</span>
        </h3>

        <form onSubmit={handleSavePreferences} className="space-y-3.5 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50">
            <div>
              <h4 className="font-semibold text-slate-900">
                Deadline Countdown Reminders
              </h4>
              <p className="text-slate-500 text-[11px]">
                Deliver urgent alerts when a saved scholarship is within 30 days of closing.
              </p>
            </div>
            <input
              type="checkbox"
              checked={deadlineAlerts}
              onChange={(e) => setDeadlineAlerts(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50">
            <div>
              <h4 className="font-semibold text-slate-900">
                High Compatibility Match Alerts
              </h4>
              <p className="text-slate-500 text-[11px]">
                Notify me when a scholarship matching &gt;80% of my profile criteria is available.
              </p>
            </div>
            <input
              type="checkbox"
              checked={matchAlerts}
              onChange={(e) => setMatchAlerts(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50">
            <div>
              <h4 className="font-semibold text-slate-900">
                Weekly Digest & Opportunity Radar
              </h4>
              <p className="text-slate-500 text-[11px]">
                Simulate weekly summary emails of new government and trust circulars.
              </p>
            </div>
            <input
              type="checkbox"
              checked={emailDigest}
              onChange={(e) => setEmailDigest(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded-xl text-xs transition"
            >
              Save Notification Rules
            </button>
          </div>
        </form>
      </div>

      {/* Demo Sandbox Management */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Database className="w-4 h-4 text-indigo-600" />
          <span>Demo Data & LocalStorage Management</span>
        </h3>

        <div className="p-4 rounded-xl border border-rose-100 bg-rose-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-rose-900">
              Reset Local Demonstration Database
            </h4>
            <p className="text-[11px] text-rose-700 leading-relaxed">
              Resets all submitted applications, uploaded document records, and notifications back to initial demo seeds.
            </p>
          </div>
          <button
            onClick={handleResetData}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl shadow-sm transition flex items-center gap-1.5 shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo State</span>
          </button>
        </div>
      </div>
    </div>
  );
};
