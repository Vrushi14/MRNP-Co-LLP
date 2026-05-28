'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/utils/api';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  User,
  Plus,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface ApplicationItem {
  id: string;
  _id: string;
  name: string;
  email: string;
  jobPosition: string;
}

interface InterviewItem {
  _id: string;
  applicantId?: {
    _id: string;
    name: string;
    email: string;
    jobPosition: string;
  };
  interviewer: string;
  title: string;
  date: string;
  duration: number;
  meetingLink: string;
  notes: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export default function InterviewScheduler() {
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [interviews, setInterviews] = useState<InterviewItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [applicantId, setApplicantId] = useState('');
  const [interviewer, setInterviewer] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00');
  const [duration, setDuration] = useState(45);
  const [meetingLink, setMeetingLink] = useState('');
  const [notes, setNotes] = useState('');

  // Calendar navigation states
  const [currentDate, setCurrentDate] = useState(new Date());

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const appsRes = await apiClient.careers.getApplications();
      setApplications(appsRes.applications || []);

      const interviewsRes = await apiClient.interviews.getAll();
      setInterviews(interviewsRes.interviews || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load scheduling data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleGenerateLink = () => {
    // Generate a simulated Google Meet link
    const codes = ['abc', 'defg', 'hij'];
    const parts = codes.map(() => Math.random().toString(36).substring(2, 6));
    setMeetingLink(`https://meet.google.com/${parts.join('-')}`);
  };

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!applicantId || !interviewer || !title || !date || !time || !meetingLink) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      setActionLoading(true);
      const combinedDateTime = new Date(`${date}T${time}`);
      
      await apiClient.interviews.create({
        applicantId,
        interviewer,
        title,
        date: combinedDateTime.toISOString(),
        duration,
        meetingLink,
        notes
      });

      setSuccess('Interview scheduled successfully! Outbox logs updated.');
      
      // Reset form
      setApplicantId('');
      setInterviewer('');
      setTitle('');
      setDate('');
      setTime('10:00');
      setMeetingLink('');
      setNotes('');

      // Reload
      const interviewsRes = await apiClient.interviews.getAll();
      setInterviews(interviewsRes.interviews || []);
    } catch (err: any) {
      setError(err.message || 'Failed to schedule interview.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'scheduled' | 'completed' | 'cancelled') => {
    try {
      await apiClient.interviews.update(id, { status: newStatus });
      setInterviews(prev =>
        prev.map(item => (item._id === id ? { ...item, status: newStatus } : item))
      );
    } catch (err: any) {
      alert(err.message || 'Failed to update interview status.');
    }
  };

  // Calendar Helpers
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayIndex = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Map interviews to calendar cells
  const getInterviewsForDay = (day: number) => {
    return interviews.filter(item => {
      const iDate = new Date(item.date);
      return iDate.getFullYear() === year && iDate.getMonth() === month && iDate.getDate() === day;
    });
  };

  return (
    <div className="font-instrument space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-forum font-bold tracking-wide text-primaryBlue">Interview Scheduler</h1>
        <p className="text-xs md:text-sm text-slate-500 mt-1 dark:text-slate-400">Schedule meetings, coordinate rooms, and notify candidates.</p>
      </div>

      {error && (
        <div className="p-3 bg-rose-50 dark:bg-rose-955 border border-rose-250 text-rose-700 dark:text-rose-400 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>{success}</span>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Side: Scheduling Form */}
        <div className="xl:col-span-1">
          <div className="bg-cardBg border border-borderCustom rounded-xl p-5 shadow-sm sticky top-4">
            <h2 className="text-base font-forum font-bold text-primaryBlue mb-1 flex items-center gap-2">
              <Plus size={18} />
              Book Interview Slot
            </h2>
            <p className="text-[11px] text-slate-500 mb-4 dark:text-slate-400">Set schedule criteria below. This creates calendar events and notification alerts.</p>

            <form onSubmit={handleSchedule} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-1">Select Candidate *</label>
                <select
                  value={applicantId}
                  onChange={e => setApplicantId(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground cursor-pointer"
                  required
                >
                  <option value="">Choose Applicant...</option>
                  {applications.map(app => (
                    <option key={app.id || app._id} value={app.id || app._id}>
                      {app.name} ({app.jobPosition})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-1">Interview Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Technical Advisory Round 1"
                  className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground"
                  required
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-1">Interviewer Name *</label>
                <input
                  type="text"
                  value={interviewer}
                  onChange={e => setInterviewer(e.target.value)}
                  placeholder="e.g. Senior Partner Amit Shah"
                  className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-1">Date *</label>
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground cursor-pointer"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-1">Time *</label>
                  <input
                    type="time"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground cursor-pointer"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-1">Duration (mins)</label>
                  <input
                    type="number"
                    value={duration}
                    onChange={e => setDuration(Number(e.target.value))}
                    min={15}
                    className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground"
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <button
                    type="button"
                    onClick={handleGenerateLink}
                    className="w-full py-2 bg-background hover:bg-slate-100 dark:hover:bg-slate-800 border border-borderCustom text-slate-700 dark:text-slate-350 text-[10px] font-bold rounded flex items-center justify-center gap-1 cursor-pointer transition"
                  >
                    <Video size={12} className="text-primaryBlue" />
                    Auto-Generate Link
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-1">Meeting Link *</label>
                <input
                  type="url"
                  value={meetingLink}
                  onChange={e => setMeetingLink(e.target.value)}
                  placeholder="https://meet.google.com/..."
                  className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-1">Internal Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Notes, target questions, candidate feedback..."
                  className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={actionLoading}
                className="w-full bg-primaryBlue hover:opacity-90 disabled:opacity-50 text-white font-semibold text-xs py-2.5 rounded-full shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer pt-2"
              >
                {actionLoading ? 'Booking Slot...' : 'Schedule Interview'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Interactive Calendar & Schedule Timeline list */}
        <div className="xl:col-span-2 space-y-6">
          {/* Calendar Frame */}
          <div className="bg-cardBg border border-borderCustom rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4 select-none">
              <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <CalendarIcon size={16} className="text-primaryBlue" />
                {monthNames[month]} {year}
              </h2>
              <div className="flex gap-1.5">
                <button
                  onClick={prevMonth}
                  className="p-1.5 rounded-lg border border-borderCustom bg-cardBg hover:bg-background transition cursor-pointer"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-1.5 rounded-lg border border-borderCustom bg-cardBg hover:bg-background transition cursor-pointer"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Days of week */}
            <div className="grid grid-cols-7 gap-1 text-center font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-2 select-none">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Grid days */}
            <div className="grid grid-cols-7 gap-1">
              {/* Offset days */}
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`offset-${i}`} className="h-16 border border-transparent"></div>
              ))}

              {/* Days numbers */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dayInterviews = getInterviewsForDay(day);
                const hasInterviews = dayInterviews.length > 0;
                
                return (
                  <div
                    key={`day-${day}`}
                    onClick={() => {
                      // Click day to pre-fill form date
                      const formattedMonth = String(month + 1).padStart(2, '0');
                      const formattedDay = String(day).padStart(2, '0');
                      setDate(`${year}-${formattedMonth}-${formattedDay}`);
                    }}
                    className={`h-16 border border-borderCustom rounded-lg p-1.5 flex flex-col justify-between hover:border-primaryBlue cursor-pointer transition text-xs relative ${
                      hasInterviews ? 'bg-primaryBlue/[0.03] border-primaryBlue/30' : 'hover:bg-background/25'
                    }`}
                  >
                    <span className="font-mono text-slate-400 font-bold">{day}</span>
                    {hasInterviews && (
                      <div className="flex gap-1 overflow-x-hidden">
                        {dayInterviews.slice(0, 2).map((item, idx) => (
                          <span
                            key={idx}
                            className={`w-2 h-2 rounded-full inline-block shrink-0 ${
                              item.status === 'cancelled'
                                ? 'bg-rose-500'
                                : item.status === 'completed'
                                ? 'bg-emerald-500'
                                : 'bg-primaryBlue'
                            }`}
                            title={`${item.applicantId?.name || 'Interview'}: ${item.title}`}
                          ></span>
                        ))}
                        {dayInterviews.length > 2 && (
                          <span className="text-[8px] font-bold text-primaryBlue font-mono">+{dayInterviews.length - 2}</span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline Schedule list */}
          <div className="bg-cardBg border border-borderCustom rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 bg-background/50 border-b border-borderCustom">
              <h2 className="text-sm font-bold text-primaryBlue">Chronological Feed</h2>
            </div>

            {loading ? (
              <div className="p-12 text-center text-slate-400 text-xs">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primaryBlue mx-auto mb-3"></div>
                Retrieving scheduled interviews...
              </div>
            ) : interviews.length === 0 ? (
              <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-3">
                <CalendarIcon size={36} className="text-slate-300" />
                <h3 className="font-forum font-bold text-slate-650 text-base">No Scheduled Interviews</h3>
                <p className="text-xs text-slate-450">Book a candidate slot using the side panel form.</p>
              </div>
            ) : (
              <div className="divide-y divide-borderCustom">
                {interviews.map(item => {
                  const scheduleDate = new Date(item.date);
                  const isPast = scheduleDate.getTime() < Date.now();
                  
                  return (
                    <div key={item._id} className="p-4 hover:bg-background/20 transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                      <div className="flex gap-3 items-start min-w-0">
                        <div className="p-2.5 bg-background border border-borderCustom rounded-lg text-primaryBlue mt-0.5 shrink-0">
                          <Clock size={16} />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-foreground truncate max-w-[280px]">{item.title}</h4>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                            <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                              <User size={12} className="text-slate-400" />
                              {item.applicantId?.name || 'Applicant'}
                            </span>
                            <span>|</span>
                            <span>Interviewer: {item.interviewer}</span>
                            <span>|</span>
                            <span className="font-semibold text-primaryBlue">
                              {scheduleDate.toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}{' '}
                              @{' '}
                              {scheduleDate.toLocaleTimeString(undefined, {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                              })}
                            </span>
                            <span>({item.duration} mins)</span>
                          </div>
                          {item.notes && (
                            <p className="mt-1.5 text-[11px] text-slate-400 dark:text-slate-500 italic line-clamp-1">Notes: {item.notes}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                        {item.status === 'scheduled' && (
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => handleStatusChange(item._id, 'completed')}
                              className="p-1 px-2.5 rounded bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:hover:bg-emerald-900/40 text-emerald-600 border border-emerald-150 text-[10px] font-bold transition flex items-center gap-0.5 cursor-pointer"
                              title="Mark as Completed"
                            >
                              <CheckCircle2 size={10} />
                              Complete
                            </button>
                            <button
                              onClick={() => handleStatusChange(item._id, 'cancelled')}
                              className="p-1 px-2.5 rounded bg-rose-50 hover:bg-rose-100 dark:bg-rose-955 border border-rose-250 text-rose-600 text-[10px] font-bold transition flex items-center gap-0.5 cursor-pointer"
                              title="Mark as Cancelled"
                            >
                              <XCircle size={10} />
                              Cancel
                            </button>
                          </div>
                        )}

                        {item.status !== 'scheduled' && (
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            item.status === 'completed'
                              ? 'bg-emerald-50 dark:bg-emerald-955 text-emerald-600 border border-emerald-150'
                              : 'bg-rose-50 dark:bg-rose-955 text-rose-650 border border-rose-150'
                          }`}>
                            {item.status.toUpperCase()}
                          </span>
                        )}

                        <a
                          href={item.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-primaryBlue/5 hover:bg-primaryBlue hover:text-white border border-primaryBlue/10 text-primaryBlue transition cursor-pointer"
                          title="Open Room Meeting Link"
                        >
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
