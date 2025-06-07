const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require('../middleware/auth');
const {validateEditProfileData} = require('../utils/validation');
const validator = require('validator');
const bcrypt = require('bcrypt');

// profile API
profileRouter.get("/profile/view",userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.json({message: "Done", user});
        
    } catch (error) {
        res.status(500).json({message : "ERROR : " + error.message});
        
    }
});

profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
    try {
        if(! validateEditProfileData(req)){
            throw new Error("Invalid Edit Request");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => {
            loggedInUser[key] = req.body[key];
        });
        await loggedInUser.save();

        res.json({message: `${loggedInUser.firstName} profile updated successfully`, data: loggedInUser});
        
    } catch (error) {
        res.status(400).json({message : "ERROR : " + error.message});
        
    }
});

profileRouter.patch('/profile/edit/password', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const {oldPassword, newPassword} = req.body;
        const isPasswordMatch = await loggedInUser.validatePassword(oldPassword);
        if(!isPasswordMatch){
            throw new Error("Old password is incorrect");
        };
        if(!validator.isStrongPassword(newPassword)){
            throw new Error("New password is not strong enough it should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one symbol");
        };

        const passwordHash = await bcrypt.hash(newPassword, 10); 

        loggedInUser.password = passwordHash;
        await loggedInUser.save();
        res.json({message: `${loggedInUser.firstName} password updated successfully`});
        
    } catch (error) {
        res.status(400).json({message : "ERROR : " + error.message});
        
    }
})

module.exports = profileRouter;