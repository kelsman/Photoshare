

const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({

    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    caption: {
        type: String
    },
    postMedia: {
        type: String,
        required: true
    },
    cloudinary_id: String,

    date: {
        type: Date,
        default: Date.now()
    }

});

module.exports = Post = mongoose.model('Posts', postSchema);