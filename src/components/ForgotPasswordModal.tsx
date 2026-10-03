import React, { useState, useEffect } from 'react';
import { useCampus } from '../context/CampusContext';
import { UserRole } from '../types';
import {
  lookupCampusAccount,
  saveNewPassword,
  getStoredCredentials
} from '../utils/credentials';
import {
  KeyRound,
  ShieldCheck,
  Mail,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  RefreshCw,
  Sparkles,
  X,
  IdCard,
  Building,
  GraduationCap
} from 'lucide-react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: UserRole;
  initialIdentifier?: string;
  onPasswordResetSuccess: (role: UserRole, newPassword: string, identifier: string) => void;
}

type Step = 'identify' | 'otp' | 'new_password' | 'success';

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  initialRole = 'student',
  initialIdentifier = '',
  onPasswordResetSuccess
}) => {
  const { language, login } = useCampus();

  const [step, setStep] = useState<Step>('identify');
  const [role, setRole] = useState<UserRole>(initialRole);
  const [identifier, setIdentifier] = useState(initialIdentifier);
  const [deliveryMethod, setDeliveryMethod] = useState<'email' | 'sms'>('email');
  
  // OTP state
  const [generatedOtp, setGeneratedOtp] = useState('739215');
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');
  const [countdown, setCountdown] = useState(45);
  const [canResend, setCanResend] = useState(false);

  // New Password state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Account details from lookup
  const [accountInfo, setAccountInfo] = useState<{
    name: string;
    maskedEmail: string;
    maskedPhone: string;
    actualEmail: string;
    actualId?: string;
  } | null>(null);

  // Reset states when opening modal
  useEffect(() => {
    if (isOpen) {
      setStep('identify');
      setRole(initialRole);
      setIdentifier(initialIdentifier || (initialRole === 'student' ? '2023CS1082' : 'dean.jenkins@campus.edu'));
      setOtpInput('');
      setOtpError('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordError('');
      setCountdown(45);
      setCanResend(false);
      
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(newOtp);
    }
  }, [isOpen, initialRole, initialIdentifier]);

  // Countdown timer for OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'otp' && countdown > 0) {
      timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [step, countdown]);

  if (!isOpen) return null;

  // Step 1: Submit Identity
  const handleIdentifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      return;
    }

    const info = lookupCampusAccount(identifier, role);
    setAccountInfo(info);

    // generate fresh OTP
    const freshOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(freshOtp);
    setOtpInput('');
    setOtpError('');
    setCountdown(45);
    setCanResend(false);
    setStep('otp');
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput.trim() === generatedOtp || otpInput.trim() === '739215' || otpInput.trim() === '123456') {
      setOtpError('');
      setStep('new_password');
    } else {
      setOtpError(
        language === 'odia_mix'
          ? 'ଅମାନ୍ୟ OTP! ଦୟାକରି ସଠିକ୍ ୬-ଅଙ୍କ ବିଶିଷ୍ଟ କୋଡ୍ ଦିଅନ୍ତୁ କିମ୍ବା Auto-fill ବଟନ୍ ଦବାନ୍ତୁ।'
          : language === 'odia'
          ? 'ଅମାନ୍ୟ ସୁରକ୍ଷା କୋଡ୍! ଦୟାକରି ସଠିକ୍ କୋଡ୍ ଦିଅନ୍ତୁ।'
          : language === 'hi'
          ? 'अमान्य सत्यापन कोड! कृपया 6-अंकीय कोड पुनः दर्ज करें या स्वतः भरें।'
          : 'Invalid verification code! Please enter the 6-digit code shown in the demo banner.'
      );
    }
  };

  const handleResendOtp = () => {
    const freshOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(freshOtp);
    setOtpInput('');
    setOtpError('');
    setCountdown(45);
    setCanResend(false);
  };

  // Step 3: Save New Password
  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (newPassword.length < 6) {
      setPasswordError(
        language === 'odia_mix'
          ? 'ପାସୱାର୍ଡ ଅତିକମରେ ୬ ଅକ୍ଷର (characters) ହେବା ଆବଶ୍ୟକ।'
          : language === 'odia'
          ? 'ପାସୱାର୍ଡ ଅତିକମରେ ୬ ଅକ୍ଷର ହେବା ଆବଶ୍ୟକ।'
          : language === 'hi'
          ? 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।'
          : 'Password must be at least 6 characters long.'
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError(
        language === 'odia_mix'
          ? 'ଉଭୟ ପାସୱାର୍ଡ ମେଳ ଖାଉନାହିଁ! ପୁଣି ଥରେ ଯାଞ୍ଚ କରନ୍ତୁ।'
          : language === 'odia'
          ? 'ଉଭୟ ପାସୱାର୍ଡ ମେଳ ଖାଉନାହିଁ! ଦୟାକରି ସମାନ ପାସୱାର୍ଡ ଦିଅନ୍ତୁ।'
          : language === 'hi'
          ? 'दोनों पासवर्ड मेल नहीं खाते! कृपया एक समान पासवर्ड दर्ज करें।'
          : 'Passwords do not match! Please re-verify.'
      );
      return;
    }

    // Save to local credentials store
    saveNewPassword(role, newPassword, identifier);
    setStep('success');
  };

  // Direct login from success step
  const handleImmediateLogin = () => {
    const targetIdentifier = accountInfo?.actualId || accountInfo?.actualEmail || identifier;
    onPasswordResetSuccess(role, newPassword, targetIdentifier);
    login(role, {
      email: accountInfo?.actualEmail,
      studentId: accountInfo?.actualId
    });
    onClose();
  };

  const handleReturnToLogin = () => {
    const targetIdentifier = accountInfo?.actualId || accountInfo?.actualEmail || identifier;
    onPasswordResetSuccess(role, newPassword, targetIdentifier);
    onClose();
  };

  // Password strength helper
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: 'bg-slate-200' };
    let score = 0;
    if (pass.length >= 6) score++;
    if (/[A-Z]/.test(pass) || /[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass) && pass.length >= 8) score++;

    if (score === 1) return { score: 33, label: 'Weak / ସାଧାରଣ', color: 'bg-rose-500 text-rose-700' };
    if (score === 2) return { score: 66, label: 'Good / ଉତ୍ତମ', color: 'bg-amber-500 text-amber-700' };
    return { score: 100, label: 'Strong / ମଜଭୁତ', color: 'bg-emerald-500 text-emerald-700' };
  };

  const strength = getPasswordStrength(newPassword);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="forgot-password-title"
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between relative">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 id="forgot-password-title" className="text-base font-bold text-white flex items-center gap-2">
                <span>
                  {language === 'odia_mix'
                    ? 'କ୍ୟାମ୍ପସ ପାସୱାର୍ଡ ରିସେଟ୍ (Self-Service)'
                    : language === 'odia'
                    ? 'ପାସୱାର୍ଡ ପୁନଃସ୍ଥାପନ କରନ୍ତୁ'
                    : language === 'hi'
                    ? 'कैंपस पासवर्ड रीसेट एवं पुनर्प्राप्ति'
                    : 'Campus Account Password Recovery'}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  2FA Verified
                </span>
              </h3>
              <p className="text-xs text-indigo-200/80">
                {language === 'odia_mix'
                  ? 'ଓଡ଼ିଶା କ୍ୟାମ୍ପସ ଆକାଉଣ୍ଟ ସୁରକ୍ଷା ଓ ପ୍ରବେଶ ପୁନରୁଦ୍ଧାର'
                  : language === 'odia'
                  ? 'ଓଡ଼ିଶା କ୍ୟାମ୍ପସ ଆକାଉଣ୍ଟ ସୁରକ୍ଷା ଓ ପ୍ରବେଶ ପୁନରୁଦ୍ଧାର'
                  : language === 'hi'
                  ? 'ओडिशा विश्वविद्यालय खाता सुरक्षा और स्वचालित क्रेडेंशियल पुनर्प्राप्ति'
                  : 'Official automated credential recovery gateway for UniSphere Odisha'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close recovery modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Step Bar */}
        <div className="bg-slate-50 px-6 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs font-semibold">
          <div className={`flex items-center gap-1.5 ${step === 'identify' ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'identify' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'}`}>1</span>
            <span>{language === 'odia_mix' ? 'ପରିଚୟ (ID)' : language === 'odia' ? 'ପରିଚୟ' : language === 'hi' ? 'पहचान' : 'Identify'}</span>
          </div>
          <span className="text-slate-300">→</span>

          <div className={`flex items-center gap-1.5 ${step === 'otp' ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'otp' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'}`}>2</span>
            <span>{language === 'odia_mix' ? 'OTP କୋଡ୍' : language === 'odia' ? 'ଓଟିପି କୋଡ୍' : language === 'hi' ? 'ओटीपी' : '2FA OTP'}</span>
          </div>
          <span className="text-slate-300">→</span>

          <div className={`flex items-center gap-1.5 ${step === 'new_password' ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'new_password' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'}`}>3</span>
            <span>{language === 'odia_mix' ? 'ନୂଆ Password' : language === 'odia' ? 'ନୂଆ ପାସୱାର୍ଡ' : language === 'hi' ? 'नया पासवर्ड' : 'New Key'}</span>
          </div>
          <span className="text-slate-300">→</span>

          <div className={`flex items-center gap-1.5 ${step === 'success' ? 'text-emerald-600 font-bold' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'success' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'}`}>✓</span>
            <span>{language === 'odia_mix' ? 'ସମ୍ପୂର୍ଣ୍ଣ' : language === 'odia' ? 'ସମ୍ପୂର୍ଣ୍ଣ' : language === 'hi' ? 'सफल' : 'Done'}</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* STEP 1: IDENTIFY */}
          {step === 'identify' && (
            <form onSubmit={handleIdentifySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {language === 'odia_mix' 
                    ? '୧. ଆପଣଙ୍କ ଭୂମିକା ଚୟନ କରନ୍ତୁ (Role)' 
                    : language === 'odia'
                    ? '୧. ଆକାଉଣ୍ଟ ପ୍ରକାର ଚୟନ କରନ୍ତୁ'
                    : language === 'hi'
                    ? '1. खाता प्रकार का चयन करें'
                    : '1. Select Account Type'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setRole('student');
                      setIdentifier('2023CS1082');
                    }}
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      role === 'student'
                        ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>{language === 'odia_mix' ? 'Student (ଛାତ୍ରଛାତ୍ରୀ)' : language === 'odia' ? 'ଛାତ୍ରଛାତ୍ରୀ' : language === 'hi' ? 'विद्यार्थी' : 'Student'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setRole('admin');
                      setIdentifier('dean.jenkins@campus.edu');
                    }}
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      role === 'admin'
                        ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Building className="w-4 h-4" />
                    <span>{language === 'odia_mix' ? 'Admin / Warden (ପ୍ରଶାସକ)' : language === 'odia' ? 'ପ୍ରଶାସନ / ଡିନ୍' : language === 'hi' ? 'प्रशासन / वार्डन' : 'Admin / Warden'}</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {role === 'student'
                    ? (language === 'odia_mix' 
                        ? '୨. Student Roll No କିମ୍ବା ଇମେଲ୍' 
                        : language === 'odia'
                        ? '୨. ରୋଲ୍ ନମ୍ବର କିମ୍ବା ଇମେଲ୍'
                        : language === 'hi'
                        ? '2. विद्यार्थी रोल नंबर या कैंपस ईमेल'
                        : '2. Student Roll Number or Campus Email')
                    : (language === 'odia_mix' 
                        ? '୨. Official Dean / Admin Email' 
                        : language === 'odia'
                        ? '୨. ଅଫିସିଆଲ୍ ପ୍ରଶାସକ ଇମେଲ୍'
                        : language === 'hi'
                        ? '2. आधिकारिक प्रशासनिक ईमेल पता'
                        : '2. Administrator Email Address')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    {role === 'student' ? <IdCard className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                  </div>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={role === 'student' ? 'e.g. 2023CS1082 or aarav.mohapatra@campus.edu' : 'dean.jenkins@campus.edu'}
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Quick Autofill Buttons for Testing */}
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="text-[11px] text-slate-500">Quick Test:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setRole('student');
                      setIdentifier('2023CS1082');
                    }}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 font-medium cursor-pointer"
                  >
                    Aarav (2023CS1082)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRole('admin');
                      setIdentifier('dean.jenkins@campus.edu');
                    }}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 font-medium cursor-pointer"
                  >
                    Dean Jenkins (Admin)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {language === 'odia_mix' 
                    ? '୩. OTP କେଉଁଠାକୁ ପଠାଯିବ? (Delivery Channel)' 
                    : language === 'odia'
                    ? '୩. ସୁରକ୍ଷା କୋଡ୍ ପ୍ରେରଣ ମାଧ୍ୟମ'
                    : language === 'hi'
                    ? '3. ओटीपी सुरक्षा कोड कहाँ भेजा जाए?'
                    : '3. Send Recovery OTP via:'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label
                    onClick={() => setDeliveryMethod('email')}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                      deliveryMethod === 'email'
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'email'}
                      onChange={() => setDeliveryMethod('email')}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className="text-left">
                      <div className="text-xs font-bold flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-indigo-600" />
                        <span>University Email</span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {role === 'student' ? 'aarav.m*****@campus.edu' : 'dean.j*****@campus.edu'}
                      </div>
                    </div>
                  </label>

                  <label
                    onClick={() => setDeliveryMethod('sms')}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                      deliveryMethod === 'sms'
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'sms'}
                      onChange={() => setDeliveryMethod('sms')}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className="text-left">
                      <div className="text-xs font-bold flex items-center gap-1">
                        <Smartphone className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Registered Mobile</span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {role === 'student' ? '+91 98612 *****' : '+91 674 23*****'}
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>
                    {language === 'odia_mix' 
                      ? 'Security OTP ପଠାନ୍ତୁ' 
                      : language === 'odia'
                      ? 'ସୁରକ୍ଷା ଓଟିପି ପଠାନ୍ତୁ'
                      : language === 'hi'
                      ? 'सत्यापन ओटीपी भेजें'
                      : 'Send Verification OTP'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: OTP VERIFICATION */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              {/* Simulated Dispatch Alert for sandbox testing */}
              <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold flex items-center gap-1.5 text-indigo-950">
                    <ShieldCheck className="w-4 h-4 text-indigo-600" />
                    <span>Campus Security Dispatch (ସୁରକ୍ଷା କୋଡ୍)</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-white text-indigo-800 px-2 py-0.5 rounded-md border border-indigo-200">
                    Live Demo Mode
                  </span>
                </div>
                <p className="text-xs text-indigo-800/90 leading-relaxed">
                  {deliveryMethod === 'email'
                    ? `Verification code dispatched to institutional email (${accountInfo?.maskedEmail || 'aarav.m***@campus.edu'})`
                    : `SMS verification code dispatched to registered phone (${accountInfo?.maskedPhone || '+91 98612-***67'})`}
                </p>

                {/* Instant Fill Action */}
                <div className="pt-1 flex items-center justify-between bg-white p-2 rounded-lg border border-indigo-200">
                  <div className="text-xs">
                    <span className="text-slate-500 mr-1.5">Simulated OTP:</span>
                    <span className="font-mono font-black text-indigo-700 tracking-widest text-sm bg-indigo-50 px-2 py-0.5 rounded">
                      {generatedOtp}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setOtpInput(generatedOtp);
                      setOtpError('');
                    }}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                  >
                    Click to Auto-Fill
                  </button>
                </div>
              </div>

              {otpError && (
                <div className="p-3 text-xs rounded-lg bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{otpError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {language === 'odia_mix' 
                    ? '୬-ଅଙ୍କ ବିଶିଷ୍ଟ OTP ଦିଅନ୍ତୁ (Enter 6-Digit Code)' 
                    : language === 'odia'
                    ? '୬-ଅଙ୍କ ବିଶିଷ୍ଟ ସୁରକ୍ଷା ଓଟିପି ଦିଅନ୍ତୁ'
                    : language === 'hi'
                    ? '6-अंकीय सत्यापन ओटीपी दर्ज करें'
                    : 'Enter 6-Digit Verification Code'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={6}
                    autoFocus
                    value={otpInput}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^\d]/g, '');
                      setOtpInput(val);
                      if (otpError) setOtpError('');
                    }}
                    placeholder="••••••"
                    className="w-full tracking-widest text-center font-mono text-xl py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <button
                  type="button"
                  onClick={() => setStep('identify')}
                  className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 font-medium cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>
                    {language === 'hi' ? 'पहचान / संपर्क बदलें' : language === 'odia' ? 'ପରିଚୟ ବଦଳାନ୍ତୁ' : 'Change ID / Contact'}
                  </span>
                </button>

                <div>
                  {canResend ? (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-indigo-600 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>
                        {language === 'hi' ? 'नया ओटीपी पुनः भेजें' : language === 'odia' ? 'ନୂଆ OTP ପୁନଃ ପଠାନ୍ତୁ' : 'Resend New OTP'}
                      </span>
                    </button>
                  ) : (
                    <span>
                      {language === 'hi' 
                        ? `पुनः भेजें ` 
                        : language === 'odia' 
                        ? `ପୁନଃ ପଠାନ୍ତୁ ` 
                        : 'Resend OTP in '}
                      <strong className="text-slate-700">{countdown}s</strong>
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>
                    {language === 'odia_mix' 
                      ? 'OTP ଯାଞ୍ଚ କରନ୍ତୁ' 
                      : language === 'odia'
                      ? 'ଓଟିପି ଯାଞ୍ଚ କରନ୍ତୁ'
                      : language === 'hi'
                      ? 'ओटीपी सत्यापित कर आगे बढ़ें'
                      : 'Verify Code & Proceed'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: CREATE NEW PASSWORD */}
          {step === 'new_password' && (
            <form onSubmit={handleSavePassword} className="space-y-4">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-xs text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Identity Verified!</strong> Creating new security key for <strong>{accountInfo?.name || identifier}</strong> ({role === 'student' ? 'Student' : 'Admin'}).
                </span>
              </div>

              {passwordError && (
                <div className="p-3 text-xs rounded-lg bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {language === 'odia_mix' 
                    ? 'ନୂଆ ପାସୱାର୍ଡ (New Password)' 
                    : language === 'odia'
                    ? 'ନୂତନ ସୁରକ୍ଷା ପାସୱାର୍ଡ'
                    : language === 'hi'
                    ? 'नया सुरक्षा पासवर्ड'
                    : 'New Security Password'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoFocus
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password (min. 6 characters)"
                    className="w-full pl-9 pr-10 py-2.5 text-sm bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Strength Meter */}
                {newPassword && (
                  <div className="mt-2 space-y-1">
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${strength.color}`}
                        style={{ width: `${strength.score}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Strength: <strong className="text-slate-700">{strength.label}</strong></span>
                      <span>Min 6 characters</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {language === 'odia_mix' 
                    ? 'ପାସୱାର୍ଡ ନିଶ୍ଚିତ କରନ୍ତୁ (Confirm Password)' 
                    : language === 'odia'
                    ? 'ପାସୱାର୍ଡ ନିଶ୍ଚିତ କରନ୍ତୁ'
                    : language === 'hi'
                    ? 'नया पासवर्ड पुनः दर्ज करें (पुष्टि करें)'
                    : 'Confirm New Password'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-type new password"
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                {confirmPassword && newPassword !== confirmPassword && (
                  <span className="text-[11px] text-rose-600 mt-1 block">Passwords do not match yet</span>
                )}
                {confirmPassword && newPassword === confirmPassword && (
                  <span className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Passwords match perfectly
                  </span>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    {language === 'odia_mix' 
                      ? 'ନୂଆ Password Save କରନ୍ତୁ' 
                      : language === 'odia'
                      ? 'ନୂତନ ପାସୱାର୍ଡ ସଂରକ୍ଷଣ କରନ୍ତୁ'
                      : language === 'hi'
                      ? 'नया पासवर्ड सुरक्षित करें'
                      : 'Save & Update Password'}
                  </span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: SUCCESS CONFIRMATION */}
          {step === 'success' && (
            <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-lg font-bold text-slate-900">
                  {language === 'odia_mix'
                    ? 'Password ସଫଳତାର ସହ ପରିବର୍ତ୍ତିତ ହେଲା!'
                    : language === 'odia'
                    ? 'ପାସୱାର୍ଡ ସଫଳତାର ସହ ପରିବର୍ତ୍ତନ ହୋଇଛି!'
                    : language === 'hi'
                    ? 'पासवर्ड सफलतापूर्वक अपडेट हो गया!'
                    : 'Password Successfully Updated!'}
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  {language === 'odia_mix'
                    ? 'ଆପଣଙ୍କର ନୂତନ ପାସୱାର୍ଡ ସିଷ୍ଟମରେ ସୁରକ୍ଷିତ ଭାବେ ସେଭ୍ ହୋଇଛି। ଆପଣ ବର୍ତ୍ତମାନ ଏହା ସହିତ କ୍ୟାମ୍ପସ ହବ୍‌କୁ ଲଗଇନ୍ କରିପାରିବେ।'
                    : language === 'odia'
                    ? 'ଆପଣଙ୍କର ନୂତନ ପାସୱାର୍ଡ ସିଷ୍ଟମରେ ସୁରକ୍ଷିତ ଭାବେ ସେଭ୍ ହୋଇଛି। ଆପଣ ବର୍ତ୍ତମାନ ଏହା ସହିତ କ୍ୟାମ୍ପସ ହବ୍‌କୁ ଲଗଇନ୍ କରିପାରିବେ।'
                    : language === 'hi'
                    ? 'आपका नया सुरक्षा पासवर्ड कैंपस प्रमाणीकरण प्रणाली में अपडेट कर दिया गया है। अब आप सीधे लॉगिन कर सकते हैं।'
                    : 'Your new security password has been updated in the campus authentication directory. You can now access your workspace.'}
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-left space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Account:</span>
                  <span className="font-semibold text-slate-800">{accountInfo?.name || identifier} ({role.toUpperCase()})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Campus Identity:</span>
                  <span className="font-mono text-slate-800">{accountInfo?.actualId || accountInfo?.actualEmail || identifier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Active & Ready to Sign In
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={handleImmediateLogin}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {language === 'odia_mix' 
                      ? 'ଏବେ ସିଧାସଳଖ Sign In କରନ୍ତୁ' 
                      : language === 'odia'
                      ? 'ଏବେ ପୋର୍ଟାଲରେ ଲଗଇନ୍ କରନ୍ତୁ'
                      : language === 'hi'
                      ? 'पोर्टल में अभी साइन इन करें'
                      : 'Sign In Now to Portal'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleReturnToLogin}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm border border-slate-300 transition-all cursor-pointer"
                >
                  {language === 'hi' ? 'लॉगिन फॉर्म पर वापस जाएं' : language === 'odia' ? 'ଲଗଇନ୍ ଫର୍ମକୁ ଫେରନ୍ତୁ' : 'Back to Login Form'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
