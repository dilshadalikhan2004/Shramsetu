async function listModels() {
    const key = "AIzaSyAQY6C8G7HWh6B8821p7JuYCHVLDbFSv2Q";
    const url = `https://generativelanguage.googleapis.com/v1/models?key=${key}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log("Available Models:", JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("Fetch failed:", e.message);
    }
}

listModels();
