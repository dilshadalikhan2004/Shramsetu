"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore, type SupportedLanguage } from "@/store/useUserStore";
import { CheckCircle2 } from "lucide-react";

const LANGUAGES: Array<{ code: SupportedLanguage; native: string; english: string; flag: string }> = [
    { code: "hi", native: "हिंदी", english: "Hindi", flag: "🇮🇳" },
    { code: "en", native: "English", english: "English", flag: "🇮🇳" },
    { code: "or", native: "ଓଡ଼ିଆ", english: "Odia", flag: "🇮🇳" },
    { code: "mr", native: "मराठी", english: "Marathi", flag: "🇮🇳" },
    { code: "ta", native: "தமிழ்", english: "Tamil", flag: "🇮🇳" },
    { code: "te", native: "తెలుగు", english: "Telugu", flag: "🇮🇳" },
    { code: "kn", native: "ಕನ್ನಡ", english: "Kannada", flag: "🇮🇳" },
    { code: "bn", native: "বাংলা", english: "Bengali", flag: "🇮🇳" },
    { code: "gu", native: "ગુજરાતી", english: "Gujarati", flag: "🇮🇳" },
    { code: "pa", native: "ਪੰਜਾਬੀ", english: "Punjabi", flag: "🇮🇳" },
];

export default function LanguageSelectionPage() {
    const router = useRouter();
    const { setLanguage, preferredLanguage } = useUserStore();
    const [selected, setSelected] = useState<SupportedLanguage>(preferredLanguage || "en");

    const handleContinue = () => {
        setLanguage(selected);
        router.push("/role-selection");
    };

    return (
        <div className="min-h-screen font-dmsans flex flex-col items-center justify-start py-10 px-6" style={{ background: "#ffffff" }}>
            {/* Header */}
            <div className="text-center mb-8 max-w-sm w-full">
                <div className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center" style={{ background: "#fff1eb" }}>
                    <span style={{ fontSize: 28 }}>🌐</span>
                </div>
                <h1 className="font-outfit font-bold" style={{ fontSize: 24, color: "#0a2540" }}>
                    अपनी भाषा चुनें
                </h1>
                <p className="font-dmsans mt-1" style={{ fontSize: 14, color: "#6b7280" }}>
                    Choose Your Language
                </p>
            </div>

            {/* Language Grid */}
            <div className="grid grid-cols-2 xs:grid-cols-3 gap-3 w-full max-w-sm">
                {LANGUAGES.map((lang) => {
                    const isSelected = selected === lang.code;
                    return (
                        <button
                            key={lang.code}
                            onClick={() => setSelected(lang.code)}
                            className="relative rounded-2xl border p-4 text-center transition-all duration-200 active:scale-95 flex flex-col items-center"
                            style={{
                                background: isSelected ? "#fff1eb" : "#ffffff",
                                borderColor: isSelected ? "#e85d26" : "#e5e7eb",
                                borderWidth: isSelected ? 2 : 1,
                            }}
                        >
                            {isSelected && (
                                <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#e85d26" }}>
                                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                                </div>
                            )}
                            <div className="text-2xl mb-2">{lang.flag}</div>
                            <div className="font-outfit font-bold" style={{ fontSize: 16, color: "#111827" }}>
                                {lang.native}
                            </div>
                            <div className="font-dmsans" style={{ fontSize: 11, color: "#9ca3af" }}>{lang.english}</div>
                        </button>
                    );
                })}
            </div>

            {/* Sticky Continue Button */}
            <div className="fixed bottom-0 left-0 right-0 p-5 z-20" style={{ background: "white", borderTop: "1px solid #e5e7eb" }}>
                <button
                    onClick={handleContinue}
                    className="w-full h-12 rounded-xl font-dmsans font-bold text-white transition-all duration-200 active:scale-95 shadow-lg shadow-orange-500/20"
                    style={{ background: "#e85d26", maxWidth: 430, margin: "0 auto", display: "block" }}
                >
                    Continue →
                </button>
            </div>

            <div className="h-24" />
        </div>
    );
}
