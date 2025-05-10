const mongoose = require('mongoose');

// const User = new mongoose.Schema();

const { Schema } = require('mongoose');
const validator = require('validator');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        uppercase: true,
        minlength: 3,
        maxlength: 20,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if (! validator.isEmail(value)){
                throw new Error("Invalid email address" + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 20,
        validate(value) {
            if (! validator.isStrongPassword(value)){
                throw new Error("Password is not strong enough it should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one symbol");
            };
        }
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 65,
    },
    gender: {
        type: String,
        required: true,
        validate(value) {
            if (! ["male", "female", "other"].includes(value)) {
                throw new Error("gender data is invalid");
            }
        },
    },
    skills: {
        type: Array,
        default: ["JavaScript", "React", "Node.js"],
        trim: true,
    },
    about: {
        type: String,
        default: "Hello, I am a Software Engineer",
        trim: true,
    },
    photoUrl: {
        type: String,
        default: "https://static-00.iconduck.com/assets.00/web-developer-illustration-1004x1024-wcqgbag3.png",
        validate(value){
            if(! validator.isURL(value)){
                throw new Error("Invalid URL please provide a valid URL");
            }
        }
    },
}, 
{
    timestamps: true
});

// const User = mongoose.model('User', userSchema);
// module.exports = User;

module.exports = mongoose.model('User', userSchema);