module.exports = [
"[project]/Downloads/Shramsetu-Dillu-shramsetu/src/store/useAppDataStore.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAppDataStore",
    ()=>useAppDataStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/zustand/esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
;
;
const INITIAL_JOBS = [
    {
        id: "seed-1",
        title: "Senior Brick Mason",
        location: "Mumbai",
        city: "Mumbai",
        wage: "₹950/day",
        daily_rate: 950,
        category: "Mason",
        description: "Looking for an experienced brick mason for a large residential project. Must have 5+ years of experience.",
        skills_required: [
            "Bricklaying",
            "Blueprint Reading",
            "Site Safety"
        ],
        status: "active",
        posted: "2 hours ago",
        applicants: 2,
        filled: 0,
        total: 5,
        employer_id: "employer-tata",
        employer_name: "Tata Projects",
        employer_verified: true,
        is_urgent: true,
        duration: "3 months",
        perks: [
            "🍱 Food Provided",
            "🚌 Transport"
        ],
        candidates: []
    },
    {
        id: "seed-2",
        title: "Industrial Plumber",
        location: "Delhi",
        city: "Delhi",
        wage: "₹800/day",
        daily_rate: 800,
        category: "Plumber",
        description: "Requires experts for industrial pipe-fitting and maintenance.",
        skills_required: [
            "Pipe Fitting",
            "Welding"
        ],
        status: "active",
        posted: "5 hours ago",
        applicants: 1,
        filled: 0,
        total: 2,
        employer_id: "employer-lt",
        employer_name: "L&T Construction",
        employer_verified: true,
        is_urgent: false,
        duration: "1 month",
        perks: [
            "🦺 Safety Equipment"
        ],
        candidates: []
    }
];
const useAppDataStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        jobs: INITIAL_JOBS,
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
                if (j.candidates.some((c)=>c.id === candidate.id)) return j;
                // Logic: Auto-flag as top match if rating and experience are high
                const isTopMatch = candidate.rating >= 4.7 || parseInt(candidate.exp) >= 5;
                return {
                    ...j,
                    candidates: [
                        ...j.candidates,
                        {
                            ...candidate,
                            isTopMatch
                        }
                    ],
                    applicants: j.applicants + 1
                };
            });
            set({
                jobs
            });
        },
        updateCandidateStatus: (jobId, candidateId, status)=>{
            const jobs = get().jobs.map((j)=>{
                if (j.id !== jobId) return j;
                let filledChange = 0;
                const updatedCandidates = j.candidates.map((c)=>{
                    if (c.id === candidateId) {
                        // If we are hiring, generate a 4-digit OTP handshake
                        let otp = c.otp;
                        if (status === 'accepted' && c.status !== 'accepted') {
                            filledChange = 1;
                            otp = Math.floor(1000 + Math.random() * 9000).toString();
                        }
                        if (status === 'rejected' && c.status === 'accepted') filledChange = -1;
                        return {
                            ...c,
                            status,
                            otp
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
        verifyCandidateOtp: (jobId, candidateId, otp)=>{
            const job = get().jobs.find((j)=>j.id === jobId);
            if (!job) return false;
            const candidate = job.candidates.find((c)=>c.id === candidateId);
            if (!candidate) return false;
            return candidate.otp === otp;
        },
        markWorkCompleted: (jobId, candidateId)=>{
            const jobs = get().jobs.map((j)=>{
                if (j.id !== jobId) return j;
                const candidate = j.candidates.find((c)=>c.id === candidateId);
                if (!candidate) return j;
                // Move to history
                const newHistory = {
                    id: `hist-${Date.now()}`,
                    jobTitle: j.title,
                    jobLocation: j.location,
                    wage: j.wage,
                    workerName: candidate.name,
                    workerInit: candidate.init,
                    workerColor: candidate.color,
                    workerRating: candidate.rating,
                    workerExp: candidate.exp,
                    hiredDate: new Date().toLocaleDateString(),
                    completedDate: new Date().toLocaleDateString(),
                    status: 'completed'
                };
                set({
                    history: [
                        ...get().history,
                        newHistory
                    ]
                });
                // Update candidate status and possibly close the job
                const updatedCandidates = j.candidates.map((c)=>c.id === candidateId ? {
                        ...c,
                        status: 'completed'
                    } : c);
                return {
                    ...j,
                    candidates: updatedCandidates,
                    status: j.filled >= j.total ? 'closed' : 'active'
                };
            });
            set({
                jobs
            });
        }
    }), {
    name: 'shramsetu-app-data-v1'
}));
}),
"[project]/Downloads/Shramsetu-Dillu-shramsetu/src/store/useWorkerStore.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWorkerStore",
    ()=>useWorkerStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/zustand/esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
;
;
// Initial mock "Real" workers for the marketplace
const INITIAL_WORKERS = [
    {
        id: "w-1",
        name: "Arjun Sharma",
        category: "Construction",
        skills: [
            "Bricklaying",
            "Site Safety",
            "Masonry"
        ],
        location: "Delhi",
        rating: 4.8,
        exp: "5 years",
        daily_rate: 900,
        verified: true,
        bio: "Specialist in high-rise construction and structural masonry.",
        color: "#0a2540"
    },
    {
        id: "w-2",
        name: "Vikram Singh",
        category: "Plumbing",
        skills: [
            "Pipe Fitting",
            "Welding"
        ],
        location: "Mumbai",
        rating: 4.6,
        exp: "3 years",
        daily_rate: 850,
        verified: true,
        bio: "Expert in industrial plumbing and leak detection.",
        color: "#e85d26"
    },
    {
        id: "w-3",
        name: "Karan Verma",
        category: "Electrical",
        skills: [
            "Electrical Wiring",
            "Blueprint Reading"
        ],
        location: "Bangalore",
        rating: 4.9,
        exp: "7 years",
        daily_rate: 1100,
        verified: true,
        bio: "Master electrician with focus on residential complex wiring.",
        color: "#2563eb"
    },
    {
        id: "w-4",
        name: "Priya Devi",
        category: "Painting",
        skills: [
            "Interior Painting",
            "Wall Texturing"
        ],
        location: "Pune",
        rating: 4.7,
        exp: "4 years",
        daily_rate: 750,
        verified: false,
        bio: "Creative painter specializing in modern textures and finishes.",
        color: "#7c3aed"
    },
    {
        id: "w-5",
        name: "Sanjay Kumar",
        category: "Logistics",
        skills: [
            "Forklift Operation",
            "Inventory Management"
        ],
        location: "Chennai",
        rating: 4.5,
        exp: "2 years",
        daily_rate: 650,
        verified: true,
        bio: "Hardworking logistics professional with quick turnaround time.",
        color: "#059669"
    }
];
const useWorkerStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set)=>({
        workers: INITIAL_WORKERS,
        addWorker: (worker)=>set((state)=>({
                    workers: [
                        ...state.workers,
                        worker
                    ]
                }))
    }), {
    name: 'shramsetu-workers-v1'
}));
}),
"[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MyJobsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/briefcase.js [app-ssr] (ecmascript) <export default as Briefcase>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/star.js [app-ssr] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-ssr] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/calendar.js [app-ssr] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/history.js [app-ssr] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/award.js [app-ssr] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$store$2f$useAppDataStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/src/store/useAppDataStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$store$2f$useWorkerStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/src/store/useWorkerStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$components$2f$ui$2f$animations$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/src/components/ui/animations.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$lib$2f$i18n$2f$TranslationProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/src/lib/i18n/TranslationProvider.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
const TABS = [
    {
        key: null,
        label: "My Jobs",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"]
    },
    {
        key: "applications",
        label: "Applications",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
    },
    {
        key: "candidates",
        label: "Candidates",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
    },
    {
        key: "history",
        label: "History",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"]
    }
];
function MyJobsPage() {
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$lib$2f$i18n$2f$TranslationProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const tab = searchParams.get("tab");
    const { jobs, history, updateCandidateStatus, markWorkCompleted } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$store$2f$useAppDataStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppDataStore"])();
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [appFilter, setAppFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("all");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (mounted && !tab) setExpanded(jobs[0]?.id ?? null);
    }, [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5 w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "font-outfit font-bold",
                                style: {
                                    fontSize: 28,
                                    color: "#111827"
                                },
                                children: tab === "applications" ? t('common.applications') : tab === "candidates" ? t('employer.candidates') : tab === "history" ? t('employer.hiringHistory') : t('employer.myJobListings')
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 62,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-dmsans mt-1",
                                style: {
                                    fontSize: 14,
                                    color: "#6b7280"
                                },
                                children: tab === "applications" ? t('employer.applicationSummary', {
                                    pending: pendingCount,
                                    hired: acceptedCount,
                                    rejected: rejectedCount
                                }) : tab === "candidates" ? t('employer.activeHiresSummary', {
                                    count: acceptedCount,
                                    jobsCount: jobs.length
                                }) : tab === "history" ? t('employer.completedWorkRecordsSummary', {
                                    count: history.length
                                }) : t('employer.activeListingsSummary', {
                                    count: jobs.filter((j)=>j.status === "active").length
                                })
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 65,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                        lineNumber: 61,
                        columnNumber: 17
                    }, this),
                    tab !== "history" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.push("/post-job"),
                        className: "flex items-center gap-2 px-4 py-2.5 rounded-xl font-dmsans font-semibold text-white transition-all active:scale-95",
                        style: {
                            background: "#e85d26",
                            fontSize: 14
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 80,
                                columnNumber: 25
                            }, this),
                            " ",
                            t('employer.postNewJob')
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                        lineNumber: 77,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                lineNumber: 60,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1 border-b",
                style: {
                    borderColor: "#e5e7eb"
                },
                children: TABS.map((tItem)=>{
                    const isActive = tab === tItem.key;
                    const Icon = tItem.icon;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>switchTab(tItem.key),
                        className: "flex items-center gap-2 px-4 py-3 font-dmsans font-semibold text-sm transition-all relative",
                        style: {
                            color: isActive ? "#e85d26" : "#6b7280"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 94,
                                columnNumber: 29
                            }, this),
                            tItem.label,
                            tItem.key === "history" && history.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "px-1.5 py-0.5 rounded-full text-xs font-bold",
                                style: {
                                    background: "#ecfdf5",
                                    color: "#0e9f6e"
                                },
                                children: history.length
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 97,
                                columnNumber: 33
                            }, this),
                            isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute bottom-0 left-2 right-2 h-0.5 rounded-full",
                                style: {
                                    background: "#e85d26"
                                }
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 99,
                                columnNumber: 42
                            }, this)
                        ]
                    }, tItem.key ?? "jobs", true, {
                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                        lineNumber: 91,
                        columnNumber: 25
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                lineNumber: 86,
                columnNumber: 13
            }, this),
            !tab && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: jobs.map((job)=>{
                    const isExpanded = expanded === job.id;
                    // Only show non-rejected candidates in the job view
                    const visibleCandidates = job.candidates.filter((c)=>c.status !== "rejected");
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl border overflow-hidden",
                        style: {
                            borderColor: "#e5e7eb",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors",
                                onClick: ()=>setExpanded(isExpanded ? null : job.id),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `px-2.5 py-0.5 rounded text-xs font-bold tracking-wider ${job.status === "active" ? "text-green-600 bg-green-50" : "text-gray-400 bg-gray-100"}`,
                                        children: [
                                            job.status.toUpperCase(),
                                            " ",
                                            job.status === "active" ? "●" : ""
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 118,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-outfit font-semibold",
                                                style: {
                                                    fontSize: 15,
                                                    color: "#111827"
                                                },
                                                children: job.title
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 122,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "flex items-center gap-4 mt-0.5 flex-wrap",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-1",
                                                        style: {
                                                            fontSize: 12,
                                                            color: "#6b7280"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                                className: "w-3.5 h-3.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                lineNumber: 124,
                                                                columnNumber: 130
                                                            }, this),
                                                            " ",
                                                            job.location
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 124,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-1",
                                                        style: {
                                                            fontSize: 12,
                                                            color: "#6b7280"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"], {
                                                                className: "w-3.5 h-3.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                lineNumber: 125,
                                                                columnNumber: 130
                                                            }, this),
                                                            " ",
                                                            job.wage
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 125,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-1",
                                                        style: {
                                                            fontSize: 12,
                                                            color: "#6b7280"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                                className: "w-3.5 h-3.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                lineNumber: 126,
                                                                columnNumber: 130
                                                            }, this),
                                                            " ",
                                                            visibleCandidates.length,
                                                            " Active"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 126,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                        lineNumber: 127,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 123,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 121,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                        lineNumber: 130,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex -space-x-2 mr-2",
                                                children: [
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$store$2f$useWorkerStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWorkerStore"].getState().workers.filter((w)=>w.category === job.category).slice(0, 3).map((w)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm",
                                                            style: {
                                                                background: w.color
                                                            },
                                                            children: w.name[0]
                                                        }, w.id, false, {
                                                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                            lineNumber: 137,
                                                            columnNumber: 53
                                                        }, this)),
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$store$2f$useWorkerStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWorkerStore"].getState().workers.filter((w)=>w.category === job.category).length > 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-500 bg-gray-100 shadow-sm",
                                                        children: [
                                                            "+",
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$store$2f$useWorkerStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWorkerStore"].getState().workers.filter((w)=>w.category === job.category).length - 3
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 142,
                                                        columnNumber: 49
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 132,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                    setExpanded(isExpanded ? null : job.id);
                                                },
                                                className: "px-3 py-1.5 rounded-lg font-dmsans font-semibold transition-all hover:bg-orange-50",
                                                style: {
                                                    fontSize: 12,
                                                    border: "1px solid #fed7ca",
                                                    color: "#e85d26"
                                                },
                                                children: "View Matching Workers"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 147,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "px-3 py-1.5 rounded-lg font-dmsans font-semibold",
                                                style: {
                                                    fontSize: 12,
                                                    background: "#eff6ff",
                                                    color: "#2563eb"
                                                },
                                                children: "Manage"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 154,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 131,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 rounded-lg flex items-center justify-center",
                                        style: {
                                            background: "#f3f4f6"
                                        },
                                        children: isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                            className: "w-4 h-4",
                                            style: {
                                                color: "#6b7280"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                            lineNumber: 157,
                                            columnNumber: 55
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                            className: "w-4 h-4",
                                            style: {
                                                color: "#6b7280"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                            lineNumber: 157,
                                            columnNumber: 120
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 156,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 116,
                                columnNumber: 33
                            }, this),
                            isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-t",
                                style: {
                                    background: "#f8fafc",
                                    borderColor: "#f3f4f6"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-5 py-4 flex items-center justify-between bg-white border-b",
                                        style: {
                                            borderColor: "#f3f4f6"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                            className: "w-4 h-4 text-orange-600 fill-orange-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                            lineNumber: 167,
                                                            columnNumber: 53
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 166,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-outfit font-bold",
                                                                style: {
                                                                    fontSize: 14,
                                                                    color: "#111827"
                                                                },
                                                                children: "Suggested Matches"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                lineNumber: 170,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: 11,
                                                                    color: "#9ca3af"
                                                                },
                                                                children: [
                                                                    'Workers in your area matching "',
                                                                    job.category,
                                                                    '"'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                lineNumber: 171,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 169,
                                                        columnNumber: 49
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 165,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11px] font-bold text-green-600 px-2 py-0.5 bg-green-50 rounded",
                                                children: "AUTO-MATCH ACTIVE"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 174,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 164,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 grid grid-cols-1 md:grid-cols-2 gap-3",
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$store$2f$useWorkerStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWorkerStore"].getState().workers.filter((w)=>w.category === job.category).map((w)=>{
                                            const alreadyApplied = job.candidates.some((c)=>c.id === w.id);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-white rounded-xl border p-3 flex items-center gap-3 shadow-sm border-gray-100",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0",
                                                        style: {
                                                            background: w.color
                                                        },
                                                        children: w.name[0]
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 184,
                                                        columnNumber: 61
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-dmsans font-bold truncate",
                                                                style: {
                                                                    fontSize: 13,
                                                                    color: "#111827"
                                                                },
                                                                children: w.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                lineNumber: 186,
                                                                columnNumber: 65
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1.5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "flex items-center gap-0.5 text-[11px] font-bold text-orange-500",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                                                className: "w-3 h-3 fill-orange-500"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                                lineNumber: 188,
                                                                                columnNumber: 151
                                                                            }, this),
                                                                            " ",
                                                                            w.rating
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                        lineNumber: 188,
                                                                        columnNumber: 69
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontSize: 11,
                                                                            color: "#9ca3af"
                                                                        },
                                                                        children: [
                                                                            "• ",
                                                                            w.exp
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                        lineNumber: 189,
                                                                        columnNumber: 69
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[10px] font-bold text-blue-600 px-1.5 py-0.5 bg-blue-50 rounded",
                                                                        children: "98% Match"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                        lineNumber: 190,
                                                                        columnNumber: 69
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                lineNumber: 187,
                                                                columnNumber: 65
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 185,
                                                        columnNumber: 61
                                                    }, this),
                                                    alreadyApplied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[11px] font-bold text-green-600 px-2 py-1 bg-green-50 rounded",
                                                        children: "Applied"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 194,
                                                        columnNumber: 65
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: (e)=>{
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
                                                                status: "pending"
                                                            };
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$store$2f$useAppDataStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppDataStore"].getState().addCandidate(job.id, cand);
                                                        },
                                                        className: "px-3 py-1.5 bg-gray-900 text-white rounded-lg font-bold text-[11px] transition-all hover:scale-105 active:scale-95",
                                                        children: "Invite to Apply"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 196,
                                                        columnNumber: 65
                                                    }, this)
                                                ]
                                            }, w.id, true, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 183,
                                                columnNumber: 57
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 177,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-5 py-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-dmsans font-bold tracking-widest mb-3",
                                                style: {
                                                    fontSize: 11,
                                                    color: "#9ca3af",
                                                    textTransform: "uppercase"
                                                },
                                                children: [
                                                    "Current Applicants (",
                                                    visibleCandidates.length,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 224,
                                                columnNumber: 45
                                            }, this),
                                            visibleCandidates.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-center py-6 rounded-xl border border-dashed",
                                                style: {
                                                    borderColor: "#e5e7eb"
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontSize: 14,
                                                        color: "#6b7280"
                                                    },
                                                    children: "No active applicants for this job."
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                    lineNumber: 229,
                                                    columnNumber: 53
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 228,
                                                columnNumber: 49
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3",
                                                children: visibleCandidates.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-white rounded-xl border p-4 flex items-start gap-4",
                                                        style: {
                                                            borderColor: "#e5e7eb"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-10 h-10 rounded-full flex items-center justify-center font-outfit font-bold text-white text-sm shrink-0",
                                                                style: {
                                                                    background: c.color
                                                                },
                                                                children: c.init
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                lineNumber: 235,
                                                                columnNumber: 61
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1 min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2 flex-wrap",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "font-dmsans font-bold",
                                                                                style: {
                                                                                    fontSize: 14,
                                                                                    color: "#111827"
                                                                                },
                                                                                children: c.name
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                                lineNumber: 238,
                                                                                columnNumber: 69
                                                                            }, this),
                                                                            c.isTopMatch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "flex items-center gap-1 text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                                                                                        className: "w-3 h-3"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                                        lineNumber: 241,
                                                                                        columnNumber: 77
                                                                                    }, this),
                                                                                    " TOP MATCH"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                                lineNumber: 240,
                                                                                columnNumber: 73
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "flex items-center gap-0.5",
                                                                                style: {
                                                                                    fontSize: 12,
                                                                                    color: "#6b7280"
                                                                                },
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                                                        className: "w-3 h-3",
                                                                                        style: {
                                                                                            color: "#f59e0b",
                                                                                            fill: "#f59e0b"
                                                                                        }
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                                        lineNumber: 244,
                                                                                        columnNumber: 156
                                                                                    }, this),
                                                                                    " ",
                                                                                    c.rating
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                                lineNumber: 244,
                                                                                columnNumber: 69
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                style: {
                                                                                    fontSize: 12,
                                                                                    color: "#6b7280"
                                                                                },
                                                                                children: c.exp
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                                lineNumber: 245,
                                                                                columnNumber: 69
                                                                            }, this),
                                                                            c.verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                style: {
                                                                                    fontSize: 11,
                                                                                    color: "#0e9f6e"
                                                                                },
                                                                                children: "✓ Verified"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                                lineNumber: 246,
                                                                                columnNumber: 84
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                        lineNumber: 237,
                                                                        columnNumber: 65
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                                                        lineNumber: 248,
                                                                        columnNumber: 65
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-dmsans font-bold mt-1",
                                                                        style: {
                                                                            fontSize: 13,
                                                                            color: "#e85d26"
                                                                        },
                                                                        children: c.bid
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                        lineNumber: 249,
                                                                        columnNumber: 65
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                lineNumber: 236,
                                                                columnNumber: 61
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 shrink-0",
                                                                children: c.status === "accepted" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex flex-col items-end mr-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "px-3 py-1.5 rounded-xl font-dmsans font-bold",
                                                                                    style: {
                                                                                        fontSize: 12,
                                                                                        background: "#ecfdf5",
                                                                                        color: "#0e9f6e"
                                                                                    },
                                                                                    children: "Hired ✓"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                                    lineNumber: 255,
                                                                                    columnNumber: 77
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    style: {
                                                                                        fontSize: 10,
                                                                                        color: "#9ca3af"
                                                                                    },
                                                                                    className: "mt-1",
                                                                                    children: "Awaiting Entry Code"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                                    lineNumber: 256,
                                                                                    columnNumber: 77
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                            lineNumber: 254,
                                                                            columnNumber: 73
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>{
                                                                                const otp = window.prompt("Enter worker's unique 4-digit Entry Code to verify arrival:");
                                                                                if (otp) {
                                                                                    if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$store$2f$useAppDataStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppDataStore"].getState().verifyCandidateOtp(job.id, c.id, otp)) {
                                                                                        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$store$2f$useAppDataStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppDataStore"].getState().markWorkCompleted(job.id, c.id);
                                                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$components$2f$ui$2f$animations$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["showToast"])("Work Verification Successful!", "success");
                                                                                    } else {
                                                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$components$2f$ui$2f$animations$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["showToast"])("Invalid Code. Please ask the worker for the correct code.", "error");
                                                                                    }
                                                                                }
                                                                            },
                                                                            className: "px-4 py-2 rounded-xl font-dmsans font-semibold text-xs transition-all active:scale-95 hover:opacity-90 shadow-sm",
                                                                            style: {
                                                                                background: "#0a2540",
                                                                                color: "white"
                                                                            },
                                                                            children: "Verify & Complete"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                            lineNumber: 258,
                                                                            columnNumber: 73
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                    lineNumber: 253,
                                                                    columnNumber: 69
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>router.push("/employer-chat"),
                                                                            className: "w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-95",
                                                                            style: {
                                                                                background: "#efecff"
                                                                            },
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                                                className: "w-4 h-4",
                                                                                style: {
                                                                                    color: "#7c3aed"
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                                lineNumber: 278,
                                                                                columnNumber: 77
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                            lineNumber: 276,
                                                                            columnNumber: 73
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>updateCandidateStatus(job.id, c.id, "rejected"),
                                                                            className: "w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-95",
                                                                            style: {
                                                                                background: "#fef2f2"
                                                                            },
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                                                className: "w-4 h-4",
                                                                                style: {
                                                                                    color: "#dc2626"
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                                lineNumber: 282,
                                                                                columnNumber: 77
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                            lineNumber: 280,
                                                                            columnNumber: 73
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>{
                                                                                updateCandidateStatus(job.id, c.id, "accepted");
                                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$components$2f$ui$2f$animations$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["showToast"])(`Hiring ${c.name} successful!`, "success");
                                                                            },
                                                                            className: "px-3 py-1.5 rounded-xl font-dmsans font-semibold text-white text-xs transition-all active:scale-95 shadow-sm",
                                                                            style: {
                                                                                background: "#0a2540"
                                                                            },
                                                                            children: "Accept & Hire"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                            lineNumber: 284,
                                                                            columnNumber: 73
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                lineNumber: 251,
                                                                columnNumber: 61
                                                            }, this)
                                                        ]
                                                    }, c.id, true, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 234,
                                                        columnNumber: 57
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 232,
                                                columnNumber: 49
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 223,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 162,
                                columnNumber: 37
                            }, this)
                        ]
                    }, job.id, true, {
                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                        lineNumber: 115,
                        columnNumber: 29
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                lineNumber: 109,
                columnNumber: 17
            }, this),
            tab === "applications" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setAppFilter(f.key),
                                className: "flex items-center gap-2 px-4 py-2 rounded-xl font-dmsans font-semibold text-sm transition-all",
                                style: {
                                    background: appFilter === f.key ? f.bg : "#f9fafb",
                                    color: appFilter === f.key ? f.color : "#9ca3af",
                                    border: appFilter === f.key ? `1px solid ${f.color}20` : "1px solid transparent"
                                },
                                children: [
                                    f.label,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "px-1.5 py-0.5 rounded-full text-xs font-bold",
                                        style: {
                                            background: appFilter === f.key ? `${f.color}15` : "#e5e7eb",
                                            color: appFilter === f.key ? f.color : "#9ca3af"
                                        },
                                        children: f.count
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 327,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, f.key, true, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 319,
                                columnNumber: 29
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                        lineNumber: 312,
                        columnNumber: 21
                    }, this),
                    filteredApps.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl border p-12 text-center",
                        style: {
                            borderColor: "#e5e7eb"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                className: "w-12 h-12 mx-auto mb-3",
                                style: {
                                    color: "#d1d5db"
                                }
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 337,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-outfit font-bold",
                                style: {
                                    fontSize: 18,
                                    color: "#111827"
                                },
                                children: "No applications"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 338,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-dmsans mt-1",
                                style: {
                                    fontSize: 14,
                                    color: "#9ca3af"
                                },
                                children: appFilter === "rejected" ? "Rejected candidates will appear here." : "No applications match this filter."
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 339,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                        lineNumber: 336,
                        columnNumber: 25
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl border overflow-hidden",
                        style: {
                            borderColor: "#e5e7eb"
                        },
                        children: filteredApps.map((app, i)=>{
                            const status = app.status || "pending";
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors",
                                style: {
                                    borderBottom: i < filteredApps.length - 1 ? "1px solid #f3f4f6" : "none",
                                    opacity: status === "rejected" ? 0.6 : 1
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-10 h-10 rounded-full flex items-center justify-center font-outfit font-bold text-white text-sm shrink-0",
                                        style: {
                                            background: app.color
                                        },
                                        children: app.init
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 354,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-dmsans font-bold",
                                                        style: {
                                                            fontSize: 14,
                                                            color: "#111827"
                                                        },
                                                        children: app.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 358,
                                                        columnNumber: 49
                                                    }, this),
                                                    app.verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: 11,
                                                            color: "#0e9f6e"
                                                        },
                                                        children: "✓ Verified"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 359,
                                                        columnNumber: 66
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-0.5",
                                                        style: {
                                                            fontSize: 12,
                                                            color: "#6b7280"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                                className: "w-3 h-3",
                                                                style: {
                                                                    color: "#f59e0b",
                                                                    fill: "#f59e0b"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                lineNumber: 361,
                                                                columnNumber: 53
                                                            }, this),
                                                            " ",
                                                            app.rating
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 360,
                                                        columnNumber: 49
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 357,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "truncate",
                                                style: {
                                                    fontSize: 12,
                                                    color: "#6b7280"
                                                },
                                                children: [
                                                    "Applied for ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold",
                                                        style: {
                                                            color: "#374151"
                                                        },
                                                        children: app.jobTitle
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 365,
                                                        columnNumber: 61
                                                    }, this),
                                                    " · ",
                                                    app.exp
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 364,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 356,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-dmsans font-bold shrink-0",
                                        style: {
                                            fontSize: 13,
                                            color: "#e85d26"
                                        },
                                        children: app.bid
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 368,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 shrink-0",
                                        children: status === "accepted" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col items-end mr-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "px-3 py-1.5 rounded-xl font-dmsans font-bold",
                                                            style: {
                                                                fontSize: 12,
                                                                background: "#ecfdf5",
                                                                color: "#0e9f6e"
                                                            },
                                                            children: "Hired ✓"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                            lineNumber: 373,
                                                            columnNumber: 57
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: 9,
                                                                color: "#9ca3af"
                                                            },
                                                            className: "mt-1",
                                                            children: "Handshake Req."
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                            lineNumber: 374,
                                                            columnNumber: 57
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                    lineNumber: 372,
                                                    columnNumber: 53
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        const otp = window.prompt("Enter worker's unique 4-digit Entry Code:");
                                                        if (otp) {
                                                            if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$store$2f$useAppDataStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppDataStore"].getState().verifyCandidateOtp(app.jobId, app.id, otp)) {
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$store$2f$useAppDataStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppDataStore"].getState().markWorkCompleted(app.jobId, app.id);
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$components$2f$ui$2f$animations$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["showToast"])("Worker Verified!", "success");
                                                            } else {
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$components$2f$ui$2f$animations$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["showToast"])("Code Mismatch!", "error");
                                                            }
                                                        }
                                                    },
                                                    className: "px-3 py-2 rounded-xl font-dmsans font-semibold text-xs text-white transition-all active:scale-95 shadow-sm",
                                                    style: {
                                                        background: "#0a2540"
                                                    },
                                                    children: "Verify & Complete"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                    lineNumber: 376,
                                                    columnNumber: 53
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                            lineNumber: 371,
                                            columnNumber: 49
                                        }, this) : status === "rejected" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "px-3 py-1.5 rounded-xl font-dmsans font-bold",
                                            style: {
                                                fontSize: 12,
                                                background: "#fef2f2",
                                                color: "#dc2626"
                                            },
                                            children: "Rejected"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                            lineNumber: 393,
                                            columnNumber: 49
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        updateCandidateStatus(app.jobId, app.id, "rejected");
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$components$2f$ui$2f$animations$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["showToast"])("Rejected Candidate", "warning");
                                                    },
                                                    className: "w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-95",
                                                    style: {
                                                        background: "#fef2f2"
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                        className: "w-4 h-4",
                                                        style: {
                                                            color: "#dc2626"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 401,
                                                        columnNumber: 57
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                    lineNumber: 396,
                                                    columnNumber: 53
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        updateCandidateStatus(app.jobId, app.id, "accepted");
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$components$2f$ui$2f$animations$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["showToast"])("Worker Hired!", "success");
                                                    },
                                                    className: "px-3 py-1.5 rounded-xl font-dmsans font-semibold text-white text-xs transition-all active:scale-95 shadow-sm",
                                                    style: {
                                                        background: "#0a2540"
                                                    },
                                                    children: "✓ Hire Now"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                    lineNumber: 403,
                                                    columnNumber: 53
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 369,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, app.id, true, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 348,
                                columnNumber: 37
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                        lineNumber: 344,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                lineNumber: 311,
                columnNumber: 17
            }, this),
            tab === "candidates" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",
                children: activeApplications.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "col-span-full bg-white rounded-2xl border p-12 text-center",
                    style: {
                        borderColor: "#e5e7eb"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                            className: "w-12 h-12 mx-auto mb-3",
                            style: {
                                color: "#d1d5db"
                            }
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                            lineNumber: 428,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-outfit font-bold",
                            style: {
                                fontSize: 18,
                                color: "#111827"
                            },
                            children: "No active candidates"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                            lineNumber: 429,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-dmsans mt-1",
                            style: {
                                fontSize: 14,
                                color: "#9ca3af"
                            },
                            children: "Post a job to start receiving applications."
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                            lineNumber: 430,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                    lineNumber: 427,
                    columnNumber: 25
                }, this) : activeApplications.map((c)=>{
                    const status = c.status || "pending";
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl border p-5 hover:shadow-md transition-all",
                        style: {
                            borderColor: "#e5e7eb"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-3 mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-12 h-12 rounded-full flex items-center justify-center font-outfit font-bold text-white shrink-0",
                                        style: {
                                            background: c.color
                                        },
                                        children: c.init
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 438,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-dmsans font-bold",
                                                        style: {
                                                            fontSize: 15,
                                                            color: "#111827"
                                                        },
                                                        children: c.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 441,
                                                        columnNumber: 49
                                                    }, this),
                                                    c.verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: 11,
                                                            color: "#0e9f6e"
                                                        },
                                                        children: "✓"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 442,
                                                        columnNumber: 64
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 440,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 12,
                                                    color: "#6b7280"
                                                },
                                                children: c.exp
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 444,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1 mt-0.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                        className: "w-3.5 h-3.5",
                                                        style: {
                                                            color: "#f59e0b",
                                                            fill: "#f59e0b"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 446,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-dmsans font-semibold",
                                                        style: {
                                                            fontSize: 12,
                                                            color: "#374151"
                                                        },
                                                        children: c.rating
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 447,
                                                        columnNumber: 49
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 445,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 439,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 437,
                                columnNumber: 37
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl px-3 py-2.5 mb-3",
                                style: {
                                    background: "#f8fafc",
                                    border: "1px solid #f3f4f6"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                    lineNumber: 452,
                                    columnNumber: 41
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 451,
                                columnNumber: 37
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-dmsans truncate",
                                                style: {
                                                    fontSize: 12,
                                                    color: "#9ca3af"
                                                },
                                                children: "Applied for"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 456,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-dmsans font-semibold truncate",
                                                style: {
                                                    fontSize: 13,
                                                    color: "#111827"
                                                },
                                                children: c.jobTitle
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 457,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 455,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-dmsans font-bold shrink-0 ml-3",
                                        style: {
                                            fontSize: 14,
                                            color: "#e85d26"
                                        },
                                        children: c.bid
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 459,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 454,
                                columnNumber: 37
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: status === "accepted" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        const otp = window.prompt("Enter worker's unique 4-digit Entry Code:");
                                        if (otp) {
                                            if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$store$2f$useAppDataStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppDataStore"].getState().verifyCandidateOtp(c.jobId, c.id, otp)) {
                                                __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$store$2f$useAppDataStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppDataStore"].getState().markWorkCompleted(c.jobId, c.id);
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$components$2f$ui$2f$animations$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["showToast"])("Verification Successful!", "success");
                                            } else {
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$components$2f$ui$2f$animations$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["showToast"])("Incorrect Code.", "error");
                                            }
                                        }
                                    },
                                    className: "flex-1 py-2 rounded-xl text-center font-dmsans font-bold text-sm transition-all active:scale-95 shadow-sm",
                                    style: {
                                        background: "#0a2540",
                                        color: "white"
                                    },
                                    children: "✓ Verify & Complete"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                    lineNumber: 463,
                                    columnNumber: 45
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                updateCandidateStatus(c.jobId, c.id, "rejected");
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$components$2f$ui$2f$animations$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["showToast"])("Application Rejected", "warning");
                                            },
                                            className: "flex-1 py-2 rounded-xl font-dmsans font-semibold text-sm transition-all active:scale-95 hover:bg-red-50",
                                            style: {
                                                background: "#fef2f2",
                                                color: "#dc2626"
                                            },
                                            children: "Reject"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                            lineNumber: 480,
                                            columnNumber: 49
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>router.push("/employer-chat"),
                                            className: "w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-95 shrink-0",
                                            style: {
                                                background: "#efecff"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                className: "w-4 h-4",
                                                style: {
                                                    color: "#7c3aed"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 488,
                                                columnNumber: 53
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                            lineNumber: 486,
                                            columnNumber: 49
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                updateCandidateStatus(c.jobId, c.id, "accepted");
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$components$2f$ui$2f$animations$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["showToast"])("Hired successfully!", "success");
                                            },
                                            className: "flex-1 py-2 rounded-xl font-dmsans font-semibold text-white text-sm transition-all active:scale-95 shadow-sm",
                                            style: {
                                                background: "#0a2540"
                                            },
                                            children: "✓ Hire Now"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                            lineNumber: 490,
                                            columnNumber: 49
                                        }, this)
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 461,
                                columnNumber: 37
                            }, this)
                        ]
                    }, c.id, true, {
                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                        lineNumber: 436,
                        columnNumber: 33
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                lineNumber: 425,
                columnNumber: 17
            }, this),
            tab === "history" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: history.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-2xl border p-12 text-center",
                    style: {
                        borderColor: "#e5e7eb"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                            className: "w-12 h-12 mx-auto mb-3",
                            style: {
                                color: "#d1d5db"
                            }
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                            lineNumber: 513,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-outfit font-bold",
                            style: {
                                fontSize: 18,
                                color: "#111827"
                            },
                            children: "No history yet"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                            lineNumber: 514,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-dmsans mt-1",
                            style: {
                                fontSize: 14,
                                color: "#9ca3af"
                            },
                            children: "Completed hires will appear here as a record."
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                            lineNumber: 515,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                    lineNumber: 512,
                    columnNumber: 25
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-2xl border overflow-hidden",
                    style: {
                        borderColor: "#e5e7eb"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4 px-5 py-3 border-b",
                            style: {
                                background: "#f8fafc",
                                borderColor: "#f3f4f6"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-10"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                    lineNumber: 523,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex-1 font-dmsans font-bold tracking-widest",
                                    style: {
                                        fontSize: 11,
                                        color: "#9ca3af",
                                        textTransform: "uppercase"
                                    },
                                    children: "Worker"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                    lineNumber: 524,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-48 font-dmsans font-bold tracking-widest",
                                    style: {
                                        fontSize: 11,
                                        color: "#9ca3af",
                                        textTransform: "uppercase"
                                    },
                                    children: "Job"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                    lineNumber: 525,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-28 font-dmsans font-bold tracking-widest",
                                    style: {
                                        fontSize: 11,
                                        color: "#9ca3af",
                                        textTransform: "uppercase"
                                    },
                                    children: "Wage"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                    lineNumber: 526,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-32 font-dmsans font-bold tracking-widest",
                                    style: {
                                        fontSize: 11,
                                        color: "#9ca3af",
                                        textTransform: "uppercase"
                                    },
                                    children: "Duration"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                    lineNumber: 527,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-24 font-dmsans font-bold tracking-widest text-right",
                                    style: {
                                        fontSize: 11,
                                        color: "#9ca3af",
                                        textTransform: "uppercase"
                                    },
                                    children: "Status"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                    lineNumber: 528,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                            lineNumber: 522,
                            columnNumber: 29
                        }, this),
                        history.map((h, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors",
                                style: {
                                    borderBottom: i < history.length - 1 ? "1px solid #f3f4f6" : "none"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-10 h-10 rounded-full flex items-center justify-center font-outfit font-bold text-white text-sm shrink-0",
                                        style: {
                                            background: h.workerColor
                                        },
                                        children: h.workerInit
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 536,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-dmsans font-bold",
                                                        style: {
                                                            fontSize: 14,
                                                            color: "#111827"
                                                        },
                                                        children: h.workerName
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 542,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-0.5",
                                                        style: {
                                                            fontSize: 12,
                                                            color: "#6b7280"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                                className: "w-3 h-3",
                                                                style: {
                                                                    color: "#f59e0b",
                                                                    fill: "#f59e0b"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                                lineNumber: 544,
                                                                columnNumber: 49
                                                            }, this),
                                                            " ",
                                                            h.workerRating
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 543,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 541,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 12,
                                                    color: "#9ca3af"
                                                },
                                                children: h.workerExp
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 547,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 540,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-48 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-dmsans font-semibold truncate",
                                                style: {
                                                    fontSize: 13,
                                                    color: "#111827"
                                                },
                                                children: h.jobTitle
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 552,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "flex items-center gap-1 truncate",
                                                style: {
                                                    fontSize: 11,
                                                    color: "#9ca3af"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                        className: "w-3 h-3 shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                        lineNumber: 554,
                                                        columnNumber: 45
                                                    }, this),
                                                    " ",
                                                    h.jobLocation
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                lineNumber: 553,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 551,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-28 font-dmsans font-bold",
                                        style: {
                                            fontSize: 13,
                                            color: "#e85d26"
                                        },
                                        children: h.wage
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 559,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-32",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "flex items-center gap-1",
                                            style: {
                                                fontSize: 12,
                                                color: "#6b7280"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                    className: "w-3 h-3 shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                    lineNumber: 564,
                                                    columnNumber: 45
                                                }, this),
                                                " ",
                                                h.hiredDate,
                                                " — ",
                                                h.completedDate
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                            lineNumber: 563,
                                            columnNumber: 41
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 562,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-24 text-right",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex items-center gap-1 px-3 py-1 rounded-full font-dmsans font-bold",
                                            style: {
                                                fontSize: 11,
                                                background: "#ecfdf5",
                                                color: "#0e9f6e"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                                                    className: "w-3 h-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                                    lineNumber: 572,
                                                    columnNumber: 45
                                                }, this),
                                                " Done"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                            lineNumber: 570,
                                            columnNumber: 41
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                        lineNumber: 569,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, h.id, true, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                                lineNumber: 532,
                                columnNumber: 33
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                    lineNumber: 520,
                    columnNumber: 25
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
                lineNumber: 510,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/(employer)/my-jobs/page.tsx",
        lineNumber: 58,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=Downloads_Shramsetu-Dillu-shramsetu_src_ff342a61._.js.map