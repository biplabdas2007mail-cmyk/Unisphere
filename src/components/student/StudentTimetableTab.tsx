import React, { useState } from 'react';
import { STUDENT_TIMETABLE } from '../../data/mockData';
import { Calendar, Clock, MapPin, User, BookOpen, Sparkles } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;

export const StudentTimetableTab: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<typeof DAYS[number]>('Monday');

  const daySchedule = STUDENT_TIMETABLE.filter(s => s.day === selectedDay);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-4 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-indigo-950 dark:text-indigo-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Digital Academic Synchronizer (PS07 Pillar #5)
          </h3>
          <p className="text-xs text-indigo-800/80 dark:text-indigo-300/80 mt-0.5">
            Real-time classroom hall numbers, instructor contacts, and lecture schedules right on your dashboard.
          </p>
        </div>
      </div>

      {/* Day Selector */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        {DAYS.map(day => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedDay === day
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule Slots */}
      <div className="space-y-3">
        {daySchedule.length === 0 ? (
          <div className="text-center py-10 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 p-4">
            <Calendar className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
            <p className="text-xs text-slate-500 dark:text-slate-400">No scheduled lectures for {selectedDay}. Enjoy research and study hours!</p>
          </div>
        ) : (
          daySchedule.map(slot => (
            <div key={slot.id} className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/70 px-2 py-0.5 rounded border border-indigo-100 dark:border-indigo-900/60">
                    {slot.courseCode}
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                    slot.type === 'Lab' 
                      ? 'bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300' 
                      : 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300'
                  }`}>
                    {slot.type}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{slot.courseName}</h4>
                <div className="flex flex-wrap items-center gap-x-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-slate-400" /> {slot.instructor}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {slot.room}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 font-mono text-xs font-semibold bg-slate-50 dark:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700 shrink-0 self-start sm:self-auto">
                <Clock className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                <span>{slot.time}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
