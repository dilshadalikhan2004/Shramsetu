import { NextRequest, NextResponse } from "next/server";
import { askGemini } from "@/lib/gemini";
import { aiErrorResponse, parseAIJson } from "@/lib/ai-error";

export async function POST(req: NextRequest) {
    try {
        const { jobId, workerId } = await req.json();
        if (!jobId || !workerId) {
            return NextResponse.json({ error: "jobId and workerId required" }, { status: 400 });
        }

        // Mock data fetching since DB is not connected
        const workerProfile = { id: workerId, name: "Worker", skills: ["Plumbing"] };
        const job = { id: jobId, title: "Plumbing Job", daily_rate: 800, category: "Plumber" };
        const existingBids: { bid_amount: number }[] = [];

        const bids = (existingBids ?? []).map((b) => b.bid_amount).filter(Boolean) as number[];
        const avgBid = bids.length ? Math.round(bids.reduce((a, b) => a + b, 0) / bids.length) : null;

        const system = `You are a bid optimizer for Indian blue-collar workers.
Suggest optimal bid to maximize acceptance probability while maximizing pay.
Return JSON:
{
  "suggestedBid": integer_INR_per_day,
  "minViable": integer_INR_per_day,
  "maxReasonable": integer_INR_per_day,
  "acceptanceProbability": integer_0_to_100,
  "strategy": "one sentence bidding strategy",
  "reasoning": "2-3 sentences"
}`;

        const raw = await askGemini(
            system,
            `Job: ${JSON.stringify(job)}
Worker: ${JSON.stringify(workerProfile)}
Average competing bid: ${avgBid ?? "unknown"}
Total competing bids: ${bids.length}`,
            true
        );

        return NextResponse.json(
            parseAIJson(raw, {
                suggestedBid: job?.daily_rate ?? 800,
                minViable: 600,
                maxReasonable: 1200,
                acceptanceProbability: 60,
                strategy: "Bid at employer's listed rate to maximize chances",
                reasoning: "Based on your profile and market conditions.",
            })
        );
    } catch (error) {
        return aiErrorResponse(error, "bid-suggest");
    }
}
