const express = require('express');
const app = express();

/*

It will hang because we didnot send any response to the client.

app.get("/user", (req, res, next) => {
    console.log("1st User route accessed");
    // res.send("1st responce accessed");

}, (req, res, next) => {
    console.log("2nd User route accessed");
    // res.send("2nd responce accessed");
});
*/

/*

In console- 1st User route accessed
In browser- 1st responce accessed

app.get("/user", (req, res, next) => {
    console.log("1st User route accessed");
    res.send("1st responce accessed");

}, (req, res, next) => {
    console.log("2nd User route accessed");
    res.send("2nd responce accessed");
});

*/

/*

in console- 1st User route accessed
          - 2nd User route accessed
In browser- 1st responce accessed
and also throws error in console- Error: Can't set headers after they are sent. because we are sending two responses to the same request.

app.get("/user", (req, res, next) => {
    console.log("1st User route accessed");

    res.send("1st responce accessed");
    next();

}, (req, res, next) => {
    console.log("2nd User route accessed");
    res.send("2nd responce accessed");
});
*/

/*

in console- 1st User route accessed
          - 2nd User route accessed
In browser- 2st responce accessed
and also throws error in console- Error: Can't set headers after they are sent. because we are sending two responses to the same request.
Order metter in code excution it will excute line by line and when it reach to next() it will go to 2nd route handler and send the response from there.
 

app.get("/user", (req, res, next) => {
    console.log("1st User route accessed");
    next();
    res.send("1st responce accessed");
    

}, (req, res, next) => {
    console.log("2nd User route accessed");
    res.send("2nd responce accessed");
});
*/

// we can have multiple route handlers for a single route.
// we can also wrap the route handlers in an array

app.get("/user", (req, res, next) => 

{
    console.log("1st User route accessed");
    next();
    res.send("1st responce accessed");
    

}, [(req, res, next) => {
    console.log("2nd User route accessed");
    res.send("2nd responce accessed");

}, (req, res, next) => {
    console.log("3rd User route accessed");
    res.send("3rd responce accessed");

}, (req, res, next) => {
    console.log("4th User route accessed");
    res.send("4th responce accessed");
}]
);


app.listen(7777, () => {
    console.log("Server is running on port 7777");
});