import React from 'react';
import { User } from '../../types';
import { useCampus } from '../../context/CampusContext';
import { UniSphereLogo } from '../UniSphereLogo';
import { QrCode, ShieldCheck, CheckCircle2, ArrowRight, UserCheck, Building2, Camera } from 'lucide-react';

interface StudentIdCardProps {
  user: User;
}

export const StudentIdCard: React.FC<StudentIdCardProps> = ({ user }) => {
  const { setCurrentView } = useCampus();

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-5 text-white shadow-xl border border-indigo-500/20 relative overflow-hidden">
      {/* Decorative background watermark */}
      <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-lg bg-white p-0.5 flex items-center justify-center shrink-0 shadow-xs">
            <UniSphereLogo variant="icon" size="xs" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-xs sm:text-sm">UniSphere</span>
              <span className="text-xs font-bold text-amber-300">ଓଡ଼ିଶା</span>
            </div>
            <div className="text-[9px] font-semibold text-indigo-200 uppercase tracking-wider flex items-center gap-1">
              <span>Campus AI Solutions</span>
              <span>•</span>
              <span className="text-amber-300 font-bold">Team Techinnovators</span>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
            <CheckCircle2 className="w-2.5 h-2.5" /> Active Resident
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">AY 2026-27</span>
      </div>

      <div className="flex items-start space-x-4">
        <div
          onClick={() => setCurrentView('profile')}
          title="Click to change or upload student profile photo"
          className="relative shrink-0 group cursor-pointer"
        >
          <img
            src={user.avatarUrl}
            alt={user.name}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80';
            }}
            className="w-18 h-18 rounded-xl object-cover ring-2 ring-indigo-400/40 group-hover:ring-indigo-300 shadow-md transition-all"
          />
          <div className="absolute inset-0 bg-slate-900/60 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-bold">
            <Camera className="w-4 h-4 mb-0.5 text-indigo-300" />
            <span>Change</span>
          </div>
          <div className="absolute -bottom-1 -right-1 p-0.5 bg-emerald-500 rounded-full ring-2 ring-slate-900 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
          </div>
        </div>

        <div className="grow min-w-0">
          <h3 className="text-base font-bold text-white truncate">{user.name}</h3>
          <p className="text-xs text-indigo-200 font-medium truncate">{user.department}</p>
          <div className="text-[11px] text-amber-300 font-semibold truncate flex items-center gap-1 mt-0.5">
            <Building2 className="w-3 h-3 text-amber-300 shrink-0" />
            <span className="truncate">{user.institute || 'Odisha University of Technology and Research (OUTR Bhubaneswar)'}</span>
          </div>
          {user.university && (
            <div className="text-[10px] text-indigo-200/90 truncate flex items-center gap-1 mt-0.5">
              <span>Affiliation: {user.university}</span>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-white/10 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Roll Number</span>
              <span className="font-mono font-bold text-slate-200">{user.studentId || '2023CS1082'}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Hostel Room</span>
              <span className="font-semibold text-slate-200">{user.roomNo || 'B-314'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action link & Security strip */}
      <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2">
          <QrCode className="w-5 h-5 text-indigo-300" />
          <div className="text-[10px] font-mono text-slate-400 tracking-wider">
            TAP FOR GATE SENSOR
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setCurrentView('profile')}
            className="text-xs font-bold text-amber-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer py-1 px-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Change Photo</span>
          </button>
          <button
            onClick={() => setCurrentView('profile')}
            className="text-xs font-bold text-indigo-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer py-1 px-2 rounded-lg hover:bg-white/10"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Profile & ID</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
