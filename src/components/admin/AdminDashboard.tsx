import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { AdminGrievanceManager } from './AdminGrievanceManager';
import { AdminOutpassManager } from './AdminOutpassManager';
import { AdminFacilityManager } from './AdminFacilityManager';
import { AdminBroadcastManager } from './AdminBroadcastManager';
import { AdminStudentManager } from './AdminStudentManager';
import { AdminReportsAnalytics } from './AdminReportsAnalytics';
import { 
  LayoutDashboard, 
  Wrench, 
  FileCheck2, 
  Building, 
  Bell, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  ArrowRight,
  Sparkles,
  UserCheck,
  BarChart3,
  FileText,
  MoreHorizontal,
  X
} from 'lucide-react';

type AdminTab = 'overview' | 'students' | 'analytics' | 'grievances' | 'outpass' | 'facilities' | 'broadcasts';

export const AdminDashboard: React.FC = () => {
  const { currentUser, tickets, outpasses, facilities, announcements, certificates, openCriteriaWithTab, setCurrentView } = useCampus();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [showMobileMore, setShowMobileMore] = useState(false);

  if (!currentUser) return null;

  const pendingTickets = tickets.filter(t => t.status === 'Pending');
  const inProgressTickets = tickets.filter(t => t.status === 'In Progress');
  const resolvedTickets = tickets.filter(t => t.status === 'Resolved');
  const pendingOutpasses = outpasses.filter(o => o.status === 'Pending');
  const pendingFacilities = facilities.filter(f => f.status === 'Pending');

  const handleTabSelect = (tab: AdminTab) => {
    setActiveTab(tab);
    setShowMobileMore(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 pb-24 md:pb-8">
      
      {/* Top Banner & Tab Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center space-x-2 flex-wrap gap-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Administrator Operations Control
            </h2>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Dean & Staff Hub
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {currentUser.name} • {currentUser.department}
          </p>
        </div>

        {/* Desktop / Laptop Tab switcher chips */}
        <div className="hidden md:flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            id="tab-admin-overview"
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Overview & Pulse</span>
          </button>

          <button
            id="tab-admin-students"
            onClick={() => setActiveTab('students')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'students'
                ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
            <span>Student Management & Approvals</span>
            {certificates.filter(c => c.status === 'Pending').length > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-500 text-white font-bold">
                {certificates.filter(c => c.status === 'Pending').length}
              </span>
            )}
          </button>

          <button
            id="tab-admin-analytics"
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>Reports & Analytics</span>
          </button>

          <button
            id="tab-admin-grievances"
            onClick={() => setActiveTab('grievances')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'grievances'
                ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Grievance Dispatch</span>
            {pendingTickets.length > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeTab === 'grievances' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300'
              }`}>
                {pendingTickets.length}
              </span>
            )}
          </button>

          <button
            id="tab-admin-outpass"
            onClick={() => setActiveTab('outpass')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'outpass'
                ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Outpass Clearance</span>
            {pendingOutpasses.length > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeTab === 'outpass' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300'
              }`}>
                {pendingOutpasses.length}
              </span>
            )}
          </button>

          <button
            id="tab-admin-facilities"
            onClick={() => setActiveTab('facilities')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'facilities'
                ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Venues & Halls</span>
            {pendingFacilities.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 font-bold">
                {pendingFacilities.length}
              </span>
            )}
          </button>

          <button
            id="tab-admin-broadcasts"
            onClick={() => setActiveTab('broadcasts')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'broadcasts'
                ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Campus Alerts</span>
          </button>

          <button
            id="tab-admin-profile"
            onClick={() => setCurrentView('profile')}
            className="px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all whitespace-nowrap cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-indigo-300"
            title="View personal administrator credentials and reserved facilities"
          >
            <UserCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>My Profile & Bookings</span>
          </button>
        </div>

        {/* Mobile Horizontal Scrollable Pills */}
        <div className="flex md:hidden items-center space-x-1.5 overflow-x-auto pb-1 -mx-3 px-3">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
              activeTab === 'students'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            Students
          </button>
          <button
            onClick={() => setActiveTab('grievances')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
              activeTab === 'grievances'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            Grievances
          </button>
          <button
            onClick={() => setActiveTab('outpass')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
              activeTab === 'outpass'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            Outpasses
          </button>
          <button
            onClick={() => setShowMobileMore(true)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1"
          >
            <span>More</span>
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Executive Stats Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div 
              onClick={() => setActiveTab('grievances')}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-indigo-400 dark:hover:border-indigo-600 transition-all cursor-pointer space-y-1"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold">Unresolved Tickets</span>
                <Wrench className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white">{pendingTickets.length + inProgressTickets.length}</div>
              <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
                {pendingTickets.length} require immediate work dispatch
              </p>
            </div>

            <div 
              onClick={() => setActiveTab('outpass')}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-indigo-400 dark:hover:border-indigo-600 transition-all cursor-pointer space-y-1"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold">Pending Outpasses</span>
                <FileCheck2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white">{pendingOutpasses.length}</div>
              <p className="text-[11px] text-indigo-700 dark:text-indigo-400 font-medium">
                Student leaves awaiting warden signature
              </p>
            </div>

            <div 
              onClick={() => setActiveTab('facilities')}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-indigo-400 dark:hover:border-indigo-600 transition-all cursor-pointer space-y-1"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold">Facility Bookings</span>
                <Building className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white">{facilities.length}</div>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                {pendingFacilities.length} reservations pending review
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold">SLA Resolution Speed</span>
                <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white">92.4%</div>
              <p className="text-[11px] text-purple-700 dark:text-purple-400 font-medium">
                Tickets closed within 24 hours target
              </p>
            </div>
          </div>

          {/* Quick Dual Operational Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Urgent Grievance Queue */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <Wrench className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Urgent Grievance Action Queue</h3>
                </div>
                <button
                  onClick={() => setActiveTab('grievances')}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Full Console <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-2.5">
                {tickets.slice(0, 3).map(ticket => (
                  <div 
                    key={ticket.id}
                    onClick={() => setActiveTab('grievances')}
                    className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer flex items-center justify-between text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-500 dark:text-slate-400">{ticket.id}</span>
                        <span className="font-semibold text-slate-900 dark:text-white">{ticket.title}</span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                        Student: {ticket.studentName} • {ticket.location}
                      </p>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      ticket.status === 'Resolved' ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300' :
                      ticket.status === 'In Progress' ? 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300' :
                      'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Outpasses Awaiting Approval */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <FileCheck2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Hostel Leave Requests (Gate Clearance)</h3>
                </div>
                <button
                  onClick={() => setActiveTab('outpass')}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Review All <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-2.5">
                {outpasses.slice(0, 3).map(pass => (
                  <div 
                    key={pass.id}
                    onClick={() => setActiveTab('outpass')}
                    className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer flex items-center justify-between text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-500 dark:text-slate-400">{pass.id}</span>
                        <span className="font-semibold text-slate-900 dark:text-white">{pass.studentName} ({pass.roomNo})</span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                        {pass.outpassType} to {pass.destination} • {pass.departureDate}
                      </p>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      pass.status === 'Approved' ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300' :
                      pass.status === 'Pending' ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300' :
                      'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300'
                    }`}>
                      {pass.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {activeTab === 'students' && <AdminStudentManager />}
      {activeTab === 'analytics' && <AdminReportsAnalytics />}
      {activeTab === 'grievances' && <AdminGrievanceManager />}
      {activeTab === 'outpass' && <AdminOutpassManager />}
      {activeTab === 'facilities' && <AdminFacilityManager />}
      {activeTab === 'broadcasts' && <AdminBroadcastManager />}

      {/* MOBILE BOTTOM NAVIGATION DOCK (Persistent on phone screens for Admin) */}
      <nav 
        aria-label="Admin Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-1.5 px-3 flex items-center justify-around shadow-lg"
      >
        <button
          onClick={() => handleTabSelect('overview')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'text-indigo-600 dark:text-indigo-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Overview</span>
        </button>

        <button
          onClick={() => handleTabSelect('students')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'students'
              ? 'text-indigo-600 dark:text-indigo-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Students</span>
        </button>

        <button
          onClick={() => handleTabSelect('grievances')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl relative transition-all cursor-pointer ${
            activeTab === 'grievances'
              ? 'text-indigo-600 dark:text-indigo-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Wrench className="w-5 h-5" />
          {pendingTickets.length > 0 && (
            <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-amber-500" />
          )}
          <span className="text-[10px] mt-0.5">Tickets</span>
        </button>

        <button
          onClick={() => handleTabSelect('outpass')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl relative transition-all cursor-pointer ${
            activeTab === 'outpass'
              ? 'text-indigo-600 dark:text-indigo-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <FileCheck2 className="w-5 h-5" />
          {pendingOutpasses.length > 0 && (
            <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          )}
          <span className="text-[10px] mt-0.5">Outpass</span>
        </button>

        <button
          onClick={() => setShowMobileMore(!showMobileMore)}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            showMobileMore || ['analytics', 'facilities', 'broadcasts'].includes(activeTab)
              ? 'text-indigo-600 dark:text-indigo-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <MoreHorizontal className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">More</span>
        </button>
      </nav>

      {/* MOBILE "MORE" BOTTOM SHEET */}
      {showMobileMore && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-xs flex items-end animate-in fade-in duration-150">
          <div className="w-full bg-white dark:bg-slate-900 rounded-t-3xl border-t border-slate-200 dark:border-slate-800 p-5 space-y-4 max-h-[80vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="font-black text-sm text-slate-900 dark:text-white">Admin Tools & Consoles</div>
              <button
                onClick={() => setShowMobileMore(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => handleTabSelect('analytics')}
                className={`p-3 rounded-2xl border text-left flex items-start space-x-3 transition-all ${
                  activeTab === 'analytics'
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-400 dark:border-indigo-600'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white">Analytics</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">NAAC & Reports</div>
                </div>
              </button>

              <button
                onClick={() => handleTabSelect('facilities')}
                className={`p-3 rounded-2xl border text-left flex items-start space-x-3 transition-all ${
                  activeTab === 'facilities'
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-400 dark:border-indigo-600'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white">Venues & Halls</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">{facilities.length} resources</div>
                </div>
              </button>

              <button
                onClick={() => handleTabSelect('broadcasts')}
                className={`p-3 rounded-2xl border text-left flex items-start space-x-3 transition-all ${
                  activeTab === 'broadcasts'
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-400 dark:border-indigo-600'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white">Campus Alerts</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Emergency & broadcast</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setShowMobileMore(false);
                  setCurrentView('profile');
                }}
                className="p-3 rounded-2xl border text-left flex items-start space-x-3 transition-all bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700"
              >
                <div className="p-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white">My Profile</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Credentials & info</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

