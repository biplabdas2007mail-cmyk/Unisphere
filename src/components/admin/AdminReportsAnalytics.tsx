import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  FileSpreadsheet, 
  Printer, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Building, 
  Calendar,
  Sparkles
} from 'lucide-react';

export const AdminReportsAnalytics: React.FC = () => {
  const { tickets, outpasses, facilities, certificates } = useCampus();
  const [dateRange, setDateRange] = useState('Current Academic Semester (Autumn 2026)');

  // Analytics derivations
  const totalTickets = tickets.length;
  const resolvedTickets = tickets.filter(t => t.status === 'Resolved').length;
  const resolutionRate = totalTickets > 0 ? ((resolvedTickets / totalTickets) * 100).toFixed(1) : '0';

  const totalOutpasses = outpasses.length;
  const approvedOutpasses = outpasses.filter(o => o.status === 'Approved').length;

  const handleExportCSV = (reportName: string) => {
    alert(`Generating and downloading ${reportName} (CSV)...`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-rose-950 to-indigo-950 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20">
            <BarChart3 className="w-6 h-6 text-rose-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight">
                Institutional Analytics & Executive Reports
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/30 text-rose-200 border border-rose-400/30">
                Criterion 6 • 📊 Dashboard & Analytics
              </span>
            </div>
            <p className="text-xs text-rose-200/90 mt-1 max-w-xl">
              Attendance compliance heatmaps, academic performance distributions, resource utilization, and gate SLA logs.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={() => handleExportCSV('Executive_Campus_Compliance_Summary_2026.csv')}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Executive Digest</span>
          </button>
        </div>
      </div>

      {/* 4 Executive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Attendance Compliance</div>
          <div className="text-2xl font-black text-slate-900">83.5% Aggregate</div>
          <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>92% Students above 75% UGC cutoff</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Average Campus CGPA</div>
          <div className="text-2xl font-black text-indigo-700">8.42 / 10.0</div>
          <div className="text-[11px] text-slate-500">
            Top Department: CSE (8.65 Mean)
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Grievance SLA Resolution</div>
          <div className="text-2xl font-black text-emerald-700">{resolutionRate}%</div>
          <div className="text-[11px] text-slate-500">
            Avg Turnaround: 2.1 Hours (Target: &lt; 4h)
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gate Clearance Volume</div>
          <div className="text-2xl font-black text-slate-900">{totalOutpasses} Outpasses</div>
          <div className="text-[11px] text-emerald-700 font-semibold">
            {approvedOutpasses} Dynamic QR Scans Verified
          </div>
        </div>
      </div>

      {/* Attendance & Performance Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Attendance Breakdown by Department */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">Attendance Statistics by Department</h4>
              <p className="text-xs text-slate-500">UGC/NAAC 75% threshold monitoring</p>
            </div>
            <span className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[10px] font-extrabold">
              Autumn 2026
            </span>
          </div>

          <div className="space-y-3">
            {[
              { dept: 'Computer Science & Engineering', avg: 85.2, safePct: 94, students: 480 },
              { dept: 'Electronics & Communication', avg: 82.8, safePct: 89, students: 360 },
              { dept: 'Mechanical Engineering', avg: 79.4, safePct: 83, students: 240 },
              { dept: 'Civil Engineering', avg: 81.6, safePct: 88, students: 180 },
            ].map((row, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{row.dept}</span>
                  <span className="font-black text-slate-900">{row.avg}% Avg</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-indigo-600"
                    style={{ width: `${row.avg}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>{row.students} Scholars Registered</span>
                  <span className="text-emerald-700 font-semibold">{row.safePct}% Above Cutoff</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Facility & Resource Statistics */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">Campus Facility Utilization</h4>
              <p className="text-xs text-slate-500">Lab, hall, and library telemetry</p>
            </div>
            <span className="px-2 py-1 rounded-lg bg-indigo-50 text-indigo-800 text-[10px] font-extrabold">
              Live Feed
            </span>
          </div>

          <div className="space-y-3">
            {[
              { space: 'Gita Govinda Central Library', utilization: 74.6, status: '122 Seats Open', color: 'bg-cyan-500' },
              { space: 'High-Performance Computing Cluster', utilization: 88.0, status: 'Peak Compute Load', color: 'bg-indigo-600' },
              { space: 'Robotics & IoT Sandbox', utilization: 62.5, status: 'Slots Available', color: 'bg-emerald-500' },
              { space: 'Tagore Memorial Auditorium', utilization: 45.0, status: 'Event Ready', color: 'bg-amber-500' },
            ].map((res, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{res.space}</span>
                  <span className="font-black text-slate-900">{res.utilization}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${res.color}`}
                    style={{ width: `${res.utilization}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-500 flex items-center justify-between">
                  <span>Status: {res.status}</span>
                  <span>Sensor Polled: 30s ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Downloadable Reports Catalog */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
        <h4 className="font-extrabold text-sm text-slate-900">
          Executive Compliance & Inspection Download Suite
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { title: 'NAAC / NBA Attendance Audit Sheet', type: 'Official XLSX', desc: 'Subject-wise biometric registers with faculty approvals' },
            { title: 'Campus Security & Gate Log Register', type: 'Encrypted CSV', desc: 'All student outpass departures & curfew timestamps' },
            { title: 'Grievance SLA & Redressal Report', type: 'Executive PDF', desc: 'Departmental resolution metrics and technician SLA scores' }
          ].map((rpt, idx) => (
            <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                  {rpt.type}
                </span>
                <h5 className="font-bold text-xs text-slate-900 mt-2">{rpt.title}</h5>
                <p className="text-[11px] text-slate-500 mt-1">{rpt.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => handleExportCSV(rpt.title)}
                className="w-full py-1.5 rounded-lg bg-white hover:bg-indigo-50 hover:text-indigo-900 border border-slate-300 text-xs font-bold text-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Report</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
