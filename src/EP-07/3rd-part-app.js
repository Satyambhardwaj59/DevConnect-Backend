const express = require('express');
const connectionDB = require('./config/database');
const app = express();
const User = require('./models/user');

// middleware to parse JSON request bodies
app.use(express.json());

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

app.patch("/user", async (req, res) => {
    const userId = req.body._id;
    const user = req.body;
    try {
        const updateUser = await User.findByIdAndUpdate(userId, user, {returnDocument: "after"});
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