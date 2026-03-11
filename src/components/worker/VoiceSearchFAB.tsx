"use client";
import { useState, useRef } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { apiClient } from "@/lib/api-client";

type SearchFilters = {
    skill: string | null;
    location: string | null;
    minRate: number | null;
    cleanQuery: string;
};

// Extend Window for webkit SpeechRecognition
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

export default function VoiceSearchFAB({
    onResult,
    userCity,
}: {
    onResult: (filters: SearchFilters) => void;
    userCity: string;
}) {
    const [state, setState] = useState<"idle" | "listening" | "processing">("idle");
    const [liveText, setLiveText] = useState("");
    const recognitionRef = useRef<any>(null);
    const liveTextRef = useRef("");

    const start = () => {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) { alert("Voice not supported on this browser"); return; }
        const r = new SR();
        r.lang = "hi-IN";
        r.interimResults = true;
        r.onstart = () => setState("listening");
        r.onresult = (e: any) => {
            const text = Array.from(e.results).map((x: any) => x[0].transcript).join("");
            setLiveText(text);
            liveTextRef.current = text;
        };
        r.onend = async () => {
            const finalText = liveTextRef.current;
            if (!finalText.trim()) { setState("idle"); return; }
            setState("processing");
            try {
                const res = await apiClient.post<SearchFilters>("/api/ai/voice-search", {
                    transcript: finalText,
                    userCity,
                });
                onResult(res);
            } finally {
                setState("idle");
                setLiveText("");
                liveTextRef.current = "";
            }
        };
        recognitionRef.current = r;
        r.start();
    };

    const stop = () => recognitionRef.current?.stop();

    return (
        <div className="fixed bottom-24 right-4 z-40 flex flex-col items-center gap-2">
            {liveText && (
                <div className="bg-white rounded-xl shadow-lg px-3 py-2 text-xs max-w-[160px] text-center border border-gray-100 text-gray-700">
                    {liveText}
                </div>
            )}
            <div className="relative">
                {state === "listening" && (
                    <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-30" />
                )}
                <button
                    onPointerDown={start}
                    onPointerUp={stop}
                    onPointerLeave={stop}
                    className={`w-16 h-16 rounded-full shadow-xl flex items-center justify-center transition-all duration-200 select-none ${state === "listening" ? "bg-red-500 scale-110" : state === "processing" ? "bg-amber-500" : "bg-[#e85d26] hover:bg-[#f47340]"}`}
                >
                    {state === "processing"
                        ? <Loader2 className="w-7 h-7 text-white animate-spin" />
                        : state === "listening"
                            ? <MicOff className="w-7 h-7 text-white" />
                            : <Mic className="w-7 h-7 text-white" />}
                </button>
            </div>
            <span className="text-xs text-gray-500 font-medium">
                {state === "listening" ? "सुन रहा हूं..."
                    : state === "processing" ? "Searching..."
                        : "Voice Search"}
            </span>
        </div>
    );
}
