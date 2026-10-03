import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { UniSphereLogo } from '../UniSphereLogo';
import { StudentIdCard } from './StudentIdCard';
import { StudentGrievanceTab } from './StudentGrievanceTab';
import { StudentOutpassTab } from './StudentOutpassTab';
import { StudentFacilitiesTab } from './StudentFacilitiesTab';
import { StudentTimetableTab } from './StudentTimetableTab';
import { StudentMessTab } from './StudentMessTab';
import { StudentAcademicTab } from './StudentAcademicTab';
import { StudentDigitalServicesTab } from './StudentDigitalServicesTab';
import { StudentAttendanceVisualization } from './StudentAttendanceVisualization';
import { 
  Wrench, 
  FileCheck2, 
  Building, 
  Calendar, 
  Utensils, 
  LayoutDashboard,
  CheckCircle2,
  Clock,
  QrCode,
  ArrowRight,
  GraduationCap,
  FileText,
  Sparkles,
  Bot,
  Star,
  MoreHorizontal,
  X
} from 'lucide-react';

type StudentTab = 'overview' | 'academics' | 'digital-services' | 'grievances' | 'outpass' | 'facilities' | 'timetable' | 'mess';

export const StudentDashboard: React.FC = () => {
  const { currentUser, tickets, outpasses, facilities, certificates, setChatbotOpen, openCriteriaWithTab, language, t } = useCampus();
  const [activeTab, setActiveTab] = useState<StudentTab>('overview');
  const [showMobileMore, setShowMobileMore] = useState(false);

  if (!currentUser) return null;

  const myTickets = tickets.filter(t => t.submittedBy === currentUser.id || t.studentId === currentUser.studentId);
  const pendingTickets = myTickets.filter(t => t.status !== 'Resolved');
  const myOutpasses = outpasses.filter(o => o.studentId === currentUser.studentId || o.studentName === currentUser.name);
  const activeOutpass = myOutpasses.find(o => o.status === 'Approved');
  const pendingFacilityReviews = facilities.filter(f => f.bookedBy === currentUser.id && f.isCompleted && !f.feedback);

  const handleTabSelect = (tab: StudentTab) => {
    setActiveTab(tab);
    setShowMobileMore(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 pb-24 md:pb-8">
      
      {/* Top Welcome & Laptop Tab Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
            <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700 shadow-2xs flex items-center justify-center shrink-0">
              <UniSphereLogo variant="icon" size="xs" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {t.studentHubHeader}
            </h2>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
              {language === 'odia_mix' ? 'Active ଛାତ୍ର Resident' : language === 'odia' ? 'ସକ୍ରିୟ ଛାତ୍ରାବାସ ବାସିନ୍ଦା' : language === 'hi' ? 'सक्रिय हॉस्टल छात्र' : 'Active Resident'}
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
              {language === 'hi' ? 'ओडिशा कैंपस' : language === 'odia' ? 'ଓଡ଼ିଶା କ୍ୟାମ୍ପସ' : language === 'odia_mix' ? 'ଓଡ଼ିଶା କ୍ୟାମ୍ପସ (Odisha)' : 'Odisha Campus'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {language === 'hi' ? 'स्वागत है' : language === 'odia' ? 'ସ୍ୱାଗତମ୍' : language === 'odia_mix' ? 'ସ୍ୱାଗତମ୍' : 'Welcome back'}, {currentUser.name} • {currentUser.hostelBlock || 'Kharavela Bhawan'} • {currentUser.department}
          </p>
        </div>

        {/* Laptop / Desktop Horizontal Tab Navigation Bar */}
        <div className="hidden md:flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            id="tab-student-overview"
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>{t.tabOverview}</span>
          </button>

          <button
            id="tab-student-academics"
            onClick={() => setActiveTab('academics')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'academics'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
            <span>Academics & Attendance</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-extrabold">
              83.5%
            </span>
          </button>

          <button
            id="tab-student-digital-services"
            onClick={() => setActiveTab('digital-services')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'digital-services'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-500" />
            <span>Digital Services</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 font-extrabold">
              {certificates.length}
            </span>
          </button>

          <button
            id="tab-student-grievances"
            onClick={() => setActiveTab('grievances')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'grievances'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>{t.tabGrievance}</span>
            {pendingTickets.length > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeTab === 'grievances' ? 'bg-white text-indigo-700 font-bold' : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300'
              }`}>
                {pendingTickets.length}
              </span>
            )}
          </button>

          <button
            id="tab-student-outpass"
            onClick={() => setActiveTab('outpass')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'outpass'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>{t.tabOutpass}</span>
            {activeOutpass && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            )}
          </button>

          <button
            id="tab-student-facilities"
            onClick={() => setActiveTab('facilities')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'facilities'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>{t.tabFacilities}</span>
            {pendingFacilityReviews.length > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold flex items-center gap-0.5 ${
                activeTab === 'facilities' 
                  ? 'bg-amber-300 text-amber-950' 
                  : 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60'
              }`}>
                <Star className="w-2.5 h-2.5 fill-current" />
                <span>{pendingFacilityReviews.length} Due</span>
              </span>
            )}
          </button>

          <button
            id="tab-student-timetable"
            onClick={() => setActiveTab('timetable')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'timetable'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.tabTimetable}</span>
          </button>

          <button
            id="tab-student-mess"
            onClick={() => setActiveTab('mess')}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'mess'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>{t.tabMess}</span>
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
            onClick={() => setActiveTab('academics')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
              activeTab === 'academics'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            Academics
          </button>
          <button
            onClick={() => setActiveTab('outpass')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
              activeTab === 'outpass'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            Outpass
          </button>
          <button
            onClick={() => setActiveTab('facilities')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
              activeTab === 'facilities'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            Facilities
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Digital Student ID & Quick Pass (5 cols on laptop) */}
          <div className="lg:col-span-5 space-y-6">
            <StudentIdCard user={currentUser} />

            {/* Quick Outpass Snapshot Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Gate Clearance Status
                </span>
                <button
                  onClick={() => setActiveTab('outpass')}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Manage <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {activeOutpass ? (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-950 dark:text-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Outpass Approved
                    </span>
                    <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-300 font-bold">{activeOutpass.id}</span>
                  </div>
                  <p className="text-xs text-emerald-900 dark:text-emerald-200">
                    Destination: <strong>{activeOutpass.destination}</strong>
                  </p>
                  <p className="text-[11px] text-emerald-800 dark:text-emerald-300">
                    Exit window: {activeOutpass.departureDate} at {activeOutpass.departureTime}
                  </p>
                  <button
                    onClick={() => setActiveTab('outpass')}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    <QrCode className="w-3.5 h-3.5" /> Show Verified QR Pass
                  </button>
                </div>
              ) : (
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-600 dark:text-slate-400">
                  <p>No active outpass issued for today. You are logged as present on campus.</p>
                  <button
                    onClick={() => setActiveTab('outpass')}
                    className="mt-2 text-indigo-600 dark:text-indigo-400 font-bold hover:underline block cursor-pointer"
                  >
                    + Request Leave / Day Outpass
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Quick Action Metrics & Attendance Visualization (7 cols on laptop) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Feedback Due Callout if student has ended facility session */}
            {pendingFacilityReviews.length > 0 && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-cyan-500/10 dark:from-amber-950/40 dark:via-amber-900/20 dark:to-cyan-950/20 border border-amber-300 dark:border-amber-700/60 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold shrink-0">
                    <Star className="w-5 h-5 fill-slate-950" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-xs text-amber-950 dark:text-amber-200">
                      Feedback Due: {pendingFacilityReviews[0].facilityName}
                    </h5>
                    <p className="text-xs text-amber-900/85 dark:text-amber-300/85 mt-0.5">
                      Your booking session concluded. Rate cleanliness, equipment readiness & share your experience.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('facilities')}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold shrink-0 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Star className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Rate Facility</span>
                </button>
              </div>
            )}

            {/* 3 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div 
                onClick={() => setActiveTab('grievances')}
                className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer space-y-1 shadow-2xs"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Open Tickets</span>
                  <Wrench className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">{pendingTickets.length}</div>
                <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-0.5">
                  View timeline <ArrowRight className="w-3 h-3" />
                </span>
              </div>

              <div 
                onClick={() => setActiveTab('facilities')}
                className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer space-y-1 shadow-2xs"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Space Bookings</span>
                  <Building className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {facilities.filter(f => f.bookedBy === currentUser.id).length}
                </div>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                  Reserve slots <ArrowRight className="w-3 h-3" />
                </span>
              </div>

              <div 
                onClick={() => setActiveTab('mess')}
                className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer space-y-1 shadow-2xs"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Mess Crowd Meter</span>
                  <Utensils className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">Moderate</div>
                <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-0.5">
                  Today's dinner menu <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>

            {/* Daily Attendance Progress Bar & Monthly Trend Visualization */}
            <StudentAttendanceVisualization onNavigateToAcademics={() => setActiveTab('academics')} />

            {/* Criteria Demonstration Quick Bar */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 border border-indigo-500/20 text-white shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live Demonstration
                  </span>
                  <span className="text-xs font-bold text-indigo-200">
                    8 Core Website Criteria
                  </span>
                </div>
                <button
                  onClick={() => openCriteriaWithTab()}
                  className="text-xs font-bold text-indigo-300 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <span>View All 8</span> <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('academics')}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-left transition-all cursor-pointer"
                >
                  <div className="text-base">🎓</div>
                  <div className="text-[11px] font-bold text-white mt-1">Student Support</div>
                  <div className="text-[10px] text-indigo-200">Attendance & Marks</div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('digital-services')}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-left transition-all cursor-pointer"
                >
                  <div className="text-base">📝</div>
                  <div className="text-[11px] font-bold text-white mt-1">Digital Services</div>
                  <div className="text-[10px] text-indigo-200">Certificates & NOC</div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('facilities')}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-left transition-all cursor-pointer"
                >
                  <div className="text-base">🏫</div>
                  <div className="text-[11px] font-bold text-white mt-1">Campus Facilities</div>
                  <div className="text-[10px] text-indigo-200">Library & Events</div>
                </button>

                <button
                  type="button"
                  onClick={() => setChatbotOpen(true)}
                  className="p-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 text-left transition-all cursor-pointer"
                >
                  <div className="text-base">🤖</div>
                  <div className="text-[11px] font-bold text-emerald-300 mt-1">Campus Mitra AI</div>
                  <div className="text-[10px] text-emerald-200">24/7 Smart Assistant</div>
                </button>
              </div>
            </div>

            {/* Active Grievances Preview */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <Wrench className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Recent Service & Maintenance Tickets</h3>
                </div>
                <button
                  onClick={() => setActiveTab('grievances')}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  All Tickets <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {myTickets.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-500 dark:text-slate-400">
                  No maintenance requests submitted yet.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {myTickets.slice(0, 3).map(ticket => (
                    <div 
                      key={ticket.id}
                      onClick={() => setActiveTab('grievances')}
                      className="p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer flex items-center justify-between text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-500 dark:text-slate-400">{ticket.id}</span>
                          <span className="font-semibold text-slate-900 dark:text-white">{ticket.title}</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-[11px]">{ticket.location} • {ticket.createdAt}</p>
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
              )}
            </div>

            {/* Timetable Snippet */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Today's Next Classroom Session</h3>
                </div>
                <button
                  onClick={() => setActiveTab('timetable')}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Full Week Schedule <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 uppercase">Upcoming at 10:15 AM</span>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Database Management Systems Lab (CS305)</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Software Lab 2, CS Complex • Dr. Meera Nambiar</p>
                </div>
                <span className="px-2 py-1 rounded-lg bg-indigo-600 text-white font-mono text-xs font-bold">
                  Lab Session
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

      {activeTab === 'academics' && <StudentAcademicTab />}
      {activeTab === 'digital-services' && <StudentDigitalServicesTab />}
      {activeTab === 'grievances' && <StudentGrievanceTab />}
      {activeTab === 'outpass' && <StudentOutpassTab />}
      {activeTab === 'facilities' && <StudentFacilitiesTab />}
      {activeTab === 'timetable' && <StudentTimetableTab />}
      {activeTab === 'mess' && <StudentMessTab />}

      {/* MOBILE BOTTOM NAVIGATION DOCK (Persistent on phone screens) */}
      <nav 
        aria-label="Mobile Bottom Navigation"
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
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        <button
          onClick={() => handleTabSelect('academics')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'academics'
              ? 'text-indigo-600 dark:text-indigo-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <GraduationCap className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Academics</span>
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
          {activeOutpass && (
            <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          )}
          <span className="text-[10px] mt-0.5">Outpass</span>
        </button>

        <button
          onClick={() => handleTabSelect('facilities')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'facilities'
              ? 'text-indigo-600 dark:text-indigo-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Building className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Facilities</span>
        </button>

        <button
          onClick={() => setShowMobileMore(!showMobileMore)}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            showMobileMore || ['digital-services', 'grievances', 'timetable', 'mess'].includes(activeTab)
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
              <div className="font-black text-sm text-slate-900 dark:text-white">All Campus Services</div>
              <button
                onClick={() => setShowMobileMore(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => handleTabSelect('grievances')}
                className={`p-3 rounded-2xl border text-left flex items-start space-x-3 transition-all ${
                  activeTab === 'grievances'
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-400 dark:border-indigo-600'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white">{t.tabGrievance}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">{pendingTickets.length} pending</div>
                </div>
              </button>

              <button
                onClick={() => handleTabSelect('digital-services')}
                className={`p-3 rounded-2xl border text-left flex items-start space-x-3 transition-all ${
                  activeTab === 'digital-services'
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-400 dark:border-indigo-600'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white">Digital Services</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">{certificates.length} certificates</div>
                </div>
              </button>

              <button
                onClick={() => handleTabSelect('timetable')}
                className={`p-3 rounded-2xl border text-left flex items-start space-x-3 transition-all ${
                  activeTab === 'timetable'
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-400 dark:border-indigo-600'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white">{t.tabTimetable}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Weekly schedule</div>
                </div>
              </button>

              <button
                onClick={() => handleTabSelect('mess')}
                className={`p-3 rounded-2xl border text-left flex items-start space-x-3 transition-all ${
                  activeTab === 'mess'
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-400 dark:border-indigo-600'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white">{t.tabMess}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Menu & crowd</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
