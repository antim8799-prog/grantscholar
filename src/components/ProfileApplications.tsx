import { useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, Clock, FileText, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';

const filters = ['All', 'Submitted (demo)', 'Under Review', 'Approved (demo)', 'Rejected (demo)', 'Draft'] as const;
const statusStyle = (status: string) => status.startsWith('Approved') ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : status.startsWith('Rejected') ? 'bg-rose-50 text-rose-700 border-rose-200' : status === 'Under Review' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-indigo-50 text-indigo-700 border-indigo-200';

export function ProfileApplications() {
  const { applications, setCurrentView } = useApp();
  const [filter, setFilter] = useState<string>('All');
  const [query, setQuery] = useState('');
  const filtered = applications.filter(app => (filter === 'All' || app.status === filter) && `${app.title} ${app.id}`.toLowerCase().includes(query.trim().toLowerCase())).sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));
  const inProgress = applications.filter(app => app.status === 'Under Review' || app.status === 'Submitted (demo)').length;
  const approved = applications.filter(app => app.status === 'Approved (demo)').length;

  return <section aria-labelledby="profile-applications" className="space-y-5">
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div><p className="text-[10px] font-bold tracking-widest uppercase text-indigo-600 mb-1">Your scholarship journey</p><h2 id="profile-applications" className="text-xl font-extrabold text-slate-900">Application dashboard</h2><p className="text-xs text-slate-500 mt-1">Follow every application, from submission to decision.</p></div>
      <button onClick={() => setCurrentView('applications')} className="text-xs font-bold text-indigo-700 flex items-center gap-1.5 py-2">Manage applications <ArrowRight className="h-4 w-4" /></button>
    </div>
    <div className="rounded-2xl bg-white border border-slate-200 grid grid-cols-2 sm:grid-cols-4 overflow-hidden">
      {[{ label: 'Total applications', value: applications.length }, { label: 'In progress', value: inProgress }, { label: 'Approved (demo)', value: approved }, { label: 'Drafts', value: applications.filter(a => a.status === 'Draft').length }].map(stat => <div key={stat.label} className="p-5 border-b sm:border-b-0 border-r border-slate-100"><p className="text-2xl font-extrabold text-slate-900 tabular-nums">{stat.value}</p><p className="mt-1 text-xs text-slate-500">{stat.label}</p></div>)}
    </div>
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-4">
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center justify-between">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter applications by status">{filters.map(status => <button key={status} aria-pressed={filter === status} onClick={() => setFilter(status)} className={`px-3 py-2 rounded-lg text-[11px] font-semibold transition-colors ${filter === status ? 'bg-indigo-700 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>{status}</button>)}</div>
        <label className="relative block lg:w-56 shrink-0"><span className="sr-only">Search applications</span><Search className="absolute top-2.5 left-3 h-4 w-4 text-slate-400" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search title or ID" className="w-full border border-slate-200 bg-white rounded-xl py-2 pl-9 pr-3 text-xs" /></label>
      </div>
      <p className="text-[11px] text-slate-500">Demo tracking · Sample statuses are for illustration and do not reflect live provider decisions.</p>
      <div aria-live="polite" className="space-y-3">
        {filtered.map(app => <details key={app.id} className="group rounded-xl border border-slate-200 overflow-hidden">
          <summary className="list-none cursor-pointer p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors [&::-webkit-details-marker]:hidden">
            <span className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center bg-indigo-50 rounded-xl text-indigo-600"><FileText className="w-5 h-5" /></span>
            <div className="min-w-0 flex-1"><div className="flex flex-wrap gap-2 items-center"><span className="font-mono text-[10px] text-slate-500">{app.id}</span><span className={`text-[10px] font-bold rounded-full px-2 py-1 border ${statusStyle(app.status)}`}>{app.status}</span></div><h3 className="font-bold text-sm text-slate-900 mt-2 leading-relaxed">{app.title}</h3><p className="text-[11px] text-slate-500 mt-1">Updated {app.lastUpdated} <span aria-hidden="true">·</span> <span className="font-semibold text-indigo-700">{app.amount}</span></p><span className="text-[11px] text-indigo-600 mt-2 inline-block">View application timeline</span></div>
            <ChevronDown className="w-4 h-4 shrink-0 mt-2 text-slate-400 group-open:rotate-180 transition-transform" />
          </summary>
          <div className="border-t border-slate-100 bg-slate-50 p-4 sm:pl-16"><p className="text-xs text-slate-500 mb-4">Applied {app.appliedDate}</p><ol className="grid sm:grid-cols-2 gap-4">{app.timeline.map((step, index) => <li key={`${step.label}-${index}`} className="flex gap-2 items-start">{step.completed ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <Clock className="w-4 h-4 text-slate-400 shrink-0" />}<div><p className="text-xs font-semibold text-slate-700">{step.label}</p><p className="text-[11px] text-slate-500 mt-1">{step.completed ? 'Completed' : 'Pending'} · {step.date}</p></div></li>)}</ol>{app.notes && <p className="mt-4 text-xs text-slate-600 leading-relaxed">{app.notes}</p>}</div>
        </details>)}
        {!filtered.length && <div className="text-center py-8"><FileText className="w-9 h-9 text-slate-400 mx-auto mb-3" /><h3 className="text-sm font-bold text-slate-900">{applications.length ? 'No matching applications' : 'Your journey starts here'}</h3><p className="text-xs text-slate-500 mt-2">{applications.length ? 'Try another status or search term.' : 'Explore scholarships and submit a demo application to track it here.'}</p><button onClick={() => { if (applications.length) { setFilter('All'); setQuery(''); } else setCurrentView('explorer'); }} className="mt-4 text-xs font-bold text-indigo-700">{applications.length ? 'Clear filters' : 'Explore scholarships'}</button></div>}
      </div>
    </div>
  </section>;
}
