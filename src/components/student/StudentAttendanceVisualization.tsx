import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ReferenceLine,
  Line
} from 'recharts';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Award, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';

interface DailyLog {
  date: string;
  dayLabel: string;
  dayShort: string;
  totalPeriods: number;
  attendedPeriods: number;
  percentage: number;
  status: 'Full' | 'Partial' | 'Absent';
  periods: {
    time: string;
    courseCode: string;
    courseName: string;
    status: 'Present' | 'Absent' | 'On Duty' | 'Upcoming';
    room: string;
  }[];
}

interface MonthlyData {
  month: string;
  shortMonth: string;
  attendanceRate: number;
  classesHeld: number;
  classesAttended: number;
  isCurrent?: boolean;
}

const MONTHLY_TREND_DATA: MonthlyData[] = [
  { month: 'April 2026', shortMonth: 'Apr', attendanceRate: 82.4, classesHeld: 46, classesAttended: 38 },
  { month: 'May 2026', shortMonth: 'May', attendanceRate: 88.0, classesHeld: 50, classesAttended: 44 },
  { month: 'June 2026', shortMonth: 'Jun', attendanceRate: 91.5, classesHeld: 48, classesAttended: 44 },
  { month: 'July 2026', shortMonth: 'Jul', attendanceRate: 81.6, classesHeld: 55, classesAttended: 45 },
  { month: 'August 2026', shortMonth: 'Aug', attendanceRate: 87.3, classesHeld: 58, classesAttended: 51 },
  { month: 'September 2026 (Current)', shortMonth: 'Sep', attendanceRate: 85.8, classesHeld: 48, classesAttended: 41, isCurrent: true },
];

const WEEKLY_DAILY_LOGS: DailyLog[] = [
  {
    date: '2026-09-15',
    dayLabel: 'Monday, Sep 15',
    dayShort: 'Mon',
    totalPeriods: 5,
    attendedPeriods: 5,
    percentage: 100,
    status: 'Full',
    periods: [
      { time: '09:00 - 10:00', courseCode: 'CS301', courseName: 'Design & Analysis of Algorithms', status: 'Present', room: 'LH-101' },
      { time: '10:15 - 11:15', courseCode: 'CS305', courseName: 'DBMS Lab', status: 'Present', room: 'Lab-2B' },
      { time: '11:30 - 12:30', courseCode: 'CS309', courseName: 'Computer Networks', status: 'Present', room: 'LH-103' },
      { time: '02:00 - 03:00', courseCode: 'CS312', courseName: 'AI Foundations', status: 'Present', room: 'Smart Hall 1' },
      { time: '03:15 - 04:15', courseCode: 'HS201', courseName: 'Professional Ethics', status: 'Present', room: 'Seminar-A' },
    ]
  },
  {
    date: '2026-09-16',
    dayLabel: 'Tuesday, Sep 16',
    dayShort: 'Tue',
    totalPeriods: 5,
    attendedPeriods: 4,
    percentage: 80,
    status: 'Partial',
    periods: [
      { time: '09:00 - 10:00', courseCode: 'CS301', courseName: 'Design & Analysis of Algorithms', status: 'Present', room: 'LH-101' },
      { time: '10:15 - 11:15', courseCode: 'CS305', courseName: 'DBMS Lab', status: 'Absent', room: 'Lab-2B' },
      { time: '11:30 - 12:30', courseCode: 'CS309', courseName: 'Computer Networks', status: 'Present', room: 'LH-103' },
      { time: '02:00 - 03:00', courseCode: 'CS312', courseName: 'AI Foundations', status: 'Present', room: 'Smart Hall 1' },
      { time: '03:15 - 04:15', courseCode: 'HS201', courseName: 'Professional Ethics', status: 'Present', room: 'Seminar-A' },
    ]
  },
  {
    date: '2026-09-17',
    dayLabel: 'Wednesday, Sep 17',
    dayShort: 'Wed',
    totalPeriods: 4,
    attendedPeriods: 4,
    percentage: 100,
    status: 'Full',
    periods: [
      { time: '09:00 - 10:00', courseCode: 'CS301', courseName: 'Design & Analysis of Algorithms', status: 'Present', room: 'LH-101' },
      { time: '10:15 - 11:15', courseCode: 'CS309', courseName: 'Computer Networks', status: 'Present', room: 'LH-103' },
      { time: '01:30 - 03:30', courseCode: 'CS305', courseName: 'DBMS Practical Project', status: 'Present', room: 'Lab-2B' },
      { time: '03:45 - 04:45', courseCode: 'CS312', courseName: 'AI Foundations', status: 'Present', room: 'Smart Hall 1' },
    ]
  },
  {
    date: '2026-09-18',
    dayLabel: 'Thursday, Sep 18',
    dayShort: 'Thu',
    totalPeriods: 5,
    attendedPeriods: 4,
    percentage: 80,
    status: 'Partial',
    periods: [
      { time: '09:00 - 10:00', courseCode: 'CS301', courseName: 'Design & Analysis of Algorithms', status: 'Present', room: 'LH-101' },
      { time: '10:15 - 11:15', courseCode: 'CS305', courseName: 'DBMS Lab', status: 'Present', room: 'Lab-2B' },
      { time: '11:30 - 12:30', courseCode: 'CS309', courseName: 'Computer Networks', status: 'Present', room: 'LH-103' },
      { time: '02:00 - 03:00', courseCode: 'HS201', courseName: 'Professional Ethics', status: 'Absent', room: 'Seminar-A' },
      { time: '03:15 - 04:15', courseCode: 'CS312', courseName: 'AI Foundations', status: 'Present', room: 'Smart Hall 1' },
    ]
  },
  {
    date: '2026-09-19',
    dayLabel: 'Friday, Sep 19',
    dayShort: 'Fri',
    totalPeriods: 5,
    attendedPeriods: 5,
    percentage: 100,
    status: 'Full',
    periods: [
      { time: '09:00 - 10:00', courseCode: 'CS301', courseName: 'Algorithms Tutorial', status: 'Present', room: 'LH-101' },
      { time: '10:15 - 11:15', courseCode: 'CS305', courseName: 'DBMS Lab', status: 'Present', room: 'Lab-2B' },
      { time: '11:30 - 12:30', courseCode: 'CS309', courseName: 'Networks Lab', status: 'Present', room: 'Systems Lab' },
      { time: '02:00 - 03:00', courseCode: 'CS312', courseName: 'AI Lab', status: 'Present', room: 'AI Centre' },
      { time: '03:15 - 04:15', courseCode: 'HS201', courseName: 'IP Rights Workshop', status: 'Present', room: 'Auditorium-2' },
    ]
  },
  {
    date: '2026-09-20',
    dayLabel: 'Today (Saturday, Sep 20)',
    dayShort: 'Today',
    totalPeriods: 4,
    attendedPeriods: 4,
    percentage: 100,
    status: 'Full',
    periods: [
      { time: '09:00 - 10:00', courseCode: 'CS301', courseName: 'Design & Analysis of Algorithms', status: 'Present', room: 'LH-101' },
      { time: '10:15 - 11:15', courseCode: 'CS312', courseName: 'Artificial Intelligence Foundations', status: 'Present', room: 'Smart Hall 1' },
      { time: '11:30 - 12:30', courseCode: 'CS309', courseName: 'Computer Networks & Security', status: 'Present', room: 'LH-103' },
      { time: '02:00 - 03:00', courseCode: 'HS201', courseName: 'Professional Ethics & IP Rights', status: 'Present', room: 'Seminar-A' },
    ]
  }
];

export const StudentAttendanceVisualization: React.FC<{ onNavigateToAcademics?: () => void }> = ({ 
  onNavigateToAcademics 
}) => {
  const { attendance } = useCampus();
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(WEEKLY_DAILY_LOGS.length - 1);
  const [activeView, setActiveView] = useState<'both' | 'daily' | 'trend'>('both');

  // Overall aggregate from context
  const totalAttended = attendance.reduce((acc, curr) => acc + curr.attended, 0);
  const totalHeld = attendance.reduce((acc, curr) => acc + curr.totalClasses, 0);
  const aggregatePercentage = totalHeld > 0 ? Number(((totalAttended / totalHeld) * 100).toFixed(1)) : 85.8;

  const currentDailyLog = WEEKLY_DAILY_LOGS[selectedDayIndex] || WEEKLY_DAILY_LOGS[WEEKLY_DAILY_LOGS.length - 1];
  const isDailyAboveThreshold = currentDailyLog.percentage >= 75;

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as MonthlyData;
      return (
        <div className="bg-slate-900/95 backdrop-blur-md text-white p-3 rounded-xl shadow-xl border border-slate-700/60 text-xs space-y-1.5 min-w-[170px]">
          <div className="flex items-center justify-between border-b border-slate-700 pb-1">
            <span className="font-bold text-slate-200">{data.month}</span>
            {data.isCurrent && (
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-indigo-500/30 text-indigo-300 font-semibold border border-indigo-400/30">
                Active
              </span>
            )}
          </div>
          <div className="flex items-center justify-between text-emerald-400 font-extrabold text-sm">
            <span>Attendance:</span>
            <span>{data.attendanceRate}%</span>
          </div>
          <div className="text-[11px] text-slate-300 flex justify-between">
            <span>Classes Attended:</span>
            <span className="font-mono text-white">{data.classesAttended} / {data.classesHeld}</span>
          </div>
          <div className="text-[10px] pt-1 border-t border-slate-800 text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>{data.attendanceRate >= 75 ? 'UGC Compliant (+75%)' : 'Caution Required'}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div id="student-attendance-visualization" className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/60">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Attendance Visualization & Compliance Tracker</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                {aggregatePercentage}% Overall
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Daily biometric lecture participation and multi-month UGC/NAAC statutory attendance progression.
            </p>
          </div>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center gap-1 self-start sm:self-auto bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveView('both')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeView === 'both' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Insights
          </button>
          <button
            type="button"
            onClick={() => setActiveView('daily')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeView === 'daily' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Daily Meter
          </button>
          <button
            type="button"
            onClick={() => setActiveView('trend')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeView === 'trend' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Monthly Trend
          </button>
        </div>
      </div>

      {/* SECTION 1: DAILY ATTENDANCE PERCENTAGE WITH PROGRESS BAR */}
      {(activeView === 'both' || activeView === 'daily') && (
        <div className="space-y-3.5 bg-slate-50/80 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span className="font-bold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                Daily Attendance Rate
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">({currentDailyLog.dayLabel})</span>
            </div>

            {/* Quick Day Selector Chips */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
              {WEEKLY_DAILY_LOGS.map((log, idx) => (
                <button
                  key={log.date}
                  type="button"
                  onClick={() => setSelectedDayIndex(idx)}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    selectedDayIndex === idx
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-700'
                  }`}
                >
                  {log.dayShort}
                </button>
              ))}
            </div>
          </div>

          {/* Daily Progress Bar & Large Percentage Metric */}
          <div className="space-y-2">
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-3xl font-black ${
                    isDailyAboveThreshold ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                  }`}>
                    {currentDailyLog.percentage}%
                  </span>
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">
                    ({currentDailyLog.attendedPeriods} of {currentDailyLog.totalPeriods} periods attended)
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {currentDailyLog.status === 'Full' 
                    ? '✓ 100% full biometric session attendance logged today.' 
                    : `${currentDailyLog.totalPeriods - currentDailyLog.attendedPeriods} missed or unpunched class period.`}
                </p>
              </div>

              <div className="text-right">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 ${
                  isDailyAboveThreshold 
                    ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60' 
                    : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60'
                }`}>
                  {isDailyAboveThreshold ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Compliant (+75%)</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      <span>Below 75% Safe Line</span>
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Custom High-Contrast Visual Progress Bar with Threshold Marker */}
            <div className="relative pt-1">
              {/* Outer track */}
              <div className="w-full h-4 bg-slate-200 dark:bg-slate-700/80 rounded-full overflow-hidden p-0.5 relative shadow-inner">
                {/* Colored fill bar */}
                <div 
                  className={`h-full rounded-full transition-all duration-500 ease-out ${
                    currentDailyLog.percentage >= 90
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                      : currentDailyLog.percentage >= 75
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                      : 'bg-gradient-to-r from-amber-500 to-rose-500'
                  }`}
                  style={{ width: `${currentDailyLog.percentage}%` }}
                />
              </div>

              {/* 75% Benchmark Pin & Indicator Line */}
              <div 
                className="absolute top-0 bottom-0 pointer-events-none"
                style={{ left: '75%' }}
              >
                <div className="w-0.5 h-6 bg-slate-900 dark:bg-slate-100 -mt-1 shadow-xs" />
                <div className="absolute -top-3.5 -translate-x-1/2 whitespace-nowrap">
                  <span className="px-1.5 py-0.2 rounded bg-slate-800 dark:bg-slate-200 text-amber-300 dark:text-slate-950 font-black text-[9px] shadow-2xs tracking-tighter uppercase">
                    75% UGC Line
                  </span>
                </div>
              </div>
            </div>

            {/* Scale numbers below progress bar */}
            <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono pt-1">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span className="font-bold text-amber-700 dark:text-amber-400">75% (Min. Mandated)</span>
              <span>100%</span>
            </div>
          </div>

          {/* Period-by-Period Biometric Punch Breakdown */}
          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
            <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center justify-between">
              <span>Daily Class Schedule & Punch Record:</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal hidden sm:inline">Auto-synced via Campus RFID</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {currentDailyLog.periods.map((period, i) => (
                <div 
                  key={i}
                  className={`p-2.5 rounded-lg border text-xs transition-colors ${
                    period.status === 'Present' 
                      ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200' 
                      : 'bg-rose-50/70 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60 text-rose-900 dark:text-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-[10px] text-slate-500 dark:text-slate-400">{period.courseCode}</span>
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded ${
                      period.status === 'Present' 
                        ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300' 
                        : 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300'
                    }`}>
                      {period.status}
                    </span>
                  </div>
                  <div className="font-semibold text-slate-900 dark:text-white text-[11px] truncate" title={period.courseName}>
                    {period.courseName}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                    <span>{period.time}</span>
                    <span className="font-mono">{period.room}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: MONTHLY TREND CHART */}
      {(activeView === 'both' || activeView === 'trend') && (
        <div className="space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wide">
                  Monthly Attendance Trend (Semester Progression)
                </h4>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Trajectory compared against the mandatory 75% UGC minimum threshold.
              </p>
            </div>

            {/* Quick Stat Pill */}
            <div className="flex items-center gap-2 text-xs flex-wrap">
              <div className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/60 font-semibold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Peak: <strong>June (91.5%)</strong></span>
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/60 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Buffer: <strong>+10.8% Safe Margin</strong></span>
              </div>
            </div>
          </div>

          {/* Recharts Area Chart Component */}
          <div className="h-60 w-full bg-slate-50/50 dark:bg-slate-800/40 rounded-xl p-2.5 border border-slate-200/70 dark:border-slate-800">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={MONTHLY_TREND_DATA}
                margin={{ top: 15, right: 20, left: -15, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
                
                <XAxis 
                  dataKey="shortMonth" 
                  tick={{ fontSize: 11, fill: 'currentColor' }}
                  className="text-slate-500 dark:text-slate-400"
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickLine={false}
                />
                
                <YAxis 
                  domain={[60, 100]} 
                  ticks={[60, 70, 75, 80, 90, 100]}
                  tick={{ fontSize: 10, fill: 'currentColor' }}
                  className="text-slate-500 dark:text-slate-400"
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickLine={false}
                  tickFormatter={(val) => `${val}%`}
                />
                
                <Tooltip content={<CustomTooltip />} />
                
                {/* 75% Statutory Compliance Benchmark Line */}
                <ReferenceLine 
                  y={75} 
                  stroke="#e11d48" 
                  strokeDasharray="4 4" 
                  strokeWidth={1.5}
                  label={{ 
                    value: '75% UGC Minimum Threshold', 
                    position: 'insideBottomRight', 
                    fill: '#e11d48', 
                    fontSize: 10,
                    fontWeight: 'bold'
                  }} 
                />

                {/* Primary Trend Area and Line */}
                <Area 
                  type="monotone" 
                  dataKey="attendanceRate" 
                  stroke="#6366f1" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#attendanceGradient)" 
                  activeDot={{ r: 6, stroke: '#312e81', strokeWidth: 2, fill: '#818cf8' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Month-by-month comparative summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {MONTHLY_TREND_DATA.map((item) => (
              <div 
                key={item.shortMonth}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  item.isCurrent
                    ? 'bg-indigo-50/80 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-700 ring-1 ring-indigo-400/30'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">{item.shortMonth}</span>
                  {item.isCurrent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
                  )}
                </div>
                <div className={`text-base font-black ${
                  item.attendanceRate >= 75 ? 'text-slate-900 dark:text-white' : 'text-rose-600 dark:text-rose-400'
                }`}>
                  {item.attendanceRate}%
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                  {item.classesAttended}/{item.classesHeld} classes
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer link to full course attendance breakdown */}
      {onNavigateToAcademics && (
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            Looking for specific subject-wise safe bunk counts or course syllabus?
          </span>
          <button
            type="button"
            onClick={onNavigateToAcademics}
            className="font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Course Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
