import { NextRequest, NextResponse } from "next/server";
import { askClaude } from "@/lib/claude";
import { aiErrorResponse, parseAIJson } from "@/lib/ai-error";

export async function POST(req: NextRequest) {
    try {
        const { jobData, employerHistory } = await req.json();

        const system = `You are a fraud detection AI for Indian labor platform.
Flag suspicious job postings.
Red flags: unrealistic pay (>3x market), upfront fees, vague location, new unverified employer posting many jobs, no skill requirements, too-good-to-be-true promises.
Return JSON:
{
  "isSuspicious": boolean,
  "riskLevel": "low|medium|high",
  "flags": ["specific flag description"],
  "message": "one sentence for employer",
  "allowPost": boolean,
  "suggestions": ["suggestion to make post legitimate"]
}`;

        const raw = await askClaude(
            system,
            `Job: ${JSON.stringify(jobData)}\nEmployer history: ${JSON.stringify(employerHistory ?? {})}`,
            true
        );

        return NextResponse.json(
            parseAIJson(raw, { isSuspicious: false, riskLevel: "low", flags: [], allowPost: true })
        );
    } catch (error) {
        return aiErrorResponse(error, "fraud-check");
    }
}
