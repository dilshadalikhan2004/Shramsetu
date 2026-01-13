"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle } from "lucide-react";

const SKILL_OPTIONS = ["Plumbing", "Electrical", "Carpentry", "Painting", "Cleaning", "Driving", "Cooking"];

export default function WorkerSetupPage() {
    const router = useRouter();
    const { updateWorkerProfile, generalProfile } = useUserStore();
    const [step, setStep] = useState(1);

    // Form State
    const [skills, setSkills] = useState<string[]>([]);
    const [experience, setExperience] = useState("");
    const [rate, setRate] = useState("");
    const [radius, setRadius] = useState("10");

    const toggleSkill = (skill: string) => {
        if (skills.includes(skill)) {
            setSkills(skills.filter(s => s !== skill));
        } else {
            setSkills([...skills, skill]);
        }
    };

    const handleComplete = () => {
        updateWorkerProfile({
            skills,
            experienceYears: parseInt(experience) || 0,
            dailyRate: parseInt(rate) || 500,
            serviceRadiusKm: parseInt(radius) || 10,
            availability: true
        });

        // Redirect to home
        router.push("/home");
    };

    return (
        <div className="min-h-screen bg-brand-deep p-6 text-white flex flex-col">
            <div className="flex-1 max-w-md mx-auto w-full flex flex-col justify-center">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Setup Profile</h1>
                    <p className="opacity-80">Help employers find you, {generalProfile?.name}</p>
                </div>

                <div className="bg-white text-gray-900 rounded-2xl p-6 shadow-xl">
                    {step === 1 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-xl font-bold mb-4">What are your skills?</h2>
                                <div className="flex flex-wrap gap-3">
                                    {SKILL_OPTIONS.map(skill => (
                                        <button
                                            key={skill}
                                            onClick={() => toggleSkill(skill)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${skills.includes(skill)
                                                    ? "bg-brand-deep text-white shadow-md transform scale-105"
                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                }`}
                                        >
                                            {skill}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <Button
                                className="w-full h-12 text-lg bg-brand-deep"
                                onClick={() => setStep(2)}
                                disabled={skills.length === 0}
                            >
                                Next <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-xl font-bold mb-4">Work Details</h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Years of Experience</label>
                                        <Input
                                            type="number"
                                            placeholder="e.g. 5"
                                            value={experience}
                                            onChange={e => setExperience(e.target.value)}
                                            className="h-12 bg-gray-50 text-lg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Daily Minimum Rate (₹)</label>
                                        <Input
                                            type="number"
                                            placeholder="e.g. 500"
                                            value={rate}
                                            onChange={e => setRate(e.target.value)}
                                            className="h-12 bg-gray-50 text-lg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Work Radius (km)</label>
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="range"
                                                min="1"
                                                max="50"
                                                value={radius}
                                                onChange={e => setRadius(e.target.value)}
                                                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                            />
                                            <span className="font-bold w-12 text-right">{radius} km</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button
                                className="w-full h-12 text-lg bg-green-600 hover:bg-green-700 text-white"
                                onClick={handleComplete}
                                disabled={!experience || !rate}
                            >
                                Complete Setup <CheckCircle className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    )}
                </div>

                <div className="mt-6 flex justify-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${step === 1 ? 'bg-white' : 'bg-white/30'}`} />
                    <div className={`w-2 h-2 rounded-full ${step === 2 ? 'bg-white' : 'bg-white/30'}`} />
                </div>
            </div>
        </div>
    );
}
