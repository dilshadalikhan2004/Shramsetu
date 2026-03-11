"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, AlertCircle, Phone, ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import { useTranslation } from "@/lib/i18n/TranslationProvider";
import { RecaptchaVerifier, signInWithPhoneNumber, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/Logo";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/components/ToastProvider";

declare global {
    interface Window {
        recaptchaVerifier: RecaptchaVerifier | undefined;
        confirmationResult: { confirm: (code: string) => Promise<{ user: { getIdToken: () => Promise<string>; uid: string } }> } | undefined;
    }
}

export default function AuthPage() {
    const { t } = useTranslation();
    const router = useRouter();
    const { login } = useUserStore();
    const { error: toastError, success: toastSuccess } = useToast();
    const [step, setStep] = useState<"phone" | "otp">("phone");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [error, setError] = useState("");
    const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

    // Countdown timer
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const getVerifier = () => {
        if (typeof window === "undefined") return null;
        if (!window.recaptchaVerifier) {
            try {
                window.recaptchaVerifier = new RecaptchaVerifier(
                    auth,
                    "recaptcha-anchor",
                    { size: "invisible" }
                );
            } catch (err) {
                console.error("Verifier Error:", err);
            }
        }
        return window.recaptchaVerifier || null;
    };

    const handleGoogleSignIn = async () => {
        setError("");
        setLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const token = await result.user.getIdToken();
            const phoneStr = result.user.phoneNumber || "";
            
            // 1) Firestore Sync (for Frontend)
            const docRef = doc(db, "users", result.user.uid);
            const snap = await getDoc(docRef);

            let userData: any;
            if (snap.exists()) {
                userData = snap.data();
                login(phoneStr, token, userData);
            } else {
                userData = { 
                    id: result.user.uid, 
                    phone: phoneStr, 
                    name: result.user.displayName || "",
                    email: result.user.email || "",
                    createdAt: new Date().toISOString() 
                };
                await setDoc(docRef, userData);
                login(userData.phone, token, userData);
            }

            // 2) Prisma Sync (for Backend APIs) - This fixes the Dual Database issue
            try {
                await apiClient.post("/auth/supabase-login", {
                    phone: phoneStr || `google-${result.user.uid.substring(0,6)}0000`, // Ensure 10-char dummy fallback
                    firebaseUid: result.user.uid,
                    name: result.user.displayName || "",
                    email: result.user.email || "",
                });
            } catch (dbErr) {
                console.warn("Backend Prisma sync failed for Google auth, but Firebase succeeded", dbErr);
            }

            toastSuccess(t('auth.loginSuccess') || "Login successful");
            router.push("/");
        } catch (err: any) {
            setError("Google sign-in failed. Please try again.");
            toastError("Google sign-in failed");
        } finally {
            setLoading(false);
        }
    };

    const handleSendOtp = async () => {
        if (phone.length !== 10) return;
        
        // DEV BYPASS: If phone is 9999999999, skip real SMS
        if (phone === "9999999999" && process.env.NODE_ENV === "development") {
            setStep("otp");
            setCountdown(60);
            return;
        }

        setError("");
        setLoading(true);
        try {
            const verifier = getVerifier();
            if (!verifier) throw new Error("Verification service not ready. Please refresh.");
            
            const confirmationResult = await signInWithPhoneNumber(
                auth,
                `+91${phone}`,
                verifier
            );
            window.confirmationResult = confirmationResult;
            setStep("otp");
            setCountdown(30);
            setTimeout(() => otpRefs.current[0]?.focus(), 100);
        } catch (err: any) {
            try { window.recaptchaVerifier?.clear(); window.recaptchaVerifier = undefined; } catch { }
            
            const msg = err.message || "";
            if (msg.includes("invalid-phone-number")) setError(t('auth.errorInvalidPhone') || "Invalid phone number");
            else if (msg.includes("too-many-requests")) setError(t('auth.errorTooManyRequests') || "Too many attempts. Try later.");
            else if (msg.includes("quota-exceeded")) setError("Service limit reached. Try '9999999999' for testing.");
            else setError(t('auth.errorSendFailed') || "Failed to send OTP. Check internet.");
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (idx: number, val: string) => {
        if (!/^\d?$/.test(val)) return;
        const next = [...otp];
        next[idx] = val;
        setOtp(next);
        
        // Auto-focus next/prev
        if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
        if (!val && idx > 0) otpRefs.current[idx - 1]?.focus();

        // Auto-submit if 6th digit entered
        if (val && idx === 5) {
            handleVerify(next.join(""));
        }
    };

    const handleVerify = async (providedCode?: string) => {
        const code = providedCode || otp.join("");
        if (code.length !== 6) return;

        setError("");
        setLoading(true);

        // DEV BYPASS logic
        if (phone === "9999999999" && code === "123456" && process.env.NODE_ENV === "development") {
            setTimeout(() => {
                login(phone, "mock-token", { id: "test-user", name: "Test User", phone: "9999999999" });
                router.push("/");
            }, 800);
            return;
        }

        if (!window.confirmationResult) {
            setError("Session expired. Please request OTP again.");
            setStep("phone");
            setLoading(false);
            return;
        }

        try {
            const result = await window.confirmationResult.confirm(code);
            const token = await result.user.getIdToken();

            // 1) Firestore Sync
            const docRef = doc(db, "users", result.user.uid);
            const snap = await getDoc(docRef);

            let userData: any;
            if (snap.exists()) {
                userData = snap.data();
                login(phone, token, userData);
            } else {
                userData = { id: result.user.uid, phone, createdAt: new Date().toISOString() };
                await setDoc(docRef, userData);
                login(phone, token, userData);
            }

            // 2) Prisma Sync
            try {
                await apiClient.post("/auth/supabase-login", {
                    phone,
                    firebaseUid: result.user.uid,
                });
            } catch (dbErr) {
                console.warn("Backend Prisma sync failed for OTP auth", dbErr);
            }

            toastSuccess(t('auth.loginSuccess') || "Login successful!");
            router.push("/");
        } catch (err: any) {
            console.error("Verification error:", err);
            const msg = err.message || "";
            if (msg.includes("invalid-verification-code")) {
                setError("Incorrect OTP code. Please check and try again.");
            } else if (msg.includes("code-expired")) {
                setError("OTP code expired. Please request a new one.");
                setStep("phone");
            } else {
                setError(t('auth.errorVerifyFailed') || "Verification failed. Please try again.");
            }
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-bg-page flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange/5 rounded-full -mr-64 -mt-64 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm bg-white rounded-[2rem] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)] border border-border p-8 relative z-10"
            >
                {/* Brand */}
                <div className="flex flex-col items-center mb-8 pt-2">
                    <Logo className="w-48 h-auto" />
                    <div className="h-1 w-8 bg-orange mt-3 rounded-full" />
                </div>

                <AnimatePresence mode="wait">
                    {step === "phone" ? (
                        <motion.div
                            key="phone"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-6"
                        >
                            <div className="text-center">
                                <h2 className="font-outfit font-bold text-xl text-text-primary">{t('auth.phoneTitle')}</h2>
                                <p className="text-sm text-text-muted mt-2">{t('auth.phoneSubtitle')}</p>
                            </div>

                            {error && (
                                <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="p-3.5 rounded-xl bg-red-50 border border-red-100 flex gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                                    <p className="text-xs font-medium text-red-600 leading-relaxed">{error}</p>
                                </motion.div>
                            )}

                            <div className="space-y-4">
                                <div className="group relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-border pr-3">
                                        <span className="text-sm font-bold text-text-primary">🇮🇳 +91</span>
                                    </div>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/g, "");
                                            if (val.length <= 10) setPhone(val);
                                            setError("");
                                        }}
                                        onKeyDown={(e) => e.key === "Enter" && phone.length === 10 && handleSendOtp()}
                                        placeholder={t('auth.phonePlaceholder') || "Enter number"}
                                        className="w-full h-14 pl-[80px] pr-4 bg-bg-page border border-border rounded-xl font-outfit font-semibold text-lg focus:ring-4 focus:ring-orange/10 focus:border-orange transition-all outline-none"
                                    />
                                </div>

                                <button
                                    onClick={handleSendOtp}
                                    disabled={loading || phone.length !== 10}
                                    className="w-full h-14 bg-[#0a2540] hover:bg-[#1a3550] disabled:opacity-40 text-white rounded-xl font-outfit font-bold text-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3 overflow-hidden group shadow-lg shadow-blue-900/10"
                                >
                                    {loading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            {t('auth.sendOtp')}
                                            <span className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                                →
                                            </span>
                                        </>
                                    )}
                                </button>

                                <div className="flex items-center gap-3 py-2">
                                    <div className="h-[1px] flex-1 bg-border" />
                                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">or continue with</span>
                                    <div className="h-[1px] flex-1 bg-border" />
                                </div>

                                <button
                                    onClick={handleGoogleSignIn}
                                    disabled={loading}
                                    className="w-full h-14 bg-white hover:bg-bg-page border border-border text-text-primary rounded-xl font-outfit font-bold text-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                    </svg>
                                    Google
                                </button>
                            </div>

                            <div className="flex items-center justify-center gap-2 pt-2">
                                <ShieldCheck className="w-4 h-4 text-green-500" />
                                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">End-to-End Encrypted</span>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="otp"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <button onClick={() => setStep("phone")} className="p-2 -ml-8 hover:bg-bg-page rounded-full transition-colors">
                                        <ArrowLeft className="w-4 h-4 text-text-muted" />
                                    </button>
                                    <h2 className="font-outfit font-bold text-xl text-text-primary">{t('auth.otpTitle')}</h2>
                                </div>
                                <p className="text-sm text-text-muted">
                                    {t('auth.otpSubtitle')} <span className="font-bold text-text-primary">{phone}</span>
                                </p>
                            </div>

                            <div className="flex gap-2 justify-center py-2">
                                {otp.map((digit, idx) => (
                                    <input
                                        key={idx}
                                        ref={(el) => { otpRefs.current[idx] = el; }}
                                        type="tel"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Backspace" && !otp[idx] && idx > 0) otpRefs.current[idx - 1]?.focus();
                                        }}
                                        className="w-12 h-14 rounded-xl border-2 text-center font-outfit font-bold text-2xl transition-all focus:border-orange focus:ring-4 focus:ring-orange/10 outline-none"
                                        style={{ 
                                            background: digit ? "#fff1eb" : "#f8fafc",
                                            borderColor: digit ? "#e85d26" : "#e2e8f0"
                                        }}
                                    />
                                ))}
                            </div>

                            <div className="space-y-4">
                                <button
                                    onClick={() => handleVerify()}
                                    disabled={loading || otp.join("").length !== 6}
                                    className="w-full h-14 bg-orange hover:bg-orange-600 disabled:opacity-40 text-white rounded-xl font-outfit font-bold text-lg transition-all active:scale-[0.98] shadow-lg shadow-orange/20"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : t('auth.verifyContinue')}
                                </button>

                                <div className="text-center">
                                    {countdown > 0 ? (
                                        <p className="text-xs text-text-muted font-medium">
                                            {t('auth.resendIn')} <span className="text-orange font-bold tabular-nums">{countdown}s</span>
                                        </p>
                                    ) : (
                                        <button onClick={handleSendOtp} className="text-xs font-bold text-orange hover:underline">
                                            {t('auth.resendOtp')}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Test Mode Note (Only in Dev) */}
            {process.env.NODE_ENV === "development" && (
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="mt-8 px-4 py-2 bg-yellow-100 border border-yellow-200 rounded-full flex items-center gap-2"
                >
                    <Sparkles className="w-4 h-4 text-yellow-600" />
                    <span className="text-[10px] font-bold text-yellow-800 uppercase tracking-tight">
                        Test Mode: Use 9999999999 (OTP: 123456)
                    </span>
                </motion.div>
            )}

            <div id="recaptcha-anchor" className="mt-4" />
        </div>
    );
}
