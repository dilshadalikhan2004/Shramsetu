"use client";

import { useState } from "react";
import { WorkerCard } from "@/components/employer/WorkerCard";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock Data
const MY_JOBS = [
    {
        id: 1,
        title: "House Painting",
        status: "active",
        applicants: [
            { id: 'w1', name: "Raju Painter", role: "Painter", rating: 4.5, location: "Dwarka", rate: 700 },
            { id: 'w2', name: "Sunil Kumar", role: "Painter", rating: 4.2, location: "Janakpuri", rate: 650 },
        ]
    },
    {
        id: 2,
        title: "Kitchen Plumbing",
        status: "closed",
        applicants: []
    }
];

export default function MyJobsPage() {
    const router = useRouter();
    const [expandedJob, setExpandedJob] = useState<number | null>(null);

    const toggleJob = (id: number) => {
        setExpandedJob(expandedJob === id ? null : id);
    }

    return (
        <div className="pb-20">
            <div className="bg-employer-primary px-4 py-6 text-white mb-4">
                <h1 className="text-2xl font-bold">Manage Jobs</h1>
                <p className="opacity-90">Track applications & hire</p>
            </div>

            <div className="px-4 space-y-4">
                {MY_JOBS.map((job) => (
                    <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div
                            className="p-4 flex items-center justify-between cursor-pointer active:bg-gray-50 bg-white z-10 relative"
                            onClick={() => toggleJob(job.id)}
                        >
                            <div>
                                <h3 className="font-semibold text-gray-900">{job.title}</h3>
                                <p className={`text-xs font-medium mt-1 ${job.status === 'active' ? 'text-green-600' : 'text-gray-400'}`}>
                                    {job.status === 'active' ? '● Active' : '● Closed'}
                                </p>
                            </div>
                            {expandedJob === job.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                        </div>

                        {expandedJob === job.id && (
                            <div className="bg-gray-50 p-4 border-t border-gray-100">
                                <p className="text-xs text-gray-500 mb-3 uppercase font-bold tracking-wider">Applicants ({job.applicants.length})</p>
                                <div className="space-y-3">
                                    {job.applicants.length > 0 ? job.applicants.map((applicant) => (
                                        <WorkerCard
                                            key={applicant.id}
                                            {...applicant}
                                            onContact={() => router.push('/chats')}
                                            onHire={() => alert('Hiring Flow not connected yet')}
                                        />
                                    )) : (
                                        <p className="text-sm text-gray-400 italic">No applications yet.</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
