"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EmployerDashboard() {
    const router = useRouter();

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">My Jobs</h1>
                <Button
                    variant="employer"
                    size="sm"
                    className="rounded-full shadow-lg"
                    onClick={() => router.push('/post-job')}
                >
                    <Plus className="w-4 h-4 mr-1" /> Post Job
                </Button>
            </div>

            <div className="space-y-4">
                {/* Active Job Card Placeholder */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
                    <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg">House Painting</h3>
                        <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs">Active</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">Found 3 candidates</p>
                    <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm" className="w-full text-xs">View Applicants</Button>
                        <Button variant="employer" size="sm" className="w-full text-xs">Manage</Button>
                    </div>
                </div>

                {/* Empty State if needed */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-dashed border-gray-300 flex flex-col items-center justify-center text-center">
                    <p className="text-gray-500 mb-4">You have no other active jobs.</p>
                    <Button variant="outline" onClick={() => router.push('/post-job')}>
                        Create New Post
                    </Button>
                </div>
            </div>
        </div>
    );
}
