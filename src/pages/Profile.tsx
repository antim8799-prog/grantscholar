import { avatarPresets as fallbackAvatars } from '../data/avatars';
import { ProfileApplications } from '../components/ProfileApplications';
import { ThemeControl } from '../components/ThemeControl';
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { StudentProfile } from '../types';
import { User, Save, RotateCcw, ShieldCheck, Mail, Phone, MapPin, GraduationCap, Camera } from 'lucide-react';

export const Profile: React.FC = () => {
  const { userProfile, setUserProfile, addToast, setIsPhotoModalOpen } = useApp();
  const [formData, setFormData] = useState<StudentProfile>(userProfile);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      avatarUrl: userProfile.avatarUrl
    }));
  }, [userProfile.avatarUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile(formData);
    addToast('Profile records updated! Automatic eligibility matches recalculated.', 'success');
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Student Identity Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Your centralized verified record used for rule-based scholarship eligibility scoring and fast-track application autofill
        </p>
      </div>

      <ProfileApplications />
      <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-3">
        <div><h2 className="text-sm font-bold text-slate-900">Make yourself comfortable</h2><p className="text-xs text-slate-500 mt-1">Choose light, dark, or your device appearance for this visit.</p></div>
        <ThemeControl />
      </div>
      {/* Main Profile Editor Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
        {/* Profile Header Block */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pb-6 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <button
              type="button"
              aria-label="Change profile photo"
              className="relative cursor-pointer group shrink-0"
              onClick={() => setIsPhotoModalOpen(true)}
              title="Click to change profile photo"
            >
              <img
                  width={80} height={80} decoding="async"
                src={formData.avatarUrl}
                onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackAvatars[0].url; }}
                alt={formData.fullName}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-100 shadow-sm group-hover:opacity-90 group-hover:scale-105 transition-all"
              />
              <span className="absolute inset-0 bg-slate-900/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                <Camera className="w-6 h-6" />
              </span>
              <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full border-2 border-white shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            </button>

            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-lg font-bold text-slate-900">{formData.fullName}</h2>
              <p className="text-xs text-slate-500 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span>{formData.course}</span>
                <span className="text-slate-300">·</span>
                <span>{formData.state} Domicile</span>
                <span className="text-slate-300">·</span>
                <span className="font-mono font-semibold text-indigo-700">
                  {formData.academicPercentage}% Aggregate
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsPhotoModalOpen(true)}
            className="px-3.5 py-2 border border-indigo-200 hover:border-indigo-300 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-xl transition flex items-center gap-1.5 shadow-sm"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Change Photo</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Full Legal Name
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Contact Phone
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Domicile State
              </label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                Enrolled Course / Degree
              </label>
              <input
                type="text"
                required
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Higher Secondary (11th-12th)">Higher Secondary (11th-12th)</option>
                <option value="Diploma / Polytechnic">Diploma / Polytechnic</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Postgraduate">Postgraduate</option>
                <option value="Doctoral / PhD">Doctoral / PhD</option>
              </select>
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
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Social Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setFormData(userProfile)}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition"
            >
              Revert Changes
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Profile Records</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
