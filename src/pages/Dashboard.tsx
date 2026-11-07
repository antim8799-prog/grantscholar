import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ScholarshipCard } from '../components/ScholarshipCard';
import {
  Award,
  ShieldCheck,
  FileText,
  Clock,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  AlertTriangle,
  FolderOpen,
  Sliders,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const {
    userProfile,
    scholarships,
    applications,
    savedIds,
    notifications,
    setCurrentView,
    setActiveDetailScholarship,
    checkEligibility
  } = useApp();

  // Compute eligible scholarships
  const eligibleScholarships = useMemo(() => {
    return scholarships.filter((s) => {
      const res = checkEligibility(s);
      return res.verdict === 'Eligible' || res.verdict === 'Needs Verification';
    });
  }, [scholarships, userProfile]);

  // Compute upcoming deadlines
  const upcomingDeadlines = useMemo(() => {
    return [...scholarships]
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
      .slice(0, 4);
  }, [scholarships]);

  // Saved scholarships preview
  const savedScholarships = useMemo(() => {
    return scholarships.filter((s) => savedIds.includes(s.id));
  }, [scholarships, savedIds]);

  // Profile completeness percentage
  const profileCompleteness = useMemo(() => {
    const checks = [
      Boolean(userProfile.fullName),
      Boolean(userProfile.email),
      Boolean(userProfile.phone),
      Boolean(userProfile.state),
      Boolean(userProfile.course),
      userProfile.academicPercentage > 0,
      userProfile.annualIncome > 0,
      Boolean(userProfile.institutionType)
    ];
    const passed = checks.filter(Boolean).length;
    return Math.round((passed / checks.length) * 100);
  }, [userProfile]);

  return (
    <div className="space-y-6">
      {/* Personalized Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-800 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-indigo-100 border border-white/15">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Academic Cycle 2026–2027 Active</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {userProfile.fullName}!
          </h1>

          <p className="text-indigo-100 text-xs sm:text-sm leading-relaxed">
            Your verified student profile matches{' '}
            <strong className="text-white underline decoration-indigo-400">
              {eligibleScholarships.length} educational grants
            </strong>{' '}
            based on your {userProfile.academicPercentage}% academic cutoff in{' '}
            {userProfile.course}.
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5">
            <button
              onClick={() => setCurrentView('explorer')}
              className="px-4 py-2 bg-white text-indigo-900 hover:bg-slate-100 font-semibold text-xs rounded-xl shadow-sm transition"
            >
              Explore Matches
            </button>
            <button
              onClick={() => setCurrentView('checker')}
              className="px-4 py-2 bg-indigo-700/60 hover:bg-indigo-700 text-white border border-white/20 font-semibold text-xs rounded-xl transition"
            >
              Audit Eligibility
            </button>
          </div>
        </div>
      </div>

      {/* 4 Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Total Opportunities
            </p>
            <p className="text-2xl font-extrabold text-slate-900 tabular-nums">
              {scholarships.length}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Eligible Grants
            </p>
            <p className="text-2xl font-extrabold text-emerald-700 tabular-nums">
              {eligibleScholarships.length}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Applications Tracked
            </p>
            <p className="text-2xl font-extrabold text-indigo-700 tabular-nums">
              {applications.length}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Upcoming Deadlines
            </p>
            <p className="text-2xl font-extrabold text-amber-700 tabular-nums">
              {upcomingDeadlines.length}
            </p>
          </div>
        </div>
      </div>

      {/* Profile Completion Indicator */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0 tabular-nums">
            {profileCompleteness}%
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">
              Student Profile Readiness
            </h4>
            <p className="text-[11px] text-slate-500">
              Accurate income and GPA data maximizes automatic match accuracy.
            </p>
          </div>
        </div>

        <div className="w-full sm:w-64 bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${profileCompleteness}%` }}
          />
        </div>

        <button
          onClick={() => setCurrentView('profile')}
          className="text-xs font-bold text-indigo-700 hover:text-indigo-900 shrink-0 whitespace-nowrap"
        >
          Update Profile Details →
        </button>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Recommended Scholarships */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Recommended Scholarships
              </h3>
              <p className="text-xs text-slate-500">
                Top matches for {userProfile.course} ({userProfile.state} Domicile)
              </p>
            </div>
            <button
              onClick={() => setCurrentView('explorer')}
              className="text-xs font-semibold text-indigo-700 hover:underline flex items-center gap-1"
            >
              <span>Explore All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {eligibleScholarships.slice(0, 4).map((sch) => (
              <ScholarshipCard key={sch.id} scholarship={sch} />
            ))}
          </div>

          {/* Application Status Snapshot */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Recent Application Statuses
                </h4>
                <p className="text-xs text-slate-500">
                  Real-time pipeline tracking of submitted demo applications
                </p>
              </div>
              <button
                onClick={() => setCurrentView('applications')}
                className="text-xs font-semibold text-indigo-700 hover:underline"
              >
                View Tracking Desk
              </button>
            </div>

            {applications.length > 0 ? (
              <div className="space-y-3">
                {applications.slice(0, 3).map((app) => (
                  <div
                    key={app.id}
                    className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <h5 className="font-bold text-slate-900">{app.title}</h5>
                      <span className="text-[11px] text-slate-500">
                        Submitted {app.appliedDate} · Grant: {app.amount}
                      </span>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                        app.status === 'Approved (demo)'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : app.status === 'Under Review'
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-3 text-center">
                No active applications yet. Browse the explorer to start applying!
              </p>
            )}
          </div>
        </div>

        {/* Right Column (4 cols): Deadline Radar & Quick Notifications */}
        <div className="lg:col-span-4 space-y-6">
          {/* Deadline Timeline Radar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Upcoming Deadlines
                </h3>
                <p className="text-xs text-slate-500">Approaching grant cutoffs</p>
              </div>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>

            <div className="space-y-3">
              {upcomingDeadlines.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveDetailScholarship(item)}
                  className="p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-slate-50/70 transition cursor-pointer flex items-start justify-between gap-2"
                >
                  <div className="space-y-0.5">
                    <h5 className="text-xs font-bold text-slate-900 line-clamp-1">
                      {item.title}
                    </h5>
                    <p className="text-[11px] font-semibold text-indigo-700 tabular-nums">
                      {item.amountFormatted}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-medium text-slate-400 block uppercase">
                      Due Date
                    </span>
                    <span className="text-xs font-bold text-slate-800 tabular-nums">
                      {item.deadline}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setCurrentView('explorer')}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 text-center transition"
            >
              Browse Full Catalog
            </button>
          </div>

          {/* Shortlisted Scholarships Snapshot */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Bookmark className="w-4 h-4 text-amber-500" />
                <span>Shortlist ({savedScholarships.length})</span>
              </h4>
              <button
                onClick={() => setCurrentView('saved')}
                className="text-xs font-semibold text-indigo-700 hover:underline"
              >
                View All
              </button>
            </div>

            {savedScholarships.length > 0 ? (
              <div className="space-y-2">
                {savedScholarships.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveDetailScholarship(item)}
                    className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 text-xs cursor-pointer flex items-center justify-between"
                  >
                    <span className="font-semibold text-slate-800 truncate max-w-[160px]">
                      {item.title}
                    </span>
                    <span className="text-[11px] font-bold text-indigo-700 tabular-nums">
                      {item.amountFormatted}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 text-center py-2">
                No saved scholarships.
              </p>
            )}
          </div>

          {/* Quick Tools Navigation */}
          <div className="bg-indigo-50/70 p-4 rounded-2xl border border-indigo-100 space-y-2">
            <h4 className="text-xs font-bold text-indigo-900">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setCurrentView('checker')}
                className="p-2 bg-white rounded-xl border border-indigo-100 hover:border-indigo-300 font-semibold text-slate-700 text-left transition flex items-center gap-2"
              >
                <Sliders className="w-3.5 h-3.5 text-indigo-600" />
                <span>Check Eligibility</span>
              </button>
              <button
                onClick={() => setCurrentView('documents')}
                className="p-2 bg-white rounded-xl border border-indigo-100 hover:border-indigo-300 font-semibold text-slate-700 text-left transition flex items-center gap-2"
              >
                <FolderOpen className="w-3.5 h-3.5 text-indigo-600" />
                <span>Document Vault</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
