
const User = require('../models/User');
const authSchema = require('../validation');
const sendEmail = require('../utils/sendMail');
const crypto = require('crypto');
const Following = require('../models/Following')
const Followers = require('../models/Follower');
const mongoose = require('mongoose')

const ObjectId = mongoose.Types.ObjectId
const { cloudinary } = require('../utils/cloudinary');


// @ sign up a new user 
exports.signUp = async (req, res, next) => {
    const { name, username, email, password } = req.body;

    try {
        //check if user already exists 
        const doesExists = await User.findOne({ email });
        if (doesExists) {
            return res.status(404).json({ success: false, msg: "Email is already taken" });
        };
        //if user doesn't exist we validate the user inputs 
        await authSchema.validateAsync(req.body);

        //  upload to cloudinary
        const upload = await cloudinary.uploader.upload(req.file.path, {
            folder: "avatars",
            use_filename: true,
            allowed_formats: ["jpeg", 'png', 'gif']
        });
        if (!upload) {
            return res.status(401).json({ success: false, msg: "error in saving profile-picture" })
        }

        const user = new User({
            name,
            username,
            email,
            password,
            avatar: upload.secure_url,
            cloudinary_id: upload.public_id
        });
        await user.save()
        res.status(201).json({ success: true, msg: "account created successfully" });


    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, msg: "server error" })
        next(error);
    }

};

// @sign in a user

exports.signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        //check if user exists 
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, msg: 'invalid credentials' })
        };

        // check if password matches 
        const isMatch = await user.matchPasswords(password);
        if (!isMatch) {
            return res.status(404).json({ success: false, msg: "Invalid Credentials" });
        };
        // create a jwt token 
        const jwtToken = await user.generateToken();
        res.status(201).json({ success: true, jwtToken });


    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
        next(error);
    }
};

// get signed in user 
exports.getUser = async (req, res, next) => {
    try {

        // const user = await User.findById(req.user.id).select('-password');

        const unwantedFields = [
            "password",
            'cloudinary_id',
            'DateCreated',
            'resetPasswordToken',
            '__v'
        ]
        const user = await User.aggregate([
            {
                $match: {
                    _id: ObjectId(req.user.id)
                }
            },
            {
                $lookup: {
                    from: 'followings',
                    localField: '_id',
                    foreignField: '_user',
                    as: 'following',
                }
            },
            {
                $lookup: {
                    from: 'followers',
                    localField: '_id',
                    foreignField: '_user',
                    as: 'followers'
                }
            },
            { $unwind: { "path": "$following", "preserveNullAndEmptyArrays": true } },
            { $unwind: { "path": "$followers", "preserveNullAndEmptyArrays": true } },
            {
                $addFields: {
                    "followers": "$followers._followers",
                    "following": "$following._following"
                }
            },
            { $unset: [...unwantedFields] }

        ]);
        if (!user) {
            return res.status(404).json({ success: false, msg: "unauthorised" })
        };
        res.status(200).json({ success: true, user })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "server error" + ":" + error.message });
        next(error)
    }
};


//@forget password
exports.forgetPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, response: "no account found with this email" })
        };
        // set up url that will include the resetpassword token;
        const resetToken = user.getPasswordResetToken();

        await user.save();

        const resetUrl = `http://localhost:9000/${resetToken}`
        const message = `
        <h1> You have requested a password reset </h1>
        <p> please click on the link below </p>
        <a href= ${resetUrl}> ${resetUrl}</a>
        `

        await sendEmail({

            to: email,
            subject: 'password reset',
            text: message
        });
        res.status(200).json({ success: true, data: "Email Sent", email: message });
    } catch (error) {
        console.log(error.message);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        user.save();
        return res.status(500).json({ success: false, error: "email could not be sent" });
    }
}
//@ reset password
exports.resetPassword = async (req, res, next) => {

    // compare token from the url 
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");


    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }

        });
        if (!user) {
            return res.status(400).json({ success: false, error: "invalid Token" });
        };
        user.password = req.body.newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        res.status(201).json({
            sucess: true,
            msg: "password updated successfully"
        });


    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ sucess: false, msg: "server error" })

    }
}

//  follow a user 
exports.followUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        //  get the user to be followed
        const followUser = await User.findById(req.params.userid)

        if (!followUser) {
            return res.status(404).json({ msg: "this user does not exist" })
        }
        if (String(user._id) == String(req.params.userid)) {
            return res.send("sorry u can't follow youself")
        }

        const isFollowing = await Following.findOne(
            { $and: [{ _user: req.user.id }, { _following: { $elemMatch: { user: req.params.userid } } }] }
        )
        if (isFollowing) {
            return res.status(400).json({ msg: "you follow this user already" })
        }


        await Following.updateOne(
            { _user: req.user.id },
            {

                $push: {

                    _following: {
                        user: followUser._id,
                        username: followUser.username,
                        avatar: followUser.avatar
                    }
                }

            },
            { upsert: true, new: true }
        ).exec()

        //  update the followeduser follower model

        await Followers.updateOne(
            { _user: followUser._id },
            {
                $push: {
                    _followers: {
                        user: req.user.id,
                        avatar: user.avatar,
                        username: user.username
                    }
                }

            },
            { upsert: true, new: true }
        ).exec();
        res.status(201).json({ msg: "follow success" });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ msg: error.message });
        next(err)
    }

}
exports.unFollowUser = async (req, res, next) => {

    try {

        //  **  logged in user
        const user = await User.findById(req.user.id);
        const userToUnfollow = await User.findById(req.params.userid);
        //  ensure user can't unfollow himself 
        if (user._id == userToUnfollow._user) {
            return res.send("sorry u can't unfollow youself")
        }
        //  check if userToUnfollow is followed by user
        const isFollowing = await Following.findOne(
            { $and: [{ _user: req.user.id }, { _following: { $elemMatch: { user: req.params.userid } } }] }
        )
        if (!isFollowing) {
            return res.status(400).json({ msg: "not following this user" })
        }
        // if following, remove usertoUnfollow from the following list

        await Following.updateOne(
            { _user: req.user.id },

            {
                $pull: {
                    _following: {
                        user: userToUnfollow._id,
                        username: userToUnfollow.username,
                        avatar: userToUnfollow.avatar
                    }
                }
            },
            { new: true }
        );
        //  update the userToUnfollow followers list 

        await Followers.updateOne(
            { _user: userToUnfollow._id },
            {
                $pull: {
                    _followers: {
                        user: req.user.id,
                        avatar: user.avatar,
                        username: user.username
                    }
                }
            },
            { new: true }
        );




        return res.json({ msg: "unfollow success" });
        // return res.status(200).json({ success: true, msg: "unfollow user success" })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ msg: 'server error' });
        next(err)
    }
}





//  @ get suggested users 

exports.getSuggestedUsers = async (req, res, next) => {


    const unwantedFields = [
        "__v",
        "password",
        "cloudinary_id",
        "DateCreated",

    ]
    try {

        const users = await User.aggregate([
            {
                $match: {
                    _id: { $ne: ObjectId(req.user.id) }
                }
            },

            {
                $lookup: {
                    from: 'followers',
                    localField: '_id',
                    foreignField: '_user',
                    as: 'followers'
                }
            },

            { $unwind: { path: "$followers", preserveNullAndEmptyArrays: true } },

            {
                $project: {
                    email: true,
                    avatar: true,
                    name: true,
                    username: true,
                    isFollowing: { $in: [ObjectId(req.user.id), '$followers._followers.user'] }
                }
            },
            { $sample: { size: 5 } },
            { $match: { isFollowing: false } },

            { $unset: [...unwantedFields] }

        ]);
        if (!users) {
            return res.status(400).json({ msg: "users not found" })
        }
        return res.json({ users })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'server error' });
        next(err)
    }
}

exports.searchUsers = async (req, res, next) => {
    const { query } = req.params;
    try {
        const users = await User.aggregate([
            { $match: { username: { $regex: new RegExp(query), $options: 'i' } } },

            {
                $lookup: {
                    from: 'followers',
                    localField: '_id',
                    foreignField: "_user",
                    as: 'followers'
                }
            },
            { $unwind: { path: "$followers", preserveNullAndEmptyArrays: true } },
            // { $sort: { DateCreated: "-1" } },
            {
                $project: {
                    _id: 1,
                    avatar: 1,
                    username: 1,
                    followers: "$followers",
                    name: 1
                }
            }
        ]);
        if (users.length === 0) {
            return res.status(404)
                .json({ msg: 'No Match' });
        };
        console.log(users)
        return res.json({ users })
    } catch (error) {
        console.log(error.message)
        next(error)
    }
}