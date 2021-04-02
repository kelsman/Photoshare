const User = require('../models/User');
const PostLikes = require('../models/Likepost');

const { cloudinary } = require('../utils/cloudinary');

// const Post = require('../models/Post')
// const Notification = require('../models/Notification');
// const Following = require('../models/Following');
// const PostComments = require('../models/Comment');
const ObjectId = require('mongoose').Types.ObjectId


exports.getUserProfile = async (req, res, next) => {
    const unwantedFields = [
        "__v",
        "password",
        "cloudinary_id",
        "postedBy",
        "posts.clousinary_id",
        "DateCreated"
    ]
    try {
        const userProfile = await User.aggregate([
            {
                $match: {
                    "username": req.params.username
                }
            },
            {
                $lookup: {
                    from: 'followers',
                    localField: '_id',
                    foreignField: '_user',
                    as: "followers"
                }
            },
            {
                $lookup: {
                    from: 'followings',
                    localField: '_id',
                    foreignField: '_user',
                    as: "following"
                }
            },
            {
                $lookup: {
                    from: 'posts',
                    localField: '_id',
                    foreignField: 'postedBy',
                    as: 'posts'
                }
            },

            { $unwind: { "path": '$followers', "preserveNullAndEmptyArrays": true } },
            { $unwind: { "path": '$following', "preserveNullAndEmptyArrays": true } },


            {
                $addFields: {
                    following: "$following._following",
                    followers: "$followers._followers",
                    posts: "$posts"
                }
            },

            { $unset: [...unwantedFields] }

        ]);

        if (!userProfile) {
            return res.status(400).json('profile not found')
        }

        return res.status(200).json({ userProfile })

    } catch (error) {

        return res.status(500).json({ msg: 'server error' })
        next(error)
    }
}