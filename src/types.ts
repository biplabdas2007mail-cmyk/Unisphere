export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  department: string;
  studentId?: string;
  designation?: string;
  hostelBlock?: string;
  roomNo?: string;
  year?: string;
  phone?: string;
}

export type TicketStatus = 'Pending' | 'In Progress' | 'Resolved';
export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Emergency';
export type TicketCategory = 'Hostel & Housing' | 'IT & Wi-Fi' | 'Lab & Equipment' | 'Classroom & Electricity' | 'Sanitation' | 'Library';

export interface TicketUpdate {
  id: string;
  timestamp: string;
  author: string;
  role: string;
  message: string;
}

export interface GrievanceTicket {
  id: string;
  title: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  description: string;
  location: string;
  submittedBy: string;
  studentName: string;
  studentId: string;
  createdAt: string;
  resolvedAt?: string;
  assignedTo?: string;
  updates: TicketUpdate[];
}

export type OutpassStatus = 'Pending' | 'Approved' | 'Rejected';
export type OutpassType = 'Day Outpass' | 'Weekend Home Pass' | 'Emergency Leave' | 'Official Event';

export interface OutpassRequest {
  id: string;
  studentId: string;
  studentName: string;
  roomNo: string;
  hostelBlock: string;
  outpassType: OutpassType;
  reason: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  returnDate: string;
  returnTime: string;
  status: OutpassStatus;
  appliedAt: string;
  approvedBy?: string;
  reviewedAt?: string;
  qrToken?: string;
}

export type FacilityType = 'Auditorium' | 'Computer Lab' | 'Robotics Lab' | 'Seminar Hall' | 'Study Pod' | 'Sports Complex';

export interface FacilityFeedback {
  id?: string;
  facilityName?: string;
  rating: number; // 1 to 5
  cleanlinessRating?: number; // 1 to 5
  equipmentRating?: number; // 1 to 5
  comment: string;
  aspects?: string[];
  submittedAt: string;
  studentName: string;
  studentId: string;
}

export interface FacilityBooking {
  id: string;
  facilityName: string;
  facilityType: FacilityType;
  location: string;
  capacity: number;
  bookedBy: string;
  requesterName: string;
  requesterRole: UserRole;
  date: string;
  timeSlot: string;
  purpose: string;
  status: 'Confirmed' | 'Pending' | 'Rejected';
  createdAt: string;
  notes?: string;
  isCompleted?: boolean;
  sessionEndedAt?: string;
  feedback?: FacilityFeedback;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: 'Normal' | 'Urgent' | 'Information';
  targetAudience: 'All Campus' | 'Students Only' | 'Staff Only';
  author: string;
  date: string;
  category: string;
}

export interface TimetableSlot {
  id: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  time: string;
  room: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  type: 'Lecture' | 'Lab' | 'Tutorial';
}

export interface MessMenuDay {
  day: string;
  breakfast: string;
  lunch: string;
  snacks: string;
  dinner: string;
  specialNotice?: string;
  crowdLevel: 'Low' | 'Moderate' | 'High';
}

// 🎓 Criterion: Student Support (Attendance, Assignments, Academic info)
export interface AttendanceCourse {
  code: string;
  name: string;
  instructor: string;
  attended: number;
  totalClasses: number;
  percentage: number;
  minRequired: number;
  status: 'Safe' | 'Warning' | 'Critical';
  safeBunks: number;
  classesNeededFor75: number;
  lastUpdated: string;
}

export interface StudentAssignment {
  id: string;
  courseCode: string;
  courseName: string;
  title: string;
  dueDate: string;
  maxMarks: number;
  status: 'Pending' | 'Submitted' | 'Graded';
  submittedDate?: string;
  marksAwarded?: number;
  feedback?: string;
  attachmentName?: string;
}

// 📝 Criterion: Digital Services (Certificates, Applications, Forms)
export type CertificateType = 
  | 'Bonafide Certificate' 
  | 'Hostel Clearance / NOC' 
  | 'Grade Transcript' 
  | 'Digital ID Reissue' 
  | 'Event Campus Permission';

export interface DigitalCertificateRequest {
  id: string;
  studentId: string;
  studentName: string;
  department: string;
  certificateType: CertificateType;
  purpose: string;
  appliedAt: string;
  status: 'Approved' | 'Pending' | 'Processing' | 'Rejected';
  approvedBy?: string;
  approvedAt?: string;
  verificationToken: string;
  issuedDocumentTitle?: string;
  rejectionReason?: string;
}

// 🏫 Criterion: Campus Facilities (Library & Events)
export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  availableCopies: number;
  totalCopies: number;
  shelfLocation: string;
  isReserved?: boolean;
}

export interface LibrarySeatStatus {
  totalSeats: number;
  occupiedSeats: number;
  quietReadingPodsAvailable: number;
  groupStudyRoomsFree: number;
  currentNoiseLevel: 'Silent (32 dB)' | 'Moderate (45 dB)' | 'Active Discussion (58 dB)';
}

export interface CampusEvent {
  id: string;
  title: string;
  category: 'Tech Fest' | 'Cultural' | 'Workshop' | 'Sports' | 'Hackathon';
  date: string;
  time: string;
  location: string;
  organizer: string;
  registeredCount: number;
  capacity: number;
  isRegistered: boolean;
  description: string;
  bannerGradient: string;
}

// 👨💼 Criterion: Administrator Tools (Student Management)
export interface ManagedStudent {
  id: string;
  rollNo: string;
  name: string;
  branch: string;
  year: string;
  hostelBlock: string;
  roomNo: string;
  cgpa: number;
  attendanceRate: number;
  outpassCount: number;
  disciplinaryHold: boolean;
  email: string;
  phone: string;
}

// 🤖 Criterion: Smart Features (AI Campus Assistant)
export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestions?: string[];
  category?: 'attendance' | 'mess' | 'outpass' | 'facility' | 'certificates' | 'general';
}
