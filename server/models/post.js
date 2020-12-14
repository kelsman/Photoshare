const mongoose = require('mongoose');
const nodemon = require('nodemon');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;
const PostSchema = new Schema({

    user: {
        type: ObjectId,
        ref: "User"
    },
    postedBy: {
        type: string
    },
    postImg: {
        imgName: {
            type: String,
            default: "none",
            required: true

        },
        imgData: {
            type: String,
            required: true
        }

    },
    caption: {
        type: String,
        required: true
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
            }
        }
    ],
    Date: {
        type: Date,
        Default: Date.now
    }

});

module.exports = Post = mongoose.model("Post", PostSchema);