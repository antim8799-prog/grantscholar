import React from 'react';
import { useApp } from '../context/AppContext';
import { ScholarshipCard } from '../components/ScholarshipCard';
import { Bookmark, ArrowRight } from 'lucide-react';

export const SavedScholarships: React.FC = () => {
  const { scholarships, savedIds, setCurrentView } = useApp();

  const savedList = scholarships.filter((s) => savedIds.includes(s.id));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Saved Scholarships
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Your shortlisted opportunities saved for priority submission and side-by-side comparison
          </p>
        </div>
        <div className="text-xs font-semibold text-slate-500">
          <strong className="text-indigo-700">{savedList.length}</strong> grants shortlisted
        </div>
      </div>

      {savedList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedList.map((scholarship) => (
            <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
          <Bookmark className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-900 text-base">
            No Saved Scholarships
          </h3>
          <p className="text-xs text-slate-500">
            Click the bookmark icon on any scholarship card to save it here for fast access.
          </p>
          <button
            onClick={() => setCurrentView('explorer')}
            className="px-4 py-2 bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5 mx-auto"
          >
            <span>Browse Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
