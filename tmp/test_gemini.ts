import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

async function test() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
        console.error("No API key");
        return;
    }
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    try {
        const result = await model.generateContent("Say hello");
        console.log("Reply:", result.response.text());
    } catch (e) {
        console.error("Error:", e);
    }
}

test();
