const express = require('express');
const router = express.Router();
const Post = require('../../models/post')
const User = require('../../models/user');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const auth = require('../../middleware/user');
const Comment = require('../../models/comment');
const pusher = require('../../server');


//configure cloudinary 

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "photoshare-photos",
    allowedFormats: ['jpg', 'jpeg', 'png', "mp4"],
    transformations: [{ width: 960, height: 960, crop: "limit" }],
    filename: (req, file, cb) => {
        const name = file.originalname.split(' ').join('_');
        callback(undefined, name);
    }

});
const parser = multer({ storage: storage });

// @route    POST api/posts
// @desc     ceate post
// @access   Private


router.post('/', [auth, parser.single("image")], async (req, res) => {
    try {
        // console.log(req.file) // to see what is returned to me
        const file = req.file;
        console.log(file);
        if (!file) {
            return res.json({ msg: "no file selected" })
        }


        const result = await cloudinary.uploader.upload(file.path)
        if (!result) {
            return res.status(400).json("error in uploading file")
        }
        const { public_id, secure_url, } = result;
        const { caption } = req.body;
        //save post to mongodb
        const post = await new Post({
            postedBy: req.user,
            postImg: secure_url,
            cloudinary_id: public_id,
            caption: caption
        })

        await post.save((err) => {
            if (err) {
                return res.json(err)
            }

            res.status(200).json({ success: true, post });
        })


    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, msg: err.message });
    }
});

// @route    GET api/posts
// @desc     Get all posts
// @access   Private

router.get('/allposts', auth, async (req, res) => {
    try {
        const posts = await Post.find({}).populate({
            path: "postedBy",
            select: "username"
        }).sort({ createdAt: -1 });
        if (!posts) {
            return res.status(400).json({ msg: "no posts found" })
        }

        res.json(posts)
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);

    }
});
// @route    GET api/posts/feeds
// @desc     Get all user feeds
// @access   Private
router.get('/feeds', auth, async (req, res) => {

    try {

        const posts = await Post.find();
        const feeds = posts.filter((feed) => {
            return feed.following.includes(req.user)
        });
        res.json(feeds);
    } catch (error) {
        console.log(err);
    }
})


/**
 * @route    GET api/posts/:id
 * @desc     Get post by id
 * @access   Private
 *
 */
router.get("/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ msg: "Post not found" });
        res.json(post);
    } catch (err) {
        console.error(err.message);

        if (err.kind === "ObjectId")
            return res.status(404).json({ msg: "Post not found" });

        res.status(500).send("Server Error");
    }
});

// @route    GET api/myposts
// @desc     Get user posts
// @access   Private

router.get('/myposts', auth, async (req, res) => {

    try {
        //check if user is logged in 
        const user = await User.findOne({ _id: req.user });
        if (!user) {
            return res.status(401).json({ msg: "not authenticated" });
        }
        const myposts = await Post.find({ postedBy: req.user }).sort({ createdAt: -1 });
        if (!myposts) {
            return res.status(400).json({ msg: "no posts found" })
        }
        res.json(myposts)
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
});

// @route    DELETE api/post
// @desc    Delete user post by id
// @access   Private

router.delete('/:postId', auth, async (req, res) => {
    const { postId } = req.params
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(422).json({ msg: "error no posts found" })
        };
        if (post.postedBy.toString() !== req.user.toString()) {
            return res.status(401).json({ msg: "not authorised" });
        } else {
            //delete picture from cloudinary
            await cloudinary.uploader.destroy(post.cloudinary_id);
            await post.remove((err) => {
                if (!err) {
                    return res.status(200).json("deleted successfully")
                }
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);

    }
});

// @route    put api/post
// @desc   like a user post
// @access   Private

router.put('/like/:likeId', auth, async (req, res) => {

    try {
        //find the post 
        const post = await Post.findByIdAndUpdate(
            req.params.likeId, {
            $push: {
                likes: req.user
            }

        }
        ).populate("likes", "username");


        await post.save((err) => {
            if (err) {
                return res.json(err);
            }
            res.json(post.likes);
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
});
// @route    put api/post/unlike/:likeId
// @desc   unlike a user post
// @access   Private
router.put('/unlike/:unlikeId', auth, async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.unlikeId, {
            $pull: {
                likes: req.user
            }

        }, { new: true });
        await post.save((err) => {
            if (err) {
                return res.status(422).json({ msg: err })
            }
            res.json(post.likes);

        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
});

// @route    put api/post/comment
// @desc   comment on a post
// @access    private

router.post('/comment/:id', auth, async (req, res) => {

    const { text } = req.body;
    const { id } = req.params;

    if (!text) {
        return res
            .status(400)
            .send({ error: 'Please provide a message with your comment.' });
    }

    try {
        // const comment = await Comment.findByIdAndUpdate(id, {
        //     $push: {
        //         comments: {
        //             text: text,
        //             User: req.user
        //         }
        //     }

        // }, { new: true }).populate('users', 'username').sort({ createdAt: -1 });

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).send({ error: 'Could not find a post with that post id.' })
        };

        const comment = await new Comment({
            text: text,
            author: req.user,
            post: id
        });
        console.log(comment);
        await comment.save((err) => {
            if (err) {
                console.log(err)
                return res.status(422).json({ msg: err })
            } else {
                pusher.trigger('flash-comments', 'new-comment', comment);
                return res.status(201).json(comment);
            }
        })



    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
});

// @route    get api/post/comment
// @desc   fetch comments
// @access    private

router.get('/comments/all-comments', auth, async (req, res) => {

    try {
        const comments = await Comment.find({});
        if (!comments) {
            return res.status(404).json({ msg: "comments not found" })
        }
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
})

// @route    put api/post/comment/:id/:commentid
// @desc   delete comment on a post
// @access    private
router.delete('/comment/:Id/:commentId', auth, async (req, res) => {
    const { Id, commentId } = req.params
    try {
        const post = await Post.findByIdAndUpdate(Id, {
            $pull: {
                comments: {
                    _id: commentId
                }
            }
        }, { new: true });
        await post.save((err) => {
            if (!err) {

                return res.json(post.comments);
            }

        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
})
module.exports = router