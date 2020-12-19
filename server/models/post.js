const mongoose = require('mongoose');
const nodemon = require('nodemon');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const PostSchema = new Schema({

    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    postImg: {

        type: String,
        required: true
    },
    cloudinary_id: {
        type: String,
    },

    caption: {
        type: String

    },
    likes: [
        {
            type: ObjectId,
            ref: "User"
        }
    ],
    comments: [
        {
            text: String,
            postedBy: {
                type: ObjectId,
                ref: "User"
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = Post = mongoose.model("Post", PostSchema);