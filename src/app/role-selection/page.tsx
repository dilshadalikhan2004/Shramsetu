"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { Wrench, Building2, ChevronRight, ShieldCheck } from "lucide-react";
import { useTranslation } from "@/lib/i18n/TranslationProvider";

export default function RoleSelectionPage() {
    const { t } = useTranslation();
    const router = useRouter();
    const { setMode } = useUserStore();
    const [selected, setSelected] = useState<"worker" | "employer" | null>(null);

    const handleContinue = () => {
        if (!selected) return;
        setMode(selected);
        router.push("/auth");
    };

    const Card = ({
        role, title, sub, icon,
    }: { role: "worker" | "employer"; title: string; sub: string; icon: React.ReactNode }) => {
        const active = selected === role;
        return (
            <button
                onClick={() => setSelected(role)}
                className="w-full rounded-2xl border p-5 flex items-center gap-4 text-left transition-all duration-200 active:scale-[0.98]"
                style={{
                    background: "#ffffff",
                    borderColor: active ? "#e85d26" : "#e5e7eb",
                    borderWidth: active ? 2 : 1,
                    boxShadow: active ? "0 0 0 4px rgba(232,93,38,0.08)" : "0 1px 3px rgba(0,0,0,0.06)",
                }}
            >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#fff1eb" }}>
                    {icon}
                </div>
                <div className="flex-1">
                    <div className="font-outfit font-semibold" style={{ fontSize: 18, color: "#111827" }}>{title}</div>
                    <div className="font-dmsans mt-0.5" style={{ fontSize: 13, color: "#6b7280" }}>{sub}</div>
                </div>
                <ChevronRight className="w-5 h-5 shrink-0" style={{ color: active ? "#e85d26" : "#9ca3af" }} />
            </button>
        );
    };

    return (
        <div className="min-h-screen font-dmsans flex flex-col p-6" style={{ background: "#f3f4f6" }}>
            <div className="flex-1 max-w-sm mx-auto w-full pt-12">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="font-outfit font-bold" style={{ fontSize: 28, color: "#111827" }}>{t('role.title')}</h1>
                    <p className="mt-1" style={{ fontSize: 14, color: "#6b7280" }}>{t('role.subtitle')}</p>
                </div>

                {/* Role Cards */}
                <div className="space-y-3">
                    <Card
                        role="worker"
                        title={t('role.workerTitle')}
                        sub={t('role.workerSub')}
                        icon={<Wrench className="w-6 h-6" style={{ color: "#e85d26" }} />}
                    />
                    <Card
                        role="employer"
                        title={t('role.employerTitle')}
                        sub={t('role.employerSub')}
                        icon={<Building2 className="w-6 h-6" style={{ color: "#e85d26" }} />}
                    />
                </div>

                {/* Trust line */}
                <div className="flex items-center justify-center gap-2 mt-6">
                    <ShieldCheck className="w-4 h-4" style={{ color: "#0e9f6e" }} />
                    <span className="font-dmsans font-semibold tracking-wider" style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase" }}>
                        {t('role.secure')}
                    </span>
                </div>
            </div>

            {/* Bottom Buttons */}
            <div className="max-w-sm mx-auto w-full space-y-3 pb-4">
                <button
                    onClick={handleContinue}
                    disabled={!selected}
                    className="w-full h-12 rounded-xl font-dmsans font-semibold text-white transition-all duration-200 active:scale-95"
                    style={{
                        background: selected ? "#e85d26" : "#d1d5db",
                        cursor: selected ? "pointer" : "not-allowed",
                    }}
                >
                    {t('role.next')}
                </button>
                <p className="text-center font-dmsans" style={{ fontSize: 14, color: "#6b7280" }}>
                    {t('role.haveAccount')}{" "}
                    <button onClick={() => router.push("/auth")} className="font-semibold" style={{ color: "#e85d26" }}>
                        {t('role.signIn')}
                    </button>
                </p>
            </div>
        </div>
    );
}
