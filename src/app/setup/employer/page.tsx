"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle, Building2 } from "lucide-react";

export default function EmployerSetupPage() {
    const router = useRouter();
    const { updateEmployerProfile, generalProfile } = useUserStore();
    const [step, setStep] = useState(1);

    // Form State
    const [companyName, setCompanyName] = useState("");
    const [sectors, setSectors] = useState<string[]>([]);

    // Mock Sectors
    const SECTORS = ["Construction", "Logistics", "Hospitality", "Domestic", "Event Management", "Agriculture"];

    const toggleSector = (sector: string) => {
        if (sectors.includes(sector)) {
            setSectors(sectors.filter(s => s !== sector));
        } else {
            setSectors([...sectors, sector]);
        }
    };

    const handleComplete = () => {
        updateEmployerProfile({
            companyName: companyName || (generalProfile?.name + " Enterprise"),
            categories: sectors,
            hiringHistoryCount: 0,
            rating: 0
        });

        // Redirect to dashboard
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen bg-emerald-800 p-6 text-white flex flex-col">
            <div className="flex-1 max-w-md mx-auto w-full flex flex-col justify-center">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Employer Profile</h1>
                    <p className="opacity-80">Hire the best workers, {generalProfile?.name}</p>
                </div>

                <div className="bg-white text-gray-900 rounded-2xl p-6 shadow-xl">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-bold mb-4">Business Details</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">Company / Organization Name (Optional)</label>
                                    <div className="relative">
                                        <Building2 className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <Input
                                            placeholder="e.g. Acme Constructions"
                                            value={companyName}
                                            onChange={e => setCompanyName(e.target.value)}
                                            className="pl-10 h-12 bg-gray-50 text-lg"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-3">Primary Hiring Sectors</label>
                                    <div className="flex flex-wrap gap-2">
                                        {SECTORS.map(sec => (
                                            <button
                                                key={sec}
                                                onClick={() => toggleSector(sec)}
                                                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${sectors.includes(sec)
                                                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                                                        : "bg-white text-gray-600 border-gray-200 hover:border-emerald-500"
                                                    }`}
                                            >
                                                {sec}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button
                            className="w-full h-12 text-lg bg-emerald-600 hover:bg-emerald-700 text-white mt-4"
                            onClick={handleComplete}
                            disabled={sectors.length === 0}
                        >
                            Start Hiring <CheckCircle className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
