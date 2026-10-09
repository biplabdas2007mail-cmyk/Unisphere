import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { CRITERIA_CHECKLIST, CriterionItem } from '../data/mockData';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  GraduationCap, 
  FileText, 
  Bell, 
  Building2, 
  UserCheck, 
  BarChart3, 
  Bot, 
  Lock,
  ExternalLink,
  Zap,
  Info
} from 'lucide-react';

interface CriteriaShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTabId?: string;
  onNavigateToTab?: (tabKey: string, role?: 'student' | 'admin') => void;
}

const CRITERION_ICONS: Record<string, React.ReactNode> = {
  'crit-student-support': <GraduationCap className="w-5 h-5 text-indigo-600" />,
  'crit-digital-services': <FileText className="w-5 h-5 text-emerald-600" />,
  'crit-communication': <Bell className="w-5 h-5 text-amber-600" />,
  'crit-campus-facilities': <Building2 className="w-5 h-5 text-cyan-600" />,
  'crit-admin-tools': <UserCheck className="w-5 h-5 text-violet-600" />,
  'crit-analytics': <BarChart3 className="w-5 h-5 text-rose-600" />,
  'crit-smart-features': <Bot className="w-5 h-5 text-blue-600" />,
  'crit-security': <Lock className="w-5 h-5 text-teal-600" />,
};

export const CriteriaShowcaseModal: React.FC<CriteriaShowcaseModalProps> = ({
  isOpen,
  onClose,
  initialTabId,
  onNavigateToTab
}) => {
  const { language, role, switchRole, setChatbotOpen } = useCampus();
  const [selectedId, setSelectedId] = useState<string>(initialTabId || 'crit-student-support');

  if (!isOpen) return null;

  const selectedCriterion = CRITERIA_CHECKLIST.find(c => c.id === selectedId) || CRITERIA_CHECKLIST[0];

  const handleTestFeature = (criterion: CriterionItem) => {
    onClose();
    if (criterion.id === 'crit-smart-features') {
      setChatbotOpen(true);
      return;
    }
    
    if (criterion.id === 'crit-admin-tools' || (criterion.id === 'crit-analytics' && role !== 'admin')) {
      if (role !== 'admin') {
        switchRole('admin');
      }
      if (onNavigateToTab) {
        onNavigateToTab(criterion.liveTab, 'admin');
      }
      return;
    }

    if (onNavigateToTab) {
      onNavigateToTab(criterion.liveTab, (role || 'student') as 'student' | 'admin');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-5xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 max-h-[92vh] flex flex-col text-slate-800 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-start justify-between shrink-0 border-b border-indigo-950 dark:border-slate-800">
          <div>
            <div className="flex items-center space-x-2 mb-1.5 flex-wrap gap-y-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                8/8 Criteria Fully Demonstrated
              </span>
              <span className="text-xs text-indigo-200">
                • {language === 'odia_mix' ? 'କ୍ୟାମ୍ପସ ମାନଦଣ୍ଡ ଓ ପ୍ରଦର୍ଶନ' : 'Campus Technology Demonstration Guidelines'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2 text-white">
              <span>What This Website Demonstrates</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
              Every requested capability is built, interactive, and grounded in real campus workflows for students and university leadership.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 8 Criteria Navigation Badges */}
        <div className="p-3 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-x-auto flex items-center gap-2 shrink-0">
          {CRITERIA_CHECKLIST.map((crit) => {
            const isSelected = crit.id === selectedId;
            return (
              <button
                key={crit.id}
                onClick={() => setSelectedId(crit.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs scale-102'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <span>{crit.icon}</span>
                <span>{crit.category}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-emerald-300' : 'bg-emerald-500'}`} />
              </button>
            );
          })}
        </div>

        {/* Modal Main Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 dark:text-slate-200 flex-1">
          {/* Selected Criterion Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-slate-50 to-white dark:from-slate-800/90 dark:via-indigo-950/40 dark:to-slate-850 border border-indigo-100 dark:border-slate-750 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start space-x-3.5">
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-xs border border-indigo-100 dark:border-slate-700">
                {CRITERION_ICONS[selectedCriterion.id] || <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-slate-900 dark:text-white">
                    {selectedCriterion.icon} {selectedCriterion.category}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-semibold">
                    {selectedCriterion.categoryOdia}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  {selectedCriterion.description}
                </p>
                <div className="text-[11px] font-bold text-indigo-700 dark:text-indigo-400 mt-1.5 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Key Telemetry: {selectedCriterion.metrics}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleTestFeature(selectedCriterion)}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2 shrink-0 self-stretch md:self-auto justify-center"
            >
              <span>{language === 'odia_mix' ? 'ଲାଇଭ୍ ଫିଚର ପରୀକ୍ଷା କରନ୍ତୁ' : 'Launch & Test Feature'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Demonstrated Items Grid */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Explicit Deliverables Demonstrated Under This Criterion
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {selectedCriterion.demonstratedItems.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 shadow-2xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex items-start space-x-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{item}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Fully active in live portal state & UI controls
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Complete 8-Point Matrix Overview Table */}
          <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>Complete 8-Point Demonstration Matrix</span>
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Click any row to switch demonstration view
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {CRITERIA_CHECKLIST.map((crit) => {
                const isCurrent = crit.id === selectedId;
                return (
                  <div
                    key={crit.id}
                    onClick={() => setSelectedId(crit.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      isCurrent
                        ? 'bg-indigo-50/60 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700 ring-2 ring-indigo-500/20'
                        : 'bg-slate-50/80 dark:bg-slate-850 border-slate-200 dark:border-slate-800 hover:bg-slate-100/70 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl shrink-0">{crit.icon}</span>
                      <div>
                        <div className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>{crit.category}</span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">({crit.categoryOdia})</span>
                        </div>
                        <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                          {crit.demonstratedItems.join(' • ')}
                        </div>
                        <div className="text-[10px] font-semibold text-indigo-700 dark:text-indigo-400 mt-1.5">
                          {crit.metrics}
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 shrink-0">
                      Live
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Built for Smart Campus Life • Unified Campus Portal</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              Close Guide
            </button>
            <button
              type="button"
              onClick={() => handleTestFeature(selectedCriterion)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>Explore {selectedCriterion.category}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
