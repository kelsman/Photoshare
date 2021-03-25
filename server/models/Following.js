const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowingSchema = new Schema({
    _user: {
        type: Schema.ObjectId,
        ref: 'Users'
    },
    _following: [
        {
            user: {
                type: Schema.ObjectId,
                ref: 'Users'
            },
            username: String,
            avatar: String,
        }
    ]
});

module.exports = Following = mongoose.model('Following', FollowingSchema);
