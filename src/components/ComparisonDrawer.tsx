import React from 'react';
import { useApp } from '../context/AppContext';
import { Columns2, X, ArrowRight, Trash2 } from 'lucide-react';

export const ComparisonDrawer: React.FC = () => {
  const {
    compareList,
    toggleCompare,
    clearCompare,
    setApplyTargetScholarship,
    setActiveDetailScholarship
  } = useApp();

  if (compareList.length === 0) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Columns2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base leading-tight">
                Side-by-Side Scholarship Comparison
              </h3>
              <p className="text-xs text-slate-500">
                Comparing {compareList.length} shortlisted opportunities
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearCompare}
              className="px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition font-medium flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
            <button
              onClick={clearCompare}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition"
              aria-label="Close comparison drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="p-4 sm:p-6 overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[620px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-3 px-3 text-slate-400 font-bold uppercase w-1/4 tracking-wider">
                  Criterion
                </th>
                {compareList.map((sch) => (
                  <th key={sch.id} className="py-3 px-3 font-bold text-slate-900 text-sm align-top">
                    <div className="flex items-start justify-between gap-2">
                      <span className="line-clamp-2 leading-snug">{sch.title}</span>
                      <button
                        onClick={() => toggleCompare(sch)}
                        className="text-slate-400 hover:text-rose-500 transition shrink-0 p-1"
                        title="Remove from comparison"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-500">Grant Value</td>
                {compareList.map((sch) => (
                  <td key={sch.id} className="py-3 px-3 font-bold text-indigo-700 text-sm tabular-nums">
                    {sch.amountFormatted}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-500">Provider</td>
                {compareList.map((sch) => (
                  <td key={sch.id} className="py-3 px-3 font-medium text-slate-800">
                    {sch.provider}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-500">Category</td>
                {compareList.map((sch) => (
                  <td key={sch.id} className="py-3 px-3 font-medium">
                    {sch.category}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-500">Target Level</td>
                {compareList.map((sch) => (
                  <td key={sch.id} className="py-3 px-3">
                    {sch.educationLevel}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-500">Min. Percentage</td>
                {compareList.map((sch) => (
                  <td key={sch.id} className="py-3 px-3 font-mono font-medium tabular-nums">
                    {sch.minPercentage}% required
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-500">Family Income Cap</td>
                {compareList.map((sch) => (
                  <td key={sch.id} className="py-3 px-3 tabular-nums">
                    ₹{(sch.maxIncome / 100000).toFixed(1)} LPA
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-500">Domicile State</td>
                {compareList.map((sch) => (
                  <td key={sch.id} className="py-3 px-3">
                    {sch.state}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-500">Application Deadline</td>
                {compareList.map((sch) => (
                  <td key={sch.id} className="py-3 px-3 font-semibold text-slate-900 tabular-nums">
                    {sch.deadline}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-500">Required Documents</td>
                {compareList.map((sch) => (
                  <td key={sch.id} className="py-3 px-3">
                    {sch.fullDetails.documents.length} verified proofs needed
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-500">Actions</td>
                {compareList.map((sch) => (
                  <td key={sch.id} className="py-3 px-3">
                    <div className="flex flex-col gap-1.5">
                      <button
                        onClick={() => {
                          clearCompare();
                          setApplyTargetScholarship(sch);
                        }}
                        className="py-1.5 px-3 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg text-xs font-semibold transition text-center shadow-sm flex items-center justify-center gap-1"
                      >
                        <span>Apply</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => {
                          clearCompare();
                          setActiveDetailScholarship(sch);
                        }}
                        className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition text-center"
                      >
                        View Full Specs
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
