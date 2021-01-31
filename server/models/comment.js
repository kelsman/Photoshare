const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CommentSchema = new Schema({

    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    text: {
        type: String,
        required: true

    },
    date: {
        type: Date,
        default: Date.now
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    }
});

module.exports = Comment = mongoose.model("Comment", CommentSchema);
