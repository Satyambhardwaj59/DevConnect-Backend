const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// const User = new mongoose.Schema();

const { Schema } = require('mongoose');
const validator = require('validator');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        index: true,
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
        validate(value) {
            if (! validator.isStrongPassword(value)){
                throw new Error("Password is not strong enough it should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one symbol");
            };
        }
    },
    age: {
        type: Number,
        default: 19,
        min: 18,
        max: 65,
    },
    gender: {
        type: String,
        default: "male",
        enum: {
            values: ["male", "female", "other"],
            message: "{VALUE} gender is invalid"
        }
        // validate(value) {
        //     if (! ["male", "female", "other"].includes(value)) {
        //         throw new Error("gender data is invalid");
        //     }
        // },
    },
    skills: {
        type: Array,
        default: ["JavaScript", "React", "Node.js"],
        trim: true,
        validate(value) {
            if (value.length >= 15) {
                throw new Error("Skills length should be less than 15");
            }
        }
    },
    about: {
        type: String,
        default: "Hello, I am a Software Engineer",
        trim: true,
    },
    photoUrl: {
        type: String,
        default: "https://img.freepik.com/premium-vector/user-circle-with-blue-gradient-circle_78370-4727.jpg?semt=ais_hybrid&w=740",
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

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({_id: user._id}, "DEV@Connect1234", { expiresIn: '7d' });
    return token;
}

userSchema.methods.validatePassword = async function (password) {
    const user = this;
    const isPasswordValidate = await bcrypt.compare(password, user.password);
    return isPasswordValidate;
}

// const User = mongoose.model('User', userSchema);
// module.exports = User;

module.exports = mongoose.model('User', userSchema);