const express = require('express');
const connectionDB = require('./config/database');
const app = express();
const User = require('./models/user');

// middleware to parse JSON request bodies
app.use(express.json());


app.post('/signup', async (req, res) => {
    const userObj = (req.body);
    console.log(req.body);
    

    try {
        // create a new user instance and save it to the database
        const user = new User(userObj);
        await user.save();

        res.send('User created successfully');
    } catch (error) {
        res.status(500).send('Error creating user' + error.message);
    }

});

// UPDATE API

app.patch("/user", async (req, res) => {
    const userId = req.body._id;
    const user = req.body;
    try {
        const updateUser = await User.findByIdAndUpdate(userId, user, {returnDocument: "after"}, {validation: true });
        console.log(updateUser);
        
        res.send("User updated successfully");
        
    } catch (error) {
        res.status(500).send("something went wrong");
        
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