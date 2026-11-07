import { avatarPresets as fallbackAvatars } from '../data/avatars';
import { avatarPresets } from '../data/avatars';
import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Upload, Camera, Check, RefreshCw, Sparkles, Image as ImageIcon } from 'lucide-react';

export const PhotoChangeModal: React.FC = () => {
  const {
    isPhotoModalOpen,
    setIsPhotoModalOpen,
    userProfile,
    setUserProfile,
    addToast
  } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(userProfile.avatarUrl);
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number | null>(null);

  const presets = avatarPresets;

  useEffect(() => {
    if (isPhotoModalOpen) {
      setPreviewUrl(userProfile.avatarUrl);
      setSelectedPresetIndex(null);
    }
  }, [isPhotoModalOpen, userProfile.avatarUrl]);

  if (!isPhotoModalOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      addToast('Please select a valid image file (PNG, JPG, WEBP)', 'warning');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      addToast('Image size should be less than 5MB', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setPreviewUrl(result);
        setSelectedPresetIndex(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPreset = (url: string, index: number) => {
    setPreviewUrl(url);
    setSelectedPresetIndex(index);
  };

  const handleSave = () => {
    setUserProfile({
      ...userProfile,
      avatarUrl: previewUrl
    });
    setIsPhotoModalOpen(false);
    addToast('Profile photo updated successfully across your workspace!', 'success');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={() => setIsPhotoModalOpen(false)}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full mb-1">
            <Camera className="w-3.5 h-3.5" />
            <span>Customize Identity</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 leading-snug">
            Change Student Profile Photo
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload your own photo or pick from curated scholar portraits
          </p>
        </div>

        {/* Current Preview */}
        <div className="flex flex-col items-center justify-center p-5 bg-slate-50 rounded-2xl border border-slate-200/80 mb-5">
          <div className="relative group">
            <img
                  width={96} height={96} decoding="async"
              src={previewUrl}
              onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackAvatars[0].url; }}
              alt="Profile preview"
              referrerPolicy="no-referrer"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 bg-slate-900/40 rounded-full text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              title="Click to replace with file"
            >
              <Upload className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs font-semibold text-slate-700 mt-3">
            {userProfile.fullName}
          </p>
          <span className="text-[11px] text-slate-400 mt-0.5">
            Visible on your applications & student dashboard
          </span>
        </div>

        {/* Upload Custom File Button */}
        <div className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-2.5 px-4 rounded-xl border border-dashed border-indigo-300 hover:border-indigo-500 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-700 text-xs font-semibold transition flex items-center justify-center gap-2"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Photo from Computer</span>
          </button>

          {/* Curated Presets Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2 flex items-center justify-between">
              <span>Or Choose a Verified Scholar Avatar:</span>
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            </label>
            <div className="grid grid-cols-3 gap-3">
              {presets.map((preset, idx) => {
                const isSelected = previewUrl === preset.url;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset.url, idx)}
                    className={`relative p-1.5 rounded-xl border transition-all flex flex-col items-center gap-1 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <img
                  width={56} height={56} decoding="async"
                      loading="lazy"
                      src={preset.url}
                      alt={preset.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <span className="text-[10px] font-medium text-slate-600 truncate max-w-full">
                      {preset.name}
                    </span>
                    {isSelected && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-indigo-600 text-white rounded-full flex items-center justify-center">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-2 pt-6 border-t border-slate-100 mt-5">
          <button
            type="button"
            onClick={() => {
              setPreviewUrl(userProfile.avatarUrl);
              setIsPhotoModalOpen(false);
            }}
            className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-semibold rounded-xl shadow-sm transition flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Apply New Photo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
