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
"[project]/Downloads/Shramsetu-Dillu-shramsetu/src/lib/gemini.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "askGemini",
    ()=>askGemini,
    "askGeminiWithImage",
    ()=>askGeminiWithImage,
    "getGeminiClient",
    ()=>getGeminiClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/@google/generative-ai/dist/index.mjs [app-route] (ecmascript)");
;
function getGeminiClient() {
    // We check for GEMINI_API_KEY.
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
        throw new Error("GEMINI_API_KEY is not set in environment variables. Please add it to your .env file.");
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GoogleGenerativeAI"](key);
}
async function askGemini(systemPrompt, userMessage, jsonMode = false) {
    const models = [
        "gemini-2.0-flash-lite",
        "gemini-2.5-flash-lite",
        "gemini-2.0-flash",
        "gemini-2.5-flash"
    ];
    let lastError = null;
    for (const modelId of models){
        try {
            const model = getGeminiClient().getGenerativeModel({
                model: modelId,
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
                    maxOutputTokens: 2048,
                    responseMimeType: jsonMode ? "application/json" : "text/plain"
                }
            });
            return result.response.text();
        } catch (error) {
            lastError = error;
            console.warn(`[Gemini Utility] Model ${modelId} failed:`, error.message);
            if (!error.message?.includes('404')) break;
        }
    }
    console.error("Gemini API error (all models failed):", lastError);
    if (lastError.message?.includes('429')) {
        throw new Error("AI service rate limit reached. Please wait a moment.");
    }
    throw new Error("AI service temporarily unavailable");
}
async function askGeminiWithImage(systemPrompt, imageBase64, mediaType = "image/jpeg") {
    try {
        const model = getGeminiClient().getGenerativeModel({
            model: "gemini-2.0-flash"
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
                maxOutputTokens: 1024
            }
        });
        const response = result.response;
        return response.text();
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
"[project]/Downloads/Shramsetu-Dillu-shramsetu/src/lib/ai-cache.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cacheAIResult",
    ()=>cacheAIResult,
    "getCachedAIResult",
    ()=>getCachedAIResult
]);
async function getCachedAIResult(feature, inputData) {
    return null;
}
async function cacheAIResult(userId, feature, inputData, result) {
// No-op cache for now
}
}),
"[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/api/ai/match-score/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$lib$2f$gemini$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/src/lib/gemini.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$lib$2f$ai$2d$error$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/src/lib/ai-error.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$lib$2f$ai$2d$cache$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/src/lib/ai-cache.ts [app-route] (ecmascript)");
;
;
;
;
async function POST(req) {
    try {
        const { workerId, jobId, workerProfile, jobDetails } = await req.json();
        if (!workerId || !jobId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Missing workerId or jobId"
            }, {
                status: 400
            });
        }
        const cacheKey = {
            workerId,
            jobId
        };
        const cached = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$lib$2f$ai$2d$cache$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCachedAIResult"])("match-score", cacheKey);
        if (cached) return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(cached);
        if (!workerProfile || !jobDetails) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                score: 50,
                label: "Fair",
                reason: "Profile details missing"
            });
        }
        const system = `You are a job matching AI for Indian blue-collar workers.
Score compatibility 0-100.
Return JSON:
{
  "score": integer_0_to_100,
  "label": "Excellent|Good|Fair|Low",
  "reason": "max 8 words",
  "topFactors": ["factor1", "factor2"]
}`;
        const raw = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$lib$2f$gemini$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["askGemini"])(system, `Worker: ${JSON.stringify(workerProfile)}\nJob: ${JSON.stringify(jobDetails)}`, true);
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$lib$2f$ai$2d$error$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseAIJson"])(raw, {
            score: 60,
            label: "Fair",
            reason: "Based on your profile"
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$lib$2f$ai$2d$cache$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cacheAIResult"])(workerId, "match-score", cacheKey, result);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result);
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$lib$2f$ai$2d$error$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["aiErrorResponse"])(error, "match-score");
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c87264a3._.js.map