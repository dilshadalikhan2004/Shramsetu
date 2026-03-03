"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { Camera, MapPin, ChevronDown, Shield, ArrowLeft } from "lucide-react";

const SKILL_OPTIONS = ["Plumber", "Electrician", "Mason", "Welder", "Painter", "Carpenter", "Labor"];
const STEPS = ["Profile", "Skills"];

export default function WorkerSetupPage() {
    const router = useRouter();
    const { updateWorkerProfile, generalProfile, updateGeneralProfile } = useUserStore();

    const [step, setStep] = useState(0);
    const [name, setName] = useState(generalProfile?.name || "");
    const [city, setCity] = useState("");
    const [skill, setSkill] = useState("Plumber");
    const [rate, setRate] = useState(800);
    const [skills, setSkills] = useState<string[]>([]);

    const toggleSkill = (s: string) =>
        setSkills((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

    const handleComplete = async () => {
        updateWorkerProfile({
            skills,
            experienceYears: 0,
            dailyRate: rate,
            serviceRadiusKm: 15,
            availability: true,
        });
        updateGeneralProfile({ name, city, preferredLanguage: generalProfile?.language || "hi" } as any);

        try {
            const { auth, db } = await import("@/lib/firebase");
            const { doc, setDoc } = await import("firebase/firestore");
            const user = auth.currentUser;
            if (user) {
                const state = useUserStore.getState();
                await setDoc(doc(db, "users", user.uid), {
                    generalProfile: state.generalProfile,
                    workerProfile: Object.assign({}, state.workerProfile, { skills, dailyRate: rate }),
                    employerProfile: state.employerProfile
                }, { merge: true });
            }
        } catch (err) {
            console.error(err);
        }
        router.push("/kyc");
    };

    return (
        <div className="min-h-screen font-dmsans flex flex-col" style={{ background: "#f3f4f6" }}>
            <div className="w-full max-w-sm mx-auto px-5 py-8 flex flex-col flex-1">
                {/* Back */}
                <button
                    onClick={() => step === 0 ? router.back() : setStep((s) => s - 1)}
                    className="flex items-center gap-1.5 mb-6 self-start"
                    style={{ fontSize: 14, color: "#6b7280" }}
                >
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>

                {/* Step dots */}
                <div className="flex items-center gap-0 mb-8">
                    {STEPS.map((label, i) => (
                        <div key={label} className="flex items-center">
                            <div className="flex flex-col items-center gap-1">
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center font-outfit font-bold text-sm transition-all duration-300"
                                    style={{
                                        background: i <= step ? "#e85d26" : "#e5e7eb",
                                        color: i <= step ? "white" : "#9ca3af",
                                    }}
                                >
                                    {i < step ? "✓" : i + 1}
                                </div>
                                <span style={{ fontSize: 10, color: i === step ? "#e85d26" : "#9ca3af", fontWeight: i === step ? 600 : 400 }}>
                                    {label}
                                </span>
                            </div>
                            {i < STEPS.length - 1 && (
                                <div className="flex-1 h-0.5 mx-2 mb-5" style={{ width: 48, background: i < step ? "#e85d26" : "#e5e7eb" }} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Step 0 — Profile */}
                {step === 0 && (
                    <div className="bg-white rounded-2xl border p-6 space-y-5" style={{ borderColor: "#e5e7eb" }}>
                        <h2 className="font-outfit font-bold" style={{ fontSize: 20, color: "#111827" }}>Set Up Your Profile</h2>

                        {/* Avatar upload */}
                        <div className="flex flex-col items-center gap-2">
                            <div
                                className="w-20 h-20 rounded-full border-2 border-dashed flex items-center justify-center"
                                style={{ borderColor: "#e85d26", background: "#fff1eb", cursor: "pointer" }}
                            >
                                <Camera className="w-7 h-7" style={{ color: "#e85d26" }} />
                            </div>
                            <span className="font-dmsans font-semibold" style={{ fontSize: 13, color: "#e85d26" }}>Add Photo</span>
                        </div>

                        {/* Full Name */}
                        <div>
                            <label className="block font-semibold mb-1.5" style={{ fontSize: 13, color: "#374151" }}>Full Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Ramesh Kumar"
                                className="w-full h-12 rounded-xl border px-4 text-sm outline-none"
                                style={{ borderColor: "#e5e7eb", color: "#111827" }}
                                onFocus={(e) => (e.target.style.borderColor = "#e85d26", e.target.style.boxShadow = "0 0 0 3px rgba(232,93,38,0.1)")}
                                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb", e.target.style.boxShadow = "none")} />
                        </div>

                        {/* City */}
                        <div>
                            <label className="block font-semibold mb-1.5" style={{ fontSize: 13, color: "#374151" }}>City / Area</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#9ca3af" }} />
                                <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Search your city..."
                                    className="w-full h-12 rounded-xl border pl-9 pr-4 text-sm outline-none"
                                    style={{ borderColor: "#e5e7eb", color: "#111827" }}
                                    onFocus={(e) => (e.target.style.borderColor = "#e85d26")}
                                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")} />
                            </div>
                        </div>

                        {/* Primary Skill */}
                        <div>
                            <label className="block font-semibold mb-1.5" style={{ fontSize: 13, color: "#374151" }}>Primary Skill</label>
                            <div className="relative">
                                <select value={skill} onChange={(e) => setSkill(e.target.value)}
                                    className="w-full h-12 rounded-xl border px-4 pr-9 text-sm outline-none appearance-none"
                                    style={{ borderColor: "#e5e7eb", color: "#111827", background: "white" }}>
                                    {SKILL_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "#9ca3af" }} />
                            </div>
                        </div>

                        {/* Daily Rate */}
                        <div>
                            <label className="block font-semibold mb-1.5" style={{ fontSize: 13, color: "#374151" }}>Daily Rate (₹)</label>
                            <div className="flex items-center gap-3">
                                <button onClick={() => setRate((r) => Math.max(200, r - 50))}
                                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg"
                                    style={{ background: "#f3f4f6", color: "#374151" }}>−</button>
                                <div className="flex-1 h-12 rounded-xl border flex items-center justify-center font-outfit font-bold text-lg" style={{ borderColor: "#e5e7eb" }}>
                                    ₹ {rate}
                                </div>
                                <button onClick={() => setRate((r) => r + 50)}
                                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg"
                                    style={{ background: "#f3f4f6", color: "#374151" }}>+</button>
                            </div>
                        </div>

                        {/* Aadhaar block logic removed */}

                        <button
                            onClick={() => setStep(1)}
                            className="w-full h-12 rounded-xl font-semibold text-white transition-all active:scale-95"
                            style={{ background: "#e85d26" }}
                        >
                            Save &amp; Continue →
                        </button>
                    </div>
                )}

                {/* Step 1 — Skills */}
                {step === 1 && (
                    <div className="bg-white rounded-2xl border p-6 space-y-5" style={{ borderColor: "#e5e7eb" }}>
                        <h2 className="font-outfit font-bold" style={{ fontSize: 20, color: "#111827" }}>Select Your Skills</h2>
                        <p style={{ fontSize: 14, color: "#6b7280" }}>Pick all skills that apply to you.</p>

                        <div className="flex flex-wrap gap-2">
                            {["Pipe Fitting", "Bricklaying", "Blueprint Reading", "Site Safety", "Drainage", "Electrical Wiring", "Welding", "Masonry", "Carpentry", "Painting"].map((s) => {
                                const sel = skills.includes(s);
                                return (
                                    <button key={s} onClick={() => toggleSkill(s)}
                                        className="px-4 py-2 rounded-full font-medium transition-all active:scale-95"
                                        style={{
                                            fontSize: 13,
                                            background: sel ? "#e85d26" : "#f3f4f6",
                                            color: sel ? "white" : "#374151",
                                        }}>
                                        {s}
                                    </button>
                                );
                            })}
                        </div>

                        <button onClick={handleComplete} disabled={skills.length === 0}
                            className="w-full h-12 rounded-xl font-semibold text-white transition-all active:scale-95"
                            style={{ background: skills.length > 0 ? "#e85d26" : "#d1d5db" }}>
                            Complete Profile →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
