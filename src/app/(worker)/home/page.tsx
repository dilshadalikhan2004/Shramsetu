"use client";

import { JobCard } from "@/components/worker/JobCard";
import { useState } from "react";

// Mock Data
const MOCK_JOBS = [
    { id: '1', title: 'Construction Labor Needed', location: 'Dwarka, Delhi', salary: 600, type: 'Construction', timePosted: '2h ago' },
    { id: '2', title: 'Office Cleaner', location: 'Gurgaon, Sector 45', salary: 500, type: 'Cleaning', timePosted: '4h ago' },
    { id: '3', title: 'Electrician for Wiring', location: 'Noida, Sector 62', salary: 800, type: 'Electrical', timePosted: '5h ago' },
    { id: '4', title: 'Painter Needed', location: 'Vasant Vihar, Delhi', salary: 700, type: 'Painting', timePosted: '1d ago' },
];

export default function WorkerHome() {
    const [jobs, setJobs] = useState(MOCK_JOBS);

    const handleApply = (id: string) => {
        alert(`Applied to job ${id}! (This will open Bid Modal)`);
    };

    return (
        <div className="pb-20">
            <div className="px-4 py-3 bg-white border-b sticky top-[64px] z-30">
                <h2 className="text-xl font-bold text-gray-800">Jobs Near You</h2>
            </div>
            <div className="bg-gray-50 min-h-screen">
                {jobs.map((job) => (
                    <JobCard key={job.id} {...job} onApply={handleApply} />
                ))}
                <div className="p-4 text-center text-gray-400 text-sm">
                    No more jobs
                </div>
            </div>
        </div>
    );
}
