const https = require('https');

const key = "AIzaSyAQY6C8G7HWh6B8821p7JuYCHVLDbFSv2Q";
const url = `https://generativelanguage.googleapis.com/v1/models?key=${key}`;

https.get(url, (res) => {
    let data = '';
    console.log('Status Code:', res.statusCode);
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.models) {
                console.log('Models found:', json.models.map(m => m.name));
            } else {
                console.log('No models property. Response:', data);
            }
        } catch (e) {
            console.log('Raw data (not JSON):', data);
        }
    });
}).on("error", (err) => {
    console.error("Error:", err.message);
});
