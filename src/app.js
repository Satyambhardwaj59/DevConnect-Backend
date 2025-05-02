const express = require("express");

const app = express();

app.use("/", (req, res) => {
    res.send("Hello Sam");
});

app.use("/hello", (req, res) => {
    res.send("Hello Satyam from the server!");
});

app.use("/test", (req, res) => {
    res.send("Hello Tester from the server!");
});

app.listen(7777, () => {
    console.log("surver listening.....");
    
});
