import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { GrievanceTicket, TicketStatus } from '../../types';
import { 
  Wrench, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  UserCheck, 
  Filter, 
  MessageSquare, 
  Send,
  Sparkles
} from 'lucide-react';

export const AdminGrievanceManager: React.FC = () => {
  const { tickets, updateTicketStatus, assignTicket, currentUser } = useCampus();
  const [selectedTicket, setSelectedTicket] = useState<GrievanceTicket | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [technicianName, setTechnicianName] = useState('');
  const [resolutionNote, setResolutionNote] = useState('');

  const filteredTickets = statusFilter === 'All'
    ? tickets
    : tickets.filter(t => t.status === statusFilter);

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !technicianName.trim()) return;
    assignTicket(selectedTicket.id, technicianName);
    setTechnicianName('');
    
    // Update local selected ticket
    const updated = tickets.find(t => t.id === selectedTicket.id);
    if (updated) setSelectedTicket(updated);
  };

  const handleStatusChange = (status: TicketStatus) => {
    if (!selectedTicket) return;
    updateTicketStatus(selectedTicket.id, status, resolutionNote.trim() || undefined);
    setResolutionNote('');
    
    const updated = tickets.find(t => t.id === selectedTicket.id);
    if (updated) setSelectedTicket(updated);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div>
          <h3 className="text-sm font-bold flex items-center gap-1.5 text-white">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Central Campus Grievance Dispatch Console (PS07 SLA System)
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Monitor, assign field work-orders to plumbing/electrical/IT teams, and enforce university resolution SLAs.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-white/10 text-amber-300 font-mono font-bold">
            Pending: {tickets.filter(t => t.status === 'Pending').length}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-white/10 text-blue-300 font-mono font-bold">
            In Progress: {tickets.filter(t => t.status === 'In Progress').length}
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Filter by State:
        </span>
        {['All', 'Pending', 'In Progress', 'Resolved'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              statusFilter === st
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {st} ({st === 'All' ? tickets.length : tickets.filter(t => t.status === st).length})
          </button>
        ))}
      </div>

      {/* Ticket List */}
      <div className="grid grid-cols-1 gap-3">
        {filteredTickets.map(ticket => (
          <div
            key={ticket.id}
            onClick={() => setSelectedTicket(ticket)}
            className={`p-4 bg-white rounded-xl border transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
              selectedTicket?.id === ticket.id
                ? 'border-indigo-600 ring-2 ring-indigo-50 shadow-xs'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="space-y-1 grow">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-500">{ticket.id}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {ticket.category}
                </span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                  ticket.priority === 'Emergency' ? 'bg-rose-100 text-rose-800' :
                  ticket.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {ticket.priority}
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  ticket.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                  ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {ticket.status}
                </span>
              </div>

              <h4 className="font-bold text-sm text-slate-900">{ticket.title}</h4>
              <p className="text-xs text-slate-600 line-clamp-1">{ticket.description}</p>
              
              <div className="flex flex-wrap items-center gap-x-4 text-[11px] text-slate-400 pt-0.5">
                <span>Student: <strong className="text-slate-700">{ticket.studentName} ({ticket.studentId})</strong></span>
                <span>•</span>
                <span>Location: <strong className="text-slate-700">{ticket.location}</strong></span>
                {ticket.assignedTo && (
                  <>
                    <span>•</span>
                    <span className="text-indigo-600 font-semibold">Assigned: {ticket.assignedTo}</span>
                  </>
                )}
              </div>
            </div>

            <div className="shrink-0 flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedTicket(ticket);
                }}
                className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition-colors"
              >
                Dispatch / Resolve
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Admin Action Drawer / Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-slate-500">{selectedTicket.id}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    selectedTicket.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                    selectedTicket.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    Current: {selectedTicket.status}
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900">{selectedTicket.title}</h3>
                <p className="text-xs text-slate-500">
                  By {selectedTicket.studentName} • {selectedTicket.location}
                </p>
              </div>
              <button onClick={() => setSelectedTicket(null)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-700 uppercase tracking-wider block mb-1">Issue Details</span>
                <p className="text-slate-800 leading-relaxed">{selectedTicket.description}</p>
              </div>

              {/* Technician Dispatch Form */}
              <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-100 space-y-2">
                <div className="flex items-center space-x-1.5 font-bold text-indigo-950">
                  <UserCheck className="w-4 h-4 text-indigo-600" />
                  <span>Assign Technician / Field Staff</span>
                </div>
                <p className="text-slate-600">
                  Current Assignee: <strong>{selectedTicket.assignedTo || 'Unassigned'}</strong>
                </p>
                <form onSubmit={handleAssign} className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Electrical Staff (Mr. Rakesh) or Plumber Unit #2"
                    value={technicianName}
                    onChange={e => setTechnicianName(e.target.value)}
                    className="grow px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors shrink-0 cursor-pointer"
                  >
                    Assign
                  </button>
                </form>
              </div>

              {/* Status Updater & Resolution Note */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <span className="font-bold text-slate-900 block">Change Status & Add Official Log</span>
                <textarea
                  rows={2}
                  placeholder="Optional resolution note for student (e.g. Capacitor replaced, router firmware updated)..."
                  value={resolutionNote}
                  onChange={e => setResolutionNote(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                />

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleStatusChange('In Progress')}
                    className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Mark "In Progress"
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange('Resolved')}
                    className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Mark "Resolved" ✓
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange('Pending')}
                    className="px-3 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Reset to Pending
                  </button>
                </div>
              </div>

              {/* Live Timeline Audit Trail */}
              <div>
                <span className="font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Live Audit Timeline
                </span>
                <div className="space-y-2">
                  {selectedTicket.updates.map((u, i) => (
                    <div key={u.id || i} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                      <div className="flex justify-between text-slate-400 text-[10px] mb-0.5">
                        <span className="font-bold text-slate-700">{u.author} ({u.role})</span>
                        <span>{u.timestamp}</span>
                      </div>
                      <p className="text-slate-700">{u.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedTicket(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-lg text-xs"
              >
                Close Console
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
