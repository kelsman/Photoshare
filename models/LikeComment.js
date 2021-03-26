const mongoose = require('mongoose');

const likeCommentSchema = new mongoose.Schema({
    _user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    _comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comments' },
    date: { type: Date, default: Date.now() }
});

module.exports = LikeComment = mongoose.model('LikeComments', likeCommentSchema);

