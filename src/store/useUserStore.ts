import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserMode = 'worker' | 'employer';

// Supported Indian Languages (22+ official + regional)
export type SupportedLanguage =
    | 'en'  // English
    | 'hi'  // Hindi
    | 'ta'  // Tamil
    | 'te'  // Telugu
    | 'kn'  // Kannada
    | 'mr'  // Marathi
    | 'gu'  // Gujarati
    | 'bn'  // Bengali
    | 'ml'  // Malayalam
    | 'pa'  // Punjabi
    | 'or'  // Odia
    | 'as'  // Assamese
    | 'ur'  // Urdu
    | 'ks'  // Kashmiri
    | 'kok' // Konkani
    | 'mni' // Manipuri
    | 'ne'  // Nepali
    | 'brx' // Bodo
    | 'doi' // Dogri
    | 'mai' // Maithili
    | 'sat' // Santali
    | 'sd'; // Sindhi

// Layer 1: General Profile (Mandatory)
export interface GeneralProfile {
    id: string; // Phone number as ID for now
    name: string;
    phone: string;
    email?: string;
    city: string;
    language: SupportedLanguage;
    kycStatus: 'verified' | 'pending' | 'none';
    profileImage?: string;
}

// Layer 2: Worker Profile (Optional)
export interface WorkerProfile {
    title?: string;     // e.g., "Master Plumber"
    bio?: string;       // About me text
    skills: string[]; // e.g., ["Plumber", "Painter"]
    experienceYears: number;
    dailyRate: number;
    serviceRadiusKm: number;
    portfolioImages: string[];
    availability: boolean;
    rating: number;     // calculated
    ratingCount: number; // count
}

// Layer 3: Employer Profile (Optional)
export interface EmployerProfile {
    companyName?: string; // Optional if individual
    categories: string[]; // e.g., ["Construction", "Events"]
    gstNumber?: string;
    hiringHistoryCount: number;
    rating: number;
}

interface UserState {
    // App State
    mode: UserMode;
    setMode: (mode: UserMode) => void;
    isAuthenticated: boolean;
    setAuthenticated: (status: boolean) => void;
    languageSelected: boolean;
    setLanguageSelected: (status: boolean) => void;
    preferredLanguage: SupportedLanguage;

    // Profile Data
    generalProfile: GeneralProfile | null;
    workerProfile: WorkerProfile | null;
    employerProfile: EmployerProfile | null;

    // Actions
    login: (phone: string, token?: string, userData?: any) => void;
    logout: () => void;

    // Profile Management Actions
    updateGeneralProfile: (data: Partial<GeneralProfile>) => void;
    updateWorkerProfile: (data: Partial<WorkerProfile>) => void;
    updateEmployerProfile: (data: Partial<EmployerProfile>) => void;
    setLanguage: (language: SupportedLanguage) => void;

    // Helper ...
    isProfileReady: () => boolean;
    isLanguageSelected: () => boolean;
}

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            mode: 'worker',
            isAuthenticated: false,
            languageSelected: false,
            preferredLanguage: 'hi',

            generalProfile: null,
            workerProfile: null,
            employerProfile: null,

            setMode: (mode) => set({ mode }),
            setAuthenticated: (status) => set({ isAuthenticated: status }),
            setLanguageSelected: (status) => set({ languageSelected: status }),

            login: (phone, token, userData) => {
                if (token) {
                    localStorage.setItem('token', token);
                    if (typeof document !== 'undefined') {
                        document.cookie = `auth_token=${token}; path=/; max-age=31536000; SameSite=Lax`;
                    }
                }

                if (userData) {
                    set({
                        isAuthenticated: true,
                        generalProfile: userData.generalProfile || {
                            id: userData.id,
                            phone: userData.phone,
                            name: userData.name || '',
                            city: userData.city || '',
                            language: userData.language || get().preferredLanguage,
                            kycStatus: userData.kycStatus || 'none'
                        },
                        workerProfile: userData.workerProfile ? JSON.parse(JSON.stringify(userData.workerProfile)) : null,
                        employerProfile: userData.employerProfile || null,
                        languageSelected: !!userData.language || get().languageSelected,
                        preferredLanguage: userData.language || get().preferredLanguage,
                    });
                    return;
                }

                // Minimal login
                const currentLanguage = get().preferredLanguage;
                const currentLangSelected = get().languageSelected;

                set({
                    isAuthenticated: true,
                    languageSelected: currentLangSelected,
                    generalProfile: {
                        id: phone,
                        name: "",
                        phone: phone,
                        city: "",
                        language: currentLanguage,
                        kycStatus: 'none'
                    },
                    workerProfile: null,
                    employerProfile: null
                });
            },

            logout: () => {
                localStorage.removeItem('token');
                if (typeof document !== 'undefined') {
                    document.cookie = `auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
                }
                set({
                    isAuthenticated: false,
                    generalProfile: null,
                    workerProfile: null,
                    employerProfile: null
                });
            },

            updateGeneralProfile: (data) => set((state) => ({
                generalProfile: state.generalProfile ? { ...state.generalProfile, ...data } : null
            })),

            updateWorkerProfile: (data) => set((state) => ({
                workerProfile: state.workerProfile
                    ? { ...state.workerProfile, ...data }
                    : {
                        skills: [],
                        experienceYears: 0,
                        dailyRate: 500,
                        serviceRadiusKm: 5,
                        portfolioImages: [],
                        availability: true,
                        rating: 0,
                        ratingCount: 0,
                        ...data
                    } as WorkerProfile
            })),

            updateEmployerProfile: (data) => set((state) => ({
                employerProfile: state.employerProfile
                    ? { ...state.employerProfile, ...data }
                    : {
                        categories: [],
                        hiringHistoryCount: 0,
                        rating: 0,
                        ...data
                    } as EmployerProfile
            })),

            setLanguage: (language) => set((state) => ({
                preferredLanguage: language,
                generalProfile: state.generalProfile
                    ? { ...state.generalProfile, language }
                    : null,
                languageSelected: true
            })),

            isProfileReady: () => {
                const state = get();
                if (!state.isAuthenticated || !state.generalProfile) return false;

                if (state.mode === 'worker') {
                    return !!state.workerProfile;
                } else {
                    return !!state.employerProfile;
                }
            },

            isLanguageSelected: () => {
                const state = get();
                return state.languageSelected;
            }
        }),
        {
            name: 'shramsetu-storage-v2',
        }
    )
);
