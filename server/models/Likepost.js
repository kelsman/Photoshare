const mongoose = require('mongoose');

const PostlikesSchema = new mongoose.Schema({

    _post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts"
    },
    likes: [
        {
            _user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Users"
            },
            username: String,
            avatar: String,
        },

    ],

    date: {
        type: Date,
        default: Date.now()
    }





});


module.exports = PostLikes = mongoose.model('LikePosts', PostlikesSchema);


