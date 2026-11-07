import { useAddToast } from './ToastContext';
import { resolveAvatar } from '../data/avatars';
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  AppView,
  Scholarship,
  StudentProfile,
  ApplicationRecord,
  DocumentItem,
  NotificationItem,
  EligibilityAuditResult
} from '../types';
import { SCHOLARSHIPS } from '../data/scholarships';
import {
  DEFAULT_PROFILE,
  INITIAL_APPLICATIONS,
  INITIAL_DOCUMENTS,
  INITIAL_NOTIFICATIONS
} from '../data/demoData';

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  authModal: 'login' | 'register' | null;
  setAuthModal: (modal: 'login' | 'register' | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  userProfile: StudentProfile;
  setUserProfile: (profile: StudentProfile) => void;
  scholarships: Scholarship[];
  savedIds: string[];
  toggleSaveScholarship: (id: string) => void;
  applications: ApplicationRecord[];
  submitApplication: (scholarship: Scholarship, notes?: string) => void;
  withdrawApplication: (id: string) => void;
  documents: DocumentItem[];
  addDocument: (doc: { name: string; category: DocumentItem['category']; size: string }) => void;
  deleteDocument: (id: string) => void;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotifications: () => void;
  compareList: Scholarship[];
  toggleCompare: (scholarship: Scholarship) => void;
  clearCompare: () => void;
  activeDetailScholarship: Scholarship | null;
  setActiveDetailScholarship: (scholarship: Scholarship | null) => void;
  applyTargetScholarship: Scholarship | null;
  setApplyTargetScholarship: (scholarship: Scholarship | null) => void;
  checkEligibility: (scholarship: Scholarship, profile?: StudentProfile) => EligibilityAuditResult;
  addToast: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  resetDemoData: () => void;
  isPhotoModalOpen: boolean;
  setIsPhotoModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>(() => {
    return (localStorage.getItem('grantly_view') as AppView) || 'landing';
  });

  const [authModal, setAuthModal] = useState<'login' | 'register' | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('grantly_auth') === 'true';
  });

  const [userProfile, setUserProfileState] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('grantly_profile');
    try {
      const profile = saved ? { ...DEFAULT_PROFILE, ...JSON.parse(saved) } : DEFAULT_PROFILE;
      return { ...profile, avatarUrl: resolveAvatar(profile.avatarUrl) };
    } catch { return DEFAULT_PROFILE; }
  });

  const [scholarships] = useState<Scholarship[]>(SCHOLARSHIPS);

  const [savedIds, setSavedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('grantly_saved_ids');
    return saved ? JSON.parse(saved) : ['sch-1', 'sch-4'];
  });

  const [applications, setApplications] = useState<ApplicationRecord[]>(() => {
    const saved = localStorage.getItem('grantly_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    const saved = localStorage.getItem('grantly_documents');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('grantly_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [compareList, setCompareList] = useState<Scholarship[]>([]);
  const [activeDetailScholarship, setActiveDetailScholarship] = useState<Scholarship | null>(null);
  const [applyTargetScholarship, setApplyTargetScholarship] = useState<Scholarship | null>(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const addToast = useAddToast();

  // Local storage synchronization
  useEffect(() => {
    localStorage.setItem('grantly_view', currentView);
  }, [currentView]);

  useEffect(() => {
    localStorage.setItem('grantly_auth', String(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('grantly_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('grantly_saved_ids', JSON.stringify(savedIds));
  }, [savedIds]);

  useEffect(() => {
    localStorage.setItem('grantly_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('grantly_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('grantly_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const setUserProfile = (profile: StudentProfile) => {
    setUserProfileState(profile);
  };

  const toggleSaveScholarship = useCallback((id: string) => {
    const isSaved = savedIds.includes(id);
    setSavedIds(previous => isSaved ? previous.filter(item => item !== id) : [...previous, id]);
    addToast(isSaved ? 'Removed from saved scholarships' : 'Saved to your shortlisted scholarships', isSaved ? 'info' : 'success');
  }, [savedIds, addToast]);

  const toggleCompare = useCallback((scholarship: Scholarship) => {
    if (compareList.some(item => item.id === scholarship.id)) {
      setCompareList(previous => previous.filter(item => item.id !== scholarship.id));
      addToast('Removed from comparison', 'info');
    } else if (compareList.length >= 3) {
      addToast('Comparison limit reached (max 3 simultaneously)', 'warning');
    } else {
      setCompareList(previous => [...previous, scholarship]);
      addToast(`Added "${scholarship.title.slice(0, 24)}..." to comparison`, 'success');
    }
  }, [compareList, addToast]);

  const clearCompare = () => {
    setCompareList([]);
  };

  const submitApplication = (scholarship: Scholarship, notes?: string) => {
    const existing = applications.find((a) => a.scholarshipId === scholarship.id);
    if (existing) {
      addToast(`Application already recorded for ${scholarship.title}`, 'warning');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const newRecord: ApplicationRecord = {
      id: `APP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      scholarshipId: scholarship.id,
      title: scholarship.title,
      amount: scholarship.amountFormatted,
      appliedDate: today,
      status: 'Submitted (demo)',
      lastUpdated: today,
      notes: notes || 'Submitted directly through GRANTLY FastTrack verification',
      timeline: [
        { label: 'Application Submitted', date: today, completed: true },
        { label: 'Document Validation', date: 'In Queue', completed: false },
        { label: 'Committee Evaluation', date: 'Pending', completed: false },
        { label: 'Award & DBT Disbursal', date: 'Pending', completed: false }
      ]
    };

    setApplications((prev) => [newRecord, ...prev]);
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Application Created',
        message: `Your demo application for ${scholarship.title} was recorded in your tracking desk.`,
        time: 'Just now',
        read: false,
        type: 'success'
      },
      ...prev
    ]);

    addToast(`Successfully applied to ${scholarship.title}!`, 'success');
    setApplyTargetScholarship(null);
  };

  const withdrawApplication = (id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
    addToast('Application record withdrawn from demo dashboard', 'info');
  };

  const addDocument = (doc: { name: string; category: DocumentItem['category']; size: string }) => {
    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      name: doc.name,
      category: doc.category,
      uploadDate: new Date().toISOString().split('T')[0],
      size: doc.size,
      status: 'Verified'
    };
    setDocuments((prev) => [newDoc, ...prev]);
    addToast(`"${doc.name}" added to your document vault`, 'success');
  };

  const deleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    addToast('Document removed from local repository', 'info');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('All notifications marked as read', 'info');
  };

  const clearNotifications = () => {
    setNotifications([]);
    addToast('Notification feed cleared', 'info');
  };

  const checkEligibility = useCallback((
    scholarship: Scholarship,
    profile: StudentProfile = userProfile
  ): EligibilityAuditResult => {
    const reasons: { pass: boolean; text: string }[] = [];
    let score = 100;
    let isEligible = true;
    let needsVerification = false;

    // 1. Percentage threshold
    if (profile.academicPercentage < scholarship.minPercentage) {
      isEligible = false;
      score -= 35;
      reasons.push({
        pass: false,
        text: `Minimum requirement is ${scholarship.minPercentage}%. Your academic score is ${profile.academicPercentage}%.`
      });
    } else {
      reasons.push({
        pass: true,
        text: `Satisfies academic cutoff (${profile.academicPercentage}% vs min ${scholarship.minPercentage}%).`
      });
    }

    // 2. Family Income ceiling
    if (profile.annualIncome > scholarship.maxIncome) {
      isEligible = false;
      score -= 35;
      reasons.push({
        pass: false,
        text: `Family annual income (₹${(profile.annualIncome / 100000).toFixed(1)} LPA) exceeds the ceiling of ₹${(scholarship.maxIncome / 100000).toFixed(1)} LPA.`
      });
    } else {
      reasons.push({
        pass: true,
        text: `Family annual income (₹${(profile.annualIncome / 100000).toFixed(1)} LPA) complies with ₹${(scholarship.maxIncome / 100000).toFixed(1)} LPA ceiling.`
      });
    }

    // 3. Gender Requirement
    if (scholarship.genderRequirement && scholarship.genderRequirement !== profile.gender) {
      isEligible = false;
      score -= 30;
      reasons.push({
        pass: false,
        text: `Exclusive to ${scholarship.genderRequirement} applicants.`
      });
    }

    // 4. State Domicile
    if (scholarship.state !== 'All India / National' && scholarship.state !== profile.state) {
      needsVerification = true;
      score -= 15;
      reasons.push({
        pass: false,
        text: `Primary domicile designated as ${scholarship.state}. Your profile is ${profile.state} (Requires institutional interstate waiver).`
      });
    } else {
      reasons.push({
        pass: true,
        text: `State domicile requirement satisfied (${scholarship.state}).`
      });
    }

    // 5. Education Level
    if (scholarship.educationLevel !== profile.educationLevel) {
      needsVerification = true;
      score -= 10;
      reasons.push({
        pass: false,
        text: `Intended for ${scholarship.educationLevel} (Your current status is ${profile.educationLevel}).`
      });
    }

    let verdict: EligibilityAuditResult['verdict'] = 'Eligible';
    if (!isEligible) {
      verdict = 'Not Eligible';
    } else if (needsVerification) {
      verdict = 'Needs Verification';
    }

    return {
      verdict,
      score: Math.max(score, 10),
      reasons
    };
  }, [userProfile]);

  const resetDemoData = () => {
    localStorage.removeItem('grantly_saved_ids');
    localStorage.removeItem('grantly_applications');
    localStorage.removeItem('grantly_documents');
    localStorage.removeItem('grantly_notifications');
    localStorage.removeItem('grantly_profile');

    setUserProfileState(DEFAULT_PROFILE);
    setSavedIds(['sch-1', 'sch-4']);
    setApplications(INITIAL_APPLICATIONS);
    setDocuments(INITIAL_DOCUMENTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCompareList([]);
    addToast('Demo environment reset to initial factory configuration', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        authModal,
        setAuthModal,
        isAuthenticated,
        setIsAuthenticated,
        userProfile,
        setUserProfile,
        scholarships,
        savedIds,
        toggleSaveScholarship,
        applications,
        submitApplication,
        withdrawApplication,
        documents,
        addDocument,
        deleteDocument,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearNotifications,
        compareList,
        toggleCompare,
        clearCompare,
        activeDetailScholarship,
        setActiveDetailScholarship,
        applyTargetScholarship,
        setApplyTargetScholarship,
        checkEligibility,
        addToast,
        resetDemoData,
        isPhotoModalOpen,
        setIsPhotoModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
