const tokken = "abcd";

const adminAuth = (req, res, next) => {
    console.log('Admin auth : Request received');    
    const isAdminAuthorized = tokken === "abcd";
    if(!isAdminAuthorized){
        res.status(401).send('Unauthorized access!');
    }else{
        next();
    }
    
};

const userAuth = (req, res, next) => {
    console.log('User auth : Request received');  
    const isUserAuthorized = tokken === "abcd";
    if(!isUserAuthorized){
        res.status(401).send('Unauthorized access!');
    } else{
        next();
    }
    
};

module.exports = {
    adminAuth,
    userAuth
}