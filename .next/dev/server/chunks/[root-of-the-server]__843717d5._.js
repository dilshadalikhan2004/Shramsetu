module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/api/ai/assistant/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/@google/generative-ai/dist/index.mjs [app-route] (ecmascript)");
;
;
// Inline client creation — avoids any module-level import issues and gives clear error logs
function getGeminiModel(system) {
    const key = process.env.GEMINI_API_KEY || process.env.ANTHROPIC_API_KEY;
    if (!key) {
        throw new Error("GEMINI_API_KEY is missing. Add it to .env.local and restart the dev server.");
    }
    const client = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GoogleGenerativeAI"](key);
    return client.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: system
    });
}
async function POST(req) {
    try {
        const { messages, userName, userRole, userCity, userLanguage } = await req.json();
        if (!messages?.length) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Messages required"
            }, {
                status: 400
            });
        }
        const system = `You are ShramSetu AI — a friendly, helpful assistant for India's blue-collar labor platform.
User: ${userName ?? "User"} | Role: ${userRole ?? "worker"} | City: ${userCity ?? "India"} | Language preference: ${userLanguage ?? "Hindi"}

Platform facts:
- Workers apply to daily wage jobs, join teams, track earnings
- Employers post jobs, review and hire applicants
- All profiles are Aadhaar verified, zero commission
- Payments tracked in app, direct to worker

Rules:
- Match user language (Hindi → Hindi, English → English, Hinglish → Hinglish)
- Be concise, warm, practical
- For payment disputes: direct to Support page
- For technical issues: direct to Support page
- Never invent platform policies`;
        const model = getGeminiModel(system);
        // Gemini requires conversation to start with a "user" role message.
        // Strip any leading "model" messages (e.g. the welcome greeting injected client-side).
        const raw = messages.slice(-12) // keep last 12 messages for context
        .map((m)=>({
                role: m.role === "assistant" ? "model" : "user",
                parts: [
                    {
                        text: m.content
                    }
                ]
            }));
        // Drop all leading model messages until first user message
        while(raw.length > 0 && raw[0].role === "model"){
            raw.shift();
        }
        if (raw.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                reply: "नमस्ते! मैं ShramSetu AI हूं। आपकी कैसे मदद करूं? 😊"
            });
        }
        const response = await model.generateContent({
            contents: raw
        });
        const reply = response.response.text();
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            reply
        });
    } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        console.error("[AI Assistant Error]", msg);
        // Return a user-friendly message while logging the real error server-side
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            reply: "माफ करें, अभी AI सेवा उपलब्ध नहीं है। कृपया थोड़ी देर बाद प्रयास करें।\n\n(Sorry, the AI service is temporarily unavailable. Please try again in a moment.)",
            error: msg
        }, {
            status: 503
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__843717d5._.js.map