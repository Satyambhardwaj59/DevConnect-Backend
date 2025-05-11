const express = require('express');
const connectionDB = require('./config/database');
const app = express();
const User = require('./models/user');
const { validateSignupData } = require('./utils/validation');
const bcrypt = require('bcrypt');

// middleware to parse JSON request bodies
app.use(express.json());

// LOGIN API
app.post("/login", async (req, res) => {
    const {emailId, password} = req.body;
    try {
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid Email or password");
        };

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            throw new Error("Invalid Email or password");
        }
        res.send("Login successfully");

    } catch (error) {
        res.status(500).send("ERROR : " + error.message);
        
    }
})

connectionDB().then(() => {
    console.log('Database connected successfully');
    app.listen(7777, () => {
        console.log('Server is running on port 7777');
    });
}).catch(err => {
    console.error('Database connection failed:', err);
})