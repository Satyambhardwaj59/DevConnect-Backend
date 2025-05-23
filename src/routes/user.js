const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_SHARING_FIELDS = "firstName lastName photoUrl age gender skills about";

userRouter.get("/user/connection/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const receivedRequsts = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", USER_SAFE_SHARING_FIELDS);
        // }).populate("fromUserId", ["firstName", "lastName", "photoUrl", "age", "gender", "skills", "about"]);

        // if (receivedRequsts.length === 0) {
        //     return res.status(404).json({ message: "No panding requests found" });
        // };

        res.status(200).json({ message: "Panding Requests is here", data: receivedRequsts });
    } catch (error) {
        res.status(500).send("ERROR : " + error.message);
        
    }
});

userRouter.get("/user/connection", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionsData = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted"},
                { fromUserId: loggedInUser._id, status: "accepted"}
            ]     
        }).populate("fromUserId", USER_SAFE_SHARING_FIELDS).populate("toUserId", USER_SAFE_SHARING_FIELDS);

        const Data = connectionsData.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            } else {
                return row.fromUserId;
            }
        });

        res.status(200).json({ message: "Connections is here", data: Data });

    } catch (error) {
        res.status(500).send("ERROR : " + error.message);
        
    }
});

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