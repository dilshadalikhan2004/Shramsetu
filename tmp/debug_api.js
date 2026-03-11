const https = require('https');
const fs = require('fs');

const data = JSON.stringify({
  contents: [{ parts: [{ text: "hi" }] }]
});

const options = {
  hostname: 'generativelanguage.googleapis.com',
  path: '/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAQY6C8G7HWh6B8821p7JuYCHVLDbFSv2Q',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  let responseBody = '';
  res.on('data', (chunk) => { responseBody += chunk; });
  res.on('end', () => {
    fs.writeFileSync('c:/Users/LENOVO/Downloads/Shramsetu-Dillu-shramsetu/tmp/debug_resp.json', JSON.stringify({
      statusCode: res.statusCode,
      body: responseBody
    }, null, 2));
    console.log("Done debug");
  });
});

req.on('error', (error) => {
  fs.writeFileSync('c:/Users/LENOVO/Downloads/Shramsetu-Dillu-shramsetu/tmp/debug_resp.json', error.message);
});

req.write(data);
req.end();
