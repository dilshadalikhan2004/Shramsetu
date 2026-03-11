(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/Shramsetu-Dillu-shramsetu/src/store/useAppDataStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAppDataStore",
    ()=>useAppDataStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/zustand/esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
;
;
const useAppDataStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        jobs: [],
        history: [],
        loading: false,
        setJobs: (jobs)=>set({
                jobs
            }),
        setHistory: (history)=>set({
                history
            }),
        setLoading: (loading)=>set({
                loading
            }),
        addJob: (job)=>set({
                jobs: [
                    ...get().jobs,
                    job
                ]
            }),
        addCandidate: (jobId, candidate)=>{
            const jobs = get().jobs.map((j)=>{
                if (j.id !== jobId) return j;
                // Prevent duplicate applications for the same candidate ID
                if (j.candidates.some((c)=>c.id === candidate.id)) return j;
                return {
                    ...j,
                    candidates: [
                        ...j.candidates,
                        candidate
                    ],
                    applicants: j.applicants + 1
                };
            });
            set({
                jobs
            });
        },
        updateCandidateStatus: (jobId, candidateName, status)=>{
            const jobs = get().jobs.map((j)=>{
                if (j.id !== jobId) return j;
                let filledChange = 0;
                const updatedCandidates = j.candidates.map((c)=>{
                    if (c.name === candidateName) {
                        // If we are hiring someone who wasn't hired yet
                        if (status === 'accepted' && c.status !== 'accepted') filledChange = 1;
                        // If we are un-hiring (rejecting someone previously accepted)
                        if (status === 'rejected' && c.status === 'accepted') filledChange = -1;
                        return {
                            ...c,
                            status
                        };
                    }
                    return c;
                });
                return {
                    ...j,
                    candidates: updatedCandidates,
                    filled: Math.min(j.total, Math.max(0, j.filled + filledChange))
                };
            });
            set({
                jobs
            });
        },
        markWorkCompleted: (jobId, candidateName)=>{
            const jobs = get().jobs.map((j)=>{
                if (j.id !== jobId) return j;
                return {
                    ...j,
                    candidates: j.candidates.map((c)=>c.name === candidateName ? {
                            ...c,
                            status: 'completed'
                        } : c),
                    status: 'closed'
                };
            });
            set({
                jobs
            });
        }
    }), {
    name: 'shramsetu-app-data-v1'
}));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MyJobsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/briefcase.js [app-client] (ecmascript) <export default as Briefcase>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/history.js [app-client] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/award.js [app-client] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$store$2f$useAppDataStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/src/store/useAppDataStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const TABS = [
    {
        key: null,
        label: "My Jobs",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"]
    },
    {
        key: "applications",
        label: "Applications",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
    },
    {
        key: "candidates",
        label: "Candidates",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
    },
    {
        key: "history",
        label: "History",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"]
    }
];
function MyJobsPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const tab = searchParams.get("tab");
    const { jobs, history, updateCandidateStatus, markWorkCompleted } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$store$2f$useAppDataStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppDataStore"])();
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [appFilter, setAppFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MyJobsPage.useEffect": ()=>{
            setMounted(true);
        }
    }["MyJobsPage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MyJobsPage.useEffect": ()=>{
            if (mounted && !tab) setExpanded(jobs[0]?.id ?? null);
        }
    }["MyJobsPage.useEffect"], [
        tab,
        mounted,
        jobs
    ]);
    if (!mounted) return null;
    // ── Collect all active applications (exclude rejected from default view) ──
    const allApplications = jobs.flatMap((job)=>job.candidates.map((c)=>({
                ...c,
                jobId: job.id,
                jobTitle: job.title,
                jobLocation: job.location,
                jobWage: job.wage
            })));
    const activeApplications = allApplications.filter((a)=>a.status !== "rejected");
    const pendingCount = allApplications.filter((a)=>!a.status || a.status === "pending").length;
    const acceptedCount = allApplications.filter((a)=>a.status === "accepted").length;
    const rejectedCount = allApplications.filter((a)=>a.status === "rejected").length;
    const filteredApps = appFilter === "all" ? activeApplications : appFilter === "rejected" ? allApplications.filter((a)=>a.status === "rejected") : allApplications.filter((a)=>(a.status || "pending") === appFilter);
    const switchTab = (key)=>{
        if (key) router.push(`/my-jobs?tab=${key}`);
        else router.push("/my-jobs");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5 w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "font-outfit font-bold",
                                style: {
                                    fontSize: 28,
                                    color: "#111827"
                                },
                                children: tab === "applications" ? "Applications" : tab === "candidates" ? "Candidates" : tab === "history" ? "Hiring History" : "My Job Listings"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 58,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-dmsans mt-1",
                                style: {
                                    fontSize: 14,
                                    color: "#6b7280"
                                },
                                children: tab === "applications" ? `${pendingCount} pending · ${acceptedCount} hired · ${rejectedCount} rejected` : tab === "candidates" ? `${acceptedCount} active hires across ${jobs.length} jobs` : tab === "history" ? `${history.length} completed work records` : `${jobs.filter((j)=>j.status === "active").length} active listings`
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 61,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                        lineNumber: 57,
                        columnNumber: 17
                    }, this),
                    tab !== "history" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push("/post-job"),
                        className: "flex items-center gap-2 px-4 py-2.5 rounded-xl font-dmsans font-semibold text-white transition-all active:scale-95",
                        style: {
                            background: "#e85d26",
                            fontSize: 14
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 76,
                                columnNumber: 25
                            }, this),
                            " Post New Job"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                        lineNumber: 73,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                lineNumber: 56,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1 border-b",
                style: {
                    borderColor: "#e5e7eb"
                },
                children: TABS.map((t)=>{
                    const isActive = tab === t.key;
                    const Icon = t.icon;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>switchTab(t.key),
                        className: "flex items-center gap-2 px-4 py-3 font-dmsans font-semibold text-sm transition-all relative",
                        style: {
                            color: isActive ? "#e85d26" : "#6b7280"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 90,
                                columnNumber: 29
                            }, this),
                            t.label,
                            t.key === "history" && history.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "px-1.5 py-0.5 rounded-full text-xs font-bold",
                                style: {
                                    background: "#ecfdf5",
                                    color: "#0e9f6e"
                                },
                                children: history.length
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 93,
                                columnNumber: 33
                            }, this),
                            isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute bottom-0 left-2 right-2 h-0.5 rounded-full",
                                style: {
                                    background: "#e85d26"
                                }
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 95,
                                columnNumber: 42
                            }, this)
                        ]
                    }, t.key ?? "jobs", true, {
                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                        lineNumber: 87,
                        columnNumber: 25
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                lineNumber: 82,
                columnNumber: 13
            }, this),
            !tab && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: jobs.map((job)=>{
                    const isExpanded = expanded === job.id;
                    // Only show non-rejected candidates in the job view
                    const visibleCandidates = job.candidates.filter((c)=>c.status !== "rejected");
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl border overflow-hidden",
                        style: {
                            borderColor: "#e5e7eb",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors",
                                onClick: ()=>setExpanded(isExpanded ? null : job.id),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `px-2.5 py-0.5 rounded text-xs font-bold tracking-wider ${job.status === "active" ? "text-green-600 bg-green-50" : "text-gray-400 bg-gray-100"}`,
                                        children: [
                                            job.status.toUpperCase(),
                                            " ",
                                            job.status === "active" ? "●" : ""
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 114,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-outfit font-semibold",
                                                style: {
                                                    fontSize: 15,
                                                    color: "#111827"
                                                },
                                                children: job.title
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 118,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "flex items-center gap-4 mt-0.5 flex-wrap",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-1",
                                                        style: {
                                                            fontSize: 12,
                                                            color: "#6b7280"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                                className: "w-3.5 h-3.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                lineNumber: 120,
                                                                columnNumber: 130
                                                            }, this),
                                                            " ",
                                                            job.location
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 120,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-1",
                                                        style: {
                                                            fontSize: 12,
                                                            color: "#6b7280"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"], {
                                                                className: "w-3.5 h-3.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                lineNumber: 121,
                                                                columnNumber: 130
                                                            }, this),
                                                            " ",
                                                            job.wage
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 121,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-1",
                                                        style: {
                                                            fontSize: 12,
                                                            color: "#6b7280"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                                className: "w-3.5 h-3.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                lineNumber: 122,
                                                                columnNumber: 130
                                                            }, this),
                                                            " ",
                                                            visibleCandidates.length,
                                                            " Active"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 122,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: 12,
                                                            color: "#9ca3af"
                                                        },
                                                        children: [
                                                            job.filled,
                                                            "/",
                                                            job.total,
                                                            " Filled"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 123,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 119,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 117,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 12,
                                            color: "#9ca3af"
                                        },
                                        children: [
                                            "Posted ",
                                            job.posted
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 126,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                    const mks = [
                                                        {
                                                            name: "Rahul S.",
                                                            init: "R",
                                                            color: "#e85d26"
                                                        },
                                                        {
                                                            name: "Suresh K.",
                                                            init: "S",
                                                            color: "#0a2540"
                                                        },
                                                        {
                                                            name: "Amit B.",
                                                            init: "A",
                                                            color: "#2563eb"
                                                        }
                                                    ];
                                                    mks.forEach((m, idx)=>{
                                                        const cand = {
                                                            id: `mock-${m.name}-${Date.now()}-${idx}`,
                                                            name: m.name,
                                                            init: m.init,
                                                            color: m.color,
                                                            rating: 4.5 + Math.random() * 0.5,
                                                            exp: "3+ years",
                                                            verified: true,
                                                            bid: job.wage,
                                                            excerpt: "I am a skilled worker looking for opportunities. I can start immediately.",
                                                            status: "pending"
                                                        };
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$store$2f$useAppDataStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppDataStore"].getState().addCandidate(job.id, cand);
                                                    });
                                                },
                                                className: "px-3 py-1.5 rounded-lg font-dmsans font-semibold",
                                                style: {
                                                    fontSize: 12,
                                                    border: "1px solid #e5e7eb",
                                                    color: "#6b7280"
                                                },
                                                children: "Simulate Applicants"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 128,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "px-3 py-1.5 rounded-lg font-dmsans font-semibold",
                                                style: {
                                                    fontSize: 12,
                                                    background: "#eff6ff",
                                                    color: "#2563eb"
                                                },
                                                children: "Manage"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 157,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 127,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 rounded-lg flex items-center justify-center",
                                        style: {
                                            background: "#f3f4f6"
                                        },
                                        children: isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                            className: "w-4 h-4",
                                            style: {
                                                color: "#6b7280"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                            lineNumber: 160,
                                            columnNumber: 55
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                            className: "w-4 h-4",
                                            style: {
                                                color: "#6b7280"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                            lineNumber: 160,
                                            columnNumber: 120
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 159,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 112,
                                columnNumber: 33
                            }, this),
                            isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-t px-5 py-4",
                                style: {
                                    background: "#f8fafc",
                                    borderColor: "#f3f4f6"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-dmsans font-bold tracking-widest mb-3",
                                        style: {
                                            fontSize: 11,
                                            color: "#9ca3af",
                                            textTransform: "uppercase"
                                        },
                                        children: [
                                            "Active Applicants (",
                                            visibleCandidates.length,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 166,
                                        columnNumber: 41
                                    }, this),
                                    visibleCandidates.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center py-6 rounded-xl border border-dashed",
                                        style: {
                                            borderColor: "#e5e7eb"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 14,
                                                color: "#6b7280"
                                            },
                                            children: "No active applicants for this job."
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                            lineNumber: 171,
                                            columnNumber: 49
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 170,
                                        columnNumber: 45
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3",
                                        children: visibleCandidates.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-white rounded-xl border p-4 flex items-start gap-4",
                                                style: {
                                                    borderColor: "#e5e7eb"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-10 h-10 rounded-full flex items-center justify-center font-outfit font-bold text-white text-sm shrink-0",
                                                        style: {
                                                            background: c.color
                                                        },
                                                        children: c.init
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 177,
                                                        columnNumber: 57
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 flex-wrap",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-dmsans font-bold",
                                                                        style: {
                                                                            fontSize: 14,
                                                                            color: "#111827"
                                                                        },
                                                                        children: c.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                        lineNumber: 180,
                                                                        columnNumber: 65
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "flex items-center gap-0.5",
                                                                        style: {
                                                                            fontSize: 12,
                                                                            color: "#6b7280"
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                                                className: "w-3 h-3",
                                                                                style: {
                                                                                    color: "#f59e0b",
                                                                                    fill: "#f59e0b"
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                                lineNumber: 181,
                                                                                columnNumber: 152
                                                                            }, this),
                                                                            " ",
                                                                            c.rating
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                        lineNumber: 181,
                                                                        columnNumber: 65
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontSize: 12,
                                                                            color: "#6b7280"
                                                                        },
                                                                        children: c.exp
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                        lineNumber: 182,
                                                                        columnNumber: 65
                                                                    }, this),
                                                                    c.verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontSize: 11,
                                                                            color: "#0e9f6e"
                                                                        },
                                                                        children: "✓ Verified"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                        lineNumber: 183,
                                                                        columnNumber: 80
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                lineNumber: 179,
                                                                columnNumber: 61
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: 12,
                                                                    color: "#6b7280"
                                                                },
                                                                className: "mt-0.5",
                                                                children: [
                                                                    "“",
                                                                    c.excerpt,
                                                                    "”"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                lineNumber: 185,
                                                                columnNumber: 61
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-dmsans font-bold mt-1",
                                                                style: {
                                                                    fontSize: 13,
                                                                    color: "#e85d26"
                                                                },
                                                                children: c.bid
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                lineNumber: 186,
                                                                columnNumber: 61
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 178,
                                                        columnNumber: 57
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 shrink-0",
                                                        children: c.status === "accepted" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "px-3 py-1.5 rounded-xl font-dmsans font-bold",
                                                                    style: {
                                                                        fontSize: 12,
                                                                        background: "#ecfdf5",
                                                                        color: "#0e9f6e"
                                                                    },
                                                                    children: "Hired ✓"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                    lineNumber: 191,
                                                                    columnNumber: 69
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>markWorkCompleted(job.id, c.name),
                                                                    className: "px-3 py-1.5 rounded-xl font-dmsans font-semibold text-xs transition-all active:scale-95 hover:opacity-90",
                                                                    style: {
                                                                        background: "#0a2540",
                                                                        color: "white"
                                                                    },
                                                                    children: "Mark Complete"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                    lineNumber: 192,
                                                                    columnNumber: 69
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                            lineNumber: 190,
                                                            columnNumber: 65
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>router.push("/employer-chat"),
                                                                    className: "w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-95",
                                                                    style: {
                                                                        background: "#fff1eb"
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                                        className: "w-4 h-4",
                                                                        style: {
                                                                            color: "#e85d26"
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                        lineNumber: 202,
                                                                        columnNumber: 73
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                    lineNumber: 200,
                                                                    columnNumber: 69
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>updateCandidateStatus(job.id, c.name, "rejected"),
                                                                    className: "w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-95",
                                                                    style: {
                                                                        background: "#fef2f2"
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                                        className: "w-4 h-4",
                                                                        style: {
                                                                            color: "#dc2626"
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                        lineNumber: 206,
                                                                        columnNumber: 73
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                    lineNumber: 204,
                                                                    columnNumber: 69
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>updateCandidateStatus(job.id, c.name, "accepted"),
                                                                    className: "px-3 py-1.5 rounded-xl font-dmsans font-semibold text-white text-xs transition-all active:scale-95",
                                                                    style: {
                                                                        background: "#0a2540"
                                                                    },
                                                                    children: "✓ Accept & Hire"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                    lineNumber: 208,
                                                                    columnNumber: 69
                                                                }, this)
                                                            ]
                                                        }, void 0, true)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 188,
                                                        columnNumber: 57
                                                    }, this)
                                                ]
                                            }, c.id, true, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 176,
                                                columnNumber: 53
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 174,
                                        columnNumber: 45
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 165,
                                columnNumber: 37
                            }, this)
                        ]
                    }, job.id, true, {
                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                        lineNumber: 111,
                        columnNumber: 29
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                lineNumber: 105,
                columnNumber: 17
            }, this),
            tab === "applications" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 flex-wrap",
                        children: [
                            {
                                key: "all",
                                label: "Active",
                                count: activeApplications.length,
                                color: "#374151",
                                bg: "#f3f4f6"
                            },
                            {
                                key: "pending",
                                label: "Pending",
                                count: pendingCount,
                                color: "#d97706",
                                bg: "#fffbeb"
                            },
                            {
                                key: "accepted",
                                label: "Hired",
                                count: acceptedCount,
                                color: "#0e9f6e",
                                bg: "#ecfdf5"
                            },
                            {
                                key: "rejected",
                                label: "Rejected",
                                count: rejectedCount,
                                color: "#dc2626",
                                bg: "#fef2f2"
                            }
                        ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setAppFilter(f.key),
                                className: "flex items-center gap-2 px-4 py-2 rounded-xl font-dmsans font-semibold text-sm transition-all",
                                style: {
                                    background: appFilter === f.key ? f.bg : "#f9fafb",
                                    color: appFilter === f.key ? f.color : "#9ca3af",
                                    border: appFilter === f.key ? `1px solid ${f.color}20` : "1px solid transparent"
                                },
                                children: [
                                    f.label,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "px-1.5 py-0.5 rounded-full text-xs font-bold",
                                        style: {
                                            background: appFilter === f.key ? `${f.color}15` : "#e5e7eb",
                                            color: appFilter === f.key ? f.color : "#9ca3af"
                                        },
                                        children: f.count
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 247,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, f.key, true, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 239,
                                columnNumber: 29
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                        lineNumber: 232,
                        columnNumber: 21
                    }, this),
                    filteredApps.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl border p-12 text-center",
                        style: {
                            borderColor: "#e5e7eb"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                className: "w-12 h-12 mx-auto mb-3",
                                style: {
                                    color: "#d1d5db"
                                }
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 257,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-outfit font-bold",
                                style: {
                                    fontSize: 18,
                                    color: "#111827"
                                },
                                children: "No applications"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 258,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-dmsans mt-1",
                                style: {
                                    fontSize: 14,
                                    color: "#9ca3af"
                                },
                                children: appFilter === "rejected" ? "Rejected candidates will appear here." : "No applications match this filter."
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 259,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                        lineNumber: 256,
                        columnNumber: 25
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl border overflow-hidden",
                        style: {
                            borderColor: "#e5e7eb"
                        },
                        children: filteredApps.map((app, i)=>{
                            const status = app.status || "pending";
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors",
                                style: {
                                    borderBottom: i < filteredApps.length - 1 ? "1px solid #f3f4f6" : "none",
                                    opacity: status === "rejected" ? 0.6 : 1
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-10 h-10 rounded-full flex items-center justify-center font-outfit font-bold text-white text-sm shrink-0",
                                        style: {
                                            background: app.color
                                        },
                                        children: app.init
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 274,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-dmsans font-bold",
                                                        style: {
                                                            fontSize: 14,
                                                            color: "#111827"
                                                        },
                                                        children: app.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 278,
                                                        columnNumber: 49
                                                    }, this),
                                                    app.verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: 11,
                                                            color: "#0e9f6e"
                                                        },
                                                        children: "✓ Verified"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 279,
                                                        columnNumber: 66
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-0.5",
                                                        style: {
                                                            fontSize: 12,
                                                            color: "#6b7280"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                                className: "w-3 h-3",
                                                                style: {
                                                                    color: "#f59e0b",
                                                                    fill: "#f59e0b"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                lineNumber: 281,
                                                                columnNumber: 53
                                                            }, this),
                                                            " ",
                                                            app.rating
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 280,
                                                        columnNumber: 49
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 277,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "truncate",
                                                style: {
                                                    fontSize: 12,
                                                    color: "#6b7280"
                                                },
                                                children: [
                                                    "Applied for ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold",
                                                        style: {
                                                            color: "#374151"
                                                        },
                                                        children: app.jobTitle
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 285,
                                                        columnNumber: 61
                                                    }, this),
                                                    " · ",
                                                    app.exp
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 284,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 276,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-dmsans font-bold shrink-0",
                                        style: {
                                            fontSize: 13,
                                            color: "#e85d26"
                                        },
                                        children: app.bid
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 288,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 shrink-0",
                                        children: status === "accepted" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-3 py-1.5 rounded-xl font-dmsans font-bold",
                                                    style: {
                                                        fontSize: 12,
                                                        background: "#ecfdf5",
                                                        color: "#0e9f6e"
                                                    },
                                                    children: "Hired ✓"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                    lineNumber: 292,
                                                    columnNumber: 53
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>markWorkCompleted(app.jobId, app.name),
                                                    className: "px-3 py-1.5 rounded-xl font-dmsans font-semibold text-xs text-white transition-all active:scale-95",
                                                    style: {
                                                        background: "#0a2540"
                                                    },
                                                    children: "Mark Complete"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                    lineNumber: 293,
                                                    columnNumber: 53
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                            lineNumber: 291,
                                            columnNumber: 49
                                        }, this) : status === "rejected" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "px-3 py-1.5 rounded-xl font-dmsans font-bold",
                                            style: {
                                                fontSize: 12,
                                                background: "#fef2f2",
                                                color: "#dc2626"
                                            },
                                            children: "Rejected"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                            lineNumber: 300,
                                            columnNumber: 49
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>updateCandidateStatus(app.jobId, app.name, "rejected"),
                                                    className: "w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-95",
                                                    style: {
                                                        background: "#fef2f2"
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                        className: "w-4 h-4",
                                                        style: {
                                                            color: "#dc2626"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 305,
                                                        columnNumber: 57
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                    lineNumber: 303,
                                                    columnNumber: 53
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>updateCandidateStatus(app.jobId, app.name, "accepted"),
                                                    className: "px-3 py-1.5 rounded-xl font-dmsans font-semibold text-white text-xs transition-all active:scale-95",
                                                    style: {
                                                        background: "#0a2540"
                                                    },
                                                    children: "✓ Hire"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                    lineNumber: 307,
                                                    columnNumber: 53
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 289,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, app.id, true, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 268,
                                columnNumber: 37
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                        lineNumber: 264,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                lineNumber: 231,
                columnNumber: 17
            }, this),
            tab === "candidates" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",
                children: activeApplications.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "col-span-full bg-white rounded-2xl border p-12 text-center",
                    style: {
                        borderColor: "#e5e7eb"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                            className: "w-12 h-12 mx-auto mb-3",
                            style: {
                                color: "#d1d5db"
                            }
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                            lineNumber: 329,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-outfit font-bold",
                            style: {
                                fontSize: 18,
                                color: "#111827"
                            },
                            children: "No active candidates"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                            lineNumber: 330,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-dmsans mt-1",
                            style: {
                                fontSize: 14,
                                color: "#9ca3af"
                            },
                            children: "Post a job to start receiving applications."
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                            lineNumber: 331,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                    lineNumber: 328,
                    columnNumber: 25
                }, this) : activeApplications.map((c)=>{
                    const status = c.status || "pending";
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl border p-5 hover:shadow-md transition-all",
                        style: {
                            borderColor: "#e5e7eb"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-3 mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-12 h-12 rounded-full flex items-center justify-center font-outfit font-bold text-white shrink-0",
                                        style: {
                                            background: c.color
                                        },
                                        children: c.init
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 339,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-dmsans font-bold",
                                                        style: {
                                                            fontSize: 15,
                                                            color: "#111827"
                                                        },
                                                        children: c.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 342,
                                                        columnNumber: 49
                                                    }, this),
                                                    c.verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: 11,
                                                            color: "#0e9f6e"
                                                        },
                                                        children: "✓"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 343,
                                                        columnNumber: 64
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 341,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 12,
                                                    color: "#6b7280"
                                                },
                                                children: c.exp
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 345,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1 mt-0.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                        className: "w-3.5 h-3.5",
                                                        style: {
                                                            color: "#f59e0b",
                                                            fill: "#f59e0b"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 347,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-dmsans font-semibold",
                                                        style: {
                                                            fontSize: 12,
                                                            color: "#374151"
                                                        },
                                                        children: c.rating
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 348,
                                                        columnNumber: 49
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 346,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 340,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 338,
                                columnNumber: 37
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl px-3 py-2.5 mb-3",
                                style: {
                                    background: "#f8fafc",
                                    border: "1px solid #f3f4f6"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-dmsans italic",
                                    style: {
                                        fontSize: 13,
                                        color: "#6b7280"
                                    },
                                    children: [
                                        "“",
                                        c.excerpt,
                                        "”"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                    lineNumber: 353,
                                    columnNumber: 41
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 352,
                                columnNumber: 37
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-dmsans truncate",
                                                style: {
                                                    fontSize: 12,
                                                    color: "#9ca3af"
                                                },
                                                children: "Applied for"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 357,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-dmsans font-semibold truncate",
                                                style: {
                                                    fontSize: 13,
                                                    color: "#111827"
                                                },
                                                children: c.jobTitle
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 358,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 356,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-dmsans font-bold shrink-0 ml-3",
                                        style: {
                                            fontSize: 14,
                                            color: "#e85d26"
                                        },
                                        children: c.bid
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 360,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 355,
                                columnNumber: 37
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: status === "accepted" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>markWorkCompleted(c.jobId, c.name),
                                    className: "flex-1 py-2 rounded-xl text-center font-dmsans font-bold text-sm transition-all active:scale-95",
                                    style: {
                                        background: "#0a2540",
                                        color: "white"
                                    },
                                    children: "✓ Mark Complete"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                    lineNumber: 364,
                                    columnNumber: 45
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>updateCandidateStatus(c.jobId, c.name, "rejected"),
                                            className: "flex-1 py-2 rounded-xl font-dmsans font-semibold text-sm transition-all active:scale-95 hover:bg-red-50",
                                            style: {
                                                background: "#fef2f2",
                                                color: "#dc2626"
                                            },
                                            children: "Reject"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                            lineNumber: 371,
                                            columnNumber: 49
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>router.push("/employer-chat"),
                                            className: "w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-95",
                                            style: {
                                                background: "#fff1eb"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                className: "w-4 h-4",
                                                style: {
                                                    color: "#e85d26"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 376,
                                                columnNumber: 53
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                            lineNumber: 374,
                                            columnNumber: 49
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>updateCandidateStatus(c.jobId, c.name, "accepted"),
                                            className: "flex-1 py-2 rounded-xl font-dmsans font-semibold text-white text-sm transition-all active:scale-95",
                                            style: {
                                                background: "#0a2540"
                                            },
                                            children: "✓ Hire"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                            lineNumber: 378,
                                            columnNumber: 49
                                        }, this)
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 362,
                                columnNumber: 37
                            }, this)
                        ]
                    }, c.id, true, {
                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                        lineNumber: 337,
                        columnNumber: 33
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                lineNumber: 326,
                columnNumber: 17
            }, this),
            tab === "history" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: history.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-2xl border p-12 text-center",
                    style: {
                        borderColor: "#e5e7eb"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                            className: "w-12 h-12 mx-auto mb-3",
                            style: {
                                color: "#d1d5db"
                            }
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                            lineNumber: 398,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-outfit font-bold",
                            style: {
                                fontSize: 18,
                                color: "#111827"
                            },
                            children: "No history yet"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                            lineNumber: 399,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-dmsans mt-1",
                            style: {
                                fontSize: 14,
                                color: "#9ca3af"
                            },
                            children: "Completed hires will appear here as a record."
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                            lineNumber: 400,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                    lineNumber: 397,
                    columnNumber: 25
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-2xl border overflow-hidden",
                    style: {
                        borderColor: "#e5e7eb"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4 px-5 py-3 border-b",
                            style: {
                                background: "#f8fafc",
                                borderColor: "#f3f4f6"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-10"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                    lineNumber: 408,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex-1 font-dmsans font-bold tracking-widest",
                                    style: {
                                        fontSize: 11,
                                        color: "#9ca3af",
                                        textTransform: "uppercase"
                                    },
                                    children: "Worker"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                    lineNumber: 409,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-48 font-dmsans font-bold tracking-widest",
                                    style: {
                                        fontSize: 11,
                                        color: "#9ca3af",
                                        textTransform: "uppercase"
                                    },
                                    children: "Job"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                    lineNumber: 410,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-28 font-dmsans font-bold tracking-widest",
                                    style: {
                                        fontSize: 11,
                                        color: "#9ca3af",
                                        textTransform: "uppercase"
                                    },
                                    children: "Wage"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                    lineNumber: 411,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-32 font-dmsans font-bold tracking-widest",
                                    style: {
                                        fontSize: 11,
                                        color: "#9ca3af",
                                        textTransform: "uppercase"
                                    },
                                    children: "Duration"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                    lineNumber: 412,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-24 font-dmsans font-bold tracking-widest text-right",
                                    style: {
                                        fontSize: 11,
                                        color: "#9ca3af",
                                        textTransform: "uppercase"
                                    },
                                    children: "Status"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                    lineNumber: 413,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                            lineNumber: 407,
                            columnNumber: 29
                        }, this),
                        history.map((h, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors",
                                style: {
                                    borderBottom: i < history.length - 1 ? "1px solid #f3f4f6" : "none"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-10 h-10 rounded-full flex items-center justify-center font-outfit font-bold text-white text-sm shrink-0",
                                        style: {
                                            background: h.workerColor
                                        },
                                        children: h.workerInit
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 421,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-dmsans font-bold",
                                                        style: {
                                                            fontSize: 14,
                                                            color: "#111827"
                                                        },
                                                        children: h.workerName
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 427,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-0.5",
                                                        style: {
                                                            fontSize: 12,
                                                            color: "#6b7280"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                                className: "w-3 h-3",
                                                                style: {
                                                                    color: "#f59e0b",
                                                                    fill: "#f59e0b"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                lineNumber: 429,
                                                                columnNumber: 49
                                                            }, this),
                                                            " ",
                                                            h.workerRating
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 428,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 426,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 12,
                                                    color: "#9ca3af"
                                                },
                                                children: h.workerExp
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 432,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 425,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-48 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-dmsans font-semibold truncate",
                                                style: {
                                                    fontSize: 13,
                                                    color: "#111827"
                                                },
                                                children: h.jobTitle
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 437,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "flex items-center gap-1 truncate",
                                                style: {
                                                    fontSize: 11,
                                                    color: "#9ca3af"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                        className: "w-3 h-3 shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 439,
                                                        columnNumber: 45
                                                    }, this),
                                                    " ",
                                                    h.jobLocation
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 438,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 436,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-28 font-dmsans font-bold",
                                        style: {
                                            fontSize: 13,
                                            color: "#e85d26"
                                        },
                                        children: h.wage
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 444,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-32",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "flex items-center gap-1",
                                            style: {
                                                fontSize: 12,
                                                color: "#6b7280"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                    className: "w-3 h-3 shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                    lineNumber: 449,
                                                    columnNumber: 45
                                                }, this),
                                                " ",
                                                h.hiredDate,
                                                " — ",
                                                h.completedDate
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                            lineNumber: 448,
                                            columnNumber: 41
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 447,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-24 text-right",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex items-center gap-1 px-3 py-1 rounded-full font-dmsans font-bold",
                                            style: {
                                                fontSize: 11,
                                                background: "#ecfdf5",
                                                color: "#0e9f6e"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                                                    className: "w-3 h-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                    lineNumber: 457,
                                                    columnNumber: 45
                                                }, this),
                                                " Done"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                            lineNumber: 455,
                                            columnNumber: 41
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 454,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, h.id, true, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 417,
                                columnNumber: 33
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                    lineNumber: 405,
                    columnNumber: 25
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                lineNumber: 395,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
        lineNumber: 54,
        columnNumber: 9
    }, this);
}
_s(MyJobsPage, "PFq5+df3Msq06Os4+L6E5XXM3D0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$store$2f$useAppDataStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppDataStore"]
    ];
});
_c = MyJobsPage;
var _c;
__turbopack_context__.k.register(_c, "MyJobsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Downloads_Shramsetu-Dillu-shramsetu_src_16998b32._.js.map