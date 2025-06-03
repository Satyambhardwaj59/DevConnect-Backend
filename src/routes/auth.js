const express = require("express");
const authRouter = express.Router();
const User = require('../models/user');
const { validateSignupData } = require('../utils/validation');
const bcrypt = require('bcrypt');

authRouter.post('/signup', async (req, res) => {
    const {firstName, lastName, emailId, password} = req.body;
    try {

        // validate the request body
        validateSignupData(req);

        // password encryption

        const passwordHash = await bcrypt.hash(password, 10);    // 10 is the salt rounds

        // create a new user instance and save it to the database
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });
        const savedUser = await user.save();
        const token = await  savedUser.getJWT();

        // set cookie
        res.cookie("token", token,  {expires: new Date(Date.now() + 7 * 86400000 )});

        res.json({message:'User created successfully', user: savedUser});
    } catch (error) {
        res.status(500).send('ERROR : ' + error.message);
    }

});


authRouter.post("/login", async (req, res) => {
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
        res.json({ user}); 

    } catch (error) {
        res.status(500).send("ERROR : " + error.message);
        
    }
});

authRouter.post('/logout', async (req, res) => {
    res.cookie("token", null, {expires: new Date(Date.now())}); // cookie will expire immediately
    res.send("Logout successfully");
})


module.exports = authRouter;

// 
            // age,
            // gender,
            // skills,