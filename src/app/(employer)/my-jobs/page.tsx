"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    ChevronUp, ChevronDown, MapPin, Briefcase, Users, Plus, Star,
    CheckCircle2, XCircle, MessageSquare, Clock, Filter, UserCheck,
    FileText, Calendar, History, Award,
} from "lucide-react";
import { useAppDataStore } from "@/store/useAppDataStore";

const TABS = [
    { key: null, label: "My Jobs", icon: Briefcase },
    { key: "applications", label: "Applications", icon: FileText },
    { key: "candidates", label: "Candidates", icon: Users },
    { key: "history", label: "History", icon: History },
];

export default function MyJobsPage() {
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
                        {tab === "applications" ? "Applications" : tab === "candidates" ? "Candidates" : tab === "history" ? "Hiring History" : "My Job Listings"}
                    </h1>
                    <p className="font-dmsans mt-1" style={{ fontSize: 14, color: "#6b7280" }}>
                        {tab === "applications"
                            ? `${pendingCount} pending · ${acceptedCount} hired · ${rejectedCount} rejected`
                            : tab === "candidates"
                                ? `${acceptedCount} active hires across ${jobs.length} jobs`
                                : tab === "history"
                                    ? `${history.length} completed work records`
                                    : `${jobs.filter(j => j.status === "active").length} active listings`
                        }
                    </p>
                </div>
                {tab !== "history" && (
                    <button onClick={() => router.push("/post-job")}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-dmsans font-semibold text-white transition-all active:scale-95"
                        style={{ background: "#e85d26", fontSize: 14 }}>
                        <Plus className="w-4 h-4" /> Post New Job
                    </button>
                )}
            </div>

            {/* Tab Bar */}
            <div className="flex gap-1 border-b" style={{ borderColor: "#e5e7eb" }}>
                {TABS.map(t => {
                    const isActive = tab === t.key;
                    const Icon = t.icon;
                    return (
                        <button key={t.key ?? "jobs"} onClick={() => switchTab(t.key)}
                            className="flex items-center gap-2 px-4 py-3 font-dmsans font-semibold text-sm transition-all relative"
                            style={{ color: isActive ? "#e85d26" : "#6b7280" }}>
                            <Icon className="w-4 h-4" />
                            {t.label}
                            {t.key === "history" && history.length > 0 && (
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
                                        {job.status.toUpperCase()} {job.status === "active" ? "●" : ""}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-outfit font-semibold" style={{ fontSize: 15, color: "#111827" }}>{job.title}</p>
                                        <p className="flex items-center gap-4 mt-0.5 flex-wrap">
                                            <span className="flex items-center gap-1" style={{ fontSize: 12, color: "#6b7280" }}><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                                            <span className="flex items-center gap-1" style={{ fontSize: 12, color: "#6b7280" }}><Briefcase className="w-3.5 h-3.5" /> {job.wage}</span>
                                            <span className="flex items-center gap-1" style={{ fontSize: 12, color: "#6b7280" }}><Users className="w-3.5 h-3.5" /> {visibleCandidates.length} Active</span>
                                            <span style={{ fontSize: 12, color: "#9ca3af" }}>{job.filled}/{job.total} Filled</span>
                                        </p>
                                    </div>
                                    <span style={{ fontSize: 12, color: "#9ca3af" }}>Posted {job.posted}</span>
                                    <button className="px-3 py-1.5 rounded-lg font-dmsans font-semibold" style={{ fontSize: 12, background: "#eff6ff", color: "#2563eb" }}>Manage</button>
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#f3f4f6" }}>
                                        {isExpanded ? <ChevronUp className="w-4 h-4" style={{ color: "#6b7280" }} /> : <ChevronDown className="w-4 h-4" style={{ color: "#6b7280" }} />}
                                    </div>
                                </div>

                                {isExpanded && (
                                    <div className="border-t px-5 py-4" style={{ background: "#f8fafc", borderColor: "#f3f4f6" }}>
                                        <p className="font-dmsans font-bold tracking-widest mb-3" style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase" }}>
                                            Active Applicants ({visibleCandidates.length})
                                        </p>
                                        {visibleCandidates.length === 0 ? (
                                            <div className="text-center py-6 rounded-xl border border-dashed" style={{ borderColor: "#e5e7eb" }}>
                                                <p style={{ fontSize: 14, color: "#6b7280" }}>No active applicants for this job.</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                {visibleCandidates.map((c) => (
                                                    <div key={c.name} className="bg-white rounded-xl border p-4 flex items-start gap-4" style={{ borderColor: "#e5e7eb" }}>
                                                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-outfit font-bold text-white text-sm shrink-0" style={{ background: c.color }}>{c.init}</div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 flex-wrap">
                                                                <span className="font-dmsans font-bold" style={{ fontSize: 14, color: "#111827" }}>{c.name}</span>
                                                                <span className="flex items-center gap-0.5" style={{ fontSize: 12, color: "#6b7280" }}><Star className="w-3 h-3" style={{ color: "#f59e0b", fill: "#f59e0b" }} /> {c.rating}</span>
                                                                <span style={{ fontSize: 12, color: "#6b7280" }}>{c.exp}</span>
                                                                {c.verified && <span style={{ fontSize: 11, color: "#0e9f6e" }}>✓ Verified</span>}
                                                            </div>
                                                            <p style={{ fontSize: 12, color: "#6b7280" }} className="mt-0.5">&ldquo;{c.excerpt}&rdquo;</p>
                                                            <p className="font-dmsans font-bold mt-1" style={{ fontSize: 13, color: "#e85d26" }}>{c.bid}</p>
                                                        </div>
                                                        <div className="flex items-center gap-2 shrink-0">
                                                            {c.status === "accepted" ? (
                                                                <div className="flex items-center gap-2">
                                                                    <span className="px-3 py-1.5 rounded-xl font-dmsans font-bold" style={{ fontSize: 12, background: "#ecfdf5", color: "#0e9f6e" }}>Hired ✓</span>
                                                                    <button onClick={() => markWorkCompleted(job.id, c.name)}
                                                                        className="px-3 py-1.5 rounded-xl font-dmsans font-semibold text-xs transition-all active:scale-95 hover:opacity-90"
                                                                        style={{ background: "#0a2540", color: "white" }}>
                                                                        Mark Complete
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <button onClick={() => router.push("/employer-chat")}
                                                                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-95" style={{ background: "#fff1eb" }}>
                                                                        <MessageSquare className="w-4 h-4" style={{ color: "#e85d26" }} />
                                                                    </button>
                                                                    <button onClick={() => updateCandidateStatus(job.id, c.name, "rejected")}
                                                                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-95" style={{ background: "#fef2f2" }}>
                                                                        <XCircle className="w-4 h-4" style={{ color: "#dc2626" }} />
                                                                    </button>
                                                                    <button onClick={() => updateCandidateStatus(job.id, c.name, "accepted")}
                                                                        className="px-3 py-1.5 rounded-xl font-dmsans font-semibold text-white text-xs transition-all active:scale-95" style={{ background: "#0a2540" }}>
                                                                        ✓ Accept & Hire
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
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
                            { key: "all", label: "Active", count: activeApplications.length, color: "#374151", bg: "#f3f4f6" },
                            { key: "pending", label: "Pending", count: pendingCount, color: "#d97706", bg: "#fffbeb" },
                            { key: "accepted", label: "Hired", count: acceptedCount, color: "#0e9f6e", bg: "#ecfdf5" },
                            { key: "rejected", label: "Rejected", count: rejectedCount, color: "#dc2626", bg: "#fef2f2" },
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
                            <p className="font-outfit font-bold" style={{ fontSize: 18, color: "#111827" }}>No applications</p>
                            <p className="font-dmsans mt-1" style={{ fontSize: 14, color: "#9ca3af" }}>
                                {appFilter === "rejected" ? "Rejected candidates will appear here." : "No applications match this filter."}
                            </p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "#e5e7eb" }}>
                            {filteredApps.map((app, i) => {
                                const status = app.status || "pending";
                                return (
                                    <div key={`${app.jobId}-${app.name}`}
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
                                                {app.verified && <span style={{ fontSize: 11, color: "#0e9f6e" }}>✓ Verified</span>}
                                                <span className="flex items-center gap-0.5" style={{ fontSize: 12, color: "#6b7280" }}>
                                                    <Star className="w-3 h-3" style={{ color: "#f59e0b", fill: "#f59e0b" }} /> {app.rating}
                                                </span>
                                            </div>
                                            <p className="truncate" style={{ fontSize: 12, color: "#6b7280" }}>
                                                Applied for <span className="font-semibold" style={{ color: "#374151" }}>{app.jobTitle}</span> · {app.exp}
                                            </p>
                                        </div>
                                        <span className="font-dmsans font-bold shrink-0" style={{ fontSize: 13, color: "#e85d26" }}>{app.bid}</span>
                                        <div className="flex items-center gap-2 shrink-0">
                                            {status === "accepted" ? (
                                                <div className="flex items-center gap-2">
                                                    <span className="px-3 py-1.5 rounded-xl font-dmsans font-bold" style={{ fontSize: 12, background: "#ecfdf5", color: "#0e9f6e" }}>Hired ✓</span>
                                                    <button onClick={() => markWorkCompleted(app.jobId, app.name)}
                                                        className="px-3 py-1.5 rounded-xl font-dmsans font-semibold text-xs text-white transition-all active:scale-95"
                                                        style={{ background: "#0a2540" }}>
                                                        Mark Complete
                                                    </button>
                                                </div>
                                            ) : status === "rejected" ? (
                                                <span className="px-3 py-1.5 rounded-xl font-dmsans font-bold" style={{ fontSize: 12, background: "#fef2f2", color: "#dc2626" }}>Rejected</span>
                                            ) : (
                                                <>
                                                    <button onClick={() => updateCandidateStatus(app.jobId, app.name, "rejected")}
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-95" style={{ background: "#fef2f2" }}>
                                                        <XCircle className="w-4 h-4" style={{ color: "#dc2626" }} />
                                                    </button>
                                                    <button onClick={() => updateCandidateStatus(app.jobId, app.name, "accepted")}
                                                        className="px-3 py-1.5 rounded-xl font-dmsans font-semibold text-white text-xs transition-all active:scale-95" style={{ background: "#0a2540" }}>
                                                        ✓ Hire
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
                            <p className="font-outfit font-bold" style={{ fontSize: 18, color: "#111827" }}>No active candidates</p>
                            <p className="font-dmsans mt-1" style={{ fontSize: 14, color: "#9ca3af" }}>Post a job to start receiving applications.</p>
                        </div>
                    ) : (
                        activeApplications.map((c) => {
                            const status = c.status || "pending";
                            return (
                                <div key={`${c.jobId}-${c.name}`} className="bg-white rounded-2xl border p-5 hover:shadow-md transition-all" style={{ borderColor: "#e5e7eb" }}>
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
                                            <p className="font-dmsans truncate" style={{ fontSize: 12, color: "#9ca3af" }}>Applied for</p>
                                            <p className="font-dmsans font-semibold truncate" style={{ fontSize: 13, color: "#111827" }}>{c.jobTitle}</p>
                                        </div>
                                        <span className="font-dmsans font-bold shrink-0 ml-3" style={{ fontSize: 14, color: "#e85d26" }}>{c.bid}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {status === "accepted" ? (
                                            <button onClick={() => markWorkCompleted(c.jobId, c.name)}
                                                className="flex-1 py-2 rounded-xl text-center font-dmsans font-bold text-sm transition-all active:scale-95"
                                                style={{ background: "#0a2540", color: "white" }}>
                                                ✓ Mark Complete
                                            </button>
                                        ) : (
                                            <>
                                                <button onClick={() => updateCandidateStatus(c.jobId, c.name, "rejected")}
                                                    className="flex-1 py-2 rounded-xl font-dmsans font-semibold text-sm transition-all active:scale-95 hover:bg-red-50"
                                                    style={{ background: "#fef2f2", color: "#dc2626" }}>Reject</button>
                                                <button onClick={() => router.push("/employer-chat")}
                                                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-95" style={{ background: "#fff1eb" }}>
                                                    <MessageSquare className="w-4 h-4" style={{ color: "#e85d26" }} />
                                                </button>
                                                <button onClick={() => updateCandidateStatus(c.jobId, c.name, "accepted")}
                                                    className="flex-1 py-2 rounded-xl font-dmsans font-semibold text-white text-sm transition-all active:scale-95"
                                                    style={{ background: "#0a2540" }}>✓ Hire</button>
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
                            <p className="font-outfit font-bold" style={{ fontSize: 18, color: "#111827" }}>No history yet</p>
                            <p className="font-dmsans mt-1" style={{ fontSize: 14, color: "#9ca3af" }}>
                                Completed hires will appear here as a record.
                            </p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "#e5e7eb" }}>
                            {/* Table header */}
                            <div className="flex items-center gap-4 px-5 py-3 border-b" style={{ background: "#f8fafc", borderColor: "#f3f4f6" }}>
                                <span className="w-10" />
                                <span className="flex-1 font-dmsans font-bold tracking-widest" style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase" }}>Worker</span>
                                <span className="w-48 font-dmsans font-bold tracking-widest" style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase" }}>Job</span>
                                <span className="w-28 font-dmsans font-bold tracking-widest" style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase" }}>Wage</span>
                                <span className="w-32 font-dmsans font-bold tracking-widest" style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase" }}>Duration</span>
                                <span className="w-24 font-dmsans font-bold tracking-widest text-right" style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase" }}>Status</span>
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
                                            <Award className="w-3 h-3" /> Done
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
