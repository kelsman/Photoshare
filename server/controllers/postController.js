const User = require('../models/User');
const { cloudinary } = require('../utils/cloudinary');

const Post = require('../models/Post')

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
                caption,
                postMedia: upload.secure_url,
                cloudinary_id: upload.public_id,
            });
            await post.save((err) => {
                if (!err) {
                    res.status(201).json({ success: true, post })
                }
            })
        }

    } catch (error) {
        res.status(500).json({ sucess: false, msg: `failed to make post : ${error.message}` })
        next()
    }


}
// @ like a post 
exports.likePost = async (req, res, next) => {
    const socket = req.app.get('socketio');
    try {
        // find the post 
        const post = await Post.findById(req.params.postid)

        //  check if post has been liked before

        const isLiked = post.likes.some((like) => {
            return like.likedBy.toString() === req.user.id.toString()
        })
        if (isLiked) {
            return res.status(400).json({ msg: 'You Liked this Post already' });
        }
        await post.likes.unshift({ likedBy: req.user.id });
        await post.save()
        socket.emit('likePost', post)
        return res.status(201).json({ msg: "liked" });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ sucess: false, msg: ` something went wrong` })
        next(error)
    }

};

// @ unlike a post

exports.unlikePost = async (req, res, next) => {
    const socket = req.app.get('socketio');
    try {
        const post = await Post.findById(req.params.id);

        //  check if post has been liked before
        const isLiked = post.likes.some((like) => {
            return like.likedBy.toString() === req.user.id.toString()
        })
        if (!isLiked) {
            return res.status(400).json({ success: false, msg: `You haven't liked this Post` });
        };
        // remove the like from the post array
        post.likes = post.likes.filter((like) => {
            like.likedBy.toString() !== req.user.id.toString()
        });
        post.save((err) => {
            if (!err) {
                socket.emit('unlikePost', post)
                return res.status(201).json({ sucess: true, msg: "unliked success" })
            }

        });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ sucess: false, msg: ` something went wrong` })
        next();
    }
};

//  @comment on a post 
exports.commentPost = async (req, res, next) => {

    const { commentText } = req.body;
    const socket = req.app.get('socketio');

    try {
        if (!commentText) {
            return res.status(401).json({ msg: "please add a comment text" })
        }
        const user = await User.findById(req.user.id).select("-password")
        const post = await Post.findById(req.params.postId);

        const newComment = {
            text: commentText,
            commentBy: req.user.id,
            avatar: user.avatar,
            name: user.username
        };

        await post.comments.push(newComment);
        await post.save()
        socket.emit('addComment', post);
        console.log(post)
        res.status(201).json({ msg: "comment success" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, msg: error.message })
        next(error)
    }

};

//  delete a comment 

exports.deleteComment = async (req, res, next) => {

    try {
        const post = await Post.findById(req.params.id);
        // pull out comment
        const comment = post.comments.find((comment) => comment.id === req.params.comment_id);
        //    make sure commment exist
        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
        };

        //   check user deleting the comment
        if (comment.commentBy.toString() !== req.user.id.toString()) {
            return res.status(401).json({ msg: "user not authorized" })
        }
        post.comments = post.comments.filter((comment) => comment.id !== req.params.comment_id);

        post.save()
        return res.json(post.comments);

    } catch (error) {
        console.error(err.message);
        next(error)
        return res.status(500).send('Server Error');
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
        const posts = await Post.find().sort({ date: -1 }).populate('postedBy', ["avatar", "username"]).select('-cloudinary_id')

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
    }
}