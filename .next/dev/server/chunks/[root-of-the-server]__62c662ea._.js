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
"[project]/Downloads/Shramsetu-Dillu-shramsetu/src/app/api/ai/assistant/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$lib$2f$gemini$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/src/lib/gemini.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Shramsetu-Dillu-shramsetu/node_modules/@google/generative-ai/dist/index.mjs [app-route] (ecmascript)");
;
;
;
function getGeminiModel(system) {
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$src$2f$lib$2f$gemini$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getGeminiClient"])();
    return client.getGenerativeModel({
        model: "gemini-pro",
        systemInstruction: {
            role: "system",
            parts: [
                {
                    text: system
                }
            ]
        },
        safetySettings: [
            {
                category: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HarmCategory"].HARM_CATEGORY_HARASSMENT,
                threshold: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HarmBlockThreshold"].BLOCK_NONE
            },
            {
                category: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HarmCategory"].HARM_CATEGORY_HATE_SPEECH,
                threshold: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HarmBlockThreshold"].BLOCK_NONE
            },
            {
                category: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HarmCategory"].HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HarmBlockThreshold"].BLOCK_NONE
            },
            {
                category: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HarmCategory"].HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HarmBlockThreshold"].BLOCK_NONE
            }
        ]
    });
}
async function POST(req) {
    try {
        const body = await req.json();
        const { messages, userName, userRole, userCity, userLanguage } = body;
        if (!process.env.GEMINI_API_KEY) {
            console.error("[AI Assistant] CRITICAL: GEMINI_API_KEY is missing from process.env");
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Server configuration error: Missing API Key"
            }, {
                status: 500
            });
        }
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
- Never invent platform policies
- **Job Posting Feature**: If an Employer (Role: employer) provides details for a job (title, rate, location, etc.), you MUST generate a draft. 
  - To do this, append exactly this format at the end of your response: 
  [JOB_DRAFT]{"title":"...","category":"...","daily_rate":0,"total":1,"location":"...","description":"..."}[/JOB_DRAFT]
  - Use these categories: construction, plumbing, electrical, logistics, agriculture, manufacturing.
  - Keep the conversational part of the response brief and encouraging.`;
        const apiKey = process.env.GEMINI_API_KEY;
        const models = [
            "gemini-2.0-flash-lite",
            "gemini-2.5-flash-lite",
            "gemini-2.0-flash",
            "gemini-2.5-flash"
        ];
        let reply = "";
        let finalError = "";
        // Prepare contents
        const contents = messages.slice(-10).map((m)=>({
                role: m.role === "assistant" ? "model" : "user",
                parts: [
                    {
                        text: m.content
                    }
                ]
            }));
        for (const modelId of models){
            try {
                const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`;
                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        contents,
                        system_instruction: {
                            parts: [
                                {
                                    text: system
                                }
                            ]
                        }
                    })
                });
                const data = await res.json();
                if (res.ok) {
                    reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (reply) break;
                } else {
                    const msg = data.error?.message || JSON.stringify(data);
                    finalError = msg;
                    console.warn(`[AI Assistant] Model ${modelId} failed: ${msg}`);
                    if (res.status === 429 || res.status === 404) continue;
                    else break;
                }
            } catch (err) {
                finalError = err.message;
                continue;
            }
        }
        if (!reply) {
            throw new Error(finalError || "All AI models failed to respond.");
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            reply
        });
    } catch (error) {
        console.error("[AI Assistant Error]", error.message);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Shramsetu$2d$Dillu$2d$shramsetu$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message,
            reply: `AI की सीमा समाप्त हो गई है। कृपया कुछ मिनट बाद पुनः प्रयास करें। (Error: ${error.message})`
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__62c662ea._.js.map