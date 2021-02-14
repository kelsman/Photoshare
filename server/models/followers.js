const mongoose = require('mongoose');

const followersSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
});

const Followers = mongoose.model('Followers', followersSchema);

module.exports = Followers;