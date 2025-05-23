const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_SHARING_FIELDS = "firstName lastName photoUrl age gender skills about";

userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id},
                { toUserId: loggedInUser._id}
            ]
        }).select("fromUserId toUserId");
        // .populate("fromUserId", "firstName").populate("toUserId", "firstName")

        const hideUsersFromFeed = new Set();
        connectionRequest.forEach((request) => {
            hideUsersFromFeed.add(request.fromUserId.toString());
            hideUsersFromFeed.add(request.toUserId.toString());
        });
        
        const users = await User.find({
            $and: [
                { _id: {$ne: loggedInUser._id}},
                { _id: {$nin: Array.from(hideUsersFromFeed)}}
            ]
        }).select(USER_SAFE_SHARING_FIELDS);
        

        res.status(200).json({ message: "Connections is here", data: users });
        
    } catch (error) {
        res.status(500).send("ERROR : " + error.message);
        
    }
})


module.exports = userRouter;