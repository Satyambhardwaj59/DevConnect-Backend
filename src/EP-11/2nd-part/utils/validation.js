const validator = require('validator');

const validateSignupData = (req) => {
    const {firstName, lastName, password, emailId} = req.body;
    if(!firstName || ! lastName){
        throw new Error("Name should not be empty");
    }
    else if(firstName.length < 3 || firstName.length > 50){
        throw new Error("Name should be between 3 and 50 characters");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");
    }
    else if (!validator.isStrongPassword(password)){
        throw new Error("Password is not strong enough it should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one symbol");
    }

};

const validateEditProfileData = (req) => {
    const editAllowedFields = ['firstName', 'lastName', 'gender', 'age', 'skills', 'photoUrl', 'about'];
    const isEditAllowed = Object.keys(req.body).every((key) => editAllowedFields.includes(key));
    return isEditAllowed;

}

module.exports = {
    validateSignupData,
    validateEditProfileData,
};