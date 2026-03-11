"use client";

import { ArrowRight, Briefcase, MessageSquare, TrendingUp, TrendingDown, Users, BarChart2, Calendar, Target, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useAppDataStore } from "@/store/useAppDataStore";
import { AnimatedList, AnimatedListItem, AnimatedNumber, AnimatedButton, FadeIn } from "@/components/ui/animations";
import { motion } from "framer-motion";
import EmptyState from "@/components/shared/EmptyState";
import StatCardSkeleton from "@/components/shared/StatCardSkeleton";
import ApplicantRowSkeleton from "@/components/shared/ApplicantRowSkeleton";
import { useTranslation } from "@/lib/i18n/TranslationProvider";

interface DashboardStats {
    activeJobs: number;
    totalApplicants: number;
    totalHires: number;
    rating: number;
}

interface RecentApplication {
    id: string;
    worker_name: string;
    worker_init: string;
    worker_color: string;
    worker_rating: number;
    job_title: string;
    bid_amount: string;
    status: string;
    created_at: string;
}

export default function EmployerDashboard() {
    const { t } = useTranslation();
    const router = useRouter();
    const { generalProfile } = useUserStore();
    const { jobs } = useAppDataStore();
    const [stats, setStats] = useState<DashboardStats>({ activeJobs: 0, totalApplicants: 0, totalHires: 0, rating: 0 });
    const [recentApps, setRecentApps] = useState<RecentApplication[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        function updateDashboard() {
            setLoading(true);

            // Filter jobs for this employer
            const myJobs = jobs.filter(j => j.employer_id === generalProfile?.id || j.employer_id === 'self');
            const activeJobsCount = myJobs.filter(j => j.status === 'active').length;

            // Calculate total applicants
            const allCandidates = myJobs.flatMap(j =>
                j.candidates.map(c => ({ ...c, jobTitle: j.title }))
            );
            const totalApplicants = allCandidates.length;

            // Calculate hires (accepted status)
            const totalHires = allCandidates.filter(c => c.status === 'accepted' || c.status === 'completed').length;

            setStats({
                activeJobs: activeJobsCount,
                totalApplicants,
                totalHires,
                rating: 4.8 // Mock rating for now or fetch from profile
            });

            // Map recent applications
            setRecentApps(allCandidates.slice(0, 5).map(c => ({
                id: `${c.id}-${Date.now()}`,
                worker_name: c.name,
                worker_init: c.init,
                worker_color: c.color,
                worker_rating: c.rating,
                job_title: c.jobTitle,
                bid_amount: c.bid,
                status: c.status,
                created_at: t('common.justNow')
            })));

            setLoading(false);
        }
        updateDashboard();
    }, [jobs, generalProfile?.id, t]);

    const statCards = [
        { label: t('employer.activeJobs'), value: stats.activeJobs, prefix: "", icon: Briefcase, iconBg: "#fff1eb", iconColor: "#e85d26", change: "" },
        { label: t('employer.totalApplicants'), value: stats.totalApplicants, prefix: "", icon: Users, iconBg: "#eff6ff", iconColor: "#2563eb", change: "" },
        { label: t('employer.hiresMade'), value: stats.totalHires, prefix: "", icon: Target, iconBg: "#ecfdf5", iconColor: "#0e9f6e", change: "" },
        { label: t('worker.rating'), value: Math.round(stats.rating * 10) / 10, prefix: "", icon: BarChart2, iconBg: "#f5f3ff", iconColor: "#7c3aed", change: "" },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <FadeIn>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-outfit font-bold" style={{ fontSize: 24, color: "#111827" }}>{t('employer.dashboard')}</h1>
                        <p className="font-dmsans" style={{ fontSize: 14, color: "#6b7280" }}>
                            {t('employer.welcomeBack')}{generalProfile?.name ? `, ${generalProfile.name}` : ""}
                        </p>
                    </div>
                    <AnimatedButton
                        onClick={() => router.push("/post-job")}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-dmsans font-semibold text-sm"
                        style={{ background: "#e85d26", color: "white" }}
                    >
                        {t('employer.postNewJob')} <ArrowRight className="w-4 h-4" />
                    </AnimatedButton>
                </div>
            </FadeIn>

            {/* Stats Grid */}
            {loading ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => <StatCardSkeleton key={i} />)}
                </div>
            ) : (
                <AnimatedList className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {statCards.map((s) => (
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
                                    style={{ fontSize: 28, color: "#111827", display: "block" }}
                                />
                            </motion.div>
                        </AnimatedListItem>
                    ))}
                </AnimatedList>
            )}

            {/* Recent Applications */}
            <FadeIn delay={0.2}>
                <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "#e5e7eb" }}>
                    <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "#f3f4f6" }}>
                        <h3 className="font-outfit font-bold" style={{ fontSize: 16, color: "#111827" }}>{t('employer.recentApplications')}</h3>
                        <AnimatedButton
                            onClick={() => router.push("/my-jobs?tab=applications")}
                            className="flex items-center gap-1 font-dmsans font-medium"
                            style={{ fontSize: 14, color: "#e85d26" }}
                        >
                            {t('common.viewAll')} <ArrowRight className="w-4 h-4" />
                        </AnimatedButton>
                    </div>

                    {loading ? (
                        <div>
                            {[1, 2, 3].map(i => <ApplicantRowSkeleton key={i} />)}
                        </div>
                    ) : recentApps.length === 0 ? (
                        <EmptyState
                            icon={<FileText className="w-8 h-8" />}
                            title={t('employer.noApplicationsYet')}
                            subtitle={t('employer.postJobToReceiveAppsDesc')}
                            action={() => router.push("/post-job")}
                            actionLabel={t('employer.postJob')}
                        />
                    ) : (
                        <AnimatedList>
                            {recentApps.map((app, i) => (
                                <AnimatedListItem key={app.id}>
                                    <motion.div
                                        className="flex items-center justify-between px-5 py-3.5 transition-colors cursor-pointer"
                                        style={{ borderBottom: i < recentApps.length - 1 ? "1px solid #f9fafb" : "none" }}
                                        whileHover={{ backgroundColor: "rgba(249,250,251,1)" }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full flex items-center justify-center font-outfit font-bold text-white text-sm"
                                                style={{ background: app.worker_color }}>
                                                {app.worker_init}
                                            </div>
                                            <div>
                                                <p className="font-dmsans font-bold" style={{ fontSize: 14, color: "#111827" }}>{app.worker_name}</p>
                                                <p style={{ fontSize: 12, color: "#6b7280" }}>
                                                    {app.job_title} · {app.bid_amount}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 rounded-full font-dmsans font-semibold"
                                            style={{
                                                fontSize: 11,
                                                background: app.status === "accepted" ? "#ecfdf5" : app.status === "rejected" ? "#fef2f2" : "#fffbeb",
                                                color: app.status === "accepted" ? "#0e9f6e" : app.status === "rejected" ? "#dc2626" : "#d97706",
                                            }}>
                                            {t(`common.status_labels.${app.status}`)}
                                        </span>
                                    </motion.div>
                                </AnimatedListItem>
                            ))}
                        </AnimatedList>
                    )}
                </div>
            </FadeIn>
        </div>
    );
}
