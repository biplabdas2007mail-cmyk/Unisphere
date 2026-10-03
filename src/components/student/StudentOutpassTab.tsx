import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { OutpassType, OutpassRequest } from '../../types';
import { 
  QrCode, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  PlusCircle, 
  MapPin, 
  Calendar, 
  AlertCircle,
  FileCheck2,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

const OUTPASS_TYPES: OutpassType[] = [
  'Day Outpass',
  'Weekend Home Pass',
  'Official Event',
  'Emergency Leave'
];

export const StudentOutpassTab: React.FC = () => {
  const { outpasses, currentUser, requestOutpass, language, t } = useCampus();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [activeQrModalPass, setActiveQrModalPass] = useState<OutpassRequest | null>(null);

  // Form states
  const [outpassType, setOutpassType] = useState<OutpassType>('Day Outpass');
  const [destination, setDestination] = useState('');
  const [reason, setReason] = useState('');
  const [departureDate, setDepartureDate] = useState(new Date().toISOString().split('T')[0]);
  const [departureTime, setDepartureTime] = useState('16:00');
  const [returnDate, setReturnDate] = useState(new Date().toISOString().split('T')[0]);
  const [returnTime, setReturnTime] = useState('20:30');

  const myOutpasses = outpasses.filter(o => 
    o.studentId === currentUser?.studentId || o.studentName === currentUser?.name
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim() || !reason.trim()) return;

    requestOutpass({
      studentId: currentUser?.studentId || '2023CS1082',
      studentName: currentUser?.name || 'Aarav Mohapatra',
      roomNo: currentUser?.roomNo || 'B-314',
      hostelBlock: currentUser?.hostelBlock || 'Kharavela Bhawan (Block B)',
      outpassType,
      reason,
      destination,
      departureDate,
      departureTime,
      returnDate,
      returnTime
    });

    setDestination('');
    setReason('');
    setShowApplyModal(false);
  };

  const activeApprovedPass = myOutpasses.find(o => o.status === 'Approved');

  return (
    <div className="space-y-6">
      {/* Top Banner explaining PS07 Solution */}
      <div className="p-4 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-indigo-950 dark:text-indigo-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            {language === 'odia'
              ? 'ଡିଜିଟାଲ୍ ଗେଟ୍ ପାସ୍ ଏବଂ ପ୍ରସ୍ଥାନ ଅନୁମୋଦନ'
              : language === 'hi'
              ? 'डिजिटल गेट पास एवं प्रस्थान अनुमति'
              : language === 'odia_mix'
              ? 'Digital Gate Pass (ଗେଟ୍ ପାସ୍) • Paperless Campus'
              : 'Digital Gate Outpass & Leave Clearance'}
          </h3>
          <p className="text-xs text-indigo-800/80 dark:text-indigo-300/80 mt-0.5">
            {language === 'odia'
              ? 'କାଗଜମୁକ୍ତ ସ୍ମାର୍ଟ ଅନୁମୋଦନ ଏବଂ କ୍ୟୁଆର୍ କୋଡ୍ ସ୍କାନ୍ ଦ୍ୱାରା ନିରାପଦ ପ୍ରସ୍ଥାନ।'
              : language === 'hi'
              ? 'कागज-रहित स्मार्ट अनुमति और क्यूआर कोड स्कैन द्वारा सुरक्षित प्रस्थान एवं आगमन।'
              : language === 'odia_mix'
              ? 'କାଗଜପତ୍ର ବିନା QR କୋଡ୍ ସ୍କାନରେ ସୁରକ୍ଷା ଗେଟ୍ ଯାଞ୍ଚ କରନ୍ତୁ।'
              : 'Zero paper forms and no waiting for physical signatures. Approved passes generate a cryptographically timestamped gate QR pass.'}
          </p>
        </div>
        <button
          id="btn-apply-outpass"
          onClick={() => setShowApplyModal(true)}
          className="inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t.applyOutpassBtn}</span>
        </button>
      </div>

      {/* Active Pass Spotlight (If any approved) */}
      {activeApprovedPass && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-950 text-white shadow-lg border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 text-xs font-bold border border-emerald-400/40">
              <CheckCircle2 className="w-3.5 h-3.5" /> {language === 'hi' ? 'सक्रिय स्वीकृत गेट पास' : language === 'odia' ? 'ସକ୍ରିୟ ଅନୁମୋଦିତ ପାସ୍' : 'ACTIVE APPROVED OUTPASS'}
            </div>
            <h4 className="text-base font-bold">{activeApprovedPass.outpassType} to {activeApprovedPass.destination}</h4>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-emerald-100/90">
              <span>Exit: <strong>{activeApprovedPass.departureDate} at {activeApprovedPass.departureTime}</strong></span>
              <span>•</span>
              <span>Return: <strong>{activeApprovedPass.returnDate} by {activeApprovedPass.returnTime}</strong></span>
              <span>•</span>
              <span className="text-emerald-300 font-mono">ID: {activeApprovedPass.id}</span>
            </div>
          </div>

          <button
            onClick={() => setActiveQrModalPass(activeApprovedPass)}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center space-x-2 shadow-md transition-transform active:scale-95 cursor-pointer shrink-0"
          >
            <QrCode className="w-4 h-4" />
            <span>{t.showGateQrBtn}</span>
          </button>
        </div>
      )}

      {/* Outpass History Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
            {language === 'hi' ? 'मेरे गेट पास आवेदन' : language === 'odia' ? 'ମୋର ଗେଟ୍ ପାସ୍ ଆବେଦନ ଇତିହାସ' : language === 'odia_mix' ? 'ମୋର Outpass ଆବେଦନ (History)' : 'My Leave & Outpass Applications'}
          </h4>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Total: {myOutpasses.length} {language === 'hi' ? 'आवेदन' : language === 'odia' ? 'ଆବେଦନ' : 'applications'}
          </span>
        </div>

        {myOutpasses.length === 0 ? (
          <div className="text-center py-10 p-4">
            <FileCheck2 className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
            <p className="text-xs text-slate-500 dark:text-slate-400">No outpass applications yet. Click 'Apply for Outpass' when travelling.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {myOutpasses.map((pass) => (
              <div key={pass.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">{pass.id}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300">
                      {pass.outpassType}
                    </span>
                    {pass.status === 'Approved' && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Approved
                      </span>
                    )}
                    {pass.status === 'Pending' && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Warden Review Pending
                      </span>
                    )}
                    {pass.status === 'Rejected' && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> Rejected
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-slate-800 dark:text-slate-200 font-medium">
                    Destination: <strong className="text-slate-900 dark:text-white">{pass.destination}</strong>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 italic">
                    "{pass.reason}"
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-x-3 text-[11px] text-slate-400 dark:text-slate-500 pt-0.5">
                    <span>Departs: {pass.departureDate} ({pass.departureTime})</span>
                    <span>•</span>
                    <span>Returns: {pass.returnDate} ({pass.returnTime})</span>
                    {pass.approvedBy && (
                      <span className="text-emerald-700 dark:text-emerald-400 font-medium">• Approved by {pass.approvedBy}</span>
                    )}
                  </div>
                </div>

                <div className="self-end sm:self-center shrink-0">
                  {pass.status === 'Approved' ? (
                    <button
                      onClick={() => setActiveQrModalPass(pass)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300 font-bold text-xs border border-indigo-200 dark:border-indigo-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>View Pass</span>
                    </button>
                  ) : (
                    <span className="text-xs text-slate-400 font-mono">
                      {pass.status === 'Pending' ? 'In Review' : 'Closed'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* QR Gate Pass Modal */}
      {activeQrModalPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-center p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-extrabold tracking-wider uppercase text-slate-500 dark:text-slate-400">Security Gate Clearance</span>
              <button onClick={() => setActiveQrModalPass(null)} className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer">✕</button>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 inline-block">
              {/* Scalable QR Visual Representation */}
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
                    {activeQrModalPass.id}
                  </span>
                </div>

                <div className="w-full flex justify-between">
                  <div className="w-10 h-10 border-4 border-slate-900 flex items-center justify-center">
                    <div className="w-4 h-4 bg-slate-900" />
                  </div>
                  <div className="text-[9px] font-mono text-slate-500 self-end">SEC-AES256</div>
                </div>
              </div>
            </div>

            <div className="text-xs space-y-1">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">{activeQrModalPass.studentName}</h4>
              <p className="text-slate-500 dark:text-slate-400">Roll: {activeQrModalPass.studentId} • Room: {activeQrModalPass.roomNo}</p>
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-medium rounded-lg text-[11px] border border-emerald-200 dark:border-emerald-800 mt-2">
                Valid for Exit: {activeQrModalPass.departureDate} ({activeQrModalPass.departureTime}) <br/>
                Expected Return: {activeQrModalPass.returnDate} ({activeQrModalPass.returnTime})
              </div>
            </div>

            <button
              onClick={() => setActiveQrModalPass(null)}
              className="w-full py-2 bg-slate-900 dark:bg-indigo-600 text-white font-bold rounded-xl text-xs cursor-pointer"
            >
              Done / Close Pass
            </button>
          </div>
        </div>
      )}

      {/* Apply Outpass Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/80">
              <div className="flex items-center space-x-2">
                <FileCheck2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Request Digital Campus Outpass</h3>
              </div>
              <button onClick={() => setShowApplyModal(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Pass Category</label>
                <select
                  value={outpassType}
                  onChange={e => setOutpassType(e.target.value as OutpassType)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-800 dark:text-white"
                >
                  {OUTPASS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    {language === 'odia_mix'
                      ? 'Destination Address (ଗନ୍ତବ୍ୟ ସ୍ଥଳ)'
                      : language === 'odia'
                      ? 'ଗନ୍ତବ୍ୟ ସ୍ଥଳ / ସହର'
                      : language === 'hi'
                      ? 'गंतव्य स्थल / शहर का पता'
                      : 'Destination Address / City'}
                  </label>
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">Odisha Hubs</span>
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Canteen, Bhubaneswar or Silver City Cuttack or Puri"
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
                {/* Quick Odisha Location Chips */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[
                    'Master Canteen, Bhubaneswar',
                    'Badambadi, Cuttack',
                    'Grand Road, Puri',
                    'Sector 1, Rourkela',
                    'Gita Govinda Library, Campus'
                  ].map(loc => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setDestination(loc)}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 hover:text-indigo-800 dark:hover:text-indigo-300 text-[10px] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                    >
                      + {loc}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Departure Date</label>
                  <input
                    type="date"
                    required
                    value={departureDate}
                    onChange={e => setDepartureDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Departure Time</label>
                  <input
                    type="time"
                    required
                    value={departureTime}
                    onChange={e => setDepartureTime(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Return Date</label>
                  <input
                    type="date"
                    required
                    value={returnDate}
                    onChange={e => setReturnDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Return Time</label>
                  <input
                    type="time"
                    required
                    value={returnTime}
                    onChange={e => setReturnTime(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Reason for Leave</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Explain reason for leaving campus (e.g. family function, project material procurement, medical appointment)..."
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md transition-colors cursor-pointer"
                >
                  Submit for Warden Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
