const express = require('express');
const connectionDB = require('./config/database');
const app = express();
const User = require('./models/user');
const { validateSignupData } = require('./utils/validation');
const bcrypt = require('bcrypt');
const cokkieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { userAuth } = require('./middleware/auth');

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

        const isPasswordMatch = await user.validatePassword(password);
        if(!isPasswordMatch){
            throw new Error("Invalid Email or password");
        }

        // generate JWT token
        const token = await  user.getJWT();

        // set cookie
        res.cookie("token", token,  {expires: new Date(Date.now() + 7 * 86400000 )}); // cookie will expire in 7 days
        res.send("Login successfully"); 

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