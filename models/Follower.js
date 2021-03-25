const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowersSchema = new Schema({
    _user: {
        type: Schema.ObjectId,
        ref: 'Users'
    },
    _followers: [
        {
            user: {
                type: Schema.ObjectId,
                ref: 'Users'
            },
            avatar: String,
            username: String
        }
    ]
});

module.exports = Followers = mongoose.model('Followers', FollowersSchema);
