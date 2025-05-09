const express = require('express');
const connectionDB = require('./config/database');
const app = express();
const User = require('./models/user');

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

connectionDB().then(() => {
    console.log('Database connected successfully');
    app.listen(7777, () => {
        console.log('Server is running on port 7777');
    });
}).catch(err => {
    console.error('Database connection failed:', err);
})