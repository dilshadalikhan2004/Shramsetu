import { NextRequest, NextResponse } from "next/server";
import { askGemini } from "@/lib/gemini";
import { aiErrorResponse, parseAIJson } from "@/lib/ai-error";

interface Application {
    id: string;
    worker_id: string;
    bid_amount: number;
    worker_note?: string;
}

export async function POST(req: NextRequest) {
    try {
        const { jobId } = await req.json();
        if (!jobId) return NextResponse.json({ error: "jobId required" }, { status: 400 });

        // Currently missing DB connectivity — mock fetching applications
        const applications: Application[] = [];
        const job = { id: jobId, title: "Job Title", category: "Labor" };

        if (!applications?.length || !job) {
            return NextResponse.json([]);
        }

        // Fetch worker profiles for each applicant — mock for now
        const workerMap = new Map();

        const system = `You are a hiring AI for Indian blue-collar jobs.
Rank candidates best-first. Return JSON array:
[{
  "applicationId": "string",
  "score": integer_0_to_100,
  "rank": integer_starting_1,
  "badge": "Top Pick|Strong Match|Good Fit|Consider",
  "reason": "max 8 words"
}]`;

        const candidates = applications.map((a) => ({
            applicationId: a.id,
            bidAmount: a.bid_amount,
            note: a.worker_note,
            worker: workerMap.get(a.worker_id) ?? null,
        }));

        const raw = await askGemini(
            system,
            `Job: ${JSON.stringify(job)}\nCandidates: ${JSON.stringify(candidates)}`,
            true
        );

        return NextResponse.json(
            parseAIJson(raw, applications.map((a, i) => ({
                applicationId: a.id,
                score: 50,
                rank: i + 1,
                badge: "Consider",
                reason: "Manual review recommended",
            })))
        );
    } catch (error) {
        return aiErrorResponse(error, "rank-candidates");
    }
}
