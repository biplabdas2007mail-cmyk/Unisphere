import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { GrievanceTicket, TicketCategory, TicketPriority } from '../../types';
import { 
  PlusCircle, 
  Wrench, 
  Wifi, 
  Lightbulb, 
  Droplet, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  Filter,
  MessageSquare,
  Sparkles
} from 'lucide-react';

const CATEGORIES: TicketCategory[] = [
  'Hostel & Housing',
  'IT & Wi-Fi',
  'Lab & Equipment',
  'Classroom & Electricity',
  'Sanitation',
  'Library'
];

const PRIORITIES: TicketPriority[] = ['Low', 'Medium', 'High', 'Emergency'];

export const StudentGrievanceTab: React.FC = () => {
  const { tickets, currentUser, addTicket } = useCampus();
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<GrievanceTicket | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // New ticket form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TicketCategory>('Hostel & Housing');
  const [priority, setPriority] = useState<TicketPriority>('Medium');
  const [location, setLocation] = useState(currentUser?.roomNo ? `${currentUser.hostelBlock || 'Hostel'}, Room ${currentUser.roomNo}` : '');
  const [description, setDescription] = useState('');

  // Filter student's tickets
  const myTickets = tickets.filter(t => 
    t.submittedBy === currentUser?.id || t.studentId === currentUser?.studentId
  );

  const filteredTickets = categoryFilter === 'All' 
    ? myTickets 
    : myTickets.filter(t => t.category === categoryFilter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    addTicket({
      title,
      category,
      priority,
      status: 'Pending',
      description,
      location: location || 'Campus Campus Complex',
      submittedBy: currentUser?.id || 'user_std_101',
      studentName: currentUser?.name || 'Aarav Sharma',
      studentId: currentUser?.studentId || '2023CS1082',
    });

    setTitle('');
    setDescription('');
    setShowModal(false);
  };

  const getCategoryIcon = (cat: TicketCategory) => {
    switch (cat) {
      case 'IT & Wi-Fi': return <Wifi className="w-4 h-4 text-blue-500" />;
      case 'Classroom & Electricity': return <Lightbulb className="w-4 h-4 text-amber-500" />;
      case 'Sanitation': return <Droplet className="w-4 h-4 text-cyan-500" />;
      case 'Lab & Equipment': return <Wrench className="w-4 h-4 text-purple-500" />;
      default: return <Wrench className="w-4 h-4 text-slate-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Resolved':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
            <CheckCircle2 className="w-3 h-3" /> Resolved
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300">
            <Clock className="w-3 h-3" /> In Progress
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300">
            <Clock className="w-3 h-3" /> Awaiting Review
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner explaining the PS07 advantage */}
      <div className="p-4 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-indigo-950 dark:text-indigo-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Digital Grievance & Rapid SLA Helpdesk
          </h3>
          <p className="text-xs text-indigo-800/80 dark:text-indigo-300/80 mt-0.5">
            Report broken Wi-Fi, plumbing, electrical, or lab gear in under 30 seconds. Track work-order dispatch in real time.
          </p>
        </div>
        <button
          id="btn-raise-ticket"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Raise New Grievance</span>
        </button>
      </div>

      {/* Filter and stats row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          <button
            onClick={() => setCategoryFilter('All')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors shrink-0 cursor-pointer ${
              categoryFilter === 'All' 
                ? 'bg-slate-900 dark:bg-indigo-600 text-white' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            All ({myTickets.length})
          </button>
          {CATEGORIES.slice(0, 4).map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
                categoryFilter === cat 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Showing {filteredTickets.length} personal ticket{filteredTickets.length === 1 ? '' : 's'}
        </div>
      </div>

      {/* Tickets List */}
      {filteredTickets.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-6">
          <Wrench className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h4 className="text-sm font-bold text-slate-800 dark:text-white">No grievance tickets found</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Everything is running smoothly! If you encounter any facility failure or internet glitch, raise a ticket above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filteredTickets.map(ticket => (
            <div
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket)}
              className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-xs transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 grow">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">{ticket.id}</span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    {getCategoryIcon(ticket.category)}
                    {ticket.category}
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                    ticket.priority === 'Emergency' ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300' :
                    ticket.priority === 'High' ? 'bg-orange-100 dark:bg-orange-950/80 text-orange-800 dark:text-orange-300' :
                    'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {ticket.priority} Priority
                  </span>
                  {getStatusBadge(ticket.status)}
                </div>

                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{ticket.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">{ticket.description}</p>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400 dark:text-slate-500 pt-1">
                  <span>Location: <strong className="text-slate-600 dark:text-slate-300 font-medium">{ticket.location}</strong></span>
                  <span>Submitted: {ticket.createdAt}</span>
                  {ticket.assignedTo && (
                    <span className="text-indigo-600 dark:text-indigo-400 font-medium">Assigned: {ticket.assignedTo}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center gap-1">
                  Timeline ({ticket.updates.length}) <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Ticket Details & Live Timeline Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between bg-slate-50 dark:bg-slate-800/80">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">{selectedTicket.id}</span>
                  {getStatusBadge(selectedTicket.status)}
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">{selectedTicket.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{selectedTicket.location} • Created {selectedTicket.createdAt}</p>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1">Issue Description</span>
                <p className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 leading-relaxed border border-slate-100 dark:border-slate-800">
                  {selectedTicket.description}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  Live Action Log & Admin Updates
                </span>
                
                <div className="space-y-3 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-100 dark:before:bg-indigo-900 pl-8">
                  {selectedTicket.updates.map((update, idx) => (
                    <div key={update.id || idx} className="relative">
                      <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-indigo-600 ring-4 ring-indigo-50 dark:ring-indigo-950 flex items-center justify-center" />
                      <div className="p-2.5 rounded-lg bg-indigo-50/40 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-900 dark:text-white">{update.author}</span>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500">{update.timestamp}</span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{update.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedTicket(null)}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold rounded-lg text-xs transition-colors cursor-pointer"
              >
                Close Ticket View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Ticket Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/80">
              <div className="flex items-center space-x-2">
                <Wrench className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Report Campus Facility Problem</h3>
              </div>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Issue Summary / Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wi-Fi dropping in Room B-314 or Air Conditioner leaking"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as TicketCategory)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden bg-white dark:bg-slate-800 dark:text-white"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Priority / Urgency</label>
                  <select
                    value={priority}
                    onChange={e => setPriority(e.target.value as TicketPriority)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden bg-white dark:bg-slate-800 dark:text-white"
                  >
                    {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Exact Campus Location</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aryabhata Hall, Block B, 3rd Floor or Central Library Desk 42"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the issue in detail, error codes, frequency, or safety hazards..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md transition-colors cursor-pointer"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
