import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { OutpassRequest, FacilityBooking, OutpassStatus } from '../../types';
import { 
  ODISHA_INSTITUTES, 
  ODISHA_UNIVERSITIES, 
  DEFAULT_ODISHA_INSTITUTE, 
  DEFAULT_ODISHA_UNIVERSITY 
} from '../../data/odishaInstitutes';
import { OdishaInstituteSelector } from '../OdishaInstituteSelector';
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
  Layers,
  Palette,
  Sun,
  Moon,
  Laptop,
  Eye,
  RefreshCw,
  Camera,
  Upload,
  Link as LinkIcon,
  Trash2,
  Check,
  Image as ImageIcon
} from 'lucide-react';

type ProfileSectionTab = 'all' | 'account' | 'passes' | 'bookings' | 'appearance';

export const DEFAULT_STUDENT_AVATAR = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=250&auto=format&fit=crop&q=80';

export const STUDENT_AVATAR_PRESETS = [
  {
    id: 'default',
    name: 'Official SIS Photo',
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=250&auto=format&fit=crop&q=80',
    tag: 'Default ID'
  },
  {
    id: 'avatar-1',
    name: 'College Scholar (Male)',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&auto=format&fit=crop&q=80',
    tag: 'Academic'
  },
  {
    id: 'avatar-2',
    name: 'Tech Innovator (Female)',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&auto=format&fit=crop&q=80',
    tag: 'CSE / AI'
  },
  {
    id: 'avatar-3',
    name: 'Campus Researcher (Female)',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=250&auto=format&fit=crop&q=80',
    tag: 'Research'
  },
  {
    id: 'avatar-4',
    name: 'Engineering Student (Male)',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=250&auto=format&fit=crop&q=80',
    tag: 'Engineering'
  },
  {
    id: 'avatar-5',
    name: 'Student Ambassador (Female)',
    url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=250&auto=format&fit=crop&q=80',
    tag: 'Hostel Rep'
  }
];

// Compresses and resizes uploaded image to prevent localStorage quota errors while maintaining high display quality
export const compressImageFile = (file: File, maxWidth = 360, maxHeight = 360, quality = 0.85): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please select a valid image file (JPEG, PNG, WEBP, etc.)'));
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to parse image file.'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read photo from your device.'));
    reader.readAsDataURL(file);
  });
};

interface UserProfilePageProps {
  onBack?: () => void;
}

export const UserProfilePage: React.FC<UserProfilePageProps> = ({ onBack }) => {
  const { 
    currentUser, 
    role, 
    outpasses, 
    facilities, 
    updateUserProfile, 
    setCurrentView, 
    language, 
    t,
    theme,
    setTheme,
    toggleTheme,
    resolvedTheme,
    campusAccent,
    setCampusAccent
  } = useCampus();
  
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
  const [editInstitute, setEditInstitute] = useState(currentUser?.institute || DEFAULT_ODISHA_INSTITUTE);
  const [editUniversity, setEditUniversity] = useState(currentUser?.university || DEFAULT_ODISHA_UNIVERSITY);
  const [isCustomInstitute, setIsCustomInstitute] = useState(false);
  const [customInstituteText, setCustomInstituteText] = useState('');
  const [editRoom, setEditRoom] = useState(currentUser?.roomNo || '');
  const [editHostel, setEditHostel] = useState(currentUser?.hostelBlock || '');
  const [editDepartment, setEditDepartment] = useState(currentUser?.department || '');
  const [editDesignation, setEditDesignation] = useState(currentUser?.designation || '');
  const [editYear, setEditYear] = useState(currentUser?.year || '');
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  // Profile Photo state & customization
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [editAvatarUrl, setEditAvatarUrl] = useState(currentUser?.avatarUrl || DEFAULT_STUDENT_AVATAR);
  const [previewPhotoUrl, setPreviewPhotoUrl] = useState(currentUser?.avatarUrl || DEFAULT_STUDENT_AVATAR);
  const [photoUploadError, setPhotoUploadError] = useState('');
  const [photoUploadSuccess, setPhotoUploadSuccess] = useState('');
  const [photoModalTab, setPhotoModalTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const [inputPhotoUrl, setInputPhotoUrl] = useState('');
  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false);

  // Sync edit states when currentUser updates
  React.useEffect(() => {
    if (currentUser) {
      setEditName(currentUser.name || '');
      setEditEmail(currentUser.email || '');
      setEditPhone(currentUser.phone || '');
      setEditInstitute(currentUser.institute || DEFAULT_ODISHA_INSTITUTE);
      setEditUniversity(currentUser.university || DEFAULT_ODISHA_UNIVERSITY);
      setEditRoom(currentUser.roomNo || '');
      setEditHostel(currentUser.hostelBlock || '');
      setEditDepartment(currentUser.department || '');
      setEditDesignation(currentUser.designation || '');
      setEditYear(currentUser.year || '');
      if (currentUser.avatarUrl) {
        setEditAvatarUrl(currentUser.avatarUrl);
        setPreviewPhotoUrl(currentUser.avatarUrl);
      }
    }
  }, [currentUser]);

  if (!currentUser) return null;

  // Photo upload and selection handlers
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoUploadError('');
    setIsProcessingPhoto(true);
    try {
      if (file.size > 15 * 1024 * 1024) {
        throw new Error('Image file is too large (max 15MB). Please select a smaller photo.');
      }
      const compressedDataUrl = await compressImageFile(file);
      setPreviewPhotoUrl(compressedDataUrl);
      setEditAvatarUrl(compressedDataUrl);
      updateUserProfile({ avatarUrl: compressedDataUrl });
      setShowPhotoModal(false);
      setPhotoUploadSuccess(
        language === 'odia_mix'
          ? `ଫଟୋ "${file.name}" ସଫଳତାର ସହ ଅପଲୋଡ ହେଲା! Student ID Card ରେ ସିଙ୍କ୍ ହୋଇଛି।`
          : language === 'odia'
          ? `ଆପଣଙ୍କ ଫଟୋ "${file.name}" ସଫଳତାର ସହ ଅପଲୋଡ୍ ହୋଇଛି!`
          : language === 'hi'
          ? `आपकी फोटो "${file.name}" सफलतापूर्वक अपलोड हो गई है!`
          : `Photo "${file.name}" uploaded and set as your profile picture!`
      );
      setTimeout(() => setPhotoUploadSuccess(''), 4500);
    } catch (err: any) {
      setPhotoUploadError(err.message || 'Failed to process photo.');
    } finally {
      setIsProcessingPhoto(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleApplyPhotoModal = (newUrl: string) => {
    if (!newUrl) return;
    updateUserProfile({ avatarUrl: newUrl });
    setEditAvatarUrl(newUrl);
    setPreviewPhotoUrl(newUrl);
    setShowPhotoModal(false);
    setPhotoUploadSuccess(
      language === 'odia_mix'
        ? 'ପ୍ରୋଫାଇଲ ଫଟୋ ସଫଳତାର ସହ ଅପଡେଟ୍ ହେଲା ଏବଂ Digital ID Card ରେ ସିଙ୍କ୍ ହୋଇଛି!'
        : language === 'odia'
        ? 'ପ୍ରୋଫାଇଲ୍ ଫଟୋ ସଫଳତାର ସହ ପରିବର୍ତ୍ତିତ ହୋଇଛି!'
        : language === 'hi'
        ? 'प्रोफ़ाइल फोटो सफलतापूर्वक अपडेट हो गई है!'
        : 'Profile photo updated successfully and synced with your Student ID Card!'
    );
    setTimeout(() => setPhotoUploadSuccess(''), 4500);
  };

  const handleResetToDefaultPhoto = () => {
    updateUserProfile({ avatarUrl: DEFAULT_STUDENT_AVATAR });
    setEditAvatarUrl(DEFAULT_STUDENT_AVATAR);
    setPreviewPhotoUrl(DEFAULT_STUDENT_AVATAR);
    setShowPhotoModal(false);
    setPhotoUploadSuccess(
      language === 'odia_mix'
        ? 'ଅଫିସିଆଲ୍ SIS Student ID ଫଟୋ ରିସେଟ୍ ହେଲା।'
        : language === 'odia'
        ? 'ପୂର୍ବ ନିର୍ଦ୍ଧାରିତ ଛାତ୍ର ଫଟୋ ପୁନଃସ୍ଥାପିତ ହେଲା।'
        : language === 'hi'
        ? 'आधिकारिक छात्र आईडी फोटो रीसेट कर दी गई है।'
        : 'Restored official Central SIS student ID photo.'
    );
    setTimeout(() => setPhotoUploadSuccess(''), 4500);
  };

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
    const finalInst = isCustomInstitute && customInstituteText.trim() ? customInstituteText.trim() : editInstitute;
    updateUserProfile({
      name: editName,
      email: editEmail,
      phone: editPhone,
      institute: finalInst,
      university: editUniversity,
      roomNo: editRoom,
      hostelBlock: editHostel,
      department: editDepartment,
      designation: editDesignation,
      year: editYear,
      avatarUrl: editAvatarUrl || currentUser.avatarUrl
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <button
              onClick={handleBackToDashboard}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Campus Hub</span>
            </button>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-200 font-bold">User Profile & History</span>
          </div>

          <div className="flex items-center space-x-3 pt-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {currentUser.name}
            </h1>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
              role === 'student' 
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300' 
                : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300'
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
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
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
                setEditInstitute(currentUser.institute || DEFAULT_ODISHA_INSTITUTE);
                setEditUniversity(currentUser.university || DEFAULT_ODISHA_UNIVERSITY);
                setIsCustomInstitute(false);
                setCustomInstituteText('');
                setEditRoom(currentUser.roomNo || '');
                setEditHostel(currentUser.hostelBlock || '');
                setEditDepartment(currentUser.department || '');
                setEditDesignation(currentUser.designation || '');
                setEditYear(currentUser.year || '');
                setIsEditing(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Edit Account Details</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Cancel Editing</span>
            </button>
          )}

          <button
            onClick={handleBackToDashboard}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer border border-transparent dark:border-slate-700"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Campus Dashboard</span>
          </button>
        </div>
      </div>

      {/* Profile Update Success Toast */}
      {saveSuccessNotice && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-semibold text-emerald-900 dark:text-emerald-200 flex items-center justify-between shadow-2xs animate-in fade-in">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Your account credentials and campus residence details were successfully saved!</span>
          </div>
          <button onClick={() => setSaveSuccessNotice(false)} className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 cursor-pointer">✕</button>
        </div>
      )}

      {/* Profile Photo Update Success Toast */}
      {photoUploadSuccess && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-semibold text-emerald-900 dark:text-emerald-200 flex items-center justify-between shadow-2xs animate-in fade-in">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{photoUploadSuccess}</span>
          </div>
          <button onClick={() => setPhotoUploadSuccess('')} className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 cursor-pointer">✕</button>
        </div>
      )}

      {/* Top Section Tabs */}
      <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'all'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
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
              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>{t.tabAccountDetails}</span>
        </button>

        <button
          onClick={() => setActiveTab('appearance')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'appearance'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Theme & Appearance</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
            activeTab === 'appearance' ? 'bg-white text-indigo-700' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
          }`}>
            {theme === 'dark' ? 'Night' : theme === 'light' ? 'Day' : 'Auto'}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('passes')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'passes'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
        >
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>{t.tabPassHistory}</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
            activeTab === 'passes' ? 'bg-white text-indigo-700' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
          }`}>
            {myOutpasses.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'bookings'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
        >
          <Building className="w-3.5 h-3.5" />
          <span>{t.tabVenueBookings}</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
            activeTab === 'bookings' ? 'bg-white text-indigo-700' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
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
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Account Role</span>
              <div className="text-lg font-black text-slate-900 dark:text-white mt-1 capitalize">{currentUser.role}</div>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Verified Active</span>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Gate Passes Filed</span>
              <div className="text-lg font-black text-slate-900 dark:text-white mt-1">{myOutpasses.length} Total</div>
              <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">{approvedPassCount} Approved</span>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Space Bookings</span>
              <div className="text-lg font-black text-slate-900 dark:text-white mt-1">{myBookings.length} Booked</div>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">{confirmedBookingCount} Confirmed</span>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Campus Access</span>
              <div className="text-lg font-black text-slate-900 dark:text-white mt-1">Smart NFC/QR</div>
              <span className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">Biometric Enabled</span>
            </div>
          </div>

          {/* Detailed Account Card / Edit Form */}
          {!isEditing ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-850/50">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">Official Campus Account Credentials</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Registered with Central Student Information System (SIS)</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Update Contact Details</span>
                </button>
              </div>

              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  
                  {/* Avatar & Digital ID Preview */}
                  <div className="w-full md:w-64 shrink-0 flex flex-col items-center text-center p-5 bg-gradient-to-b from-slate-50 to-indigo-50/40 dark:from-slate-850 dark:to-slate-900 rounded-2xl border border-slate-200 dark:border-slate-750">
                    <div className="relative mb-2.5 group">
                      <img
                        src={currentUser.avatarUrl}
                        alt={currentUser.name}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = DEFAULT_STUDENT_AVATAR;
                        }}
                        className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-800 shadow-md transition-transform group-hover:scale-102"
                      />
                      <div className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-800 text-white shadow-xs">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewPhotoUrl(currentUser.avatarUrl);
                          setShowPhotoModal(true);
                        }}
                        className="absolute inset-0 bg-slate-900/65 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white backdrop-blur-xs cursor-pointer gap-1"
                        title="Click to upload or update profile photo"
                      >
                        <Camera className="w-5 h-5 text-indigo-300" />
                        <span className="text-[10px] font-bold">Change Photo</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setPreviewPhotoUrl(currentUser.avatarUrl);
                        setShowPhotoModal(true);
                      }}
                      className="mb-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800/80 transition-all cursor-pointer shadow-2xs"
                    >
                      <Camera className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                      <span>{role === 'student' ? 'Upload Student Photo' : 'Update Profile Photo'}</span>
                    </button>

                    <h4 className="font-bold text-base text-slate-900 dark:text-white">{currentUser.name}</h4>
                    <span className="text-xs text-indigo-700 dark:text-indigo-400 font-semibold mt-0.5">
                      {role === 'student' ? currentUser.studentId : currentUser.designation}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 max-w-full truncate">
                      {currentUser.department}
                    </span>

                    <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 w-full text-left space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400 text-[11px]">System ID:</span>
                        <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{currentUser.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 text-[11px]">RFID Card:</span>
                        <span className="font-mono text-slate-700 dark:text-slate-300">RF-8829-9182</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 text-[11px]">Library Code:</span>
                        <span className="font-mono text-slate-700 dark:text-slate-300">LIB-2023-CS</span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Details Grid */}
                  <div className="grow w-full space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      
                      {/* College / Institute & University Card (Odisha) */}
                      <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50/90 via-white to-indigo-50/60 dark:from-slate-850 dark:via-slate-900 dark:to-slate-850 border border-indigo-200 dark:border-slate-700 space-y-2 sm:col-span-2 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Building2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> College & University Credentials (Odisha)
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] px-2 py-0.5 rounded-full font-bold bg-indigo-600 text-white shadow-2xs">
                              Odisha Enrolled
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setEditInstitute(currentUser.institute || DEFAULT_ODISHA_INSTITUTE);
                                setEditUniversity(currentUser.university || DEFAULT_ODISHA_UNIVERSITY);
                                setIsCustomInstitute(false);
                                setCustomInstituteText('');
                                setIsEditing(true);
                              }}
                              className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-white bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 border border-indigo-200 dark:border-slate-700 px-2 py-0.5 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                              title="Edit College or University"
                            >
                              <Edit3 className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                              <span>Edit College / Univ</span>
                            </button>
                          </div>
                        </div>
                        <div className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white pt-0.5">
                          {currentUser.institute || DEFAULT_ODISHA_INSTITUTE}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-300 flex flex-wrap items-center gap-2 pt-0.5">
                          <span className="font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <GraduationCap className="w-3.5 h-3.5 text-indigo-500" /> Affiliating University:
                          </span>
                          <span className="font-bold text-indigo-800 dark:text-indigo-300 bg-indigo-100/70 dark:bg-indigo-950/80 px-2 py-0.5 rounded-md">
                            {currentUser.university || DEFAULT_ODISHA_UNIVERSITY}
                          </span>
                        </div>
                        <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          <span>Higher Education Department, Government of Odisha • Verified Status</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-800 space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <GraduationCap className="w-3 h-3 text-slate-500 dark:text-slate-400" /> Affiliating University
                        </span>
                        <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {currentUser.university || DEFAULT_ODISHA_UNIVERSITY}
                        </div>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium block">Recognized by Higher Education Dept</span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-800 space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <User className="w-3 h-3 text-slate-500 dark:text-slate-400" /> Full Name
                        </span>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">{currentUser.name}</div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-800 space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-500 dark:text-slate-400" /> Institutional Email
                        </span>
                        <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">{currentUser.email}</div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-800 space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-500 dark:text-slate-400" /> Phone & Emergency Contact
                        </span>
                        <div className="text-xs font-semibold text-slate-900 dark:text-white">{currentUser.phone || '+91 98765 43210'}</div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-800 space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <Building className="w-3 h-3 text-slate-500 dark:text-slate-400" /> Department / Faculty
                        </span>
                        <div className="text-xs font-semibold text-slate-900 dark:text-white">{currentUser.department}</div>
                      </div>

                      {role === 'student' ? (
                        <>
                          <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-800 space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                              <GraduationCap className="w-3 h-3 text-slate-500 dark:text-slate-400" /> Academic Enrollment
                            </span>
                            <div className="text-xs font-semibold text-slate-900 dark:text-white">{currentUser.year || '3rd Year (Semester 5)'}</div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-800 space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                              <Building2 className="w-3 h-3 text-slate-500 dark:text-slate-400" /> Hostel Block & Hall
                            </span>
                            <div className="text-xs font-semibold text-slate-900 dark:text-white">{currentUser.hostelBlock || 'Aryabhata Hall - Block B'}</div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-800 space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-500 dark:text-slate-400" /> Resident Room No
                            </span>
                            <div className="text-xs font-bold font-mono text-indigo-700 dark:text-indigo-400">{currentUser.roomNo || 'B-314'}</div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-800 space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                              <Award className="w-3 h-3 text-slate-500 dark:text-slate-400" /> Assigned Dining Mess
                            </span>
                            <div className="text-xs font-semibold text-slate-900 dark:text-white">Aryabhata Mess Hall 1 (North)</div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-800 space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-slate-500 dark:text-slate-400" /> Official Title
                            </span>
                            <div className="text-xs font-semibold text-slate-900 dark:text-white">{currentUser.designation || 'Chief Campus Administrator'}</div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-800 space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                              <Building2 className="w-3 h-3 text-slate-500 dark:text-slate-400" /> Admin Office
                            </span>
                            <div className="text-xs font-semibold text-slate-900 dark:text-white">Administrative Block A, Room 102</div>
                          </div>
                        </>
                      )}

                    </div>

                    {/* Password & Security Management */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/90 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
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
            <form onSubmit={handleSaveProfile} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-300 dark:border-slate-800 shadow-md p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <Edit3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Edit Account & Profile Details</h3>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">Updates will be saved directly to your session</span>
              </div>

              {/* Photo Upload & Avatar Customization Card inside Edit Form */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-50/80 via-slate-50/80 to-purple-50/40 dark:from-slate-850 dark:via-slate-850 dark:to-indigo-950/30 border border-indigo-200 dark:border-slate-750 flex flex-col sm:flex-row items-center gap-5">
                <div className="relative shrink-0">
                  <img
                    src={editAvatarUrl || currentUser.avatarUrl || DEFAULT_STUDENT_AVATAR}
                    alt={currentUser.name}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = DEFAULT_STUDENT_AVATAR;
                    }}
                    className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-800 shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-800 text-white shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="space-y-2 grow min-w-0 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {role === 'student' ? 'Student Profile Photo / ଆପଣଙ୍କ ଫଟୋ' : 'Profile Picture'}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                      Syncs with ID Card
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Upload your personal college photo or choose a student avatar. Image is saved to your profile and displayed on your Digital ID Card.
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                    <label className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg cursor-pointer text-xs flex items-center gap-1.5 shadow-2xs transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isProcessingPhoto ? 'Processing...' : 'Upload Photo File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={isProcessingPhoto}
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => setShowPhotoModal(true)}
                      className="px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-lg text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Camera className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Photo Options & Presets</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleResetToDefaultPhoto}
                      className="px-2.5 py-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Reset Photo</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* College / Institute & Affiliating University Selector (Odisha) */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-indigo-100 dark:border-slate-800 shadow-2xs">
                  <OdishaInstituteSelector
                    selectedInstitute={editInstitute}
                    onInstituteChange={setEditInstitute}
                    selectedUniversity={editUniversity}
                    onUniversityChange={setEditUniversity}
                    isCustom={isCustomInstitute}
                    onCustomChange={setIsCustomInstitute}
                    customText={customInstituteText}
                    onCustomTextChange={setCustomInstituteText}
                    label="College / Institute Name (Odisha All Colleges & Institutes)"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      required
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Institutional Email</label>
                    <input
                      type="email"
                      required
                      value={editEmail}
                      onChange={e => setEditEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Phone / Emergency Contact</label>
                    <input
                      type="text"
                      required
                      value={editPhone}
                      onChange={e => setEditPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Department / Academic Branch</label>
                    <input
                      type="text"
                      required
                      value={editDepartment}
                      onChange={e => setEditDepartment(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 text-xs"
                    />
                  </div>

                  {role === 'student' ? (
                    <>
                      <div>
                        <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Academic Year & Semester</label>
                        <input
                          type="text"
                          value={editYear}
                          onChange={e => setEditYear(e.target.value)}
                          placeholder="e.g. 3rd Year (Semester 5)"
                          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Hostel Block & Residence Hall</label>
                        <input
                          type="text"
                          value={editHostel}
                          onChange={e => setEditHostel(e.target.value)}
                          placeholder="e.g. Aryabhata Hall - Block B"
                          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Hostel Room Number</label>
                        <input
                          type="text"
                          value={editRoom}
                          onChange={e => setEditRoom(e.target.value)}
                          placeholder="e.g. B-314"
                          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 text-xs font-mono"
                        />
                      </div>
                    </>
                  ) : (
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Official Designation</label>
                      <input
                        type="text"
                        value={editDesignation}
                        onChange={e => setEditDesignation(e.target.value)}
                        placeholder="e.g. Chief Campus Administrator"
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 text-xs"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
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
      {/* SECTION: THEME & VISUAL APPEARANCE (Shown on 'all' or 'appearance') */}
      {/* ========================================================================= */}
      {(activeTab === 'all' || activeTab === 'appearance') && (
        <div className="space-y-6 pt-2">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-2xs border border-indigo-100 dark:border-indigo-800">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Theme & Visual Appearance</span>
                  <span className="text-xs font-normal text-slate-500 dark:text-slate-400">/ ଥିମ୍ ଏବଂ ଭିଜୁଆଲ୍ ଡିସପ୍ଲେ</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Customize day/night contrast, system auto-sync, and Odisha university campus accent colors.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Active: {theme === 'dark' ? 'Night Mode' : theme === 'light' ? 'Day Mode' : `Auto (${resolvedTheme})`}</span>
              </span>
            </div>
          </div>

          {/* Theme Mode Segmented Cards Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Display Mode / ଡିସପ୍ଲେ ମୋଡ୍
              </h4>
              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                Instant zero-reload switch across all campus tabs
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Light Mode Card */}
              <div
                onClick={() => setTheme('light')}
                className={`relative rounded-2xl p-5 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  theme === 'light'
                    ? 'border-indigo-600 bg-white dark:bg-slate-900 shadow-md ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 flex items-center justify-center">
                      <Sun className="w-5 h-5" />
                    </div>
                    {theme === 'light' ? (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-600 text-white flex items-center gap-1 shadow-2xs">
                        <CheckCircle2 className="w-3 h-3" /> Selected
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-slate-400">Click to set</span>
                    )}
                  </div>

                  <h5 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>Light Mode</span>
                    <span className="text-xs font-normal text-slate-500 dark:text-slate-400">(Day / ଦିନ)</span>
                  </h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Crisp, high-contrast daylight theme. Ideal for well-lit lecture halls, classrooms, and outdoor campus study.
                  </p>
                </div>

                {/* Mini Preview Box */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-indigo-600" />
                      <span className="font-bold text-slate-800">UniSphere OS</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-slate-700 font-semibold border border-slate-200">
                      Day Preview
                    </span>
                  </div>
                </div>
              </div>

              {/* Dark Mode Card */}
              <div
                onClick={() => setTheme('dark')}
                className={`relative rounded-2xl p-5 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  theme === 'dark'
                    ? 'border-indigo-600 bg-white dark:bg-slate-900 shadow-md ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center">
                      <Moon className="w-5 h-5" />
                    </div>
                    {theme === 'dark' ? (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-600 text-white flex items-center gap-1 shadow-2xs">
                        <CheckCircle2 className="w-3 h-3" /> Selected
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-slate-400">Click to set</span>
                    )}
                  </div>

                  <h5 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>Dark Mode</span>
                    <span className="text-xs font-normal text-slate-500 dark:text-slate-400">(Night / ରାତି)</span>
                  </h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Deep slate-950 midnight background with reduced glare. Designed for late-night hostel coding, study, and OLED battery preservation.
                  </p>
                </div>

                {/* Mini Preview Box */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-indigo-400" />
                      <span className="font-bold text-white">UniSphere OS</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 font-semibold border border-slate-800">
                      Night Preview
                    </span>
                  </div>
                </div>
              </div>

              {/* System Preference Card */}
              <div
                onClick={() => setTheme('system')}
                className={`relative rounded-2xl p-5 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  theme === 'system'
                    ? 'border-indigo-600 bg-white dark:bg-slate-900 shadow-md ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800 flex items-center justify-center">
                      <Laptop className="w-5 h-5" />
                    </div>
                    {theme === 'system' ? (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-600 text-white flex items-center gap-1 shadow-2xs">
                        <CheckCircle2 className="w-3 h-3" /> Selected
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-slate-400">Click to set</span>
                    )}
                  </div>

                  <h5 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>System Sync</span>
                    <span className="text-xs font-normal text-slate-500 dark:text-slate-400">(Device / ସିଷ୍ଟମ୍)</span>
                  </h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Automatically follows your operating system day/night schedule. Switch to night automatically at dusk.
                  </p>
                </div>

                {/* Mini Preview Box */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-2.5 rounded-xl bg-gradient-to-r from-slate-100 via-slate-200 to-slate-900 border border-slate-300 dark:border-slate-700 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">OS Schedule</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold">
                      Auto ({resolvedTheme})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Campus Accent Palette Section */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>University Campus Accent Colors / କ୍ୟାମ୍ପସ୍ ରଙ୍ଗ</span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Curated color accents inspired by Odisha academic traditions, heritage, and eco-campuses.
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Active Accent:</span>
                <span className="text-xs font-bold capitalize text-slate-900 dark:text-white px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  {campusAccent}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Indigo Accent */}
              <button
                type="button"
                onClick={() => setCampusAccent('indigo')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                  campusAccent === 'indigo'
                    ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-750 bg-slate-50/50 dark:bg-slate-850'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  {campusAccent === 'indigo' ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-2.5 h-2.5 rounded-full bg-white/70" />}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                    <span>Royal Indigo</span>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">Utkal & Technical Core</div>
                </div>
              </button>

              {/* Amber Accent */}
              <button
                type="button"
                onClick={() => setCampusAccent('amber')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                  campusAccent === 'amber'
                    ? 'border-amber-500 bg-amber-50/70 dark:bg-amber-950/40 ring-2 ring-amber-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-750 bg-slate-50/50 dark:bg-slate-850'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  {campusAccent === 'amber' ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-2.5 h-2.5 rounded-full bg-white/70" />}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                    <span>Konark Gold</span>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">Sun Temple Warm Glow</div>
                </div>
              </button>

              {/* Emerald Accent */}
              <button
                type="button"
                onClick={() => setCampusAccent('emerald')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                  campusAccent === 'emerald'
                    ? 'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-750 bg-slate-50/50 dark:bg-slate-850'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  {campusAccent === 'emerald' ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-2.5 h-2.5 rounded-full bg-white/70" />}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                    <span>Similipal Green</span>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">Eco-Campus Botanical</div>
                </div>
              </button>

              {/* Cyan Accent */}
              <button
                type="button"
                onClick={() => setCampusAccent('cyan')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                  campusAccent === 'cyan'
                    ? 'border-cyan-600 bg-cyan-50/70 dark:bg-cyan-950/40 ring-2 ring-cyan-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-cyan-300 dark:hover:border-cyan-750 bg-slate-50/50 dark:bg-slate-850'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  {campusAccent === 'cyan' ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-2.5 h-2.5 rounded-full bg-white/70" />}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                    <span>Chilika Azure</span>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">Coastal Blue Waters</div>
                </div>
              </button>
            </div>

            {/* Live Interactive UI Component Showcase */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2.5">
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                Live Interface Preview with Current Theme
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-xl text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 ${
                    campusAccent === 'amber' ? 'bg-amber-600 hover:bg-amber-700' :
                    campusAccent === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-700' :
                    campusAccent === 'cyan' ? 'bg-cyan-600 hover:bg-cyan-700' :
                    'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Primary Campus Action</span>
                </button>

                <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    campusAccent === 'amber' ? 'bg-amber-500' :
                    campusAccent === 'emerald' ? 'bg-emerald-500' :
                    campusAccent === 'cyan' ? 'bg-cyan-500' :
                    'bg-indigo-500'
                  }`} />
                  <span>Interactive Badge</span>
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <span>Theme: <strong className="text-slate-800 dark:text-slate-200 capitalize">{theme}</strong></span>
                  <span>•</span>
                  <span>Resolved: <strong className="text-slate-800 dark:text-slate-200 capitalize">{resolvedTheme}</strong></span>
                  <span>•</span>
                  <span>Accent: <strong className="text-slate-800 dark:text-slate-200 capitalize">{campusAccent}</strong></span>
                </div>
              </div>
            </div>
          </div>

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

      {/* Student Profile Photo Modal */}
      {showPhotoModal && currentUser && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => {
            setShowPhotoModal(false);
            setPhotoUploadError('');
          }}
        >
          <div 
            className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[92vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-indigo-50/70 to-purple-50/40 dark:from-slate-850 dark:to-indigo-950/30">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-xs">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {role === 'student' ? 'Student Profile Photo / ଛାତ୍ର ପ୍ରୋଫାଇଲ ଫଟୋ' : 'Profile Photo / ପ୍ରୋଫାଇଲ ଫଟୋ'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Syncs with Student ID Card, Campus Header & SIS Records
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowPhotoModal(false);
                  setPhotoUploadError('');
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              
              {/* Photo Preview & Current Status Card */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="relative shrink-0">
                  <img
                    src={previewPhotoUrl || DEFAULT_STUDENT_AVATAR}
                    alt={currentUser.name}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = DEFAULT_STUDENT_AVATAR;
                    }}
                    className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-800 shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-800 text-white shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="space-y-1 grow min-w-0">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                    <span className="font-bold text-sm text-slate-900 dark:text-white truncate">{currentUser.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                      {currentUser.studentId || 'STUDENT'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Active student photo representation for institutional credentials.
                  </p>
                  <div className="pt-1 flex flex-wrap justify-center sm:justify-start gap-2">
                    <button
                      type="button"
                      onClick={handleResetToDefaultPhoto}
                      className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Reset to Official SIS Default</span>
                    </button>
                  </div>
                </div>
              </div>

              {photoUploadError && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/60 text-rose-700 dark:text-rose-300 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{photoUploadError}</span>
                </div>
              )}

              {/* Source Mode Tabs */}
              <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1 pb-1">
                <button
                  type="button"
                  onClick={() => setPhotoModalTab('upload')}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                    photoModalTab === 'upload'
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload from Device</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPhotoModalTab('url')}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                    photoModalTab === 'url'
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>Photo Web Link</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPhotoModalTab('presets')}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                    photoModalTab === 'presets'
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Preset Avatars</span>
                </button>
              </div>

              {/* Tab 1: Upload from Device */}
              {photoModalTab === 'upload' && (
                <div className="space-y-3">
                  <label className="block border-2 border-dashed border-indigo-300 dark:border-indigo-750 hover:border-indigo-500 dark:hover:border-indigo-400 bg-indigo-50/30 dark:bg-slate-850/60 hover:bg-indigo-50/60 rounded-2xl p-6 text-center cursor-pointer transition-all group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={isProcessingPhoto}
                    />
                    <div className="flex flex-col items-center space-y-2">
                      <div className="p-3 bg-indigo-100 dark:bg-indigo-900/60 rounded-full text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div className="font-bold text-sm text-slate-800 dark:text-slate-200">
                        {isProcessingPhoto ? 'Compressing & Processing Photo...' : 'Click or Drag to Upload Your Photo'}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-xs">
                        Supports JPEG, PNG, WEBP from your phone camera or computer. High-res photos are automatically optimized.
                      </p>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                        Camera & Gallery Supported
                      </span>
                    </div>
                  </label>
                </div>
              )}

              {/* Tab 2: Web Image Link / URL */}
              {photoModalTab === 'url' && (
                <div className="space-y-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Direct Image Web Address (URL)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://example.com/my-photo.jpg"
                        value={inputPhotoUrl}
                        onChange={e => setInputPhotoUrl(e.target.value)}
                        className="grow px-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 text-xs font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (inputPhotoUrl.trim()) {
                            setPreviewPhotoUrl(inputPhotoUrl.trim());
                          }
                        }}
                        className="px-3 py-2 bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-bold rounded-lg hover:bg-indigo-100 cursor-pointer text-xs"
                      >
                        Preview
                      </button>
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                      Paste a direct image link from Unsplash, Google Photos, GitHub, or your student portal.
                    </span>
                  </div>

                  {inputPhotoUrl.trim() && (
                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={() => handleApplyPhotoModal(inputPhotoUrl.trim())}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer text-xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Save This Photo URL</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Presets */}
              {photoModalTab === 'presets' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {STUDENT_AVATAR_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          setPreviewPhotoUrl(preset.url);
                          handleApplyPhotoModal(preset.url);
                        }}
                        className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center cursor-pointer group ${
                          previewPhotoUrl === preset.url
                            ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/50 ring-2 ring-indigo-500/30'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <img
                          src={preset.url}
                          alt={preset.name}
                          className="w-14 h-14 rounded-xl object-cover ring-2 ring-slate-100 dark:ring-slate-700 mb-1.5 group-hover:scale-105 transition-transform"
                        />
                        <span className="font-bold text-[11px] text-slate-800 dark:text-slate-200 truncate w-full block">
                          {preset.name}
                        </span>
                        <span className="text-[9px] text-indigo-600 dark:text-indigo-400 font-semibold">
                          {preset.tag}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setShowPhotoModal(false);
                  setPhotoUploadError('');
                }}
                className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-xs"
              >
                Close
              </button>
              {previewPhotoUrl !== currentUser.avatarUrl && (
                <button
                  type="button"
                  onClick={() => handleApplyPhotoModal(previewPhotoUrl)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer text-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Apply Photo</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
