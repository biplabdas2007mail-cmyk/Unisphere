import React from 'react';

interface UniSphereLogoProps {
  variant?: 'full' | 'icon' | 'nav' | 'login-card';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  theme?: 'light' | 'dark' | 'auto';
}

export const UniSphereLogo: React.FC<UniSphereLogoProps> = ({
  variant = 'full',
  size = 'md',
  showTagline = true,
  className = '',
  theme = 'auto'
}) => {
  // Size metrics for the icon emblem
  const sizeMap = {
    xs: { icon: 'w-7 h-7', text: 'text-sm', odia: 'text-xs', sub: 'text-[9px]' },
    sm: { icon: 'w-9 h-9', text: 'text-base', odia: 'text-sm', sub: 'text-[10px]' },
    md: { icon: 'w-12 h-12', text: 'text-xl', odia: 'text-lg', sub: 'text-xs' },
    lg: { icon: 'w-16 h-16', text: 'text-2xl', odia: 'text-xl', sub: 'text-sm' },
    xl: { icon: 'w-24 h-24', text: 'text-4xl', odia: 'text-3xl', sub: 'text-base' }
  };

  const currentSize = sizeMap[size];

  // Pure SVG Emblem of the Mascot + Globe + U-Swoosh
  const EmblemSvg = ({ className = 'w-full h-full' }: { className?: string }) => (
    <svg 
      viewBox="0 0 200 200" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="UniSphere Odisha Campus AI Mascot Logo"
    >
      <defs>
        <linearGradient id="uGradLive" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="45%" stopColor="#0ea5e9" />
          <stop offset="70%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>

        <radialGradient id="globeGradLive" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#047857" />
        </radialGradient>

        <linearGradient id="robotGradLive" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="75%" stopColor="#f0f9ff" />
          <stop offset="100%" stopColor="#bae6fd" />
        </linearGradient>
      </defs>

      {/* Outer Dynamic U-Shape Swoosh */}
      <path 
        d="M 38 105 C 38 152, 75 178, 122 178 C 165 178, 192 150, 192 102 L 192 84 C 192 77, 183 75, 178 80 C 170 92, 164 120, 145 139 C 126 156, 94 156, 73 134 C 61 122, 56 105, 56 86 Z" 
        fill="url(#uGradLive)" 
      />

      {/* Orange Wing Accent */}
      <path 
        d="M 164 84 C 176 72, 192 75, 192 84 C 192 116, 174 144, 140 160 C 162 144, 174 120, 174 97 C 174 88, 169 84, 164 84 Z" 
        fill="#f97316" 
      />

      {/* Globe Sphere with grid lines */}
      <g transform="translate(86, 68)">
        <circle cx="46" cy="46" r="42" fill="url(#globeGradLive)" />
        <g stroke="#ffffff" strokeWidth="2.4" fill="none" opacity="0.9">
          <line x1="4" y1="46" x2="88" y2="46" strokeWidth="2.6" />
          <ellipse cx="46" cy="27" rx="38" ry="11" />
          <ellipse cx="46" cy="65" rx="38" ry="11" />
          <ellipse cx="46" cy="13" rx="28" ry="6" />
          <ellipse cx="46" cy="79" rx="28" ry="6" />

          <line x1="46" y1="4" x2="46" y2="88" strokeWidth="2.6" />
          <ellipse cx="46" cy="46" rx="24" ry="42" />
          <ellipse cx="46" cy="46" rx="13" ry="42" />
        </g>
        <ellipse cx="34" cy="26" rx="18" ry="10" fill="#ffffff" opacity="0.28" transform="rotate(-25 34 26)" />
      </g>

      {/* Mascot Student Robot */}
      <g transform="translate(10, 15)">
        {/* Left Arm */}
        <path d="M 28 88 C 18 91, 12 105, 20 115 C 26 122, 35 120, 40 110 Z" fill="#ffffff" stroke="#0284c7" strokeWidth="2.5" />
        {/* Right Arm */}
        <path d="M 72 90 C 82 90, 91 97, 88 107 C 85 115, 77 116, 69 111 Z" fill="#ffffff" stroke="#0284c7" strokeWidth="2.5" />

        {/* Torso */}
        <path d="M 32 80 C 32 75, 70 75, 70 80 L 66 108 C 66 119, 36 119, 36 108 Z" fill="url(#robotGradLive)" stroke="#0284c7" strokeWidth="2.5" />
        <circle cx="51" cy="95" r="5.5" fill="#0284c7" />
        <circle cx="51" cy="95" r="2.5" fill="#38bdf8" />

        {/* Ear Pods */}
        <rect x="14" y="44" width="8" height="17" rx="4" fill="#0284c7" />
        <rect x="16" y="48" width="4" height="9" rx="2" fill="#38bdf8" />
        <rect x="80" y="44" width="8" height="17" rx="4" fill="#0284c7" />
        <rect x="82" y="48" width="4" height="9" rx="2" fill="#38bdf8" />

        {/* Head */}
        <rect x="20" y="30" width="62" height="50" rx="25" fill="url(#robotGradLive)" stroke="#0284c7" strokeWidth="3" />

        {/* Face Screen */}
        <rect x="26" y="38" width="50" height="34" rx="15" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />

        {/* Eyes with white highlights */}
        <ellipse cx="41" cy="51" rx="4.2" ry="5.8" fill="#0284c7" />
        <circle cx="42.5" cy="49" r="1.5" fill="#ffffff" />
        <ellipse cx="61" cy="51" rx="4.2" ry="5.8" fill="#0284c7" />
        <circle cx="62.5" cy="49" r="1.5" fill="#ffffff" />

        {/* Smile */}
        <path d="M 44 61 Q 51 67 58 61" fill="none" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />

        {/* Mortarboard Academic Cap */}
        <ellipse cx="51" cy="32" rx="22" ry="5" fill="#0c1d36" />
        <polygon points="51,8 90,24 51,34 12,24" fill="#0f2b48" stroke="#0369a1" strokeWidth="1.5" />
        <circle cx="51" cy="21" r="3" fill="#f59e0b" />
        <path d="M 51 21 C 34 23, 20 30, 17 46" fill="none" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="17" cy="50" rx="3.5" ry="4.5" fill="#ea580c" />
      </g>
    </svg>
  );

  // 1. Icon-only variant
  if (variant === 'icon') {
    return (
      <div className={`relative inline-flex items-center justify-center shrink-0 ${currentSize.icon} ${className}`}>
        <EmblemSvg />
      </div>
    );
  }

  // 2. Nav variant (Compact header lockup)
  if (variant === 'nav') {
    return (
      <div className={`flex items-center space-x-2.5 sm:space-x-3 group cursor-pointer ${className}`}>
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white dark:bg-slate-800 p-1 shadow-xs border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
          <EmblemSvg className="w-full h-full drop-shadow-2xs" />
        </div>
        <div>
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <span className="font-black text-base sm:text-lg text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              UniSphere
            </span>
            <span className="font-extrabold text-sm sm:text-base text-indigo-700 dark:text-indigo-300">
              ଓଡ଼ିଶା
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 hidden sm:inline">
              Campus AI
            </span>
          </div>
          <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 leading-tight">
            <span>Campus AI Solutions</span>
            <span className="text-slate-400 dark:text-slate-500">•</span>
            <span className="inline-flex items-center px-1.5 py-0.2 rounded font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800/70">
              Techinnovators
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 3. Login Card / Showcase Hero Variant
  if (variant === 'login-card') {
    return (
      <div className={`flex flex-col space-y-3 ${className}`}>
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white p-1.5 shadow-lg border border-indigo-100 flex items-center justify-center shrink-0">
            <EmblemSvg className="w-full h-full drop-shadow-sm" />
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                UniSphere
              </h1>
              <span className="text-xl sm:text-2xl font-black text-amber-300">
                ଓଡ଼ିଶା
              </span>
            </div>
            <div className="flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-indigo-200 tracking-wide">
              <span>Campus AI Solutions</span>
              <span>•</span>
              <span className="text-amber-300 bg-white/10 px-2 py-0.5 rounded-md border border-white/20">
                Techinnovators
              </span>
            </div>
          </div>
        </div>

        {showTagline && (
          <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 self-start">
            <p className="text-[11px] sm:text-xs font-medium italic text-indigo-100">
              'Empowering Education through AI.'
            </p>
          </div>
        )}
      </div>
    );
  }

  // 4. Default Full Lockup Variant (like the uploaded image)
  const isDark = theme === 'dark';

  return (
    <div className={`flex flex-col items-center sm:items-start text-center sm:text-left ${className}`}>
      <div className="flex items-center space-x-3.5 sm:space-x-4">
        {/* Emblem on the left */}
        <div className={`${currentSize.icon} shrink-0`}>
          <EmblemSvg className="w-full h-full drop-shadow-md" />
        </div>

        {/* Text on the right */}
        <div className="flex flex-col justify-center">
          <div className={`font-black tracking-tight leading-none ${currentSize.text} ${isDark ? 'text-white' : 'text-[#0c1e38] dark:text-white'}`}>
            UniSphere
          </div>
          <div className={`font-black leading-tight mt-1 ${currentSize.odia} ${isDark ? 'text-indigo-300' : 'text-[#0c1e38] dark:text-indigo-300'}`}>
            ଓଡ଼ିଶା
          </div>
          <div className={`font-bold tracking-tight mt-0.5 flex items-center space-x-1.5 ${currentSize.sub} ${isDark ? 'text-slate-300' : 'text-slate-700 dark:text-slate-300'}`}>
            <span>Campus AI Solutions</span>
            <span>•</span>
            <span className="font-extrabold text-indigo-600 dark:text-indigo-400">Techinnovators</span>
          </div>
        </div>
      </div>

      {/* Motto / Tagline below */}
      {showTagline && (
        <div className="mt-2.5 pt-2 border-t border-slate-200/80 dark:border-slate-800 text-[11px] sm:text-xs font-semibold italic text-slate-500 dark:text-slate-400">
          'Empowering Education through AI.'
        </div>
      )}
    </div>
  );
};
