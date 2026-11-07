import { avatarPresets } from './avatars';
import {
  StudentProfile,
  ApplicationRecord,
  DocumentItem,
  NotificationItem
} from '../types';

export const DEFAULT_PROFILE: StudentProfile = {
  fullName: 'Aarav Sharma',
  email: 'aarav.sharma@university.edu',
  phone: '+91 98765 43210',
  state: 'Maharashtra',
  course: 'B.Tech Computer Science & Engineering',
  educationLevel: 'Undergraduate',
  currentYear: '2nd Year',
  academicPercentage: 84.5,
  annualIncome: 450000,
  category: 'General',
  institutionType: 'Government Autonomous Institute',
  gender: 'Male',
  avatarUrl: avatarPresets[0].url
};

export const INITIAL_APPLICATIONS: ApplicationRecord[] = [
  {
    id: 'APP-2027-101',
    scholarshipId: 'sch-1',
    title: 'National Merit STEM Scholars Fellowship',
    amount: '₹80,000 / year',
    appliedDate: '2027-02-14',
    status: 'Under Review',
    lastUpdated: '2027-02-28',
    notes: 'Submitted with verified 12th board marksheet and Tehsildar income certificate.',
    timeline: [
      { label: 'Application Submitted', date: '2027-02-14', completed: true },
      { label: 'Document Verification', date: '2027-02-22', completed: true },
      { label: 'Academic Committee Review', date: '2027-02-28', completed: true },
      { label: 'Sanction & Fund Disbursal', date: 'Pending', completed: false }
    ]
  },
  {
    id: 'APP-2027-102',
    scholarshipId: 'sch-3',
    title: 'Post-Matric Financial Aid for Socio-Economic Equity',
    amount: '₹45,000 / year',
    appliedDate: '2027-01-20',
    status: 'Approved (demo)',
    lastUpdated: '2027-02-10',
    notes: 'Cleared state scrutiny. Scheduled for direct beneficiary transfer.',
    timeline: [
      { label: 'Application Submitted', date: '2027-01-20', completed: true },
      { label: 'Document Scrutiny', date: '2027-01-29', completed: true },
      { label: 'State Audit Cleared', date: '2027-02-05', completed: true },
      { label: 'Grant Sanctioned', date: '2027-02-10', completed: true }
    ]
  }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-101',
    name: 'Class_12_Official_Board_Marksheet.pdf',
    category: 'Academic Marksheet',
    uploadDate: '2027-01-15',
    size: '1.4 MB',
    status: 'Verified'
  },
  {
    id: 'doc-102',
    name: 'Tahsil_Revenue_Income_Certificate_2026_27.pdf',
    category: 'Income Certificate',
    uploadDate: '2027-01-18',
    size: '840 KB',
    status: 'Verified'
  },
  {
    id: 'doc-103',
    name: 'National_Aadhaar_Card_Masked.pdf',
    category: 'Identity Proof',
    uploadDate: '2027-01-10',
    size: '620 KB',
    status: 'Verified'
  },
  {
    id: 'doc-104',
    name: 'College_Enrolment_Bonafide_Letter.pdf',
    category: 'Other Documents',
    uploadDate: '2027-02-02',
    size: '1.1 MB',
    status: 'Pending Review'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Critical Deadline Alert',
    message: 'National Merit STEM Scholars Fellowship closes in 35 days. Complete pending documents.',
    time: '2 hours ago',
    read: false,
    type: 'urgent'
  },
  {
    id: 'notif-2',
    title: 'Application Status Updated',
    message: 'Your Post-Matric Financial Aid application has been Approved (demo).',
    time: 'Yesterday',
    read: false,
    type: 'success'
  },
  {
    id: 'notif-3',
    title: 'New High Compatibility Match',
    message: 'Your profile satisfies 92% of criteria for the National Young Scientists Fellowship.',
    time: '3 days ago',
    read: true,
    type: 'info'
  }
];
