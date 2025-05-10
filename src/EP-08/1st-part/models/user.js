const mongoose = require('mongoose');

// const User = new mongoose.Schema();

const { Schema } = require('mongoose');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        uppercase: true,
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
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 20,
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
    about: {
        type: String,
        default: "Hello, I am a Software Engineer",
        trim: true,
    },
    photoUrl: {
        type: String,
        default: "https://static-00.iconduck.com/assets.00/web-developer-illustration-1004x1024-wcqgbag3.png",
    },
}, 
{
    timestamps: true
});

// const User = mongoose.model('User', userSchema);
// module.exports = User;

module.exports = mongoose.model('User', userSchema);