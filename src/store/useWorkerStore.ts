import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SystemWorker {
    id: string;
    name: string;
    category: string;
    skills: string[];
    location: string;
    rating: number;
    exp: string;
    daily_rate: number;
    verified: boolean;
    bio: string;
    color: string;
}

interface WorkerState {
    workers: SystemWorker[];
    addWorker: (worker: SystemWorker) => void;
}

// Initial mock "Real" workers for the marketplace
const INITIAL_WORKERS: SystemWorker[] = [
    {
        id: "w-1",
        name: "Arjun Sharma",
        category: "Construction",
        skills: ["Bricklaying", "Site Safety", "Masonry"],
        location: "Delhi",
        rating: 4.8,
        exp: "5 years",
        daily_rate: 900,
        verified: true,
        bio: "Specialist in high-rise construction and structural masonry.",
        color: "#0a2540"
    },
    {
        id: "w-2",
        name: "Vikram Singh",
        category: "Plumbing",
        skills: ["Pipe Fitting", "Welding"],
        location: "Mumbai",
        rating: 4.6,
        exp: "3 years",
        daily_rate: 850,
        verified: true,
        bio: "Expert in industrial plumbing and leak detection.",
        color: "#e85d26"
    },
    {
        id: "w-3",
        name: "Karan Verma",
        category: "Electrical",
        skills: ["Electrical Wiring", "Blueprint Reading"],
        location: "Bangalore",
        rating: 4.9,
        exp: "7 years",
        daily_rate: 1100,
        verified: true,
        bio: "Master electrician with focus on residential complex wiring.",
        color: "#2563eb"
    },
    {
        id: "w-4",
        name: "Priya Devi",
        category: "Painting",
        skills: ["Interior Painting", "Wall Texturing"],
        location: "Pune",
        rating: 4.7,
        exp: "4 years",
        daily_rate: 750,
        verified: false,
        bio: "Creative painter specializing in modern textures and finishes.",
        color: "#7c3aed"
    },
    {
        id: "w-5",
        name: "Sanjay Kumar",
        category: "Logistics",
        skills: ["Forklift Operation", "Inventory Management"],
        location: "Chennai",
        rating: 4.5,
        exp: "2 years",
        daily_rate: 650,
        verified: true,
        bio: "Hardworking logistics professional with quick turnaround time.",
        color: "#059669"
    }
];

export const useWorkerStore = create<WorkerState>()(
    persist(
        (set) => ({
            workers: INITIAL_WORKERS,
            addWorker: (worker) => set((state) => ({ workers: [...state.workers, worker] })),
        }),
        { name: 'shramsetu-workers-v1' }
    )
);
