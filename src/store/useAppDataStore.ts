import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Candidate {
    id: string;
    name: string;
    rating: number;
    exp: string;
    verified: boolean;
    bid: string;
    excerpt: string;
    init: string;
    color: string;
    status: 'pending' | 'accepted' | 'rejected' | 'completed';
    isTopMatch?: boolean;
    otp?: string;
}

export interface Job {
    id: string;
    title: string;
    location: string;
    city: string;
    wage: string;
    daily_rate: number;
    category: string;
    description: string;
    skills_required: string[];
    status: 'active' | 'closed';
    posted: string;
    applicants: number;
    filled: number;
    total: number;
    employer_id: string;
    employer_name: string;
    employer_verified: boolean;
    is_urgent: boolean;
    duration: string;
    perks: string[];
    candidates: Candidate[];
}

export interface HistoryRecord {
    id: string;
    workerName: string;
    workerInit: string;
    workerColor: string;
    workerRating: number;
    workerExp: string;
    jobTitle: string;
    jobLocation: string;
    wage: string;
    hiredDate: string;
    completedDate: string;
    status: 'completed';
}

interface AppDataState {
    jobs: Job[];
    history: HistoryRecord[];
    loading: boolean;
    setJobs: (jobs: Job[]) => void;
    setHistory: (history: HistoryRecord[]) => void;
    setLoading: (loading: boolean) => void;
    updateCandidateStatus: (jobId: string, candidateId: string, status: 'accepted' | 'rejected') => void;
    verifyCandidateOtp: (jobId: string, candidateId: string, otp: string) => boolean;
    markWorkCompleted: (jobId: string, candidateId: string) => void;
    addJob: (job: Job) => void;
    addCandidate: (jobId: string, candidate: Candidate) => void;
}

const INITIAL_JOBS: Job[] = [
    {
        id: "seed-1",
        title: "Senior Brick Mason",
        location: "Mumbai",
        city: "Mumbai",
        wage: "₹950/day",
        daily_rate: 950,
        category: "Mason",
        description: "Looking for an experienced brick mason for a large residential project. Must have 5+ years of experience.",
        skills_required: ["Bricklaying", "Blueprint Reading", "Site Safety"],
        status: "active",
        posted: "2 hours ago",
        applicants: 2,
        filled: 0,
        total: 5,
        employer_id: "employer-tata",
        employer_name: "Tata Projects",
        employer_verified: true,
        is_urgent: true,
        duration: "3 months",
        perks: ["🍱 Food Provided", "🚌 Transport"],
        candidates: []
    },
    {
        id: "seed-2",
        title: "Industrial Plumber",
        location: "Delhi",
        city: "Delhi",
        wage: "₹800/day",
        daily_rate: 800,
        category: "Plumber",
        description: "Requires experts for industrial pipe-fitting and maintenance.",
        skills_required: ["Pipe Fitting", "Welding"],
        status: "active",
        posted: "5 hours ago",
        applicants: 1,
        filled: 0,
        total: 2,
        employer_id: "employer-lt",
        employer_name: "L&T Construction",
        employer_verified: true,
        is_urgent: false,
        duration: "1 month",
        perks: ["🦺 Safety Equipment"],
        candidates: []
    }
];

export const useAppDataStore = create<AppDataState>()(
    persist(
        (set, get) => ({
            jobs: INITIAL_JOBS,
            history: [],
            loading: false,

            setJobs: (jobs) => set({ jobs }),
            setHistory: (history) => set({ history }),
            setLoading: (loading) => set({ loading }),
            addJob: (job) => set({ jobs: [...get().jobs, job] }),

            addCandidate: (jobId, candidate) => {
                const jobs = get().jobs.map((j) => {
                    if (j.id !== jobId) return j;
                    if (j.candidates.some(c => c.id === candidate.id)) return j;

                    // Logic: Auto-flag as top match if rating and experience are high
                    const isTopMatch = candidate.rating >= 4.7 || (parseInt(candidate.exp) >= 5);

                    return {
                        ...j,
                        candidates: [...j.candidates, { ...candidate, isTopMatch }],
                        applicants: j.applicants + 1,
                    };
                });
                set({ jobs });
            },

            updateCandidateStatus: (jobId, candidateId, status) => {
                const jobs = get().jobs.map((j) => {
                    if (j.id !== jobId) return j;

                    let filledChange = 0;
                    const updatedCandidates = j.candidates.map((c) => {
                        if (c.id === candidateId) {
                            // If we are hiring, generate a 4-digit OTP handshake
                            let otp = c.otp;
                            if (status === 'accepted' && c.status !== 'accepted') {
                                filledChange = 1;
                                otp = Math.floor(1000 + Math.random() * 9000).toString();
                            }
                            if (status === 'rejected' && c.status === 'accepted') filledChange = -1;
                            return { ...c, status, otp };
                        }
                        return c;
                    });

                    return {
                        ...j,
                        candidates: updatedCandidates,
                        filled: Math.min(j.total, Math.max(0, j.filled + filledChange))
                    };
                });
                set({ jobs });
            },

            verifyCandidateOtp: (jobId, candidateId, otp) => {
                const job = get().jobs.find(j => j.id === jobId);
                if (!job) return false;
                const candidate = job.candidates.find(c => c.id === candidateId);
                if (!candidate) return false;

                return candidate.otp === otp;
            },

            markWorkCompleted: (jobId, candidateId) => {
                const jobs = get().jobs.map((j) => {
                    if (j.id !== jobId) return j;
                    const candidate = j.candidates.find(c => c.id === candidateId);
                    if (!candidate) return j;

                    // Move to history
                    const newHistory: HistoryRecord = {
                        id: `hist-${Date.now()}`,
                        jobTitle: j.title,
                        jobLocation: j.location,
                        wage: j.wage,
                        workerName: candidate.name,
                        workerInit: candidate.init,
                        workerColor: candidate.color,
                        workerRating: candidate.rating,
                        workerExp: candidate.exp,
                        hiredDate: new Date().toLocaleDateString(), // Placeholder
                        completedDate: new Date().toLocaleDateString(),
                        status: 'completed',
                    };

                    set({ history: [...get().history, newHistory] });

                    // Update candidate status and possibly close the job
                    const updatedCandidates = j.candidates.map((c) =>
                        c.id === candidateId ? { ...c, status: 'completed' as const } : c
                    );

                    return {
                        ...j,
                        candidates: updatedCandidates,
                        status: j.filled >= j.total ? 'closed' as const : 'active' as const
                    };
                });
                set({ jobs });
            },
        }),
        {
            name: 'shramsetu-app-data-v1',
        }
    )
);
