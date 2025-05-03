const express = require("express");

const app = express();

// app.use('/hello/xyz', (req, res) => {
//     res.send("Hello xyz!! from the server !")
// });

// app.use('/hello', (req, res) => {
//     res.send("Hello from the server !")
// });

// app.use('/test', (req, res) => {
//     res.send("Tester getting Hello from the server !")
// });

// app.use('/', (req, res) => {
//     res.send("Request from the server !")
// });




// app.use('/user', (req, res) => {               // ****  if we execute this code then the below code will not work because we are using the same path (use handle all methode ) for both the code. So we need to use different path for both the code.
//     res.send("🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀!")
// });

app.get('/user', (req, res) => {
    res.send("Geting request from the server !")
});

app.post('/user', (req, res) => {
    res.send("Posting Request from the server !")
});

app.delete('/user', (req, res) => {
    res.send("Deleting Request from the server !")
});

app.put('/user', (req, res) => {
    res.send("Puting Request from the server !")
});

app.patch('/user', (req, res) => {
    res.send("Patching Request from the server !")
});



app.listen(3000, () => {
    console.log("surver listening..... on 3000");
});
