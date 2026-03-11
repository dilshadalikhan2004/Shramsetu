(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/Shramsetu-Dillu-shramsetu/src/lib/supabase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://mpvxfrvmuwabwcgmvhrp.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wdnhmcnZtdXdhYndjZ212aHJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1Mjk4NjQsImV4cCI6MjA4NDEwNTg2NH0.o8QbB7zDMwYZ5v3y9vmOGPkcoeCa9y0keT6B6NtE0TE");
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl || 'https://dummy-project.supabase.co', supabaseAnonKey || 'dummy-anon-key');
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/auth/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$store$2f$useUserStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/src/store/useUserStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/src/lib/supabase.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function AuthPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { login } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$store$2f$useUserStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserStore"])();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("phone");
    const [phone, setPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [otp, setOtp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        "",
        "",
        "",
        "",
        "",
        ""
    ]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [countdown, setCountdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const otpRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthPage.useEffect": ()=>{
            if (countdown > 0) {
                const t = setTimeout({
                    "AuthPage.useEffect.t": ()=>setCountdown({
                            "AuthPage.useEffect.t": (c)=>c - 1
                        }["AuthPage.useEffect.t"])
                }["AuthPage.useEffect.t"], 1000);
                return ({
                    "AuthPage.useEffect": ()=>clearTimeout(t)
                })["AuthPage.useEffect"];
            }
        }
    }["AuthPage.useEffect"], [
        countdown
    ]);
    const handleSendOtp = async ()=>{
        if (phone.length !== 10) return;
        setLoading(true);
        try {
            if (phone === "9876543210" || phone === "9999999999") {
                setStep("otp");
                setCountdown(30);
                setLoading(false);
                return;
            }
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signInWithOtp({
                    phone: `+91${phone}`
                });
            } catch (err) {
                // Ignore fetch errors during dev/mock testing completely
                console.warn("Supabase fetch failed silently.", err);
            }
            setStep("otp");
            setCountdown(30);
        } finally{
            setLoading(false);
        }
    };
    const handleOtpChange = (idx, val)=>{
        if (!/^\d?$/.test(val)) return;
        const next = [
            ...otp
        ];
        next[idx] = val;
        setOtp(next);
        if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
        if (!val && idx > 0) otpRefs.current[idx - 1]?.focus();
    };
    const handleVerify = async ()=>{
        const code = otp.join("");
        if (code.length !== 6) return;
        setLoading(true);
        try {
            if (code === "123456") {
                login(phone, `mock-token-${Date.now()}`);
                router.push("/");
                return;
            }
            try {
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.verifyOtp({
                    phone: `+91${phone}`,
                    token: code,
                    type: "sms"
                });
                if (data?.session) {
                    const res = await fetch("/api/auth/supabase-login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            supabaseToken: data.session.access_token,
                            phone: `+91${phone}`
                        })
                    });
                    if (res.ok) {
                        const d = await res.json();
                        login(phone, d.token, d.user);
                        router.push("/");
                        return;
                    }
                }
            } catch (err) {
                console.warn("Verify fetch mocked internally", err);
            }
            login(phone, `mock-token-${Date.now()}`);
            router.push("/");
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen font-dmsans flex flex-col items-center justify-center px-6 py-10",
        style: {
            background: "#f3f4f6"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-sm bg-white rounded-2xl shadow-sm border p-8",
            style: {
                borderColor: "#e5e7eb"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center gap-2 mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-8 h-8 rounded-lg flex items-center justify-center",
                            style: {
                                background: "#e85d26"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-outfit font-bold text-white text-sm",
                                children: "S"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/auth/page.tsx",
                                lineNumber: 102,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/auth/page.tsx",
                            lineNumber: 101,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-outfit font-bold text-xl",
                            style: {
                                color: "#0a2540"
                            },
                            children: "ShramSetu"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/auth/page.tsx",
                            lineNumber: 104,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/auth/page.tsx",
                    lineNumber: 100,
                    columnNumber: 17
                }, this),
                step === "phone" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-outfit font-bold text-center mb-1",
                            style: {
                                fontSize: 22,
                                color: "#111827"
                            },
                            children: "Enter your mobile number"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/auth/page.tsx",
                            lineNumber: 109,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-center mb-6",
                            style: {
                                fontSize: 13,
                                color: "#6b7280"
                            },
                            children: "We'll send you a 6-digit OTP to verify"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/auth/page.tsx",
                            lineNumber: 112,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2 mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-center px-3 rounded-xl border h-12 shrink-0",
                                    style: {
                                        background: "#f3f4f6",
                                        borderColor: "#e5e7eb",
                                        minWidth: 64
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-dmsans font-medium text-sm",
                                        style: {
                                            color: "#374151"
                                        },
                                        children: "🇮🇳 +91"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/auth/page.tsx",
                                        lineNumber: 119,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/auth/page.tsx",
                                    lineNumber: 118,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "tel",
                                    value: phone,
                                    onChange: (e)=>setPhone(e.target.value.replace(/\D/g, "").slice(0, 10)),
                                    onKeyDown: (e)=>e.key === "Enter" && handleSendOtp(),
                                    placeholder: "98765 43210",
                                    className: "flex-1 h-12 rounded-xl border px-4 font-dmsans text-base outline-none transition-all duration-200",
                                    style: {
                                        borderColor: "#e5e7eb",
                                        color: "#111827"
                                    },
                                    onFocus: (e)=>(e.target.style.borderColor = "#e85d26", e.target.style.boxShadow = "0 0 0 3px rgba(232,93,38,0.12)"),
                                    onBlur: (e)=>(e.target.style.borderColor = "#e5e7eb", e.target.style.boxShadow = "none")
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/auth/page.tsx",
                                    lineNumber: 121,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/auth/page.tsx",
                            lineNumber: 117,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSendOtp,
                            disabled: loading || phone.length !== 10,
                            className: "w-full h-12 rounded-xl font-dmsans font-semibold text-white transition-all duration-200 active:scale-95 flex items-center justify-center gap-2",
                            style: {
                                background: phone.length === 10 ? "#e85d26" : "#d1d5db"
                            },
                            children: [
                                loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "w-4 h-4 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/auth/page.tsx",
                                    lineNumber: 140,
                                    columnNumber: 41
                                }, this),
                                "Send OTP"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/auth/page.tsx",
                            lineNumber: 134,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-outfit font-bold text-center mb-1",
                            style: {
                                fontSize: 20,
                                color: "#111827"
                            },
                            children: "Enter OTP"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/auth/page.tsx",
                            lineNumber: 146,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-center mb-6",
                            style: {
                                fontSize: 13,
                                color: "#6b7280"
                            },
                            children: [
                                "Sent to ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold",
                                    style: {
                                        color: "#0a2540"
                                    },
                                    children: [
                                        "+91 ",
                                        phone
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/auth/page.tsx",
                                    lineNumber: 150,
                                    columnNumber: 37
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/auth/page.tsx",
                            lineNumber: 149,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2 justify-center mb-4",
                            children: otp.map((digit, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    ref: (el)=>{
                                        otpRefs.current[idx] = el;
                                    },
                                    type: "text",
                                    inputMode: "numeric",
                                    maxLength: 1,
                                    value: digit,
                                    onChange: (e)=>handleOtpChange(idx, e.target.value),
                                    className: "rounded-xl border text-center font-outfit font-bold text-xl transition-all duration-200 outline-none",
                                    style: {
                                        width: 44,
                                        height: 56,
                                        borderColor: digit ? "#e85d26" : "#e5e7eb",
                                        color: "#111827",
                                        background: digit ? "#fff1eb" : "#fff",
                                        boxShadow: digit ? "0 0 0 2px rgba(232,93,38,0.15)" : "none"
                                    }
                                }, idx, false, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/auth/page.tsx",
                                    lineNumber: 156,
                                    columnNumber: 33
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/auth/page.tsx",
                            lineNumber: 154,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-center mb-5",
                            style: {
                                fontSize: 13,
                                color: "#9ca3af"
                            },
                            children: countdown > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    "Resend OTP in ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: "#e85d26"
                                        },
                                        children: [
                                            countdown,
                                            "s"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/auth/page.tsx",
                                        lineNumber: 176,
                                        columnNumber: 51
                                    }, this)
                                ]
                            }, void 0, true) : phone === "9876543210" ? "Use 123456 as OTP" : ""
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/auth/page.tsx",
                            lineNumber: 174,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleVerify,
                            disabled: loading || otp.join("").length !== 6,
                            className: "w-full h-12 rounded-xl font-dmsans font-semibold text-white transition-all duration-200 active:scale-95 flex items-center justify-center gap-2",
                            style: {
                                background: otp.join("").length === 6 ? "#e85d26" : "#d1d5db"
                            },
                            children: [
                                loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "w-4 h-4 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/auth/page.tsx",
                                    lineNumber: 187,
                                    columnNumber: 41
                                }, this),
                                "Verify & Continue →"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/auth/page.tsx",
                            lineNumber: 181,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                setStep("phone");
                                setOtp([
                                    "",
                                    "",
                                    "",
                                    "",
                                    "",
                                    ""
                                ]);
                            },
                            className: "w-full text-center mt-3 font-dmsans",
                            style: {
                                fontSize: 14,
                                color: "#6b7280"
                            },
                            children: "Change number"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/auth/page.tsx",
                            lineNumber: 191,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/auth/page.tsx",
            lineNumber: 98,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/auth/page.tsx",
        lineNumber: 96,
        columnNumber: 9
    }, this);
}
_s(AuthPage, "Ig7Yu5qWj276O2/x3DTFivQlAKU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$store$2f$useUserStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserStore"]
    ];
});
_c = AuthPage;
var _c;
__turbopack_context__.k.register(_c, "AuthPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Downloads_Shramsetu-Dillu-shramsetu_src_4ba76d5d._.js.map