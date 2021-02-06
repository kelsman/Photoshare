const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CommentSchema = new Schema({

    authorId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    authorPicture: {
        type: String
    },
    authorName: {
        type: String,
    },
    text: {
        type: String,
        required: true

    },
    date: {
        type: Date,
        default: Date.now
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    }
});

module.exports = Comment = mongoose.model("Comment", CommentSchema);
