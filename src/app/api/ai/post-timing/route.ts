import { NextRequest, NextResponse } from "next/server";
import { askClaude } from "@/lib/claude";
import { aiErrorResponse, parseAIJson } from "@/lib/ai-error";
import { getCachedAIResult } from "@/lib/ai-cache";

export async function POST(req: NextRequest) {
    try {
        const { category, city } = await req.json();
        const cacheKey = { category, city };
        const cached = await getCachedAIResult("post-timing", cacheKey);
        if (cached) return NextResponse.json(cached);

        const system = `You are a hiring optimization AI for Indian labor market 2025.
Analyze best job posting times for maximum worker applications.
Return JSON:
{
  "bestDay": "day name",
  "bestTime": "time range e.g. 9:00 AM - 11:00 AM",
  "expectedApplications": integer,
  "comparedToWorstTime": "e.g. 3x more than Sunday evenings",
  "tip": "one actionable sentence",
  "avoidTimes": ["time to avoid 1", "time to avoid 2"]
}`;

        const raw = await askClaude(
            system,
            `Job category: ${category}, City: ${city},
Current day: ${new Date().toLocaleDateString("en-IN", { weekday: "long" })}`,
            true
        );

        return NextResponse.json(
            parseAIJson(raw, {
                bestDay: "Tuesday",
                bestTime: "9:00 AM - 11:00 AM",
                expectedApplications: 8,
                comparedToWorstTime: "2x more than weekends",
                tip: "Post early in the week for best results",
            })
        );
    } catch (error) {
        return aiErrorResponse(error, "post-timing");
    }
}
