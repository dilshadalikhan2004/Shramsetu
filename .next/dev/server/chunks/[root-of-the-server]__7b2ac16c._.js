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
"[project]/Downloads/Shramsetu-Dillu-shramsetu/src/lib/claude.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "askClaude",
    ()=>askClaude,
    "askClaudeWithImage",
    ()=>askClaudeWithImage,
    "getClient",
    ()=>getClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/@google/generative-ai/dist/index.mjs [app-route] (ecmascript)");
;
function getClient() {
    // We check for GEMINI_API_KEY. If they still have ANTHROPIC_API_KEY set, we'll try to use it as a fallback in case they named their key that during migration.
    const key = process.env.GEMINI_API_KEY || process.env.ANTHROPIC_API_KEY;
    if (!key) throw new Error("GEMINI_API_KEY is not set in environment variables");
    return new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GoogleGenerativeAI"](key);
}
async function askClaude(systemPrompt, userMessage, jsonMode = false) {
    try {
        const model = getClient().getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: jsonMode ? systemPrompt + "\n\nCRITICAL: Respond with valid JSON only. " + "No markdown fences, no explanation text, no preamble." : systemPrompt
        });
        const result = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: userMessage
                        }
                    ]
                }
            ],
            generationConfig: {
                maxOutputTokens: 1024,
                responseMimeType: jsonMode ? "application/json" : "text/plain"
            }
        });
        return result.response.text();
    } catch (error) {
        console.error("Gemini API error:", error);
        throw new Error("AI service temporarily unavailable");
    }
}
async function askClaudeWithImage(systemPrompt, imageBase64, mediaType = "image/jpeg") {
    try {
        const model = getClient().getGenerativeModel({
            model: "gemini-1.5-flash"
        });
        // Strip data URI prefix if present
        const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
        const parts = [
            {
                inlineData: {
                    data: base64Data,
                    mimeType: mediaType
                }
            },
            {
                text: systemPrompt
            }
        ];
        const result = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts
                }
            ],
            generationConfig: {
                maxOutputTokens: 512
            }
        });
        return result.response.text();
    } catch (error) {
        console.error("Gemini Vision API error:", error);
        throw new Error("AI image analysis temporarily unavailable");
    }
}
}),
"[project]/Downloads/Shramsetu-Dillu-shramsetu/src/lib/ai-error.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "aiErrorResponse",
    ()=>aiErrorResponse,
    "parseAIJson",
    ()=>parseAIJson
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/next/server.js [app-route] (ecmascript)");
;
function aiErrorResponse(error, feature) {
    console.error(`AI Feature [${feature}] failed:`, error);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "AI service temporarily unavailable",
        feature,
        fallback: true
    }, {
        status: 503
    });
}
function parseAIJson(text, fallback) {
    try {
        const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        return JSON.parse(cleaned);
    } catch  {
        console.error("Failed to parse AI JSON:", text.slice(0, 200));
        return fallback;
    }
}
}),
"[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/api/ai/assistant/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$lib$2f$claude$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/src/lib/claude.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$lib$2f$ai$2d$error$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/src/lib/ai-error.ts [app-route] (ecmascript)");
;
;
;
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
        const system = `You are ShramSetu AI — friendly assistant for India's
blue-collar labor platform.
User: ${userName ?? "User"} | Role: ${userRole ?? "worker"} |
City: ${userCity ?? "India"} | Language preference: ${userLanguage ?? "Hindi"}

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
        const model = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$lib$2f$claude$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getClient"])().getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: system
        });
        // Gemini requires conversation to start with a "user" message.
        // Filter out any leading assistant messages (e.g. the welcome greeting).
        const formattedMessages = messages.slice(-10).map((m)=>({
                role: m.role === "assistant" ? "model" : "user",
                parts: [
                    {
                        text: m.content
                    }
                ]
            })).filter((_, i, arr)=>{
            // Drop leading model messages
            if (i === 0 && arr[0].role === "model") return false;
            return true;
        });
        // Safety check — if no user message remains, bail early
        if (!formattedMessages.length || formattedMessages[0].role !== "user") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                reply: "नमस्ते! मैं ShramSetu AI हूं। आपकी कैसे मदद करूं? 😊"
            });
        }
        const response = await model.generateContent({
            contents: formattedMessages
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            reply: response.response.text()
        });
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$lib$2f$ai$2d$error$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["aiErrorResponse"])(error, "assistant");
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7b2ac16c._.js.map