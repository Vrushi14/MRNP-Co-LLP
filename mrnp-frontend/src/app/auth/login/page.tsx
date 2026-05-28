'use client';

import { useState } from 'react';
import { apiClient, authService } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, AlertCircle, ArrowRight, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await apiClient.auth.login(email, password);
      authService.setToken(response.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please try again.');
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

        {/* centre quote */}
        <div className="relative z-10">
          <blockquote className="font-forum text-3xl xl:text-4xl text-white leading-snug mb-6">
            "Smart approaches<br />to every solution."
          </blockquote>
          <p className="text-white/60 text-sm leading-relaxed max-w-sm">
            Empowering businesses with trusted advisory expertise in audit,
            tax, governance, and financial strategy.
          </p>
        </div>

        {/* bottom decorative stats */}
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
      <div className="flex-1 flex items-center justify-center px-6 py-12">
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
              Welcome back
            </h1>
            <p className="text-slate-500 text-sm dark:text-slate-400">
              Sign in to the admin workspace.
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
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="login-email"
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
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-3 bg-cardBg border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded-lg text-sm text-foreground placeholder:text-slate-400 shadow-sm"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="w-full bg-primaryBlue hover:opacity-90 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-full shadow-md shadow-primaryBlue/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer mt-2 text-sm"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Access Dashboard
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
                New Administrator?
              </span>
            </div>
          </div>

          {/* register link */}
          <a
            href="/auth/register"
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full border border-borderCustom hover:border-primaryBlue bg-cardBg hover:bg-background text-sm font-semibold text-foreground transition-all duration-200 cursor-pointer"
          >
            Create an Account
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
