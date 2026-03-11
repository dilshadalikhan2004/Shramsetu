"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import { useTranslation } from "@/lib/i18n/TranslationProvider";
import { Logo } from "@/components/Logo";

export default function SplashPage() {
    const router = useRouter();
    const { isAuthenticated, mode, isProfileReady, isLanguageSelected } = useUserStore();
    const { notifications, setNotifications } = useNotificationStore();
    const [done, setDone] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        // Migrate old notifications without roles to 'worker'
        const needsMigration = notifications.some(n => !n.role);
        if (needsMigration) {
            const migrated = notifications.map(n => ({
                ...n,
                role: n.role || "worker" as any
            }));
            setNotifications(migrated);
        }

        const timer = setTimeout(() => {
            setDone(true);
            // Route decision
            if (isAuthenticated) {
                const langOk = isLanguageSelected ? isLanguageSelected() : false;
                if (!langOk) { router.push("/language-selection"); return; }
                if (mode === "worker") router.push("/home");
                else if (mode === "employer") router.push("/dashboard");
                else router.push("/role-selection");
            } else {
                router.push("/");
            }
        }, 2500);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, mode, router]);

    return (
        <div
            className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
            style={{ background: "#0a2540" }}
        >
            {/* Logo */}
            <div className="flex flex-col items-center justify-center flex-1 gap-6">
                <Logo className="w-20 h-auto mb-2" variant="dark" />
                <div className="text-center">
                    <p className="font-dmsans italic mt-2" style={{ fontSize: 16, color: "rgba(255,255,255,0.7)" }}>
                        {t('splash.tagline')}
                    </p>
                </div>

                {/* Progress bar */}
                <div className="mt-4 rounded-full overflow-hidden" style={{ width: 192, height: 4, background: "rgba(255,255,255,0.15)" }}>
                    <div
                        className="h-full rounded-full"
                        style={{
                            background: "#e85d26",
                            animation: "splashProgress 2s linear forwards",
                        }}
                    />
                </div>
            </div>

            <p className="absolute bottom-8 font-dmsans" style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.02em" }}>
                {t('splash.poweredBy')}
            </p>

            <style>{`
                @keyframes splashProgress {
                    from { width: 0% }
                    to { width: 100% }
                }
            `}</style>
        </div>
    );
}
