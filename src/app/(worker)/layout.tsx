"use client";

import { WorkerAppLayout } from "./WorkerAppLayout";
import { EmployerAppLayout } from "../(employer)/EmployerAppLayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";

export default function WorkerLayout({ children }: { children: React.ReactNode }) {
    const { isProfileReady, isAuthenticated, mode, generalProfile } = useUserStore();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (!mounted) return;
        if (!isAuthenticated) {
            router.push("/splash");
            return;
        }
        // Remove employer redirect to allow shared pages (settings, help, etc.) 
        // to be accessed by employers while being in this route group.

        if (isProfileReady && !isProfileReady()) {
            router.push("/setup/worker");
            return;
        }

        if (generalProfile?.kycStatus === 'none') {
            router.push("/kyc");
            return;
        }
    }, [mounted, isAuthenticated, mode, isProfileReady, generalProfile, router]);

    if (!mounted) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: "#f3f4f6" }}>
                <div className="w-8 h-8 rounded-full border-4 border-gray-200 border-t-[#e85d26] animate-spin" />
            </div>
        );
    }

    // Dynamically choose layout based on mode
    if (mode === "employer") {
        return <EmployerAppLayout>{children}</EmployerAppLayout>;
    }

    return <WorkerAppLayout>{children}</WorkerAppLayout>;
}
