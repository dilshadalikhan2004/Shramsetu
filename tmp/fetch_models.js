const https = require('https');
const fs = require('fs');

const key = "AIzaSyAQY6C8G7HWh6B8821p7JuYCHVLDbFSv2Q";
const url = `https://generativelanguage.googleapis.com/v1/models?key=${key}`;

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        fs.writeFileSync('c:/Users/LENOVO/Downloads/Shramsetu-Dillu-shramsetu/tmp/models_raw.json', data);
        console.log("Done");
    });
}).on("error", (err) => {
    fs.writeFileSync('c:/Users/LENOVO/Downloads/Shramsetu-Dillu-shramsetu/tmp/models_raw.json', err.message);
});
