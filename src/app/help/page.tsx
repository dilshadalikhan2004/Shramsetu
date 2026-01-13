"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Search, MessageCircle, FileText, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const FAQS = [
    { q: "How do I create a team?", a: "Go to the 'Teams' tab in Worker mode and click 'Create Team'. You can then add members via their phone numbers." },
    { q: "When do I get paid?", a: "Payments are released immediately once the employer marks the job as completed. You can withdraw from the Earnings tab." },
    { q: "Is ShramSetu free to use?", a: "Yes, ShramSetu is free for workers. Employers pay a small service fee for posting jobs." },
    { q: "How do I switch modes?", a: "Use the toggle switch at the top of the screen or go to Settings." },
];

export default function HelpPage() {
    const router = useRouter();
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-bg-surface dark:bg-slate-950 pb-20">
            <div className="bg-brand-deep dark:bg-brand-deep/80 px-4 py-6 text-white pb-10">
                <div className="flex items-center gap-3 mb-4">
                    <button onClick={() => router.back()}>
                        <ArrowLeft className="w-6 h-6 text-white" />
                    </button>
                    <h1 className="text-xl font-bold">Help Center</h1>
                </div>
                <h2 className="text-2xl font-bold mb-2">How can we help?</h2>
                <div className="relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                        placeholder="Search for answers..."
                        className="pl-10 bg-white dark:bg-slate-900 text-gray-900 dark:text-white border-none h-12 rounded-xl shadow-lg placeholder:text-gray-400"
                    />
                </div>
            </div>

            <div className="px-4 -mt-6">
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-slate-800 flex justify-around mb-6">
                    <button className="flex flex-col items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                        <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600">
                            <MessageCircle className="w-5 h-5" />
                        </div>
                        Chat Support
                    </button>
                    <button className="flex flex-col items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                        <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center text-green-600">
                            <FileText className="w-5 h-5" />
                        </div>
                        User Guide
                    </button>
                </div>

                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h3>
                <div className="space-y-3">
                    {FAQS.map((faq, index) => (
                        <div key={index} className="bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 overflow-hidden">
                            <button
                                className="w-full flex items-center justify-between p-4 text-left"
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                            >
                                <span className="font-medium text-gray-900 dark:text-gray-200">{faq.q}</span>
                                {openFaq === index ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                            </button>
                            {openFaq === index && (
                                <div className="px-4 pb-4 text-sm text-gray-500 dark:text-gray-400">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">Still have questions?</p>
                    <Button className="w-full bg-brand-deep" onClick={() => router.push('/contact')}>
                        Contact Support
                    </Button>
                </div>
            </div>
        </div>
    );
}
