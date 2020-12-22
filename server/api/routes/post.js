const express = require('express');
const router = express.Router();
const Post = require('../../models/post')
const User = require('../../models/user');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const auth = require('../../middleware/user');

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

        //save post to mongodb
        const post = await new Post({
            postedBy: req.user,
            postImg: secure_url,
            cloudinary_id: public_id,
            caption: req.body.caption

        });

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
        const posts = await Post.find({}).populate("postedBy", "username").sort({ createdAt: -1 });
        if (!posts) {
            return res.status(400).json({ msg: "no posts found" })
        }
        res.json(posts)
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);

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
// @desc    Delete user post
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
        //check if post has been liked before
        const alreadyLiked = await post.likes.some((like) => {
            return like.toString() === req.user.toString()
        });
        if (alreadyLiked) {
            return res.status(400).json({ msg: 'Post already liked' });
        } else {

            await post.save((err) => {
                if (err) {
                    return res.json(err);
                }
                res.json(post)
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
});
module.exports = router