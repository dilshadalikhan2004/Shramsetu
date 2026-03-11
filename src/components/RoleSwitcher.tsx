"use client";

import { useRouter, usePathname } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { Wrench, Building2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n/TranslationProvider";

/** Inline header variant — no fixed positioning, used inside the top-bar */
export function RoleSwitcherInline() {
    const { t } = useTranslation();
    const router = useRouter();
    const { mode, setMode } = useUserStore();

    const switchToWorker = () => { setMode("worker"); router.push("/home"); };
    const switchToEmployer = () => { setMode("employer"); router.push("/dashboard"); };

    return (
        <div className="flex items-center gap-1 rounded-full border"
            style={{ background: "white", borderColor: "#e5e7eb", padding: "3px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
            <button onClick={switchToWorker}
                className="flex items-center gap-1.5 rounded-full px-4 py-1.5 font-dmsans font-semibold transition-all duration-200"
                style={{ fontSize: 13, background: mode === "worker" ? "#0a2540" : "transparent", color: mode === "worker" ? "white" : "#6b7280" }}>
                <Wrench className="w-3.5 h-3.5" />
                {t('common.worker')}
            </button>
            <button onClick={switchToEmployer}
                className="flex items-center gap-1.5 rounded-full px-4 py-1.5 font-dmsans font-semibold transition-all duration-200"
                style={{ fontSize: 13, background: mode === "employer" ? "#e85d26" : "transparent", color: mode === "employer" ? "white" : "#6b7280" }}>
                <Building2 className="w-3.5 h-3.5" />
                {t('common.employer')}
            </button>
        </div>
    );
}

/** Legacy floating variant — kept for compatibility but no longer rendered */
export default function RoleSwitcher() {
    return null;
}
