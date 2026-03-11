export function safeJsonParse<T>(data: string | null | undefined, fallback: T): T {
    if (!data) return fallback;
    try {
        return JSON.parse(data) as T;
    } catch (e) {
        console.error('Failed to parse JSON:', data);
        return fallback;
    }
}
