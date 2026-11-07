import React, { memo, useMemo } from 'react';
import { Scholarship } from '../types';
import { useApp } from '../context/AppContext';
import { Bookmark, Columns2, ArrowRight } from 'lucide-react';

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

export const ScholarshipCard = memo(function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  const {
    savedIds,
    toggleSaveScholarship,
    compareList,
    toggleCompare,
    setActiveDetailScholarship,
    setApplyTargetScholarship,
    checkEligibility
  } = useApp();

  const isSaved = savedIds.includes(scholarship.id);
  const isCompared = compareList.some((s) => s.id === scholarship.id);
  const audit = useMemo(() => checkEligibility(scholarship), [checkEligibility, scholarship]);

  // Verdict text color
  const verdictColor =
    audit.verdict === 'Eligible'
      ? 'text-emerald-700'
      : audit.verdict === 'Needs Verification'
      ? 'text-amber-700'
      : 'text-rose-700';

  return useMemo(() => (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
      <div>
        {/* Top unboxed metadata line & interactive actions */}
        <div className="flex items-center justify-between gap-3 mb-2 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 truncate font-medium">
            <span className="text-indigo-700 font-semibold">{scholarship.category}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{scholarship.educationLevel}</span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => toggleCompare(scholarship)}
              title={isCompared ? 'Remove from comparison' : 'Compare with another scholarship'}
              className={`p-1.5 rounded-lg border text-xs transition ${
                isCompared
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'text-slate-400 hover:text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              aria-label="Toggle scholarship comparison"
            >
              <Columns2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => toggleSaveScholarship(scholarship.id)}
              title={isSaved ? 'Remove from saved' : 'Save scholarship'}
              className={`p-1.5 rounded-lg border text-xs transition ${
                isSaved
                  ? 'text-amber-600 bg-amber-50 border-amber-200'
                  : 'text-slate-400 hover:text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              aria-label="Toggle save scholarship"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-700 transition-colors line-clamp-2 leading-snug">
          {scholarship.title}
        </h3>

        {/* Provider */}
        <p className="text-xs text-slate-500 mt-1 mb-3 truncate">
          {scholarship.provider}
        </p>

        {/* Description */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {scholarship.description}
        </p>

        {/* Unboxed Spec Grid */}
        <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs mb-4">
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">
              Grant Amount
            </span>
            <span className="font-bold text-indigo-700 text-sm tabular-nums">
              {scholarship.amountFormatted}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">
              Deadline
            </span>
            <span className="font-semibold text-slate-800 tabular-nums">
              {scholarship.deadline}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">
              Min. Marks
            </span>
            <span className="font-medium text-slate-700 tabular-nums">
              {scholarship.minPercentage}% required
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">
              Domicile
            </span>
            <span className="font-medium text-slate-700 truncate block">
              {scholarship.state}
            </span>
          </div>
        </div>
      </div>

      <div>
        {/* Compatibility diagnosis line */}
        <div className="flex items-center justify-between text-xs py-2 border-t border-slate-100 mb-3">
          <span className="text-slate-500">Compatibility:</span>
          <div className="flex items-center gap-1.5">
            <span className={`font-semibold ${verdictColor}`}>{audit.verdict}</span>
            <span className="text-slate-400">·</span>
            <span className="font-mono font-bold text-slate-700 tabular-nums">
              {audit.score}%
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveDetailScholarship(scholarship)}
            className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition text-center whitespace-nowrap shrink-0"
          >
            View Details
          </button>
          <button
            onClick={() => setApplyTargetScholarship(scholarship)}
            className="flex-1 py-2 px-3 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-semibold rounded-xl transition text-center shadow-sm whitespace-nowrap shrink-0 flex items-center justify-center gap-1"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  ), [scholarship, isSaved, isCompared, audit, verdictColor, toggleCompare,
    toggleSaveScholarship, setActiveDetailScholarship, setApplyTargetScholarship]);
});
