import React, { useState } from 'react';
import { MESS_MENU } from '../../data/mockData';
import { useCampus } from '../../context/CampusContext';
import { Utensils, Users, Sparkles, AlertCircle, Heart } from 'lucide-react';

export const StudentMessTab: React.FC = () => {
  const { language } = useCampus();
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [dietaryVote, setDietaryVote] = useState<'veg' | 'nonveg' | null>(null);

  const menu = MESS_MENU.find(m => m.day === selectedDay) || MESS_MENU[0];

  const getCrowdBadge = (level: string) => {
    switch (level) {
      case 'High':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
            <Users className="w-3 h-3" /> {
              language === 'odia'
                ? 'ଅଧିକ ଭିଡ଼ (~୧୨ ମିନିଟ୍ ପ୍ରତୀକ୍ଷା)'
                : language === 'hi'
                ? 'अत्यधिक भीड़ (~12 मिनट प्रतीक्षा)'
                : language === 'odia_mix'
                ? 'ଅଧିକ ଭିଡ଼ (High Rush ~12 min)'
                : 'High Rush (Wait ~12 mins)'
            }
          </span>
        );
      case 'Moderate':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
            <Users className="w-3 h-3" /> {
              language === 'odia'
                ? 'ମଧ୍ୟମ ଭିଡ଼ (~୫ ମିନିଟ୍ ପ୍ରତୀକ୍ଷା)'
                : language === 'hi'
                ? 'मध्यम भीड़ (~5 मिनट प्रतीक्षा)'
                : language === 'odia_mix'
                ? 'ମଧ୍ୟମ ଭିଡ଼ (Moderate ~5 min)'
                : 'Moderate Rush (Wait ~5 mins)'
            }
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
            <Users className="w-3 h-3" /> {
              language === 'odia'
                ? 'କମ୍ ଭିଡ଼ (ସହଜରେ ଆସନ ଉପଲବ୍ଧ)'
                : language === 'hi'
                ? 'कम भीड़ (सीटें तुरंत उपलब्ध)'
                : language === 'odia_mix'
                ? 'କମ୍ ଭିଡ଼ (Low Rush - Ready Seats)'
                : 'Low Rush (Walk-in seating)'
            }
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-4 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-indigo-950 dark:text-indigo-200 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              {language === 'odia_mix'
                ? 'Smart Dining Hall & Mess ମେନୁ (Odisha Campus)'
                : language === 'odia'
                ? 'ସ୍ମାର୍ଟ ଭୋଜନାଳୟ ଏବଂ ମେସ୍ ମେନୁ'
                : language === 'hi'
                ? 'स्मार्ट भोजनालय एवं मेस मेनू'
                : 'Smart Dining Hall & Crowd Meter'}
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
              {language === 'hi' ? 'ओडिशा विशेष व्यंजन' : language === 'odia' ? 'ଓଡ଼ିଆ ସ୍ୱତନ୍ତ୍ର ବ୍ୟଞ୍ଜନ' : language === 'en' ? 'Authentic Odisha Cuisine' : 'ଓଡ଼ିଆ ସ୍ୱତନ୍ତ୍ର ଖାଦ୍ୟ'}
            </span>
          </div>
          <p className="text-xs text-indigo-800/80 dark:text-indigo-300/80 mt-0.5">
            {language === 'odia_mix'
              ? 'ଦୈନିକ ପଖାଳ, ଡାଲମା, ସନ୍ତୁଳା, ଛେନାପୋଡ଼ ଏବଂ ଲାଇଭ୍ ଭିଡ଼ ମିଟର ସହିତ ସ୍ୱଚ୍ଛ ଖାଦ୍ୟ ତାଲିକା।'
              : language === 'odia'
              ? 'ଦୈନିକ ପଖାଳ ଭାତ, ଡାଲମା, ସନ୍ତୁଳା, ଛେନାପୋଡ଼ ଏବଂ ଲାଇଭ୍ ଭିଡ଼ ମିଟର ସହିତ ସ୍ୱଚ୍ଛ ପୌଷ୍ଟିକ ଖାଦ୍ୟ ତାଲିକା।'
              : language === 'hi'
              ? 'दैनिक पखाल भात, दालमा, संतुला, छेनापोड़ और सजीव भीड़ मीटर के साथ पारदर्शी साप्ताहिक भोजन सूची।'
              : 'Eliminate long dining queues with live occupancy insights and transparent weekly nutritional menus.'}
          </p>
        </div>

        <div>
          {getCrowdBadge(menu.crowdLevel)}
        </div>
      </div>

      {/* Day Selector */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        {MESS_MENU.map(m => (
          <button
            key={m.day}
            onClick={() => setSelectedDay(m.day)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedDay === m.day
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {m.day}
          </button>
        ))}
      </div>

      {/* Meal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-indigo-900 dark:text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
              <Utensils className="w-4 h-4 text-amber-500" /> {
                language === 'odia'
                  ? 'ପ୍ରାତଃରାଶ (ଜଳଖିଆ)'
                  : language === 'hi'
                  ? 'प्रातःकालीन नाश्ता'
                  : language === 'odia_mix'
                  ? 'Breakfast / ସକାଳ ଜଳଖିଆ'
                  : 'Breakfast'
              } (07:30 - 09:30 AM)
            </h4>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{menu.breakfast}</p>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-indigo-900 dark:text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
              <Utensils className="w-4 h-4 text-emerald-500" /> {
                language === 'odia'
                  ? 'ମଧ୍ୟାହ୍ନ ଭୋଜନ'
                  : language === 'hi'
                  ? 'मध्याह्न भोजन'
                  : language === 'odia_mix'
                  ? 'Lunch / ମଧ୍ୟାହ୍ନ ଭୋଜନ'
                  : 'Lunch'
              } (12:30 - 02:30 PM)
            </h4>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{menu.lunch}</p>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-indigo-900 dark:text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
              <Utensils className="w-4 h-4 text-orange-500" /> {
                language === 'odia'
                  ? 'ସନ୍ଧ୍ୟା ଜଳଖିଆ ଓ ଚାହା'
                  : language === 'hi'
                  ? 'सायंकालीन अल्पाहार एवं चाय'
                  : language === 'odia_mix'
                  ? 'Snacks / ସନ୍ଧ୍ୟା ଜଳଖିଆ'
                  : 'High Tea & Snacks'
              } (05:00 - 06:15 PM)
            </h4>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{menu.snacks}</p>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-indigo-900 dark:text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
              <Utensils className="w-4 h-4 text-purple-500" /> {
                language === 'odia'
                  ? 'ରାତ୍ରୀ ଭୋଜନ'
                  : language === 'hi'
                  ? 'रात्रिभोज'
                  : language === 'odia_mix'
                  ? 'Dinner / ରାତ୍ରି ଭୋଜନ'
                  : 'Dinner'
              } (07:45 - 09:45 PM)
            </h4>
            {menu.specialNotice && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300">
                {menu.specialNotice}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{menu.dinner}</p>
        </div>
      </div>

      {/* Headcount / Waste Reduction polling */}
      <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="space-y-0.5 text-center sm:text-left">
          <div className="font-bold text-slate-900 dark:text-white">
            {language === 'odia_mix'
              ? 'ଖାଦ୍ୟ ନଷ୍ଟ ନିବାରଣ ଗଣନା (Food Waste Prevention)'
              : language === 'odia'
              ? 'ଖାଦ୍ୟ ନଷ୍ଟ ନିବାରଣ ଗଣନା'
              : language === 'hi'
              ? 'भोजन अपव्यय रोकथाम गणना'
              : 'Food Waste Prevention Headcount'}
          </div>
          <p className="text-slate-500 dark:text-slate-400">
            {language === 'odia_mix'
              ? 'ଆଜି ରାତିରେ ଆପଣ Mess ରେ ଖାଇବେ କି? ସଠିକ୍ ପରିମାଣରେ ରାନ୍ଧିବା ପାଇଁ ଜଣାନ୍ତୁ।'
              : language === 'odia'
              ? 'ଆଜି ରାତିରେ ଆପଣ ମେସ୍‌ରେ ଭୋଜନ କରିବେ କି? ରୋଷେଇ ଟିମ୍‌କୁ ସଠିକ୍ ପରିମାଣ ଜଣାନ୍ତୁ।'
              : language === 'hi'
              ? 'क्या आप आज रात मेस में भोजन करेंगे? रसोई टीम को सटीक मात्रा तैयार करने में मदद करें।'
              : 'Are you dining in the mess tonight? Helping our kitchen cook accurate portions.'}
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => setDietaryVote('veg')}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
              dietaryVote === 'veg' 
                ? 'bg-emerald-600 text-white' 
                : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            {language === 'odia_mix'
              ? '✓ ହଁ, Mess ରେ ଖାଇବି'
              : language === 'odia'
              ? '✓ ହଁ, ମେସ୍‌ରେ ଖାଇବି'
              : language === 'hi'
              ? '✓ हाँ, मेस में खाऊंगा'
              : '✓ Yes, Dining In'}
          </button>
          <button
            onClick={() => setDietaryVote('nonveg')}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
              dietaryVote === 'nonveg' 
                ? 'bg-slate-800 dark:bg-indigo-600 text-white' 
                : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            {language === 'odia_mix'
              ? '✕ ନାହିଁ, ବାହାରେ ଖାଇବି / Skip'
              : language === 'odia'
              ? '✕ ନାହିଁ, ବାହାରେ ଖାଇବି'
              : language === 'hi'
              ? '✕ नहीं, बाहर खाऊंगा'
              : '✕ Dining Out / Skip'}
          </button>
        </div>
      </div>
    </div>
  );
};
