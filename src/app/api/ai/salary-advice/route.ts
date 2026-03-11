import { NextRequest, NextResponse } from "next/server";
import { askClaude } from "@/lib/claude";
import { aiErrorResponse, parseAIJson } from "@/lib/ai-error";
import { getCachedAIResult, cacheAIResult } from "@/lib/ai-cache";

export async function POST(req: NextRequest) {
    try {
        const { skill, city, experienceYears } = await req.json();
        if (!skill || !city) {
            return NextResponse.json({ error: "skill and city required" }, { status: 400 });
        }

        const cacheKey = { skill, city, experienceYears };
        const cached = await getCachedAIResult("salary-advice", cacheKey);
        if (cached) return NextResponse.json(cached);

        const system = `You are a salary advisor for Indian blue-collar workers.
Provide accurate 2025 market rate data for Indian cities.
Return JSON:
{
  "min": daily_rate_INR_integer,
  "max": daily_rate_INR_integer,
  "recommended": daily_rate_INR_integer,
  "insight": "one sentence current market insight",
  "trend": "up|down|stable",
  "trendReason": "brief reason for trend"
}`;

        const raw = await askClaude(
            system,
            `Skill: ${skill}, City: ${city}, Experience: ${experienceYears ?? 0} years`,
            true
        );

        const result = parseAIJson(raw, {
            min: 500, max: 1500, recommended: 800,
            insight: "Market rate varies by experience", trend: "stable",
        });

        return NextResponse.json(result);
    } catch (error) {
        return aiErrorResponse(error, "salary-advice");
    }
}
