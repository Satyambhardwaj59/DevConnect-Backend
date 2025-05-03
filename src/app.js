const express = require("express");

const app = express();

// app.use('/user', (req, res) => {               // ****  if we execute this code then the below code will not work because we are using the same path (use handle all methode ) for both the code. So we need to use different path for both the code.
//     res.send("🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀!")
// });

// app.get('/user', (req, res) => {
//     res.send("Geting request from the server !")
// });

// app.get('/user', (req, res) => {
//     res.send({firstName: 'Satyam', lastName: 'Bhardwaj'});
// });

// app.post('/user', (req, res) => {
//     res.send("Posting Request from the server !")
// });

// app.delete('/user', (req, res) => {
//     res.send("Deleting Request from the server !")
// });

// app.put('/user', (req, res) => {
//     res.send("Puting Request from the server !")
// });

// app.patch('/user', (req, res) => {
//     res.send("Patching Request from the server !")
// });


//  ********  Advance Routing  ********* //

app.get("/a{b}c", async (req, res) => {
    res.send({firstName: 'Satyam', lastName: 'Bhardwaj'});
});

app.post("/ab{*cd}", async (req, res) => {
    res.send({firstName: 'Satyam', lastName: 'Bhardwaj'});
});
app.put("/a{bc}d", async (req, res) => {
    res.send({firstName: 'Satyam', lastName: 'Bhardwaj'});
});

app.patch("/ab\c", async (req, res) => {
    res.send({firstName: 'Satyam', lastName: 'Bhardwaj'});
});


app.listen(3000, () => {
    console.log("surver listening..... on 3000");
});
