import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User, 
  UserRole, 
  GrievanceTicket, 
  OutpassRequest, 
  FacilityBooking, 
  FacilityFeedback,
  Announcement, 
  TicketStatus,
  OutpassStatus,
  DigitalCertificateRequest,
  StudentAssignment,
  AttendanceCourse,
  LibraryBook,
  CampusEvent
} from '../types';
import { 
  DEMO_USERS, 
  INITIAL_TICKETS, 
  INITIAL_OUTPASSES, 
  INITIAL_FACILITIES, 
  INITIAL_ANNOUNCEMENTS,
  INITIAL_CERTIFICATES,
  INITIAL_ASSIGNMENTS,
  INITIAL_ATTENDANCE,
  LIBRARY_BOOKS,
  CAMPUS_EVENTS
} from '../data/mockData';
import { LanguageMode, TRANSLATIONS, Translations } from '../utils/translations';

interface CampusContextType {
  currentUser: User | null;
  role: UserRole | null;
  tickets: GrievanceTicket[];
  outpasses: OutpassRequest[];
  facilities: FacilityBooking[];
  announcements: Announcement[];
  certificates: DigitalCertificateRequest[];
  assignments: StudentAssignment[];
  attendance: AttendanceCourse[];
  libraryBooks: LibraryBook[];
  campusEvents: CampusEvent[];
  
  // Navigation view
  currentView: 'dashboard' | 'profile';
  setCurrentView: (view: 'dashboard' | 'profile') => void;

  // Criteria Modal State
  criteriaModalOpen: boolean;
  setCriteriaModalOpen: (open: boolean) => void;
  selectedCriteriaTab?: string;
  openCriteriaWithTab: (tabId?: string) => void;

  // AI Chatbot State
  chatbotOpen: boolean;
  setChatbotOpen: (open: boolean) => void;

  // Language localization
  language: LanguageMode;
  setLanguage: (lang: LanguageMode) => void;
  t: Translations;

  // Theme mode (light / dark / system) & Accent
  theme: 'light' | 'dark' | 'system';
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleTheme: () => void;
  campusAccent: 'indigo' | 'amber' | 'emerald' | 'cyan';
  setCampusAccent: (accent: 'indigo' | 'amber' | 'emerald' | 'cyan') => void;

  // Auth methods
  login: (role: UserRole, customUser?: Partial<User>) => void;
  logout: () => void;
  switchRole: (newRole: UserRole) => void;
  updateUserProfile: (updates: Partial<User>) => void;
  
  // Ticket methods
  addTicket: (ticket: Omit<GrievanceTicket, 'id' | 'createdAt' | 'updates'>) => void;
  updateTicketStatus: (id: string, status: TicketStatus, note?: string) => void;
  assignTicket: (id: string, technicianName: string) => void;
  
  // Outpass methods
  requestOutpass: (outpass: Omit<OutpassRequest, 'id' | 'appliedAt' | 'status'>) => void;
  reviewOutpass: (id: string, status: OutpassStatus, approverName: string) => void;
  
  // Facility methods
  bookFacility: (booking: Omit<FacilityBooking, 'id' | 'createdAt' | 'status'>) => void;
  reviewBooking: (id: string, status: 'Confirmed' | 'Rejected', notes?: string) => void;
  submitFacilityFeedback: (
    bookingId: string, 
    feedback: {
      rating: number;
      cleanlinessRating?: number;
      equipmentRating?: number;
      comment: string;
      aspects?: string[];
    }
  ) => void;
  completeFacilitySession: (bookingId: string) => void;
  
  // Announcement methods
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'date'>) => void;
  deleteAnnouncement: (id: string) => void;

  // Digital Services / Certificates
  requestCertificate: (cert: Omit<DigitalCertificateRequest, 'id' | 'appliedAt' | 'status' | 'verificationToken'>) => void;
  reviewCertificate: (id: string, status: 'Approved' | 'Rejected', approverName: string, reason?: string) => void;

  // Assignments & Academics
  submitAssignment: (assignmentId: string, attachmentName?: string) => void;

  // Library & Events
  toggleBookReservation: (bookId: string) => void;
  toggleEventRegistration: (eventId: string) => void;
  
  // Reset demo state
  resetAllData: () => void;
}

const CampusContext = createContext<CampusContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'campus_portal_user',
  TICKETS: 'campus_portal_tickets',
  OUTPASSES: 'campus_portal_outpasses',
  FACILITIES: 'campus_portal_facilities',
  ANNOUNCEMENTS: 'campus_portal_announcements',
  LANGUAGE: 'campus_portal_language',
  THEME: 'unisphere_theme',
  ACCENT: 'unisphere_accent',
};

export const CampusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Theme mode - defaults to light or saved preference
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME) as 'light' | 'dark' | 'system';
      if (saved && (saved === 'light' || saved === 'dark' || saved === 'system')) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'light';
  });

  // Track resolved theme (actual active visual mode)
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      if (saved === 'dark') return 'dark';
      if (saved === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
    }
    return 'light';
  });

  // Campus visual accent palette (Indigo, Konark Amber, Utkal Emerald, Maritime Cyan)
  const [campusAccent, setCampusAccentState] = useState<'indigo' | 'amber' | 'emerald' | 'cyan'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACCENT) as 'indigo' | 'amber' | 'emerald' | 'cyan';
      if (saved && ['indigo', 'amber', 'emerald', 'cyan'].includes(saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'indigo';
  });

  const setCampusAccent = (newAccent: 'indigo' | 'amber' | 'emerald' | 'cyan') => {
    setCampusAccentState(newAccent);
    try {
      localStorage.setItem(STORAGE_KEYS.ACCENT, newAccent);
      document.documentElement.setAttribute('data-accent', newAccent);
    } catch {
      // ignore
    }
  };

  const setTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
    } catch {
      // ignore
    }
  };

  const toggleTheme = () => {
    // Cycles properly through: Light -> Dark -> System
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const applyTheme = () => {
      const isDark = theme === 'dark' || (theme === 'system' && mediaQuery.matches);
      setResolvedTheme(isDark ? 'dark' : 'light');
      if (isDark) {
        root.classList.add('dark');
        root.setAttribute('data-theme', 'dark');
      } else {
        root.classList.remove('dark');
        root.setAttribute('data-theme', 'light');
      }
      root.setAttribute('data-accent', campusAccent);
    };

    applyTheme();

    const listener = () => {
      if (theme === 'system') {
        applyTheme();
      }
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [theme, campusAccent]);
  // Language mode - defaults to Odia & English Mix (as requested)
  const [language, setLanguageState] = useState<LanguageMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE) as LanguageMode;
      if (saved && (saved === 'odia_mix' || saved === 'en' || saved === 'odia' || saved === 'hi')) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'odia_mix';
  });

  const setLanguage = (newLang: LanguageMode) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, newLang);
    } catch {
      // ignore
    }
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.odia_mix;

  // Current user state - defaults to Student (Biplab Das) so the app runs easily out-of-the-box
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id) return parsed;
      }
    } catch {
      // ignore
    }
    // Auto-provision student session for instant access
    let customName = 'Biplab Das';
    let customInstitute = 'Odisha University of Technology and Research (OUTR / Formerly CET Bhubaneswar)';
    let customUniversity = 'Biju Patnaik University of Technology (BPUT Rourkela)';
    let customAvatar = DEMO_USERS.student.avatarUrl;
    try {
      const savedName = localStorage.getItem('campus_portal_custom_name');
      if (savedName) customName = savedName;
      const savedInst = localStorage.getItem('campus_portal_custom_institute');
      if (savedInst) customInstitute = savedInst;
      const savedUniv = localStorage.getItem('campus_portal_custom_university');
      if (savedUniv) customUniversity = savedUniv;
      const savedAvatar = localStorage.getItem('campus_portal_custom_avatar');
      if (savedAvatar) customAvatar = savedAvatar;
    } catch {}

    return {
      ...DEMO_USERS.student,
      name: customName,
      institute: customInstitute,
      university: customUniversity,
      avatarUrl: customAvatar
    };
  });

  // Navigation view state
  const [currentView, setCurrentView] = useState<'dashboard' | 'profile'>('dashboard');

  const [tickets, setTickets] = useState<GrievanceTicket[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TICKETS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_TICKETS;
  });

  const [outpasses, setOutpasses] = useState<OutpassRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.OUTPASSES);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_OUTPASSES;
  });

  const [facilities, setFacilities] = useState<FacilityBooking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FACILITIES);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_FACILITIES;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_ANNOUNCEMENTS;
  });

  const [certificates, setCertificates] = useState<DigitalCertificateRequest[]>(() => {
    try {
      const saved = localStorage.getItem('campus_portal_certificates');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_CERTIFICATES;
  });

  const [assignments, setAssignments] = useState<StudentAssignment[]>(() => {
    try {
      const saved = localStorage.getItem('campus_portal_assignments');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_ASSIGNMENTS;
  });

  const [attendance] = useState<AttendanceCourse[]>(INITIAL_ATTENDANCE);
  const [libraryBooks, setLibraryBooks] = useState<LibraryBook[]>(LIBRARY_BOOKS);
  const [campusEvents, setCampusEvents] = useState<CampusEvent[]>(CAMPUS_EVENTS);

  // Criteria Showcase Modal
  const [criteriaModalOpen, setCriteriaModalOpen] = useState(false);
  const [selectedCriteriaTab, setSelectedCriteriaTab] = useState<string | undefined>(undefined);

  // AI Chatbot State
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const openCriteriaWithTab = (tabId?: string) => {
    setSelectedCriteriaTab(tabId);
    setCriteriaModalOpen(true);
  };

  // Sync to localStorage safely
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch {
      // ignore storage errors
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
    } catch {
      // ignore
    }
  }, [tickets]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.OUTPASSES, JSON.stringify(outpasses));
    } catch {
      // ignore
    }
  }, [outpasses]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FACILITIES, JSON.stringify(facilities));
    } catch {
      // ignore
    }
  }, [facilities]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
    } catch {
      // ignore
    }
  }, [announcements]);

  const login = (role: UserRole, customUser?: Partial<User>) => {
    const baseUser = DEMO_USERS[role];
    const finalUser: User = {
      ...baseUser,
      ...customUser,
      role
    };
    setCurrentUser(finalUser);
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentView('dashboard');
  };

  const switchRole = (newRole: UserRole) => {
    const baseUser = DEMO_USERS[newRole];
    let customUser = { ...baseUser };
    if (newRole === 'student') {
      try {
        const savedAvatar = localStorage.getItem('campus_portal_custom_avatar');
        if (savedAvatar) customUser.avatarUrl = savedAvatar;
        const savedName = localStorage.getItem('campus_portal_custom_name');
        if (savedName) customUser.name = savedName;
        const savedInst = localStorage.getItem('campus_portal_custom_institute');
        if (savedInst) customUser.institute = savedInst;
        const savedUniv = localStorage.getItem('campus_portal_custom_university');
        if (savedUniv) customUser.university = savedUniv;
      } catch {}
    }
    setCurrentUser(customUser);
    setCurrentView('dashboard');
  };

  const updateUserProfile = (updates: Partial<User>) => {
    setCurrentUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
        if (updates.name) localStorage.setItem('campus_portal_custom_name', updates.name);
        if (updates.institute) localStorage.setItem('campus_portal_custom_institute', updates.institute);
        if (updates.university) localStorage.setItem('campus_portal_custom_university', updates.university);
        if (updates.department) localStorage.setItem('campus_portal_custom_dept', updates.department);
        if (updates.phone) localStorage.setItem('campus_portal_custom_phone', updates.phone);
        if (updates.hostelBlock) localStorage.setItem('campus_portal_custom_hostel', updates.hostelBlock);
        if (updates.roomNo) localStorage.setItem('campus_portal_custom_room', updates.roomNo);
        if (updates.designation) localStorage.setItem('campus_portal_custom_desig', updates.designation);
        if (updates.avatarUrl) localStorage.setItem('campus_portal_custom_avatar', updates.avatarUrl);
      } catch {}
      return updated;
    });
  };

  // Ticket handlers
  const addTicket = (ticketData: Omit<GrievanceTicket, 'id' | 'createdAt' | 'updates'>) => {
    const newTicket: GrievanceTicket = {
      ...ticketData,
      id: `TICK-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      updates: [
        {
          id: `u-${Date.now()}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          author: 'System',
          role: 'system',
          message: 'Ticket successfully submitted. Queued for department review.'
        }
      ]
    };
    setTickets(prev => [newTicket, ...prev]);
  };

  const updateTicketStatus = (id: string, status: TicketStatus, note?: string) => {
    setTickets(prev => prev.map(t => {
      if (t.id !== id) return t;
      const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
      const newUpdates = [...t.updates];
      if (note) {
        newUpdates.push({
          id: `u-${Date.now()}`,
          timestamp: now,
          author: currentUser?.name || 'Administrator',
          role: currentUser?.role || 'admin',
          message: note
        });
      } else {
        newUpdates.push({
          id: `u-${Date.now()}`,
          timestamp: now,
          author: currentUser?.name || 'Administrator',
          role: currentUser?.role || 'admin',
          message: `Status updated to "${status}".`
        });
      }

      return {
        ...t,
        status,
        resolvedAt: status === 'Resolved' ? now : t.resolvedAt,
        updates: newUpdates
      };
    }));
  };

  const assignTicket = (id: string, technicianName: string) => {
    setTickets(prev => prev.map(t => {
      if (t.id !== id) return t;
      const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
      return {
        ...t,
        assignedTo: technicianName,
        status: t.status === 'Pending' ? 'In Progress' : t.status,
        updates: [
          ...t.updates,
          {
            id: `u-${Date.now()}`,
            timestamp: now,
            author: currentUser?.name || 'Administrator',
            role: 'admin',
            message: `Work order dispatched to: ${technicianName}`
          }
        ]
      };
    }));
  };

  // Outpass handlers
  const requestOutpass = (data: Omit<OutpassRequest, 'id' | 'appliedAt' | 'status'>) => {
    const newOutpass: OutpassRequest = {
      ...data,
      id: `OUT-${Math.floor(1000 + Math.random() * 9000)}`,
      appliedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Pending'
    };
    setOutpasses(prev => [newOutpass, ...prev]);
  };

  const reviewOutpass = (id: string, status: OutpassStatus, approverName: string) => {
    setOutpasses(prev => prev.map(o => {
      if (o.id !== id) return o;
      const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
      return {
        ...o,
        status,
        approvedBy: approverName,
        reviewedAt: now,
        qrToken: status === 'Approved' ? `${o.id}-VERIFIED-PASS` : undefined
      };
    }));
  };

  // Facility handlers
  const bookFacility = (data: Omit<FacilityBooking, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: FacilityBooking = {
      ...data,
      id: `BK-${Math.floor(500 + Math.random() * 500)}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      // Auto-confirm if admin, else pending
      status: currentUser?.role === 'admin' ? 'Confirmed' : 'Pending'
    };
    setFacilities(prev => [newBooking, ...prev]);
  };

  const reviewBooking = (id: string, status: 'Confirmed' | 'Rejected', notes?: string) => {
    setFacilities(prev => prev.map(f => {
      if (f.id !== id) return f;
      return {
        ...f,
        status,
        notes: notes || f.notes
      };
    }));
  };

  const completeFacilitySession = (bookingId: string) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    setFacilities(prev => prev.map(f => {
      if (f.id !== bookingId) return f;
      return {
        ...f,
        isCompleted: true,
        sessionEndedAt: now
      };
    }));
  };

  const submitFacilityFeedback = (
    bookingId: string, 
    feedbackData: {
      rating: number;
      cleanlinessRating?: number;
      equipmentRating?: number;
      comment: string;
      aspects?: string[];
    }
  ) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    setFacilities(prev => prev.map(f => {
      if (f.id !== bookingId) return f;
      const fullFeedback: FacilityFeedback = {
        id: `fb-${Date.now()}`,
        facilityName: f.facilityName,
        rating: feedbackData.rating,
        cleanlinessRating: feedbackData.cleanlinessRating ?? feedbackData.rating,
        equipmentRating: feedbackData.equipmentRating ?? feedbackData.rating,
        comment: feedbackData.comment,
        aspects: feedbackData.aspects || [],
        submittedAt: now,
        studentName: currentUser?.name || f.requesterName,
        studentId: currentUser?.studentId || f.bookedBy
      };
      return {
        ...f,
        isCompleted: true,
        sessionEndedAt: f.sessionEndedAt || now,
        feedback: fullFeedback
      };
    }));
  };

  // Announcement handlers
  const addAnnouncement = (data: Omit<Announcement, 'id' | 'date'>) => {
    const newAnn: Announcement = {
      ...data,
      id: `ANN-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements(prev => [newAnn, ...prev]);
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  // Certificate handlers (Digital Services)
  const requestCertificate = (certData: Omit<DigitalCertificateRequest, 'id' | 'appliedAt' | 'status' | 'verificationToken'>) => {
    const certId = `CERT-${Math.floor(9100 + Math.random() * 900)}`;
    const newCert: DigitalCertificateRequest = {
      ...certData,
      id: certId,
      appliedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: currentUser?.role === 'admin' ? 'Approved' : 'Pending',
      verificationToken: `UNISPHERE-VERIFY-${certData.certificateType.replace(/\s+/g, '-').toUpperCase()}-${certId}`,
      approvedBy: currentUser?.role === 'admin' ? 'Dean of Academic Affairs' : undefined,
      approvedAt: currentUser?.role === 'admin' ? new Date().toISOString().replace('T', ' ').substring(0, 16) : undefined,
      issuedDocumentTitle: `${certData.certificateType} (Official Digital Seal)`
    };
    setCertificates(prev => {
      const updated = [newCert, ...prev];
      try {
        localStorage.setItem('campus_portal_certificates', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const reviewCertificate = (id: string, status: 'Approved' | 'Rejected', approverName: string, reason?: string) => {
    setCertificates(prev => {
      const updated = prev.map(c => {
        if (c.id !== id) return c;
        return {
          ...c,
          status,
          approvedBy: status === 'Approved' ? approverName : undefined,
          approvedAt: status === 'Approved' ? new Date().toISOString().replace('T', ' ').substring(0, 16) : undefined,
          rejectionReason: status === 'Rejected' ? reason : undefined,
          issuedDocumentTitle: status === 'Approved' ? `${c.certificateType} (Verified Digital Issue)` : undefined
        };
      });
      try {
        localStorage.setItem('campus_portal_certificates', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Assignment handlers (Student Support)
  const submitAssignment = (assignmentId: string, attachmentName?: string) => {
    setAssignments(prev => {
      const updated = prev.map(a => {
        if (a.id !== assignmentId) return a;
        return {
          ...a,
          status: 'Submitted' as const,
          submittedDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
          attachmentName: attachmentName || `${currentUser?.name?.replace(/\s+/g, '_') || 'Student'}_${a.courseCode}_Submission.pdf`
        };
      });
      try {
        localStorage.setItem('campus_portal_assignments', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Library reservation toggle (Campus Facilities)
  const toggleBookReservation = (bookId: string) => {
    setLibraryBooks(prev => prev.map(book => {
      if (book.id !== bookId) return book;
      const isReserved = !book.isReserved;
      return {
        ...book,
        isReserved,
        availableCopies: isReserved ? Math.max(0, book.availableCopies - 1) : book.availableCopies + 1
      };
    }));
  };

  // Event registration toggle (Campus Facilities)
  const toggleEventRegistration = (eventId: string) => {
    setCampusEvents(prev => prev.map(event => {
      if (event.id !== eventId) return event;
      const isRegistered = !event.isRegistered;
      return {
        ...event,
        isRegistered,
        registeredCount: isRegistered ? event.registeredCount + 1 : Math.max(0, event.registeredCount - 1)
      };
    }));
  };

  const resetAllData = () => {
    setTickets(INITIAL_TICKETS);
    setOutpasses(INITIAL_OUTPASSES);
    setFacilities(INITIAL_FACILITIES);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setCertificates(INITIAL_CERTIFICATES);
    setAssignments(INITIAL_ASSIGNMENTS);
    setLibraryBooks(LIBRARY_BOOKS);
    setCampusEvents(CAMPUS_EVENTS);
    try {
      localStorage.removeItem(STORAGE_KEYS.TICKETS);
      localStorage.removeItem(STORAGE_KEYS.OUTPASSES);
      localStorage.removeItem(STORAGE_KEYS.FACILITIES);
      localStorage.removeItem(STORAGE_KEYS.ANNOUNCEMENTS);
      localStorage.removeItem('campus_portal_certificates');
      localStorage.removeItem('campus_portal_assignments');
    } catch {
      // ignore
    }
  };

  return (
    <CampusContext.Provider
      value={{
        currentUser,
        role: currentUser?.role || null,
        tickets,
        outpasses,
        facilities,
        announcements,
        certificates,
        assignments,
        attendance,
        libraryBooks,
        campusEvents,
        currentView,
        setCurrentView,
        criteriaModalOpen,
        setCriteriaModalOpen,
        selectedCriteriaTab,
        openCriteriaWithTab,
        chatbotOpen,
        setChatbotOpen,
        language,
        setLanguage,
        t,
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
        campusAccent,
        setCampusAccent,
        login,
        logout,
        switchRole,
        updateUserProfile,
        addTicket,
        updateTicketStatus,
        assignTicket,
        requestOutpass,
        reviewOutpass,
        bookFacility,
        reviewBooking,
        completeFacilitySession,
        submitFacilityFeedback,
        addAnnouncement,
        deleteAnnouncement,
        requestCertificate,
        reviewCertificate,
        submitAssignment,
        toggleBookReservation,
        toggleEventRegistration,
        resetAllData
      }}
    >
      {children}
    </CampusContext.Provider>
  );

};

export const useCampus = () => {
  const context = useContext(CampusContext);
  if (!context) {
    throw new Error('useCampus must be used within a CampusProvider');
  }
  return context;
};
