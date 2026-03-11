"use client";

import { useEffect, useState } from "react";
import { MapPin, CheckCircle2, Filter, Briefcase, Search } from "lucide-react";
import { AnimatedList, AnimatedListItem, AnimatedButton, FadeIn, showToast } from "@/components/ui/animations";
import { motion } from "framer-motion";

import { useUserStore } from "@/store/useUserStore";
import { useAppDataStore } from "@/store/useAppDataStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import EmptyState from "@/components/shared/EmptyState";
import JobCardSkeleton from "@/components/shared/JobCardSkeleton";
import JobMatchBadge from "@/components/worker/JobMatchBadge";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n/TranslationProvider";

const CATEGORIES = ["All", "Plumber", "Electrician", "Mason", "Welder", "Painter", "Carpenter", "Labor"];

interface JobListing {
    id: string;
    title: string;
    category: string;
    location: string;
    city: string;
    daily_rate: number;
    duration: string;
    is_urgent: boolean;
    skills_required: string[];
    employer_id: string;
    employer_name?: string;
    employer_verified?: boolean;
    created_at: string;
}

export default function WorkerHome() {
    const { t } = useTranslation();
    const router = useRouter();
    const { generalProfile, workerProfile } = useUserStore();
    const { jobs: storeJobs, addCandidate } = useAppDataStore();
    const { addNotification } = useNotificationStore();
    const [activeCategory, setActiveCategory] = useState("All");
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Derive appliedIds from store
    const userId = generalProfile?.id;
    const appliedIds = new Set(
        storeJobs
            .filter(j => j.candidates.some(c => c.id === userId))
            .map(j => j.id)
    );

    const jobs: JobListing[] = storeJobs
        .filter(j => j.employer_id !== userId) // Don't see own jobs
        .map(j => ({
            id: j.id,
            title: j.title,
            category: j.category,
            location: j.location,
            city: j.city,
            daily_rate: j.daily_rate,
            duration: j.duration,
            is_urgent: j.is_urgent,
            skills_required: j.skills_required,
            employer_id: j.employer_id,
            employer_name: j.employer_name,
            employer_verified: j.employer_verified,
            created_at: j.posted
        }));

    useEffect(() => {
        setLoading(false);
    }, []);

    const filteredByCategory = activeCategory === "All" ? jobs : jobs.filter(j => j.category === activeCategory);
    const filtered = searchQuery
        ? filteredByCategory.filter(j =>
            j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            j.location?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : filteredByCategory;

    const handleApply = (jobId: string) => {
        if (!userId) {
            showToast(t('home.loginToApply'), "warning");
            return;
        }

        if (appliedIds.has(jobId)) return;

        const job = storeJobs.find(j => j.id === jobId);
        if (!job) return;

        const name = generalProfile.name || "Worker";
        const newCandidate = {
            id: userId,
            name,
            init: name[0]?.toUpperCase() || t('common.workerInitial'),
            color: "#0a2540",
            rating: workerProfile?.rating || 5.0,
            exp: workerProfile?.experienceYears ? `${workerProfile.experienceYears} years` : t('common.newMember'),
            verified: generalProfile.kycStatus === 'verified',
            bid: job.wage,
            excerpt: workerProfile?.bio || t('home.defaultBio'),
            status: "pending" as const,
        };

        addCandidate(jobId, newCandidate);

        // Notify employer
        addNotification({
            type: "job",
            title: t('home.newApplicationTitle'),
            body: `${name} ${t('home.newApplicationBody')} "${job.title}".`,
            time: t('common.justNow'),
            unread: true,
            role: "employer"
        });

        showToast(t('home.applySuccess'), "success");
    };

    return (
        <div className="space-y-5">
            {/* Search */}
            <FadeIn>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#9ca3af" }} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t('home.searchPlaceholder')}
                        className="w-full h-10 rounded-xl pl-9 pr-4 text-sm outline-none border"
                        style={{ background: "#f8fafc", color: "#374151", borderColor: "#e5e7eb" }}
                    />
                </div>
            </FadeIn>

            {/* Category Pills */}
            <FadeIn delay={0.1}>
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    {CATEGORIES.map((cat) => (
                        <AnimatedButton
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            hoverScale={1.05}
                            tapScale={0.93}
                            className="shrink-0 px-4 py-1.5 rounded-full font-dmsans font-medium transition-all duration-200"
                            style={{
                                fontSize: 13,
                                background: activeCategory === cat ? "#e85d26" : "white",
                                color: activeCategory === cat ? "white" : "#6b7280",
                                border: activeCategory === cat ? "none" : "1px solid #e5e7eb",
                            }}
                        >
                            {cat === "All" ? t('common.viewAll') : t(`common.categories.${cat.toLowerCase()}`)}
                        </AnimatedButton>
                    ))}
                </div>
            </FadeIn>

            {/* Section Header */}
            <FadeIn delay={0.15}>
                <div className="flex items-center justify-between">
                    <span className="font-outfit font-semibold" style={{ fontSize: 16, color: "#111827" }}>
                        {loading ? t('common.loading') : `${t('home.availableJobs')} (${filtered.length})`}
                    </span>
                </div>
            </FadeIn>

            {/* Loading State */}
            {loading && (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => <JobCardSkeleton key={i} />)}
                </div>
            )}

            {/* Empty State */}
            {!loading && filtered.length === 0 && (
                <EmptyState
                    icon={<Briefcase className="w-8 h-8" />}
                    title={t('home.noJobs')}
                    subtitle={activeCategory !== "All"
                        ? `${t('home.noCategoryJobs')} ${t(`common.categories.${activeCategory.toLowerCase()}`)}. ${t('home.tryDifferentCategory')}`
                        : t('home.noJobsSub')}
                    action={() => setActiveCategory("All")}
                    actionLabel={t('home.viewAllCategories')}
                />
            )}

            {/* Job Cards — staggered animated grid */}
            {!loading && filtered.length > 0 && (
                <AnimatedList
                    className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4"
                    key={activeCategory}
                >
                    {filtered.map((job) => (
                        <AnimatedListItem key={job.id}>
                            <motion.div
                                className="bg-white rounded-2xl border p-4"
                                style={{ borderColor: "#e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
                                whileHover={{ y: -4, boxShadow: "0 12px 28px rgba(0,0,0,0.1)" }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                {/* Top row */}
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center font-outfit font-bold text-white shrink-0"
                                            style={{ background: "#0a2540" }}>
                                            {(job.employer_name ?? "E")[0]}
                                        </div>
                                        <div>
                                            <h3 className="font-outfit font-semibold" style={{ fontSize: 15, color: "#111827" }}>
                                                {job.title}
                                            </h3>
                                            <p className="font-dmsans flex items-center gap-1" style={{ fontSize: 12, color: "#6b7280" }}>
                                                {job.employer_name}
                                                {job.employer_verified && (
                                                    <CheckCircle2 className="w-3 h-3" style={{ color: "#0e9f6e" }} />
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-outfit font-bold" style={{ fontSize: 15, color: "#0e9f6e" }}>
                                            ₹{job.daily_rate?.toLocaleString("en-IN")}/day
                                        </p>
                                        {job.is_urgent && (
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-600 font-semibold">{t('common.urgent')}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="h-px mb-3" style={{ background: "#f3f4f6" }} />

                                {/* Location + Duration */}
                                <div className="flex items-center gap-4 mb-2">
                                    {job.location && (
                                        <span className="flex items-center gap-1 font-dmsans" style={{ fontSize: 12, color: "#6b7280" }}>
                                            <MapPin className="w-3.5 h-3.5" style={{ color: "#e85d26" }} />
                                            {job.location}
                                        </span>
                                    )}
                                    {job.duration && (
                                        <span className="flex items-center gap-1 font-dmsans" style={{ fontSize: 12, color: "#6b7280" }}>
                                            <div className="w-2 h-2 rounded-full" style={{ background: "#3b82f6" }} />
                                            {job.duration}
                                        </span>
                                    )}
                                </div>

                                {/* AI Match Score */}
                                {generalProfile?.id && (
                                    <JobMatchBadge workerId={generalProfile.id} jobId={job.id} />
                                )}

                                {/* Apply Button */}
                                <AnimatedButton
                                    onClick={() => !appliedIds.has(job.id) && handleApply(job.id)}
                                    tapScale={appliedIds.has(job.id) ? 1 : 0.96}
                                    hoverScale={appliedIds.has(job.id) ? 1 : 1.01}
                                    className="w-full h-11 rounded-xl font-dmsans font-semibold transition-colors duration-200 mt-3"
                                    style={{
                                        background: appliedIds.has(job.id) ? "#ecfdf5" : "#0a2540",
                                        color: appliedIds.has(job.id) ? "#0e9f6e" : "white",
                                        border: appliedIds.has(job.id) ? "1px solid #d1fae5" : "none",
                                    }}
                                >
                                    {appliedIds.has(job.id) ? `✓ ${t('common.applied')}` : t('common.apply')}
                                </AnimatedButton>
                            </motion.div>
                        </AnimatedListItem>
                    ))}
                </AnimatedList>
            )}
        </div>
    );
}
