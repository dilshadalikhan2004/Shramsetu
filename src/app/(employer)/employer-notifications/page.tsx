"use client";

import { useEffect, useState } from "react";
import { useNotificationStore, NotificationType } from "@/store/useNotificationStore";
import {
    Bell, Briefcase, CheckCircle2, MessageSquare, IndianRupee,
    Users, Zap, Check, Trash2, Gift,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/TranslationProvider";

const ICON_MAP: Record<NotificationType, { icon: any; bg: string; color: string }> = {
    job: { icon: Briefcase, bg: "#eff6ff", color: "#2563eb" },
    accept: { icon: CheckCircle2, bg: "#ecfdf5", color: "#0e9f6e" },
    message: { icon: MessageSquare, bg: "#eff6ff", color: "#2563eb" },
    payment: { icon: IndianRupee, bg: "#fff1eb", color: "#e85d26" },
    team: { icon: Users, bg: "#f5f3ff", color: "#7c3aed" },
    system: { icon: Zap, bg: "#fefce8", color: "#d97706" },
    promotional: { icon: Gift, bg: "#fef2f2", color: "#ef4444" },
};

export default function EmployerNotificationsPage() {
    const { t } = useTranslation();
    const {
        notifications,
        markRead,
        markAllRead,
        deleteNotification,
    } = useNotificationStore();

    const employerUnread = useNotificationStore(state => state.getUnreadCountByRole("employer"));
    const [tab, setTab] = useState("all");
    const [mounted, setMounted] = useState(false);

    const TABS = [
        { key: "all", label: t('common.viewAll') },
        { key: "unread", label: t('common.unread') },
        { key: "candidates", label: t('employer.candidates') },
        { key: "payments", label: t('common.earnings') },
    ];

    useEffect(() => { setMounted(true); }, []);

    if (!mounted) return null;

    const filtered = notifications.filter(n => {
        if (n.role && n.role !== "employer") return false; // Hide worker notifications
        if (tab === "unread") return n.unread;
        // In employer mode, some mapping might change, but for now we filter by role
        return true;
    });

    const handleMarkAllRead = () => markAllRead("employer");

    return (
        <div className="space-y-5 w-full">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-outfit font-bold" style={{ fontSize: 24, color: "#111827" }}>{t('settings.notifications')}</h1>
                    <p style={{ fontSize: 14, color: "#6b7280" }}>
                        {employerUnread > 0
                            ? t('settings.unreadCount') + `: ${employerUnread}`
                            : t('settings.allCaughtUp')
                        }
                    </p>
                </div>
                {employerUnread > 0 && (
                    <button
                        onClick={handleMarkAllRead}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-dmsans font-semibold text-sm transition-all hover:bg-orange-50 active:scale-95"
                        style={{ color: "#e85d26", border: "1px solid #fed7ca" }}
                    >
                        <Check className="w-4 h-4" />
                        {t('settings.markAllRead')}
                    </button>
                )}
            </div>

            <div className="flex gap-2">
                {TABS.map(tItem => (
                    <button
                        key={tItem.key}
                        onClick={() => setTab(tItem.key)}
                        className="px-4 py-2 rounded-xl font-dmsans font-semibold text-sm transition-all"
                        style={{
                            background: tab === tItem.key ? "#0a2540" : "#f3f4f6",
                            color: tab === tItem.key ? "white" : "#6b7280",
                        }}
                    >
                        {tItem.label}
                        {tItem.key === "unread" && employerUnread > 0 && (
                            <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-xs font-bold"
                                style={{
                                    background: tab === tItem.key ? "rgba(255,255,255,0.2)" : "#e85d26",
                                    color: "white",
                                }}>
                                {employerUnread}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div className="bg-white rounded-2xl border p-12 text-center" style={{ borderColor: "#e5e7eb" }}>
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "#f3f4f6" }}>
                        <Bell className="w-7 h-7" style={{ color: "#9ca3af" }} />
                    </div>
                    <p className="font-outfit font-bold" style={{ fontSize: 18, color: "#111827" }}>{t('settings.noNotifications')}</p>
                    <p className="font-dmsans mt-1" style={{ fontSize: 14, color: "#9ca3af" }}>
                        {tab === "unread" ? t('settings.allRead') : t('settings.nothingToShow')}
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "#e5e7eb" }}>
                    {filtered.map((n, i) => {
                        const iconData = ICON_MAP[n.type] || ICON_MAP.system;
                        const Icon = iconData.icon;
                        return (
                            <div
                                key={n.id}
                                onClick={() => { if (n.unread) markRead(n.id); }}
                                className="flex items-start gap-4 px-5 py-4 transition-all cursor-pointer group relative"
                                style={{
                                    borderBottom: i < filtered.length - 1 ? "1px solid #f3f4f6" : "none",
                                    background: n.unread ? "#fffbf8" : "transparent",
                                }}
                            >
                                {n.unread && (
                                    <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full" style={{ background: "#e85d26" }} />
                                )}
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                                    style={{ background: iconData.bg }}>
                                    <Icon className="w-5 h-5" style={{ color: iconData.color }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="font-dmsans truncate" style={{
                                            fontSize: 14,
                                            color: "#111827",
                                            fontWeight: n.unread ? 700 : 500,
                                        }}>{n.title}</p>
                                        {n.unread && (
                                            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "#e85d26" }} />
                                        )}
                                    </div>
                                    <p className="mt-0.5 line-clamp-2" style={{
                                        fontSize: 13,
                                        color: n.unread ? "#374151" : "#6b7280",
                                    }}>{n.body}</p>
                                    <p className="mt-1" style={{ fontSize: 11, color: "#9ca3af" }}>{n.time}</p>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 self-center">
                                    {n.unread && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); markRead(n.id); }}
                                            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-green-50 transition-colors"
                                            title="Mark as read"
                                        >
                                            <Check className="w-4 h-4" style={{ color: "#0e9f6e" }} />
                                        </button>
                                    )}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); deleteNotification(n.id); }}
                                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" style={{ color: "#dc2626" }} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
