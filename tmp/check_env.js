console.log("GEMINI_API_KEY present:", !!process.env.GEMINI_API_KEY);
if (process.env.GEMINI_API_KEY) {
    console.log("Length:", process.env.GEMINI_API_KEY.length);
    console.log("Starts with:", process.env.GEMINI_API_KEY.substring(0, 7));
}
