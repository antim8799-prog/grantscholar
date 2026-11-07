import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StudentProfile } from '../types';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';

export const EligibilityChecker: React.FC = () => {
  const {
    userProfile,
    setUserProfile,
    scholarships,
    checkEligibility,
    setActiveDetailScholarship,
    setApplyTargetScholarship,
    addToast
  } = useApp();

  const [formData, setFormData] = useState<StudentProfile>(userProfile);
  const [hasRunAudit, setHasRunAudit] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile(formData);
    setHasRunAudit(true);
    addToast('Eligibility audit calculated across 12+ scholarship criteria', 'success');
  };

  const auditResults = scholarships
    .map((sch) => {
      const audit = checkEligibility(sch, formData);
      return {
        scholarship: sch,
        ...audit
      };
    })
    .sort((a, b) => b.score - a.score);

  const eligibleCount = auditResults.filter((r) => r.verdict === 'Eligible').length;
  const verificationCount = auditResults.filter((r) => r.verdict === 'Needs Verification').length;
  const notEligibleCount = auditResults.filter((r) => r.verdict === 'Not Eligible').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Smart Eligibility Auditor
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Evaluate your academic credentials, domicile, and socio-economic category against verified scholarship guidelines
        </p>
      </div>

      {/* Input Parameters Form Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Student Profile Parameters
              </h3>
              <p className="text-[11px] text-slate-400">
                Adjust values to simulate your compatibility against all active schemes
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setFormData(userProfile)}
            className="text-xs text-indigo-700 hover:text-indigo-900 font-semibold flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Saved Profile</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Student Full Name
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Domicile State
              </label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
              >
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="All India / National">All India / National</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Enrolled Degree & Branch
              </label>
              <input
                type="text"
                required
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Education Level
              </label>
              <select
                value={formData.educationLevel}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    educationLevel: e.target.value as StudentProfile['educationLevel']
                  })
                }
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
              >
                <option value="Higher Secondary (11th-12th)">Higher Secondary (11th-12th)</option>
                <option value="Diploma / Polytechnic">Diploma / Polytechnic</option>
                <option value="Undergraduate">Undergraduate (B.Tech, MBBS, B.Sc, BA)</option>
                <option value="Postgraduate">Postgraduate (M.Tech, M.Sc, MA, MBA)</option>
                <option value="Doctoral / PhD">Doctoral / PhD</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Current Semester / Year
              </label>
              <input
                type="text"
                required
                value={formData.currentYear}
                onChange={(e) => setFormData({ ...formData, currentYear: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Academic Score / Aggregate (%)
              </label>
              <input
                type="number"
                step="0.1"
                min="35"
                max="100"
                required
                value={formData.academicPercentage}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    academicPercentage: parseFloat(e.target.value) || 0
                  })
                }
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Annual Family Income (₹)
              </label>
              <input
                type="number"
                step="10000"
                min="0"
                required
                value={formData.annualIncome}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    annualIncome: parseInt(e.target.value, 10) || 0
                  })
                }
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Social Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
              >
                <option value="General">General / Open</option>
                <option value="OBC">OBC (Other Backward Class)</option>
                <option value="SC">SC (Scheduled Caste)</option>
                <option value="ST">ST (Scheduled Tribe)</option>
                <option value="EWS">EWS (Economically Weaker Section)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    gender: e.target.value as StudentProfile['gender']
                  })
                }
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-[11px] text-slate-400">
              *All criteria are computed instantly via algorithmic rule engines.
            </span>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-sm transition flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Calculate Eligibility Diagnosis</span>
            </button>
          </div>
        </form>
      </div>

      {/* Demo Compatibility Notice */}
      <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-3 text-xs text-indigo-900 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Demo Compatibility Score:</span> The matching percentages and diagnostics displayed are demo indicators calculated from your profile parameters against published guidelines, not an official grant sanction.
        </div>
      </div>

      {/* Audit Summary Counters */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-white p-4 rounded-2xl border border-emerald-200/80 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
            Fully Eligible
          </span>
          <span className="text-2xl font-extrabold text-emerald-700 tabular-nums">
            {eligibleCount}
          </span>
          <span className="text-[11px] text-slate-500 block mt-0.5">
            Satisfies all criteria
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-amber-200/80 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
            Needs Verification
          </span>
          <span className="text-2xl font-extrabold text-amber-700 tabular-nums">
            {verificationCount}
          </span>
          <span className="text-[11px] text-slate-500 block mt-0.5">
            Requires domicile waiver
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-rose-200/80 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
            Not Eligible
          </span>
          <span className="text-2xl font-extrabold text-rose-700 tabular-nums">
            {notEligibleCount}
          </span>
          <span className="text-[11px] text-slate-500 block mt-0.5">
            Below GPA or above income
          </span>
        </div>
      </div>

      {/* Itemized Scheme Evaluations */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Evaluated Schemes & Detailed "Why Am I Eligible" Audit
        </h3>

        <div className="space-y-3">
          {auditResults.map(({ scholarship, verdict, score, reasons }) => {
            const verdictBadge =
              verdict === 'Eligible'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : verdict === 'Needs Verification'
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-rose-50 text-rose-700 border-rose-200';

            return (
              <div
                key={scholarship.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-5"
              >
                <div className="space-y-2.5 max-w-xl">
                  <div className="flex items-center gap-2 text-xs">
                    <span className={`px-2.5 py-0.5 rounded-full font-semibold border ${verdictBadge}`}>
                      {verdict}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="font-bold text-indigo-700 tabular-nums">
                      {scholarship.amountFormatted}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-500">{scholarship.category}</span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {scholarship.title}
                  </h4>

                  <p className="text-xs text-slate-500">
                    Offered by {scholarship.provider} (Target: {scholarship.educationLevel})
                  </p>

                  {/* Why Am I Eligible Reasons Checklist */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-2 text-xs">
                    {reasons.map((r, i) => (
                      <div key={i} className="flex items-start gap-2">
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

                {/* Score & Actions */}
                <div className="flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Match Score
                    </span>
                    <span
                      className={`text-2xl font-extrabold tabular-nums ${
                        score >= 75
                          ? 'text-emerald-600'
                          : score >= 50
                          ? 'text-amber-600'
                          : 'text-rose-600'
                      }`}
                    >
                      {score}%
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveDetailScholarship(scholarship)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => setApplyTargetScholarship(scholarship)}
                      className="px-3.5 py-1.5 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-semibold rounded-xl transition shadow-sm flex items-center gap-1"
                    >
                      <span>Apply</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
