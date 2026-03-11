import { NextRequest, NextResponse } from "next/server";
import { askGemini } from "@/lib/gemini";
import { aiErrorResponse, parseAIJson } from "@/lib/ai-error";

export async function POST(req: NextRequest) {
    try {
        const { transcript, userCity } = await req.json();
        if (!transcript?.trim()) {
            return NextResponse.json({ error: "No transcript provided" }, { status: 400 });
        }

        const system = `You are a job search intent parser for an Indian blue-collar
labor platform. Users speak in Hindi, Hinglish, or English.
Extract their job search intent.
Return JSON:
{
  "skill": "one of: Plumber|Electrician|Mason|Welder|Painter|Carpenter|Labor|null",
  "location": "extracted location string or null",
  "minRate": number_or_null,
  "maxRate": number_or_null,
  "urgency": "immediate|this_week|flexible|null",
  "cleanQuery": "normalized English search phrase"
}`;

        const raw = await askGemini(
            system,
            `User city: ${userCity ?? "India"}. They said: "${transcript}"`,
            true
        );

        return NextResponse.json(
            parseAIJson(raw, { skill: null, location: null, cleanQuery: transcript })
        );
    } catch (error) {
        return aiErrorResponse(error, "voice-search");
    }
}
