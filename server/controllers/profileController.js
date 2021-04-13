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

exports.changeAvatar = async (req, res, next) => {

    const file = req.file.path
    //  make sure logged in user is the one uploading
    try {
        if (file) {
            console.log(req.file)
            const user = await User.findOne({ _id: req.user.id });
            if (!user) {
                return res.json({ msg: "not authorised" })
            }
            const upload = await cloudinary.uploader.upload(file, {
                use_filename: true,
                folder: "photoshare_post",
                resource_type: 'auto'
            });
            if (upload) {
                await User.findOneAndUpdate({
                    _id: req.user.id
                },
                    {
                        avatar: upload.secure_url
                    },
                    { upsert: true, new: true }
                ).exec()
                return res.status(200).json({ msg: "avatar changed succesfully" })

            } else {
                return res.status(500).json({ msg: "failed to change profile picture" })
            }




        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "server error" })
    }
}

//  edit profile

exports.editProfile = async (req, res, next) => {


    const { name, email, bio, username } = req.body;
    try {
        //  get the user
        const user = await User.findById(req.user.id);
        if (!user) res.status(400).json({ msg: "unauthorised user" });
        switch ({ name, email, bio, username }) {
            case name:
                user.name = name
                break;
            case email:
                user.email = email
                break;
            case username:
                user.username = username
                break;
            default:
                null;
                break;
        }
        await user.save();
        res.json({ msg: "updated" })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ msg: "server error" });
        next(error)
    }

}