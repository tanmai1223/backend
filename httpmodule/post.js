const http = require("http");

const postData = JSON.stringify({
    title: "foo",
    body: "bar",
    userId: 1
});

const options = {
    hostname: "jsonplaceholder.typicode.com",
    port: 80,
    path: "/posts",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData)  // ✅ fix here
    }
};

const req = http.request(options, (res) => {
    console.log(`Status Code: ${res.statusCode}`);

    let responseData = "";

    res.on("data", (chunk) => {
        responseData += chunk;
    });

    res.on("end", () => {
        console.log("POST Response:", JSON.parse(responseData));
    });
});

req.on("error", (err) => {
    console.error(err);
});

req.write(postData); // ✅ fix here
req.end();
