"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { Shield, ArrowRight, CheckCircle2, UploadCloud, FileText, Loader2, ArrowLeft } from "lucide-react";

export default function KYCPage() {
    const router = useRouter();
    const { mode, updateGeneralProfile } = useUserStore();
    const [step, setStep] = useState<"intro" | "upload" | "verifying" | "success">("intro");
    const [file, setFile] = useState<File | null>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setStep("upload");
        }
    };

    const handleVerifySubmit = async () => {
        if (!file) return;
        setStep("verifying");

        try {
            // Fake upload delay
            await new Promise(res => setTimeout(res, 2500));

            // Update Zustand
            updateGeneralProfile({ kycStatus: "verified" });

            // Update Firebase
            const { auth, db } = await import("@/lib/firebase");
            const { doc, setDoc } = await import("firebase/firestore");
            const user = auth.currentUser;
            if (user) {
                const state = useUserStore.getState();
                await setDoc(doc(db, "users", user.uid), {
                    generalProfile: state.generalProfile
                }, { merge: true });
            }

            setStep("success");

            // Auto redirect
            setTimeout(() => {
                router.push(mode === "worker" ? "/home" : "/dashboard");
            }, 1500);
        } catch (error) {
            console.error("KYC verification failed", error);
            setStep("upload"); // Revert on failure
        }
    };

    const skipKYC = () => {
        router.push(mode === "worker" ? "/home" : "/dashboard");
    }

    return (
        <div className="min-h-screen font-dmsans flex flex-col items-center justify-center p-6 bg-slate-50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50 to-transparent -z-10" />

            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-8 relative z-10 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5">

                {step === "intro" && (
                    <div className="space-y-6 text-center animate-in fade-in zoom-in duration-300">
                        <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto ring-8 ring-blue-50/50">
                            <Shield className="w-10 h-10 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="font-outfit text-2xl font-bold text-slate-900 mb-2">Verify Your Identity</h1>
                            <p className="text-slate-500 text-sm leading-relaxed px-4">
                                Government ID verification is required to build trust and unlock more opportunities on ShramSetu.
                            </p>
                        </div>

                        <div className="bg-amber-50 rounded-2xl p-4 flex items-start gap-3 text-left border border-amber-100/50">
                            <Shield className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                            <p className="text-xs text-amber-700 font-medium leading-relaxed">
                                Get the <span className="font-bold">✓ Verified Badge</span> on your profile. Verified profiles get 3x more jobs!
                            </p>
                        </div>

                        <div className="space-y-3 pt-4">
                            <button
                                onClick={() => setStep("upload")}
                                className="w-full h-14 rounded-xl font-bold text-white transition-all active:scale-95 flex items-center justify-center gap-2 group"
                                style={{ background: "#e85d26" }}
                            >
                                Start Verification
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button onClick={skipKYC} className="w-full text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors">
                                I'll do this later
                            </button>
                        </div>
                    </div>
                )}

                {step === "upload" && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                        <button onClick={() => setStep("intro")} className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back
                        </button>

                        <div>
                            <h2 className="font-outfit text-xl font-bold text-slate-900 mb-1">Upload Aadhaar or PAN</h2>
                            <p className="text-slate-500 text-sm">Please upload a clear photo of your ID.</p>
                        </div>

                        <label className="border-2 border-dashed border-slate-200 rounded-2xl h-48 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all group overflow-hidden relative">
                            {file ? (
                                <div className="text-center z-10 w-full px-6 flex flex-col items-center">
                                    <FileText className="w-10 h-10 text-blue-500 mb-2" />
                                    <p className="text-sm font-medium text-slate-700 truncate w-full">{file.name}</p>
                                    <p className="text-xs text-slate-400 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                            ) : (
                                <div className="text-center z-10">
                                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-3 group-hover:bg-white transition-colors">
                                        <UploadCloud className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                    </div>
                                    <p className="text-sm font-semibold text-slate-600">Tap to upload file</p>
                                    <p className="text-xs text-slate-400 mt-1">JPEG, PNG or PDF (Max 5MB)</p>
                                </div>
                            )}
                            <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf" onChange={handleFileUpload} />
                        </label>

                        <button
                            onClick={handleVerifySubmit}
                            disabled={!file}
                            className={`w-full h-14 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center ${file ? 'active:scale-95 shadow-lg shadow-orange-500/25' : 'opacity-50 cursor-not-allowed'}`}
                            style={{ background: file ? "#e85d26" : "#cbd5e1" }}
                        >
                            Upload & Verify
                        </button>
                    </div>
                )}

                {step === "verifying" && (
                    <div className="space-y-6 text-center py-8 animate-in fade-in duration-300">
                        <div className="relative w-24 h-24 mx-auto">
                            <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
                            <div className="absolute inset-0 rounded-full border-4 border-l-[#e85d26] animate-spin"></div>
                            <Shield className="w-10 h-10 absolute inset-0 m-auto text-slate-400 animate-pulse" />
                        </div>
                        <div>
                            <h2 className="font-outfit text-xl font-bold text-slate-900 mb-2">Verifying Identity</h2>
                            <p className="text-slate-500 text-sm px-4">Securely connecting to the verification portal. Please don't close this app.</p>
                        </div>
                    </div>
                )}

                {step === "success" && (
                    <div className="space-y-6 text-center py-8 animate-in zoom-in duration-500">
                        <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mx-auto text-green-500 ring-8 ring-green-50/50">
                            <CheckCircle2 className="w-12 h-12" />
                        </div>
                        <div>
                            <h2 className="font-outfit text-2xl font-bold text-slate-900 mb-2">Verified Successfully!</h2>
                            <p className="text-slate-500 text-sm">You're all set to use ShramSetu.</p>
                        </div>
                    </div>
                )}

            </div>

            <p className="mt-8 text-xs text-slate-400 font-medium tracking-wide">SECURED BY TRUSTBRIDGE KYC</p>
        </div>
    );
}
