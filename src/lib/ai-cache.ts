import crypto from "crypto";

export async function getCachedAIResult(
    feature: string,
    inputData: object
): Promise<object | null> {
    return null;
}

export async function cacheAIResult(
    userId: string,
    feature: string,
    inputData: object,
    result: object
): Promise<void> {
    // No-op cache for now
}
