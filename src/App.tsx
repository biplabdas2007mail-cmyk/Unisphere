/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CampusProvider, useCampus } from './context/CampusContext';
import { Navbar } from './components/Navbar';
import { LoginPage } from './components/LoginPage';
import { StudentDashboard } from './components/student/StudentDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { UserProfilePage } from './components/profile/UserProfilePage';
import { PS07OverviewModal } from './components/PS07OverviewModal';
import { CriteriaShowcaseModal } from './components/CriteriaShowcaseModal';
import { CampusMitraChatbot } from './components/CampusMitraChatbot';
import { Sparkles, ArrowLeftRight, ShieldCheck, GraduationCap } from 'lucide-react';

const MainCampusContent: React.FC = () => {
  const { 
    currentUser, 
    role, 
    switchRole, 
    currentView, 
    setCurrentView,
    criteriaModalOpen,
    setCriteriaModalOpen,
    selectedCriteriaTab
  } = useCampus();
  const [showPS07Modal, setShowPS07Modal] = useState(false);


  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-indigo-100 selection:text-indigo-900 dark:selection:bg-indigo-900 dark:selection:text-indigo-100 transition-colors">
      
      {/* Top Navbar */}
      <Navbar onOpenPS07Modal={() => setShowPS07Modal(true)} />

      {/* Main View Area */}
      <main className="grow">
        {!currentUser ? (
          <LoginPage onOpenPS07Modal={() => setShowPS07Modal(true)} />
        ) : currentView === 'profile' ? (
          <UserProfilePage onBack={() => setCurrentView('dashboard')} />
        ) : role === 'student' ? (
          <StudentDashboard />
        ) : (
          <AdminDashboard />
        )}
      </main>

      {/* Persistent Evaluator Footer Bar */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-3.5 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 dark:text-slate-400 pb-20 sm:pb-3.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-extrabold text-slate-800 dark:text-slate-200">UniSphere OS</span>
            <span>•</span>
            <span className="font-medium text-slate-600 dark:text-slate-400">
              Simplifying Everyday Campus Life for Students & Administrators
            </span>
            <span>•</span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400">
              Campus AI Solutions • Team Techinnovators
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowPS07Modal(true)}
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-bold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Campus Problem & Impact Framework</span>
            </button>

            {currentUser && (
              <>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                <button
                  onClick={() => switchRole(role === 'student' ? 'admin' : 'student')}
                  className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5 text-slate-400" />
                  <span>Switch to {role === 'student' ? 'Admin' : 'Student'} View</span>
                </button>
              </>
            )}
          </div>
        </div>
      </footer>

      {/* PS07 Problem Statement & Solution Architecture Modal */}
      <PS07OverviewModal
        isOpen={showPS07Modal}
        onClose={() => setShowPS07Modal(false)}
      />

      {/* 8 Criteria Demonstration Modal */}
      <CriteriaShowcaseModal
        isOpen={criteriaModalOpen}
        onClose={() => setCriteriaModalOpen(false)}
        initialTabId={selectedCriteriaTab}
      />

      {/* Smart Feature: Campus Mitra AI Chatbot (Accessible throughout campus app) */}
      <CampusMitraChatbot />
    </div>
  );
};

export default function App() {
  return (
    <CampusProvider>
      <MainCampusContent />
    </CampusProvider>
  );
}
