import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { OutpassRequest, FacilityBooking, OutpassStatus } from '../../types';
import { ForgotPasswordModal } from '../ForgotPasswordModal';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Building2, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  QrCode, 
  ShieldCheck, 
  Edit3, 
  Save, 
  X, 
  Sparkles, 
  Filter, 
  Search, 
  FileCheck2, 
  GraduationCap, 
  KeyRound, 
  Printer,
  ChevronRight,
  ExternalLink,
  Award,
  Layers
} from 'lucide-react';

type ProfileSectionTab = 'all' | 'account' | 'passes' | 'bookings';

interface UserProfilePageProps {
  onBack?: () => void;
}

export const UserProfilePage: React.FC<UserProfilePageProps> = ({ onBack }) => {
  const { currentUser, role, outpasses, facilities, updateUserProfile, setCurrentView, language, t } = useCampus();
  
  const [activeTab, setActiveTab] = useState<ProfileSectionTab>('all');
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordSuccessToast, setPasswordSuccessToast] = useState('');
  
  // Gate pass state
  const [passFilter, setPassFilter] = useState<'All' | OutpassStatus>('All');
  const [passSearch, setPassSearch] = useState('');
  const [selectedQrPass, setSelectedQrPass] = useState<OutpassRequest | null>(null);

  // Facility bookings state
  const [bookingFilter, setBookingFilter] = useState<'All' | 'Confirmed' | 'Pending' | 'Rejected'>('All');
  const [bookingSearch, setBookingSearch] = useState('');
  const [selectedBookingVoucher, setSelectedBookingVoucher] = useState<FacilityBooking | null>(null);

  // Edit form state
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editEmail, setEditEmail] = useState(currentUser?.email || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');
  const [editRoom, setEditRoom] = useState(currentUser?.roomNo || '');
  const [editHostel, setEditHostel] = useState(currentUser?.hostelBlock || '');
  const [editDepartment, setEditDepartment] = useState(currentUser?.department || '');
  const [editDesignation, setEditDesignation] = useState(currentUser?.designation || '');
  const [editYear, setEditYear] = useState(currentUser?.year || '');
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  if (!currentUser) return null;

  // Filter personal outpasses
  const myOutpasses = outpasses.filter(o => 
    o.studentId === currentUser.studentId || 
    o.studentName.toLowerCase() === currentUser.name.toLowerCase() ||
    o.studentId === currentUser.id
  );

  const filteredOutpasses = myOutpasses.filter(o => {
    const matchesStatus = passFilter === 'All' || o.status === passFilter;
    const matchesQuery = 
      o.destination.toLowerCase().includes(passSearch.toLowerCase()) ||
      o.reason.toLowerCase().includes(passSearch.toLowerCase()) ||
      o.id.toLowerCase().includes(passSearch.toLowerCase()) ||
      o.outpassType.toLowerCase().includes(passSearch.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  const approvedPassCount = myOutpasses.filter(o => o.status === 'Approved').length;
  const pendingPassCount = myOutpasses.filter(o => o.status === 'Pending').length;

  // Filter personal facility bookings
  const myBookings = facilities.filter(f => 
    f.bookedBy === currentUser.id || 
    f.requesterName.toLowerCase().includes(currentUser.name.toLowerCase())
  );

  const filteredBookings = myBookings.filter(b => {
    const matchesStatus = bookingFilter === 'All' || b.status === bookingFilter;
    const matchesQuery = 
      b.facilityName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.purpose.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.id.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.location.toLowerCase().includes(bookingSearch.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  const confirmedBookingCount = myBookings.filter(b => b.status === 'Confirmed').length;
  const pendingBookingCount = myBookings.filter(b => b.status === 'Pending').length;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: editName,
      email: editEmail,
      phone: editPhone,
      roomNo: editRoom,
      hostelBlock: editHostel,
      department: editDepartment,
      designation: editDesignation,
      year: editYear
    });
    setIsEditing(false);
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 4000);
  };

  const handleBackToDashboard = () => {
    if (onBack) {
      onBack();
    } else {
      setCurrentView('dashboard');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Header Bar with Breadcrumb and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
            <button
              onClick={handleBackToDashboard}
              className="hover:text-indigo-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Campus Hub</span>
            </button>
            <span>/</span>
            <span className="text-slate-900 font-bold">User Profile & History</span>
          </div>

          <div className="flex items-center space-x-3 pt-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {currentUser.name}
            </h1>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
              role === 'student' 
                ? 'bg-emerald-100 text-emerald-800' 
                : 'bg-indigo-100 text-indigo-800'
            }`}>
              {role === 'student' ? (
                <>
                  <GraduationCap className="w-3.5 h-3.5" /> Student Account
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" /> Administrator
                </>
              )}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            {currentUser.department} • {role === 'student' ? `Roll No: ${currentUser.studentId}` : currentUser.designation}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!isEditing ? (
            <button
              id="btn-edit-profile-toggle"
              onClick={() => {
                setEditName(currentUser.name);
                setEditEmail(currentUser.email);
                setEditPhone(currentUser.phone || '');
                setEditRoom(currentUser.roomNo || '');
                setEditHostel(currentUser.hostelBlock || '');
                setEditDepartment(currentUser.department || '');
                setEditDesignation(currentUser.designation || '');
                setEditYear(currentUser.year || '');
                setIsEditing(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Edit Account Details</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Cancel Editing</span>
            </button>
          )}

          <button
            onClick={handleBackToDashboard}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Campus Dashboard</span>
          </button>
        </div>
      </div>

      {/* Profile Update Success Toast */}
      {saveSuccessNotice && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-900 flex items-center justify-between shadow-2xs animate-in fade-in">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Your account credentials and campus residence details were successfully saved!</span>
          </div>
          <button onClick={() => setSaveSuccessNotice(false)} className="text-emerald-700 hover:text-emerald-900">✕</button>
        </div>
      )}

      {/* Top Section Tabs */}
      <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'all'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{t.tabAllProfile}</span>
        </button>

        <button
          onClick={() => setActiveTab('account')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'account'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>{t.tabAccountDetails}</span>
        </button>

        <button
          onClick={() => setActiveTab('passes')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'passes'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>{t.tabPassHistory}</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
            activeTab === 'passes' ? 'bg-white text-indigo-700' : 'bg-slate-100 text-slate-700'
          }`}>
            {myOutpasses.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'bookings'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Building className="w-3.5 h-3.5" />
          <span>{t.tabVenueBookings}</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
            activeTab === 'bookings' ? 'bg-white text-indigo-700' : 'bg-slate-100 text-slate-700'
          }`}>
            {myBookings.length}
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: ACCOUNT DETAILS (Shown on 'all' or 'account') */}
      {/* ========================================================================= */}
      {(activeTab === 'all' || activeTab === 'account') && (
        <div className="space-y-6">
          
          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Account Role</span>
              <div className="text-lg font-black text-slate-900 mt-1 capitalize">{currentUser.role}</div>
              <span className="text-[11px] text-emerald-600 font-medium">Verified Active</span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Gate Passes Filed</span>
              <div className="text-lg font-black text-slate-900 mt-1">{myOutpasses.length} Total</div>
              <span className="text-[11px] text-indigo-600 font-medium">{approvedPassCount} Approved</span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Space Bookings</span>
              <div className="text-lg font-black text-slate-900 mt-1">{myBookings.length} Booked</div>
              <span className="text-[11px] text-emerald-600 font-medium">{confirmedBookingCount} Confirmed</span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Campus Access</span>
              <div className="text-lg font-black text-slate-900 mt-1">Smart NFC/QR</div>
              <span className="text-[11px] text-purple-600 font-medium">Biometric Enabled</span>
            </div>
          </div>

          {/* Detailed Account Card / Edit Form */}
          {!isEditing ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-indigo-600" />
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Official Campus Account Credentials</h3>
                    <p className="text-xs text-slate-500">Registered with Central Student Information System (SIS)</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Update Contact Details</span>
                </button>
              </div>

              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  
                  {/* Avatar & Digital ID Preview */}
                  <div className="w-full md:w-64 shrink-0 flex flex-col items-center text-center p-5 bg-gradient-to-b from-slate-50 to-indigo-50/40 rounded-2xl border border-slate-200">
                    <div className="relative mb-3">
                      <img
                        src={currentUser.avatarUrl}
                        alt={currentUser.name}
                        className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-md"
                      />
                      <div className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-full ring-2 ring-white text-white">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                    </div>

                    <h4 className="font-bold text-base text-slate-900">{currentUser.name}</h4>
                    <span className="text-xs text-indigo-700 font-semibold mt-0.5">
                      {role === 'student' ? currentUser.studentId : currentUser.designation}
                    </span>
                    <span className="text-[11px] text-slate-500 mt-1 max-w-full truncate">
                      {currentUser.department}
                    </span>

                    <div className="mt-4 pt-3 border-t border-slate-200/80 w-full text-left space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400 text-[11px]">System ID:</span>
                        <span className="font-mono font-bold text-slate-700">{currentUser.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 text-[11px]">RFID Card:</span>
                        <span className="font-mono text-slate-700">RF-8829-9182</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 text-[11px]">Library Code:</span>
                        <span className="font-mono text-slate-700">LIB-2023-CS</span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Details Grid */}
                  <div className="grow w-full space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      
                      <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <User className="w-3 h-3 text-slate-500" /> Full Name
                        </span>
                        <div className="text-xs font-bold text-slate-900">{currentUser.name}</div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-500" /> Institutional Email
                        </span>
                        <div className="text-xs font-semibold text-slate-900 truncate">{currentUser.email}</div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-500" /> Phone & Emergency Contact
                        </span>
                        <div className="text-xs font-semibold text-slate-900">{currentUser.phone || '+91 98765 43210'}</div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <Building className="w-3 h-3 text-slate-500" /> Department / Faculty
                        </span>
                        <div className="text-xs font-semibold text-slate-900">{currentUser.department}</div>
                      </div>

                      {role === 'student' ? (
                        <>
                          <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                              <GraduationCap className="w-3 h-3 text-slate-500" /> Academic Enrollment
                            </span>
                            <div className="text-xs font-semibold text-slate-900">{currentUser.year || '3rd Year (Semester 5)'}</div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                              <Building2 className="w-3 h-3 text-slate-500" /> Hostel Block & Hall
                            </span>
                            <div className="text-xs font-semibold text-slate-900">{currentUser.hostelBlock || 'Aryabhata Hall - Block B'}</div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-500" /> Resident Room No
                            </span>
                            <div className="text-xs font-bold font-mono text-indigo-700">{currentUser.roomNo || 'B-314'}</div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                              <Award className="w-3 h-3 text-slate-500" /> Assigned Dining Mess
                            </span>
                            <div className="text-xs font-semibold text-slate-900">Aryabhata Mess Hall 1 (North)</div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-slate-500" /> Official Title
                            </span>
                            <div className="text-xs font-semibold text-slate-900">{currentUser.designation || 'Chief Campus Administrator'}</div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                              <Building2 className="w-3 h-3 text-slate-500" /> Admin Office
                            </span>
                            <div className="text-xs font-semibold text-slate-900">Administrative Block A, Room 102</div>
                          </div>
                        </>
                      )}

                    </div>

                    {/* Password & Security Management */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700">
                          <KeyRound className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-slate-900">
                            {t.accountSecurity}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {t.accountSecurityDesc}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowPasswordModal(true)}
                        className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5 shrink-0"
                      >
                        <KeyRound className="w-3.5 h-3.5" />
                        <span>{t.changePasswordBtn}</span>
                      </button>
                    </div>

                    {passwordSuccessToast && (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{passwordSuccessToast}</span>
                      </div>
                    )}

                    {/* Digital Pass / Gate Verification Token Banner */}
                    <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2.5 rounded-lg bg-white/10 text-indigo-300">
                          <QrCode className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-bold text-xs sm:text-sm">Campus Security Gate Clearance Token</div>
                          <div className="text-[11px] text-slate-300 font-mono">
                            TOKEN: {currentUser.studentId || currentUser.id}-ACTIVE-AUTH-2026
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[10px] uppercase tracking-wider font-mono text-emerald-400 font-bold block">
                          ✓ BIOMETRIC GATE ACCESS GRANTED
                        </span>
                        <span className="text-[10px] text-slate-400">Sync status: Active</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Editable Form View */
            <form onSubmit={handleSaveProfile} className="bg-white rounded-2xl border border-slate-300 shadow-md p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <Edit3 className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-base text-slate-900">Edit Account Details</h3>
                </div>
                <span className="text-xs text-slate-500">Updates will be saved directly to your session</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Institutional Email</label>
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={e => setEditEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone / Emergency Contact</label>
                  <input
                    type="text"
                    required
                    value={editPhone}
                    onChange={e => setEditPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Department / Academic Branch</label>
                  <input
                    type="text"
                    required
                    value={editDepartment}
                    onChange={e => setEditDepartment(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-xs"
                  />
                </div>

                {role === 'student' ? (
                  <>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Academic Year & Semester</label>
                      <input
                        type="text"
                        value={editYear}
                        onChange={e => setEditYear(e.target.value)}
                        placeholder="e.g. 3rd Year (Semester 5)"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Hostel Block & Residence Hall</label>
                      <input
                        type="text"
                        value={editHostel}
                        onChange={e => setEditHostel(e.target.value)}
                        placeholder="e.g. Aryabhata Hall - Block B"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Hostel Room Number</label>
                      <input
                        type="text"
                        value={editRoom}
                        onChange={e => setEditRoom(e.target.value)}
                        placeholder="e.g. B-314"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-xs font-mono"
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Official Designation</label>
                    <input
                      type="text"
                      value={editDesignation}
                      onChange={e => setEditDesignation(e.target.value)}
                      placeholder="e.g. Chief Campus Administrator"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-xs"
                    />
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Profile Updates</span>
                </button>
              </div>
            </form>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: PERSONAL HISTORY OF GATE PASSES (Shown on 'all' or 'passes') */}
      {/* ========================================================================= */}
      {(activeTab === 'all' || activeTab === 'passes') && (
        <div className="space-y-4 pt-2">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <FileCheck2 className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-lg text-slate-900">Personal History of Gate Passes</h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Complete audit trail of all campus exit approvals, weekend leaves, and verified gate QR passes.
              </p>
            </div>

            {/* Quick Filter Tabs for Outpasses */}
            <div className="flex items-center space-x-1.5">
              {(['All', 'Approved', 'Pending', 'Rejected'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => setPassFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    passFilter === st
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {st} ({st === 'All' ? myOutpasses.length : myOutpasses.filter(o => o.status === st).length})
                </button>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div className="relative w-full max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search destination, pass ID, or reason..."
              value={passSearch}
              onChange={e => setPassSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Outpass List */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            {filteredOutpasses.length === 0 ? (
              <div className="p-10 text-center space-y-2">
                <FileCheck2 className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs text-slate-600 font-semibold">No gate passes found matching current filters.</p>
                <p className="text-[11px] text-slate-400">
                  {role === 'student' 
                    ? 'When you request day outpasses or weekend leaves, they will be archived here.'
                    : 'Administrator account has not generated personal leave passes.'}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredOutpasses.map((pass) => (
                  <div key={pass.id} className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                    
                    <div className="space-y-1.5 grow">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                          {pass.id}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-100">
                          {pass.outpassType}
                        </span>
                        
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          pass.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                          pass.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                          'bg-rose-100 text-rose-800'
                        }`}>
                          {pass.status === 'Approved' && <CheckCircle2 className="w-3 h-3" />}
                          {pass.status === 'Pending' && <Clock className="w-3 h-3" />}
                          {pass.status === 'Rejected' && <XCircle className="w-3 h-3" />}
                          {pass.status}
                        </span>

                        <span className="text-[11px] text-slate-400">
                          Applied: {pass.appliedAt}
                        </span>
                      </div>

                      <div className="text-xs text-slate-900 font-semibold flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span>Destination: <strong>{pass.destination}</strong></span>
                      </div>

                      <div className="text-xs text-slate-600 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                        "{pass.reason}"
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 pt-0.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          Departure: <strong className="text-slate-700">{pass.departureDate} ({pass.departureTime})</strong>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          Return Expected: <strong className="text-slate-700">{pass.returnDate} ({pass.returnTime})</strong>
                        </span>
                        {pass.approvedBy && (
                          <>
                            <span>•</span>
                            <span className="text-emerald-700 font-semibold">
                              Authorized by {pass.approvedBy} {pass.reviewedAt && `on ${pass.reviewedAt}`}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center space-x-2 self-end md:self-center">
                      {pass.status === 'Approved' ? (
                        <button
                          onClick={() => setSelectedQrPass(pass)}
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>Show Gate QR Pass</span>
                        </button>
                      ) : (
                        <span className="text-xs font-mono text-slate-400 px-3 py-1.5 rounded-lg bg-slate-100">
                          {pass.status === 'Pending' ? 'Awaiting Warden Signature' : 'Request Closed'}
                        </span>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: RECENT FACILITY BOOKINGS (Shown on 'all' or 'bookings') */}
      {/* ========================================================================= */}
      {(activeTab === 'all' || activeTab === 'bookings') && (
        <div className="space-y-4 pt-2">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <Building className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-lg text-slate-900">Recent Facility & Lab Bookings</h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                History of reserved robotics sandboxes, computing clusters, seminar halls, and project study pods.
              </p>
            </div>

            {/* Quick Filter Tabs for Bookings */}
            <div className="flex items-center space-x-1.5">
              {(['All', 'Confirmed', 'Pending', 'Rejected'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => setBookingFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    bookingFilter === st
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {st} ({st === 'All' ? myBookings.length : myBookings.filter(b => b.status === st).length})
                </button>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div className="relative w-full max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search facility name, purpose, or booking ID..."
              value={bookingSearch}
              onChange={e => setBookingSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Bookings List */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            {filteredBookings.length === 0 ? (
              <div className="p-10 text-center space-y-2">
                <Building className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs text-slate-600 font-semibold">No facility reservations found matching criteria.</p>
                <p className="text-[11px] text-slate-400">
                  You can reserve campus labs, conference halls, and study pods through the campus facilities desk.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredBookings.map((b) => (
                  <div key={b.id} className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                    
                    <div className="space-y-1.5 grow">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                          {b.id}
                        </span>
                        <h4 className="font-bold text-sm text-slate-900">{b.facilityName}</h4>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {b.facilityType} (Capacity: {b.capacity})
                        </span>
                        
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                          b.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                          'bg-rose-100 text-rose-800'
                        }`}>
                          {b.status === 'Confirmed' && <CheckCircle2 className="w-3 h-3" />}
                          {b.status === 'Pending' && <Clock className="w-3 h-3" />}
                          {b.status === 'Rejected' && <XCircle className="w-3 h-3" />}
                          {b.status}
                        </span>
                      </div>

                      <p className="text-xs text-slate-700">
                        Purpose: <strong className="text-slate-900">{b.purpose}</strong>
                      </p>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 pt-0.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" /> Date: <strong className="text-slate-700">{b.date}</strong>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" /> Time Slot: <strong className="text-slate-700">{b.timeSlot}</strong>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" /> {b.location}
                        </span>
                      </div>

                      {b.notes && (
                        <div className="text-[11px] text-indigo-700 bg-indigo-50/70 p-2 rounded-lg border border-indigo-100">
                          <strong>Admin Note:</strong> {b.notes}
                        </div>
                      )}
                    </div>

                    <div className="shrink-0 flex items-center space-x-2 self-end md:self-center">
                      {b.status === 'Confirmed' ? (
                        <button
                          onClick={() => setSelectedBookingVoucher(b)}
                          className="px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs border border-indigo-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <KeyRound className="w-3.5 h-3.5" />
                          <span>Venue Access Voucher</span>
                        </button>
                      ) : (
                        <span className="text-xs font-mono text-slate-400 px-3 py-1.5 rounded-lg bg-slate-100">
                          {b.status === 'Pending' ? 'Awaiting Allocation' : 'Declined'}
                        </span>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: CRYPTOGRAPHIC GATE QR PASS (For Outpass) */}
      {/* ========================================================================= */}
      {selectedQrPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-center p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-extrabold tracking-wider uppercase text-slate-500">Security Gate Clearance Pass</span>
              <button onClick={() => setSelectedQrPass(null)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 inline-block">
              <div className="w-48 h-48 mx-auto bg-white p-3 rounded-lg border-2 border-slate-900 flex flex-col justify-between items-center relative">
                <div className="w-full flex justify-between">
                  <div className="w-10 h-10 border-4 border-slate-900 flex items-center justify-center">
                    <div className="w-4 h-4 bg-slate-900" />
                  </div>
                  <div className="w-10 h-10 border-4 border-slate-900 flex items-center justify-center">
                    <div className="w-4 h-4 bg-slate-900" />
                  </div>
                </div>

                <div className="py-1 text-center">
                  <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto" />
                  <span className="font-mono text-[10px] font-bold text-slate-800 tracking-wider block mt-1">
                    {selectedQrPass.id}
                  </span>
                </div>

                <div className="w-full flex justify-between">
                  <div className="w-10 h-10 border-4 border-slate-900 flex items-center justify-center">
                    <div className="w-4 h-4 bg-slate-900" />
                  </div>
                  <div className="text-[9px] font-mono text-slate-500 self-end">AES256-TOKEN</div>
                </div>
              </div>
            </div>

            <div className="text-xs space-y-1">
              <h4 className="font-bold text-sm text-slate-900">{selectedQrPass.studentName}</h4>
              <p className="text-slate-500">Roll: {selectedQrPass.studentId} • Room: {selectedQrPass.roomNo} ({selectedQrPass.hostelBlock})</p>
              
              <div className="p-2.5 bg-emerald-50 text-emerald-900 font-medium rounded-lg text-[11px] border border-emerald-200 mt-2 text-left space-y-1">
                <div><strong>Destination:</strong> {selectedQrPass.destination}</div>
                <div><strong>Exit Window:</strong> {selectedQrPass.departureDate} at {selectedQrPass.departureTime}</div>
                <div><strong>Return By:</strong> {selectedQrPass.returnDate} by {selectedQrPass.returnTime}</div>
                {selectedQrPass.approvedBy && (
                  <div className="text-emerald-700 pt-1 border-t border-emerald-200">
                    <strong>Approved:</strong> {selectedQrPass.approvedBy}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                onClick={() => setSelectedQrPass(null)}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs"
              >
                Close Pass
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: VENUE ACCESS VOUCHER (For Facility Bookings) */}
      {/* ========================================================================= */}
      {selectedBookingVoucher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <KeyRound className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-base text-slate-900">Venue Entry Voucher</h3>
              </div>
              <button onClick={() => setSelectedBookingVoucher(null)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-amber-300 font-bold">{selectedBookingVoucher.id}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-300 text-[10px] font-bold uppercase">
                  Confirmed Entry
                </span>
              </div>
              <h4 className="text-base font-bold text-white">{selectedBookingVoucher.facilityName}</h4>
              <p className="text-xs text-slate-300">{selectedBookingVoucher.location}</p>
              
              <div className="pt-2 border-t border-white/10 flex justify-between text-xs text-slate-300">
                <span>Date: <strong>{selectedBookingVoucher.date}</strong></span>
                <span>Time: <strong>{selectedBookingVoucher.timeSlot}</strong></span>
              </div>
            </div>

            <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-indigo-950 font-bold">Electronic Smart Lock Code:</span>
                <span className="font-mono font-black text-sm text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200">
                  PIN: 4829#
                </span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Enter this 4-digit code on the digital door keypad to unlock the facility during your scheduled slot.
              </p>
            </div>

            <div className="text-xs text-slate-600 space-y-1">
              <span className="font-bold text-slate-800 block">Booking Purpose:</span>
              <p className="italic bg-slate-50 p-2 rounded-lg border border-slate-100">{selectedBookingVoucher.purpose}</p>
              {selectedBookingVoucher.notes && (
                <p className="text-slate-500 text-[11px] mt-1">
                  <strong>Access Notes:</strong> {selectedBookingVoucher.notes}
                </p>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedBookingVoucher(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Account Password Reset Modal */}
      {currentUser && (
        <ForgotPasswordModal
          isOpen={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
          initialRole={role || 'student'}
          initialIdentifier={currentUser.studentId || currentUser.email}
          onPasswordResetSuccess={() => {
            setPasswordSuccessToast(
              language === 'odia_mix'
                ? 'Password ସଫଳତାର ସହ ପରିବର୍ତ୍ତିତ ହେଲା! ନୂତନ Password ସେଭ୍ ହୋଇଛି।'
                : language === 'odia'
                ? 'ପାସୱାର୍ଡ ସଫଳତାର ସହ ପରିବର୍ତ୍ତିତ ହୋଇଛି! ନୂତନ ପାସୱାର୍ଡ ସଂରକ୍ଷିତ ହେଲା।'
                : language === 'hi'
                ? 'पासवर्ड सफलतापूर्वक बदल दिया गया है! आपका नया पासवर्ड सुरक्षित है।'
                : 'Password updated successfully! Your new password has been saved.'
            );
            setTimeout(() => setPasswordSuccessToast(''), 5000);
          }}
        />
      )}

    </div>
  );
};
