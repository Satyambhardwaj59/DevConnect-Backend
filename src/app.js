const express = require('express');
const connectionDB = require('./config/database');
const app = express();
const User = require('./models/user');
const { validateSignupData } = require('./utils/validation');
const bcrypt = require('bcrypt');

// middleware to parse JSON request bodies
app.use(express.json());

// it will return one document
app.get('/user', async (req, res) => {
    try {
        const user = await User.findOne({ emailId: req.body.emailId});
        if (!user) {
             res.status(404).send('User not found');
            
        } else {
            res.send(user);
        }
        
    } catch (error) {
        res.status(404).send('something went wrong');
    };
});

// feed API

app.get("/feed", async (req, res) => {
    try {
        // const users = await User.find({emailId: req.body.emailId});
 
        const users = await User.find({});      // it will return all documents
        if(users.length === 0) {
            res.status(404).send("No users found");
        } else {
            res.send(users);
        }
        
    } catch (error) {
        res.status(500).send("something went wrong");
    };
});

app.get("/id", async (req, res) => {
    try {
        const users = await User.findById(req.body._id);
        if(users.length === 0) {
            res.status(404).send("No users found");
        } else {
            res.send(users);
        }
        
    } catch (error) {
        res.status(500).send("something went wrong");
    };
});


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

// DELETE API

app.delete("/user", async (req, res) => {
    const userId = req.body._id;
    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
        
    } catch (error) {
        res.status(500).send("something went wrong");
        
    };
});

// UPDATE API

app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const user = req.body;
    
    try {

        const ALLOWED_UPDATES = ["gender", 'about', "photoUrl", "skills", "age" ];
        const isValidOperation = Object.keys(user).every((update) => {
            return ALLOWED_UPDATES.includes(update);
        });

        if(!isValidOperation){
            throw new Error("Invalid updates, it should be not allowed");
        };
        if(user.skills.length > 15){
            return res.status(400).send("Skills length should be less than 15");
        };

        const updateUser = await User.findByIdAndUpdate(userId, user, {returnDocument: "after"}, {validation: true });
        console.log(updateUser);
        
        res.send("User updated successfully");
        
    } catch (error) {
        res.status(500).send("something went wrong" + error.message);
        
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