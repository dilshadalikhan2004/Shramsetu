(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/splash/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SplashPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$store$2f$useUserStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/src/store/useUserStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function SplashPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isAuthenticated, mode, isProfileReady, isLanguageSelected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$store$2f$useUserStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserStore"])();
    const [done, setDone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SplashPage.useEffect": ()=>{
            const timer = setTimeout({
                "SplashPage.useEffect.timer": ()=>{
                    setDone(true);
                    // Route decision
                    if (isAuthenticated) {
                        const langOk = isLanguageSelected ? isLanguageSelected() : false;
                        if (!langOk) {
                            router.push("/language-selection");
                            return;
                        }
                        const ready = isProfileReady ? isProfileReady() : false;
                        if (mode === "worker") router.push(ready ? "/home" : "/setup/worker");
                        else if (mode === "employer") router.push(ready ? "/dashboard" : "/setup/employer");
                        else router.push("/role-selection");
                    } else {
                        const langOk = isLanguageSelected ? isLanguageSelected() : false;
                        router.push(langOk ? "/role-selection" : "/language-selection");
                    }
                }
            }["SplashPage.useEffect.timer"], 2500);
            return ({
                "SplashPage.useEffect": ()=>clearTimeout(timer)
            })["SplashPage.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["SplashPage.useEffect"], [
        isAuthenticated,
        mode,
        router
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 flex flex-col items-center justify-center overflow-hidden",
        style: {
            background: "#0a2540"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center justify-center flex-1 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-24 h-24 rounded-full flex items-center justify-center",
                        style: {
                            background: "rgba(255,255,255,0.08)",
                            border: "1.5px solid rgba(255,255,255,0.12)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "52",
                            height: "52",
                            viewBox: "0 0 52 52",
                            fill: "none",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "20",
                                    cy: "32",
                                    r: "8",
                                    stroke: "#e85d26",
                                    strokeWidth: "3.5",
                                    fill: "none"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/splash/page.tsx",
                                    lineNumber: 44,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "32",
                                    cy: "20",
                                    r: "8",
                                    stroke: "#e85d26",
                                    strokeWidth: "3.5",
                                    fill: "none"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/splash/page.tsx",
                                    lineNumber: 45,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                    x1: "26",
                                    y1: "26",
                                    x2: "26",
                                    y2: "26",
                                    stroke: "#e85d26",
                                    strokeWidth: "3.5",
                                    strokeLinecap: "round"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/splash/page.tsx",
                                    lineNumber: 46,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M26 26 C26 22 30 18 32 12",
                                    stroke: "#e85d26",
                                    strokeWidth: "3.5",
                                    strokeLinecap: "round",
                                    fill: "none"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/splash/page.tsx",
                                    lineNumber: 47,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M26 26 C22 30 18 32 12 40",
                                    stroke: "#e85d26",
                                    strokeWidth: "3.5",
                                    strokeLinecap: "round",
                                    fill: "none"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/splash/page.tsx",
                                    lineNumber: 48,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "14",
                                    cy: "38",
                                    r: "3",
                                    fill: "#e85d26"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/splash/page.tsx",
                                    lineNumber: 49,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                    cx: "38",
                                    cy: "14",
                                    r: "3",
                                    fill: "#e85d26"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/splash/page.tsx",
                                    lineNumber: 50,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/splash/page.tsx",
                            lineNumber: 43,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/splash/page.tsx",
                        lineNumber: 39,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "font-outfit font-bold text-white",
                                style: {
                                    fontSize: 32,
                                    lineHeight: 1.1
                                },
                                children: "ShramSetu"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/splash/page.tsx",
                                lineNumber: 55,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-dmsans italic mt-2",
                                style: {
                                    fontSize: 16,
                                    color: "rgba(255,255,255,0.7)"
                                },
                                children: "काम मिलेगा। पैसा मिलेगा।"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/splash/page.tsx",
                                lineNumber: 58,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/splash/page.tsx",
                        lineNumber: 54,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 rounded-full overflow-hidden",
                        style: {
                            width: 192,
                            height: 4,
                            background: "rgba(255,255,255,0.15)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full rounded-full",
                            style: {
                                background: "#e85d26",
                                animation: "splashProgress 2s linear forwards"
                            }
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/splash/page.tsx",
                            lineNumber: 65,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/splash/page.tsx",
                        lineNumber: 64,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/splash/page.tsx",
                lineNumber: 38,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "absolute bottom-8 font-dmsans",
                style: {
                    fontSize: 11,
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "0.02em"
                },
                children: "Powered by TrustBridge Verification"
            }, void 0, false, {
                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/splash/page.tsx",
                lineNumber: 75,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
                @keyframes splashProgress {
                    from { width: 0% }
                    to { width: 100% }
                }
            `
            }, void 0, false, {
                fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/splash/page.tsx",
                lineNumber: 79,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/splash/page.tsx",
        lineNumber: 33,
        columnNumber: 9
    }, this);
}
_s(SplashPage, "0B+u9igiq6GSAMLwWWnfObBsTNw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$store$2f$useUserStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserStore"]
    ];
});
_c = SplashPage;
var _c;
__turbopack_context__.k.register(_c, "SplashPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=Downloads_Shramsetu-Dillu-shramsetu_acee1a6f._.js.map