const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_SHARING_FIELDS = "firstName lastName photoUrl age gender skills about";

userRouter.get("/user/connection", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionsData = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted"},
                { fromUserId: loggedInUser._id, status: "accepted"}
            ]     
        }).populate("fromUserId", USER_SAFE_SHARING_FIELDS);

        res.status(200).json({ message: "Connections is here", data: connectionsData });

    } catch (error) {
        res.status(500).send("ERROR : " + error.message);
        
    }
});


module.exports = userRouter;