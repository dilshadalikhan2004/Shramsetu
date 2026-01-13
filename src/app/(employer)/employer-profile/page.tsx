"use client";

import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/button";
import { Building2, IndianRupee, MapPin, CheckCircle, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EmployerProfilePage() {
    const { employerProfile } = useUserStore();
    const router = useRouter();

    if (!employerProfile) {
        return <div className="p-4 text-center">Loading Profile...</div>;
    }

    return (
        <div className="pb-20">
            <div className="bg-emerald-700 dark:bg-emerald-950 text-white p-6 pb-12 rounded-b-[2rem] shadow-lg">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Employer Profile</h1>
                        <p className="opacity-80 text-sm">Manage business details</p>
                    </div>
                    <div className="bg-white/10 p-2 rounded-lg">
                        <Building2 className="w-6 h-6" />
                    </div>
                </div>

                <div className="text-center mb-4">
                    <h2 className="text-3xl font-bold mb-1">{employerProfile.companyName}</h2>
                    <p className="text-sm opacity-80 flex items-center justify-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Verified Employer
                    </p>
                </div>
            </div>

            <div className="px-4 -mt-8 space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-md border border-gray-100 dark:border-slate-800 flex justify-between text-center">
                    <div className="flex-1">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{employerProfile.hiringHistoryCount}</p>
                        <p className="text-xs text-gray-400 mt-1">Hires Made</p>
                    </div>
                    <div className="w-px bg-gray-200 dark:bg-slate-800"></div>
                    <div className="flex-1">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{employerProfile.rating}</p>
                        <p className="text-xs text-gray-400 mt-1">Rating</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-emerald-600" /> Focus Sectors
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {employerProfile.categories.map(cat => (
                            <span key={cat} className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-md text-xs font-medium">
                                {cat}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm flex items-center gap-2">
                        <Users className="w-4 h-4 text-emerald-600" /> Team Management
                    </h3>
                    <p className="text-sm text-gray-500 italic">No active teams created yet.</p>
                </div>

                <Button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white" onClick={() => router.push('/setup/employer')}>
                    Edit Business Details
                </Button>
            </div>
        </div>
    );
}
