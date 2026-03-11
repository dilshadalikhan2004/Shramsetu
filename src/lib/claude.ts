import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Get configured Gemini AI client
 */
export function getGeminiClient(): GoogleGenerativeAI {
    // We check for GEMINI_API_KEY.
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
        throw new Error("GEMINI_API_KEY is not set in environment variables. Please add it to your .env file.");
    }
    return new GoogleGenerativeAI(key);
}

/**
 * Ask Gemini a question with an optional system prompt and JSON mode
 */
export async function askGemini(
    systemPrompt: string,
    userMessage: string,
    jsonMode = false
): Promise<string> {
    try {
        const model = getGeminiClient().getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: jsonMode
                ? systemPrompt +
                "\n\nCRITICAL: Respond with valid JSON only. " +
                "No markdown fences, no explanation text, no preamble."
                : systemPrompt,
        });

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: userMessage }] }],
            generationConfig: {
                maxOutputTokens: 2048, // Increased for longer responses
                responseMimeType: jsonMode ? "application/json" : "text/plain",
            },
        });

        const response = result.response;
        return response.text();
    } catch (error: any) {
        console.error("Gemini API error:", error);

        // Handle specific quota errors
        if (error.message?.includes('429')) {
            throw new Error("AI service rate limit reached. Please wait a moment.");
        }

        throw new Error("AI service temporarily unavailable");
    }
}

/**
 * Ask Gemini identifying content in an image
 */
export async function askGeminiWithImage(
    systemPrompt: string,
    imageBase64: string,
    mediaType: "image/jpeg" | "image/png" | "image/webp" = "image/jpeg"
): Promise<string> {
    try {
        const model = getGeminiClient().getGenerativeModel({
            model: "gemini-1.5-flash",
        });

        // Strip data URI prefix if present
        const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");

        const parts = [
            {
                inlineData: {
                    data: base64Data,
                    mimeType: mediaType,
                },
            },
            { text: systemPrompt },
        ];

        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            generationConfig: {
                maxOutputTokens: 1024,
            },
        });

        const response = result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini Vision API error:", error);
        throw new Error("AI image analysis temporarily unavailable");
    }
}
