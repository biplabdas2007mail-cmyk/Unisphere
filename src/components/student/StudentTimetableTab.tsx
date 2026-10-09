import React, { useState, useMemo } from 'react';
import { 
  STUDENT_TIMETABLE, 
  TIMETABLE_METADATA, 
  TIMETABLE_SUBJECTS_DIRECTORY, 
  TIMETABLE_TIME_SLOTS 
} from '../../data/mockData';
import { TimetableSlot } from '../../types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  BookOpen, 
  Sparkles, 
  Grid3X3, 
  List, 
  Printer, 
  Search, 
  Building2, 
  GraduationCap, 
  Coffee, 
  Utensils, 
  Info, 
  CheckCircle2, 
  X,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;
type DayName = typeof DAYS[number];

// Master Grid Slot representations matching the ims.rec.ac.in schedule
interface GridPeriodCell {
  periodLabel: string;
  timeRange: string;
  isBreak?: boolean;
  breakLabel?: string;
  // Specific day entries
  monday?: { title: string; room: string; faculty: string; type: string; batch?: string };
  tuesday?: { title: string; room: string; faculty: string; type: string; batch?: string; rowSpan?: number };
  wednesday?: { title: string; room: string; faculty: string; type: string; batch?: string; rowSpan?: number };
  thursday?: { 
    title: string; 
    room: string; 
    faculty: string; 
    type: string; 
    batch?: string;
    subBatches?: Array<{ title: string; room: string; faculty: string; batch: string }>;
  };
  friday?: { 
    title: string; 
    room: string; 
    faculty: string; 
    type: string; 
    batch?: string;
    subBatches?: Array<{ title: string; room: string; faculty: string; batch: string }>;
  };
  saturday?: { title: string; room: string; faculty: string; type: string; batch?: string; rowSpan?: number };
}

// Master grid matrix exactly matching the photo from ims.rec.ac.in
const MASTER_GRID_DATA: GridPeriodCell[] = [
  {
    periodLabel: 'P1 (09:15 AM - 09:45 AM)',
    timeRange: '09:15 AM - 09:45 AM',
    monday: { title: 'DS&AF AI(ALL)', room: 'Room No.-A304', faculty: 'Aliva Haiburu', type: 'theory' },
    tuesday: { title: 'WAD LAB(ALL)', room: 'Room No.-B308-1', faculty: 'Devikrishna Das, TULASHI SETHI', type: 'lab' },
    wednesday: { title: 'PPT(ALL)', room: 'Room No.-A304', faculty: 'GF PPT', type: 'training' },
    thursday: { title: 'ORP(ALL)', room: 'Room No.-A304', faculty: 'FREDRIC EDISON EKKA', type: 'theory' },
    friday: { title: 'Math(ALL)', room: 'Room No.-A304', faculty: 'Barsha Bijayini Muduli', type: 'theory' },
    saturday: { title: 'PPT(ALL)', room: 'Room No.-A304', faculty: 'GF PPT', type: 'training' }
  },
  {
    periodLabel: 'P2 (09:45 AM - 10:15 AM)',
    timeRange: '09:45 AM - 10:15 AM',
    monday: { title: 'DS&AF AI(ALL)', room: 'Room No.-A304', faculty: 'Aliva Haiburu', type: 'theory' },
    tuesday: { title: 'WAD LAB(ALL)', room: 'Room No.-B308-1', faculty: 'Devikrishna Das, TULASHI SETHI', type: 'lab' },
    wednesday: { title: 'PPT(ALL)', room: 'Room No.-A304', faculty: 'GF PPT', type: 'training' },
    thursday: { title: 'ORP(ALL)', room: 'Room No.-A304', faculty: 'FREDRIC EDISON EKKA', type: 'theory' },
    friday: { title: 'Math(ALL)', room: 'Room No.-A304', faculty: 'Barsha Bijayini Muduli', type: 'theory' },
    saturday: { title: 'PPT(ALL)', room: 'Room No.-A304', faculty: 'GF PPT', type: 'training' }
  },
  {
    periodLabel: 'P3 (10:15 AM - 10:45 AM)',
    timeRange: '10:15 AM - 10:45 AM',
    monday: { title: 'ORP(ALL)', room: 'Room No.-A304', faculty: 'FREDRIC EDISON EKKA', type: 'theory' },
    tuesday: { title: 'WAD LAB(ALL)', room: 'Room No.-B308-1', faculty: 'Devikrishna Das, TULASHI SETHI', type: 'lab' },
    wednesday: { title: 'PPT(ALL)', room: 'Room No.-A304', faculty: 'GF PPT', type: 'training' },
    thursday: { 
      title: 'DE LAB(GR1) / OOP LAB(GR2)', 
      room: 'A203 / A305', 
      faculty: 'Ritisnigha Das / FREDRIC EDISON EKKA', 
      type: 'lab',
      subBatches: [
        { title: 'DE LAB(GR1)', room: 'Room No.-A203', faculty: 'Ritisnigha Das', batch: 'GR1' },
        { title: 'OOP LAB(GR2)', room: 'Room No.-A305', faculty: 'FREDRIC EDISON EKKA', batch: 'GR2' }
      ]
    },
    friday: { title: 'DE(ALL)', room: 'Room No.-A304', faculty: 'Ritisnigha Das', type: 'theory' },
    saturday: { title: 'PPT(ALL)', room: 'Room No.-A304', faculty: 'GF PPT', type: 'training' }
  },
  {
    periodLabel: 'P4 (10:45 AM - 11:15 AM)',
    timeRange: '10:45 AM - 11:15 AM',
    monday: { title: 'ORP(ALL)', room: 'Room No.-A304', faculty: 'FREDRIC EDISON EKKA', type: 'theory' },
    tuesday: { title: 'WAD LAB(ALL)', room: 'Room No.-B308-1', faculty: 'Devikrishna Das, TULASHI SETHI', type: 'lab' },
    wednesday: { title: 'PPT(ALL)', room: 'Room No.-A304', faculty: 'GF PPT', type: 'training' },
    thursday: { 
      title: 'DE LAB(GR1) / OOP LAB(GR2)', 
      room: 'A203 / A305', 
      faculty: 'Ritisnigha Das / FREDRIC EDISON EKKA', 
      type: 'lab',
      subBatches: [
        { title: 'DE LAB(GR1)', room: 'Room No.-A203', faculty: 'Ritisnigha Das', batch: 'GR1' },
        { title: 'OOP LAB(GR2)', room: 'Room No.-A305', faculty: 'FREDRIC EDISON EKKA', batch: 'GR2' }
      ]
    },
    friday: { title: 'DE(ALL)', room: 'Room No.-A304', faculty: 'Ritisnigha Das', type: 'theory' },
    saturday: { title: 'PPT(ALL)', room: 'Room No.-A304', faculty: 'GF PPT', type: 'training' }
  },
  {
    periodLabel: 'TEA BREAK (11:00 AM - 11:15 AM)',
    timeRange: '11:00 AM - 11:15 AM',
    isBreak: true,
    breakLabel: '11:00 AM - 11:15 AM BREAK'
  },
  {
    periodLabel: 'P5 (11:30 AM - 12:00 PM)',
    timeRange: '11:30 AM - 12:00 PM',
    monday: { title: 'WAD(ALL)', room: 'Room No.-A304', faculty: 'Devikrishna Das, TULASHI SETHI', type: 'theory' },
    tuesday: { title: 'EE(ALL)', room: 'Room No.-A304', faculty: 'Pujalin Rout', type: 'theory' },
    wednesday: { title: 'WAD(ALL)', room: 'Room No.-A304', faculty: 'Devikrishna Das, TULASHI SETHI', type: 'theory' },
    thursday: { 
      title: 'DE LAB(GR1) / OOP LAB(GR2)', 
      room: 'A203 / A305', 
      faculty: 'Ritisnigha Das / FREDRIC EDISON EKKA', 
      type: 'lab',
      subBatches: [
        { title: 'DE LAB(GR1)', room: 'Room No.-A203', faculty: 'Ritisnigha Das', batch: 'GR1' },
        { title: 'OOP LAB(GR2)', room: 'Room No.-A305', faculty: 'FREDRIC EDISON EKKA', batch: 'GR2' }
      ]
    },
    friday: { title: 'DS&AF AI(ALL)', room: 'Room No.-A304', faculty: 'Aliva Haiburu', type: 'theory' },
    saturday: { title: 'DE(ALL)', room: 'Room No.-A304', faculty: 'Ritisnigha Das', type: 'theory' }
  },
  {
    periodLabel: 'P6 (12:00 PM - 12:30 PM)',
    timeRange: '12:00 PM - 12:30 PM',
    monday: { title: 'WAD(ALL)', room: 'Room No.-A304', faculty: 'Devikrishna Das, TULASHI SETHI', type: 'theory' },
    tuesday: { title: 'EE(ALL)', room: 'Room No.-A304', faculty: 'Pujalin Rout', type: 'theory' },
    wednesday: { title: 'WAD(ALL)', room: 'Room No.-A304', faculty: 'Devikrishna Das, TULASHI SETHI', type: 'theory' },
    thursday: { 
      title: 'DE LAB(GR1) / OOP LAB(GR2)', 
      room: 'A203 / A305', 
      faculty: 'Ritisnigha Das / FREDRIC EDISON EKKA', 
      type: 'lab',
      subBatches: [
        { title: 'DE LAB(GR1)', room: 'Room No.-A203', faculty: 'Ritisnigha Das', batch: 'GR1' },
        { title: 'OOP LAB(GR2)', room: 'Room No.-A305', faculty: 'FREDRIC EDISON EKKA', batch: 'GR2' }
      ]
    },
    friday: { title: 'DS&AF AI(ALL)', room: 'Room No.-A304', faculty: 'Aliva Haiburu', type: 'theory' },
    saturday: { title: 'DE(ALL)', room: 'Room No.-A304', faculty: 'Ritisnigha Das', type: 'theory' }
  },
  {
    periodLabel: 'LUNCH BREAK (12:30 PM - 01:30 PM)',
    timeRange: '12:30 PM - 01:30 PM',
    isBreak: true,
    breakLabel: 'LUNCH'
  },
  {
    periodLabel: 'P7 (01:30 PM - 02:00 PM)',
    timeRange: '01:30 PM - 02:00 PM',
    monday: { title: 'DE(ALL)', room: 'Room No.-A304', faculty: 'Ritisnigha Das', type: 'theory' },
    tuesday: { title: 'ORP(ALL)', room: 'Room No.-A304', faculty: 'FREDRIC EDISON EKKA', type: 'theory' },
    wednesday: { title: 'EE(ALL)', room: 'Room No.-A304', faculty: 'Pujalin Rout', type: 'theory' },
    thursday: { title: 'DE(ALL)', room: 'Room No.-A304', faculty: 'Ritisnigha Das', type: 'theory' },
    friday: { 
      title: 'DE LAB(GR2) / DS LAB(GR1)', 
      room: 'A203 / A206', 
      faculty: 'Ritisnigha Das / ANKITA JENA', 
      type: 'lab',
      subBatches: [
        { title: 'DE LAB(GR2)', room: 'Room No.-A203', faculty: 'Ritisnigha Das', batch: 'GR2' },
        { title: 'DS LAB(GR1)', room: 'Room No.-A206', faculty: 'ANKITA JENA', batch: 'GR1' }
      ]
    },
    saturday: { title: 'WAD(ALL)', room: 'Room No.-A304', faculty: 'TULASHI SETHI', type: 'theory' }
  },
  {
    periodLabel: 'P8 (02:00 PM - 02:30 PM)',
    timeRange: '02:00 PM - 02:30 PM',
    monday: { title: 'DE(ALL)', room: 'Room No.-A304', faculty: 'Ritisnigha Das', type: 'theory' },
    tuesday: { title: 'ORP(ALL)', room: 'Room No.-A304', faculty: 'FREDRIC EDISON EKKA', type: 'theory' },
    wednesday: { title: 'EE(ALL)', room: 'Room No.-A304', faculty: 'Pujalin Rout', type: 'theory' },
    thursday: { title: 'DE(ALL)', room: 'Room No.-A304', faculty: 'Ritisnigha Das', type: 'theory' },
    friday: { 
      title: 'DE LAB(GR2) / DS LAB(GR1)', 
      room: 'A203 / A206', 
      faculty: 'Ritisnigha Das / ANKITA JENA', 
      type: 'lab',
      subBatches: [
        { title: 'DE LAB(GR2)', room: 'Room No.-A203', faculty: 'Ritisnigha Das', batch: 'GR2' },
        { title: 'DS LAB(GR1)', room: 'Room No.-A206', faculty: 'ANKITA JENA', batch: 'GR1' }
      ]
    },
    saturday: { title: 'WAD(ALL)', room: 'Room No.-A304', faculty: 'TULASHI SETHI', type: 'theory' }
  },
  {
    periodLabel: 'P9 (02:45 PM - 03:15 PM)',
    timeRange: '02:45 PM - 03:15 PM',
    monday: { title: 'ORP(ALL)', room: 'Room No.-A304', faculty: 'FREDRIC EDISON EKKA', type: 'theory' },
    tuesday: { title: 'DS&AF AI(ALL)', room: 'Room No.-A304', faculty: 'Aliva Haiburu', type: 'theory' },
    wednesday: { title: 'Math(ALL)', room: 'Room No.-A304', faculty: 'Barsha Bijayini Muduli', type: 'theory' },
    thursday: { title: 'Math(ALL)', room: 'Room No.-A304', faculty: 'Barsha Bijayini Muduli', type: 'theory' },
    friday: { 
      title: 'DE LAB(GR2) / DS LAB(GR1)', 
      room: 'A203 / A206', 
      faculty: 'Ritisnigha Das / ANKITA JENA', 
      type: 'lab',
      subBatches: [
        { title: 'DE LAB(GR2)', room: 'Room No.-A203', faculty: 'Ritisnigha Das', batch: 'GR2' },
        { title: 'DS LAB(GR1)', room: 'Room No.-A206', faculty: 'ANKITA JENA', batch: 'GR1' }
      ]
    },
    saturday: { title: 'DS LAB(GR2)', room: 'Room No.-B116', faculty: 'ANKITA JENA', type: 'lab' }
  },
  {
    periodLabel: 'P10 (03:15 PM - 03:45 PM)',
    timeRange: '03:15 PM - 03:45 PM',
    monday: { title: 'ORP(ALL)', room: 'Room No.-A304', faculty: 'FREDRIC EDISON EKKA', type: 'theory' },
    tuesday: { title: 'DS&AF AI(ALL)', room: 'Room No.-A304', faculty: 'Aliva Haiburu', type: 'theory' },
    wednesday: { title: 'Math(ALL)', room: 'Room No.-A304', faculty: 'Barsha Bijayini Muduli', type: 'theory' },
    thursday: { title: 'Math(ALL)', room: 'Room No.-A304', faculty: 'Barsha Bijayini Muduli', type: 'theory' },
    friday: { 
      title: 'WAD(ALL) / DS LAB(GR1)', 
      room: 'A304 / A206', 
      faculty: 'TULASHI SETHI / ANKITA JENA', 
      type: 'theory' 
    },
    saturday: { title: 'DS LAB(GR2)', room: 'Room No.-B116', faculty: 'ANKITA JENA', type: 'lab' }
  }
];

export const StudentTimetableTab: React.FC = () => {
  // Determine current day for auto-selection
  const currentDayOfWeek = useMemo<DayName>(() => {
    const dayIndex = new Date().getDay();
    // 0 is Sunday -> default to Monday
    if (dayIndex === 0) return 'Monday';
    const dayMap: Record<number, DayName> = {
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday'
    };
    return dayMap[dayIndex] || 'Monday';
  }, []);

  const [viewMode, setViewMode] = useState<'grid' | 'agenda'>('grid');
  const [selectedDay, setSelectedDay] = useState<DayName>(currentDayOfWeek);
  const [selectedBatch, setSelectedBatch] = useState<'ALL' | 'GR1' | 'GR2'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSubjectDirectory, setShowSubjectDirectory] = useState(false);
  const [showPrintNotice, setShowPrintNotice] = useState(false);

  // Filtered agenda schedule for selected day
  const filteredDaySchedule = useMemo(() => {
    return STUDENT_TIMETABLE.filter(slot => {
      if (slot.day !== selectedDay) return false;
      if (selectedBatch !== 'ALL' && slot.batch && slot.batch !== 'ALL' && slot.batch !== selectedBatch) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          slot.courseName.toLowerCase().includes(q) ||
          slot.courseCode.toLowerCase().includes(q) ||
          slot.instructor.toLowerCase().includes(q) ||
          slot.room.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedDay, selectedBatch, searchQuery]);

  // Handle printing
  const handlePrint = () => {
    setShowPrintNotice(true);
    setTimeout(() => {
      window.print();
      setShowPrintNotice(false);
    }, 300);
  };

  // Helper color tags for subjects in the grid
  const getSubjectBadgeStyle = (type?: string, title?: string) => {
    if (type === 'lab' || title?.includes('LAB')) {
      return 'bg-purple-50 dark:bg-purple-950/50 text-purple-900 dark:text-purple-200 border-purple-200 dark:border-purple-800';
    }
    if (type === 'training' || title?.includes('PPT')) {
      return 'bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200 border-amber-200 dark:border-amber-800';
    }
    if (title?.includes('Math')) {
      return 'bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200 border-rose-200 dark:border-rose-800';
    }
    if (title?.includes('WAD')) {
      return 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800';
    }
    if (title?.includes('DE')) {
      return 'bg-violet-50 dark:bg-violet-950/50 text-violet-900 dark:text-violet-200 border-violet-200 dark:border-violet-800';
    }
    return 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-200 border-indigo-200 dark:border-indigo-800';
  };

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER & PORTAL METADATA BANNER */}
      {/* ========================================================================= */}
      <div className="rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white p-5 sm:p-6 shadow-xl border border-indigo-900/80">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Live Academic Sync Active
              </span>
              <span className="text-[11px] text-indigo-200 font-medium">
                • {TIMETABLE_METADATA.portalUrl}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span>{TIMETABLE_METADATA.course} – {TIMETABLE_METADATA.branch}</span>
            </h2>

            <p className="text-xs sm:text-sm text-indigo-200/90 max-w-3xl leading-relaxed">
              Official Semester 3, Section S Timetable (w.e.f. {TIMETABLE_METADATA.effectiveFrom}). Core Lecture Hall: <strong className="text-white bg-indigo-500/30 px-1.5 py-0.5 rounded font-mono">{TIMETABLE_METADATA.coreLectureHall}</strong>. Includes scheduled practical labs, soft skills PPT, and batch rotations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => setShowSubjectDirectory(true)}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-300" />
              <span>Subjects & Faculty</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow-md"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>

        {/* Quick Metadata Stats Bar */}
        <div className="mt-4 pt-3.5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-indigo-300 block">Semester & Section</span>
            <span className="font-extrabold text-white text-sm">{TIMETABLE_METADATA.semester} • {TIMETABLE_METADATA.section}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-indigo-300 block">Effective From</span>
            <span className="font-extrabold text-white text-sm">{TIMETABLE_METADATA.effectiveFrom} (Latest Revision)</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-indigo-300 block">Schedule Format</span>
            <span className="font-extrabold text-white text-sm">6 Days (Mon - Sat) • 10 Periods</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-indigo-300 block">Today's Day Status</span>
            <span className="font-extrabold text-emerald-300 text-sm flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {currentDayOfWeek} Schedule
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CONTROLS BAR: VIEW SWITCHER, BATCH TOGGLE, & SEARCH */}
      {/* ========================================================================= */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* View Switcher: Matrix Grid vs Agenda */}
        <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shrink-0">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Grid3X3 className="w-3.5 h-3.5" />
            <span>Master Grid Table (Matrix)</span>
          </button>

          <button
            onClick={() => setViewMode('agenda')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'agenda'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Day-by-Day Agenda</span>
          </button>
        </div>

        {/* Batch Selection Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap">Lab Batch:</span>
          <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
            {(['ALL', 'GR1', 'GR2'] as const).map(b => (
              <button
                key={b}
                onClick={() => setSelectedBatch(b)}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  selectedBatch === b
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {b === 'ALL' ? 'All Batches' : b === 'GR1' ? 'Group 1 (GR1)' : 'Group 2 (GR2)'}
              </button>
            ))}
          </div>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search subject, faculty, room..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. VIEW 1: MASTER GRID VIEW (Matching exact layout of ims.rec.ac.in) */}
      {/* ========================================================================= */}
      {viewMode === 'grid' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
          {/* Grid Title Bar */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/70 dark:bg-slate-850/60">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Grid3X3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Weekly Master Timetable Grid (w.e.f. {TIMETABLE_METADATA.effectiveFrom})</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Layout directly synchronized with institutional management portal (<span className="font-mono text-[11px]">ims.rec.ac.in</span>).
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-indigo-700 dark:text-indigo-300 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Theory Class
              </span>
              <span className="flex items-center gap-1.5 text-purple-700 dark:text-purple-300 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Practical Lab
              </span>
              <span className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> PPT / Training
              </span>
            </div>
          </div>

          {/* Master Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[950px]">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200">
                  <th className="p-3 w-40 sticky left-0 z-10 bg-slate-100 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700">
                    Time / Period
                  </th>
                  {DAYS.map(day => {
                    const isToday = day === currentDayOfWeek;
                    return (
                      <th 
                        key={day} 
                        className={`p-3 text-center border-r border-slate-200 dark:border-slate-700 ${
                          isToday ? 'bg-indigo-50/80 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300' : ''
                        }`}
                      >
                        <div className="font-black text-sm">{day.toUpperCase()}</div>
                        {isToday && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-600 text-white font-semibold inline-block mt-0.5">
                            Today
                          </span>
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
                {MASTER_GRID_DATA.map((row, idx) => {
                  if (row.isBreak) {
                    return (
                      <tr key={idx} className="bg-rose-50/50 dark:bg-rose-950/20">
                        <td className="p-2.5 font-bold font-mono text-[11px] text-rose-700 dark:text-rose-400 sticky left-0 z-10 bg-rose-100/70 dark:bg-slate-900 border-r border-rose-200 dark:border-slate-700">
                          {row.timeRange}
                        </td>
                        <td 
                          colSpan={6} 
                          className="p-2 text-center font-bold tracking-wider uppercase text-rose-600 dark:text-rose-400 text-xs bg-rose-50/70 dark:bg-rose-950/30"
                        >
                          <div className="flex items-center justify-center gap-1.5">
                            {row.breakLabel?.includes('LUNCH') ? (
                              <Utensils className="w-3.5 h-3.5 text-rose-500" />
                            ) : (
                              <Coffee className="w-3.5 h-3.5 text-rose-500" />
                            )}
                            <span>{row.breakLabel}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  }

                  return (
                    <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                      {/* Period Time Slot Header on Left */}
                      <td className="p-2.5 font-mono text-[11px] font-bold text-slate-800 dark:text-slate-300 sticky left-0 z-10 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 shadow-2xs">
                        <span className="text-indigo-600 dark:text-indigo-400 font-extrabold block text-xs">{row.periodLabel.split(' ')[0]}</span>
                        <span className="text-slate-500 dark:text-slate-400 text-[10px]">{row.timeRange}</span>
                      </td>

                      {/* Monday Cell */}
                      <td className="p-2 border-r border-slate-200 dark:border-slate-800 align-top">
                        {row.monday && (
                          <div className={`p-2 rounded-xl border ${getSubjectBadgeStyle(row.monday.type, row.monday.title)} space-y-1 shadow-2xs`}>
                            <div className="font-black text-xs">{row.monday.title}</div>
                            <div className="font-mono text-[10px] text-slate-600 dark:text-slate-400 flex items-center gap-1">
                              <MapPin className="w-2.5 h-2.5 shrink-0" /> {row.monday.room}
                            </div>
                            <div className="text-[10px] text-slate-700 dark:text-slate-300 font-medium truncate flex items-center gap-1">
                              <User className="w-2.5 h-2.5 shrink-0" /> {row.monday.faculty}
                            </div>
                          </div>
                        )}
                      </td>

                      {/* Tuesday Cell */}
                      <td className="p-2 border-r border-slate-200 dark:border-slate-800 align-top">
                        {row.tuesday && (
                          <div className={`p-2 rounded-xl border ${getSubjectBadgeStyle(row.tuesday.type, row.tuesday.title)} space-y-1 shadow-2xs`}>
                            <div className="font-black text-xs">{row.tuesday.title}</div>
                            <div className="font-mono text-[10px] text-slate-600 dark:text-slate-400 flex items-center gap-1">
                              <MapPin className="w-2.5 h-2.5 shrink-0" /> {row.tuesday.room}
                            </div>
                            <div className="text-[10px] text-slate-700 dark:text-slate-300 font-medium truncate flex items-center gap-1">
                              <User className="w-2.5 h-2.5 shrink-0" /> {row.tuesday.faculty}
                            </div>
                          </div>
                        )}
                      </td>

                      {/* Wednesday Cell */}
                      <td className="p-2 border-r border-slate-200 dark:border-slate-800 align-top">
                        {row.wednesday && (
                          <div className={`p-2 rounded-xl border ${getSubjectBadgeStyle(row.wednesday.type, row.wednesday.title)} space-y-1 shadow-2xs`}>
                            <div className="font-black text-xs">{row.wednesday.title}</div>
                            <div className="font-mono text-[10px] text-slate-600 dark:text-slate-400 flex items-center gap-1">
                              <MapPin className="w-2.5 h-2.5 shrink-0" /> {row.wednesday.room}
                            </div>
                            <div className="text-[10px] text-slate-700 dark:text-slate-300 font-medium truncate flex items-center gap-1">
                              <User className="w-2.5 h-2.5 shrink-0" /> {row.wednesday.faculty}
                            </div>
                          </div>
                        )}
                      </td>

                      {/* Thursday Cell (Handles Sub-Batches GR1 & GR2) */}
                      <td className="p-2 border-r border-slate-200 dark:border-slate-800 align-top">
                        {row.thursday?.subBatches ? (
                          <div className="space-y-1.5">
                            {row.thursday.subBatches
                              .filter(sb => selectedBatch === 'ALL' || sb.batch === selectedBatch)
                              .map((sb, sidx) => (
                                <div key={sidx} className={`p-1.5 rounded-lg border ${getSubjectBadgeStyle('lab', sb.title)} text-[10px]`}>
                                  <div className="font-black text-[11px]">{sb.title}</div>
                                  <div className="font-mono text-[9px] text-slate-600 dark:text-slate-400">{sb.room}</div>
                                  <div className="text-[9px] text-slate-700 dark:text-slate-300 truncate">{sb.faculty}</div>
                                </div>
                              ))}
                          </div>
                        ) : (
                          row.thursday && (
                            <div className={`p-2 rounded-xl border ${getSubjectBadgeStyle(row.thursday.type, row.thursday.title)} space-y-1 shadow-2xs`}>
                              <div className="font-black text-xs">{row.thursday.title}</div>
                              <div className="font-mono text-[10px] text-slate-600 dark:text-slate-400 flex items-center gap-1">
                                <MapPin className="w-2.5 h-2.5 shrink-0" /> {row.thursday.room}
                              </div>
                              <div className="text-[10px] text-slate-700 dark:text-slate-300 font-medium truncate flex items-center gap-1">
                                <User className="w-2.5 h-2.5 shrink-0" /> {row.thursday.faculty}
                              </div>
                            </div>
                          )
                        )}
                      </td>

                      {/* Friday Cell (Handles Sub-Batches GR1 & GR2) */}
                      <td className="p-2 border-r border-slate-200 dark:border-slate-800 align-top">
                        {row.friday?.subBatches ? (
                          <div className="space-y-1.5">
                            {row.friday.subBatches
                              .filter(sb => selectedBatch === 'ALL' || sb.batch === selectedBatch)
                              .map((sb, sidx) => (
                                <div key={sidx} className={`p-1.5 rounded-lg border ${getSubjectBadgeStyle('lab', sb.title)} text-[10px]`}>
                                  <div className="font-black text-[11px]">{sb.title}</div>
                                  <div className="font-mono text-[9px] text-slate-600 dark:text-slate-400">{sb.room}</div>
                                  <div className="text-[9px] text-slate-700 dark:text-slate-300 truncate">{sb.faculty}</div>
                                </div>
                              ))}
                          </div>
                        ) : (
                          row.friday && (
                            <div className={`p-2 rounded-xl border ${getSubjectBadgeStyle(row.friday.type, row.friday.title)} space-y-1 shadow-2xs`}>
                              <div className="font-black text-xs">{row.friday.title}</div>
                              <div className="font-mono text-[10px] text-slate-600 dark:text-slate-400 flex items-center gap-1">
                                <MapPin className="w-2.5 h-2.5 shrink-0" /> {row.friday.room}
                              </div>
                              <div className="text-[10px] text-slate-700 dark:text-slate-300 font-medium truncate flex items-center gap-1">
                                <User className="w-2.5 h-2.5 shrink-0" /> {row.friday.faculty}
                              </div>
                            </div>
                          )
                        )}
                      </td>

                      {/* Saturday Cell */}
                      <td className="p-2 align-top">
                        {row.saturday && (
                          <div className={`p-2 rounded-xl border ${getSubjectBadgeStyle(row.saturday.type, row.saturday.title)} space-y-1 shadow-2xs`}>
                            <div className="font-black text-xs">{row.saturday.title}</div>
                            <div className="font-mono text-[10px] text-slate-600 dark:text-slate-400 flex items-center gap-1">
                              <MapPin className="w-2.5 h-2.5 shrink-0" /> {row.saturday.room}
                            </div>
                            <div className="text-[10px] text-slate-700 dark:text-slate-300 font-medium truncate flex items-center gap-1">
                              <User className="w-2.5 h-2.5 shrink-0" /> {row.saturday.faculty}
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. VIEW 2: DAY-BY-DAY AGENDA TIMELINE */}
      {/* ========================================================================= */}
      {viewMode === 'agenda' && (
        <div className="space-y-4">
          {/* Day Selector Navigation Pills */}
          <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
            {DAYS.map(day => {
              const isToday = day === currentDayOfWeek;
              const isSelected = selectedDay === day;
              const classesCount = STUDENT_TIMETABLE.filter(s => s.day === day).length;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span>{day}</span>
                  {isToday && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${isSelected ? 'bg-white text-indigo-700' : 'bg-indigo-100 text-indigo-800'}`}>
                      Today
                    </span>
                  )}
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>
                    {classesCount}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Agenda Session Cards */}
          <div className="space-y-3">
            {filteredDaySchedule.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-6 space-y-2">
                <Calendar className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
                <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300">No scheduled classroom sessions match your filter.</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Try clearing the search query or setting the batch filter to "All Batches".
                </p>
              </div>
            ) : (
              filteredDaySchedule.map(slot => (
                <div 
                  key={slot.id} 
                  className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2 grow">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/80 px-2.5 py-0.5 rounded-lg border border-indigo-200 dark:border-indigo-800">
                        {slot.courseCode}
                      </span>

                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                        slot.type === 'Lab'
                          ? 'bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                          : slot.type === 'Training'
                          ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                          : 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                      }`}>
                        {slot.type}
                      </span>

                      {slot.batch && slot.batch !== 'ALL' && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                          Batch: {slot.batch}
                        </span>
                      )}

                      {slot.periodNumber && (
                        <span className="text-[11px] font-mono text-slate-400 font-semibold">
                          ({slot.periodNumber})
                        </span>
                      )}
                    </div>

                    <h4 className="font-black text-base text-slate-900 dark:text-white">
                      {slot.courseName}
                    </h4>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-600 dark:text-slate-400 pt-1">
                      <span className="flex items-center gap-1.5 font-medium">
                        <User className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Faculty: <strong className="text-slate-800 dark:text-slate-200">{slot.instructor}</strong></span>
                      </span>

                      <span className="flex items-center gap-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        <span>Location: <strong className="text-slate-800 dark:text-slate-200 font-mono">{slot.room}</strong></span>
                      </span>

                      {slot.notes && (
                        <span className="text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded text-[11px]">
                          💡 {slot.notes}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center space-x-3 self-end md:self-center">
                    <div className="bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Class Timing</span>
                      <div className="flex items-center space-x-1.5 font-mono text-xs font-bold text-slate-900 dark:text-white">
                        <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                        <span>{slot.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MODAL: SUBJECT & FACULTY DIRECTORY */}
      {/* ========================================================================= */}
      {showSubjectDirectory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 max-h-[90vh] flex flex-col text-slate-800 dark:text-slate-100">
            {/* Header */}
            <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-start justify-between shrink-0">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full inline-block mb-1">
                  Academic Directory • Semester 3
                </span>
                <h3 className="text-xl font-extrabold text-white">
                  Courses, Faculty Members & Laboratory Hubs
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Complete official mapping of course codes, professors, and designated campus rooms.
                </p>
              </div>
              <button
                onClick={() => setShowSubjectDirectory(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="p-6 overflow-y-auto space-y-3 divide-y divide-slate-100 dark:divide-slate-800">
              {TIMETABLE_SUBJECTS_DIRECTORY.map((sub, idx) => (
                <div key={idx} className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded">
                        {sub.code}
                      </span>
                      <span className="font-black text-xs text-slate-800 dark:text-slate-200">
                        {sub.shortName}
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                        sub.type === 'Lab' 
                          ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300'
                          : sub.type === 'Training'
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                          : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                      }`}>
                        {sub.type}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      {sub.fullName}
                    </h4>

                    <div className="flex flex-wrap items-center gap-x-4 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1 font-medium">
                        <User className="w-3.5 h-3.5 text-indigo-500" /> {sub.instructor}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" /> {sub.room}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setShowSubjectDirectory(false)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Close Directory
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
