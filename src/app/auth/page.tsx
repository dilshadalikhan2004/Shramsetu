"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/useUserStore";

export default function AuthPage() {
    const router = useRouter();
    const { login } = useUserStore();
    const [step, setStep] = useState<"phone" | "otp">("phone");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");

    const handleSendOtp = () => {
        if (phone.length === 10) {
            setStep("otp");
        } else {
            alert("Please enter a valid 10-digit phone number");
        }
    };

    const handleVerifyOtp = () => {
        if (otp === "1234") { // Mock OTP
            login(phone);
            // Ensure we redirect to the correct place.
            // Usually would check if profile exists, but here we go to role switcher or home.
            // Let's assume we go to Role Selection first if not handled by store defaults.
            router.push("/role-selection");
        } else {
            alert("Invalid OTP. Use 1234");
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background">
            <div className="w-full max-w-sm space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-brand-deep dark:text-brand-cyan">Welcome to ShramSetu</h1>
                    <p className="mt-2 text-muted-foreground">India's blue-collar freelancing platform</p>
                </div>

                <div className="space-y-4">
                    {step === "phone" ? (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">
                                    Phone Number
                                </label>
                                <div className="flex gap-2">
                                    <span className="flex items-center justify-center px-3 border border-input bg-muted rounded-md text-muted-foreground text-sm">
                                        +91
                                    </span>
                                    <Input
                                        type="tel"
                                        placeholder="9876543210"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        maxLength={10}
                                    />
                                </div>
                            </div>
                            <Button className="w-full bg-brand-deep hover:bg-brand-deep/90 text-white" onClick={handleSendOtp}>
                                Get OTP
                            </Button>
                        </>
                    ) : (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1">
                                    Enter OTP sent to +91 {phone}
                                </label>
                                <Input
                                    type="text"
                                    placeholder="XXXX"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength={4}
                                    className="text-center text-2xl tracking-widest"
                                />
                                <p className="text-xs text-muted-foreground mt-2 text-right">Use 1234 as OTP</p>
                            </div>
                            <Button className="w-full bg-brand-deep hover:bg-brand-deep/90 text-white" onClick={handleVerifyOtp}>
                                Verify & Login
                            </Button>
                            <button
                                onClick={() => setStep("phone")}
                                className="w-full text-center text-sm text-brand-blue hover:underline py-2"
                            >
                                Change Phone Number
                            </button>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}
