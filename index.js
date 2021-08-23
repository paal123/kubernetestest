const express = require("express");
const http = require("http");

const app = express();
const serviceUrl = process.env.LEADERELECTOR_SERVICE;
var hexId;


app.listen(3000, async function() {
    console.log("listening on port 3000 " + Date.now());
    console.log("Your leader elector service is " + serviceUrl);

    // Synchronous
    const {
        randomBytes
    } = await import('crypto');
  
    hexId = randomBytes(8).toString("hex");
});

app.get("/", (req,res) => {
    res.send("Use endpoint /CheckLeader?caller=yourid");
});

app.get("/checkLeader", async (req,res) => {
    console.log("Executing Check Leader at " + Date.now());

    var options = {
        hostname: serviceUrl,
        port: 3003,
        path: '/ProceedAsLeader?' + new URLSearchParams({caller: hexId}).toString(),
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'GET'
    }

    console.log("With options " + JSON.stringify(options));

    const reqLeader = await http.request(options, resLeader => {
        console.log(`statusCode: ${resLeader.statusCode}`);   
        let all_chunks = [];
        resLeader.on('data', (chunk) => {
            all_chunks.push(chunk);
        });

        resLeader.on('end', () => {
            let response_body = Buffer.concat(all_chunks);
            
            // response body as string
            console.log(response_body.toString());
            var iAmNowLeader = response_body.toString();
            if (iAmNowLeader === 'true') {
                res.send("Running as leader: " + iAmNowLeader + " from: " + hexId);
            } else {
                res.send("Not running as leader, skipping: " + iAmNowLeader + " from: " + hexId);
            }
        });
      });
      
    reqLeader.on('error', error => {
      console.error(error)
    });
      
    reqLeader.end();
});