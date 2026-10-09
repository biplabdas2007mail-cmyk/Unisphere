import React, { useState, useMemo } from 'react';
import { 
  ODISHA_INSTITUTES, 
  ODISHA_UNIVERSITIES, 
  DEFAULT_ODISHA_INSTITUTE, 
  DEFAULT_ODISHA_UNIVERSITY,
  OdishaInstitute
} from '../data/odishaInstitutes';
import { 
  Building2, 
  GraduationCap, 
  Search, 
  X, 
  Check, 
  ChevronDown, 
  MapPin, 
  Sparkles,
  SlidersHorizontal,
  Edit2
} from 'lucide-react';

interface OdishaInstituteSelectorProps {
  selectedInstitute: string;
  onInstituteChange: (inst: string) => void;
  selectedUniversity: string;
  onUniversityChange: (univ: string) => void;
  isCustom: boolean;
  onCustomChange: (custom: boolean) => void;
  customText: string;
  onCustomTextChange: (text: string) => void;
  compact?: boolean;
  showUniversityField?: boolean;
  label?: string;
  theme?: 'light' | 'indigo';
}

const CATEGORIES = [
  'All',
  'Premier',
  'State University',
  'Govt Engineering',
  'Private University',
  'Engineering College',
  'Degree College',
  'Medical College'
] as const;

export const OdishaInstituteSelector: React.FC<OdishaInstituteSelectorProps> = ({
  selectedInstitute,
  onInstituteChange,
  selectedUniversity,
  onUniversityChange,
  isCustom,
  onCustomChange,
  customText,
  onCustomTextChange,
  compact = false,
  showUniversityField = true,
  label = 'College / Institute Name (Odisha)',
  theme = 'light'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // Filtered institutes based on category & search query
  const filteredInstitutes = useMemo(() => {
    return ODISHA_INSTITUTES.filter(inst => {
      const matchesCategory = selectedCategory === 'All' || inst.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      return (
        inst.name.toLowerCase().includes(q) ||
        inst.shortName.toLowerCase().includes(q) ||
        inst.city.toLowerCase().includes(q) ||
        inst.district.toLowerCase().includes(q) ||
        inst.universityAffiliation.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedCategory]);

  const handleSelectInstitute = (inst: OdishaInstitute) => {
    onCustomChange(false);
    onInstituteChange(inst.name);
    setShowSearchDropdown(false);
    setSearchQuery('');

    // Auto-match affiliating university if available
    if (inst.universityAffiliation) {
      const matched = ODISHA_UNIVERSITIES.find(u => 
        u.toLowerCase().includes(inst.universityAffiliation.toLowerCase()) ||
        inst.universityAffiliation.toLowerCase().includes(u.split('(')[0].trim().toLowerCase())
      );
      if (matched) {
        onUniversityChange(matched);
      }
    }
  };

  const handleDropdownSelect = (val: string) => {
    if (val === 'custom') {
      onCustomChange(true);
    } else {
      onCustomChange(false);
      onInstituteChange(val);
      const found = ODISHA_INSTITUTES.find(i => i.name === val);
      if (found && found.universityAffiliation) {
        const matched = ODISHA_UNIVERSITIES.find(u => 
          u.toLowerCase().includes(found.universityAffiliation.toLowerCase()) ||
          found.universityAffiliation.toLowerCase().includes(u.split('(')[0].trim().toLowerCase())
        );
        if (matched) {
          onUniversityChange(matched);
        }
      }
    }
  };

  const currentDisplayInstitute = isCustom && customText.trim() ? customText : selectedInstitute || DEFAULT_ODISHA_INSTITUTE;

  return (
    <div className="space-y-3">
      {/* Label and Status */}
      <div className="flex flex-wrap items-center justify-between gap-1">
        <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span>{label}</span>
          <span className="text-rose-500 font-bold">*</span>
        </label>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            Odisha Higher Education (100+ Colleges)
          </span>
        </div>
      </div>

      {/* Interactive Search & Live Filter Bar */}
      <div className="relative">
        <div className="flex items-center rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 shadow-2xs overflow-hidden transition-all">
          <div className="pl-3 pr-2 text-slate-400 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchDropdown(true);
            }}
            onFocus={() => setShowSearchDropdown(true)}
            placeholder="Search Odisha colleges by name, city (e.g. CET, VSSUT, NIT, GITA, Berhampur, SCB)..."
            className="w-full py-2 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-transparent focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="px-2.5 py-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowSearchDropdown(!showSearchDropdown)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-700/60 border-l border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1 cursor-pointer shrink-0"
            title="Browse all Odisha colleges"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden sm:inline">Browse</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showSearchDropdown ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Live Filter Dropdown Popup */}
        {showSearchDropdown && (
          <div className="absolute z-50 left-0 right-0 mt-1 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in-50 duration-100 max-h-80 flex flex-col">
            {/* Category filter pills in dropdown */}
            <div className="p-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-850 flex items-center gap-1 overflow-x-auto no-scrollbar shrink-0">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {cat === 'All' ? 'All (100+)' : cat}
                </button>
              ))}
            </div>

            {/* List of matching institutes */}
            <div className="overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 grow p-1">
              {filteredInstitutes.length > 0 ? (
                filteredInstitutes.map(inst => {
                  const isSelected = !isCustom && selectedInstitute === inst.name;
                  return (
                    <button
                      key={inst.id}
                      type="button"
                      onClick={() => handleSelectInstitute(inst)}
                      className={`w-full text-left p-2.5 rounded-lg flex items-start justify-between gap-2 transition-colors cursor-pointer ${
                        isSelected 
                          ? 'bg-indigo-50/90 dark:bg-indigo-950/70 text-indigo-950 dark:text-indigo-200 font-bold' 
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-bold leading-snug flex items-center gap-1.5 flex-wrap">
                          <span>{inst.name}</span>
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                            inst.category === 'Premier' ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300' :
                            inst.category === 'State University' ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300' :
                            inst.category === 'Govt Engineering' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' :
                            inst.category === 'Medical College' ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300' :
                            'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}>
                            {inst.category}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-2.5 h-2.5 text-slate-400" />
                            {inst.city}, {inst.district}
                          </span>
                          <span>•</span>
                          <span className="text-indigo-600 dark:text-indigo-400 font-medium truncate">
                            Affiliation: {inst.universityAffiliation}
                          </span>
                        </div>
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="p-4 text-center text-xs text-slate-500 dark:text-slate-400">
                  <p className="font-semibold text-slate-700 dark:text-slate-300">No institutes found matching "{searchQuery}"</p>
                  <p className="text-[11px] mt-1 text-slate-400">You can choose "Enter Custom Name" below to add your institute.</p>
                </div>
              )}
            </div>

            {/* Custom option footer in search dropdown */}
            <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between text-xs shrink-0">
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Found {filteredInstitutes.length} colleges
              </span>
              <button
                type="button"
                onClick={() => {
                  onCustomChange(true);
                  setShowSearchDropdown(false);
                }}
                className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
              >
                <Edit2 className="w-3 h-3" />
                <span>Enter Custom Institute Name</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Standard Select Dropdown for Easy Browsing */}
      <div>
        <select
          id="select-odisha-institute"
          value={isCustom ? 'custom' : selectedInstitute}
          onChange={(e) => handleDropdownSelect(e.target.value)}
          className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 font-medium text-slate-900 dark:text-slate-100 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs cursor-pointer"
        >
          <optgroup label="🏛️ Premier National Institutes">
            {ODISHA_INSTITUTES.filter(i => i.category === 'Premier').map(inst => (
              <option key={inst.id} value={inst.name}>{inst.name}</option>
            ))}
          </optgroup>

          <optgroup label="🎓 State Public Universities & Technical Hubs">
            {ODISHA_INSTITUTES.filter(i => i.category === 'State University').map(inst => (
              <option key={inst.id} value={inst.name}>{inst.name}</option>
            ))}
          </optgroup>

          <optgroup label="⚙️ Government Engineering Colleges">
            {ODISHA_INSTITUTES.filter(i => i.category === 'Govt Engineering').map(inst => (
              <option key={inst.id} value={inst.name}>{inst.name}</option>
            ))}
          </optgroup>

          <optgroup label="🏢 Premier Deemed & Private Universities">
            {ODISHA_INSTITUTES.filter(i => i.category === 'Private University').map(inst => (
              <option key={inst.id} value={inst.name}>{inst.name}</option>
            ))}
          </optgroup>

          <optgroup label="📐 Autonomous & BPUT Affiliated Engineering Colleges">
            {ODISHA_INSTITUTES.filter(i => i.category === 'Engineering College').map(inst => (
              <option key={inst.id} value={inst.name}>{inst.name}</option>
            ))}
          </optgroup>

          <optgroup label="📚 Premier Autonomous & Degree Colleges">
            {ODISHA_INSTITUTES.filter(i => i.category === 'Degree College').map(inst => (
              <option key={inst.id} value={inst.name}>{inst.name}</option>
            ))}
          </optgroup>

          <optgroup label="🏥 Medical Colleges & Health Sciences">
            {ODISHA_INSTITUTES.filter(i => i.category === 'Medical College').map(inst => (
              <option key={inst.id} value={inst.name}>{inst.name}</option>
            ))}
          </optgroup>

          <optgroup label="✏️ Other Institute in Odisha">
            <option value="custom">✏️ Other Institute in Odisha (Enter Custom Name)</option>
          </optgroup>
        </select>
      </div>

      {/* Custom Institute Text Input if selected */}
      {isCustom && (
        <div className="p-3 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 rounded-xl space-y-1.5 animate-in fade-in duration-150">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1">
              <Edit2 className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              <span>Enter Custom College / Institute Name</span>
            </span>
            <button
              type="button"
              onClick={() => onCustomChange(false)}
              className="text-[10px] text-amber-800 dark:text-amber-300 hover:text-amber-950 underline font-semibold"
            >
              Choose from list
            </button>
          </div>
          <input
            type="text"
            value={customText}
            onChange={(e) => onCustomTextChange(e.target.value)}
            placeholder="e.g. Roland Institute of Pharmaceutical Sciences, GCE Keonjhar, etc."
            className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 rounded-lg border border-amber-300 dark:border-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-slate-900 dark:text-slate-100"
          />
        </div>
      )}

      {/* Popular Quick Select Chips */}
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Top Odisha Institutes:</span>
          {[
            { label: 'OUTR (CET)', full: 'Odisha University of Technology and Research (OUTR / Formerly CET Bhubaneswar)' },
            { label: 'VSSUT Burla', full: 'Veer Surendra Sai University of Technology (VSSUT Burla / UCE Burla)' },
            { label: 'NIT Rourkela', full: 'National Institute of Technology Rourkela (NIT Rourkela)' },
            { label: 'IIT Bhubaneswar', full: 'Indian Institute of Technology Bhubaneswar (IIT Bhubaneswar)' },
            { label: 'Utkal University', full: 'Utkal University (Vani Vihar, Bhubaneswar)' },
            { label: 'Ravenshaw Univ', full: 'Ravenshaw University (Cuttack)' },
            { label: 'SOA (ITER)', full: 'Siksha \'O\' Anusandhan University (SOA / ITER Bhubaneswar)' },
            { label: 'KIIT University', full: 'Kalinga Institute of Industrial Technology (KIIT Deemed to be University)' },
            { label: 'GITA Autonomous', full: 'Gandhi Institute for Technological Advancement (GITA Autonomous College)' },
            { label: 'BJB College', full: 'Buxi Jagabandhu Bidyadhar Autonomous College (BJB College Bhubaneswar)' },
            { label: 'SCB Medical', full: 'Srirama Chandra Bhanja Medical College and Hospital (SCB Medical Cuttack)' },
            { label: 'MKCG Medical', full: 'Maharaja Krushna Chandra Gajapati Medical College (MKCG Berhampur)' },
            { label: 'PMEC Berhampur', full: 'Parala Maharaja Engineering College (PMEC Berhampur)' },
            { label: 'IGIT Sarang', full: 'Indira Gandhi Institute of Technology Sarang (IGIT Sarang)' }
          ].map((chip) => {
            const isSelected = !isCustom && selectedInstitute === chip.full;
            return (
              <button
                key={chip.label}
                type="button"
                onClick={() => {
                  onCustomChange(false);
                  onInstituteChange(chip.full);
                  const found = ODISHA_INSTITUTES.find(i => i.name === chip.full);
                  if (found && found.universityAffiliation) {
                    const matched = ODISHA_UNIVERSITIES.find(u => 
                      u.toLowerCase().includes(found.universityAffiliation.toLowerCase()) ||
                      found.universityAffiliation.toLowerCase().includes(u.split('(')[0].trim().toLowerCase())
                    );
                    if (matched) {
                      onUniversityChange(matched);
                    }
                  }
                }}
                className={`text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md font-semibold transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-700 hover:text-indigo-700 dark:hover:text-indigo-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Affiliating University Selector */}
      {showUniversityField && (
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="select-odisha-university" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Affiliating University (Odisha)</span>
              <span className="text-rose-500 font-bold">*</span>
            </label>
            <span className="text-[10px] text-slate-400 font-medium">
              40+ Recognized Universities
            </span>
          </div>

          <select
            id="select-odisha-university"
            value={selectedUniversity}
            onChange={(e) => onUniversityChange(e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-800 dark:text-slate-200 shadow-2xs cursor-pointer"
          >
            {ODISHA_UNIVERSITIES.map((univ) => (
              <option key={univ} value={univ}>{univ}</option>
            ))}
          </select>

          {/* Quick Select Chips for Major Affiliating Universities */}
          <div className="flex flex-wrap items-center gap-1 pt-1">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">Affiliation Quick Pick:</span>
            {[
              { label: 'BPUT Rourkela', full: 'Biju Patnaik University of Technology (BPUT Rourkela)' },
              { label: 'Utkal Univ', full: 'Utkal University (Vani Vihar, Bhubaneswar)' },
              { label: 'Sambalpur Univ', full: 'Sambalpur University (Jyoti Vihar, Burla)' },
              { label: 'Berhampur Univ', full: 'Berhampur University (Bhanja Bihar, Berhampur)' },
              { label: 'Ravenshaw Univ', full: 'Ravenshaw University (Cuttack)' },
              { label: 'OUTR Bhubaneswar', full: 'Odisha University of Technology and Research (OUTR Bhubaneswar / Formerly CET)' },
              { label: 'VSSUT Burla', full: 'Veer Surendra Sai University of Technology (VSSUT Burla)' },
              { label: 'OUHS Medical', full: 'Odisha University of Health Sciences (OUHS Bhubaneswar)' }
            ].map(uChip => (
              <button
                key={uChip.label}
                type="button"
                onClick={() => onUniversityChange(uChip.full)}
                className={`text-[9px] px-1.5 py-0.5 rounded font-medium transition-all cursor-pointer border ${
                  selectedUniversity === uChip.full
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700'
                }`}
              >
                {uChip.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Confirmation Tag */}
      <div className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-50/80 via-white to-indigo-50/50 dark:from-slate-800 dark:via-slate-850 dark:to-slate-800 border border-indigo-100 dark:border-slate-700 text-xs flex items-center justify-between">
        <div className="min-w-0 pr-2">
          <div className="text-[10px] uppercase font-bold text-indigo-700 dark:text-indigo-400 tracking-wider">
            Selected Campus Identity
          </div>
          <div className="font-bold text-slate-900 dark:text-slate-100 truncate text-xs sm:text-sm">
            {currentDisplayInstitute}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1">
            <GraduationCap className="w-3 h-3 text-indigo-500 shrink-0" />
            <span>{selectedUniversity}</span>
          </div>
        </div>
        <div className="shrink-0">
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            ✓ Odisha Synced
          </span>
        </div>
      </div>
    </div>
  );
};
