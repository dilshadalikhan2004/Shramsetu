"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { ArrowLeft, Building2, ChevronDown } from "lucide-react";

const SECTORS = ["Construction", "Real Estate", "Logistics", "Manufacturing", "Agriculture", "Retail", "Hospitality", "Infrastructure"];

export default function EmployerSetupPage() {
    const router = useRouter();
    const { updateEmployerProfile } = useUserStore();
    const [companyName, setCompanyName] = useState("");
    const [sectors, setSectors] = useState<string[]>([]);
    const [step, setStep] = useState(0);

    const toggle = (s: string) =>
        setSectors((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

    const handleComplete = async () => {
        updateEmployerProfile({ companyName, categories: sectors });
        try {
            const { auth, db } = await import("@/lib/firebase");
            const { doc, setDoc } = await import("firebase/firestore");
            const user = auth.currentUser;
            if (user) {
                const state = useUserStore.getState();
                await setDoc(doc(db, "users", user.uid), {
                    generalProfile: state.generalProfile,
                    workerProfile: state.workerProfile,
                    employerProfile: Object.assign({}, state.employerProfile, { companyName, categories: sectors })
                }, { merge: true });
            }
        } catch (err) {
            console.error(err);
        }
        router.push("/kyc");
    };

    return (
        <div className="min-h-screen font-dmsans flex flex-col items-center justify-center px-5 py-10" style={{ background: "#f3f4f6" }}>
            <div className="w-full max-w-sm">
                <button onClick={() => step === 0 ? router.back() : setStep(0)}
                    className="flex items-center gap-1.5 mb-6" style={{ fontSize: 14, color: "#6b7280" }}>
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>

                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#fff1eb" }}>
                        <Building2 className="w-5 h-5" style={{ color: "#e85d26" }} />
                    </div>
                    <div>
                        <h1 className="font-outfit font-bold" style={{ fontSize: 22, color: "#111827" }}>Set Up Company</h1>
                        <p style={{ fontSize: 13, color: "#6b7280" }}>Step {step + 1} of 2</p>
                    </div>
                </div>

                {step === 0 && (
                    <div className="bg-white rounded-2xl border p-6 space-y-4" style={{ borderColor: "#e5e7eb" }}>
                        <h2 className="font-outfit font-bold" style={{ fontSize: 18, color: "#111827" }}>Company Details</h2>
                        <div>
                            <label className="block font-semibold mb-1.5" style={{ fontSize: 13, color: "#374151" }}>Company Name</label>
                            <input value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                                placeholder="e.g. Tata Projects Ltd"
                                className="w-full h-12 rounded-xl border px-4 text-sm outline-none"
                                style={{ borderColor: "#e5e7eb", color: "#111827" }}
                                onFocus={(e) => (e.target.style.borderColor = "#e85d26")}
                                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")} />
                        </div>
                        <button onClick={() => setStep(1)} disabled={!companyName}
                            className="w-full h-12 rounded-xl font-semibold text-white transition-all active:scale-95"
                            style={{ background: companyName ? "#e85d26" : "#d1d5db" }}>
                            Next →
                        </button>
                    </div>
                )}

                {step === 1 && (
                    <div className="bg-white rounded-2xl border p-6 space-y-4" style={{ borderColor: "#e5e7eb" }}>
                        <h2 className="font-outfit font-bold" style={{ fontSize: 18, color: "#111827" }}>Hiring Sectors</h2>
                        <p style={{ fontSize: 13, color: "#6b7280" }}>Select the sectors you hire for.</p>
                        <div className="flex flex-wrap gap-2">
                            {SECTORS.map((s) => {
                                const sel = sectors.includes(s);
                                return (
                                    <button key={s} onClick={() => toggle(s)}
                                        className="px-4 py-2 rounded-full font-medium transition-all"
                                        style={{ fontSize: 13, background: sel ? "#e85d26" : "#f3f4f6", color: sel ? "white" : "#374151" }}>
                                        {s}
                                    </button>
                                );
                            })}
                        </div>
                        <button onClick={handleComplete} disabled={sectors.length === 0}
                            className="w-full h-12 rounded-xl font-semibold text-white transition-all active:scale-95"
                            style={{ background: sectors.length > 0 ? "#e85d26" : "#d1d5db" }}>
                            Complete Setup →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
