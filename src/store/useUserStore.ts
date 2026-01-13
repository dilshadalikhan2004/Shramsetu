import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserMode = 'worker' | 'employer';

// Layer 1: General Profile (Mandatory)
export interface GeneralProfile {
    id: string; // Phone number as ID for now
    name: string;
    phone: string;
    email?: string;
    city: string;
    language: 'en' | 'hi';
    kycStatus: 'verified' | 'pending' | 'none';
    profileImage?: string;
}

// Layer 2: Worker Profile (Optional)
export interface WorkerProfile {
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

    // Profile Data
    generalProfile: GeneralProfile | null;
    workerProfile: WorkerProfile | null;
    employerProfile: EmployerProfile | null;

    // Actions
    login: (phone: string) => void;
    logout: () => void;

    // Profile Management Actions
    updateGeneralProfile: (data: Partial<GeneralProfile>) => void;
    updateWorkerProfile: (data: Partial<WorkerProfile>) => void;
    updateEmployerProfile: (data: Partial<EmployerProfile>) => void;

    // Helper to check if current mode profile is ready
    isProfileReady: () => boolean;
}

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            mode: 'worker',
            isAuthenticated: false,

            generalProfile: null,
            workerProfile: null,
            employerProfile: null,

            setMode: (mode) => set({ mode }),
            setAuthenticated: (status) => set({ isAuthenticated: status }),

            login: (phone) => {
                // Simulating a fresh login. 
                // For MVP: We assume if phone is "9876543210", it's the full mock user.
                // Otherwise, it's a new user with only General Profile.

                const isMockUser = phone === "9876543210";

                set({
                    isAuthenticated: true,
                    generalProfile: {
                        id: phone,
                        name: isMockUser ? "Ramesh Kumar" : "New User",
                        phone: phone,
                        city: "Delhi",
                        language: 'en',
                        kycStatus: isMockUser ? 'verified' : 'none'
                    },
                    // If it's the mock user, give them a Worker Profile by default
                    workerProfile: isMockUser ? {
                        skills: ["Plumber", "Electrician"],
                        experienceYears: 5,
                        dailyRate: 800,
                        serviceRadiusKm: 10,
                        portfolioImages: [
                            "https://images.unsplash.com/photo-1581578731117-104f2a41272c?q=80&w=300&auto=format&fit=crop",
                            "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=300&auto=format&fit=crop",
                            "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=300&auto=format&fit=crop"
                        ],
                        availability: true,
                        rating: 4.5,
                        ratingCount: 23
                    } : null,
                    employerProfile: isMockUser ? {
                        companyName: "Ramesh Home Solutions",
                        categories: ["Construction"],
                        hiringHistoryCount: 5,
                        rating: 4.8
                    } : null
                });
            },

            logout: () => set({
                isAuthenticated: false,
                generalProfile: null,
                workerProfile: null,
                employerProfile: null
            }),

            updateGeneralProfile: (data) => set((state) => ({
                generalProfile: state.generalProfile ? { ...state.generalProfile, ...data } : null
            })),

            updateWorkerProfile: (data) => set((state) => ({
                workerProfile: state.workerProfile
                    ? { ...state.workerProfile, ...data }
                    : {
                        // Defaults for new profile
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
                        // Defaults
                        categories: [],
                        hiringHistoryCount: 0,
                        rating: 0,
                        ...data
                    } as EmployerProfile
            })),

            isProfileReady: () => {
                const state = get();
                if (!state.isAuthenticated || !state.generalProfile) return false;

                if (state.mode === 'worker') {
                    return !!state.workerProfile;
                } else {
                    return !!state.employerProfile;
                }
            }
        }),
        {
            name: 'shramsetu-storage-v2', // Changed version to force fresh state
        }
    )
);
