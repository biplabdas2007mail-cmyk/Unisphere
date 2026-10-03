import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { CertificateType, DigitalCertificateRequest } from '../../types';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Download, 
  Printer, 
  QrCode, 
  ShieldCheck, 
  Plus, 
  Building, 
  ArrowRight,
  Sparkles,
  ExternalLink,
  Award
} from 'lucide-react';

export const StudentDigitalServicesTab: React.FC = () => {
  const { currentUser, certificates, requestCertificate, language } = useCampus();
  
  // Form states
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [certType, setCertType] = useState<CertificateType>('Bonafide Certificate');
  const [purpose, setPurpose] = useState('');
  const [urgencyNote, setUrgencyNote] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  
  // Selected certificate for preview modal
  const [selectedPreviewCert, setSelectedPreviewCert] = useState<DigitalCertificateRequest | null>(null);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!purpose.trim()) return;

    requestCertificate({
      studentId: currentUser?.studentId || '2023CS1082',
      studentName: currentUser?.name || 'Aarav Mohapatra',
      department: currentUser?.department || 'Computer Science & Engineering',
      certificateType: certType,
      purpose: urgencyNote ? `${purpose.trim()} (Note: ${urgencyNote.trim()})` : purpose.trim()
    });

    setShowApplyModal(false);
    setPurpose('');
    setUrgencyNote('');
    setToastMsg(
      language === 'odia_mix'
        ? `${certType} ଆବେଦନ ସଫଳତାର ସହ ଦାଖଲ ହେଲା! ପ୍ରଶାସନିକ ଯାଞ୍ଚ ଚାଲିଛି।`
        : language === 'odia'
        ? `${certType} ଆବେଦନ ସଫଳତାର ସହ ଦାଖଲ ହେଲା! ପ୍ରଶାସନିକ ଅନୁମୋଦନ ଅପେକ୍ଷାରେ ଅଛି।`
        : language === 'hi'
        ? `${certType} हेतु आवेदन सफलतापूर्वक प्रस्तुत किया गया! प्रशासनिक सत्यापन विचाराधीन है।`
        : `Request for ${certType} submitted successfully! Awaiting administrative verification.`
    );
    setTimeout(() => setToastMsg(''), 4500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Notice */}
      {toastMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-900 via-emerald-950 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20">
            <FileText className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight">
                {language === 'odia_mix'
                  ? 'ଡିଜିଟାଲ ପ୍ରମାଣପତ୍ର ଓ ସେବା କେନ୍ଦ୍ର'
                  : language === 'odia'
                  ? 'ଡିଜିଟାଲ୍ ପ୍ରମାଣପତ୍ର ଏବଂ ସେବା କେନ୍ଦ୍ର'
                  : language === 'hi'
                  ? 'डिजिटल प्रमाणपत्र एवं छात्र सेवा केंद्र'
                  : 'Digital Services & Certificate Desk'}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                Criterion 2 • 📝 Digital Services
              </span>
            </div>
            <p className="text-xs text-emerald-200/90 mt-1 max-w-xl">
              {language === 'odia_mix'
                ? '୧୦୦% କାଗଜମୁକ୍ତ ସରକାରୀ ପ୍ରମାଣପତ୍ର, Hostel NOC, Transcript ଏବଂ QR-ସିଲ୍ ଯାଞ୍ଚ।'
                : language === 'odia'
                ? 'ଶତପ୍ରତିଶତ କାଗଜମୁକ୍ତ ବିଶ୍ୱବିଦ୍ୟାଳୟ ପ୍ରମାଣପତ୍ର, ଛାତ୍ରାବାସ ଏନଓସି, ଟ୍ରାନ୍ସକ୍ରିପ୍ଟ ଏବଂ ସୁରକ୍ଷିତ ଡିଜିଟାଲ୍ ସିଲ୍।'
                : language === 'hi'
                ? '100% कागज-रहित आधिकारिक विश्वविद्यालय प्रमाणपत्र, छात्रावास अनापत्ति (NOC), अंकतालिका एवं डिजिटल सत्यापन।'
                : '100% paperless official certificates, verified clearance NOCs, transcript reprints, and digital seal verification without physical queues.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowApplyModal(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>
            {language === 'hi'
              ? '+ नया प्रमाणपत्र आवेदन करें'
              : language === 'odia'
              ? '+ ନୂତନ ପ୍ରମାଣପତ୍ର ଆବେଦନ କରନ୍ତୁ'
              : language === 'odia_mix'
              ? '+ New Certificate ଆବେଦନ'
              : 'Apply for New Certificate'}
          </span>
        </button>
      </div>

      {/* Quick Services Directory Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Bonafide Certificate', desc: 'Passport, Scholarships & Bus Pass', tag: 'Instant Digital Issue' },
          { label: 'Hostel NOC Clearance', desc: 'Vacation, Projects & Internships', tag: 'Warden Signed' },
          { label: 'Official Transcript', desc: 'Semester Grade Sheets (1-4)', tag: 'Controller Sealed' },
          { label: 'Digital ID Reissue', desc: 'QR Card Update & Lost Card', tag: 'Self Service' }
        ].map((item, idx) => (
          <div 
            key={idx}
            onClick={() => {
              setCertType(item.label as CertificateType);
              setShowApplyModal(true);
            }}
            className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-emerald-300 dark:hover:border-emerald-500 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 transition-all cursor-pointer group"
          >
            <div className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-400 tracking-wider">
              {item.tag}
            </div>
            <div className="font-bold text-xs text-slate-900 dark:text-white mt-1 group-hover:text-emerald-950 dark:group-hover:text-emerald-300">
              {item.label}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              {item.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Existing Applications & Issued Certificates */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
            My Digital Documents & Applications
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {certificates.length} Total Requests Logged
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
          {certificates.map((cert) => {
            const isApproved = cert.status === 'Approved';
            const isPending = cert.status === 'Pending';
            return (
              <div key={cert.id} className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {cert.id}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                      isApproved 
                        ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300' 
                        : isPending 
                        ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300'
                        : 'bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300'
                    }`}>
                      {isApproved ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      <span>{cert.status}</span>
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">• Applied {cert.appliedAt}</span>
                  </div>

                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {cert.certificateType}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    <span className="font-semibold text-slate-700 dark:text-slate-200">Purpose: </span>{cert.purpose}
                  </p>

                  {cert.approvedBy && (
                    <div className="text-[11px] text-emerald-800 dark:text-emerald-300 font-medium flex items-center gap-1.5 pt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Digitally authorized by {cert.approvedBy} on {cert.approvedAt}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="shrink-0 flex items-center gap-2 self-end md:self-center">
                  {isApproved ? (
                    <button
                      type="button"
                      onClick={() => setSelectedPreviewCert(cert)}
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>View & Download Certificate</span>
                    </button>
                  ) : (
                    <div className="text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Under Administrative SLA Review</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Request Digital Certificate / Form
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Direct submission to the Registrar & Academic Council with electronic tracking.
                </p>
              </div>
              <button 
                onClick={() => setShowApplyModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleApply} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Certificate Document Type
                </label>
                <select
                  value={certType}
                  onChange={(e) => setCertType(e.target.value as CertificateType)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-medium"
                >
                  <option value="Bonafide Certificate">Bonafide Certificate (Passport, Scholarship, Bank Loan)</option>
                  <option value="Hostel Clearance / NOC">Hostel Clearance / NOC Certificate</option>
                  <option value="Grade Transcript">Cumulative Grade Transcript Reprint</option>
                  <option value="Digital ID Reissue">Digital ID Reissue & Smart Pass</option>
                  <option value="Event Campus Permission">Club / Event Campus Permission Form</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Purpose of Request <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="e.g. Applying for Odisha State Post-Matric Scholarship / Passport verification at Regional Passport Office, Bhubaneswar."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Urgency / Specific Notes (Optional)
                </label>
                <input
                  type="text"
                  value={urgencyNote}
                  onChange={(e) => setUrgencyNote(e.target.value)}
                  placeholder="e.g. Embassy appointment scheduled for next Monday"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-[11px] text-slate-600 dark:text-slate-300">
                <span className="font-bold text-slate-900 dark:text-white">Applicant Identity: </span>
                {currentUser?.name} • Roll No: {currentUser?.studentId || '2023CS1082'} • {currentUser?.department}
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Submit Official Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Digital Certificate Preview Modal */}
      {selectedPreviewCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-300 space-y-6 my-6 max-h-[90vh] overflow-y-auto">
            
            {/* Header with Print / Close */}
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Official Digitally Sealed Document
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPreviewCert(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Official University Certificate Layout */}
            <div className="p-6 sm:p-8 border-4 border-double border-indigo-950/20 bg-slate-50/50 rounded-xl space-y-6 text-center text-slate-900 font-serif">
              {/* Seal & Institution Heading */}
              <div>
                <div className="w-16 h-16 mx-auto rounded-full bg-indigo-950 text-amber-300 flex items-center justify-center font-bold text-xl shadow-md border-2 border-amber-400">
                  🏛️
                </div>
                <h2 className="text-lg sm:text-xl font-black tracking-wide text-slate-950 uppercase mt-3 font-sans">
                  UniSphere Central University of Technology
                </h2>
                <div className="text-xs text-slate-600 font-sans tracking-wider">
                  Established under Government of Odisha State Universities Act • NAAC A++ Grade
                </div>
                <div className="text-[11px] text-slate-500 font-sans mt-0.5">
                  Main Campus: Chandrasekharpur, Bhubaneswar, Odisha - 751024
                </div>
              </div>

              <div className="w-32 h-0.5 bg-indigo-950 mx-auto" />

              {/* Certificate Title */}
              <div>
                <span className="text-xs uppercase tracking-widest text-indigo-900 font-sans font-bold">
                  OFFICIAL CERTIFICATE OF RECORD
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-950 mt-1 uppercase underline decoration-indigo-300 underline-offset-4">
                  {selectedPreviewCert.certificateType}
                </h3>
                <div className="text-xs text-slate-500 font-sans mt-1">
                  Doc Ref: {selectedPreviewCert.id} • Issued: {selectedPreviewCert.approvedAt || '2026-09-20'}
                </div>
              </div>

              {/* Certificate Body Paragraph */}
              <div className="text-xs sm:text-sm text-slate-800 text-justify leading-relaxed max-w-xl mx-auto font-sans pt-2">
                This is to officially certify that <span className="font-extrabold text-slate-950">{selectedPreviewCert.studentName}</span>, bearing Student Roll Number <span className="font-extrabold text-slate-950">{selectedPreviewCert.studentId}</span>, is a bonafide full-time registered scholar in the <span className="font-extrabold text-slate-950">{selectedPreviewCert.department}</span> for the Academic Session 2026–2027.
                <br /><br />
                As per the institutional records maintained by the Academic Senate, their general conduct and academic performance during the semester have been found to be exemplary. This document has been issued upon specific request for the purpose of: <span className="italic font-medium text-slate-950">"{selectedPreviewCert.purpose}"</span>.
              </div>

              {/* Footer Signatures and Verification QR */}
              <div className="pt-6 border-t border-slate-300 grid grid-cols-2 gap-6 items-end font-sans">
                {/* QR Code */}
                <div className="text-left space-y-1">
                  <div className="w-20 h-20 bg-white border border-slate-300 p-1.5 rounded-lg shadow-2xs flex items-center justify-center">
                    <QrCode className="w-full h-full text-slate-900" />
                  </div>
                  <div className="text-[9px] font-mono text-slate-500">
                    Token: {selectedPreviewCert.verificationToken}
                  </div>
                  <div className="text-[9px] text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    State e-Governance Verified
                  </div>
                </div>

                {/* Registrar Stamp */}
                <div className="text-right space-y-1">
                  <div className="font-serif italic text-base font-bold text-indigo-950">
                    Dr. Sarah Jenkins
                  </div>
                  <div className="text-[11px] font-bold text-slate-900">
                    Dean of Academic Affairs & Registrar
                  </div>
                  <div className="text-[10px] text-slate-500">
                    For Controller of Examinations
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => setSelectedPreviewCert(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Close Preview
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Certificate PDF downloaded successfully to device!');
                  setSelectedPreviewCert(null);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Official PDF Copy</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
