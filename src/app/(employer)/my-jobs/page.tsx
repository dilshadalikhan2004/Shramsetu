"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    ChevronUp, ChevronDown, MapPin, Briefcase, Users, Plus, Star,
    CheckCircle2, XCircle, MessageSquare, Clock, Filter, UserCheck,
    FileText, Calendar, History, Award,
} from "lucide-react";
import { useAppDataStore } from "@/store/useAppDataStore";
import { useWorkerStore } from "@/store/useWorkerStore";
import { showToast } from "@/components/ui/animations";
import { useTranslation } from "@/lib/i18n/TranslationProvider";

export default function MyJobsPage() {
    const { t } = useTranslation();
    const TABS = [
        { key: null, label: t('employer.myJobs'), icon: Briefcase },
        { key: "applications", label: t('common.applications'), icon: FileText },
        { key: "candidates", label: t('employer.candidates'), icon: Users },
        { key: "history", label: t('employer.hiringHistory'), icon: History },
    ];
    const router = useRouter();
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab");
    const { jobs, history, updateCandidateStatus, markWorkCompleted } = useAppDataStore();
    const [expanded, setExpanded] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);
    const [appFilter, setAppFilter] = useState<"all" | "pending" | "accepted" | "rejected">("all");

    useEffect(() => { setMounted(true); }, []);
    useEffect(() => { if (mounted && !tab) setExpanded(jobs[0]?.id ?? null); }, [tab, mounted, jobs]);

    if (!mounted) return null;

    // ── Collect all active applications (exclude rejected from default view) ──
    const allApplications = jobs.flatMap(job =>
        job.candidates.map(c => ({ ...c, jobId: job.id, jobTitle: job.title, jobLocation: job.location, jobWage: job.wage }))
    );
    const activeApplications = allApplications.filter(a => a.status !== "rejected");
    const pendingCount = allApplications.filter(a => !a.status || a.status === "pending").length;
    const acceptedCount = allApplications.filter(a => a.status === "accepted").length;
    const rejectedCount = allApplications.filter(a => a.status === "rejected").length;

    const filteredApps = appFilter === "all"
        ? activeApplications
        : appFilter === "rejected"
            ? allApplications.filter(a => a.status === "rejected")
            : allApplications.filter(a => (a.status || "pending") === appFilter);

    const switchTab = (key: string | null) => {
        if (key) router.push(`/my-jobs?tab=${key}`);
        else router.push("/my-jobs");
    };

    return (
        <div className="space-y-5 w-full">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-outfit font-bold" style={{ fontSize: 28, color: "#111827" }}>
                        {tab === "applications" ? t('common.applications') : tab === "candidates" ? t('employer.candidates') : tab === "history" ? t('employer.hiringHistory') : t('employer.myJobListings')}
                    </h1>
                    <p className="font-dmsans mt-1" style={{ fontSize: 14, color: "#6b7280" }}>
                        {tab === "applications"
                            ? t('employer.applicationSummary', { pending: pendingCount, hired: acceptedCount, rejected: rejectedCount })
                            : tab === "candidates"
                                ? t('employer.activeHiresSummary', { count: acceptedCount, jobsCount: jobs.length })
                                : tab === "history"
                                    ? t('employer.completedWorkRecordsSummary', { count: history.length })
                                    : t('employer.activeListingsSummary', { count: jobs.filter(j => j.status === "active").length })
                        }
                    </p>
                </div>
                {tab !== "history" && (
                    <button onClick={() => router.push("/post-job")}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-dmsans font-semibold text-white transition-all active:scale-95"
                        style={{ background: "#e85d26", fontSize: 14 }}>
                        <Plus className="w-4 h-4" /> {t('employer.postNewJob')}
                    </button>
                )}
            </div>

            {/* Tab Bar */}
            <div className="flex gap-1 border-b" style={{ borderColor: "#e5e7eb" }}>
                {TABS.map(tItem => {
                    const isActive = tab === tItem.key;
                    const Icon = tItem.icon;
                    return (
                        <button key={tItem.key ?? "jobs"} onClick={() => switchTab(tItem.key)}
                            className="flex items-center gap-2 px-4 py-3 font-dmsans font-semibold text-sm transition-all relative"
                            style={{ color: isActive ? "#e85d26" : "#6b7280" }}>
                            <Icon className="w-4 h-4" />
                            {tItem.label}
                            {tItem.key === "history" && history.length > 0 && (
                                <span className="px-1.5 py-0.5 rounded-full text-xs font-bold" style={{ background: "#ecfdf5", color: "#0e9f6e" }}>{history.length}</span>
                            )}
                            {isActive && <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full" style={{ background: "#e85d26" }} />}
                        </button>
                    );
                })}
            </div>

            {/* ════════════════════════════════════
                TAB 1: My Jobs — Job listings
            ════════════════════════════════════ */}
            {!tab && (
                <div className="space-y-3">
                    {jobs.map((job) => {
                        const isExpanded = expanded === job.id;
                        // Only show non-rejected candidates in the job view
                        const visibleCandidates = job.candidates.filter(c => c.status !== "rejected");
                        return (
                            <div key={job.id} className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "#e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                                <div className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                                    onClick={() => setExpanded(isExpanded ? null : job.id)}>
                                    <span className={`px-2.5 py-0.5 rounded text-xs font-bold tracking-wider ${job.status === "active" ? "text-green-600 bg-green-50" : "text-gray-400 bg-gray-100"}`}>
                                        {t(`common.status_labels.${job.status}`).toUpperCase()} {job.status === "active" ? "●" : ""}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-outfit font-semibold" style={{ fontSize: 15, color: "#111827" }}>{job.title}</p>
                                        <p className="flex items-center gap-4 mt-0.5 flex-wrap">
                                            <span className="flex items-center gap-1" style={{ fontSize: 12, color: "#6b7280" }}><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                                            <span className="flex items-center gap-1" style={{ fontSize: 12, color: "#6b7280" }}><Briefcase className="w-3.5 h-3.5" /> {job.wage}</span>
                                            <span className="flex items-center gap-1" style={{ fontSize: 12, color: "#6b7280" }}><Users className="w-3.5 h-3.5" /> {t('employer.activeCandidatesCount', { count: visibleCandidates.length })}</span>
                                            <span style={{ fontSize: 12, color: "#9ca3af" }}>{t('employer.filledCount', { filled: job.filled, total: job.total })}</span>
                                        </p>
                                    </div>
                                    <span style={{ fontSize: 12, color: "#9ca3af" }}>{t('common.posted', { time: job.posted })}</span>
                                    <div className="flex items-center gap-2">
                                        <div className="flex -space-x-2 mr-2">
                                            {useWorkerStore.getState().workers
                                                .filter(w => w.category === job.category)
                                                .slice(0, 3)
                                                .map(w => (
                                                    <div key={w.id} className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm" style={{ background: w.color }}>
                                                        {w.name[0]}
                                                    </div>
                                                ))}
                                            {useWorkerStore.getState().workers.filter(w => w.category === job.category).length > 3 && (
                                                <div className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-500 bg-gray-100 shadow-sm">
                                                    +{useWorkerStore.getState().workers.filter(w => w.category === job.category).length - 3}
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setExpanded(isExpanded ? null : job.id); }}
                                            className="px-3 py-1.5 rounded-lg font-dmsans font-semibold transition-all hover:bg-orange-50"
                                            style={{ fontSize: 12, border: "1px solid #fed7ca", color: "#e85d26" }}
                                        >
                                            {t('employer.viewMatchingWorkers')}
                                        </button>
                                        <button className="px-3 py-1.5 rounded-lg font-dmsans font-semibold" style={{ fontSize: 12, background: "#eff6ff", color: "#2563eb" }}>{t('common.manage')}</button>
                                    </div>
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#f3f4f6" }}>
                                        {isExpanded ? <ChevronUp className="w-4 h-4" style={{ color: "#6b7280" }} /> : <ChevronDown className="w-4 h-4" style={{ color: "#6b7280" }} />}
                                    </div>
                                </div>

                                {isExpanded && (
                                    <div className="border-t" style={{ background: "#f8fafc", borderColor: "#f3f4f6" }}>
                                        {/* Discovery Header */}
                                        <div className="px-5 py-4 flex items-center justify-between bg-white border-b" style={{ borderColor: "#f3f4f6" }}>
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                                                    <Star className="w-4 h-4 text-orange-600 fill-orange-600" />
                                                </div>
                                                <div>
                                                    <p className="font-outfit font-bold" style={{ fontSize: 14, color: "#111827" }}>{t('employer.suggestedMatches')}</p>
                                                    <p style={{ fontSize: 11, color: "#9ca3af" }}>{t('employer.suggestedMatchesDesc', { category: job.category })}</p>
                                                </div>
                                            </div>
                                            <span className="text-[11px] font-bold text-green-600 px-2 py-0.5 bg-green-50 rounded">{t('employer.autoMatchActive')}</span>
                                        </div>

                                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {useWorkerStore.getState().workers
                                                .filter(w => w.category === job.category)
                                                .map(w => {
                                                    const alreadyApplied = job.candidates.some(c => c.id === w.id);
                                                    return (
                                                        <div key={w.id} className="bg-white rounded-xl border p-3 flex items-center gap-3 shadow-sm border-gray-100">
                                                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0" style={{ background: w.color }}>{w.name[0]}</div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="font-dmsans font-bold truncate" style={{ fontSize: 13, color: "#111827" }}>{w.name}</p>
                                                                <div className="flex items-center gap-1.5">
                                                                    <span className="flex items-center gap-0.5 text-[11px] font-bold text-orange-500"><Star className="w-3 h-3 fill-orange-500" /> {w.rating}</span>
                                                                    <span style={{ fontSize: 11, color: "#9ca3af" }}>• {w.exp}</span>
                                                                    <span className="text-[10px] font-bold text-blue-600 px-1.5 py-0.5 bg-blue-50 rounded">{t('common.matchPercentage', { percentage: 98 })}</span>
                                                                </div>
                                                            </div>
                                                            {alreadyApplied ? (
                                                                <span className="text-[11px] font-bold text-green-600 px-2 py-1 bg-green-50 rounded">{t('common.applied')}</span>
                                                            ) : (
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        const cand = {
                                                                            id: w.id,
                                                                            name: w.name,
                                                                            init: w.name[0],
                                                                            color: w.color,
                                                                            rating: w.rating,
                                                                            exp: w.exp,
                                                                            verified: w.verified,
                                                                            bid: `₹${w.daily_rate}/day`,
                                                                            excerpt: w.bio,
                                                                            status: "pending" as const
                                                                        };
                                                                        useAppDataStore.getState().addCandidate(job.id, cand);
                                                                    }}
                                                                    className="px-3 py-1.5 bg-gray-900 text-white rounded-lg font-bold text-[11px] transition-all hover:scale-105 active:scale-95"
                                                                >
                                                                    {t('employer.inviteToApply')}
                                                                </button>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                        </div>

                                        <div className="px-5 py-4">
                                            <p className="font-dmsans font-bold tracking-widest mb-3" style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase" }}>
                                                {t('employer.currentApplicants', { count: visibleCandidates.length })}
                                            </p>
                                            {visibleCandidates.length === 0 ? (
                                                <div className="text-center py-6 rounded-xl border border-dashed" style={{ borderColor: "#e5e7eb" }}>
                                                    <p style={{ fontSize: 14, color: "#6b7280" }}>{t('employer.noActiveApplicants')}</p>
                                                </div>
                                            ) : (
                                                <div className="space-y-3">
                                                    {visibleCandidates.map((c) => (
                                                        <div key={c.id} className="bg-white rounded-xl border p-4 flex items-start gap-4" style={{ borderColor: "#e5e7eb" }}>
                                                            <div className="w-10 h-10 rounded-full flex items-center justify-center font-outfit font-bold text-white text-sm shrink-0" style={{ background: c.color }}>{c.init}</div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center gap-2 flex-wrap">
                                                                    <span className="font-dmsans font-bold" style={{ fontSize: 14, color: "#111827" }}>{c.name}</span>
                                                                    {c.isTopMatch && (
                                                                        <span className="flex items-center gap-1 text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">
                                                                            <Award className="w-3 h-3" /> {t('common.topMatch').toUpperCase()}
                                                                        </span>
                                                                    )}
                                                                    <span className="flex items-center gap-0.5" style={{ fontSize: 12, color: "#6b7280" }}><Star className="w-3 h-3" style={{ color: "#f59e0b", fill: "#f59e0b" }} /> {c.rating}</span>
                                                                    <span style={{ fontSize: 12, color: "#6b7280" }}>{c.exp}</span>
                                                                    {c.verified && <span style={{ fontSize: 11, color: "#0e9f6e" }}>✓ {t('common.verified')}</span>}
                                                                </div>
                                                                <p style={{ fontSize: 12, color: "#6b7280" }} className="mt-0.5">&ldquo;{c.excerpt}&rdquo;</p>
                                                                <p className="font-dmsans font-bold mt-1" style={{ fontSize: 13, color: "#e85d26" }}>{c.bid}</p>
                                                            </div>
                                                            <div className="flex items-center gap-2 shrink-0">
                                                                {c.status === "accepted" ? (
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="flex flex-col items-end mr-2">
                                                                            <span className="px-3 py-1.5 rounded-xl font-dmsans font-bold" style={{ fontSize: 12, background: "#ecfdf5", color: "#0e9f6e" }}>{t('common.status_labels.accepted')} ✓</span>
                                                                            <span style={{ fontSize: 10, color: "#9ca3af" }} className="mt-1">{t('employer.awaitingEntryCode')}</span>
                                                                        </div>
                                                                        <button onClick={() => {
                                                                            const otp = window.prompt(t('employer.enterEntryCodePrompt'));
                                                                            if (otp) {
                                                                                if (useAppDataStore.getState().verifyCandidateOtp(job.id, c.id, otp)) {
                                                                                    useAppDataStore.getState().markWorkCompleted(job.id, c.id);
                                                                                    showToast(t('employer.verifySuccess'), "success");
                                                                                } else {
                                                                                    showToast(t('employer.invalidCode'), "error");
                                                                                }
                                                                            }
                                                                        }}
                                                                            className="px-4 py-2 rounded-xl font-dmsans font-semibold text-xs transition-all active:scale-95 hover:opacity-90 shadow-sm"
                                                                            style={{ background: "#0a2540", color: "white" }}>
                                                                            {t('employer.verifyAndComplete')}
                                                                        </button>
                                                                    </div>
                                                                ) : (
                                                                    <>
                                                                        <button onClick={() => router.push("/employer-chat")}
                                                                            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-95" style={{ background: "#efecff" }}>
                                                                            <MessageSquare className="w-4 h-4" style={{ color: "#7c3aed" }} />
                                                                        </button>
                                                                        <button onClick={() => updateCandidateStatus(job.id, c.id, "rejected")}
                                                                            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-95" style={{ background: "#fef2f2" }}>
                                                                            <XCircle className="w-4 h-4" style={{ color: "#dc2626" }} />
                                                                        </button>
                                                                        <button onClick={() => {
                                                                            updateCandidateStatus(job.id, c.id, "accepted");
                                                                            showToast(t('employer.hiringSuccess', { name: c.name }), "success");
                                                                        }}
                                                                            className="px-3 py-1.5 rounded-xl font-dmsans font-semibold text-white text-xs transition-all active:scale-95 shadow-sm" style={{ background: "#0a2540" }}>
                                                                            {t('employer.acceptAndHire')}
                                                                        </button>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ════════════════════════════════════
                TAB 2: Applications — Filterable
            ════════════════════════════════════ */}
            {tab === "applications" && (
                <div className="space-y-4">
                    <div className="flex gap-2 flex-wrap">
                        {([
                            { key: "all", label: t('employer.active'), count: activeApplications.length, color: "#374151", bg: "#f3f4f6" },
                            { key: "pending", label: t('employer.pending'), count: pendingCount, color: "#d97706", bg: "#fffbeb" },
                            { key: "accepted", label: t('employer.hired'), count: acceptedCount, color: "#0e9f6e", bg: "#ecfdf5" },
                            { key: "rejected", label: t('employer.rejected'), count: rejectedCount, color: "#dc2626", bg: "#fef2f2" },
                        ] as const).map(f => (
                            <button key={f.key} onClick={() => setAppFilter(f.key)}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl font-dmsans font-semibold text-sm transition-all"
                                style={{
                                    background: appFilter === f.key ? f.bg : "#f9fafb",
                                    color: appFilter === f.key ? f.color : "#9ca3af",
                                    border: appFilter === f.key ? `1px solid ${f.color}20` : "1px solid transparent",
                                }}>
                                {f.label}
                                <span className="px-1.5 py-0.5 rounded-full text-xs font-bold"
                                    style={{ background: appFilter === f.key ? `${f.color}15` : "#e5e7eb", color: appFilter === f.key ? f.color : "#9ca3af" }}>
                                    {f.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {filteredApps.length === 0 ? (
                        <div className="bg-white rounded-2xl border p-12 text-center" style={{ borderColor: "#e5e7eb" }}>
                            <FileText className="w-12 h-12 mx-auto mb-3" style={{ color: "#d1d5db" }} />
                            <p className="font-outfit font-bold" style={{ fontSize: 18, color: "#111827" }}>{t('employer.noApplications')}</p>
                            <p className="font-dmsans mt-1" style={{ fontSize: 14, color: "#9ca3af" }}>
                                {appFilter === "rejected" ? t('employer.rejectedCandidate') : t('employer.noApplicationsDesc')}
                            </p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "#e5e7eb" }}>
                            {filteredApps.map((app, i) => {
                                const status = app.status || "pending";
                                return (
                                    <div key={app.id}
                                        className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors"
                                        style={{
                                            borderBottom: i < filteredApps.length - 1 ? "1px solid #f3f4f6" : "none",
                                            opacity: status === "rejected" ? 0.6 : 1,
                                        }}>
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-outfit font-bold text-white text-sm shrink-0"
                                            style={{ background: app.color }}>{app.init}</div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="font-dmsans font-bold" style={{ fontSize: 14, color: "#111827" }}>{app.name}</span>
                                                {app.verified && <span style={{ fontSize: 11, color: "#0e9f6e" }}>✓ {t('common.verified')}</span>}
                                                <span className="flex items-center gap-0.5" style={{ fontSize: 12, color: "#6b7280" }}>
                                                    <Star className="w-3 h-3" style={{ color: "#f59e0b", fill: "#f59e0b" }} /> {app.rating}
                                                </span>
                                            </div>
                                            <p className="truncate" style={{ fontSize: 12, color: "#6b7280" }}>
                                                {t('employer.appliedFor')} <span className="font-semibold" style={{ color: "#374151" }}>{app.jobTitle}</span> · {app.exp}
                                            </p>
                                        </div>
                                        <span className="font-dmsans font-bold shrink-0" style={{ fontSize: 13, color: "#e85d26" }}>{app.bid}</span>
                                        <div className="flex items-center gap-2 shrink-0">
                                            {status === "accepted" ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="flex flex-col items-end mr-2">
                                                        <span className="px-3 py-1.5 rounded-xl font-dmsans font-bold" style={{ fontSize: 12, background: "#ecfdf5", color: "#0e9f6e" }}>{t('employer.hired')} ✓</span>
                                                        <span style={{ fontSize: 9, color: "#9ca3af" }} className="mt-1">{t('employer.handshakeRequired')}</span>
                                                    </div>
                                                    <button onClick={() => {
                                                        const otp = window.prompt(t('employer.enterEntryCodePrompt'));
                                                        if (otp) {
                                                            if (useAppDataStore.getState().verifyCandidateOtp(app.jobId, app.id, otp)) {
                                                                useAppDataStore.getState().markWorkCompleted(app.jobId, app.id);
                                                                showToast(t('employer.workerVerified'), "success");
                                                            } else {
                                                                showToast(t('employer.codeMismatch'), "error");
                                                            }
                                                        }
                                                    }}
                                                        className="px-3 py-2 rounded-xl font-dmsans font-semibold text-xs text-white transition-all active:scale-95 shadow-sm"
                                                        style={{ background: "#0a2540" }}>
                                                        {t('employer.verifyAndComplete')}
                                                    </button>
                                                </div>
                                            ) : status === "rejected" ? (
                                                <span className="px-3 py-1.5 rounded-xl font-dmsans font-bold" style={{ fontSize: 12, background: "#fef2f2", color: "#dc2626" }}>{t('employer.rejected')}</span>
                                            ) : (
                                                <>
                                                    <button onClick={() => {
                                                        updateCandidateStatus(app.jobId, app.id, "rejected");
                                                        showToast(t('employer.rejectedCandidate'), "warning");
                                                    }}
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-95" style={{ background: "#fef2f2" }}>
                                                        <XCircle className="w-4 h-4" style={{ color: "#dc2626" }} />
                                                    </button>
                                                    <button onClick={() => {
                                                        updateCandidateStatus(app.jobId, app.id, "accepted");
                                                        showToast(t('employer.hiredSuccessfully'), "success");
                                                    }}
                                                        className="px-3 py-1.5 rounded-xl font-dmsans font-semibold text-white text-xs transition-all active:scale-95 shadow-sm" style={{ background: "#0a2540" }}>
                                                        ✓ {t('employer.acceptAndHire')}
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* ════════════════════════════════════
                TAB 3: Candidates — Card grid (active only)
            ════════════════════════════════════ */}
            {tab === "candidates" && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {activeApplications.length === 0 ? (
                        <div className="col-span-full bg-white rounded-2xl border p-12 text-center" style={{ borderColor: "#e5e7eb" }}>
                            <Users className="w-12 h-12 mx-auto mb-3" style={{ color: "#d1d5db" }} />
                            <p className="font-outfit font-bold" style={{ fontSize: 18, color: "#111827" }}>{t('employer.noActiveCandidates')}</p>
                            <p className="font-dmsans mt-1" style={{ fontSize: 14, color: "#9ca3af" }}>{t('employer.postJobToReceiveAppsDesc')}</p>
                        </div>
                    ) : (
                        activeApplications.map((c) => {
                            const status = c.status || "pending";
                            return (
                                <div key={c.id} className="bg-white rounded-2xl border p-5 hover:shadow-md transition-all" style={{ borderColor: "#e5e7eb" }}>
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center font-outfit font-bold text-white shrink-0" style={{ background: c.color }}>{c.init}</div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="font-dmsans font-bold" style={{ fontSize: 15, color: "#111827" }}>{c.name}</span>
                                                {c.verified && <span style={{ fontSize: 11, color: "#0e9f6e" }}>✓</span>}
                                            </div>
                                            <p style={{ fontSize: 12, color: "#6b7280" }}>{c.exp}</p>
                                            <div className="flex items-center gap-1 mt-0.5">
                                                <Star className="w-3.5 h-3.5" style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                                                <span className="font-dmsans font-semibold" style={{ fontSize: 12, color: "#374151" }}>{c.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rounded-xl px-3 py-2.5 mb-3" style={{ background: "#f8fafc", border: "1px solid #f3f4f6" }}>
                                        <p className="font-dmsans italic" style={{ fontSize: 13, color: "#6b7280" }}>&ldquo;{c.excerpt}&rdquo;</p>
                                    </div>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="min-w-0">
                                            <p className="font-dmsans truncate" style={{ fontSize: 12, color: "#9ca3af" }}>{t('employer.appliedFor')}</p>
                                            <p className="font-dmsans font-semibold truncate" style={{ fontSize: 13, color: "#111827" }}>{c.jobTitle}</p>
                                        </div>
                                        <span className="font-dmsans font-bold shrink-0 ml-3" style={{ fontSize: 14, color: "#e85d26" }}>{c.bid}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {status === "accepted" ? (
                                            <button onClick={() => {
                                                const otp = window.prompt(t('employer.enterEntryCodePrompt'));
                                                if (otp) {
                                                    if (useAppDataStore.getState().verifyCandidateOtp(c.jobId, c.id, otp)) {
                                                        useAppDataStore.getState().markWorkCompleted(c.jobId, c.id);
                                                        showToast(t('employer.verifySuccess'), "success");
                                                    } else {
                                                        showToast(t('employer.invalidCode'), "error");
                                                    }
                                                }
                                            }}
                                                className="flex-1 py-2 rounded-xl text-center font-dmsans font-bold text-sm transition-all active:scale-95 shadow-sm"
                                                style={{ background: "#0a2540", color: "white" }}>
                                                ✓ {t('employer.verifyAndComplete')}
                                            </button>
                                        ) : (
                                            <>
                                                <button onClick={() => {
                                                    updateCandidateStatus(c.jobId, c.id, "rejected");
                                                    showToast(t('employer.rejectedCandidate'), "warning");
                                                }}
                                                    className="flex-1 py-2 rounded-xl font-dmsans font-semibold text-sm transition-all active:scale-95 hover:bg-red-50"
                                                    style={{ background: "#fef2f2", color: "#dc2626" }}>{t('common.status_labels.rejected')}</button>
                                                <button onClick={() => router.push("/employer-chat")}
                                                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-95 shrink-0" style={{ background: "#efecff" }}>
                                                    <MessageSquare className="w-4 h-4" style={{ color: "#7c3aed" }} />
                                                </button>
                                                <button onClick={() => {
                                                    updateCandidateStatus(c.jobId, c.id, "accepted");
                                                    showToast(t('employer.hiringSuccess', { name: c.name }), "success");
                                                }}
                                                    className="flex-1 py-2 rounded-xl font-dmsans font-semibold text-white text-sm transition-all active:scale-95 shadow-sm"
                                                    style={{ background: "#0a2540" }}>✓ {t('employer.acceptAndHire')}</button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            )}

            {/* ════════════════════════════════════
                TAB 4: History — Completed work
            ════════════════════════════════════ */}
            {tab === "history" && (
                <div className="space-y-4">
                    {history.length === 0 ? (
                        <div className="bg-white rounded-2xl border p-12 text-center" style={{ borderColor: "#e5e7eb" }}>
                            <History className="w-12 h-12 mx-auto mb-3" style={{ color: "#d1d5db" }} />
                            <p className="font-outfit font-bold" style={{ fontSize: 18, color: "#111827" }}>{t('employer.noHistoryYet')}</p>
                            <p className="font-dmsans mt-1" style={{ fontSize: 14, color: "#9ca3af" }}>
                                {t('employer.completedHiresDesc')}
                            </p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "#e5e7eb" }}>
                            {/* Table header */}
                            <div className="flex items-center gap-4 px-5 py-3 border-b" style={{ background: "#f8fafc", borderColor: "#f3f4f6" }}>
                                <span className="w-10" />
                                <span className="flex-1 font-dmsans font-bold tracking-widest" style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase" }}>{t('employer.worker')}</span>
                                <span className="w-48 font-dmsans font-bold tracking-widest" style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase" }}>{t('employer.job')}</span>
                                <span className="w-28 font-dmsans font-bold tracking-widest" style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase" }}>{t('employer.wage')}</span>
                                <span className="w-32 font-dmsans font-bold tracking-widest" style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase" }}>{t('employer.duration')}</span>
                                <span className="w-24 font-dmsans font-bold tracking-widest text-right" style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase" }}>{t('employer.status')}</span>
                            </div>

                            {history.map((h, i) => (
                                <div key={h.id}
                                    className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors"
                                    style={{ borderBottom: i < history.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                                    {/* Avatar */}
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-outfit font-bold text-white text-sm shrink-0"
                                        style={{ background: h.workerColor }}>{h.workerInit}</div>

                                    {/* Worker name */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="font-dmsans font-bold" style={{ fontSize: 14, color: "#111827" }}>{h.workerName}</span>
                                            <span className="flex items-center gap-0.5" style={{ fontSize: 12, color: "#6b7280" }}>
                                                <Star className="w-3 h-3" style={{ color: "#f59e0b", fill: "#f59e0b" }} /> {h.workerRating}
                                            </span>
                                        </div>
                                        <p style={{ fontSize: 12, color: "#9ca3af" }}>{h.workerExp}</p>
                                    </div>

                                    {/* Job */}
                                    <div className="w-48 min-w-0">
                                        <p className="font-dmsans font-semibold truncate" style={{ fontSize: 13, color: "#111827" }}>{h.jobTitle}</p>
                                        <p className="flex items-center gap-1 truncate" style={{ fontSize: 11, color: "#9ca3af" }}>
                                            <MapPin className="w-3 h-3 shrink-0" /> {h.jobLocation}
                                        </p>
                                    </div>

                                    {/* Wage */}
                                    <span className="w-28 font-dmsans font-bold" style={{ fontSize: 13, color: "#e85d26" }}>{h.wage}</span>

                                    {/* Duration */}
                                    <div className="w-32">
                                        <p className="flex items-center gap-1" style={{ fontSize: 12, color: "#6b7280" }}>
                                            <Calendar className="w-3 h-3 shrink-0" /> {h.hiredDate} — {h.completedDate}
                                        </p>
                                    </div>

                                    {/* Status */}
                                    <div className="w-24 text-right">
                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full font-dmsans font-bold"
                                            style={{ fontSize: 11, background: "#ecfdf5", color: "#0e9f6e" }}>
                                            <Award className="w-3 h-3" /> {t('employer.done')}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
