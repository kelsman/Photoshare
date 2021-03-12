const User = require('../models/User');
const PostLikes = require('../models/Likepost');

const { cloudinary } = require('../utils/cloudinary');

const Post = require('../models/Post')
const Notification = require('../models/Notification');
const Following = require('../models/Following');
const PostComments = require('../models/Comment');


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
        const user = await User.findById(req.user.id)

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
                { upsert: true }
            ).exec()
            return res.status(200).json({ msg: "unlike successful" })
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
                { upsert: true }
            ).exec()

            return res.status(200).json({ msg: " like post success" })
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
        const user = await User.findById(req.user.id).select("-password")
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
                    }
                }
            },
            { upsert: true, new: true }
        ).exec()
        // socket.emit('addComment', post);   
        return res.status(201).json({ msg: "comment success" });
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
        return res.status(200).json({ msg: "comment deleted" })

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

        await post.remove();
        res.status(200).json({ msg: "post deleted" })
    } catch (error) {
        console.log(error.message);
        return res.status(500).send('Server Error');
        next();
    }
}

//  get posts for explore 
exports.allPosts = async (req, res, next) => {

    try {
        // const posts = await Post.find().sort({ date: -1 }).populate('postedBy', ["avatar", "username"]).select('-cloudinary_id')

        const posts = await Post.find().where('random').populate('postedBy', ["avatar", "username"]).select('-cloudinary_id')
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

    try {
        const post = await Post.findById(req.params.postId).populate('postedBy', ["avatar", "username"]);
        if (!post) {
            return res.status(404).json({ success: false, msg: "post does not exist" })
        }
        res.status(200).json({ sucess: true, msg: post })
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

exports.feedPosts = async (req, res, next) => {
    try {
        //  get posts based on people follwoing user

        const user = req.user.id;
        const followingDoc = await Following.findOne({ _user: req.user.id });
        if (!followingDoc) {
            return res.status(404).json({ msg: "could not find any post" })
        };
        const following = followingDoc.following.map(
            (following) => following.user
        );

        const post = await Post.aggregate([
            {
                $match: {
                    $or: [{}]
                }
            },

        ])
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