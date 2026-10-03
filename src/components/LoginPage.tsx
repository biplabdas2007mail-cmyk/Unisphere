import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { UserRole } from '../types';
import { DEMO_USERS } from '../data/mockData';
import { getStoredCredentials } from '../utils/credentials';
import { ForgotPasswordModal } from './ForgotPasswordModal';
import { UniSphereLogo } from './UniSphereLogo';
import { 
  Building2, 
  GraduationCap, 
  ShieldCheck, 
  Lock, 
  Mail, 
  IdCard, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Zap,
  Clock,
  QrCode,
  FileCheck2,
  Globe,
  Eye,
  EyeOff,
  User,
  UserCheck,
  Phone,
  BadgeCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface LoginPageProps {
  onOpenPS07Modal: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onOpenPS07Modal }) => {
  const { login, language, setLanguage, t } = useCampus();
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [emailOrId, setEmailOrId] = useState(() => getStoredCredentials('student').studentId || '2023CS1082');
  const [password, setPassword] = useState(() => getStoredCredentials('student').password || 'student2026');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successNotice, setSuccessNotice] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Personal Details Section State
  const [yourName, setYourName] = useState(() => {
    try {
      const saved = localStorage.getItem('campus_portal_custom_name');
      if (saved) return saved;
    } catch {}
    return 'Biplab Das';
  });
  const [department, setDepartment] = useState(() => {
    try {
      const saved = localStorage.getItem('campus_portal_custom_dept');
      if (saved) return saved;
    } catch {}
    return 'Computer Science & Engineering (B.Tech)';
  });
  const [contactPhone, setContactPhone] = useState(() => {
    try {
      const saved = localStorage.getItem('campus_portal_custom_phone');
      if (saved) return saved;
    } catch {}
    return '+91 98612 34567';
  });
  const [hostelRoom, setHostelRoom] = useState(() => {
    try {
      const saved = localStorage.getItem('campus_portal_custom_hostel');
      if (saved) return saved;
    } catch {}
    return 'Kharavela Bhawan - Block B, Room B-314';
  });
  const [designation, setDesignation] = useState(() => {
    try {
      const saved = localStorage.getItem('campus_portal_custom_desig');
      if (saved) return saved;
    } catch {}
    return 'Dean of Student Affairs (Odisha Campus)';
  });
  const [isPersonalDetailsOpen, setIsPersonalDetailsOpen] = useState(true);

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMsg('');
    setSuccessNotice('');
    const creds = getStoredCredentials(role);
    if (role === 'student') {
      setEmailOrId(creds.studentId || DEMO_USERS.student.studentId || '2023CS1082');
      setPassword(creds.password);
      if (!yourName || yourName === DEMO_USERS.admin.name) {
        setYourName('Biplab Das');
      }
    } else {
      setEmailOrId(creds.email || DEMO_USERS.admin.email);
      setPassword(creds.password);
      if (yourName === 'Biplab Das' || yourName === DEMO_USERS.student.name) {
        setYourName(DEMO_USERS.admin.name);
      }
    }
  };

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessNotice('');

    if (!yourName.trim()) {
      setErrorMsg(
        language === 'odia_mix'
          ? 'ଦୟାକରି Personal Details ରେ ଆପଣଙ୍କ ନାମ (Your Name) ପ୍ରବେଶ କରନ୍ତୁ।'
          : language === 'odia'
          ? 'ଦୟାକରି ଆପଣଙ୍କ ନାମ ପ୍ରବେଶ କରନ୍ତୁ।'
          : language === 'hi'
          ? 'कृपया व्यक्तिगत विवरण में अपना नाम (Your Name) दर्ज करें।'
          : 'Please enter your name in the Personal Details section.'
      );
      return;
    }

    if (!emailOrId.trim()) {
      setErrorMsg(
        language === 'odia_mix' || language === 'odia'
          ? 'ଦୟାକରି ଆପଣଙ୍କ Roll No କିମ୍ବା ଇମେଲ୍ ପ୍ରବେଶ କରନ୍ତୁ'
          : language === 'hi'
          ? 'कृपया अपना रोल नंबर या कैंपस ईमेल दर्ज करें'
          : 'Please enter your university ID or email address'
      );
      return;
    }
    if (!password || password.length < 4) {
      setErrorMsg(
        language === 'odia_mix' || language === 'odia'
          ? 'ଦୟାକରି ସଠିକ୍ ପାସୱାର୍ଡ (ଅତିକମରେ ୪ ଅକ୍ଷର) ଦିଅନ୍ତୁ'
          : language === 'hi'
          ? 'कृपया एक वैध पासवर्ड (न्यूनतम 4 वर्ण) दर्ज करें'
          : 'Please enter a valid password (minimum 4 characters)'
      );
      return;
    }

    const creds = getStoredCredentials(selectedRole);
    // Allow either the newly configured stored password or standard demo defaults
    const isValidPass =
      password === creds.password ||
      (selectedRole === 'student' ? password === 'student2026' : password === 'admin2026');

    if (!isValidPass) {
      setErrorMsg(
        language === 'odia_mix'
          ? 'ଭୁଲ୍ ପାସୱାର୍ଡ! ଯଦି ପାସୱାର୍ଡ ଭୁଲିଯାଇଛନ୍ତି, ଦୟାକରି ତଳେ "Password ଭୁଲିଗଲେ କି?" କ୍ଲିକ୍ କରି ନୂଆ ପାସୱାର୍ଡ ତିଆରି କରନ୍ତୁ।'
          : language === 'odia'
          ? 'ଅମାନ୍ୟ ପାସୱାର୍ଡ! ପାସୱାର୍ଡ ପୁନରୁଦ୍ଧାର ପାଇଁ ତଳେ ଥିବା ଲିଙ୍କ୍ କ୍ଲିକ୍ କରନ୍ତୁ।'
          : language === 'hi'
          ? 'गलत पासवर्ड! यदि आप पासवर्ड भूल गए हैं, तो कृपया रीसेट करने के लिए नीचे "पासवर्ड भूल गए?" पर क्लिक करें।'
          : 'Incorrect password for this account. If you forgot your credentials, please click "Forgot Password?" below to reset.'
      );
      return;
    }

    const trimmedName = yourName.trim();
    try {
      localStorage.setItem('campus_portal_custom_name', trimmedName);
      localStorage.setItem('campus_portal_custom_dept', department);
      localStorage.setItem('campus_portal_custom_phone', contactPhone);
      localStorage.setItem('campus_portal_custom_hostel', hostelRoom);
      localStorage.setItem('campus_portal_custom_desig', designation);
    } catch {}

    if (selectedRole === 'student') {
      const parts = hostelRoom.split(',');
      const hBlock = parts[0]?.trim() || 'Kharavela Bhawan - Block B';
      const rNo = parts[1]?.trim() || 'B-314';

      login('student', {
        name: trimmedName,
        email: emailOrId.includes('@') ? emailOrId : `${emailOrId.toLowerCase()}@campus.edu`,
        studentId: emailOrId.includes('@') ? (DEMO_USERS.student.studentId || '2023CS1082') : emailOrId.toUpperCase(),
        department: department,
        phone: contactPhone,
        hostelBlock: hBlock,
        roomNo: rNo
      });
    } else {
      login('admin', {
        name: trimmedName,
        email: emailOrId,
        department: department,
        designation: designation,
        phone: contactPhone
      });
    }
  };

  const handleQuickDemo = (role: UserRole, customName?: string) => {
    const creds = getStoredCredentials(role);
    const targetName = customName || yourName.trim() || (role === 'student' ? 'Biplab Das' : 'Dr. Sarah Jenkins');
    if (customName) {
      setYourName(customName);
    }

    if (role === 'student') {
      setEmailOrId(creds.studentId || '2023CS1082');
      setPassword(creds.password);
      login('student', {
        name: targetName,
        email: emailOrId.includes('@') ? emailOrId : `${(creds.studentId || '2023cs1082').toLowerCase()}@campus.edu`,
        studentId: creds.studentId || '2023CS1082',
        department: department,
        phone: contactPhone
      });
    } else {
      setEmailOrId(creds.email);
      setPassword(creds.password);
      login('admin', {
        name: targetName,
        email: creds.email,
        department: department,
        designation: designation,
        phone: contactPhone
      });
    }
  };

  const handlePasswordResetSuccess = (role: UserRole, newPass: string, identifier: string) => {
    setSelectedRole(role);
    setEmailOrId(identifier);
    setPassword(newPass);
    setErrorMsg('');
    setSuccessNotice(
      language === 'odia_mix'
        ? `Password ସଫଳତାର ସହ ଅପଡେଟ୍ ହୋଇଛି! ନୂଆ Password ଫର୍ମରେ ପୂରଣ ହୋଇଛି। Login ବଟନ୍ ଦବାନ୍ତୁ।`
        : language === 'odia'
        ? `ପାସୱାର୍ଡ ସଫଳତାର ସହ ପରିବର୍ତ୍ତିତ ହେଲା! ନୂତନ ପାସୱାର୍ଡ ଦ୍ୱାରା ଲଗଇନ୍ କରନ୍ତୁ।`
        : `Password updated successfully for ${identifier}! Form pre-filled with your new password. Click "Sign In" to proceed.`
    );
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-50">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Col: Context & PS07 Framework Presentation (5 cols on lg) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            {/* Official UniSphere Logo Emblem, Typography & Tagline */}
            <div className="mb-5">
              <UniSphereLogo variant="login-card" showTagline={true} />
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                <span>{t.ps07Badge}</span>
              </div>
              <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-bold">
                {language === 'odia' ? 'ଓଡ଼ିଶା କ୍ୟାମ୍ପସ' : language === 'hi' ? 'ओडिशा कैंपस' : language === 'odia_mix' ? 'ଓଡ଼ିଶା କ୍ୟାମ୍ପସ (Odisha)' : 'Odisha Campus'}
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-3 leading-snug">
              {language === 'odia_mix'
                ? 'କିପରି ଟେକ୍ନୋଲୋଜି Campus Life କୁ ସହଜ କରିପାରିବ?'
                : language === 'odia'
                ? 'କିପରି ପ୍ରଯୁକ୍ତିବିଦ୍ୟା କ୍ୟାମ୍ପସ ଜୀବନକୁ ସରଳ କରିପାରିବ?'
                : language === 'hi'
                ? 'प्रौद्योगिकी कैसे बना सकती है कैंपस जीवन को सरल और सुगम?'
                : 'How Can Technology Simplify Everyday Campus Life?'}
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
              {language === 'odia_mix'
                ? 'କାଗଜପତ୍ର, ଲମ୍ବା ଲାଇନ୍ ଏବଂ WhatsApp ଗ୍ରୁପର ଅବ୍ୟବସ୍ଥା ଦୂର କରି Digital Gate Pass, Complaint ଡେସ୍କ ଓ Hostel Mess କୁ ଗୋଟିଏ App ରେ ଆଣନ୍ତୁ।'
                : language === 'odia'
                ? 'କାଗଜ କାର୍ଯ୍ୟ, ଲମ୍ବା ଧାଡ଼ି ଏବଂ ଅସୁବିଧାକୁ ଦୂର କରି ଡିଜିଟାଲ୍ ଗେଟ୍ ପାସ୍, ଅଭିଯୋଗ ନିବାରଣ ଏବଂ ଛାତ୍ରାବାସ ମେସ୍‌କୁ ଏକତ୍ରିତ କରନ୍ତୁ।'
                : language === 'hi'
                ? 'कागजी कार्य, लंबी कतारों और अव्यवस्था को समाप्त कर डिजिटल गेट पास, त्वरित शिकायत निवारण एवं हॉस्टल मेस को एक एकीकृत स्मार्ट पोर्टल में लाएं।'
                : 'Transitioning universities from fragmented paperwork, physical queues, and siloed communication into a unified, transparent operating ecosystem.'}
            </p>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-start space-x-3 p-2.5 rounded-xl bg-white/5 border border-white/10">
                <QrCode className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white">
                    {language === 'odia_mix' ? 'Paperless Gate Pass (ଗେଟ୍ ପାସ୍)' : language === 'odia' ? 'କାଗଜମୁକ୍ତ ଗେଟ୍ ପାସ୍' : language === 'hi' ? 'कागज-रहित डिजिटल गेट पास' : 'Paperless Gate Outpass'}
                  </h4>
                  <p className="text-slate-300 text-[11px] leading-normal">
                    {language === 'odia_mix' 
                      ? '୩ ଜଣ ଅଧିକାରୀଙ୍କ ଦସ୍ତଖତ ବଦଳରେ Mobile QR ସ୍କାନରେ Gate Clearance।' 
                      : language === 'odia'
                      ? 'ଦସ୍ତଖତ ପର୍ଚ୍ଚି ବଦଳରେ ତ୍ୱରିତ କ୍ୟୁଆର୍ କୋଡ୍ ସ୍କାନ୍ ଦ୍ୱାରା ପ୍ରସ୍ଥାନ ଏବଂ ପ୍ରବେଶ।'
                      : language === 'hi'
                      ? 'हस्ताक्षर वाली पर्चियों के स्थान पर त्वरित सुरक्षित क्यूआर सत्यापन द्वारा प्रस्थान एवं आगमन।'
                      : 'Replaces multi-signature paper leave slips with instant QR-coded verified departures.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-2.5 rounded-xl bg-white/5 border border-white/10">
                <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white">
                    {language === 'odia_mix' ? 'Real-Time Grievance Dispatch (ଅଭିଯୋଗ)' : language === 'odia' ? 'ତ୍ୱରିତ ଅଭିଯୋଗ ନିବାରଣ' : language === 'hi' ? 'त्वरित शिकायत निवारण' : 'Real-Time Grievance Dispatch'}
                  </h4>
                  <p className="text-slate-300 text-[11px] leading-normal">
                    {language === 'odia_mix'
                      ? 'Hostel, Wi-Fi, ଓ ପାଣି ସମସ୍ୟା ୩୦ ସେକେଣ୍ଡରେ ଫାଇଲ୍ କରି Status Track କରନ୍ତୁ।'
                      : language === 'odia'
                      ? 'ଛାତ୍ରାବାସ, ୱାଇ-ଫାଇ ଏବଂ ପାଣି ସମସ୍ୟା ମାତ୍ର ୩୦ ସେକେଣ୍ଡରେ ଦାଖଲ କରି ସ୍ଥିତି ଯାଞ୍ଚ କରନ୍ତୁ।'
                      : language === 'hi'
                      ? 'छात्रावास, वाई-फाई और बुनियादी समस्याओं का 30 सेकंड में पंजीकरण और समयबद्ध निवारण।'
                      : 'Fixes hostel, Wi-Fi, and lab equipment faults through tracked work orders with SLA timelines.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-2.5 rounded-xl bg-white/5 border border-white/10">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white">
                    {language === 'odia_mix' ? 'Lab & Hall ବୁକିଂ ଏବଂ Mess ମେନୁ' : language === 'odia' ? 'ସୁବିଧା ଆରକ୍ଷଣ ଓ ମେସ୍ ମେନୁ' : language === 'hi' ? 'सुविधा आरक्षण एवं मेस मेनू' : 'Shared Resource Reservations'}
                  </h4>
                  <p className="text-slate-300 text-[11px] leading-normal">
                    {language === 'odia_mix'
                      ? 'Robotics ଲ୍ୟାବ୍, ଅଡିଟୋରିଅମ୍ ବୁକିଂ ଏବଂ ଆଜିର ଓଡ଼ିଆ ଡାଲମା/ଭୋଜନ ମେନୁ ଦେଖନ୍ତୁ।'
                      : language === 'odia'
                      ? 'ଅଡିଟୋରିଅମ୍ ଓ ଲ୍ୟାବ୍ ଆରକ୍ଷଣ ଏବଂ ଆଜିର ପୌଷ୍ଟିକ ଭୋଜନ ସୂଚୀ ଦେଖନ୍ତୁ।'
                      : language === 'hi'
                      ? 'ऑडिटोरियम व कंप्यूटर लैब आरक्षण और वास्तविक समय मेस भोजन विवरण देखें।'
                      : 'Prevents auditorium & lab double-booking through live self-service reservations.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              {language === 'odia_mix' ? 'ଓଡ଼ିଶା ଉଚ୍ଚଶିକ୍ଷା ସ୍ମାର୍ଟ ପୋର୍ଟାଲ' : language === 'odia' ? 'ଓଡ଼ିଶା ଉଚ୍ଚଶିକ୍ଷା ସ୍ମାର୍ଟ ପୋର୍ଟାଲ' : language === 'hi' ? 'ओडिशा उच्च शिक्षा स्मार्ट पोर्टल' : 'SIH / Odisha Campus OS'}
            </span>
            <button
              onClick={onOpenPS07Modal}
              className="text-xs text-indigo-300 hover:text-white font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              PS07 Framework <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Col: Dedicated Login Form for Student & Admin (7 cols on lg) */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-white">
          <div>
            {/* Header with Title & Language Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{t.loginHeader}</h3>
                <p className="text-xs text-slate-500">{t.loginSubheader}</p>
              </div>

              {/* Language pill toggles */}
              <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto border border-slate-200 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setLanguage('hi')}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    language === 'hi' ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Pure Hindi language mode (शुद्ध हिन्दी)"
                >
                  हिन्दी (Pure)
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('odia')}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    language === 'odia' ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Pure Odia script (ନିଖୁଣ ଓଡ଼ିଆ)"
                >
                  ଓଡ଼ିଆ (Pure)
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    language === 'en' ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Pure English language"
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('odia_mix')}
                  className={`text-[11px] font-bold px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                    language === 'odia_mix' ? 'bg-indigo-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Odia & English Mix language"
                >
                  ଓଡ଼ିଆ + Eng
                </button>
              </div>
            </div>

            {/* Role Select Buttons */}
            <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100/80 rounded-xl mb-6">
              <button
                type="button"
                id="tab-role-student"
                onClick={() => handleRoleChange('student')}
                className={`flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedRole === 'student'
                    ? 'bg-white text-indigo-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <GraduationCap className={`w-4 h-4 ${selectedRole === 'student' ? 'text-indigo-600' : 'text-slate-500'}`} />
                <span>{t.studentRoleSelect}</span>
              </button>

              <button
                type="button"
                id="tab-role-admin"
                onClick={() => handleRoleChange('admin')}
                className={`flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedRole === 'admin'
                    ? 'bg-white text-indigo-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <ShieldCheck className={`w-4 h-4 ${selectedRole === 'admin' ? 'text-indigo-600' : 'text-slate-500'}`} />
                <span>{t.adminRoleSelect}</span>
              </button>
            </div>

            {/* Fast Demo 1-Click Access Panel */}
            <div className="mb-6 p-3.5 bg-indigo-50/70 rounded-xl border border-indigo-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-indigo-600" />
                  {t.demoLogin}
                </span>
                <span className="text-[10px] uppercase font-semibold text-indigo-700 bg-white px-2 py-0.5 rounded-full border border-indigo-200">
                  ଓଡ଼ିଶା ପ୍ରମୁଖ ଡେମୋ
                </span>
              </div>
              <p className="text-xs text-indigo-800/80 mb-3 leading-relaxed">
                {language === 'odia_mix'
                  ? 'ପାସୱାର୍ଡ ଟାଇପ୍ ନକରି ସିଧାସଳଖ ତଳେ ଥିବା ବଟନ୍ ଦବାଇ Portal ଖୋଲନ୍ତୁ:'
                  : language === 'odia'
                  ? 'ପାସୱାର୍ଡ ବିନା ସିଧାସଳଖ ଡେମୋ ବଟନ୍ ଦବାଇ ପୋର୍ଟାଲ୍ ଦେଖନ୍ତୁ:'
                  : language === 'hi'
                  ? 'पासवर्ड टाइप किए बिना सीधे नीचे दिए गए बटन पर क्लिक करके पोर्टल खोलें:'
                  : 'Click below to instantly launch the portal without typing passwords:'}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  id="btn-quick-yourname-login"
                  onClick={() => handleQuickDemo('student', 'Biplab Das')}
                  className="flex items-center justify-between p-2.5 bg-indigo-600 text-white hover:bg-indigo-700 group rounded-lg border border-indigo-500 transition-all text-left shadow-xs cursor-pointer ring-2 ring-indigo-300/60"
                >
                  <div className="min-w-0 pr-1">
                    <div className="text-xs font-bold truncate flex items-center gap-1">
                      <span>Biplab Das</span>
                      <Sparkles className="w-3 h-3 text-amber-300 shrink-0" />
                    </div>
                    <div className="text-[10px] text-indigo-100 truncate">
                      Your Profile • 2023CS1082
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-white shrink-0 ml-0.5" />
                </button>

                <button
                  type="button"
                  id="btn-quick-student-login"
                  onClick={() => handleQuickDemo('student', 'Aarav Mohapatra')}
                  className="flex items-center justify-between p-2.5 bg-white hover:bg-indigo-600 hover:text-white group rounded-lg border border-indigo-200 transition-all text-left shadow-2xs cursor-pointer"
                >
                  <div className="min-w-0 pr-1">
                    <div className="text-xs font-bold text-slate-900 group-hover:text-white truncate">
                      Aarav Mohapatra
                    </div>
                    <div className="text-[10px] text-slate-500 group-hover:text-indigo-100 truncate">
                      Demo Student • B-314
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-600 group-hover:text-white shrink-0 ml-0.5 transition-transform group-hover:translate-x-0.5" />
                </button>

                <button
                  type="button"
                  id="btn-quick-admin-login"
                  onClick={() => handleQuickDemo('admin', 'Dr. Sarah Jenkins')}
                  className="flex items-center justify-between p-2.5 bg-white hover:bg-slate-900 hover:text-white group rounded-lg border border-indigo-200 transition-all text-left shadow-2xs cursor-pointer"
                >
                  <div className="min-w-0 pr-1">
                    <div className="text-xs font-bold text-slate-900 group-hover:text-white truncate">
                      Dr. Sarah Jenkins
                    </div>
                    <div className="text-[10px] text-slate-500 group-hover:text-slate-300 truncate">
                      Dean of Affairs (Admin)
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-700 group-hover:text-white shrink-0 ml-0.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

            {/* Standard Login Form with Personal Details Section */}
            <form onSubmit={handleManualLogin} className="space-y-4">
              {successNotice && (
                <div className="p-3 text-xs rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium flex items-center gap-2 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{successNotice}</span>
                </div>
              )}

              {errorMsg && (
                <div className="p-3 text-xs rounded-lg bg-rose-50 border border-rose-200 text-rose-700 font-medium">
                  {errorMsg}
                </div>
              )}

              {/* PERSONAL DETAILS SECTION */}
              <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/50 via-slate-50/80 to-white p-4 sm:p-4.5 shadow-2xs transition-all">
                <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-indigo-100/70">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{t.personalDetailsSection}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 hidden sm:inline-block">
                          Identity & ID Card
                        </span>
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {t.personalDetailsDesc}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPersonalDetailsOpen(!isPersonalDetailsOpen)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 cursor-pointer transition-colors"
                    title={isPersonalDetailsOpen ? 'Collapse section' : 'Expand section'}
                  >
                    {isPersonalDetailsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {isPersonalDetailsOpen && (
                  <div className="space-y-3.5 animate-in fade-in duration-150">
                    {/* Primary Field: Your Name */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="input-login-name" className="text-xs font-bold text-slate-800 flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-indigo-600" />
                          <span>{t.yourNameLabel}</span>
                          <span className="text-rose-500 font-bold">*</span>
                        </label>
                        <span className="text-[10px] text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                          Live Profile Sync
                        </span>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <User className="w-4 h-4 text-slate-400" />
                        </div>
                        <input
                          id="input-login-name"
                          type="text"
                          value={yourName}
                          onChange={(e) => setYourName(e.target.value)}
                          placeholder={t.yourNamePlaceholder}
                          className="w-full pl-9 pr-3 py-2 text-sm bg-white font-medium text-slate-900 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-2xs"
                        />
                      </div>
                      
                      {/* Name Suggestion Quick Buttons */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        <span className="text-[10px] text-slate-400 font-semibold">Quick set:</span>
                        <button
                          type="button"
                          onClick={() => {
                            setYourName('Biplab Das');
                            setSelectedRole('student');
                          }}
                          className={`text-[11px] px-2 py-0.5 rounded-md font-semibold transition-all cursor-pointer border ${
                            yourName === 'Biplab Das'
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                              : 'bg-white text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 border-slate-200'
                          }`}
                        >
                          ✨ Biplab Das (Your Name)
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setYourName('Aarav Mohapatra');
                            setSelectedRole('student');
                          }}
                          className={`text-[11px] px-2 py-0.5 rounded-md font-semibold transition-all cursor-pointer border ${
                            yourName === 'Aarav Mohapatra'
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                              : 'bg-white text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 border-slate-200'
                          }`}
                        >
                          Aarav Mohapatra
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setYourName('Dr. Sarah Jenkins');
                            setSelectedRole('admin');
                            setEmailOrId(DEMO_USERS.admin.email);
                          }}
                          className={`text-[11px] px-2 py-0.5 rounded-md font-semibold transition-all cursor-pointer border ${
                            yourName === 'Dr. Sarah Jenkins'
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                              : 'bg-white text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 border-slate-200'
                          }`}
                        >
                          Dr. Sarah Jenkins
                        </button>
                      </div>
                    </div>

                    {/* Department, Phone and Hostel / Designation Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          {t.departmentLabel}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                            <GraduationCap className="w-3.5 h-3.5" />
                          </div>
                          <select
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-800"
                          >
                            <option value="Computer Science & Engineering (B.Tech)">Computer Science & Engineering</option>
                            <option value="Electronics & Telecommunication">Electronics & Telecommunication</option>
                            <option value="Information Technology">Information Technology</option>
                            <option value="Mechanical Engineering">Mechanical Engineering</option>
                            <option value="Civil Engineering">Civil Engineering</option>
                            <option value="Electrical Engineering">Electrical Engineering</option>
                            <option value="MBA / School of Management">MBA / School of Management</option>
                            <option value="Dean of Student Affairs (Odisha Campus)">Dean of Student Affairs</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          {t.phoneLabel}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                            <Phone className="w-3.5 h-3.5" />
                          </div>
                          <input
                            type="text"
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                            placeholder="+91 98612 34567"
                            className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-800"
                          />
                        </div>
                      </div>

                      {selectedRole === 'student' ? (
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            {t.hostelRoomLabel}
                          </label>
                          <input
                            type="text"
                            value={hostelRoom}
                            onChange={(e) => setHostelRoom(e.target.value)}
                            placeholder="Kharavela Bhawan - Block B, Room B-314"
                            className="w-full px-2.5 py-1.5 text-xs bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-800"
                          />
                        </div>
                      ) : (
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            {t.designationLabel}
                          </label>
                          <input
                            type="text"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            placeholder="Dean of Student Affairs (Odisha Campus)"
                            className="w-full px-2.5 py-1.5 text-xs bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-800"
                          />
                        </div>
                      )}
                    </div>

                    {/* Live Digital ID Preview Badge */}
                    <div className="p-2.5 rounded-xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border border-indigo-800/40 shadow-xs">
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-white p-0.5 flex items-center justify-center shrink-0 shadow-sm">
                          <UniSphereLogo variant="icon" size="xs" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold truncate text-white">
                              {yourName.trim() || 'Your Name'}
                            </span>
                            <BadgeCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          </div>
                          <p className="text-[10px] text-indigo-200 truncate">
                            {selectedRole === 'student'
                              ? `Roll: ${emailOrId || '2023CS1082'} • ${department.split('(')[0]}`
                              : designation}
                          </p>
                        </div>
                      </div>
                      <div className="shrink-0 pl-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          ● {t.liveIdPreview}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ID or Official Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {selectedRole === 'student' ? t.idOrEmailLabel : 'Official Email (ଅଫିସିଆଲ୍ ଇମେଲ୍)'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    {selectedRole === 'student' ? <IdCard className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                  </div>
                  <input
                    id="input-login-id"
                    type="text"
                    value={emailOrId}
                    onChange={(e) => setEmailOrId(e.target.value)}
                    placeholder={selectedRole === 'student' ? 'e.g. 2023CS1082 or aarav.mohapatra@campus.edu' : 'dean.jenkins@campus.edu'}
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.passwordLabel}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="input-login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2.5 text-sm bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center space-x-2 text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{t.rememberMeLabel}</span>
                </label>
                <button
                  type="button"
                  id="btn-forgot-password"
                  onClick={() => {
                    setErrorMsg('');
                    setSuccessNotice('');
                    setShowForgotPassword(true);
                  }}
                  className="text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer transition-colors hover:underline"
                >
                  {language === 'odia_mix' ? 'Password ଭୁଲିଗଲେ କି?' : language === 'odia' ? 'ପାସୱାର୍ଡ ଭୁଲିଗଲେ କି?' : 'Forgot Password?'}
                </button>
              </div>

              <button
                id="btn-login-submit"
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>
                  {t.signInBtn} {yourName.trim() ? `(${yourName.trim()})` : ''}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <span>{t.odishaUniversityBadge}</span>
            <div className="flex items-center space-x-2 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-semibold text-emerald-700">Campus Gateway Online</span>
            </div>
          </div>
        </div>

      </div>

      {/* Forgot Password Self-Service Recovery Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        initialRole={selectedRole}
        initialIdentifier={emailOrId}
        onPasswordResetSuccess={handlePasswordResetSuccess}
      />
    </div>
  );
};
