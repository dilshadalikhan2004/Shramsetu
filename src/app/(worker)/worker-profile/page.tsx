"use client";

import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/button";
import { Star, Briefcase, IndianRupee, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WorkerProfilePage() {
    const { workerProfile } = useUserStore();
    const router = useRouter();

    if (!workerProfile) {
        return <div className="p-4 text-center">Loading Profile...</div>;
    }

    return (
        <div className="pb-20">
            <div className="bg-brand-deep dark:bg-slate-900 text-white p-6 pb-12 rounded-b-[2rem] shadow-lg">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">My Worker Profile</h1>
                        <p className="opacity-80 text-sm">Manage your work stats</p>
                    </div>
                    <div className="bg-white/10 p-2 rounded-lg">
                        <Briefcase className="w-6 h-6" />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <p className="text-3xl font-bold flex items-center gap-1">
                            <IndianRupee className="w-6 h-6" /> {workerProfile.dailyRate}
                        </p>
                        <p className="text-sm opacity-80">Daily Rate</p>
                    </div>
                    <div className="w-px h-10 bg-white/20"></div>
                    <div className="flex-1">
                        <p className="text-3xl font-bold">{workerProfile.experienceYears} Yrs</p>
                        <p className="text-sm opacity-80">Experience</p>
                    </div>
                </div>
            </div>

            <div className="px-4 -mt-8 space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-md border border-gray-100 dark:border-slate-800 flex justify-between text-center">
                    <div className="flex-1">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{workerProfile.rating}</p>
                        <div className="flex items-center text-yellow-400 justify-center text-xs">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="ml-1 text-gray-400">({workerProfile.ratingCount})</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Rating</p>
                    </div>
                    <div className="w-px bg-gray-200 dark:bg-slate-800"></div>
                    <div className="flex-1">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{workerProfile.serviceRadiusKm} km</p>
                        <p className="text-xs text-gray-400 mt-1">Service Radius</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-brand-deep" /> Skill Set
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {workerProfile.skills.map(skill => (
                            <span key={skill} className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-md text-xs font-medium">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-brand-deep" /> Portfolio
                    </h3>
                    {workerProfile.portfolioImages.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2">
                            {workerProfile.portfolioImages.map((img, idx) => (
                                <div key={idx} className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative group">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={img}
                                        alt={`Portfolio ${idx + 1}`}
                                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-400 italic">No images uploaded yet.</p>
                    )}
                </div>

                <Button className="w-full bg-brand-deep" onClick={() => router.push('/setup/worker')}>
                    Edit Work Details
                </Button>
            </div>
        </div>
    );
}
