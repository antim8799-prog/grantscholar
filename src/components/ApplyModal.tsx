import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Send, ShieldAlert, Check } from 'lucide-react';

export const ApplyModal: React.FC = () => {
  const {
    applyTargetScholarship,
    setApplyTargetScholarship,
    submitApplication,
    userProfile
  } = useApp();

  const [statement, setStatement] = useState('');
  const [agreed, setAgreed] = useState(false);

  if (!applyTargetScholarship) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    submitApplication(applyTargetScholarship, statement);
    setStatement('');
    setAgreed(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={() => setApplyTargetScholarship(null)}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4 pr-6">
          <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block">
            FastTrack Application
          </span>
          <h3 className="text-lg font-bold text-slate-900 leading-snug mt-1">
            {applyTargetScholarship.title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Snapshot data pulled from your verified student profile
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile snapshot card */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Applicant:</span>
              <span className="font-semibold text-slate-800">{userProfile.fullName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Course & Year:</span>
              <span className="font-medium text-slate-800">
                {userProfile.course} ({userProfile.currentYear})
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">State Domicile:</span>
              <span className="font-medium text-slate-800">{userProfile.state}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Academic Score:</span>
              <span className="font-mono font-bold text-slate-800 tabular-nums">
                {userProfile.academicPercentage}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Annual Family Income:</span>
              <span className="font-semibold text-slate-800 tabular-nums">
                ₹{(userProfile.annualIncome / 100000).toFixed(1)} LPA
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-200">
              <span className="font-semibold text-slate-600">Expected Grant:</span>
              <span className="font-bold text-indigo-700 text-sm tabular-nums">
                {applyTargetScholarship.amountFormatted}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Personal Statement or Special Circumstances (Optional)
            </label>
            <textarea
              rows={3}
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              placeholder="Detail your academic milestones, research interests, or specific financial justifications..."
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-slate-400"
            />
          </div>

          {/* Declaration Checkbox */}
          <div className="flex items-start gap-2.5 pt-1">
            <input
              type="checkbox"
              id="declaration-checkbox"
              required
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
            <label
              htmlFor="declaration-checkbox"
              className="text-xs text-slate-600 cursor-pointer select-none leading-relaxed"
            >
              I certify that all details reflected above are true and verifiable by official institutional records.
            </label>
          </div>

          {/* Submission Notice */}
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0" />
            <span>This demonstration safely simulates the application life-cycle in browser storage.</span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setApplyTargetScholarship(null)}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!agreed}
              className="px-5 py-2 bg-indigo-700 hover:bg-indigo-800 disabled:opacity-50 text-white text-xs font-semibold rounded-xl shadow-sm transition flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Demo Application</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
