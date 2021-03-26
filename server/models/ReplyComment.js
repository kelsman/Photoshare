const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReplyCommentSchema = new Schema({
    parentComment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },
    _user: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    text: { type: String, required: true },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = CommentReply = mongoose.model('CommentReply', ReplyCommentSchema);