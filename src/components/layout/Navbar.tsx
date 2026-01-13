"use client";

import { ModeToggle } from "./ModeToggle";
import { Bell, Menu } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { Sidebar } from "./Sidebar";
import { useState } from "react";

export const Navbar = () => {
    const { mode } = useUserStore();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <header className={`sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-opacity-80 px-4 py-3 flex items-center justify-between transition-colors duration-300
                ${mode === 'worker'
                    ? 'bg-white/90 dark:bg-slate-950/90 border-blue-100 dark:border-blue-900'
                    : 'bg-white/90 dark:bg-slate-950/90 border-green-100 dark:border-green-900'}
            `}>
                <div className="flex items-center gap-2">
                    <button onClick={() => setIsSidebarOpen(true)}>
                        <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                    </button>
                </div>

                <div className="flex-1 px-4">
                    <ModeToggle />
                </div>

                <div className="flex items-center gap-2">
                    <Bell className={`w-6 h-6 ${mode === 'worker' ? 'text-worker-primary' : 'text-employer-primary'}`} />
                </div>
            </header>
        </>
    );
}
