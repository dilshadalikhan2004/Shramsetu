"use client";

import { useEffect, useState } from "react";
import { MapPin, Filter, Briefcase, Award, Key } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useAppDataStore } from "@/store/useAppDataStore";
import { AnimatedList, AnimatedListItem, AnimatedButton, FadeIn } from "@/components/ui/animations";
import { motion } from "framer-motion";
import EmptyState from "@/components/shared/EmptyState";
import { useTranslation } from "@/lib/i18n/TranslationProvider";

type TabKey = "pending" | "accepted" | "completed";

const STATUS_CONFIG = {
    pending: { color: "#d97706", bg: "#fffbeb", label: "Pending" },
    accepted: { color: "#0e9f6e", bg: "#ecfdf5", label: "Accepted" },
    completed: { color: "#6b7280", bg: "#f3f4f6", label: "Completed" },
};

interface ApplicationRecord {
    id: string;
    jobId: string;
    status: string;
    bid_amount: string;
    created_at: string;
    job_title: string;
    job_location: string;
    job_category: string;
    job_daily_rate: number;
    job_duration: string;
    employer_name: string;
    employer_init: string;
    employer_color: string;
    otp?: string;
    isTopMatch?: boolean;
}

export default function ApplicationsPage() {
    const { t } = useTranslation();
    const { generalProfile } = useUserStore();
    const { jobs: storeJobs } = useAppDataStore();
    const [tab, setTab] = useState<TabKey>("pending");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 500);
    }, []);

    const userId = generalProfile?.id;

    const applications: ApplicationRecord[] = storeJobs.flatMap(job => {
        const myApplication = job.candidates.find(c => c.id === userId);
        if (!myApplication) return [];

        return [{
            id: `${job.id}-${userId}`,
            jobId: job.id,
            status: myApplication.status,
            bid_amount: myApplication.bid,
            created_at: job.posted,
            job_title: job.title,
            job_location: job.location,
            job_category: job.category,
            job_daily_rate: job.daily_rate,
            job_duration: job.duration,
            employer_name: job.employer_name,
            employer_init: job.employer_name[0],
            employer_color: "#0a2540",
            otp: myApplication.otp,
            isTopMatch: myApplication.isTopMatch
        }];
    });

    const tabs: { key: TabKey; label: string }[] = [
        { key: "pending", label: t('common.status_labels.pending') },
        { key: "accepted", label: t('common.status_labels.accepted') },
        { key: "completed", label: t('common.status_labels.completed') },
    ];

    const filteredItems = applications.filter(a => a.status === tab);

    return (
        <div className="space-y-5">
            {/* Header */}
            <FadeIn>
                <div className="flex items-center justify-between">
                    <h1 className="font-outfit font-bold" style={{ fontSize: 24, color: "#111827" }}>{t('applications.title')}</h1>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                        <Briefcase className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">{applications.length} {t('applications.total')}</span>
                    </div>
                </div>
            </FadeIn>

            {/* Tabs */}
            <FadeIn delay={0.1}>
                <div className="flex gap-2">
                    {tabs.map(t => {
                        const count = applications.filter(a => a.status === t.key).length;
                        return (
                            <AnimatedButton key={t.key} onClick={() => setTab(t.key)}
                                tapScale={0.93} hoverScale={1.05}
                                className="px-4 py-2 rounded-xl font-dmsans font-semibold transition-all flex items-center gap-2"
                                style={{
                                    fontSize: 13,
                                    background: tab === t.key ? "#0a2540" : "white",
                                    color: tab === t.key ? "white" : "#6b7280",
                                    border: tab === t.key ? "none" : "1px solid #e5e7eb",
                                }}>
                                {t.label}
                                {count > 0 && (
                                    <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] font-bold">
                                        {count}
                                    </span>
                                )}
                            </AnimatedButton>
                        );
                    })}
                </div>
            </FadeIn>

            {/* Loading */}
            {loading && (
                <div className="bg-white rounded-2xl border overflow-hidden p-5 space-y-4" style={{ borderColor: "#e5e7eb" }}>
                    {[1, 2, 3].map(i => (
                        <div key={i} className="animate-pulse flex items-center gap-3">
                            <div className="w-9 h-9 bg-gray-200 rounded-xl" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-40" />
                                <div className="h-3 bg-gray-100 rounded w-24" />
                            </div>
                            <div className="h-6 bg-gray-100 rounded-full w-16" />
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && filteredItems.length === 0 && (
                <EmptyState
                    icon={<Briefcase className="w-8 h-8" />}
                    title={`${t('applications.noApplications')} ${t(`common.status_labels.${tab}`)} ${t('applications.title').split(' ')[1]}`}
                    subtitle={tab === "pending"
                        ? t('applications.emptyPendingSub')
                        : `${t('applications.noInStatus')} "${t(`common.status_labels.${tab}`)}" ${t('applications.statusYet')}`
                    }
                />
            )}

            {/* List */}
            {!loading && filteredItems.length > 0 && (
                <FadeIn delay={0.15}>
                    <div className="space-y-4">
                        {filteredItems.map((item) => {
                            const config = STATUS_CONFIG[item.status as TabKey] ?? STATUS_CONFIG.pending;
                            return (
                                <motion.div
                                    key={item.id}
                                    layout
                                    className="bg-white rounded-2xl border overflow-hidden p-5 shadow-sm transition-all hover:shadow-md"
                                    style={{ borderColor: "#e5e7eb" }}
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-outfit font-bold text-white text-lg shrink-0"
                                                style={{ background: item.employer_color }}>{item.employer_init}</div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-outfit font-bold text-lg text-gray-900">{item.job_title}</h3>
                                                    {item.isTopMatch && (
                                                        <span className="flex items-center gap-1 text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">
                                                            <Award className="w-3 h-3" /> {t('applications.topMatch')}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-500 font-medium">{item.employer_name} • {item.job_category}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-3">
                                            <div className="px-3 py-1.5 bg-gray-50 rounded-lg flex items-center gap-2 border border-gray-100">
                                                <MapPin className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-600 font-semibold">{item.job_location}</span>
                                            </div>
                                            <div className="px-3 py-1.5 bg-green-50 rounded-lg border border-green-100">
                                                <span className="text-sm text-green-700 font-bold">{item.bid_amount}</span>
                                            </div>
                                            <span className="px-3 py-1.5 rounded-lg font-dmsans font-bold border"
                                                style={{ fontSize: 13, background: config.bg, color: config.color, borderColor: `${config.color}20` }}>
                                                {t(`common.status_labels.${item.status}`)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* OTP/Handshake Section for Accepted Jobs */}
                                    {item.status === "accepted" && item.otp && (
                                        <div className="mt-5 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-blue-600 rounded-xl text-white">
                                                    <Key className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">{t('applications.arrivalCode')}</p>
                                                    <p className="text-sm text-blue-800">{t('applications.arrivalCodeSub')}</p>
                                                </div>
                                            </div>
                                            <div className="bg-white px-5 py-2 rounded-xl border-2 border-dashed border-blue-300">
                                                <span className="text-2xl font-black text-blue-700 tracking-[0.2em]">{item.otp}</span>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </FadeIn>
            )}
        </div>
    );
}
