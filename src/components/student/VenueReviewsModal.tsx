import React from 'react';
import { FacilityBooking, FacilityFeedback } from '../../types';
import { X, Star, Building, MessageSquare, ThumbsUp, CheckCircle2 } from 'lucide-react';

interface VenueReviewsModalProps {
  venueName: string;
  isOpen: boolean;
  onClose: () => void;
  bookings: FacilityBooking[];
}

export const VenueReviewsModal: React.FC<VenueReviewsModalProps> = ({
  venueName,
  isOpen,
  onClose,
  bookings
}) => {
  if (!isOpen) return null;

  // Gather all feedbacks for this venue
  const venueFeedbacks: FacilityFeedback[] = bookings
    .filter(b => b.facilityName.toLowerCase() === venueName.toLowerCase() && b.feedback)
    .map(b => b.feedback!);

  // Default reviews if none yet submitted in this session
  const fallbackReviews: FacilityFeedback[] = [
    {
      id: 'seed-1',
      facilityName: venueName,
      rating: 5,
      cleanlinessRating: 5,
      equipmentRating: 5,
      comment: 'Superb venue! The dual ceiling projectors and audio lapel microphones functioned smoothly. Desks were clean and dusted.',
      aspects: ['Clean Desks & Chairs', 'Audio & Microphones', 'Working A/C'],
      submittedAt: '2026-09-15 17:30',
      studentName: 'Priyanka Tripathy',
      studentId: '2023CS1045'
    },
    {
      id: 'seed-2',
      facilityName: venueName,
      rating: 4,
      cleanlinessRating: 4,
      equipmentRating: 4,
      comment: 'Very conducive atmosphere for group collaboration. Wi-Fi was consistently above 150 Mbps on eduroam campus access points.',
      aspects: ['High-Speed Wi-Fi', 'Quiet Atmosphere', 'Power Sockets Available'],
      submittedAt: '2026-09-12 14:10',
      studentName: 'Rohan Pattnaik',
      studentId: '2024EC2019'
    }
  ];

  const displayReviews = venueFeedbacks.length > 0 ? [...venueFeedbacks, ...fallbackReviews] : fallbackReviews;
  const avgRating = (displayReviews.reduce((sum, r) => sum + r.rating, 0) / displayReviews.length).toFixed(1);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-white/10 text-cyan-400">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">{venueName}</h3>
              <p className="text-xs text-slate-400">Peer Ratings & Verified Student Reviews</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rating Summary Bar */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl font-black text-slate-900 dark:text-white">{avgRating}</div>
            <div>
              <div className="flex items-center gap-0.5 text-amber-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
                Based on {displayReviews.length} student booking reviews
              </p>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Verified Clean
          </span>
        </div>

        {/* Review list */}
        <div className="p-4 space-y-3.5 overflow-y-auto flex-1 divide-y divide-slate-100 dark:divide-slate-800">
          {displayReviews.map((rev, idx) => (
            <div key={rev.id || idx} className="pt-3 first:pt-0 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-900 dark:text-cyan-200 font-bold text-[10px] flex items-center justify-center">
                    {rev.studentName.charAt(0)}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{rev.studentName}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 ml-1.5 font-mono">({rev.studentId})</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star 
                      key={s} 
                      className={`w-3 h-3 ${s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-700'}`} 
                    />
                  ))}
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 ml-1">{rev.rating}.0</span>
                </div>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-8">
                "{rev.comment}"
              </p>

              {rev.aspects && rev.aspects.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pl-8 pt-0.5">
                  {rev.aspects.map(asp => (
                    <span key={asp} className="px-2 py-0.5 rounded-md text-[9px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      ✓ {asp}
                    </span>
                  ))}
                </div>
              )}

              <div className="text-[10px] text-slate-400 dark:text-slate-500 pl-8 font-mono">
                Session reviewed on {rev.submittedAt}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
