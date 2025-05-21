const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");

userRouter.get("/user/connection/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const receivedRequsts = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", "firstName lastName photoUrl age gender skills about");

        // if (receivedRequsts.length === 0) {
        //     return res.status(404).json({ message: "No panding requests found" });
        // };

        res.status(200).json({ message: "Panding Requests is here", data: receivedRequsts });
    } catch (error) {
        res.status(500).send("ERROR : " + error.message);
        
    }
})


module.exports = userRouter;