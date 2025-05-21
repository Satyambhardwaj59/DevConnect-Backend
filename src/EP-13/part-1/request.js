const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middleware/auth');
const User = require('../models/user');
const ConnectionRequest = require('../models/connectionRequest');

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, requestId }= req.params;

        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).send("Invalid status");
        };

        const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
       });
        if (!connectionRequest) {
            return res
            .status(404)
            .json({ message: "Connection request not found" });
        }

      connectionRequest.status = status;

      const data = await connectionRequest.save();
        
        res.status(200).json({message: `Connection request ${status} successfully`, data});
        
    } catch (error) {
        res.status(500).send("ERROR : " + error.message);
        
    }
});


module.exports = requestRouter;