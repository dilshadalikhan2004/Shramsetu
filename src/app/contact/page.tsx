"use client";

import { ArrowLeft, Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function ContactPage() {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Message sent! We will get back to you shortly.");
        router.back();
    };

    return (
        <div className="min-h-screen bg-bg-surface dark:bg-slate-950 pb-20">
            <div className="px-4 py-3 border-b dark:border-slate-800 flex items-center gap-3 bg-white dark:bg-slate-900 sticky top-0 z-10">
                <button onClick={() => router.back()}>
                    <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </button>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">Contact Us</h1>
            </div>

            <div className="p-4 space-y-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-100 dark:border-slate-800">
                        <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600">
                            <Phone className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Call Us (Mon-Sat, 9am-6pm)</p>
                            <p className="font-semibold text-gray-900 dark:text-white">+91 98765 43210</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-100 dark:border-slate-800">
                        <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 rounded-full flex items-center justify-center text-orange-600">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Email Support</p>
                            <p className="font-semibold text-gray-900 dark:text-white">support@shramsetu.in</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-100 dark:border-slate-800">
                        <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center text-green-600">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Main Office</p>
                            <p className="font-semibold text-gray-900 dark:text-white">Connaught Place, New Delhi</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-gray-100 dark:border-slate-800">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4">Send a Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                            <Input placeholder="e.g. Payment Issue" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                            <textarea
                                className="w-full min-h-[120px] rounded-md border border-gray-200 dark:border-slate-700 bg-transparent p-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                placeholder="Describe your issue..."
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full bg-brand-deep gap-2">
                            <Send className="w-4 h-4" /> Send Message
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
