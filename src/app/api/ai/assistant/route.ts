import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient } from "@/lib/gemini";
import { HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

function getGeminiModel(system: string) {
    const client = getGeminiClient();
    return client.getGenerativeModel({
        model: "gemini-pro",
        systemInstruction: { role: "system", parts: [{ text: system }] },
        safetySettings: [
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        ]
    });
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { messages, userName, userRole, userCity, userLanguage } = body;
        
        if (!process.env.GEMINI_API_KEY) {
            console.error("[AI Assistant] CRITICAL: GEMINI_API_KEY is missing from process.env");
            return NextResponse.json({ error: "Server configuration error: Missing API Key" }, { status: 500 });
        }

        if (!messages?.length) {
            return NextResponse.json({ error: "Messages required" }, { status: 400 });
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
        const models = ["gemini-2.0-flash-lite", "gemini-2.5-flash-lite", "gemini-2.0-flash", "gemini-2.5-flash"];
        
        let reply = "";
        let finalError = "";

        // Prepare contents
        const contents = messages.slice(-10).map((m: any) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
        }));

        for (const modelId of models) {
            try {
                const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`;
                
                const res = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        contents,
                        system_instruction: { parts: [{ text: system }] }
                    }),
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
            } catch (err: any) {
                finalError = err.message;
                continue;
            }
        }

        if (!reply) {
            throw new Error(finalError || "All AI models failed to respond.");
        }

        return NextResponse.json({ reply });
    } catch (error: any) {
        console.error("[AI Assistant Error]", error.message);
        return NextResponse.json(
            { 
                error: error.message,
                reply: `AI की सीमा समाप्त हो गई है। कृपया कुछ मिनट बाद पुनः प्रयास करें। (Error: ${error.message})` 
            },
            { status: 500 }
        );
    }
}
