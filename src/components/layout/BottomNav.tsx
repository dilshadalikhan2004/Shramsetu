"use client";

import { useUserStore } from "@/store/useUserStore";
import { Home, Users, Wallet, User, Briefcase, MessageSquare, CreditCard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BottomNav = () => {
    const { mode } = useUserStore();
    const pathname = usePathname();

    const workerLinks = [
        { href: "/home", label: "Home", icon: Home },
        { href: "/teams", label: "Teams", icon: Users },
        { href: "/chats", label: "Chat", icon: MessageSquare },
        { href: "/earnings", label: "Earnings", icon: Wallet },
        { href: "/worker-profile", label: "Profile", icon: User },
    ];

    const employerLinks = [
        { href: "/dashboard", label: "Home", icon: Home },
        { href: "/my-jobs", label: "Jobs", icon: Briefcase },
        { href: "/chats", label: "Chat", icon: MessageSquare },
        { href: "/payments", label: "Pay", icon: CreditCard },
        { href: "/employer-profile", label: "Profile", icon: User },
    ];

    const links = mode === "worker" ? workerLinks : employerLinks;

    return (
        <div className="fixed bottom-0 left-0 z-50 w-full bg-white border-t border-gray-200 pb-2 pt-1 h-16">
            <div className={`max-w-md mx-auto grid h-full grid-cols-5`}>
                {links.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname.startsWith(href);
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex flex-col items-center justify-center space-y-1 ${isActive
                                ? (mode === 'worker' ? 'text-worker-primary' : 'text-employer-primary')
                                : 'text-gray-500'
                                }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? 'fill-current' : ''}`} />
                            <span className="text-[10px] font-medium">{label}</span>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
};
