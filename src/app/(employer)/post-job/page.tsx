"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";

export default function PostJobPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);

    // Form State
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [budget, setBudget] = useState("");

    const handlePost = () => {
        // Basic validation
        if (!title || !budget) return;

        // Simulate posting
        alert("Job Posted Successfully!");
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="px-4 py-3 border-b flex items-center gap-2 sticky top-0 bg-white z-10">
                <button onClick={() => router.back()} className="p-1">
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-lg font-semibold">Post a Job</h1>
            </div>

            <div className="p-6 space-y-6">
                {/* Progress Bar (Simulated) */}
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-employer-primary h-full transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }}></div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                        <Input placeholder="e.g. Electrician needed" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select Category</option>
                            <option value="construction">Construction</option>
                            <option value="cleaning">Cleaning</option>
                            <option value="electrical">Electrical</option>
                            <option value="plumbing">Plumbing</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Daily Budget (₹)</label>
                        <Input type="number" placeholder="500" value={budget} onChange={(e) => setBudget(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t">
                <Button variant="employer" className="w-full" onClick={handlePost}>
                    Post Job
                </Button>
            </div>
        </div>
    );
}
