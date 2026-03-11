import { NextRequest, NextResponse } from "next/server";
import { askClaude } from "@/lib/claude";
import { aiErrorResponse, parseAIJson } from "@/lib/ai-error";

export async function POST(req: NextRequest) {
    try {
        const { roughInput, employerId } = await req.json();
        if (!roughInput?.trim()) {
            return NextResponse.json({ error: "Input required" }, { status: 400 });
        }



        const system = `You are an HR assistant for an Indian construction and
labor marketplace. Generate complete professional job postings.
Return JSON:
{
  "title": "professional job title",
  "category": "Construction|Electrical|Plumbing|Welding|Painting|General Labor",
  "description": "2-3 paragraphs, professional, India labor market context",
  "skills": ["skill1", "skill2", "skill3", "skill4"],
  "suggestedRate": daily_rate_in_INR_integer,
  "rateReason": "one sentence market rate justification",
  "positions": suggested_integer_1_to_20,
  "duration": "e.g. 15 Days / 1 Month / Ongoing",
  "perks": ["perk1", "perk2"],
  "isUrgent": boolean
}`;

        const raw = await askClaude(
            system,
            `Employer is an independent entity in India.
They wrote: "${roughInput}"`,
            true
        );

        return NextResponse.json(
            parseAIJson(raw, { title: "", description: "", skills: [] })
        );
    } catch (error) {
        return aiErrorResponse(error, "generate-job");
    }
}
