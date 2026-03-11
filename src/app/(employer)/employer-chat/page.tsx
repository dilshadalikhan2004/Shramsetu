"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Phone, MoreVertical, Search, Paperclip, Mic, Video } from "lucide-react";
import { useChatStore } from "@/store/useChatStore";
import { useTranslation } from "@/lib/i18n/TranslationProvider";

export default function EmployerChatPage() {
    const { t } = useTranslation();
    const {
        employerConversations: conversations,
        employerMessages: allMessages,
        sendEmployerMessage,
        markEmployerConvoRead,
    } = useChatStore();

    const [active, setActive] = useState<string>(conversations[0]?.id || "");
    const [text, setText] = useState("");
    const [search, setSearch] = useState("");
    const [mounted, setMounted] = useState(false);
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => { setMounted(true); }, []);

    const messages = allMessages[active] || [];

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Mark conversation as read when opened
    useEffect(() => {
        if (active && mounted) {
            markEmployerConvoRead(active);
        }
    }, [active, mounted, markEmployerConvoRead]);

    const openChat = (id: string) => {
        setActive(id);
        markEmployerConvoRead(id);
    };

    const send = () => {
        if (!text.trim()) return;
        sendEmployerMessage(active, text.trim());
        setText("");
    };

    if (!mounted) return null;

    const activeConvo = conversations.find((c) => c.id === active);
    const filtered = conversations.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="flex bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "#e5e7eb", height: "calc(100vh - 120px)" }}>
            {/* Left Panel */}
            <div className="w-80 flex-none flex flex-col border-r" style={{ borderColor: "#e5e7eb" }}>
                <div className="p-4 border-b" style={{ borderColor: "#f3f4f6" }}>
                    <h2 className="font-outfit font-bold mb-3" style={{ fontSize: 18, color: "#111827" }}>{t('chat.title')}</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#9ca3af" }} />
                        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t('chat.searchPlaceholder')}
                            className="w-full h-9 rounded-xl pl-9 pr-4 text-sm outline-none" style={{ background: "#f3f4f6", color: "#374151" }} />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {filtered.map((c) => (
                        <button key={c.id} onClick={() => openChat(c.id)}
                            className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors"
                            style={{ background: active === c.id ? "#fff1eb" : "transparent", borderBottom: "1px solid #f9fafb" }}>
                            <div className="relative shrink-0">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center font-outfit font-bold text-white text-sm" style={{ background: c.color }}>{c.init}</div>
                                {c.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white" style={{ background: "#0e9f6e" }} />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline">
                                    <p className="font-dmsans font-bold truncate" style={{ fontSize: 14, color: active === c.id ? "#e85d26" : "#111827" }}>{c.name}</p>
                                    <span style={{ fontSize: 11, color: "#9ca3af" }}>{c.time}</span>
                                </div>
                                <p className="truncate" style={{ fontSize: 12, color: c.unread > 0 ? "#111827" : "#6b7280", fontWeight: c.unread > 0 ? 600 : 400 }}>{c.lastMsg}</p>
                            </div>
                            {c.unread > 0 && <span className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: "#e85d26" }}>{c.unread}</span>}
                        </button>
                    ))}
                </div>
            </div>

            {/* Right Panel */}
            {activeConvo ? (
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex items-center gap-3 px-5 py-3.5 border-b bg-white shrink-0" style={{ borderColor: "#e5e7eb" }}>
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center font-outfit font-bold text-white text-sm" style={{ background: activeConvo.color }}>{activeConvo.init}</div>
                            {activeConvo.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white" style={{ background: "#0e9f6e" }} />}
                        </div>
                        <div className="flex-1">
                            <p className="font-dmsans font-bold" style={{ fontSize: 15, color: "#111827" }}>{activeConvo.name}</p>
                            <p style={{ fontSize: 12, color: activeConvo.online ? "#0e9f6e" : "#9ca3af" }}>
                                {activeConvo.role} · {activeConvo.online ? `${t('chat.online')} ●` : t('chat.offline')}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            {[Phone, Video, MoreVertical].map((Icon, i) => (
                                <button key={i} className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#f3f4f6" }}>
                                    <Icon className="w-4 h-4" style={{ color: "#374151" }} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3" style={{ background: "#f8fafc" }}>
                        <div className="text-center mb-2">
                            <span className="px-3 py-1 rounded-full text-xs" style={{ background: "#e5e7eb", color: "#6b7280" }}>{t('chat.today')}</span>
                        </div>
                        {messages.map((m) => (
                            <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                                {m.from === "them" && (
                                    <div className="w-7 h-7 rounded-full flex items-center justify-center font-outfit font-bold text-white text-xs mr-2 shrink-0 self-end mb-5"
                                        style={{ background: activeConvo.color }}>{activeConvo.init[0]}</div>
                                )}
                                <div className="max-w-md">
                                    <div className="px-4 py-2.5 font-dmsans" style={{
                                        fontSize: 14,
                                        borderRadius: m.from === "me" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                                        background: m.from === "me" ? "#0a2540" : "white",
                                        color: m.from === "me" ? "white" : "#111827",
                                        border: m.from === "them" ? "1px solid #e5e7eb" : "none",
                                        boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
                                    }}>{m.text}</div>
                                    <p className="mt-1 px-1" style={{ fontSize: 10, color: "#9ca3af", textAlign: m.from === "me" ? "right" : "left" }}>{m.time}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={endRef} />
                    </div>

                    <div className="flex items-center gap-3 px-5 py-4 border-t bg-white shrink-0" style={{ borderColor: "#e5e7eb" }}>
                        <button className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#f3f4f6" }}>
                            <Paperclip className="w-4 h-4" style={{ color: "#9ca3af" }} />
                        </button>
                        <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
                            placeholder={t('chat.messagePlaceholder')} className="flex-1 h-11 px-4 rounded-xl font-dmsans text-sm outline-none"
                            style={{ background: "#f3f4f6", color: "#111827" }} />
                        <button className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#f3f4f6" }}>
                            <Mic className="w-4 h-4" style={{ color: "#9ca3af" }} />
                        </button>
                        <button onClick={send} className="w-11 h-11 rounded-xl flex items-center justify-center transition-all active:scale-95" style={{ background: "#e85d26" }}>
                            <Send className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <p style={{ color: "#9ca3af" }}>{t('chat.selectConvo')}</p>
                </div>
            )}
        </div>
    );
}
