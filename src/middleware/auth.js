const jwt = require('jsonwebtoken');
const  User  = require('../models/user');

const userAuth = async (req, res, next) => {
    try {
        const cookie = req.cookies;
        const {token} = cookie;
        if(!token ){
            throw new Error("Please Login!!!!");
        }

        const decodedData = await jwt.verify(token, "DEV@Connect1234");
        const {_id} = decodedData;
        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not found");
        }
        req.user = user;
        next();
        
    } catch (error) {
        res.status(401).json({message : "ERROR : " + error.message});
        
    }
    
};

module.exports = {userAuth};