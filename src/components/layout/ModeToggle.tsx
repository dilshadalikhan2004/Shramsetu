"use client";

import { useUserStore } from "@/store/useUserStore";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export const ModeToggle = () => {
    const { mode, setMode } = useUserStore();
    const router = useRouter();

    const handleSwitch = (newMode: 'worker' | 'employer') => {
        setMode(newMode);
        if (newMode === 'worker') {
            router.push('/home');
        } else {
            router.push('/dashboard');
        }
    };

    return (
        <div className="relative flex w-full max-w-[200px] bg-gray-200 rounded-full p-1 h-10 shadow-inner mx-auto">
            <motion.div
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full shadow-md z-10 ${mode === "worker" ? "bg-worker-primary" : "bg-employer-primary"
                    }`}
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                initial={false}
                animate={{
                    x: mode === "worker" ? 0 : "100%",
                }}
            />
            <button
                onClick={() => handleSwitch("worker")}
                className={`flex-1 z-20 text-sm font-medium transition-colors duration-200 ${mode === "worker" ? "text-white" : "text-gray-600"
                    }`}
            >
                Worker
            </button>
            <button
                onClick={() => handleSwitch("employer")}
                className={`flex-1 z-20 text-sm font-medium transition-colors duration-200 ${mode === "employer" ? "text-white" : "text-gray-600"
                    }`}
            >
                Employer
            </button>
        </div>
    );
};
