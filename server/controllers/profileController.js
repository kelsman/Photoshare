const User = require('../models/User');
const PostLikes = require('../models/Likepost');
const bcrypt = require('bcryptjs');
const { cloudinary } = require('../utils/cloudinary');

// const Post = require('../models/Post')
// const Notification = require('../models/Notification');
// const Following = require('../models/Following');
// const PostComments = require('../models/Comment');
const ObjectId = require('mongoose').Types.ObjectId;
const { id } = require('../validation');


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
        const user = await User.findOne({ _id: req.user.id });
        if (!req.file) {
            res.status(400)
                .send({ msg: 'Please provide the image to upload.' })
        }

        console.log(req.file)
        if (!user) {
            return res.json({ msg: "not authorised" })
        }
        await cloudinary.uploader.destroy(user.cloudinary_id, (result) => {
            console.log(result)
        });
        const upload = await cloudinary.uploader.upload(file, {
            use_filename: true,
            folder: "photoshare_post",
            resource_type: 'auto'
        });

        user.cloudinary_id = upload.public_id;
        user.avatar = upload.secure_url;
        await user.save();


        return res.status(201).json({ msg: "avatar changed sucessfully" })




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
        console.log(user)
        if (name) {
            if (name !== user.name) {
                user.name = name

            }
        }
        if (username) {
            if (username !== user.username) {
                const existingUser = await User.findOne({ username: username });
                if (existingUser) return res.status(400).json({ msg: 'username is taken' });
                user.username = username
            }
        }
        if (bio) {
            user.bio = bio
        }
        if (email) {
            if (email !== user.email) {
                const existingUser = await User.findOne({ email });
                if (existingUser) return res.status(400).json({ msg: 'email is taken' });
                user.email = email
            }
        }
        await user.save();
        res.json({ msg: "Profile updated" })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ msg: "server error" });
        next(error)
    }

}

exports.changePassword = async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    let currentPassword = undefined;

    try {
        const userDocument = await User.findById(req.user.id);
        currentPassword = userDocument.password;

        const result = await bcrypt.compare(oldPassword, currentPassword);
        if (!result) {
            return res.status('401').send({
                msg: 'Your old password was entered incorrectly, please try again.',
            });
        }

        userDocument.password = newPassword;
        await userDocument.save();
        return res.send({ msg: 'password updated succesfully' });
    } catch (err) {
        console.log(err)
        return next(err);
    }
};