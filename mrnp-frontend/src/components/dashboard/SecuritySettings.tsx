'use client';

import { useState } from 'react';
import { apiClient } from '@/utils/api';
import { Eye, EyeOff, ShieldAlert, CheckCircle, LockKeyhole } from 'lucide-react';

export default function SecuritySettings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    try {
      setLoading(true);
      await apiClient.user.changePassword(currentPassword, newPassword);
      setSuccess('Your password has been successfully updated.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.message || 'Failed to change password. Please check your current password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cardBg border border-borderCustom rounded-2xl p-6 shadow-sm relative overflow-hidden font-instrument transition-all duration-300 hover:shadow-md">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primaryBlue/5 rounded-full blur-3xl"></div>
      
      <h2 className="text-base md:text-lg font-forum font-bold text-primaryBlue mb-1 flex items-center gap-2.5">
        <LockKeyhole size={18} className="text-primaryBlue/80" />
        Security Credentials
      </h2>
      <p className="text-[11px] text-slate-500 mb-6 dark:text-slate-400">
        Modify your system password. Ensure it has a minimum length of 6 characters.
      </p>

      {error && (
        <div className="mb-5 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-250 dark:border-rose-900/30 text-rose-700 dark:text-rose-400 text-xs flex items-center gap-2 animate-fade-in shadow-sm">
          <ShieldAlert size={16} className="shrink-0 text-rose-550" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs flex items-center gap-2 animate-fade-in shadow-sm">
          <CheckCircle size={16} className="shrink-0 text-emerald-550" />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-slate-700 dark:text-slate-350 text-xs font-semibold mb-1 flex items-center gap-1.5">
            Current Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <LockKeyhole size={14} />
            </div>
            <input
              type={showCurrent ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full pl-9 pr-10 py-2.5 bg-background border border-borderCustom focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue/20 focus:outline-none transition rounded-lg text-xs text-foreground font-semibold"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-650 cursor-pointer transition-colors"
            >
              {showCurrent ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-slate-700 dark:text-slate-350 text-xs font-semibold mb-1 flex items-center gap-1.5">
            New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <LockKeyhole size={14} />
            </div>
            <input
              type={showNew ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full pl-9 pr-10 py-2.5 bg-background border border-borderCustom focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue/20 focus:outline-none transition rounded-lg text-xs text-foreground font-semibold"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-650 cursor-pointer transition-colors"
            >
              {showNew ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-slate-700 dark:text-slate-350 text-xs font-semibold mb-1 flex items-center gap-1.5">
            Confirm New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <LockKeyhole size={14} />
            </div>
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-9 pr-10 py-2.5 bg-background border border-borderCustom focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue/20 focus:outline-none transition rounded-lg text-xs text-foreground font-semibold"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-650 cursor-pointer transition-colors"
            >
              {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primaryBlue hover:opacity-95 disabled:opacity-50 text-white font-semibold text-xs py-2.5 px-6 rounded-full shadow-md transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-4 transform hover:-translate-y-0.5 active:translate-y-0"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Updating Credentials...
            </>
          ) : (
            'Change Password'
          )}
        </button>
      </form>
    </div>
  );
}
