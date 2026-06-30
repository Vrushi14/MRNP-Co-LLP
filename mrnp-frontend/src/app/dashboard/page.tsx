'use client';

import { useEffect, useState } from 'react';
import { apiClient, authService } from '@/utils/api';
import { compressImage } from '@/utils/imageCompressor';
import { useRouter } from 'next/navigation';
import {
  Sun,
  Moon,
  TrendingUp,
  Briefcase,
  Users,
  MapPin,
  Mail,
  Trash2,
  Download,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckSquare,
  Square,
  ArrowUpDown,
  Send,
  Clock,
  UserCheck,
  Plus,
  Bell,
  Calendar,
  LayoutGrid,
  User,
  Shield,
  Key,
  Pencil,
  Phone,
  Award
} from 'lucide-react';

import SecuritySettings from '@/components/dashboard/SecuritySettings';
import NotificationCenter from '@/components/dashboard/NotificationCenter';
import InterviewScheduler from '@/components/dashboard/InterviewScheduler';
import DashboardWidgets from '@/components/dashboard/DashboardWidgets';


export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'jobs' | 'analytics' | 'profile' | 'interviews' | 'notifications' | 'services' | 'about' | 'careers'>('analytics');
  const router = useRouter();

  // Services states
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [servicesError, setServicesError] = useState('');
  const [isServiceEditing, setIsServiceEditing] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [serviceSaveError, setServiceSaveError] = useState('');
  const [serviceSaveSuccess, setServiceSaveSuccess] = useState('');

  // Service Form State
  const [serviceTitle, setServiceTitle] = useState('');
  const [serviceSlug, setServiceSlug] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [serviceImage, setServiceImage] = useState('');
  const [servicePageTitle, setServicePageTitle] = useState('');
  const [serviceIntro, setServiceIntro] = useState('');
  const [serviceWhyTitle, setServiceWhyTitle] = useState('');
  const [serviceWhySubtitle, setServiceWhySubtitle] = useState('');
  const [serviceSections, setServiceSections] = useState<any[]>([]);
  const [serviceWhyCards, setServiceWhyCards] = useState<any[]>([]);
  const [serviceStatus, setServiceStatus] = useState<'published' | 'draft'>('published');

  // About Page states
  const [aboutLoading, setAboutLoading] = useState(false);
  const [aboutError, setAboutError] = useState('');
  const [aboutSaveSuccess, setAboutSaveSuccess] = useState('');
  const [aboutSaveError, setAboutSaveError] = useState('');
  const [isUploadingAboutImage, setIsUploadingAboutImage] = useState(false);

  // About Page Form State
  const [aboutHeroTitle, setAboutHeroTitle] = useState('');
  const [aboutHeroDescription, setAboutHeroDescription] = useState('');
  const [aboutCommitmentImage, setAboutCommitmentImage] = useState('');
  const [aboutCommitmentTitle, setAboutCommitmentTitle] = useState('');
  const [aboutCommitmentParagraphs, setAboutCommitmentParagraphs] = useState<string[]>([]);
  const [aboutValues, setAboutValues] = useState<any[]>([]);
  const [aboutPartners, setAboutPartners] = useState<any[]>([]);

  // Careers Page states
  const [careersLoading, setCareersLoading] = useState(false);
  const [careersError, setCareersError] = useState('');
  const [careersSaveSuccess, setCareersSaveSuccess] = useState('');
  const [careersSaveError, setCareersSaveError] = useState('');
  const [isUploadingCareersImage, setIsUploadingCareersImage] = useState(false);

  // Careers Page Form State
  const [careersHeroTitle, setCareersHeroTitle] = useState('');
  const [careersHeroDescription, setCareersHeroDescription] = useState('');
  const [careersHeroImage, setCareersHeroImage] = useState('');
  const [careersCultureSec1Title, setCareersCultureSec1Title] = useState('');
  const [careersCultureSec1Paragraph1, setCareersCultureSec1Paragraph1] = useState('');
  const [careersCultureSec1Paragraph2, setCareersCultureSec1Paragraph2] = useState('');
  const [careersCultureSec2Title, setCareersCultureSec2Title] = useState('');
  const [careersCultureSec2Paragraph1, setCareersCultureSec2Paragraph1] = useState('');
  const [careersCultureSec2Paragraph2, setCareersCultureSec2Paragraph2] = useState('');
  const [careersMarqueeImages, setCareersMarqueeImages] = useState<string[]>([]);
  const [careersStatus, setCareersStatus] = useState<'published' | 'draft'>('published');


  // Theme support
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Mobile sidebar
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Profile fields state
  const [editing, setEditing] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [profileDesignation, setProfileDesignation] = useState('');
  const [profileIcaiMembership, setProfileIcaiMembership] = useState('');
  const [profileMemberSince, setProfileMemberSince] = useState('');
  const [profileOfficeBranch, setProfileOfficeBranch] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [profileLinkedin, setProfileLinkedin] = useState('');
  const [profileLocation, setProfileLocation] = useState('');
  const [profileBadge, setProfileBadge] = useState('');
  const [profileTeamAssigned, setProfileTeamAssigned] = useState('');
  const [profileJoinedFirm, setProfileJoinedFirm] = useState('');
  const [profileError, setProfileError] = useState('');

  // Allowed Emails list states
  const [allowedEmails, setAllowedEmails] = useState<any[]>([]);
  const [allowedEmailsLoading, setAllowedEmailsLoading] = useState(false);
  const [allowedEmailsError, setAllowedEmailsError] = useState('');
  const [newAllowedEmail, setNewAllowedEmail] = useState('');
  const [addAllowedEmailLoading, setAddAllowedEmailLoading] = useState(false);
  const [deleteAllowedEmailLoading, setDeleteAllowedEmailLoading] = useState<string | null>(null);
  const [allowedEmailsSuccess, setAllowedEmailsSuccess] = useState('');

  // Notifications and Interviews states
  const [notifications, setNotifications] = useState<any[]>([]);
  const [interviews, setInterviews] = useState<any[]>([]);


  // Applications state
  const [applications, setApplications] = useState<any[]>([]);
  const [filteredApps, setFilteredApps] = useState<any[]>([]);
  const [appsLoading, setAppsLoading] = useState(true);
  const [appsError, setAppsError] = useState('');

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedPos, setSelectedPos] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedExp, setSelectedExp] = useState('');

  // Dropdown list unique options
  const [departments, setDepartments] = useState<string[]>([]);
  const [positions, setPositions] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [experiences, setExperiences] = useState<string[]>([]);

  // Detailed Modal/Drawer state
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [adminStatus, setAdminStatus] = useState<'Pending' | 'Under Review' | 'Shortlisted' | 'Rejected'>('Pending');
  const [adminNotes, setAdminNotes] = useState('');

  // Email Automation State
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailTemplate, setEmailTemplate] = useState<'interview' | 'rejection' | 'offer'>('interview');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailHistory, setEmailHistory] = useState<any[]>([]);
  const [emailSuccessMessage, setEmailSuccessMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  // Table Enhancements
  const [selectedAppIds, setSelectedAppIds] = useState<string[]>([]);
  const [sortField, setSortField] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    recent24h: 0,
    uniqueDepts: 0,
    uniqueCities: 0
  });

  // Job Openings state
  const [jobsList, setJobsList] = useState<any[]>([]);
  const [jobsListLoading, setJobsListLoading] = useState(false);
  const [jobsListError, setJobsListError] = useState('');
  const [jobPosting, setJobPosting] = useState(false);
  const [jobPostError, setJobPostError] = useState('');
  const [jobPostSuccess, setJobPostSuccess] = useState('');
  const [deletingJobId, setDeletingJobId] = useState<string | null>(null);

  // New Job form state
  const [newJobDept, setNewJobDept] = useState('');
  const [newJobPosition, setNewJobPosition] = useState('');
  const [newJobCity, setNewJobCity] = useState('');
  const [newJobState, setNewJobState] = useState('');
  const [newJobDescription, setNewJobDescription] = useState('');
  const [newJobRequirements, setNewJobRequirements] = useState('');

  // Theme Sync on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('mrnp_theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemDark ? 'dark' : 'light');
    setTheme(initialTheme as any);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('mrnp_theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Verify auth and fetch profile + applications
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!authService.isAuthenticated()) {
        router.push('/auth/login');
        return;
      }

      try {
        setLoading(true);
        // Fetch profile
        const profileResponse = await apiClient.user.getProfile();
        const u = profileResponse.user;
        setUser(u);
        setProfileName(u.name || '');
        setProfileEmail(u.email || '');
        setProfileDesignation(u.designation || 'Founding Partner');
        setProfileIcaiMembership(u.icaiMembership || '124567');
        setProfileMemberSince(u.memberSince || 'March 2004');
        setProfileOfficeBranch(u.officeBranch || 'Mumbai - HQ');
        setProfilePhone(u.phone || '+91 98200 00001');
        setProfileLinkedin(u.linkedin || 'https://linkedin.com');
        setProfileLocation(u.location || 'Mumbai, MH');
        setProfileBadge(u.badge || 'FCA');
        setProfileTeamAssigned(u.teamAssigned || 'Audit team · Tax team');
        setProfileJoinedFirm(u.joinedFirm || '1 April 2002');

        // Fetch applications
        await loadApplications();
        
        // Fetch job openings list
        await loadJobs();

        // Fetch notifications
        await loadNotifications();

        // Fetch interviews
        await loadInterviews();

        // Fetch services
        await loadServices();

        // Fetch careers page content
        await loadCareers();

        // Fetch allowed emails list
        await loadAllowedEmails();
      } catch (err: any) {
        setProfileError(err.message || 'Failed to load profile details.');
      } finally {
        setLoading(false);
      }

    };

    fetchDashboardData();
  }, [router]);

  useEffect(() => {
    if (activeTab === 'profile') {
      loadAllowedEmails();
    }
  }, [activeTab]);

  const loadApplications = async () => {
    try {
      setAppsLoading(true);
      setAppsError('');
      const response = await apiClient.careers.getApplications();
      const appList = response.applications || [];
      setApplications(appList);

      // Extract unique options dynamically
      const uniqueDepts: string[] = Array.from(new Set(appList.map((a: any) => a.jobDepartment || a.job_department).filter(Boolean)));
      const uniquePositions: string[] = Array.from(new Set(appList.map((a: any) => a.jobPosition || a.job_position).filter(Boolean)));
      const uniqueCities: string[] = Array.from(new Set(appList.map((a: any) => a.jobCity || a.job_city).filter(Boolean)));
      const uniqueExperiences: string[] = Array.from(new Set(appList.map((a: any) => a.experience).filter(Boolean)));

      setDepartments(uniqueDepts.sort());
      setPositions(uniquePositions.sort());
      setCities(uniqueCities.sort());
      setExperiences(uniqueExperiences.sort());

      calculateStats(appList);
    } catch (err: any) {
      setAppsError(err.message || 'Failed to load applications.');
    } finally {
      setAppsLoading(false);
    }
  };

  const loadNotifications = async () => {
    try {
      const res = await apiClient.notifications.getAll();
      setNotifications(res.notifications || []);
    } catch (err) {
      console.error('Failed to load notifications', err);
    }
  };

  const loadInterviews = async () => {
    try {
      const res = await apiClient.interviews.getAll();
      setInterviews(res.interviews || []);
    } catch (err) {
      console.error('Failed to load interviews', err);
    }
  };

  const getImageUrl = (imagePath?: string | null): string | undefined => {
    if (!imagePath) return undefined;
    if (imagePath.startsWith('/uploads/')) {
      const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace('/api', '');
      return `${baseUrl}${imagePath}`;
    }
    return imagePath;
  };

  const loadServices = async () => {
    try {
      setServicesLoading(true);
      setServicesError('');
      const res = await apiClient.services.getAll();
      setServicesList(res.services || []);
    } catch (err: any) {
      setServicesError(err.message || 'Failed to load services.');
    } finally {
      setServicesLoading(false);
    }
  };

  const loadAbout = async () => {
    try {
      setAboutLoading(true);
      setAboutError('');
      const res = await apiClient.about.get();
      setAboutHeroTitle(res.heroTitle || '');
      setAboutHeroDescription(res.heroDescription || '');
      setAboutCommitmentImage(res.commitmentImage || '');
      setAboutCommitmentTitle(res.commitmentTitle || '');
      setAboutCommitmentParagraphs(res.commitmentParagraphs || []);
      setAboutValues(res.values || []);
      setAboutPartners(res.partners || []);
    } catch (err: any) {
      setAboutError(err.message || 'Failed to load About Us content.');
    } finally {
      setAboutLoading(false);
    }
  };

  const loadCareers = async () => {
    try {
      setCareersLoading(true);
      setCareersError('');
      const res = await apiClient.careers.getContent();
      setCareersHeroTitle(res.heroTitle || '');
      setCareersHeroDescription(res.heroDescription || '');
      setCareersHeroImage(res.heroImage || '');
      setCareersCultureSec1Title(res.cultureSec1Title || '');
      setCareersCultureSec1Paragraph1(res.cultureSec1Paragraph1 || '');
      setCareersCultureSec1Paragraph2(res.cultureSec1Paragraph2 || '');
      setCareersCultureSec2Title(res.cultureSec2Title || '');
      setCareersCultureSec2Paragraph1(res.cultureSec2Paragraph1 || '');
      setCareersCultureSec2Paragraph2(res.cultureSec2Paragraph2 || '');
      setCareersMarqueeImages(res.marqueeImages || []);
      setCareersStatus(res.status || 'published');
    } catch (err: any) {
      setCareersError(err.message || 'Failed to load Careers Page content.');
    } finally {
      setCareersLoading(false);
    }
  };

  const loadAllowedEmails = async () => {
    try {
      setAllowedEmailsLoading(true);
      setAllowedEmailsError('');
      const list = await apiClient.user.getAllowedEmails();
      setAllowedEmails(list || []);
    } catch (err: any) {
      setAllowedEmailsError(err.message || 'Failed to load authorized emails list.');
    } finally {
      setAllowedEmailsLoading(false);
    }
  };

  const handleAddAllowedEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAllowedEmail) return;
    try {
      setAddAllowedEmailLoading(true);
      setAllowedEmailsError('');
      setAllowedEmailsSuccess('');
      const response = await apiClient.user.addAllowedEmail(newAllowedEmail.trim());
      setAllowedEmailsSuccess(response.message || 'Email authorized successfully.');
      setNewAllowedEmail('');
      await loadAllowedEmails();
    } catch (err: any) {
      setAllowedEmailsError(err.message || 'Failed to authorize email.');
    } finally {
      setAddAllowedEmailLoading(false);
    }
  };

  const handleDeleteAllowedEmail = async (id: string) => {
    if (!confirm('Are you sure you want to revoke access for this email? They will no longer be able to log in to the dashboard.')) {
      return;
    }
    try {
      setDeleteAllowedEmailLoading(id);
      setAllowedEmailsError('');
      setAllowedEmailsSuccess('');
      const response = await apiClient.user.deleteAllowedEmail(id);
      setAllowedEmailsSuccess(response.message || 'Email authorization revoked.');
      await loadAllowedEmails();
    } catch (err: any) {
      setAllowedEmailsError(err.message || 'Failed to revoke email authorization.');
    } finally {
      setDeleteAllowedEmailLoading(null);
    }
  };

  const handleSaveCareers = async (e?: React.FormEvent, statusOverride?: 'published' | 'draft') => {
    if (e && e.preventDefault) e.preventDefault();
    const finalStatus = statusOverride || careersStatus;
    try {
      setCareersSaveError('');
      setCareersSaveSuccess('');
      const careersData = {
        heroTitle: careersHeroTitle.trim(),
        heroDescription: careersHeroDescription.trim(),
        heroImage: careersHeroImage,
        cultureSec1Title: careersCultureSec1Title.trim(),
        cultureSec1Paragraph1: careersCultureSec1Paragraph1.trim(),
        cultureSec1Paragraph2: careersCultureSec1Paragraph2.trim(),
        cultureSec2Title: careersCultureSec2Title.trim(),
        cultureSec2Paragraph1: careersCultureSec2Paragraph1.trim(),
        cultureSec2Paragraph2: careersCultureSec2Paragraph2.trim(),
        marqueeImages: JSON.stringify(careersMarqueeImages),
        status: finalStatus
      };

      await apiClient.careers.updateContent(JSON.stringify(careersData));
      setCareersStatus(finalStatus);
      setCareersSaveSuccess(finalStatus === 'draft' ? 'Careers page saved as draft successfully!' : 'Careers page content published successfully!');
    } catch (err: any) {
      setCareersSaveError(err.message || 'Failed to update Careers page content.');
    }
  };

  const handleCareersImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetType: 'hero' | 'marquee', index?: number) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    try {
      setIsUploadingCareersImage(true);
      setCareersSaveError('');
      
      const compressedFile = await compressImage(file);
      const formData = new FormData();
      formData.append('image', compressedFile);
      
      const res = await apiClient.careers.uploadImage(formData);
      
      if (targetType === 'hero') {
        setCareersHeroImage(res.imageUrl);
      } else if (targetType === 'marquee') {
        if (index !== undefined) {
          const updated = [...careersMarqueeImages];
          updated[index] = res.imageUrl;
          setCareersMarqueeImages(updated);
        } else {
          setCareersMarqueeImages(prev => [...prev, res.imageUrl]);
        }
      }
    } catch (err: any) {
      setCareersSaveError(err.message || 'Failed to upload image.');
    } finally {
      setIsUploadingCareersImage(false);
    }
  };

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setAboutSaveError('');
      setAboutSaveSuccess('');
      const aboutData = {
        heroTitle: aboutHeroTitle.trim(),
        heroDescription: aboutHeroDescription.trim(),
        commitmentImage: aboutCommitmentImage,
        commitmentTitle: aboutCommitmentTitle.trim(),
        commitmentParagraphs: JSON.stringify(aboutCommitmentParagraphs),
        values: JSON.stringify(aboutValues),
        partners: JSON.stringify(aboutPartners)
      };

      await apiClient.about.update(JSON.stringify(aboutData));
      setAboutSaveSuccess('About Us page content updated successfully!');
    } catch (err: any) {
      setAboutSaveError(err.message || 'Failed to update About Us content.');
    }
  };

  const handleAboutImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetType: 'commitment' | 'value' | 'partner', index?: number) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    try {
      setIsUploadingAboutImage(true);
      setAboutSaveError('');
      
      const compressedFile = await compressImage(file);
      const formData = new FormData();
      formData.append('image', compressedFile);
      
      const res = await apiClient.about.uploadImage(formData);
      
      if (targetType === 'commitment') {
        setAboutCommitmentImage(res.imageUrl);
      } else if (targetType === 'value' && index !== undefined) {
        const updated = [...aboutValues];
        updated[index].icon = res.imageUrl;
        setAboutValues(updated);
      } else if (targetType === 'partner' && index !== undefined) {
        const updated = [...aboutPartners];
        updated[index].image = res.imageUrl;
        setAboutPartners(updated);
      }
    } catch (err: any) {
      setAboutSaveError(err.message || 'Failed to upload image.');
    } finally {
      setIsUploadingAboutImage(false);
    }
  };

  const handleServiceImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
     if (!e.target.files || e.target.files.length === 0) return;
     const file = e.target.files[0];
 
     try {
       setIsUploadingImage(true);
       setServiceSaveError('');
       
       const compressedFile = await compressImage(file);
       const formData = new FormData();
       formData.append('image', compressedFile);
       
       const res = await apiClient.services.uploadImage(formData);
       setServiceImage(res.imageUrl);
     } catch (err: any) {
       setServiceSaveError(err.message || 'Failed to upload banner image.');
     } finally {
       setIsUploadingImage(false);
     }
   };

  const startNewService = () => {
    setEditingServiceId(null);
    setServiceTitle('');
    setServiceSlug('');
    setServiceDescription('');
    setServiceImage('');
    setServicePageTitle('');
    setServiceIntro('');
    setServiceWhyTitle('');
    setServiceWhySubtitle('');
    setServiceSections([]);
    setServiceWhyCards([]);
    setServiceSaveError('');
    setServiceSaveSuccess('');
    setServiceStatus('published');
    setIsServiceEditing(true);
  };

  const editService = (service: any) => {
    setEditingServiceId(service._id || service.id);
    setServiceTitle(service.title || '');
    setServiceSlug(service.slug || '');
    setServiceDescription(service.description || '');
    setServiceImage(service.image || '');
    setServicePageTitle(service.pageTitle || '');
    setServiceIntro(service.intro || '');
    setServiceWhyTitle(service.whyTitle || '');
    setServiceWhySubtitle(service.whySubtitle || '');
    setServiceStatus(service.status || 'published');
    
    const processedSections = (service.sections || []).map((sec: any) => ({
      heading: sec.heading || '',
      description: sec.description || '',
      body: Array.isArray(sec.body) ? sec.body.join('\n') : sec.body || ''
    }));
    setServiceSections(processedSections);
    
    setServiceWhyCards(service.whyCards || []);
    setServiceSaveError('');
    setServiceSaveSuccess('');
    setIsServiceEditing(true);
  };

  const handleSaveService = async (e?: React.FormEvent, statusOverride?: 'published' | 'draft') => {
    if (e && e.preventDefault) e.preventDefault();
    
    const finalStatus = statusOverride || serviceStatus;

    if (!serviceTitle.trim() || !serviceSlug.trim()) {
      setServiceSaveError('Title and Slug are required.');
      return;
    }

    try {
      setServiceSaveError('');
      setServiceSaveSuccess('');
      
      const processedSections = serviceSections.map(sec => ({
        heading: sec.heading.trim(),
        description: sec.description.trim(),
        body: sec.body.includes('\n') ? sec.body.split('\n').map((b: string) => b.trim()).filter(Boolean) : sec.body.trim()
      }));

      const serviceData = {
        title: serviceTitle.trim(),
        slug: serviceSlug.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-'),
        description: serviceDescription.trim(),
        image: serviceImage,
        pageTitle: servicePageTitle.trim(),
        intro: serviceIntro.trim(),
        whyTitle: serviceWhyTitle.trim(),
        whySubtitle: serviceWhySubtitle.trim(),
        sections: JSON.stringify(processedSections),
        whyCards: JSON.stringify(serviceWhyCards),
        status: finalStatus
      };

      if (editingServiceId) {
        await apiClient.services.update(editingServiceId, JSON.stringify(serviceData));
        setServiceSaveSuccess(finalStatus === 'draft' ? 'Service saved as draft successfully!' : 'Service updated and published successfully!');
      } else {
        await apiClient.services.create(JSON.stringify(serviceData));
        setServiceSaveSuccess(finalStatus === 'draft' ? 'Service created as draft successfully!' : 'Service created and published successfully!');
      }

      setIsServiceEditing(false);
      await loadServices();
    } catch (err: any) {
      setServiceSaveError(err.message || 'Failed to save service.');
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Are you sure you want to remove this service? This will delete the service and its associated image permanently.')) return;
    try {
      await apiClient.services.delete(id);
      await loadServices();
    } catch (err: any) {
      alert(err.message || 'Failed to delete service.');
    }
  };

  const calculateStats = (appList: any[]) => {

    const total = appList.length;

    // Recent in last 24h
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    const recent24h = appList.filter((a: any) => {
      const dateStr = a.createdAt || a.created_at;
      return dateStr && new Date(dateStr).getTime() > oneDayAgo;
    }).length;

    const depts = new Set(appList.map((a: any) => a.jobDepartment || a.job_department).filter(Boolean)).size;
    const citiesCount = new Set(appList.map((a: any) => a.jobCity || a.job_city).filter(Boolean)).size;

    setStats({
      total,
      recent24h,
      uniqueDepts: depts,
      uniqueCities: citiesCount
    });
  };

  // Perform search, filtering, and sorting
  useEffect(() => {
    let filtered = [...applications];

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(a => 
        (a.name && a.name.toLowerCase().includes(q)) ||
        (a.email && a.email.toLowerCase().includes(q)) ||
        (a.education && a.education.toLowerCase().includes(q)) ||
        (a.currentCompany && a.currentCompany.toLowerCase().includes(q)) ||
        (a.current_company && a.current_company.toLowerCase().includes(q)) ||
        (a.phone && a.phone.includes(q))
      );
    }

    // Department match
    if (selectedDept) {
      filtered = filtered.filter(a => (a.jobDepartment || a.job_department) === selectedDept);
    }

    // Position match
    if (selectedPos) {
      filtered = filtered.filter(a => (a.jobPosition || a.job_position) === selectedPos);
    }

    // City match
    if (selectedCity) {
      filtered = filtered.filter(a => (a.jobCity || a.job_city) === selectedCity);
    }

    // Experience match
    if (selectedExp) {
      filtered = filtered.filter(a => String(a.experience) === String(selectedExp));
    }

    // Apply Sorting
    filtered.sort((a, b) => {
      let valA = a[sortField] || '';
      let valB = b[sortField] || '';

      // Fallbacks
      if (sortField === 'status') {
        const idA = a.id || a._id;
        const idB = b.id || b._id;
        valA = localStorage.getItem(`mrnp_status_${idA}`) || 'Pending';
        valB = localStorage.getItem(`mrnp_status_${idB}`) || 'Pending';
      }

      if (sortField === 'jobDepartment') {
        valA = a.jobDepartment || a.job_department || '';
        valB = b.jobDepartment || b.job_department || '';
      }

      if (sortField === 'jobPosition') {
        valA = a.jobPosition || a.job_position || '';
        valB = b.jobPosition || b.job_position || '';
      }

      if (sortField === 'experience') {
        valA = Number(a.experience) || 0;
        valB = Number(b.experience) || 0;
      }

      if (sortField === 'createdAt') {
        valA = new Date(a.createdAt || a.created_at || 0).getTime();
        valB = new Date(b.createdAt || b.created_at || 0).getTime();
      }

      if (typeof valA === 'string') {
        return sortOrder === 'asc' 
          ? valA.localeCompare(valB as string) 
          : (valB as string).localeCompare(valA);
      } else {
        return sortOrder === 'asc' 
          ? (valA as number) - (valB as number) 
          : (valB as number) - (valA as number);
      }
    });

    setFilteredApps(filtered);
    setCurrentPage(1); // Reset to first page when filtering/sorting changes
  }, [searchQuery, selectedDept, selectedPos, selectedCity, selectedExp, applications, sortField, sortOrder]);

  // Open Details Modal and fetch status/notes + email history
  const openAppDetails = async (app: any) => {
    setSelectedApp(app);
    const appId = app.id || app._id;
    const savedStatus = localStorage.getItem(`mrnp_status_${appId}`);
    const savedNotes = localStorage.getItem(`mrnp_notes_${appId}`);
    setAdminStatus((savedStatus as any) || 'Pending');
    setAdminNotes(savedNotes || '');

    // Fetch Email correspondence history for this candidate
    try {
      const response = await apiClient.emails.getHistory(appId);
      setEmailHistory(response.emailLogs || []);
    } catch (err) {
      console.error('Failed to load email logs', err);
      setEmailHistory([]);
    }
  };

  // Persist status/notes modifications in local storage
  const saveAdminData = () => {
    if (!selectedApp) return;
    const appId = selectedApp.id || selectedApp._id;
    localStorage.setItem(`mrnp_status_${appId}`, adminStatus);
    localStorage.setItem(`mrnp_notes_${appId}`, adminNotes);
    
    // Update active applications list local statuses
    const updated = applications.map(a => {
      if ((a.id || a._id) === appId) {
        return { ...a, localStatus: adminStatus };
      }
      return a;
    });
    setApplications(updated);
    
    // Close modal
    setSelectedApp(null);
  };

  // Manage Openings functions
  const loadJobs = async () => {
    try {
      setJobsListLoading(true);
      setJobsListError('');
      const response = await apiClient.jobs.getAll();
      setJobsList(response.jobs || []);
    } catch (err: any) {
      setJobsListError(err.message || 'Failed to load job openings.');
    } finally {
      setJobsListLoading(false);
    }
  };

  const resetJobForm = () => {
    setNewJobDept('');
    setNewJobPosition('');
    setNewJobCity('');
    setNewJobState('');
    setNewJobDescription('');
    setNewJobRequirements('');
    setJobPostError('');
    setJobPostSuccess('');
  };

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobDept.trim() || !newJobPosition.trim() || !newJobCity.trim() || !newJobState.trim()) {
      setJobPostError('Department, Position, City, and State are required.');
      return;
    }
    try {
      setJobPosting(true);
      setJobPostError('');
      setJobPostSuccess('');
      const requirementsArray = newJobRequirements
        .split('\n')
        .map(r => r.trim())
        .filter(Boolean);
      await apiClient.jobs.create({
        department: newJobDept.trim(),
        position: newJobPosition.trim(),
        city: newJobCity.trim(),
        state: newJobState.trim(),
        description: newJobDescription.trim(),
        requirements: requirementsArray,
      });
      setJobPostSuccess('Job opening published successfully!');
      resetJobForm();
      await loadJobs();
    } catch (err: any) {
      setJobPostError(err.message || 'Failed to post job opening.');
    } finally {
      setJobPosting(false);
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm('Are you sure you want to remove this job opening? This cannot be undone.')) return;
    try {
      setDeletingJobId(id);
      await apiClient.jobs.delete(id);
      setJobsList(prev => prev.filter(j => (j._id || j.id) !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete job opening.');
    } finally {
      setDeletingJobId(null);
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDept('');
    setSelectedPos('');
    setSelectedCity('');
    setSelectedExp('');
  };

  const handleLogout = () => {
    authService.removeToken();
    router.push('/');
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError('');

    try {
      const response = await apiClient.user.updateProfile({
        name: profileName,
        email: profileEmail,
        designation: profileDesignation,
        icaiMembership: profileIcaiMembership,
        memberSince: profileMemberSince,
        officeBranch: profileOfficeBranch,
        phone: profilePhone,
        linkedin: profileLinkedin,
        location: profileLocation,
        badge: profileBadge,
        teamAssigned: profileTeamAssigned,
        joinedFirm: profileJoinedFirm
      });

      const u = response.user;
      setUser(u);
      setProfileName(u.name || '');
      setProfileEmail(u.email || '');
      setProfileDesignation(u.designation || 'Founding Partner');
      setProfileIcaiMembership(u.icaiMembership || '124567');
      setProfileMemberSince(u.memberSince || 'March 2004');
      setProfileOfficeBranch(u.officeBranch || 'Mumbai - HQ');
      setProfilePhone(u.phone || '+91 98200 00001');
      setProfileLinkedin(u.linkedin || 'https://linkedin.com');
      setProfileLocation(u.location || 'Mumbai, MH');
      setProfileBadge(u.badge || 'FCA');
      setProfileTeamAssigned(u.teamAssigned || 'Audit team · Tax team');
      setProfileJoinedFirm(u.joinedFirm || '1 April 2002');

      setEditing(false);
    } catch (err: any) {
      setProfileError(err.message || 'Failed to update profile information.');
    }
  };

  // CSV exporting helpers
  const exportToCSV = (customRows?: any[], filenameSuffix?: string) => {
    const headers = [
      'ID',
      'Name',
      'Email',
      'Phone',
      'Education',
      'Current Company',
      'Experience',
      'Job Department',
      'Job Position',
      'Job City',
      'Status',
      'Admin Notes',
      'Submitted At'
    ];

    const escapeCSV = (val: any) => {
      if (val === null || val === undefined) return '';
      const stringVal = String(val);
      if (stringVal.includes(',') || stringVal.includes('"') || stringVal.includes('\n') || stringVal.includes('\r')) {
        return `"${stringVal.replace(/"/g, '""')}"`;
      }
      return stringVal;
    };

    const targetList = customRows || filteredApps;

    const rows = targetList.map(a => {
      const appId = a.id || a._id;
      const status = localStorage.getItem(`mrnp_status_${appId}`) || 'Pending';
      const notes = localStorage.getItem(`mrnp_notes_${appId}`) || '';
      return [
        appId,
        a.name,
        a.email,
        a.phone,
        a.education,
        a.currentCompany || a.current_company || '',
        a.experience,
        a.jobDepartment || a.job_department,
        a.jobPosition || a.job_position,
        a.jobCity || a.job_city,
        status,
        notes,
        a.createdAt || a.created_at ? new Date(a.createdAt || a.created_at).toISOString() : ''
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(escapeCSV).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `mrnp_job_applications_${filenameSuffix || new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Shortlisted':
        return 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50';
      case 'Rejected':
        return 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50';
      case 'Under Review':
        return 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50';
      default:
        return 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50';
    }
  };

  // Helper to build resume full links
  const getResumeUrl = (resumePath: string) => {
    if (!resumePath) return '#';
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace('/api', '');
    return `${baseUrl}${resumePath}`;
  };

  // Sorting Handler
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Checkbox row selections
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const pageItemIds = paginatedApps.map(a => a.id || a._id);
      setSelectedAppIds(prev => Array.from(new Set([...prev, ...pageItemIds])));
    } else {
      const pageItemIds = paginatedApps.map(a => a.id || a._id);
      setSelectedAppIds(prev => prev.filter(id => !pageItemIds.includes(id)));
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedAppIds(prev => [...prev, id]);
    } else {
      setSelectedAppIds(prev => prev.filter(item => item !== id));
    }
  };

  // Bulk options operations
  const handleBulkDelete = () => {
    if (selectedAppIds.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedAppIds.length} candidate applications? This is a simulation and will remove them from the active display list.`)) return;

    // Simulate bulk deletion in local state
    const remainingApps = applications.filter(a => !selectedAppIds.includes(a.id || a._id));
    setApplications(remainingApps);
    setSelectedAppIds([]);
    alert('Simulated bulk deletion complete.');
  };

  const handleBulkExport = () => {
    const selectedApps = applications.filter(a => selectedAppIds.includes(a.id || a._id));
    exportToCSV(selectedApps, 'bulk_selected');
  };

  // Email Automation: Loading template structure on selection change
  useEffect(() => {
    if (!selectedApp) return;
    const name = selectedApp.name || 'Candidate';
    const position = selectedApp.jobPosition || selectedApp.job_position || 'Open Role';

    if (emailTemplate === 'interview') {
      setEmailSubject(`Interview Schedule Request: MRNP & Co. - ${position}`);
      setEmailBody(`Dear ${name},

Thank you for your interest in the ${position} position at MRNP & Co.

We were highly impressed with your academic profile and professional qualifications. We would love to invite you for an initial round of technical interview via Google Meet.

Please let us know your availability during this week (Monday to Friday between 10:00 AM and 5:00 PM).

Warm regards,
MRNP Hiring Operations`);
    } else if (emailTemplate === 'rejection') {
      setEmailSubject(`Application Status Update: MRNP & Co. - ${position}`);
      setEmailBody(`Dear ${name},

Thank you for taking the time to discuss the ${position} role with us at MRNP & Co.

We appreciate the effort and dedication you put into submitting your application. We had many qualified candidates apply, and after careful assessment, we regret to inform you that we will not be moving forward with your application at this time.

We will keep your resume in our database for future active openings that may fit your background.

We wish you the very best in your search.

Sincerely,
MRNP Talent Team`);
    } else if (emailTemplate === 'offer') {
      setEmailSubject(`Job Offer: ${position} at MRNP & Co. - Congratulations!`);
      setEmailBody(`Dear ${name},

We are absolutely delighted to offer you the position of ${position} with MRNP & Co.!

Your strong capabilities and experience make you an ideal addition to our premium professional advisory team. 

Please find attached an official outline of your job responsibilities, compensation structure, and start date variables. We'd appreciate it if you could confirm your acceptance by replying to this email within the next 48 hours.

We are excited about the prospect of welcoming you to the MRNP family.

With warm regards,
MRNP Managing Partners`);
    }
  }, [emailTemplate, selectedApp]);

  // Submit automated email sending to backend
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;
    const appId = selectedApp.id || selectedApp._id;

    try {
      setSendingEmail(true);
      setEmailSuccessMessage('');
      setEmailErrorMessage('');

      const response = await apiClient.emails.send({
        applicantId: appId,
        recipientEmail: selectedApp.email,
        subject: emailSubject,
        body: emailBody,
        type: emailTemplate
      });

      setEmailSuccessMessage('Email dispatched successfully! View history below.');
      
      // Add local status shifting based on email selection
      let newStatus = adminStatus;
      if (emailTemplate === 'interview') newStatus = 'Under Review';
      if (emailTemplate === 'rejection') newStatus = 'Rejected';
      if (emailTemplate === 'offer') newStatus = 'Shortlisted';
      setAdminStatus(newStatus);
      localStorage.setItem(`mrnp_status_${appId}`, newStatus);

      // Refresh applications local list state
      const updated = applications.map(a => {
        if ((a.id || a._id) === appId) {
          return { ...a, localStatus: newStatus };
        }
        return a;
      });
      setApplications(updated);

      // Reload communication history
      const historyResponse = await apiClient.emails.getHistory(appId);
      setEmailHistory(historyResponse.emailLogs || []);
      
      setShowEmailModal(false);
    } catch (err: any) {
      setEmailErrorMessage(err.message || 'Failed to send automated email.');
    } finally {
      setSendingEmail(false);
    }
  };

  // Pagination indexing calculations
  const totalPages = Math.ceil(filteredApps.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedApps = filteredApps.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground transition-all duration-300">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primaryBlue"></div>
          <p className="font-forum tracking-widest text-lg animate-pulse">MRNP SECURITY CONTEXT...</p>
        </div>
      </div>
    );
  }

  // Aggregate stats for custom charts
  const deptCounts = applications.reduce((acc: any, curr: any) => {
    const dept = curr.jobDepartment || curr.job_department || 'Other';
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {});

  const experienceDistribution = applications.reduce((acc: any, curr: any) => {
    const exp = Number(curr.experience) || 0;
    if (exp === 0) acc['Fresher'] = (acc['Fresher'] || 0) + 1;
    else if (exp > 0 && exp <= 3) acc['1-3 Years'] = (acc['1-3 Years'] || 0) + 1;
    else if (exp > 3 && exp <= 5) acc['3-5 Years'] = (acc['3-5 Years'] || 0) + 1;
    else acc['5+ Years'] = (acc['5+ Years'] || 0) + 1;
    return acc;
  }, { 'Fresher': 0, '1-3 Years': 0, '3-5 Years': 0, '5+ Years': 0 });

  // Dummy monthly / weekly trend generation incorporating live stats
  const hiringTrendData = [
    { label: 'Mon', count: Math.ceil(stats.total * 0.1) || 1 },
    { label: 'Tue', count: Math.ceil(stats.total * 0.15) || 2 },
    { label: 'Wed', count: Math.ceil(stats.total * 0.2) || 3 },
    { label: 'Thu', count: Math.ceil(stats.total * 0.12) || 1 },
    { label: 'Fri', count: Math.ceil(stats.total * 0.23) || 4 },
    { label: 'Sat', count: Math.ceil(stats.total * 0.08) || 1 },
    { label: 'Sun', count: stats.recent24h || 1 }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row antialiased transition-all duration-300">
      
      {/* Mobile Top Navbar with collapse burger */}
      <header className="md:hidden flex justify-between items-center p-4 bg-cardBg border-b border-borderCustom shadow-sm z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primaryBlue text-white flex items-center justify-center font-forum text-base font-bold shadow-md shadow-[#061143]/20">
            M
          </div>
          <div>
            <h2 className="font-forum text-sm tracking-wider font-bold">MRNP & Co.</h2>
            <span className="text-[8px] uppercase tracking-widest text-slate-500 font-semibold block">Admin Workspace</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setActiveTab('notifications'); setIsMobileOpen(false); }}
            className="relative p-2 rounded-lg bg-background hover:bg-slate-100 dark:hover:bg-slate-800 transition text-foreground cursor-pointer"
            title="Notifications"
          >
            <Bell size={18} />
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse"></span>
            )}
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-background hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} className="text-amber-400" />}
          </button>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 rounded-lg bg-background hover:bg-slate-100 dark:hover:bg-slate-800 transition text-foreground"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>


      {/* Side-menu Navigation panel */}
      <aside 
        className={`fixed inset-y-0 left-0 transform ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } md:sticky md:top-0 md:h-screen md:overflow-y-auto md:translate-x-0 z-40 w-72 bg-cardBg border-r border-borderCustom p-6 flex flex-col justify-between shrink-0 transition-transform duration-300 ease-in-out`}
      >
        <div>
          {/* Sidebar Logo Header */}
          <div className="hidden md:flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primaryBlue flex items-center justify-center shadow-lg shadow-[#061143]/25 font-forum text-xl font-bold tracking-widest text-white transition-all duration-300">
                M
              </div>
              <div>
                <h2 className="font-forum text-lg tracking-wider font-bold">MRNP & Co.</h2>
                <span className="text-[10px] uppercase text-slate-500 tracking-widest font-semibold block font-mono">Workspace Shell</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('notifications')}
                className="relative p-2 rounded-lg bg-background hover:bg-slate-100 dark:hover:bg-slate-800 border border-borderCustom text-foreground hover:scale-105 transition-all duration-300 cursor-pointer"
                title="Notifications"
              >
                <Bell size={16} />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full border border-cardBg animate-pulse"></span>
                )}
              </button>

              {/* Dark mode switcher in sidebar */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-background hover:bg-slate-100 dark:hover:bg-slate-800 border border-borderCustom text-foreground hover:scale-105 transition-all duration-300"
                title={theme === 'light' ? 'Enable Dark Mode' : 'Enable Light Mode'}
              >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} className="text-amber-400" />}
              </button>
            </div>

          </div>

          {/* Logged in User Profile Info Summary */}
          <div className="mb-6 p-4 rounded-xl bg-background/50 border border-borderCustom flex items-center gap-3 shadow-inner">
            <div className="w-10 h-10 rounded-full bg-primaryBlue flex items-center justify-center text-white font-bold uppercase shadow-sm">
              {user?.name?.substring(0, 2) || 'AD'}
            </div>
            <div className="overflow-hidden">
              <h3 className="font-bold text-xs truncate">{user?.name}</h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>

          {/* Navigation Items list */}
          <nav className="space-y-1.5">
            <button
              onClick={() => { setActiveTab('analytics'); setIsMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-primaryBlue text-white shadow-md shadow-[#061143]/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-primaryBlue hover:bg-background/80'
              }`}
            >
              <TrendingUp size={18} />
              Analytics Dashboard
            </button>

            <button
              onClick={() => { setActiveTab('jobs'); loadJobs(); loadApplications(); setIsMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'jobs'
                  ? 'bg-primaryBlue text-white shadow-md shadow-[#061143]/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-primaryBlue hover:bg-background/80'
              }`}
            >
              <Users size={18} />
              Manage Jobs & Applications
              {jobsList.length > 0 && (
                <span className="ml-auto bg-primaryBlue/10 dark:bg-slate-800 text-primaryBlue text-[10px] font-bold px-2 py-0.5 rounded-full border border-primaryBlue/20">
                  {jobsList.length}
                </span>
              )}
            </button>

            <button
              onClick={() => { setActiveTab('services'); loadServices(); setIsMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-primaryBlue text-white shadow-md shadow-[#061143]/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-primaryBlue hover:bg-background/80'
              }`}
            >
              <LayoutGrid size={18} />
              Manage Services
              {servicesList.length > 0 && (
                <span className="ml-auto bg-primaryBlue/10 dark:bg-slate-800 text-primaryBlue text-[10px] font-bold px-2 py-0.5 rounded-full border border-primaryBlue/20">
                  {servicesList.length}
                </span>
              )}
            </button>

            <button
              onClick={() => { setActiveTab('about'); loadAbout(); setIsMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'about'
                  ? 'bg-primaryBlue text-white shadow-md shadow-[#061143]/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-primaryBlue hover:bg-background/80'
              }`}
            >
              <Users size={18} />
              Manage About Us
            </button>

            <button
              onClick={() => { setActiveTab('careers'); loadCareers(); setIsMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'careers'
                  ? 'bg-primaryBlue text-white shadow-md shadow-[#061143]/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-primaryBlue hover:bg-background/80'
              }`}
            >
              <Briefcase size={18} />
              Manage Careers Page
            </button>


            <button
              onClick={() => { setActiveTab('interviews'); loadInterviews(); setIsMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'interviews'
                  ? 'bg-primaryBlue text-white shadow-md shadow-[#061143]/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-primaryBlue hover:bg-background/80'
              }`}
            >
              <Calendar size={18} />
              Interview Scheduler
            </button>

            <button
              onClick={() => { setActiveTab('notifications'); loadNotifications(); setIsMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'notifications'
                  ? 'bg-primaryBlue text-white shadow-md shadow-[#061143]/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-primaryBlue hover:bg-background/80'
              }`}
            >
              <Bell size={18} />
              Notifications & Logs
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="ml-auto bg-primaryBlue/10 dark:bg-slate-800 text-primaryBlue text-[10px] font-bold px-2 py-0.5 rounded-full border border-primaryBlue/20">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>

            <button
              onClick={() => { setActiveTab('profile'); loadAllowedEmails(); setIsMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-primaryBlue text-white shadow-md shadow-[#061143]/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-primaryBlue hover:bg-background/80'
              }`}
            >
              <Users size={18} />
              Account Profile
            </button>

          </nav>
        </div>

        {/* Sidebar Footer Logout */}
        <button
          onClick={handleLogout}
          className="mt-8 flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/20 border border-transparent hover:border-rose-100 dark:hover:border-rose-900/30 transition-all duration-200 cursor-pointer"
        >
          <X size={18} />
          System Logout
        </button>
      </aside>

      {/* Screen Backdrop for Mobile Navigation toggled */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
        ></div>
      )}

      {/* Main Workspace Frame container */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full transition-all duration-300">
        
        {activeTab === 'careers' ? (
          /* ========== CAREERS CONTENT MANAGEMENT TAB ========== */
          <div>
            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-forum font-bold tracking-wide text-primaryBlue dark:text-white">Manage Careers Page</h1>
                <p className="text-xs md:text-sm text-slate-500 mt-1 dark:text-slate-400">Directly manage, edit text content, hero image, and marquee gallery for the Careers (Life@mrnp) page.</p>
              </div>
              <button
                type="button"
                onClick={loadCareers}
                className="bg-cardBg hover:bg-background text-foreground font-semibold text-xs py-2.5 px-4 rounded-lg border border-borderCustom shadow-sm flex items-center gap-2 self-start cursor-pointer hover:border-primaryBlue/30 transition animate-all duration-300"
              >
                <Plus size={14} />
                Refresh Content
              </button>
            </div>

            {careersLoading ? (
              <div className="p-12 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primaryBlue mx-auto mb-3"></div>
                <p className="text-slate-400 text-xs">Querying database Careers page content...</p>
              </div>
            ) : careersError ? (
              <div className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 text-rose-700 text-xs rounded-lg">{careersError}</div>
            ) : (
              <form onSubmit={handleSaveCareers} className="bg-cardBg border border-borderCustom rounded-xl p-6 shadow-sm space-y-6">
                <div className="flex justify-between items-center border-b border-borderCustom pb-4">
                  <h2 className="text-lg font-forum font-bold text-primaryBlue dark:text-white flex items-center gap-2">
                    <Plus size={18} />
                    Edit Careers Page Content
                  </h2>
                  <span className={`px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded shadow-sm text-white font-instrument ${
                    careersStatus === 'draft' ? 'bg-amber-500' : 'bg-emerald-600'
                  }`}>
                    {careersStatus}
                  </span>
                </div>

                {careersSaveError && (
                  <div className="p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 text-rose-700 text-xs rounded-lg">{careersSaveError}</div>
                )}

                {careersSaveSuccess && (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 text-emerald-700 text-xs rounded-lg">{careersSaveSuccess}</div>
                )}

                {/* Section 1: Hero Section */}
                <div className="bg-background/20 p-5 rounded-xl border border-borderCustom/60 space-y-4">
                  <h3 className="font-forum text-base font-bold text-primaryBlue dark:text-white">1. Hero Header Section</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-instrument">
                    {/* Image Upload */}
                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1.5">Hero Background Image</label>
                      <div className="border border-dashed border-borderCustom rounded-xl p-4 bg-background/40 flex flex-col items-center justify-center text-center relative overflow-hidden h-[180px] group">
                        {isUploadingCareersImage ? (
                          <div className="flex flex-col items-center gap-2">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primaryBlue"></div>
                            <p className="text-[10px] text-slate-400">Uploading...</p>
                          </div>
                        ) : careersHeroImage ? (
                          <>
                            <img src={getImageUrl(careersHeroImage)} alt="Careers Hero" className="object-cover w-full h-full absolute inset-0" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <label className="bg-white/95 text-primaryBlue px-3 py-1.5 rounded-full text-[10px] font-bold cursor-pointer hover:scale-105 transition shadow">
                                Change Image
                                <input type="file" onChange={e => handleCareersImageUpload(e, 'hero')} className="hidden" accept="image/*" />
                              </label>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center gap-2.5">
                            <LayoutGrid size={32} className="text-slate-400 stroke-[1.25]" />
                            <div>
                              <label className="text-primaryBlue hover:underline text-xs font-bold cursor-pointer">
                                Upload image
                                <input type="file" onChange={e => handleCareersImageUpload(e, 'hero')} className="hidden" accept="image/*" />
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Text Fields */}
                    <div className="lg:col-span-2 space-y-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1.5">Hero Title *</label>
                        <input
                          type="text"
                          value={careersHeroTitle}
                          onChange={e => setCareersHeroTitle(e.target.value)}
                          placeholder="e.g. Join Our Team"
                          className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400 font-semibold"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1.5">Hero Subtitle / Description *</label>
                        <textarea
                          rows={3}
                          value={careersHeroDescription}
                          onChange={e => setCareersHeroDescription(e.target.value)}
                          placeholder="Students, recent graduates, seasoned professionals..."
                          className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400 resize-none leading-relaxed"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Culture Section 1 */}
                <div className="bg-background/20 p-5 rounded-xl border border-borderCustom/60 space-y-4">
                  <h3 className="font-forum text-base font-bold text-primaryBlue dark:text-white">2. Culture Section 1: Innovative Collaboration</h3>
                  <div className="grid grid-cols-1 gap-4 font-instrument">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1.5">Section Title *</label>
                      <input
                        type="text"
                        value={careersCultureSec1Title}
                        onChange={e => setCareersCultureSec1Title(e.target.value)}
                        placeholder="e.g. Innovative Collaboration & Dynamic Team Culture"
                        className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400 font-semibold"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1.5">Paragraph 1 *</label>
                        <textarea
                          rows={4}
                          value={careersCultureSec1Paragraph1}
                          onChange={e => setCareersCultureSec1Paragraph1(e.target.value)}
                          placeholder="At MRNP, our environment fosters..."
                          className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400 resize-none leading-relaxed"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1.5">Paragraph 2 *</label>
                        <textarea
                          rows={4}
                          value={careersCultureSec1Paragraph2}
                          onChange={e => setCareersCultureSec1Paragraph2(e.target.value)}
                          placeholder="Our organization values..."
                          className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400 resize-none leading-relaxed"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Culture Section 2 */}
                <div className="bg-background/20 p-5 rounded-xl border border-borderCustom/60 space-y-4">
                  <h3 className="font-forum text-base font-bold text-primaryBlue dark:text-white">3. Culture Section 2: Culture of Excellence</h3>
                  <div className="grid grid-cols-1 gap-4 font-instrument">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1.5">Section Title *</label>
                      <input
                        type="text"
                        value={careersCultureSec2Title}
                        onChange={e => setCareersCultureSec2Title(e.target.value)}
                        placeholder="e.g. Culture of Excellence"
                        className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400 font-semibold"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1.5">Paragraph 1 *</label>
                        <textarea
                          rows={4}
                          value={careersCultureSec2Paragraph1}
                          onChange={e => setCareersCultureSec2Paragraph1(e.target.value)}
                          placeholder="At MRNP, our culture is defined..."
                          className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400 resize-none leading-relaxed"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1.5">Paragraph 2 *</label>
                        <textarea
                          rows={4}
                          value={careersCultureSec2Paragraph2}
                          onChange={e => setCareersCultureSec2Paragraph2(e.target.value)}
                          placeholder="We value individuals who challenge..."
                          className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400 resize-none leading-relaxed"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 4: Marquee Images Gallery */}
                <div className="bg-background/20 p-5 rounded-xl border border-borderCustom/60 space-y-4 font-instrument">
                  <div className="flex justify-between items-center">
                    <h3 className="font-forum text-base font-bold text-primaryBlue dark:text-white">4. Marquee Carousel Gallery</h3>
                    <div>
                      <label className="px-3 py-1.5 bg-primaryBlue hover:opacity-90 text-white text-[11px] font-bold rounded-lg transition cursor-pointer flex items-center gap-1">
                        <Plus size={12} />
                        Add Image
                        <input type="file" onChange={e => handleCareersImageUpload(e, 'marquee')} className="hidden" accept="image/*" />
                      </label>
                    </div>
                  </div>

                  {careersMarqueeImages.length === 0 ? (
                    <div className="p-8 text-center border border-borderCustom border-dashed rounded-xl text-slate-400 text-xs">
                      No marquee images defined. Click "Add Image" to build the carousel gallery.
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {careersMarqueeImages.map((img, idx) => (
                        <div key={idx} className="bg-background/30 border border-borderCustom p-2 rounded-xl relative group overflow-hidden h-[120px]">
                          <img src={getImageUrl(img)} alt={`Marquee ${idx}`} className="w-full h-full object-cover rounded-lg" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                            <label className="cursor-pointer text-[9px] text-primaryBlue font-bold px-2 py-1 bg-white rounded shadow hover:scale-105 transition">
                              Change
                              <input type="file" onChange={e => handleCareersImageUpload(e, 'marquee', idx)} className="hidden" accept="image/*" />
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...careersMarqueeImages];
                                updated.splice(idx, 1);
                                setCareersMarqueeImages(updated);
                              }}
                              className="text-[9px] text-rose-600 font-bold px-2 py-1 bg-white rounded shadow hover:scale-105 transition cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Save and Publish bottom row */}
                <div className="border-t border-borderCustom/60 pt-5 flex justify-end gap-3 font-instrument">
                  <button
                    type="button"
                    onClick={() => handleSaveCareers(undefined, 'draft')}
                    className="px-6 py-2.5 border border-amber-300 dark:border-amber-700/60 bg-amber-50 dark:bg-amber-950/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold rounded-full transition cursor-pointer flex items-center gap-1.5"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSaveCareers(undefined, 'published')}
                    className="px-8 py-2.5 bg-primaryBlue hover:bg-primaryBlue/90 text-white text-xs font-bold rounded-full shadow-md shadow-[#061143]/15 transition cursor-pointer flex items-center gap-1.5"
                  >
                    Publish
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : activeTab === 'about' ? (
          /* ========== ABOUT US MANAGEMENT TAB ========== */
          <div>
            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-forum font-bold tracking-wide text-primaryBlue dark:text-white">Manage About Us</h1>
                <p className="text-xs md:text-sm text-slate-500 mt-1 dark:text-slate-400">Directly manage, edit text content, core values, and team members for the About Us page.</p>
              </div>
              <button
                type="button"
                onClick={loadAbout}
                className="bg-cardBg hover:bg-background text-foreground font-semibold text-xs py-2.5 px-4 rounded-lg border border-borderCustom shadow-sm flex items-center gap-2 self-start cursor-pointer hover:border-primaryBlue/30 transition"
              >
                <Plus size={14} />
                Refresh Content
              </button>
            </div>

            {aboutLoading ? (
              <div className="p-12 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primaryBlue mx-auto mb-3"></div>
                <p className="text-slate-400 text-xs">Querying database About Us content...</p>
              </div>
            ) : aboutError ? (
              <div className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 text-rose-700 text-xs rounded-lg">{aboutError}</div>
            ) : (
              <form onSubmit={handleSaveAbout} className="bg-cardBg border border-borderCustom rounded-xl p-6 shadow-sm space-y-6">
                <div className="flex justify-between items-center border-b border-borderCustom pb-4">
                  <h2 className="text-lg font-forum font-bold text-primaryBlue dark:text-white flex items-center gap-2">
                    <Plus size={18} />
                    Edit About Us Page Content
                  </h2>
                </div>

                {aboutSaveError && (
                  <div className="p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 text-rose-700 text-xs rounded-lg">{aboutSaveError}</div>
                )}

                {aboutSaveSuccess && (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 text-emerald-700 text-xs rounded-lg">{aboutSaveSuccess}</div>
                )}

                {/* Section 1: Hero Section */}
                <div className="bg-background/20 p-5 rounded-xl border border-borderCustom/60 space-y-4">
                  <h3 className="font-forum text-base font-bold text-primaryBlue dark:text-white">1. Hero Header Section</h3>
                  <div className="grid grid-cols-1 gap-4 font-instrument">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1.5">Hero Title *</label>
                      <input
                        type="text"
                        value={aboutHeroTitle}
                        onChange={e => setAboutHeroTitle(e.target.value)}
                        placeholder="e.g. Empowering Financial Futures."
                        className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400 font-semibold"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1.5">Hero Subtitle / Description *</label>
                      <textarea
                        rows={3}
                        value={aboutHeroDescription}
                        onChange={e => setAboutHeroDescription(e.target.value)}
                        placeholder="We see each client as unique..."
                        className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400 resize-none leading-relaxed"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Commitment Section */}
                <div className="bg-background/20 p-5 rounded-xl border border-borderCustom/60 space-y-4">
                  <h3 className="font-forum text-base font-bold text-primaryBlue dark:text-white">2. Fiduciary Commitment Section</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-instrument">
                    {/* Image Upload */}
                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1.5">Group Overlay Image</label>
                      <div className="border border-dashed border-borderCustom rounded-xl p-4 bg-background/40 flex flex-col items-center justify-center text-center relative overflow-hidden h-[180px] group">
                        {isUploadingAboutImage ? (
                          <div className="flex flex-col items-center gap-2">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primaryBlue"></div>
                            <p className="text-[10px] text-slate-400">Uploading...</p>
                          </div>
                        ) : aboutCommitmentImage ? (
                          <>
                            <img src={getImageUrl(aboutCommitmentImage)} alt="Commitment Banner" className="object-cover w-full h-full absolute inset-0" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <label className="bg-white/95 text-primaryBlue px-3 py-1.5 rounded-full text-[10px] font-bold cursor-pointer hover:scale-105 transition shadow">
                                Change Image
                                <input type="file" onChange={e => handleAboutImageUpload(e, 'commitment')} className="hidden" accept="image/*" />
                              </label>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center gap-2.5">
                            <LayoutGrid size={32} className="text-slate-400 stroke-[1.25]" />
                            <div>
                              <label className="text-primaryBlue hover:underline text-xs font-bold cursor-pointer">
                                Upload image
                                <input type="file" onChange={e => handleAboutImageUpload(e, 'commitment')} className="hidden" accept="image/*" />
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Text Fields */}
                    <div className="lg:col-span-2 space-y-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1.5">Commitment Section Title *</label>
                        <input
                          type="text"
                          value={aboutCommitmentTitle}
                          onChange={e => setAboutCommitmentTitle(e.target.value)}
                          placeholder="e.g. An everlasting commitment to fiduciary values"
                          className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1.5">Commitment Body Paragraphs (One paragraph per line)</label>
                        <textarea
                          rows={4}
                          value={aboutCommitmentParagraphs.join('\n')}
                          onChange={e => setAboutCommitmentParagraphs(e.target.value.split('\n'))}
                          placeholder={`Established in 2011...\nAt MRNP & CO LLP...`}
                          className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400 resize-none leading-relaxed font-sans"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Core Values List */}
                <div className="bg-background/20 p-5 rounded-xl border border-borderCustom/60 space-y-4 font-instrument">
                  <div className="flex justify-between items-center">
                    <h3 className="font-forum text-base font-bold text-primaryBlue dark:text-white">3. Company Core Values</h3>
                    <button
                      type="button"
                      onClick={() => setAboutValues([...aboutValues, { title: '', description: '', icon: '' }])}
                      className="px-3 py-1.5 bg-primaryBlue/5 hover:bg-primaryBlue hover:text-white border border-primaryBlue/10 text-primaryBlue text-[11px] font-bold rounded-lg transition cursor-pointer flex items-center gap-1"
                    >
                      <Plus size={12} />
                      Add Core Value
                    </button>
                  </div>

                  {aboutValues.length === 0 ? (
                    <div className="p-8 text-center border border-borderCustom border-dashed rounded-xl text-slate-400 text-xs">
                      No core values defined. Click "Add Core Value" to build them.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {aboutValues.map((val, idx) => (
                        <div key={idx} className="bg-background/30 border border-borderCustom p-4 rounded-xl relative space-y-3">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...aboutValues];
                              updated.splice(idx, 1);
                              setAboutValues(updated);
                            }}
                            className="absolute top-4 right-4 text-xs text-rose-500 hover:text-rose-600 font-bold cursor-pointer"
                          >
                            <Trash2 size={12} />
                          </button>

                          <div className="flex gap-4">
                            {/* Icon Uploader */}
                            <div className="flex flex-col items-center">
                              <label className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold mb-1">Icon</label>
                              <div className="w-12 h-12 border border-borderCustom rounded-lg relative overflow-hidden bg-background/50 flex items-center justify-center group">
                                {val.icon ? (
                                  <>
                                    <img src={getImageUrl(val.icon)} alt="Value Icon" className="w-full h-full object-contain" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                      <label className="cursor-pointer text-[8px] text-white font-bold p-0.5 bg-black/50 rounded">
                                        Edit
                                        <input type="file" onChange={e => handleAboutImageUpload(e, 'value', idx)} className="hidden" accept="image/*" />
                                      </label>
                                    </div>
                                  </>
                                ) : (
                                  <label className="cursor-pointer text-[9px] text-primaryBlue font-bold text-center leading-none">
                                    Upload
                                    <input type="file" onChange={e => handleAboutImageUpload(e, 'value', idx)} className="hidden" accept="image/*" />
                                  </label>
                                )}
                              </div>
                            </div>

                            {/* Details fields */}
                            <div className="flex-1 space-y-2">
                              <div>
                                <label className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold mb-1">Value Title *</label>
                                <input
                                  type="text"
                                  value={val.title}
                                  onChange={e => {
                                    const updated = [...aboutValues];
                                    updated[idx].title = e.target.value;
                                    setAboutValues(updated);
                                  }}
                                  placeholder="e.g. Putting Clients First:"
                                  className="w-full px-2 py-1 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground font-semibold placeholder:text-slate-400"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold mb-1">Description *</label>
                                <textarea
                                  rows={2}
                                  value={val.description}
                                  onChange={e => {
                                    const updated = [...aboutValues];
                                    updated[idx].description = e.target.value;
                                    setAboutValues(updated);
                                  }}
                                  placeholder="Provide the value explanation..."
                                  className="w-full px-2 py-1 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400 resize-none leading-normal"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Section 4: Partners / Team members list */}
                <div className="bg-background/20 p-5 rounded-xl border border-borderCustom/60 space-y-4 font-instrument">
                  <div className="flex justify-between items-center">
                    <h3 className="font-forum text-base font-bold text-primaryBlue dark:text-white">4. Partners & Team Members</h3>
                    <button
                      type="button"
                      onClick={() => setAboutPartners([...aboutPartners, { name: '', role: '', degree: '', image: '', email: '', bio: '', isActive: true }])}
                      className="px-3 py-1.5 bg-primaryBlue/5 hover:bg-primaryBlue hover:text-white border border-primaryBlue/10 text-primaryBlue text-[11px] font-bold rounded-lg transition cursor-pointer flex items-center gap-1"
                    >
                      <Plus size={12} />
                      Add Team Member
                    </button>
                  </div>

                  {aboutPartners.length === 0 ? (
                    <div className="p-8 text-center border border-borderCustom border-dashed rounded-xl text-slate-400 text-xs">
                      No team members defined. Click "Add Team Member" to build your team.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {aboutPartners.map((pt, idx) => (
                        <div key={idx} className="bg-background/30 border border-borderCustom p-4 rounded-xl relative space-y-4">
                          <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...aboutPartners];
                                updated.splice(idx, 1);
                                setAboutPartners(updated);
                              }}
                              className="text-xs text-rose-500 hover:text-rose-600 font-bold flex items-center gap-0.5 cursor-pointer"
                            >
                              <Trash2 size={12} />
                              Remove
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...aboutPartners];
                                updated[idx].isActive = updated[idx].isActive === false ? true : false;
                                setAboutPartners(updated);
                              }}
                              className={`text-[10px] font-bold flex items-center gap-1 cursor-pointer px-2.5 py-1 rounded-full border transition-all ${
                                pt.isActive === false
                                  ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/20 dark:border-rose-900/30'
                                  : 'bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-950/20 dark:border-emerald-900/30'
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${pt.isActive === false ? 'bg-rose-500' : 'bg-emerald-500'}`}></span>
                              {pt.isActive === false ? 'Disabled' : 'Enabled'}
                            </button>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                            {/* Profile Image Column */}
                            <div className="flex flex-col items-center justify-center">
                              <label className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold mb-1">Profile Photo</label>
                              <div className="w-24 h-28 border border-borderCustom rounded-lg relative overflow-hidden bg-background/50 flex items-center justify-center group shadow-inner">
                                {pt.image ? (
                                  <>
                                    <img src={getImageUrl(pt.image)} alt="Profile" className="w-full h-full object-contain" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                      <label className="cursor-pointer text-[9px] text-white font-bold p-1 bg-black/50 rounded">
                                        Change
                                        <input type="file" onChange={e => handleAboutImageUpload(e, 'partner', idx)} className="hidden" accept="image/*" />
                                      </label>
                                    </div>
                                  </>
                                ) : (
                                  <label className="cursor-pointer text-[10px] text-primaryBlue font-bold text-center leading-none">
                                    Click to Upload
                                    <input type="file" onChange={e => handleAboutImageUpload(e, 'partner', idx)} className="hidden" accept="image/*" />
                                  </label>
                                )}
                              </div>
                            </div>

                            {/* Details fields Column */}
                            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-3 pr-20">
                              <div>
                                <label className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold mb-1">Full Name *</label>
                                <input
                                  type="text"
                                  value={pt.name}
                                  onChange={e => {
                                    const updated = [...aboutPartners];
                                    updated[idx].name = e.target.value;
                                    setAboutPartners(updated);
                                  }}
                                  placeholder="e.g. Nemish Patel"
                                  className="w-full px-3 py-1.5 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground font-semibold placeholder:text-slate-400"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold mb-1">Display Role/Title</label>
                                <input
                                  type="text"
                                  value={pt.role}
                                  onChange={e => {
                                    const updated = [...aboutPartners];
                                    updated[idx].role = e.target.value;
                                    setAboutPartners(updated);
                                  }}
                                  placeholder="e.g. CA. Nemish Patel"
                                  className="w-full px-3 py-1.5 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold mb-1">Degree & Location</label>
                                <input
                                  type="text"
                                  value={pt.degree}
                                  onChange={e => {
                                    const updated = [...aboutPartners];
                                    updated[idx].degree = e.target.value;
                                    setAboutPartners(updated);
                                  }}
                                  placeholder="e.g. (FCA, LLB, B.Com) : Vadodara"
                                  className="w-full px-3 py-1.5 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold mb-1">Email Address</label>
                                <input
                                  type="email"
                                  value={pt.email}
                                  onChange={e => {
                                    const updated = [...aboutPartners];
                                    updated[idx].email = e.target.value;
                                    setAboutPartners(updated);
                                  }}
                                  placeholder="e.g. nemish@mrnp.in"
                                  className="w-full px-3 py-1.5 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400"
                                />
                              </div>
                            </div>

                            {/* Bio details spanning full bottom */}
                            <div className="lg:col-span-4 mt-2">
                              <label className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold mb-1">Detailed Partner Bio *</label>
                              <textarea
                                rows={4}
                                value={pt.bio}
                                onChange={e => {
                                  const updated = [...aboutPartners];
                                  updated[idx].bio = e.target.value;
                                  setAboutPartners(updated);
                                }}
                                placeholder="Write a detailed professional biography here..."
                                className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400 resize-none leading-relaxed"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Save changes bottom row */}
                <div className="border-t border-borderCustom/60 pt-5 flex justify-end gap-3 font-instrument">
                  <button
                    type="submit"
                    className="px-8 py-2.5 bg-primaryBlue hover:bg-primaryBlue/90 text-white text-xs font-bold rounded-full shadow-md shadow-[#061143]/15 transition cursor-pointer flex items-center gap-1.5"
                  >
                    Save About Us Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : activeTab === 'services' ? (
          /* ========== SERVICES MANAGEMENT TAB ========== */
          <div>
            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-forum font-bold tracking-wide text-primaryBlue dark:text-white">Manage Services</h1>
                <p className="text-xs md:text-sm text-slate-500 mt-1 dark:text-slate-400">Add new services, upload banners, and edit detailed layout content.</p>
              </div>
              {!isServiceEditing && (
                <button
                  onClick={startNewService}
                  className="bg-primaryBlue hover:bg-primaryBlue/90 text-white font-semibold text-xs py-2.5 px-5 rounded-lg flex items-center gap-2 cursor-pointer transition shadow-md shadow-[#061143]/20"
                >
                  <Plus size={14} />
                  Add New Service
                </button>
              )}
            </div>

            {isServiceEditing ? (
              /* ========== SERVICES EDITOR FORM ========== */
              <form onSubmit={(e) => handleSaveService(e)} className="bg-cardBg border border-borderCustom rounded-xl p-6 shadow-sm space-y-6">
                <div className="flex justify-between items-center border-b border-borderCustom pb-4">
                  <h2 className="text-lg font-forum font-bold text-primaryBlue dark:text-white flex items-center gap-2">
                    <Plus size={18} />
                    {editingServiceId ? 'Edit Service Page' : 'Create Service Page'}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setIsServiceEditing(false)}
                    className="text-xs text-slate-400 hover:text-foreground font-semibold cursor-pointer"
                  >
                    Cancel and Return
                  </button>
                </div>

                {serviceSaveError && (
                  <div className="p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 text-rose-700 text-xs rounded-lg">{serviceSaveError}</div>
                )}

                {serviceSaveSuccess && (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 text-emerald-700 text-xs rounded-lg">{serviceSaveSuccess}</div>
                )}

                {/* Grid for main properties */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Column 1 & 2: Form fields */}
                  <div className="lg:col-span-2 space-y-4 font-instrument">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1.5">Service Title *</label>
                        <input
                          type="text"
                          value={serviceTitle}
                          onChange={e => {
                            setServiceTitle(e.target.value);
                            if (!editingServiceId) {
                              setServiceSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                            }
                          }}
                          placeholder="e.g. Audit & Assurance Services"
                          className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1.5">URL Slug *</label>
                        <input
                          type="text"
                          value={serviceSlug}
                          onChange={e => setServiceSlug(e.target.value)}
                          placeholder="e.g. audit-and-assurance"
                          className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400 font-mono"
                          required
                        />
                        <p className="text-[9px] text-slate-400 mt-1">Unique URL path segment: /services/{"{slug}"}</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1.5">Listing Card Description</label>
                      <textarea
                        rows={3}
                        value={serviceDescription}
                        onChange={e => setServiceDescription(e.target.value)}
                        placeholder="Provide a short summary displayed on listing cards and dropdown menu..."
                        className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400 resize-none leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1.5">Page Hero Title</label>
                        <input
                          type="text"
                          value={servicePageTitle}
                          onChange={e => setServicePageTitle(e.target.value)}
                          placeholder="e.g. What is an Audit & Assurance Service?"
                          className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1.5">Page Intro Paragraph</label>
                        <input
                          type="text"
                          value={serviceIntro}
                          onChange={e => setServiceIntro(e.target.value)}
                          placeholder="e.g. An independent verification builds trust with stakeholders..."
                          className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Banner Image Upload */}
                  <div className="space-y-4 font-instrument">
                    <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1.5">Banner Image</label>
                    <div className="border border-dashed border-borderCustom rounded-xl p-4 bg-background/40 flex flex-col items-center justify-center text-center relative overflow-hidden h-[180px] group">
                      {isUploadingImage ? (
                        <div className="flex flex-col items-center gap-2">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primaryBlue"></div>
                          <p className="text-[10px] text-slate-400">Uploading banner...</p>
                        </div>
                      ) : serviceImage ? (
                        <>
                          <img src={getImageUrl(serviceImage)} alt="Banner Preview" className="object-cover w-full h-full absolute inset-0" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <label className="bg-white/95 text-primaryBlue px-3 py-1.5 rounded-full text-[10px] font-bold cursor-pointer hover:scale-105 transition shadow">
                              Change Image
                              <input type="file" onChange={handleServiceImageUpload} className="hidden" accept="image/*" />
                            </label>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center gap-2.5">
                          <LayoutGrid size={32} className="text-slate-400 stroke-[1.25]" />
                          <div>
                            <label className="text-primaryBlue hover:underline text-xs font-bold cursor-pointer">
                              Click to upload image
                              <input type="file" onChange={handleServiceImageUpload} className="hidden" accept="image/*" />
                            </label>
                            <p className="text-[9px] text-slate-400 mt-1">PNG, JPG, WEBP, or SVG (Max 5MB)</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Interactive Sections Editor */}
                <div className="border-t border-borderCustom/60 pt-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-forum text-base font-bold text-primaryBlue dark:text-white flex items-center gap-1.5">
                      Detailed Sections Content
                    </h3>
                    <button
                      type="button"
                      onClick={() => setServiceSections([...serviceSections, { heading: '', description: '', body: '' }])}
                      className="px-3 py-1.5 bg-primaryBlue/5 hover:bg-primaryBlue hover:text-white border border-primaryBlue/10 text-primaryBlue text-[11px] font-bold rounded-lg transition cursor-pointer flex items-center gap-1"
                    >
                      <Plus size={12} />
                      Add Dynamic Section
                    </button>
                  </div>

                  {serviceSections.length === 0 ? (
                    <div className="p-8 text-center border border-borderCustom border-dashed rounded-xl text-slate-400 text-xs font-instrument">
                      No sections defined. Click "Add Dynamic Section" to write sub-headings, explanations, or lists.
                    </div>
                  ) : (
                    <div className="space-y-4 font-instrument">
                      {serviceSections.map((sec, idx) => (
                        <div key={idx} className="bg-background/30 border border-borderCustom p-4 rounded-xl relative space-y-3.5">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...serviceSections];
                              updated.splice(idx, 1);
                              setServiceSections(updated);
                            }}
                            className="absolute top-4 right-4 text-xs text-rose-500 hover:text-rose-650 font-bold transition flex items-center gap-0.5 cursor-pointer"
                          >
                            <Trash2 size={12} />
                            Remove
                          </button>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pr-20">
                            <div>
                              <label className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold mb-1">Section Title</label>
                              <input
                                type="text"
                                value={sec.heading}
                                onChange={e => {
                                  const updated = [...serviceSections];
                                  updated[idx].heading = e.target.value;
                                  setServiceSections(updated);
                                }}
                                placeholder="e.g. Benefits of Audit"
                                className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400 font-semibold"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold mb-1">Section Description (Optional)</label>
                              <input
                                type="text"
                                value={sec.description}
                                onChange={e => {
                                  const updated = [...serviceSections];
                                  updated[idx].description = e.target.value;
                                  setServiceSections(updated);
                                }}
                                placeholder="e.g. A personalized strategic roadmap..."
                                className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold mb-1">Body Text / Bullet points (one per line)</label>
                            <textarea
                              rows={3}
                              value={sec.body}
                              onChange={e => {
                                const updated = [...serviceSections];
                                updated[idx].body = e.target.value;
                                setServiceSections(updated);
                              }}
                              placeholder={`Write point one here...\nWrite point two here...\nWrite point three here...`}
                              className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400 resize-none leading-relaxed"
                            />
                            <p className="text-[9px] text-slate-400 mt-1 font-sans">If you write multiple lines, they will be formatted automatically as a beautiful bullet list!</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Why choose us Block */}
                <div className="border-t border-borderCustom/60 pt-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-instrument">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1.5">"Why Choose Us" Section Title</label>
                      <input
                        type="text"
                        value={serviceWhyTitle}
                        onChange={e => setServiceWhyTitle(e.target.value)}
                        placeholder="e.g. Why Choose MRNP & CO LLP?"
                        className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1.5">"Why Choose Us" Subtitle</label>
                      <input
                        type="text"
                        value={serviceWhySubtitle}
                        onChange={e => setServiceWhySubtitle(e.target.value)}
                        placeholder="e.g. We possess in-depth customized strategies..."
                        className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center font-instrument">
                    <h4 className="text-xs font-bold text-slate-600 dark:text-slate-350">Why Choose Us Highlight Cards</h4>
                    <button
                      type="button"
                      onClick={() => setServiceWhyCards([...serviceWhyCards, { title: '', body: '' }])}
                      className="px-3 py-1.5 bg-primaryBlue/5 hover:bg-primaryBlue hover:text-white border border-primaryBlue/10 text-primaryBlue text-[11px] font-bold rounded-lg transition cursor-pointer flex items-center gap-1"
                    >
                      <Plus size={12} />
                      Add Highlight Card
                    </button>
                  </div>

                  {serviceWhyCards.length === 0 ? (
                    <div className="p-8 text-center border border-borderCustom border-dashed rounded-xl text-slate-400 text-xs font-instrument">
                      No highlight cards defined. Click "Add Highlight Card" to describe your unique competitive advantages.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-instrument">
                      {serviceWhyCards.map((card, idx) => (
                        <div key={idx} className="bg-background/30 border border-borderCustom p-4 rounded-xl relative space-y-3">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...serviceWhyCards];
                              updated.splice(idx, 1);
                              setServiceWhyCards(updated);
                            }}
                            className="absolute top-4 right-4 text-xs text-rose-500 hover:text-rose-600 font-bold cursor-pointer"
                            title="Remove card"
                          >
                            <Trash2 size={12} />
                          </button>

                          <div className="pr-6">
                            <label className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold mb-1">Card Header Title</label>
                            <input
                              type="text"
                              value={card.title}
                              onChange={e => {
                                const updated = [...serviceWhyCards];
                                updated[idx].title = e.target.value;
                                setServiceWhyCards(updated);
                              }}
                              placeholder="e.g. Industry Expertise"
                              className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400 font-semibold"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold mb-1">Card Explanation Body</label>
                            <textarea
                              rows={3}
                              value={card.body}
                              onChange={e => {
                                const updated = [...serviceWhyCards];
                                updated[idx].body = e.target.value;
                                setServiceWhyCards(updated);
                              }}
                              placeholder="Describe this strength in 1-2 brief sentences..."
                              className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400 resize-none leading-relaxed"
                              required
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Save and cancel bottom row */}
                <div className="border-t border-borderCustom/60 pt-5 flex justify-end gap-3 font-instrument">
                  <button
                    type="button"
                    onClick={() => setIsServiceEditing(false)}
                    className="px-6 py-2.5 border border-borderCustom bg-cardBg hover:bg-background text-foreground text-xs font-semibold rounded-full transition cursor-pointer"
                  >
                    Cancel changes
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSaveService(undefined, 'draft')}
                    className="px-6 py-2.5 border border-amber-300 dark:border-amber-700/60 bg-amber-50 dark:bg-amber-950/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold rounded-full transition cursor-pointer flex items-center gap-1.5"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSaveService(undefined, 'published')}
                    className="px-8 py-2.5 bg-primaryBlue hover:bg-primaryBlue/90 text-white text-xs font-bold rounded-full shadow-md shadow-[#061143]/15 transition cursor-pointer flex items-center gap-1.5"
                  >
                    Publish
                  </button>
                </div>
              </form>
            ) : (
              /* ========== SERVICES LIST VIEW ========== */
              <>
                {servicesLoading ? (
                  <div className="p-12 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primaryBlue mx-auto mb-3"></div>
                    <p className="text-slate-400 text-xs">Querying database services...</p>
                  </div>
                ) : servicesError ? (
                  <div className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 text-rose-700 text-xs rounded-lg">{servicesError}</div>
                ) : servicesList.length === 0 ? (
                  <div className="p-12 text-center bg-cardBg border border-borderCustom rounded-xl shadow-sm font-instrument">
                    <h3 className="font-forum font-bold text-slate-500 text-base mb-1">No Services Available</h3>
                    <p className="text-xs text-slate-400 mb-4">Create your first service page to get started.</p>
                    <button onClick={startNewService} className="bg-primaryBlue hover:bg-primaryBlue/90 text-white text-xs py-2 px-4 rounded-lg font-bold">
                      Create Service
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {servicesList.map((service: any) => (
                      <div key={service._id || service.id} className="bg-cardBg border border-borderCustom rounded-xl overflow-hidden shadow-sm hover:scale-[1.01] hover:border-primaryBlue/35 transition-all duration-300 flex flex-col justify-between">
                        <div>
                          {/* Thumbnail banner preview */}
                          <div className="relative aspect-[16/9] w-full bg-slate-100 dark:bg-slate-800 overflow-hidden border-b border-borderCustom">
                            {service.image ? (
                              <img src={getImageUrl(service.image)} alt={service.title} className="object-cover w-full h-full" />
                            ) : (
                              <div className="flex items-center justify-center w-full h-full text-slate-350 bg-slate-100 dark:bg-slate-800">
                                <LayoutGrid size={48} className="stroke-[1]" />
                              </div>
                            )}
                            <span className={`absolute top-2 left-2 px-2 py-0.5 text-[9px] uppercase font-bold tracking-wider rounded shadow-sm text-white font-instrument font-semibold ${
                              service.status === 'draft'
                                ? 'bg-amber-500'
                                : 'bg-emerald-600'
                            }`}>
                              {service.status || 'published'}
                            </span>
                            <span className="absolute top-2 right-2 px-2 py-0.5 text-[9px] uppercase font-bold tracking-wider bg-primaryBlue text-white rounded shadow-sm">
                              {service.slug}
                            </span>
                          </div>

                          <div className="p-5 font-instrument">
                            <h3 className="font-forum font-bold text-lg mb-2 text-[#061143] dark:text-white">{service.title}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">{service.description}</p>
                          </div>
                        </div>

                        <div className="px-5 pb-5 pt-2 border-t border-borderCustom/60 flex items-center justify-end gap-2.5">
                          <button
                            onClick={() => editService(service)}
                            className="px-3.5 py-1.5 bg-primaryBlue/5 hover:bg-primaryBlue hover:text-white border border-primaryBlue/10 text-primaryBlue text-xs font-bold rounded-lg transition cursor-pointer"
                          >
                            Edit Details
                          </button>
                          <button
                            onClick={() => handleDeleteService(service._id || service.id)}
                            className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-500 hover:text-white border border-rose-100 text-rose-600 text-xs font-bold rounded-lg transition cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ) : activeTab === 'jobs' ? (

          /* ========== JOB OPENINGS MANAGEMENT TAB ========== */
          <div>
            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-forum font-bold tracking-wide text-primaryBlue">Manage Jobs & Applications</h1>
                <p className="text-xs md:text-sm text-slate-500 mt-1 dark:text-slate-400">Post new job openings, manage live postings, and review candidate applications.</p>
              </div>
              <div className="flex gap-2 self-start flex-wrap font-instrument">
                <button
                  onClick={async () => {
                    await loadJobs();
                    await loadApplications();
                  }}
                  className="bg-cardBg hover:bg-background text-foreground font-semibold text-xs py-2.5 px-4 rounded-lg border border-borderCustom shadow-sm flex items-center gap-2 transition cursor-pointer"
                >
                  <Clock size={14} className="text-slate-500" />
                  Refresh All Data
                </button>
                <button
                  onClick={() => exportToCSV()}
                  disabled={filteredApps.length === 0}
                  className="bg-primaryBlue hover:opacity-90 text-white font-semibold text-xs py-2.5 px-5 rounded-full shadow-sm transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Download size={14} className="text-white" />
                  Export Applications (CSV)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

              {/* Form card left */}
              <div className="xl:col-span-2">
                <div className="bg-cardBg border border-borderCustom rounded-xl p-5 shadow-sm sticky top-4">
                  <h2 className="text-base md:text-lg font-forum font-bold text-primaryBlue mb-1 flex items-center gap-2">
                    <Plus size={18} className="text-primaryBlue" />
                    Post New Position
                  </h2>
                  <p className="text-[11px] text-slate-500 mb-4 dark:text-slate-400">Provide details below. Roles appear instantly in career portal pathways.</p>

                  {jobPostError && (
                    <div className="mb-4 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 text-rose-700 dark:text-rose-400 text-xs flex items-start gap-2">
                      {jobPostError}
                    </div>
                  )}

                  {jobPostSuccess && (
                    <div className="mb-4 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs flex items-start gap-2">
                      {jobPostSuccess}
                    </div>
                  )}

                  <form onSubmit={handlePostJob} className="space-y-3.5">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-1">Department *</label>
                        <input
                          type="text"
                          value={newJobDept}
                          onChange={e => setNewJobDept(e.target.value)}
                          placeholder="e.g. Tax"
                          className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-1">Position *</label>
                        <input
                          type="text"
                          value={newJobPosition}
                          onChange={e => setNewJobPosition(e.target.value)}
                          placeholder="e.g. Tax Consultant"
                          className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-1">City *</label>
                        <input
                          type="text"
                          value={newJobCity}
                          onChange={e => setNewJobCity(e.target.value)}
                          placeholder="e.g. Vadodara"
                          className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-1">State *</label>
                        <input
                          type="text"
                          value={newJobState}
                          onChange={e => setNewJobState(e.target.value)}
                          placeholder="e.g. Gujarat"
                          className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-1">Job Description</label>
                      <textarea
                        rows={3}
                        value={newJobDescription}
                        onChange={e => setNewJobDescription(e.target.value)}
                        placeholder="Describe the role and its core key metrics..."
                        className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-1">Requirements & Responsibilities</label>
                      <textarea
                        rows={4}
                        value={newJobRequirements}
                        onChange={e => setNewJobRequirements(e.target.value)}
                        placeholder={`Strong CA/MBA credentials\nOver 3 years of advisory skills\nFluent in client interactions`}
                        className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs font-mono text-foreground placeholder:text-slate-400 resize-none"
                      />
                      <p className="text-[9px] text-slate-400 mt-1 dark:text-slate-500">Provide one requirement per line (becomes a bullet list).</p>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        type="submit"
                        disabled={jobPosting}
                        className="flex-1 bg-primaryBlue hover:opacity-90 disabled:opacity-50 text-white font-semibold text-xs py-2.5 px-4 rounded-full shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        {jobPosting ? 'Publishing...' : 'Publish Job Opening'}
                      </button>
                      <button
                        type="button"
                        onClick={resetJobForm}
                        className="bg-cardBg hover:bg-background text-foreground font-semibold text-xs py-2.5 px-4 rounded-full border border-borderCustom transition cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Active Openings list right */}
              <div className="xl:col-span-3">
                <div className="bg-cardBg border border-borderCustom rounded-xl shadow-sm overflow-hidden">
                  <div className="px-5 py-4 bg-background border-b border-borderCustom flex items-center justify-between">
                    <h2 className="text-sm md:text-base font-forum font-bold text-primaryBlue flex items-center gap-2">
                      <Briefcase size={16} className="text-primaryBlue" />
                      Active Job Postings
                    </h2>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{jobsList.length} postings live</span>
                  </div>

                  {jobsListError && (
                    <div className="p-4 text-rose-700 text-xs bg-rose-50 border-b border-rose-200 dark:bg-rose-950/20 dark:border-rose-900/30">{jobsListError}</div>
                  )}

                  {jobsListLoading ? (
                    <div className="p-12 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primaryBlue mx-auto mb-3"></div>
                      <p className="text-slate-400 text-xs">Querying database postings...</p>
                    </div>
                  ) : jobsList.length === 0 ? (
                    <div className="p-12 text-center">
                      <h3 className="font-forum font-bold text-slate-500 text-base mb-1">No Active Openings</h3>
                      <p className="text-xs text-slate-400">Post a role using the side form to present opportunities.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-borderCustom">
                      {jobsList.map((job: any) => {
                        const jobId = job._id || job.id;
                        const isDeleting = deletingJobId === jobId;
                        return (
                          <div key={jobId} className="p-4 hover:bg-background/40 transition group">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                  <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-primaryBlue/5 text-primaryBlue border border-primaryBlue/10">
                                    {job.department}
                                  </span>
                                  <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 border border-emerald-100 dark:border-emerald-900/30">
                                    LIVE
                                  </span>
                                </div>
                                <h3 className="font-bold text-sm group-hover:text-primaryBlue transition font-forum">{job.position}</h3>
                                <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                                  <span className="flex items-center gap-1">
                                    <MapPin size={12} className="text-slate-400" />
                                    {job.city}, {job.state}
                                  </span>
                                </div>
                                {job.description && (
                                  <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">{job.description}</p>
                                )}
                              </div>

                              <button
                                onClick={() => handleDeleteJob(jobId)}
                                disabled={isDeleting}
                                className="shrink-0 p-2 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-900/40 text-rose-600 transition disabled:opacity-40 cursor-pointer"
                                title="Remove posting"
                              >
                                <Trash2 size={14} className="text-rose-600" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Divider & Candidate Applications Section Header */}
            <div className="border-t border-borderCustom my-8 pt-8">
              <h2 className="text-xl md:text-2xl font-forum font-bold tracking-wide text-primaryBlue dark:text-white mb-1">Candidate Applications Pipeline</h2>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mb-6 font-instrument">Review and filter candidate profiles, download resumes, and manage pipeline status.</p>
            </div>

            {/* Stunning dashboard widgets section */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 font-instrument">
              {/* Widget 1: Total candidates */}
              <div className="bg-cardBg border border-borderCustom p-4 rounded-xl shadow-sm flex items-center gap-4 relative overflow-hidden group hover:scale-[1.01] transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primaryBlue/5 rounded-full blur-2xl"></div>
                <div className="p-2.5 bg-primaryBlue/5 dark:bg-slate-800 text-primaryBlue rounded-lg">
                  <Briefcase size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold">Total Candidates</p>
                  <h3 className="text-2xl font-forum font-bold text-primaryBlue mt-0.5">{stats.total}</h3>
                </div>
              </div>

              {/* Widget 2: Upcoming Interviews */}
              <div className="bg-cardBg border border-borderCustom p-4 rounded-xl shadow-sm flex items-center gap-4 relative overflow-hidden group hover:scale-[1.01] transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl"></div>
                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 rounded-lg">
                  <UserCheck size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold">Under Review</p>
                  <h3 className="text-2xl font-forum font-bold text-primaryBlue mt-0.5">
                    {applications.filter(a => localStorage.getItem(`mrnp_status_${a.id || a._id}`) === 'Under Review').length}
                  </h3>
                </div>
              </div>

              {/* Widget 3: Top Location */}
              <div className="bg-cardBg border border-borderCustom p-4 rounded-xl shadow-sm flex items-center gap-4 relative overflow-hidden group hover:scale-[1.01] transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl"></div>
                <div className="p-2.5 bg-amber-50 dark:bg-amber-950/20 text-amber-500 rounded-lg">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold">Primary City</p>
                  <h3 className="text-xl font-forum font-bold text-primaryBlue mt-0.5 truncate max-w-[140px]">
                    {cities[0] || 'Vadodara'}
                  </h3>
                </div>
              </div>

              {/* Widget 4: Shortlisted Count */}
              <div className="bg-cardBg border border-borderCustom p-4 rounded-xl shadow-sm flex items-center justify-between relative overflow-hidden group font-instrument">
                <div className="w-full">
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold mb-1">Shortlisted</p>
                  <h3 className="text-2xl font-forum font-bold text-primaryBlue mt-0.5">
                    {applications.filter(a => localStorage.getItem(`mrnp_status_${a.id || a._id}`) === 'Shortlisted').length}
                  </h3>
                </div>
              </div>
            </section>

            {/* Filtering Control panel */}
            <section className="bg-cardBg border border-borderCustom p-5 rounded-xl shadow-sm mb-6 font-instrument">
              <h2 className="text-sm font-bold text-slate-700 dark:text-slate-350 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Filter size={16} className="text-primaryBlue" />
                Advanced Filters & Query Search
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {/* Search textbox */}
                <input
                  type="text"
                  placeholder="Search name, education, info..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground placeholder:text-slate-400"
                />

                {/* Department drop */}
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground cursor-pointer"
                >
                  <option value="">All Departments</option>
                  {departments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>

                {/* Position select */}
                <select
                  value={selectedPos}
                  onChange={(e) => setSelectedPos(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground cursor-pointer"
                >
                  <option value="">All Positions</option>
                  {positions.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>

                {/* City select */}
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground cursor-pointer"
                >
                  <option value="">All Cities</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                {/* Experience filter */}
                <select
                  value={selectedExp}
                  onChange={(e) => setSelectedExp(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground cursor-pointer"
                >
                  <option value="">All Experience</option>
                  {experiences.map((exp) => (
                    <option key={exp} value={exp}>{exp} Years</option>
                  ))}
                </select>
              </div>

              {(searchQuery || selectedDept || selectedPos || selectedCity || selectedExp) && (
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={resetFilters}
                    className="text-xs text-primaryBlue hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    Clear Filter Criteria
                  </button>
                </div>
              )}
            </section>

            {/* Applications Table Card */}
            <section className="bg-cardBg border border-borderCustom rounded-xl shadow-sm overflow-hidden relative">
              
              {/* Floating bulk actions toolbar panel */}
              {selectedAppIds.length > 0 && (
                <div className="absolute top-0 left-0 right-0 bg-primaryBlue text-white px-6 py-3 flex items-center justify-between z-20 animate-slide-in">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono px-2 py-0.5 bg-white/20 rounded">
                      {selectedAppIds.length}
                    </span>
                    <span className="text-xs font-semibold">candidates selected</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleBulkExport}
                      className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Download size={12} />
                      Export CSV
                    </button>
                    <button
                      onClick={handleBulkDelete}
                      className="bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Trash2 size={12} />
                      Delete Selected
                    </button>
                    <button
                      onClick={() => setSelectedAppIds([])}
                      className="text-xs text-white/80 hover:text-white underline font-semibold transition cursor-pointer"
                    >
                      Clear selection
                    </button>
                  </div>
                </div>
              )}

              {appsError && (
                <div className="p-4 bg-rose-50 dark:bg-rose-955 border-b border-rose-250 text-rose-700 dark:text-rose-400 text-xs">{appsError}</div>
              )}

              {appsLoading ? (
                <div className="p-16 text-center text-slate-400 text-xs">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primaryBlue mx-auto mb-3"></div>
                  Querying database applications...
                </div>
              ) : filteredApps.length === 0 ? (
                <div className="p-16 text-center text-slate-400 flex flex-col items-center gap-3">
                  <Briefcase size={36} className="text-slate-350" />
                  <h3 className="font-forum font-bold text-slate-650 text-base">No Applications Found</h3>
                  <p className="text-xs text-slate-400">Modify filters to broaden your search criteria.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-background text-primaryBlue font-bold border-b border-borderCustom font-instrument sticky top-0 bg-opacity-95 backdrop-blur-sm z-10 select-none">
                        <th className="py-3.5 px-4 w-12 text-center">
                          <input
                            type="checkbox"
                            className="w-3.5 h-3.5 rounded border-slate-300 text-primaryBlue focus:ring-primaryBlue cursor-pointer"
                            checked={
                              paginatedApps.length > 0 &&
                              paginatedApps.every(a => selectedAppIds.includes(a.id || a._id))
                            }
                            onChange={handleSelectAll}
                          />
                        </th>
                        <th className="py-3.5 px-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition" onClick={() => handleSort('name')}>
                          <div className="flex items-center gap-1.5">
                            Candidate Name
                            <ArrowUpDown size={12} className="text-slate-400" />
                          </div>
                        </th>
                        <th className="py-3.5 px-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition" onClick={() => handleSort('jobDepartment')}>
                          <div className="flex items-center gap-1.5">
                            Department / Role
                            <ArrowUpDown size={12} className="text-slate-400" />
                          </div>
                        </th>
                        <th className="py-3.5 px-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition" onClick={() => handleSort('jobCity')}>
                          <div className="flex items-center gap-1.5">
                            City Location
                            <ArrowUpDown size={12} className="text-slate-400" />
                          </div>
                        </th>
                        <th className="py-3.5 px-4 text-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition" onClick={() => handleSort('experience')}>
                          <div className="flex items-center justify-center gap-1.5">
                            Exp.
                            <ArrowUpDown size={12} className="text-slate-400" />
                          </div>
                        </th>
                        <th className="py-3.5 px-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition" onClick={() => handleSort('status')}>
                          <div className="flex items-center gap-1.5">
                            Pipeline Status
                            <ArrowUpDown size={12} className="text-slate-400" />
                          </div>
                        </th>
                        <th className="py-3.5 px-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition" onClick={() => handleSort('createdAt')}>
                          <div className="flex items-center gap-1.5">
                            Applied
                            <ArrowUpDown size={12} className="text-slate-400" />
                          </div>
                        </th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-borderCustom">
                      {paginatedApps.map((app) => {
                        const appId = app.id || app._id;
                        const status = localStorage.getItem(`mrnp_status_${appId}`) || 'Pending';
                        const isSelected = selectedAppIds.includes(appId);
                        
                        return (
                          <tr
                            key={appId}
                            className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 transition duration-150 border-b border-borderCustom ${
                              isSelected ? 'bg-primaryBlue/5 dark:bg-primaryBlue/10' : ''
                            }`}
                          >
                            {/* Checkbox select */}
                            <td className="py-4 px-4 text-center">
                              <input
                                type="checkbox"
                                className="w-3.5 h-3.5 rounded border-slate-300 text-primaryBlue focus:ring-primaryBlue cursor-pointer"
                                checked={isSelected}
                                onChange={(e) => handleSelectRow(appId, e.target.checked)}
                              />
                            </td>

                            {/* Name info */}
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primaryBlue/10 dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-primaryBlue">
                                  {app.name ? app.name[0].toUpperCase() : 'C'}
                                </div>
                                <div>
                                  <h4 className="font-bold text-foreground hover:text-primaryBlue transition">{app.name}</h4>
                                  <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate max-w-[140px]">{app.email}</p>
                                </div>
                              </div>
                            </td>

                            {/* Department / Position */}
                            <td className="py-4 px-4">
                              <div>
                                <span className="inline-block px-1.5 py-0.5 text-[8px] uppercase font-bold text-primaryBlue bg-primaryBlue/5 dark:bg-slate-800 rounded border border-primaryBlue/10 mb-0.5">
                                  {app.jobDepartment || app.job_department}
                                </span>
                                <h5 className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[150px]">{app.jobPosition || app.job_position}</h5>
                              </div>
                            </td>

                            {/* City */}
                            <td className="py-4 px-4 font-medium text-slate-700 dark:text-slate-300">
                              {app.jobCity || app.job_city}
                            </td>

                            {/* Experience */}
                            <td className="py-4 px-4 text-center font-mono font-medium">
                              {app.experience} yrs
                            </td>

                            {/* Pipeline Status */}
                            <td className="py-4 px-4">
                              <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadgeClass(status)}`}>
                                {status}
                              </span>
                            </td>

                            {/* Applied Date */}
                            <td className="py-4 px-4 text-[10px] text-slate-400">
                              {app.createdAt || app.created_at
                                ? new Date(app.createdAt || app.created_at).toLocaleDateString(undefined, {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })
                                : 'N/A'}
                            </td>

                            {/* Actions buttons */}
                            <td className="py-4 px-4 text-right space-x-1.5 whitespace-nowrap">
                              <a
                                href={getResumeUrl(app.resumePath || app.resume_path)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center p-2 rounded-lg bg-primaryBlue/5 hover:bg-primaryBlue hover:text-white dark:bg-slate-800 text-primaryBlue border border-primaryBlue/10 transition duration-150 cursor-pointer"
                                title="Download Resume Attachment"
                              >
                                <Download size={12} />
                              </a>

                              <button
                                onClick={() => openAppDetails(app)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-cardBg hover:bg-primaryBlue hover:text-white border border-borderCustom text-foreground font-semibold text-[10px] transition duration-150 cursor-pointer shadow-sm"
                              >
                                Review Details
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Table pagination controller panel footer */}
              {!appsLoading && filteredApps.length > 0 && (
                <div className="px-6 py-4 bg-background border-t border-borderCustom flex flex-col sm:flex-row items-center justify-between gap-4 select-none font-instrument text-xs">
                  <div className="text-slate-400">
                    Showing <span className="font-bold text-foreground">{startIndex + 1}</span> to{' '}
                    <span className="font-bold text-foreground">{Math.min(startIndex + itemsPerPage, filteredApps.length)}</span> of{' '}
                    <span className="font-bold text-foreground">{filteredApps.length}</span> applicants
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-borderCustom bg-cardBg hover:bg-background disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-lg border text-xs font-bold transition cursor-pointer ${
                          currentPage === page
                            ? 'bg-primaryBlue text-white border-primaryBlue'
                            : 'border-borderCustom bg-cardBg hover:bg-background'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-borderCustom bg-cardBg hover:bg-background disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </section>
          </div>

        ) : activeTab === 'analytics' ? (
          /* ========== ADVANCED ANALYTICS DASHBOARD TAB ========== */
          <div>
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-forum font-bold tracking-wide text-primaryBlue">Metrics & Analytics Overview</h1>
              <p className="text-xs md:text-sm text-slate-500 mt-1 dark:text-slate-400">Review detailed charts, candidate distribution matrices, and hiring trajectories.</p>
            </div>

            {/* Dashboard Widgets */}
            <DashboardWidgets
              applications={applications}
              interviews={interviews}
              setActiveTab={setActiveTab}
              openAppDetails={openAppDetails}
            />

            {/* Grid for Charts */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              
              {/* Chart 1: Hiring Trend (SVG Area Chart) */}
              <div className="bg-cardBg border border-borderCustom rounded-xl p-5 shadow-sm">
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <TrendingUp size={16} className="text-primaryBlue" />
                  Hiring Trend & Applications Volume
                </h3>
                <div className="relative h-60 w-full flex items-end">
                  {/* SVG Chart */}
                  <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="gradientTrend" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary-blue)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="var(--primary-blue)" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Grid Lines */}
                    <line x1="0" y1="50" x2="500" y2="50" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="4" />
                    <line x1="0" y1="100" x2="500" y2="100" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="4" />
                    <line x1="0" y1="150" x2="500" y2="150" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="4" />
                    
                    {/* Path Drawing */}
                    <path
                      d="M 0,200 L 71,160 L 142,120 L 213,150 L 284,80 L 355,140 L 426,110 L 500,60"
                      fill="none"
                      stroke="var(--primary-blue)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    
                    {/* Gradient Fill under Path */}
                    <path
                      d="M 0,200 L 71,160 L 142,120 L 213,150 L 284,80 L 355,140 L 426,110 L 500,60 L 500,200 Z"
                      fill="url(#gradientTrend)"
                    />
                    
                    {/* Hotspots / Circles */}
                    <circle cx="71" cy="160" r="5" fill="var(--primary-blue)" className="hover:scale-150 transition" />
                    <circle cx="142" cy="120" r="5" fill="var(--primary-blue)" className="hover:scale-150 transition" />
                    <circle cx="213" cy="150" r="5" fill="var(--primary-blue)" className="hover:scale-150 transition" />
                    <circle cx="284" cy="80" r="5" fill="var(--primary-blue)" className="hover:scale-150 transition" />
                    <circle cx="355" cy="140" r="5" fill="var(--primary-blue)" className="hover:scale-150 transition" />
                    <circle cx="426" cy="110" r="5" fill="var(--primary-blue)" className="hover:scale-150 transition" />
                    <circle cx="500" cy="60" r="5" fill="var(--primary-blue)" className="hover:scale-150 transition" />
                  </svg>
                </div>
                
                {/* Custom X Axis Labels */}
                <div className="flex justify-between text-[10px] text-slate-400 mt-2 px-1 font-mono uppercase font-bold">
                  {hiringTrendData.map((d, i) => (
                    <span key={i}>{d.label}</span>
                  ))}
                </div>
              </div>

              {/* Chart 2: Department-wise Distribution (Donut Chart) */}
              <div className="bg-cardBg border border-borderCustom rounded-xl p-5 shadow-sm">
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Users size={16} className="text-primaryBlue" />
                  Department Applications Ratio
                </h3>
                <div className="flex flex-col sm:flex-row items-center justify-around gap-6 h-60">
                  {/* SVG Donut Circle */}
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {/* Background circle ring */}
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--border-color)" strokeWidth="8" />
                      
                      {/* Segment rings (simulated breakdown of standard IT, Tax, Audit, HR) */}
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="0" />
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="80" />
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="140" />
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ec4899" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="200" />
                    </svg>
                    {/* Inside metrics total display */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold font-forum">{stats.total}</span>
                      <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold">Total</span>
                    </div>
                  </div>

                  {/* Legends list */}
                  <div className="flex-1 space-y-2 max-w-[200px] w-full text-xs">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 font-medium">
                        <span className="w-2.5 h-2.5 rounded bg-blue-500 inline-block"></span>
                        IT / Technology
                      </span>
                      <span className="font-mono font-bold">{deptCounts['IT'] || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 font-medium">
                        <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block"></span>
                        Audit & Assurance
                      </span>
                      <span className="font-mono font-bold">{deptCounts['Audit'] || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 font-medium">
                        <span className="w-2.5 h-2.5 rounded bg-amber-50 inline-block bg-amber-500"></span>
                        Tax Advisory
                      </span>
                      <span className="font-mono font-bold">{deptCounts['Tax'] || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 font-medium">
                        <span className="w-2.5 h-2.5 rounded bg-pink-500 inline-block"></span>
                        HR & Admin
                      </span>
                      <span className="font-mono font-bold">{deptCounts['HR'] || 0}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart 3: Candidate Experience breakdown (Sleek Bar Chart) */}
              <div className="bg-cardBg border border-borderCustom rounded-xl p-5 shadow-sm">
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <TrendingUp size={16} className="text-primaryBlue" />
                  Candidate Experience Distribution
                </h3>
                <div className="h-60 flex flex-col justify-between pt-4">
                  {Object.entries(experienceDistribution).map(([label, count]: any) => {
                    const pct = stats.total > 0 ? (count / stats.total) * 100 : 0;
                    return (
                      <div key={label} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>{label}</span>
                          <span className="text-slate-400 font-mono">{count} applicants ({Math.round(pct)}%)</span>
                        </div>
                        <div className="w-full h-3.5 bg-background border border-borderCustom rounded-full overflow-hidden">
                          <div 
                            style={{ width: `${Math.max(pct, 5)}%` }}
                            className="h-full bg-gradient-to-r from-primaryBlue to-[#60a5fa] rounded-full transition-all duration-1000"
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Chart 4: Monthly Hiring Activity (Horizontal Bar visual) */}
              <div className="bg-cardBg border border-borderCustom rounded-xl p-5 shadow-sm">
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Clock size={16} className="text-primaryBlue" />
                  Monthly Pipeline Trends
                </h3>
                
                <div className="relative h-60 w-full flex items-end justify-between px-2 pt-6">
                  {/* Grid background lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
                    <div className="border-b border-borderCustom/60 w-full"></div>
                    <div className="border-b border-borderCustom/60 w-full"></div>
                    <div className="border-b border-borderCustom/60 w-full"></div>
                    <div className="border-b border-borderCustom/60 w-full"></div>
                  </div>

                  {/* Vertical Bars */}
                  {[
                    { label: 'Jan', val: 12 },
                    { label: 'Feb', val: 18 },
                    { label: 'Mar', val: 26 },
                    { label: 'Apr', val: 14 },
                    { label: 'May', val: stats.total || 8 }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2 z-10 w-[14%]">
                      <span className="text-[10px] font-bold font-mono text-primaryBlue">{item.val}</span>
                      <div 
                        style={{ height: `${Math.max((item.val / 30) * 150, 20)}px` }}
                        className="w-full bg-primaryBlue/10 border border-primaryBlue/20 hover:bg-primaryBlue/20 rounded-t-lg transition-all duration-500"
                      ></div>
                      <span className="text-[10px] font-bold text-slate-400 font-mono">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        ) : activeTab === 'interviews' ? (
          /* ========== INTERVIEW SCHEDULER TAB ========== */
          <div>
            <InterviewScheduler />
          </div>
        ) : activeTab === 'notifications' ? (
          /* ========== NOTIFICATIONS & LOGS TAB ========== */
          <div>
            <NotificationCenter />
          </div>
        ) : (
          
          /* ========== USER ADMINISTRATOR PROFILE TAB ========== */          <div className="max-w-5xl mx-auto font-instrument animate-fade-in-up space-y-8">
            {/* Header section with page title */}
            <div className="border-b border-borderCustom/60 pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-forum font-bold text-primaryBlue flex items-center gap-2.5">
                  <User className="text-primaryBlue/80 w-7 h-7" />
                  Admin Account Settings
                </h1>
                <p className="text-xs md:text-sm text-slate-500 mt-1 dark:text-slate-400">Manage credentials, administrative parameters and system access.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">System Secure Session</span>
              </div>
            </div>

            {/* Error banner if save fails */}
            {profileError && (
              <div className="bg-rose-50 dark:bg-rose-955 border border-rose-250 dark:border-rose-900/30 text-rose-700 dark:text-rose-400 p-3.5 rounded-xl text-xs flex items-center gap-2 animate-fade-in shadow-sm">
                <span className="text-rose-500 font-bold">⚠️</span>
                <span>{profileError}</span>
              </div>
            )}

            {/* Form wrapping header and cards */}
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              {/* Visual profile header card */}
              <div className="bg-cardBg border border-borderCustom p-6 rounded-2xl relative overflow-hidden shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primaryBlue/5 rounded-full blur-3xl"></div>
                
                <div className="flex items-center gap-4 z-10">
                  {/* Circular Initials Avatar */}
                  <div className="w-20 h-20 rounded-full bg-primaryBlue/10 border border-primaryBlue/20 flex items-center justify-center text-primaryBlue text-2xl font-bold font-forum uppercase shrink-0 shadow-sm">
                    {profileName?.substring(0, 2) || 'AD'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-xl md:text-2xl font-forum font-bold text-foreground">{profileName}</h2>
                      {profileBadge && (
                        <span className="px-2.5 py-0.5 rounded-full bg-primaryBlue/10 text-primaryBlue border border-primaryBlue/20 text-[9px] font-bold uppercase tracking-wider">
                          {profileBadge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs md:text-sm text-slate-500 mt-1 dark:text-slate-400 flex items-center gap-1.5 flex-wrap">
                      <span className="font-medium">{profileDesignation}</span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span className="font-medium">{profileLocation}</span>
                    </p>
                  </div>
                </div>

                <div className="z-10 shrink-0">
                  {!editing ? (
                    <button
                      type="button"
                      onClick={() => setEditing(true)}
                      className="border border-borderCustom hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs py-2 px-4 rounded-full transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Pencil size={12} />
                      Edit profile
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        type="submit"
                        className="bg-primaryBlue hover:opacity-95 text-white font-semibold text-xs py-2 px-5 rounded-full shadow-md transition-all duration-305 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditing(false);
                          setProfileName(user?.name || '');
                          setProfileEmail(user?.email || '');
                          setProfileDesignation(user?.designation || 'Founding Partner');
                          setProfileIcaiMembership(user?.icaiMembership || '124567');
                          setProfileMemberSince(user?.memberSince || 'March 2004');
                          setProfileOfficeBranch(user?.officeBranch || 'Mumbai - HQ');
                          setProfilePhone(user?.phone || '+91 98200 00001');
                          setProfileLinkedin(user?.linkedin || 'https://linkedin.com');
                          setProfileLocation(user?.location || 'Mumbai, MH');
                          setProfileBadge(user?.badge || 'FCA');
                          setProfileTeamAssigned(user?.teamAssigned || 'Audit team · Tax team');
                          setProfileJoinedFirm(user?.joinedFirm || '1 April 2002');
                          setProfileError('');
                        }}
                        className="bg-cardBg hover:bg-background text-slate-700 dark:text-slate-350 border border-borderCustom font-semibold text-xs py-2 px-5 rounded-full transition cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Three Details Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* PERSONAL DETAILS CARD */}
                <div className="bg-cardBg border border-borderCustom rounded-2xl p-5 shadow-sm space-y-4">
                  <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5 pb-2 border-b border-borderCustom/60">
                    <User size={14} className="text-primaryBlue" />
                    Personal Details
                  </h3>
                  <div className="divide-y divide-borderCustom/60">
                    {/* Full Name */}
                    <div className="py-3.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
                        <User size={14} className="text-slate-400" />
                        <span className="text-xs font-medium">Full name</span>
                      </div>
                      {editing ? (
                        <input
                          type="text"
                          value={profileName}
                          onChange={(e) => setProfileName(e.target.value)}
                          className="bg-background dark:bg-slate-900 border border-borderCustom rounded-lg px-2.5 py-1.5 text-xs font-semibold text-right text-foreground focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue/20 w-44"
                          required
                        />
                      ) : (
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100 text-right">{profileName}</span>
                      )}
                    </div>

                    {/* Designation */}
                    <div className="py-3.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
                        <Briefcase size={14} className="text-slate-400" />
                        <span className="text-xs font-medium">Designation</span>
                      </div>
                      {editing ? (
                        <input
                          type="text"
                          value={profileDesignation}
                          onChange={(e) => setProfileDesignation(e.target.value)}
                          className="bg-background dark:bg-slate-900 border border-borderCustom rounded-lg px-2.5 py-1.5 text-xs font-semibold text-right text-foreground focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue/20 w-44"
                          required
                        />
                      ) : (
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100 text-right">{profileDesignation}</span>
                      )}
                    </div>

                    {/* ICAI Membership */}
                    <div className="py-3.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
                        <Award size={14} className="text-slate-400" />
                        <span className="text-xs font-medium">ICAI membership</span>
                      </div>
                      {editing ? (
                        <input
                          type="text"
                          value={profileIcaiMembership}
                          onChange={(e) => setProfileIcaiMembership(e.target.value)}
                          className="bg-background dark:bg-slate-900 border border-borderCustom rounded-lg px-2.5 py-1.5 text-xs font-semibold text-right text-foreground focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue/20 w-44"
                          required
                        />
                      ) : (
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100 text-right">{profileIcaiMembership}</span>
                      )}
                    </div>

                    {/* Member Since */}
                    <div className="py-3.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
                        <Calendar size={14} className="text-slate-400" />
                        <span className="text-xs font-medium">Member since</span>
                      </div>
                      {editing ? (
                        <input
                          type="text"
                          value={profileMemberSince}
                          onChange={(e) => setProfileMemberSince(e.target.value)}
                          className="bg-background dark:bg-slate-900 border border-borderCustom rounded-lg px-2.5 py-1.5 text-xs font-semibold text-right text-foreground focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue/20 w-44"
                          required
                        />
                      ) : (
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100 text-right">{profileMemberSince}</span>
                      )}
                    </div>

                    {/* Office Branch */}
                    <div className="py-3.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
                        <MapPin size={14} className="text-slate-400" />
                        <span className="text-xs font-medium">Office branch</span>
                      </div>
                      {editing ? (
                        <input
                          type="text"
                          value={profileOfficeBranch}
                          onChange={(e) => setProfileOfficeBranch(e.target.value)}
                          className="bg-background dark:bg-slate-900 border border-borderCustom rounded-lg px-2.5 py-1.5 text-xs font-semibold text-right text-foreground focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue/20 w-44"
                          required
                        />
                      ) : (
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100 text-right">{profileOfficeBranch}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* CONTACT DETAILS CARD */}
                <div className="bg-cardBg border border-borderCustom rounded-2xl p-5 shadow-sm space-y-4">
                  <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5 pb-2 border-b border-borderCustom/60">
                    <Mail size={14} className="text-primaryBlue" />
                    Contact
                  </h3>
                  <div className="divide-y divide-borderCustom/60">
                    {/* Email */}
                    <div className="py-3.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
                        <Mail size={14} className="text-slate-400" />
                        <span className="text-xs font-medium">Email</span>
                      </div>
                      {editing ? (
                        <input
                          type="email"
                          value={profileEmail}
                          onChange={(e) => setProfileEmail(e.target.value)}
                          className="bg-background dark:bg-slate-900 border border-borderCustom rounded-lg px-2.5 py-1.5 text-xs font-semibold text-right text-foreground focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue/20 w-44"
                          required
                        />
                      ) : (
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100 text-right truncate max-w-[170px]" title={profileEmail}>{profileEmail}</span>
                      )}
                    </div>

                    {/* Direct Phone */}
                    <div className="py-3.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
                        <Phone size={14} className="text-slate-400" />
                        <span className="text-xs font-medium">Direct phone</span>
                      </div>
                      {editing ? (
                        <input
                          type="text"
                          value={profilePhone}
                          onChange={(e) => setProfilePhone(e.target.value)}
                          className="bg-background dark:bg-slate-900 border border-borderCustom rounded-lg px-2.5 py-1.5 text-xs font-semibold text-right text-foreground focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue/20 w-44"
                          required
                        />
                      ) : (
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100 text-right">{profilePhone}</span>
                      )}
                    </div>

                    {/* LinkedIn */}
                    <div className="py-3.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 shrink-0">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                        <span className="text-xs font-medium">LinkedIn</span>
                      </div>
                      {editing ? (
                        <input
                          type="text"
                          value={profileLinkedin}
                          onChange={(e) => setProfileLinkedin(e.target.value)}
                          className="bg-background dark:bg-slate-900 border border-borderCustom rounded-lg px-2.5 py-1.5 text-xs font-semibold text-right text-foreground focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue/20 w-44"
                        />
                      ) : (
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100 text-right truncate max-w-[170px]" title={profileLinkedin}>{profileLinkedin}</span>
                      )}
                    </div>

                    {/* Location */}
                    <div className="py-3.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
                        <MapPin size={14} className="text-slate-400" />
                        <span className="text-xs font-medium">Location</span>
                      </div>
                      {editing ? (
                        <input
                          type="text"
                          value={profileLocation}
                          onChange={(e) => setProfileLocation(e.target.value)}
                          className="bg-background dark:bg-slate-900 border border-borderCustom rounded-lg px-2.5 py-1.5 text-xs font-semibold text-right text-foreground focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue/20 w-44"
                          required
                        />
                      ) : (
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100 text-right">{profileLocation}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* ADMIN DETAILS CARD */}
                <div className="bg-cardBg border border-borderCustom rounded-2xl p-5 shadow-sm space-y-4">
                  <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5 pb-2 border-b border-borderCustom/60">
                    <Shield size={14} className="text-primaryBlue" />
                    Admin Details
                  </h3>
                  <div className="divide-y divide-borderCustom/60">
                    {/* Role */}
                    <div className="py-3.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
                        <Shield size={14} className="text-slate-400" />
                        <span className="text-xs font-medium">Role</span>
                      </div>
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100 text-right">Super Administrator</span>
                    </div>

                    {/* Team Assigned */}
                    <div className="py-3.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
                        <Users size={14} className="text-slate-400" />
                        <span className="text-xs font-medium">Team assigned</span>
                      </div>
                      {editing ? (
                        <input
                          type="text"
                          value={profileTeamAssigned}
                          onChange={(e) => setProfileTeamAssigned(e.target.value)}
                          className="bg-background dark:bg-slate-900 border border-borderCustom rounded-lg px-2.5 py-1.5 text-xs font-semibold text-right text-foreground focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue/20 w-44"
                          required
                        />
                      ) : (
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100 text-right">{profileTeamAssigned}</span>
                      )}
                    </div>

                    {/* Custom Badge */}
                    <div className="py-3.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
                        <Award size={14} className="text-slate-400" />
                        <span className="text-xs font-medium">Custom badge</span>
                      </div>
                      {editing ? (
                        <input
                          type="text"
                          value={profileBadge}
                          onChange={(e) => setProfileBadge(e.target.value)}
                          placeholder="e.g. FCA"
                          className="bg-background dark:bg-slate-900 border border-borderCustom rounded-lg px-2.5 py-1.5 text-xs font-semibold text-right text-foreground focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue/20 w-44"
                        />
                      ) : (
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100 text-right">{profileBadge || 'None'}</span>
                      )}
                    </div>

                    {/* Joined Firm */}
                    <div className="py-3.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
                        <Calendar size={14} className="text-slate-400" />
                        <span className="text-xs font-medium">Joined firm</span>
                      </div>
                      {editing ? (
                        <input
                          type="text"
                          value={profileJoinedFirm}
                          onChange={(e) => setProfileJoinedFirm(e.target.value)}
                          className="bg-background dark:bg-slate-900 border border-borderCustom rounded-lg px-2.5 py-1.5 text-xs font-semibold text-right text-foreground focus:outline-none focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue/20 w-44"
                          required
                        />
                      ) : (
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100 text-right">{profileJoinedFirm}</span>
                      )}
                    </div>

                    {/* Last Active */}
                    <div className="py-3.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
                        <Clock size={14} className="text-slate-400" />
                        <span className="text-xs font-medium">Last active</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-650 dark:text-emerald-400 text-right">Active now</span>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            {/* Security Change Password Settings */}
            <SecuritySettings />

            {/* Authorized Dashboard Access Control */}
            <div className="bg-cardBg border border-borderCustom rounded-2xl p-6 relative overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primaryBlue/5 rounded-full blur-3xl"></div>
              
              <h2 className="text-base md:text-lg font-forum font-bold text-primaryBlue mb-1 flex items-center gap-2.5">
                <Users size={18} className="text-primaryBlue/80" />
                Authorized Dashboard Access
              </h2>
              <p className="text-[11px] text-slate-500 mb-6 dark:text-slate-400">
                Manage administrators allowed to log in. Emails not on this list will be denied entry to the dashboard.
              </p>

              {allowedEmailsError && (
                <div className="mb-5 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-955 border border-rose-250 dark:border-rose-900/30 text-rose-700 dark:text-rose-400 text-xs flex items-center gap-2 animate-fade-in shadow-sm">
                  <span className="text-rose-500 font-bold">⚠️</span>
                  <span>{allowedEmailsError}</span>
                </div>
              )}

              {allowedEmailsSuccess && (
                <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs flex items-center gap-2 animate-fade-in shadow-sm">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>{allowedEmailsSuccess}</span>
                </div>
              )}

              {/* Add New Allowed Email Form */}
              <form onSubmit={handleAddAllowedEmail} className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail size={14} />
                  </div>
                  <input
                    type="email"
                    value={newAllowedEmail}
                    onChange={(e) => setNewAllowedEmail(e.target.value)}
                    placeholder="new-admin@mrnp.in"
                    className="w-full pl-9 pr-4 py-2.5 bg-background border border-borderCustom focus:border-primaryBlue focus:ring-1 focus:ring-primaryBlue/20 focus:outline-none transition rounded-lg text-xs text-foreground font-semibold"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={addAllowedEmailLoading}
                  className="bg-primaryBlue hover:opacity-95 disabled:opacity-50 text-white font-semibold text-xs py-2.5 px-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 shrink-0"
                >
                  {addAllowedEmailLoading ? 'Adding...' : (
                    <>
                      <Plus size={14} />
                      Authorize Email
                    </>
                  )}
                </button>
              </form>

              {/* Allowed Emails list */}
              <div className="border border-borderCustom rounded-xl overflow-hidden bg-background/30">
                <div className="px-4 py-2.5 bg-background border-b border-borderCustom text-[10px] uppercase font-bold tracking-wider text-slate-500 flex justify-between">
                  <span>Authorized Administrator Email</span>
                  <span>Actions</span>
                </div>
                
                {allowedEmailsLoading ? (
                  <div className="p-8 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-primaryBlue" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Loading authorized access records...
                  </div>
                ) : allowedEmails.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400 italic">
                    No authorized emails registered. All users will be allowed entry.
                  </div>
                ) : (
                  <div className="divide-y divide-borderCustom max-h-60 overflow-y-auto">
                    {allowedEmails.map((item: any) => {
                      const isSelf = user?.email?.toLowerCase() === item.email?.toLowerCase();
                      return (
                        <div key={item._id || item.id} className="px-4 py-3 flex items-center justify-between text-xs hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                          <div className="flex items-center gap-2.5 overflow-hidden pr-4">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isSelf ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600' : 'bg-primaryBlue/5 text-primaryBlue'}`}>
                              <Mail size={12} />
                            </div>
                            <span className="font-semibold text-slate-800 dark:text-slate-200 truncate select-all">{item.email}</span>
                            {isSelf && (
                              <span className="inline-flex px-1.5 py-0.5 text-[8px] uppercase font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 rounded border border-emerald-200/50">
                                You
                              </span>
                            )}
                          </div>
                          
                          <div>
                            {isSelf ? (
                              <span className="text-[10px] text-slate-400 font-semibold italic select-none">Protected</span>
                            ) : (
                              <button
                                onClick={() => handleDeleteAllowedEmail(item._id || item.id)}
                                disabled={deleteAllowedEmailLoading === (item._id || item.id)}
                                className="p-1.5 rounded-lg border border-borderCustom hover:border-rose-200 hover:bg-rose-50 dark:hover:bg-rose-955 text-slate-400 hover:text-rose-650 transition duration-150 cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed"
                                title="Revoke Access Authorization"
                              >
                                {deleteAllowedEmailLoading === (item._id || item.id) ? (
                                  <svg className="animate-spin h-3.5 w-3.5 text-rose-600" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                  </svg>
                                ) : (
                                  <Trash2 size={13} />
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Slide-over review drawer card */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-end font-instrument">
          {/* Backdrop screen glass shading */}
          <div
            className="absolute inset-0 bg-black/45 backdrop-blur-sm transition-opacity"
            onClick={() => { setSelectedApp(null); setShowEmailModal(false); }}
          ></div>

          {/* Drawer Body Container */}
          <div className="relative w-full max-w-lg h-full bg-cardBg border-l border-borderCustom p-5 md:p-6 flex flex-col justify-between overflow-y-auto shadow-2xl z-10 animate-slide-in">
            
            <div>
              {/* Header inside drawer */}
              <div className="flex justify-between items-start pb-4 border-b border-borderCustom mb-5">
                <div>
                  <span className="text-[9px] tracking-widest uppercase font-bold text-primaryBlue">Candidate Profile review</span>
                  <h2 className="text-xl font-forum font-bold text-primaryBlue mt-0.5">{selectedApp.name}</h2>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{selectedApp.email}</p>
                </div>
                <button
                  onClick={() => { setSelectedApp(null); setShowEmailModal(false); }}
                  className="p-1.5 rounded-full bg-background hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Data entry info sheets */}
              <div className="space-y-4 text-xs">
                
                {/* Contact information details */}
                <div>
                  <h3 className="text-[10px] uppercase tracking-wider text-primaryBlue font-bold mb-2">Contact Details</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-background border border-borderCustom p-2.5 rounded shadow-sm">
                      <p className="text-[9px] text-slate-400 font-semibold uppercase">Mobile Phone</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{selectedApp.phone}</p>
                    </div>
                    <div className="bg-background border border-borderCustom p-2.5 rounded shadow-sm">
                      <p className="text-[9px] text-slate-400 font-semibold uppercase">Email Address</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 truncate select-all">{selectedApp.email}</p>
                    </div>
                  </div>
                </div>

                {/* Job specifics */}
                <div>
                  <h3 className="text-[10px] uppercase tracking-wider text-primaryBlue font-bold mb-2">Target Role</h3>
                  <div className="bg-background border border-borderCustom p-3 rounded-lg space-y-2.5 shadow-sm">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-[9px] text-slate-400 font-semibold uppercase">Department</p>
                        <p className="font-bold text-primaryBlue mt-0.5">{selectedApp.jobDepartment || selectedApp.job_department}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 font-semibold uppercase">City Location</p>
                        <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{selectedApp.jobCity || selectedApp.job_city}</p>
                      </div>
                    </div>
                    <div className="border-t border-borderCustom pt-2">
                      <p className="text-[9px] text-slate-400 font-semibold uppercase">Applied Position</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{selectedApp.jobPosition || selectedApp.job_position}</p>
                    </div>
                  </div>
                </div>

                {/* Academic & Experience */}
                <div>
                  <h3 className="text-[10px] uppercase tracking-wider text-primaryBlue font-bold mb-2">Qualifications</h3>
                  <div className="bg-background border border-borderCustom p-3 rounded-lg space-y-2 shadow-sm">
                    <div>
                      <p className="text-[9px] text-slate-400 font-semibold uppercase">Education Level</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{selectedApp.education}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 border-t border-borderCustom pt-2">
                      <div>
                        <p className="text-[9px] text-slate-400 font-semibold uppercase">Experience</p>
                        <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{selectedApp.experience} Years</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 font-semibold uppercase">Current Employer</p>
                        <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 truncate">{selectedApp.currentCompany || selectedApp.current_company || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Document Downloads */}
                <div>
                  <h3 className="text-[10px] uppercase tracking-wider text-primaryBlue font-bold mb-2">Resume Attachment</h3>
                  <a
                    href={getResumeUrl(selectedApp.resumePath || selectedApp.resume_path)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-primaryBlue/5 hover:bg-primaryBlue/10 border border-primaryBlue/10 text-primaryBlue font-medium transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Download size={14} className="text-primaryBlue" />
                      <span className="text-[11px] font-bold truncate max-w-[200px]">Download_Resume_Document.pdf</span>
                    </div>
                    <span className="text-[11px] underline">Open Attachment</span>
                  </a>
                </div>

                {/* Automation trigger tools */}
                <div className="border-t border-borderCustom pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-forum font-bold text-primaryBlue">Hiring Automation Workflows</h3>
                    
                    {/* Send Email Automation Trigger */}
                    <button
                      onClick={() => setShowEmailModal(true)}
                      className="py-1 px-3 bg-primaryBlue hover:opacity-90 text-white font-semibold text-[10px] rounded-full shadow-sm transition flex items-center gap-1 cursor-pointer"
                    >
                      <Mail size={12} />
                      Automate Email
                    </button>
                  </div>

                  {/* Standard Decision variables */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-[9px] text-slate-400 uppercase font-bold mb-1">Update Pipeline Status</label>
                      <select
                        value={adminStatus}
                        onChange={(e) => setAdminStatus(e.target.value as any)}
                        className="w-full px-3 py-1.5 bg-background border border-borderCustom text-foreground text-xs rounded"
                      >
                        <option value="Pending">Pending (Default)</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] text-slate-400 uppercase font-bold mb-1">Administrative Comments</label>
                    <textarea
                      rows={2}
                      placeholder="Enter review findings or comments..."
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-borderCustom text-foreground text-xs rounded resize-none focus:border-primaryBlue focus:outline-none"
                    ></textarea>
                  </div>
                </div>

                {/* Dynamic correspondence logs log */}
                <div className="border-t border-borderCustom pt-4">
                  <h3 className="text-[10px] uppercase tracking-wider text-primaryBlue font-bold mb-2 flex items-center gap-1">
                    <Clock size={12} />
                    Correspondence Log History
                  </h3>
                  {emailHistory.length === 0 ? (
                    <p className="text-[10px] text-slate-450 italic">No automated outreach correspondence logged yet.</p>
                  ) : (
                    <div className="space-y-2 max-h-36 overflow-y-auto">
                      {emailHistory.map((log: any, idx: number) => (
                        <div key={idx} className="bg-background border border-borderCustom p-2 rounded text-[10px]">
                          <div className="flex justify-between font-bold text-slate-700 dark:text-slate-350">
                            <span className="uppercase text-primaryBlue">{log.type} template</span>
                            <span>{new Date(log.createdAt || log.created_at).toLocaleDateString()}</span>
                          </div>
                          <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 line-clamp-1">{log.subject}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Save operations */}
            <div className="pt-4 border-t border-borderCustom flex gap-3 mt-4">
              <button
                onClick={saveAdminData}
                className="flex-1 bg-primaryBlue hover:opacity-90 text-white font-semibold text-xs py-2.5 rounded-full shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Persist Decisions
              </button>
              <button
                onClick={() => { setSelectedApp(null); setShowEmailModal(false); }}
                className="bg-cardBg hover:bg-background text-foreground font-semibold text-xs py-2.5 px-5 border border-borderCustom rounded-full transition cursor-pointer"
              >
                Dismiss
              </button>
            </div>

          </div>

          {/* Email Template automation popover modal */}
          {showEmailModal && (
            <div className="absolute inset-0 bg-cardBg/95 z-30 p-5 flex flex-col justify-between animate-fade-in">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-borderCustom">
                  <div>
                    <h3 className="font-forum font-bold text-primaryBlue text-lg">Send Candidate Outreach</h3>
                    <p className="text-[10px] text-slate-450 mt-0.5">Dispatches template email communication to {selectedApp.email}</p>
                  </div>
                  <button
                    onClick={() => setShowEmailModal(false)}
                    className="p-1 rounded-full bg-background hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>

                {emailSuccessMessage && (
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-250 text-emerald-700 text-[10px] font-semibold">
                    {emailSuccessMessage}
                  </div>
                )}

                {emailErrorMessage && (
                  <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-250 text-rose-700 text-[10px] font-semibold">
                    {emailErrorMessage}
                  </div>
                )}

                <form onSubmit={handleSendEmail} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-1">Select Email Template</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setEmailTemplate('interview')}
                        className={`py-2 px-1 text-center rounded border font-bold ${
                          emailTemplate === 'interview'
                            ? 'bg-primaryBlue text-white border-primaryBlue'
                            : 'bg-background text-foreground border-borderCustom hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        Interview invitation
                      </button>
                      <button
                        type="button"
                        onClick={() => setEmailTemplate('rejection')}
                        className={`py-2 px-1 text-center rounded border font-bold ${
                          emailTemplate === 'rejection'
                            ? 'bg-primaryBlue text-white border-primaryBlue'
                            : 'bg-background text-foreground border-borderCustom hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        Rejection letter
                      </button>
                      <button
                        type="button"
                        onClick={() => setEmailTemplate('offer')}
                        className={`py-2 px-1 text-center rounded border font-bold ${
                          emailTemplate === 'offer'
                            ? 'bg-primaryBlue text-white border-primaryBlue'
                            : 'bg-background text-foreground border-borderCustom hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        Offer document
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-1">Subject</label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground font-semibold"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-1">Body Context</label>
                    <textarea
                      rows={8}
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-borderCustom focus:border-primaryBlue focus:outline-none transition rounded text-xs text-foreground font-mono resize-none leading-relaxed"
                      required
                    />
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      type="submit"
                      disabled={sendingEmail}
                      className="flex-1 bg-primaryBlue hover:opacity-90 disabled:opacity-50 text-white font-semibold text-xs py-2.5 rounded-full shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Send size={12} />
                      {sendingEmail ? 'Dispatching...' : 'Dispatch Automated Email'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowEmailModal(false)}
                      className="bg-cardBg hover:bg-background text-foreground font-semibold text-xs py-2.5 px-5 border border-borderCustom rounded-full transition cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
