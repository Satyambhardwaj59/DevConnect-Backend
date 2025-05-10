const express = require('express');
const connectionDB = require('./config/database');
const app = express();
const User = require('./models/user');

// middleware to parse JSON request bodies
app.use(express.json());


app.post('/signup', async (req, res) => {
    const userObj = req.body;
    try {
        
        if(userObj.skills.length > 15){
            return res.status(400).send("Skills length should be less than 15");
        };

        // create a new user instance and save it to the database
        const user = new User(userObj);
        await user.save();

        res.send('User created successfully');
    } catch (error) {
        res.status(500).send('Error creating user' + error.message);
    }

});


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