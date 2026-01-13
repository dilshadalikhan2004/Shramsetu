"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/useUserStore";
import { Briefcase, UserSearch } from "lucide-react"; // assuming icons

export default function RoleSelectionPage() {
    const router = useRouter();
    const { setMode } = useUserStore();

    const handleSelectRole = (role: 'worker' | 'employer') => {
        setMode(role);
        if (role === 'worker') {
            router.push('/home'); // Worker Home
        } else {
            router.push('/dashboard'); // Employer Home
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-bg-surface">
            <div className="w-full max-w-sm space-y-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900">What are you looking for?</h2>

                <div className="grid gap-4">
                    <button
                        onClick={() => handleSelectRole('worker')}
                        className="flex flex-col items-center p-6 bg-white border-2 border-transparent hover:border-worker-primary rounded-xl shadow-sm transition-all active:scale-95 group"
                    >
                        <div className="bg-blue-50 p-4 rounded-full mb-3 group-hover:bg-blue-100 transition-colors">
                            <Briefcase className="w-8 h-8 text-worker-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">I want to find work</h3>
                        <p className="text-sm text-gray-500">Apply for jobs, build teams, earn money</p>
                    </button>

                    <button
                        onClick={() => handleSelectRole('employer')}
                        className="flex flex-col items-center p-6 bg-white border-2 border-transparent hover:border-employer-primary rounded-xl shadow-sm transition-all active:scale-95 group"
                    >
                        <div className="bg-green-50 p-4 rounded-full mb-3 group-hover:bg-green-100 transition-colors">
                            <UserSearch className="w-8 h-8 text-employer-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">I want to hire</h3>
                        <p className="text-sm text-gray-500">Post jobs, manage payments, hire teams</p>
                    </button>
                </div>
            </div>
        </main>
    );
}
