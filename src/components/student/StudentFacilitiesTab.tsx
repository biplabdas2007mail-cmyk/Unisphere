import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { FacilityBooking, FacilityType } from '../../types';
import { FacilityFeedbackModal } from './FacilityFeedbackModal';
import { VenueReviewsModal } from './VenueReviewsModal';
import { 
  Building, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2, 
  PlusCircle, 
  Sparkles,
  MapPin,
  BookOpen,
  Volume2,
  Bookmark,
  BookmarkCheck,
  Search,
  Tag,
  Ticket,
  ExternalLink,
  Star,
  MessageSquare,
  ThumbsUp,
  AlertCircle,
  Filter
} from 'lucide-react';

const AVAILABLE_VENUES = [
  { name: 'Advanced Robotics & IoT Sandbox', type: 'Robotics Lab' as FacilityType, location: 'Innovation Block GF', capacity: 25, rating: 4.9, reviewCount: 22 },
  { name: 'High Performance Computing Cluster (Lab 3)', type: 'Computer Lab' as FacilityType, location: 'Computer Center 2F', capacity: 60, rating: 4.8, reviewCount: 19 },
  { name: 'Aryabhata Seminar Hall B', type: 'Seminar Hall' as FacilityType, location: 'Academic Block A 3F', capacity: 120, rating: 4.7, reviewCount: 15 },
  { name: 'Tagore Memorial Auditorium', type: 'Auditorium' as FacilityType, location: 'Central Plaza', capacity: 450, rating: 5.0, reviewCount: 48 },
  { name: 'Quiet Collaboration Study Pod #4', type: 'Study Pod' as FacilityType, location: 'Central Library 2F', capacity: 8, rating: 4.9, reviewCount: 31 },
  { name: 'Indoor Badminton Arena (Court 1 & 2)', type: 'Sports Complex' as FacilityType, location: 'Student Activity Complex', capacity: 40, rating: 4.6, reviewCount: 14 }
];

export const StudentFacilitiesTab: React.FC = () => {
  const { 
    facilities, 
    currentUser, 
    bookFacility, 
    completeFacilitySession,
    submitFacilityFeedback,
    libraryBooks, 
    toggleBookReservation, 
    campusEvents, 
    toggleEventRegistration, 
    language 
  } = useCampus();
  const [activeSubSection, setActiveSubSection] = useState<'spaces' | 'library' | 'events'>('spaces');
  
  // Spaces booking modal
  const [showModal, setShowModal] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(AVAILABLE_VENUES[0]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('16:00 - 18:00');
  const [purpose, setPurpose] = useState('');

  // Facility feedback states
  const [selectedBookingForFeedback, setSelectedBookingForFeedback] = useState<FacilityBooking | null>(null);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [selectedVenueForReviews, setSelectedVenueForReviews] = useState<string | null>(null);
  const [reviewsModalOpen, setReviewsModalOpen] = useState(false);
  const [bookingFilter, setBookingFilter] = useState<'all' | 'needs_feedback' | 'reviewed' | 'active'>('all');

  // Library filter
  const [libraryQuery, setLibraryQuery] = useState('');

  const myBookings = facilities.filter(f => f.bookedBy === currentUser?.id);
  const pendingFeedbackBookings = myBookings.filter(b => b.isCompleted && !b.feedback);
  const reviewedBookings = myBookings.filter(b => b.isCompleted && b.feedback);
  const activeBookings = myBookings.filter(b => !b.isCompleted);

  const displayedBookings = myBookings.filter(b => {
    if (bookingFilter === 'needs_feedback') return b.isCompleted && !b.feedback;
    if (bookingFilter === 'reviewed') return b.isCompleted && b.feedback;
    if (bookingFilter === 'active') return !b.isCompleted;
    return true;
  });

  const handleOpenFeedback = (booking: FacilityBooking) => {
    setSelectedBookingForFeedback(booking);
    setFeedbackModalOpen(true);
  };

  const handleEndSessionAndReview = (booking: FacilityBooking) => {
    completeFacilitySession(booking.id);
    setSelectedBookingForFeedback({
      ...booking,
      isCompleted: true,
      sessionEndedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    });
    setFeedbackModalOpen(true);
  };

  const handleFeedbackSubmit = (data: {
    rating: number;
    cleanlinessRating: number;
    equipmentRating: number;
    comment: string;
    aspects: string[];
  }) => {
    if (selectedBookingForFeedback) {
      submitFacilityFeedback(selectedBookingForFeedback.id, data);
    }
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!purpose.trim()) return;

    bookFacility({
      facilityName: selectedVenue.name,
      facilityType: selectedVenue.type,
      location: selectedVenue.location,
      capacity: selectedVenue.capacity,
      bookedBy: currentUser?.id || 'user_std_101',
      requesterName: currentUser?.name || 'Aarav Mohapatra',
      requesterRole: currentUser?.role || 'student',
      date,
      timeSlot,
      purpose
    });

    setPurpose('');
    setShowModal(false);
  };

  const filteredBooks = libraryBooks.filter(b => 
    b.title.toLowerCase().includes(libraryQuery.toLowerCase()) ||
    b.author.toLowerCase().includes(libraryQuery.toLowerCase()) ||
    b.category.toLowerCase().includes(libraryQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20">
            <Building className="w-6 h-6 text-cyan-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight">
                {language === 'odia_mix'
                  ? 'କ୍ୟାମ୍ପସ ସୁବିଧା ଓ ସମ୍ବଳ କେନ୍ଦ୍ର (Campus Facilities)'
                  : language === 'odia'
                  ? 'କ୍ୟାମ୍ପସ ସୁବିଧା ଏବଂ ସମ୍ବଳ କେନ୍ଦ୍ର'
                  : language === 'hi'
                  ? 'कैंपस सुविधाएं एवं संसाधन केंद्र'
                  : 'Campus Facilities & Resource Hub'}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/30 text-cyan-200 border border-cyan-400/30">
                Criterion 4 • 🏫 Campus Facilities
              </span>
            </div>
            <p className="text-xs text-cyan-200/90 mt-1 max-w-xl">
              {language === 'odia_mix'
                ? 'Research Labs, Classrooms, ଗୀତା ଗୋବିନ୍ଦ ପାଠାଗାର (Library) ଓ କ୍ୟାମ୍ପସ ସ୍ଥାନ Real-Time ରେ ବୁକ୍ କରନ୍ତୁ।'
                : language === 'odia'
                ? 'ଗବେଷଣାଗାର, ଶ୍ରେଣୀଗୃହ, ଗୀତା ଗୋବିନ୍ଦ କେନ୍ଦ୍ରୀୟ ପାଠାଗାର ଏବଂ କ୍ୟାମ୍ପସ କାର୍ଯ୍ୟକ୍ରମ ସ୍ଥାନ ତ୍ୱରିତ ଆରକ୍ଷଣ କରନ୍ତୁ।'
                : language === 'hi'
                ? 'अनुसंधान प्रयोगशाला, कक्षाएं, गीता गोविंदा केंद्रीय पुस्तकालय और सांस्कृतिक हॉल का वास्तविक समय आरक्षण।'
                : 'Real-time resource booking for research labs, classrooms, Gita Govinda Central Library catalog, and campus cultural events.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeSubSection === 'spaces' && (
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>
                {language === 'odia'
                  ? '+ ଲ୍ୟାବ୍ / କ୍ଲାସରୁମ୍ ଆରକ୍ଷଣ କରନ୍ତୁ'
                  : language === 'hi'
                  ? '+ लैब / क्लासरूम बुक करें'
                  : language === 'odia_mix'
                  ? '+ Lab / Classroom ବୁକ୍ କରନ୍ତୁ'
                  : 'Book Lab / Classroom'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveSubSection('spaces')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            activeSubSection === 'spaces'
              ? 'bg-cyan-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>
            {language === 'hi'
              ? 'प्रयोगशालाएं एवं कक्षाएं'
              : language === 'odia'
              ? 'ଲ୍ୟାବ୍ ଓ ଶ୍ରେଣୀଗୃହ'
              : language === 'odia_mix'
              ? 'Labs ଓ Classrooms'
              : 'Labs & Classrooms'}
          </span>
        </button>

        <button
          onClick={() => setActiveSubSection('library')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            activeSubSection === 'library'
              ? 'bg-cyan-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>
            {language === 'hi'
              ? 'केंद्रीय पुस्तकालय एवं पुस्तकें'
              : language === 'odia'
              ? 'କେନ୍ଦ୍ରୀୟ ପାଠାଗାର ଓ ପୁସ୍ତକ'
              : language === 'odia_mix'
              ? 'Central Library ଓ Books'
              : 'Central Library & Books'}
          </span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-extrabold">
            {language === 'hi'
              ? '122 सीटें रिक्त'
              : language === 'odia'
              ? '୧୨୨ ସିଟ୍ ଖାଲି'
              : language === 'odia_mix'
              ? '୧୨୨ Seats Open'
              : '122 Seats Open'}
          </span>
        </button>

        <button
          onClick={() => setActiveSubSection('events')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            activeSubSection === 'events'
              ? 'bg-cyan-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Ticket className="w-4 h-4" />
          <span>
            {language === 'hi'
              ? 'कैंपस कार्यक्रम एवं हैकाथॉन'
              : language === 'odia'
              ? 'କ୍ୟାମ୍ପସ ଇଭେଣ୍ଟ ଓ ହ୍ୟାକାଥନ୍'
              : language === 'odia_mix'
              ? 'Campus Events ଓ Hackathons'
              : 'Campus Events & Hackathons'}
          </span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-indigo-100 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300 font-extrabold">
            {campusEvents.length} {language === 'hi' ? 'सक्रिय' : language === 'odia' ? 'ସକ୍ରିୟ' : 'Live'}
          </span>
        </button>
      </div>

      {/* 1. SPACES & LABS SECTION */}
      {activeSubSection === 'spaces' && (
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Available Lab, Hall & Classroom Spaces</h4>
              <span className="text-xs text-slate-500 dark:text-slate-400">Real-time venue condition & student reviews</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {AVAILABLE_VENUES.map((venue) => (
                <div
                  key={venue.name}
                  className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-cyan-400 dark:hover:border-cyan-500 hover:shadow-xs transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950/70 text-cyan-800 dark:text-cyan-300 border border-cyan-100 dark:border-cyan-800/60 uppercase tracking-wide">
                        {venue.type}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
                        <Users className="w-3 h-3 text-slate-400" />
                        Cap: {venue.capacity}
                      </span>
                    </div>
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white">{venue.name}</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {venue.location}
                    </p>

                    {/* Venue Rating & Reviews Link */}
                    <div className="flex items-center justify-between text-xs pt-1.5 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{venue.rating}</span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">({venue.reviewCount} reviews)</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedVenueForReviews(venue.name);
                          setReviewsModalOpen(true);
                        }}
                        className="text-[11px] font-bold text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 hover:underline cursor-pointer"
                      >
                        Read Reviews
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedVenue(venue);
                      setShowModal(true);
                    }}
                    className="w-full py-2 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 hover:text-cyan-900 dark:hover:text-cyan-200 hover:border-cyan-200 dark:hover:border-cyan-700 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
                  >
                    Select & Reserve Slot
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Feedback Banner if any completed booking is awaiting student review */}
          {pendingFeedbackBookings.length > 0 && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-cyan-500/10 dark:from-amber-950/40 dark:via-amber-900/20 dark:to-cyan-950/30 border border-amber-300 dark:border-amber-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-500 text-slate-950 font-bold shrink-0 mt-0.5">
                  <Star className="w-5 h-5 fill-slate-950" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="font-extrabold text-xs text-amber-950 dark:text-amber-200">
                      Action Required: Session Rating & Feedback Due ({pendingFeedbackBookings.length})
                    </h5>
                    <span className="px-2 py-0.2 rounded-full text-[9px] font-bold bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-300 uppercase">
                      Needs Review
                    </span>
                  </div>
                  <p className="text-xs text-amber-900/80 dark:text-amber-300/80 mt-0.5">
                    Your session at <span className="font-bold text-amber-950 dark:text-amber-100">{pendingFeedbackBookings[0].facilityName}</span> has ended. Please provide star ratings and written feedback to help campus maintenance.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleOpenFeedback(pendingFeedbackBookings[0])}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold shrink-0 shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Star className="w-3.5 h-3.5 fill-slate-950" />
                <span>Rate & Review Now</span>
              </button>
            </div>
          )}

          {/* My Facility Reservations */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">My Facility Bookings ({myBookings.length})</h4>
              
              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                <button
                  type="button"
                  onClick={() => setBookingFilter('all')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    bookingFilter === 'all' 
                      ? 'bg-slate-800 dark:bg-cyan-600 text-white font-bold' 
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  All ({myBookings.length})
                </button>
                <button
                  type="button"
                  onClick={() => setBookingFilter('needs_feedback')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                    bookingFilter === 'needs_feedback' 
                      ? 'bg-amber-500 text-slate-950 font-bold' 
                      : 'bg-white dark:bg-slate-900 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-950/40'
                  }`}
                >
                  <Star className="w-3 h-3 fill-current" />
                  <span>Feedback Due ({pendingFeedbackBookings.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setBookingFilter('reviewed')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    bookingFilter === 'reviewed' 
                      ? 'bg-cyan-700 text-white font-bold' 
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Reviewed ({reviewedBookings.length})
                </button>
                <button
                  type="button"
                  onClick={() => setBookingFilter('active')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    bookingFilter === 'active' 
                      ? 'bg-emerald-600 text-white font-bold' 
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Active ({activeBookings.length})
                </button>
              </div>
            </div>

            {displayedBookings.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs">
                {bookingFilter === 'needs_feedback'
                  ? 'Great job! You have no pending facility reviews.'
                  : bookingFilter === 'reviewed'
                  ? 'No completed reviews in this view yet.'
                  : 'You have not booked any facility spaces matching this filter.'}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {displayedBookings.map((b) => (
                  <div 
                    key={b.id} 
                    className={`p-4 rounded-xl bg-white dark:bg-slate-900 border transition-all shadow-2xs space-y-3 ${
                      b.isCompleted && !b.feedback
                        ? 'border-amber-300 dark:border-amber-600 ring-2 ring-amber-400/20'
                        : 'border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-600 dark:text-slate-400">{b.id}</span>
                        {b.isCompleted && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                            Session Concluded
                          </span>
                        )}
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        b.status === 'Confirmed'
                          ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300'
                          : b.status === 'Rejected'
                          ? 'bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300'
                          : 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300'
                      }`}>
                        {b.status}
                      </span>
                    </div>

                    <div>
                      <h5 className="font-bold text-sm text-slate-900 dark:text-white">{b.facilityName}</h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        {b.location}
                      </p>
                    </div>

                    <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{b.date} • {b.timeSlot}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Purpose: {b.purpose}</p>
                    </div>

                    {/* Feedback section: Submitted vs Pending vs Active */}
                    {b.isCompleted && b.feedback ? (
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-amber-500">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`w-3.5 h-3.5 ${
                                  star <= b.feedback!.rating 
                                    ? 'fill-amber-400 text-amber-400' 
                                    : 'text-slate-200 dark:text-slate-700'
                                }`} 
                              />
                            ))}
                            <span className="text-xs font-black text-slate-800 dark:text-slate-200 ml-1">
                              {b.feedback.rating.toFixed(1)}/5.0
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                            {b.feedback.submittedAt.split(' ')[0]}
                          </span>
                        </div>

                        <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                          "{b.feedback.comment}"
                        </p>

                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          {b.feedback.aspects?.map((asp) => (
                            <span 
                              key={asp} 
                              className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-cyan-50 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800"
                            >
                              ✓ {asp}
                            </span>
                          ))}
                          {b.feedback.cleanlinessRating && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                              Cleanliness: {b.feedback.cleanlinessRating}/5
                            </span>
                          )}
                          {b.feedback.equipmentRating && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                              Equipment: {b.feedback.equipmentRating}/5
                            </span>
                          )}
                        </div>

                        <div className="pt-1 flex justify-end">
                          <button 
                            type="button"
                            onClick={() => handleOpenFeedback(b)}
                            className="text-[11px] font-bold text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 hover:underline cursor-pointer"
                          >
                            Edit Written Feedback
                          </button>
                        </div>
                      </div>
                    ) : b.isCompleted && !b.feedback ? (
                      <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800/80 space-y-2">
                        <div className="flex items-center gap-1.5 text-amber-900 dark:text-amber-200 font-bold text-xs">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                          <span>Session Ended • Written Review Required</span>
                        </div>
                        <p className="text-xs text-amber-800 dark:text-amber-300">
                          Please rate the facility condition, cleanliness, and projector equipment for this session.
                        </p>
                        <button
                          type="button"
                          onClick={() => handleOpenFeedback(b)}
                          className="w-full py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
                        >
                          <Star className="w-3.5 h-3.5 fill-slate-950" />
                          <span>Rate & Provide Written Feedback</span>
                        </button>
                      </div>
                    ) : (
                      b.status === 'Confirmed' && (
                        <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                          <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Session Scheduled
                          </span>
                          <button
                            type="button"
                            onClick={() => handleEndSessionAndReview(b)}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-cyan-100 dark:hover:bg-cyan-950/70 text-slate-700 dark:text-slate-300 hover:text-cyan-900 dark:hover:text-cyan-200 text-[11px] font-bold transition-colors cursor-pointer"
                          >
                            Mark Ended & Leave Review
                          </button>
                        </div>
                      )
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. GITA GOVINDA CENTRAL LIBRARY SECTION */}
      {activeSubSection === 'library' && (
        <div className="space-y-6">
          {/* Real-time Library Telemetry Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Seat Occupancy (Live Sensors)
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                358 / 480 <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">(122 Available)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 mt-2 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '74.6%' }} />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Acoustic Ambient Meter</span>
              </div>
              <div className="text-2xl font-black text-indigo-700 dark:text-indigo-300">
                32 dB <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">(Whisper Silent)</span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Reading Hall Level 2: Optimal study environment
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Digital Catalog Status
              </div>
              <div className="text-2xl font-black text-cyan-800 dark:text-cyan-300">
                42,500+ Volumes
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                IEEE Xplore, ACM DL & Springer Nature connected
              </div>
            </div>
          </div>

          {/* Book Catalog with Search & 1-Click Reservation */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Search Textbooks & Research References</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Reserve textbooks online for 48-hour pickup at Circulation Desk.</p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search Cormen, Tanenbaum, AI..."
                  value={libraryQuery}
                  onChange={(e) => setLibraryQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredBooks.map((book) => (
                <div 
                  key={book.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-cyan-300 dark:hover:border-cyan-600 transition-all flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                        {book.shelfLocation}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950/70 text-cyan-800 dark:text-cyan-300">
                        {book.category}
                      </span>
                    </div>
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white">{book.title}</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Author: {book.author}</p>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2 pt-1">
                      <span>Shelf: <strong className="text-slate-700 dark:text-slate-300">{book.shelfLocation}</strong></span>
                      <span>•</span>
                      <span>Copies: <strong className="text-emerald-700 dark:text-emerald-400">{book.availableCopies} available</strong></span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleBookReservation(book.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                      book.isReserved
                        ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                        : 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-xs'
                    }`}
                  >
                    {book.isReserved ? (
                      <>
                        <BookmarkCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>Reserved</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-4 h-4" />
                        <span>Reserve</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. CAMPUS EVENTS SECTION */}
      {activeSubSection === 'events' && (
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Upcoming Campus Hackathons, Fests & Seminars</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Register in one click to generate your electronic gate badge and entry ticket.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {campusEvents.map((evt) => (
              <div 
                key={evt.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-600 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-indigo-50 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
                      {evt.category}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      {evt.registeredCount} Registered
                    </span>
                  </div>

                  <h5 className="font-extrabold text-sm text-slate-900 dark:text-white">{evt.title}</h5>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">{evt.description}</p>
                  
                  <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1 pt-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{evt.date} • {evt.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{evt.location}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleEventRegistration(evt.id)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    evt.isRegistered
                      ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                  }`}
                >
                  {evt.isRegistered ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Pass Issued (Entry Confirmed)</span>
                    </>
                  ) : (
                    <>
                      <Ticket className="w-4 h-4" />
                      <span>Claim Free Student Entry Pass</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Book Campus Facility</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Automated conflict detection prevents double bookings.</p>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleBooking} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Select Space</label>
                <select
                  value={selectedVenue.name}
                  onChange={(e) => {
                    const found = AVAILABLE_VENUES.find(v => v.name === e.target.value);
                    if (found) setSelectedVenue(found);
                  }}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
                >
                  {AVAILABLE_VENUES.map((v) => (
                    <option key={v.name} value={v.name}>{v.name} ({v.type})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Slot</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="09:00 - 11:00">09:00 - 11:00</option>
                    <option value="11:30 - 13:30">11:30 - 13:30</option>
                    <option value="14:00 - 16:00">14:00 - 16:00</option>
                    <option value="16:00 - 18:00">16:00 - 18:00</option>
                    <option value="18:30 - 20:30">18:30 - 20:30</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Purpose / Club Name *</label>
                <textarea
                  required
                  rows={2}
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="e.g. ACM Student Chapter technical paper review session"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Facility Feedback Modal */}
      {selectedBookingForFeedback && (
        <FacilityFeedbackModal
          booking={selectedBookingForFeedback}
          isOpen={feedbackModalOpen}
          onClose={() => {
            setFeedbackModalOpen(false);
            setSelectedBookingForFeedback(null);
          }}
          onSubmit={handleFeedbackSubmit}
        />
      )}

      {/* Peer Venue Reviews Modal */}
      {selectedVenueForReviews && (
        <VenueReviewsModal
          venueName={selectedVenueForReviews}
          isOpen={reviewsModalOpen}
          onClose={() => {
            setReviewsModalOpen(false);
            setSelectedVenueForReviews(null);
          }}
          bookings={facilities}
        />
      )}
    </div>
  );
};
