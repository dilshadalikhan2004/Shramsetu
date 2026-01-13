"use client";

import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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
