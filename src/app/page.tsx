"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Root page now auto-redirects to the splash screen
export default function RootPage() {
    const router = useRouter();
    useEffect(() => {
        router.replace("/splash");
    }, [router]);

    return (
        <div className="fixed inset-0 flex items-center justify-center" style={{ background: "#0a2540" }}>
            <div className="w-8 h-8 rounded-full border-4 border-white/20 border-t-[#e85d26] animate-spin" />
        </div>
    );
}
