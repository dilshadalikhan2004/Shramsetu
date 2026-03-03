"use client";

import { EmployerAppLayout } from "./EmployerAppLayout";
import { WorkerAppLayout } from "../(worker)/WorkerAppLayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
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

        // Let the layout dynamic choice handle the mode instead of hard redirecting
        // if they are on a potentially shared route within this group.

        if (isProfileReady && !isProfileReady()) {
            router.push("/setup/employer");
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
    if (mode === "worker") {
        return <WorkerAppLayout>{children}</WorkerAppLayout>;
    }

    return <EmployerAppLayout>{children}</EmployerAppLayout>;
}
