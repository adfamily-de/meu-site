import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { 
  OrganizationSettings, 
  Missionary, 
  Beneficiary, 
  UrgentProject, 
  Product, 
  BlogPost, 
  Suggestion, 
  VolunteerApplication,
  ContactMessage,
  NewsletterSubscriber,
  Donation
} from '@/types';
import { 
  defaultOrganizationSettings, 
  defaultMissionaries, 
  defaultBeneficiaries, 
  defaultUrgentProjects,
  defaultProducts,
  defaultBlogPosts
} from '@/data/initialData';

// State interface
interface AppState {
  settings: OrganizationSettings;
  missionaries: Missionary[];
  beneficiaries: Beneficiary[];
  urgentProjects: UrgentProject[];
  products: Product[];
  blogPosts: BlogPost[];
  suggestions: Suggestion[];
  volunteerApplications: VolunteerApplication[];
  contactMessages: ContactMessage[];
  newsletterSubscribers: NewsletterSubscriber[];
  donations: Donation[];
  isAdmin: boolean;
  language: 'pt' | 'en';
}

// Action types
type Action =
  | { type: 'UPDATE_SETTINGS'; payload: OrganizationSettings }
  | { type: 'UPDATE_MISSIONARIES'; payload: Missionary[] }
  | { type: 'ADD_MISSIONARY'; payload: Missionary }
  | { type: 'UPDATE_MISSIONARY'; payload: Missionary }
  | { type: 'DELETE_MISSIONARY'; payload: string }
  | { type: 'UPDATE_BENEFICIARIES'; payload: Beneficiary[] }
  | { type: 'ADD_BENEFICIARY'; payload: Beneficiary }
  | { type: 'UPDATE_BENEFICIARY'; payload: Beneficiary }
  | { type: 'DELETE_BENEFICIARY'; payload: string }
  | { type: 'UPDATE_URGENT_PROJECTS'; payload: UrgentProject[] }
  | { type: 'UPDATE_PRODUCTS'; payload: Product[] }
  | { type: 'UPDATE_BLOG_POSTS'; payload: BlogPost[] }
  | { type: 'ADD_SUGGESTION'; payload: Suggestion }
  | { type: 'ADD_VOLUNTEER_APPLICATION'; payload: VolunteerApplication }
  | { type: 'ADD_CONTACT_MESSAGE'; payload: ContactMessage }
  | { type: 'ADD_NEWSLETTER_SUBSCRIBER'; payload: NewsletterSubscriber }
  | { type: 'ADD_DONATION'; payload: Donation }
  | { type: 'SET_ADMIN'; payload: boolean }
  | { type: 'SET_LANGUAGE'; payload: 'pt' | 'en' }
  | { type: 'LOAD_STATE'; payload: AppState };

// Initial state
const initialState: AppState = {
  settings: defaultOrganizationSettings,
  missionaries: defaultMissionaries,
  beneficiaries: defaultBeneficiaries,
  urgentProjects: defaultUrgentProjects,
  products: defaultProducts,
  blogPosts: defaultBlogPosts,
  suggestions: [],
  volunteerApplications: [],
  contactMessages: [],
  newsletterSubscribers: [],
  donations: [],
  isAdmin: false,
  language: 'pt'
};

// Reducer
function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'UPDATE_SETTINGS':
      return { ...state, settings: action.payload };
    
    case 'UPDATE_MISSIONARIES':
      return { ...state, missionaries: action.payload };
    
    case 'ADD_MISSIONARY':
      return { ...state, missionaries: [...state.missionaries, action.payload] };
    
    case 'UPDATE_MISSIONARY':
      return {
        ...state,
        missionaries: state.missionaries.map(m => 
          m.id === action.payload.id ? action.payload : m
        )
      };
    
    case 'DELETE_MISSIONARY':
      return {
        ...state,
        missionaries: state.missionaries.filter(m => m.id !== action.payload)
      };
    
    case 'UPDATE_BENEFICIARIES':
      return { ...state, beneficiaries: action.payload };
    
    case 'ADD_BENEFICIARY':
      return { ...state, beneficiaries: [...state.beneficiaries, action.payload] };
    
    case 'UPDATE_BENEFICIARY':
      return {
        ...state,
        beneficiaries: state.beneficiaries.map(b => 
          b.id === action.payload.id ? action.payload : b
        )
      };
    
    case 'DELETE_BENEFICIARY':
      return {
        ...state,
        beneficiaries: state.beneficiaries.filter(b => b.id !== action.payload)
      };
    
    case 'UPDATE_URGENT_PROJECTS':
      return { ...state, urgentProjects: action.payload };
    
    case 'UPDATE_PRODUCTS':
      return { ...state, products: action.payload };
    
    case 'UPDATE_BLOG_POSTS':
      return { ...state, blogPosts: action.payload };
    
    case 'ADD_SUGGESTION':
      return { ...state, suggestions: [...state.suggestions, action.payload] };
    
    case 'ADD_VOLUNTEER_APPLICATION':
      return { ...state, volunteerApplications: [...state.volunteerApplications, action.payload] };
    
    case 'ADD_CONTACT_MESSAGE':
      return { ...state, contactMessages: [...state.contactMessages, action.payload] };
    
    case 'ADD_NEWSLETTER_SUBSCRIBER':
      return { ...state, newsletterSubscribers: [...state.newsletterSubscribers, action.payload] };
    
    case 'ADD_DONATION':
      return { ...state, donations: [...state.donations, action.payload] };
    
    case 'SET_ADMIN':
      return { ...state, isAdmin: action.payload };
    
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    
    case 'LOAD_STATE':
      return action.payload;
    
    default:
      return state;
  }
}

// Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider
interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('missionaryAppState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'LOAD_STATE', payload: { ...initialState, ...parsedState } });
      } catch (error) {
        console.error('Error loading state from localStorage:', error);
      }
    }
  }, []);

  // Save state to localStorage on change
  useEffect(() => {
    const stateToSave = {
      settings: state.settings,
      missionaries: state.missionaries,
      beneficiaries: state.beneficiaries,
      urgentProjects: state.urgentProjects,
      products: state.products,
      blogPosts: state.blogPosts,
      suggestions: state.suggestions,
      volunteerApplications: state.volunteerApplications,
      contactMessages: state.contactMessages,
      newsletterSubscribers: state.newsletterSubscribers,
      donations: state.donations,
      language: state.language
    };
    localStorage.setItem('missionaryAppState', JSON.stringify(stateToSave));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// Helper hooks
export function useSettings() {
  const { state } = useApp();
  return state.settings;
}

export function useMissionaries() {
  const { state } = useApp();
  return state.missionaries;
}

export function useVisibleMissionaries() {
  const { state } = useApp();
  return state.missionaries.filter(m => m.isVisible);
}

export function useBeneficiaries() {
  const { state } = useApp();
  return state.beneficiaries;
}

export function useUrgentBeneficiaries() {
  const { state } = useApp();
  return state.beneficiaries.filter(b => b.status === 'urgent');
}

export function useFeaturedBeneficiaries() {
  const { state } = useApp();
  return state.beneficiaries.filter(b => b.isFeatured);
}

export function useUrgentProjects() {
  const { state } = useApp();
  return state.urgentProjects;
}

export function useProducts() {
  const { state } = useApp();
  return state.products;
}

export function useBlogPosts() {
  const { state } = useApp();
  return state.blogPosts;
}

export function useIsAdmin() {
  const { state } = useApp();
  return state.isAdmin;
}

export function useLanguage() {
  const { state } = useApp();
  return state.language;
}
