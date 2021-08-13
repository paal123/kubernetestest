const express = require("express");

const app = express();

app.listen(3000, function() {
    console.log("listening on port 3000 " + Date.now());
});

app.get("/", (req,res) => {
    console.log("Executing Users Shown " + Date.now());
    res.send("Users Shown " + Date.now());
});

app.get("/delete", (req,res) => {
    console.log("Executing Delete User " + Date.now() );
    res.send("Delete User " + Date.now());
});

app.get("/update", (req,res) => {
    console.log("Executing Updating User " + Date.now());
    res.send("User Updated " + Date.now());
});

app.get("/insert", (req,res) => {
    console.log("Executing Inserting User " + Date.now());
    res.send("User Inserted " + Date.now());
});