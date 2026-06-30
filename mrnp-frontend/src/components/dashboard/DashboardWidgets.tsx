'use client';

import {
  Users,
  Calendar,
  MapPin,
  TrendingUp,
  ArrowRight,
  Plus,
  Lock,
  UserCheck,
  Briefcase
} from 'lucide-react';

interface DashboardWidgetsProps {
  applications: any[];
  interviews: any[];
  setActiveTab: (tab: any) => void;
  openAppDetails: (app: any) => void;
}

export default function DashboardWidgets({
  applications = [],
  interviews = [],
  setActiveTab,
  openAppDetails
}: DashboardWidgetsProps) {
  
  // 1. Recent Applications (last 4)
  const recentApps = [...applications]
    .sort((a, b) => new Date(b.createdAt || b.created_at || 0).getTime() - new Date(a.createdAt || a.created_at || 0).getTime())
    .slice(0, 4);

  // 2. Upcoming Interviews (scheduled, sorted chronological)
  const upcomingInterviews = [...interviews]
    .filter(i => i.status === 'scheduled' && new Date(i.date).getTime() >= Date.now() - 2 * 60 * 60 * 1000)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  // 3. Top Hiring Locations (aggregated count per city)
  const locationCounts = applications.reduce((acc: any, curr: any) => {
    const city = curr.jobCity || curr.job_city || 'Vadodara';
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});

  const topLocations = Object.entries(locationCounts)
    .map(([city, count]) => ({ city, count: count as number }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  return (
    <div className="font-instrument grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      
      {/* Widget 1: Recent Applications */}
      <div className="bg-cardBg border border-borderCustom rounded-xl p-5 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-350 uppercase tracking-wider flex items-center gap-2">
              <Users size={16} className="text-primaryBlue" />
              Recent Applications
            </h3>
            <button
              onClick={() => setActiveTab('jobs')}
              className="text-xs text-primaryBlue hover:underline flex items-center gap-1 cursor-pointer font-semibold"
            >
              View pipeline
              <ArrowRight size={12} />
            </button>
          </div>

          {recentApps.length === 0 ? (
            <p className="text-xs text-slate-450 italic py-4">No recent applications submitted.</p>
          ) : (
            <div className="space-y-3">
              {recentApps.map((app, idx) => (
                <div key={app.id || app._id || idx} className="p-3 bg-background border border-borderCustom rounded-lg flex justify-between items-center hover:border-primaryBlue transition">
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-foreground truncate">{app.name}</h4>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5">{app.jobPosition} • {app.jobCity || app.job_city}</p>
                  </div>
                  <button
                    onClick={() => openAppDetails(app)}
                    className="shrink-0 p-1 px-2.5 bg-primaryBlue/5 hover:bg-primaryBlue hover:text-white dark:bg-slate-800 text-primaryBlue text-[10px] font-bold rounded border border-primaryBlue/10 transition cursor-pointer"
                  >
                    Review
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Widget 2: Upcoming Interviews */}
      <div className="bg-cardBg border border-borderCustom rounded-xl p-5 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-350 uppercase tracking-wider flex items-center gap-2">
              <Calendar size={16} className="text-primaryBlue" />
              Upcoming Interviews
            </h3>
            <button
              onClick={() => setActiveTab('interviews')}
              className="text-xs text-primaryBlue hover:underline flex items-center gap-1 cursor-pointer font-semibold"
            >
              Open scheduler
              <ArrowRight size={12} />
            </button>
          </div>

          {upcomingInterviews.length === 0 ? (
            <p className="text-xs text-slate-450 italic py-4">No interviews scheduled today.</p>
          ) : (
            <div className="space-y-3">
              {upcomingInterviews.map((item, idx) => {
                const iDate = new Date(item.date);
                return (
                  <div key={item._id || idx} className="p-3 bg-background border border-borderCustom rounded-lg flex justify-between items-center hover:border-primaryBlue transition">
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-foreground truncate">{item.title}</h4>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5">
                        Candidate: {item.applicantId?.name || 'Applicant'} • Interviewer: {item.interviewer}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-bold text-primaryBlue block">
                        {iDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono block">
                        {iDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Widget 3: Top Hiring Locations */}
      <div className="bg-cardBg border border-borderCustom rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-350 uppercase tracking-wider mb-4 flex items-center gap-2">
          <MapPin size={16} className="text-primaryBlue" />
          Top Hiring Locations
        </h3>

        {topLocations.length === 0 ? (
          <p className="text-xs text-slate-450 italic py-4">No locations computed.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {topLocations.map((loc, idx) => (
              <div key={idx} className="p-3.5 bg-background border border-borderCustom rounded-xl flex items-center gap-3 shadow-inner hover:scale-[1.02] transition duration-200">
                <div className="p-2 bg-primaryBlue/5 rounded-lg text-primaryBlue shrink-0">
                  <MapPin size={14} />
                </div>
                <div>
                  <h4 className="font-bold text-xs truncate max-w-[110px]">{loc.city}</h4>
                  <p className="text-[10px] text-slate-400 font-mono font-bold mt-0.5">{loc.count} {loc.count === 1 ? 'applicant' : 'applicants'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Widget 4: Quick Actions panel */}
      <div className="bg-cardBg border border-borderCustom rounded-xl p-5 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-350 uppercase tracking-wider mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-primaryBlue" />
            Quick Actions Panel
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setActiveTab('jobs')}
              className="py-2.5 px-3 bg-primaryBlue text-white hover:opacity-90 text-[10px] font-bold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-primaryBlue/10"
            >
              <Plus size={12} />
              Post Job Opening
            </button>

            <button
              onClick={() => setActiveTab('interviews')}
              className="py-2.5 px-3 bg-background border border-borderCustom text-foreground hover:bg-slate-50 dark:hover:bg-slate-800/40 text-[10px] font-bold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Calendar size={12} className="text-primaryBlue" />
              Schedule Interview
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className="py-2.5 px-3 bg-background border border-borderCustom text-foreground hover:bg-slate-50 dark:hover:bg-slate-800/40 text-[10px] font-bold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Briefcase size={12} className="text-emerald-500" />
              Outbox & Alerts
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className="py-2.5 px-3 bg-background border border-borderCustom text-foreground hover:bg-slate-50 dark:hover:bg-slate-800/40 text-[10px] font-bold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Lock size={12} className="text-amber-500" />
              Change Password
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
