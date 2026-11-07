import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Award,
  CheckCircle2,
  AlertCircle,
  FileText,
  Calendar,
  Building,
  Bookmark,
  ArrowRight
} from 'lucide-react';

export const ScholarshipDetailsModal: React.FC = () => {
  const {
    activeDetailScholarship,
    setActiveDetailScholarship,
    setApplyTargetScholarship,
    checkEligibility,
    savedIds,
    toggleSaveScholarship
  } = useApp();

  if (!activeDetailScholarship) return null;

  const scholarship = activeDetailScholarship;
  const audit = checkEligibility(scholarship);
  const isSaved = savedIds.includes(scholarship.id);

  const verdictColor =
    audit.verdict === 'Eligible'
      ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
      : audit.verdict === 'Needs Verification'
      ? 'text-amber-700 bg-amber-50 border-amber-200'
      : 'text-rose-700 bg-rose-50 border-rose-200';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col relative border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs">
              <span className="font-semibold text-indigo-700">{scholarship.category}</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500">{scholarship.educationLevel}</span>
              <span className="text-slate-300">·</span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${verdictColor}`}>
                {audit.verdict}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {scholarship.title}
            </h2>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span>{scholarship.provider}</span>
              <span className="text-slate-300">·</span>
              <span>Domicile: {scholarship.state}</span>
            </p>
          </div>

          <button
            onClick={() => setActiveDetailScholarship(null)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition shrink-0"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto text-sm text-slate-700">
          {/* Key Metrics Banner */}
          <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
            <div>
              <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Grant Amount
              </span>
              <span className="text-base font-extrabold text-indigo-700 tabular-nums">
                {scholarship.amountFormatted}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Deadline
              </span>
              <span className="text-base font-bold text-slate-900 tabular-nums">
                {scholarship.deadline}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Match Score
              </span>
              <span className="text-base font-bold text-emerald-600 tabular-nums">
                {audit.score}%
              </span>
            </div>
          </div>

          {/* Scope and Benefits */}
          <div>
            <h4 className="font-bold text-slate-900 mb-1.5 flex items-center gap-2 text-xs sm:text-sm">
              <Award className="w-4 h-4 text-indigo-600" />
              <span>Financial Benefits & Scope</span>
            </h4>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
              {scholarship.fullDetails.benefits}
            </p>
          </div>

          {/* Why Am I Eligible Section */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-2 text-xs sm:text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Why Am I Eligible? (Transparent Audit Checklist)</span>
            </h4>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-2.5">
              {audit.reasons.map((r, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  {r.pass ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  )}
                  <span className={r.pass ? 'text-slate-700' : 'text-rose-700 font-medium'}>
                    {r.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents */}
          <div>
            <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2 text-xs sm:text-sm">
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>Required Verification Documents</span>
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {scholarship.fullDetails.documents.map((doc, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0"></span>
                  <span className="text-slate-700 font-medium truncate">{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Application Procedure */}
          <div>
            <h4 className="font-bold text-slate-900 mb-1.5 flex items-center gap-2 text-xs sm:text-sm">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <span>Application Workflow Procedure</span>
            </h4>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
              {scholarship.fullDetails.process}
            </p>
          </div>

          {/* Demo disclaimer */}
          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Hackathon Demo Platform:</span> Applications are safely simulated and maintained in client storage. No submission data is routed to external ministerial networks.
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70 rounded-b-2xl flex items-center justify-between gap-3">
          <button
            onClick={() => toggleSaveScholarship(scholarship.id)}
            className="px-3.5 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
            <span>{isSaved ? 'Saved' : 'Save for Later'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveDetailScholarship(null)}
              className="px-3.5 py-2 text-slate-600 hover:text-slate-800 text-xs font-semibold whitespace-nowrap shrink-0"
            >
              Close
            </button>
            <button
              onClick={() => {
                const target = scholarship;
                setActiveDetailScholarship(null);
                setApplyTargetScholarship(target);
              }}
              className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-semibold rounded-xl shadow-sm transition flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <span>Begin Application</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
