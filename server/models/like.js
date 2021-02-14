const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({


    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    authorPicture: {
        type: String
    },
    authorName: {
        type: String,
    },

    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    date: {
        type: Date,
        default: Date.now
    }

});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;