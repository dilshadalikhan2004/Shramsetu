"use client";

import { History, ShieldCheck, IndianRupee, ArrowUpRight, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";

export default function EmployerPaymentsPage() {
    return (
        <div className="max-w-5xl mx-auto space-y-6 pb-20">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-outfit">Escrow & Payments</h1>
                <p className="text-shram-neutral mt-1 text-sm md:text-base">Manage your safe deposits and payment history.</p>
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
                                100% Escrow Protected
                            </div>
                            <p className="text-white/70 font-medium mb-1">Total Held in Safe Deposit</p>
                            <h2 className="text-5xl sm:text-6xl font-black font-outfit flex items-center tracking-tighter">
                                <span className="text-4xl text-white/50 mr-2">₹</span>2,400<span className="text-2xl text-white/50 ml-1">.00</span>
                            </h2>

                            <div className="flex gap-4 mt-8">
                                <button className="bg-white text-shram-dark px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-sm flex items-center gap-2">
                                    <ArrowUpRight className="w-5 h-5" /> Add Funds
                                </button>
                                <button className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-colors">
                                    View Deposit Policy
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
                                <h3 className="font-bold text-slate-900 text-lg">Action Required: Release Payment</h3>
                                <p className="text-slate-600 text-sm mt-1">The job <strong>"House Painting"</strong> was marked complete by the worker. Please verify and release funds.</p>
                            </div>
                        </div>
                        <button className="w-full sm:w-auto bg-shram-accent hover:bg-[#E06613] text-white px-6 py-3 rounded-xl font-bold transition-colors whitespace-nowrap shadow-md shadow-shram-accent/20">
                            Release ₹2,400
                        </button>
                    </div>

                    {/* History */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                <History className="w-5 h-5 text-shram-neutral" /> Payment History
                            </h3>
                            <button className="text-sm font-bold text-shram-accent hover:underline">Download Statement</button>
                        </div>
                        <div className="divide-y divide-slate-100">
                            <div className="p-6 flex justify-between items-center hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">Escrow Deposit</p>
                                        <p className="text-sm text-shram-neutral">Job: House Painting • Oct 24, 2023</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="font-bold text-slate-900 text-lg">-₹2,400</span>
                                    <p className="text-xs text-shram-neutral font-medium">Held Securely</p>
                                </div>
                            </div>
                            <div className="p-6 flex justify-between items-center hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">Payment Released</p>
                                        <p className="text-sm text-shram-neutral">To: Sunil Electrician • Oct 20, 2023</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="font-bold text-emerald-600 text-lg">-₹800</span>
                                    <p className="text-xs text-shram-neutral font-medium">Completed</p>
                                </div>
                            </div>
                            <div className="p-6 flex justify-between items-center hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                        <TrendingUp className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">Wallet Top-up</p>
                                        <p className="text-sm text-shram-neutral">Via UPI • Oct 15, 2023</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="font-bold text-blue-600 text-lg">+₹5,000</span>
                                    <p className="text-xs text-shram-neutral font-medium">Added</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">How Escrow Works</h3>
                        <div className="relative pl-6 space-y-6 before:absolute before:inset-y-2 before:left-[11px] before:w-0.5 before:bg-slate-100">
                            <div className="relative">
                                <div className="absolute w-6 h-6 bg-blue-100 rounded-full border-4 border-white -left-[31px] -top-1"></div>
                                <h4 className="font-bold text-sm text-slate-900">1. Agree & Deposit</h4>
                                <p className="text-xs text-slate-500 mt-1">Both parties agree on terms. You deposit funds securely into ShramSetu Escrow.</p>
                            </div>
                            <div className="relative">
                                <div className="absolute w-6 h-6 bg-slate-200 rounded-full border-4 border-white -left-[31px] -top-1"></div>
                                <h4 className="font-bold text-sm text-slate-900">2. Work Commences</h4>
                                <p className="text-xs text-slate-500 mt-1">Worker begins the job, knowing their payment is guaranteed and safe.</p>
                            </div>
                            <div className="relative">
                                <div className="absolute w-6 h-6 bg-slate-200 rounded-full border-4 border-white -left-[31px] -top-1"></div>
                                <h4 className="font-bold text-sm text-slate-900">3. Job Complete</h4>
                                <p className="text-xs text-slate-500 mt-1">Review the finished work and approve release of funds to the worker's account.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
