import { NextRequest, NextResponse } from "next/server";
import { askGemini } from "@/lib/gemini";
import { aiErrorResponse, parseAIJson } from "@/lib/ai-error";

export async function POST(req: NextRequest) {
    try {
        const { text, targetLanguage } = await req.json();
        if (!text || !targetLanguage) {
            return NextResponse.json({ error: "text and targetLanguage required" }, { status: 400 });
        }
        if (targetLanguage === "English") return NextResponse.json({ translated: text });

        const system = `You are a translator for Indian blue-collar workers.
Translate to ${targetLanguage}. Keep job terms natural and simple.
Return JSON: { "translated": "translated text" }`;

        const raw = await askGemini(system, `Translate: "${text}"`, true);
        return NextResponse.json(parseAIJson(raw, { translated: text }));
    } catch (error) {
        return aiErrorResponse(error, "translate");
    }
}
