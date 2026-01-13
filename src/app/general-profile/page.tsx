"use client";

import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/button";
import { User, ShieldCheck, MapPin, Phone, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GeneralProfilePage() {
    const { generalProfile } = useUserStore();
    const router = useRouter();

    return (
        <div className="min-h-screen bg-bg-surface dark:bg-slate-950 pb-20">
            {/* Header */}
            <div className="bg-white dark:bg-slate-900 border-b dark:border-slate-800 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
                <button onClick={() => router.back()}>
                    <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </button>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">My Account</h1>
            </div>

            <div className="p-6 flex flex-col items-center text-center bg-white dark:bg-slate-900 mb-4">
                <div className="w-24 h-24 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-gray-400 mb-4 border-4 border-white dark:border-slate-700 shadow-lg">
                    {generalProfile?.profileImage ? (
                        <img src={generalProfile.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
                    ) : (
                        <User className="w-10 h-10" />
                    )}
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{generalProfile?.name || "Guest User"}</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{generalProfile?.phone ? `+91 ${generalProfile.phone}` : "No phone linked"}</p>

                <div className={`flex items-center gap-1 mt-3 px-3 py-1 rounded-full text-xs font-medium ${generalProfile?.kycStatus === 'verified'
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-600'
                        : 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600'
                    }`}>
                    <ShieldCheck className="w-3 h-3" />
                    {generalProfile?.kycStatus === 'verified' ? 'KYC Verified' : 'KYC Pending'}
                </div>
            </div>

            <div className="px-4 space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">Personal Details</h3>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                                <Phone className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Phone Number</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">+91 {generalProfile?.phone}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">City</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{generalProfile?.city}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Button variant="outline" className="w-full" onClick={() => router.push('/settings')}>
                    Edit Profile
                </Button>
            </div>
        </div>
    );
}
