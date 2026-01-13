"use client";

import { useUserStore } from "@/store/useUserStore";
import { ArrowLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

const MOCK_CHATS = [
    { id: 1, name: "Raju Painter", lastMsg: "Sir, when content I start?", time: "10:30 AM", unread: 2 },
    { id: 2, name: "Sunil Electrician", lastMsg: "Payment received, thanks.", time: "Yesterday", unread: 0 },
];

export default function ChatsPage() {
    const router = useRouter();
    const { mode } = useUserStore();

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className={`px-4 py-3 border-b flex items-center gap-3 sticky top-0 bg-background z-10 border-border`}>
                <button onClick={() => router.back()}>
                    <ArrowLeft className="w-6 h-6 text-muted-foreground" />
                </button>
                <h1 className="text-lg font-bold">Messages</h1>
            </div>

            <div className="p-4">
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search messages" className="pl-9 bg-muted border-input" />
                </div>

                <div className="space-y-1">
                    {MOCK_CHATS.map(chat => (
                        <div key={chat.id} className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg cursor-pointer">
                            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center font-bold text-muted-foreground shrink-0">
                                {chat.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-semibold truncate">{chat.name}</h3>
                                    <span className="text-xs text-muted-foreground whitespace-nowrap">{chat.time}</span>
                                </div>
                                <p className="text-sm text-muted-foreground truncate">{chat.lastMsg}</p>
                            </div>
                            {chat.unread > 0 && (
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white font-bold shrink-0 ${mode === 'worker' ? 'bg-worker-primary' : 'bg-employer-primary'}`}>
                                    {chat.unread}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
