const express = require('express');
const connectionDB = require('./config/database');
const app = express();
const User = require('./models/user');
const { validateSignupData } = require('./utils/validation');
const bcrypt = require('bcrypt');
const cokkieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// middleware to parse JSON request bodies
app.use(express.json());
app.use(cokkieParser());   // middleware to parse cookies


// LOGIN API
app.post("/login", async (req, res) => {
    const {emailId, password} = req.body;
    const cookie = req.cookies;
    try {
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid Email or password");
        };

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            throw new Error("Invalid Email or password");
        }

        // generate JWT token
        const token = await jwt.sign({_id: user._id}, "DEV@Connect1234");

        // set cookie
        res.cookie("token", token);
        res.send("Login successfully");

    } catch (error) {
        res.status(500).send("ERROR : " + error.message);
        
    }
});

// profile API
app.get("/profile", async (req, res) => {
    try {
        const cookie = req.cookies;
        const {token} = cookie;
        if(!token) {
            throw new Error("Token not found");
        }

        const decodedToken = await jwt.verify(token, "DEV@Connect1234");
        const {_id} = decodedToken;
        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not found");
        }
        
        res.send(user);
        
    } catch (error) {
        res.status(500).send("ERROR : " + error.message);
        
    }
});

connectionDB().then(() => {
    console.log('Database connected successfully');
    app.listen(7777, () => {
        console.log('Server is running on port 7777');
    });
}).catch(err => {
    console.error('Database connection failed:', err);
})