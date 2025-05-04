const express = require('express');
const app = express();

/*
app.use('/user', (req, res, next) => {
  console.log('Middleware 1: Request received');    // This callback function is known as a middleware function.
  next();
  
});

app.get('/user', (req, res, next) => {
  console.log('Middleware 2: Processing request');   // This callback function is known as a middleware function.
  next();
},(req, res, next) => {
  console.log('Middleware 3: Processing request');  // This callback function is known as a middleware function.
  next();
},(req, res, next) => {
  console.log('Middleware 4: Processing request');  // This callback function is known as a Request handler function. Because it is handling the request and sending the response.
  res.send('Hello from Middleware 4!');
})

*/

const { adminAuth, userAuth} = require('..middleware/authDummy');

app.use("/admin", adminAuth);

app.get('/admin', (req, res) => {
  console.log('Admin route accessed');  
  res.send("Getting all information");
});

app.delete('/admin', (req, res) => {
  console.log('Admin Delete route accessed');  
  res.send("admin Delete user data");
});

app.post("/user/login", (req, res) => {
  console.log('User login route accessed');  
  res.send("User logedin successfully");
})

app.get("/user", userAuth, (req, res) => {
  console.log('User route accessed');  
  res.send("Getting all information");
});



app.listen(7777, () => {
  console.log('Server is running on port 7777');
});