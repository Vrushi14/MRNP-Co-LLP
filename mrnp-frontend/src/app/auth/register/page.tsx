'use client';

import { useState } from 'react';
import { apiClient, authService } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, AlertCircle, ArrowRight, Lock, Mail, User, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const passwordLongEnough = password.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.auth.register(email, password, name);
      authService.setToken(response.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex font-instrument">

      {/* ── Left Brand Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-primaryBlue relative flex-col justify-between p-12 overflow-hidden">
        {/* decorative circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-32 -right-24 w-[500px] h-[500px] rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-white/[0.03]" />

        {/* logo */}
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-forum text-2xl font-bold text-white shadow-lg">
            M
          </div>
          <div>
            <h2 className="font-forum text-xl text-white tracking-wider font-bold">MRNP & Co LLP</h2>
            <span className="text-[10px] uppercase tracking-widest text-white/50 font-semibold">Chartered Accountants</span>
          </div>
        </div>

        {/* centre content */}
        <div className="relative z-10 space-y-8">
          <div>
            <blockquote className="font-forum text-3xl xl:text-4xl text-white leading-snug mb-6">
              "Talent and expertise<br />at your service."
            </blockquote>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Join the MRNP administrator workspace. Manage applications,
              coordinate hiring pipelines, and drive excellence across our firm.
            </p>
          </div>

          {/* feature checklist */}
          <ul className="space-y-3">
            {[
              'Full candidate application management',
              'Automated email outreach workflows',
              'Interview scheduling & calendar sync',
              'Real-time analytics & metrics',
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-white/75">
                <CheckCircle2 size={16} className="text-white/40 shrink-0 mt-0.5" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* bottom stats */}
        <div className="relative z-10 flex gap-8">
          {[
            { label: 'Years of Excellence', value: '25+' },
            { label: 'Active Clients', value: '500+' },
            { label: 'Offices Nationwide', value: '8' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="font-forum text-2xl text-white font-bold">{value}</p>
              <p className="text-[11px] text-white/50 uppercase tracking-wider font-semibold mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-md">

          {/* mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-10 h-10 rounded-xl bg-primaryBlue flex items-center justify-center font-forum text-xl font-bold text-white">
              M
            </div>
            <div>
              <h2 className="font-forum text-lg tracking-wider font-bold text-primaryBlue">MRNP & Co.</h2>
              <span className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">Chartered Accountants</span>
            </div>
          </div>

          {/* heading */}
          <div className="mb-8">
            <h1 className="font-forum text-3xl md:text-4xl font-bold text-primaryBlue tracking-wide mb-2">
              Create Account
            </h1>
            <p className="text-slate-500 text-sm dark:text-slate-400">
              Set up your admin workspace credentials.
            </p>
          </div>

          {/* error */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 text-rose-700 dark:text-rose-400 text-sm flex items-start gap-2.5">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="register-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-cardBg border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded-lg text-sm text-foreground placeholder:text-slate-400 shadow-sm"
                  placeholder="Your full name"
                  required
                  autoComplete="name"
                />
              </div>
            </div>

            {/* email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="register-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-cardBg border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded-lg text-sm text-foreground placeholder:text-slate-400 shadow-sm"
                  placeholder="you@mrnp.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-3 bg-cardBg border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded-lg text-sm text-foreground placeholder:text-slate-400 shadow-sm"
                  placeholder="Min. 6 characters"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {/* password strength hint */}
              {password.length > 0 && (
                <div className="mt-1.5 flex items-center gap-1.5">
                  <div className={`h-1 flex-1 rounded-full transition-colors ${passwordLongEnough ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                  <div className={`h-1 flex-1 rounded-full transition-colors ${password.length >= 8 ? 'bg-emerald-400' : 'bg-borderCustom'}`} />
                  <div className={`h-1 flex-1 rounded-full transition-colors ${password.length >= 12 ? 'bg-emerald-400' : 'bg-borderCustom'}`} />
                  <span className="text-[10px] text-slate-400 font-semibold ml-1">
                    {password.length < 6 ? 'Weak' : password.length < 8 ? 'Fair' : password.length < 12 ? 'Good' : 'Strong'}
                  </span>
                </div>
              )}
            </div>

            {/* confirm password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="register-confirm-password"
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full pl-10 pr-11 py-3 bg-cardBg border focus:outline-none transition rounded-lg text-sm text-foreground placeholder:text-slate-400 shadow-sm ${confirmPassword.length > 0
                    ? passwordsMatch
                      ? 'border-emerald-400 focus:border-emerald-500'
                      : 'border-rose-400 focus:border-rose-500'
                    : 'border-borderCustom focus:border-primaryBlue'
                    }`}
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {confirmPassword.length > 0 && (
                <p className={`text-[11px] mt-1.5 font-semibold flex items-center gap-1 ${passwordsMatch ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {passwordsMatch ? (
                    <><CheckCircle2 size={12} /> Passwords match</>
                  ) : (
                    <><AlertCircle size={12} /> Passwords do not match</>
                  )}
                </p>
              )}
            </div>

            {/* submit */}
            <button
              id="register-submit"
              type="submit"
              disabled={loading}
              className="w-full bg-primaryBlue hover:opacity-90 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-full shadow-md shadow-primaryBlue/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer mt-2 text-sm"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Workspace Account
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-borderCustom" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-background text-[11px] text-slate-400 uppercase tracking-widest font-semibold">
                Already registered?
              </span>
            </div>
          </div>

          {/* login link */}
          <a
            href="/auth/login"
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full border border-borderCustom hover:border-primaryBlue bg-cardBg hover:bg-background text-sm font-semibold text-foreground transition-all duration-200 cursor-pointer"
          >
            Sign In to Your Account
            <ArrowRight size={14} className="text-slate-400" />
          </a>

          {/* back to site */}
          <p className="text-center mt-8 text-xs text-slate-400">
            <a href="/" className="hover:text-primaryBlue transition font-semibold">
              ← Return to MRNP & Co. website
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
