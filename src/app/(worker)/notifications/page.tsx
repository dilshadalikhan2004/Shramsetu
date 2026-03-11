"use client";

import { useEffect, useState } from "react";
import { useNotificationStore, NotificationType } from "@/store/useNotificationStore";
import {
    Bell, Briefcase, CheckCircle2, MessageSquare, IndianRupee,
    Users, Zap, X, Check, Trash2, Gift,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/TranslationProvider";

const ICON_MAP: Record<NotificationType, { icon: typeof Bell; bg: string; color: string }> = {
    job: { icon: Briefcase, bg: "#fff1eb", color: "#e85d26" },
    accept: { icon: CheckCircle2, bg: "#ecfdf5", color: "#0e9f6e" },
    message: { icon: MessageSquare, bg: "#eff6ff", color: "#2563eb" },
    payment: { icon: IndianRupee, bg: "#ecfdf5", color: "#0e9f6e" },
    team: { icon: Users, bg: "#f5f3ff", color: "#7c3aed" },
    system: { icon: Zap, bg: "#fefce8", color: "#d97706" },
    promotional: { icon: Gift, bg: "#fef2f2", color: "#ef4444" },
};

export default function NotificationsPage() {
    const { t } = useTranslation();
    const {
        notifications,
        markRead,
        markAllRead,
        deleteNotification,
    } = useNotificationStore();

    const workerUnread = useNotificationStore(state => state.getUnreadCountByRole("worker"));
    const TABS = [
        { key: "all", label: t('common.viewAll') },
        { key: "unread", label: t('common.unread') },
        { key: "job", label: t('common.applications') },
        { key: "payment", label: t('common.earnings') },
        { key: "promotional", label: t('common.promotional') },
    ];
    const [tab, setTab] = useState("all");
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    if (!mounted) return null;

    const filtered = notifications.filter(n => {
        if (n.role && n.role !== "worker") return false; // Hide other roles
        if (tab === "unread") return n.unread;
        if (tab === "job") return n.type === "job";
        if (tab === "payment") return n.type === "payment";
        if (tab === "promotional") return n.type === "promotional";
        return true;
    });

    const handleMarkAllRead = () => markAllRead("worker");

    return (
        <div className="space-y-5 w-full">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-outfit font-bold text-text-primary" style={{ fontSize: 24 }}>{t('settings.notifications')}</h1>
                    <p className="text-text-secondary" style={{ fontSize: 14 }}>
                        {workerUnread > 0
                            ? `${workerUnread} ${t('settings.unreadCount')}`
                            : t('settings.allCaughtUp')
                        }
                    </p>
                </div>
                {workerUnread > 0 && (
                    <button
                        onClick={handleMarkAllRead}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-dmsans font-semibold text-sm transition-all hover:bg-orange-light active:scale-95 border border-orange-light/50"
                        style={{ color: "var(--orange)" }}
                    >
                        <Check className="w-4 h-4" />
                        {t('settings.markAllRead')}
                    </button>
                )}
            </div>

            {/* Tabs */}
            <div className="flex gap-2">
                {TABS.map(tItem => (
                    <button
                        key={tItem.key}
                        onClick={() => setTab(tItem.key)}
                        className="px-4 py-2 rounded-xl font-dmsans font-semibold text-sm transition-all"
                        style={{
                            background: tab === tItem.key ? "var(--navy)" : "var(--bg-card)",
                            color: tab === tItem.key ? "white" : "var(--text-secondary)",
                            border: tab === tItem.key ? "none" : "1px solid var(--border)",
                        }}
                    >
                        {tItem.label}
                        {tItem.key === "unread" && workerUnread > 0 && (
                            <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-xs font-bold"
                                style={{
                                    background: tab === tItem.key ? "rgba(255,255,255,0.2)" : "var(--orange)",
                                    color: "white",
                                }}>
                                {workerUnread}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Notification List */}
            {filtered.length === 0 ? (
                <div className="bg-bg-card rounded-2xl border p-12 text-center border-border">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-bg-page">
                        <Bell className="w-7 h-7 text-text-muted" />
                    </div>
                    <p className="font-outfit font-bold text-text-primary" style={{ fontSize: 18 }}>{t('settings.noNotifications')}</p>
                    <p className="font-dmsans mt-1 text-text-muted" style={{ fontSize: 14 }}>
                        {tab === "unread" ? t('settings.allRead') : t('settings.nothingToShow')}
                    </p>
                </div>
            ) : (
                <div className="bg-bg-card rounded-2xl border overflow-hidden border-border">
                    {filtered.map((n, i) => {
                        const iconData = ICON_MAP[n.type] || ICON_MAP.system;
                        const Icon = iconData.icon;
                        return (
                            <div
                                key={n.id}
                                onClick={() => { if (n.unread) markRead(n.id); }}
                                className="flex items-start gap-4 px-5 py-4 transition-all cursor-pointer group relative hover:bg-bg-page/50"
                                style={{
                                    borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none",
                                    background: n.unread ? "var(--orange-light)" : "transparent",
                                }}
                            >
                                {/* Unread indicator bar */}
                                {n.unread && (
                                    <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-orange" />
                                )}

                                {/* Icon */}
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                                    style={{ background: iconData.bg }}>
                                    <Icon className="w-5 h-5" style={{ color: iconData.color }} />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="font-dmsans truncate text-text-primary" style={{
                                            fontSize: 14,
                                            fontWeight: n.unread ? 700 : 500,
                                        }}>{n.title}</p>
                                        {n.unread && (
                                            <span className="w-2 h-2 rounded-full shrink-0 bg-orange" />
                                        )}
                                    </div>
                                    <p className="mt-0.5 line-clamp-2 text-text-secondary" style={{ fontSize: 13 }}>{n.body}</p>
                                    <p className="mt-1 text-text-muted" style={{ fontSize: 11 }}>{n.time}</p>
                                </div>

                                {/* Actions (visible on hover) */}
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 self-center">
                                    {n.unread && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); markRead(n.id); }}
                                            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-ds-green-light transition-colors"
                                            title="Mark as read"
                                        >
                                            <Check className="w-4 h-4 text-ds-green" />
                                        </button>
                                    )}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); deleteNotification(n.id); }}
                                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-ds-red/10 transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4 text-ds-red" />
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
