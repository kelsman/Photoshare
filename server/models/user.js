const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
    },
    password: {
        type: String,
        required: true,
    },
    password2: {
        type: String,
        required: true
    },
    resetPassword: {
        type: String,
    },

    displayPicture: {
        type: String
    },
    cloudinary_id: {
        type: String
    },
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    ],
    followedBy: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ]


});

module.exports = User = mongoose.model("User", userSchema);