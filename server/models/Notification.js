const mongoose = require('mongoose');

const nototificationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    notificationType: {
        type: String,
        enum: ["follow", 'like', 'comment',]
    },
    dateAdded: {
        type: Date
    },
    metaData: {
        type: Object
    },
    seen: {
        type: Boolean,
        default: false,
    },

});

module.exports = Notification = mongoose.model('Notifications', nototificationSchema);