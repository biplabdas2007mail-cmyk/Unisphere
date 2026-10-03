import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { LanguageMode } from '../utils/translations';
import { UniSphereLogo } from './UniSphereLogo';
import { 
  Building2, 
  GraduationCap, 
  ShieldCheck, 
  ArrowLeftRight, 
  LogOut, 
  BookOpenCheck,
  Bell,
  Sparkles,
  RotateCcw,
  UserCheck,
  LayoutDashboard,
  Globe,
  Check,
  Bot,
  Sun,
  Moon,
  Laptop,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  onOpenPS07Modal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPS07Modal }) => {
  const { 
    currentUser, 
    role, 
    switchRole, 
    logout, 
    announcements, 
    resetAllData,
    currentView,
    setCurrentView,
    language,
    setLanguage,
    theme,
    setTheme,
    toggleTheme,
    setCriteriaModalOpen,
    setChatbotOpen,
    t
  } = useCampus();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showAnnouncementsMenu, setShowAnnouncementsMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const urgentCount = announcements.filter(a => a.priority === 'Urgent').length;

  const languageOptions: { code: LanguageMode; label: string; sub: string; badge: string }[] = [
    { code: 'hi', label: 'हिन्दी', sub: 'शुद्ध हिन्दी (Pure Hindi)', badge: 'Pure Hindi' },
    { code: 'odia', label: 'ଓଡ଼ିଆ', sub: 'ନିଖୁଣ ଓଡ଼ିଆ (Pure Odia)', badge: 'Pure Odia' },
    { code: 'en', label: 'English', sub: 'Pure English Language', badge: 'Pure English' },
    { code: 'odia_mix', label: 'ଓଡ଼ିଆ + Eng', sub: 'Bilingual Campus Mix', badge: 'Campus Mix' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Title with Official UniSphere Mascot Emblem */}
          <div 
            onClick={() => {
              setCurrentView('dashboard');
              setShowMobileMenu(false);
            }}
            className="cursor-pointer group shrink-0"
            title="UniSphere Odisha Campus AI Portal"
          >
            <UniSphereLogo variant="nav" />
          </div>

          {/* DESKTOP / LAPTOP CONTROLS (Hidden on small mobile screens) */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-2.5">
            
            {/* Theme Switcher Dropdown */}
            <div className="relative">
              <button
                id="btn-desktop-theme"
                onClick={() => {
                  setShowThemeMenu(!showThemeMenu);
                  setShowLangMenu(false);
                  setShowProfileMenu(false);
                  setShowAnnouncementsMenu(false);
                }}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                title={`Current theme: ${theme}. Click to change`}
                aria-label="Toggle theme mode"
              >
                {theme === 'dark' ? (
                  <Moon className="w-4 h-4 text-indigo-400" />
                ) : theme === 'system' ? (
                  <Laptop className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500" />
                )}
              </button>

              {showThemeMenu && (
                <div 
                  className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-xs"
                  onMouseLeave={() => setShowThemeMenu(false)}
                >
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Theme / ଥିମ୍
                  </div>
                  <button
                    onClick={() => { setTheme('light'); setShowThemeMenu(false); }}
                    className={`w-full text-left px-3 py-1.5 flex items-center justify-between cursor-pointer ${
                      theme === 'light' 
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold' 
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Sun className="w-3.5 h-3.5 text-amber-500" /> Light
                    </span>
                    {theme === 'light' && <Check className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => { setTheme('dark'); setShowThemeMenu(false); }}
                    className={`w-full text-left px-3 py-1.5 flex items-center justify-between cursor-pointer ${
                      theme === 'dark' 
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold' 
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Moon className="w-3.5 h-3.5 text-indigo-400" /> Dark
                    </span>
                    {theme === 'dark' && <Check className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => { setTheme('system'); setShowThemeMenu(false); }}
                    className={`w-full text-left px-3 py-1.5 flex items-center justify-between cursor-pointer ${
                      theme === 'system' 
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold' 
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Laptop className="w-3.5 h-3.5 text-slate-400" /> System Auto
                    </span>
                    {theme === 'system' && <Check className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}
            </div>

            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                id="btn-language-selector"
                onClick={() => {
                  setShowLangMenu(!showLangMenu);
                  setShowProfileMenu(false);
                  setShowAnnouncementsMenu(false);
                  setShowThemeMenu(false);
                }}
                className="inline-flex items-center space-x-1.5 text-xs font-bold px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                title="Select Campus Language / ଭାଷା ବଦଳାନ୍ତୁ"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span className="font-semibold">
                  {language === 'hi' ? 'शुद्ध हिन्दी' : language === 'odia' ? 'ନିଖୁଣ ଓଡ଼ିଆ' : language === 'en' ? 'Pure English' : 'ଓଡ଼ିଆ + Eng'}
                </span>
              </button>

              {showLangMenu && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setShowLangMenu(false)}
                >
                  <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center justify-between">
                    <span>Language / ଭାଷା / भाषा</span>
                    <span className="text-[9px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-1.5 py-0.2 rounded">
                      Pure Modes
                    </span>
                  </div>
                  {languageOptions.map((opt) => (
                    <button
                      key={opt.code}
                      onClick={() => {
                        setLanguage(opt.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        language === opt.code 
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-300 font-bold' 
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div>
                        <div className="font-semibold flex items-center gap-1.5">
                          <span>{opt.label}</span>
                          <span className="text-[9px] font-medium px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            {opt.badge}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">{opt.sub}</div>
                      </div>
                      {language === opt.code && (
                        <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      )}
                    </button>
                  ))}
                  <div className="px-3 py-1.5 mt-1 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 text-[10px] text-slate-500 dark:text-slate-400">
                    Bhubaneswar • Cuttack • Rourkela Hub
                  </div>
                </div>
              )}
            </div>

            {/* Dashboard / Profile View Toggle Button */}
            {currentUser && (
              <button
                id="btn-nav-profile-toggle"
                onClick={() => setCurrentView(currentView === 'profile' ? 'dashboard' : 'profile')}
                className={`inline-flex items-center space-x-1.5 text-xs font-bold px-3 py-2 rounded-xl transition-all cursor-pointer ${
                  currentView === 'profile'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-2xs'
                }`}
                title={currentView === 'profile' ? 'Return to Command Hub' : 'Open User Profile & History'}
              >
                {currentView === 'profile' ? (
                  <>
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>{t.dashboardNav}</span>
                  </>
                ) : (
                  <>
                    <UserCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>{t.profileNav}</span>
                  </>
                )}
              </button>
            )}

            {/* 8 Criteria Showcase Button */}
            <button
              id="btn-criteria-showcase"
              onClick={() => setCriteriaModalOpen(true)}
              className="inline-flex items-center space-x-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-xs transition-all cursor-pointer"
              title="View demonstration of all 8 criteria"
            >
              <GraduationCap className="w-4 h-4 text-amber-300" />
              <span className="hidden lg:inline">8 Criteria Demo</span>
              <span className="lg:hidden text-[11px]">8 Criteria</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-400 text-slate-950 font-black">
                8/8
              </span>
            </button>

            {/* Campus Mitra AI Chatbot Trigger */}
            <button
              id="btn-nav-campus-mitra"
              onClick={() => setChatbotOpen(true)}
              className="inline-flex items-center space-x-1.5 text-xs font-bold px-2.5 lg:px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700 transition-all cursor-pointer shadow-2xs"
              title="Open Campus Mitra AI Chatbot"
            >
              <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden xl:inline">Campus Mitra AI</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </button>

            {/* PS07 Case Study / Architecture Button */}
            <button
              id="btn-ps07-overview"
              onClick={onOpenPS07Modal}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold px-2.5 lg:px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800/60 transition-colors shadow-2xs"
              title="View PS07 Problem Statement & Digital Solutions"
            >
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="hidden xl:inline">PS07 Blueprint</span>
              <span className="xl:hidden text-[11px]">PS07</span>
            </button>

            {/* Live Announcements Bell */}
            <div className="relative">
              <button
                id="btn-nav-announcements"
                onClick={() => {
                  setShowAnnouncementsMenu(!showAnnouncementsMenu);
                  setShowProfileMenu(false);
                  setShowLangMenu(false);
                  setShowThemeMenu(false);
                }}
                className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Campus Alerts"
              >
                <Bell className="w-5 h-5" />
                {urgentCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
                )}
              </button>

              {showAnnouncementsMenu && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      Campus Broadcasts ({announcements.length})
                    </span>
                    <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">Real-time alerts</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto space-y-2">
                    {announcements.map((ann) => (
                      <div 
                        key={ann.id}
                        className={`p-2.5 rounded-lg border text-xs ${
                          ann.priority === 'Urgent'
                            ? 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900 text-rose-950 dark:text-rose-200'
                            : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                            ann.priority === 'Urgent' 
                              ? 'bg-rose-200 dark:bg-rose-900/80 text-rose-800 dark:text-rose-200' 
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                          }`}>
                            {ann.priority}
                          </span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">{ann.date}</span>
                        </div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-0.5">{ann.title}</h4>
                        <p className="text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">{ann.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Role Switcher */}
            {currentUser && (
              <button
                id="btn-switch-role"
                onClick={() => switchRole(role === 'student' ? 'admin' : 'student')}
                className="hidden lg:inline-flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
                title={`Switch directly to ${role === 'student' ? 'Admin' : 'Student'} view`}
              >
                <ArrowLeftRight className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span>{t.switchRoleBtn} {role === 'student' ? 'Admin' : 'Student'}</span>
              </button>
            )}

            {/* User Profile / Menu */}
            {currentUser && (
              <div className="relative">
                <button
                  id="btn-user-profile"
                  onClick={() => {
                    setShowProfileMenu(!showProfileMenu);
                    setShowAnnouncementsMenu(false);
                    setShowLangMenu(false);
                    setShowThemeMenu(false);
                  }}
                  className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                >
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-200 dark:ring-indigo-800"
                  />
                  <div className="text-left hidden xl:block">
                    <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                      {currentUser.name}
                    </div>
                    <div className="flex items-center space-x-1">
                      {role === 'student' ? (
                        <span className="inline-flex items-center text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
                          <GraduationCap className="w-3 h-3 mr-0.5" /> Student
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-[10px] font-medium text-indigo-700 dark:text-indigo-400">
                          <ShieldCheck className="w-3 h-3 mr-0.5" /> Admin
                        </span>
                      )}
                    </div>
                  </div>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{currentUser.email}</p>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          role === 'student' 
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' 
                            : 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300'
                        }`}>
                          {role === 'student' ? `ID: ${currentUser.studentId}` : currentUser.designation || 'Administrator'}
                        </span>
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        id="btn-menu-my-profile"
                        onClick={() => {
                          setCurrentView('profile');
                          setShowProfileMenu(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50/70 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 rounded-lg flex items-center space-x-2 mb-1 transition-colors cursor-pointer"
                      >
                        <UserCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span>{t.profileNav}</span>
                      </button>

                      <button
                        id="btn-menu-switch-role"
                        onClick={() => {
                          switchRole(role === 'student' ? 'admin' : 'student');
                          setShowProfileMenu(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg flex items-center space-x-2"
                      >
                        <ArrowLeftRight className="w-4 h-4 text-slate-400" />
                        <span>{t.switchRoleBtn} {role === 'student' ? 'Admin' : 'Student'}</span>
                      </button>

                      <button
                        id="btn-menu-reset"
                        onClick={() => {
                          if (confirm('Reset all demo tickets and bookings to factory data?')) {
                            resetAllData();
                            setShowProfileMenu(false);
                          }
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg flex items-center space-x-2"
                      >
                        <RotateCcw className="w-4 h-4 text-slate-400" />
                        <span>Reset Sample Data (ଡାଟା ରିସେଟ୍)</span>
                      </button>
                    </div>

                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                      <button
                        id="btn-menu-logout"
                        onClick={() => {
                          logout();
                          setShowProfileMenu(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{t.logoutBtn}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MOBILE CONTROLS (Right side of top bar on phones) */}
          <div className="flex md:hidden items-center space-x-1.5">
            {/* Quick Mobile Theme Toggle */}
            <button
              id="btn-mobile-quick-theme"
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
              aria-label="Toggle theme mode"
              title="Toggle Light/Dark Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {/* Mobile Alerts Bell */}
            <div className="relative">
              <button
                id="btn-mobile-announcements"
                onClick={() => {
                  setShowAnnouncementsMenu(!showAnnouncementsMenu);
                  setShowMobileMenu(false);
                }}
                className="relative p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Alerts"
              >
                <Bell className="w-5 h-5" />
                {urgentCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
                )}
              </button>

              {showAnnouncementsMenu && (
                <div className="fixed inset-x-3 top-16 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-3.5 z-50 max-h-[80vh] overflow-y-auto animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Campus Broadcasts ({announcements.length})
                    </span>
                    <button 
                      onClick={() => setShowAnnouncementsMenu(false)}
                      className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {announcements.map((ann) => (
                      <div 
                        key={ann.id}
                        className={`p-2.5 rounded-xl border text-xs ${
                          ann.priority === 'Urgent'
                            ? 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900 text-rose-950 dark:text-rose-200'
                            : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                            ann.priority === 'Urgent' 
                              ? 'bg-rose-200 dark:bg-rose-900/80 text-rose-800 dark:text-rose-200' 
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                          }`}>
                            {ann.priority}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">{ann.date}</span>
                        </div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-0.5">{ann.title}</h4>
                        <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">{ann.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Drawer Trigger */}
            <button
              id="btn-mobile-menu"
              onClick={() => {
                setShowMobileMenu(!showMobileMenu);
                setShowAnnouncementsMenu(false);
              }}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Open mobile menu"
            >
              {showMobileMenu ? (
                <X className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE EXPANDABLE DRAWER / MENU PANEL */}
      {showMobileMenu && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl px-4 py-4 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          
          {/* User Profile Mini Banner */}
          {currentUser && (
            <div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-50 to-slate-50 dark:from-slate-800 dark:to-indigo-950/40 border border-indigo-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-300 dark:ring-indigo-700"
                />
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">{currentUser.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400 capitalize">
                      {role}
                    </span>
                    <span>•</span>
                    <span className="truncate">{currentUser.department}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  switchRole(role === 'student' ? 'admin' : 'student');
                  setShowMobileMenu(false);
                }}
                className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1 shadow-2xs"
              >
                <ArrowLeftRight className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>To {role === 'student' ? 'Admin' : 'Student'}</span>
              </button>
            </div>
          )}

          {/* Theme Selector Segmented Control */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1.5">
              Theme Mode / ଥିମ୍ ମୋଡ୍
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  theme === 'light'
                    ? 'bg-white text-slate-900 shadow-2xs font-extrabold'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Light</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-900 text-white shadow-2xs font-extrabold'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                <span>Dark</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('system')}
                className={`py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  theme === 'system'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-extrabold'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <Laptop className="w-3.5 h-3.5 text-slate-500" />
                <span>Auto</span>
              </button>
            </div>
          </div>

          {/* Language Selector Row */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1.5">
              Language / ଭାଷା / भाषा
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {languageOptions.map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => setLanguage(opt.code)}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                    language === opt.code
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Action Grid */}
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => {
                setChatbotOpen(true);
                setShowMobileMenu(false);
              }}
              className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs font-bold flex items-center space-x-2"
            >
              <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div className="text-left">
                <div>Campus Mitra AI</div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-normal">Smart Assistant</div>
              </div>
            </button>

            <button
              onClick={() => {
                setCriteriaModalOpen(true);
                setShowMobileMenu(false);
              }}
              className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 text-xs font-bold flex items-center space-x-2"
            >
              <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div className="text-left">
                <div>8 Criteria Demo</div>
                <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-normal">8/8 Interactive</div>
              </div>
            </button>

            <button
              onClick={() => {
                onOpenPS07Modal();
                setShowMobileMenu(false);
              }}
              className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs font-bold flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <div className="text-left">
                <div>PS07 Blueprint</div>
                <div className="text-[10px] text-amber-600 dark:text-amber-400 font-normal">Design Framework</div>
              </div>
            </button>

            {currentUser && (
              <button
                onClick={() => {
                  setCurrentView(currentView === 'profile' ? 'dashboard' : 'profile');
                  setShowMobileMenu(false);
                }}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center space-x-2"
              >
                <UserCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <div className="text-left">
                  <div>{currentView === 'profile' ? 'Dashboard' : 'My Profile'}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">View Settings</div>
                </div>
              </button>
            )}
          </div>

          {/* Reset & Logout Buttons */}
          {currentUser && (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <button
                onClick={() => {
                  if (confirm('Reset all demo tickets and bookings to factory data?')) {
                    resetAllData();
                    setShowMobileMenu(false);
                  }
                }}
                className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 flex items-center gap-1 font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo Data</span>
              </button>

              <button
                onClick={() => {
                  logout();
                  setShowMobileMenu(false);
                }}
                className="text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t.logoutBtn}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
