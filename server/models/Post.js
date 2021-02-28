
const { timeStamp } = require('console')
const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({

    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    caption: String,
    postMedia: {
        type: String,
        required: true
    },
    cloudinary_id: String,
    likes: [
        {
            likedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Users"
            }
        }
    ],
    comments: [{
        commentBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        }
    }],
    date: {
        type: Date,
        default: Date.now()
    }

});

module.exports = Post = mongoose.model('Posts', postSchema);