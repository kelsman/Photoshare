const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

    _post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts"
    },
    comments: [
        {
            _user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
            commentText: {
                type: String,

            },
            username: String,
            avatar: String,
            commentDate: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now()
    }
});


module.exports = PostComments = mongoose.model('Comments', commentSchema);
