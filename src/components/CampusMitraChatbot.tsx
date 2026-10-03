import React, { useState, useRef, useEffect } from 'react';
import { useCampus } from '../context/CampusContext';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  HelpCircle, 
  Clock, 
  ShieldCheck, 
  ChevronRight,
  BookOpen,
  Calendar,
  AlertCircle,
  FileText
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  suggestionChips?: string[];
  actionLink?: {
    label: string;
    action: () => void;
  };
}

export const CampusMitraChatbot: React.FC = () => {
  const { chatbotOpen, setChatbotOpen, language, attendance, openCriteriaWithTab, certificates, outpasses } = useCampus();

  const getGreeting = (lang: string): ChatMessage => {
    if (lang === 'hi') {
      return {
        id: 'm1',
        sender: 'bot',
        text: 'नमस्ते! मैं कैंपस मित्र (Campus Mitra) AI सहायक हूँ। अपनी अटेंडेंस, टाइमटेबल, हॉस्टल आउटपास, डिजिटल सर्टिफिकेट या लाइब्रेरी के बारे में कोई भी प्रश्न पूछें।',
        time: 'Just now',
        suggestionChips: [
          'मेरी 75% अटेंडेंस की स्थिति जांचें',
          'बोनाफाइड सर्टिफिकेट कैसे प्राप्त करें?',
          'हॉस्टल कर्फ्यू का समय क्या है?',
          'गीता गोविंदा सेंट्रल लाइब्रेरी में खाली सीटें',
          'आपातकालीन सुरक्षा संपर्क नंबर'
        ]
      };
    }
    if (lang === 'odia') {
      return {
        id: 'm1',
        sender: 'bot',
        text: 'ନମସ୍କାର! ମୁଁ କ୍ୟାମ୍ପସ ମିତ୍ର (Campus Mitra) ଏଆଇ ସହାୟକ। ଆପଣଙ୍କ ଉପସ୍ଥିତି (Attendance), ସମୟସାରଣୀ, ଛାତ୍ରାବାସ ଗେଟ୍ ପାସ୍, ଡିଜିଟାଲ୍ ପ୍ରମାଣପତ୍ର କିମ୍ବା ପାଠାଗାର ସମ୍ପର୍କରେ କୌଣସି ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ।',
        time: 'Just now',
        suggestionChips: [
          'ମୋର ୭୫% ଉପସ୍ଥିତି ସ୍ଥିତି ଯାଞ୍ଚ କରନ୍ତୁ',
          'ବୋନାଫାଇଡ୍ ପ୍ରମାଣପତ୍ର କିପରି ମିଳିବ?',
          'ହଷ୍ଟେଲ୍ କର୍ଫ୍ୟୁ ସମୟ କ’ଣ?',
          'ଗୀତା ଗୋବିନ୍ଦ ପାଠାଗାରରେ ଖାଲି ଆସନ ସ୍ଥିତି',
          'ଜରୁରୀକାଳୀନ ସୁରକ୍ଷା ସମ୍ପର୍କ ନମ୍ବର'
        ]
      };
    }
    if (lang === 'odia_mix') {
      return {
        id: 'm1',
        sender: 'bot',
        text: 'ନମସ୍କାର! ମୁଁ Campus Mitra (କ୍ୟାମ୍ପସ ମିତ୍ର) AI ଆସିଷ୍ଟାଣ୍ଟ। ଆପଣଙ୍କ attendance, timetable, hostel outpass, certificates କିମ୍ବା library ସମ୍ପର୍କରେ କୌଣସି ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ।',
        time: 'Just now',
        suggestionChips: [
          'Check my 75% attendance threshold',
          'How do I apply for Bonafide Certificate?',
          'What is Kharavela Hostel curfew time?',
          'Show Gita Govinda Library seat status',
          'Emergency security contact'
        ]
      };
    }
    return {
      id: 'm1',
      sender: 'bot',
      text: 'Hello! I am Campus Mitra, your 24/7 AI Campus Companion. How can I assist you with your attendance, outpasses, digital certificates, library seats, or exams today?',
      time: 'Just now',
      suggestionChips: [
        'Check my 75% attendance threshold',
        'How do I apply for Bonafide Certificate?',
        'What is Kharavela Hostel curfew time?',
        'Show Gita Govinda Library seat status',
        'Emergency security contact'
      ]
    };
  };

  const [messages, setMessages] = useState<ChatMessage[]>([getGreeting(language)]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Update greeting when language switches if only initial message is present
  useEffect(() => {
    setMessages(prev => {
      if (prev.length <= 1 && prev[0]?.sender === 'bot') {
        return [getGreeting(language)];
      }
      return prev;
    });
  }, [language]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!chatbotOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // AI automated assistant logic matching campus rules & data
    setTimeout(() => {
      let botResponse = '';
      let chips: string[] | undefined = undefined;
      const lower = query.toLowerCase();

      if (lower.includes('attendance') || lower.includes('75%') || lower.includes('bunk') || lower.includes('present') || lower.includes('ଉପସ୍ଥିତି') || lower.includes('अटेंडेंस') || lower.includes('उपस्थिति')) {
        const totalAtt = attendance.reduce((a, c) => a + c.attended, 0);
        const totalHeld = attendance.reduce((a, c) => a + c.totalClasses, 0);
        const pct = ((totalAtt / totalHeld) * 100).toFixed(1);
        
        botResponse = language === 'odia'
          ? `ଆପଣଙ୍କର ସମୁଦାୟ ଉପସ୍ଥିତି ହେଉଛି ${pct}%। ୟୁଜିସି/ନ୍ୟାକ୍ ନିୟମ ଅନୁସାରେ ପରୀକ୍ଷା ଦେବା ପାଇଁ ୭୫% ଉପସ୍ଥିତି ବାଧ୍ୟତାମୂଳକ। "Design & Analysis of Algorithms" ରେ ଆପଣଙ୍କ ଉପସ୍ଥିତି ୭୨.୫% ଥିବାରୁ ଆଗାମୀ ୩ଟି କ୍ଲାସ୍ ଉପସ୍ଥିତ ରୁହନ୍ତୁ।`
          : language === 'hi'
          ? `आपकी कुल अटेंडेंस ${pct}% है। UGC/NAAC नियमों के अनुसार अंतिम परीक्षा के लिए 75% उपस्थिति अनिवार्य है। "Design & Analysis of Algorithms" में आपकी उपस्थिति 72.5% है, कृपया अगले 3 व्याख्यानों में उपस्थित रहें।`
          : language === 'odia_mix'
          ? `ଆପଣଙ୍କର ସମୁଦାୟ Attendance ହେଉଛି ${pct}%। UGC/NAAC ନିୟମ ଅନୁସାରେ ପରୀକ୍ଷା ପାଇଁ 75% ବାଧ୍ୟତାମୂଳକ। "Design & Analysis of Algorithms" ରେ ୭୨.୫% ଥିବାରୁ ଆଗାମୀ ୩ଟି class ଉପସ୍ଥିତ ରୁହନ୍ତୁ।`
          : `Your aggregate attendance currently stands at ${pct}%. As per UGC/NAAC guidelines, a minimum of 75% is required to write end-semester exams. Note: Your "Design & Analysis of Algorithms" course is currently at 72.5% (caution status). You need to attend the next 3 consecutive lectures to cross 75%.`;
        chips = language === 'odia'
          ? ['ଏକାଡେମିକ୍ ସହାୟତା ଟ୍ୟାବ୍ ଦେଖନ୍ତୁ', 'ମେଡିକାଲ୍ ଛୁଟି ଆବେଦନ କରନ୍ତୁ']
          : language === 'hi'
          ? ['एकेडेमिक सहायता टैब देखें', 'मेडिकल लीव आवेदन करें']
          : ['View Academic Support Tab', 'Apply for Medical Leave Duty'];
      } else if (lower.includes('certificate') || lower.includes('bonafide') || lower.includes('noc') || lower.includes('transcript') || lower.includes('ପ୍ରମାଣପତ୍ର') || lower.includes('सर्टिफिकेट') || lower.includes('प्रमाणपत्र')) {
        botResponse = language === 'odia'
          ? 'ଡିଜିଟାଲ୍ ପ୍ରମାଣପତ୍ର ସେବା ସମ୍ପୂର୍ଣ୍ଣ ଅନଲାଇନ୍! ଆପଣ "Digital Services" ଟ୍ୟାବରୁ ବୋନାଫାଇଡ୍, ହଷ୍ଟେଲ୍ ଏନଓସି କିମ୍ବା ଟ୍ରାନ୍ସକ୍ରିପ୍ଟ ପାଇଁ ଗୋଟିଏ କ୍ଲିକରେ ଆବେଦନ କରିପାରିବେ ଏବଂ QR-ସିଲ୍ ଥିବା ପିଡିଏଫ୍ ଡାଉନଲୋଡ୍ କରିପାରିବେ।'
          : language === 'hi'
          ? 'डिजिटल प्रमाणपत्र सेवा पूर्णतः ऑनलाइन है! आप "Digital Services" टैब से बोनाफाइड, हॉस्टल एनओसी या ट्रांसक्रिप्ट के लिए एक क्लिक में आवेदन कर सकते हैं और डिजिटल रूप से हस्ताक्षरित पीडीएफ डाउनलोड कर सकते हैं।'
          : language === 'odia_mix'
          ? 'ଡିଜିଟାଲ ପ୍ରମାଣପତ୍ର ସେବା ସମ୍ପୂର୍ଣ୍ଣ online! ଆପଣ "Digital Services" ଟ୍ୟାବରୁ Bonafide, Hostel NOC କିମ୍ବା Transcript ପାଇଁ ଏକ କ୍ଲିକରେ ଆବେଦନ କରିପାରିବେ ଏବଂ QR-sealed PDF ଡାଉନଲୋଡ କରିପାରିବେ।'
          : 'All institutional certificates (Bonafide, Hostel Clearance NOC, Official Transcripts) are 100% digital with State e-Governance QR seals! You can request one right from the Digital Services tab; average approval SLA is within 4 working hours.';
        chips = language === 'odia'
          ? ['ଡିଜିଟାଲ୍ ସେବା ଖୋଲନ୍ତୁ', 'ସକ୍ରିୟ ଅନୁରୋଧ ଯାଞ୍ଚ କରନ୍ତୁ']
          : language === 'hi'
          ? ['डिजिटल सेवाएं खोलें', 'सक्रिय अनुरोध देखें']
          : ['Open Digital Services', 'Check Active Requests'];
      } else if (lower.includes('curfew') || lower.includes('outpass') || lower.includes('gate') || lower.includes('hostel') || lower.includes('ପାସ୍') || lower.includes('हॉस्टल') || lower.includes('आउटपास')) {
        botResponse = language === 'odia'
          ? 'ଖାରବେଳ ଏବଂ ପ୍ରାଚୀ ଛାତ୍ରାବାସର ସନ୍ଧ୍ୟା କର୍ଫ୍ୟୁ ସମୟ ରାତ୍ରୀ ୮:୩୦। ଏହା ପରେ ବାହାରକୁ ଯିବାକୁ ହେଲେ ୱାର୍ଡେନଙ୍କ ଦ୍ୱାରା ଅନୁମୋଦିତ ଡିଜିଟାଲ୍ ଆଉଟପାସ୍ QR କୋଡ୍ ମୁଖ୍ୟ ସୁରକ୍ଷା ଗେଟରେ ସ୍କାନ୍ କରିବା ବାଧ୍ୟତାମୂଳକ।'
          : language === 'hi'
          ? 'हॉस्टल का शाम का कर्फ्यू समय रात 8:30 बजे है। इसके बाद बाहर जाने के लिए वार्डन द्वारा स्वीकृत डिजिटल आउटपास क्यूआर कोड मुख्य सुरक्षा द्वार पर स्कैन कराना अनिवार्य है।'
          : language === 'odia_mix'
          ? 'Kharavela Boys Hostel ଓ Prachi Girls Hostel ର ସନ୍ଧ୍ୟା curfew ସମୟ ରାତି 8:30 PM। ଏହା ପରେ ବାହାରକୁ ଯିବାକୁ ହେଲେ ୱାର୍ଡେନଙ୍କ ଦ୍ୱାରା ଅନୁମୋଦିତ Digital Outpass QR କୋଡ଼ Main Security Gate ରେ ସ୍କାନ କରିବା ବାଧ୍ୟତାମୂଳକ।'
          : 'Campus Hostel evening curfew is strictly 8:30 PM. For departures beyond curfew or overnight home leaves, you must apply for a Digital Outpass. Once approved by the Warden, present your tamper-proof dynamic QR code at the Main Security Gate.';
        chips = language === 'odia'
          ? ['ଆଉଟପାସ୍ ଆବେଦନ କରନ୍ତୁ', 'ଗେଟ୍ ସ୍କାନର୍ ଦେଖନ୍ତୁ']
          : language === 'hi'
          ? ['आउटपास के लिए आवेदन करें', 'गेट स्कैनर देखें']
          : ['Apply for Outpass', 'View Gate Scanner'];
      } else if (lower.includes('library') || lower.includes('seat') || lower.includes('book') || lower.includes('ପାଠାଗାର') || lower.includes('पुस्तकालय') || lower.includes('किताब')) {
        botResponse = language === 'odia'
          ? 'ଗୀତା ଗୋବିନ୍ଦ କେନ୍ଦ୍ରୀୟ ପାଠାଗାରରେ ଏହି ମୁହୂର୍ତ୍ତରେ ୧୨୨ଟି ସିଟ୍ ଖାଲି ଅଛି (Occupancy ୭୪%)। ଶାନ୍ତ ଅଧ୍ୟୟନ କକ୍ଷରେ ଶବ୍ଦ ମାତ୍ର ୩୨ dB ରହିଛି। ଆପଣ ପୁସ୍ତକ ମଧ୍ୟ ଅନଲାଇନ୍ ଆରକ୍ଷଣ କରିପାରିବେ।'
          : language === 'hi'
          ? 'गीता गोविंदा केंद्रीय पुस्तकालय में इस समय 480 में से 122 सीटें खाली हैं (ऑक्यूपेंसी: 74%)। शांत अध्ययन क्षेत्र में ध्वनि स्तर 32 dB है। आप पुस्तकें भी ऑनलाइन आरक्षित कर सकते हैं।'
          : language === 'odia_mix'
          ? 'ଗୀତା ଗୋବିନ୍ଦ କେନ୍ଦ୍ରୀୟ ପାଠାଗାର (Gita Govinda Central Library) ରେ ଏହି ମୁହୂର୍ତ୍ତରେ ୧୨୨ଟି ସିଟ୍ ଖାଲି ଅଛି (Occupancy 74%)। Silent Reading Zone 32 dB ରେ ଶାନ୍ତ ରହିଛି। ଆପଣ ବହି ମଧ୍ୟ ଅନଲାଇନ ରିଜର୍ଭ କରିପାରିବେ।'
          : 'Gita Govinda Central Library currently has 122 seats available out of 480 (Occupancy: 74.6%). Acoustic noise level is at 32 dB (Whisper Silent). You can search the catalog and reserve course textbooks directly in the Facilities Hub.';
        chips = language === 'odia'
          ? ['ପାଠାଗାର ବହି ଆରକ୍ଷଣ କରନ୍ତୁ', 'ଆସନ ସ୍ଥିତି ଯାଞ୍ଚ କରନ୍ତୁ']
          : language === 'hi'
          ? ['लाइब्रेरी पुस्तक आरक्षित करें', 'फ्लोर लेआउट जांचें']
          : ['Reserve Library Book', 'Check Floor Layout'];
      } else if (lower.includes('emergency') || lower.includes('security') || lower.includes('hospital') || lower.includes('ambulance') || lower.includes('ଜରୁରୀ') || lower.includes('सुरक्षा') || lower.includes('आपातकालीन')) {
        botResponse = language === 'odia'
          ? 'କ୍ୟାମ୍ପସ ଜରୁରୀକାଳୀନ ହେଲ୍ପଲାଇନ୍: କେନ୍ଦ୍ରୀୟ ସୁରକ୍ଷା ଗେଟ୍: +91 674-230-1999 | ୨୪x୭ ବିଶ୍ୱବିଦ୍ୟାଳୟ ସ୍ୱାସ୍ଥ୍ୟ କେନ୍ଦ୍ର ଏବଂ ଆମ୍ବୁଲାନ୍ସ: +91 674-230-1108 | ରାଜ୍ୟ ପୋଲିସ ନିୟନ୍ତ୍ରଣ: 112।'
          : language === 'hi'
          ? 'आपातकालीन हेल्पलाइन: मुख्य सुरक्षा नियंत्रण: +91 674-230-1999 | स्वास्थ्य केंद्र और एम्बुलेंस: +91 674-230-1108 | पुलिस नियंत्रण: 112।'
          : language === 'odia_mix'
          ? 'କ୍ୟାମ୍ପସ ଜରୁରୀକାଳୀନ ହେଲ୍ପଲାଇନ: Security Gate Desk: +91 674-230-1999 | 24x7 University Health Center & Ambulance: +91 674-230-1108 | State Police Control: 112।'
          : 'Emergency Hotlines: Campus Security Central Control: +91 674-230-1999 | Health Centre & Ambulance: +91 674-230-1108 | AIIMS Bhubaneswar Emergency: 102 / 112.';
        chips = language === 'odia'
          ? ['ସୁରକ୍ଷା ଡେସ୍କକୁ କଲ୍ କରନ୍ତୁ', 'ଜରୁରୀ ଅଭିଯୋଗ ଦାଖଲ କରନ୍ତୁ']
          : language === 'hi'
          ? ['सुरक्षा डेस्क पर कॉल करें', 'आपातकालीन शिकायत दर्ज करें']
          : ['Call Security Desk', 'Lodge Urgent Grievance'];
      } else {
        botResponse = language === 'odia'
          ? `ମୁଁ ଆପଣଙ୍କ ପ୍ରଶ୍ନ ବୁଝିଲି: "${query}"। ମୁଁ ଆପଣଙ୍କୁ UniSphere ର ସମସ୍ତ ମାନଦଣ୍ଡ (ଛାତ୍ରଛାତ୍ରୀ ସହାୟତା, ଡିଜିଟାଲ୍ ପ୍ରମାଣପତ୍ର, ଗେଟ୍ ପାସ୍, ଲାଇବ୍ରେରୀ ଇତ୍ୟାଦି) ସହିତ ସହାୟତା କରିବାକୁ ପ୍ରସ୍ତୁତ।`
          : language === 'hi'
          ? `मैंने आपका प्रश्न समझा: "${query}"। मैं आपकी अटेंडेंस, डिजिटल सर्टिफिकेट, आपातकालीन आउटपास या कैंपस नियमों में सहायता के लिए तैयार हूँ।`
          : language === 'odia_mix'
          ? `ମୁଁ ଆପଣଙ୍କ ପ୍ରଶ୍ନ ବୁଝିଲି: "${query}"। ମୁଁ ଆପଣଙ୍କୁ UniSphere ର ସମସ୍ତ ୮ଟି ମାନଦଣ୍ଡ (Student Support, Digital Services, Outpass, Analytics ଇତ୍ୟାଦି) ସହିତ ସହାୟତା କରିବାକୁ ପ୍ରସ୍ତୁତ।`
          : `I have processed your query: "${query}". As your AI assistant, I can immediately pull up your attendance metrics, trigger digital certificates, generate emergency outpasses, or explain campus regulations.`;
        chips = language === 'odia'
          ? ['ଉପସ୍ଥିତି ଯାଞ୍ଚ କରନ୍ତୁ', 'ପ୍ରମାଣପତ୍ର ଆବେଦନ କରନ୍ତୁ', 'ମାନଦଣ୍ଡ ମ୍ୟାଟ୍ରିକ୍ସ ଦେଖନ୍ତୁ']
          : language === 'hi'
          ? ['उपस्थिति जांचें', 'प्रमाणपत्र आवेदन करें', 'मानदंड मैट्रिक्स देखें']
          : ['Check Attendance', 'Apply for Certificate', 'View Criteria Matrix'];
      }

      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestionChips: chips
        }
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[95vw] sm:w-[410px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[580px] h-[550px] animate-in slide-in-from-bottom-5 duration-200">
      {/* Header */}
      <div className="px-4 py-3.5 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Bot className="w-5 h-5 text-indigo-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-tight">
                {language === 'odia' ? 'କ୍ୟାମ୍ପସ ମିତ୍ର (Campus Mitra AI)' : language === 'hi' ? 'कैंपस मित्र (Campus Mitra AI)' : language === 'odia_mix' ? 'Campus Mitra (କ୍ୟାମ୍ପସ ମିତ୍ର)' : 'Campus Mitra AI'}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-[10px] text-indigo-200/90 font-medium">
              {language === 'odia' ? 'ସ୍ମାର୍ଟ ଛାତ୍ରଛାତ୍ରୀ ସହାୟକ • ୨୪/୭ ସକ୍ରିୟ' : language === 'hi' ? 'स्मार्ट विद्यार्थी सहायक • 24/7 सक्रिय' : 'Smart Student Assistant • 24/7 Live'}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setChatbotOpen(false)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="p-4 flex-1 overflow-y-auto space-y-3.5 bg-slate-50/60">
        {messages.map((m) => {
          const isBot = m.sender === 'bot';
          return (
            <div key={m.id} className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-2xs ${
                  isBot
                    ? 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs'
                    : 'bg-indigo-600 text-white rounded-tr-xs'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[9px] text-slate-400 mt-1 px-1">{m.time}</span>

              {/* Bot Suggestion Chips */}
              {isBot && m.suggestionChips && m.suggestionChips.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                  {m.suggestionChips.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(chip)}
                      className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-[10px] font-semibold border border-indigo-200 transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-indigo-500" />
                      <span>{chip}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center space-x-1.5 text-slate-400 text-xs px-2 py-1">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" />
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]" />
            <span className="text-[11px] text-slate-500 font-medium ml-1">Campus Mitra is analyzing...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-3 bg-white border-t border-slate-200 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={
              language === 'odia'
                ? 'ପଚାରନ୍ତୁ: ଉପସ୍ଥିତି, ଗେଟ୍ ପାସ୍, ପ୍ରମାଣପତ୍ର, ପାଠାଗାର...'
                : language === 'hi'
                ? 'पूछें: अटेंडेंस, आउटपास, सर्टिफिकेट, लाइब्रेरी...'
                : language === 'odia_mix'
                ? 'ପଚାରନ୍ତୁ: Attendance, Outpass, Library...'
                : 'Ask anything about attendance, certificates, curfew...'
            }
            className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={!inputVal.trim()}
            className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white cursor-pointer transition-colors shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="flex items-center justify-between text-[9px] text-slate-400 mt-1.5 px-1">
          <span>Criterion 7 • 🤖 Smart AI Features</span>
          <button 
            type="button" 
            onClick={() => openCriteriaWithTab('crit-smart-features')}
            className="hover:text-indigo-600 underline cursor-pointer"
          >
            View Specification
          </button>
        </div>
      </div>
    </div>
  );
};
