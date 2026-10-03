import { UserRole } from '../types';
import { DEMO_USERS } from '../data/mockData';

export interface StoredCredentials {
  email: string;
  studentId?: string;
  password: string;
  updatedAt?: string;
  phone?: string;
}

const STORAGE_KEY_CREDS = 'campus_portal_credentials_v1';

export const DEFAULT_CREDENTIALS: Record<UserRole, StoredCredentials> = {
  student: {
    email: DEMO_USERS.student.email,
    studentId: DEMO_USERS.student.studentId || '2023CS1082',
    password: 'student2026',
    phone: DEMO_USERS.student.phone || '+91 98612 34567',
    updatedAt: 'Default Provisioned'
  },
  admin: {
    email: DEMO_USERS.admin.email,
    password: 'admin2026',
    phone: DEMO_USERS.admin.phone || '+91 674 230 1122',
    updatedAt: 'Default Provisioned'
  }
};

export const getStoredCredentials = (role: UserRole): StoredCredentials => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CREDS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed[role]) {
        return parsed[role];
      }
    }
  } catch {
    // fallback
  }
  return DEFAULT_CREDENTIALS[role];
};

export const saveNewPassword = (
  role: UserRole,
  newPassword: string,
  identifier?: string
): StoredCredentials => {
  let allCreds: Record<string, StoredCredentials> = { ...DEFAULT_CREDENTIALS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CREDS);
    if (raw) {
      allCreds = { ...allCreds, ...JSON.parse(raw) };
    }
  } catch {
    // fallback
  }

  const current = allCreds[role] || DEFAULT_CREDENTIALS[role];
  const updated: StoredCredentials = {
    ...current,
    password: newPassword,
    updatedAt: new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short'
    })
  };

  if (identifier) {
    if (identifier.includes('@')) {
      updated.email = identifier;
    } else if (role === 'student') {
      updated.studentId = identifier.toUpperCase();
    }
  }

  allCreds[role] = updated;
  try {
    localStorage.setItem(STORAGE_KEY_CREDS, JSON.stringify(allCreds));
  } catch {
    // fallback
  }

  return updated;
};

export const maskEmail = (email: string): string => {
  const [user, domain] = email.split('@');
  if (!user || !domain) return email;
  if (user.length <= 2) return `${user[0]}*@${domain}`;
  return `${user.slice(0, 2)}${'*'.repeat(Math.min(user.length - 2, 5))}@${domain}`;
};

export const maskPhone = (phone: string): string => {
  const digits = phone.replace(/[^\d+]/g, '');
  if (digits.length <= 6) return phone;
  const start = digits.slice(0, 5);
  const end = digits.slice(-3);
  return `${start} *****-${end}`;
};

export const lookupCampusAccount = (
  identifier: string,
  role: UserRole
): {
  found: boolean;
  name: string;
  maskedEmail: string;
  maskedPhone: string;
  actualEmail: string;
  actualId?: string;
} => {
  const clean = identifier.trim().toLowerCase();
  const creds = getStoredCredentials(role);
  const demoUser = DEMO_USERS[role];

  const studentMatches =
    role === 'student' &&
    (clean === creds.studentId?.toLowerCase() ||
      clean === creds.email.toLowerCase() ||
      clean === demoUser.studentId?.toLowerCase() ||
      clean === demoUser.email.toLowerCase() ||
      clean === '2023cs1082' ||
      clean === 'aarav');

  const adminMatches =
    role === 'admin' &&
    (clean === creds.email.toLowerCase() ||
      clean === demoUser.email.toLowerCase() ||
      clean === 'dean' ||
      clean === 'sarah' ||
      clean === 'admin');

  if (studentMatches || (!clean.includes('@') && role === 'student') || (clean.includes('campus.edu') && role === 'student')) {
    return {
      found: true,
      name: demoUser.name,
      maskedEmail: maskEmail(creds.email),
      maskedPhone: maskPhone(creds.phone || '+91 98612 34567'),
      actualEmail: creds.email,
      actualId: creds.studentId || '2023CS1082'
    };
  }

  if (adminMatches || (role === 'admin' && (clean.includes('@') || clean.length > 2))) {
    return {
      found: true,
      name: demoUser.name,
      maskedEmail: maskEmail(creds.email),
      maskedPhone: maskPhone(creds.phone || '+91 674 230 1122'),
      actualEmail: creds.email
    };
  }

  return {
    found: true,
    name: demoUser.name,
    maskedEmail: maskEmail(creds.email),
    maskedPhone: maskPhone(creds.phone || '+91 98612 34567'),
    actualEmail: creds.email,
    actualId: creds.studentId
  };
};
