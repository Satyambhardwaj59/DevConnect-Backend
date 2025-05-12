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

app.post('/signup', async (req, res) => {
    const {firstName, lastName, emailId, password, age, gender, skills} = req.body;
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
            age,
            gender,
            skills,
        });
        await user.save();

        res.send('User created successfully');
    } catch (error) {
        res.status(500).send('ERROR : ' + error.message);
    }

});

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
        const token = await jwt.sign({_id: user._id}, "DEV@Connect1234", { expiresIn: '7d' });  // token will expire in 7 days

        // set cookie
        res.cookie("token", token, {expires: new Date(Date.now() + 7 * 86400000 )}); // cookie will expire in 7 days
        res.send("Login successfully");

    } catch (error) {
        res.status(500).send("ERROR : " + error.message);
        
    }
});

// Sending connection Request

app.post("/sendConnectionRequest",userAuth, async (req, res) => {
    try {
        const {firstName} = req.user;
        res.send(`Connection request sent by ${firstName}`);
    } catch (error) {
        res.status(500).send("ERROR : " + error.message);
        
    }
})

// profile API
app.get("/profile",userAuth, async (req, res) => {
    try {
        const user = req.user;
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