"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserMode } from "./useUserStore";

export type NotificationType = "job" | "accept" | "message" | "payment" | "team" | "system" | "promotional";

export type NotificationItem = {
    id: number;
    type: NotificationType;
    title: string;
    body: string;
    time: string;
    unread: boolean;
    role?: UserMode;
};

interface NotificationState {
    notifications: NotificationItem[];
    unreadCount: number;

    setNotifications: (items: NotificationItem[]) => void;
    markRead: (id: number) => void;
    markAllRead: (role?: UserMode) => void;
    addNotification: (n: Omit<NotificationItem, "id">) => void;
    deleteNotification: (id: number) => void;
    getUnreadCountByRole: (role: UserMode) => number;
}

function countUnread(items: NotificationItem[], role?: UserMode): number {
    return items.filter(n => n.unread && (!role || n.role === role)).length;
}

export const useNotificationStore = create<NotificationState>()(
    persist(
        (set, get) => ({
            notifications: [],
            unreadCount: 0,

            setNotifications: (items) => set({
                notifications: items,
                unreadCount: countUnread(items),
            }),

            markRead: (id) => set((state) => {
                const updated = state.notifications.map(n =>
                    n.id === id ? { ...n, unread: false } : n
                );
                return { notifications: updated, unreadCount: countUnread(updated) };
            }),

            markAllRead: (role) => set((state) => {
                const updated = state.notifications.map(n =>
                    (!role || n.role === role) ? { ...n, unread: false } : n
                );
                return { notifications: updated, unreadCount: countUnread(updated) };
            }),

            addNotification: (n) => set((state) => {
                const newNotif: NotificationItem = {
                    ...n,
                    id: Date.now(),
                    role: n.role || "worker" // Default to worker if not specified
                };
                const updated = [newNotif, ...state.notifications];
                return { notifications: updated, unreadCount: countUnread(updated) };
            }),

            deleteNotification: (id) => set((state) => {
                const updated = state.notifications.filter(n => n.id !== id);
                return { notifications: updated, unreadCount: countUnread(updated) };
            }),

            // Added helper for derived counts
            getUnreadCountByRole: (role: UserMode) => {
                return countUnread(get().notifications, role);
            }
        }),
        { name: "shramsetu-notifications" }
    )
);
