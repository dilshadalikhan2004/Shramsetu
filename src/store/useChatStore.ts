"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Message = {
    id: string;
    text: string;
    from: "me" | "them";
    time: string;
};

export type Conversation = {
    id: string;
    name: string;
    lastMsg: string;
    time: string;
    unread: number;
    online: boolean;
    init: string;
    color: string;
    role: string;
};

interface ChatState {
    // Worker chat data
    workerConversations: Conversation[];
    workerMessages: Record<string, Message[]>;
    workerTotalUnread: number;

    // Employer chat data
    employerConversations: Conversation[];
    employerMessages: Record<string, Message[]>;
    employerTotalUnread: number;

    // Actions
    setWorkerConversations: (convos: Conversation[]) => void;
    setEmployerConversations: (convos: Conversation[]) => void;
    sendWorkerMessage: (convoId: string, text: string) => void;
    sendEmployerMessage: (convoId: string, text: string) => void;
    markWorkerConvoRead: (convoId: string) => void;
    markEmployerConvoRead: (convoId: string) => void;
    markAllWorkerRead: () => void;
    markAllEmployerRead: () => void;
}

function computeTotalUnread(convos: Conversation[]): number {
    return convos.reduce((sum, c) => sum + c.unread, 0);
}

export const useChatStore = create<ChatState>()(
    persist(
        (set, get) => ({
            workerConversations: [],
            workerMessages: {},
            workerTotalUnread: 0,

            employerConversations: [],
            employerMessages: {},
            employerTotalUnread: 0,

            setWorkerConversations: (convos) => set({
                workerConversations: convos,
                workerTotalUnread: computeTotalUnread(convos),
            }),

            setEmployerConversations: (convos) => set({
                employerConversations: convos,
                employerTotalUnread: computeTotalUnread(convos),
            }),

            sendWorkerMessage: (convoId, text) => set((state) => {
                const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                const msg: Message = { id: Date.now().toString(), text, from: "me", time: now };
                const updatedMessages = {
                    ...state.workerMessages,
                    [convoId]: [...(state.workerMessages[convoId] || []), msg],
                };
                const updatedConvos = state.workerConversations.map(c =>
                    c.id === convoId ? { ...c, lastMsg: text, time: now } : c
                );
                return { workerMessages: updatedMessages, workerConversations: updatedConvos };
            }),

            sendEmployerMessage: (convoId, text) => set((state) => {
                const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                const msg: Message = { id: Date.now().toString(), text, from: "me", time: now };
                const updatedMessages = {
                    ...state.employerMessages,
                    [convoId]: [...(state.employerMessages[convoId] || []), msg],
                };
                const updatedConvos = state.employerConversations.map(c =>
                    c.id === convoId ? { ...c, lastMsg: text, time: now } : c
                );
                return { employerMessages: updatedMessages, employerConversations: updatedConvos };
            }),

            markWorkerConvoRead: (convoId) => set((state) => {
                const updatedConvos = state.workerConversations.map(c =>
                    c.id === convoId ? { ...c, unread: 0 } : c
                );
                return {
                    workerConversations: updatedConvos,
                    workerTotalUnread: computeTotalUnread(updatedConvos),
                };
            }),

            markEmployerConvoRead: (convoId) => set((state) => {
                const updatedConvos = state.employerConversations.map(c =>
                    c.id === convoId ? { ...c, unread: 0 } : c
                );
                return {
                    employerConversations: updatedConvos,
                    employerTotalUnread: computeTotalUnread(updatedConvos),
                };
            }),

            markAllWorkerRead: () => set((state) => {
                const updatedConvos = state.workerConversations.map(c => ({ ...c, unread: 0 }));
                return { workerConversations: updatedConvos, workerTotalUnread: 0 };
            }),

            markAllEmployerRead: () => set((state) => {
                const updatedConvos = state.employerConversations.map(c => ({ ...c, unread: 0 }));
                return { employerConversations: updatedConvos, employerTotalUnread: 0 };
            }),
        }),
        { name: "shramsetu-chat" }
    )
);
