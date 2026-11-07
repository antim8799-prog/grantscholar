import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  CheckCheck,
  Trash2,
  Clock
} from 'lucide-react';

export const Notifications: React.FC = () => {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearNotifications
  } = useApp();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Notification Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time deadline reminders, status updates from scholarship boards, and criteria matches
          </p>
        </div>

        {notifications.length > 0 && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsAsRead}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition flex items-center gap-1.5"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark All Read</span>
              </button>
            )}
            <button
              onClick={clearNotifications}
              className="px-3 py-1.5 text-rose-600 hover:bg-rose-50 border border-rose-200 text-xs font-semibold rounded-xl transition flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Feed</span>
            </button>
          </div>
        )}
      </div>

      {notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((item) => {
            let IconC = Info;
            let iconBg = 'bg-indigo-50 text-indigo-700';
            let borderStyle = 'border-slate-200';

            if (item.type === 'urgent') {
              IconC = AlertTriangle;
              iconBg = 'bg-rose-50 text-rose-700';
              borderStyle = item.read ? 'border-slate-200' : 'border-rose-200 bg-rose-50/20';
            } else if (item.type === 'success') {
              IconC = CheckCircle2;
              iconBg = 'bg-emerald-50 text-emerald-700';
              borderStyle = item.read ? 'border-slate-200' : 'border-emerald-200 bg-emerald-50/20';
            } else {
              borderStyle = item.read ? 'border-slate-200' : 'border-indigo-200 bg-indigo-50/20';
            }

            return (
              <div
                key={item.id}
                onClick={() => markNotificationAsRead(item.id)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${borderStyle} ${
                  item.read ? 'bg-white' : 'shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${iconBg}`}>
                    <IconC className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {item.title}
                      </h4>
                      {!item.read && (
                        <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                      {item.message}
                    </p>
                    <span className="text-[10px] text-slate-400 font-medium block pt-1">
                      {item.time}
                    </span>
                  </div>
                </div>

                {!item.read && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markNotificationAsRead(item.id);
                    }}
                    className="text-xs text-indigo-700 hover:underline font-semibold shrink-0 whitespace-nowrap"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
          <Bell className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-900 text-base">
            All Caught Up!
          </h3>
          <p className="text-xs text-slate-500">
            You have no pending deadline notices or application updates.
          </p>
        </div>
      )}
    </div>
  );
};
