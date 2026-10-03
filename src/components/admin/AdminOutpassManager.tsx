import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { 
  FileCheck2, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Users, 
  Search, 
  Sparkles,
  ShieldCheck,
  Building
} from 'lucide-react';

export const AdminOutpassManager: React.FC = () => {
  const { outpasses, reviewOutpass, currentUser } = useCampus();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');

  const pendingCount = outpasses.filter(o => o.status === 'Pending').length;
  const approvedCount = outpasses.filter(o => o.status === 'Approved').length;

  const filteredOutpasses = outpasses.filter(o => {
    const matchesSearch = 
      o.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.roomNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.destination.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAction = (id: string, status: 'Approved' | 'Rejected') => {
    reviewOutpass(id, status, currentUser?.name || 'Warden Admin Office');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div>
          <h3 className="text-sm font-bold flex items-center gap-1.5 text-white">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Warden Outpass Approval & Campus Headcount (PS07 Pillar #2)
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Instant paperless leave verification. Approved requests generate cryptographic gate QR passes.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono font-bold">
            Pending Approval: {pendingCount}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono font-bold">
            Currently Out: {approvedCount}
          </span>
        </div>
      </div>

      {/* Headcount statistics widget */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-white border border-slate-200">
          <span className="text-xs text-slate-500 block">Resident Student Base</span>
          <div className="text-2xl font-black text-slate-900 mt-1">2,840</div>
          <span className="text-[11px] text-slate-400">Aryabhata & Kalpana Halls</span>
        </div>

        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
          <span className="text-xs text-emerald-800 block font-semibold">Active On-Campus</span>
          <div className="text-2xl font-black text-emerald-900 mt-1">2,789</div>
          <span className="text-[11px] text-emerald-700">98.2% resident density</span>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
          <span className="text-xs text-amber-800 block font-semibold">Authorized Off-Campus</span>
          <div className="text-2xl font-black text-amber-900 mt-1">{approvedCount + 51}</div>
          <span className="text-[11px] text-amber-700">Gate pass verified</span>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div className="flex items-center space-x-2">
          {['All', 'Pending', 'Approved', 'Rejected'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                statusFilter === st
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search student, roll, or room..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-3">
        {filteredOutpasses.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500 bg-white rounded-xl border border-dashed border-slate-200">
            No outpass requests found matching criteria.
          </div>
        ) : (
          filteredOutpasses.map(pass => (
            <div key={pass.id} className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1 grow">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-500">{pass.id}</span>
                  <span className="font-bold text-xs text-slate-900">{pass.studentName}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono">
                    {pass.studentId}
                  </span>
                  <span className="text-xs text-slate-500">Room {pass.roomNo} ({pass.hostelBlock})</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    pass.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                    pass.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                    'bg-rose-100 text-rose-800'
                  }`}>
                    {pass.status}
                  </span>
                </div>

                <div className="text-xs text-slate-700">
                  <strong>{pass.outpassType}</strong> to <span className="text-indigo-700 font-semibold">{pass.destination}</span>: 
                  <span className="italic text-slate-500 ml-1">"{pass.reason}"</span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 text-[11px] text-slate-400 pt-0.5">
                  <span>Departure: <strong>{pass.departureDate} ({pass.departureTime})</strong></span>
                  <span>Expected Return: <strong>{pass.returnDate} ({pass.returnTime})</strong></span>
                  {pass.approvedBy && (
                    <span className="text-emerald-700 font-semibold">Signed by {pass.approvedBy}</span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="shrink-0 flex items-center space-x-2 self-end md:self-center">
                {pass.status === 'Pending' ? (
                  <>
                    <button
                      onClick={() => handleAction(pass.id, 'Approved')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approve Pass
                    </button>
                    <button
                      onClick={() => handleAction(pass.id, 'Rejected')}
                      className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </button>
                  </>
                ) : (
                  <span className="text-xs font-mono text-slate-400">
                    Reviewed ({pass.status})
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
