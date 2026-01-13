"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";

export default function Home() {
    const router = useRouter();
    const { isAuthenticated, mode, isProfileReady } = useUserStore();

    useEffect(() => {
        // console.log("Home Page Check:", { isAuthenticated, mode, profileReady: isProfileReady() });

        if (!isAuthenticated) {
            router.push("/auth");
            return;
        }

        const ready = isProfileReady();

        if (mode === "worker") {
            if (ready) {
                router.push("/home");
            } else {
                router.push("/setup/worker");
            }
        } else if (mode === "employer") {
            if (ready) {
                router.push("/dashboard");
            } else {
                router.push("/setup/employer");
            }
        } else {
            // Should usually be caught by above, but fallback
            router.push("/role-selection");
        }
    }, [isAuthenticated, mode, router, isProfileReady]);

    return (
        <main className="flex min-h-screen items-center justify-center p-24 bg-brand-deep">
            {/* Loading spinner or splash screen */}
            <div className="animate-pulse flex flex-col items-center">
                <h1 className="text-4xl font-bold text-white">ShramSetu</h1>
                <p className="text-white/80 mt-2">Loading...</p>
            </div>
        </main>
    );
}
