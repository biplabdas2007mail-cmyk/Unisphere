import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { StudentAttendanceVisualization } from './StudentAttendanceVisualization';
import { 
  GraduationCap, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Upload, 
  Download, 
  Calendar, 
  Award, 
  BookOpen, 
  ArrowUpRight,
  Sparkles,
  Info,
  Check,
  FileCheck
} from 'lucide-react';

export const StudentAcademicTab: React.FC = () => {
  const { attendance, assignments, submitAssignment, language } = useCampus();
  const [selectedSubTab, setSelectedSubTab] = useState<'attendance' | 'assignments' | 'academics'>('attendance');
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [submissionFile, setSubmissionFile] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string>('');

  // Overall attendance calculation
  const totalAttended = attendance.reduce((acc, curr) => acc + curr.attended, 0);
  const totalHeld = attendance.reduce((acc, curr) => acc + curr.totalClasses, 0);
  const aggregatePercentage = totalHeld > 0 ? ((totalAttended / totalHeld) * 100).toFixed(1) : '0.0';

  const handleSimulateSubmit = (assignmentId: string) => {
    const fileName = submissionFile.trim() || `Aarav_Mohapatra_${assignmentId}_Solution.pdf`;
    submitAssignment(assignmentId, fileName);
    setSubmittingId(null);
    setSubmissionFile('');
    setToastMessage(
      language === 'odia_mix'
        ? 'Assignment ସଫଳତାର ସହ ଜମା କରାଗଲା! ପ୍ରଫେସରଙ୍କ ଯାଞ୍ଚ ପାଇଁ ପଠାଗଲା।'
        : language === 'odia'
        ? 'ଆସାଇନମେଣ୍ଟ ସଫଳତାର ସହ ଦାଖଲ ହେଲା! ମୂଲ୍ୟାୟନ ପାଇଁ ପଠାଗଲା।'
        : language === 'hi'
        ? 'असाइनमेंट सफलतापूर्वक जमा किया गया! मूल्यांकन हेतु शिक्षक को भेजा गया।'
        : 'Assignment submitted successfully! Uploaded for faculty evaluation.'
    );
    setTimeout(() => setToastMessage(''), 4500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast notification */}
      {toastMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20">
            <GraduationCap className="w-6 h-6 text-indigo-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight">
                {language === 'odia_mix'
                  ? 'ଶିକ୍ଷାଗତ ସହାୟତା ଓ ପ୍ରଗତି (Academic Hub)'
                  : language === 'odia'
                  ? 'ଶିକ୍ଷାଗତ ସହାୟତା ଏବଂ ଉପସ୍ଥିତି ପୋର୍ଟାଲ'
                  : language === 'hi'
                  ? 'शैक्षणिक सहायता और उपस्थिति पोर्टल'
                  : 'Academic Support & Attendance Portal'}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                Criterion 1 • 🎓 Student Support
              </span>
            </div>
            <p className="text-xs text-indigo-200/90 mt-1 max-w-xl">
              {language === 'odia_mix'
                ? 'Course ଅନୁସାରେ Attendance, 75% UGC/NAAC ନିୟମ, Assignment ଜମା ଏବଂ ସେମିଷ୍ଟାର ପରୀକ୍ଷା ସୂଚୀ।'
                : language === 'odia'
                ? 'ପାଠ୍ୟକ୍ରମ ଅନୁସାରେ ଉପସ୍ଥିତି, ବାଧ୍ୟତାମୂଳକ ୭୫% ୟୁଜିସି ନିୟମ, ଆସାଇନମେଣ୍ଟ ଦାଖଲ ଏବଂ ସେମିଷ୍ଟାର ପରୀକ୍ଷା ସମୟସାରଣୀ।'
                : language === 'hi'
                ? 'पाठ्यक्रम अनुसार उपस्थिति, अनिवार्य 75% यूजीसी/नैक नियम अनुपालन, असाइनमेंट जमा एवं सेमेस्टर परीक्षा समय-सारणी।'
                : 'Course-wise biometric attendance, mandatory 75% UGC/NAAC compliance safeguards, assignment workflows, and semester exam timetables.'}
            </p>
          </div>
        </div>

        {/* Quick KPI stats */}
        <div className="flex items-center gap-3 bg-white/10 px-4 py-2.5 rounded-xl border border-white/10 shrink-0">
          <div>
            <div className="text-[10px] uppercase font-bold text-indigo-200">
              {language === 'hi' ? 'कुल उपस्थिति' : language === 'odia' ? 'ସମୁଦାୟ ଉପସ୍ଥିତି' : language === 'odia_mix' ? 'Overall Attendance' : 'Overall Attendance'}
            </div>
            <div className="text-xl font-black text-emerald-300">{aggregatePercentage}%</div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div>
            <div className="text-[10px] uppercase font-bold text-indigo-200">CGPA (Sem 1-4)</div>
            <div className="text-xl font-black text-amber-300">8.65</div>
          </div>
        </div>
      </div>

      {/* Sub Tab Switcher */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setSelectedSubTab('attendance')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            selectedSubTab === 'attendance'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>
            {language === 'hi'
              ? 'पाठ्यक्रम उपस्थिति'
              : language === 'odia'
              ? 'ପାଠ୍ୟକ୍ରମ ଉପସ୍ଥିତି'
              : language === 'odia_mix'
              ? 'Course Attendance'
              : 'Course Attendance'} ({aggregatePercentage}%)
          </span>
        </button>

        <button
          onClick={() => setSelectedSubTab('assignments')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            selectedSubTab === 'assignments'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>
            {language === 'hi'
              ? 'असाइनमेंट एवं नियत तिथियां'
              : language === 'odia'
              ? 'ଆସାଇନମେଣ୍ଟ ଓ ନିର୍ଦ୍ଧାରିତ ତାରିଖ'
              : language === 'odia_mix'
              ? 'Assignments & Deadlines'
              : 'Assignments & Deadlines'}
          </span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-extrabold">
            {assignments.filter(a => a.status === 'Pending').length} {language === 'hi' ? 'शेष' : language === 'odia' ? 'ବାକି' : 'Pending'}
          </span>
        </button>

        <button
          onClick={() => setSelectedSubTab('academics')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            selectedSubTab === 'academics'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>
            {language === 'hi'
              ? 'शैक्षणिक सूचना एवं अंकतालिका'
              : language === 'odia'
              ? 'ଶିକ୍ଷାଗତ ସୂଚନା ଓ ଟ୍ରାନ୍ସକ୍ରିପ୍ଟ'
              : language === 'odia_mix'
              ? 'Academic Info & Transcripts'
              : 'Academic Information & Transcripts'}
          </span>
        </button>
      </div>

      {/* 1. ATTENDANCE SUB-TAB */}
      {selectedSubTab === 'attendance' && (
        <div className="space-y-6">
          {/* Threshold Advisory Alert */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/90 dark:border-amber-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-900 dark:text-amber-200">
            <div className="flex items-start space-x-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">75% Mandatory Attendance Safeguard (NAAC/UGC Rule):</span> Students with attendance under 75% require Dean clearance to appear in final end-semester examinations.
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700/80 font-bold text-[11px] text-amber-800 dark:text-amber-300 shrink-0">
              1 Course Under Caution
            </span>
          </div>

          {/* Daily Attendance Progress Bar & Monthly Trend Visualization */}
          <StudentAttendanceVisualization />

          {/* Courses Attendance Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {attendance.map((c) => {
              const isLow = c.percentage < c.minRequired;
              return (
                <div 
                  key={c.code}
                  className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border shadow-xs transition-all ${
                    isLow 
                      ? 'border-amber-300 dark:border-amber-700/80 ring-1 ring-amber-400/30' 
                      : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-600'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {c.code}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isLow 
                            ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300' 
                            : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                        }`}>
                          {isLow ? 'Action Needed' : 'Safe Margin'}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mt-1">{c.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{c.instructor}</p>
                    </div>

                    <div className="text-right">
                      <div className={`text-2xl font-black ${isLow ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'}`}>
                        {c.percentage}%
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                        {c.attended} / {c.totalClasses} Classes
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3">
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          isLow ? 'bg-amber-500' : 'bg-indigo-600 dark:bg-indigo-500'
                        }`}
                        style={{ width: `${Math.min(100, c.percentage)}%` }}
                      />
                    </div>
                  </div>

                  {/* Safe bunks / needed calculations */}
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] flex-wrap gap-1">
                    {isLow ? (
                      <span className="text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                        Attend next {c.classesNeededFor75} classes consecutively to cross 75%
                      </span>
                    ) : (
                      <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        Can miss {c.safeBunks} more classes safely without dipping under 75%
                      </span>
                    )}
                    <span className="text-slate-400 dark:text-slate-500 text-[10px]">{c.lastUpdated}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. ASSIGNMENTS SUB-TAB */}
      {selectedSubTab === 'assignments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Current Semester Assignments & Submissions</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Track deadlines, upload verified solution scripts, and inspect instructor grading remarks.</p>
            </div>
          </div>

          <div className="space-y-3">
            {assignments.map((asg) => (
              <div 
                key={asg.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-200 dark:hover:border-indigo-700 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/60">
                      {asg.courseCode}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{asg.courseName}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      asg.status === 'Graded'
                        ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                        : asg.status === 'Submitted'
                        ? 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300'
                        : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300'
                    }`}>
                      {asg.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{asg.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-0.5 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Due: {asg.dueDate}
                    </span>
                    <span>Max Marks: {asg.maxMarks}</span>
                    {asg.submittedDate && (
                      <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                        Submitted on: {asg.submittedDate}
                      </span>
                    )}
                  </div>

                  {/* Feedback if graded */}
                  {asg.status === 'Graded' && asg.feedback && (
                    <div className="mt-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
                      <span className="font-bold text-emerald-800 dark:text-emerald-300">Faculty Feedback ({asg.marksAwarded}/{asg.maxMarks} Marks): </span>
                      {asg.feedback}
                    </div>
                  )}
                </div>

                {/* Submission Action */}
                <div className="shrink-0 flex items-center gap-2 self-end md:self-center">
                  {asg.status === 'Pending' ? (
                    <button
                      type="button"
                      onClick={() => setSubmittingId(asg.id)}
                      className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Submit Solution</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-700">
                      <FileCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>{asg.attachmentName || 'Verified Upload'}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. ACADEMICS & TRANSCRIPTS SUB-TAB */}
      {selectedSubTab === 'academics' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Cumulative GPA</div>
              <div className="text-3xl font-black text-indigo-700 dark:text-indigo-400 mt-1">8.65</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">First Class with Distinction (Rank: Top 5%)</div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Earned Credits</div>
              <div className="text-3xl font-black text-emerald-700 dark:text-emerald-400 mt-1">112 / 160</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">70% Degree Completion on Track</div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Upcoming Mid-Sem</div>
              <div className="text-3xl font-black text-amber-600 dark:text-amber-400 mt-1">Oct 14</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Venue: Ramanujan Hall 301-304</div>
            </div>
          </div>

          {/* Academic Notices & Circulars */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Official Academic Notices & Downloads</span>
            </h4>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              <div className="py-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    B.Tech CSE 5th Semester Curriculum & Grading Scheme (2026-27)
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Issued by Academic Senate • 2.4 MB PDF</div>
                </div>
                <button 
                  onClick={() => alert('Downloading official curriculum syllabus...')}
                  className="p-2 rounded-xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800 border border-indigo-200 dark:border-indigo-800 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>

              <div className="py-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    End-Semester Examination Rules & Scientific Calculator Regulations
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Controller of Examinations • Official Circular #COE/2026/89</div>
                </div>
                <button 
                  onClick={() => alert('Downloading examination guidelines...')}
                  className="p-2 rounded-xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800 border border-indigo-200 dark:border-indigo-800 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assignment Submission Modal */}
      {submittingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Upload Assignment Submission</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">File will be digitally time-stamped and logged under your Student ID.</p>
              </div>
              <button 
                onClick={() => setSubmittingId(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Submission File Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Aarav_Mohapatra_Algorithms_Assignment.pdf"
                  value={submissionFile}
                  onChange={(e) => setSubmissionFile(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="p-4 border-2 border-dashed border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-xl text-center space-y-1.5 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-950/50">
                <Upload className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mx-auto" />
                <div className="text-xs font-bold text-indigo-950 dark:text-indigo-200">Drag & Drop code files, PDF, or ZIP</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Accepted: .pdf, .zip, .py, .cpp, .java (Max 25 MB)</div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setSubmittingId(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSimulateSubmit(submittingId)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Confirm & Turn In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
