import React, { useState } from 'react';
import { PS07_PILLARS } from '../data/mockData';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  GraduationCap, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Layers, 
  TrendingUp,
  Cpu
} from 'lucide-react';

interface PS07OverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PS07OverviewModal: React.FC<PS07OverviewModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'comparison' | 'metrics'>('comparison');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-start justify-between shrink-0">
          <div>
            <div className="flex items-center space-x-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30">
                Problem Statement ID: PS07
              </span>
              <span className="text-xs text-indigo-200">• Smart India Hackathon / Campus Tech Initiative</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              How Can Technology Simplify Everyday Campus Life?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              An architectural breakdown of how unified digital workflows eliminate administrative friction, paper logbooks, and communication barriers for students and university staff.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-6 border-b border-slate-200 bg-slate-50 flex space-x-4 shrink-0">
          <button
            onClick={() => setActiveTab('comparison')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center space-x-2 ${
              activeTab === 'comparison'
                ? 'border-indigo-600 text-indigo-950'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Problem vs. Smart Solution (5 Pillars)</span>
          </button>
          
          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center space-x-2 ${
              activeTab === 'architecture'
                ? 'border-indigo-600 text-indigo-950'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Dual-Role Tech System</span>
          </button>

          <button
            onClick={() => setActiveTab('metrics')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center space-x-2 ${
              activeTab === 'metrics'
                ? 'border-indigo-600 text-indigo-950'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Operational ROI & Impact</span>
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800">
          {activeTab === 'comparison' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                Traditional campus environments suffer from high paperwork latency, lost requests, and fragmented departments. Here is how technology re-engineers each touchpoint:
              </p>

              <div className="grid grid-cols-1 gap-4">
                {PS07_PILLARS.map((pillar, idx) => (
                  <div key={pillar.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 font-bold text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h3 className="font-bold text-sm text-slate-900">{pillar.title}</h3>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mt-2">
                      <div className="p-3 rounded-lg bg-rose-50/60 border border-rose-200/80">
                        <div className="font-bold text-rose-900 mb-1 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-rose-500" />
                          Before: The Paper & Physical Hassle
                        </div>
                        <p className="text-rose-950/80 leading-relaxed">{pillar.traditional}</p>
                      </div>

                      <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200/80">
                        <div className="font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          After: The Digital Campus Solution
                        </div>
                        <p className="text-emerald-950/80 leading-relaxed">{pillar.solution}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-200/60 text-[11px]">
                      <div className="flex items-center space-x-1.5 text-slate-700">
                        <GraduationCap className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span><strong>Student Benefit:</strong> {pillar.studentImpact}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-slate-700">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span><strong>Admin Benefit:</strong> {pillar.adminImpact}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50">
                  <div className="flex items-center space-x-2 text-indigo-900 font-bold mb-3">
                    <GraduationCap className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-sm">Student Experience Layer</h3>
                  </div>
                  <ul className="space-y-2 text-xs text-indigo-950/90">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <span><strong>Digital Identity & Outpass:</strong> Generate verifiable gate QR passes without physically tracking down wardens.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <span><strong>One-Tap Grievance Dispatch:</strong> Report hostel maintenance or WiFi issues directly to responsible teams with live SLAs.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <span><strong>Smart Resource Booking:</strong> Book labs, seminar halls, and study spaces in 10 seconds.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <span><strong>Everyday Amenities:</strong> View today’s dining hall meals, crowd capacity levels, and academic schedule.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
                  <div className="flex items-center space-x-2 text-slate-900 font-bold mb-3">
                    <ShieldCheck className="w-5 h-5 text-indigo-700" />
                    <h3 className="text-sm">Administrator Operations Control</h3>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Live Headcount & Security:</strong> Complete real-time audit log of resident students currently on or off campus.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Automated Ticket Dispatch:</strong> Assign electrical and plumbing tickets directly to field staff with progress auditing.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Conflict-Free Hall Scheduling:</strong> Prevent double-booked auditoriums and review student club requests.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Instant Emergency Broadcasts:</strong> Push critical campus advisories without relying on noisy chat channels.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 text-white text-xs">
                <h4 className="font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Synchronized Two-Way Ecosystem
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  In this application, actions taken in the Student Portal (e.g., submitting a grievance or outpass) immediately propagate to the Administrator Workspace in real time. Once the Admin reviews or dispatches a technician, the Student receives the updated resolution status instantly.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
                  <div className="text-2xl font-extrabold text-indigo-700">85%</div>
                  <div className="text-[11px] font-semibold text-indigo-900 mt-1">Reduction in Paperwork</div>
                  <p className="text-[10px] text-slate-500 mt-0.5">Forms & manual registries eliminated</p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                  <div className="text-2xl font-extrabold text-emerald-700">4.2x</div>
                  <div className="text-[11px] font-semibold text-emerald-900 mt-1">Faster Maintenance SLA</div>
                  <p className="text-[10px] text-slate-500 mt-0.5">Average ticket resolved within 24h</p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                  <div className="text-2xl font-extrabold text-amber-700">0 min</div>
                  <div className="text-[11px] font-semibold text-amber-900 mt-1">Warden Waiting Queue</div>
                  <p className="text-[10px] text-slate-500 mt-0.5">Digital pass approved remotely</p>
                </div>

                <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
                  <div className="text-2xl font-extrabold text-purple-700">100%</div>
                  <div className="text-[11px] font-semibold text-purple-900 mt-1">Gate Audit Compliance</div>
                  <p className="text-[10px] text-slate-500 mt-0.5">Timestamped security verification</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs leading-relaxed text-slate-700">
                <h4 className="font-bold text-slate-900 mb-1">Environmental & Productivity Payoff</h4>
                <p>
                  A university with 5,000 resident students processes an estimated 120,000 leave slips, maintenance logs, and hall permissions annually. By converting this manual burden into structured digital state machines, staff save over 3,400 hours of manual verification time each academic year while providing students transparent, stress-free campus services.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between shrink-0 text-xs">
          <span className="text-slate-600 font-medium">
            UniSphere PS07 Implementation Blueprint
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors cursor-pointer"
          >
            Explore Live Portal
          </button>
        </div>

      </div>
    </div>
  );
};
