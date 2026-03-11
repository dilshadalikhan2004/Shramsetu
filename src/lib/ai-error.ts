import { NextResponse } from "next/server";

export function aiErrorResponse(error: unknown, feature: string) {
    console.error(`AI Feature [${feature}] failed:`, error);
    return NextResponse.json(
        {
            error: "AI service temporarily unavailable",
            feature,
            fallback: true,
        },
        { status: 503 }
    );
}

export function parseAIJson<T>(text: string, fallback: T): T {
    try {
        const cleaned = text
            .replace(/```json\n?/g, "")
            .replace(/```\n?/g, "")
            .trim();
        return JSON.parse(cleaned) as T;
    } catch {
        console.error("Failed to parse AI JSON:", text.slice(0, 200));
        return fallback;
    }
}
