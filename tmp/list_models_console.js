const https = require('https');

const key = "AIzaSyAQY6C8G7HWh6B8821p7JuYCHVLDbFSv2Q";
const url = `https://generativelanguage.googleapis.com/v1/models?key=${key}`;

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log('--- API RESPONSE START ---');
        console.log(data);
        console.log('--- API RESPONSE END ---');
    });
}).on("error", (err) => {
    console.error("Error:", err.message);
});
