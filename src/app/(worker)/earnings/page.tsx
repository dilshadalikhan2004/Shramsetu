"use client";

import { useEffect, useState } from "react";
import { TrendingUp, IndianRupee, Briefcase, Calendar, Download, ChevronRight, Wallet } from "lucide-react";
import { AnimatedList, AnimatedListItem, AnimatedNumber, AnimatedButton, FadeIn } from "@/components/ui/animations";
import { motion } from "framer-motion";
import { useUserStore } from "@/store/useUserStore";
import EmptyState from "@/components/shared/EmptyState";
import StatCardSkeleton from "@/components/shared/StatCardSkeleton";
import { useTranslation } from "@/lib/i18n/TranslationProvider";

interface PaymentRecord {
    id: string;
    amount: number;
    status: "pending" | "paid" | "failed";
    paid_at: string | null;
    created_at: string;
    employer_name?: string;
    employer_init?: string;
    employer_color?: string;
    job_title?: string;
}

export default function EarningsPage() {
    const { t } = useTranslation();
    const { generalProfile } = useUserStore();
    const [payments, setPayments] = useState<PaymentRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalEarned, setTotalEarned] = useState(0);
    const [pendingAmount, setPendingAmount] = useState(0);
    const [paidAmount, setPaidAmount] = useState(0);
    const [jobsCompleted, setJobsCompleted] = useState(0);

    useEffect(() => {
        async function fetchEarnings() {
            const userId = generalProfile?.id;
            if (!userId) { setLoading(false); return; }

            setLoading(true);

            // No backend connected yet — show empty state
            const paymentData: PaymentRecord[] = [];

            setPayments(paymentData);
            setTotalEarned(0);
            setPendingAmount(0);
            setPaidAmount(0);
            setJobsCompleted(0);
            setLoading(false);
        }

        fetchEarnings();
    }, [generalProfile?.id]);

    return (
        <div className="space-y-5">
            {/* Header */}
            <FadeIn>
                <div className="flex items-center justify-between">
                    <h1 className="font-outfit font-bold" style={{ fontSize: 24, color: "#111827" }}>{t('common.earnings')}</h1>
                    <AnimatedButton
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-dmsans font-medium text-sm"
                        style={{ background: "white", border: "1px solid #e5e7eb", color: "#374151" }}
                    >
                        <Download className="w-4 h-4" /> {t('common.export')}
                    </AnimatedButton>
                </div>
            </FadeIn>

            {/* Stats Row */}
            {loading ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => <StatCardSkeleton key={i} />)}
                </div>
            ) : (
                <AnimatedList className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: t('worker.totalEarned'), value: totalEarned, prefix: "₹", sub: totalEarned > 0 ? t('worker.fromAllJobs') : t('worker.noEarningsYet'), green: true, icon: IndianRupee, iconBg: "#ecfdf5", iconColor: "#0e9f6e" },
                        { label: t('worker.pendingPayment'), value: pendingAmount, prefix: "₹", sub: pendingAmount > 0 ? t('worker.awaitingPayment') : t('worker.noPending'), green: false, icon: Calendar, iconBg: "#fffbeb", iconColor: "#d97706" },
                        { label: t('worker.paidOut'), value: paidAmount, prefix: "₹", sub: paidAmount > 0 ? t('worker.successfullyPaid') : t('worker.noPaymentsYet'), green: true, icon: TrendingUp, iconBg: "#ecfdf5", iconColor: "#0e9f6e" },
                        { label: t('worker.jobsCompleted'), value: jobsCompleted, prefix: "", sub: t('worker.totalJobs'), green: true, icon: Briefcase, iconBg: "#fff1eb", iconColor: "#e85d26" },
                    ].map((s) => (
                        <AnimatedListItem key={s.label}>
                            <motion.div
                                className="bg-white rounded-2xl border p-4"
                                style={{ borderColor: "#e5e7eb" }}
                                whileHover={{ y: -3, boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <p style={{ fontSize: 12, color: "#9ca3af" }}>{s.label}</p>
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: s.iconBg }}>
                                        <s.icon className="w-4 h-4" style={{ color: s.iconColor }} />
                                    </div>
                                </div>
                                <AnimatedNumber
                                    value={s.value}
                                    prefix={s.prefix}
                                    duration={1400}
                                    className="font-outfit font-bold"
                                    style={{ fontSize: 26, color: "#111827", display: "block" }}
                                />
                                <p style={{ fontSize: 12, color: s.green ? "#0e9f6e" : "#d97706" }} className="mt-1">{s.sub}</p>
                            </motion.div>
                        </AnimatedListItem>
                    ))}
                </AnimatedList>
            )}

            {/* Payment History */}
            <FadeIn delay={0.2}>
                <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "#e5e7eb" }}>
                    <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "#f3f4f6" }}>
                        <h3 className="font-outfit font-bold" style={{ fontSize: 16, color: "#111827" }}>{t('worker.paymentHistory')}</h3>
                    </div>

                    {loading ? (
                        <div className="p-5 space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="animate-pulse flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gray-200 rounded-lg" />
                                    <div className="flex-1">
                                        <div className="h-4 bg-gray-200 rounded w-32 mb-1" />
                                        <div className="h-3 bg-gray-100 rounded w-20" />
                                    </div>
                                    <div className="h-4 bg-gray-200 rounded w-16" />
                                </div>
                            ))}
                        </div>
                    ) : payments.length === 0 ? (
                        <EmptyState
                            icon={<Wallet className="w-8 h-8" />}
                            title={t('worker.noPaymentsYet')}
                            subtitle={t('worker.noPaymentsSub')}
                        />
                    ) : (
                        <>
                            <div className="grid grid-cols-4 px-5 py-2.5" style={{ background: "#f8fafc", borderBottom: "1px solid #f3f4f6" }}>
                                {[t('worker.company'), t('worker.date'), t('worker.status'), t('worker.amount')].map((h) => (
                                    <p key={h} className="font-dmsans font-semibold" style={{ fontSize: 12, color: "#9ca3af", textTransform: "uppercase" }}>{h}</p>
                                ))}
                            </div>
                            <AnimatedList>
                                {payments.map((item, i) => (
                                    <AnimatedListItem key={item.id}>
                                        <motion.div
                                            className="grid grid-cols-4 items-center px-5 py-3.5 transition-colors"
                                            style={{ borderBottom: i < payments.length - 1 ? "1px solid #f9fafb" : "none" }}
                                            whileHover={{ backgroundColor: "rgba(249,250,251,1)" }}
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 rounded-lg flex items-center justify-center font-outfit font-bold text-white text-xs shrink-0"
                                                    style={{ background: item.employer_color }}>{item.employer_init}</div>
                                                <p className="font-dmsans font-medium" style={{ fontSize: 14, color: "#111827" }}>{item.employer_name}</p>
                                            </div>
                                            <p style={{ fontSize: 14, color: "#6b7280" }}>
                                                {new Date(item.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                                            </p>
                                            <span className="px-2.5 py-0.5 rounded-full font-dmsans font-semibold w-fit"
                                                style={{
                                                    fontSize: 11,
                                                    background: item.status === "paid" ? "#ecfdf5" : item.status === "failed" ? "#fef2f2" : "#fffbeb",
                                                    color: item.status === "paid" ? "#0e9f6e" : item.status === "failed" ? "#dc2626" : "#d97706"
                                                }}>
                                                {t(`common.status_labels.${item.status}`)}
                                            </span>
                                            <p className="font-outfit font-bold" style={{
                                                fontSize: 15,
                                                color: item.status === "paid" ? "#0e9f6e" : item.status === "failed" ? "#dc2626" : "#d97706"
                                            }}>
                                                ₹{item.amount?.toLocaleString("en-IN")}
                                            </p>
                                        </motion.div>
                                    </AnimatedListItem>
                                ))}
                            </AnimatedList>
                        </>
                    )}
                </div>
            </FadeIn>
        </div>
    );
}
