export type ScholarshipCategory =
  | 'Government'
  | 'Private'
  | 'Merit-based'
  | 'Need-based'
  | 'Minority'
  | 'Technical Education'
  | 'Research';

export type EducationLevel =
  | 'Higher Secondary (11th-12th)'
  | 'Diploma / Polytechnic'
  | 'Undergraduate'
  | 'Postgraduate'
  | 'Doctoral / PhD';

export type ApplicationStatus =
  | 'Draft'
  | 'Submitted (demo)'
  | 'Under Review'
  | 'Approved (demo)'
  | 'Rejected (demo)';

export type EligibilityVerdict = 'Eligible' | 'Not Eligible' | 'Needs Verification';

export interface EligibilityCriterionReason {
  pass: boolean;
  text: string;
}

export interface EligibilityAuditResult {
  verdict: EligibilityVerdict;
  score: number;
  reasons: EligibilityCriterionReason[];
}

export interface Scholarship {
  id: string;
  title: string;
  provider: string;
  category: ScholarshipCategory;
  educationLevel: EducationLevel;
  field: string;
  state: string;
  amount: number;
  amountFormatted: string;
  deadline: string;
  minPercentage: number;
  maxIncome: number;
  genderRequirement?: 'Female' | 'Male';
  eligibleCategories: string[];
  description: string;
  fullDetails: {
    benefits: string;
    eligibility: string;
    documents: string[];
    process: string;
  };
  featured: boolean;
}

export interface StudentProfile {
  fullName: string;
  email: string;
  phone: string;
  state: string;
  course: string;
  educationLevel: EducationLevel;
  currentYear: string;
  academicPercentage: number;
  annualIncome: number;
  category: string;
  institutionType: string;
  gender: 'Male' | 'Female' | 'Other';
  avatarUrl: string;
}

export interface ApplicationTimelineStep {
  label: string;
  date: string;
  completed: boolean;
}

export interface ApplicationRecord {
  id: string;
  scholarshipId: string;
  title: string;
  amount: string;
  appliedDate: string;
  status: ApplicationStatus;
  lastUpdated: string;
  notes?: string;
  timeline: ApplicationTimelineStep[];
}

export type DocumentCategory =
  | 'Academic Marksheet'
  | 'Income Certificate'
  | 'Identity Proof'
  | 'Caste Certificate'
  | 'Bank Details Document'
  | 'Other Documents';

export interface DocumentItem {
  id: string;
  name: string;
  category: DocumentCategory;
  uploadDate: string;
  size: string;
  status: 'Verified' | 'Pending Review';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'urgent' | 'success' | 'info';
}

export type AppView =
  | 'landing'
  | 'dashboard'
  | 'explorer'
  | 'checker'
  | 'applications'
  | 'saved'
  | 'documents'
  | 'notifications'
  | 'profile'
  | 'settings';
