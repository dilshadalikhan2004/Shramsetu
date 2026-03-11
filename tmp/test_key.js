const { GoogleGenerativeAI } = require("@google/generative-ai");

async function test() {
    const key = "AIzaSyAQY6C8G7HWh6B8821p7JuYCHVLDbFSv2Q"; // Key from .env
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    try {
        const result = await model.generateContent("Say hello");
        console.log("Reply:", result.response.text());
    } catch (e) {
        console.error("Error:", e.message || e);
    }
}

test();
