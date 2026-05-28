'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/utils/api';
import {
  Bell,
  Mail,
  Briefcase,
  Calendar,
  Info,
  Trash2,
  Check,
  CheckCheck,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

interface NotificationItem {
  _id: string;
  type: 'new_application' | 'interview_reminder' | 'system_notification' | 'email_log';
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

interface EmailLogItem {
  _id: string;
  applicantId?: {
    name: string;
    email: string;
    jobPosition: string;
  };
  recipientEmail: string;
  subject: string;
  body: string;
  type: string;
  status: string;
  createdAt: string;
}

export default function NotificationCenter() {
  const [activeTab, setActiveTab] = useState<'alerts' | 'emails'>('alerts');
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [emailLogs, setEmailLogs] = useState<EmailLogItem[]>([]);
  const [loadingAlerts, setLoadingAlerts] = useState(false);
  const [loadingEmails, setLoadingEmails] = useState(false);
  const [error, setError] = useState('');

  const loadNotifications = async () => {
    try {
      setLoadingAlerts(true);
      setError('');
      const response = await apiClient.notifications.getAll();
      setNotifications(response.notifications || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch notifications.');
    } finally {
      setLoadingAlerts(false);
    }
  };

  const loadEmails = async () => {
    try {
      setLoadingEmails(true);
      setError('');
      const response = await apiClient.emails.getAll();
      setEmailLogs(response.emailLogs || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch email logs.');
    } finally {
      setLoadingEmails(false);
    }
  };

  useEffect(() => {
    loadNotifications();
    loadEmails();
  }, []);

  const handleMarkRead = async (id: string) => {
    try {
      await apiClient.notifications.markRead(id);
      setNotifications(prev =>
        prev.map(n => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await apiClient.notifications.markAllRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiClient.notifications.delete(id);
      setNotifications(prev => prev.filter(n => n._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'new_application':
        return <Briefcase size={16} className="text-blue-500" />;
      case 'interview_reminder':
        return <Calendar size={16} className="text-emerald-500" />;
      case 'email_log':
        return <Mail size={16} className="text-purple-500" />;
      default:
        return <Info size={16} className="text-slate-500" />;
    }
  };

  const getUnreadCount = () => {
    return notifications.filter(n => !n.read).length;
  };

  return (
    <div className="font-instrument space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-forum font-bold tracking-wide text-primaryBlue">Notifications & logs</h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1 dark:text-slate-400">Review system activity records and outbox communication history.</p>
        </div>

        <div className="flex items-center gap-2 self-start">
          <button
            onClick={() => {
              loadNotifications();
              loadEmails();
            }}
            className="p-2.5 bg-cardBg hover:bg-background border border-borderCustom rounded-lg text-foreground transition flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            title="Reload data"
          >
            <RefreshCw size={14} className={loadingAlerts || loadingEmails ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-borderCustom flex gap-6">
        <button
          onClick={() => setActiveTab('alerts')}
          className={`pb-3 text-sm font-bold border-b-2 transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'alerts'
              ? 'border-primaryBlue text-primaryBlue'
              : 'border-transparent text-slate-500 hover:text-foreground'
          }`}
        >
          <Bell size={16} />
          System Alerts
          {getUnreadCount() > 0 && (
            <span className="bg-primaryBlue text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {getUnreadCount()} new
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('emails')}
          className={`pb-3 text-sm font-bold border-b-2 transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'emails'
              ? 'border-primaryBlue text-primaryBlue'
              : 'border-transparent text-slate-500 hover:text-foreground'
          }`}
        >
          <Mail size={16} />
          Outbound Mail logs
          {emailLogs.length > 0 && (
            <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {emailLogs.length}
            </span>
          )}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 dark:bg-rose-955 border border-rose-250 text-rose-700 dark:text-rose-400 text-xs rounded-xl">
          {error}
        </div>
      )}

      {activeTab === 'alerts' ? (
        <div className="bg-cardBg border border-borderCustom rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 bg-background/50 border-b border-borderCustom flex items-center justify-between">
            <h2 className="text-sm font-bold text-primaryBlue flex items-center gap-2">
              Recent Alerts
            </h2>
            {getUnreadCount() > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-xs text-primaryBlue hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <CheckCheck size={14} />
                Mark all read
              </button>
            )}
          </div>

          {loadingAlerts ? (
            <div className="p-16 text-center text-slate-400 text-xs">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primaryBlue mx-auto mb-3"></div>
              Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-16 text-center text-slate-400 flex flex-col items-center gap-3">
              <Bell size={36} className="text-slate-300" />
              <h3 className="font-forum font-bold text-slate-650 text-base">All caught up!</h3>
              <p className="text-xs text-slate-450">No notifications logged in the database yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-borderCustom">
              {notifications.map(item => (
                <div
                  key={item._id}
                  className={`p-4 transition flex items-start justify-between gap-4 ${
                    !item.read ? 'bg-primaryBlue/5 dark:bg-primaryBlue/10 font-medium' : 'hover:bg-background/20'
                  }`}
                >
                  <div className="flex gap-3 flex-1 min-w-0">
                    <div className="p-2 bg-background border border-borderCustom rounded-lg mt-0.5 shrink-0">
                      {getIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-foreground">{item.title}</h4>
                        {!item.read && (
                          <span className="w-1.5 h-1.5 bg-primaryBlue rounded-full shrink-0"></span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.message}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        {new Date(item.createdAt).toLocaleString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {!item.read && (
                      <button
                        onClick={() => handleMarkRead(item._id)}
                        className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:hover:bg-emerald-900/40 text-emerald-600 transition cursor-pointer"
                        title="Mark as read"
                      >
                        <Check size={14} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-900/40 text-rose-600 transition cursor-pointer"
                      title="Delete alert"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-cardBg border border-borderCustom rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 bg-background/50 border-b border-borderCustom">
            <h2 className="text-sm font-bold text-primaryBlue">Outbox Logs</h2>
          </div>

          {loadingEmails ? (
            <div className="p-16 text-center text-slate-400 text-xs">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primaryBlue mx-auto mb-3"></div>
              Loading outreach logs...
            </div>
          ) : emailLogs.length === 0 ? (
            <div className="p-16 text-center text-slate-400 flex flex-col items-center gap-3">
              <Mail size={36} className="text-slate-300" />
              <h3 className="font-forum font-bold text-slate-650 text-base">No Emails Sent</h3>
              <p className="text-xs text-slate-450">Correspondence logs will show up here as soon as automated templates are dispatched.</p>
            </div>
          ) : (
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-background text-primaryBlue font-bold border-b border-borderCustom sticky top-0 bg-opacity-95">
                    <th className="py-3 px-4">Recipient</th>
                    <th className="py-3 px-4">Subject</th>
                    <th className="py-3 px-4">Template</th>
                    <th className="py-3 px-4">Dispatched At</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-borderCustom">
                  {emailLogs.map(log => (
                    <tr key={log._id} className="hover:bg-background/40 transition">
                      <td className="py-3 px-4">
                        <div className="font-bold">{log.applicantId?.name || 'N/A'}</div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[150px]">{log.recipientEmail}</div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-350">
                        {log.subject}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-primaryBlue/5 text-primaryBlue border border-primaryBlue/10">
                          {log.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400 font-medium">
                        {new Date(log.createdAt).toLocaleString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 border border-emerald-100 dark:border-emerald-900/30">
                          {log.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
