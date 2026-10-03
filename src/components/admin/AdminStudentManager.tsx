import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { MANAGED_STUDENTS } from '../../data/mockData';
import { ManagedStudent } from '../../types';
import { 
  Users, 
  Search, 
  Filter, 
  ShieldAlert, 
  ShieldCheck, 
  GraduationCap, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Unlock,
  Building,
  ArrowUpDown
} from 'lucide-react';

export const AdminStudentManager: React.FC = () => {
  const { certificates, reviewCertificate } = useCampus();
  const [students, setStudents] = useState<ManagedStudent[]>(MANAGED_STUDENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [activeSubTab, setActiveSubTab] = useState<'directory' | 'approvals'>('directory');
  const [toastMessage, setToastMessage] = useState('');

  const toggleHold = (studentId: string) => {
    setStudents(prev => prev.map(s => {
      if (s.id !== studentId && s.rollNo !== studentId) return s;
      const nextHold = !s.disciplinaryHold;
      setToastMessage(
        nextHold 
          ? `Disciplinary lock placed on ${s.name} (${s.rollNo}). Gate outpasses suspended.`
          : `Disciplinary clearance restored for ${s.name} (${s.rollNo}).`
      );
      setTimeout(() => setToastMessage(''), 4000);
      return { ...s, disciplinaryHold: nextHold };
    }));
  };

  const filteredStudents = students.filter(s => {
    const matchesQuery = 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.roomNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBranch = selectedBranch === 'all' || s.branch.toLowerCase().includes(selectedBranch.toLowerCase());
    return matchesQuery && matchesBranch;
  });


  const pendingCerts = certificates.filter(c => c.status === 'Pending');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast */}
      {toastMessage && (
        <div className="p-3 bg-slate-900 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-violet-950 via-slate-900 to-indigo-950 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20">
            <Users className="w-6 h-6 text-violet-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight">
                Student Administration & Institutional Approvals
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-500/30 text-violet-200 border border-violet-400/30">
                Criterion 5 • 👨💼 Administrator Tools
              </span>
            </div>
            <p className="text-xs text-violet-200/90 mt-1 max-w-xl">
              Student master registry, disciplinary hold controls, attendance threshold compliance, and official certificate authorizations.
            </p>
          </div>
        </div>

        {/* Quick approval badge counter */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('approvals')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'approvals' 
                ? 'bg-amber-400 text-slate-950 shadow-md' 
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Pending Approvals Queue</span>
            {pendingCerts.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-rose-500 text-white">
                {pendingCerts.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('directory')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'directory'
              ? 'bg-violet-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Student Directory & Academic Holds ({students.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('approvals')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'approvals'
              ? 'bg-violet-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Certificate Approvals ({pendingCerts.length} Pending)</span>
        </button>
      </div>

      {/* 1. DIRECTORY SUB-TAB */}
      {activeSubTab === 'directory' && (
        <div className="space-y-4">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by student name, roll number (e.g. 2023CS1082), or room..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl border border-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="all">All Departments</option>
                <option value="Computer Science">Computer Science & Eng</option>
                <option value="Electronics">Electronics & Comm</option>
                <option value="Mechanical">Mechanical Engineering</option>
                <option value="Civil">Civil Engineering</option>
              </select>
            </div>
          </div>

          {/* Students Master Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Student Roll & Name</th>
                  <th className="py-3 px-4">Department & Year</th>
                  <th className="py-3 px-4">Hostel / Room</th>
                  <th className="py-3 px-4 text-center">Attendance %</th>
                  <th className="py-3 px-4 text-center">CGPA</th>
                  <th className="py-3 px-4 text-center">Disciplinary Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredStudents.map((s) => {
                  const isAttendanceLow = s.attendanceRate < 75;
                  return (
                    <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 text-xs">{s.name}</div>
                        <div className="text-[10px] font-mono text-slate-500">{s.rollNo}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-slate-800 font-semibold">{s.branch}</div>
                        <div className="text-[10px] text-slate-500">{s.year}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-slate-800">{s.hostelBlock}</div>
                        <div className="text-[10px] text-slate-500">Room {s.roomNo}</div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          isAttendanceLow 
                            ? 'bg-rose-100 text-rose-800' 
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {s.attendanceRate}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="font-black text-slate-900">{s.cgpa.toFixed(2)}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {s.disciplinaryHold ? (
                          <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-rose-100 text-rose-800 flex items-center gap-1 justify-center">
                            <Lock className="w-3 h-3" /> Gate Hold Active
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 text-emerald-800 flex items-center gap-1 justify-center">
                            <CheckCircle2 className="w-3 h-3" /> Good Standing
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => toggleHold(s.id)}
                          className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                            s.disciplinaryHold
                              ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300'
                              : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-300'
                          }`}
                        >
                          {s.disciplinaryHold ? 'Lift Hold' : 'Place Hold'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. APPROVALS SUB-TAB */}
      {activeSubTab === 'approvals' && (
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-sm text-slate-900">
              Institutional Digital Certificate Authorizations
            </h4>
            <p className="text-xs text-slate-500">
              Verify student eligibility, generate dynamic digital signature stamps, and dispatch verified PDFs to student portals.
            </p>
          </div>

          <div className="divide-y divide-slate-100 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {certificates.map((cert) => {
              const isPending = cert.status === 'Pending';
              return (
                <div key={cert.id} className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                        {cert.id}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        cert.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : cert.status === 'Rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {cert.status}
                      </span>
                      <span className="text-xs text-slate-400">• Applied {cert.appliedAt}</span>
                    </div>

                    <h5 className="font-bold text-sm text-slate-900">
                      {cert.certificateType} — <span className="text-violet-700">{cert.studentName}</span> ({cert.studentId})
                    </h5>
                    <p className="text-xs text-slate-600">
                      <strong className="text-slate-700">Department:</strong> {cert.department} • <strong className="text-slate-700">Purpose:</strong> {cert.purpose}
                    </p>
                    {cert.approvedBy && (
                      <div className="text-[11px] text-emerald-700 font-medium">
                        Approved by {cert.approvedBy} on {cert.approvedAt}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="shrink-0 flex items-center gap-2 self-end md:self-center">
                    {isPending ? (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            reviewCertificate(cert.id, 'Rejected', 'Dean of Academic Affairs', 'Incomplete passport office requirement details');
                            setToastMessage(`Certificate request ${cert.id} was rejected with reason.`);
                            setTimeout(() => setToastMessage(''), 4000);
                          }}
                          className="px-3 py-1.5 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-all cursor-pointer"
                        >
                          Reject
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            reviewCertificate(cert.id, 'Approved', 'Dean of Academic Affairs');
                            setToastMessage(`Certificate ${cert.id} for ${cert.studentName} approved & digitally signed!`);
                            setTimeout(() => setToastMessage(''), 4000);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Approve & Sign</span>
                        </button>
                      </>
                    ) : (
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
                        Processing Complete
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
