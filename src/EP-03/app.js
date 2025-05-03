const express = require("express");

const app = express();

app.use('/hello/xyz', (req, res) => {
    res.send("Hello xyz!! from the server !")
});

app.use('/hello', (req, res) => {
    res.send("Hello from the server !")
});

app.use('/test', (req, res) => {
    res.send("Tester getting Hello from the server !")
});

app.use('/', (req, res) => {
    res.send("Request from the server !")
});

app.listen(3000, () => {
    console.log("surver listening..... on 3000");
});
