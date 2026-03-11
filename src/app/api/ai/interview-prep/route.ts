import { NextRequest, NextResponse } from "next/server";
import { askClaude } from "@/lib/claude";
import { aiErrorResponse, parseAIJson } from "@/lib/ai-error";

export async function POST(req: NextRequest) {
    try {
        const { applicationId, jobDetails, employerDetails, workerSkills } = await req.json();
        if (!applicationId || !jobDetails) {
            return NextResponse.json({ error: "Context details required" }, { status: 400 });
        }

        const system = `You are a job preparation coach for Indian blue-collar workers.
Give practical, simple advice for an upcoming job trial.
Use simple language. Mix Hindi and English naturally (Hinglish is fine).
Return JSON:
{
  "greeting": "motivational Hinglish one-liner",
  "tips": [
    {
      "icon": "single emoji",
      "tip": "practical simple tip",
      "category": "Timing|Tools|Behavior|Dress|Safety"
    }
  ],
  "watchOut": "one important caution",
  "goodLuckMessage": "encouraging Hinglish send-off"
}
Include 4-5 tips total.`;

        const raw = await askClaude(
            system,
            `Job: ${JSON.stringify(jobDetails)}
Employer: ${JSON.stringify(employerDetails || "Unknown")}
Worker skills: ${JSON.stringify(workerSkills || "Unknown")}`,
            true
        );

        return NextResponse.json(
            parseAIJson(raw, {
                greeting: "Kal ka din aapka hai! 💪",
                tips: [
                    { icon: "⏰", tip: "15 minute pehle pahuncho", category: "Timing" },
                    { icon: "🦺", tip: "Safety equipment zaroor lao", category: "Safety" },
                ],
                watchOut: "Koi bhi document bina verify kiye mat do",
                goodLuckMessage: "All the best! Aap kar sakte ho! 🌟",
            })
        );
    } catch (error) {
        return aiErrorResponse(error, "interview-prep");
    }
}
