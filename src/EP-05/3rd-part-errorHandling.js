const express = require('express');
const app = express();

/*
app.use("/", (err, req, res, next) => {
  console.log("Error middleware: ", err.message);
  res.status(500).send("something went wrong!!!!!!");
  
})
*/

app.get("/getUserData", (req, res) => {
 /*
  try {
    throw new Error("User not found");
    res.status(200).send("User data retrieved successfully");
    
  } 
  catch (error) {
    console.error("Error occurred:", error.message);
    res.status(500).send("Internal Server Error: " + error.message);
    
  }
  */

    throw new Error("User not found");
    res.status(200).send("User data retrieved successfully");
});


// Always use the app level error handler at the end of all routes
app.use("/", (err, req, res, next) => {
  console.log("Error middleware: ", err.message);
  res.status(500).send("2nd something went wrong!!!!!!");
  
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});