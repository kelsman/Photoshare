const mongoose = require('mongoose');
const storiesSchema = new mongoose.Schema({
    _user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    fileType: String,
    image: String,
    video: String,
    createdAt: { type: Date, default: Date.now }
});


module.exports = Stories = mongoose.model('Stories', storiesSchema);