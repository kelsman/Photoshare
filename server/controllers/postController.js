const User = require('../models/User');
const PostLikes = require('../models/Likepost');

const { cloudinary } = require('../utils/cloudinary');

const Post = require('../models/Post')
const Notification = require('../models/Notification');
const Following = require('../models/Following');
const PostComments = require('../models/Comment');
const ObjectId = require('mongoose').Types.ObjectId
// const getPostupdate = require('../utils/post').getPostupdate;
const { getupdatedPost } = require('../utils/post');
// @ create a post 
exports.createPost = async (req, res, next) => {

    const { caption } = req.body;
    const file = req.file.path
    try {
        const upload = await cloudinary.uploader.upload(file, {
            use_filename: true,
            folder: "photoshare_post",
            resource_type: 'auto',
        });
        if (upload) {
            const post = await new Post({
                postedBy: req.user.id,
                caption: req.body.caption,
                postMedia: upload.secure_url,
                cloudinary_id: upload.public_id,
            });

            await post.save()
            res.status(201).json({ success: true, post })
        }
    } catch (error) {
        res.status(500).json({ sucess: false, msg: `failed to make post : ${error.message}` })
        next(error)
    }


}
// @ like a post && unlike a post 
exports.likePost = async (req, res, next) => {
    const socket = req.app.get('socketio');
    try {
        // @** logged in user 
        const user = await User.findById(req.user.id);

        // find the post 
        const post = await Post.findById(req.params.postid)
        if (!post) {
            return res.status(400).json({ msg: "post not found" })
        }
        //  check if the post has been liked by the logged in user 

        const isLiked = await PostLikes.findOne(
            { $and: [{ _post: req.params.postid }, { likes: { $elemMatch: { _user: req.user.id } } }] }
        );
        if (isLiked) {
            await PostLikes.updateOne(
                { _post: req.params.postid },
                {
                    $pull: {
                        likes: {
                            _user: req.user.id,
                            username: user.username,
                            avatar: user.avatar
                        }
                    }
                },
                { upsert: true, new: true }
            ).exec()
            //  send theupdated postlike count

            let postUpdate = await PostLikes.findOne({ _post: req.params.postid })

            // socket.emit('unlikeUpdate', { postUpdate })
            return res.status(200).json({ msg: "unlike success", data: postUpdate })

        } else {
            await PostLikes.updateOne(
                { _post: req.params.postid },
                {
                    $push: {
                        likes: {
                            _user: req.user.id,
                            username: user.username,
                            avatar: user.avatar
                        }
                    }
                },
                { upsert: true, new: true }
            ).exec();
            let postUpdate = await PostLikes.findOne({ _post: req.params.postid })

            // socket.emit('likeUpdate', { postUpdate })
            return res.status(200).json({ msg: " like success", data: postUpdate })
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ sucess: false, msg: ` something went wrong` })
        next(error)
    }

};





//  @comment on a post 
exports.commentPost = async (req, res, next) => {

    const { commentText } = req.body;
    const socket = req.app.get('socketio');


    try {
        // user to comment 
        const user = await User.findById(req.user.id).select("-password");

        // @post to be commented on

        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(400).json({ msg: "post not found" })
        }
        // const postComment = await PostComments.findOne({ _post: req.params.postId })

        // add to commentsschema array 
        await PostComments.updateOne(
            { _post: req.params.postId },
            {
                $push: {
                    comments: {
                        _user: req.user.id,
                        commentText,
                        username: user.username,
                        avatar: user.avatar
                    }
                }
            },
            { upsert: true, new: true }
        ).exec()

        //  get the updated comment
        let commentUpdate = await PostComments.findOne({ _post: req.params.postId })

        return res.status(201).json({ msg: "comment success", data: commentUpdate });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, msg: error.message })
        next(error)
    }

};

//  delete a comment 
exports.deleteComment = async (req, res, next) => {

    const { postid, commentid } = req.params;
    try {

        // make sure owner of comment is permitted to delete comment 
        const postComment = await PostComments.findOne({ _post: postid })
        //  pull out the comment 
        const comment = postComment.comments.find((comment) => {
            return String(comment._id) == String(commentid)
        });

        if (!comment) {
            return res.status(400).json({ msg: "comment does not exist" });
        }
        // only authorised owner of comment can delete comment 
        if (String(comment._user) !== String(req.user.id)) {
            return res.status(400).json({ msg: "un authorised" });
        }
        console.log(comment)


        await PostComments.updateOne(
            { _post: postid },
            {
                $pull: {
                    comments: {
                        _id: commentid
                    }
                }
            },
            {
                new: true,
                upsert: true,
            }
        ).exec()
        const updatedPost = await PostComments.findOne({ _post: postid })
        return res.status(200).json({ msg: "comment deleted", data: updatedPost })

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: 'Server Error' });
        next(error)
    }

}

//  delete a post

exports.deletePost = async (req, res, next) => {

    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        console.log(post)
        if (post.postedBy.toString() !== req.user.id.toString()) {
            return res.status(404).json({ msg: "not authorised" });
        };

        await cloudinary.uploader.destroy(post.cloudinary_id)
        await post.remove();
        res.status(200).json({ msg: "post deleted" })
    } catch (error) {
        console.log(error.message);
        return res.status(500).send('Server Error');
        next();
    }
}

//  get posts for explore 
exports.retrieveExplorePost = async (req, res, next) => {

    try {
        // const posts = await Post.find().sort({ date: -1 }).populate('postedBy', ["avatar", "username"]).select('-cloudinary_id')

        // const posts = await Post.find().where('random').populate('postedBy', ["avatar", "username"]).select('-cloudinary_id')
        const unwantedFields = [
            'comments.__v',
            'comments._post',
            'likeCount.__v',
            'likeCount._post',
            'comments._id',
            'likeCount._id',
            'postedBy',
            'cloudinary_id',
        ]


        const posts = await Post.aggregate([
            { $match: {} },
            { $sort: { date: -1 } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'postedBy',
                    foreignField: '_id',
                    as: 'author'
                }
            },


            // {
            //     $project: {
            //         'author.username': 1,
            //         'author.avatar': 1,
            //         'author.name': 1,

            //     }
            // },
            {
                $lookup: {
                    from: "comments",
                    localField: '_id',
                    foreignField: "_post",
                    as: 'comments'
                }
            },

            {
                $lookup: {
                    from: "likeposts",
                    localField: "_id",
                    foreignField: '_post',
                    as: 'likeCount'
                }
            },
            { $sample: { size: 20 } },


            { $unset: [...unwantedFields] }
        ])

        if (!posts) {
            return res.status(404).json({ msg: 'Post not found' });
        };
        return res.status(200).json({ success: true, posts })

    } catch (error) {
        console.log(error.message);
        return res.status(500).send('Server Error');
        next(eror)
    }
};

//  get  single post by the post id 
exports.getSinglePost = async (req, res, next) => {

    const unwantedFields = [
        'comments.__v',
        'comments._post',
        'likeCount.__v',
        'likeCount._post',
        // 'comments._id',
        // 'likeCount._id',
        'postedBy',
        'cloudinary_id',
        'author.password',
        'author.cloudinary_id',
        'author.email',
        'author.__v',
        '__v',

    ]
    try {
        const post = await Post.aggregate([
            { $match: { _id: ObjectId(req.params.postId) } },

            {
                $lookup: {
                    from: 'users',
                    localField: 'postedBy',
                    foreignField: '_id',
                    as: 'author'
                }
            },

            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: "_post",
                    as: "comments"
                }
            },


            {
                $lookup: {
                    from: "likeposts",
                    localField: "_id",
                    foreignField: '_post',
                    as: 'likeCount'
                }
            },
            { $unwind: { "path": "$author", "preserveNullAndEmptyArrays": true } },
            {
                $unwind: {
                    "path": "$comments", "preserveNullAndEmptyArrays": true
                }
            },
            { $unwind: { path: "$likeCount", "preserveNullAndEmptyArrays": true } },
            {
                $project: {
                    _id: 1,
                    'author': 1,
                    postMedia: 1,
                    likes: '$likeCount.likes',
                    comments: '$comments.comments'

                }
            },

            {
                $unset: [...unwantedFields]
            }

        ])
        if (!post) {
            return res.status(404).json({ success: false, msg: "post does not exist" })
        }
        res.status(200).json({ sucess: true, post })
    } catch (error) {
        console.log(error.message);
        return res.status(500).send('Server Error');
        next(eror)
    }
}

//  get posts by user
exports.getPosts = async (req, res, next) => {
    try {
        const post = await Post.find({ postedBy: req.user.id }).sort({ data: -1 })
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        };
        return res.status(200).json({ success: true, post })
    } catch (error) {
        console.log(error.message);
        return res.status(500).send('Server Error');
        next(error)
    }
}

//  get post feeds

exports.retrieveFeedPosts = async (req, res, next) => {
    try {

        const user = await User.findById(req.user.id);
        // get the people user is following

        const followingDoc = await Following.findOne({ _user: ObjectId(req.user.id) })
        if (!followingDoc) {
            return res.status(400).json({ msg: 'you re not following anybody' })
        }
        const following = followingDoc._following.map((follow) => follow.user)
        console.log(following)

        const unwantedFields = [
            "author.password",
            'author.email',
            'postedBy',
            'author.cloudinary_id',
            'author.DateCreated',
            'postLikes.__v',
            'postLikes._post',
            'postLikes._id',
            'postComments.__v',
            'postComments._post',

        ]
        const posts = await Post.aggregate([
            {
                $match: {
                    $or: [{ postedBy: { $in: following } }, { postedBy: ObjectId(req.user.id) }]
                }
            },
            { $sort: { date: -1 } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'postedBy',
                    foreignField: '_id',
                    as: 'author',
                }
            },

            {
                $lookup: {
                    from: 'likeposts',
                    localField: '_id',
                    foreignField: '_post',
                    as: 'postLikes'
                }
            },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: '_post',
                    as: 'postComments'
                }
            },

            { $unset: [...unwantedFields] }
        ])
        return res.json({ posts })
    } catch (error) {

    }
}

//  get post based on followers 

exports.followersPosts = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send('Server Error');
        next(error);
    }

}

// retrive explore posts 
