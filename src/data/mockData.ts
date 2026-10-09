import { 
  User, 
  GrievanceTicket, 
  OutpassRequest, 
  FacilityBooking, 
  Announcement, 
  TimetableSlot, 
  MessMenuDay,
  AttendanceCourse,
  StudentAssignment,
  DigitalCertificateRequest,
  LibraryBook,
  LibrarySeatStatus,
  CampusEvent,
  ManagedStudent
} from '../types';

export const DEMO_USERS: Record<string, User> = {
  student: {
    id: 'user_std_101',
    name: 'Biplab Das',
    email: 'biplab.das@campus.edu',
    role: 'student',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    department: 'Computer Science & Engineering (B.Tech)',
    institute: 'Odisha University of Technology and Research (OUTR / Formerly CET Bhubaneswar)',
    university: 'Biju Patnaik University of Technology (BPUT Rourkela)',
    studentId: '2023CS1082',
    hostelBlock: 'Kharavela Bhawan - Block B (ଖାରବେଳ ହଷ୍ଟେଲ)',
    roomNo: 'B-314',
    year: '3rd Year (Semester 5)',
    phone: '+91 98612 34567'
  },
  admin: {
    id: 'user_adm_001',
    name: 'Dr. Sarah Jenkins',
    email: 'dean.jenkins@campus.edu',
    role: 'admin',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    department: 'Dean of Student Affairs (Odisha Campus)',
    institute: 'Odisha University of Technology and Research (OUTR Bhubaneswar)',
    university: 'Biju Patnaik University of Technology (BPUT Rourkela)',
    designation: 'Chief Campus Administrator & Warden In-Charge',
    phone: '+91 674 230 1122'
  }
};

export const INITIAL_TICKETS: GrievanceTicket[] = [
  {
    id: 'TICK-4029',
    title: 'Central Library 3rd Floor Wi-Fi Access Point Dropping Packets',
    category: 'IT & Wi-Fi',
    priority: 'High',
    status: 'In Progress',
    description: 'During peak study hours (2 PM - 7 PM), the access point AP-LIB-302 constantly disconnects students during research submissions.',
    location: 'Central Library, Reading Wing C',
    submittedBy: 'user_std_101',
    studentName: 'Aarav Sharma',
    studentId: '2023CS1082',
    createdAt: '2026-09-18 14:30',
    assignedTo: 'Network Operations Team (Mr. Rakesh Gupta)',
    updates: [
      {
        id: 'u-1',
        timestamp: '2026-09-18 15:10',
        author: 'Campus IT Helpdesk',
        role: 'admin',
        message: 'Ticket acknowledged. Assigned to network technician for channel interference check.'
      },
      {
        id: 'u-2',
        timestamp: '2026-09-19 11:00',
        author: 'Mr. Rakesh Gupta',
        role: 'admin',
        message: 'Firmware update scheduled for router node. Replacement AP kept on standby.'
      }
    ]
  },
  {
    id: 'TICK-4025',
    title: 'Block B 3rd Floor Water Purifier Dispenser Leak',
    category: 'Hostel & Housing',
    priority: 'Medium',
    status: 'Pending',
    description: 'The cold water tap on water cooler unit #2 is continuously dripping, causing water puddles near staircase.',
    location: 'Aryabhata Hall, Block B, 3rd Floor Corridor',
    submittedBy: 'user_std_101',
    studentName: 'Aarav Sharma',
    studentId: '2023CS1082',
    createdAt: '2026-09-19 09:15',
    updates: [
      {
        id: 'u-3',
        timestamp: '2026-09-19 09:40',
        author: 'Hostel Caretaker',
        role: 'admin',
        message: 'Maintenance team notified. Plumber scheduled for visit at 4 PM.'
      }
    ]
  },
  {
    id: 'TICK-4018',
    title: 'Projector HDMI Audio Output distorted in CS Lab 4',
    category: 'Lab & Equipment',
    priority: 'Low',
    status: 'Resolved',
    description: 'Audio buzzing whenever the ceiling projector is hooked via HDMI converter during evening seminar presentations.',
    location: 'Academic Complex Block 2, Lab 404',
    submittedBy: 'user_std_205',
    studentName: 'Priya Sundaram',
    studentId: '2023CS1044',
    createdAt: '2026-09-16 10:20',
    resolvedAt: '2026-09-17 16:45',
    assignedTo: 'AV Engineering Support',
    updates: [
      {
        id: 'u-4',
        timestamp: '2026-09-17 16:45',
        author: 'AV Team',
        role: 'admin',
        message: 'Ground loop isolator installed on the sound amplifier. Sound is now crystal clear.'
      }
    ]
  },
  {
    id: 'TICK-4012',
    title: 'Corridor emergency lighting not activating on power cut',
    category: 'Classroom & Electricity',
    priority: 'Emergency',
    status: 'Resolved',
    description: 'Battery backup failure in North Wing Corridor 1st floor during yesterday power transition.',
    location: 'North Academic Wing, Floor 1',
    submittedBy: 'user_std_118',
    studentName: 'Rohan Mehra',
    studentId: '2023EC1099',
    createdAt: '2026-09-15 19:30',
    resolvedAt: '2026-09-16 08:30',
    assignedTo: 'Electrical Maintenance Head',
    updates: [
      {
        id: 'u-5',
        timestamp: '2026-09-16 08:30',
        author: 'Chief Electrician',
        role: 'admin',
        message: 'Inverter relay replaced and battery cells fully reconditioned.'
      }
    ]
  }
];

export const INITIAL_OUTPASSES: OutpassRequest[] = [
  {
    id: 'OUT-8842',
    studentId: '2023CS1082',
    studentName: 'Aarav Mohapatra',
    roomNo: 'B-314',
    hostelBlock: 'Kharavela Bhawan - Block B (ଖାରବେଳ ହଷ୍ଟେଲ)',
    outpassType: 'Weekend Home Pass',
    reason: 'Family visit to Cuttack and attending wedding celebration.',
    destination: 'Cuttack Netaji Bus Terminal (CNBT) & CDA Sector 9',
    departureDate: '2026-09-25',
    departureTime: '17:30',
    returnDate: '2026-09-27',
    returnTime: '21:00',
    status: 'Approved',
    appliedAt: '2026-09-19 18:00',
    approvedBy: 'Prof. Rajesh Varma (Chief Warden)',
    reviewedAt: '2026-09-20 08:30',
    qrToken: 'OUT-8842-TOKEN-SEC-VERIFIED'
  },
  {
    id: 'OUT-8851',
    studentId: '2023CS1082',
    studentName: 'Aarav Mohapatra',
    roomNo: 'B-314',
    hostelBlock: 'Kharavela Bhawan - Block B (ଖାରବେଳ ହଷ୍ଟେଲ)',
    outpassType: 'Day Outpass',
    reason: 'Purchase electronic sensors and prototyping hardware from Tech Market for Capstone Project.',
    destination: 'Bhubaneswar Master Canteen & Bapuji Nagar Electronics Market',
    departureDate: '2026-09-21',
    departureTime: '14:00',
    returnDate: '2026-09-21',
    returnTime: '19:30',
    status: 'Pending',
    appliedAt: '2026-09-20 04:30'
  },
  {
    id: 'OUT-8849',
    studentId: '2023ME1012',
    studentName: 'Sneha Patel',
    roomNo: 'G-102',
    hostelBlock: 'Sarala Devi Residence Hall (ସାରଳା ଦେବୀ ହଷ୍ଟେଲ)',
    outpassType: 'Official Event',
    reason: 'Representing university team at State Inter-College Robotics Challenge in Infocity.',
    destination: 'Infocity DLF Cybercity, Chandrasekharpur, Bhubaneswar',
    departureDate: '2026-09-22',
    departureTime: '06:00',
    returnDate: '2026-09-23',
    returnTime: '22:00',
    status: 'Approved',
    appliedAt: '2026-09-18 11:20',
    approvedBy: 'Dr. Sarah Jenkins',
    reviewedAt: '2026-09-19 09:00',
    qrToken: 'OUT-8849-TOKEN-SEC-VERIFIED'
  }
];

export const INITIAL_FACILITIES: FacilityBooking[] = [
  {
    id: 'BK-500',
    facilityName: 'Aryabhata Seminar Hall B',
    facilityType: 'Seminar Hall',
    location: 'Academic Block A, 3rd Floor',
    capacity: 120,
    bookedBy: 'user_std_101',
    requesterName: 'Aarav Mohapatra',
    requesterRole: 'student',
    date: '2026-09-19',
    timeSlot: '14:00 - 16:30',
    purpose: 'ACM Student Chapter Open Source Orientation & Code Sprint',
    status: 'Confirmed',
    createdAt: '2026-09-15 11:30',
    isCompleted: true,
    sessionEndedAt: '2026-09-19 16:30',
    notes: 'Projector, podium mic, and LAN switch unlocked.'
    // Note: No feedback submitted yet - demonstrates rating prompt!
  },
  {
    id: 'BK-498',
    facilityName: 'Advanced Robotics & IoT Sandbox',
    facilityType: 'Robotics Lab',
    location: 'Innovation Center, Ground Floor',
    capacity: 25,
    bookedBy: 'user_std_101',
    requesterName: 'Aarav Mohapatra',
    requesterRole: 'student',
    date: '2026-09-16',
    timeSlot: '16:00 - 18:00',
    purpose: 'Hands-on ROS2 Autonomous Drone Calibration Workshop',
    status: 'Confirmed',
    createdAt: '2026-09-14 10:00',
    isCompleted: true,
    sessionEndedAt: '2026-09-16 18:00',
    notes: 'Safety goggles and 3D printing equipment unlocked.',
    feedback: {
      rating: 5,
      cleanlinessRating: 5,
      equipmentRating: 4,
      comment: 'Excellent facility experience! Robotic arm calibration kits were organized on desk stations and the air conditioning was steady throughout our 2-hour session.',
      aspects: ['Air Conditioning', 'Clean Desks', 'Fast Wi-Fi', 'Audio/Visual Setup'],
      submittedAt: '2026-09-16 18:25',
      studentName: 'Aarav Mohapatra',
      studentId: '2023CS1082'
    }
  },
  {
    id: 'BK-501',
    facilityName: 'High Performance Computing Cluster (Lab 3)',
    facilityType: 'Computer Lab',
    location: 'Computer Center, 2nd Floor',
    capacity: 60,
    bookedBy: 'user_std_101',
    requesterName: 'Aarav Mohapatra',
    requesterRole: 'student',
    date: '2026-09-20',
    timeSlot: '10:00 - 12:30',
    purpose: 'Distributed Deep Learning model training for Capstone team',
    status: 'Confirmed',
    createdAt: '2026-09-18 10:00',
    isCompleted: false,
    notes: 'CUDA drivers updated on nodes 1-20.'
  },
  {
    id: 'BK-502',
    facilityName: 'Tagore Memorial Auditorium',
    facilityType: 'Auditorium',
    location: 'Central Campus Plaza',
    capacity: 450,
    bookedBy: 'user_adm_001',
    requesterName: 'Dr. Sarah Jenkins',
    requesterRole: 'admin',
    date: '2026-09-26',
    timeSlot: '09:00 - 13:00',
    purpose: 'University Annual Tech Fest Inauguration & Keynote',
    status: 'Confirmed',
    createdAt: '2026-09-15 14:00'
  },
  {
    id: 'BK-503',
    facilityName: 'Quiet Collaboration Study Pod #4',
    facilityType: 'Study Pod',
    location: 'Central Library, 2nd Floor',
    capacity: 8,
    bookedBy: 'user_std_101',
    requesterName: 'Aarav Mohapatra',
    requesterRole: 'student',
    date: '2026-09-23',
    timeSlot: '14:00 - 16:00',
    purpose: 'Peer group sprint on Distributed Systems assignment',
    status: 'Pending',
    createdAt: '2026-09-20 03:00'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ANN-101',
    title: 'Mid-Semester Examinations Schedule & Seating Allotment Released',
    content: 'The finalized timetable and hall allocations for Fall 2026 mid-term examinations are now published on the academic portal. Strict adherence to digital ID cards at the exam hall entrance is mandatory.',
    priority: 'Urgent',
    targetAudience: 'Students Only',
    author: 'Office of Controller of Examinations',
    date: '2026-09-20',
    category: 'Academics'
  },
  {
    id: 'ANN-102',
    title: 'Utkala Dibasa (ଓଡ଼ିଶା ଦିବସ) State Conclave & Tech Exhibition',
    content: 'Annual Odisha State Tech Fest and cultural exhibitions will be hosted at the Main Tagore Auditorium. Registration for innovation project demos and robotic sandboxes is now open.',
    priority: 'Information',
    targetAudience: 'All Campus',
    author: 'Dean of Student Affairs (Odisha Campus)',
    date: '2026-09-19',
    category: 'Facilities'
  },
  {
    id: 'ANN-103',
    title: 'Odisha Coastal Weather Advisory & 24/7 Helpline',
    content: 'Monsoon weather advisory active for coastal belt. 24/7 Campus Emergency Medical Unit is linked with AIIMS Bhubaneswar and Capital Hospital: Call Helpline +91 674-2970108 or State Emergency 112.',
    priority: 'Normal',
    targetAudience: 'All Campus',
    author: 'Campus Health & Safety Office',
    date: '2026-09-17',
    category: 'Health & Wellness'
  }
];

export interface TimetableMetadata {
  institution: string;
  portalUrl: string;
  course: string;
  branch: string;
  semester: string;
  section: string;
  effectiveFrom: string;
  totalPeriods: number;
  coreLectureHall: string;
}

export const TIMETABLE_METADATA: TimetableMetadata = {
  institution: 'Rajdhani Engineering College (REC Bhubaneswar) / Roland Institute',
  portalUrl: 'ims.rec.ac.in/timetable/tt.php?c=1&b=101&sem=3&st=S&s=136',
  course: 'B.Tech (Degree Engineering)',
  branch: 'Computer Science & Engineering / Artificial Intelligence (Code 101)',
  semester: 'Semester 3 (Autumn 2026)',
  section: 'Section S',
  effectiveFrom: '07-09-2026',
  totalPeriods: 10,
  coreLectureHall: 'Room No.-A304'
};

export interface SubjectDirectoryItem {
  code: string;
  shortName: string;
  fullName: string;
  instructor: string;
  room: string;
  type: 'Theory' | 'Lab' | 'Training';
  colorTag: string;
}

export const TIMETABLE_SUBJECTS_DIRECTORY: SubjectDirectoryItem[] = [
  {
    code: 'CS301',
    shortName: 'DS&AF AI',
    fullName: 'Data Structures & Applied Foundations of Artificial Intelligence',
    instructor: 'Aliva Haiburu',
    room: 'Room No.-A304',
    type: 'Theory',
    colorTag: 'indigo'
  },
  {
    code: 'CS302',
    shortName: 'ORP',
    fullName: 'Object-Oriented Programming (Java/C++)',
    instructor: 'FREDRIC EDISON EKKA',
    room: 'Room No.-A304',
    type: 'Theory',
    colorTag: 'blue'
  },
  {
    code: 'CS303',
    shortName: 'WAD',
    fullName: 'Web Application Development',
    instructor: 'Devikrishna Das, TULASHI SETHI',
    room: 'Room No.-A304',
    type: 'Theory',
    colorTag: 'emerald'
  },
  {
    code: 'CS304-L',
    shortName: 'WAD LAB',
    fullName: 'Web Application Development Laboratory',
    instructor: 'Devikrishna Das, TULASHI SETHI',
    room: 'Room No.-B308-1 (Lab Complex 3rd Floor)',
    type: 'Lab',
    colorTag: 'teal'
  },
  {
    code: 'EC301',
    shortName: 'DE',
    fullName: 'Digital Electronics & Logic Design',
    instructor: 'Ritisnigha Das',
    room: 'Room No.-A304',
    type: 'Theory',
    colorTag: 'violet'
  },
  {
    code: 'EC301-L',
    shortName: 'DE LAB',
    fullName: 'Digital Electronics Laboratory',
    instructor: 'Ritisnigha Das',
    room: 'Room No.-A203 (Electronics Lab Block A)',
    type: 'Lab',
    colorTag: 'purple'
  },
  {
    code: 'EE301',
    shortName: 'EE',
    fullName: 'Electrical Engineering / Environmental Studies',
    instructor: 'Pujalin Rout',
    room: 'Room No.-A304',
    type: 'Theory',
    colorTag: 'amber'
  },
  {
    code: 'MA301',
    shortName: 'Math',
    fullName: 'Engineering Mathematics - III (Transforms & Discrete Math)',
    instructor: 'Barsha Bijayini Muduli',
    room: 'Room No.-A304',
    type: 'Theory',
    colorTag: 'rose'
  },
  {
    code: 'TR301',
    shortName: 'PPT',
    fullName: 'Pre-Placement Training & Aptitude / Soft Skills',
    instructor: 'GF PPT (Corporate Training Team)',
    room: 'Room No.-A304',
    type: 'Training',
    colorTag: 'orange'
  },
  {
    code: 'CS302-L',
    shortName: 'OOP LAB',
    fullName: 'Object-Oriented Programming Laboratory',
    instructor: 'FREDRIC EDISON EKKA',
    room: 'Room No.-A305 (Programming Lab Block A)',
    type: 'Lab',
    colorTag: 'cyan'
  },
  {
    code: 'CS301-L',
    shortName: 'DS LAB',
    fullName: 'Data Structures Laboratory',
    instructor: 'ANKITA JENA',
    room: 'Room No.-A206 / B116',
    type: 'Lab',
    colorTag: 'fuchsia'
  }
];

export const TIMETABLE_TIME_SLOTS = [
  { id: 'p1', period: 'P1', time: '09:15 AM - 09:45 AM', isBreak: false },
  { id: 'p2', period: 'P2', time: '09:45 AM - 10:15 AM', isBreak: false },
  { id: 'p3', period: 'P3', time: '10:15 AM - 10:45 AM', isBreak: false },
  { id: 'p4', period: 'P4', time: '10:45 AM - 11:15 AM', isBreak: false },
  { id: 'tea', period: 'TEA', time: '11:00 AM - 11:15 AM', label: 'Tea Break', isBreak: true },
  { id: 'p5', period: 'P5', time: '11:30 AM - 12:00 PM', isBreak: false },
  { id: 'p6', period: 'P6', time: '12:00 PM - 12:30 PM', isBreak: false },
  { id: 'lunch', period: 'LUNCH', time: '12:30 PM - 01:30 PM', label: 'Lunch Break', isBreak: true },
  { id: 'p7', period: 'P7', time: '01:30 PM - 02:00 PM', isBreak: false },
  { id: 'p8', period: 'P8', time: '02:00 PM - 02:30 PM', isBreak: false },
  { id: 'p9', period: 'P9', time: '02:45 PM - 03:15 PM', isBreak: false },
  { id: 'p10', period: 'P10', time: '03:15 PM - 03:45 PM', isBreak: false }
] as const;

export const STUDENT_TIMETABLE: TimetableSlot[] = [
  // ==================== MONDAY ====================
  {
    id: 'TT-MON-1',
    courseCode: 'CS301',
    courseName: 'DS&AF AI(ALL) - Data Structures & Applied Foundations of AI',
    instructor: 'Aliva Haiburu',
    time: '09:15 AM - 10:15 AM',
    room: 'Room No.-A304',
    day: 'Monday',
    type: 'Lecture',
    batch: 'ALL',
    periodNumber: 'P1 - P2'
  },
  {
    id: 'TT-MON-2',
    courseCode: 'CS302',
    courseName: 'ORP(ALL) - Object Oriented Programming',
    instructor: 'FREDRIC EDISON EKKA',
    time: '10:15 AM - 11:15 AM',
    room: 'Room No.-A304',
    day: 'Monday',
    type: 'Lecture',
    batch: 'ALL',
    periodNumber: 'P3 - P4',
    notes: 'Morning Break at 11:00 AM'
  },
  {
    id: 'TT-MON-3',
    courseCode: 'CS303',
    courseName: 'WAD(ALL) - Web Application Development',
    instructor: 'Devikrishna Das, TULASHI SETHI',
    time: '11:30 AM - 12:30 PM',
    room: 'Room No.-A304',
    day: 'Monday',
    type: 'Lecture',
    batch: 'ALL',
    periodNumber: 'P5 - P6'
  },
  {
    id: 'TT-MON-4',
    courseCode: 'EC301',
    courseName: 'DE(ALL) - Digital Electronics',
    instructor: 'Ritisnigha Das',
    time: '01:30 PM - 02:30 PM',
    room: 'Room No.-A304',
    day: 'Monday',
    type: 'Lecture',
    batch: 'ALL',
    periodNumber: 'P7 - P8'
  },
  {
    id: 'TT-MON-5',
    courseCode: 'CS302',
    courseName: 'ORP(ALL) - Object Oriented Programming',
    instructor: 'FREDRIC EDISON EKKA',
    time: '02:45 PM - 03:45 PM',
    room: 'Room No.-A304',
    day: 'Monday',
    type: 'Lecture',
    batch: 'ALL',
    periodNumber: 'P9 - P10'
  },

  // ==================== TUESDAY ====================
  {
    id: 'TT-TUE-1',
    courseCode: 'CS304-L',
    courseName: 'WAD LAB(ALL) - Web Application Development Lab',
    instructor: 'Devikrishna Das, TULASHI SETHI',
    time: '09:15 AM - 11:15 AM',
    room: 'Room No.-B308-1',
    day: 'Tuesday',
    type: 'Lab',
    batch: 'ALL',
    periodNumber: 'P1 - P4',
    notes: '4-Period Full Practical Coding Session'
  },
  {
    id: 'TT-TUE-2',
    courseCode: 'EE301',
    courseName: 'EE(ALL) - Electrical / Environmental Engineering',
    instructor: 'Pujalin Rout',
    time: '11:30 AM - 12:30 PM',
    room: 'Room No.-A304',
    day: 'Tuesday',
    type: 'Lecture',
    batch: 'ALL',
    periodNumber: 'P5 - P6'
  },
  {
    id: 'TT-TUE-3',
    courseCode: 'CS302',
    courseName: 'ORP(ALL) - Object Oriented Programming',
    instructor: 'FREDRIC EDISON EKKA',
    time: '01:30 PM - 02:30 PM',
    room: 'Room No.-A304',
    day: 'Tuesday',
    type: 'Lecture',
    batch: 'ALL',
    periodNumber: 'P7 - P8'
  },
  {
    id: 'TT-TUE-4',
    courseCode: 'CS301',
    courseName: 'DS&AF AI(ALL) - Data Structures & Applied Foundations of AI',
    instructor: 'Aliva Haiburu',
    time: '02:45 PM - 03:45 PM',
    room: 'Room No.-A304',
    day: 'Tuesday',
    type: 'Lecture',
    batch: 'ALL',
    periodNumber: 'P9 - P10'
  },

  // ==================== WEDNESDAY ====================
  {
    id: 'TT-WED-1',
    courseCode: 'TR301',
    courseName: 'PPT(ALL) - Pre-Placement Training & Soft Skills',
    instructor: 'GF PPT',
    time: '09:15 AM - 11:15 AM',
    room: 'Room No.-A304',
    day: 'Wednesday',
    type: 'Training',
    batch: 'ALL',
    periodNumber: 'P1 - P4',
    notes: 'Campus Recruitment Preparation & Coding Aptitude'
  },
  {
    id: 'TT-WED-2',
    courseCode: 'CS303',
    courseName: 'WAD(ALL) - Web Application Development',
    instructor: 'Devikrishna Das, TULASHI SETHI',
    time: '11:30 AM - 12:30 PM',
    room: 'Room No.-A304',
    day: 'Wednesday',
    type: 'Lecture',
    batch: 'ALL',
    periodNumber: 'P5 - P6'
  },
  {
    id: 'TT-WED-3',
    courseCode: 'EE301',
    courseName: 'EE(ALL) - Electrical / Environmental Engineering',
    instructor: 'Pujalin Rout',
    time: '01:30 PM - 02:30 PM',
    room: 'Room No.-A304',
    day: 'Wednesday',
    type: 'Lecture',
    batch: 'ALL',
    periodNumber: 'P7 - P8'
  },
  {
    id: 'TT-WED-4',
    courseCode: 'MA301',
    courseName: 'Math(ALL) - Engineering Mathematics - III',
    instructor: 'Barsha Bijayini Muduli',
    time: '02:45 PM - 03:45 PM',
    room: 'Room No.-A304',
    day: 'Wednesday',
    type: 'Lecture',
    batch: 'ALL',
    periodNumber: 'P9 - P10'
  },

  // ==================== THURSDAY ====================
  {
    id: 'TT-THU-1',
    courseCode: 'CS302',
    courseName: 'ORP(ALL) - Object Oriented Programming',
    instructor: 'FREDRIC EDISON EKKA',
    time: '09:15 AM - 10:15 AM',
    room: 'Room No.-A304',
    day: 'Thursday',
    type: 'Lecture',
    batch: 'ALL',
    periodNumber: 'P1 - P2'
  },
  {
    id: 'TT-THU-2-GR1',
    courseCode: 'EC301-L',
    courseName: 'DE LAB(GR1) - Digital Electronics Laboratory (Group 1)',
    instructor: 'Ritisnigha Das',
    time: '10:15 AM - 12:30 PM',
    room: 'Room No.-A203',
    day: 'Thursday',
    type: 'Lab',
    batch: 'GR1',
    periodNumber: 'P3 - P6',
    notes: 'Group 1 Batch (Tea Break 11:00 AM - 11:15 AM)'
  },
  {
    id: 'TT-THU-2-GR2',
    courseCode: 'CS302-L',
    courseName: 'OOP LAB(GR2) - Object-Oriented Programming Lab (Group 2)',
    instructor: 'FREDRIC EDISON EKKA',
    time: '10:15 AM - 12:30 PM',
    room: 'Room No.-A305',
    day: 'Thursday',
    type: 'Lab',
    batch: 'GR2',
    periodNumber: 'P3 - P6',
    notes: 'Group 2 Batch (Tea Break 11:00 AM - 11:15 AM)'
  },
  {
    id: 'TT-THU-3',
    courseCode: 'EC301',
    courseName: 'DE(ALL) - Digital Electronics',
    instructor: 'Ritisnigha Das',
    time: '01:30 PM - 02:30 PM',
    room: 'Room No.-A304',
    day: 'Thursday',
    type: 'Lecture',
    batch: 'ALL',
    periodNumber: 'P7 - P8'
  },
  {
    id: 'TT-THU-4',
    courseCode: 'MA301',
    courseName: 'Math(ALL) - Engineering Mathematics - III',
    instructor: 'Barsha Bijayini Muduli',
    time: '02:45 PM - 03:45 PM',
    room: 'Room No.-A304',
    day: 'Thursday',
    type: 'Lecture',
    batch: 'ALL',
    periodNumber: 'P9 - P10'
  },

  // ==================== FRIDAY ====================
  {
    id: 'TT-FRI-1',
    courseCode: 'MA301',
    courseName: 'Math(ALL) - Engineering Mathematics - III',
    instructor: 'Barsha Bijayini Muduli',
    time: '09:15 AM - 10:15 AM',
    room: 'Room No.-A304',
    day: 'Friday',
    type: 'Lecture',
    batch: 'ALL',
    periodNumber: 'P1 - P2'
  },
  {
    id: 'TT-FRI-2',
    courseCode: 'EC301',
    courseName: 'DE(ALL) - Digital Electronics',
    instructor: 'Ritisnigha Das',
    time: '10:15 AM - 11:15 AM',
    room: 'Room No.-A304',
    day: 'Friday',
    type: 'Lecture',
    batch: 'ALL',
    periodNumber: 'P3 - P4'
  },
  {
    id: 'TT-FRI-3',
    courseCode: 'CS301',
    courseName: 'DS&AF AI(ALL) - Data Structures & Applied Foundations of AI',
    instructor: 'Aliva Haiburu',
    time: '11:30 AM - 12:30 PM',
    room: 'Room No.-A304',
    day: 'Friday',
    type: 'Lecture',
    batch: 'ALL',
    periodNumber: 'P5 - P6'
  },
  {
    id: 'TT-FRI-4-GR2',
    courseCode: 'EC301-L',
    courseName: 'DE LAB(GR2) - Digital Electronics Laboratory (Group 2)',
    instructor: 'Ritisnigha Das',
    time: '01:30 PM - 03:45 PM',
    room: 'Room No.-A203',
    day: 'Friday',
    type: 'Lab',
    batch: 'GR2',
    periodNumber: 'P7 - P10',
    notes: 'Group 2 Batch Hardware Lab'
  },
  {
    id: 'TT-FRI-4-GR1',
    courseCode: 'CS301-L',
    courseName: 'DS LAB(GR1) - Data Structures Laboratory (Group 1)',
    instructor: 'ANKITA JENA',
    time: '01:30 PM - 03:45 PM',
    room: 'Room No.-A206',
    day: 'Friday',
    type: 'Lab',
    batch: 'GR1',
    periodNumber: 'P7 - P10',
    notes: 'Group 1 Batch Algorithms Practice'
  },

  // ==================== SATURDAY ====================
  {
    id: 'TT-SAT-1',
    courseCode: 'TR301',
    courseName: 'PPT(ALL) - Pre-Placement Training & Soft Skills',
    instructor: 'GF PPT',
    time: '09:15 AM - 11:15 AM',
    room: 'Room No.-A304',
    day: 'Saturday',
    type: 'Training',
    batch: 'ALL',
    periodNumber: 'P1 - P4'
  },
  {
    id: 'TT-SAT-2',
    courseCode: 'EC301',
    courseName: 'DE(ALL) - Digital Electronics',
    instructor: 'Ritisnigha Das',
    time: '11:30 AM - 12:30 PM',
    room: 'Room No.-A304',
    day: 'Saturday',
    type: 'Lecture',
    batch: 'ALL',
    periodNumber: 'P5 - P6'
  },
  {
    id: 'TT-SAT-3',
    courseCode: 'CS303',
    courseName: 'WAD(ALL) - Web Application Development',
    instructor: 'TULASHI SETHI',
    time: '01:30 PM - 02:30 PM',
    room: 'Room No.-A304',
    day: 'Saturday',
    type: 'Lecture',
    batch: 'ALL',
    periodNumber: 'P7 - P8'
  },
  {
    id: 'TT-SAT-4',
    courseCode: 'CS301-L',
    courseName: 'DS LAB(GR2) - Data Structures Laboratory (Group 2)',
    instructor: 'ANKITA JENA',
    time: '02:45 PM - 03:45 PM',
    room: 'Room No.-B116',
    day: 'Saturday',
    type: 'Lab',
    batch: 'GR2',
    periodNumber: 'P9 - P10'
  }
];

export const MESS_MENU: MessMenuDay[] = [
  {
    day: 'Monday',
    breakfast: 'Steamed Idlis, Medu Vada, Coconut Chutney, Sambhar, Fresh Papaya, Tea/Coffee',
    lunch: 'Odisha Traditional Dalma (ଓଡ଼ିଆ ଡାଲମା), Paneer Butter Masala, Jeera Rice, Phulka Roti, Salad, Sweet Curd',
    snacks: 'Vegetable Samosa with Mint Chutney, Masala Chai',
    dinner: 'Kadhai Veg, Rajma Masala, Steamed Basmati Rice, Chapati, Authentic Pahala Rasagola (ରସଗୋଲା)',
    crowdLevel: 'Moderate'
  },
  {
    day: 'Tuesday',
    breakfast: 'Aloo Paratha with White Butter, Curd, Pickle, Boiled Eggs / Banana, Tea/Coffee',
    lunch: 'Chole Masala, Amritsari Kulcha / Rice, Mixed Sprouts Salad, Boondi Raita',
    snacks: 'Crispy Veg Cutlet with Tomato Sauce, Green Tea',
    dinner: 'Egg Curry / Malai Kofta, Dal Makhani, Pulao, Tandoori Roti, Odisha Chenna Poda (ଛେନାପୋଡ଼ - Special Dessert)',
    crowdLevel: 'High'
  },
  {
    day: 'Wednesday',
    breakfast: 'Poha with Sev, Sprouts, Upma with Chutney, Orange juice, Tea/Coffee',
    lunch: 'Santula (ଓଡ଼ିଆ ପରିବା ସନ୍ତୁଳା), Rice, Yellow Moong Dal, Beguni Bhaja, Appalam, Buttermilk',
    snacks: 'Cuttack Style Dahibara Aloodum (ଦହିବରା ଆଳୁଦମ୍), Lemon Tea',
    dinner: 'Chicken Dum Biryani / Veg Hyderabadi Biryani, Mirchi Ka Salan, Raita, Chhena Gaja (ଛେନା ଗଜା)',
    specialNotice: 'Special Biryani & Odisha Sweets Night',
    crowdLevel: 'High'
  },
  {
    day: 'Thursday',
    breakfast: 'Masala Dosa, Tomato Chutney, Sambar, Boiled Sweet Corn, Tea/Coffee',
    lunch: 'Pakhala Bhata Platter (ପଖାଳ ଭାତ), Badi Chura (ବଡ଼ି ଚୁରା), Saga Bhaja (ଶାଗ ଭଜା), Alu Chakata, Papad, Mint Curd',
    snacks: 'Paneer Pakora, Masala Filter Coffee',
    dinner: 'Dum Aloo Kashmiri, Moong Dal Fry, Jeera Rice, Tawa Roti, Moong Dal Halwa',
    crowdLevel: 'Low'
  },
  {
    day: 'Friday',
    breakfast: 'Puri Bhaji with Chana Dal, Sprouted Moong, Fresh Fruit Bowl, Tea/Coffee',
    lunch: 'Veg Jalfrezi, Odisha Chana Dal Tadka, Steamed Rice, Butter Roti, Papad, Curd',
    snacks: 'Vada Pav with Fried Green Chilies, Ginger Chai',
    dinner: 'Paneer Tikka Masala, Dalma Tadka, Kanika Pulao (କାନିକା ମିଠା ପଲାଉ), Paratha, Ice Cream Cup',
    crowdLevel: 'Moderate'
  }
];

export const PS07_PILLARS = [
  {
    id: 'pillar-1',
    title: 'Grievance & Campus Infrastructure',
    traditional: 'Students queue up at physical wardens or write in unread registers. Repairs take weeks with zero status visibility.',
    solution: 'Digital ticketing with photo evidence, automatic department routing (Electrical, Plumbing, IT), real-time status updates, and SLA accountability.',
    studentImpact: 'Report an issue in 30 seconds; track progress in real time without chasing staff.',
    adminImpact: 'Consolidated queue, prioritized work orders, technician dispatch tracking, and mean-time-to-resolution metrics.'
  },
  {
    id: 'pillar-2',
    title: 'Hostel Leave & Outpass Logistics',
    traditional: 'Paper leave slips signed by 3 officials (warden, advisor, security). Security gates hold handwritten registers prone to forgery.',
    solution: 'Instant paperless outpass request with geo-timestamps, automated parental/warden notification, and secure QR scan at campus gates.',
    studentImpact: 'No more physical signature chases before trips; instant pass verification on phone.',
    adminImpact: 'Complete real-time headcount of resident students on/off campus; zero gate bottlenecks.'
  },
  {
    id: 'pillar-3',
    title: 'Resource & Facility Allocation',
    traditional: 'Double-booked seminar halls, locked labs, dispute over equipment usage, and wasted room capacity.',
    solution: 'Smart self-service campus reservation system with live availability calendars, equipment checklists, and transparent approval workflows.',
    studentImpact: 'Reserve robotics sandboxes, study pods, and audio-visual halls effortlessly.',
    adminImpact: 'No scheduling conflicts, complete utilization audit logs, and effortless capacity management.'
  },
  {
    id: 'pillar-4',
    title: 'Information Delivery & Emergency Alerts',
    traditional: 'Printed circulars pinned on physical noticeboards that are overlooked or lost in chaotic WhatsApp groups.',
    solution: 'Targeted broadcast channels categorized by urgency (Exam deadlines, emergency weather, health camps) with read receipts.',
    studentImpact: 'Never miss an exam venue change, scholarship deadline, or campus safety advisory.',
    adminImpact: 'Push critical alerts across all student portals with guaranteed delivery within seconds.'
  },
  {
    id: 'pillar-5',
    title: 'Everyday Living: Dining & Academics',
    traditional: 'Long mess lines during peak times, unexpected menu changes, and fragmented paper timetables.',
    solution: 'Live mess crowd density meter, weekly transparent menus with nutritional alerts, and synchronized class schedules.',
    studentImpact: 'Plan dining visits to avoid rushes, check today’s meal options, and access room directions.',
    adminImpact: 'Better mess food waste management based on student feedback and headcount predictions.'
  }
];

// 🎓 Student Support: Attendance Data
export const INITIAL_ATTENDANCE: AttendanceCourse[] = [
  {
    code: 'CS301',
    name: 'Design & Analysis of Algorithms',
    instructor: 'Prof. K. Venkatesh',
    attended: 32,
    totalClasses: 36,
    percentage: 88.9,
    minRequired: 75,
    status: 'Safe',
    safeBunks: 5,
    classesNeededFor75: 0,
    lastUpdated: 'Yesterday, 10:00 AM'
  },
  {
    code: 'CS305',
    name: 'Database Management Systems Lab',
    instructor: 'Dr. Meera Nambiar',
    attended: 17,
    totalClasses: 23,
    percentage: 73.9,
    minRequired: 75,
    status: 'Warning',
    safeBunks: 0,
    classesNeededFor75: 2,
    lastUpdated: 'Sept 18, 12:15 PM'
  },
  {
    code: 'CS309',
    name: 'Computer Networks & Security',
    instructor: 'Prof. Arvind Roy',
    attended: 28,
    totalClasses: 32,
    percentage: 87.5,
    minRequired: 75,
    status: 'Safe',
    safeBunks: 4,
    classesNeededFor75: 0,
    lastUpdated: 'Sept 19, 02:30 PM'
  },
  {
    code: 'CS312',
    name: 'Artificial Intelligence Foundations',
    instructor: 'Dr. Sarah Jenkins',
    attended: 26,
    totalClasses: 28,
    percentage: 92.9,
    minRequired: 75,
    status: 'Safe',
    safeBunks: 6,
    classesNeededFor75: 0,
    lastUpdated: 'Sept 19, 04:00 PM'
  },
  {
    code: 'HS201',
    name: 'Professional Ethics & IP Rights',
    instructor: 'Prof. S. Sengupta',
    attended: 14,
    totalClasses: 18,
    percentage: 77.8,
    minRequired: 75,
    status: 'Safe',
    safeBunks: 1,
    classesNeededFor75: 0,
    lastUpdated: 'Sept 17, 10:00 AM'
  }
];

// 🎓 Student Support: Assignments
export const INITIAL_ASSIGNMENTS: StudentAssignment[] = [
  {
    id: 'ASG-101',
    courseCode: 'CS301',
    courseName: 'Design & Analysis of Algorithms',
    title: 'Dynamic Programming vs Greedy Algorithms: Real-World Routing Analysis',
    dueDate: '2026-09-24 23:59',
    maxMarks: 20,
    status: 'Pending',
    attachmentName: 'Assignment_DP_Greedy_Problem_Set.pdf'
  },
  {
    id: 'ASG-102',
    courseCode: 'CS312',
    courseName: 'Artificial Intelligence Foundations',
    title: 'Heuristic Search A* Algorithm Implementation for Odisha Campus Route Finder',
    dueDate: '2026-09-28 23:59',
    maxMarks: 25,
    status: 'Pending',
    attachmentName: 'A_Star_Lab_Specification_v2.pdf'
  },
  {
    id: 'ASG-103',
    courseCode: 'CS305',
    courseName: 'Database Management Systems Lab',
    title: 'ER Modeling & Relational Schema Normalization (3NF/BCNF)',
    dueDate: '2026-09-17 18:00',
    maxMarks: 15,
    status: 'Graded',
    submittedDate: '2026-09-16 21:40',
    marksAwarded: 14,
    feedback: 'Excellent normalization steps and clear foreign key integrity constraints.',
    attachmentName: 'Aarav_Mohapatra_2023CS1082_DBMS_Lab3.sql'
  },
  {
    id: 'ASG-104',
    courseCode: 'CS309',
    courseName: 'Computer Networks & Security',
    title: 'Wireshark Packet Inspection & TCP Handshake Analysis Report',
    dueDate: '2026-09-21 23:59',
    maxMarks: 20,
    status: 'Submitted',
    submittedDate: '2026-09-19 14:15',
    attachmentName: 'Wireshark_Trace_CS1082.pcapng'
  }
];

// 📝 Digital Services: Certificate Requests
export const INITIAL_CERTIFICATES: DigitalCertificateRequest[] = [
  {
    id: 'CERT-9041',
    studentId: '2023CS1082',
    studentName: 'Aarav Mohapatra',
    department: 'Computer Science & Engineering',
    certificateType: 'Bonafide Certificate',
    purpose: 'Passport Application & State Post-Matric Scholarship Scheme (e-Medhabruti)',
    appliedAt: '2026-09-15 11:30',
    status: 'Approved',
    approvedBy: 'Office of Dean Academic Affairs',
    approvedAt: '2026-09-16 14:00',
    verificationToken: 'UNISPHERE-VERIFY-BONAFIDE-9041-SEC',
    issuedDocumentTitle: 'Institutional Bonafide & Conduct Certificate (Fall 2026)'
  },
  {
    id: 'CERT-9048',
    studentId: '2023CS1082',
    studentName: 'Aarav Mohapatra',
    department: 'Computer Science & Engineering',
    certificateType: 'Hostel Clearance / NOC',
    purpose: 'Semester Inter-University Internship at Odisha Semiconductor Hub, Bhubaneswar',
    appliedAt: '2026-09-19 16:45',
    status: 'Pending',
    verificationToken: 'UNISPHERE-VERIFY-HOSTEL-NOC-9048-PENDING'
  },
  {
    id: 'CERT-9032',
    studentId: '2023CS1082',
    studentName: 'Aarav Mohapatra',
    department: 'Computer Science & Engineering',
    certificateType: 'Grade Transcript',
    purpose: 'Application for Higher Studies & Research Fellowship',
    appliedAt: '2026-09-10 09:20',
    status: 'Approved',
    approvedBy: 'Controller of Examinations',
    approvedAt: '2026-09-12 11:15',
    verificationToken: 'UNISPHERE-VERIFY-TRANSCRIPT-9032-SEC',
    issuedDocumentTitle: 'Official Cumulative Grade Transcript (Semesters 1-4)'
  }
];

// 🏫 Campus Facilities: Library Status & Catalog
export const LIBRARY_SEAT_STATUS: LibrarySeatStatus = {
  totalSeats: 480,
  occupiedSeats: 358,
  quietReadingPodsAvailable: 14,
  groupStudyRoomsFree: 3,
  currentNoiseLevel: 'Silent (32 dB)'
};

export const LIBRARY_BOOKS: LibraryBook[] = [
  {
    id: 'LIB-BK-1',
    title: 'Introduction to Algorithms (CLRS)',
    author: 'Cormen, Leiserson, Rivest, Stein',
    isbn: '978-0262033848',
    category: 'Computer Science',
    availableCopies: 6,
    totalCopies: 15,
    shelfLocation: 'Stack CS-3, 2nd Floor'
  },
  {
    id: 'LIB-BK-2',
    title: 'Artificial Intelligence: A Modern Approach',
    author: 'Stuart Russell & Peter Norvig',
    isbn: '978-0134610993',
    category: 'Artificial Intelligence',
    availableCopies: 3,
    totalCopies: 10,
    shelfLocation: 'Stack CS-5, 2nd Floor'
  },
  {
    id: 'LIB-BK-3',
    title: 'Operating System Concepts (Silberschatz)',
    author: 'Abraham Silberschatz, Peter Baer Galvin',
    isbn: '978-1119800361',
    category: 'Computer Science',
    availableCopies: 8,
    totalCopies: 18,
    shelfLocation: 'Stack CS-2, 2nd Floor'
  },
  {
    id: 'LIB-BK-4',
    title: 'Database System Concepts',
    author: 'Korth, Sudarshan, Silberschatz',
    isbn: '978-0078022159',
    category: 'Database Systems',
    availableCopies: 4,
    totalCopies: 12,
    shelfLocation: 'Stack DB-1, 2nd Floor'
  }
];

// 🏫 Campus Facilities: Events & Workshops
export const CAMPUS_EVENTS: CampusEvent[] = [
  {
    id: 'EVT-201',
    title: 'Utkalika State Tech Fest & Robo-Wars 2026',
    category: 'Tech Fest',
    date: '2026-10-08',
    time: '09:00 AM - 07:00 PM',
    location: 'Tagore Memorial Auditorium & Outdoor Arena',
    organizer: 'Robotics & Innovation Society',
    registeredCount: 340,
    capacity: 500,
    isRegistered: true,
    description: 'Annual inter-college technology festival featuring 24-hr Hackathon, Autonomous Drone Racing, and Keynotes from ISRO scientists.',
    bannerGradient: 'from-violet-600 via-indigo-600 to-cyan-500'
  },
  {
    id: 'EVT-202',
    title: 'Hands-on Generative AI & LLM Systems Workshop',
    category: 'Workshop',
    date: '2026-09-24',
    time: '02:00 PM - 05:30 PM',
    location: 'Advanced Computing Center, Lab 3',
    organizer: 'Department of Computer Science',
    registeredCount: 58,
    capacity: 65,
    isRegistered: false,
    description: 'Deep dive into fine-tuning open-weights models and deploying scalable agents with prompt engineering best practices.',
    bannerGradient: 'from-amber-500 via-orange-600 to-rose-600'
  },
  {
    id: 'EVT-203',
    title: 'Odia Sahitya & Modern Culture Conclave',
    category: 'Cultural',
    date: '2026-10-02',
    time: '10:30 AM - 04:00 PM',
    location: 'Open Air Amphitheatre',
    organizer: 'Heritage & Literature Council',
    registeredCount: 215,
    capacity: 400,
    isRegistered: false,
    description: 'Celebration of classical Odia language, poetry symposium, folk dance drama, and traditional regional cuisine stalls.',
    bannerGradient: 'from-emerald-600 via-teal-600 to-sky-600'
  }
];

// 👨💼 Administrator Tools: Student Directory
export const MANAGED_STUDENTS: ManagedStudent[] = [
  {
    id: 'std-1',
    rollNo: '2023CS1082',
    name: 'Aarav Mohapatra',
    branch: 'Computer Science & Engineering',
    year: '3rd Year (Sem 5)',
    hostelBlock: 'Kharavela Bhawan - Block B',
    roomNo: 'B-314',
    cgpa: 8.65,
    attendanceRate: 83.5,
    outpassCount: 5,
    disciplinaryHold: false,
    email: 'aarav.mohapatra@campus.edu',
    phone: '+91 98612 34567'
  },
  {
    id: 'std-2',
    rollNo: '2023CS1044',
    name: 'Priya Sundaram',
    branch: 'Computer Science & Engineering',
    year: '3rd Year (Sem 5)',
    hostelBlock: 'Sarala Devi Residence Hall',
    roomNo: 'A-201',
    cgpa: 9.12,
    attendanceRate: 91.2,
    outpassCount: 3,
    disciplinaryHold: false,
    email: 'priya.sundaram@campus.edu',
    phone: '+91 94371 88231'
  },
  {
    id: 'std-3',
    rollNo: '2023EC1099',
    name: 'Rohan Mehra',
    branch: 'Electronics & Communication',
    year: '3rd Year (Sem 5)',
    hostelBlock: 'Kharavela Bhawan - Block A',
    roomNo: 'A-110',
    cgpa: 7.85,
    attendanceRate: 74.2,
    outpassCount: 8,
    disciplinaryHold: false,
    email: 'rohan.mehra@campus.edu',
    phone: '+91 99370 44512'
  },
  {
    id: 'std-4',
    rollNo: '2023ME1012',
    name: 'Sneha Patel',
    branch: 'Mechanical Engineering',
    year: '3rd Year (Sem 5)',
    hostelBlock: 'Sarala Devi Residence Hall',
    roomNo: 'G-102',
    cgpa: 8.40,
    attendanceRate: 86.8,
    outpassCount: 4,
    disciplinaryHold: false,
    email: 'sneha.patel@campus.edu',
    phone: '+91 98610 99120'
  },
  {
    id: 'std-5',
    rollNo: '2024CS2001',
    name: 'Debashis Panda',
    branch: 'Computer Science & Engineering',
    year: '2nd Year (Sem 3)',
    hostelBlock: 'Kapilendra Dev Bhawan',
    roomNo: 'C-405',
    cgpa: 7.20,
    attendanceRate: 68.5,
    outpassCount: 11,
    disciplinaryHold: true,
    email: 'debashis.panda@campus.edu',
    phone: '+91 97761 22345'
  }
];

// 📋 Evaluation Criteria Master Checklist
export interface CriterionItem {
  id: string;
  icon: string;
  category: string;
  categoryOdia: string;
  demonstratedItems: string[];
  description: string;
  liveTab: string;
  metrics: string;
}

export const CRITERIA_CHECKLIST: CriterionItem[] = [
  {
    id: 'crit-student-support',
    icon: '🎓',
    category: 'Student Support',
    categoryOdia: 'ଛାତ୍ରଛାତ୍ରୀ ସହାୟତା',
    demonstratedItems: ['Attendance', 'Timetable', 'Assignments', 'Notices', 'Academic Information'],
    description: 'Comprehensive academic tracking including 75% attendance threshold calculators, multi-course timetables, assignment submission portal with grading, and official exam notices.',
    liveTab: 'academics',
    metrics: '5 Course Trackers • 4 Active Assignments • 83.5% Overall Attendance'
  },
  {
    id: 'crit-digital-services',
    icon: '📝',
    category: 'Digital Services',
    categoryOdia: 'ଡିଜିଟାଲ ସେବା',
    demonstratedItems: ['Online requests/forms', 'Certificates', 'Applications', 'Complaints'],
    description: '100% paperless student lifecycle requests: Bonafide certificates with QR authentication, Hostel NOC clearance, digital ID reissue, and grievance complaint helpdesk.',
    liveTab: 'certificates',
    metrics: '3 Certificate Workflows • QR Anti-Forgery Verification • 24h SLA'
  },
  {
    id: 'crit-communication',
    icon: '🔔',
    category: 'Communication',
    categoryOdia: 'ସୂଚନା ଓ ଯୋଗାଯୋଗ',
    demonstratedItems: ['Announcements', 'Notifications', 'Important Alerts'],
    description: 'Instant multi-channel broadcasts across campus, priority banner alerts (such as coastal weather advisories), urgent examination notices, and contextual in-app notifications.',
    liveTab: 'broadcasts',
    metrics: '3 Priority Tiers • Target Audience Routing • Read Receipts'
  },
  {
    id: 'crit-campus-facilities',
    icon: '🏫',
    category: 'Campus Facilities',
    categoryOdia: 'କ୍ୟାମ୍ପସ ସୁବିଧା ଓ ଭିତ୍ତିଭୂମି',
    demonstratedItems: ['Library', 'Classrooms', 'Labs', 'Events', 'Facilities'],
    description: 'Interactive campus resource manager: Real-time Gita Govinda Library seat occupancy & book catalog, smart lab & auditorium bookings, and cultural/tech fest registration.',
    liveTab: 'facilities',
    metrics: '480 Library Seats Monitored • 6 Facilities • 3 Major Campus Events'
  },
  {
    id: 'crit-admin-tools',
    icon: '👨💼',
    category: 'Administrator Tools',
    categoryOdia: 'ପ୍ରଶାସକ ଟୁଲ୍ସ',
    demonstratedItems: ['Student management', 'Approvals', 'Reports', 'Announcements'],
    description: 'Administrative command center: Searchable student directory, single-click multi-stage approvals for outpasses and certificates, emergency broadcast dispatch, and data audit exports.',
    liveTab: 'students',
    metrics: 'Full Student Directory • Unified Approvals Queue • CSV Export'
  },
  {
    id: 'crit-analytics',
    icon: '📊',
    category: 'Dashboard/Analytics',
    categoryOdia: 'ଡ୍ୟାସବୋର୍ଡ ଓ ବିଶ୍ଳେଷଣ',
    demonstratedItems: ['Attendance statistics', 'Performance metrics', 'Resource statistics'],
    description: 'Real-time visual telemetry: Student CGPA progression, course-wise attendance distributions, outpass transit heatmaps, facility utilization rates, and grievance resolution times.',
    liveTab: 'analytics',
    metrics: 'Live Gauges • Multi-Metric Charts • Department SLA Ratios'
  },
  {
    id: 'crit-smart-features',
    icon: '🤖',
    category: 'Smart Features',
    categoryOdia: 'ସ୍ମାର୍ଟ ଏବଂ AI ସୁବିଧା',
    demonstratedItems: ['AI chatbot', 'Recommendations', 'Automated assistance'],
    description: 'Integrated UniSphere Campus Mitra AI Assistant: Instant answers in English/Odia, proactive attendance warnings, mess crowd forecasts, and automatic ticket triage.',
    liveTab: 'chatbot',
    metrics: 'Bilingual AI Assistant • Proactive Alerts • Automated Triage'
  },
  {
    id: 'crit-security',
    icon: '🔐',
    category: 'Security',
    categoryOdia: 'ସୁରକ୍ଷା ଓ ଡାଟା ଗୋପନୀୟତା',
    demonstratedItems: ['Login', 'Role-based access', 'Protection of student data'],
    description: 'Strict security architecture: Role-based access control (Student vs Admin vs Warden), dynamic cryptographic QR outpass tokens, 2FA OTP password recovery, and encrypted identity credentials.',
    liveTab: 'security',
    metrics: 'Dual-Role RBAC • 2FA OTP Recovery • Dynamic QR Verification'
  }
];

