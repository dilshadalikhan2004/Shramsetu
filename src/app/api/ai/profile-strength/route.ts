import { NextRequest, NextResponse } from "next/server";
import { askClaude } from "@/lib/claude";
import { aiErrorResponse, parseAIJson } from "@/lib/ai-error";

export async function POST(req: NextRequest) {
  try {
    const { userId, profileData } = await req.json();
    if (!userId || !profileData) return NextResponse.json({ error: "Context details required" }, { status: 400 });

    const system = `You are a profile optimizer for Indian blue-collar job seekers.
Analyze completeness and quality. Return JSON:
{
  "score": integer_0_to_100,
  "grade": "Excellent|Good|Average|Needs Work",
  "improvements": [
    {
      "action": "specific action to take",
      "impact": "+X%",
      "done": boolean,
      "priority": "high|medium|low"
    }
  ],
  "topTip": "single most impactful improvement tip"
}`;

    const raw = await askClaude(
      system,
      `Profile: ${JSON.stringify(profileData)}`,
      true
    );

    const result = parseAIJson(raw, {
      score: 40, grade: "Needs Work",
      improvements: [{ action: "Complete your profile", impact: "+20%", done: false, priority: "high" }],
      topTip: "Add a profile photo to get 3x more views",
    });


    return NextResponse.json(result);
  } catch (error) {
    return aiErrorResponse(error, "profile-strength");
  }
}
