import React from 'react';
import { useToasts } from '../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const toasts = useToasts();

  if (toasts.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="Notifications"
      className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm w-full"
    >
      {toasts.map((toast) => {
        let borderAndBg = 'bg-slate-900 text-white border-slate-800';
        let IconComp = Info;

        if (toast.type === 'success') {
          borderAndBg = 'bg-slate-900 text-white border-emerald-500/40';
          IconComp = CheckCircle2;
        } else if (toast.type === 'warning') {
          borderAndBg = 'bg-slate-900 text-white border-amber-500/40';
          IconComp = AlertTriangle;
        } else if (toast.type === 'error') {
          borderAndBg = 'bg-slate-900 text-white border-rose-500/40';
          IconComp = AlertCircle;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl shadow-xl border text-xs sm:text-sm font-medium transition-all ${borderAndBg}`}
          >
            <IconComp
              className={`w-4 h-4 shrink-0 mt-0.5 ${
                toast.type === 'success'
                  ? 'text-emerald-400'
                  : toast.type === 'warning'
                  ? 'text-amber-400'
                  : toast.type === 'error'
                  ? 'text-rose-400'
                  : 'text-indigo-400'
              }`}
            />
            <span className="leading-snug">{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
};
