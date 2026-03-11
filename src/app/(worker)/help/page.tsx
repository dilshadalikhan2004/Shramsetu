"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HelpCircle, MessageSquare, ChevronDown, Paperclip, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n/TranslationProvider";

const SUBJECTS = ["Payment not received", "Job not shown", "Account issue", "Aadhaar verification", "App bug", "Other"];
const TICKETS = [
    { id: "TKT-2841", subject: "Payment not received", date: "Feb 22", status: "Open", statusColor: "#d97706", statusBg: "#fffbeb", reply: "We are looking into your payment issue." },
    { id: "TKT-2790", subject: "Aadhaar link problem", date: "Feb 10", status: "Resolved", statusColor: "#0e9f6e", statusBg: "#ecfdf5", reply: "Your Aadhaar has been successfully linked." },
];

const FAQ = [
    { q: "How do I receive payment?", a: "Employers send payments directly through ShramSetu. Funds are credited within 24-48 hours." },
    { q: "How to get Aadhaar verified?", a: "Go to Settings → Aadhaar Verification and follow the steps." },
    { q: "Can I change my daily rate?", a: "Yes, go to Profile → Edit and update your daily rate." },
];

export default function HelpPage() {
    const { t } = useTranslation();
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [faqOpen, setFaqOpen] = useState<string | null>(null);

    const handleSubmit = () => { if (subject && description) setSubmitted(true); };

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-outfit font-bold text-text-primary">{t('help.title')}</h1>
                <p className="text-sm text-text-secondary">{t('help.subtitle')}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-6">
                    {/* Support Ticket Section */}
                    <section className="bg-bg-card rounded-2xl border border-border p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-orange/10">
                                <MessageSquare className="w-5 h-5 text-orange" />
                            </div>
                            <h2 className="font-outfit font-bold text-lg text-text-primary">{t('help.raiseTicket')}</h2>
                        </div>

                        {submitted ? (
                            <div className="text-center py-8 animate-fade-in">
                                <div className="w-14 h-14 rounded-full bg-ds-green/10 flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle2 className="w-8 h-8 text-ds-green" />
                                </div>
                                <p className="font-outfit font-bold text-lg text-text-primary leading-tight">{t('help.submitted')}</p>
                                <p className="text-sm text-text-secondary mt-2">{t('help.respondTime')}</p>
                                <button 
                                    onClick={() => setSubmitted(false)} 
                                    className="mt-6 font-dmsans font-semibold text-sm text-orange hover:opacity-80 transition-opacity"
                                >
                                    {t('help.submitAnother')}
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label className="block font-dmsans font-semibold text-xs text-text-secondary uppercase tracking-wider mb-2">{t('help.subject')}</label>
                                    <div className="relative">
                                        <select 
                                            value={subject} 
                                            onChange={(e) => setSubject(e.target.value)}
                                            className="w-full h-11 rounded-xl border border-border bg-bg-page px-4 pr-10 text-sm outline-none appearance-none text-text-primary focus:border-orange/50 transition-colors"
                                        >
                                            <option value="">{t('help.selectSubject')}</option>
                                            {SUBJECTS.map((s) => (
                                                <option key={s} value={s}>{t(`help.subjects.${s.toLowerCase().replace(/\s/g, '')}`)}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-text-muted" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block font-dmsans font-semibold text-xs text-text-secondary uppercase tracking-wider mb-2">{t('help.description')}</label>
                                    <textarea 
                                        value={description} 
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder={t('help.descPlaceholder')} 
                                        rows={4}
                                        className="w-full rounded-xl border border-border bg-bg-page px-4 py-3 text-sm outline-none resize-none font-dmsans text-text-primary placeholder:text-text-muted focus:border-orange/50 transition-colors"
                                    />
                                </div>
                                <button 
                                    onClick={handleSubmit} 
                                    disabled={!subject || !description}
                                    className={`w-full h-11 rounded-xl font-dmsans font-bold text-sm text-white transition-all active:scale-95 shadow-lg shadow-orange/10 ${
                                        subject && description ? "bg-orange hover:bg-orange-mid" : "bg-text-muted cursor-not-allowed"
                                    }`}
                                >
                                    {t('help.submitTicket')}
                                </button>
                            </div>
                        )}
                    </section>

                    {/* Active Tickets List */}
                    <section className="bg-bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-border">
                            <h3 className="font-outfit font-bold text-text-primary">{t('help.myTickets')}</h3>
                        </div>
                        <div className="divide-y divide-border/50">
                            {TICKETS.map((tkt) => (
                                <div key={tkt.id} className="px-6 py-4 hover:bg-bg-page/50 transition-colors group">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="font-dmsans font-bold text-sm text-text-primary group-hover:text-orange transition-colors">{tkt.subject}</p>
                                        <span 
                                            className="px-2.5 py-1 rounded-full font-dmsans font-bold text-[10px] uppercase tracking-wider" 
                                            style={{ background: `var(--${tkt.status.toLowerCase()}-light)`, color: `var(--${tkt.status.toLowerCase()})` }}
                                        >
                                            {t(`common.status_labels.${tkt.status.toLowerCase().replace(/\s/g, '_')}`)}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-text-muted font-medium">{tkt.id} · {tkt.date}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* FAQ Section */}
                <div className="lg:col-span-2">
                    <section className="bg-bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
                        <div className="px-6 py-5 border-b border-border/50">
                            <h3 className="font-outfit font-bold text-lg text-text-primary">{t('help.faqs')}</h3>
                        </div>
                        <div className="divide-y divide-border/30">
                            {FAQ.map((f, i) => (
                                <div key={i} className="group">
                                    <button 
                                        onClick={() => setFaqOpen(faqOpen === f.q ? null : f.q)}
                                        className={`w-full flex items-center justify-between px-6 py-5 text-left transition-all ${
                                            faqOpen === f.q ? "bg-bg-page/30" : "hover:bg-bg-page/50"
                                        }`}
                                    >
                                        <p className="font-dmsans font-semibold text-sm text-text-primary pr-4">{t(`help.faqs_list.${i}.q`)}</p>
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                                            faqOpen === f.q ? "bg-orange text-white rotate-180" : "bg-bg-page text-text-muted group-hover:text-text-primary"
                                        }`}>
                                            <ChevronDown className="w-4 h-4" />
                                        </div>
                                    </button>
                                    <div 
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                            faqOpen === f.q ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                    >
                                        <div className="px-6 pb-6 mt-1">
                                            <div className="p-5 rounded-2xl bg-bg-page border border-border/50">
                                                <p className="font-dmsans text-sm text-text-secondary leading-relaxed">{t(`help.faqs_list.${i}.a`)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
