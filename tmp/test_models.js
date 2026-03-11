const { GoogleGenerativeAI } = require("@google/generative-ai");

async function list() {
    try {
        const key = "AIzaSyAQY6C8G7HWh6B8821p7JuYCHVLDbFSv2Q";
        const genAI = new GoogleGenerativeAI(key);
        // The SDK doesn't have a direct listModels, but we can try to fetch a specific one or catch error
        console.log("Testing gemini-pro...");
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const res = await model.generateContent("hi");
        console.log("gemini-pro works:", res.response.text());
    } catch (e) {
        console.error("gemini-pro failed:", e.message);
        
        try {
            console.log("Testing gemini-1.5-pro...");
            const genAI = new GoogleGenerativeAI("AIzaSyAQY6C8G7HWh6B8821p7JuYCHVLDbFSv2Q");
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
            const res = await model.generateContent("hi");
            console.log("gemini-1.5-pro works:", res.response.text());
        } catch (e2) {
            console.error("gemini-1.5-pro failed:", e2.message);
        }
    }
}

list();
