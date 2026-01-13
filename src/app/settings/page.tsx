"use client";

import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Globe, Moon, Shield, Bell, ChevronRight, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SettingsPage() {
    const router = useRouter();
    const { mode, logout } = useUserStore();
    const [lang, setLang] = useState<'en' | 'hi'>('en');

    const handleLogout = () => {
        logout();
        router.push('/auth');
    }

    return (
        <div className="min-h-screen bg-bg-surface">
            <div className={`px-4 py-3 border-b flex items-center gap-3 sticky top-0 bg-white z-10 ${mode === 'worker' ? 'border-blue-100' : 'border-green-100'}`}>
                <button onClick={() => router.back()}>
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-lg font-bold text-gray-900">Settings</h1>
            </div>

            <div className="p-4 space-y-4">

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <button className="w-full flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-50 p-2 rounded-full text-blue-600">
                                <Globe className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-gray-900">Language</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400">{lang === 'en' ? 'English' : 'Hindi'}</span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                    </button>

                    <button className="w-full flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-50 p-2 rounded-full text-purple-600">
                                <Bell className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-gray-900">Notifications</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400">On</span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                    </button>

                    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="bg-green-50 p-2 rounded-full text-green-600">
                                <Shield className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-gray-900">Privacy & Security</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-red-600" onClick={handleLogout}>
                        <div className="flex items-center gap-3">
                            <div className="bg-red-50 p-2 rounded-full">
                                <LogOut className="w-5 h-5" />
                            </div>
                            <span className="font-medium">Logout</span>
                        </div>
                    </button>
                </div>

                <div className="px-4 py-2 text-center">
                    <p className="text-xs text-gray-400">ShramSetu v1.0.0 (Pilot Build)</p>
                </div>
            </div>
        </div>
    );
}
