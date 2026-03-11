import { NextRequest, NextResponse } from "next/server";
import { askGemini } from "@/lib/gemini";
import { aiErrorResponse, parseAIJson } from "@/lib/ai-error";
import { getCachedAIResult, cacheAIResult } from "@/lib/ai-cache";

export async function POST(req: NextRequest) {
    try {
        const { workerId, jobId, workerProfile, jobDetails } = await req.json();
        if (!workerId || !jobId) {
            return NextResponse.json({ error: "Missing workerId or jobId" }, { status: 400 });
        }

        const cacheKey = { workerId, jobId };
        const cached = await getCachedAIResult("match-score", cacheKey);
        if (cached) return NextResponse.json(cached);

        if (!workerProfile || !jobDetails) {
            return NextResponse.json({ score: 50, label: "Fair", reason: "Profile details missing" });
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

        const raw = await askGemini(
            system,
            `Worker: ${JSON.stringify(workerProfile)}\nJob: ${JSON.stringify(jobDetails)}`,
            true
        );

        const result = parseAIJson(raw, {
            score: 60, label: "Fair", reason: "Based on your profile",
        });

        await cacheAIResult(workerId, "match-score", cacheKey, result);
        return NextResponse.json(result);
    } catch (error) {
        return aiErrorResponse(error, "match-score");
    }
}
