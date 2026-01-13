"use client";

import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";

export default function EmployerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isProfileReady, isAuthenticated } = useUserStore();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/auth");
            return;
        }
        if (!isProfileReady()) {
            router.push("/setup/employer");
        }
    }, [isProfileReady, isAuthenticated, router]);

    if (!isProfileReady()) {
        return null;
    }

    return (
        <div className="flex flex-col min-h-screen bg-bg-surface">
            <Navbar />
            <main className="flex-1 pb-16">
                {children}
            </main>
            <BottomNav />
        </div>
    );
}
