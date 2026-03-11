"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { useChatStore } from "@/store/useChatStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import {
    LayoutDashboard, Briefcase, FileText, Users, BarChart2,
    Settings, Bell, Mail, Search, Plus, MessageCircle, HelpCircle,
    CreditCard,
} from "lucide-react";
import RoleSwitcher, { RoleSwitcherInline } from "@/components/RoleSwitcher";
import { ToastContainer } from "@/components/ui/animations";
import AIAssistant from "@/components/shared/AIAssistant";
import { useTranslation } from "@/lib/i18n/TranslationProvider";
import { Logo } from "@/components/Logo";


export const EmployerAppLayout = ({ children }: { children: ReactNode }) => {
    const { t } = useTranslation();
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { generalProfile } = useUserStore();
    const { employerConversations, setEmployerConversations, employerTotalUnread } = useChatStore();
    const employerUnread = useNotificationStore(state => state.getUnreadCountByRole("employer"));

    // Initialize mock data if empty
    useEffect(() => {
        if (employerConversations.length === 0) {
            setEmployerConversations([
                {
                    id: "ec1",
                    name: "Vikram Singh",
                    lastMsg: "I'm interested in the plumbing job.",
                    time: "09:15 AM",
                    unread: 1,
                    online: true,
                    init: "V",
                    color: "#0a2540",
                    role: "Plumber"
                },
                {
                    id: "ec2",
                    name: "Amit Kumar",
                    lastMsg: "When can I expect the payment?",
                    time: "11:45 AM",
                    unread: 0,
                    online: true,
                    init: "A",
                    color: "#e85d26",
                    role: "Electrician"
                }
            ]);
        }
    }, [employerConversations.length, setEmployerConversations]);

    const NAV = [
        { href: "/dashboard", label: t('common.home'), icon: LayoutDashboard },
        { href: "/my-jobs", label: t('common.applications'), icon: Briefcase },
        { href: "/subscription", label: t('settings.subscription'), icon: CreditCard },
        { href: "/post-job", label: t('employer.completeSetup'), icon: Plus },
        { href: "/employer-chat", label: t('common.messages'), icon: MessageCircle },
        { href: "/dashboard?tab=analytics", label: "Analytics", icon: BarChart2 },
        { href: "/employer-notifications", label: t('settings.notifications'), icon: Bell },
        { href: "/settings", label: t('settings.title'), icon: Settings },
        { href: "/help", label: t('sidebar.help'), icon: HelpCircle },
    ];

    const companyName = generalProfile?.name || "Company";
    const initials = companyName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
    const isOnChatPage = pathname === "/employer-chat";
    const isOnNotifPage = pathname === "/employer-notifications";

    const currentTab = searchParams.get("tab");

    return (
        <div className="flex h-screen overflow-hidden font-dmsans bg-bg-page text-text-primary">
            {/* Sidebar */}
            <aside
                className="hidden lg:flex w-60 flex-none flex flex-col border-r overflow-y-auto bg-bg-card border-border"
            >
                {/* Logo */}
                <div className="flex items-center justify-center px-4 py-4 border-b shrink-0 border-border">
                    <Logo className="w-32 h-auto" />
                </div>

                {/* Nav Items */}
                <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                    {NAV.map(({ href, label, icon: Icon }) => {
                        const [baseHref, query] = href.split("?");
                        const targetTab = query ? new URLSearchParams(query).get("tab") : null;

                        const active = pathname === baseHref && currentTab === targetTab;
                        return (
                            <Link
                                key={label}
                                href={href}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200"
                                style={{
                                    background: active ? "var(--orange-light)" : "transparent",
                                    color: active ? "var(--orange)" : "var(--text-secondary)",
                                    fontWeight: active ? 600 : 400,
                                }}
                            >
                                <Icon className="w-5 h-5 shrink-0" />
                                <span style={{ fontSize: 14 }}>{label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Company Card */}
                <div className="p-4 border-t shrink-0 border-border">
                    <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center font-outfit font-bold text-white text-sm shrink-0 bg-navy">
                            {initials}
                        </div>
                        <div className="min-w-0">
                            <p className="font-dmsans font-semibold truncate text-text-primary" style={{ fontSize: 13 }}>{companyName}</p>
                            <p style={{ fontSize: 11, color: "var(--orange)", fontWeight: 600 }}>{t('common.verified')} {t('common.employer')}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => router.push("/post-job")}
                        className="w-full h-9 rounded-xl font-dmsans font-semibold text-white text-sm transition-all active:scale-95 flex items-center justify-center gap-1.5"
                        style={{ background: "var(--orange)" }}
                    >
                        <Plus className="w-4 h-4" />
                        {t('employer.completeSetup')}
                    </button>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col overflow-hidden min-w-0">
                {/* Top Bar */}
                <header className="flex items-center gap-4 px-4 lg:px-6 py-3.5 border-b bg-bg-card shrink-0 border-border">
                    {/* Mobile: logo */}
                    <div className="flex items-center lg:hidden shrink-0">
                        <Logo className="w-24 h-auto" />
                    </div>

                    {/* Search */}
                    <div className="hidden lg:flex relative w-72 shrink-0">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input
                            placeholder={t('common.search')}
                            className="w-full h-9 rounded-xl pl-9 pr-4 text-sm outline-none bg-bg-page text-text-primary border-none"
                        />
                    </div>

                    {/* Center — Role Switcher */}
                    <div className="flex-1 flex justify-center">
                        <RoleSwitcherInline />
                    </div>

                    {/* Right — Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                        
                        <button
                            onClick={() => router.push("/employer-notifications")}
                            className="w-9 h-9 rounded-xl flex items-center justify-center relative bg-bg-page"
                        >
                            <Bell className="w-5 h-5 text-text-primary" />
                            {!isOnNotifPage && employerUnread > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center text-white font-bold"
                                    style={{ fontSize: 10, background: "var(--orange)" }}>{employerUnread}</span>
                            )}
                        </button>
                        <button
                            onClick={() => router.push("/employer-chat")}
                            className="hidden sm:flex w-9 h-9 rounded-xl items-center justify-center relative bg-bg-page"
                        >
                            <Mail className="w-5 h-5 text-text-primary" />
                            {!isOnChatPage && employerTotalUnread > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center text-white font-bold"
                                    style={{ fontSize: 10, background: "var(--orange)" }}>{employerTotalUnread}</span>
                            )}
                        </button>
                        <div className="flex items-center gap-2 ml-1">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center font-outfit font-bold text-white text-xs bg-navy">
                                {initials}
                            </div>
                            <span className="hidden sm:inline font-dmsans font-medium text-text-secondary" style={{ fontSize: 13 }}>{t('common.employer')}</span>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-6 pb-20 lg:pb-6">
                    {children}
                </main>
            </div>

            {/* Global Toast Notifications */}
            <ToastContainer />
            <AIAssistant />
        </div>
    );
};
