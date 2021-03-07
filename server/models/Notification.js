const mongoose = require('mongoose');

const nototificationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Users,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Users,
    },
    notificationType: {
        type: String,
        enum: ["follow", 'like', 'comment',]
    },
    date: {
        type: Date
    },
    notificationData: {
        type: Object
    },
    read: {
        type: Boolean,
        default: false,
    },
});

module.exports = Notification = mongoose.model('Notifications', nototificationSchema);