import React, { useState } from 'react';
import { FacilityBooking, FacilityFeedback } from '../../types';
import { 
  X, 
  Star, 
  Sparkles, 
  CheckCircle2, 
  Building, 
  Calendar, 
  Clock, 
  MessageSquare, 
  ThumbsUp,
  AlertCircle
} from 'lucide-react';

interface FacilityFeedbackModalProps {
  booking: FacilityBooking;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: {
    rating: number;
    cleanlinessRating: number;
    equipmentRating: number;
    comment: string;
    aspects: string[];
  }) => void;
}

const COMMON_ASPECTS = [
  'Working A/C',
  'Clean Desks & Chairs',
  'High-Speed Wi-Fi',
  'Functional Projector / Screen',
  'Audio & Microphones',
  'Power Sockets Available',
  'Helpful Lab Assistant',
  'Quiet Atmosphere',
  'Equipment Calibrated'
];

export const FacilityFeedbackModal: React.FC<FacilityFeedbackModalProps> = ({
  booking,
  isOpen,
  onClose,
  onSubmit
}) => {
  const existingFeedback = booking.feedback;

  const [rating, setRating] = useState<number>(existingFeedback?.rating || 5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [cleanlinessRating, setCleanlinessRating] = useState<number>(existingFeedback?.cleanlinessRating || 5);
  const [equipmentRating, setEquipmentRating] = useState<number>(existingFeedback?.equipmentRating || 5);
  const [comment, setComment] = useState<string>(existingFeedback?.comment || '');
  const [selectedAspects, setSelectedAspects] = useState<string[]>(existingFeedback?.aspects || ['Working A/C', 'Clean Desks & Chairs']);
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const toggleAspect = (aspect: string) => {
    setSelectedAspects(prev => 
      prev.includes(aspect) 
        ? prev.filter(a => a !== aspect)
        : [...prev, aspect]
    );
  };

  const getRatingLabel = (val: number) => {
    switch (val) {
      case 1: return '1.0 - Poor Experience / Inconvenience Encountered';
      case 2: return '2.0 - Below Expectations / Needs Attention';
      case 3: return '3.0 - Satisfactory / Standard Campus Facility';
      case 4: return '4.0 - Very Good / Conducive & Well Maintained';
      case 5: return '5.0 - Outstanding / Excellent Lab & Facility';
      default: return 'Rate Your Booking Experience';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please provide an overall star rating.');
      return;
    }
    if (!comment.trim()) {
      setError('Please provide written feedback describing your session experience.');
      return;
    }
    if (comment.trim().length < 10) {
      setError('Written feedback should be at least 10 characters.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      onSubmit({
        rating,
        cleanlinessRating,
        equipmentRating,
        comment: comment.trim(),
        aspects: selectedAspects
      });
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 1200);
    }, 400);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) onClose();
      }}
    >
      <div 
        className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-white/10 text-cyan-300 border border-white/10">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base tracking-tight text-white">
                  {existingFeedback ? 'Update Facility Review' : 'Facility Feedback & Rating'}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-400/20 text-cyan-200 border border-cyan-400/30">
                  Post-Session Feedback
                </span>
              </div>
              <p className="text-xs text-cyan-200/80 mt-0.5">
                Help estate managers and fellow students keep campus venues well maintained.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Facility Context Card */}
        <div className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 px-5 py-3 text-xs flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
            <Building className="w-4 h-4 text-cyan-700 dark:text-cyan-400 shrink-0" />
            <span className="font-bold text-slate-900 dark:text-white">{booking.facilityName}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600 dark:text-slate-300">{booking.location}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {booking.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {booking.timeSlot}
            </span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-5 overflow-y-auto flex-1">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {showSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>Feedback submitted successfully! Thank you for rating this campus facility.</span>
            </div>
          )}

          {/* Overall Star Rating */}
          <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/60 text-center space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-amber-900 dark:text-amber-200 block">
              Overall Session Rating (ପ୍ରଦାନ ମୂଲ୍ୟାୟନ)
            </label>
            <div className="flex items-center justify-center gap-2 py-1">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = (hoverRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 rounded-lg transition-transform hover:scale-125 focus:outline-hidden cursor-pointer"
                  >
                    <Star 
                      className={`w-8 h-8 transition-colors ${
                        isFilled 
                          ? 'text-amber-400 fill-amber-400 drop-shadow-xs' 
                          : 'text-slate-300 dark:text-slate-700'
                      }`} 
                    />
                  </button>
                );
              })}
            </div>
            <p className="text-xs font-bold text-amber-950 dark:text-amber-200">
              {getRatingLabel(hoverRating || rating)}
            </p>
          </div>

          {/* Sub-criteria: Cleanliness & Equipment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Cleanliness & Sanitation</span>
                <span className="text-xs font-extrabold text-cyan-700 dark:text-cyan-400">{cleanlinessRating}/5</span>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setCleanlinessRating(s)}
                    className="cursor-pointer"
                  >
                    <Star 
                      className={`w-4 h-4 ${
                        cleanlinessRating >= s ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-700'
                      }`} 
                    />
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Hygiene of desks, floor & whiteboards</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Equipment & A/V Readiness</span>
                <span className="text-xs font-extrabold text-cyan-700 dark:text-cyan-400">{equipmentRating}/5</span>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setEquipmentRating(s)}
                    className="cursor-pointer"
                  >
                    <Star 
                      className={`w-4 h-4 ${
                        equipmentRating >= s ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-700'
                      }`} 
                    />
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Projector, Wi-Fi, lab gear & power plugs</p>
            </div>
          </div>

          {/* Quick Highlight Aspects */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span>Facility Highlights & Tags</span>
              <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400">Select all that apply</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMON_ASPECTS.map((aspect) => {
                const isSelected = selectedAspects.includes(aspect);
                return (
                  <button
                    key={aspect}
                    type="button"
                    onClick={() => toggleAspect(aspect)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-100 dark:bg-cyan-950/70 text-cyan-900 dark:text-cyan-200 border border-cyan-300 dark:border-cyan-700 font-bold'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}{aspect}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Written Feedback Textarea */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="written-feedback" className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-cyan-700 dark:text-cyan-400" />
                <span>Written Feedback & Remarks (ମତାମତ)</span>
              </label>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                {comment.length}/500 chars
              </span>
            </div>
            <textarea
              id="written-feedback"
              rows={4}
              maxLength={500}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Detail your experience: Were the computers/projectors working properly? Was the AC temperature comfortable? Did you face any issues with lighting or noise?"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 text-xs text-slate-800 leading-relaxed resize-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>

          {/* Info notice */}
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
            <p>
              Your constructive feedback directly updates the campus facility condition index and is audited by the Campus Estate Officer for cleaning and maintenance priority.
            </p>
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{isSubmitting ? 'Saving Review...' : existingFeedback ? 'Save Changes' : 'Submit Review'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
