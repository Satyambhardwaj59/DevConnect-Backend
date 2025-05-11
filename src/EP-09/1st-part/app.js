const express = require('express');
const connectionDB = require('./config/database');
const app = express();
const User = require('./models/user');
const { validateSignupData } = require('./utils/validation');
const bcrypt = require('bcrypt');

// middleware to parse JSON request bodies
app.use(express.json());


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

connectionDB().then(() => {
    console.log('Database connected successfully');
    app.listen(7777, () => {
        console.log('Server is running on port 7777');
    });
}).catch(err => {
    console.error('Database connection failed:', err);
})