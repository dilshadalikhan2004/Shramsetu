"use client";
import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Minimize2 } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useAppDataStore, Job } from "@/store/useAppDataStore";
import { useTranslation } from "@/lib/i18n/TranslationProvider";

import { apiClient } from "@/lib/api-client";

interface Message { role: "user" | "assistant"; content: string; }

export default function AIAssistant() {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [minimized, setMinimized] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [initialized, setInitialized] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const { generalProfile, employerProfile, mode } = useUserStore();
    const { addJob } = useAppDataStore();

    const handleJobAction = (jobData: Job) => {
        addJob(jobData);
        setMessages((prev) => [
            ...prev,
            { role: "assistant", content: `✅ नौकरी पोस्ट कर दी गई! (Job Posted: ${jobData.title}). आप इसे 'My Jobs' में देख सकते हैं।` }
        ]);
    };

    useEffect(() => {
        if (open && !initialized) {
            setMessages([{
                role: "assistant",
                content: t('chat.assistant_welcome') || "नमस्ते! मैं ShramSetu AI हूँ। आज मैं आपकी क्या मदद कर सकता हूँ? 😊"
            }]);
            setInitialized(true);
        }
    }, [open, initialized, t]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const send = async () => {
        if (!input.trim() || loading) return;
        const userMsg: Message = { role: "user", content: input.trim() };
        const updated = [...messages, userMsg];
        setMessages(updated);
        setInput("");
        setLoading(true);
        try {
            const res = await apiClient.post<{ reply: string }>("/ai/assistant", {
                messages: updated,
                userId: generalProfile?.id || "anonymous",
                userName: generalProfile?.name,
                userRole: mode,
                userCity: generalProfile?.city,
                userLanguage: generalProfile?.language,
            });
            setMessages((prev) => [...prev, { role: "assistant", content: res.reply }]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "नेटवर्क त्रुटि। कृपया अपना इंटरनेट कनेक्शन जांचें।" },
            ]);
        } finally {
            setLoading(false);
        }
    };

    if (!open) {
        return (
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 w-16 h-16 bg-[#0a2540] rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group"
                aria-label="Open AI Assistant"
            >
                <div className="absolute inset-0 bg-orange opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity animate-pulse" />
                <Bot className="w-8 h-8 text-white" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
            </button>
        );
    }

    return (
        <div className={`fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 w-[350px] max-w-[calc(100vw-32px)] bg-bg-card rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-border flex flex-col overflow-hidden transition-all duration-500 ${minimized ? "h-[72px]" : "h-[500px]"}`}>
            <div className="bg-[#0a2540] px-5 py-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <p className="text-white font-outfit font-bold text-sm">ShramSetu AI</p>
                        <p className="text-green-400 text-[10px] font-bold tracking-widest uppercase">● {t('chat.online')}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setMinimized(!minimized)} className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-colors bg-white/5">
                        <Minimize2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-colors bg-white/5">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {!minimized && (
                <>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                        {messages.map((m, i) => {
                            const isAssistant = m.role === "assistant";
                            let displayContent = m.content;
                            let jobDraft: any = null;

                            if (isAssistant) {
                                const match = m.content.match(/\[JOB_DRAFT\]([\s\S]*)\[\/JOB_DRAFT\]/);
                                if (match) {
                                    try {
                                        jobDraft = JSON.parse(match[1]);
                                        displayContent = m.content.replace(/\[JOB_DRAFT\]([\s\S]*)\[\/JOB_DRAFT\]/, '').trim();
                                    } catch (e) {
                                        console.error("Failed to parse job draft", e);
                                    }
                                }
                            }

                            return (
                                <div key={i} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"} gap-2`}>
                                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                                        m.role === "user" 
                                        ? "bg-orange text-white rounded-tr-none" 
                                        : "bg-bg-page text-text-primary rounded-tl-none border border-border"
                                    }`}>
                                        {displayContent}
                                    </div>
                                    
                                    {jobDraft && (
                                        <div className="max-w-[85%] bg-bg-card border-2 border-orange/20 rounded-2xl p-4 shadow-xl space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-orange bg-orange/10 px-2 py-0.5 rounded-full">Detected Job Draft</span>
                                                <span className="text-[10px] text-text-muted">Gemini 2.0 AI</span>
                                            </div>
                                            <div>
                                                <p className="font-outfit font-bold text-text-primary text-sm">{jobDraft.title || "Job Listing"}</p>
                                                <p className="text-[11px] text-text-muted flex items-center gap-1 mt-0.5">
                                                    📍 {jobDraft.location} • 💰 ₹{jobDraft.daily_rate}/day
                                                </p>
                                            </div>
                                            <p className="text-[11px] text-text-muted line-clamp-2 italic">"{jobDraft.description}"</p>
                                            <button 
                                                onClick={() => {
                                                    const jobData: Job = {
                                                        id: `job-${Date.now()}`,
                                                        title: jobDraft.title,
                                                        location: jobDraft.location,
                                                        city: jobDraft.location,
                                                        wage: `₹${jobDraft.daily_rate}/day`,
                                                        daily_rate: jobDraft.daily_rate,
                                                        category: jobDraft.category || "construction",
                                                        description: jobDraft.description,
                                                        skills_required: [],
                                                        status: "active",
                                                        posted: "Just now",
                                                        applicants: 0,
                                                        filled: 0,
                                                        total: jobDraft.total || 1,
                                                        employer_id: generalProfile?.id || "ai-gen",
                                                        employer_name: employerProfile?.companyName || "Employer",
                                                        employer_verified: true,
                                                        is_urgent: false,
                                                        duration: "Short Term",
                                                        perks: [],
                                                        candidates: [],
                                                    };
                                                    handleJobAction(jobData);
                                                }}
                                                className="w-full bg-[#0a2540] hover:bg-orange text-white py-2 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-lg shadow-black/10"
                                            >
                                                Post this Job Now
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-bg-page border border-border rounded-2xl rounded-tl-none px-4 py-3 flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>
                    
                    <div className="p-4 bg-bg-card border-t border-border flex gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && send()}
                            placeholder={t('chat.messagePlaceholder') || "Type your message..."}
                            className="flex-1 bg-bg-page border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-orange/20 focus:border-orange outline-none transition-all placeholder:text-text-muted"
                        />
                        <button
                            onClick={send}
                            disabled={loading || !input.trim()}
                            className="bg-orange text-white rounded-xl w-11 h-11 flex items-center justify-center disabled:opacity-40 transition-all active:scale-95 shadow-lg shadow-orange/20"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
