import { NextRequest, NextResponse } from "next/server";
import { askGeminiWithImage } from "@/lib/gemini";
import { aiErrorResponse, parseAIJson } from "@/lib/ai-error";

export async function POST(req: NextRequest) {
    try {
        const { imageBase64, mediaType = "image/jpeg" } = await req.json();
        if (!imageBase64) {
            return NextResponse.json({ error: "Image required" }, { status: 400 });
        }

        const prompt = `Analyze this blue-collar work portfolio photo from India.
Return JSON only:
{
  "title": "short work title",
  "description": "1-2 sentences describing completed work",
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "skills": ["skill1", "skill2"],
  "quality": "Professional|Good|Basic",
  "workType": "category of work shown"
}`;

        const raw = await askGeminiWithImage(prompt, imageBase64, mediaType as any);
        return NextResponse.json(
            parseAIJson(raw, {
                title: "Work Sample",
                description: "Portfolio image",
                tags: [],
                skills: [],
                quality: "Good",
                workType: "General",
            })
        );
    } catch (error) {
        return aiErrorResponse(error, "tag-portfolio");
    }
}
