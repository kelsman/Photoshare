

const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({

    caption: String,

    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    hasUserLiked: Boolean,
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