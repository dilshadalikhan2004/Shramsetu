"use client";

import { History, ShieldCheck, IndianRupee, ArrowUpRight, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n/TranslationProvider";

export default function EmployerPaymentsPage() {
    const { t } = useTranslation();
    return (
        <div className="max-w-5xl mx-auto space-y-6 pb-20">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-outfit">{t('common.earnings')} & {t('employer.status')}</h1>
                <p className="text-shram-neutral mt-1 text-sm md:text-base">{t('worker.noPaymentsSub')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    {/* Main Balance Card */}
                    <div className="bg-shram-dark rounded-2xl p-8 text-white relative overflow-hidden shadow-lg shadow-shram-dark/20">
                        <div className="absolute top-0 right-0 p-6 opacity-10">
                            <ShieldCheck className="w-32 h-32" />
                        </div>
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold tracking-wider uppercase mb-6 border border-white/20">
                                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                100% {t('common.verified')}
                            </div>
                            <p className="text-white/70 font-medium mb-1">{t('worker.totalEarned')}</p>
                            <h2 className="text-5xl sm:text-6xl font-black font-outfit flex items-center tracking-tighter">
                                <span className="text-4xl text-white/50 mr-2">₹</span>2,400<span className="text-2xl text-white/50 ml-1">.00</span>
                            </h2>

                            <div className="flex gap-4 mt-8">
                                <button className="bg-white text-shram-dark px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-sm flex items-center gap-2">
                                    <ArrowUpRight className="w-5 h-5" /> {t('common.save')}
                                </button>
                                <button className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-colors">
                                    {t('common.details')}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Pending Action */}
                    <div className="bg-orange-50 rounded-2xl border border-orange-200 p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between shadow-sm">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center shrink-0">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-lg">{t('employer.verifyAndComplete')}</h3>
                                <p className="text-slate-600 text-sm mt-1">{t('employer.enterEntryCodePrompt')}</p>
                            </div>
                        </div>
                        <button className="w-full sm:w-auto bg-shram-accent hover:bg-[#E06613] text-white px-6 py-3 rounded-xl font-bold transition-colors whitespace-nowrap shadow-md shadow-shram-accent/20">
                            {t('common.status_labels.paid')} ₹2,400
                        </button>
                    </div>

                    {/* History */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                <History className="w-5 h-5 text-shram-neutral" /> {t('worker.paymentHistory')}
                            </h3>
                            <button className="text-sm font-bold text-shram-accent hover:underline">{t('common.export')}</button>
                        </div>
                        <div className="divide-y divide-slate-100">
                            <div className="p-6 flex justify-between items-center hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">{t('employer.pending')}</p>
                                        <p className="text-sm text-shram-neutral">{t('employer.job')}: House Painting • Oct 24, 2023</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="font-bold text-slate-900 text-lg">-₹2,400</span>
                                    <p className="text-xs text-shram-neutral font-medium">{t('employer.pending')}</p>
                                </div>
                            </div>
                            <div className="p-6 flex justify-between items-center hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">{t('common.status_labels.paid')}</p>
                                        <p className="text-sm text-shram-neutral">To: Sunil Electrician • Oct 20, 2023</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="font-bold text-emerald-600 text-lg">-₹800</span>
                                    <p className="text-xs text-shram-neutral font-medium">{t('employer.done')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">{t('sidebar.help')}</h3>
                        <div className="relative pl-6 space-y-6 before:absolute before:inset-y-2 before:left-[11px] before:w-0.5 before:bg-slate-100">
                            <div className="relative">
                                <div className="absolute w-6 h-6 bg-blue-100 rounded-full border-4 border-white -left-[31px] -top-1"></div>
                                <h4 className="font-bold text-sm text-slate-900">1. {t('common.save')}</h4>
                                <p className="text-xs text-slate-500 mt-1">{t('worker.noPaymentsSub')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
