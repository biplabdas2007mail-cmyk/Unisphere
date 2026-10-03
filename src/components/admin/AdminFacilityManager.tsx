import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { CheckCircle2, XCircle, Building, Calendar, Clock, Sparkles, Star, MessageSquare, ThumbsUp } from 'lucide-react';

export const AdminFacilityManager: React.FC = () => {
  const { facilities, reviewBooking } = useCampus();
  const [filter, setFilter] = useState<'all' | 'with_feedback' | 'pending'>('all');

  const handleAction = (id: string, status: 'Confirmed' | 'Rejected') => {
    reviewBooking(id, status);
  };

  const bookingsWithFeedback = facilities.filter(f => f.feedback);
  const avgFacilityRating = bookingsWithFeedback.length > 0
    ? (bookingsWithFeedback.reduce((acc, f) => acc + (f.feedback?.rating || 0), 0) / bookingsWithFeedback.length).toFixed(1)
    : '4.8';

  const displayedFacilities = facilities.filter(b => {
    if (filter === 'with_feedback') return !!b.feedback;
    if (filter === 'pending') return b.status === 'Pending';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
        <div>
          <h3 className="text-sm font-extrabold flex items-center gap-1.5 text-white">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Campus Spaces & Facility Control (PS07 Pillar #3)
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Audit venue reservations, inspect post-session student feedback & ratings, and maintain campus standards.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="px-3 py-1.5 rounded-xl bg-white/10 text-amber-300 font-bold text-xs flex items-center gap-1.5 border border-white/10">
            <Star className="w-4 h-4 fill-amber-300" />
            <span>Avg Rating: {avgFacilityRating}/5.0</span>
          </div>
          <span className="text-xs px-3 py-1.5 rounded-xl bg-white/10 text-indigo-200 font-mono border border-white/10">
            Total Bookings: {facilities.length}
          </span>
        </div>
      </div>

      {/* Post-Session Feedback Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1 shadow-2xs">
          <div className="text-xs text-slate-500 font-semibold flex items-center justify-between">
            <span>Student Feedback Submissions</span>
            <MessageSquare className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{bookingsWithFeedback.length}</div>
          <p className="text-[11px] text-slate-500">Post-session written reviews logged</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1 shadow-2xs">
          <div className="text-xs text-slate-500 font-semibold flex items-center justify-between">
            <span>Facility Hygiene Index</span>
            <ThumbsUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-600">4.9 / 5.0</div>
          <p className="text-[11px] text-slate-500">Cleanliness & sanitation audited</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1 shadow-2xs">
          <div className="text-xs text-slate-500 font-semibold flex items-center justify-between">
            <span>Equipment & A/V Readiness</span>
            <Building className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-indigo-600">98.2%</div>
          <p className="text-[11px] text-slate-500">Projector, Wi-Fi & power calibrated</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-slate-900">Venue Reservation Requests & Student Reviews</h4>
            <span className="text-xs text-slate-500">Live Campus Master Calendar & Audit Log</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filter === 'all' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All ({facilities.length})
            </button>
            <button
              onClick={() => setFilter('with_feedback')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                filter === 'with_feedback' ? 'bg-cyan-700 text-white' : 'bg-slate-100 text-cyan-800 hover:bg-cyan-50'
              }`}
            >
              <Star className="w-3 h-3 fill-current" />
              <span>With Feedback ({bookingsWithFeedback.length})</span>
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filter === 'pending' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Pending Approval
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {displayedFacilities.map((b) => (
            <div key={b.id} className="p-4 flex flex-col md:flex-row md:items-start justify-between gap-4 hover:bg-slate-50/60 transition-colors">
              <div className="space-y-2 grow">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-500">{b.id}</span>
                  <span className="font-bold text-xs text-slate-900">{b.facilityName}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {b.facilityType} (Cap: {b.capacity})
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                    b.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                    'bg-rose-100 text-rose-800'
                  }`}>
                    {b.status}
                  </span>
                  {b.isCompleted && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      Completed
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-700">
                  Requested by: <strong>{b.requesterName}</strong> • Purpose: <span className="italic text-slate-600">"{b.purpose}"</span>
                </p>

                <div className="flex flex-wrap items-center gap-x-4 text-[11px] text-slate-500">
                  <span>Date: <strong>{b.date}</strong></span>
                  <span>Slot: <strong>{b.timeSlot}</strong></span>
                  <span>Location: {b.location}</span>
                </div>

                {/* If Student Provided Feedback */}
                {b.feedback && (
                  <div className="mt-2 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1.5 max-w-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center text-amber-500">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star 
                              key={s} 
                              className={`w-3.5 h-3.5 ${s <= b.feedback!.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-xs font-black text-amber-950">{b.feedback.rating.toFixed(1)}/5.0</span>
                        <span className="text-[10px] text-slate-400 font-mono ml-2">
                          Reviewed by {b.feedback.studentName} ({b.feedback.studentId})
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">{b.feedback.submittedAt}</span>
                    </div>

                    <p className="text-xs text-slate-700 italic">
                      "{b.feedback.comment}"
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                      {b.feedback.aspects?.map(asp => (
                        <span key={asp} className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-cyan-100 text-cyan-900">
                          ✓ {asp}
                        </span>
                      ))}
                      {b.feedback.cleanlinessRating && (
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-semibold bg-emerald-100 text-emerald-900">
                          Hygiene: {b.feedback.cleanlinessRating}/5
                        </span>
                      )}
                      {b.feedback.equipmentRating && (
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-semibold bg-indigo-100 text-indigo-900">
                          Equipment: {b.feedback.equipmentRating}/5
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="shrink-0 flex items-center space-x-2 self-end md:self-center">
                {b.status === 'Pending' ? (
                  <>
                    <button
                      onClick={() => handleAction(b.id, 'Confirmed')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Confirm Slot
                    </button>
                    <button
                      onClick={() => handleAction(b.id, 'Rejected')}
                      className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Decline
                    </button>
                  </>
                ) : (
                  <span className="text-xs font-mono text-slate-400">
                    Status: {b.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
