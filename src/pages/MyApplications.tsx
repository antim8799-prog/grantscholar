import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ApplicationStatus } from '../types';
import {
  FileText,
  Search,
  CheckCircle2,
  Clock,
  Trash2,
  Info,
  Calendar,
  Building,
  ArrowRight
} from 'lucide-react';

export const MyApplications: React.FC = () => {
  const { applications, withdrawApplication, setCurrentView } = useApp();
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const statuses: ('All' | ApplicationStatus)[] = [
    'All',
    'Under Review',
    'Submitted (demo)',
    'Approved (demo)',
    'Draft'
  ];

  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      const matchesStatus =
        statusFilter === 'All' || app.status === statusFilter;
      const matchesQuery =
        app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesQuery;
    });
  }, [applications, statusFilter, searchQuery]);

  const handleWithdraw = (id: string, title: string) => {
    if (confirm(`Withdraw your application record for "${title}"?`)) {
      withdrawApplication(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            My Scholarship Applications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Monitor scrutiny milestones, validation progress, and sanction notices in your tracking desk
          </p>
        </div>
        <button
          onClick={() => setCurrentView('explorer')}
          className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>Find More Grants</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Local storage note */}
      <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3 text-xs text-indigo-900 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Local Tracking Repository:</span> Applications are persisted in your browser's local sandbox to demonstrate end-to-end workflow states without real ministerial submissions.
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Status Pills Tabs (Functional filter buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-1 bg-slate-100 rounded-xl">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                statusFilter === st
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID or title..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Applications Records */}
      {filteredApps.length > 0 ? (
        <div className="space-y-4">
          {filteredApps.map((app) => {
            const statusBadge =
              app.status === 'Approved (demo)'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : app.status === 'Under Review'
                ? 'bg-purple-50 text-purple-700 border-purple-200'
                : app.status === 'Submitted (demo)'
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-slate-100 text-slate-700 border-slate-200';

            return (
              <div
                key={app.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className={`px-2.5 py-0.5 rounded-full font-semibold border ${statusBadge}`}>
                        {app.status}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="font-mono text-slate-500 font-medium">
                        {app.id}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {app.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                      <span className="font-bold text-indigo-700 text-sm tabular-nums">
                        {app.amount}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span>Applied: {app.appliedDate}</span>
                      <span className="text-slate-300">·</span>
                      <span>Last Updated: {app.lastUpdated}</span>
                    </div>

                    {app.notes && (
                      <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mt-2">
                        <strong className="text-slate-700">Applicant Note:</strong> {app.notes}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleWithdraw(app.id, app.title)}
                    className="px-3 py-1.5 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold transition self-start flex items-center gap-1.5 shrink-0"
                    title="Withdraw application from local tracking"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Withdraw</span>
                  </button>
                </div>

                {/* Verification Pipeline Tracker */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                    Verification Milestones
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {app.timeline.map((step, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          {step.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                          )}
                          <span
                            className={`text-xs font-bold truncate ${
                              step.completed ? 'text-slate-900' : 'text-slate-500'
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 block pl-5 tabular-nums">
                          {step.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
          <FileText className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-900 text-base">
            No Application Records Found
          </h3>
          <p className="text-xs text-slate-500">
            No applications match the selected filter. Apply to a scholarship to populate your tracking desk.
          </p>
          <button
            onClick={() => setCurrentView('explorer')}
            className="px-4 py-2 bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-sm transition"
          >
            Explore Scholarships
          </button>
        </div>
      )}
    </div>
  );
};
