// Tipos principais do sistema missionário

export interface OrganizationSettings {
  name: string;
  familyName: string;
  logo: string;
  verseMotto: string;
  coverPhoto: string;
  missionStory: string;
  missionStartDate: string;
  currentField: {
    province: string;
    district: string;
    country: string;
  };
  contact: {
    phoneMozambique: string;
    whatsapp: string;
    email: string;
    physicalAddress: string;
    additionalLinks: AdditionalContactLink[];
  };
  socialMedia: {
    facebook: string;
    instagram: string;
    youtube: string;
    tiktok: string;
    kwai: string;
  };
  adventistResources: {
    hopeChannel: string;
    adventistReview: string;
    sabbathSchool: string;
  };
  showBankDetails: boolean;
  bankDetails: BankDetails;
}

export interface AdditionalContactLink {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export interface BankDetails {
  bim: {
    accountName: string;
    accountNumber: string;
    iban: string;
    swift: string;
  };
  standardBank: {
    accountName: string;
    accountNumber: string;
    iban: string;
    swift: string;
  };
  millenniumBim: {
    accountName: string;
    accountNumber: string;
    iban: string;
  };
}

export interface Missionary {
  id: string;
  name: string;
  photo: string;
  field: string;
  arrivalDate: string;
  specialty: string;
  status: 'active' | 'vacation' | 'returned' | 'transition';
  isVisible: boolean;
  type: 'main' | 'applicator' | 'local';
  bio?: string;
  testimony?: string;
  familyMembers?: FamilyMember[];
  contact?: {
    email?: string;
    phone?: string;
  };
}

export interface FamilyMember {
  name: string;
  relationship: string;
  age?: number;
  photo?: string;
  role?: string;
}

export interface Beneficiary {
  id: string;
  name: string;
  age: number;
  location: {
    province: string;
    district: string;
    village?: string;
  };
  photo: string;
  story: string;
  needAmount: number;
  raisedAmount: number;
  status: 'urgent' | 'in_progress' | 'completed';
  category: string;
  deadline?: string;
  updates?: Update[];
  isFeatured: boolean;
}

export interface Update {
  date: string;
  content: string;
  photo?: string;
}

export interface UrgentProject {
  id: string;
  title: string;
  description: string;
  image: string;
  needAmount: number;
  raisedAmount: number;
  deadline: string;
  status: 'urgent' | 'in_progress' | 'completed';
  beneficiaryId?: string;
}

export interface Ministry {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  quote?: string;
  quoteAuthor?: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

export interface EducationProject {
  name: string;
  description: string;
  students: number;
  classes: number;
  passRate: number;
  materials: string[];
  successStories: SuccessStory[];
  gallery: string[];
}

export interface SuccessStory {
  name: string;
  age: number;
  photo: string;
  beforeStory: string;
  afterStory: string;
}

export interface FarmProject {
  name: string;
  description: string;
  areas: FarmArea[];
  impact: {
    teamFeeding: string;
    communityDonation: string;
    projectIncome: string;
    farmersTrained: number;
  };
  needs: string[];
  raisedAmount: number;
  goalAmount: number;
  gallery: string[];
}

export interface FarmArea {
  id: string;
  name: string;
  description: string;
  icon: string;
  photo: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  stock: number;
  isAvailable: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  gallery?: string[];
}

export interface GalleryAlbum {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  images: string[];
  videos?: string[];
}

export interface Suggestion {
  id: string;
  name: string;
  email: string;
  category: string;
  message: string;
  isAnonymous: boolean;
  date: string;
  status: 'new' | 'read' | 'responded';
}

export interface VolunteerOpportunity {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  duration: string;
  image: string;
}

export interface VolunteerApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  area: string;
  message: string;
  availability: string;
  date: string;
}

export interface TransparencyReport {
  id: string;
  quarter: string;
  year: number;
  totalRaised: number;
  totalSpent: number;
  categories: {
    name: string;
    amount: number;
    percentage: number;
  }[];
  metrics: {
    livesImpacted: number;
    baptisms: number;
    churchesPlanted: number;
    peopleFed: number;
    studentsEducated: number;
  };
  pdfUrl: string;
}

export interface DailyDevotional {
  date: string;
  verse: string;
  verseReference: string;
  reflection: string;
  author: string;
  image?: string;
}

export interface EGWQuote {
  id: string;
  quote: string;
  reference: string;
  category: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'new' | 'read' | 'responded';
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name: string;
  date: string;
  isActive: boolean;
}

export interface Donation {
  id: string;
  amount: number;
  currency: string;
  donorName: string;
  donorEmail: string;
  destination: string;
  message?: string;
  date: string;
  status: 'pending' | 'confirmed' | 'rejected';
  proofImage?: string;
}

export type ViewMode = 'grid' | 'list' | 'map';

export type FilterOption = 'all' | 'active' | 'vacation' | 'returned' | 'transition';

export type Province = 'all' | 'maputo' | 'gaza' | 'inhambane' | 'sofala' | 'manica' | 'tete' | 'zambezia' | 'nampula' | 'cabo-delgado' | 'niassa';
