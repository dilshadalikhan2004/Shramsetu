"use client";

import { ReactNode, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { useChatStore } from "@/store/useChatStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import {
    Bell, Search, Home, ClipboardList, Users,
    IndianRupee, User, MessageCircle, Settings, HelpCircle,
} from "lucide-react";
import RoleSwitcher, { RoleSwitcherInline } from "@/components/RoleSwitcher";
import { ToastContainer } from "@/components/ui/animations";
import AIAssistant from "@/components/shared/AIAssistant";
import { useTranslation } from "@/lib/i18n/TranslationProvider";
import { Logo } from "@/components/Logo";

export const WorkerAppLayout = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();
    const router = useRouter();
    const { t } = useTranslation();
    const { generalProfile } = useUserStore();
    const { unreadCount: notifUnread } = useNotificationStore();
    const { workerConversations, setWorkerConversations, workerTotalUnread } = useChatStore();

    // Initialize mock data if empty
    useEffect(() => {
        if (workerConversations.length === 0) {
            setWorkerConversations([
                {
                    id: "c1",
                    name: "Rahul (Mason)",
                    lastMsg: "Can you come tomorrow at 9 AM?",
                    time: "10:30 AM",
                    unread: 1,
                    online: true,
                    init: "R",
                    color: "#0a2540",
                    role: "Employer"
                },
                {
                    id: "c2",
                    name: "Buildcon Projects",
                    lastMsg: "Your application was accepted.",
                    time: "Yesterday",
                    unread: 0,
                    online: false,
                    init: "B",
                    color: "#e85d26",
                    role: "Company"
                }
            ]);
        }
    }, [workerConversations.length, setWorkerConversations]);

    const SIDEBAR_NAV = [
        { href: "/home", label: t('common.home'), icon: Home },
        { href: "/applications", label: t('common.applications'), icon: ClipboardList },
        { href: "/teams", label: t('common.teams'), icon: Users },
        { href: "/earnings", label: t('common.earnings'), icon: IndianRupee },
        { href: "/chat", label: t('common.messages'), icon: MessageCircle },
        { href: "/worker-profile", label: t('sidebar.myProfile'), icon: User },
        { href: "/settings", label: t('sidebar.settings'), icon: Settings },
        { href: "/help", label: t('sidebar.help'), icon: HelpCircle },
    ];

    const BOTTOM_NAV = [
        { href: "/home", label: t('common.home'), icon: Home },
        { href: "/applications", label: t('common.applications'), icon: ClipboardList },
        { href: "/teams", label: t('common.teams'), icon: Users },
        { href: "/earnings", label: t('common.earnings'), icon: IndianRupee },
        { href: "/worker-profile", label: t('sidebar.myProfile'), icon: User },
    ];

    const name = generalProfile?.name || "User";
    const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
    const isOnChatPage = pathname === "/chat";
    const isOnNotifPage = pathname === "/notifications";

    return (
        <div className="flex h-screen overflow-hidden font-dmsans bg-bg-page">

            {/* ── Desktop Sidebar (hidden on mobile) ── */}
            <aside className="hidden lg:flex w-60 flex-none flex-col border-r overflow-y-auto shrink-0 bg-bg-card border-border">

                {/* Logo */}
                <div className="flex items-center justify-center px-4 py-4 border-b shrink-0 border-border">
                    <Logo className="w-32 h-auto" />
                </div>

                {/* Nav Items */}
                <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                    {SIDEBAR_NAV.map(({ href, label, icon: Icon }) => {
                        const active = pathname === href || (href !== "/home" && pathname.startsWith(href));
                        return (
                            <Link key={href} href={href}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200"
                                style={{
                                    background: active ? "#fff1eb" : "transparent",
                                    color: active ? "#e85d26" : "#374151",
                                    fontWeight: active ? 600 : 400,
                                }}>
                                <Icon className="w-5 h-5 shrink-0" />
                                <span style={{ fontSize: 14 }}>{label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Worker Card */}
                <div className="p-4 border-t shrink-0 border-border">
                    <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center font-outfit font-bold text-white text-sm shrink-0"
                            style={{ background: "#0a2540" }}>
                            {initials}
                        </div>
                        <div className="min-w-0">
                            <p className="font-dmsans font-semibold truncate text-text-primary" style={{ fontSize: 13 }}>{name}</p>
                            <p style={{ fontSize: 11, color: "#0e9f6e", fontWeight: 600 }}>✓ {t('common.verified')}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => router.push("/home")}
                        className="w-full h-9 rounded-xl font-dmsans font-semibold text-white text-sm transition-all active:scale-95"
                        style={{ background: "#0a2540" }}
                    >
                        {t('settings.welcomeBrowse')}
                    </button>
                </div>
            </aside>

            {/* ── Right Side: Header + Content ── */}
            <div className="flex-1 flex flex-col overflow-hidden min-w-0">

                {/* Top Bar */}
                <header className="flex items-center justify-between px-4 lg:px-6 py-3.5 border-b bg-bg-card shrink-0 border-border">

                    {/* Mobile: logo | Desktop: search */}
                    <div className="flex items-center lg:hidden">
                        <Logo className="w-24 h-auto" />
                    </div>

                    <div className="hidden lg:flex relative w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input
                            type="text"
                            placeholder={t('common.search')}
                            className="w-full h-9 rounded-xl pl-9 pr-4 text-sm outline-none bg-bg-page text-text-primary border-none"
                        />
                    </div>

                    {/* Center — Role Switcher */}
                    <div className="flex-1 flex justify-center">
                        <RoleSwitcherInline />
                    </div>

                    {/* Right actions */}
                    <div className="flex items-center gap-2">

                        <button 
                            onClick={() => router.push("/notifications")}
                            className="w-9 h-9 rounded-xl flex items-center justify-center relative bg-bg-page"
                        >
                            <Bell className="w-5 h-5 text-text-primary" />
                            {!isOnNotifPage && notifUnread > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center text-white font-bold"
                                    style={{ fontSize: 10, background: "var(--orange)" }}>{notifUnread}</span>
                            )}
                        </button>
                        
                        <button 
                            onClick={() => router.push("/chat")}
                            className="w-9 h-9 rounded-xl flex items-center justify-center relative bg-bg-page"
                        >
                            <MessageCircle className="w-5 h-5 text-text-primary" />
                            {!isOnChatPage && workerTotalUnread > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center text-white font-bold"
                                    style={{ fontSize: 10, background: "var(--orange)" }}>{workerTotalUnread}</span>
                            )}
                        </button>

                        <button onClick={() => router.push("/worker-profile")}
                            className="flex items-center gap-2 ml-1">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center font-outfit font-bold text-white text-xs shrink-0 bg-navy">
                                {initials}
                            </div>
                            <div className="hidden lg:block text-left">
                                <p className="font-dmsans font-medium leading-none text-text-primary" style={{ fontSize: 13 }}>{name}</p>
                                <p className="font-dmsans" style={{ fontSize: 11, color: "var(--green)" }}>✓ {t('common.verified')}</p>
                            </div>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-6 pb-20 lg:pb-6">
                    {children}
                </main>
            </div>

            {/* ── Mobile Bottom Nav (hidden on desktop) ── */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t bg-bg-card border-border">
                <div className="flex justify-around items-center">
                    {BOTTOM_NAV.map(({ href, label, icon: Icon }) => {
                        const active = pathname === href || (href !== "/home" && pathname.startsWith(href));
                        return (
                            <Link key={href} href={href}
                                className="flex flex-col items-center justify-center py-2.5 flex-1 relative">
                                {active && (
                                    <span className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b w-8 h-0.5"
                                        style={{ background: "#e85d26" }} />
                                )}
                                <Icon className="w-5 h-5 mb-0.5" style={{ color: active ? "#e85d26" : "var(--text-muted)" }} />
                                <span className="font-dmsans font-medium" style={{ fontSize: 10, color: active ? "#e85d26" : "var(--text-muted)" }}>
                                    {label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Global Toast Notifications */}
            <ToastContainer />
            <AIAssistant />
        </div>
    );
};
